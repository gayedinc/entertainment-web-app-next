'use client';
import { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { BookMarkedMovies } from '../context/BookmarkContext';
import Recommended from './Recommended';

export default function BookmarkedMovies() {
  const data = useContext(DataContext);
  const { bookmarks } = useContext(BookMarkedMovies);
  const [searchText, setSearchText] = useState('');

  const filteredData = data?.filter(item => bookmarks.includes(item.id));

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
            {filteredData?.filter(item => item.type === 'movie' && item.title.toLowerCase().includes(searchText.toLowerCase()))
              .map((item, i) => (
                <Recommended key={i} {...item} />
              )) || <p>No bookmarked movies yet.</p>}
          </div>
        </div>

        <div className="bookmarked-series">
          <h2>Bookmarked Series</h2>
          <div className="bookmarked-data">
            {filteredData?.filter(item => item.type === 'series' && item.title.toLowerCase().includes(searchText.toLowerCase()))
              .map((item, i) => (
                <Recommended key={i} {...item} />
              )) || <p>No bookmarked series yet.</p>}
          </div>
        </div>
      </div>
    </>
  );
}