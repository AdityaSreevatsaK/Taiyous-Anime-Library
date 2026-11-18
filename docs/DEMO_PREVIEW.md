# Public synthetic preview (GitHub Pages)

## Purpose
Display the **fictional, in-memory** Anime Library interface on desktop and mobile. The actual future private catalogue and watch history must **never** be hosted as a public static site.

## Publishing
The opt-in workflow `.github/workflows/pages-demo.yml` is triggered once when merged to `master` and later only when the owner explicitly selects **Actions > Publish synthetic Anime Library preview > Run workflow**. Regular code changes do not automatically republish the demo.

GitHub requires the repository's **Settings > Pages > Build and deployment > Source** to be set to **GitHub Actions**. If this is not enabled, `actions/configure-pages` may fail. The connected GitHub integration cannot change this setting directly. After enabling, run the preview workflow again.

Expected demo address **after successful deployment**, not a verified live URL until the deployment action succeeds:

https://AdityaSreevatsaK.github.io/Taiyous-Anime-Library/

The Vite build uses `--base=/Taiyous-Anime-Library/` only for the preview; normal local development retains its default root URL.

## What is safe to show
- Three entirely fictional anime, aliases, seasons, regular episodes, OVAs and specials.
- Temporary watched episode checkboxes, statuses, notes, tags and collections.
- A prominent **Synthetic demo** label and reset-on-refresh warning.
- No authentication, no backend, no external metadata calls, no copyrighted covers, no streaming and no uploaded videos.

The published site is **publicly accessible**. It is not a private member-only preview, even if another part of the ecosystem later authenticates users. Do not add private records, tokens, imported personal watchlists, private video files or real personal metadata to the source.

## Feedback
Use any desktop/mobile browser to test search, episode toggles, status, notes, specials and 320px mobile layout. Upload screenshots or short **screen recordings of the interface** in the engineering conversation to illustrate bugs. The current application cannot play videos; video-player testing requires a separate approved, rights-respecting milestone.

## Cost and security
Public-repository GitHub Pages hosting is available at **₹0 / US$0** on the GitHub Free tier, subject to published GitHub usage limits and any separately billed account features. No paid API or cloud secret is needed.

## Rollback
Disable the published site from **Settings > Pages**, or remove `.github/workflows/pages-demo.yml` and unpublish it. Removing the workflow alone does not automatically unpublish already-deployed Pages content. Never treat the public preview as a secure private data service.
