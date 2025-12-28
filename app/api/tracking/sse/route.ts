import { db } from "@/lib/prisma";
import { shippo } from "@/lib/shippo";

const statusMap: Record<string, string> = {
  UNKNOWN: "pending",
  PRE_TRANSIT: "label_created",
  TRANSIT: "in_transit",
  DELIVERED: "delivered",
  FAILURE: "failed",
};

export async function GET(request: Request) {
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Poll Shippo every 30s
      const interval = setInterval(async () => {
        try {
          // fetch all orders with tracking
          const orders = await db.order.findMany({
            where: { trackingNumber: { not: null } }
          });

          for (const order of orders) {
            // Use Shippo REST API directly for tracking
            try {
              const carrier = order.carrier || 'usps';
              const trackingUrl = `https://api.goshippo.com/tracks/${carrier}/${order.trackingNumber!}`;

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

              // compare & update
              const currentStatus = order.status;
              const newStatus = statusMap[trackingStatus] || trackingStatus?.toLowerCase();

              if (newStatus && newStatus !== currentStatus) {
                // Update order status in database
                await db.order.update({
                  where: { id: order.id },
                  data: { status: newStatus }
                });

                // Send update via SSE
                send({
                  orderId: order.id,
                  status: newStatus,
                  trackingNumber: order.trackingNumber,
                  timestamp: new Date().toISOString()
                });
              }
            } catch (trackError) {
              console.log(`Failed to get tracking for ${order.trackingNumber}:`, trackError);
            }
          }
        } catch (error) {
          console.error('Tracking update error:', error);
          // Optionally send error notification
          send({
            type: 'error',
            message: 'Failed to update tracking information',
            timestamp: new Date().toISOString()
          });
        }
      }, 30000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
