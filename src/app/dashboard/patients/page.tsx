"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import DataTable, { ColumnDefinition } from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import AddPatientForm from '@/components/patients/AddPatientForm';
import { UserPlus } from 'lucide-react';
import { getPatients } from '@/lib/api';
import { PatientDetails } from '@/types';

// Define which columns to show in the patient list table
const columns: ColumnDefinition<PatientDetails>[] = [
  { key: 'id', header: 'Patient ID' },
  { key: 'name', header: 'Name' },
  { key: 'bloodGroup', header: 'Blood Group' },
  { key: 'unitsRequired', header: 'Units Required' },
  { key: 'hospitalName', header: 'Hospital' },
  { key: 'mobile', header: 'Contact No' },
];

const PatientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState<PatientDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch the list of patients
  const loadPatients = async () => {
    try {
      setIsLoading(true);
      const response = await getPatients();
      if (response.success) {
        setPatients(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch patients');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the component first loads
  useEffect(() => {
    loadPatients();
  }, []);

  // This function is called after a new patient is successfully added
  const handleSuccess = () => {
    setIsModalOpen(false); // Close the modal
    loadPatients(); // Refresh the patient list to show the new entry
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-content dark:text-gray-200">
          Patient Management
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register Patient</span>
        </button>
      </div>

      <Card>
        {isLoading ? (
          <div className="text-center p-10">Loading patients...</div>
        ) : error ? (
          <div className="text-center p-10 text-danger">{error}</div>
        ) : (
          <DataTable columns={columns} data={patients} />
        )}
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Register a New Patient"
      >
        <AddPatientForm 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleSuccess} 
        />
      </Modal>
    </div>
  );
};

export default PatientsPage;