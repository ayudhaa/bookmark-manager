import React from 'react'
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search bookmarks..."
        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;