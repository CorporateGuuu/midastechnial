import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";
import { sendReceipt } from "@/lib/sendReceipt";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err.message);
      return NextResponse.json({ error: "Webhook error" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session, event.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session, eventId: string) {
  try {
    // Check for idempotency - prevent duplicate processing
    const existingOrder = await db.order.findUnique({
      where: { stripeSessionId: session.id }
    });

    if (existingOrder) {
      console.log(`Order already exists for session ${session.id}`);
      return;
    }

    // Extract metadata
    const userId = session.metadata?.userId;
    const shippingAddress = session.metadata?.shippingAddress;
    const shippingMethod = session.metadata?.shippingMethod;
    const shippingCost = session.metadata?.shippingCost;
    const subtotal = session.metadata?.subtotal;
    const items = session.metadata?.items;

    if (!userId || !items) {
      console.error("Missing required metadata for session:", session.id);
      return;
    }

    // Parse items
    const parsedItems = JSON.parse(items);

    // Calculate total from line items (this is more accurate than metadata)
    const total = session.amount_total ? session.amount_total / 100 : 0;

    // Get customer email
    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      console.error("No customer email found for session:", session.id);
      return;
    }

    // Create order in database (items stored as JSON string)
    const order = await db.order.create({
      data: {
        userId,
        stripeSessionId: session.id,
        status: "paid",
        total: total,
        shippingAddress: shippingAddress || "",
        shippingMethod: shippingMethod || "",
        shippingCost: parseFloat(shippingCost || "0"),
        items: JSON.stringify(parsedItems), // Store as JSON string
      },
      include: {
        user: true,
      },
    });

    console.log(`Order created: ${order.id} for session ${session.id}`);

    // Send confirmation email
    try {
      await sendReceipt({
        orderId: order.id,
        customerEmail,
        items: parsedItems.map((item: any) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total,
        date: order.createdAt.toISOString().split('T')[0],
        shippingMethod: shippingMethod || undefined,
        shippingAddress: shippingAddress ? JSON.parse(shippingAddress) : undefined,
      });
      console.log(`Confirmation email sent for order ${order.id}`);
    } catch (emailError: any) {
      console.error(`Failed to send confirmation email for order ${order.id}:`, emailError);
      // Don't fail the webhook if email fails
    }

    // TODO: Add inventory reduction logic here when inventory tracking is implemented
    // For now, we'll just log the inventory changes needed
    console.log(`Inventory update needed for order ${order.id}:`, parsedItems);

  } catch (error: any) {
    console.error(`Error handling checkout session ${session.id}:`, error);
    // Consider implementing retry logic or dead letter queue for failed webhooks
  }
}
