'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';
import { createClient } from '@/supabase/supabaseClient';

export const BookMarkedMovies = createContext(null);

export function BookmarkedProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const data = useContext(DataContext);
  const supabase = createClient();

  useEffect(() => {
    supabase.from('bookmarks').select('*, watchlist(*)').then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log(data);
        setBookmarks(data);
      }
    }); 
  }, []);

  const toggleBookmark = (movieId) => {
    const movie = data.find(item => item.id === movieId);
    if (!movie) return;

    setBookmarks(prevBookmarks => {
      if (prevBookmarks.includes(movieId)) {
        return prevBookmarks.filter(id => id !== movieId);
      } else {
        return [...prevBookmarks, movieId];
      }
    });
  };

  return (
    <BookMarkedMovies.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookMarkedMovies.Provider>
  );
}