import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch top 100 most searched/popular products
    const popularProducts = await db.product.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        images: true,
        category: true,
      },
      orderBy: [
        { createdAt: 'desc' } // Sort by newest first for now (can be updated with searchCount later)
      ],
      take: 100, // Limit to top 100 products
    });

    // Transform the data for frontend consumption
    const transformedProducts = popularProducts.map(product => ({
      id: product.id,
      title: product.title,
      image: product.image,
      images: product.images ? JSON.parse(product.images) : [],
      category: product.category,
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular products" },
      { status: 500 }
    );
  }
}
