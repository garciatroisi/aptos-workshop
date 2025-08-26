// Character types enum
export enum CharacterType {
  ALIEN = 1,
  ASTRONAUT = 2,
  ROBOT = 3,
  CYBORG = 4,
  MUTANT = 5,
  ANDROID = 6,
  SPACE_MARINE = 7,
  PSIONIC = 8,
  BERSERKER = 9,
  TECHNOMANCER = 10
}

// Character data interface
export interface CharacterData {
  type: CharacterType;
  name: string;
  description: string;
  imageUri: string;
  power: number;
  defense: number;
  emoji: string;
}

// Character configuration
export const CHARACTER_CONFIG: Record<CharacterType, CharacterData> = {
  [CharacterType.ALIEN]: {
    type: CharacterType.ALIEN,
    name: "Cosmic Alien",
    description: "A mysterious alien from the depths of space with incredible power",
    imageUri: "https://galactic-wars.com/characters/alien.png",
    power: 85,
    defense: 70,
    emoji: "👽"
  },
  [CharacterType.ASTRONAUT]: {
    type: CharacterType.ASTRONAUT,
    name: "Space Explorer",
    description: "A brave astronaut with advanced defensive technology",
    imageUri: "https://galactic-wars.com/characters/astronaut.png",
    power: 70,
    defense: 85,
    emoji: "👨‍🚀"
  },
  [CharacterType.ROBOT]: {
    type: CharacterType.ROBOT,
    name: "Battle Bot",
    description: "A mechanical warrior with balanced combat capabilities",
    imageUri: "https://galactic-wars.com/characters/robot.png",
    power: 80,
    defense: 80,
    emoji: "🤖"
  },
  [CharacterType.CYBORG]: {
    type: CharacterType.CYBORG,
    name: "Neo Cyborg",
    description: "A human-machine hybrid with enhanced combat abilities",
    imageUri: "https://galactic-wars.com/characters/cyborg.png",
    power: 90,
    defense: 75,
    emoji: "🔧"
  },
  [CharacterType.MUTANT]: {
    type: CharacterType.MUTANT,
    name: "Space Mutant",
    description: "A genetically enhanced being with raw destructive power",
    imageUri: "https://galactic-wars.com/characters/mutant.png",
    power: 95,
    defense: 60,
    emoji: "🧬"
  },
  [CharacterType.ANDROID]: {
    type: CharacterType.ANDROID,
    name: "Combat Android",
    description: "An advanced android with superior defensive systems",
    imageUri: "https://galactic-wars.com/characters/android.png",
    power: 75,
    defense: 90,
    emoji: "🤖"
  },
  [CharacterType.SPACE_MARINE]: {
    type: CharacterType.SPACE_MARINE,
    name: "Elite Marine",
    description: "A highly trained space marine with exceptional combat skills",
    imageUri: "https://galactic-wars.com/characters/marine.png",
    power: 88,
    defense: 82,
    emoji: "🪖"
  },
  [CharacterType.PSIONIC]: {
    type: CharacterType.PSIONIC,
    name: "Mind Bender",
    description: "A psychic warrior with powerful mental abilities",
    imageUri: "https://galactic-wars.com/characters/psionic.png",
    power: 92,
    defense: 68,
    emoji: "🧠"
  },
  [CharacterType.BERSERKER]: {
    type: CharacterType.BERSERKER,
    name: "Rage Warrior",
    description: "A berserker with maximum attack power but minimal defense",
    imageUri: "https://galactic-wars.com/characters/berserker.png",
    power: 100,
    defense: 50,
    emoji: "⚔️"
  },
  [CharacterType.TECHNOMANCER]: {
    type: CharacterType.TECHNOMANCER,
    name: "Tech Mage",
    description: "A technomancer who combines magic with advanced technology",
    imageUri: "https://galactic-wars.com/characters/technomancer.png",
    power: 78,
    defense: 88,
    emoji: "🔮"
  }
};

// Script configuration
export interface ScriptConfig {
  network: 'testnet' | 'mainnet' | 'devnet';
  profile: string;
  moduleAddress?: string;
}

// Battle result interface
export interface BattleResult {
  winner: string;
  loser: string;
  winnerScore: number;
  loserScore: number;
  timestamp: number;
}

// Character interface
export interface Character {
  id: number;
  characterType: CharacterType;
  power: number;
  defense: number;
  owner: string;
  tokenId: string;
  name: string;
  image: string;
}
