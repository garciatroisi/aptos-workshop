'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Star,
      title: 'Digital Assets',
      description: 'NFTs stored on-chain with unique properties'
    },
    {
      icon: Zap,
      title: 'Randomness',
      description: 'On-chain randomness for fair pack opening and rarity distribution'
    },
    {
      icon: Shield,
      title: 'Aptos SDK',
      description: 'Easy-to-use SDK examples for viewing your collection'
    },
    {
      icon: Users,
      title: 'Multi-Agent',
      description: 'Advanced multi-agent transactions for secure buy and pack opening'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Welcome to the{' '}
          <span className="bg-gradient-to-r from-galactic-purple to-galactic-pink bg-clip-text text-transparent">
            Galactic Universe
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          Discover, collect, and trade unique galactic warrior NFTs on the Aptos blockchain. 
          Each character has its own story, rarity, and special abilities waiting to be unlocked.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="galactic-card p-8 mb-16"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-galactic-purple to-galactic-pink rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Connect Wallet</h3>
            <p className="text-white/70">
              Connect your Aptos wallet to start your galactic journey
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-galactic-purple to-galactic-pink rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Buy Packs</h3>
            <p className="text-white/70">
              Purchase packs to discover your unique galactic warriors
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-galactic-purple to-galactic-pink rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Collect & Trade</h3>
            <p className="text-white/70">
              Build your collection and trade with other collectors
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
            className="galactic-card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-galactic-purple to-galactic-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-white/70 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

     

    </motion.div>
  );
};

export default About;
