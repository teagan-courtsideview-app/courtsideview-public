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
volleyball-scorekeeper.html  SEO landing page for volleyball score keeper app queries
vs-gamechanger.html  Comparison landing page served at /vs/gamechanger
download.html   Smart app download page (served at /download)
privacy.html    Privacy policy (served at /privacy)
support.html    Support page (served at /support)
vercel.json     Clean URLs, security headers, and clean-route rewrites/redirects
robots.txt      Allow-all + sitemap pointer
sitemap.xml     Search-engine sitemap
assets/         Logo files, screenshots, favicon, OG image
assets/New App Images for Website & Social/  Raw deployed-app screenshots for website/social use
```

## Website screenshots
The homepage and SEO landing pages use optimized WebP versions in `assets/` that were generated from the raw screenshots in `assets/New App Images for Website & Social/`.

- `website-home-hub.webp` — app home/role hub
- `website-scorekeeper-main.webp` and `website-scorekeeper-live.webp` — scorekeeper flow
- `website-scoreboard-command.webp` — full-stats live match screen
- `website-stats-rotation.webp` — stats and rotation tracking
- `website-fanview-live.webp` and `website-share-fanview.webp` — FanView follow/share surfaces
- `website-roster-hub.webp` — team/player hub
- `website-big-scoreboard.webp` — landscape big scoreboard mode

## Waitlist
The homepage inserts email addresses into `public.waitlist` in Supabase project `gnzhdhagvahylcjmyeeh` using the public publishable key. Apply the matching migration in `../supabase/migrations/20260514165000_create_waitlist.sql` before relying on the form in production.

## Deploy
Pushing to `main` triggers a Vercel production deploy automatically once the repo is connected at vercel.com/teagan-7484s-projects/courtsideview-public.

## Updating the privacy policy
Edit `privacy.html` and push. Bump the "Last updated" date at the top.
