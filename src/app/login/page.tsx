"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the router
import { loginAdmin } from '@/lib/api'; // Import our API function

const LoginPage = () => {
  const [email, setEmail] = useState('admin@bloodbank.com'); // Pre-filled for easy testing
  const [password, setPassword] = useState('password123'); // Pre-filled for easy testing
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the API function from our lib/api.ts file
      const response = await loginAdmin(email, password);
      
      if (response.success) {
        // On successful login, redirect to the dashboard
        console.log("Login successful! Redirecting to dashboard...");
        router.push('/dashboard');
      }
    } catch (err) {
      // If the API function throws an error, display it
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      // This runs whether the login was successful or not
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-subtle flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-background p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2 text-content">
          Admin Login
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Access your Blood Bank Dashboard
        </p>

        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg" role="alert"><p>{error}</p></div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-sm text-right">
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Dont have an account?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;