// midas-tech/scripts/test-email.ts
import { render } from "@react-email/render";
import ReceiptEmail from "../app/components/emails/ReceiptEmail";

// Temporarily render and log HTML instead of sending
(async () => {
  const html = await render(ReceiptEmail({
    orderId: "ord_123456789",
    customerEmail: "test@example.com",
    items: [
      { title: "iPhone 15 Screen", quantity: 1, price: 299.99 },
      { title: "Repair Kit", quantity: 1, price: 149.99 },
    ],
    total: 449.98,
    date: "April 5, 2025",
  }));

  console.log("Rendered Email HTML:");
  console.log(html);
})();
