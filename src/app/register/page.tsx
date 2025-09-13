"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { registerNewBloodBank } from '@/lib/api';
import { AdminDetails, BloodBankDetails } from '@/types';

// A small reusable component for our form input fields
const FormInput = ({ id, name, label, value, onChange, type = 'text', required = false, disabled = false }: {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
      required={required}
      disabled={disabled}
    />
  </div>
);

const RegisterPage = () => {
  // --- STATE SETUP ---
  const [bloodBankDetails, setBloodBankDetails] = useState<BloodBankDetails>({
    name: '', address: '', stateUt: '', pincode: '', mobile: '', email: '',
    contactPerson: '', registrationNo: '', validUpto: '', gstNo: '',
    bankName: '', ifsc: '', upiId: ''
  });

  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    name: '', designation: '', mobile: '', email: ''
  });

  // --- OTP & SUBMIT Flow State ---
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // --- useEffect for Countdown Timer ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // --- EVENT HANDLERS ---
  const handleBloodBankChange = (e: ChangeEvent<HTMLInputElement>) => setBloodBankDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleAdminChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email' && isVerified) {
      setIsVerified(false);
      setIsOtpSent(false);
      setMessage('');
    }
    setAdminDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async () => {
    setError('');
    setMessage('');
    if (!adminDetails.email) {
      setError('Please enter an email address first.');
      return;
    }
    setIsSendingOtp(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSendingOtp(false);
    setIsOtpSent(true);
    setCountdown(60);
    setMessage('A 6-digit OTP has been sent to your email.');
  };

  const handleVerifyOtp = async () => {
    setError('');
    setMessage('');
    if (otp.length !== 6) {
      setError('OTP must be 6 digits.');
      return;
    }
    setIsVerifyingOtp(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (otp === '123456') {
      setIsVerified(true);
      setMessage('Email successfully verified!');
    } else {
      setError('Invalid OTP. Please try again.');
    }
    setIsVerifyingOtp(false);
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      setError("Please verify your email before registering.");
      return;
    }
    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      const response = await registerNewBloodBank(bloodBankDetails, adminDetails);
      setMessage(response.message);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- JSX (THE UI) ---
  return (
    <div className="min-h-screen bg-subtle text-content flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-background p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2 text-content">Blood Bank Registration</h1>
        <p className="text-center text-gray-500 mb-8">Create a new blood bank account</p>

        {message && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r-lg" role="alert"><p>{message}</p></div>}
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg" role="alert"><p>{error}</p></div>}
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold border-b border-subtle pb-2 mb-6">Blood Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2"><FormInput id="bb_name" name="name" label="Name of Blood Bank" value={bloodBankDetails.name} onChange={handleBloodBankChange} required /></div>
              <div className="md:col-span-2"><FormInput id="bb_address" name="address" label="Address" value={bloodBankDetails.address} onChange={handleBloodBankChange} required /></div>
              <FormInput id="bb_stateUt" name="stateUt" label="State/UT" value={bloodBankDetails.stateUt} onChange={handleBloodBankChange} required />
              <FormInput id="bb_pincode" name="pincode" label="Pincode" value={bloodBankDetails.pincode} onChange={handleBloodBankChange} required />
              <FormInput id="bb_mobile" name="mobile" label="Contact Mobile No" type="tel" value={bloodBankDetails.mobile} onChange={handleBloodBankChange} required />
              <FormInput id="bb_email" name="email" label="Contact Email ID" type="email" value={bloodBankDetails.email} onChange={handleBloodBankChange} required />
              <div className="md:col-span-2"><FormInput id="bb_contactPerson" name="contactPerson" label="Contact Person Name" value={bloodBankDetails.contactPerson} onChange={handleBloodBankChange} required /></div>
              <FormInput id="bb_registrationNo" name="registrationNo" label="Registration No." value={bloodBankDetails.registrationNo} onChange={handleBloodBankChange} />
              <FormInput id="bb_validUpto" name="validUpto" label="Valid Up-to" type="date" value={bloodBankDetails.validUpto} onChange={handleBloodBankChange} />
              <div className="md:col-span-2"><FormInput id="bb_gstNo" name="gstNo" label="GST No." value={bloodBankDetails.gstNo} onChange={handleBloodBankChange} />
              
              <h3 className="text-lg font-semibold md:col-span-2 mt-4 -mb-2">Bank Account Details</h3>
              <FormInput id="bb_bankName" name="bankName" label="Name of Bank" value={bloodBankDetails.bankName} onChange={handleBloodBankChange} />
              <FormInput id="bb_ifsc" name="ifsc" label="IFSC Code" value={bloodBankDetails.ifsc} onChange={handleBloodBankChange} />
              <div className="md:col-span-2"><FormInput id="bb_upiId" name="upiId" label="UPI ID" value={bloodBankDetails.upiId} onChange={handleBloodBankChange} /></div>
            </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b border-subtle pb-2 mb-6">Administrator Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput id="admin_name" name="name" label="Admin Name" value={adminDetails.name} onChange={handleAdminChange} required disabled={isVerified} />
              <FormInput id="admin_designation" name="designation" label="Designation" value={adminDetails.designation} onChange={handleAdminChange} required disabled={isVerified} />
              <FormInput id="admin_mobile" name="mobile" label="Admin Mobile No" type="tel" value={adminDetails.mobile} onChange={handleAdminChange} required disabled={isVerified} />

              <div className="md:col-span-2">
                <label htmlFor="admin_email" className="block text-sm font-medium mb-1">Admin Email for Login</label>
                <div className="flex items-center space-x-2">
                  <input type="email" id="admin_email" name="email" value={adminDetails.email} onChange={handleAdminChange} className="flex-grow px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200" placeholder="you@example.com" required disabled={isOtpSent || isVerified} />
                  {/* --- BUTTON REDESIGN --- */}
                  <button type="button" onClick={handleSendOtp} disabled={isSendingOtp || countdown > 0 || isVerified} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap transition-colors">
                    {isSendingOtp ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </div>
              
              {isOtpSent && !isVerified && (
                <div className="md:col-span-2 p-4 bg-subtle rounded-lg space-y-4">
                  <label htmlFor="otp" className="block text-sm font-medium">Enter 6-Digit OTP</label>
                  <div className="flex items-center space-x-2">
                    {/* --- OTP INPUT FIX --- */}
                    <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="flex-grow tracking-widest text-center px-3 py-2 bg-white text-content border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                     {/* --- BUTTON REDESIGN --- */}
                     <button type="button" onClick={handleVerifyOtp} disabled={isVerifyingOtp} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition-colors">
                       {isVerifyingOtp ? 'Verifying...' : 'Verify'}
                     </button>
                  </div>
                   <div className="text-sm text-center">
                    {countdown > 0 ? (
                      <p>You can resend OTP in <span className="font-bold">{countdown}s</span></p>
                    ) : (
                      <button type="button" onClick={handleSendOtp} className="text-blue-600 hover:underline font-medium">
                        Resend OTP
                      </button>
                    )}
                   </div>
                </div>
              )}
            </div>
          </section>

          <div className="pt-4 flex justify-end">
            {/* --- BUTTON REDESIGN --- */}
            <button type="submit" disabled={!isVerified || isSubmitting} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
              {isSubmitting ? 'Registering...' : 'Register Blood Bank'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;