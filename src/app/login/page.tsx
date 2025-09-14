"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/api';
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/FormInput';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@bloodbank.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginAdmin(email, password);
      if (response.success) {
        router.push('/dashboard');
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
          Admin Login
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Access your Blood Bank Dashboard
        </p>

        {error && <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-md text-center"><p>{error}</p></div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput 
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput 
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-sm text-right">
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;