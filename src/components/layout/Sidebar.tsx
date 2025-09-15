"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Droplet, 
  Users, 
  HeartPulse, 
  ArrowRightLeft, 
  FileText, 
  Network,
  Settings
} from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Droplet },
  { name: 'Donors', href: '/dashboard/donors', icon: Users },
  { name: 'Patients', href: '/dashboard/patients', icon: HeartPulse },
  { name: 'Transfers', href: '/dashboard/transfers', icon: ArrowRightLeft },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Network', href: '/dashboard/network', icon: Network },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-background border-r border-subtle w-64 p-4 flex flex-col dark:bg-gray-800 dark:border-gray-700">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 mb-10 px-2">
       
        <h2 className="text-xl font-bold text-content dark:text-gray-200">Bloodbankgroup</h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex-grow">
        <ul className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'text-content hover:bg-subtle dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / User Section */}
      <div className="mt-auto">
        <div className="border-t border-subtle dark:border-gray-700 pt-4 space-y-2">
           <Link
              href="/dashboard/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-content hover:bg-subtle dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
           <button
              className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-content hover:bg-subtle dark:text-gray-300 dark:hover:bg-gray-700"
            >
             </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

