import { describe, expect, it } from 'vitest';
import { entries } from '../data/catalogue';
import { emptyProgress, markEpisode, setWatchStatus, summariseProgress, updateAnnotations } from './progress';

const anime = entries[0]!;
const now = '2026-01-02T12:00:00Z';
describe('immutable episode progress', () => {
  it('watches exactly one episode without filling gaps or a later season', () => {
    const start = emptyProgress(anime.id);
    const one = markEpisode(start, anime, 'episode:azure-04', true, now);
    expect(one.watchedEpisodeIds).toEqual(['episode:azure-04']);
    expect(one.status).toBe('watching');
    expect(start.watchedEpisodeIds).toEqual([]);
    expect(summariseProgress(anime, one).watchedRegular).toBe(1);
    expect(summariseProgress(anime, one).expectedRegular).toBeNull();
  });
  it('preserves other watched specials and episodes on unwatch', () => {
    const one = markEpisode(emptyProgress(anime.id), anime, 'episode:azure-ova', true, now);
    const two = markEpisode(one, anime, 'episode:azure-03', true, now);
    const three = markEpisode(two, anime, 'episode:azure-03', false, now);
    expect(three.watchedEpisodeIds).toEqual(['episode:azure-ova']);
    expect(summariseProgress(anime, three).watchedSpecials).toBe(1);
    expect(markEpisode(three, anime, 'episode:azure-ova', true, now)).toBe(three);
  });
  it('does not silently watch unknown or unreleased episodes', () => {
    const start = emptyProgress(anime.id);
    expect(() => markEpisode(start, anime, 'episode:missing', true, now)).toThrow('Unknown episode ID');
    expect(() => markEpisode({ ...start, animeId: 'different' }, anime, 'episode:azure-01', true, now)).toThrow('different series');
    expect(start.watchedEpisodeIds).toEqual([]);
  });
  it('sets status explicitly without backfilling watched IDs', () => {
    const complete = setWatchStatus(emptyProgress(anime.id), 'completed', now);
    expect(complete.watchedEpisodeIds).toEqual([]);
    const unwatched = markEpisode({ ...complete, watchedEpisodeIds: ['episode:azure-01'] }, anime, 'episode:azure-01', false, now);
    expect(unwatched.status).toBe('watching');
    expect(unwatched.watchedEpisodeIds).toEqual([]);
    expect(setWatchStatus(unwatched, 'dropped', now).status).toBe('dropped');
  });
  it('counts only known distinct IDs and does not claim unknown totals are complete', () => {
    const progress = { ...emptyProgress(anime.id), watchedEpisodeIds: ['episode:azure-01', 'episode:azure-01', 'episode:future'] };
    const summary = summariseProgress(anime, progress);
    expect(summary.watchedKnown).toBe(1);
    expect(summary.unknownWatchedIds).toEqual(['episode:future']);
    expect(summary.allKnownRegularWatched).toBe(false);
    const complete = entries[1]!;
    const all = { ...emptyProgress(complete.id), watchedEpisodeIds: ['episode:clockwork-1', 'episode:clockwork-2'] };
    expect(summariseProgress(complete, all).allKnownRegularWatched).toBe(true);
  });
  it('validates rating, deduplicates tags and keeps annotations separate', () => {
    const progress = updateAnnotations(emptyProgress(anime.id), { rating: 10, tags: ['Loved', 'Loved', '  Rewatch  '], comment: 'Safe <b>text</b>' }, now);
    expect(progress.tags).toEqual(['Loved', 'Rewatch']);
    expect(progress.comment).toBe('Safe <b>text</b>');
    expect(() => updateAnnotations(progress, { rating: 11 }, now)).toThrow(RangeError);
    expect(updateAnnotations(progress, { rating: null }, now).rating).toBeUndefined();
  });
});