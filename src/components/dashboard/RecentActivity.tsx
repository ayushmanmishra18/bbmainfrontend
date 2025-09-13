"use client";
import React from 'react';
import { Droplet, UserPlus, ArrowRightLeft, HeartPulse } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  Donation: <Droplet className="w-5 h-5 text-green-500" />,
  Transfusion: <HeartPulse className="w-5 h-5 text-red-500" />,
  Transfer: <ArrowRightLeft className="w-5 h-5 text-blue-500" />,
  Patient: <UserPlus className="w-5 h-5 text-amber-500" />,
};

type Activity = {
  id: number;
  type: string;
  description: string;
  time: string;
};

const RecentActivity = ({ activities }: { activities: Activity[] }) => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-md h-96">
       <h3 className="font-semibold text-content mb-4">Recent Activity</h3>
       <ul className="space-y-4 overflow-y-auto h-[calc(100%-2rem)]">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-subtle rounded-full">
              {iconMap[activity.type] || <Droplet className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-content">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
       </ul>
    </div>
  );
};

export default RecentActivity;