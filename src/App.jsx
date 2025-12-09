import React from 'react'
import { useState, useEffect } from 'react';
import { Bookmark, Plus, Search, Filter, Heart, Coffee, Github, Code, ExternalLink, Users } from 'lucide-react';
import Header from './components/Header';
import BookmarkForm from './components/BookmarkForm';
import BookmarkCard from './components/BookmarkCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import { useBookmarks } from './hooks/useBookmarks';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { bookmarks, addBookmark, deleteBookmark, updateBookmark } = useBookmarks();

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = 
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || bookmark.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(bookmarks.map(b => b.category))];
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              <Plus size={20} />
              Add Bookmark
            </button>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Bookmarks</h3>
            <p className="text-3xl font-bold text-gray-800">{bookmarks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm font-medium">Categories</h3>
            <p className="text-3xl font-bold text-gray-800">{categories.length - 1}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm font-medium">Filtered</h3>
            <p className="text-3xl font-bold text-gray-800">{filteredBookmarks.length}</p>
          </div>
        </div>

        {filteredBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map(bookmark => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onDelete={deleteBookmark}
                onUpdate={updateBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bookmark className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookmarks found</h3>
            <p className="text-gray-500">Add your first bookmark or try a different search</p>
          </div>
        )}
      </main>

      {/* ========== FOOTER SECTION ========== */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {bookmarks.length} bookmarks saved
                </span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Back to top ↑
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-4">
                <span className='text-xs font-medium'>
                    made with♥️
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <BookmarkForm 
              onClose={() => setShowForm(false)}
              onAdd={addBookmark}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;