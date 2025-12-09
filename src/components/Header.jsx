import React from 'react'
import { Bookmark, Github } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="text-white" size={32} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Bookmark Manager</h1>
              <p className="text-gray-100 text-sm">Save, organize, and access your favorite links</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">            
            <a
              href="https://github.com/ayudhaa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;