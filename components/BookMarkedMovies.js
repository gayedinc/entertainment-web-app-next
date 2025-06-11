'use client';
import { useContext, useState } from 'react';
import { BookMarkedMovies } from '../context/BookmarkContext';
import Recommended from './Recommended';

export default function BookmarkedMovies() {
  const [searchText, setSearchText] = useState('');
  const { bookmarks } = useContext(BookMarkedMovies);

  const filteredData = bookmarks?.filter(item => item.watchlist.title.toLowerCase().includes(searchText.toLowerCase()));

  console.log(filteredData);

  return (
    <>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search for bookmarked shows"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="bookmarked-content">
        <div className="bookmarked-movies">
          <h2>Bookmarked Movies</h2>
          <div className="bookmarked-data">
            {filteredData?.filter(item => item.watchlist.type === 'movie' && item.watchlist.title.toLowerCase().includes(searchText.toLowerCase()))
              .map((item, i) => (
                <Recommended key={i} {...item.watchlist} />
              )) || <p>No bookmarked movies yet.</p>}
          </div>
        </div>

        <div className="bookmarked-series">
          <h2>Bookmarked Series</h2>
          <div className="bookmarked-data">
            {filteredData?.filter(item => item.watchlist.type === 'series' && item.watchlist.title.toLowerCase().includes(searchText.toLowerCase()))
              .map((item, i) => (
                <Recommended key={i} {...item.watchlist} />
              )) || <p>No bookmarked series yet.</p>}
          </div>
        </div>
      </div>
    </>
  );
}