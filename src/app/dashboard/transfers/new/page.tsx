
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { getPartnerBanks, submitFormARequest } from '@/lib/api';
import { PartnerBank } from '@/types';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Define the shape of a single requested item
interface RequestItem {
  id: number;
  bloodGroup: string;
  component: string;
  units: number;
}

const NewTransferPage = () => {
  const [partnerBanks, setPartnerBanks] = useState<PartnerBank[]>([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [requestItems, setRequestItems] = useState<RequestItem[]>([
    { id: Date.now(), bloodGroup: 'A+', component: 'PRBC', units: 1 },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadPartners = async () => {
      setIsLoading(true);
      const response = await getPartnerBanks();
      setPartnerBanks(response.data);
      if (response.data.length > 0) {
        setSelectedBank(response.data[0].id);
      }
      setIsLoading(false);
    };
    loadPartners();
  }, []);

  const handleItemChange = (id: number, field: keyof Omit<RequestItem, 'id'>, value: string | number) => {
    setRequestItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    setRequestItems([...requestItems, { id: Date.now(), bloodGroup: 'A+', component: 'PRBC', units: 1 }]);
  };

  const removeItem = (id: number) => {
    setRequestItems(requestItems.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitFormARequest({
        targetBankId: selectedBank,
        items: requestItems,
      });
      router.push('/dashboard/transfers');
    } catch (error) {
      console.error("Failed to submit Form A", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link href="/dashboard/transfers" className="flex items-center space-x-2 text-sm text-gray-500 hover:text-content dark:hover:text-gray-300">
        <ArrowLeft size={16} />
        <span>Back to Transfer History</span>
      </Link>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-content dark:text-gray-200 mb-6">
            New Transfer Request (Form A)
          </h1>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="partnerBank" className="block text-sm font-medium mb-1 dark:text-gray-300">Request From (Supplier Bank)</label>
              {isLoading ? <p className="dark:text-gray-400">Loading partner banks...</p> : (
                <select 
                  id="partnerBank" 
                  value={selectedBank} 
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                  {partnerBanks.map(bank => (
                    <option key={bank.id} value={bank.id}>{bank.name} - {bank.city}</option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 dark:text-gray-300">Required Blood / Components</h3>
              <div className="space-y-4">
                {/* FIX: Removed unused 'index' variable */}
                {requestItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                      <select value={item.bloodGroup} onChange={(e) => handleItemChange(item.id, 'bloodGroup', e.target.value)} className="w-full p-2 bg-subtle border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                        <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                        <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                      </select>
                    </div>
                    <div className="col-span-4">
                       <select value={item.component} onChange={(e) => handleItemChange(item.id, 'component', e.target.value)} className="w-full p-2 bg-subtle border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                        <option>PRBC</option><option>Whole Blood</option><option>Plasma</option><option>Platelets</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <input type="number" min="1" value={item.units} onChange={(e) => handleItemChange(item.id, 'units', parseInt(e.target.value) || 1)} className="w-full p-2 bg-subtle border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                    </div>
                    <div className="col-span-1">
                      {requestItems.length > 1 && (
                        <button type="button" onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addItem} className="flex items-center space-x-2 text-sm text-blue-600 hover:underline mt-4">
                <Plus size={16} />
                <span>Add Item</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end pt-6 mt-6 border-t border-subtle dark:border-gray-700">
            {/* FIX: Replaced <Button> with a standard <button> */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending Request...' : 'Send Request (Form A)'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewTransferPage;
