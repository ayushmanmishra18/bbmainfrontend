// src/components/donors/AddDonorForm.tsx

"use client";

import React, { useState } from 'react';

const AddDonorForm = () => {
  const [donorData, setDonorData] = useState({
    name: '',
    age: '',
    sex: 'Male',
    nationality: 'Indian',
    mobile: '',
    email: '',
    weight: '',
    bloodGroup: 'A+',
    address: '',
    stateUt: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonorData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Donor Data:", donorData);
    // Here we will call the API function to save the donor
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
          <input type="text" name="name" id="name" value={donorData.name} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium">Age</label>
          <input type="number" name="age" id="age" value={donorData.age} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        {/* Sex */}
        <div>
          <label htmlFor="sex" className="block text-sm font-medium">Sex</label>
          <select name="sex" id="sex" value={donorData.sex} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        {/* Blood Group */}
        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium">Blood Group</label>
          <select name="bloodGroup" id="bloodGroup" value={donorData.bloodGroup} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
        </div>
        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium">Weight (kg)</label>
          <input type="number" name="weight" id="weight" value={donorData.weight} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        {/* Mobile */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium">Contact Mobile</label>
          <input type="tel" name="mobile" id="mobile" value={donorData.mobile} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
          <input type="email" name="email" id="email" value={donorData.email} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        {/* Address */}
        <div className="md:col-span-3">
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <textarea name="address" id="address" value={donorData.address} onChange={handleChange} rows={3} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
         {/* State/UT */}
        <div>
          <label htmlFor="stateUt" className="block text-sm font-medium">State/UT</label>
          <input type="text" name="stateUt" id="stateUt" value={donorData.stateUt} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        {/* Pincode */}
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium">Pincode</label>
          <input type="text" name="pincode" id="pincode" value={donorData.pincode} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
         {/* Nationality */}
         <div>
          <label htmlFor="nationality" className="block text-sm font-medium">Nationality</label>
          <input type="text" name="nationality" id="nationality" value={donorData.nationality} onChange={handleChange} className="mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors">
          Save Donor
        </button>
      </div>
    </form>
  );
};

export default AddDonorForm;