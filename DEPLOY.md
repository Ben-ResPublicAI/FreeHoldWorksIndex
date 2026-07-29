# Freehold holding page, deployment

Primary domain: **freehold.works**. Every other domain redirects to it, 301, path preserved.

## Folder contents

| File | Purpose | Read by |
|---|---|---|
| `index.html` | The page. Self contained apart from the fonts. | everything |
| `fonts/` | Five woff2 files, Inter Tight 400, 500, 700 and Source Serif 4 400, 600 | `index.html` |
| `freehold-share.png` | Link preview image, 1200 by 630 | social platforms |
| `robots.txt`, `sitemap.xml` | Crawling | search engines |
| `_headers` | Security headers and cache policy | Netlify, Cloudflare Pages |
| `_redirects` | Path fallback to the page | Netlify, Cloudflare Pages |
| `netlify.toml` | Domain level redirects | Netlify only |
| `.htaccess` | HTTPS, domain redirects, headers | Apache hosts only |

Every platform ignores the config files meant for the others, so the folder can be uploaded as it stands to any of them.

## Fonts are served from this origin

Both families are under the SIL Open Font License, subset to Latin and Latin Extended, 226 KB in total. There is no request to Google Fonts and no third party request of any kind on this page. For a company whose proposition is that data does not leave, a page that announces every visitor to an American font server would have been an odd first impression. Keep it that way if the page grows.

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
