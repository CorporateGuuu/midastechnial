import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate that all items have Price IDs
    const invalidItems = items.filter((item: any) => !item.priceId);
    if (invalidItems.length > 0) {
      return NextResponse.json(
        { error: "All items must have Price IDs" },
        { status: 400 }
      );
    }

    // Create line items using Price IDs
    const line_items = items.map((item: any) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Checkout session creation error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

// Handle GET requests for quick testing (from /stripe-test page)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const priceId = searchParams.get('priceId');
    const quantity = parseInt(searchParams.get('quantity') || '1');

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }

    // Create line items using Price ID
    const line_items = [{
      price: priceId,
      quantity: quantity,
    }];

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe-test`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        items: JSON.stringify([{ priceId, quantity }]),
      },
    });

    return NextResponse.redirect(checkoutSession.url!);
  } catch (error: any) {
    console.error("Test checkout session creation error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/stripe-test?error=checkout_failed`);
  }
}
