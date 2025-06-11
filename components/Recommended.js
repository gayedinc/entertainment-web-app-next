'use client';
import { useContext } from 'react';
import { BookMarkedMovies } from '../context/BookmarkContext';
import { DotSvg, MovieSvg, TvSeriesSvg } from './Svg';

export default function Recommended({ id, trailer, image, release_date, type, age_rating, title }) {
  const { bookmarks, toggleBookmark } = useContext(BookMarkedMovies);

  const isBookmarked = bookmarks?.some(bookmark => bookmark.watch_id === id);

  function handleBookmarks() {
    toggleBookmark(id);
  }

  return (
    <div className="recommended-content">
      <button onClick={handleBookmarks}>
        <img
          src={
            isBookmarked
              ? '/img/bookmarked.svg'
              : '/img/not-bookmarked.svg'
          }
          alt="bookmark icon"
        />
      </button>

      <div className="reco-card" onClick={() => window.open(trailer, '_blank')}>
        <img src={image} alt={title} />
        <div className="reco-text">
          <div className="reco-info">
            <span>{new Date(release_date).getFullYear()}</span>
            <DotSvg />
            <span>
              {type === 'movie' ? <MovieSvg /> : <TvSeriesSvg />}
              {type}
            </span>
            <DotSvg />
            <span>{age_rating}</span>
          </div>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
}