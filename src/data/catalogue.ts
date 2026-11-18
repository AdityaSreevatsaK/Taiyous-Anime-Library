import type { AnimeEntry, AnimeCollection, AnimeProgress } from '../domain/types';

/** FICTIONAL synthetic fixtures. No third-party covers, private records or network calls. */
export const entries: AnimeEntry[] = [
  {
    kind: 'anime', id: 'anime:azure-archive', title: 'The Azure Archive',
    aliases: ['Sora no Kiroku', 'Chronicles of Azure'], genres: ['Fantasy', 'Adventure'],
    synopsis: 'A young archivist deciphers the forgotten constellations above a floating city.',
    releaseYear: 2024,
    seasons: [
      { id: 'season:azure-one', title: 'Season One', regularEpisodeTotal: 4, episodes: [
        { id: 'episode:azure-01', seasonId: 'season:azure-one', kind: 'regular', title: 'A Map in the Sky', episodeNumber: 1, sequence: 1 },
        { id: 'episode:azure-02', seasonId: 'season:azure-one', kind: 'regular', title: 'The Silent Observatory', episodeNumber: 2, sequence: 2 },
        { id: 'episode:azure-04', seasonId: 'season:azure-one', kind: 'regular', title: 'Letters from the Moon', episodeNumber: 4, sequence: 4 },
        { id: 'episode:azure-03', seasonId: 'season:azure-one', kind: 'regular', title: 'The Glass Compass', episodeNumber: 3, sequence: 3 },
      ] },
      { id: 'season:azure-specials', title: 'Specials & OVAs', regularEpisodeTotal: 0, episodes: [
        { id: 'episode:azure-ova', seasonId: 'season:azure-specials', kind: 'ova', title: 'Night at the Lantern Festival', sequence: 1, episodeNumber: 1 },
        { id: 'episode:azure-special', seasonId: 'season:azure-specials', kind: 'special', title: 'A Captain’s Notes', sequence: 2, episodeNumber: 1 },
      ] },
      { id: 'season:azure-two', title: 'Season Two', regularEpisodeTotal: null, episodes: [
        { id: 'episode:azure-s2e1', seasonId: 'season:azure-two', kind: 'regular', title: 'The Ocean Above', sequence: 1, episodeNumber: 1 },
        { id: 'episode:azure-s2e1-remaster', seasonId: 'season:azure-two', kind: 'regular', title: 'The Ocean Above (Remastered)', sequence: 2, episodeNumber: 1, editionOfEpisodeId: 'episode:azure-s2e1' },
      ] },
    ],
  },
  {
    kind: 'anime', id: 'anime:clockwork-garden', title: 'The Clockwork Garden',
    aliases: ['Garden of Hours'], genres: ['Mystery', 'Slice of Life'],
    synopsis: 'A watchmaker tends a strange garden where every flower measures a different memory.',
    releaseYear: 2022, seasons: [{ id: 'season:clockwork', title: 'First Season', regularEpisodeTotal: 2, episodes: [
      { id: 'episode:clockwork-1', seasonId: 'season:clockwork', kind: 'regular', title: 'Seeds of Time', sequence: 1, episodeNumber: 1 },
      { id: 'episode:clockwork-2', seasonId: 'season:clockwork', kind: 'regular', title: 'The Last Hour', sequence: 2, episodeNumber: 2 },
    ] }],
  },
  {
    kind: 'anime', id: 'anime:amber-journey', title: 'The Amber Journey',
    aliases: ['Amber Road'], genres: ['Adventure', 'Drama'],
    synopsis: 'Two travellers follow a luminous road that appears only at sunrise.',
    seasons: [{ id: 'season:amber', title: 'Volume One', regularEpisodeTotal: null, episodes: [] }],
  },
];

export const collections: AnimeCollection[] = [
  { id: 'collection:favourites', title: 'Favourites' },
  { id: 'collection:evenings', title: 'Evening Watches', parentId: 'collection:favourites' },
];

/** Only illustrative state. Intentionally recreated each browser refresh, never persisted. */
export const initialProgress: AnimeProgress[] = [
  { animeId: 'anime:azure-archive', status: 'watching',
    watchedEpisodeIds: ['episode:azure-01', 'episode:azure-ova'], tags: ['Comfort watch'],
    collectionIds: ['collection:favourites'], rating: 9, comment: 'A promising fictional journey.',
    updatedAt: '2026-01-01T00:00:00Z' },
];