"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import DataTable, { ColumnDefinition } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { getTransferHistory } from '@/lib/api';
import { TransferLog } from '@/types';
import { ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';

const TransfersPage = () => {
  const [history, setHistory] = useState<TransferLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      try {
        const response = await getTransferHistory();
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to load transfer history", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHistory();
  }, []);
  
  // Define columns for the data table
  const columns: ColumnDefinition<TransferLog>[] = [
    { key: 'id', header: 'Transfer ID' },
    { key: 'type', header: 'Type' },
    { key: 'partnerBank', header: 'Partner Bank' },
    { key: 'units', header: 'Units' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    { key: 'date', header: 'Date' },
  ];

  // Function to handle clicking on a table row
  const handleRowClick = (row: TransferLog) => {
    router.push(`/dashboard/transfers/${row.id}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-content dark:text-gray-200">
          Inter-Bank Transfers
        </h1>
        <Link href="/dashboard/transfers/new">
          <span className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            <ArrowRightLeft className="w-4 h-4" />
            <span>Initiate New Transfer</span>
          </span>
        </Link>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-content dark:text-gray-200">Transfer History</h2>
        {isLoading ? (
          <p className="text-center py-10">Loading transfer history...</p>
        ) : (
          <DataTable columns={columns} data={history} onRowClick={handleRowClick} />
        )}
      </Card>
    </div>
  );
};

export default TransfersPage;