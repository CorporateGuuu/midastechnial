import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Increment search count for the product
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        searchCount: {
          increment: 1
        }
      },
      select: {
        id: true,
        title: true,
        searchCount: true
      }
    });

    return NextResponse.json({
      success: true,
      searchCount: updatedProduct.searchCount
    });
  } catch (error) {
    console.error("Error incrementing search count:", error);
    return NextResponse.json(
      { error: "Failed to increment search count" },
      { status: 500 }
    );
  }
}
