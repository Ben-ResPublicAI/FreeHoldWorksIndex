# Freehold holding page, deployment

Primary domain: **freehold.works**. Every other domain redirects to it, 301, path preserved.

## Folder contents

| File | Purpose | Read by |
|---|---|---|
| `index.html` | The page. Self contained apart from the fonts. | everything |
| `fonts/` | Five woff2 files, Inter Tight 400, 500, 700 and Source Serif 4 400, 600 | `index.html` |
| `freehold-share.png` | Link preview image, 1200 by 630 | social platforms |
| `assets/audio-toggle.js` | The sound control, the only script on the page | `index.html` |
| `assets/audio/freehold-bed.ogg` | The audio bed, Opus 80k, 0.9 MB, first choice | `index.html` |
| `assets/audio/freehold-bed.mp3` | The same bed, MP3 128k, 1.3 MB, fallback for Safari | `index.html` |
| `robots.txt`, `sitemap.xml` | Crawling | search engines |
| `_headers` | Security headers and cache policy | Netlify, Cloudflare Pages |
| `_redirects` | Path fallback to the page | Netlify, Cloudflare Pages |
| `netlify.toml` | Domain level redirects | Netlify only |
| `.htaccess` | HTTPS, domain redirects, headers | Apache hosts only |

Every platform ignores the config files meant for the others, so the folder can be uploaded as it stands to any of them.

## Fonts are served from this origin

Both families are under the SIL Open Font License, subset to Latin and Latin Extended, 226 KB in total. There is no request to Google Fonts and no third party request of any kind on this page. For a company whose proposition is that data does not leave, a page that announces every visitor to an American font server would have been an odd first impression. Keep it that way if the page grows.

## The audio bed

Eighty seconds of piano, written for this page, so no composition and no recording is licensed from anyone. It is served from this origin for the same reason the fonts are.

Four properties are deliberate and none of them should be traded away for convenience.

**It is silent until asked.** No autoplay, and not muted autoplay either. The control carries the label Listen, and the page makes no sound before it is pressed. Every current browser blocks unmuted autoplay anyway, but the point here is the choice rather than the constraint.

**It remembers nothing.** No cookie, no `localStorage`, no `sessionStorage`. A visitor who turns the sound on and comes back tomorrow starts from silence. This keeps the page outside the consent conversation entirely, which is the right posture for a company whose proposition is that nothing leaves.

**It downloads nothing until asked.** `preload="none"` on the audio element, so the 0.9 MB is fetched on the click and not on the visit.

**The control appears only if it can work.** `assets/audio-toggle.js` checks `canPlayType` and unhides the button only on a browser that can play one of the two files. The button ships with the `hidden` attribute set, so a visitor with JavaScript off sees the page exactly as it was before, with no dead control in the footer.

### What the Content Security Policy has to allow

This matters, and it fails silently in a way local testing will not show, because `file://` does not enforce the header.

GitHub Pages cannot set response headers at all, so on this deployment there is no policy and the audio simply works. **On any of the three routes below there is one, and as written it blocks this feature completely.** The policy in `_headers` and in `.htaccess` starts `default-src 'none'` and names no `media-src` and no `script-src`, so the browser refuses to fetch the audio file and refuses to run the toggle.

Before deploying anywhere other than GitHub Pages, extend the policy in **both** files, they each carry their own copy:

```
default-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline';
font-src 'self'; media-src 'self'; script-src 'self'; base-uri 'none';
form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests
```

Only `media-src 'self'` and `script-src 'self'` are added. Do not add `'unsafe-inline'` to `script-src`. The script is an external file precisely so that it never has to be, and the page is otherwise script free.

While there, give the audio a cache policy alongside the fonts, one week rather than a year, because the filename carries no content hash:

```
/assets/audio/*
  Cache-Control: public, max-age=604800
```

Neither file exists in the GitHub Pages repository, so this is a step for the day the site moves, not for today.

## Route A, bunny.net, Slovenia

The European option, and the one that fits the positioning. Roughly a euro a month at this size.

1. Create a **Storage Zone**, main region Europe. Upload the contents of this folder into its root.
2. Create a **Pull Zone** with the Storage Zone as origin.
3. Under **Hostnames**, add `freehold.works` and every other domain you hold. Turn on the free Let's Encrypt certificate for each.
4. Under **Edge Rules**, add one rule per secondary domain: trigger on request URL containing that host, action Redirect To with `https://freehold.works/` and status 301.
5. In Hover, DNS management for each domain, add a `CNAME` for `www` and an `ALIAS` or `ANAME` at the apex, both pointing at the Pull Zone hostname bunny gives you. If Hover offers no apex alias, use the A records bunny lists instead.

## Route B, Infomaniak, Switzerland

Classic hosting, from roughly 6.50 per month. Verified pricing January 2026, check before you buy.

1. Order Web Hosting, add `freehold.works` as the primary site.
2. Upload the contents of this folder by FTP or SFTP into the web root. `.htaccess` does the HTTPS forcing, the domain redirects and the headers.
3. Add the other domains to the same hosting as aliases. `.htaccess` rule 2 catches them.
4. Enable the free Let's Encrypt certificate for every domain.
5. In Hover, point the nameservers or the A records at Infomaniak per their instructions.

## Route C, Cloudflare Pages or Netlify

Fastest by some distance, both American.

**Netlify.** Drag this folder onto the deploys page. In Domain management add all the domains and set `freehold.works` as primary, which makes Netlify redirect the others automatically. `netlify.toml` covers the same ground explicitly. Certificates are automatic.

**Cloudflare Pages.** Create a project with direct upload and drag this folder in. Add each domain under Custom domains. Cloudflare Pages does **not** read hostname rules from `_redirects`, so add a Redirect Rule per secondary domain in the dashboard instead, or a Bulk Redirect list.

## Hover, the part that is the same on every route

Hover is the registrar, not the host. It gives you DNS and nothing to upload to.

Do **not** use Hover's own domain forwarding for the secondary domains. It issues a 302 rather than a 301, and it does not work over HTTPS, so a visitor typing the `.eu` would land on an insecure redirect. Point every domain at the host and let the host redirect with a certificate on each.

Where the host is one of the forty odd services Hover knows, its **Connect** feature writes the DNS records for you. Otherwise add them by hand under DNS management.

## Before it goes live

- [ ] `hello@freehold.works` exists and is monitored.
- [ ] Trademark clearance for Freehold Works. Section 24 of the brand book makes a formal search at EUIPO, BOIP and the national registers in classes 9, 42 and 35 a precondition for external use, and it has not been started. A public page is external use in its most irreversible form.
- [ ] The founders group has seen the page.
- [ ] Confirm the full list of domains, so the redirect rules cover all of them.
