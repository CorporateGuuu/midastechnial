'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Monitor, Plus, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

interface LCDSubmission {
  id: string;
  deviceModel: string;
  condition: 'Working' | 'Broken' | 'Parts Only';
  submittedDate: string;
  status: 'Pending' | 'Evaluated' | 'Approved' | 'Rejected';
  estimatedValue?: number;
  notes?: string;
}

export default function LCDBuybackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showNewSubmission, setShowNewSubmission] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/lcd-buyback');
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

  // Mock LCD buyback submissions
  const submissions: LCDSubmission[] = [
    {
      id: 'LCD-001',
      deviceModel: 'iPhone 14 Pro Max',
      condition: 'Working',
      submittedDate: '2025-01-15',
      status: 'Approved',
      estimatedValue: 85,
      notes: 'Excellent condition, approved for $85.00. Ready for pickup.'
    },
    {
      id: 'LCD-002',
      deviceModel: 'Samsung Galaxy S23 Ultra',
      condition: 'Broken',
      submittedDate: '2025-01-18',
      status: 'Evaluated',
      estimatedValue: 35,
      notes: 'Screen has cracks but LCD panel is intact. Estimated value $35.00.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Evaluated': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <AlertCircle className="w-4 h-4" />;
      case 'Evaluated': return <DollarSign className="w-4 h-4" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">LCD Buyback Program</h1>
            <p className="text-gray-600">Trade in your old or broken LCD screens for cash or store credit.</p>
          </div>
          <button
            onClick={() => setShowNewSubmission(true)}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Submit LCD
          </button>
        </div>

        {/* LCD Submissions */}
        <div className="space-y-6">
          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <Monitor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No LCD submissions</h3>
              <p className="text-gray-500">You haven't submitted any LCD screens for buyback yet.</p>
            </div>
          ) : (
            submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{submission.deviceModel}</h3>
                      <p className="text-sm text-gray-500">Submission #{submission.id} • {submission.submittedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(submission.status)}
                      <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    {submission.estimatedValue && (
                      <p className="text-lg font-bold text-green-600">${submission.estimatedValue}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Device Model</p>
                    <p className="text-sm text-gray-600">{submission.deviceModel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Condition</p>
                    <p className="text-sm text-gray-600">{submission.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <p className="text-sm text-gray-600">{submission.status}</p>
                  </div>
                </div>

                {submission.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Notes:</span> {submission.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Buyback Information */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">LCD Buyback Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">What We Accept</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• iPhone LCD screens (all models)</li>
                <li>• iPad display assemblies</li>
                <li>• Samsung Galaxy screens</li>
                <li>• MacBook displays</li>
                <li>• Working or non-working screens</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">How It Works</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Submit your LCD screen through this portal</li>
                <li>• We evaluate and provide quote within 24 hours</li>
                <li>• Get paid instantly via store credit or check</li>
                <li>• Free shipping label provided</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit LCD Modal Placeholder */}
        {showNewSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Submit LCD for Buyback</h2>
                <button
                  onClick={() => setShowNewSubmission(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="text-center py-8">
                <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">LCD submission form would be implemented here</p>
                <p className="text-sm text-gray-400 mt-2">This is a placeholder for the LCD submission form</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
