import type { FanViewMatch } from '../../fanview-spa/src/adapters/contracts';
import type { ViewerDisplayPreference } from './ProductionApp';
import { drawPresentationFrame } from './presentationFrame';

export type PresentationVideo = HTMLVideoElement & {
  webkitPresentationMode?: 'inline' | 'fullscreen' | 'picture-in-picture';
  webkitSetPresentationMode?: (mode: 'inline' | 'fullscreen' | 'picture-in-picture') => void;
  webkitSupportsPresentationMode?: (mode: 'picture-in-picture') => boolean;
};
export type BroadcastPresentationPhase = 'idle' | 'preparing' | 'ready' | 'unavailable';
type Snapshot = { match: FanViewMatch; preference: ViewerDisplayPreference; viewerCount: number };

/** A local, muted presentation copy. It never acquires a camera, starts a
 * recorder, uploads media, or alters/stops any track in the source stream. */
export function createBroadcasterPresentation(options: {
  source: HTMLVideoElement;
  parent: ShadowRoot | HTMLElement;
  snapshot: () => Snapshot | null;
  onChange: () => void;
}) {
  const canvas = document.createElement('canvas');
  canvas.hidden = true;
  const video = document.createElement('video') as PresentationVideo;
  video.muted = true; video.autoplay = true; video.playsInline = true;
  video.setAttribute('aria-hidden', 'true'); video.tabIndex = -1;
  video.style.cssText = 'position:absolute;width:1px;height:1px;right:0;bottom:0;opacity:0.001;pointer-events:none;';
  options.parent.append(canvas, video);
  let phase: BroadcastPresentationPhase = 'idle';
  let active = false; let destroyed = false; let generation = 0;
  let ownedStream: MediaStream | null = null;
  let frameRequest: number | null = null;
  let watchdog: ReturnType<typeof setInterval> | null = null;
  let preparationTimeout: ReturnType<typeof setTimeout> | null = null;
  let lastDrawAt = 0; let frameValid = false;
  const source = options.source;
  // Document PiP state retargets a shadow video to its host. Query the video's own tree.
  const standardFloating = () => (video.getRootNode() as Document | ShadowRoot).pictureInPictureElement === video || document.pictureInPictureElement === video;
  const floating = () => standardFloating() || video.webkitPresentationMode === 'picture-in-picture';
  const setPhase = (next: BroadcastPresentationPhase) => {
    if (phase === next) return;
    phase = next; options.onChange();
  };
  const cancelFrames = () => {
    if (frameRequest !== null) source.cancelVideoFrameCallback?.(frameRequest);
    frameRequest = null;
  };
  const exitPresentation = () => {
    if (standardFloating() && document.exitPictureInPicture) {
      void document.exitPictureInPicture().catch(() => {});
    } else if (video.webkitPresentationMode === 'picture-in-picture') {
      try { video.webkitSetPresentationMode?.('inline'); } catch { /* Track cleanup still ends the owned presentation. */ }
    }
  };
  const stopOwnedStream = () => {
    generation += 1; frameValid = false; cancelFrames();
    exitPresentation();
    if (watchdog !== null) clearInterval(watchdog); watchdog = null;
    if (preparationTimeout !== null) clearTimeout(preparationTimeout); preparationTimeout = null;
    // Only tracks created by canvas.captureStream belong to this controller.
    const stream = ownedStream; ownedStream = null;
    stream?.getTracks().forEach((track) => track.stop());
    if (video.srcObject === stream) { video.pause(); video.srcObject = null; }
  };
  const dimensions = () => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.visualViewport?.height || window.innerHeight);
    const nextWidth = width >= height ? 1280 : Math.max(360, Math.round(1280 * width / height));
    const nextHeight = width >= height ? Math.max(360, Math.round(1280 * height / width)) : 1280;
    if (canvas.width !== nextWidth) canvas.width = nextWidth;
    if (canvas.height !== nextHeight) canvas.height = nextHeight;
  };
  const unavailableFrame = () => {
    frameValid = false;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;
    context.fillStyle = '#03080f'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffffff'; context.textAlign = 'center'; context.textBaseline = 'middle';
    context.font = '600 24px "CV Plus Jakarta Sans", system-ui, sans-serif';
    context.fillText('Scoreboard unavailable', canvas.width / 2, canvas.height / 2);
  };
  const draw = () => {
    if (destroyed || !active || !ownedStream) return;
    dimensions();
    const state = options.snapshot();
    if (!state || source.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) { unavailableFrame(); setPhase('unavailable'); return; }
    const layout = state.preference.automatic
      ? canvas.height > canvas.width ? 'full-score' : 'score-bar'
      : state.preference.layout;
    try {
      drawPresentationFrame(canvas, source, undefined, state.match, state.viewerCount,
        layout, state.preference.position, state.preference.size);
      frameValid = true; lastDrawAt = performance.now();
    } catch {
      unavailableFrame(); setPhase('unavailable');
    }
  };
  const scheduleFrames = () => {
    if (!active || destroyed || !ownedStream || frameRequest !== null || !source.requestVideoFrameCallback) return;
    if (!floating() && phase !== 'preparing') return;
    frameRequest = source.requestVideoFrameCallback(() => {
      frameRequest = null; draw(); scheduleFrames();
    });
  };
  const ready = () => {
    if (!active || destroyed || !ownedStream || !options.snapshot() || !frameValid) return;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && source.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      if (preparationTimeout !== null) clearTimeout(preparationTimeout); preparationTimeout = null;
      setPhase('ready');
    }
  };
  const prepare = () => {
    if (!active || destroyed) return false;
    if (!options.snapshot()) { if (ownedStream) unavailableFrame(); setPhase('unavailable'); return false; }
    if (source.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      if (ownedStream) unavailableFrame();
      setPhase('preparing');
      if (preparationTimeout === null) {
        const run = generation;
        preparationTimeout = setTimeout(() => {
          if (destroyed || !active || run !== generation) return;
          stopOwnedStream(); setPhase('unavailable');
        }, 5000);
      }
      return false;
    }
    if (ownedStream && ownedStream.getVideoTracks().some((track) => track.readyState === 'live')) {
      draw(); ready(); scheduleFrames(); return phase === 'ready';
    }
    stopOwnedStream();
    if (typeof canvas.captureStream !== 'function') { setPhase('unavailable'); return false; }
    dimensions();
    try {
      if (!canvas.getContext('2d', { alpha: false })) throw new Error('Presentation canvas unavailable');
      ownedStream = canvas.captureStream(30);
      if (!ownedStream.getVideoTracks().length) throw new Error('Presentation video unavailable');
      const run = generation;
      video.srcObject = ownedStream;
      setPhase('preparing'); draw();
      // Muted playback prepares metadata before the later, explicit Float tap.
      // Never request PiP here: transient activation belongs to that tap.
      void video.play().then(() => {
        if (destroyed || !active || run !== generation) return;
        ready();
      }).catch(() => {
        if (destroyed || !active || run !== generation) return;
        stopOwnedStream(); setPhase('unavailable');
      });
      preparationTimeout = setTimeout(() => {
        if (destroyed || !active || run !== generation || phase === 'ready') return;
        stopOwnedStream(); setPhase('unavailable');
      }, 5000);
      scheduleFrames();
      watchdog = setInterval(() => {
        if (floating() || phase === 'preparing') {
          if (performance.now() - lastDrawAt >= 220) draw();
          ready();
        }
      }, 250);
      return phase === 'ready';
    } catch {
      stopOwnedStream(); setPhase('unavailable'); return false;
    }
  };
  const sourceReady = () => { if (active) prepare(); };
  const changed = () => {
    if (destroyed) return;
    if (floating()) { draw(); scheduleFrames(); } else cancelFrames();
    options.onChange();
  };
  const resize = () => { if (active && ownedStream) { draw(); ready(); } };
  source.addEventListener('loadeddata', sourceReady);
  video.addEventListener('loadeddata', ready);
  video.addEventListener('playing', ready);
  video.addEventListener('enterpictureinpicture', changed);
  video.addEventListener('leavepictureinpicture', changed);
  video.addEventListener('webkitpresentationmodechanged', changed);
  window.addEventListener('resize', resize); window.visualViewport?.addEventListener('resize', resize);
  return {
    video,
    phase: () => phase,
    prepare,
    refresh: () => { if (active) prepare(); },
    setActive(value: boolean) {
      if (destroyed) return;
      active = value;
      if (active) prepare();
      else { if (ownedStream) unavailableFrame(); stopOwnedStream(); setPhase('idle'); }
    },
    destroy() {
      if (destroyed) return;
      destroyed = true; active = false; stopOwnedStream();
      source.removeEventListener('loadeddata', sourceReady);
      video.removeEventListener('loadeddata', ready); video.removeEventListener('playing', ready);
      video.removeEventListener('enterpictureinpicture', changed);
      video.removeEventListener('leavepictureinpicture', changed);
      video.removeEventListener('webkitpresentationmodechanged', changed);
      window.removeEventListener('resize', resize); window.visualViewport?.removeEventListener('resize', resize);
      canvas.remove(); video.remove();
    },
  };
}
