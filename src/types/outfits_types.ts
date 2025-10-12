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

export type clothingCategories =
  | "Head"
  | "Accessories"
  | "Outerwear"
  | "Tops"
  | "Bottoms"
  | "Feet";
