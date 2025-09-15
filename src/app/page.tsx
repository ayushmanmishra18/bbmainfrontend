import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-subtle dark:bg-gray-950 font-sans">
      <PublicHeader />

      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-content dark:text-gray-100">
            Blood Bank Management System
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            A secure and unified platform for administrators and donors.
          </p>
          
          {/* Main Action Buttons */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/login"
              className="px-6 py-4 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-lg"
            >
              Admin Login
            </Link>
            <Link
              href="/login/donor"
              className="px-6 py-4 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-lg"
            >
              Donor Login
            </Link>
            <Link
              href="/register"
              className="sm:col-span-2 px-6 py-4 text-lg font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Register a New Blood Bank
            </Link>
          </div>
        </Card>
      </main>

      <PublicFooter />
    </div>
  );
}

