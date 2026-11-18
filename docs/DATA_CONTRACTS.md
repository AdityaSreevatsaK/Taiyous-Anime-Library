# Anime Domain Data Contract (pre-persistence draft)

No schema has been deployed or migrated. The current TypeScript contract lives in `src/domain/types.ts` and can be changed through reviewed ADRs before choosing storage.

## Identity and numbering
- `AnimeEntry.id`, `AnimeSeason.id` and `AnimeEpisode.id` are stable opaque IDs. An episode's ID remains stable when its title, alias, release date, printed number or display sequence changes.
- `AnimeEpisode.seasonId` must match the containing season. Episode IDs must not collide anywhere in the catalogue. The helpers `validateAnimeEntry` and `validateCatalogue` detect structural collisions in trusted local fixtures; they are **not** complete untrusted-input parsers.
- `episodeNumber` is optional display metadata; it can be duplicated, non-contiguous or unlisted. `sequence` controls display order only.
- `kind` separates regular episodes, specials and OVAs. Re-releases have distinct IDs and `editionOfEpisodeId` references; watched progress is independent unless an explicit policy is approved.
- `regularEpisodeTotal: number | null` is an official/known count or unknown. A season may contain no listed episodes. Specials do not count against that total.

## Explicit personal progress
`AnimeProgress` keeps status, watched episode IDs, timestamp, optional 1–10 rating, comment, tags and collection IDs. `markEpisode`, `setWatchStatus` and `updateAnnotations` return new objects with the caller-supplied timestamp. They never auto-add other episode IDs. Unknown watched IDs are retained, excluded from known counts, and surfaced to future migration/reconciliation.

No auto-completion is inferred when a number is reached. A user can explicitly select `completed` even when the official total is unknown; that does not silently fill history. Unwatching in a completed entry switches to watching to avoid stale completion.

## Collections and source metadata
Local collection IDs can reference a `parentId`; cycles, authorisation and migrations require validation before persistence. Only synthetic data exists. Provider IDs, artwork URLs/licences/attribution and release records must be separate from owner-authored watch history.

## Next persisted schema
Choose schemaVersion/mediaKind/revision/tombstones via ADR, validate all untrusted JSON with strict size and count limits, reject duplicate IDs, and migrate with backup and rollback. Prevent lost updates with compare-and-swap and two-device tests. No private data in static bundles, URLs or logs.
