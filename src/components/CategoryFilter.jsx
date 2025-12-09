import React from 'react'
import { Filter } from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="relative w-full md:w-auto">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;