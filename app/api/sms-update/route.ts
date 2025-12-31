import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { twilioClient } from "@/lib/twilio";

interface SMSUpdateRequest {
  orderId: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId }: SMSUpdateRequest = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Verify the order belongs to the user
    const order = await db.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Get user's phone number (assuming it's stored in user profile)
    // For now, we'll use a placeholder - in a real app, you'd get this from user profile
    const userPhone = process.env.DEFAULT_USER_PHONE || "+1234567890";

    // Create SMS message
    const statusMessage = getStatusMessage(order.status);
    const message = `Midas Technical: Order ${order.id.slice(0, 8)} update - ${statusMessage}`;

    // Send SMS via Twilio
    try {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: userPhone
      });

      return NextResponse.json({
        success: true,
        message: 'SMS update sent successfully'
      });
    } catch (twilioError: any) {
      console.error('Twilio SMS error:', twilioError);
      return NextResponse.json(
        { error: "Failed to send SMS" },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("SMS update error:", error);
    return NextResponse.json(
      { error: "Failed to send SMS update" },
      { status: 500 }
    );
  }
}

function getStatusMessage(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Your order is being processed.';
    case 'paid':
      return 'Payment confirmed. Preparing for shipment.';
    case 'shipped':
      return 'Your order has been shipped and is on the way!';
    case 'delivered':
      return 'Your order has been delivered. Thank you!';
    default:
      return 'Order status update.';
  }
}
