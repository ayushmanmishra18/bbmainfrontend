// src/app/donor/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { List, Users, Gift } from 'lucide-react';

const DonorDashboardPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-content dark:text-gray-200">
        Welcome to Your Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/donor/cards">
          <Card className="hover:border-blue-500 transition-colors">
            <div className="flex flex-col items-center text-center">
              <List size={40} className="mb-4 text-blue-500" />
              <h2 className="text-xl font-semibold">My Donor Cards</h2>
              <p className="text-sm text-gray-500 mt-2">View the status of all your donations.</p>
            </div>
          </Card>
        </Link>
        <Link href="/donor/patients">
          <Card className="hover:border-green-500 transition-colors">
            <div className="flex flex-col items-center text-center">
              <Users size={40} className="mb-4 text-green-500" />
              <h2 className="text-xl font-semibold">View Patients in Need</h2>
              <p className="text-sm text-gray-500 mt-2">See a list of patients you can help.</p>
            </div>
          </Card>
        </Link>
         <Card className="opacity-50">
            <div className="flex flex-col items-center text-center">
              <Gift size={40} className="mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold">Donation History</h2>
              <p className="text-sm text-gray-500 mt-2">(Coming Soon)</p>
            </div>
          </Card>
      </div>
    </div>
  );
};

export default DonorDashboardPage;