# AugCipher Tech — Official Website

Modern, responsive company website for **AugCipher Tech**, an IT startup that builds custom software and provides web services.

## Highlights
- Hero with animated typing headline and live-looking ERP dashboard mockup
- Services: web, custom software, mobile apps, UI/UX, cloud/DevOps, SEO, AI & automation, integrations, maintenance
- Products with category filter: **ERP** (in development), POS, Restaurant, E-commerce, Pharmacy, HRM, School, Hospital, Courier/Logistics
- Portfolio featuring [oab-express.com](https://oab-express.com)
- Process timeline, industries, why-us, engagement models, FAQ, CTA
- Contact form (opens the visitor's email client prefilled) + floating WhatsApp button
- Dark / light theme, scroll-reveal animations, mobile menu, reduced-motion support
- Zero dependencies — plain HTML, CSS and JavaScript

## Structure
```
index.html
assets/
  css/style.css
  js/main.js      ← edit CONFIG at the top for email / phone / WhatsApp
  img/logo.svg
```

## Run locally
Just open `index.html` in a browser, or:
```bash
npx serve .
# or
python3 -m http.server 8000
```

## Customise
1. Update `CONFIG` in `assets/js/main.js` with your real email, phone and WhatsApp number.
2. Replace the social links (`href="#"`) in the footer of `index.html`.
3. Swap `assets/img/logo.svg` with your final logo if you have one.

## Deploy
Static site — works on GitHub Pages, Netlify, Vercel, Cloudflare Pages or any shared hosting (upload the files to `public_html`).

---
© AugCipher Tech

## Image credits
ERP and POS card photos are from [Unsplash](https://unsplash.com) (free to use under the Unsplash License):
- `work-erp.webp` — https://unsplash.com/photos/1460925895917-afdab827c52f
- `work-pos.webp` — https://unsplash.com/photos/1556740758-90de374c12ad
