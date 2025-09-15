"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { searchBloodBanks, sendPartnershipRequest } from '@/lib/api';
import { BloodBankSearchResult } from '@/types';
import { Search, PlusCircle, CheckCircle } from 'lucide-react';

const NetworkPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<BloodBankSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await searchBloodBanks('');
        if (response.success) {
          setResults(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch initial network data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await searchBloodBanks(searchQuery);
        if (response.success) {
            setResults(response.data);
        }
    } catch (error) {
        console.error("Failed to search blood banks:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSendRequest = async (bankId: string) => {
    setIsSendingRequest(bankId);
    try {
      await sendPartnershipRequest(bankId);
      // Update the UI to reflect that the request was sent
      setResults(currentResults => 
        currentResults.map(bank => 
          bank.id === bankId ? { ...bank, requestSent: true } : bank
        )
      );
    } catch (error) {
      console.error("Failed to send partnership request", error);
    } finally {
      setIsSendingRequest(null);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-content dark:text-gray-200">Inter-Bank Network</h1>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">Find Other Blood Banks</h2>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or city..."
              className="w-full pl-10 pr-4 py-2 bg-subtle dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center py-8 text-gray-500">Loading blood banks...</p>
          ) : results.length > 0 ? (
            results.map(bank => (
              <div key={bank.id} className="flex justify-between items-center p-4 bg-subtle dark:bg-gray-900 rounded-md">
                <div>
                  <p className="font-semibold text-content dark:text-gray-200">{bank.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{bank.city}, {bank.state}</p>
                </div>
                {bank.isPartner ? (
                  <div className="flex items-center space-x-2 text-green-500">
                    <CheckCircle size={20} />
                    <span className="text-sm font-semibold">Partner</span>
                  </div>
                ) : bank.requestSent ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span className="text-sm font-semibold">Request Sent</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSendRequest(bank.id)}
                    disabled={isSendingRequest === bank.id}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isSendingRequest === bank.id ? 'Sending...' : <><PlusCircle size={16} /><span>Send Request</span></>}
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No blood banks found.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NetworkPage;

