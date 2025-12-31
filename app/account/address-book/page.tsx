'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Home, Building, Star } from 'lucide-react';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressBookPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Mock data - in a real app, this would come from your API
  const mockAddresses: Address[] = [
    {
      id: '1',
      type: 'home',
      name: 'Home Address',
      street: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      name: 'Office Address',
      street: '456 Business Ave, Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ];

  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/address-book');
    }
  }, [status, router]);

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Address Book</h1>
            <p className="text-gray-600">Manage your shipping and billing addresses.</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Address Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    address.type === 'home' ? 'bg-blue-100' :
                    address.type === 'work' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    {address.type === 'home' && <Home className="w-5 h-5 text-blue-600" />}
                    {address.type === 'work' && <Building className="w-5 h-5 text-green-600" />}
                    {address.type === 'other' && <MapPin className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {address.name}
                      {address.isDefault && (
                        <span className="inline-flex items-center gap-1 text-xs bg-[#D4AF37] text-white px-2 py-1 rounded-full">
                          <Star className="w-3 h-3" />
                          Default
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">{address.type} Address</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingAddress(address)}
                    className="p-2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                    title="Edit address"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Address Details */}
              <div className="text-gray-700">
                <p className="mb-1">{address.street}</p>
                <p className="mb-1">{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
              </div>

              {/* Default Button */}
              {!address.isDefault && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-[#D4AF37] hover:text-yellow-600 text-sm font-medium transition-colors"
                  >
                    Set as Default
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {addresses.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses yet</h3>
            <p className="text-gray-500 mb-6">Add your first address to get started with faster checkout.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#D4AF37] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Add Your First Address
            </button>
          </div>
        )}

        {/* Add/Edit Address Modal would go here */}
        {(showAddForm || editingAddress) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingAddress(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Address form would be implemented here</p>
                <p className="text-sm text-gray-400 mt-2">This is a placeholder for the address form</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
