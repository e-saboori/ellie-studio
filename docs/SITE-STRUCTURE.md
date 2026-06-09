# Ellie Studio Site Structure

Ellie Studio uses a static multi-page structure. Each main navigation item has a dedicated HTML document.

## Pages

| Navigation label | File | Content |
| --- | --- | --- |
| Home | `index.html` | Hero, client website showcase, and audience-fit guidance |
| Services | `services.html` | Service cards and the four-step delivery process |
| Pricing | `pricing.html` | Three website packages, inclusions, and pricing notes |
| FAQ | `faq.html` | Accessible FAQ accordions and FAQ structured data |
| Contact | `contact.html` | Project inquiry form |

The About section has intentionally been removed and does not have a standalone page.

## Shared Navigation

Every page uses the same navigation order:

1. Home
2. Services
3. Pricing
4. FAQ
5. Contact

The current page is identified with `aria-current="page"` and the existing active-link style.

## Shared Assets

- `styles.css` contains the shared design system and responsive page layouts.
- `script.js` controls the mobile menu, homepage showcase, internal anchor offsets, and scroll reveals.
- `assets/` contains the shared icons, decorative SVG files, and images.

