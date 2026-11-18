# Security, Privacy and Content Rights

## Threat model
Assets: private catalogues, personal viewing/reading history, owner credentials, authentication sessions, private media assets, and revision-controlled synchronisation. Threats: unauthorised read/write, cross-site script injection via metadata, leaked API keys, CSRF, SSRF through remote asset fetches, archive traversal, corrupted caches, conflict-driven data loss, careless deployment logs and malicious third-party media.

## Trust boundaries
1. Public browser code is **not secret**, even if the GitHub repo is private. No tokens in Vite `VITE_*`, JavaScript bundles, localStorage, screenshots, source maps or CI logs.
2. Any future serverless backend is a separate trust boundary; session validation, owner checks and input validation must occur server-side.
3. Private cloud storage must enforce both access and object-level authorisation. The Novel Library's Hugging Face OAuth session is for its own origin and MUST NOT be assumed to provide shared SSO.
4. Importers treat all files, tags, titles and provider responses as untrusted.
5. Offline caches are accessible to browser users on that device; do not claim device encryption unless implemented.

## Domain-specific controls
Treat third-party metadata as untrusted display text; do not embed streaming websites, bypass DRM, copy protected video, or assume remote poster URLs are safe.
No streaming or download claims until legally authorised providers, rights and terms are reviewed. Metadata-provider APIs require separate approval and configuration.

## Mandatory controls before writing private data
- An approved session design with CSRF protection on mutations, Secure HttpOnly cookie where appropriate, server-side owner revalidation and per-app scope.
- Schema validation, max object/payload sizes, allowlisted content types, rate/size/concurrency limits and strict path handling.
- Revision-guarded writes, non-destructive reconciliation, tombstones, backup/restore and two-device collision tests.
- User-facing warning before permanent deletion; no browser-only owner enforcement.
- Content-Security-Policy, safe metadata rendering, outbound URL validation, sanitised filenames and precise error messages without secret leakage.
- Dependency audit, secret scan, licence/provenance validation and accessibility review.

## Incident handling
If data exposure, missing originals or a secret leak is suspected: stop writes/deployments, preserve safe logs, rotate affected secrets, revoke sessions, audit revisions, restore from verified backups and document the event. Do not hide a security incident to keep a CI run green.

## Data rights
Use only user-owned, authorised or appropriately licensed media and metadata. Keep origin attribution and honour providers' terms and usage quotas. AI-generated test fixtures must be clearly synthetic. Never deploy copyrighted content to a public asset directory.

## Security tests
Unit tests for malicious strings, invalid IDs, malformed manifests and boundary values. Integration tests for unauthorised reads/writes, expired credentials, CSRF, conflict rejection, failed uploads, rollback, and offline cache eviction. Do not run private integration tests in public CI without isolated disposable fixtures.

## Synthetic GitHub Pages demo boundary (18 November 2026)
A separate GitHub Pages workflow may publish only the in-memory fictional catalogue. The static site is fully public and has no login or protected route. Any private anime/episode metadata, user watch history, OAuth token, API key or licensed video must stay out of its source/build. Do not change this boundary implicitly when adding private persistence. The release gate checks synthetic markers but is not a substitute for human code review of sensitive data changes. See [demo preview runbook](DEMO_PREVIEW.md).
