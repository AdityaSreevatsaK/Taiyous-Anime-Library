# Test strategy and quality gates

## Commands
Node 22+: `npm install`, `npm run typecheck`, `npm test`, `npm run build`. Commit a genuine generated lockfile before switching to `npm ci`. The branch has no verified passing CI or browser E2E yet; see [validation status](VALIDATION_STATUS_2026-11-18.md).

## Unit coverage added
- Canonical immutable anime/season/episode IDs and cross-series collision detection.
- Out-of-order episode rows, non-unique printed numbers, OVAs, specials and re-release links.
- Missing episodes, unknown official totals and distinct series sharing a title.
- Watch/unwatch individual episodes without filling gaps, duplicate set entries, invalid IDs and other-series mutation rejection.
- Explicit status changes; unwatching while complete prevents stale complete indication, but never backfills.
- Per-series known watched counts, unknown progress IDs retained for future reconciliation.
- Ratings within 1–10, tag de-duplication and comments handled as React text.

## Manual accessibility matrix (pending)
1. At 320, 375, 390, 768 and 1280px check no horizontal overflow, readable title/filters, visible form labels and 44px targets where practical.
2. Tab through the catalogue, choose series by Enter/Space, change filters by keyboard, open each season via Enter/Space, toggle checkboxes and edit notes. Focus rings must be visible.
3. Confirm a filtered-out selected series does not leak data across series; refresh resets all in-memory edits as clearly stated.
4. Verify screen-reader announcement for status, checkboxes, counts and empty results. Check high contrast and reduced motion.
5. Simulate unknown episode totals, absent episodes and re-releases. Confirm no network requests for metadata, images or private providers.

## Future release gates
Runtime import validation, error/loading/offline behaviour, real-device/browser automation, revision-conflict integration tests, authorisation/CSRF/security tests, dependency audit and backup restore. No deployment without owner approval.
