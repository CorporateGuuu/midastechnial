"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { pusherClient } from "@/lib/pusher";
import { Package, Truck, CheckCircle, MapPin } from "lucide-react";
import { format } from "date-fns";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface TrackingEvent {
  status: string;
  description: string;
  location: string | null;
  timestamp: string;
  lat?: number;
  lng?: number;
}

export default function OrderTracking({ params }: { params: { id: string } }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [live, setLive] = useState<TrackingEvent | null>(null);

  const initMap = async (trackingNumber: string) => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-122.4194, 37.7749],
      zoom: 4,
    });

    // Load route
    const res = await fetch(`/api/tracking/route?number=${trackingNumber}`);
    const route = await res.json();

    if (route.length > 0) {
      const coordinates = route.map((p: any) => [p.lng, p.lat]);

      // Draw route
      map.current.on("load", () => {
        map.current!.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          },
        });

        map.current!.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#2563eb", "line-width": 4 },
        });

        // Fit bounds
        const bounds = new mapboxgl.LngLatBounds();
        coordinates.forEach((coord: [number, number]) => bounds.extend(coord));
        map.current!.fitBounds(bounds, { padding: 50 });
      });

      // Add markers
      route.forEach((point: any) => {
        new mapboxgl.Marker({ color: point.status === "origin" ? "#10b981" : "#2563eb" })
          .setLngLat([point.lng, point.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <strong>${point.location}</strong><br/>
                <small>${format(new Date(point.time), "PPp")}</small>
              </div>
            `)
          )
          .addTo(map.current!);
      });
    }
  };

  const addMarker = (event: TrackingEvent) => {
    if (!map.current || !event.lat || !event.lng) return;

    new mapboxgl.Marker({ color: "#dc2626" })
      .setLngLat([event.lng!, event.lat!])
      .setPopup(
        new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <strong>${event.description}</strong><br/>
            <small>${event.location}</small><br/>
            <small>${format(new Date(event.timestamp), "PPp")}</small>
          </div>
        `)
      )
      .addTo(map.current);

    map.current.flyTo({ center: [event.lng, event.lat], zoom: 10 });
  };

  useEffect(() => {
    // Fetch order
    fetch(`/api/orders/${params.id}`)
      .then(r => r.json())
      .then(data => {
        setOrder(data);
        if (data.trackingNumber) {
          initMap(data.trackingNumber);
        }
      });

    // Pusher
    const channel = pusherClient?.subscribe(`order-${params.id}`);
    channel?.bind("tracking-update", (data: TrackingEvent) => {
      setLive(data);
      setEvents(prev => [data, ...prev]);
      addMarker(data);
    });

    return () => {
      pusherClient?.unsubscribe(`order-${params.id}`);
      map.current?.remove();
    };
  }, [params.id]);

  // ... rest of timeline UI (same as before)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order #{order?.id.slice(0, 8)}</h1>

      {/* Interactive Map */}
      <div className="mb-8 h-96">
        {order?.trackingNumber ? (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div ref={mapContainer} className="w-full h-full" />
          </div>
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
            <p className="text-gray-500">Tracking map will appear when shipped</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      {/* ... same as before ... */}

      {/* Live Update */}
      {live && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="font-semibold text-green-800">Live Update</p>
          <p className="text-sm">{live.description}</p>
          {live.location && <p className="text-xs text-gray-600">{live.location}</p>}
        </div>
      )}
    </div>
  );
}
