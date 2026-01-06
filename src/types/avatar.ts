export interface AvatarConfig {
  hairStyle: 'short' | 'long' | 'spiky' | 'bald' | 'ponytail';
  hairColor: string;
  skinTone: string;
  outfit: 'athletic' | 'casual' | 'warrior';
  outfitColor: string;
  equipment: {
    weapon: string | null;
    armor: string | null;
    accessory: string | null;
  };
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  stats: {
    mind: number;
    body: number;
    spiritual: number;
    combat: number;
    connection: number;
  };
  gold: number;
  streak: number;
}

export const HAIR_STYLES = ['short', 'long', 'spiky', 'bald', 'ponytail'] as const;
export const OUTFIT_STYLES = ['athletic', 'casual', 'warrior'] as const;

export const HAIR_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Brown', value: '#4a2511' },
  { name: 'Blonde', value: '#ffd700' },
  { name: 'Red', value: '#8b0000' },
  { name: 'Blue', value: '#0000ff' },
  { name: 'Purple', value: '#800080' },
  { name: 'White', value: '#ffffff' },
  { name: 'Pink', value: '#ff69b4' },
];

export const SKIN_TONES = [
  { name: 'Very Light', value: '#fde6d8' },
  { name: 'Light', value: '#f5d5c5' },
  { name: 'Medium Light', value: '#d4a88a' },
  { name: 'Medium', value: '#c89363' },
  { name: 'Medium Dark', value: '#8d5524' },
  { name: 'Dark', value: '#4a2511' },
];

export const OUTFIT_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#ffffff' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Yellow', value: '#eab308' },
];