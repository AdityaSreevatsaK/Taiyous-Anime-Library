import type { AnimeEntry, AnimeEpisode } from './types';

/** Validation belongs at import boundaries too; this is a local contract check, not a persisted parser. */
export function validateAnimeEntry(entry: AnimeEntry): string[] {
  const errors: string[] = [];
  if (!entry.id.trim()) errors.push('Anime ID is empty');
  const seasonIds = new Set<string>();
  const episodeIds = new Set<string>();
  const editions: AnimeEpisode[] = [];
  for (const season of entry.seasons) {
    if (!season.id.trim() || seasonIds.has(season.id)) errors.push('Duplicate or empty season ID: ' + season.id);
    seasonIds.add(season.id);
    if (season.regularEpisodeTotal !== null && (!Number.isSafeInteger(season.regularEpisodeTotal) || season.regularEpisodeTotal < 0))
      errors.push('Invalid regular episode total: ' + season.id);
    for (const episode of season.episodes) {
      if (!episode.id.trim() || episodeIds.has(episode.id)) errors.push('Duplicate or empty episode ID: ' + episode.id);
      episodeIds.add(episode.id);
      if (episode.seasonId !== season.id) errors.push('Episode season mismatch: ' + episode.id);
      if (!Number.isSafeInteger(episode.sequence) || episode.sequence < 0) errors.push('Invalid sequence: ' + episode.id);
      if (episode.episodeNumber !== undefined && (!Number.isSafeInteger(episode.episodeNumber) || episode.episodeNumber < 0))
        errors.push('Invalid episode number: ' + episode.id);
      if (episode.editionOfEpisodeId) editions.push(episode);
    }
  }
  for (const edition of editions) {
    if (edition.editionOfEpisodeId === edition.id || !episodeIds.has(edition.editionOfEpisodeId!))
      errors.push('Invalid re-release reference: ' + edition.id);
  }
  return errors;
}

export function episodesFor(entry: AnimeEntry): AnimeEpisode[] {
  return entry.seasons.flatMap(season => [...season.episodes].sort((a, b) =>
    a.sequence - b.sequence || a.id.localeCompare(b.id)));
}

export function findEpisode(entry: AnimeEntry, episodeId: string): AnimeEpisode | undefined {
  return episodesFor(entry).find(episode => episode.id === episodeId);
}