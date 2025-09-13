"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Droplet, Users, HeartPulse, ArrowRightLeft, FileText } from 'lucide-react';

// Define our navigation links in an array for easy management
const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Droplet },
  { name: 'Donors', href: '/dashboard/donors', icon: Users },
  { name: 'Patients', href: '/dashboard/patients', icon: HeartPulse },
  { name: 'Transfers', href: '/dashboard/transfers', icon: ArrowRightLeft },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
];

const Sidebar = () => {
  const pathname = usePathname(); // This hook gives us the current URL path

  return (
    <aside className="bg-background border-r border-subtle w-64 p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">Bloodbankgroup</h2>
      </div>
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700' // Active link style
                  : 'text-content hover:bg-subtle' // Inactive link style
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;