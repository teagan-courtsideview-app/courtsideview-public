import { readFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
const web = path.resolve(__dirname, '../..');
const pages = ['team', 'club', 'player', 'scout'] as const;
const routes = { team: '/t/qa-team', club: '/c/qa-club', player: '/p/qa-player', scout: '/scout/qa-scout' };
const entities = {
  team: { team: { name: 'Charlotte Volleyball Families', slug: 'qa-team', color: '#1556C0', roster: [{ id: 'qa-player', name: 'Jordan', jersey_number: 12 }] }, matches: [] },
  club: { club: { name: 'Carolina Volleyball Club', color: '#1556C0' }, teams: [], live: [], schedule: [], results: [] },
  player: { share_id: 'qa-player', display_name: 'Jordan Volleyball', jersey_number: 12, team_name: 'Charlotte', season_stats: {}, highlight_links: [], is_public: true },
};
afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks(); });
async function load(page: typeof pages[number], failure: boolean) {
  const html = readFileSync(path.join(web, `${page}.html`), 'utf8');
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  document.body.innerHTML = parsed.body.innerHTML;
  window.history.replaceState({}, '', routes[page]);
  const query: any = { select() { return this; }, eq() { return this; }, maybeSingle: async () => ({ data: failure ? null : entities.player, error: failure ? { message: 'PRIVATE DATABASE DETAILS' } : null }) };
  const client = { rpc: vi.fn(async () => ({ data: failure ? null : entities[page as 'team' | 'club'], error: failure ? { message: 'PRIVATE DATABASE DETAILS' } : null })), from: () => query, functions: { invoke: vi.fn() } };
  const fetch = vi.fn(async (url: string) => ({ ok: !failure, json: async () => url.includes('scout_sessions') ? [{ id: 'qa-scout', opponent_name: 'Charlotte Volleyball', ended_at: null }] : [] }));
  const reload = vi.fn();
  const fixtureWindow = Object.create(window);
  Object.defineProperty(fixtureWindow, 'location', { value: { href: window.location.href, pathname: window.location.pathname, reload } });
  const script = [...parsed.querySelectorAll('script')].filter(n => !n.src).at(-1)!.textContent!.replace(/^\s*import\s+\{ createClient \}[^;]+;/m, '');
  new Function('window', 'document', 'createClient', 'fetch', 'setTimeout', 'setInterval', 'clearTimeout', script)(fixtureWindow, document, () => client, fetch, () => 1, () => 1, () => {});
  for (let i = 0; i < 24; i++) await Promise.resolve();
  return { html, client, fetch, reload };
}
describe('shared public product presentation', () => {
  it.each(pages)('%s uses shared typography, scoped chrome and real Home branding', async page => {
    const { html } = await load(page, false);
    expect(html.indexOf('public-touchpoints.css')).toBeGreaterThan(html.indexOf('public-page-type.css'));
    expect(html).toContain(`data-cv-public="${page}"`);
    expect(document.querySelector('.cv-public-brand')?.getAttribute('href')).toBe('/');
    expect(document.querySelector('.cv-public-brand img')?.getAttribute('src')).toBe('/assets/courtsideview-app-icon-mark.png');
    expect((document.getElementById('publicRecovery') as HTMLElement).hidden).toBe(true);
    expect(document.body.textContent).not.toContain('PRIVATE DATABASE DETAILS');
  });
  it.each(pages)('%s recovers without exposing backend details or changing link identity', async page => {
    const { reload } = await load(page, true);
    expect((document.getElementById('publicRecovery') as HTMLElement).hidden).toBe(false);
    expect(document.querySelector('[data-public-retry]')?.textContent).toBe('Try again');
    (document.querySelector('[data-public-retry]') as HTMLButtonElement).click();
    expect(reload).toHaveBeenCalledTimes(1);
    expect(document.querySelector('#publicRecovery a')?.getAttribute('href')).toBe('/');
    const unavailableControl = { team: '.team-tabs', club: '.content-grid', scout: '.tabs', player: '#profile' }[page];
    const node = document.querySelector(unavailableControl) as HTMLElement;
    expect(node.hidden || node.style.display === 'none').toBe(true);
    if (page === 'team') expect((document.getElementById('shareTeam') as HTMLElement).hidden).toBe(true);
    if (page === 'scout') expect((document.getElementById('shareBtn') as HTMLElement).hidden).toBe(true);
    expect(window.location.pathname).toBe(routes[page]);
    expect(document.body.textContent).not.toContain('PRIVATE DATABASE DETAILS');
  });
  it('uses accurate singular counts and preserves missing-stat meaning', async () => {
    await load('team', false);
    expect(document.getElementById('rosterCount')?.textContent).toBe('1 player');
    expect(document.getElementById('teamMeta')?.textContent).not.toContain('1 players');
    await load('player', false);
    const facts = document.getElementById('resumeGrid')!;
    expect(facts.textContent).toContain('Games played');
    expect(facts.textContent).not.toContain('Best game');
    expect(facts.querySelector('.resume-team')?.textContent).toContain('Charlotte');
  });
  it('scopes both themes to functional shells and preserves score numeral styles', () => {
    const css = readFileSync(path.join(web, 'assets/product-design-v1/public-touchpoints.css'), 'utf8');
    expect(css).toContain('prefers-color-scheme: dark'); expect(css).toContain('body[data-cv-public]');
    expect(css).toContain('min-height: 48px'); expect(css).not.toMatch(/\.score-bug|\.scoreboard|\.scoreline|\.stat-value/);
  });
});

it('legacy expired recovery makes no live claim or technical recording promise', () => {
  const doc = new DOMParser().parseFromString(readFileSync(path.join(web, 'fanview.html'), 'utf8'), 'text/html');
  expect(doc.getElementById('fanViewPill')?.textContent).toBe('FanView');
  expect(doc.getElementById('expiredPanel')?.textContent).toContain('15 minutes after the match ends');
  expect(doc.getElementById('expiredPanel')?.textContent).toContain('Ask the person scoring');
  expect(doc.querySelector('.app-promo-note')?.textContent).toBe('Bring your next game courtside.');
  expect(doc.getElementById('expiredPanel')?.textContent).not.toContain('Saved clips');
});
