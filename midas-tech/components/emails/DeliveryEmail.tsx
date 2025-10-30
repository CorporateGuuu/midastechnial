import { Html, Head, Preview, Body, Container, Section, Text, Button, Hr } from "@react-email/components";

interface DeliveryEmailProps {
  orderId: string;
  trackingNumber: string;
}

export default function DeliveryEmail({ orderId, trackingNumber }: DeliveryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order has been delivered!</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}>
        <Container style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
          <Section style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#16a34a" }}>Package Delivered! ✓</h1>
          </Section>

          <Text>Hi there,</Text>
          <Text>
            Great news! Your order <strong>#{orderId.slice(0, 8)}</strong> has been successfully delivered.
          </Text>

          <Section style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
            <Text><strong>Tracking Number:</strong> {trackingNumber}</Text>
            <Text><strong>Status:</strong> Delivered</Text>
          </Section>

          <Text>
            If you have any issues with your order, please don&#39;t hesitate to contact us.
          </Text>

          <Hr style={{ borderColor: "#e5e7eb", margin: "30px 0" }} />

          <Text style={{ fontSize: "12px", color: "#999" }}>
            Questions? Reply to this email or contact{" "}
            <a href="mailto:support@midastech.com" style={{ color: "#2563eb" }}>
              support@midastech.com
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
