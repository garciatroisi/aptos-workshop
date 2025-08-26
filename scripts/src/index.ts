#!/usr/bin/env ts-node

import { Command } from 'commander';
import chalk from 'chalk';
import { displayAllCharacters, logInfo } from './utils';

const program = new Command();

program
  .name('galactic-wars')
  .description('🚀 Galactic Move Wars - Interactive NFT Battle Game')
  .version('1.0.0');

// Deploy command
program
  .command('deploy')
  .description('Deploy the Galactic Wars smart contract')
  .option('-n, --network <network>', 'Network to deploy to', 'testnet')
  .option('-p, --profile <profile>', 'Aptos profile to use', 'galactic-wars')
  .option('--dry-run', 'Compile only, do not deploy')
  .action(async (options) => {
    const { deploy } = await import('./deploy');
    await deploy(options);
  });

// Mint command
program
  .command('mint')
  .description('Mint Galactic Wars characters')
  .option('-m, --module-address <address>', 'Module address')
  .option('-n, --network <network>', 'Network to use', 'testnet')
  .option('-p, --profile <profile>', 'Aptos profile to use', 'galactic-wars')
  .option('-a, --all', 'Mint all 10 character types')
  .option('-t, --type <type>', 'Specific character type (1-10)')
  .option('--private-key <key>', 'Private key for account')
  .action(async (options) => {
    const { mint } = await import('./mint');
    await mint(options);
  });

// Battle command
program
  .command('battle')
  .description('Initiate a battle between characters')
  .option('-m, --module-address <address>', 'Module address')
  .option('-o, --opponent <address>', 'Opponent address')
  .option('-c, --challenger-index <index>', 'Your character index')
  .option('-p, --opponent-index <index>', 'Opponent character index')
  .option('-n, --network <network>', 'Network to use', 'testnet')
  .option('--private-key <key>', 'Private key for account')
  .option('--confirm', 'Skip confirmation prompt')
  .action(async (options) => {
    const { battle } = await import('./battle');
    await battle(options);
  });

// Characters command
program
  .command('characters')
  .description('Display all available character types')
  .action(() => {
    console.log(chalk.bold.blue('🎭 Galactic Move Wars - Character Guide'));
    console.log(chalk.gray('='.repeat(50)));
    displayAllCharacters();
    
    console.log(chalk.bold.blue('\n🎮 How to Play:'));
    console.log(chalk.gray('1. Deploy the smart contract: galactic-wars deploy'));
    console.log(chalk.gray('2. Mint characters: galactic-wars mint'));
    console.log(chalk.gray('3. Challenge others: galactic-wars battle'));
    console.log(chalk.gray('4. Start web app: cd ../web && npm start'));
  });

// Setup command
program
  .command('setup')
  .description('Complete setup guide for Galactic Wars')
  .action(() => {
    console.log(chalk.bold.blue('🚀 Galactic Move Wars - Complete Setup Guide'));
    console.log(chalk.gray('='.repeat(50)));
    
    console.log(chalk.bold.cyan('\n📋 Prerequisites:'));
    console.log(chalk.gray('• Node.js 18+ installed'));
    console.log(chalk.gray('• Aptos CLI installed'));
    console.log(chalk.gray('• Petra or Martian wallet'));
    console.log(chalk.gray('• Testnet APT tokens'));
    
    console.log(chalk.bold.cyan('\n🔧 Installation:'));
    console.log(chalk.yellow('1. Install dependencies:'));
    console.log(chalk.gray('   npm install'));
    console.log(chalk.yellow('2. Build scripts:'));
    console.log(chalk.gray('   npm run build'));
    
    console.log(chalk.bold.cyan('\n🎮 Quick Start:'));
    console.log(chalk.yellow('1. Deploy contract:'));
    console.log(chalk.gray('   npm run deploy'));
    console.log(chalk.yellow('2. Mint characters:'));
    console.log(chalk.gray('   npm run mint -- --module-address <ADDRESS>'));
    console.log(chalk.yellow('3. Start web app:'));
    console.log(chalk.gray('   cd ../web && npm install && npm start'));
    
    console.log(chalk.bold.cyan('\n⚔️ Battle Commands:'));
    console.log(chalk.yellow('• View characters:'));
    console.log(chalk.gray('   npm run characters'));
    console.log(chalk.yellow('• Start battle:'));
    console.log(chalk.gray('   npm run battle -- --module-address <ADDRESS> --opponent <OPPONENT>'));
    
    console.log(chalk.bold.cyan('\n🌐 Useful Links:'));
    console.log(chalk.yellow('• Aptos Faucet:'));
    console.log(chalk.gray('   https://aptoslabs.com/testnet-faucet'));
    console.log(chalk.yellow('• Aptos Explorer:'));
    console.log(chalk.gray('   https://explorer.aptoslabs.com/'));
    console.log(chalk.yellow('• Documentation:'));
    console.log(chalk.gray('   https://aptos.dev/'));
  });

