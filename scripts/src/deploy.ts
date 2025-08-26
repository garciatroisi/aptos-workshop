#!/usr/bin/env ts-node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { createAptosClient, logSuccess, logError, logInfo } from './utils';

const program = new Command();

program
  .name('deploy')
  .description('Deploy Galactic Move Wars smart contract to Aptos')
  .option('-n, --network <network>', 'Network to deploy to', 'testnet')
  .option('-p, --profile <profile>', 'Aptos profile to use', 'galactic-wars')
  .option('--dry-run', 'Compile only, do not deploy')
  .parse();

interface DeployOptions {
  network: string;
  profile: string;
  dryRun?: boolean;
}

async function deploy(options: DeployOptions): Promise<void> {
  console.log(chalk.bold.blue('🚀 Galactic Move Wars - Deploy Script'));
  console.log(chalk.gray('='.repeat(50)));

  try {
    // Check if Aptos CLI is installed
    logInfo('Checking Aptos CLI installation...');
    try {
      execSync('aptos --version', { stdio: 'pipe' });
    } catch (error) {
      logError('Aptos CLI not found. Please install it first:');
      console.log(chalk.yellow('   curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3'));
      process.exit(1);
    }

    // Initialize Aptos configuration if needed
    logInfo('Checking Aptos configuration...');
    try {
      execSync(`aptos init --profile ${options.profile} --network ${options.network} --assume-yes`, {
        stdio: 'pipe',
        cwd: '../move'
      });
      logSuccess('Aptos configuration initialized');
    } catch (error) {
      logInfo('Aptos configuration already exists');
    }

    // Compile the Move modules
    const compileSpinner = ora('Compiling Move modules...').start();
    try {
      execSync('aptos move compile --named-addresses galactic_wars=default', {
        stdio: 'pipe',
        cwd: '../move'
      });
      compileSpinner.succeed('Move modules compiled successfully');
    } catch (error) {
      compileSpinner.fail('Compilation failed');
      console.error(chalk.red(error));
      process.exit(1);
    }

    if (options.dryRun) {
      logSuccess('Dry run completed - modules compiled successfully');
      return;
    }

    // Deploy to network
    const deploySpinner = ora(`Deploying to ${options.network}...`).start();
    try {
      const output = execSync(
        `aptos move publish --named-addresses galactic_wars=default --profile ${options.profile}`,
        { 
          stdio: 'pipe',
          cwd: '../move',
          encoding: 'utf8'
        }
      );
      
      deploySpinner.succeed(`Successfully deployed to ${options.network}`);
      
      // Extract module address from output
      const moduleAddressMatch = output.match(/Module (\w+)::(\w+) published/);
      if (moduleAddressMatch) {
        const moduleAddress = moduleAddressMatch[1];
        logSuccess(`Module address: ${chalk.bold(moduleAddress)}`);
        
        // Display next steps
        console.log(chalk.bold.blue('\n🎯 Next Steps:'));
        console.log(chalk.gray('1. Mint your characters:'));
        console.log(chalk.yellow(`   npm run mint -- --module-address ${moduleAddress}`));
        console.log(chalk.gray('2. Start the web app:'));
        console.log(chalk.yellow('   cd ../web && npm install && npm start'));
        console.log(chalk.gray('3. View on explorer:'));
        console.log(chalk.yellow(`   https://explorer.aptoslabs.com/account/${moduleAddress}?network=${options.network}`));
      }
      
    } catch (error) {
      deploySpinner.fail(`Deployment to ${options.network} failed`);
      console.error(chalk.red(error));
      process.exit(1);
    }

  } catch (error) {
    logError(`Deployment failed: ${error}`);
    process.exit(1);
  }
}

// Run the deploy function
deploy(program.opts()).catch((error) => {
  logError(`Unexpected error: ${error}`);
  process.exit(1);
});
