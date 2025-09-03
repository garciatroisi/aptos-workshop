export interface NFT {
  token_id: string;
  token_name: string;
  token_uri: string;
  character_type: number;
  rarity: number;
  minted_at: number;
  owner_address: string;
}

export interface GameStats {
  total_packs_sold: number;
  user_pack_count: number;
}

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export function getRarityName(rarity: number): Rarity {
  const rarityNames: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
  return rarityNames[rarity] || 'common';
}

export function getRarityColor(rarity: number): string {
  const rarityColors: Record<Rarity, string> = {
    common: 'text-gray-400',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-orange-400',
    mythic: 'text-red-400',
  };
  const rarityName = getRarityName(rarity);
  return rarityColors[rarityName] || 'text-gray-400';
}

export function getRarityProbability(rarity: number): number {
  const probabilities: Record<number, number> = {
    0: 30,
    1: 25,
    2: 20,
    3: 12,
    4: 8,
    5: 5,
  };
  return probabilities[rarity] || 0;
}

export function getRarityBgColor(rarity: number): string {
  const rarityColors: Record<Rarity, string> = {
    common: 'bg-gray-400',
    uncommon: 'bg-green-400',
    rare: 'bg-blue-400',
    epic: 'bg-purple-400',
    legendary: 'bg-orange-400',
    mythic: 'bg-red-400',
  };
  const rarityName = getRarityName(rarity);
  return rarityColors[rarityName] || 'bg-gray-400';
}
