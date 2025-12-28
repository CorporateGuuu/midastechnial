import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const trackingNumber = payload.tracking_status.tracking_number;

  // Forward to per-order endpoint
  const internalUrl = `${process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL}/api/tracking/${trackingNumber}`;
  await fetch(internalUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return new Response("OK");
}
