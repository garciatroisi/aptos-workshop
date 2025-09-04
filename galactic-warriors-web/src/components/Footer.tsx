'use client'

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-white/10 mt-auto bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a 
                href="https://aptos.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-all duration-300 hover:scale-105"
              >
                <img 
                  src="/aptos-logo.png" 
                  alt="Aptos" 
                  className="h-6 w-auto opacity-80"
                />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>&</span>
              <a 
                href="https://spacedev.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-all duration-300 hover:scale-105"
              >
                <img 
                  src="/spacedev-logo.png" 
                  alt="Spacedev" 
                  className="w-6 h-auto opacity-80"
                />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <a 
              href="https://aptos.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a 
              href="https://github.com/aptos-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>© 2025 Galactic Warriors Packs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
