'use client';
import { useContext } from 'react';
import { BookMarkedMovies } from '../context/BookmarkContext';
import { DotSvg, MovieSvg, TvSeriesSvg } from './Svg';
import { toast } from 'react-hot-toast';

export default function Recommended({ id, trailer, image, release_date, type, age_rating, title }) {
  const { bookmarks, toggleBookmark } = useContext(BookMarkedMovies);

  function handleBookmarks() {
    toggleBookmark(id);
    if (bookmarks.includes(id)) {
      toast.success("Removed from Bookmarked list.");
    } else {
      const message = type === 'series'
        ? `"${title}" added to your Bookmarked Series list.`
        : `"${title}" added to your Bookmarked Movies list.`;

      toast.success(message);
    }
  }

  return (
    <div className="recommended-content">
      <button onClick={handleBookmarks}>
        <img
          src={
            bookmarks.includes(id)
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