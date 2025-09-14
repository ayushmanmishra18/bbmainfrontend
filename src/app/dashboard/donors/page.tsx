// src/app/dashboard/donors/page.tsx
"use client";

import React from 'react';
import AddDonorForm from '@/components/donors/AddDonorForm';

const DonorsPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-content">
        Donor Management
      </h1>

      {/* This is our new Card style with shadow and border */}
      <div className="bg-background p-8 rounded-lg shadow-md border border-subtle">
        <h2 className="text-2xl font-semibold text-content mb-6">
          Register a New Donor
        </h2>
        <AddDonorForm />
      </div>

      {/* We will add the Data Table for the donor list here in the next step */}
    </div>
  );
};

export default DonorsPage;