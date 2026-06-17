# CourtsideView — Public Marketing Site

Static landing page, Supabase-backed waitlist, and privacy policy for [courtsideviewapp.com](https://www.courtsideviewapp.com).

## Stack
- Plain HTML + Tailwind (CDN)
- Supabase publishable client for waitlist inserts
- Hosted on Vercel
- Domain managed via Squarespace / Google Workspace

## Local preview
Just open `index.html` in a browser. There is no build step.

```bash
# optional: tiny local server
python3 -m http.server 8080
# then visit http://localhost:8080
```

## File map
```
index.html      Landing page
volleyball-scorekeeper.html  SEO landing page served at /volleyball-score-keeper
volleyball-player-stats.html  SEO landing page served at /volleyball-player-stats
vs-gamechanger.html  Comparison landing page served at /vs/gamechanger
volleyball-apps.html  GEO guide index served at /volleyball-apps
best-volleyball-scorekeeping-apps-2026.html  GEO guide served at /best-volleyball-scorekeeping-apps-2026
best-volleyball-stat-tracking-apps-2026.html  GEO guide served at /best-volleyball-stat-tracking-apps-2026
best-apps-for-volleyball-clubs.html  GEO guide served at /best-apps-for-volleyball-clubs
best-apps-for-volleyball-parents.html  GEO guide served at /best-apps-for-volleyball-parents
volleyball-app-comparison-study.html  GEO comparison study served at /volleyball-app-comparison-study
download.html   Smart app download page (served at /download)
privacy.html    Privacy policy (served at /privacy)
support.html    Support page (served at /support)
geo-guides.css  Shared styles for GEO guide pages
scripts/build-geo-guides.mjs  Source-backed generator for the GEO guide cluster
vercel.json     Clean URLs, security headers, and clean-route rewrites/redirects
robots.txt      Allow-all + sitemap pointer
sitemap.xml     Search-engine sitemap
assets/         Logo files, screenshots, favicon, OG image
assets/New App Images for Website & Social/  Raw deployed-app screenshots for website/social use
```

## GEO guide cluster
The volleyball app guide pages are generated from `scripts/build-geo-guides.mjs` so source links, legal disclaimers, structured data, nav, and page layout stay consistent across the cluster.

```bash
node scripts/build-geo-guides.mjs
```

After adding or renaming guide pages, update `vercel.json` and `sitemap.xml` so the clean URLs, `.html` redirects, and sitemap entries stay in sync.

## Website screenshots
The homepage and SEO landing pages use optimized WebP versions in `assets/` that were generated from the raw screenshots in `assets/New App Images for Website & Social/`.

- `website-20260617-home-hub.webp` — app home/role hub
- `website-20260617-scorekeeper-main.webp` and `website-20260617-scorekeeper-live.webp` — scorekeeper flow
- `website-20260617-scoreboard-command.webp` — full-stats live match screen
- `website-20260617-stats-rotation.webp` — stats and rotation tracking
- `website-20260617-fanview-live.webp` and `website-20260617-share-fanview.webp` — FanView follow/share surfaces
- `website-20260617-roster-hub.webp` — team/player hub
- `website-20260617-big-scoreboard.webp` — landscape big scoreboard mode

## Waitlist
The homepage inserts email addresses into `public.waitlist` in Supabase project `gnzhdhagvahylcjmyeeh` using the public publishable key. Apply the matching migration in `../supabase/migrations/20260514165000_create_waitlist.sql` before relying on the form in production.

## Deploy
Pushing to `main` triggers a Vercel production deploy automatically once the repo is connected at vercel.com/teagan-7484s-projects/courtsideview-public.

## Updating the privacy policy
Edit `privacy.html` and push. Bump the "Last updated" date at the top.
