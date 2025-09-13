import { BloodBankDetails, AdminDetails } from '@/types';

// The URL now points to the API routes inside our own Next.js project
const API_BASE_URL = '/api'; 

/**
 * A helper function to handle API responses.
 */
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred. Please try again.');
  }
  return data;
};

// =================================================================================
//  Authentication API Functions
// =================================================================================

export const registerNewBloodBank = async (
  bankDetails: BloodBankDetails, 
  adminDetails: AdminDetails
) => {
  // This will now call http://localhost:3000/api/auth/register
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bankDetails, adminDetails }),
  });
  return handleResponse(response);
};

export const loginAdmin = async (email: string, password: string) => {
  // This will now call http://localhost:3000/api/auth/login
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

// =================================================================================
//  Dashboard API Functions
// =================================================================================

export const getDashboardData = async () => {
  // This will now call http://localhost:3000/api/dashboard
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};