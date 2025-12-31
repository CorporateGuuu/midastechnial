import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { resend } from "@/lib/resend";

interface RMARequest {
  orderId: string;
  reason: string;
  description: string;
  contactEmail: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, reason, description, contactEmail }: RMARequest = await request.json();

    // Validate required fields
    if (!orderId || !reason || !description || !contactEmail) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
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

    // For now, we'll store RMA requests in a simple format
    // In a real app, you might want a separate RMA table
    const rmaData = {
      orderId,
      reason,
      description,
      contactEmail,
      status: 'pending',
      createdAt: new Date().toISOString(),
      userId: session.user.id
    };

    // Store RMA request (you could create a separate table for this)
    // For now, we'll log it and send confirmation email
    console.log('RMA Request:', rmaData);

    // Send confirmation email
    try {
      await resend.emails.send({
        from: 'support@yourcompany.com',
        to: contactEmail,
        subject: `RMA Request Received - Order ${orderId.slice(0, 8)}`,
        html: `
          <h2>RMA Request Confirmation</h2>
          <p>Dear Customer,</p>
          <p>We have received your RMA request for order <strong>${orderId.slice(0, 8)}</strong>.</p>

          <h3>Request Details:</h3>
          <ul>
            <li><strong>Reason:</strong> ${reason}</li>
            <li><strong>Description:</strong> ${description}</li>
            <li><strong>Order ID:</strong> ${orderId.slice(0, 8)}</li>
          </ul>

          <p>Our team will review your request and contact you within 2-3 business days.</p>

          <p>Thank you for your patience.</p>

          <p>Best regards,<br>Your Support Team</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send RMA confirmation email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'RMA request submitted successfully'
    });

  } catch (error: any) {
    console.error("RMA submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit RMA request" },
      { status: 500 }
    );
  }
}
