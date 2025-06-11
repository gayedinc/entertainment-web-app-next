'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';
import { UserContext } from './UserContext';
import { createClient } from '@/supabase/supabaseClient';
import { toast } from 'react-hot-toast';

export const BookMarkedMovies = createContext(null);

export function BookmarkedProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const data = useContext(DataContext);
  const { user } = useContext(UserContext);
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
    }
  }, [user]);

  const fetchBookmarks = async () => {
    const { data: bookmarksData, error } = await supabase
      .from('bookmarks')
      .select('*, watchlist(*)')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching bookmarks:', error);
      toast.error('An error occurred while loading bookmarks.');
    } else {
      setBookmarks(bookmarksData);
    }
  };

  const toggleBookmark = async (movieId) => {
    if (!user) {
      toast.error('You must be logged in to add bookmarks.');
      return;
    }

    const movie = data.find(item => item.id === movieId);
    if (!movie) return;

    const existingBookmark = bookmarks.find(b => b.watch_id === movieId);

    try {
      if (existingBookmark) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('watch_id', movieId);

        if (error) throw error;

        setBookmarks(prevBookmarks => 
          prevBookmarks.filter(b => b.watch_id !== movieId)
        );

        toast.success(`"${movie.title}" removed from bookmarks.`);
      } else {
        // Add bookmark
        const { data: newBookmark, error } = await supabase
          .from('bookmarks')
          .insert([
            {
              user_id: user.id,
              watch_id: movieId
            }
          ])
          .select('*, watchlist(*)');

        if (error) throw error;

        setBookmarks(prevBookmarks => [...prevBookmarks, newBookmark[0]]);

        const message = movie.type === 'series'
          ? `"${movie.title}" added to series bookmarks.`
          : `"${movie.title}" added to movie bookmarks.`;

        toast.success(message);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('An error occurred while adding/removing bookmark.');
    }
  };

  return (
    <BookMarkedMovies.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookMarkedMovies.Provider>
  );
}