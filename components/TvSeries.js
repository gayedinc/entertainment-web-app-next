'use client';
import { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import Recommended from './Recommended';

export default function TvSeries() {
  const data = useContext(DataContext);
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search for TV series"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <h2 className="page-title">TV Series</h2>
      <div className="series">
        {data
          ?.filter(item => item.type === 'series')
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