"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type ChartData = {
  name: string;
  units: number;
};

// Consistent colors for the bar chart
const COLORS = ['#EF4444', '#F87171', '#3B82F6', '#60A5FA', '#8B5CF6', '#A78BFA', '#10B981', '#34D399'];

const InventoryChart = ({ data }: { data: ChartData[] }) => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-md h-96">
      <h3 className="font-semibold text-content mb-4">Inventory by Blood Group</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
          <Tooltip 
            cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }} 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
          />
          <Bar dataKey="units" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryChart;