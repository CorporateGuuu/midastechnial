import { resend } from "./email";
import ShippingEmail from "../components/emails/ShippingEmail";
import { render } from "@react-email/render";

interface SendShippingParams {
  orderId: string;
  customerEmail: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: string;
}

export async function sendShippingConfirmation({
  orderId,
  customerEmail,
  trackingNumber,
  trackingUrl,
  estimatedDelivery,
}: SendShippingParams) {
  // Prevent execution during build time
  if (!process.env.VERCEL) return;

  if (!resend) {
    console.warn("Resend not configured - skipping email send");
    return;
  }

  const html = await render(
    ShippingEmail({ orderId, trackingNumber, trackingUrl, estimatedDelivery })
  );

  await resend.emails.send({
    from: `Midas Shipping <${process.env.FROM_EMAIL}>`,
    to: customerEmail,
    subject: `Your order #${orderId.slice(0, 8)} has shipped!`,
    html,
  });
}
