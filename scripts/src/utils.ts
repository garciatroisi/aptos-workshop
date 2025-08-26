import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from '@aptos-labs/ts-sdk';
import chalk from 'chalk';
import ora from 'ora';
import { ScriptConfig, CharacterType, CHARACTER_CONFIG } from './types';

// Initialize Aptos client
export function createAptosClient(network: string): AptosClient {
  const nodeUrl = getNodeUrl(network);
  return new AptosClient(nodeUrl);
}

// Get node URL based on network
function getNodeUrl(network: string): string {
  switch (network) {
    case 'testnet':
      return 'https://fullnode.testnet.aptoslabs.com/v1';
    case 'mainnet':
      return 'https://fullnode.mainnet.aptoslabs.com/v1';
    case 'devnet':
      return 'https://fullnode.devnet.aptoslabs.com/v1';
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}

// Load account from private key
export async function loadAccount(privateKeyHex: string): Promise<AptosAccount> {
  try {
    const privateKeyBytes = new Uint8Array(
      privateKeyHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );
    return new AptosAccount(privateKeyBytes);
  } catch (error) {
    throw new Error(`Failed to load account: ${error}`);
  }
}

// Execute transaction with spinner
export async function executeTransaction(
  client: AptosClient,
  account: AptosAccount,
  payload: TxnBuilderTypes.TransactionPayload,
  description: string
): Promise<string> {
  const spinner = ora(description).start();
  
  try {
    const rawTxn = await client.generateTransaction(account.address(), payload);
    const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
    const transactionRes = await client.submitSignedBCSTransaction(bcsTxn);
    
    await client.waitForTransaction(transactionRes.hash);
    
    spinner.succeed(`${description} - Success!`);
    console.log(chalk.green(`Transaction hash: ${transactionRes.hash}`));
    
    return transactionRes.hash;
  } catch (error) {
    spinner.fail(`${description} - Failed!`);
    console.error(chalk.red(`Error: ${error}`));
    throw error;
  }
}

// Create entry function payload
export function createEntryFunctionPayload(
  moduleAddress: string,
  moduleName: string,
  functionName: string,
  typeArgs: TxnBuilderTypes.TypeTag[] = [],
  args: BCS.Bytes[] = []
): TxnBuilderTypes.TransactionPayload {
  const moduleAddressBytes = TxnBuilderTypes.AccountAddress.fromHex(moduleAddress);
  
  return new TxnBuilderTypes.TransactionPayloadEntryFunction(
    new TxnBuilderTypes.EntryFunction(
      new TxnBuilderTypes.ModuleId(moduleAddressBytes, new TxnBuilderTypes.Identifier(moduleName)),
      new TxnBuilderTypes.Identifier(functionName),
      typeArgs,
      args
    )
  );
}

// Format address for display
export function formatAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Display character information
export function displayCharacterInfo(characterType: CharacterType): void {
  const character = CHARACTER_CONFIG[characterType];
  console.log(chalk.cyan(`\n${character.emoji} ${character.name}`));
  console.log(chalk.gray(character.description));
  console.log(chalk.yellow(`⚔️ Power: ${character.power} | 🛡️ Defense: ${character.defense}`));
}

// Display all characters
export function displayAllCharacters(): void {
  console.log(chalk.bold.blue('\n🎭 Available Characters:'));
  console.log(chalk.gray('='.repeat(50)));
  
  Object.values(CHARACTER_CONFIG).forEach((character, index) => {
    console.log(chalk.cyan(`${index + 1}. ${character.emoji} ${character.name}`));
    console.log(chalk.gray(`   ${character.description}`));
    console.log(chalk.yellow(`   ⚔️ Power: ${character.power} | 🛡️ Defense: ${character.defense}`));
    console.log('');
  });
}

// Validate module address
export function validateModuleAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(address);
}

// Get character type from input
export function getCharacterTypeFromInput(input: string): CharacterType | null {
  const num = parseInt(input);
  if (isNaN(num) || num < 1 || num > 10) return null;
  return num as CharacterType;
}

// Create battle payload
export function createBattlePayload(
  moduleAddress: string,
  opponentAddress: string,
  challengerTokenIndex: number,
  opponentTokenIndex: number
): TxnBuilderTypes.TransactionPayload {
  const args = [
    BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(opponentAddress)),
    BCS.bcsSerializeUint64(challengerTokenIndex),
    BCS.bcsSerializeUint64(opponentTokenIndex)
  ];
  
  return createEntryFunctionPayload(
    moduleAddress,
    'galactic_wars',
    'battle',
    [],
    args
  );
}

// Create mint character payload
export function createMintCharacterPayload(
  moduleAddress: string,
  characterType: CharacterType,
  name: string,
  description: string,
  imageUri: string
): TxnBuilderTypes.TransactionPayload {
  const args = [
    BCS.bcsSerializeUint64(characterType),
    BCS.bcsSerializeStr(name),
    BCS.bcsSerializeStr(description),
    BCS.bcsSerializeStr(imageUri)
  ];
  
  return createEntryFunctionPayload(
    moduleAddress,
    'galactic_wars',
    'mint_character',
    [],
    args
  );
}

// Log success message
export function logSuccess(message: string): void {
  console.log(chalk.green(`✅ ${message}`));
}

// Log error message
export function logError(message: string): void {
  console.log(chalk.red(`❌ ${message}`));
}

// Log info message
export function logInfo(message: string): void {
  console.log(chalk.blue(`ℹ️ ${message}`));
}

// Log warning message
export function logWarning(message: string): void {
  console.log(chalk.yellow(`⚠️ ${message}`));
}
