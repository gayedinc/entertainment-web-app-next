'use client';
import { useContext, useState } from 'react';
import { DataContext } from '@/context/DataContext';
import { BookMarkedMovies } from '@/context/BookmarkContext';
import Recommended from '@/components/Recommended';
import { DotSvg } from '@/components/Svg';
import { toast } from 'react-hot-toast';

export default function HomePage() {
  const [searchText, setSearchText] = useState('');
  console.log("HomePage yüklendi")

  return (
    <div className="home-page">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search for movies or TV series"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {searchText.trim() === '' ? (
        <Trending />
      ) : (
        <Search searchText={searchText} />
      )}
    </div>
  );
}

function Trending() {
  const data = useContext(DataContext);

  console.log("data", data);


  return (
    <>
      <h2 className="page-title">Trending</h2>
      <div className="slider-container">
        <div className="slider-track">
          {data?.filter(item => item.trending).map((item, i) => (
            <TrendCard key={i} {...item} />
          ))}
        </div>
      </div>

      <div className="recommended">
        <h2>Recommended for you</h2>
        <div className="recommended-container">
          {data?.map((item, i) => (
            <Recommended key={i} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

function TrendCard({ id, trailer, image, release_date, type, age_rating, title }) {
  const { bookmarks, toggleBookmark } = useContext(BookMarkedMovies);

  function handleBookmarks() {
    toggleBookmark(id);
    if (bookmarks.includes(id)) {
      toast.success('Removed from Bookmarked list.');
    } else {
      const message = type === 'series'
        ? `"${title}" added to your Bookmarked Series list.`
        : `"${title}" added to your Bookmarked Movies list."`;
      toast.success(message);
    }
  }

  return (
    <div className="trend-container">
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
      <div className="trend-card" onClick={() => window.open(trailer, '_blank')}>
        <img src={image} />
        <div className="card-text">
          <div className="card-info">
            <span>{new Date(release_date).getFullYear()}</span>
            <DotSvg />
            <span>{type}</span>
            <DotSvg />
            <span>{age_rating}</span>
          </div>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
}

function Search({ searchText }) {
  const data = useContext(DataContext);

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="filtered-section">
      <h2>
        Found {filtered.length} results for '{searchText}'
      </h2>
      <div className="filtered-data">
        {filtered.map((item, i) => (
          <Recommended key={i} {...item} />
        ))}
      </div>
    </div>
  );
}