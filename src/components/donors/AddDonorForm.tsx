"use client";

import React, { useState } from 'react';
import { DonorDetails } from '@/types'; // We will create this type for our donor data

// --- Component Props Definition ---
type AddDonorFormProps = {
  onClose: () => void; // Function to close the modal
  onSuccess: () => void; // Function to run after successful submission
};

const AddDonorForm = ({ onClose, onSuccess }: AddDonorFormProps) => {
  // --- State Management ---
  const [donorData, setDonorData] = useState<DonorDetails>({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // --- Event Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonorData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // **FUTURE:** We will call the real API function here
      // await addNewDonor(donorData); 
      console.log("Saving New Donor Data:", donorData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // On success, run the onSuccess function (e.g., refresh data and close modal)
      onSuccess();

    } catch (err) {
      console.error("Failed to save donor:", err);
      setError("Failed to save donor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Reusable Styles ---
  const inputClasses = "mt-1 w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200";
  const labelClasses = "block text-sm font-medium text-content dark:text-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display API error message if it exists */}
      {error && <div className="p-3 text-center text-red-700 bg-red-100 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label htmlFor="name" className={labelClasses}>Full Name</label>
          <input type="text" name="name" id="name" value={donorData.name} onChange={handleChange} className={inputClasses} required />
        </div>
        {/* Age */}
        <div>
          <label htmlFor="age" className={labelClasses}>Age</label>
          <input type="number" name="age" id="age" value={donorData.age} onChange={handleChange} className={inputClasses} required />
        </div>
        {/* Sex */}
        <div>
          <label htmlFor="sex" className={labelClasses}>Sex</label>
          <select name="sex" id="sex" value={donorData.sex} onChange={handleChange} className={inputClasses}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        {/* Blood Group */}
        <div>
          <label htmlFor="bloodGroup" className={labelClasses}>Blood Group</label>
          <select name="bloodGroup" id="bloodGroup" value={donorData.bloodGroup} onChange={handleChange} className={inputClasses}>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
        </div>
        {/* Weight */}
        <div>
          <label htmlFor="weight" className={labelClasses}>Weight (kg)</label>
          <input type="number" name="weight" id="weight" value={donorData.weight} onChange={handleChange} className={inputClasses} required />
        </div>
        {/* Mobile */}
        <div>
          <label htmlFor="mobile" className={labelClasses}>Contact Mobile</label>
          <input type="tel" name="mobile" id="mobile" value={donorData.mobile} onChange={handleChange} className={inputClasses} required />
        </div>
        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="email" className={labelClasses}>Email Address</label>
          <input type="email" name="email" id="email" value={donorData.email} onChange={handleChange} className={inputClasses} />
        </div>
        {/* Address */}
        <div className="md:col-span-3">
          <label htmlFor="address" className={labelClasses}>Address</label>
          <textarea name="address" id="address" value={donorData.address} onChange={handleChange} rows={3} className={inputClasses}></textarea>
        </div>
         {/* State/UT */}
        <div>
          <label htmlFor="stateUt" className={labelClasses}>State/UT</label>
          <input type="text" name="stateUt" id="stateUt" value={donorData.stateUt} onChange={handleChange} className={inputClasses} />
        </div>
        {/* Pincode */}
        <div>
          <label htmlFor="pincode" className={labelClasses}>Pincode</label>
          <input type="text" name="pincode" id="pincode" value={donorData.pincode} onChange={handleChange} className={inputClasses} />
        </div>
         {/* Nationality */}
         <div>
          <label htmlFor="nationality" className={labelClasses}>Nationality</label>
          <input type="text" name="nationality" id="nationality" value={donorData.nationality} onChange={handleChange} className={inputClasses} />
        </div>
      </div>
      <div className="flex justify-end pt-4 space-x-3 border-t border-subtle dark:border-gray-700">
        <button 
          type="button" 
          onClick={onClose}
          className="px-6 py-2 bg-subtle text-content font-bold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Donor'}
        </button>
      </div>
    </form>
  );
};

export default AddDonorForm;