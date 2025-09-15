"use client";

import React from 'react';
import Link from 'next/link';
import { Droplet } from 'lucide-react';

const PublicHeader = () => {
  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Droplet className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-content dark:text-gray-200">
            Bloodbankgroup
          </span>
        </Link>

        {/* Navigation Buttons */}
        <nav className="flex items-center space-x-2">
          <Link href="/login" className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            Admin Login
          </Link>
          <Link href="/login/donor" className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            Donor Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;

