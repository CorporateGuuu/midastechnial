'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  ShoppingBag,
  RefreshCw,
  RotateCcw,
  Monitor,
  CreditCard,
  BarChart3,
  Package,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/dashboard');
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

  // Mock data - in a real app, this would come from your API
  const stats = {
    totalOrders: 12,
    pendingOrders: 2,
    completedOrders: 10,
    returnRequests: 1,
    accountBalance: 45.67,
    itemsInCart: 3
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2025-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2025-01-10',
      status: 'In Transit',
      total: 149.99,
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2025-01-05',
      status: 'Processing',
      total: 89.99,
      items: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name}! Here's an overview of your account.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-[#D4AF37]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Account Credit</p>
                <p className="text-2xl font-bold text-gray-900">${stats.accountBalance}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Returns</p>
                <p className="text-2xl font-bold text-gray-900">{stats.returnRequests}</p>
              </div>
              <RotateCcw className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="text-[#D4AF37] hover:text-yellow-600 text-sm font-medium"
                >
                  View All Orders →
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${order.total}</p>
                      <div className="flex items-center gap-1">
                        {order.status === 'Delivered' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {order.status === 'In Transit' && <Clock className="w-4 h-4 text-yellow-500" />}
                        {order.status === 'Processing' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/account/information"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-medium">Update Profile</span>
                </Link>
                <Link
                  href="/account/address-book"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-medium">Manage Addresses</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-medium">Track Orders</span>
                </Link>
                <Link
                  href="/account/returns"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-medium">Return Items</span>
                </Link>
                <Link
                  href="/account/lcd-buyback"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Monitor className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-medium">LCD Buyback</span>
                </Link>
              </div>
            </div>

            {/* Account Balance */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Account Credit</h3>
                <CreditCard className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold mb-2">${stats.accountBalance}</p>
              <p className="text-sm opacity-90">Available for purchases</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
