'use client';
import { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import Recommended from './Recommended';

export default function Movies() {
  const data = useContext(DataContext);
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <h2 className="page-title">Movies</h2>
      <div className="movies">
        {data
          ?.filter(item => item.type === 'movie')
          .filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((item, i) => (
            <Recommended key={i} {...item} />
          ))}
      </div>
    </>
  );
}