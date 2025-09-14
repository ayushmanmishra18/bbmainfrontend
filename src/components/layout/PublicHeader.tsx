// src/components/layout/PublicHeader.tsx
"use client";
import Link from "next/link";
import React from "react";
import { Droplet } from "lucide-react";

const PublicHeader = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-10 p-4 sm:p-6 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-b border-white/10 dark:border-black/20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Blue Accent */}
        <Link href="/" className="flex items-center space-x-2">
          <Droplet className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold text-content dark:text-gray-100">
            Bloodbankgroup
          </span>
        </Link>

        {/* Navigation Buttons with blue transparent style */}
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-content dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Admin Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-semibold text-blue-500 bg-transparent border-2 border-blue-500 rounded-md hover:bg-blue-500/10 transition-colors"
          >
            Register Blood Bank
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
