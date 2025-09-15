"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { getTransferRequestDetails, respondToTransferRequest } from '@/lib/api';
import { TransferRequestDetails } from '@/types';
import { ArrowLeft, Check, X } from 'lucide-react';
import Link from 'next/link';

const TransferDetailsPage = () => {
  const [request, setRequest] = useState<TransferRequestDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResponding, setIsResponding] = useState(false);
  const params = useParams();
  const router = useRouter();
  const transferId = params.id as string;

  useEffect(() => {
    if (transferId) {
      const loadDetails = async () => {
        setIsLoading(true);
        try {
          const response = await getTransferRequestDetails(transferId);
          setRequest(response.data);
        } catch (error) {
          console.error("Failed to load transfer details", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadDetails();
    }
  }, [transferId]);

  const handleResponse = async (response: 'approve' | 'deny') => {
    setIsResponding(true);
    try {
      await respondToTransferRequest(transferId, response);
      router.push('/dashboard/transfers');
    } catch (error) {
      console.error("Failed to respond to transfer request", error);
    } finally {
      setIsResponding(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading transfer details...</div>;
  }

  if (!request) {
    return <div className="p-6">Transfer request not found.</div>;
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/transfers" className="flex items-center space-x-2 text-sm text-gray-500 hover:text-content dark:hover:text-gray-300">
        <ArrowLeft size={16} />
        <span>Back to Transfer History</span>
      </Link>
      
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-content dark:text-gray-200">
            Transfer Request Details
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Request ID: {request.id}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-subtle dark:border-gray-700 pt-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Request From:</p>
              <p className="font-semibold text-content dark:text-gray-200">{request.fromBank.name}</p>
              <p className="text-sm text-content dark:text-gray-300">{request.fromBank.address}</p>
              <p className="text-sm text-content dark:text-gray-300">License: {request.fromBank.licenseNo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Request Date:</p>
              <p className="text-content dark:text-gray-300">{request.date}</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Status:</p>
              <p className="font-bold text-amber-500">{request.status}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-subtle dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold dark:text-gray-200">Requested Items</h3>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-subtle dark:divide-gray-700">
                <thead className="bg-subtle dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Blood Group</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Component</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Units</th>
                  </tr>
                </thead>
                <tbody className="bg-background dark:bg-gray-800 divide-y divide-subtle dark:divide-gray-700">
                  {request.items.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{item.bloodGroup}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{item.component}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{item.units}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {request.status === 'Pending' && (
            <div className="flex justify-end pt-6 mt-6 border-t border-subtle dark:border-gray-700 space-x-3">
              <button 
                type="button" 
                onClick={() => handleResponse('deny')} 
                disabled={isResponding}
                className="flex justify-center items-center px-6 py-2 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400"
              >
                <X size={16} className="mr-2" />
                {isResponding ? 'Loading...' : 'Deny Request'}
              </button>
              <button 
                type="button" 
                onClick={() => handleResponse('approve')} 
                disabled={isResponding}
                className="flex justify-center items-center px-6 py-2 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400"
              >
                <Check size={16} className="mr-2" />
                {isResponding ? 'Loading...' : 'Approve Request'}
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TransferDetailsPage;

