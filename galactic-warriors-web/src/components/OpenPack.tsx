'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useWalletContext } from '../contexts/WalletContext';
import { Sparkles, AlertCircle, CheckCircle, Package, Eye, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { getUserCollectionPacks, prepareOpenPackTransaction, Pack } from '../actions/aptosActions';
import { AccountAuthenticator, Deserializer, MultiAgentTransaction } from '@aptos-labs/ts-sdk';

const OpenPack: React.FC = () => {
  const { account, connected, signTransaction, client } = useWalletContext();
  const [userPacks, setUserPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPacks, setLoadingPacks] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showOpenAnimation, setShowOpenAnimation] = useState(false);
  const [openingPackId, setOpeningPackId] = useState<string | null>(null);

  const loadUserPacks = useCallback(async () => {
    if (!connected || !account) return;
    
    setLoadingPacks(true);
    try {
      const blockchainPacks = await getUserCollectionPacks(account.address.toString());
      setUserPacks(blockchainPacks);
      setMessage(null);
    } catch (error) {
      console.error('❌ Error loading user packs:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to load packs from blockchain. Please try again.' 
      });
    } finally {
      setLoadingPacks(false);
    }
  }, [connected, account]);

  useEffect(() => {
    loadUserPacks();
  }, [connected, account, loadUserPacks]);

  const handleOpenSinglePack = async (packId: string) => {
    if (!connected || !account) {
      setMessage({ type: 'error', text: 'Please connect your wallet first' });
      return;
    }

    setOpeningPackId(packId);
    setLoading(true);
    setMessage(null);

    try {
      const transactionPayload = await prepareOpenPackTransaction(
        account.address.toString(),
        packId
      );

      const deserializer = new Deserializer(
        Uint8Array.from(transactionPayload.transactionBytes)
      );
      const txn = MultiAgentTransaction.deserialize(deserializer);
      
      const signResult = await signTransaction({
        transactionOrPayload: txn,
      });
      const senderAuth = signResult.authenticator;

      const deserializer2 = new Deserializer(
        Uint8Array.from(transactionPayload.creatorAuthBytes)
      );
      const creatorAuth = AccountAuthenticator.deserialize(deserializer2);

      const committedTransaction = await client.transaction.submit.multiAgent({
        transaction: txn,
        senderAuthenticator: senderAuth,
        additionalSignersAuthenticators: [creatorAuth],
      });

      await client.waitForTransaction({
        transactionHash: committedTransaction.hash,
      });

      setUserPacks(prev => prev.map(pack => 
        pack.tokenId === packId ? { ...pack, isOpened: true } : pack
      ));
      
      setShowOpenAnimation(true);
      setTimeout(() => setShowOpenAnimation(false), 3000);
      
      setMessage({ type: 'success', text: 'Pack opened successfully! Check your new NFT.' });
      
      setOpeningPackId(null);
    } catch (error) {
      console.error('❌ Error opening pack:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to open pack: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setLoading(false);
    }
  };



  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="galactic-card p-6 text-center"
      >
        <AlertCircle size={64} className="text-yellow-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Wallet Not Connected</h2>
        <p className="text-white/80 text-lg">
          You need to connect your wallet to open packs
        </p>
      </motion.div>
    );
  }

  const unopenedPacks = userPacks
    .filter(pack => !pack.isOpened)
    .sort((a, b) => {
      const packNumA = parseInt(a.packNumber || '0');
      const packNumB = parseInt(b.packNumber || '0');
      return packNumA - packNumB;
    });
    
  const openedPacks = userPacks
    .filter(pack => pack.isOpened)
    .sort((a, b) => {
      const packNumA = parseInt(a.packNumber || '0');
      const packNumB = parseInt(b.packNumber || '0');
      return packNumA - packNumB;
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="galactic-card p-8 text-center mb-8"
      >

          

          
          {showOpenAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/90 via-purple-600/90 to-pink-500/90 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-4"
                >
                  <Sparkles size={80} className="text-white drop-shadow-lg" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-lg font-bold"
                >
                  Pack Opened! 🎉
                </motion.p>
              </div>
            </motion.div>
          )}
        <h2 className="text-2xl font-bold text-white mb-3">Open Your Packs</h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{unopenedPacks.length}</div>
            <div className="text-white/60 text-xs">Available</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">{openedPacks.length}</div>
            <div className="text-white/60 text-xs">Opened</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">{userPacks.length}</div>
            <div className="text-white/60 text-xs">Total</div>
          </div>
        </div>

        <button
          onClick={loadUserPacks}
          disabled={loadingPacks}
          className="px-3 py-1.5 bg-gray-600/50 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={14} className={loadingPacks ? 'animate-spin' : ''} />
          {loadingPacks ? 'Loading...' : 'Refresh'}
        </button>
        
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg mt-4 ${
              message.type === 'success' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {message.text}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="galactic-card p-8 mb-8"
      >
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Available to Open ({unopenedPacks.length})
        </h3>
        
        {loadingPacks ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60 text-lg">Loading packs from blockchain...</p>
          </div>
        ) : unopenedPacks.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No packs available to open. Buy more packs to continue your collection!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unopenedPacks.map((pack) => (
              <motion.div
                key={pack.tokenId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 hover:border-gray-500 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="absolute top-10 right-10 z-10">
                  <div className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm text-white text-sm font-bold px-2 py-1 rounded-full border border-white/20">
                    #{pack.packNumber}
                  </div>
                </div>

                <div className="w-full h-94 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  <div className="relative group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src="/pack.png" 
                      alt="Pack" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => handleOpenSinglePack(pack.tokenId)}
                    disabled={loading && openingPackId === pack.tokenId}
                    className={`w-3/4 py-3 px-4 rounded-lg font-medium text-base transition-all duration-300 transform hover:scale-105 ${
                      loading && openingPackId === pack.tokenId
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
                    }`}
                  >
                    {loading && openingPackId === pack.tokenId ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Opening...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Eye size={16} />
                        <span>Open Pack</span>
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {openedPacks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="galactic-card p-8"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Already Opened ({openedPacks.length})
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openedPacks.map((pack) => (
              <motion.div
                key={pack.tokenId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 opacity-80 hover:opacity-100 transition-all duration-300 group"
              >
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20">
                    #{pack.packNumber}
                  </div>
                </div>

                <div className="w-full h-94 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  <div className="relative group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/pack.png" 
                      alt="Pack" 
                      className="w-full h-full object-contain drop-shadow-xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Opened Status Badge */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-4 py-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-white/70 text-sm font-medium">Already Opened</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OpenPack;
