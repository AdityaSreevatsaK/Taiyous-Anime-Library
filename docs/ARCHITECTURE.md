# Architecture and Ownership Boundaries

## System context
```text
Personal Hub (apps/hub, in Shared Core)
  ├─ navigates to existing independent Novel Library
  ├─ optional link to this Anime application
  └─ other independently deployed applications
                 |
                 v
Taiyous-Anime-Library (THIS REPO)
  ├─ presentation and responsive catalogue UI
  ├─ anime domain entities and pure selectors
  ├─ future application use cases and repository ports
  ├─ future private storage + authorisation adapters
  └─ future offline cache and sync (NOT IMPLEMENTED)
```

**Ownership:** no runtime backend call to the hub is required. The hub is merely a route selector; if it is offline, this application still runs. Shared Core code may eventually be consumed as versioned packages, never as a mutable sibling-repo source import.

## Current implementation vs intended shape
Current feature branch: typed anime/season/episode/progress contracts, globally unique episode identity checks, pure status and episode-set transformations, a fictional three-series catalogue and an in-memory interactive React journal. Vitest plus Playwright Chromium validate the synthetic UI on a Node.js 22 GitHub Actions runner. No real records survive a refresh. There is **no** media import, cloud API, login, persistent user tracking, transcoder, player, licence verification service or backend.

Intended components (do not treat them as shipped):
1. **Domain:** stable media identities, AnimeEntry, AnimeSeason, AnimeEpisode, AnimeProgress, validation, read-only selectors, progress transformations.
2. **Application:** explicit commands/queries such as Add, UpdateMetadata, MarkProgress, RemoveOfflineCopy, and administrative Delete, with permission checks.
3. **Ports:** `CatalogueRepository`, `ProgressRepository`, `AssetRepository`, `AuthSession` abstractions, each with cancellable, typed results and errors.
4. **Adapters:** indexed local cache and a future private storage provider chosen after design review.
5. **Presentation:** responsive cards, details, progress, collections, search, settings, empty/error/offline states.
6. **Cross-media integration:** optional shared UI/contracts; no direct access to the novel app's dataset, cookies or internal browser storage.

## Domain requirements
An anime may have alternate titles, OVAs, specials, separate seasons and numbering conventions. Episode labels are not global identifiers; watched status is per stable episode ID, not a single unreliable last-watched counter.

## Operational boundaries
Never ship a public build containing tokens. Prefer same-origin server functions and HttpOnly, Secure sessions where authentication is implemented. Restrict allowed origins, use CSRF controls for mutating endpoints and plan for OAuth redirects that do not share cookies across unrelated pages.dev hosts. For local-first operations, record revision tokens and reconcile conflicts explicitly; never use blind overwrite.

## Performance principles
Virtualise very large lists; decode media lazily; cap concurrent requests; back off failures; avoid state updates on every scroll tick; cache only assets that the user explicitly chooses for offline. Document performance budgets and measure with browser tooling before changing them.

## Deployment
Current: **public synthetic UI on Cloudflare Pages**, https://taiyous-anime-library.pages.dev/, connected to GitHub with production branch `master`; Cloudflare handles static builds, while GitHub Actions runs independent quality checks. Git-triggered builds are **not automatically blocked by failed CI**. No Pages Functions, authentication, private dataset or real cloud persistence is implemented. Future protected functionality requires approved server-side secrets, per-app origin security and recovery/rollback tests. Do not copy the Novel Library's one-shot deployment workflows.

## Architecture review checklist
Does each API preserve the identity/progress semantics? Can the app run if the hub is down? Does it expose private data in client bundles or public files? Are cross-origin auth assumptions explicit? Are destructive changes reversible? Are tests and rollback specified? If any answer is unclear, write an ADR before code.
