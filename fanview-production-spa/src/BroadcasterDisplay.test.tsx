import { act, fireEvent, render, screen, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BroadcasterDisplayView, BROADCAST_DISPLAY_DEFAULT, BROADCAST_DISPLAY_KEY, isBroadcastPreference, mountBroadcasterDisplay } from './BroadcasterDisplay';
import type { FanViewMatch } from '../../fanview-spa/src/adapters/contracts';

afterEach(() => { cleanup(); localStorage.clear(); vi.unstubAllGlobals(); });
const match: FanViewMatch = {
  home: { name: 'Falcons', color: '#1556C0', score: 7 }, away: { name: 'Canaries', color: '#EA2850', score: 6 },
  setNumber: 2, setTarget: 25, totalSets: 3, homeSetsWon: 1, awaySetsWon: 0,
  completedSets: [{ setNumber: 1, homeScore: 25, awayScore: 23 }],
  isComplete: false, isLive: true, updatedAt: new Date(0).toISOString(),
};
function props() {
  return { match, error: false, open: true, preference: { ...BROADCAST_DISPLAY_DEFAULT },
    onPreference: vi.fn(), onClose: vi.fn(), onRetry: vi.fn(), restoreFocus: vi.fn() };
}
describe('isolated browser broadcaster display', () => {
  it('renders the real approved score bug and opens existing layout/size/position controls', () => {
    const p = props(); render(<BroadcasterDisplayView {...p} />);
    expect(screen.getByRole('dialog', { name: 'Scoreboard display' })).toBeVisible();
    expect(screen.getByText('Falcons')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Use full score layout' }));
    expect(p.onPreference).toHaveBeenLastCalledWith({ ...p.preference, layout: 'full-score', automatic: false });
    fireEvent.click(screen.getByRole('button', { name: 'LARGE' }));
    expect(p.onPreference).toHaveBeenLastCalledWith({ ...p.preference, size: 'large' });
    fireEvent.click(screen.getByRole('button', { name: 'Top right' }));
    expect(p.onPreference).toHaveBeenLastCalledWith({ ...p.preference, position: 'top-right' });
  });
  it('keeps Automatic opt-in and resets to independent broadcaster defaults', () => {
    const p = props(); render(<BroadcasterDisplayView {...p} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(p.onPreference).toHaveBeenLastCalledWith({ ...p.preference, automatic: true });
    fireEvent.click(screen.getByRole('button', { name: 'Use CourtsideView default' }));
    expect(p.onPreference).toHaveBeenLastCalledWith(BROADCAST_DISPLAY_DEFAULT);
    expect(BROADCAST_DISPLAY_KEY).not.toBe('courtsideview_fanview_scoreboard_layout');
  });
  it('provides Retry and Done without keeping stale score visible after unavailability', () => {
    const p = props(); render(<BroadcasterDisplayView {...p} error />);
    expect(screen.queryByText('Falcons')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' })); expect(p.onRetry).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Done' })); expect(p.onClose).toHaveBeenCalledOnce();
  });
  it('closes on Escape and supports the caller focus target', () => {
    const p = props(); render(<BroadcasterDisplayView {...p} />);
    fireEvent.keyDown(document, { key: 'Escape' }); expect(p.onClose).toHaveBeenCalledOnce();
  });
  it('keeps every choice type checked and rejects malformed saved preferences', () => {
    expect(isBroadcastPreference(BROADCAST_DISPLAY_DEFAULT)).toBe(true);
    expect(isBroadcastPreference({ ...BROADCAST_DISPLAY_DEFAULT, layout: 'unknown' })).toBe(false);
    expect(isBroadcastPreference({ ...BROADCAST_DISPLAY_DEFAULT, automatic: 'yes' })).toBe(false);
    expect(isBroadcastPreference(null)).toBe(false);
  });
  it('persists only broadcaster choices and does not let delayed account hydration overwrite a local choice', () => {
    vi.stubGlobal('__BROADCAST_APPROVED_CSS__', '');
    localStorage.setItem('courtsideview_fanview_scoreboard_layout', 'minimal');
    const host = document.createElement('div'); const trigger = document.createElement('button');
    const controls = document.createElement('div');
    document.body.append(host, trigger, controls);
    let display!: ReturnType<typeof mountBroadcasterDisplay>;
    act(() => { display = mountBroadcasterDisplay(host, { trigger, controls, retry: vi.fn() }); });
    act(() => display.toggle());
    const shadow = within(host.shadowRoot as unknown as HTMLElement);
    fireEvent.click(shadow.getByRole('button', { name: 'Use full score layout' }));
    expect(JSON.parse(localStorage.getItem(BROADCAST_DISPLAY_KEY)!)).toMatchObject({ layout: 'full-score' });
    expect(localStorage.getItem('courtsideview_fanview_scoreboard_layout')).toBe('minimal');
    act(() => display.hydrate({ ...BROADCAST_DISPLAY_DEFAULT, layout: 'minimal' }));
    expect(shadow.getByRole('button', { name: 'Use full score layout' })).toHaveAttribute('aria-pressed', 'true');
    act(() => display.destroy()); host.remove(); trigger.remove(); controls.remove();
  });
  it('cycles keyboard focus within the Shadow DOM menu and returns it to Display on Done', () => {
    vi.stubGlobal('__BROADCAST_APPROVED_CSS__', '');
    const host = document.createElement('div'); const trigger = document.createElement('button');
    const controls = document.createElement('div'); document.body.append(host, trigger, controls);
    let display!: ReturnType<typeof mountBroadcasterDisplay>;
    act(() => { display = mountBroadcasterDisplay(host, { trigger, controls, retry: vi.fn() }); });
    act(() => display.toggle());
    const shadow = within(host.shadowRoot as unknown as HTMLElement);
    const first = shadow.getByRole('button', { name: 'Use full score layout' });
    const last = shadow.getByRole('button', { name: 'Done' });
    last.focus(); fireEvent.keyDown(last, { key: 'Tab', composed: true });
    expect(host.shadowRoot!.activeElement).toBe(first);
    fireEvent.keyDown(first, { key: 'Tab', shiftKey: true, composed: true });
    expect(host.shadowRoot!.activeElement).toBe(last);
    fireEvent.click(last); expect(document.activeElement).toBe(trigger);
    act(() => display.destroy()); host.remove(); trigger.remove(); controls.remove();
  });
  it('allows a repeat Display pointer click to close rather than close then immediately reopen', () => {
    vi.stubGlobal('__BROADCAST_APPROVED_CSS__', '');
    const host = document.createElement('div'); const trigger = document.createElement('button');
    trigger.setAttribute('data-scoreboard-display-trigger', '');
    const controls = document.createElement('div'); document.body.append(host, trigger, controls);
    let display!: ReturnType<typeof mountBroadcasterDisplay>;
    act(() => { display = mountBroadcasterDisplay(host, { trigger, controls, retry: vi.fn() }); });
    trigger.addEventListener('click', () => display.toggle());
    fireEvent.pointerDown(trigger); fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.pointerDown(trigger); fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(trigger);
    act(() => display.destroy()); host.remove(); trigger.remove(); controls.remove();
  });
});
