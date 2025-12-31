'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CreditCard, Plus, Minus, History, DollarSign } from 'lucide-react';

interface CreditTransaction {
  id: string;
  type: 'Earned' | 'Used' | 'Expired';
  amount: number;
  description: string;
  date: string;
  orderId?: string;
}

export default function CreditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/credit');
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

  // Mock credit data
  const currentCredit = 145.67;
  const transactions: CreditTransaction[] = [
    {
      id: 'CRD-001',
      type: 'Earned',
      amount: 25.00,
      description: 'LCD Buyback - iPhone 13 Pro Max Screen',
      date: '2025-01-20',
      orderId: 'LCD-001'
    },
    {
      id: 'CRD-002',
      type: 'Used',
      amount: -89.99,
      description: 'Purchase - iPhone Charging Port Assembly',
      date: '2025-01-18',
      orderId: 'ORD-003'
    },
    {
      id: 'CRD-003',
      type: 'Earned',
      amount: 50.00,
      description: 'Referral Bonus - Friend signed up',
      date: '2025-01-15'
    },
    {
      id: 'CRD-004',
      type: 'Used',
      amount: -35.00,
      description: 'Purchase - Screen Protector Kit',
      date: '2025-01-10',
      orderId: 'ORD-002'
    },
    {
      id: 'CRD-005',
      type: 'Earned',
      amount: 15.00,
      description: 'Return Credit - iPhone Battery',
      date: '2025-01-08',
      orderId: 'RTN-001'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Earned': return <Plus className="w-4 h-4 text-green-500" />;
      case 'Used': return <Minus className="w-4 h-4 text-red-500" />;
      case 'Expired': return <History className="w-4 h-4 text-gray-500" />;
      default: return <DollarSign className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAmountColor = (type: string, amount: number) => {
    if (type === 'Earned') return 'text-green-600';
    if (type === 'Used') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Credit</h1>
          <p className="text-gray-600">Track your store credit balance and transaction history.</p>
        </div>

        {/* Current Credit Balance */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Available Credit</h2>
              <p className="text-lg opacity-90">Use this credit toward your next purchase</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold mb-2">${currentCredit.toFixed(2)}</div>
              <p className="text-sm opacity-90">Current Balance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-[#D4AF37] hover:bg-yellow-600 text-white rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Credit</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-lg transition-colors">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">Transfer Credit</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <History className="w-4 h-4" />
                  <span className="text-sm font-medium">View History</span>
                </button>
              </div>
            </div>

            {/* Credit Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How Credit Works</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Earn credit through LCD buybacks, referrals, and returns</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use credit instantly at checkout for any purchase</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Credit never expires and can be transferred</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Transaction History</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <History className="w-4 h-4" />
                  <span>Last 30 days</span>
                </div>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'Earned' ? 'bg-green-100' :
                        transaction.type === 'Used' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.date}
                          {transaction.orderId && ` • ${transaction.orderId}`}
                        </p>
                      </div>
                    </div>
                    <div className={`text-lg font-semibold ${getAmountColor(transaction.type, transaction.amount)}`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {transactions.length === 0 && (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No credit transactions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ways to Earn Credit */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Ways to Earn Credit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">LCD Buyback</h4>
              <p className="text-sm text-gray-600">Trade in old screens for instant credit</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Referrals</h4>
              <p className="text-sm text-gray-600">Earn credit when friends sign up</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Returns</h4>
              <p className="text-sm text-gray-600">Get credit back on eligible returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
