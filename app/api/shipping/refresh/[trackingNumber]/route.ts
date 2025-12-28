import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { shippo } from "@/lib/shippo";
import { pusherServer } from "@/lib/pusher";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  const { trackingNumber } = await params;

  try {
    // Find the order with this tracking number
    const order = await db.order.findFirst({
      where: { trackingNumber },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Get tracking info from Shippo
    const carrier = order.carrier || 'usps';
    const trackingUrl = `https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`;

    const response = await fetch(trackingUrl, {
      headers: {
        'Authorization': `ShippoToken ${process.env.SHIPPO_API_TOKEN!}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const track = await response.json();
    const trackingStatus = track.tracking_status?.status;

    // Status mapping
    const statusMap: Record<string, string> = {
      UNKNOWN: "pending",
      PRE_TRANSIT: "label_created",
      TRANSIT: "in_transit",
      DELIVERED: "delivered",
      FAILURE: "failed",
    };

    const currentStatus = order.status;
    const newStatus = statusMap[trackingStatus] || trackingStatus?.toLowerCase();

    // Update order if status changed
    if (newStatus && newStatus !== currentStatus) {
      await db.order.update({
        where: { id: order.id },
        data: { status: newStatus }
      });

      // Broadcast update via Pusher
      await pusherServer.trigger(`order-${order.id}`, "tracking-update", {
        status: newStatus,
        description: track.tracking_status?.status_details,
        location: track.tracking_status?.tracking_history?.[0]?.location || null,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      trackingNumber,
      status: newStatus || currentStatus,
      updated: newStatus !== currentStatus
    });

  } catch (error) {
    console.error('Failed to refresh tracking:', error);
    return NextResponse.json({
      error: 'Failed to refresh tracking information',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
