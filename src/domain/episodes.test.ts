import { describe, expect, it } from 'vitest';
import { entries } from '../data/catalogue';
import { episodesFor, findEpisode, validateAnimeEntry } from './episodes';
import type { AnimeEntry } from './types';

const series = entries[0]!;
describe('episode identity and mapping', () => {
  it('validates the synthetic catalogue and distinct specials', () => {
    expect(entries.flatMap(validateAnimeEntry)).toEqual([]);
    expect(findEpisode(series, 'episode:azure-ova')?.kind).toBe('ova');
    expect(findEpisode(series, 'episode:azure-special')?.kind).toBe('special');
    expect(findEpisode(series, 'episode:azure-s2e1-remaster')?.editionOfEpisodeId).toBe('episode:azure-s2e1');
  });
  it('keeps IDs stable for out-of-order season releases and duplicate printed numbers', () => {
    const order = episodesFor(series).filter(ep => ep.seasonId === 'season:azure-one').map(ep => ep.episodeNumber);
    expect(order).toEqual([1, 2, 3, 4]);
    expect(findEpisode(series, 'episode:azure-s2e1')?.episodeNumber).toBe(1);
    expect(findEpisode(series, 'episode:azure-s2e1-remaster')?.episodeNumber).toBe(1);
  });
  it('allows two series with the same title while retaining distinct opaque IDs', () => {
    const duplicate: AnimeEntry = { ...series, id: 'anime:another' };
    expect(validateAnimeEntry(duplicate)).toEqual([]);
    expect(duplicate.id).not.toBe(series.id);
  });
  it('rejects duplicate episode IDs across seasons and mismatched parent IDs', () => {
    const invalid = structuredClone(series);
    invalid.seasons[1]!.episodes[0]!.id = 'episode:azure-01';
    invalid.seasons[1]!.episodes[1]!.seasonId = 'season:wrong';
    expect(validateAnimeEntry(invalid)).toEqual(expect.arrayContaining([
      'Duplicate or empty episode ID: episode:azure-01',
      'Episode season mismatch: episode:azure-special',
    ]));
  });
  it('rejects an invalid re-release source and accepts missing episode numbers', () => {
    const invalid = structuredClone(series);
    invalid.seasons[2]!.episodes[1]!.editionOfEpisodeId = 'episode:not-found';
    expect(validateAnimeEntry(invalid)).toContain('Invalid re-release reference: episode:azure-s2e1-remaster');
    const missing = structuredClone(series);
    missing.seasons[0]!.episodes.splice(1, 1);
    expect(validateAnimeEntry(missing)).toEqual([]);
  });
});