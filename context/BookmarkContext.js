'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';

export const BookMarkedMovies = createContext(null);

export function BookmarkedProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const data = useContext(DataContext);

  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // We only want to save to localStorage if bookmarks has been initialized
    if (bookmarks.length > 0) {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

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