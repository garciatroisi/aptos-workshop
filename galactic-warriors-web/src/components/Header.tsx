'use client'

import React from 'react';
import ConnectWallet from './ConnectWallet';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-galactic-blue via-galactic-purple to-galactic-pink text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a 
              href="https://spacedev.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden hover:bg-white/30 transition-colors"
            >
              <img 
                src="/spacedev-logo.png" 
                alt="Spacedev" 
                className="w-12 h-12 object-contain"
              />
            </a>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Galactic Warriors Packs
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                Collect the universe, one pack at a time
              </p>
            </div>
          </div>

          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};

export default Header;
