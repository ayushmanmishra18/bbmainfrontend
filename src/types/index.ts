// src/types/index.ts

// This defines the shape of the blood bank details object
export interface BloodBankDetails {
  name: string;
  address: string;
  stateUt: string;
  pincode: string;
  mobile: string;
  email: string;
  contactPerson: string;
  registrationNo: string;
  validUpto: string;
  gstNo: string;
  bankName: string;
  ifsc: string;
  upiId: string;
}

// This defines the shape of the admin details object
export interface AdminDetails {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}
// Add this new interface to your src/types/index.ts file

export interface DashboardData {
  stats: {
    totalUnits: string;
    totalDonors: string;
    pendingRequests: string;
    partnerBanks: string;
  };
  inventoryByGroup: { name: string; units: number }[];
  recentActivity: { id: number; type: string; description: string; time: string }[];
}
