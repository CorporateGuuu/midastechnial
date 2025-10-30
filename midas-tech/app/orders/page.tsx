// app/orders/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <div>Please log in to view orders.</div>;
  }

  const orders = await db.Order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return <div className="text-center py-20">No orders yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
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
        ))}
      </div>
    </div>
  );
}
