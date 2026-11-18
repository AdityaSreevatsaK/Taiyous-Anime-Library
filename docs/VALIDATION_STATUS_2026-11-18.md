# Verification record: Anime Library, 18 November 2026

## Current accepted automated evidence
- Working branch: `feature/anime-episode-tracker-20261118`.
- Passing code SHA: `f1823f5716cf062c02e4cac33ee11f843c1208e6`.
- [GitHub Actions run 44317525755](https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library/actions/runs/44317525755): **SUCCESS**, all nine main quality steps completed.
- Node.js 22, `npm ci --no-audit --no-fund` **passed** using the committed authentic npm lockfile.
- `npm run typecheck` **passed**.
- `npm test` **passed**: 13 Vitest tests in 3 test files.
- `npm run build` **passed**: Vite 6.4.6, 518ms compile, 157.39kB JS / 50.57kB gzip and 8.16kB CSS / 2.64kB gzip.
- `npx playwright install chromium` **passed** on Ubuntu 24.04.
- `npm run test:e2e` **passed**: 9 real Chromium tests in 2.8s, including keyboard selection, no auto-backfill, specials, filters and viewport overflow at 320/375/390/768/1280px.

## Root cause history and fixes
- Initial scaffold failures pre-dated any runner step; later GitHub Actions runs executed normally. The precise original account policy cause was not independently confirmed.
- First Playwright attempt was discovered by Vitest and failed. The Vitest script now runs only src tests.
- Ubuntu-latest resolved to Ubuntu 26.04, unsupported by Playwright 1.56.1. CI pins Ubuntu 24.04.
- A Playwright install with --with-deps stalled in a later attempt; the final passing run uses system-provided dependencies plus a pinned Chromium download.
- A real Node 22 runner generated package-lock.json (lockfileVersion 3, 142 package entries), which was committed before switching CI to npm ci. No lockfile was invented.

## Outstanding non-automated acceptance
- Manual screen-reader review, focus order using real assistive technology, touch-target and contrast checks on actual mobile devices.
- Security checks for **future** private APIs, backup/restore, CSRF, storage conflicts and malicious import validation are unimplemented until the corresponding integrations are authorised.
- No authentication, cloud persistence, metadata provider access, real posters, streaming or production deployment exists.

## Merge policy
PR #2 can be reviewed against these actual results. Do not conflate the passing synthetic-app CI with production readiness or approval to connect private accounts. Keep the app independent of the Hub.
