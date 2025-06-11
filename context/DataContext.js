'use client';
import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext([]);

export function DataContextProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((json) => {
        const dataWithIds = json.map((item) => ({
          ...item,
          id: `${item.title.replace(/\s/g, '-')}-${item.release_date}`,
        }));
        setData(dataWithIds);
      });
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}