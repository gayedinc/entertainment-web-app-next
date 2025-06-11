'use client';
import { createClient } from '@/supabase/supabaseClient';
import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext([]);

export function DataContextProvider({ children }) {
  const [data, setData] = useState([]);

  const supabase = createClient();

  useEffect(() => {
    supabase.from('watchlist').select('*').then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
    });
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}