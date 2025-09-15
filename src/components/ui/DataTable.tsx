"use client";
import React from 'react';

export type ColumnDefinition<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
};

const DataTable = <T extends { id: string | number }>({ columns, data, onRowClick }: DataTableProps<T>) => {
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
              <th
                key={String(col.key)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-subtle dark:divide-gray-700">
          {data.map((row) => (
            <tr 
              key={row.id} 
              onClick={() => onRowClick && onRowClick(row)}
              className={`${onRowClick ? 'cursor-pointer hover:bg-subtle dark:hover:bg-gray-700' : ''} transition-colors`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-content dark:text-gray-200">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;