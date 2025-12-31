'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RotateCcw, Package, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';

interface ReturnRequest {
  id: string;
  orderId: string;
  items: ReturnItem[];
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  requestDate: string;
  notes?: string;
}

interface ReturnItem {
  id: string;
  title: string;
  quantity: number;
  condition: 'New' | 'Used' | 'Damaged';
}

export default function ReturnsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showNewReturn, setShowNewReturn] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/returns');
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

  // Mock return requests data
  const returnRequests: ReturnRequest[] = [
    {
      id: 'RTN-001',
      orderId: 'ORD-001',
      items: [
        { id: '1', title: 'iPhone 15 Pro Max Display', quantity: 1, condition: 'New' }
      ],
      reason: 'Defective product - screen has dead pixels',
      status: 'Approved',
      requestDate: '2025-01-18',
      notes: 'Return approved. Refund will be processed within 3-5 business days.'
    },
    {
      id: 'RTN-002',
      orderId: 'ORD-004',
      items: [
        { id: '2', title: 'MacBook Pro 16" Display', quantity: 1, condition: 'Used' }
      ],
      reason: 'Changed mind about purchase',
      status: 'Pending',
      requestDate: '2025-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <RotateCcw className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Returns</h1>
            <p className="text-gray-600">Manage your return requests and exchanges.</p>
          </div>
          <button
            onClick={() => setShowNewReturn(true)}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Return Request
          </button>
        </div>

        {/* Return Requests */}
        <div className="space-y-6">
          {returnRequests.length === 0 ? (
            <div className="text-center py-12">
              <RotateCcw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No return requests</h3>
              <p className="text-gray-500">You haven't submitted any return requests yet.</p>
            </div>
          ) : (
            returnRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                        <RotateCcw className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Return #{request.id}</h3>
                        <p className="text-sm text-gray-500">Order #{request.orderId} • {request.requestDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(request.status)}
                        <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Items to Return:</p>
                    <div className="space-y-2">
                      {request.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{item.title}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity} • Condition: {item.condition}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Return Reason:</p>
                    <p className="text-sm text-gray-600">{request.reason}</p>
                  </div>

                  {/* Notes */}
                  {request.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Notes:</span> {request.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Return Policy */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Return Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Eligibility</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Returns accepted within 30 days of delivery</li>
                <li>• Items must be in original condition and packaging</li>
                <li>• All accessories and manuals must be included</li>
                <li>• Custom or personalized items are not returnable</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Process</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Submit return request through this portal</li>
                <li>• Receive return authorization and shipping label</li>
                <li>• Pack item securely in original packaging</li>
                <li>• Drop off at authorized shipping location</li>
              </ul>
            </div>
          </div>
        </div>

        {/* New Return Modal Placeholder */}
        {showNewReturn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">New Return Request</h2>
                <button
                  onClick={() => setShowNewReturn(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="text-center py-8">
                <RotateCcw className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Return request form would be implemented here</p>
                <p className="text-sm text-gray-400 mt-2">This is a placeholder for the return form</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
