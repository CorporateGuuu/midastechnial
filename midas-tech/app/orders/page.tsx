"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { format } from "date-fns";

interface TrackingUpdate {
  status: string;
  description: string;
  location: string | null;
  timestamp: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [tracking, setTracking] = useState<Record<string, TrackingUpdate>>({});

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    // Fetch initial orders
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);

    // Subscribe to each order
    orders.forEach((order) => {
      const channel = pusherClient?.subscribe(`order-${order.id}`);
      channel?.bind("tracking-update", (data: TrackingUpdate) => {
        setTracking((prev) => ({ ...prev, [order.id]: data }));
      });
    });

    return () => {
      orders.forEach((order) => pusherClient?.unsubscribe(`order-${order.id}`));
    };
  }, [orders.length, session, status]);

  if (status === "loading") {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (status !== "authenticated" || !session?.user?.email) {
    return <div>Please log in to view orders.</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-20">No orders yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => {
          const live = tracking[order.id];
          return (
            <div key={order.id} className="border rounded-lg p-6">
              <div>
                <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  live?.status === "shipped" ? "bg-blue-100 text-blue-800" :
                  live?.status === "delivered" ? "bg-green-100 text-green-800" :
                  order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                  order.status === "delivered" ? "bg-green-100 text-green-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {live?.status || order.status}
                </span>
                {order.trackingNumber && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    className="text-primary text-sm hover:underline"
                  >
                    Track Package → {order.trackingNumber}
                  </a>
                )}
              </div>
              {order.trackingNumber && live && (
                <div className="mt-1 text-sm text-gray-600">
                  {live.description} • {live.location && `${live.location}, `}{format(new Date(live.timestamp), "p")}
                </div>
              )}
              <div className="space-y-2 mt-4">
                {JSON.parse(order.items).map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 font-bold">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
