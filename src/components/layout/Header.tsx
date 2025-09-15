"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  LogOut, Settings } from 'lucide-react'; // Added theme icons

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Dummy user data - in a real app, this would come from a context or state manager
  const user = { name: 'Dr. Ayush Sharma' };

  const handleLogout = () => {
    console.log('Logging out...');
    // In a real app, you would clear the auth token here
    router.push('/login'); // Redirect to the login page
  };

  return (
    <header className="bg-background dark:bg-gray-800 border-b border-subtle dark:border-gray-700 p-4 sticky top-0 z-10">
      <div className="flex justify-end items-center">
        {/* We can add a global search or other actions on the left later */}
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-subtle dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <span className="font-semibold text-content dark:text-gray-200 hidden sm:block">{user.name}</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-background dark:bg-gray-800 rounded-md shadow-lg border border-subtle dark:border-gray-700"
              onClick={() => setIsDropdownOpen(false)} // Close dropdown on click inside
            >
              <div className="p-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-content dark:text-gray-200">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
                <div className="my-1 border-t border-subtle dark:border-gray-700"></div>
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-content dark:text-gray-300 rounded-md hover:bg-subtle dark:hover:bg-gray-700">
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 px-3 py-2 text-sm text-red-500 rounded-md hover:bg-subtle dark:hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
