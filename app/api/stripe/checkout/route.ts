import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

console.log('Stripe initialized with key starting:', process.env.STRIPE_SECRET_KEY?.substring(0, 10))

interface CheckoutItem {
  priceId?: string
  quantity: number
  title?: string
  price?: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Checkout API called with body:', body)

    const { items }: { items: CheckoutItem[] } = body

    if (!items || items.length === 0) {
      console.log('No items provided')
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    console.log('Processing items:', items)

    // Calculate total for shipping logic
    const total = items.reduce((sum, item) => sum + ((item.price || 0) * item.quantity * 100), 0) // Convert to cents

    // Create line items for Stripe
    const lineItems = await Promise.all(items.map(async (item) => {
      if (item.priceId) {
        // Use existing Stripe price ID
        return {
          price: item.priceId,
          quantity: item.quantity,
        }
      } else if (item.price && item.title) {
        // Create ad-hoc price for products without Stripe price IDs
        const price = await stripe.prices.create({
          unit_amount: Math.round(item.price * 100), // Convert to cents
          currency: 'usd',
          product_data: {
            name: item.title,
          },
        })
        return {
          price: price.id,
          quantity: item.quantity,
        }
      } else {
        throw new Error('Invalid item: missing priceId or price/title')
      }
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
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
