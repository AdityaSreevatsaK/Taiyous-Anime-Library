/** Domain-only, pre-persistence contract. Display numbering is never identity. */
export type AnimeWatchStatus = 'planned' | 'watching' | 'paused' | 'completed' | 'dropped';
export type AnimeEpisodeKind = 'regular' | 'special' | 'ova';

export interface AnimeEpisode {
  /** Immutable opaque ID, unique within the entire anime entry. */
  id: string;
  seasonId: string;
  title: string;
  kind: AnimeEpisodeKind;
  /** Stable catalogue display order, independent of air order or episode number. */
  sequence: number;
  /** Optional printed number. Gaps and duplicate numbers are legitimate. */
  episodeNumber?: number;
  /** Re-release has its own ID; the source episode stays distinct. */
  editionOfEpisodeId?: string;
  releasedOn?: string;
  runtimeMinutes?: number;
}
export interface AnimeSeason {
  id: string;
  title: string;
  /** null: official regular-episode total unknown. Specials are not included. */
  regularEpisodeTotal: number | null;
  episodes: AnimeEpisode[];
}
export interface AnimeEntry {
  kind: 'anime';
  id: string;
  title: string;
  aliases: string[];
  genres: string[];
  synopsis: string;
  releaseYear?: number;
  /** Optional, rights-reviewed artwork only. None in synthetic demo. */
  artwork?: { url: string; source: string; licence: string; attribution: string };
  seasons: AnimeSeason[];
}
export interface AnimeProgress {
  animeId: string;
  watchedEpisodeIds: string[];
  status: AnimeWatchStatus;
  updatedAt: string;
  rating?: number;
  comment?: string;
  tags: string[];
  collectionIds: string[];
}
export interface AnimeCollection {
  id: string;
  title: string;
  parentId?: string;
}