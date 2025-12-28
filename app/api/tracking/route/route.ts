import { NextRequest, NextResponse } from "next/server";
import { getTrackingRoute } from "../../../../../lib/mapUtils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trackingNumber = searchParams.get("number");

  if (!trackingNumber) {
    return NextResponse.json({ error: "Tracking number required" }, { status: 400 });
  }

  try {
    const route = await getTrackingRoute(trackingNumber);
    return NextResponse.json(route);
  } catch (error) {
    console.error("Failed to get tracking route:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracking route" },
      { status: 500 }
    );
  }
}
