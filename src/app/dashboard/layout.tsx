import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="theme-dashboard"
    >
      <div className="flex h-screen bg-background dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto bg-subtle dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}