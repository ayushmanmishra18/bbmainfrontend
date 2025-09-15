"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { getApprovedTransferDetailsForIssue, submitFormB } from '@/lib/api';
import { FormBIssueItem } from '@/types';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

const IssueTransferPage = () => {
  const [itemsToIssue, setItemsToIssue] = useState<FormBIssueItem[]>([]);
  const [transportDetails, setTransportDetails] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const router = useRouter();
  const transferId = params.id as string;

  useEffect(() => {
    if (transferId) {
      const loadDetails = async () => {
        setIsLoading(true);
        try {
          const response = await getApprovedTransferDetailsForIssue(transferId);
          setItemsToIssue(response.data.itemsToIssue);
        } catch (error) {
          console.error("Failed to load items for Form B", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadDetails();
    }
  }, [transferId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitFormB({
        transferId,
        issuedItems: itemsToIssue,
        transportDetails,
      });
      router.push('/dashboard/transfers');
    } catch (error) {
      console.error("Failed to submit Form B", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <div>Loading details for issue...</div>;
  }

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/transfers/${transferId}`} className="flex items-center space-x-2 text-sm text-gray-500 hover:text-content">
        <ArrowLeft size={16} />
        <span>Back to Transfer Details</span>
      </Link>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-content dark:text-gray-200 mb-6">
            Issue Blood / Components (Form B)
          </h1>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 dark:text-gray-300">Certified Units for Transfer</h3>
              <p className="text-sm text-gray-500 mb-4">The following units have been tested and found non-reactive for TTI and are being transported at the requisite temperature.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-subtle dark:divide-gray-700">
                  <thead className="bg-subtle dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase">Unit No.</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase">Donor Card ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase">Group</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase">Collected</th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background dark:bg-gray-800">
                    {itemsToIssue.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.bloodUnitNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.donorCardId}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.bloodGroup}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.collectionDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{item.expiryDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <label htmlFor="transportDetails" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Transfer or Transport Details
              </label>
              <textarea 
                id="transportDetails" 
                value={transportDetails} 
                onChange={(e) => setTransportDetails(e.target.value)}
                rows={4}
                className="w-full p-2 bg-subtle border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                placeholder="e.g., Transported by John Doe in a validated container at 4°C. Vehicle No. DL-1234."
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-6 mt-6 border-t border-subtle dark:border-gray-700">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex justify-center items-center px-6 py-2 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  <span>Submit Issue Form (Form B)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default IssueTransferPage;