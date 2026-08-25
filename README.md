# KNRS Consultancy — website

A single-page site built as plain HTML, CSS and JavaScript. No build step, no framework,
no monthly cost. It runs on GitHub Pages with Cloudflare handling the domain.

**Domain:** knrsconsultancy.com
**Email:** knrsconsultancy@gmail.com
**Phone / WhatsApp:** +1 786 495 9618

```
index.html              The whole page
404.html                Shown when a link is wrong
CNAME                   Your domain — GitHub reads this file
.nojekyll               Stops GitHub from reprocessing the files
robots.txt              Search engine instructions
sitemap.xml             Page list for search engines
assets/css/styles.css   All styling and brand colours
assets/js/main.js       Index filters, scroll effects, mobile menu
assets/img/             Logo variants, favicon, social share image
```

There is no contact form. Visitors reach you through direct links: tapping WhatsApp opens a
chat, tapping the phone number dials, tapping the email opens their mail app. Nothing to
configure, nothing that can silently fail, and no third-party service in between.

Your details are already filled in everywhere. If they ever change, use `Ctrl+Shift+F` in
VS Code to find and replace across all files at once.

---

## Part 1 — Put the site on GitHub

**Open the folder in VS Code.** File → Open Folder, and pick this folder. Not a single
file — the whole folder, or the styling and images won't load.

**Preview it.** Install the *Live Server* extension, right-click `index.html`, choose
**Open with Live Server**.

**Create the repository.** On [github.com](https://github.com), click **+ → New repository**.
Name it `knrs-website`. Choose **Public** — GitHub Pages needs public on the free plan.
Do not add a README, licence or .gitignore. Click **Create repository**.

**Push the files.** Back in VS Code:

1. Open the **Source Control** panel (the branch icon in the left bar).
2. Click **Initialize Repository**.
3. Type a message like `Initial site`, click **Commit**. Say yes if it offers to stage everything.
4. Click **Publish Branch** and choose the `knrs-website` repository you just made.

**Turn on Pages.** In the repository on GitHub: **Settings → Pages**. Under *Source*,
choose **Deploy from a branch**. Set branch `main`, folder `/ (root)`. Click **Save**.

Wait a minute, then visit `https://yourusername.github.io/knrs-website/` to confirm it works
before touching the domain.

---

## Part 2 — Point the Cloudflare domain at it

Cloudflare has two settings that will break GitHub Pages if you leave them at their
defaults. Do these in order.

### Step 1 — Set SSL mode to Full

In the Cloudflare dashboard, select `knrsconsultancy.com`, then **SSL/TLS → Overview**.
Set the encryption mode to **Full** (or *Full (strict)*).

If this is left on **Flexible**, the site loads in an endless redirect loop and nobody can
reach it. This is the most common failure with this setup.

### Step 2 — Add the DNS records

Go to **DNS → Records** and add five records. Delete any existing `A` or `CNAME` record for
`@` or `www` first, or they will conflict.

| Type | Name | Content | Proxy status |
|---|---|---|---|
| A | `@` | `185.199.108.153` | **DNS only** (grey cloud) |
| A | `@` | `185.199.109.153` | **DNS only** (grey cloud) |
| A | `@` | `185.199.110.153` | **DNS only** (grey cloud) |
| A | `@` | `185.199.111.153` | **DNS only** (grey cloud) |
| CNAME | `www` | `yourusername.github.io` | **DNS only** (grey cloud) |

Replace `yourusername` with your actual GitHub username.

**The grey cloud matters.** Cloudflare defaults to the orange cloud (proxied). While it's
orange, GitHub cannot verify you own the domain and cannot issue an HTTPS certificate.
Click the orange cloud icon on each record to turn it grey.

You can switch them back to orange later, after HTTPS is working, if you want Cloudflare's
caching. Everything will keep running.

### Step 3 — Tell GitHub the domain

In your repository: **Settings → Pages → Custom domain**. Enter `knrsconsultancy.com`
(no `www`, no `https://`). Click **Save**.

GitHub runs a DNS check. It may say the check is in progress for a few minutes — that's
normal.

### Step 4 — Enforce HTTPS

Once the check passes, the **Enforce HTTPS** tick box on that same page becomes available.
Tick it. If it's greyed out, the certificate isn't ready yet; wait and reload the page.

This can take from ten minutes to a few hours. Nothing has gone wrong if it isn't instant.

### Step 5 — Check it

Visit `https://knrsconsultancy.com`. Then `https://www.knrsconsultancy.com` — it should
redirect to the first one automatically.

---

## Updating the site later

Edit a file, save, then in VS Code's **Source Control** panel: write a message, click
**Commit**, click **Sync Changes**. The live site updates in about a minute.

Don't delete the `CNAME` file. GitHub reads your domain from it, and removing it
disconnects the domain.

---

## Editing the A–Z index

All 26 entries are written directly in `index.html`. Find `<ol class="index-grid">` and edit
the text inside any entry:

```html
<li class="entry" data-group="company">
  <span class="entry__letter" aria-hidden="true">A</span>
  <span class="entry__body">
    <span class="entry__name">Attestation and document support</span>
    <span class="entry__tag">Company formation</span>
  </span>
</li>
```

`data-group` decides which filter button the entry appears under. It must be one of:
`staffing`, `manpower`, `recruitment`, `company`, `referrals`, `web`.

---

## Logo files

| File | Use |
|---|---|
| `knrs-logo.png` | Full resolution original, for print and documents |
| `knrs-logo-900.png` / `-500.png` | Navy version, for white and light backgrounds |
| `knrs-logo-light-900.png` / `-500.png` | Reversed version, for navy and dark backgrounds |
| `favicon.svg` | Browser tab icon, drawn from the globe and arrow in the logo |
| `social-card.png` | Preview image when the site is shared on WhatsApp or LinkedIn |

The navy wordmark disappears on dark backgrounds, which is why the reversed version exists.

## Brand colours

```
Navy       #001739    Headings, dark sections, the wordmark
Deep navy  #000D22    Hero base and footer
Gold       #C69A62    Accents, buttons, index letters
Gold light #E3C08A    Highlights and small labels
Paper      #F3F6FB    Page background
```

Typefaces: **Cormorant Garamond** for headlines, **Instrument Sans** for body text,
**IBM Plex Mono** for small uppercase labels. All load free from Google Fonts.

---

## If something goes wrong

**Endless redirect loop** — Cloudflare SSL mode is on Flexible. Change it to Full.

**"Domain does not resolve to the GitHub Pages server"** — the Cloudflare records are still
proxied. Turn the orange clouds grey.

**Enforce HTTPS is greyed out** — the certificate hasn't been issued yet. Wait, then reload.

**Site loads unstyled** — the `assets` folder didn't get pushed. Check it's visible in the
repository's file list on GitHub.

**Old version still showing** — hard refresh with `Ctrl+Shift+R`. If you re-enabled the
orange cloud, also run **Caching → Configuration → Purge Everything** in Cloudflare.
