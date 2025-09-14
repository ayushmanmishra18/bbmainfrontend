// src/app/dashboard/inventory/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import DataTable, { ColumnDefinition } from '@/components/ui/DataTable';
import { getWholeBloodInventory, getPrbcInventory } from '@/lib/api';
import { WholeBloodUnit, PrbcUnit } from '@/types';
import { PlusCircle } from 'lucide-react';

const wholeBloodColumns: ColumnDefinition<WholeBloodUnit>[] = [
  { key: 'bloodUnitNo', header: 'Unit No.' },
  { key: 'donorCardId', header: 'Donor Card ID' },
  { key: 'bloodGroup', header: 'Blood Group' },
  { key: 'collectionDate', header: 'Collected On' },
  { key: 'expiryDate', header: 'Expires On' },
  { key: 'testStatus', header: 'Test Status' },
];

const prbcColumns: ColumnDefinition<PrbcUnit>[] = [
  ...wholeBloodColumns,
  { key: 'source', header: 'Source' },
];

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState<'wholeBlood' | 'prbc'>('wholeBlood');
  const [wholeBlood, setWholeBlood] = useState<WholeBloodUnit[]>([]);
  const [prbc, setPrbc] = useState<PrbcUnit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      setIsLoading(true);
      const [wbResponse, prbcResponse] = await Promise.all([
        getWholeBloodInventory(),
        getPrbcInventory()
      ]);
      setWholeBlood(wbResponse.data);
      setPrbc(prbcResponse.data);
      setIsLoading(false);
    };
    loadInventory();
  }, []);

  const activeTabStyle = 'border-blue-500 text-blue-600';
  const inactiveTabStyle = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-content dark:text-gray-200">Inventory Management</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
          <PlusCircle className="w-4 h-4" />
          <span>New Donation</span>
        </button>
      </div>

      <Card>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('wholeBlood')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'wholeBlood' ? activeTabStyle : inactiveTabStyle}`}
            >
              Whole Blood
            </button>
            <button
              onClick={() => setActiveTab('prbc')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'prbc' ? activeTabStyle : inactiveTabStyle}`}
            >
              PRBC
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <p>Loading inventory...</p>
          ) : activeTab === 'wholeBlood' ? (
            <DataTable columns={wholeBloodColumns} data={wholeBlood} />
          ) : (
            <DataTable columns={prbcColumns} data={prbc} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default InventoryPage;