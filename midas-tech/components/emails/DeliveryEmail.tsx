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
      <Body className="font-sans bg-[#f6f9fc]">
        <Container className="p-5 max-w-[600px] mx-auto">
          <Section className="text-center mb-[30px]">
            <h1 className="text-green-600">Package Delivered! ✓</h1>
          </Section>

          <Text>Hi there,</Text>
          <Text>
            Great news! Your order <strong>#{orderId.slice(0, 8)}</strong> has been successfully delivered.
          </Text>

          <Section className="bg-white p-5 rounded-lg my-5">
            <Text><strong>Tracking Number:</strong> {trackingNumber}</Text>
            <Text><strong>Status:</strong> Delivered</Text>
          </Section>

          <Text>
            If you have any issues with your order, please don&#39;t hesitate to contact us.
          </Text>

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
