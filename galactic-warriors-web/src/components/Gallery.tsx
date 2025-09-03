'use client'

import React, { useState, useEffect } from 'react';
import { useWalletContext } from '../contexts/WalletContext';
import { Image, Filter, Search, Star, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { getUserGalleryAssets, Pack } from '../actions/aptosActions';

const Gallery: React.FC = () => {
  const { account, connected } = useWalletContext();
  const [galleryAssets, setGalleryAssets] = useState<{ aliens: Pack[], predators: Pack[], yodas: Pack[] }>({
    aliens: [],
    predators: [],
    yodas: []
  });
  const [filteredNFTs, setFilteredNFTs] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'collection' | 'rarity'>('collection');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadGalleryAssets = async () => {
    if (!connected || !account) return;
    
    setLoadingAssets(true);
    setMessage(null);
    
    try {
      const assets = await getUserGalleryAssets(account.address.toString());
      
      setGalleryAssets(assets);
      
      const allAssets = [...assets.aliens, ...assets.predators, ...assets.yodas];
      setFilteredNFTs(allAssets);
      
    } catch (error) {
      console.error('❌ Error loading gallery assets:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to load gallery assets from blockchain. Please try again.' 
      });
      
      setGalleryAssets({ aliens: [], predators: [], yodas: [] });
      setFilteredNFTs([]);
    } finally {
      setLoadingAssets(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && account) {
      loadGalleryAssets();
    } else {
      setLoading(false);
    }
  }, [connected, account]);

  useEffect(() => {
    let filtered: Pack[] = [];
    
    // Combine assets based on selected collection
    switch (selectedCollection) {
      case 'aliens':
        filtered = galleryAssets.aliens;
        break;
      case 'predators':
        filtered = galleryAssets.predators;
        break;
      case 'yodas':
        filtered = galleryAssets.yodas;
        break;
      default:
        filtered = [...galleryAssets.aliens, ...galleryAssets.predators, ...galleryAssets.yodas];
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.tokenId.includes(searchTerm)
      );
    }

    // Sort assets
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'collection':
          const collectionA = getCollectionIcon(a);
          const collectionB = getCollectionIcon(b);
          return collectionA.localeCompare(collectionB);
        case 'rarity':
          const rarityOrder = { 'mythic': 0, 'legendary': 1, 'epic': 2, 'rare': 3, 'uncommon': 4, 'common': 5 };
          const rarityA = rarityOrder[a.rarity?.toLowerCase() as keyof typeof rarityOrder] ?? 6;
          const rarityB = rarityOrder[b.rarity?.toLowerCase() as keyof typeof rarityOrder] ?? 6;
          return rarityA - rarityB;
        default:
          return 0;
      }
    });

    setFilteredNFTs(sorted);
  }, [galleryAssets, searchTerm, selectedCollection, sortBy]);

  const collectionOptions = [
    { value: 'all', label: 'All Collections' },
    { value: 'aliens', label: 'Aliens' },
    { value: 'predators', label: 'Predators' },
    { value: 'yodas', label: 'Yodas' },
  ];

  const getCollectionIcon = (asset: Pack) => {
    const name = asset.tokenName.toLowerCase();
    if (name.includes('alien')) return 'A';
    if (name.includes('predator')) return 'P';
    if (name.includes('yoda')) return 'Y';
    return 'G';
  };

  const getCollectionColor = (asset: Pack) => {
    const icon = getCollectionIcon(asset);
    switch (icon) {
      case 'A': return 'from-green-500 to-teal-600';
      case 'P': return 'from-red-500 to-orange-600';
      case 'Y': return 'from-yellow-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'bg-gray-400';
      case 'uncommon': return 'bg-green-400';
      case 'rare': return 'bg-blue-400';
      case 'epic': return 'bg-purple-400';
      case 'legendary': return 'bg-orange-400';
      case 'mythic': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityStyle = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return {
          bgColor: 'bg-gradient-to-r from-gray-500/90 to-gray-600/90',
          textColor: 'text-white',
          borderColor: 'border border-gray-400/50'
        };
      case 'uncommon':
        return {
          bgColor: 'bg-gradient-to-r from-green-500/90 to-emerald-600/90',
          textColor: 'text-white',
          borderColor: 'border border-green-400/50'
        };
      case 'rare':
        return {
          bgColor: 'bg-gradient-to-r from-blue-500/90 to-indigo-600/90',
          textColor: 'text-white',
          borderColor: 'border border-blue-400/50'
        };
      case 'epic':
        return {
          bgColor: 'bg-gradient-to-r from-purple-500/90 to-violet-600/90',
          textColor: 'text-white',
          borderColor: 'border border-purple-400/50'
        };
      case 'legendary':
        return {
          bgColor: 'bg-gradient-to-r from-orange-500/90 to-amber-600/90',
          textColor: 'text-white',
          borderColor: 'border border-orange-400/50'
        };
      case 'mythic':
        return {
          bgColor: 'bg-gradient-to-r from-red-500/90 to-rose-600/90',
          textColor: 'text-white',
          borderColor: 'border border-red-400/50'
        };
      default:
        return {
          bgColor: 'bg-gradient-to-r from-gray-400/90 to-gray-500/90',
          textColor: 'text-white',
          borderColor: 'border border-gray-300/50'
        };
    }
  };

  const getRarityBadge = (rarity: string) => {
    const color = getRarityColor(rarity);
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color} text-white border border-white/20`}>
        {rarity}
      </span>
    );
  };

  const getSerialNumberBadge = (serialNumber: string) => {
    return (
      <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500/90 via-blue-500/90 to-indigo-500/90 border border-cyan-400/50 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
        #{serialNumber}
      </span>
    );
  };

  const getPackNumberBadge = (packNumber: string) => {
    return (
      <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-500/90 via-pink-500/90 to-red-500/90 border border-purple-400/50 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
        #{packNumber}
      </span>
    );
  };

  const isPackAsset = (asset: Pack) => {
    return asset.packNumber && asset.packNumber !== "Unknown";
  };

  const getAptosExplorerUrl = (tokenId: string) => {
    return `https://explorer.aptoslabs.com/token/${tokenId}?network=testnet`;
  };

  const getIpfsUrl = (uri: string): string => {
    if (uri.startsWith('ipfs://')) {
      // Convert ipfs:// to https://ipfs.io/ipfs/
      return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    return uri; // Return original URI if it's not IPFS
  };

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="galactic-card p-12 text-center"
      >
        <AlertCircle size={64} className="text-yellow-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Wallet Not Connected</h2>
        <p className="text-white/80 text-lg">
          You need to connect your wallet to view your gallery
        </p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-galactic-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">My Galactic Warriors Gallery</h2>
        <p className="text-white/80 text-lg">
          Your personal collection of galactic warriors from opened packs
        </p>
      </div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="galactic-card p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <button
            onClick={loadGalleryAssets}
            disabled={loadingAssets}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} className={loadingAssets ? 'animate-spin' : ''} />
            {loadingAssets ? 'Loading...' : 'Refresh Gallery'}
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-galactic-purple"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-white/60" />
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-galactic-purple"
            >
              {collectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/60">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'collection' | 'rarity')}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-galactic-purple"
            >
              <option value="collection">Collection</option>
              <option value="rarity">Rarity</option>
            </select>
          </div>
        </div>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg mb-6 ${
            message.type === 'success' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <AlertCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNFTs.map((asset, index) => (
          <motion.div
            key={asset.tokenId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="galactic-card p-4 hover:scale-105 transition-transform duration-300 cursor-pointer group"
          >
            <div className="w-full h-94 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
              {asset.tokenUri ? (
                <>
                  <img
                    src={getIpfsUrl(asset.tokenUri)}
                    alt={asset.tokenName}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className={`w-full h-full bg-gradient-to-r ${getCollectionColor(asset)} flex items-center justify-center absolute inset-0`}
                    style={{ display: 'none' }}
                  >
                    <span className="text-white font-bold text-4xl">
                      {getCollectionIcon(asset)}
                    </span>
                  </div>
                </>
              ) : (
                <div className={`w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-r ${getCollectionColor(asset)} group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white font-bold text-4xl">
                    {getCollectionIcon(asset)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white group-hover:text-galactic-pink transition-colors">
                  {asset.tokenName}
                </h3>
                <span className="text-white/60 text-sm">#{asset.tokenId.slice(-8)}</span>
              </div>

              {isPackAsset(asset) ? (
                <div className="text-center">
                  <p className="text-white/80 text-sm mb-1">Pack Number</p>
                  {getPackNumberBadge(asset.packNumber!)}
                </div>
              ) : asset.serialNumber && asset.serialNumber !== "Unknown" ? (
                <div className="text-center">
                  <p className="text-white/80 text-sm mb-1">Serial Number</p>
                  {getSerialNumberBadge(asset.serialNumber)}
                </div>
              ) : null}

              <div className="text-white/60 text-sm space-y-2">
                <p>Collection: {getCollectionIcon(asset) === 'A' ? 'Aliens' : 
                               getCollectionIcon(asset) === 'P' ? 'Predators' : 
                               getCollectionIcon(asset) === 'Y' ? 'Yodas' : 'Unknown'}</p>
                <p>Rarity: {getRarityBadge(asset.rarity)}</p>             
              </div>

              <a
                href={getAptosExplorerUrl(asset.tokenId)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                View on Aptos Explorer
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredNFTs.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Image size={64} className="text-white/40 mx-auto mb-4" />
          <p className="text-white/60 text-lg">No assets found in your gallery</p>
          <p className="text-white/40 text-sm mt-2">
            {selectedCollection === 'all' 
              ? 'Open some packs to collect galactic warriors!' 
              : `No ${selectedCollection} found. Try opening more packs!`}
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="galactic-card p-6 mt-8 text-center"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {filteredNFTs.length}
            </h3>
            <p className="text-white/70">Filtered Results</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {galleryAssets.aliens.length + galleryAssets.predators.length + galleryAssets.yodas.length}
            </h3>
            <p className="text-white/70">Total Assets</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
