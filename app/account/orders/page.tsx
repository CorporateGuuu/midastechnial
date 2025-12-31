'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  RotateCcw,
  Filter
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
}

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Mock data - in a real app, this would come from your API
  const mockOrders: Order[] = [
    {
      id: 'ORD-001',
      date: '2025-01-15',
      status: 'Delivered',
      total: 299.99,
      trackingNumber: 'TRK123456789',
      items: [
        { id: '1', title: 'iPhone 15 Pro Max Display', quantity: 1, price: 299.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2025-01-10',
      status: 'In Transit',
      total: 149.99,
      trackingNumber: 'TRK987654321',
      items: [
        { id: '2', title: 'iPhone 14 Pro Battery', quantity: 1, price: 89.99 },
        { id: '3', title: 'Screen Protector', quantity: 1, price: 19.99 },
        { id: '4', title: 'Cleaning Kit', quantity: 1, price: 40.01 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2025-01-05',
      status: 'Processing',
      total: 89.99,
      items: [
        { id: '5', title: 'iPhone Charging Port', quantity: 1, price: 89.99 }
      ]
    },
    {
      id: 'ORD-004',
      date: '2024-12-20',
      status: 'Delivered',
      total: 599.99,
      trackingNumber: 'TRK555666777',
      items: [
        { id: '6', title: 'MacBook Pro 16" Display', quantity: 1, price: 599.99 }
      ]
    }
  ];

  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/orders');
    }
  }, [status, router]);

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'In Transit': return <Clock className="w-4 h-4" />;
      case 'Processing': return <Package className="w-4 h-4" />;
      case 'Cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your order history.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="processing">Processing</option>
                <option value="in transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">
                {filterStatus === 'all'
                  ? "You haven't placed any orders yet."
                  : `No ${filterStatus.toLowerCase()} orders found.`
                }
              </p>
              <Link
                href="/products"
                className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500">Placed on {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(order.status)}
                        <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">${order.total}</p>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item) => (
                        <span key={item.id} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {item.title}
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          +{order.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tracking */}
                  {order.trackingNumber && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Tracking:</span> {order.trackingNumber}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="flex items-center gap-2 text-[#D4AF37] hover:text-yellow-600 text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    {(order.status === 'Delivered') && (
                      <Link
                        href={`/account/returns?order=${order.id}`}
                        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Return Items
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Stats */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'Delivered').length}
              </p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'In Transit').length}
              </p>
              <p className="text-sm text-gray-600">In Transit</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'Processing').length}
              </p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
