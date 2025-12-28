import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { sendReceipt } from "@/lib/sendReceipt";
import { sendShippingConfirmation } from "@/lib/sendShippingConfirmation";
import { format } from "date-fns";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    // Extract shipping information from metadata
    const shippingAddress = session.metadata.shippingAddress ? JSON.parse(session.metadata.shippingAddress) : null;
    const shippingMethod = session.metadata.shippingMethod || '';
    const shippingCost = session.metadata.shippingCost ? parseFloat(session.metadata.shippingCost) : 0;
    const subtotal = session.metadata.subtotal ? parseFloat(session.metadata.subtotal) : 0;
    const items = session.metadata.items ? JSON.parse(session.metadata.items) : [];

    const order = await db.order.create({
      data: {
        userId: session.metadata.userId,
        items: JSON.stringify(items),
        total: session.amount_total / 100,
        status: "paid",
        stripeSessionId: session.id,
      },
    });

    // === TRIGGER SHIPPING ===
    if (shippingAddress) {
      try {
        const customerAddress = {
          name: shippingAddress.name || session.customer_details?.name || "Customer",
          email: shippingAddress.email || session.customer_email,
          street1: shippingAddress.street1 || shippingAddress.address?.line1,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zip: shippingAddress.zip || shippingAddress.address?.postal_code,
          phone: shippingAddress.phone || session.customer_details?.phone,
        };

        const shippingRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/shipping/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            customer: customerAddress,
          }),
        });

        if (shippingRes.ok) {
          const shipping = await shippingRes.json();
          console.log('Shipping created:', shipping);

          // === SEND SHIPPING EMAIL ===
          await sendShippingConfirmation({
            orderId: order.id,
            customerEmail: session.customer_email,
            trackingNumber: shipping.trackingNumber,
            trackingUrl: shipping.trackingUrl,
            estimatedDelivery: "3-5 business days",
          });
        } else {
          console.error('Failed to create shipping');
        }
      } catch (error) {
        console.error('Error creating shipping:', error);
      }
    }

    // === SEND EMAIL ===
    await sendReceipt({
      orderId: order.id,
      customerEmail: session.customer_email,
      items,
      total: order.total,
      date: format(new Date(), "PPP"),
      shippingMethod: shippingMethod || undefined,
      trackingNumber: order.trackingNumber || undefined,
      shippingAddress,
    });
  }

  return new Response(null, { status: 200 });
}
