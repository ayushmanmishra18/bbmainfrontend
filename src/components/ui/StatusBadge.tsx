"use client";
import React from 'react';

// Define the possible status values for type safety
type Status = 'Pending' | 'Approved' | 'Shipped' | 'Received' | 'Denied';

type StatusBadgeProps = {
  status: Status;
};

// A map to link each status to its specific color styles
const statusStyles: Record<Status, string> = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  Approved: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
  Shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Received: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Denied: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || ''}`}>
      {status}
    </span>
  );
};

export default StatusBadge;