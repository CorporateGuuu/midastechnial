import { db } from "./prisma";
import { Product } from "../types";

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const products = await db.product.findMany({
      where: { inStock: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    return products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice || undefined,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge as "new" | "sale" | undefined,
      inStock: product.inStock,
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
      inStock: product.inStock,
      category: product.category,
      image: product.image || undefined,
    }));
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
