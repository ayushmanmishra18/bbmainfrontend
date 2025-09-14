import { BloodBankDetails, AdminDetails, DonorDetails } from '@/types';

const API_BASE_URL = '/api'; 

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred.');
  }
  return data;
};

// --- Authentication Functions ---
export const registerNewBloodBank = async (bankDetails: BloodBankDetails, adminDetails: AdminDetails) => {
  console.log("Submitting registration data:", { bankDetails, adminDetails });
  await new Promise(resolve => setTimeout(resolve, 1500));
  // In future, this will be: return fetch(...)
  return { success: true, message: 'Registration successful!' };
};

export const loginAdmin = async (email: string, password: string) => {
  console.log("Logging in with:", { email, password });
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (email === 'admin@bloodbank.com' && password === 'password123') {
    return { success: true };
  } else {
    throw new Error('Invalid email or password.');
  }
};

// --- Dashboard Functions ---
export const getDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  return handleResponse(response);
};

// --- Donor Functions ---
export const addNewDonor = async (donorData: DonorDetails) => {
  console.log("Adding new donor:", donorData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Donor added successfully!' };
};

// Add this new function to your src/lib/api.ts file

export const getDonors = async () => {
  console.log("Fetching donor list from backend...");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Dummy data response
  const dummyDonors = [
    { id: 'D001', name: 'Ramesh Kumar', bloodGroup: 'O+', mobile: '9876543210', city: 'Delhi' },
    { id: 'D002', name: 'Sunita Sharma', bloodGroup: 'A-', mobile: '9123456789', city: 'Mumbai' },
    { id: 'D003', name: 'Amit Singh', bloodGroup: 'B+', mobile: '9988776655', city: 'Bangalore' },
    { id: 'D004', name: 'Priya Verma', bloodGroup: 'AB+', mobile: '9654321098', city: 'Kolkata' },
    { id: 'D005', name: 'Vikram Rathore', bloodGroup: 'O-', mobile: '9786543210', city: 'Chennai' },
  ];

  return { success: true, data: dummyDonors };
};