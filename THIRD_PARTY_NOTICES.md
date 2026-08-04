# Third-party software notices

The Apache-2.0 license in this package covers the original Ping Business
software that this customized Bao storefront is derived from. Third-party
software is not relicensed and remains under its respective upstream license.

This repository does not vendor `node_modules`, container-image filesystems, or
server binaries. Package managers and container registries retrieve those during
build or deployment.

## Direct frontend dependencies

The versions below are resolved by `package-lock.json`.

| Component | Resolved version | Upstream license |
| --- | ---: | --- |
| Angular packages (`@angular/*`) | 18.2.x | MIT |
| RxJS | 7.8.x | Apache-2.0 |
| tslib | 2.x | 0BSD |
| zone.js | 0.14.x | MIT |
| TypeScript | 5.4.x | Apache-2.0 |
| Node type declarations | 12.x | MIT |

## Bundled webfonts (self-hosted, added by the Bao customization)

The Bao customization removes the Google Fonts CDN link that the reference kit
used and instead self-hosts subsetted `woff2` webfonts under
`src/assets/fonts/`. Both families are licensed under the **SIL Open Font
License, Version 1.1**. The full license text and copyright notices are bundled
at `src/assets/fonts/OFL.txt`.

| Font family | Weights bundled | Copyright | License |
| --- | --- | --- | --- |
| Inter | 400, 500, 600, 700 | © 2016 The Inter Project Authors (https://github.com/rsms/inter) | OFL-1.1 |
| Space Grotesk | 500, 700 | © 2020 The Space Grotesk Project Authors (https://github.com/floriankarsten/space-grotesk) | OFL-1.1 |

The `woff2` files are the unmodified latin, latin-ext and vietnamese subsets
produced by the Google Fonts delivery API. No Reserved Font Name is used.

## Runtime container images (used when deploying via the kit)

The customized UI is served by the reference `Dockerfile` (multi-stage). When
built and deployed through the Ping Business kit, the following base images are
retrieved from their registries and retain their own upstream licenses:

| Image family | Purpose | Upstream licensing note |
| --- | --- | --- |
| `node:22-alpine` | Angular build stage | Node.js and bundled components retain their upstream licenses. |
| `httpd:2.4-alpine` | Static server for the built UI | Apache HTTP Server is Apache-2.0; Alpine packages retain their own licenses. |

This file is a direct-dependency inventory, not a substitute for an SBOM. Before
a production release, generate and retain dependency/container SBOMs and preserve
all upstream notices required by the exact artifacts deployed. See the kit's own
`THIRD_PARTY_NOTICES.md` for the complete backend, Keycloak, database and edge
inventory used by the full deployment.
