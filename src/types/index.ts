export type NavTab = 'feed' | 'lab' | 'drops' | 'tracker';

export type CupSize = 'Tall' | 'Grande' | 'Venti' | 'Trenta';

export interface BaseBrewOption {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
  kcal: number;
  caffeine: number;
  color: string;
}

export interface MilkOption {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
  kcal: number;
  co2Saved?: string;
  color: string;
}

export interface ColdFoamOption {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
  kcal: number;
  badge?: string;
  color: string;
}

export interface SyrupsDrizzles {
  brownSugarPumps: number;
  vanillaPumps: number;
  caramelCrosshatch: boolean;
}

export type IceLevel = 'crushed' | 'light' | 'none';

export interface DrinkFormulation {
  name: string;
  size: CupSize;
  baseBrew: string;
  dosage: number;
  milk: string;
  coldFoam: string;
  syrups: SyrupsDrizzles;
  ice: IceLevel;
}

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image?: string;
  stars: number;
  customization?: string[];
  quantity: number;
}
