// components/emails/ShippingEmail.tsx
import { Html, Head, Preview, Body, Container, Section, Text, Button, Hr } from "@react-email/components";

interface ShippingEmailProps {
  orderId: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: string;
}

export default function ShippingEmail({
  orderId,
  trackingNumber,
  trackingUrl,
  estimatedDelivery,
}: ShippingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order has shipped!</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}>
        <Container style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
          <Section style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#2563eb" }}>Package Shipped!</h1>
          </Section>

          <Text>Hi there,</Text>
          <Text>
            Great news! Your order <strong>#{orderId.slice(0, 8)}</strong> has been shipped.
          </Text>

          <Section style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
            <Text><strong>Tracking Number:</strong> {trackingNumber}</Text>
            <Text><strong>Estimated Delivery:</strong> {estimatedDelivery}</Text>
            <Button
              href={trackingUrl}
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              Track Package
            </Button>
          </Section>

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
