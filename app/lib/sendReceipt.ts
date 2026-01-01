import { resend } from "./email";
import ReceiptEmail from "../components/emails/ReceiptEmail";
import ShippingEmail from "../components/emails/ShippingEmail";
import { render } from "@react-email/render";

interface SendReceiptParams {
  orderId: string;
  customerEmail: string;
  items: Array<{ title: string; quantity: number; price: number }>;
  total: number;
  date: string;
  shippingMethod?: string;
  trackingNumber?: string;
  shippingAddress?: any;
}

export async function sendReceipt({
  orderId,
  customerEmail,
  items,
  total,
  date,
  shippingMethod,
  trackingNumber,
  shippingAddress,
}: SendReceiptParams) {
  // Prevent execution during build time
  if (!process.env.VERCEL) return;

  const emailHtml = await render(
    ReceiptEmail({ orderId, customerEmail, items, total, date })
  );

  if (!resend) {
    console.warn("Resend not configured - skipping email send");
    return;
  }

  try {
    await resend.emails.send({
      from: `Midas Technical <${process.env.FROM_EMAIL}>`,
      to: customerEmail,
      subject: `Your Midas Receipt - Order #${orderId.slice(0, 8)}`,
      html: emailHtml,
    });
    console.log("Receipt sent to", customerEmail);
  } catch (error) {
    console.error("Failed to send receipt:", error);
  }
}
