import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { resend } from "@/lib/resend";

interface EmailUpdateRequest {
  orderId: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId }: EmailUpdateRequest = await request.json();

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

    // Parse order items
    const items = JSON.parse(order.items);
    const customerEmail = session.user.email;

    // Create email content
    const statusMessage = getStatusMessage(order.status);
    const subject = `Order Update - ${order.id.slice(0, 8)}`;

    // Send email via Resend
    try {
      if (!resend) {
        console.log('Resend not configured, skipping email send');
        return NextResponse.json({
          success: true,
          message: 'Email functionality disabled (Resend not configured)'
        });
      }

      await resend.emails.send({
        from: 'orders@yourcompany.com',
        to: customerEmail,
        subject: subject,
        html: `
          <h2>Order Status Update</h2>
          <p>Dear Customer,</p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order ${order.id.slice(0, 8)}</h3>
            <p><strong>Status:</strong> ${statusMessage}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          </div>

          <h4>Order Items:</h4>
          <ul>
            ${items.map((item: { title: string; price: number; quantity: number }) => `
              <li>${item.title} × ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
            `).join('')}
          </ul>

          ${order.trackingNumber ? `
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <h4>Tracking Information</h4>
              <p><strong>Carrier:</strong> ${order.carrier || 'N/A'}</p>
              <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
              ${order.trackingUrl ? `<p><a href="${order.trackingUrl}" style="color: #1976d2;">Track Your Package</a></p>` : ''}
            </div>
          ` : ''}

          <p>If you have any questions, please contact our support team.</p>

          <p>Thank you for choosing Midas Technical Solutions!</p>

          <p>Best regards,<br>Your Support Team</p>
        `
      });

      return NextResponse.json({
        success: true,
        message: 'Email update sent successfully'
      });
    } catch (emailError) {
      console.error('Resend email error:', emailError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Email update error:", error);
    return NextResponse.json(
      { error: "Failed to send email update" },
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
