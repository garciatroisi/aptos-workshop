#!/usr/bin/env ts-node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { 
  createAptosClient, 
  loadAccount, 
  executeTransaction, 
  createMintCharacterPayload,
  displayAllCharacters,
  displayCharacterInfo,
  validateModuleAddress,
  getCharacterTypeFromInput,
  logSuccess, 
  logError, 
  logInfo,
  logWarning
} from './utils';
import { CharacterType, CHARACTER_CONFIG } from './types';

const program = new Command();

program
  .name('mint')
  .description('Mint Galactic Wars characters')
  .option('-m, --module-address <address>', 'Module address')
  .option('-n, --network <network>', 'Network to use', 'testnet')
  .option('-p, --profile <profile>', 'Aptos profile to use', 'galactic-wars')
  .option('-a, --all', 'Mint all 10 character types')
  .option('-t, --type <type>', 'Specific character type (1-10)')
  .option('--private-key <key>', 'Private key for account')
  .parse();

interface MintOptions {
  moduleAddress?: string;
  network: string;
  profile: string;
  all?: boolean;
  type?: string;
  privateKey?: string;
}

async function mint(options: MintOptions): Promise<void> {
  console.log(chalk.bold.blue('🎭 Galactic Move Wars - Mint Characters'));
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

    logSuccess(`Account loaded: ${chalk.bold(account.address().toString())}`);

    // Initialize module if needed
    logInfo('Initializing module...');
    try {
      const initPayload = {
        function: `${moduleAddress}::galactic_wars::initialize`,
        type_arguments: [],
        arguments: []
      };
      
      await executeTransaction(
        client,
        account,
        initPayload as any,
        'Initializing module'
      );
    } catch (error) {
      logWarning('Module may already be initialized');
    }

    // Create collection
    logInfo('Creating NFT collection...');
    try {
      const createCollectionPayload = {
        function: `${moduleAddress}::galactic_wars::create_collection`,
        type_arguments: [],
        arguments: []
      };
      
      await executeTransaction(
        client,
        account,
        createCollectionPayload as any,
        'Creating collection'
      );
    } catch (error) {
      logWarning('Collection may already exist');
    }

    // Determine which characters to mint
    let charactersToMint: CharacterType[] = [];

    if (options.all) {
      charactersToMint = Object.values(CharacterType).filter(type => typeof type === 'number') as CharacterType[];
    } else if (options.type) {
      const characterType = getCharacterTypeFromInput(options.type);
      if (!characterType) {
        logError('Invalid character type. Must be between 1 and 10.');
        process.exit(1);
      }
      charactersToMint = [characterType];
    } else {
      // Interactive character selection
      displayAllCharacters();
      
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'mintOption',
          message: 'What would you like to mint?',
          choices: [
            { name: 'Mint all 10 characters', value: 'all' },
            { name: 'Mint specific character', value: 'specific' },
            { name: 'Mint multiple characters', value: 'multiple' }
          ]
        }
      ]);

      if (answer.mintOption === 'all') {
        charactersToMint = Object.values(CharacterType).filter(type => typeof type === 'number') as CharacterType[];
      } else if (answer.mintOption === 'specific') {
        const typeAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'characterType',
            message: 'Select character to mint:',
            choices: Object.values(CHARACTER_CONFIG).map(char => ({
              name: `${char.emoji} ${char.name} (Power: ${char.power}, Defense: ${char.defense})`,
              value: char.type
            }))
          }
        ]);
        charactersToMint = [typeAnswer.characterType];
      } else {
        const multipleAnswer = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'characterTypes',
            message: 'Select characters to mint:',
            choices: Object.values(CHARACTER_CONFIG).map(char => ({
              name: `${char.emoji} ${char.name} (Power: ${char.power}, Defense: ${char.defense})`,
              value: char.type,
              checked: false
            }))
          }
        ]);
        charactersToMint = multipleAnswer.characterTypes;
      }
    }

    // Mint characters
    logInfo(`Minting ${charactersToMint.length} character(s)...`);
    
    for (const characterType of charactersToMint) {
      const character = CHARACTER_CONFIG[characterType];
      
      displayCharacterInfo(characterType);
      
      try {
        const payload = createMintCharacterPayload(
          moduleAddress!,
          characterType,
          character.name,
          character.description,
          character.imageUri
        );

        await executeTransaction(
          client,
          account,
          payload,
          `Minting ${character.emoji} ${character.name}`
        );
        
        logSuccess(`${character.emoji} ${character.name} minted successfully!`);
      } catch (error) {
        logError(`Failed to mint ${character.name}: ${error}`);
      }
    }

    logSuccess('🎉 Character minting completed!');
    console.log(chalk.bold.blue('\n🎮 Next Steps:'));
    console.log(chalk.gray('1. Start the web app:'));
    console.log(chalk.yellow('   cd ../web && npm install && npm start'));
    console.log(chalk.gray('2. Connect your wallet and view your characters'));
    console.log(chalk.gray('3. Challenge other players to battles!'));

  } catch (error) {
    logError(`Minting failed: ${error}`);
    process.exit(1);
  }
}

// Run the mint function
mint(program.opts()).catch((error) => {
  logError(`Unexpected error: ${error}`);
  process.exit(1);
});
