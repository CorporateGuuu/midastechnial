export type Product = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: "new" | "sale";
  inStock: number; // Database stores as integer, convert to boolean at boundary
  category: string;
  image?: string;
  stripePriceId?: string;
};

export type CartItem = Product & { quantity: number };
