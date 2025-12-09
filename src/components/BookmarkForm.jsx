import React, { useState } from 'react';
import { X, Link, Tag, Globe, Hash, FileText, Sparkles, ChevronDown } from 'lucide-react';

const BookmarkForm = ({ onClose, onAdd }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    { value: 'work', label: 'Work', color: 'bg-gray-500', icon: '💼' },
    { value: 'personal', label: 'Personal', color: 'bg-green-500', icon: '🏠' },
    { value: 'learning', label: 'Learning', color: 'bg-purple-500', icon: '📚' },
    { value: 'entertainment', label: 'Entertainment', color: 'bg-pink-500', icon: '🎬' },
    { value: 'shopping', label: 'Shopping', color: 'bg-yellow-500', icon: '🛒' },
    { value: 'finance', label: 'Finance', color: 'bg-emerald-500', icon: '💰' },
    { value: 'health', label: 'Health', color: 'bg-red-500', icon: '❤️' },
    { value: 'travel', label: 'Travel', color: 'bg-cyan-500', icon: '✈️' },
  ];

  const suggestedTags = ['react', 'javascript', 'tutorial', 'productivity', 'design', 'tools', 'resources'];

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddSuggestedTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    setIsLoading(true);
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    const newBookmark = {
      url: formattedUrl,
      title: title || null,
      category,
      description,
      tags,
      createdAt: new Date().toISOString(),
    };

    try {
      await onAdd(newBookmark);
      setUrl('');
      setTitle('');
      setCategory('work');
      setDescription('');
      setTags([]);
      setTagInput('');
      onClose();
    } catch (error) {
      console.error('Error adding bookmark:', error);
      alert('Failed to add bookmark. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput) {
      handleAddTag(e);
    }
    if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    }
  };

  const exampleSites = [
    { name: 'GitHub', url: 'github.com', icon: '🐙' },
    { name: 'YouTube', url: 'youtube.com', icon: '📺' },
    { name: 'MDN', url: 'developer.mozilla.org', icon: '📖' },
    { name: 'Twitter', url: 'twitter.com', icon: '🐦' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="bg-gradient-to-r from-gray-600 to-purple-600 px-6 py-8 md:px-8 md:py-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Link className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Add New Bookmark
                    </h2>
                    <p className="text-gray-100 text-sm md:text-base mt-1">
                      Save and organize your favorite links
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 md:relative md:top-0 md:right-0 
                           p-2 hover:bg-white/20 rounded-lg text-white transition-colors
                           focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={18} className="text-gray-600 dark:text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Quick Add Examples
                    </h3>
                  </div>
                  <div className="flex space-x-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible">
                    {exampleSites.map((site, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setUrl(`https://${site.url}`);
                          setTitle(site.name);
                        }}
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 
                                 bg-white dark:bg-gray-800 border border-gray-200 
                                 dark:border-gray-800 rounded-lg hover:bg-gray-50 
                                 dark:hover:bg-gray-900/30 transition-colors"
                      >
                        <span className="text-lg">{site.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {site.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Globe size={18} />
                    Website URL *
                    <span className="text-xs text-gray-500 ml-auto">
                      Required
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔗
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full pl-10 pr-4 py-3 md:py-4 text-base
                               border border-gray-300 dark:border-gray-700 
                               dark:bg-gray-800 rounded-xl 
                               focus:ring-2 focus:ring-gray-500 focus:border-transparent
                               transition-all"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Leave title empty to auto-fetch from website
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Title (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        📝
                      </div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter custom title..."
                        className="w-full pl-10 pr-4 py-3 md:py-4
                                 border border-gray-300 dark:border-gray-700 
                                 dark:bg-gray-800 rounded-xl 
                                 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Tag size={18} />
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 md:py-4 appearance-none
                                 border border-gray-300 dark:border-gray-700 
                                 dark:bg-gray-800 rounded-xl 
                                 focus:ring-2 focus:ring-gray-500 focus:border-transparent
                                 cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Quick Category Select
                  </label>
                  <div className="flex space-x-2 overflow-x-auto pb-3 md:flex-wrap md:gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg 
                                 transition-all transform hover:scale-105 active:scale-95
                                 ${category === cat.value
                                   ? `${cat.color} text-white shadow-lg`
                                   : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                 }`}
                      >
                        <span className="text-sm">{cat.icon}</span>
                        <span className="text-sm font-medium whitespace-nowrap">
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center justify-between w-full p-3 
                             bg-gray-50 dark:bg-gray-800 rounded-xl 
                             hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Advanced Options
                      </span>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${showAdvanced ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                    <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add notes about this bookmark..."
                          rows="3"
                          className="w-full p-3 text-sm
                                   border border-gray-300 dark:border-gray-700 
                                   dark:bg-gray-900 rounded-lg 
                                   focus:ring-2 focus:ring-gray-500 focus:border-transparent
                                   resize-none"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Hash size={16} />
                          Tags
                        </label>
                        
                        <div className="mb-3">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder="Type tag and press Enter..."
                              className="flex-1 px-3 py-2 text-sm
                                       border border-gray-300 dark:border-gray-700 
                                       dark:bg-gray-900 rounded-lg 
                                       focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={handleAddTag}
                              className="px-4 py-2 bg-gray-600 text-white text-sm 
                                       font-medium rounded-lg hover:bg-gray-700 
                                       transition-colors whitespace-nowrap"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {tags.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              {tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1 px-3 py-1 
                                           bg-gray-100 dark:bg-gray-900/30 
                                           text-gray-800 dark:text-gray-300 
                                           text-sm rounded-full"
                                >
                                  #{tag}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-gray-600 dark:text-gray-400 
                                             hover:text-gray-800 dark:hover:text-gray-200"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            Suggested tags:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {suggestedTags.map((tag, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleAddSuggestedTag(tag)}
                                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 
                                         text-gray-700 dark:text-gray-300 rounded-lg 
                                         hover:bg-gray-200 dark:hover:bg-gray-700 
                                         transition-colors"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 md:flex-none md:w-auto px-6 py-3 md:py-3
                             border border-gray-300 dark:border-gray-700 
                             text-gray-700 dark:text-gray-300 rounded-xl 
                             font-medium hover:bg-gray-50 dark:hover:bg-gray-800 
                             transition-colors active:scale-95"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex-1 md:flex-auto" />
                  
                  <button
                    type="submit"
                    disabled={isLoading || !url}
                    className="flex-1 md:flex-none md:w-auto px-6 py-3 md:py-3
                             bg-gradient-to-r from-gray-600 to-purple-600 
                             text-white rounded-xl font-medium 
                             hover:from-gray-700 hover:to-purple-700 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Add Bookmark
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkForm;