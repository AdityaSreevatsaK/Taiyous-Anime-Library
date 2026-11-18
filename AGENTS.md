# AI Agent Working Agreement: Taiyou's Anime Library

**Applies to every directory in this repository.** The owner is directing parallel sessions across five GitHub repositories. Your session owns **only** Taiyous-Anime-Library; treat other repositories as external integration partners.

## Agent mission
Build a secure, maintainable, privacy-respecting anime application to catalogue anime and reliably track watchlists, seasons, episodes and completion. Review the actual current source and issue/PR state on every visit. Do not assume README statements are always current.

## Mandatory start sequence
1. Inspect `master`, active branches, pull requests, workflow results and actual package versions.
2. Read `README.md`, this `AGENTS.md` and **all** `docs/*.md`, especially the repository-specific handover.
3. Run or review `npm run typecheck`, `npm test`, `npm run build`. If dependency lock is absent, run `npm install` first.
4. Prepare a brief implementation plan with acceptance conditions and files that will change.
5. Implement only the current agreed scope on a short-lived feature branch.
6. Add tests, update docs, run CI, review the PR diff and verify the merge state before claiming completion.
7. Do not merge changes that break the typecheck, unit tests, build, privacy rules or user-visible core functionality.
8. Do not deploy or set production secrets without explicit owner approval.

## Source of truth and boundaries
- This repository owns its domain types and implementation. Shared Core's v0 contracts are **proposals**, not a migration mandate.
- Do not edit the Novel Library or other media repos from this session.
- Use stable opaque IDs, not titles, indexes, or provider-specific season labels as primary keys.
- Separate imported source metadata, private personal annotations, files and sync metadata.
- Domain complexity: An anime may have alternate titles, OVAs, specials, separate seasons and numbering conventions. Episode labels are not global identifiers; watched status is per stable episode ID, not a single unreliable last-watched counter.
- Model types: AnimeEntry, AnimeSeason, AnimeEpisode, AnimeProgress. See `src/domain/types.ts` and `docs/DATA_CONTRACTS.md`.
- Shared code is extracted only after a second consuming app demonstrates genuine reuse. Do not create runtime coupling to the hub.

## Safety and owner approvals
No secrets or sensitive content in commit history, tests, screenshots, logs, `.env.example` or `VITE_*` variables. Private media must be served through authorised private storage; do not assume that making a repository private protects public deployments. Do not bypass authentication, paywalls, DRM or third-party restrictions. Never delete private originals or rewrite large catalogues without explicit consent, dry-run, verified backup and revision check. Reject unsafe imports and untrusted URLs. Treat user-authored tags/comments as untrusted strings and never inject into the DOM as HTML.

## Engineering standards
Use TypeScript strict mode, pure domain helpers, explicit discriminated models, short independent modules, keyboard-accessible React components and responsive CSS. Make loading, empty, offline and error states truthful. Avoid unbounded in-memory media blobs or unnecessary network calls. Document performance budgets and measure when possible. UI controls must have useful actions, not decorative placeholders. Add accessible labels and test at 320/375/390/768/1280px when layout changes.

## Tests and quality gates
Unit tests cover edge cases, identity, ordering, partial data, malformed imports and regressions. Integration tests use a disposable private dataset or mocked adapter only. Browser tests should cover mobile/desktop, offline entry, keyboard navigation, privacy boundaries and failure behaviour. No paid external API calls from CI. A passing CI is necessary but not sufficient for user acceptance. Update `docs/TESTING.md` with new gates.

## Collaboration and reporting
Propose schema changes as versioned, backwards-compatible ADRs. Never silently modify Shared Core public exports or other repos. State what is implemented, tested, still planned, blocked and deployed. Document affected APIs, migration, rollback and any tests not run. Keep secrets and real personal media out of AI handovers. Preserve owner preference for an independent, aesthetically refined personal library without unnecessary architectural overhead.

## Hard stop conditions
Stop a destructive operation, forced push, production data migration, deletion of source files, disclosure of private media, unsanctioned external scraping, or authentication weakening pending explicit approval. Stop and ask for the specific required consent rather than guessing it.

## First engineering milestone
Catalogue views and explicit watchlist state transitions on in-memory fixtures. Define episode identity/numbering and canonical season mapping before storage sync.
**Definition of done:** Tests for specials, missing episodes, season transitions, watched/unwatched toggling, and progress aggregation without marking unseen episodes watched. Run all local checks and keep the production system unaffected.
