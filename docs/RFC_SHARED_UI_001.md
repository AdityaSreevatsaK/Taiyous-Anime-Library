# RFC-001: Potential stateless library UI reuse

**Status:** Candidate, not submitted or adopted. **Owner:** Anime Session.

## Observed overlap
The Anime Library has locally implemented a `SearchAndFilterBar` and `CollectionPicker` pattern. Session 1 owns Shared Core and the Novel Library has its own navigation/collections. The presence of those UI concepts in two apps is a reason to **evaluate** reuse, not proof that their data semantics are identical.

## Proposed interface for discussion
- `FilterField<T>`: label, typed value, options, onChange, disabled; no fetching, persistence, ownership or hidden data.
- `CollectionPicker`: list of {id, label, parentId?}, selectedIds, onChange; purely stateless tree display with keyboard controls and accessible labels.
- Optional design tokens for focus indicators, 44px controls, reduced motion and CSS variable naming.

## Acceptance before Shared Core extraction
Demonstrate working use by two real applications, compare keyboard/mobile behaviour, CSS isolation, bundle size and package pinning. Test 320/375/390/768/1280px and do not move episode/status business logic into shared UI. Propose changes to Session 1; **no other repository has been edited**.
