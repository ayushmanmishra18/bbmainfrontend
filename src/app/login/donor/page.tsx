// src/app/login/donor/page.tsx
"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginDonor } from '@/lib/api'; // We will create this function next
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/FormInput';

const DonorLoginPage = () => {
  const [email, setEmail] = useState('donor@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginDonor(email, password);
      if (response.success) {
        router.push('/donor'); // Redirect to donor dashboard
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-subtle dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-content dark:text-gray-100">
          Donor Login
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Access your Donor Portal
        </p>

        {error && <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-md text-center"><p>{error}</p></div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput id="email" name="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FormInput id="password" name="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="text-sm text-right">
            <a href="#" className="font-medium text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

         <p className="text-center text-sm text-gray-500 mt-8">
          Back to{' '}
          <Link href="/" className="font-medium text-blue-600 hover:underline">
            Main Page
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default DonorLoginPage;