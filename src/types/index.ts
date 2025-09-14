export interface BloodBankDetails {
  name: string; address: string; stateUt: string; pincode: string; mobile: string;
  email: string; contactPerson: string; registrationNo: string; validUpto: string;
  gstNo: string; bankName: string; ifsc: string; upiId: string;
}

export interface AdminDetails {
  name: string; designation: string; mobile: string; email: string;
}

export interface DashboardData {
  stats: {
    totalUnits: string; totalDonors: string;
    pendingRequests: string; partnerBanks: string;
  };
  inventoryByGroup: { name: string; units: number }[];
  recentActivity: { id: number; type: string; description: string; time: string }[];
}

export interface DonorDetails {
  name: string; age: string; sex: string; nationality: string; mobile: string;
  email: string; weight: string; bloodGroup: string; address: string;
  stateUt: string; pincode: string;
}

// Add this to src/types/index.ts

// src/types/index.ts

export interface PatientDetails {
  id: string; // Changed from id?: string
  name: string;
  age: string;
  sex: string;
  bloodGroup: string;
  unitsRequired: string;
  hospitalName: string;
  city: string;
  contactPerson: string;
  mobile: string;
  nationality: string;
  address: string;
  stateUt: string;
  doctorName: string;
  disease: string;
  email: string;
  // Add other fields from your form if they are not here
}
 

// Add these to src/types/index.ts

export interface BloodUnitBase {
  id: string; // Unique ID for the unit
  donorCardId: string;
  bloodUnitNo: string;
  bloodGroup: string;
  collectionDate: string;
  expiryDate: string;
  testStatus: 'Pending' | 'Passed' | 'Failed';
}

export type WholeBloodUnit = BloodUnitBase;

export interface PrbcUnit extends BloodUnitBase {
  source: 'Internal' | 'External'; // From donation or transfer
}

