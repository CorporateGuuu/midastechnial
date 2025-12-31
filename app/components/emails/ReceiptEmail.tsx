// components/emails/ReceiptEmail.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Hr,
  Row,
  Column,
  Button,
} from "@react-email/components";

interface ReceiptEmailProps {
  orderId: string;
  customerEmail: string;
  items: Array<{ title: string; quantity: number; price: number }>;
  total: number;
  date: string;
}

export default function ReceiptEmail({
  orderId,
  customerEmail,
  items,
  total,
  date,
}: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your purchase! Order #{orderId.slice(0, 8)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={topHeader}>
            <Text style={companyName}>Midas Technical Solutions</Text>
            <Hr style={headerBorder} />
          </Section>

          <Section style={header}>
            <Heading style={h1}>Purchase Receipt</Heading>
          </Section>

          <Text style={text}>
            Hi there,<br />
            Thank you for shopping with Midas Technical Solutions.
          </Text>

          <Section style={orderSection}>
            <Text style={orderTitle}>Order Details</Text>
            <Text style={orderIdStyle}>Order ID: #{orderId.slice(0, 8)}</Text>
            <Text style={orderDate}>Date: {date}</Text>
          </Section>

          <Section style={itemsSection}>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column style={itemName}>
                  {item.title} × {item.quantity}
                </Column>
                <Column style={itemPrice} align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </Column>
              </Row>
            ))}
            <Hr style={hr} />
            <Row>
              <Column style={totalLabel}>Total</Column>
              <Column style={totalPrice} align="right">
                ${total.toFixed(2)}
              </Column>
            </Row>
          </Section>

          <Section style={buttonSection}>
            <Button href="https://midastech.com/orders" style={viewOrderBtn}>
              View Order History
            </Button>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>support@midastech.com</Text>
            <Text style={copyright}>© 2025 Midas Technical Solutions</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = { backgroundColor: "#f6f9fc", fontFamily: "Arial, sans-serif" };
const container = { margin: "0 auto", padding: "20px", maxWidth: "600px" };
const topHeader = { textAlign: "center" as const, marginBottom: "20px" };
const companyName = { fontSize: "18px", fontWeight: "bold", color: "#1a1a1a" };
const headerBorder = { borderTop: "2px solid #d1d5db", margin: "10px 0" };
const header = { textAlign: "center" as const, marginBottom: "30px" };
const logo = { margin: "0 auto" };
const h1 = { color: "#1a1a1a", fontSize: "24px", margin: "10px 0" };
const text = { color: "#333", fontSize: "16px", lineHeight: "24px" };
const orderSection = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", margin: "20px 0" };
const orderTitle = { fontSize: "18px", fontWeight: "bold", margin: "0 0 10px" };
const orderIdStyle = { margin: "5px 0", fontFamily: "monospace" };
const orderDate = { margin: "5px 0", color: "#666" };
const itemsSection = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px" };
const itemRow = { padding: "8px 0" };
const itemName = { color: "#333", fontSize: "15px" };
const itemPrice = { color: "#333", fontSize: "15px", fontWeight: "600" };
const hr = { borderColor: "#e6e6e6", margin: "15px 0" };
const totalLabel = { fontWeight: "bold", fontSize: "16px" };
const totalPrice = { fontWeight: "bold", fontSize: "18px", color: "#2563eb" };
const buttonSection = { textAlign: "center" as const, margin: "20px 0" };
const viewOrderBtn = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  color: "#333",
  padding: "12px 24px",
  textAlign: "center" as const,
  borderRadius: "4px",
  fontWeight: "500",
  textDecoration: "none",
  display: "inline-block",
  margin: "0 auto",
};
const footer = { marginTop: "40px", textAlign: "center" as const };
const footerText = { color: "#666", fontSize: "14px", margin: "5px 0" };
const copyright = { color: "#999", fontSize: "12px", marginTop: "10px" };
const footerSmall = { color: "#999", fontSize: "12px", marginTop: "10px" };
const link = { color: "#2563eb", textDecoration: "none" };
const btn = {
  backgroundColor: "#2563eb",
  color: "#fff",
  padding: "12px 24px",
  textAlign: "center" as const,
  borderRadius: "6px",
  fontWeight: "600",
  margin: "20px auto",
  display: "block",
  width: "200px",
};
