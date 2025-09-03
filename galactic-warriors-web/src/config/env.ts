export const envConfig = {
  aptos: {
    network: process.env.NEXT_PUBLIC_APTOS_NETWORK || 'testnet',
    nodeUrl: process.env.NEXT_PUBLIC_APTOS_NODE_URL || 'https://fullnode.testnet.aptoslabs.com',
    apiKey: process.env.NEXT_PUBLIC_APTOS_API_KEY || '',
    serverApiKey: process.env.APTOS_API_KEY || '',
  },
  module: {
    address: process.env.NEXT_PUBLIC_MODULE_ADDRESS || '0x553faabe7ca12e3664f05c9a3d2f378e5779bc5b45ea90b05804a655e64b282a',
    name: process.env.NEXT_PUBLIC_MODULE_NAME || 'galactic_packs',
  },
  keys: {
    creatorPrivateKey: process.env.CREATOR_PRIVATE_KEY || '',
  },
  collections: {
    packs: process.env.NEXT_PUBLIC_PACKS_COLLECTION_ADDRESS || '',
    aliens: process.env.NEXT_PUBLIC_ALIENS_COLLECTION_ADDRESS || '',
    predators: process.env.NEXT_PUBLIC_PREDATORS_COLLECTION_ADDRESS || '',
    yodas: process.env.NEXT_PUBLIC_YODAS_COLLECTION_ADDRESS || '',
  },
};
