// midas-tech/scripts/test-shipping-email.ts
import { render } from "@react-email/render";
import ShippingEmail from "../app/components/emails/ShippingEmail";

// Temporarily render and log HTML instead of sending
(async () => {
  const html = await render(ShippingEmail({
    orderId: "ord_123456789",
    trackingNumber: "TRK123456789",
    trackingUrl: "https://www.ups.com/track?loc=en_US&tracknum=TRK123456789",
    estimatedDelivery: "Monday, April 8, 2025",
  }));

  console.log("Rendered Shipping Email HTML:");
  console.log(html);
})();
