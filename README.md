# Ellie Studio

A warm, minimal static website for Ellie Studio, a Toronto website design and development service for small businesses.

## Features

- Responsive multi-page layout
- Clickable rotating client website previews
- Dedicated Home, Services, Pricing, FAQ, and Contact pages
- Accessible FAQ accordions
- Contact inquiry form
- Scroll reveal animations with reduced-motion support
- SEO-focused metadata and structured FAQ data

## Run Locally

Open `index.html` directly, or serve the folder with any static HTTP server.

```powershell
npx serve .
```

## Project Structure

- `index.html` - Home page
- `services.html` - services and process
- `pricing.html` - packages and pricing notes
- `faq.html` - frequently asked questions and FAQ schema
- `contact.html` - project inquiry form
- `site.css` - unified design system and responsive styles for every page
- `assets/js/site-components.js` - shared header and footer components used by every page
- `script.js` - navigation and reveal behavior
- `assets/js/showcase-rotator.js` - data-driven homepage showcase rotation
- `assets/` - logos, doodles, icons, and website previews
- `docs/COLOR-SYSTEM.md` - palette roles and usage guidance
- `docs/SITE-STRUCTURE.md` - page ownership and navigation map

## Deployment

The site is fully static and can be deployed through GitHub Pages, Netlify, Vercel, or another static host.
