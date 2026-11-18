# ADR-007: Third-party anime metadata, attribution and rights

**Status:** Proposed, no integration authorised. **Date:** 2026-11-18.

## Options
1. **Owner-entered metadata:** Most controllable; no external API dependency. Artwork must have lawful provenance and licence fields.
2. **AniList GraphQL:** Anime-specific titles and metadata. Review current [official terms](https://docs.anilist.co/guide/terms-of-use), [API introduction](https://docs.anilist.co/guide/introduction) and rate limits before access. Publicly documented non-commercial API availability does **not** grant blanket rights to copy or redistribute artwork.
3. **Kitsu JSON:API:** Candidate anime directory; verify the active endpoint, licence, data terms and permitted image uses from [project documentation](https://hummingbird-me.github.io/api-docs/) before deciding.
4. **TMDB:** Alternative for cross-format TV coverage, but anime seasons/OVAs need careful matching. [Official FAQ](https://developer.themoviedb.org/docs/faq) describes non-commercial usage and attribution requirements.

## Cost
The synthetic fixture currently calls zero providers at ₹0 / US$0 direct API cost. Any future API, commercial licence, hosting/cache and quota charges must be confirmed in both INR and USD before approval. Do not assume that free API access means unrestricted data rights.

## Design requirements
Keep source-specific external IDs and timestamps in a provenance record separate from immutable local anime/season/episode IDs. Allow aliases and manual mapping, reject ambiguous automated matches, and preserve original provider attribution. Use a server-side proxy only when permitted; enforce rate limits, backoff, caching rights, field validation and strict image URL policies. The browser must never receive privileged API tokens.

## Evaluation and exit criteria
Compare official API terms, season/special coverage, language/title quality, ID stability, image rights and attribution placement. Test duplicate titles, release numbering and re-releases with synthetic fixtures. Do not scrape HTML, bypass paywalls or integrate before owner approval.
