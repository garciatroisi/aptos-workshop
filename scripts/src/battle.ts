#!/usr/bin/env ts-node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { 
  createAptosClient, 
  loadAccount, 
  executeTransaction, 
  createBattlePayload,
  validateModuleAddress,
  formatAddress,
  logSuccess, 
  logError, 
  logInfo,
  logWarning
} from './utils';
import { CharacterType, CHARACTER_CONFIG } from './types';

const program = new Command();

program
  .name('battle')
  .description('Initiate a battle between Galactic Wars characters')
  .option('-m, --module-address <address>', 'Module address')
  .option('-o, --opponent <address>', 'Opponent address')
  .option('-c, --challenger-index <index>', 'Your character index')
  .option('-p, --opponent-index <index>', 'Opponent character index')
  .option('-n, --network <network>', 'Network to use', 'testnet')
  .option('--private-key <key>', 'Private key for account')
  .option('--confirm', 'Skip confirmation prompt')
  .parse();

interface BattleOptions {
  moduleAddress?: string;
  opponent?: string;
  challengerIndex?: string;
  opponentIndex?: string;
  network: string;
  privateKey?: string;
  confirm?: boolean;
}

async function battle(options: BattleOptions): Promise<void> {
  console.log(chalk.bold.blue('⚔️ Galactic Move Wars - Battle Arena'));
  console.log(chalk.gray('='.repeat(50)));

  try {
    // Get module address
    let moduleAddress = options.moduleAddress;
    if (!moduleAddress) {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'moduleAddress',
          message: 'Enter the module address:',
          validate: (input: string) => {
            if (!validateModuleAddress(input)) {
              return 'Please enter a valid module address (0x followed by 64 hex characters)';
            }
            return true;
          }
        }
      ]);
      moduleAddress = answer.moduleAddress;
    }

    if (!validateModuleAddress(moduleAddress!)) {
      logError('Invalid module address format');
      process.exit(1);
    }

    // Get opponent address
    let opponentAddress = options.opponent;
    if (!opponentAddress) {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'opponentAddress',
          message: 'Enter opponent address:',
          validate: (input: string) => {
            if (!validateModuleAddress(input)) {
              return 'Please enter a valid address (0x followed by 64 hex characters)';
            }
            return true;
          }
        }
      ]);
      opponentAddress = answer.opponentAddress;
    }

    // Get character indices
    let challengerIndex = options.challengerIndex;
    let opponentIndex = options.opponentIndex;

    if (!challengerIndex || !opponentIndex) {
      const answer = await inquirer.prompt([
        {
          type: 'number',
          name: 'challengerIndex',
          message: 'Enter your character index (0-based):',
          default: 0,
          validate: (input: number) => {
            if (input < 0) return 'Index must be 0 or greater';
            return true;
          }
        },
        {
          type: 'number',
          name: 'opponentIndex',
          message: 'Enter opponent character index (0-based):',
          default: 0,
          validate: (input: number) => {
            if (input < 0) return 'Index must be 0 or greater';
            return true;
          }
        }
      ]);
      
      if (!challengerIndex) challengerIndex = answer.challengerIndex.toString();
      if (!opponentIndex) opponentIndex = answer.opponentIndex.toString();
    }

    // Get private key
    let privateKey = options.privateKey;
    if (!privateKey) {
      const answer = await inquirer.prompt([
        {
          type: 'password',
          name: 'privateKey',
          message: 'Enter your private key:',
          mask: '*'
        }
      ]);
      privateKey = answer.privateKey;
    }

    // Load account
    logInfo('Loading account...');
    const account = await loadAccount(privateKey);
    const client = createAptosClient(options.network);

    logSuccess(`Account loaded: ${chalk.bold(formatAddress(account.address().toString()))}`);

    // Display battle information
    console.log(chalk.bold.blue('\n🎯 Battle Information:'));
    console.log(chalk.gray('='.repeat(30)));
    console.log(chalk.cyan(`Your Address: ${formatAddress(account.address().toString())}`));
    console.log(chalk.cyan(`Your Character Index: ${challengerIndex}`));
    console.log(chalk.red(`Opponent Address: ${formatAddress(opponentAddress!)}`));
    console.log(chalk.red(`Opponent Character Index: ${opponentIndex}`));
    console.log(chalk.yellow(`Module Address: ${formatAddress(moduleAddress!)}`));

    // Battle confirmation
    if (!options.confirm) {
      const confirmAnswer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmBattle',
          message: chalk.bold.red('⚠️  WARNING: The losing character will be BURNED (permanently destroyed). Continue?'),
          default: false
        }
      ]);

      if (!confirmAnswer.confirmBattle) {
        logInfo('Battle cancelled. Your warriors will live to fight another day.');
        return;
      }
    }

    // Execute battle
    logInfo('Initiating battle...');
    
    try {
      const payload = createBattlePayload(
        moduleAddress!,
        opponentAddress!,
        parseInt(challengerIndex!),
        parseInt(opponentIndex!)
      );

      const transactionHash = await executeTransaction(
        client,
        account,
        payload,
        'Executing battle'
      );
      
      logSuccess('⚔️ Battle completed!');
      console.log(chalk.bold.blue('\n🏆 Battle Result:'));
      console.log(chalk.gray('Check the transaction to see the winner:'));
      console.log(chalk.yellow(`https://explorer.aptoslabs.com/txn/${transactionHash}?network=${options.network}`));
      
      // Display battle tips
      console.log(chalk.bold.blue('\n💡 Battle Tips:'));
      console.log(chalk.gray('• Higher power + defense = better chance to win'));
      console.log(chalk.gray('• Random factor adds unpredictability'));
      console.log(chalk.gray('• Loser\'s character is permanently burned'));
      console.log(chalk.gray('• Mint new characters to continue playing'));

    } catch (error) {
      logError(`Battle failed: ${error}`);
      
      // Provide helpful error messages
      if (error.toString().includes('CHARACTER_NOT_FOUND')) {
        console.log(chalk.yellow('\n💡 Possible solutions:'));
        console.log(chalk.gray('• Verify character indices are correct'));
        console.log(chalk.gray('• Ensure both players have characters at those indices'));
        console.log(chalk.gray('• Check that characters haven\'t been burned in previous battles'));
      } else if (error.toString().includes('INSUFFICIENT_BALANCE')) {
        console.log(chalk.yellow('\n💡 Possible solutions:'));
        console.log(chalk.gray('• Ensure you have enough APT for gas fees'));
        console.log(chalk.gray('• Get testnet APT from the faucet'));
      }
    }

  } catch (error) {
    logError(`Battle failed: ${error}`);
    process.exit(1);
  }
}

// Run the battle function
battle(program.opts()).catch((error) => {
  logError(`Unexpected error: ${error}`);
  process.exit(1);
});
