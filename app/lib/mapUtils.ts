// lib/mapUtils.ts
import { shippo } from "./shippo";

export async function getTrackingRoute(trackingNumber: string) {
  // Use Shippo REST API directly for tracking data
  const trackingUrl = `https://api.goshippo.com/tracks/usps/${trackingNumber}`; // Default to USPS

  const response = await fetch(trackingUrl, {
    headers: {
      'Authorization': `ShippoToken ${process.env.SHIPPO_API_TOKEN!}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tracking data: ${response.status}`);
  }

  const track = await response.json();
  const history = track.tracking_history || [];

  const points = history
    .filter((e: any) => e.location?.city && e.location?.state)
    .map((e: any) => ({
      lng: e.location.longitude || -122.4194, // fallback
      lat: e.location.latitude || 37.7749,
      status: e.status,
      location: `${e.location.city}, ${e.location.state}`,
      time: e.status_date,
    }));

  // Add warehouse start
  points.unshift({
    lng: -122.0839,
    lat: 37.3861,
    status: "origin",
    location: "Silicon Valley, CA",
    time: new Date().toISOString(),
  });

  return points;
}
