'use client';
import { useContext } from 'react';
import Image from 'next/image';
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
        <Image
          src={
            isBookmarked
              ? '/img/bookmarked.svg'
              : '/img/not-bookmarked.svg'
          }
          alt="bookmark icon"
          width={24}
          height={24}
        />
      </button>

      <div className="reco-card" onClick={() => window.open(trailer, '_blank')}>
        <Image 
          src={image} 
          alt={title}
          width={470}
          height={230}
          style={{
            objectFit: 'cover',
          }}
        />
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