# Repository Metadata and Owner Settings

**Repository:** https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library  
**Recommended description:** Private anime catalogue, watchlists, season/episode tracking and personal ratings.  
**Visibility:** Public (verified on 18 November 2026; no private user data committed).  
**Default branch:** master.  
**Topics:** anime, watchlist, typescript, react, personal-library, episode-tracker.  
**Homepage URL:** https://taiyous-anime-library.pages.dev/ (confirmed live from owner screenshots).

These metadata values are proposed here because the connected GitHub integration cannot edit repository settings/descriptions directly. The owner can paste them in **GitHub → Repository → Settings → General → Description / Website / Topics**.

Recommended protections: require PR before merging when appropriate; require passing typecheck/test/build once CI is green; disable unreviewed force-push and branch deletion; use least-privilege `GITHUB_TOKEN`; keep secret scanning and dependency alerts enabled. Do not disable protections to mask regressions.

CI uses a generated lockfile with `npm ci` and lockfile-backed caching. **Cloudflare Pages Git integration automatically deploys pushes to `master`**, separately from Actions checks. Require passing CI before merges and do not configure private data or paid API tokens. No tagged production release until owner acceptance.
