"use client";

import React, { useState, useEffect } from 'react';
import StatCard from '@/components/dashboard/StatCard';
import InventoryChart from '@/components/dashboard/InventoryChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Droplet, Users, HeartPulse, Hospital, UserPlus, PlusCircle } from 'lucide-react';
import { getDashboardData } from '@/lib/api';
import { DashboardData } from '@/types';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await getDashboardData();
        if (response.success) {
          setDashboardData(response.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while fetching data.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Empty array ensures this runs only once when the page loads

  if (isLoading) {
    // A professional loading skeleton UI
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="lg:col-span-1 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 rounded-lg bg-red-100 text-red-700"><strong>Error:</strong> {error}</div>;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-content dark:text-gray-200">
          Dashboard
        </h1>
        <div className="flex space-x-2">
           <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm">
             <UserPlus className="w-4 h-4" />
             <span>Add Donor</span>
           </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-sm">
             <PlusCircle className="w-4 h-4" />
             <span>New Donation</span>
           </button>
        </div>
      </div>
      
      {dashboardData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Blood Units" value={dashboardData.stats.totalUnits} icon={<Droplet />} colorClass="text-red-500" />
            <StatCard title="Registered Donors" value={dashboardData.stats.totalDonors} icon={<Users />} colorClass="text-blue-500" />
            <StatCard title="Pending Requests" value={dashboardData.stats.pendingRequests} icon={<HeartPulse />} colorClass="text-amber-500" />
            <StatCard title="Partner Banks" value={dashboardData.stats.partnerBanks} icon={<Hospital />} colorClass="text-green-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <InventoryChart data={dashboardData.inventoryByGroup} />
            </div>
            <div className="lg:col-span-1">
              <RecentActivity activities={dashboardData.recentActivity} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;