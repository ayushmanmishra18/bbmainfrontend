"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

const RegisterPage = () => {
  // --- STATE SETUP ---
  const [bloodBankDetails, setBloodBankDetails] = useState({
    name: '',
    address: '',
    stateUt: '',
    pincode: '',
    mobile: '',
    email: '',
    contactPerson: '',
    registrationNo: '',
    validUpto: '',
    gstNo: '',
    bankName: '',
    ifsc: '',
    upiId: ''
  });

  const [adminDetails, setAdminDetails] = useState({
    name: '',
    designation: '',
    mobile: '',
    email: ''
  });

  // --- EVENT HANDLERS ---
  const handleBloodBankChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBloodBankDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleAdminChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Form...");
    console.log("Blood Bank Details:", bloodBankDetails);
    console.log("Admin Details:", adminDetails);
    // Future: Send this data to the backend API here.
  };

  // --- JSX (THE UI) ---
  return (
    <div className="min-h-screen bg-subtle text-content flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-background p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Blood Bank Registration
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Blood Bank Details */}
          <section>
            <h2 className="text-2xl font-semibold border-b border-subtle pb-2 mb-6">
              Blood Bank Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name of Blood Bank */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name of Blood Bank</label>
                <input type="text" id="name" name="name" value={bloodBankDetails.name} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              
              {/* Address */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                <input type="text" id="address" name="address" value={bloodBankDetails.address} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              
              {/* State/UT */}
              <div>
                <label htmlFor="stateUt" className="block text-sm font-medium mb-1">State/UT</label>
                <input type="text" id="stateUt" name="stateUt" value={bloodBankDetails.stateUt} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              
              {/* Pincode */}
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode</label>
                <input type="text" id="pincode" name="pincode" value={bloodBankDetails.pincode} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>

              {/* --- NEW FIELDS START HERE --- */}

              {/* Contact Mobile No */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium mb-1">Contact Mobile No</label>
                <input type="tel" id="mobile" name="mobile" value={bloodBankDetails.mobile} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>

              {/* Email ID */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email ID</label>
                <input type="email" id="email" name="email" value={bloodBankDetails.email} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>

              {/* Contact Person Name */}
              <div className="md:col-span-2">
                <label htmlFor="contactPerson" className="block text-sm font-medium mb-1">Contact Person Name</label>
                <input type="text" id="contactPerson" name="contactPerson" value={bloodBankDetails.contactPerson} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>

              {/* Registration No. */}
              <div>
                <label htmlFor="registrationNo" className="block text-sm font-medium mb-1">Registration No.</label>
                <input type="text" id="registrationNo" name="registrationNo" value={bloodBankDetails.registrationNo} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* Valid Upto */}
              <div>
                <label htmlFor="validUpto" className="block text-sm font-medium mb-1">Valid Up-to</label>
                <input type="date" id="validUpto" name="validUpto" value={bloodBankDetails.validUpto} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* GST No. */}
              <div className="md:col-span-2">
                <label htmlFor="gstNo" className="block text-sm font-medium mb-1">GST No.</label>
                <input type="text" id="gstNo" name="gstNo" value={bloodBankDetails.gstNo} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* --- Bank Details Sub-section --- */}
              <h3 className="text-lg font-semibold md:col-span-2 mt-4 -mb-2">Bank Account Details</h3>
              
              {/* Name of Bank */}
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium mb-1">Name of Bank</label>
                <input type="text" id="bankName" name="bankName" value={bloodBankDetails.bankName} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* IFSC */}
              <div>
                <label htmlFor="ifsc" className="block text-sm font-medium mb-1">IFSC Code</label>
                <input type="text" id="ifsc" name="ifsc" value={bloodBankDetails.ifsc} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* UPI ID */}
              <div className="md:col-span-2">
                <label htmlFor="upiId" className="block text-sm font-medium mb-1">UPI ID</label>
                <input type="text" id="upiId" name="upiId" value={bloodBankDetails.upiId} onChange={handleBloodBankChange} className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </section>

          {/* We will add the Administrator Details section here next */}

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white font-bold rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;