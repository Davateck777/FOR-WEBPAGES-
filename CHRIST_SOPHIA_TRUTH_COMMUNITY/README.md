# The Hard Numbers — community pages

Static, no build step. Serve the folder (GitHub Pages, Netlify, `python3 -m http.server`).

## Pages (categorised page-by-page)
| File | Category | Topic |
|---|---|---|
| `index.html` | 🧭 Hub | Library landing page, links every topic |
| `gender-gap.html` | 📊 Demographics & Conflict | The 42 Million Gap — global sex ratio, youth bulge, "bare branches" |
| `christa-pike.html` | ⚖️ Crime & Justice | Christa Pike survived her execution (CNN, 1 Oct 2026) |

Shared `style.css` + `script.js` across all pages. Every JS module no-ops if its
section isn't on the current page, so adding a new topic page is just: copy a page,
change the content, add a card to `index.html`.

## Before going live — edit the CONFIG block at the top of `script.js`
| Key | What to paste |
|---|---|
| `WHATSAPP_GROUP_LINK` | your public WhatsApp group invite link |
| `FORM_CONTACT` | Formspree endpoint for name + email + WhatsApp number |
| `FORM_POST` | Formspree endpoint for "post valuable info" |
| `FORM_COMMENT` | Formspree endpoint for comments |
| `FORM_SESSION` | Formspree endpoint for visitor-session tracking |

Until those are filled in the forms run in **demo mode** (fully interactive, nothing sent).

## Features
Info banners + particle canvas · infographics · visual slides · expandable cards ·
interactive canvas animations (bare-branches simulator; faltering-heartbeat trace) ·
post-info form · contact form that reveals the WhatsApp link instantly on submit ·
like/heart buttons · per-page comment sections · session tracking incl. which pages were
seen · fully responsive · no UTM tags, no ad pixels.

## Images
Stored in `images/`, served locally (no hotlinking). Every image carries a visible
caption + credit in the page, and a combined credit line in each page's Sources block.

| File | Subject | Credit |
|---|---|---|
| `pike-tdoc-photo.webp` | Christa Pike, TDOC inmate photo | Tennessee Dept. of Correction, via BBC News |
| `pike-court-2007.jpg` | Pike entering Knox County Criminal Court, 4 Dec 2007 | J. Miles Cary / Knoxville News Sentinel / USA TODAY NETWORK via Reuters |
| `witnesses-presser-ap.jpg` | Media witnesses, Nashville, 30 Sep 2026 (Colleen Slemmer's photo on easel) | Associated Press, via NPR |
| `witness-podium-lookout.jpg` | Witnessing reporter at the podium | Tennessee Lookout |
| `riverbend-aerial.png` | Riverbend Maximum Security Institution, Nashville | US Prison Guide |
| `owid-sex-ratio-birth-2023.png` | Sex ratio at birth, 2023 (world map) | Our World in Data (CC BY) |
| `pew-sex-ratio-birth.png` | Most male-biased sex ratios at birth, 2000–2020 | Pew Research Center / UN World Population Division |

Reproduced for news reporting and commentary. Swap any file out if you need
different licensing for your deployment.
