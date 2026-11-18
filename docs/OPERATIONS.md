# Local Development, CI, Release and Recovery Runbook

## Prerequisites
Node.js 22+, Git, a recent Chromium browser and editor. Supported baseline OS: Windows PowerShell and Linux shell. No cloud or paid API credentials are needed to run the initial scaffold.

## First run
~~~powershell
git clone https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library.git
cd Taiyous-Anime-Library
npm ci
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run dev
~~~
Use the local URL printed by Vite. The catalogue is synthetic only and resets after a refresh. If a step fails, inspect the error and Node version; do not suppress type failures or remove tests to pass CI.

## Dependency lock and deterministic installation
A genuine Node 22 GitHub Actions npm install generated the committed `package-lock.json` (lockfileVersion 3), including Playwright. CI and new checkouts now use `npm ci --no-audit --no-fund`; review integrity and advisories before releases. To intentionally update dependencies, use trusted `npm install`, inspect the lockfile diff and execute all gates.

## Branches and PRs
`master` is the authoritative planned release branch. Use `feature/<topic>` or `fix/<topic>` from latest master. Keep scope narrow. Include problem statement, exact files, threat/sync impact, tests, screenshots if UI changed and rollback. Avoid editing unrelated repositories. Do not force push master.

## CI and deployment
`.github/workflows/ci.yml` runs reproducible npm ci, TypeScript, Vitest, production build and Playwright Chromium keyboard/viewport tests on Ubuntu 24.04. It does **not** publish artifacts to a live app, connect to Hugging Face, or deploy Pages. A future Cloudflare Pages project requires explicit owner authorisation, environment separation, secrets stored server-side, an explicit manual production gate, restore plan and verified private media access.

## Configuration
The only reserved public config is `VITE_HUB_URL`. Vite exposes `VITE_*` values to browsers, so never store OAuth client secrets, private storage tokens or owner passwords there. Keep local secrets in excluded files and Cloudflare server-side secret storage after approval.

## Data and backup
No real catalogue store exists yet. Before adding one: specify schemaVersion, revision checks, backup/restore, offline fallback, cache eviction, storage quotas and import size limits. Test restores using synthetic data and document retention. No destructive bulk migration without owner sign-off.

## Rollback
For code: revert the PR or redeploy the last known good tested commit. For a future dataset migration: stop writes, verify an immutable pre-migration backup, restore in a disposable environment first, and then restore production with explicit owner approval. Never treat 'delete and recreate dataset' as recovery.

## Operational checklist
Check build, mobile accessibility, empty/error/offline states, CSP, provider quota/rate limits, private asset authorisation, logs redaction, cache versions, two-device conflict behaviour and any cost implications. Document actual results before claiming production readiness.
