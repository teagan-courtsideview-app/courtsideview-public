import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createBroadcasterPresentation } from './broadcasterPresentation';
import { drawPresentationFrame } from './presentationFrame';
import type { FanViewMatch } from '../../fanview-spa/src/adapters/contracts';

vi.mock('./presentationFrame', () => ({ drawPresentationFrame: vi.fn() }));
const match: FanViewMatch = {
  home: { name: 'Falcons', score: 7, color: '#1556C0' }, away: { name: 'Canaries', score: 6, color: '#EA2850' },
  setNumber: 2, totalSets: 3, setTarget: 25, homeSetsWon: 1, awaySetsWon: 0,
  completedSets: [{ setNumber: 1, homeScore: 25, awayScore: 22 }],
  isLive: true, isComplete: false, updatedAt: new Date(0).toISOString(),
};
let disposals: Array<() => void> = [];
beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(drawPresentationFrame).mockReset();
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});
afterEach(() => { disposals.forEach((fn) => fn()); disposals = []; vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });
function harness() {
  const source = document.createElement('video');
  Object.defineProperty(source, 'readyState', { value: 2, configurable: true });
  const originalTrack = { stop: vi.fn(), enabled: true, readyState: 'live' };
  const originalStream = { getTracks: () => [originalTrack], getAudioTracks: () => [originalTrack] };
  source.srcObject = originalStream as unknown as MediaStream;
  source.muted = true;
  const ownedTrack = { stop: vi.fn(), readyState: 'live' };
  const stream = { getTracks: () => [ownedTrack], getVideoTracks: () => [ownedTrack] };
  const capture = vi.fn(() => stream);
  Object.defineProperty(HTMLCanvasElement.prototype, 'captureStream', { configurable: true, value: capture });
  const context = { fillRect: vi.fn(), fillText: vi.fn() };
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D);
  const parent = document.createElement('div'); document.body.appendChild(parent);
  let snapshot: Parameters<typeof createBroadcasterPresentation>[0]['snapshot'] extends () => infer T ? T : never = {
    match, viewerCount: 4, preference: { layout: 'score-bar', size: 'standard', position: 'bottom-center', automatic: false },
  };
  const change = vi.fn();
  const controller = createBroadcasterPresentation({ source, parent, snapshot: () => snapshot, onChange: change });
  Object.defineProperty(controller.video, 'readyState', { value: 2, configurable: true });
  disposals.push(() => { controller.destroy(); parent.remove(); });
  return { source, originalTrack, originalStream, ownedTrack, capture, context, parent, controller, change,
    setSnapshot: (next: typeof snapshot) => { snapshot = next; },
    snapshot: () => snapshot!,
  };
}
describe('broadcaster presentation isolation', () => {
  it('does nothing before live, prepares a separate muted video, and never touches source/recording tracks', async () => {
    const h = harness(); expect(h.capture).not.toHaveBeenCalled();
    h.controller.setActive(true); await Promise.resolve();
    expect(h.controller.phase()).toBe('ready');
    expect(h.capture).toHaveBeenCalledWith(30);
    expect(h.controller.video).not.toBe(h.source); expect(h.controller.video.muted).toBe(true);
    expect(h.source.srcObject).toBe(h.originalStream); expect(h.originalTrack.stop).not.toHaveBeenCalled();
    expect(h.originalTrack.enabled).toBe(true);
    h.controller.setActive(false);
    expect(h.ownedTrack.stop).toHaveBeenCalledTimes(1); expect(h.originalTrack.stop).not.toHaveBeenCalled();
    expect(h.source.srcObject).toBe(h.originalStream); expect(vi.getTimerCount()).toBe(0);
  });
  it('renders current match and independent broadcaster display choices without creating another stream', async () => {
    const h = harness(); h.controller.setActive(true); await Promise.resolve();
    const next = { ...h.snapshot(), match: { ...match, home: { ...match.home, score: 8 } },
      preference: { ...h.snapshot().preference, layout: 'full-score' as const, size: 'large' as const, position: 'top-left' as const } };
    h.setSnapshot(next); h.controller.refresh();
    expect(drawPresentationFrame).toHaveBeenLastCalledWith(expect.any(HTMLCanvasElement), h.source, undefined,
      next.match, 4, 'full-score', 'top-left', 'large');
    expect(h.capture).toHaveBeenCalledTimes(1); expect(h.originalTrack.stop).not.toHaveBeenCalled();
  });
  it('replaces stale scoreboard pixels after unavailable state and recovers with the same canvas stream', async () => {
    const h = harness(); h.controller.setActive(true); await Promise.resolve();
    h.setSnapshot(null); h.controller.refresh();
    expect(h.controller.phase()).toBe('unavailable');
    expect(h.context.fillText).toHaveBeenCalledWith('Scoreboard unavailable', expect.any(Number), expect.any(Number));
    h.setSnapshot({ match, viewerCount: 4, preference: { layout: 'minimal', size: 'small', position: 'bottom-right', automatic: false } });
    h.controller.refresh(); expect(h.controller.phase()).toBe('ready'); expect(h.capture).toHaveBeenCalledTimes(1);
  });
  it('bounds source preparation and allows explicit retry after media becomes available', async () => {
    const h = harness(); Object.defineProperty(h.source, 'readyState', { value: 0, configurable: true });
    h.controller.setActive(true); expect(h.controller.phase()).toBe('preparing');
    await vi.advanceTimersByTimeAsync(5000); expect(h.controller.phase()).toBe('unavailable');
    expect(h.capture).not.toHaveBeenCalled();
    Object.defineProperty(h.source, 'readyState', { value: 2, configurable: true });
    h.controller.prepare(); await Promise.resolve(); expect(h.controller.phase()).toBe('ready');
  });
  it('does not revive a disposed presentation when delayed play completes', async () => {
    const h = harness(); let resolve!: () => void;
    vi.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(() => new Promise<void>((done) => { resolve = done; }));
    h.controller.setActive(true); h.controller.destroy(); h.controller.destroy(); resolve(); await Promise.resolve();
    expect(h.ownedTrack.stop).toHaveBeenCalledTimes(1); expect(h.parent.querySelector('video')).toBeNull();
    expect(h.originalTrack.stop).not.toHaveBeenCalled(); expect(vi.getTimerCount()).toBe(0);
  });
  it('reports a rejected muted play as retryable without requesting PiP or stopping the camera', async () => {
    const h = harness(); vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new Error('blocked'));
    h.controller.setActive(true); await Promise.resolve(); await Promise.resolve();
    expect(h.controller.phase()).toBe('unavailable'); expect(h.originalTrack.stop).not.toHaveBeenCalled();
    expect(h.ownedTrack.stop).toHaveBeenCalledTimes(1);
  });
});
