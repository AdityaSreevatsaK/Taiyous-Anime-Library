import type { AnimeEntry, AnimeProgress, AnimeWatchStatus } from './types';
import { episodesFor, findEpisode } from './episodes';

export function emptyProgress(animeId: string): AnimeProgress {
  return { animeId, watchedEpisodeIds: [], status: 'planned', updatedAt: '', tags: [], collectionIds: [] };
}

/** Mutate exactly one episode in an immutable set. Never infer that unviewed episodes were watched. */
export function markEpisode(
  progress: AnimeProgress, entry: AnimeEntry, episodeId: string, watched: boolean,
  now = new Date().toISOString(),
): AnimeProgress {
  if (progress.animeId !== entry.id) throw new Error('Progress belongs to a different series');
  if (!findEpisode(entry, episodeId)) throw new RangeError('Unknown episode ID');
  const ids = new Set(progress.watchedEpisodeIds);
  if (ids.has(episodeId) === watched) return progress;
  if (watched) ids.add(episodeId);
  else ids.delete(episodeId);
  const status = watched && progress.status === 'planned' ? 'watching'
    : !watched && progress.status === 'completed' ? 'watching' : progress.status;
  return { ...progress, status, watchedEpisodeIds: [...ids], updatedAt: now };
}

/** Status changes are explicit. Marking complete NEVER backfills unseen episodes. */
export function setWatchStatus(progress: AnimeProgress, status: AnimeWatchStatus, now = new Date().toISOString()): AnimeProgress {
  if (progress.status === status) return progress;
  return { ...progress, status, updatedAt: now };
}

export function updateAnnotations(
  progress: AnimeProgress,
  change: { rating?: number | null; comment?: string; tags?: string[]; collectionIds?: string[] },
  now = new Date().toISOString(),
): AnimeProgress {
  if (change.rating !== undefined && change.rating !== null &&
    (!Number.isInteger(change.rating) || change.rating < 1 || change.rating > 10))
    throw new RangeError('Rating must be an integer from 1 to 10');
  return {
    ...progress,
    ...(change.rating !== undefined ? { rating: change.rating ?? undefined } : {}),
    ...(change.comment !== undefined ? { comment: change.comment } : {}),
    ...(change.tags !== undefined ? { tags: [...new Set(change.tags.map(t => t.trim()).filter(Boolean))] } : {}),
    ...(change.collectionIds !== undefined ? { collectionIds: [...new Set(change.collectionIds)] } : {}),
    updatedAt: now,
  };
}

export function summariseProgress(entry: AnimeEntry, progress: AnimeProgress) {
  if (progress.animeId !== entry.id) throw new Error('Progress belongs to a different series');
  const episodes = episodesFor(entry);
  const valid = new Set(episodes.map(episode => episode.id));
  const watched = new Set(progress.watchedEpisodeIds);
  const watchedKnown = episodes.filter(episode => watched.has(episode.id));
  const regular = episodes.filter(episode => episode.kind === 'regular');
  const totals = entry.seasons.map(season => season.regularEpisodeTotal);
  const expectedRegular = totals.every(total => total !== null)
    ? totals.reduce<number>((sum, total) => sum + (total ?? 0), 0) : null;
  const watchedRegular = regular.filter(episode => watched.has(episode.id)).length;
  return {
    watchedKnown: watchedKnown.length,
    watchedRegular,
    listedEpisodes: episodes.length,
    expectedRegular,
    watchedSpecials: watchedKnown.length - watchedRegular,
    unknownWatchedIds: [...watched].filter(id => !valid.has(id)),
    /** A true value is evidence of the enumerated total, not permission to mark other episodes. */
    allKnownRegularWatched: expectedRegular !== null && regular.length === expectedRegular && watchedRegular === expectedRegular,
  };
}