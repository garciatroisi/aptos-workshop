'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import BuyPack from '@/components/BuyPack';
import RedeemPack from '@/components/RedeemPack';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import { Home, Package, Gift, Image } from 'lucide-react';
import { Tab } from '@/types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('about');

  const tabs: Tab[] = [
    { id: 'about', label: 'About', icon: Home },
    { id: 'buy', label: 'Buy Pack', icon: Package },
    { id: 'redeem', label: 'Redeem Pack', icon: Gift },
    { id: 'gallery', label: 'Gallery', icon: Image },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <About />;
      case 'buy':
        return <BuyPack />;
      case 'redeem':
        return <RedeemPack />;
      case 'gallery':
        return <Gallery />;
      default:
        return <About />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-galactic-blue via-galactic-purple to-galactic-pink">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Navigation 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>
        
        <div className="mt-6">
          {renderContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
