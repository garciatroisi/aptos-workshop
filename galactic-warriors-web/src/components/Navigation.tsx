'use client'

import React from 'react';
import { Tab } from '../types';

interface NavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="galactic-card p-4 mb-6">
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-galactic-purple to-galactic-pink text-white shadow-lg scale-105' 
                  : 'bg-white/20 text-white/80 hover:bg-white/30 hover:text-white hover:scale-105'
                }
              `}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
