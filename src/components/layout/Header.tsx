"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings } from 'lucide-react'; // Icons for the dropdown

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
    <header className="bg-background border-b border-subtle p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        {/* We can add a logo or search bar here later */}
        <div></div>

        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-subtle"
          >
            <User className="w-5 h-5 text-content" />
            <span className="font-semibold text-content hidden sm:block">{user.name}</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg border border-subtle">
              <div className="p-2">
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-content rounded-md hover:bg-subtle">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-danger rounded-md hover:bg-subtle"
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