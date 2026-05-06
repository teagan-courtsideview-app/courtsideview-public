# CourtsideView — Go-Live Guide

Everything you need to take the static site from this folder to **www.courtsideviewapp.com** on Vercel. Estimated total time: **20–30 minutes**, almost all of which is waiting on DNS.

---

## What's in this folder

```
web/
├── index.html          ← landing page
├── privacy.html        ← privacy policy (served at /privacy)
├── vercel.json         ← clean URLs + redirects + headers
├── robots.txt
├── sitemap.xml
├── README.md
├── .gitignore
└── assets/
    ├── favicon.svg
    ├── logo-wordmark.svg   ← white wordmark for dark backgrounds
    └── og-image.svg        ← social-share preview image
```

> **Note about logos:** I built the wordmark as a clean SVG (`assets/logo-wordmark.svg`) so it stays sharp on every screen and adds zero KB to page weight. The nav already uses live HTML text styled to match. If you want to swap in your raster PNGs, just drop them in `assets/` and update the `<link>` / `<img>` tags.

---

## Step 1 — Push the site to GitHub

The dedicated repo is at **github.com/teagan-courtsideview-app/courtsideview-public**.

> ⚠️ **Per your git rule:** run all of this from ONE Terminal — don't let the Cowork sandbox touch `.git/`.

Open Terminal and run **exactly** these commands:

```bash
# 1. go to the website folder
cd "/Users/user/Documents/Claude/Projects/CourtsideView/web"

# 2. initialize a fresh git repo for the public site
git init
git branch -M main

# 3. point it at the public GitHub repo
git remote add origin https://github.com/teagan-courtsideview-app/courtsideview-public.git

# 4. commit and push
git add .
git commit -m "feat: initial landing page + privacy policy"
git push -u origin main
```

If the repo already has a README on GitHub and the push gets rejected, run this once to merge first:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Step 2 — Connect the repo to Vercel

You already have the Vercel project at **vercel.com/teagan-7484s-projects/courtsideview-public**. Two paths depending on what you see:

