# CI and build evidence (18 November 2026)

## Verified baseline
- Original master scaffold SHA: `da399520ad558cbebf8336bbf35cecc3090816f2`.
- Repository is public; initial pre-run failures did not execute quality steps.
- [First running CI job](https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library/actions/runs/44315716814) **passed** Node 22 install, TypeScript, 13 Vitest tests in 3 files and Vite production build (586ms).
- [Browser-gate introduction run](https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library/actions/runs/44316183474) installed dependencies and passed typecheck, then failed because Vitest picked up Playwright's e2e/anime.spec.ts. This was a **test-discovery configuration error**, not evidence of failed browser interactions.
- During that runner installation, a lockfileVersion 3 package-lock.json was generated and captured. It contains 142 package entries, including @playwright/test 1.56.1. The dependency PR update commits this exact generated lockfile and scopes Vitest to src/.

## Current required gates
- Fresh `npm ci` on Node 22.
- `npm run typecheck`, `npm test` (Vitest src-only), `npm run build`.
- Playwright Chromium installation and `npm run test:e2e`, covering keyboard/episodes/status/filters/fictional data and five viewport widths.
- Check actual job status for the **newest** PR head SHA before claiming a passing browser gate.
- Manual screen-reader and touch-target review is still required. No real-data or production deployment approval follows from green CI.

## Boundaries
Synthetic state only; no private cloud data, authenticated user, metadata service, streaming, sync, source scraping or live release. Do not represent checks of a synthetic app as production security acceptance.
