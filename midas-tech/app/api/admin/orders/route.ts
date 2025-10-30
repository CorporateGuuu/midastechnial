import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // Add parsed shipping information
    const ordersWithShipping = orders.map(order => ({
      ...order,
      items: order.items ? JSON.parse(order.items) : [],
      shippingAddress: order.shippingAddress ? JSON.parse(order.shippingAddress) : null,
    }));

    return NextResponse.json(ordersWithShipping);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