### If the project is empty (no deployments yet)
1. Go to vercel.com/teagan-7484s-projects/courtsideview-public.
2. Click **"Connect Git Repository"** → choose GitHub → pick `teagan-courtsideview-app/courtsideview-public`.
3. **Framework Preset:** leave as **"Other"** (it's a static site, no framework).
4. **Root Directory:** leave as `./` (the repo root *is* the site root).
5. **Build Command:** leave **empty**.
6. **Output Directory:** leave **empty** (Vercel will serve the root directly).
7. Click **Deploy**. First deploy takes ~30 seconds.

### If the project already exists with the wrong settings
1. Go to **Settings → Git** → confirm the repo is `teagan-courtsideview-app/courtsideview-public`.
2. Go to **Settings → General** → confirm Build Command and Output Directory are both empty, Framework is "Other."
3. Hit **Deployments → Redeploy** on the latest commit.

When the deploy finishes, Vercel gives you a URL like `courtsideview-public-xxxxx.vercel.app`. Open it and confirm:
- ✅ Landing page loads
- ✅ `/privacy` loads
- ✅ Favicon shows in the browser tab
- ✅ "Notify Me at Launch" button opens your mail client

---

## Step 3 — Attach courtsideviewapp.com to Vercel

In Vercel, on the project page:

1. Go to **Settings → Domains**.
2. Type `courtsideviewapp.com` and click **Add**.
3. Vercel will ask if you want to redirect `courtsideviewapp.com → www.courtsideviewapp.com` (or vice versa). **Choose `www` as the primary** and let Vercel auto-redirect the apex. This is the standard for marketing sites and matches the canonical URLs already baked into `index.html`.
4. Vercel will then show you DNS records to set. They'll look like this:

   | Type  | Name | Value                  |
   |-------|------|------------------------|
   | A     | @    | `76.76.21.21`          |
   | CNAME | www  | `cname.vercel-dns.com` |

   *(Exact values come from Vercel — copy them from your dashboard, don't trust this table.)*

Leave this tab open — you'll need those values in Step 4.

---

## Step 4 — Update DNS at Squarespace / Google Workspace

Your domain was bought through Google Workspace, which redirects DNS management to Squarespace Domains. You'll need to log in there.

### 4a. Find your DNS settings
1. Go to **domains.squarespace.com** and sign in with the Google account you used to register (likely the one tied to House of Turnberry).
2. Click **courtsideviewapp.com** in your domain list.
3. Click **DNS** (or **DNS Settings** / **Custom Records** depending on UI version).

### 4b. Remove the existing records (this is the cutover)
Squarespace currently points the domain at its own site. You need to **remove**:
- Any existing **A records** for `@` pointing to Squarespace IPs (`198.185.159.144`, etc.)
- The existing **CNAME** for `www` pointing to `ext-cust.squarespace.com` (or similar).

Don't touch:
- ✅ MX records (those are your Google Workspace email — leaving them alone keeps `info@houseofturnberry.com` working).
- ✅ TXT records for SPF / DKIM / Google site verification.

### 4c. Add the Vercel records
Add **both** records Vercel showed you:
- **A** record: name `@`, value `76.76.21.21` (or whatever Vercel listed).
- **CNAME** record: name `www`, value `cname.vercel-dns.com`.

Save.

### 4d. Wait for propagation
- DNS usually flips in **5–30 minutes** but can take up to 24 hours.
- You can check progress at **dnschecker.org** — paste in `www.courtsideviewapp.com` and watch it go green globally.
- Vercel will auto-provision a free SSL certificate once it sees the DNS resolve. The Domains page in Vercel will show a green checkmark next to both `courtsideviewapp.com` and `www.courtsideviewapp.com` when it's done.

---

## Step 5 — Verify everything works

Once DNS is live:

```
https://www.courtsideviewapp.com/        → landing page
https://www.courtsideviewapp.com/privacy → privacy policy
https://courtsideviewapp.com/            → redirects to www
http://www.courtsideviewapp.com/         → upgrades to https
```

Run through this checklist:
- [ ] Landing page loads with hero, features, footer
- [ ] "Notify Me at Launch" opens email to info@houseofturnberry.com
- [ ] Privacy link in nav and footer goes to `/privacy`
- [ ] Privacy page matches the dark CourtsideView aesthetic
- [ ] Favicon shows the green italic V on a dark tile in the browser tab
- [ ] Sharing the URL on iMessage / Slack shows the OG preview card
- [ ] Mobile (resize browser to ~375px wide): hero stacks correctly, phone mockup is centered, footer stacks vertically
- [ ] Send `info@houseofturnberry.com` a test email to confirm Google Workspace email still flows (you didn't touch MX, but it's worth a sanity check)

---

## Future updates

Any time you want to change the site:

```bash
cd "/Users/user/Documents/Claude/Projects/CourtsideView/web"
# edit index.html / privacy.html / etc.
git add .
git commit -m "chore: update homepage copy"
git push
```

Vercel auto-deploys on every push to `main`. Live in ~30 seconds. No build step, no CI to babysit.

---

## Troubleshooting

**"Vercel says my domain is misconfigured."**
DNS hasn't propagated yet. Wait 15 minutes and refresh the Domains tab. If it's been over an hour, go back to Squarespace DNS and double-check the A/CNAME values match exactly what Vercel asked for (no trailing dots, no extra spaces).

**"My email broke after the DNS change."**
You probably deleted or modified an MX record. Go back to Squarespace DNS and restore the Google Workspace MX records:
```
1   ASPMX.L.GOOGLE.COM
5   ALT1.ASPMX.L.GOOGLE.COM
5   ALT2.ASPMX.L.GOOGLE.COM
10  ALT3.ASPMX.L.GOOGLE.COM
10  ALT4.ASPMX.L.GOOGLE.COM
```

**"Privacy page 404s."**
Vercel needs `cleanUrls: true` to serve `privacy.html` at `/privacy`. The included `vercel.json` already has this — make sure that file made it into the repo (`git ls-files | grep vercel.json`).

**"The CDN Tailwind warns about production use."**
That's just a console warning, harmless for a marketing page. If you want to silence it later, swap the CDN script for the Tailwind CLI build — but for v1 launch traffic, the CDN is totally fine.
