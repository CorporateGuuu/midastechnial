import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { db } from '@/lib/prisma'
import { sendReceipt } from '@/lib/sendReceipt'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover'
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const sig = headersList.get('stripe-signature')

    if (!sig) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing completed checkout session:', session.id)

    // Check if order already exists
    const existingOrder = await db.order.findUnique({
      where: { stripeSessionId: session.id }
    })

    if (existingOrder) {
      console.log('Order already processed for session:', session.id)
      return
    }

    // Get line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

    // Build order items from line items
    const orderItems = []
    for (const item of lineItems.data) {
      const price = await stripe.prices.retrieve(item.price!.id)

      // Find product by stripe price ID
      const product = await db.product.findFirst({
        where: { stripePriceId: price.id }
      })

      if (product) {
        orderItems.push({
          id: product.id,
          title: product.title,
          price: price.unit_amount! / 100, // Convert from cents
          quantity: item.quantity || 1
        })

        // Reduce inventory
        const currentStock = product.inStock || 0
        const newStock = Math.max(0, currentStock - (item.quantity || 1))

        await db.product.update({
          where: { id: product.id },
          data: {
            inStock: newStock
          }
        })
      }
    }

    // Calculate totals
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const totalAmount = session.amount_total! / 100
    const shippingCost = Math.max(0, totalAmount - subtotal)

    // Create order record
    const order = await db.order.create({
      data: {
        stripeSessionId: session.id,
        items: JSON.stringify(orderItems),
        total: totalAmount,
        subtotal: subtotal,
        shippingCost: shippingCost,
        status: 'paid',
        shippingAddress: null
      }
    })

    console.log('Order created:', order.id)

    // Send receipt email
    if (session.customer_details?.email) {
      const customerEmail = session.customer_details.email

      await sendReceipt({
        orderId: order.id,
        customerEmail,
        items: orderItems,
        total: order.total,
        date: new Date().toISOString(),
        shippingMethod: 'Standard Shipping'
      })

      console.log('Receipt sent to:', customerEmail)
    }

  } catch (error) {
    console.error('Error processing checkout session:', error)
    throw error
  }
}
