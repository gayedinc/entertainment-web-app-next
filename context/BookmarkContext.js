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
      toast.error('Yer işaretleri yüklenirken bir hata oluştu.');
    } else {
      setBookmarks(bookmarksData);
    }
  };

  const toggleBookmark = async (movieId) => {
    if (!user) {
      toast.error('Yer işareti eklemek için giriş yapmalısınız.');
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

        toast.success(`"${movie.title}" yer işaretlerinden kaldırıldı.`);
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
          ? `"${movie.title}" diziler yer işaretlerine eklendi.`
          : `"${movie.title}" filmler yer işaretlerine eklendi.`;

        toast.success(message);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Yer işareti eklenirken/kaldırılırken bir hata oluştu.');
    }
  };

  return (
    <BookMarkedMovies.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookMarkedMovies.Provider>
  );
}