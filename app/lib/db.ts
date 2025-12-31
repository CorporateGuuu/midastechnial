import { db } from "./prisma";
import { Product } from "../types";

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    // Get products and filter in JavaScript to avoid Prisma type issues
    const allProducts = await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    const inStockProducts = allProducts.filter(product => product.inStock > 0);

    return inStockProducts.slice(0, 4).map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice || undefined,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge as "new" | "sale" | undefined,
      inStock: product.inStock, // Return the actual number from database
      category: product.category,
      image: product.image || undefined,
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice || undefined,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge as "new" | "sale" | undefined,
      inStock: product.inStock, // Return the actual number from database
      category: product.category,
      image: product.image || undefined,
    }));
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
