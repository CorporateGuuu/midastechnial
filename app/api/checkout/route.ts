// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      items,
      shippingAddress,
      shippingMethod,
      shippingCost,
      subtotal,
      total
    } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Create line items for products
    const line_items = items.map((item: any) => {
      // Use Price ID if available, otherwise fall back to price_data
      if (item.stripePriceId) {
        return {
          price: item.stripePriceId,
          quantity: item.quantity,
        };
      } else {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: item.images?.[0] ? [item.images[0]] : [],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      }
    });

    // Add shipping as a separate line item
    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Shipping: ${shippingMethod}`,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

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
        shippingAddress: JSON.stringify(shippingAddress),
        shippingMethod,
        shippingCost: shippingCost.toString(),
        subtotal: subtotal.toString(),
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ id: checkoutSession.id });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
