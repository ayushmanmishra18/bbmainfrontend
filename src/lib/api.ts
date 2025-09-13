// src/lib/api.ts
import { BloodBankDetails, AdminDetails } from '@/types';

export const registerNewBloodBank = async (
  bankDetails: BloodBankDetails, 
  adminDetails: AdminDetails
) => {
  try {
    const response = await fetch('/api/register', { // Step 1: Call our Next.js API route
      method: 'POST', // Step 2: Specify the method
      headers: {
        'Content-Type': 'application/json', // Step 3: Tell the server we're sending JSON
      },
      body: JSON.stringify({ bankDetails, adminDetails }), // Step 4: Convert our data to a JSON string
    });

    // Step 5: Check if the server responded with an error
    if (!response.ok) {
      const errorData = await response.json(); // Try to get error details from the backend
      throw new Error(errorData.message || 'Something went wrong');
    }

    // Step 6: If everything is okay, return the successful response data
    return await response.json();

  } catch (error) {
    console.error("Registration API error:", error);
    // Re-throw the error so the component can catch it and show a message
    throw error;
  }
};