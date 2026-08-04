# Modifications inventory (Apache-2.0 §4(b))

This package is a **Bao**-branded customization of the Ping Business
merchant-store UI. Source of origin: `PingBusiness/PingBusiness`, branch `main`,
commit `cfb4501f05ab5461dfc2ed17ef82250d71c0ce77`, path
`merchant-store-vibe-coding-kit/source/merchant-store/`.

All changes are presentation-only. No API endpoint, payload, authentication,
token-refresh, cart-revalidation, checkout/subscription, status-polling, runtime
`ESTORE_APP_PUBLIC_URL` config, Dockerfile, entrypoint, Apache config, or
`/healthz` behavior was altered.

## Modified Ping Business-originated files

| File | Nature of change |
| --- | --- |
| `angular.json` | Added `src/styles-fonts.css` to the global `styles` array. |
| `src/index.html` | Title/description/theme-color/OG meta; Bao favicons + apple-touch icon; replaced the Google Fonts CDN `<link>` with same-origin font preloads; added a branded boot splash inside `<app-root>` and a `<noscript>` notice. Runtime-config `<script>` and `<base href>` preserved. |
| `src/styles.css` | Re-themed all design tokens (violet `#693EFE` primary, lime `#D3FE3E` accent, cool neutral ramp), switched type to Space Grotesk + Inter, tuned semantic colors to WCAG 2.2 AA, added keyboard focus-visible rules, `.visually-hidden`/`.skip-link` helpers, the global footer, the boot splash, and a reduced-motion block. All prior selectors preserved. |
| `src/favicon.ico` | Replaced the PingBiz icon with the Bao mark (16/32/48/64). |
| `src/assets/logo.svg` | Replaced the PingBiz logo with the Bao logo lockup. |
| `src/app/app.component.html` | Added a skip-link, `id="main-content"` + `tabindex="-1"` on `<main>`, and `<app-footer>`. |
| `src/app/app.module.ts` | Declared the new `FooterComponent`. |
| `src/app/home/home.component.html` | Replaced demo hero tagline with brand-neutral copy; hero CTA label → "Shop the collection". |
| `src/app/home/home.component.css` | Re-themed hero gradient (violet + lime glow), accessible light-violet hero title, readable tagline, lime hero CTA, violet section-heading marker. |
| `src/app/components/header/header.component.html` | Added the Bao mark next to the (still API-driven) store wordmark. |
| `src/app/components/header/header.component.css` | Styles for `.brand`, `.brand-mark`, `.brand-name`. |
| `src/app/components/input-field/input-field.component.css` | Strengthened the focus-within indicator to a violet underline (WCAG 2.2 Focus Visible). |
| `src/app/account/account.component.css` | Added a `:focus-visible` ring to the inline profile-edit input. |
| `src/app/cart/cart.component.css` | Added a `:focus-visible` ring to the quantity input. |

## Added files

| File | Origin / license |
| --- | --- |
| `src/styles-fonts.css` | New (Bao) — `@font-face` declarations for the self-hosted fonts. |
| `src/app/components/footer/footer.component.ts` / `.html` | New (Bao) — global footer; store name is API-driven (no hardcoded literal). |
| `src/assets/bao-mark.svg` | New (Bao) — brand mark, also used as the SVG favicon. |
| `src/assets/apple-touch-icon.png` | New (Bao) — 180×180 iOS icon. |
| `src/assets/og-image.png` | New (Bao) — 1200×630 social-share image. |
| `src/assets/fonts/*.woff2` (18 files) | Third-party — Inter & Space Grotesk subsets, SIL OFL 1.1. |
| `src/assets/fonts/OFL.txt` | Third-party — bundled OFL 1.1 license + copyright notices. |
| `MODIFICATIONS.md`, `DESIGN_REPORT.md`, `HANDOFF.md`, `TRADEMARKS.md`, `THIRD_PARTY_NOTICES.md` | Package documentation / legal files. |

## Removed

- The external Google Fonts CDN `<link>`/`preconnect` in `src/index.html`
  (replaced by same-origin self-hosted fonts). No source files were deleted.

## Explicitly unchanged (functional/deployment surface)

`Dockerfile`, `docker-entrypoint.sh`, `docker/apache-angular.conf`,
`src/assets/runtime-config.js`, `src/assets/healthz`, `src/app/app.configs.ts`,
`src/app/app.constants.ts`, `src/app/services/*`, `src/app/**/{checkout,subscription-checkout,cart,catalog,product,orders,order-detail,subscriptions,account,signin,signup}.component.ts`,
routing, guards, and all API/`app.types.ts` contracts.
