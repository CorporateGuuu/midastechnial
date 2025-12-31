import { db } from "./prisma";
import { Product } from "../types";

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return [
    {
      id: "oled-17-pro-max",
      title: "OLED Assembly For iPhone 17 Pro Max (Genuine OEM)",
      price: 378.00,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-17-pro",
      title: "OLED Assembly For iPhone 17 Pro (Genuine OEM)",
      price: 344.45,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-16-pro-max",
      title: "OLED Assembly For iPhone 16 Pro Max (Genuine OEM)",
      price: 397.95,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-16-pro",
      title: "OLED Assembly For iPhone 16 Pro (Genuine OEM)",
      price: 361.45,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-15-pro-max",
      title: "OLED Assembly For iPhone 15 Pro Max (Genuine OEM)",
      price: 379.96,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-15-pro",
      title: "OLED Assembly For iPhone 15 Pro (Genuine OEM)",
      price: 366.09,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-14-pro-max",
      title: "OLED Assembly For iPhone 14 Pro Max (Genuine OEM)",
      price: 379.77,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-14-pro",
      title: "OLED Assembly For iPhone 14 Pro (Genuine OEM)",
      price: 326.58,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-13-pro-max",
      title: "OLED Assembly For iPhone 13 Pro Max (Genuine OEM)",
      price: 326.58,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    },
    {
      id: "oled-13-pro",
      title: "OLED Assembly For iPhone 13 Pro (Genuine OEM)",
      price: 289.70,
      rating: 5,
      reviews: 0,
      inStock: 10,
      category: "OLED Assemblies",
      image: "https://static.mobilesentrix.com/catalog/product/small_image/1/7/1734369221-67605fc540454.webp"
    }
  ];
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
