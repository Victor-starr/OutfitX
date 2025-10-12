import type { WardrobeItem } from "./clothing_types";
export interface Clothes {
  imageURL: string;
  name: string;
  color: string;
  tags: string[];
  type: string;
  category: string;
  itemId: string;
}
export interface Outfit {
  outfitId: string;
  userId: string;
  name: string;
  description: string;
  clothes: Clothes[];
}

export interface OutfitSections {
  Head: WardrobeItem | null;
  Accessories: WardrobeItem | null;
  Outerwear: WardrobeItem | null;
  Tops: WardrobeItem | null;
  Bottoms: WardrobeItem | null;
  Feet: WardrobeItem | null;
}
