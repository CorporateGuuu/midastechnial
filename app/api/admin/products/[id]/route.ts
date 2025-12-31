import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
}

interface UpdateProductRequest {
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  inStock?: boolean; // Frontend sends boolean, we'll convert to number for DB
  category?: string;
  image?: string;
  images?: string[];
  stripePriceId?: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as ExtendedUser)?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const updateData: UpdateProductRequest = await request.json();

    // Prepare data for Prisma update
    const prismaData: any = { ...updateData };

    // Handle images array to JSON string
    if (updateData.images) {
      prismaData.images = JSON.stringify(updateData.images);
    }

    // Convert inStock boolean to number for database
    if (typeof updateData.inStock === 'boolean') {
      prismaData.inStock = updateData.inStock ? 1 : 0;
    }

    // Update product
    const updatedProduct = await db.product.update({
      where: { id },
      data: prismaData
    });

    // Parse images back for response
    const responseProduct = { ...updatedProduct };
    if (responseProduct.images) {
      responseProduct.images = JSON.parse(responseProduct.images);
    }

    return NextResponse.json(responseProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as ExtendedUser)?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    await db.product.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
