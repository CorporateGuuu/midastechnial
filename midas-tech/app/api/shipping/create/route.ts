import { NextRequest, NextResponse } from "next/server";
import { shippo } from "@/lib/shippo";
import { db } from "@/lib/prisma";
import { warehouseAddress } from "@/lib/shipping";

export async function POST(request: NextRequest) {
  try {
    const { orderId, customer } = await request.json();

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // === 1. Create Shipment ===
    const shipment = await shippo.shipments.create({
      addressFrom: warehouseAddress,
      addressTo: {
        name: customer.name || "Customer",
        street1: customer.street1,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        country: "US",
        email: customer.email,
        phone: customer.phone,
      },
      parcels: [
        {
          length: 10,
          width: 7,
          height: 5,
          distanceUnit: "in",
          weight: "2",
          massUnit: "lb",
        },
      ],
      async: false,
    } as any);

    // === 2. Buy Cheapest Rate ===
    const cheapestRate = shipment.rates[0];

    const transaction = await shippo.transactions.create({
      rate: cheapestRate.objectId,
      labelFileType: "PDF",
      async: false,
    } as any);

    if (transaction.status !== "SUCCESS") {
      throw new Error("Failed to purchase label");
    }

    // === 3. Save to DB ===
    await db.order.update({
      where: { id: orderId },
      data: {
        trackingNumber: (transaction as any).trackingNumber,
        labelUrl: (transaction as any).labelUrl,
        carrier: (transaction as any).carrier,
        status: "shipped",
      },
    });

    return NextResponse.json({
      trackingNumber: (transaction as any).trackingNumber,
      trackingUrl: (transaction as any).trackingUrlProvider,
      labelUrl: (transaction as any).labelUrl,
    });
  } catch (error: any) {
    console.error("Shipping error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
