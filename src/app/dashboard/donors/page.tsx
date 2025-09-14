"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import DataTable, { ColumnDefinition } from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import AddDonorForm from '@/components/donors/AddDonorForm';
import { UserPlus } from 'lucide-react';
import { getDonors } from '@/lib/api'; // Import the new API function
import { DonorDetails } from '@/types';

// The type for a donor in our list
type Donor = Omit<DonorDetails, 'age' | 'sex' | 'nationality' | 'email' | 'weight' | 'address' | 'stateUt' | 'pincode'> & { id: string, city: string };

// Column definitions for the DataTable
const columns: ColumnDefinition<Donor>[] = [
  { key: 'id', header: 'Donor ID' },
  { key: 'name', header: 'Name' },
  { key: 'bloodGroup', header: 'Blood Group' },
  { key: 'mobile', header: 'Mobile No' },
  { key: 'city', header: 'City' },
];

const DonorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDonors = async () => {
      try {
        setIsLoading(true);
        const response = await getDonors();
        if (response.success) {
          setDonors(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch donors');
      } finally {
        setIsLoading(false);
      }
    };
    loadDonors();
  }, []); // Empty array ensures this runs only once

  const handleSuccess = () => {
    setIsModalOpen(false);
    // Here, we would typically re-fetch the donor list to show the new entry
    // For now, we just log a message.
    console.log("Donor saved, modal closed. Re-fetching list...");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-content dark:text-gray-200">
          Donor Management
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Donor</span>
        </button>
      </div>

      <Card>
        {isLoading ? (
          <div className="text-center p-10">Loading donors...</div>
        ) : error ? (
          <div className="text-center p-10 text-danger">{error}</div>
        ) : (
          <DataTable columns={columns} data={donors} />
        )}
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Register a New Donor"
      >
        <AddDonorForm 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleSuccess} 
        />
      </Modal>
    </div>
  );
};

export default DonorsPage;