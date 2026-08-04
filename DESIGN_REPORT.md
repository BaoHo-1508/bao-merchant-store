# Merchant-store design report — Bao

## Source

- **Vibe-kit repository / pinned commit:** `https://github.com/PingBusiness/PingBusiness`,
  branch `main`, commit `cfb4501f05ab5461dfc2ed17ef82250d71c0ce77` (2026-08-03).
- **Customized UI:** `merchant-store/` in this package, derived from
  `merchant-store-vibe-coding-kit/source/merchant-store/` at the commit above.
- **Design date:** 2026-08-04.
- **Scope:** `source/merchant-store/` only. `estore-app`, Keycloak, database,
  deployment adapters, and central payment logic were not touched. The obsolete
  `/estore-ui` tree was not used.

## Merchant direction

- **Store / brand name:** Bao. Rendered from the store API at runtime in the
  header, hero, and footer (never hard-coded — the kit's guard comments against a
  store-name flash on reload were respected). The static document `<title>` and
  brand imagery are Bao-specific.
- **Design goals:** a polished, responsive, accessible modern storefront that is
  bold and energetic without sacrificing legibility or the trust cues a checkout
  flow needs.
- **Approved colours:** primary `#693EFE` (violet), secondary/accent `#D3FE3E`
  (lime). Built into a full tonal system (below).
