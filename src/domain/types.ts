/** Series and episode IDs are stable; season/episode labels are display data only. */
export type AnimeWatchStatus = 'planned' | 'watching' | 'paused' | 'completed' | 'dropped';
export interface AnimeEpisode {
  id: string;
  title: string;
  /** Display order, not a globally unique key. */
  sequence: number;
  seasonId?: string;
  runtimeMinutes?: number;
}
export interface AnimeSeason {
  id: string;
  title: string;
  episodes: AnimeEpisode[];
}
export interface AnimeEntry {
  kind: 'anime';
  id: string;
  title: string;
  aliases: string[];
  genres: string[];
  releaseYear?: number;
  seasons: AnimeSeason[];
}
export interface AnimeProgress {
  animeId: string;
  watchedEpisodeIds: string[];
  status: AnimeWatchStatus;
  updatedAt: string;
}
