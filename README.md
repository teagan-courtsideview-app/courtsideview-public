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
privacy.html    Privacy policy (served at /privacy)
vercel.json     Clean URLs, security headers, /privacy.html → /privacy redirect
robots.txt      Allow-all + sitemap pointer
sitemap.xml     Search-engine sitemap
assets/         Logo SVGs, favicon, OG image
```

## Waitlist
The homepage inserts email addresses into `public.waitlist` in Supabase project `gnzhdhagvahylcjmyeeh` using the public publishable key. Apply the matching migration in `../supabase/migrations/20260514165000_create_waitlist.sql` before relying on the form in production.

## Deploy
Pushing to `main` triggers a Vercel production deploy automatically once the repo is connected at vercel.com/teagan-7484s-projects/courtsideview-public.

## Updating the privacy policy
Edit `privacy.html` and push. Bump the "Last updated" date at the top.
