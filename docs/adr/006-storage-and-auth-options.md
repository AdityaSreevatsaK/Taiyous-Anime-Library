# ADR-006: Private progress storage and authentication options

**Status:** Proposed, owner approval required. **Date:** 2026-11-18.

## Context
The app currently has zero real accounts, stored watch data or production backend. The demo resets on refresh. We must preserve episodic IDs and separate public descriptive metadata from private personal annotations, ratings, tags and watched sets.

## Options and indicative cost
| Option | Direct price | Privacy / reliability | Recommendation |
| --- | --- | --- | --- |
| In-memory demo | ₹0 / US$0 infrastructure cost | No durable user data; safe as development-only demo | Implemented now |
| Browser IndexedDB | ₹0 / US$0 direct provider cost | Data stored on device and vulnerable to browser clearing, other local users and loss of device | Candidate for optional non-authoritative offline cache |
| Cloudflare Pages Functions + private R2 or D1 | Quote plan-dependent INR/USD after design | Server-side session and per-record revision checks possible; backups and billing required | Evaluate for canonical personal state |
| Private Hugging Face dataset + server functions | Costs/quotas require separate review | Useful existing ecosystem knowledge, but provider-backed revision/atomicity and private reads require careful validation | Evaluate, do not assume Novel app adapter is reusable |

No current cloud invoice, usage volume, currency conversion or region is approved, so paid price estimates would be speculative. Record both ₹ and US$ at procurement using then-current billing/FX rather than inventing a fixed figure.

## Auth alternatives
1. Separate per-anime app OAuth flow with state/PKCE as supported by the chosen identity provider and a same-origin server-controlled, Secure, HttpOnly, SameSite session. CSRF defence and logout/revocation required.
2. Central hub identity service, only after a design for explicit per-app scopes, redirect URIs and shared identity is reviewed. Not implicit cookie sharing.
3. Local-only app without cloud sync, suitable only for non-sensitive self-managed records and with explicit backup limitations.

## Proposed decision
Retain a storage-agnostic domain. Later introduce `CatalogueRepository` and `ProgressRepository` interfaces with revision tokens, tombstones, conflict results and a verified backup/restore pipeline. Select separate per-app auth first unless central SSO has an approved threat model.

## Required tests before approval
Unauthorised reads/writes, CSRF, token leakage, stale revision conflict, concurrent updates, deleted-episode tombstones, two-device reconciliation, offline rehydrate, quota exhaustion and backup recovery. No service configuration or account linking is authorised by this proposal.
