import { createBroadcasterPresentation } from './broadcasterPresentation';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { ScoreBug } from '../../fanview-spa/src/components/ScoreBug';
import type { FanViewMatch } from '../../fanview-spa/src/adapters/contracts';
import { ScoreboardDisplayMenu, type ViewerDisplayPreference } from './ProductionApp';
import { fanViewSnapshotFromRow, type PublicFanViewMatchRow } from './supabaseFanViewAdapter';

declare const __BROADCAST_APPROVED_CSS__: string;
export const BROADCAST_DISPLAY_KEY = 'courtsideview_fanview_broadcaster_display_v1';
export const BROADCAST_DISPLAY_DEFAULT: ViewerDisplayPreference = {
  layout: 'score-bar', size: 'standard', position: 'bottom-center', automatic: false,
};
export function isBroadcastPreference(value: unknown): value is ViewerDisplayPreference {
  if (!value || typeof value !== 'object') return false;
  const p = value as ViewerDisplayPreference;
  return ['full-score', 'score-bar', 'minimal'].includes(p.layout) &&
    ['small', 'standard', 'large'].includes(p.size) &&
    ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom-center'].includes(p.position) &&
    typeof p.automatic === 'boolean';
}
const initialPreference = () => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(BROADCAST_DISPLAY_KEY) || 'null');
    if (isBroadcastPreference(stored)) return stored;
  } catch { /* Private browsing still supports the default and current choice. */ }
  return { ...BROADCAST_DISPLAY_DEFAULT };
};

