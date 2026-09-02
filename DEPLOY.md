# Freehold holding page, deployment

Primary domain: **freehold.works**. Every other domain redirects to it, 301, path preserved.

## What serves this site today

**GitHub Pages, from this repository, `Ben-ResPublicAI/FreeHoldWorksIndex`, branch `main` at `/`.** The `CNAME` file holds `freehold.works` and HTTPS is enforced. That is the live arrangement and has been since the site went up.

**Routes A, B and C below were written before that choice and none of them is in use.** They are kept because they are worked out and would each still function, so they are the fallback if GitHub Pages ever stops being the right host. **Read them as alternatives, not as instructions.** Anyone following Route A today would configure a second copy of the site at a host that serves nobody.

Two consequences of being on GitHub Pages rather than on one of those three. `_headers`, `_redirects` and `netlify.toml` are read by nobody here, and `.nojekyll` is required so that files and folders beginning with an underscore are published. Both are listed in the table below.

Deploying is `git push origin main`. **Verify against the served bytes and never against the build status alone**, because a bare status query passes against the previous build. `00_System/scripts/freehold_site_check.py --verify` in Ben's vault does this properly, matching on the commit SHA first.

## Folder contents

| File | Purpose | Read by |
|---|---|---|
| `index.html` | The English front page. Self contained apart from the fonts. | everything |
| `nl.html` | The Dutch front page. Linked from `index.html` by an `NL` button, and back by `EN` | everything |
| `for-the-press.html`, `voor-de-pers.html` | Press information, English and Dutch. Linked from both front pages | everything |
| `how-it-works.html`, `hoe-het-werkt.html` | The long explanation, English and Dutch. **Live but unlinked and out of the sitemap**, by decision of 2 September 2026 | anyone with the URL |
| `more.html` | The arrangement at greater length. **Live but unlinked and out of the sitemap**, and the one page with no Dutch counterpart | anyone with the URL |
| `CNAME` | The custom domain, `freehold.works` | GitHub Pages |
| `.nojekyll` | Stops Jekyll processing, so underscore paths publish | GitHub Pages |
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

## The audio bed, removed 2 September 2026

The page carried an opt in audio bed with a Listen control in the footer. Ben had it removed from both languages. The markup, the CSS, the toggle script and the two audio files are gone from the working tree and remain in git history if it is ever wanted back.

**One consequence for the alternative routes below.** They each ship a Content Security Policy that had to be widened for `media-src` and `script-src` to let the audio work. That is no longer needed, and the policy can go back to being strict.

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
- [ ] Trademark clearance for Freehold Works. Section 24 of the brand book makes a formal search at EUIPO, BOIP and the national registers in classes 9, 42 and 35 a precondition for external use, and it has not been started. **The site is nonetheless live and shared, on Ben's decision of 2 September 2026.** The ground he gave is the patent: application 26202295.7 was filed on 1 September 2026 and the invention is patent pending, which protects the working during an examination period that can run over a year. **That is the invention and not the name.** Trademark clearance is a separate question and it stays open, knowingly.
- [ ] The founders group has seen the page.
- [ ] Confirm the full list of domains, so the redirect rules cover all of them.
