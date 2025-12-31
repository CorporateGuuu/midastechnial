import { NextRequest, NextResponse } from "next/server";
import { shippo } from "@/lib/shippo";
import { db } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Get order with shipping information
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order || !order.shippingAddress) {
      return NextResponse.json({ error: "Order not found or no shipping address" }, { status: 404 });
    }

    const shippingAddress = JSON.parse(order.shippingAddress);
    const items = JSON.parse(order.items);

    // Define warehouse address
    const fromAddress = {
      name: "Your Company Name",
      street1: "1234 Warehouse St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "US"
    };

    // Create parcel based on items
    const totalWeight = items.reduce((sum: number, item: any) => {
      return sum + ((item as any).weight || 100) * (item as any).quantity;
    }, 0);

    const parcel = {
      length: 10,
      width: 8,
      height: 6,
      distanceUnit: "in",
      weight: totalWeight.toString(),
      massUnit: "g"
    };

    // Create shipment for label
    const shipment = await shippo.shipments.create({
      addressFrom: fromAddress,
      addressTo: shippingAddress,
      parcels: [parcel],
      async: false
    } as any);

    // Get the first rate (you might want to choose based on service level)
    const rate = shipment?.rates?.[0];
    if (!rate) {
      return NextResponse.json({ error: "No shipping rates available" }, { status: 400 });
    }

    // Create shipping label
    const transaction = await shippo.transactions.create({
      rate: rate.objectId,
    } as any);

    // Update order with shipping label information
    await db.order.update({
      where: { id: orderId },
      data: {
        trackingNumber: (transaction as any)?.trackingNumber,
        carrier: (transaction as any)?.carrier,
        labelUrl: (transaction as any)?.labelUrl,
        estimatedDelivery: (transaction as any)?.eta ? new Date((transaction as any).eta) : null,
      },
    });

    const responseData = {
      trackingNumber: (transaction as any)?.trackingNumber,
      carrier: (transaction as any)?.carrier,
      labelUrl: (transaction as any)?.labelUrl,
      estimatedDelivery: (transaction as any)?.eta,
      status: (transaction as any)?.status
    };

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("Create shipping label error:", error);
    return NextResponse.json(
      { error: "Failed to create shipping label" },
      { status: 500 }
    );
  }
}
