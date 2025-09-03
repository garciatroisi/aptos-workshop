'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

// Create Aptos client configuration
const aptosConfig = new AptosConfig({ 
  network: Network.TESTNET 
});
const aptos = new Aptos(aptosConfig);

// Custom hook to provide additional functionality
const useCustomWallet = () => {
  const walletAdapter = useWallet();
  
  return {
    ...walletAdapter,
    client: aptos,
  };
};

// Context for the custom wallet hook
const CustomWalletContext = createContext<ReturnType<typeof useCustomWallet> | undefined>(undefined);

export const useWalletContext = () => {
  const context = useContext(CustomWalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
      }}
      onError={(error) => {
        console.error("Wallet adapter error:", error);
      }}
    >
      <CustomWalletProvider>{children}</CustomWalletProvider>
    </AptosWalletAdapterProvider>
  );
};

// Inner provider that uses the custom hook
const CustomWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const customWallet = useCustomWallet();
  
  return (
    <CustomWalletContext.Provider value={customWallet}>
      {children}
    </CustomWalletContext.Provider>
  );
};

// Export the original useWallet for backward compatibility
export { useWallet };
