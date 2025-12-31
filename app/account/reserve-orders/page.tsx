'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Clock, Package, AlertCircle, CheckCircle } from 'lucide-react';

export default function ReserveOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/reserve-orders');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Mock reserve orders data
  const reserveOrders = [
    {
      id: 'RSV-001',
      item: 'iPhone 16 Pro Max Display',
      requestedDate: '2025-01-20',
      status: 'Approved',
      estimatedArrival: '2025-02-15',
      notes: 'High demand item, expedited processing approved'
    },
    {
      id: 'RSV-002',
      item: 'MacBook Pro M4 Keyboard Assembly',
      requestedDate: '2025-01-18',
      status: 'Pending',
      estimatedArrival: '2025-02-20',
      notes: 'Processing availability check'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reserve Orders</h1>
          <p className="text-gray-600">Track your item reservations and pre-orders.</p>
        </div>

        {/* Reserve Orders List */}
        <div className="space-y-6">
          {reserveOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reserve orders</h3>
              <p className="text-gray-500">You don't have any item reservations at this time.</p>
            </div>
          ) : (
            reserveOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.item}</h3>
                      <p className="text-sm text-gray-500">Reserve Order #{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Requested Date</p>
                    <p className="text-sm text-gray-600">{order.requestedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Estimated Arrival</p>
                    <p className="text-sm text-gray-600">{order.estimatedArrival}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <p className="text-sm text-gray-600">{order.status}</p>
                  </div>
                </div>

                {order.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Notes:</span> {order.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Reserve Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How it Works</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Reserve items that are currently out of stock</li>
                <li>• Get priority notification when items arrive</li>
                <li>• Secure your place in line for high-demand products</li>
                <li>• No payment required until item is available</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Guaranteed access to limited stock</li>
                <li>• Early notification of new arrivals</li>
                <li>• Priority processing for your reservation</li>
                <li>• Flexible cancellation policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
