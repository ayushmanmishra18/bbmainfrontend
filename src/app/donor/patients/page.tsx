"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { getPublicPatientList } from '@/lib/api';
import { PatientDetails } from '@/types';
import { BedDouble, Droplet, Hospital, MapPin } from 'lucide-react';

const PatientsInNeedPage = () => {
  const [patients, setPatients] = useState<PatientDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      setIsLoading(true);
      try {
        const response = await getPublicPatientList();
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to load patient list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPatients();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-content dark:text-gray-200">Patients in Need</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Here is a list of patients who require voluntary blood donations. You can help by donating one of your available donor cards.
      </p>
      
      {isLoading ? (
        <p className="dark:text-gray-400">Loading patient list...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map(patient => (
            <Card key={patient.id} className="flex flex-col">
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-content dark:text-gray-200">{patient.name}</h2>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 dark:bg-red-900/50 rounded-full">
                    <Droplet className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-red-700 dark:text-red-300">{patient.bloodGroup}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Requires {patient.unitsRequired} {parseInt(patient.unitsRequired) > 1 ? 'units' : 'unit'}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Hospital size={16} className="mr-2" />
                    <span>{patient.hospitalName}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>{patient.city}, {patient.stateUt}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-subtle dark:border-gray-700">
                <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                  Donate a Card to {patient.name.split(' ')[0]}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsInNeedPage;
