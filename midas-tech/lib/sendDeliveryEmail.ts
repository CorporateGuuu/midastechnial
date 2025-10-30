import { resend } from "../../lib/email";
import DeliveryEmail from "../components/emails/DeliveryEmail";
import { render } from "@react-email/render";

interface SendDeliveryParams {
  orderId: string;
  customerEmail: string;
  trackingNumber: string;
}

export async function sendDeliveryEmail({
  orderId,
  customerEmail,
  trackingNumber,
}: SendDeliveryParams) {
  const html = await render(
    DeliveryEmail({ orderId, trackingNumber })
  );

  await resend.emails.send({
    from: `Midas Shipping <${process.env.FROM_EMAIL}>`,
    to: customerEmail,
    subject: `Your order #${orderId.slice(0, 8)} has been delivered!`,
    html,
  });
}
