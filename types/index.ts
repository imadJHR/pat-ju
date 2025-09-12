// types/index.ts
export interface Product {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  category: { [key: string]: string };
  price: number;
  rating: number;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  imageUrl: string;
}