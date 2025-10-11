export interface WardrobeItem {
  itemId: string;
  userId: string;
  name: string;
  color: string;
  category: string;
  type: string;
  tags: string[];
  imageURL: string;
}
export interface FormState {
  name: string;
  color: string;
  imageBase64: string | null;
}

export interface CreatePayload {
  name: string;
  color: string;
  tags: string[];
  imageBase64: string;
}
