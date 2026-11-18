# Anime Library milestone roadmap

## Milestone 0: Baseline scaffold
- [x] React + TypeScript and independent repo
- [x] GitHub workflow declaration
- [x] Read-only local search
- [ ] Resolve GitHub runner preflight failure and verify executed CI
- [ ] Generate authentic package-lock.json and switch to npm ci

## Milestone 1: Synthetic anime watch tracker (feature branch, awaiting CI)
- [x] Stable IDs for anime/season/episode, specials, OVAs, ambiguous printed numbers and remasters
- [x] Explicit immutable progress transitions and unit tests
- [x] Three fictional series, multi-season details, watched toggles and status/genre/search filters
- [x] In-memory rating, comment, tags and collections
- [x] Mobile-responsive styles and visible keyboard focus
- [ ] Execute full typecheck/test/build and browser keyboard/mobile matrix
- [ ] Peer review and merge after passing gates

## Milestone 2: Honest persistence design
- [ ] Approve storage/auth and metadata ADRs
- [ ] Runtime import schema, quotas, error typing, revision control, backups and restores
- [ ] IndexedDB/offline caching policy and two-device conflict tests

## Milestone 3: Approved private account and catalogue
- [ ] Per-app session with server-side access checks; no shared cookie assumption
- [ ] Owner-approved metadata access with attribution and rights controls
- [ ] Private watched history and sync without forced deployment
- [ ] Verified error, loading, empty and offline states

## Milestone 4: Ecosystem and release
- [ ] Cross-app Shared Core extraction only when proven useful
- [ ] Optional parent Hub link; always standalone
- [ ] Staging, full browser/security checks, rollback and owner release approval

No streaming, scraping, paid APIs, real private data, media assets or cloud deployment is authorised by this roadmap.
