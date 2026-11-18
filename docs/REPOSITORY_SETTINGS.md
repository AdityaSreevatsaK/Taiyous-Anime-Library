# Repository Metadata and Owner Settings

**Repository:** https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library  
**Recommended description:** Private anime catalogue, watchlists, season/episode tracking and personal ratings.  
**Visibility:** Private (confirmed on creation; only owner may change).  
**Default branch:** master.  
**Topics:** anime, watchlist, typescript, react, personal-library, episode-tracker.  
**Homepage URL:** leave empty until there is an actual verified deployment.

These metadata values are proposed here because the connected GitHub integration cannot edit repository settings/descriptions directly. The owner can paste them in **GitHub → Repository → Settings → General → Description / Website / Topics**.

Recommended protections: require PR before merging when appropriate; require passing typecheck/test/build once CI is green; disable unreviewed force-push and branch deletion; use least-privilege `GITHUB_TOKEN`; keep secret scanning and dependency alerts enabled. Do not disable protections to mask regressions.

Initial CI uses `npm install` until the first lockfile is generated and committed. After that switch to `npm ci` and lockfile-backed caching. No automatic production deployment, no paid API tokens and no repository releases until owner acceptance.
