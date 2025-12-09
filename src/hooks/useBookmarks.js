import { useState, useEffect } from 'react';
import { fetchMetadata } from '../utils/scraper';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = async (bookmark) => {
    let newBookmark = { ...bookmark };
    if (!bookmark.title && bookmark.url) {
      try {
        const metadata = await fetchMetadata(bookmark.url);
        newBookmark = { ...newBookmark, ...metadata };
      } catch (error) {
        console.error('Failed to fetch metadata:', error);
      }
    }

    const bookmarkWithId = {
      ...newBookmark,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setBookmarks(prev => [bookmarkWithId, ...prev]);
    return bookmarkWithId;
  };

  const deleteBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const updateBookmark = (id, updates) => {
    setBookmarks(prev => prev.map(b => 
      b.id === id ? { ...b, ...updates } : b
    ));
  };

  return {
    bookmarks,
    addBookmark,
    deleteBookmark,
    updateBookmark,
  };
};