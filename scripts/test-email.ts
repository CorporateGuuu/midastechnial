import { sendReceipt } from "../midas-tech/lib/sendReceipt";

sendReceipt({
  orderId: "ord_123456789",
  customerEmail: "test@example.com",
  items: [
    { title: "iPhone 15 Screen", quantity: 1, price: 299.99 },
    { title: "Repair Kit", quantity: 1, price: 149.99 },
  ],
  total: 449.98,
  date: "April 5, 2025",
});
