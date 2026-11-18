import { useState } from 'react';
import { entries, initialProgress, collections } from './data/catalogue';
import { episodesFor } from './domain/episodes';
import { searchCatalogue } from './domain/search';
import { emptyProgress, markEpisode, setWatchStatus, summariseProgress, updateAnnotations } from './domain/progress';
import type { AnimeEntry, AnimeProgress, AnimeWatchStatus } from './domain/types';
import './styles.css';

const statuses: AnimeWatchStatus[] = ['planned', 'watching', 'paused', 'completed', 'dropped'];
const genres = [...new Set(entries.flatMap(entry => entry.genres))].sort();

function progressFor(state: Record<string, AnimeProgress>, entry: AnimeEntry): AnimeProgress {
  return state[entry.id] ?? emptyProgress(entry.id);
}

export default function App() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(entries[0]?.id ?? '');
  const [progress, setProgress] = useState<Record<string, AnimeProgress>>(
    () => Object.fromEntries(initialProgress.map(item => [item.animeId, item])),
  );
  const [tagDraft, setTagDraft] = useState(initialProgress[0]?.tags.join(', ') ?? '');
  const matches = searchCatalogue(entries, query).filter(item =>
    (statusFilter === 'all' || progressFor(progress, item).status === statusFilter) &&
    (genreFilter === 'all' || item.genres.includes(genreFilter)));
  const selected = entries.find(item => item.id === selectedId);
  const current = selected ? progressFor(progress, selected) : undefined;
  const summary = selected && current ? summariseProgress(selected, current) : undefined;

  function changeProgress(animeId: string, transform: (previous: AnimeProgress) => AnimeProgress) {
    setProgress(previous => {
      const entry = entries.find(item => item.id === animeId);
      if (!entry) return previous;
      const updated = transform(progressFor(previous, entry));
      return updated === previous[animeId] ? previous : { ...previous, [animeId]: updated };
    });
  }
  function choose(entry: AnimeEntry) {
    setSelectedId(entry.id);
    setTagDraft(progressFor(progress, entry).tags.join(', '));
  }

  return <main className="app" id="main">
    <header className="masthead">
      <div className="topline">
        <span className="brand-symbol" aria-hidden="true">日</span>
        <span className="eyebrow">TAIYOU'S PERSONAL LIBRARY <span className="dot">/</span> ANIME</span>
        <span className="demo-pill">Synthetic demo</span>
      </div>
      <div className="headline">
        <div>
          <p className="kicker">A private collection, thoughtfully kept</p>
          <h1>Your anime, <em>your journey.</em></h1>
          <p className="intro">Follow each story, season and special. Every episode you mark is tracked individually, never guessed from a number.</p>
        </div>
        <div className="hero-count" aria-label={String(entries.length) + ' fictional series available'}>
          <strong>{entries.length.toString().padStart(2, '0')}</strong><span>sample series</span>
        </div>
      </div>
      <p className="notice"><strong>Demo only.</strong> All titles and progress are fictional. Changes exist in memory and reset on refresh. No account, external metadata or streaming is connected.</p>
    </header>

    <div className="workspace">
      <section className="catalogue" aria-labelledby="catalogue-heading">
        <div className="section-heading"><div><p className="eyebrow">THE SHELF</p><h2 id="catalogue-heading">Browse your catalogue</h2></div><span className="count">{matches.length} shown</span></div>
        <div className="filters">
          <label className="filter-search">Search titles or aliases
            <input type="search" placeholder="Find an anime…" autoComplete="off" value={query} onChange={event => setQuery(event.target.value)} />
          </label>
          <label>Watch status
            <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}>
              <option value="all">All statuses</option>
              {statuses.map(status => <option value={status} key={status}>{status[0]!.toUpperCase() + status.slice(1)}</option>)}
            </select>
          </label>
          <label>Genre
            <select value={genreFilter} onChange={event => setGenreFilter(event.target.value)}>
              <option value="all">All genres</option>
              {genres.map(genre => <option value={genre} key={genre}>{genre}</option>)}
            </select>
          </label>
        </div>
        {matches.length ? <ul className="cards">
          {matches.map((item, index) => {
            const state = progressFor(progress, item);
            const stats = summariseProgress(item, state);
            return <li key={item.id}>
              <button type="button" className={'series-card' + (selectedId === item.id ? ' is-selected' : '')}
                aria-pressed={selectedId === item.id} onClick={() => choose(item)}>
                <span aria-hidden="true" className={'poster poster-' + (entries.indexOf(item) % 3)}>
                  <span className="poster-mark">✦</span><span className="poster-number">0{index + 1}</span>
                </span>
                <span className="series-copy">
                  <span className="series-title">{item.title}</span>
                  <span className="series-meta">{item.genres.join(' · ')}</span>
                  <span className="series-foot"><span className="status-chip">{state.status}</span>
                    <span>{stats.watchedKnown} watched</span>
                  </span>
                </span>
                <span className="card-chevron" aria-hidden="true">›</span>
              </button>
            </li>;
          })}
        </ul> : <p className="empty" role="status">No anime match those filters. Try a different title, genre or status.</p>}
      </section>

      <section className="detail" aria-labelledby="detail-heading">
        {selected && current && summary ? <>
          <div className="detail-top">
            <p className="eyebrow">SERIES JOURNAL</p>
            <h2 id="detail-heading">{selected.title}</h2>
            <p className="aliases">{selected.aliases.join(' · ')}</p>
            <p className="synopsis">{selected.synopsis}</p>
            <div className="genre-tags">{selected.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
          </div>
          <div className="stats" aria-label="Viewing progress">
            <div><strong>{summary.watchedKnown}</strong><span>episodes watched</span></div>
            <div><strong>{summary.listedEpisodes}</strong><span>listed episodes</span></div>
            <div><strong>{summary.expectedRegular ?? '?'}</strong><span>regular episode total</span></div>
          </div>
          <div className="status-section">
            <label htmlFor="watch-status">Watching status</label>
            <select id="watch-status" value={current.status} onChange={event => changeProgress(selected.id, state => setWatchStatus(state, event.target.value as AnimeWatchStatus))}>
              {statuses.map(status => <option key={status} value={status}>{status[0]!.toUpperCase() + status.slice(1)}</option>)}
            </select>
          </div>
          <div className="episodes-heading">
            <h3>Seasons & episodes</h3>
            <p>Tick only the episodes you have watched. Specials and re-releases have their own IDs.</p>
          </div>
          <div className="seasons" key={selected.id}>
            {selected.seasons.map((season, index) => {
              const seasonEpisodes = episodesFor({ ...selected, seasons: [season] });
              const watched = seasonEpisodes.filter(ep => current.watchedEpisodeIds.includes(ep.id)).length;
              return <details key={season.id} open={index === 0 ? true : undefined}>
                <summary><span>{season.title}</span><span className="season-count">{watched}/{seasonEpisodes.length} listed <span aria-hidden="true">⌄</span></span></summary>
                {seasonEpisodes.length ? <ul className="episode-list">{seasonEpisodes.map(episode => {
                  const checked = current.watchedEpisodeIds.includes(episode.id);
                  return <li key={episode.id} className={checked ? 'watched' : ''}>
                    <label className="episode-row"><input type="checkbox" checked={checked}
                      onChange={event => changeProgress(selected.id, state => markEpisode(state, selected, episode.id, event.target.checked))} />
                      <span className="episode-title"><strong>{episode.title}</strong><small>
                        {episode.kind === 'regular' ? 'Episode' : episode.kind.toUpperCase()}
                        {episode.episodeNumber !== undefined ? ' ' + episode.episodeNumber : ''}
                        {episode.editionOfEpisodeId ? ' · Re-release' : ''}
                      </small></span>
                      <span className="watched-label">{checked ? 'Watched' : 'Unwatched'}</span>
                    </label>
                  </li>;
                })}</ul> : <p className="season-empty">Episodes have not yet been listed. The total may be unknown.</p>}
                {season.regularEpisodeTotal === null ? <p className="season-note">Regular episode total not yet confirmed.</p> : null}
              </details>;
            })}
          </div>
          <div className="notes-section">
            <h3>Personal notes</h3>
            <div className="notes-grid">
              <label>My rating
                <select value={current.rating ?? ''} onChange={event => changeProgress(selected.id, state => updateAnnotations(state, { rating: event.target.value ? Number(event.target.value) : null }))}>
                  <option value="">Unrated</option>
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(rating => <option key={rating} value={rating}>{rating}/10</option>)}
                </select>
              </label>
              <label>Comment
                <textarea rows={3} maxLength={2000} value={current.comment ?? ''} onChange={event => changeProgress(selected.id, state => updateAnnotations(state, { comment: event.target.value }))} placeholder="Your thoughts on this story…" />
              </label>
              <div className="tags-editor">
                <label htmlFor="tags">Personal tags (comma-separated)</label>
                <div className="tags-row"><input id="tags" value={tagDraft} maxLength={250} onChange={event => setTagDraft(event.target.value)} />
                  <button type="button" className="save-tags" onClick={() => changeProgress(selected.id, state => updateAnnotations(state, { tags: tagDraft.split(',') }))}>Save tags</button></div>
              </div>
              <fieldset className="collections">
                <legend>Collections</legend>
                {collections.map(collection => <label key={collection.id}>
                  <input type="checkbox" checked={current.collectionIds.includes(collection.id)}
                    onChange={event => changeProgress(selected.id, state => updateAnnotations(state, { collectionIds: event.target.checked
                      ? [...state.collectionIds, collection.id] : state.collectionIds.filter(id => id !== collection.id) }))} />
                  {collection.parentId ? '↳ ' : ''}{collection.title}
                </label>)}
              </fieldset>
            </div>
          </div>
        </> : <p className="empty">Select a series to explore its episodes.</p>}
      </section>
    </div>
    <footer>Standalone anime tracker prototype · Local-only synthetic data · No external services connected</footer>
  </main>;
}