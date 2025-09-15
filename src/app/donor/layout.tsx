// src/app/donor/layout.tsx
import React from 'react';
import Link from 'next/link';
import {  LogOut } from 'lucide-react';

// A simple header for the Donor's section
const DonorHeader = () => (
  <header className="bg-background dark:bg-gray-800 border-b border-subtle dark:border-gray-700 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/donor" className="text-xl font-bold text-primary">
        Donor Portal
      </Link>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Welcome, Donor!</span>
        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-content">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </header>
);

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DonorHeader />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}