- **Typography (designer's choice):** **Space Grotesk** for display/headings and
  **Inter** for body/UI — both SIL OFL 1.1, **self-hosted** (the reference kit's
  Google Fonts CDN link was removed) so the browser makes no third-party font
  request, matching the kit's same-origin trust posture.
- **Assets (designer's choice):** a purpose-built Bao mark ("b." tile), logo
  lockup, favicon set (`.ico` 16/32/48/64 + SVG), a 180px apple-touch icon, and a
  1200×630 social-share image. All are original vector work created for this
  package; no merchant-supplied or inspiration-only assets were shipped. (The
  merchant said brand assets would be supplied separately — none were attached, so
  original marks were created and can be swapped when the merchant provides them.)
- **Layout/content decisions:** kept the existing information architecture and all
  routes. Enhancements: a Bao mark beside the store wordmark; a re-themed hero
  with a lime call-to-action; a brand section marker; a new global site footer;
  a branded first-paint boot splash; a skip-link and stronger keyboard focus.

## Design tokens

All tokens live in `src/styles.css` (`:root`); components reference them and never
hard-code a colour. Key values:

| Token | Value | Role |
| --- | --- | --- |
| `--color-brand` | `#693EFE` | Primary violet — links, primary CTAs, focus, active nav, badges |
| `--color-brand-strong` | `#5A2BE6` | Hover/darker violet |
| `--color-brand-300` | `#9B7BFF` | Light violet — hero title on dark |
| `--color-accent` | `#D3FE3E` | Lime — hero CTA, footer accents (fills w/ dark ink, or text on dark) |
| `--color-accent-ink` | `#1B2400` | Dark ink placed on lime fills |
| `--color-fg` | `#141020` | Body ink (faintly violet-tinted) |
| `--color-fg-muted` | `#6A6678` | Secondary text (AA on white) |
| `--color-canvas` / `--color-surface` | `#FBFAFF` / `#FFFFFF` | Page / card |
| `--font-display` / `--font-sans` | Space Grotesk / Inter | Headings / body |

**Accent usage rule (documented in the CSS):** lime `#D3FE3E` has ~1.17:1 contrast
on white, so it is used **only** as a fill behind dark ink (~16:1) or as a
detail/text colour on dark surfaces — never as a foreground on a light background.

## Implemented changes

- **Global theme (`src/styles.css`)** — re-themed every token, applied the dual
  typeface, tuned semantic colours to AA, and added `:focus-visible` rules,
  `.visually-hidden` / `.skip-link` helpers, the global footer, the boot splash,
  and a `prefers-reduced-motion` block. Every pre-existing selector was preserved.
- **Fonts (`src/styles-fonts.css`, `src/assets/fonts/`)** — 18 self-hosted
  `woff2` subsets (latin / latin-ext / vietnamese) with `font-display: swap`;
  OFL license bundled at `src/assets/fonts/OFL.txt`.
- **`src/index.html`** — Bao `<title>`, description, `theme-color`, OG tags,
  favicons + apple-touch icon, same-origin font preloads (CDN link removed),
  branded boot splash, and a `<noscript>` notice. The `runtime-config.js`
  `<script>` and `<base href="/">` are unchanged.
- **Header** — Bao mark added beside the API-driven store wordmark (Space Grotesk).
- **Home / hero** — violet + lime gradient, accessible light-violet title,
  readable tagline (brand-neutral placeholder copy), lime CTA, violet section marker.
- **Footer (new `FooterComponent`)** — brand, shop/account navigation (valid
  routes only), and a dynamic `© <year> <store name>` line. Store name is
  API-driven like the header.
- **Accessibility** — skip-link + focusable `<main>`; visible keyboard focus rings
  across links/buttons/inputs, including the inline cart-quantity and profile-edit
  fields that previously suppressed focus; reduced-motion support.
- **Product cards, catalog, cart, checkout, account, orders, subscriptions** —
  restyled purely through the shared tokens; no template/logic changes.

**Runtime configuration preserved.** `ESTORE_APP_PUBLIC_URL` remains the runtime
contract: `src/assets/runtime-config.js` → `window.__PINGBUSINESS_CONFIG__.apiUrl`
→ `APP_URL` (`app.configs.ts`) → same-origin `/api` default. No production host is
compiled into TypeScript. `Dockerfile`, `docker-entrypoint.sh`,
`docker/apache-angular.conf`, and `src/assets/healthz` are unchanged.

## Functional invariants (preserved — presentation-only change)

No service, interceptor, guard, route, payload, or `app.types.ts` contract was
modified (see `MODIFICATIONS.md`). The following behaviors are therefore intact:

- **Auth & refresh** — `KeycloakService` calls `estore-app` login/refresh/logout;
  session in `sessionStorage`; refresh failure clears session. Unchanged.
- **Catalogue / product / media / download** — `EstoreApiService` GETs
  `/store`, `/products`, `/product/:id`, `/inventories`, `/image/:id`,
  `/download`; object URLs revoked. Unchanged.
- **Inventory-aware cart** — cached cart values are hints; product + inventory are
  re-read before checkout; recurring products excluded from ordinary checkout.
  Unchanged.
- **Ordinary checkout** — `POST /checkout` with `response_mode: "json"`, then a
  controlled popup form-post of the exact returned `action_url`/`fields`.
  Unchanged.
- **Recurring subscription** — `POST /subscribe` single-product flow with its
  separate controlled popup/iframe HTML fallback. Unchanged.
- **Authoritative completion** — only authenticated `/checkout/status/{id}`
  polling determines success/failure; `postMessage` is a wake-up hint only
  (`PINGBIZ_ESTORE_CHECKOUT_COMPLETE` sentinel preserved). Unchanged.
- **Orders / payments** — customer-scoped reads only; no client-created orders,
  payments, or inventory writes. Unchanged.
- **SPA routing & `/healthz`** — Apache rewrite and health endpoint unchanged.

## Validation evidence

Environment: Node v22.15.0, npm 10.9.2, macOS. Commands run from `merchant-store/`.

| Check | Command / environment | Result | Evidence |
|---|---|---|---|
| Clean install | `npm ci` | **PASS** | 408 packages added, ~22 s, no errors. |
| Production build | `npm run build:prod` | **PASS** | Bundle generated; initial total **581 KB raw / 136 KB transfer**; **no budget warnings** (all component styles under the 6 KB warning / 10 KB error caps after minification). |
| Type check | `npx tsc -p tsconfig.app.json --noEmit` | **PASS** | Exit 0, no diagnostics. |
| Frontend secret scan | `python3 ../../scripts/scan-frontend-secrets.py .` and `… src` | **PASS** | "frontend contains no server credential names or likely embedded secrets" on both the source tree and the built bundle. |
| Build output integrity | inspected `dist/` | **PASS** | `assets/runtime-config.js`, `assets/healthz` (`ok`), Bao `favicon.ico`, all 18 fonts + `OFL.txt`, and Bao icons all emitted; font `url()`s resolve to `/assets/fonts/…`. |
| Responsive & accessibility | preview at 390 / 768 / 1280 px + keyboard | **PASS (visual)** | Verified below. |
| Runtime API injection | preview with `apiUrl:'/api'` | **PASS (mechanism)** | See note. |
| Live checkout / subscription / auth against real `estore-app` | — | **NOT RUN** | Requires the merchant's estore-app + identifiers/API key + a Docker daemon, none available in this session. Code paths are unchanged; the merchant runs the live preview via `HANDOFF.md`. |

**Responsive / accessibility detail.** The built app was served locally (with a
throwaway mock `/api` used only to populate a store name and product cards — not
part of the deliverable) and inspected at desktop (1280) and mobile (390):
- Header collapses to a hamburger below 820 px; product grid goes 4→3→2 columns;
  footer collapses to a single column on narrow mobile.
- Keyboard focus is visible on links, buttons, and inputs; focused fields show a
  violet underline/ring; the enabled/disabled primary-button states render
  correctly (empty auth form disables "Log In").
- Contrast tuned to WCAG 2.2 AA: `#693EFE` on white ≈ 5.6:1; white on `#693EFE`
  ≈ 5.6:1; dark ink on lime ≈ 16:1; muted text darkened to ≈ 5.5:1; toast/status
  greens and blues darkened so both white-on-fill and text-on-white pass ≥ 4.5:1.
- `prefers-reduced-motion` neutralises animations/transitions; the boot-splash
  pulse and toast transitions respect it.

**Runtime API injection note.** The same-origin mechanism was exercised in the
preview by setting `apiUrl:'/api'`, and the app issued its calls to `/api/*`. The
container-level rewrite performed by `docker-entrypoint.sh` at startup was not run
in this session (no Docker daemon); that file is unchanged from the reference kit
and is exercised by the `HANDOFF.md` preview.

## Deployment handoff

- **UI source package:** this `merchant-store/` tree (the Docker build context).
- **Dockerfile:** `merchant-store/Dockerfile` (unchanged; multi-stage
  `node:22-alpine` → `httpd:2.4-alpine`, image `HEALTHCHECK` retained).
- **Container port:** `80`.
- **Health endpoint:** `/healthz` (returns `200`).
- **Runtime variable:** `ESTORE_APP_PUBLIC_URL=/api` (same-origin default).
- **Next step:** `HANDOFF.md` — run the local Docker-Compose preview with your
  merchant/store identifiers and API key, review, iterate, then deploy via a kit
  adapter (Qovery / Northflank / Railway / Coolify).

## Remaining merchant decisions

1. Supply the **merchant/store identifiers + merchant API key** to run the live
   preview and any deployment (kept out of the design per the kit rules).
2. Provide **your own brand assets** if you want them to replace the original Bao
   marks generated here, and **product images** in the catalogue (cards fall back
   to a lettered placeholder without them).
3. Confirm or edit the **hero tagline** copy in
   `src/app/home/home.component.html` (currently brand-neutral placeholder).
4. Optional: real **Terms/Privacy** links + support email for the footer, and a
   production **absolute** `og:image` URL for social-share previews.
