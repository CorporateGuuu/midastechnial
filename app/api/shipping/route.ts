import { NextRequest, NextResponse } from "next/server";
import { shippo } from "@/lib/shippo";

export const dynamic = 'force-dynamic'

interface ShippingRequest {
  address: {
    name: string;
    street1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: Array<{
    title: string;
    quantity: number;
    price: number;
    weight?: number; // grams
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const { address, items }: ShippingRequest = await request.json();

    if (!address || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Address and items are required" },
        { status: 400 }
      );
    }

    // Define your warehouse address (from address)
    const fromAddress = {
      name: "Your Company Name",
      street1: "1234 Warehouse St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "US"
    };

    // Create a parcel based on items
    const totalWeight = items.reduce((sum, item) => {
      // Default weight of 100g per item if not specified
      return sum + (item.weight || 100) * item.quantity;
    }, 0);

    const parcel = {
      length: 10,
      width: 8,
      height: 6,
      distance_unit: "in",
      weight: totalWeight.toString(),
      mass_unit: "g"
    } as any; // Type assertion for simplicity

    // Create shipment
    const shipment = await shippo.shipments.create({
      addressFrom: fromAddress,
      addressTo: address,
      parcels: [parcel],
      async: false
    } as any); // Type assertion for simplicity

    // Get shipping rates
    const rates = shipment.rates.filter((rate: any) =>
      !rate?.attributes?.includes("CHEAPEST")
    ).slice(0, 3); // Get top 3 rates

    const shippingOptions = rates.map((rate: any) => ({
      id: rate.object_id,
      name: `${rate.provider} ${rate.servicelevel.name}`,
      carrier: rate.provider,
      service: rate.servicelevel.name,
      cost: parseFloat(rate.amount),
      currency: rate.currency,
      estimatedDays: rate.estimated_days || "3-5"
    }));

    return NextResponse.json({ shippingOptions });
  } catch (error: any) {
    console.error("Shipping calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate shipping" },
      { status: 500 }
    );
  }
}
