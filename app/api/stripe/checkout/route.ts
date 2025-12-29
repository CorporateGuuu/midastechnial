import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover'
})

interface CheckoutItem {
  priceId: string
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: CheckoutItem[] } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Calculate total for shipping logic
    const total = items.reduce((sum, item) => sum + (item.quantity * 100), 0) // Convert to cents

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price: item.priceId,
      quantity: item.quantity,
    }))

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'], // Add more countries as needed
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: total >= 9900 ? 0 : 999, // Free shipping over $99, otherwise $9.99
              currency: 'usd',
            },
            display_name: total >= 9900 ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/(shop)/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/(shop)/cart`,
      metadata: {
        itemCount: items.length.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
