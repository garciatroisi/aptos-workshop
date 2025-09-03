'use client'

import React, { useState } from 'react';
import { useWalletContext } from '../contexts/WalletContext';
import { Wallet, LogOut, Copy, Check, X, ExternalLink, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConnectWallet: React.FC = () => {
  const { account, connected, connect, disconnect, wallets, notDetectedWallets } = useWalletContext();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(account.address.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: { toString: () => string }) => {
    const addressStr = address.toString();
    return `${addressStr.slice(0, 6)}...${addressStr.slice(-4)}`;
  };

  const handleConnect = async (walletName: string) => {
    try {
      await connect(walletName);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setShowModal(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      // Fallback: force disconnect by refreshing the page
      window.location.reload();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowModal(true)}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-medium transition-all duration-200 ${
          connected && account 
            ? "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20" 
            : "bg-gradient-to-r from-galactic-purple to-galactic-pink text-white hover:scale-105"
        }`}
      >
        <Wallet size={20} />
        <span className="hidden sm:inline">
          {connected && account ? formatAddress(account.address) : "Connect Wallet"}
        </span>
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            
            {connected && account ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-galactic-purple to-galactic-pink rounded-lg flex items-center justify-center">
                      <Wallet size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Wallet Connected</h3>
                      <p className="text-gray-400 text-sm">Your wallet is ready</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <p className="text-gray-400 text-sm mb-2 font-medium">Wallet Address</p>
                    <div className="flex items-center gap-3">
                      <code className="text-white font-mono text-sm bg-gray-900 px-3 py-2 rounded flex-1">
                        {formatAddress(account.address)}
                      </code>
                      <button
                        onClick={copyAddress}
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
                        title="Copy address"
                      >
                        {copied ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleDisconnect}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <LogOut size={18} />
                      Disconnect Wallet
                    </button>
                    
                    <button
                      onClick={() => {
                        console.log('Force disconnect - refreshing page...');
                        window.location.reload();
                      }}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <X size={16} />
                      Force Disconnect (Refresh)
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-galactic-purple to-galactic-pink rounded-lg flex items-center justify-center">
                      <Wallet size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Connect Wallet</h3>
                      <p className="text-gray-400 text-sm">Choose your wallet</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {wallets.map((wallet) => (
                      <motion.button
                        key={wallet.name}
                        onClick={() => handleConnect(wallet.name)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-800 rounded-lg transition-colors text-white border border-gray-700 hover:border-gray-600 group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                          <img src={wallet.icon} alt={wallet.name} className="w-6 h-6" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{wallet.name}</div>
                          <div className="text-green-400 text-sm">Installed</div>
                        </div>
                        <div className="text-gray-400 group-hover:text-white transition-colors">
                          <ChevronDown size={20} className="rotate-[-90deg]" />
                        </div>
                      </motion.button>
                    ))}
                    
                    {notDetectedWallets.map((wallet) => (
                      <motion.a
                        key={wallet.name}
                        href={wallet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-800 rounded-lg transition-colors text-white border border-gray-700 hover:border-gray-600 group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">W</span>
                          </div>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{wallet.name}</div>
                          <div className="text-gray-400 text-sm">Install</div>
                        </div>
                        <div className="text-gray-400 group-hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </div>
                      </motion.a>
                    ))}
                    
                    {wallets.length === 0 && notDetectedWallets.length === 0 && (
                      <div className="p-8 text-center">
                        <Wallet size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg font-medium">No wallets detected</p>
                        <p className="text-gray-500 text-sm mt-2">Please install a wallet extension</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm text-center">
                      Don&apos;t have a wallet?{' '}
                      <a 
                        href="https://petra.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-galactic-pink hover:underline font-medium"
                      >
                        Download Petra
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectWallet;
