"use client";
import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClass: string;
};

const StatCard = ({ title, value, icon, colorClass }: StatCardProps) => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform hover:scale-105">
      <div className={`text-4xl ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-content">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;