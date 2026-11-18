# Public Anime Library demonstration (Cloudflare Pages)

## Live preview and ownership

**Live domain (owner-confirmed from deployment screenshots, 18 November 2026):** https://taiyous-anime-library.pages.dev/

This is the standalone Anime application with three **fictional** anime and entirely in-memory watch progress. It is **public**, not a private account or personal history service. There is no streaming player, authorised media API or video upload.

## Deployment architecture

- **Hosting/build:** Cloudflare Pages connected directly to GitHub repository `AdityaSreevatsaK/Taiyous-Anime-Library` through Git integration.
- **Production branch:** `master`.
- **Framework:** React (Vite), Node.js 22, build command `npm run build`, output `dist`, repository root `/`.
- **GitHub Actions:** `.github/workflows/ci.yml` performs independent typechecking, 13 unit tests, build and 9 Chromium browser tests. It **does not** deploy or store Cloudflare deployment credentials.
- **Production updates:** Cloudflare Pages Git integration may deploy **every push to `master`**, regardless of the GitHub Actions outcome. For release quality, require passing branch checks before merge and verify deployed results. Cloudflare branch/PR previews may also be public.
- **No GitHub Pages:** The former GitHub Pages publication workflow was retired after the Cloudflare launch. GitHub repository Settings > Pages can be disabled if enabled solely for that abandoned preview.

## Safety boundary

- All fixture anime and progress are fictional; changes reset upon refresh.
- No Hugging Face storage, private catalogue, account login, cross-device persistence, licensed video or copyrighted cover data.
- Never commit credentials or private datasets. Vite `VITE_*` environment values are public in built browser JavaScript.
- Before adding private services, adopt a reviewed authenticated Pages Functions backend, revision-safe storage and a separately tested data migration/backup plan. A public site must not expose unprotected personal history APIs.

## Manual acceptance test

1. Open the domain on desktop and mobile and verify the *Synthetic demo* disclaimer.
2. Search by series title/alias, filter by watch status and genre, switch series, expand seasons and specials.
3. Mark one episode watched; verify unaffected episodes stay unchanged.
4. Edit status/rating/tags/comments, refresh, and confirm that **all state intentionally resets**.
5. Verify keyboard focus, narrow viewport layout, console errors and that no unexpected private network requests occur.
6. Send screenshots or **screen recordings of the browser interface** for bug reports. Recorded videos are feedback; video playback is not yet an implemented Anime feature.

## Rollback

In Cloudflare Workers & Pages > `taiyous-anime-library` > Deployments, inspect the failing deployment and roll back to the last known good version using the dashboard's deployment controls. For a code fault, revert the offending commit via a reviewed PR. Disabling or deleting a Cloudflare project makes the site unavailable; deleting the GitHub workflow does not do that.
