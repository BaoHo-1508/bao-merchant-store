# Bao storefront — handoff

Your customized store is this `merchant-store/` tree. It is a complete,
production-buildable Angular application. This document is the single next step
to **see it running on your own machine** before any real deployment.

## What this package is

- The customized **UI only** (Angular 18). It is the build context for the
  reference `Dockerfile`.
- It keeps the reference runtime contract unchanged: it serves on **port 80**,
  answers **`/healthz`**, and reads its backend URL at container start from
  **`ESTORE_APP_PUBLIC_URL`** (default `/api`, same-origin). Nothing in the
  browser code hard-codes a host or contains any secret.

The package intentionally does **not** vendor the deployment stack
(`deployment/`, `keycloak/`, `scripts/`, `estore-app`, …). You obtain those by
cloning the kit, exactly as below — every platform adapter clones the kit from
its published repository at deploy time.

## See it running locally (Docker Compose)

The preview needs a running `estore-app`, which needs your **merchant
identifier**, **store identifier**, and **merchant API key**. Those are not part
of the design brief and are not in this package. Put them only into the `0600`
file the generator writes — never into the UI, the Compose file, chat, or logs.

The easiest path is the launcher: open the **Deploy store** tab, choose **Local
preview (Docker Compose on my machine)** as the hosting platform, set UI source
to **I will attach the customized UI ZIP**, fill in your identifiers, generate
the prompt, and attach this package.

Or run the same commands directly:

```bash
# 1) The package ships the UI only; the stack comes from the kit.
git clone https://github.com/PingBusiness/PingBusiness.git
cd PingBusiness/merchant-store-vibe-coding-kit

# 2) storeDomain must be "localhost" and platform must be "compose".
#    Fill deployment-input.json with your merchant/store identifiers + API key.
python3 scripts/prepare-deployment.py --input deployment-input.json --local --output-dir .generated

# 3) Point the build context at THIS unzipped UI tree, then bring the stack up.
cd deployment/compose
MERCHANT_STORE_BUILD_CONTEXT=/path/to/unzipped/merchant-store \
  docker compose --env-file ../../.generated/compose.env -f compose.yaml up --build -d

# 4) Smoke-test the running store.
python3 ../../scripts/public-smoke-test.py --store-url http://localhost
```

Open `http://localhost`. `--local` is compose-only, accepts `localhost`, and
serves plain HTTP (a local name has no DNS/certificate) — never use it for a real
store. Tear down with `docker compose -p <project> down -v`.

Treat this as a loop: look at `http://localhost`, send corrections, and the store
is rebuilt and reissued. Only once you are happy should you move to a real
deployment (Qovery / Northflank / Railway / Coolify via the kit adapters).

## Build / verify this UI on its own

```bash
cd merchant-store
npm ci
npm run build:prod        # outputs dist/pingbiz-estore-customer-ui
```

Docker (mirrors production; serves on :80 with `/healthz` and an image healthcheck):

```bash
docker build -t bao-store .
docker run --rm -e ESTORE_APP_PUBLIC_URL=/api -p 8080:80 bao-store
# then: curl -f http://localhost:8080/healthz   ->   ok
```

## What still needs your input

- **Merchant/store identifiers + API key** for the live preview (above).
- **Product images** in the Ping Business catalogue (the UI shows a lettered
  placeholder when a product has no image).
- Confirm or edit the hero tagline copy in
  `src/app/home/home.component.html` (currently brand-neutral placeholder copy).
- Optional: real **Terms/Privacy** URLs and a support email if you want them in
  the footer, and a production **absolute** `og:image` URL for social sharing.

See `DESIGN_REPORT.md` for the full change list and validation evidence.
