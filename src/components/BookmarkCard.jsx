import React from 'react'
import { useState } from 'react';
import { 
  Copy, 
  Trash2, 
  Edit2, 
  Check, 
  Globe,
  Calendar,
  Tag
} from 'lucide-react';
import { format } from 'date-fns';

const BookmarkCard = ({ bookmark, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [editedTitle, setEditedTitle] = useState(bookmark.title);
  const [editedCategory, setEditedCategory] = useState(bookmark.category);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookmark.url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdate(bookmark.id, {
      title: editedTitle,
      category: editedCategory,
    });
    setIsEditing(false);
  };

  const categoryColors = {
    work: 'bg-gray-100 text-gray-800',
    personal: 'bg-green-100 text-green-800',
    learning: 'bg-purple-100 text-purple-800',
    entertainment: 'bg-pink-100 text-pink-800',
    shopping: 'bg-yellow-100 text-yellow-800',
    default: 'bg-gray-100 text-gray-800',
  };

  const colorClass = categoryColors[bookmark.category] || categoryColors.default;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={bookmark.favicon} 
              alt="Favicon"
              className="w-10 h-10 rounded-lg"
              onError={(e) => {
                e.target.src = `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=64`;
              }}
            />
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2"
                  autoFocus
                />
              ) : (
                <h3 className="font-bold text-lg text-gray-800 truncate">
                  {bookmark.title}
                </h3>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Globe size={12} />
                <a 
                  href={bookmark.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="truncate hover:text-gray-600 transition-colors"
                >
                  {bookmark.url.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isEditing ? (
                <Check size={18} onClick={handleSave} />
              ) : (
                <Edit2 size={18} />
              )}
            </button>
            <button
              onClick={() => onDelete(bookmark.id)}
              className="p-2 hover:bg-red-50 rounded-lg text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {bookmark.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {bookmark.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            {isEditing ? (
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="px-3 py-1 rounded-full border"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="learning">Learning</option>
                <option value="entertainment">Entertainment</option>
                <option value="shopping">Shopping</option>
              </select>
            ) : (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                <Tag size={12} className="inline mr-1" />
                {bookmark.category}
              </span>
            )}
            
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} />
              {format(new Date(bookmark.createdAt), 'MMM d')}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-all ${
              isCopied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isCopied ? (
              <>
                <Check size={14} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy URL
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;