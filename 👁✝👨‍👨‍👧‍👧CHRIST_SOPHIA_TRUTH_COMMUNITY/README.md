# The 42 Million Gap — community webpage

Single-page, no build step. Open `index.html` or host the folder anywhere (GitHub Pages, Netlify…).

## Before going live — edit the CONFIG block at the top of `script.js`
| Key | What to paste |
|---|---|
| `WHATSAPP_GROUP_LINK` | your public WhatsApp group invite link |
| `FORM_CONTACT` | Formspree endpoint for name + email + WhatsApp number |
| `FORM_POST` | Formspree endpoint for "post valuable info" |
| `FORM_COMMENT` | Formspree endpoint for comments |
| `FORM_SESSION` | Formspree endpoint for visitor-session tracking |

Until those are filled in the forms run in **demo mode** (everything works visually, nothing is sent).

## Features
Info banner + animated particle canvas · infographic (bars, 100-person grid, age flip) · 5 visual slides ·
6 expandable risk cards · interactive "bare branches" canvas simulator · post-info form · contact form that
reveals the WhatsApp group link instantly on submit · like/heart buttons · comment section (persisted in
localStorage + emailed via Formspree) · session tracking (id, visits, time on page, scroll depth, device) ·
fully responsive · no UTM tags, no ad pixels.
