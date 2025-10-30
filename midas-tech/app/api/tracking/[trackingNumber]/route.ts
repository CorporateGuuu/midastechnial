import { NextRequest, NextResponse } from "next/server";
import { shippo } from "@/lib/shippo";
import { db } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { sendTrackingNotification } from "@/lib/sendTrackingNotification";

export async function POST(
  request: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  const { trackingNumber } = params;
  const payload = await request.json();

  // Verify it's from Shippo (optional: check token)
  // if (request.headers.get("shippo-webhook-token") !== process.env.SHIPPO_WEBHOOK_TOKEN) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const { tracking_status } = payload;

  const statusMap: Record<string, string> = {
    UNKNOWN: "pending",
    PRE_TRANSIT: "label_created",
    TRANSIT: "in_transit",
    DELIVERED: "delivered",
    FAILURE: "failed",
  };

  const newStatus = statusMap[tracking_status.status] || tracking_status.status.toLowerCase();

  const order = await db.order.findFirst({
    where: { trackingNumber },
  });

  if (!order) return new Response("Order not found", { status: 404 });

  await db.order.update({
    where: { id: order.id },
    data: { status: newStatus },
  });

  // === BROADCAST TO ALL CLIENTS ===
  await pusherServer.trigger(`order-${order.id}`, "tracking-update", {
    status: newStatus,
    description: tracking_status.status_details,
    location: tracking_status.tracking_history?.[0]?.location || null,
    timestamp: new Date().toISOString(),
  });

  // === SEND TRACKING NOTIFICATION ===
  if (newStatus !== order.status) {
    const user = await db.user.findUnique({ where: { id: order.userId! } });
    if (user?.email) {
      await sendTrackingNotification({
        email: user.email,
        status: newStatus,
        trackingNumber,
        trackingUrl: order.trackingUrl!,
      });
    }
  }

  return NextResponse.json({ success: true });
}
