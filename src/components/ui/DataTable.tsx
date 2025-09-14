"use client";
import React from 'react';

// FIX: Added 'export' so other files can import this type
export type ColumnDefinition<T> = {
  key: keyof T;
  header: string;
};

type DataTableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
};

// FIX: Made the generic constraint more specific than 'any'
const DataTable = <T extends { id: string | number }>({ columns, data }: DataTableProps<T>) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No data available.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-subtle dark:divide-gray-700">
        <thead className="bg-subtle dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} /* ... */ >{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-subtle dark:divide-gray-700">
          {data.map((row) => (
            <tr key={row.id} /* ... */>
              {columns.map((col) => (
                <td key={String(col.key)} /* ... */>{String(row[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;