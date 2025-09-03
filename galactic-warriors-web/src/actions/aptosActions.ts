'use server'

import { Aptos, AptosConfig, Network, Ed25519PrivateKey, Account, AccountAuthenticator } from '@aptos-labs/ts-sdk';
import { CONTRACT_CONFIG } from '../config/contract';
import { envConfig } from '../config/env';

// Create Aptos client
const aptosConfig = new AptosConfig({ 
  network: Network.TESTNET,
  clientConfig: {
    API_KEY: envConfig.aptos.serverApiKey,
  },
});
const aptos = new Aptos(aptosConfig);

// API key configuration
if (!envConfig.aptos.serverApiKey) {
  console.warn('⚠️ APTOS_API_KEY not set. Using anonymous endpoints (may hit rate limits)');
}

// Get creator account from environment
const creatorPrivateKey = process.env.CREATOR_PRIVATE_KEY;
let creatorAccount: Account | null = null;

if (creatorPrivateKey) {
  try {
    const privateKey = new Ed25519PrivateKey(creatorPrivateKey);
    creatorAccount = Account.fromPrivateKey({ privateKey });
  } catch (error) {
    console.error('❌ Error loading creator account:', error);
  }
} else {
  console.warn('⚠️ CREATOR_PRIVATE_KEY not set. Multi-agent transactions will not work.');
}

export interface TransactionPayload {
  transactionBytes: any;
  creatorAuthBytes: number[];
}

export interface Pack {
  tokenId: string;
  tokenName: string;
  tokenUri: string | undefined;
  digitalAssetData: any | null;
  error?: string;
  isOpened: boolean;
  rarity: string;
  packNumber?: string; // Optional for non-pack collections
  serialNumber?: string; // Optional for non-pack collections
  price: number;
}

/**
 * Gets the total number of packs sold from the contract
 * Uses the view function get_total_sold from the Move contract
 */
export async function getTotalPacksSold(): Promise<number> {
  try {
    const creatorAddress = CONTRACT_CONFIG.MODULE_ADDRESS;
    
    const result = await aptos.view({
      payload: {
        function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::get_total_sold`,
        typeArguments: [],
        functionArguments: [creatorAddress],
      }
    });

    return Number(result[0]);
  } catch (error) {
    console.error('❌ Error getting total packs sold:', error);
    return 0;
  }
}

/**
 * Prepares and signs the multi-agent transaction to buy a pack
 * The server prepares the transaction, signs it as creator, and sends it to the client
 */
export async function prepareBuyPackTransaction(
  userAddress: string
): Promise<TransactionPayload> {
  try { 
    if (!creatorAccount) {
      throw new Error('Creator account not configured. Please set CREATOR_PRIVATE_KEY environment variable.');
    } 
    const txn = await aptos.transaction.build.multiAgent({
      sender: userAddress,  
      secondarySignerAddresses: [creatorAccount.accountAddress], 
      data: {
        function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::buy_pack`,
        typeArguments: [],
        functionArguments: [],
      },
      withFeePayer: false,
    });

    const txnBytes = txn.bcsToBytes();

    const creatorAuth = await aptos.transaction.sign({
      signer: creatorAccount,
      transaction: txn,
    });

    const creatorAuthBytes = creatorAuth.bcsToBytes();
 
    return {
      transactionBytes: Array.from(txnBytes),
      creatorAuthBytes: Array.from(creatorAuthBytes),
    };
  } catch (error) {
    console.error('Error preparing multi-agent buy pack transaction:', error);
    throw new Error('Failed to prepare multi-agent buy pack transaction');
  }
}

/**
 * Gets all tokens owned by a user from a specific collection
 * This is used to retrieve the user's packs for opening
 */
export async function getUserCollectionPacks(
  userAddress: string,
  collectionAddress: string = envConfig.collections.packs
): Promise<Pack[]> {
  try {
    let allUserTokens: any[] = [];
    let offset = 0;
    const limit = 100;
    let userTokensBatch: any[] = [];

    do {
      userTokensBatch = await aptos.getAccountOwnedTokensFromCollectionAddress({
        accountAddress: userAddress,
        collectionAddress: collectionAddress,
        options: {
          limit: limit,
          offset: offset,
        },
      });

      allUserTokens = allUserTokens.concat(userTokensBatch);
      offset += userTokensBatch.length;
    } while (userTokensBatch.length === limit);

    // Get detailed information for each token and convert to Pack format
    const userPacks = await Promise.all(
      allUserTokens.map(async (token) => {
        try {
          // Get complete digital asset data
          const digitalAssetData = await aptos.getDigitalAssetData({
            digitalAssetAddress: token.token_data_id,
          });

          // Determine if this is a pack collection (has Pack Number and Claimed properties)
          const isPackCollection = digitalAssetData.token_properties && 
            (digitalAssetData.token_properties["Pack Number"] || digitalAssetData.token_properties.Claimed);
          
          let isOpened = false;
          let rarity = "Unknown";
          let packNumber = "Unknown";
          let serialNumber = "Unknown";
          
          if (isPackCollection) {
            // PACK COLLECTION: Extract Pack Number and Claimed status
            if (digitalAssetData.token_properties.Claimed) {
              isOpened = digitalAssetData.token_properties.Claimed === "true" || 
                        digitalAssetData.token_properties.Claimed === true ||
                        digitalAssetData.token_properties.Claimed === "1";
            }
            
            if (digitalAssetData.token_properties["Pack Number"]) {
              packNumber = digitalAssetData.token_properties["Pack Number"];
            }
          } else {
            // NFT COLLECTION: Extract Serial Number and Rarity
            if (digitalAssetData.token_properties["Serial Number"]) {
              serialNumber = digitalAssetData.token_properties["Serial Number"];
            }
            
            if (digitalAssetData.token_properties.Rarity) {
              rarity = digitalAssetData.token_properties.Rarity;
            }
          }
          console.log("digitalAssetData:", digitalAssetData);
          // Default price for packs
          const price = 0.1; // TODO: Get actual price from token properties or contract

          return {
            tokenId: token.token_data_id,
            tokenName: token.current_token_data?.token_name || "Unknown Pack",
            tokenUri: token.current_token_data?.token_uri || undefined,
            digitalAssetData: {
              ...digitalAssetData,
              // Additional computed properties for easier access
              tokenStandard: digitalAssetData.token_standard,
              tokenProperties: digitalAssetData.token_properties,
              supply: digitalAssetData.supply,
              maximum: digitalAssetData.maximum,
              largestPropertyVersionV1: digitalAssetData.largest_property_version_v1,
              tokenUri: digitalAssetData.token_uri,
              description: digitalAssetData.description,
              tokenName: digitalAssetData.token_name,
              collectionId: digitalAssetData.collection_id,
            },
            isOpened,
            rarity,
            packNumber,
            serialNumber,
            price,
          };
        } catch (error) {
          console.error(
            `Error getting data for pack ${token.token_data_id}:`,
            error
          );
          return {
            tokenId: token.token_data_id,
            tokenName: token.current_token_data?.token_name || "Unknown Pack",
            tokenUri: token.current_token_data?.token_uri || undefined,
            digitalAssetData: null,
            error: error instanceof Error ? error.message : "Unknown error",
            isOpened: false, // Default to unopened if there's an error
            rarity: "Unknown",
            packNumber: undefined,
            serialNumber: undefined,
            price: 0.1,
          };
        }
      })
    );

    return userPacks;
  } catch (error) {
    console.error("❌ Error getting user collection packs:", error);
    throw error;
  }
}

/**
 * Gets all assets owned by a user from multiple collections (aliens, predators, yodas)
 * This is used to display the user's gallery of collected NFTs
 */
export async function getUserGalleryAssets(
  userAddress: string
): Promise<{ aliens: Pack[], predators: Pack[], yodas: Pack[] }> {
  try {
    const { envConfig } = await import('../config/env');
    
    const [aliens, predators, yodas] = await Promise.all([
      getUserCollectionPacks(userAddress, envConfig.collections.aliens),
      getUserCollectionPacks(userAddress, envConfig.collections.predators),
      getUserCollectionPacks(userAddress, envConfig.collections.yodas),
    ]);

    return { aliens, predators, yodas };
  } catch (error) {
    console.error("❌ Error getting user gallery assets:", error);
    throw error;
  }
}

/**
 * Prepares and signs the multi-agent transaction to open a pack
 * The server prepares the transaction, signs it as creator, and sends it to the client
 */
export async function prepareOpenPackTransaction(
  userAddress: string,
  packTokenId: string
): Promise<TransactionPayload> {
  try { 
    if (!creatorAccount) {
      throw new Error('Creator account not configured. Please set CREATOR_PRIVATE_KEY environment variable.');
    }
 
    const txn = await aptos.transaction.build.multiAgent({
      sender: userAddress,  
      secondarySignerAddresses: [creatorAccount.accountAddress], 
      data: {
        function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::redeem_pack`,
        typeArguments: [],
        functionArguments: [packTokenId],
      },
      withFeePayer: false,
    });

    const txnBytes = txn.bcsToBytes();

    const creatorAuth = await aptos.transaction.sign({
      signer: creatorAccount,
      transaction: txn,
    });

    const creatorAuthBytes = creatorAuth.bcsToBytes();
 
    return {
      transactionBytes: Array.from(txnBytes),
      creatorAuthBytes: Array.from(creatorAuthBytes),
    };
  } catch (error) {
    console.error('Error preparing multi-agent open pack transaction:', error);
    throw new Error('Failed to prepare multi-agent open pack transaction');
  }
}

/**
 * Buys a pack using the buy_pack function from the Move contract
 * For now it's a mock implementation until the SDK types are resolved
 */
export async function buyPack(
  userAddress: string,
  packType: string
): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
  try {
    return {
      success: true,
      transactionHash: `mock_buy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  } catch (error) {
    console.error('Error buying pack:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
