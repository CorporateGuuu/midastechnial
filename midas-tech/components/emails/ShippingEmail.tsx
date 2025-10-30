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
      <Body className="font-sans bg-[#f6f9fc]">
        <Container className="p-5 max-w-[600px] mx-auto">
          <Section className="text-center mb-[30px]">
            <Text className="text-blue-600 text-2xl font-bold">Package Shipped!</Text>
          </Section>

          <Text>Hi there,</Text>
          <Text>
            Great news! Your order <strong>#{orderId.slice(0, 8)}</strong> has been shipped.
          </Text>

          <Section className="bg-white p-5 rounded-lg my-5">
            <Text><strong>Tracking Number:</strong> {trackingNumber}</Text>
            <Text><strong>Estimated Delivery:</strong> {estimatedDelivery}</Text>
            <Button href={trackingUrl} className="bg-blue-600 text-white px-6 py-3 rounded-lg no-underline inline-block mt-3">
              Track Package
            </Button>
          </Section>

          <Hr className="border-gray-300 my-[30px]" />

          <Text className="text-xs text-gray-600">
            Questions? Reply to this email or contact{" "}
            <a href="mailto:support@midastech.com" className="text-blue-600">
              support@midastech.com
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