// Help command
program
  .command('help')
  .description('Show detailed help information')
  .action(() => {
    console.log(chalk.bold.blue('🚀 Galactic Move Wars - Help'));
    console.log(chalk.gray('='.repeat(50)));
    
    console.log(chalk.bold.cyan('\n🎯 What is Galactic Move Wars?'));
    console.log(chalk.gray('Galactic Move Wars is a gamified workshop for learning Move on Aptos.'));
    console.log(chalk.gray('Players create NFT characters and battle them in an intergalactic arena.'));
    console.log(chalk.gray('Losers see their characters permanently burned!'));
    
    console.log(chalk.bold.cyan('\n📚 Learning Objectives:'));
    console.log(chalk.gray('• Understand Move smart contract development'));
    console.log(chalk.gray('• Learn NFT creation and management'));
    console.log(chalk.gray('• Experience blockchain gaming mechanics'));
    console.log(chalk.gray('• Practice DApp integration'));
    
    console.log(chalk.bold.cyan('\n🔧 Available Commands:'));
    console.log(chalk.yellow('deploy    - Deploy the smart contract'));
    console.log(chalk.yellow('mint      - Create NFT characters'));
    console.log(chalk.yellow('battle    - Fight other players'));
    console.log(chalk.yellow('characters- View all character types'));
    console.log(chalk.yellow('setup     - Complete setup guide'));
    console.log(chalk.yellow('help      - This help message'));
    
    console.log(chalk.bold.cyan('\n💡 Examples:'));
    console.log(chalk.gray('• Deploy to testnet:'));
    console.log(chalk.yellow('  galactic-wars deploy --network testnet'));
    console.log(chalk.gray('• Mint all characters:'));
    console.log(chalk.yellow('  galactic-wars mint --all --module-address 0x123...'));
    console.log(chalk.gray('• Battle another player:'));
    console.log(chalk.yellow('  galactic-wars battle --module-address 0x123... --opponent 0x456...'));
    
    console.log(chalk.bold.cyan('\n🎮 Have Fun Learning Move!'));
  });

// Default action
program.action(() => {
  console.log(chalk.bold.blue('🚀 Welcome to Galactic Move Wars!'));
  console.log(chalk.gray('A gamified workshop for learning Move on Aptos'));
  console.log(chalk.gray('='.repeat(50)));
  
  console.log(chalk.bold.cyan('\n🎯 Quick Commands:'));
  console.log(chalk.yellow('• Setup guide:'));
  console.log(chalk.gray('  galactic-wars setup'));
  console.log(chalk.yellow('• View characters:'));
  console.log(chalk.gray('  galactic-wars characters'));
  console.log(chalk.yellow('• Get help:'));
  console.log(chalk.gray('  galactic-wars help'));
  
  console.log(chalk.bold.cyan('\n🎮 Ready to start your galactic journey?'));
  console.log(chalk.yellow('Run "galactic-wars setup" for complete instructions!'));
});

program.parse();