type Props = {
  match: FanViewMatch | null;
  error: boolean;
  open: boolean;
  preference: ViewerDisplayPreference;
  onPreference: (preference: ViewerDisplayPreference) => void;
  onClose: () => void;
  onRetry: () => void;
  restoreFocus: () => void;
};
export function BroadcasterDisplayView(props: Props) {
  const [portrait, setPortrait] = useState(window.innerHeight >= window.innerWidth);
  useEffect(() => {
    const resize = () => setPortrait(window.innerHeight >= window.innerWidth);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  const p = props.preference;
  const change = (patch: Partial<ViewerDisplayPreference>) => props.onPreference({ ...p, ...patch });
  const layout = p.automatic ? portrait ? 'full-score' : 'score-bar' : p.layout;
  return <main className="fanview-app broadcast-display" data-scoreboard-size={p.size}
    data-scoreboard-layout={layout} data-scoreboard-position={p.position} data-scoreboard-automatic={p.automatic}>
    <section className="match-stage" aria-label="Broadcast scoreboard">
      {props.match && !props.error ? <ScoreBug match={props.match} layout={layout} /> : null}
      {props.open ? <>
        <ScoreboardDisplayMenu automatic={p.automatic} layout={p.layout} size={p.size} position={p.position}
          onAutomaticChange={(automatic) => change({ automatic })}
          onLayoutChange={(layout) => change({ layout, automatic: false })}
          onSizeChange={(size) => change({ size })} onPositionChange={(position) => change({ position })}
          onReset={() => props.onPreference({ ...BROADCAST_DISPLAY_DEFAULT })}
          onClose={props.onClose} onRestoreFocus={props.restoreFocus}>
        {props.error ? <div className="broadcast-display-recovery" role="status">
          <span>Scoreboard unavailable.</span><button type="button" onClick={props.onRetry}>Retry</button>
        </div> : !props.match ? <div className="broadcast-display-recovery" role="status">Loading score…</div> : null}
        <button type="button" onClick={props.onClose}>Done</button>
        </ScoreboardDisplayMenu>
      </> : null}
    </section>
  </main>;
}

const isolatedLayout = `
:host { position:fixed; inset:0; z-index:9; pointer-events:none; color:#fff; background:transparent; }
.broadcast-display, .broadcast-display .match-stage { position:absolute; inset:0; width:100%; height:100%; min-height:0; background:transparent; overflow:visible; }
.broadcast-display .score-bug { pointer-events:none; }
.broadcast-display[data-scoreboard-position^="bottom"] .score-bug { bottom:var(--broadcast-dock-inset,100px); }
.broadcast-display[data-scoreboard-position^="top"] .score-bug { top:max(56px,calc(env(safe-area-inset-top) + 48px)); }
.broadcast-display .scoreboard-display-menu { pointer-events:auto; z-index:50; max-height:calc(100dvh - 32px); overflow:auto; top:16px; bottom:auto; }
.broadcast-display-recovery { padding:8px 12px; border-radius:12px; background:#101827; display:flex; gap:10px; align-items:center; pointer-events:auto; }
.broadcast-display-recovery button { min-height:44px; min-width:44px; color:#fff; background:#101827; border:1px solid #8c9caf; border-radius:8px; }
`;

export function mountBroadcasterDisplay(host: HTMLElement, options: {
  trigger: HTMLButtonElement;
  controls: HTMLElement;
  retry: () => void;
  save?: (preference: ViewerDisplayPreference) => Promise<void>;
  source?: HTMLVideoElement;
  viewerCount?: () => number;
  onPresentationChange?: () => void;
}) {
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = __BROADCAST_APPROVED_CSS__.replaceAll(':root', ':host') + isolatedLayout;
  shadow.appendChild(style);
  // Font faces belong to the document font set, while all UI styles remain isolated.
  if (!document.getElementById('broadcast-display-fonts')) {
    const fonts = document.createElement('style'); fonts.id = 'broadcast-display-fonts';
    fonts.textContent = (__BROADCAST_APPROVED_CSS__.match(/@font-face\s*\{[^}]+\}/g) || []).join('\n');
    document.head.appendChild(fonts);
  }
  const mount = document.createElement('div'); shadow.appendChild(mount);
  const root = createRoot(mount);
  let match: FanViewMatch | null = null;
  let preference = initialPreference(); let open = false; let error = false; let changed = false;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let disposed = false;
  const presentation = options.source ? createBroadcasterPresentation({
    source: options.source, parent: shadow,
    snapshot: () => match && !error ? { match, preference, viewerCount: options.viewerCount?.() || 0 } : null,
    onChange: () => options.onPresentationChange?.(),
  }) : null;
  const restoreFocus = () => options.trigger.focus();
  const close = (restore = true) => { const wasOpen = open; open = false; render(); if (wasOpen && restore) restoreFocus(); };
  const render = () => {
    if (disposed) return;
    presentation?.refresh();
    options.trigger.setAttribute('aria-expanded', String(open));
    host.style.zIndex = open ? '30' : '9';
    root.render(<BroadcasterDisplayView match={match} error={error} open={open} preference={preference}
      onClose={() => close()} restoreFocus={restoreFocus} onRetry={options.retry}
      onPreference={(next) => {
        changed = true; preference = next;
        try { localStorage.setItem(BROADCAST_DISPLAY_KEY, JSON.stringify(next)); } catch { /* Current choice remains usable. */ }
        clearTimeout(saveTimer);
        if (options.save) saveTimer = setTimeout(() => { void options.save!(next).catch(() => {}); }, 800);
        render();
      }} />);
  };
  const size = () => {
    const rect = options.controls.getBoundingClientRect();
    const height = window.visualViewport?.height || window.innerHeight;
    host.style.setProperty('--broadcast-dock-inset', `${Math.max(12, height - rect.top + 12)}px`);
  };
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(size) : null;
  observer?.observe(options.controls);
  window.addEventListener('resize', size); window.visualViewport?.addEventListener('resize', size);
  size(); render();
  return {
    presentationVideo: () => presentation?.video || null,
    presentationPhase: () => presentation?.phase() || 'unavailable',
    preparePictureInPicture: () => presentation?.prepare() || false,
    refreshPresentation: () => presentation?.refresh(),
    setPresentationActive: (active: boolean) => presentation?.setActive(active),
    toggle() { if (open) { close(true); return; } open = true; size(); render(); },
    close,
    setRow(row: PublicFanViewMatchRow | null) {
      match = row ? fanViewSnapshotFromRow(row, null).match : null;
      error = !row; render();
    },
    setUnavailable() { match = null; error = true; render(); },
    hydrate(value: unknown) { if (!changed && isBroadcastPreference(value)) { preference = value; render(); } },
    destroy() { if (disposed) return; disposed = true; presentation?.destroy(); clearTimeout(saveTimer); observer?.disconnect(); window.removeEventListener('resize', size); window.visualViewport?.removeEventListener('resize', size); root.unmount(); },
  };
}
