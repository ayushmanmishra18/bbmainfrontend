// =================================================================================
//  CORE ENTITIES
// =================================================================================

// For the main registration form (Module 1)
export interface BloodBankDetails {
  name: string; address: string; stateUt: string; pincode: string; mobile: string;
  email: string; contactPerson: string; registrationNo: string; validUpto: string;
  gstNo: string; bankName: string; ifsc: string; upiId: string;
}

// For the admin details section of the registration form (Module 1)
export interface AdminDetails {
  name: string; designation: string; mobile: string; email: string;
}

// For the donor registration form (Module 6)
export interface DonorDetails {
  id: string; name: string; age: string; sex: string; nationality: string; 
  mobile: string; email: string; weight: string; bloodGroup: string; 
  address: string; stateUt: string; pincode: string;
}

// For the patient registration form (Module 5)
export interface PatientDetails {
  id: string; name: string; age: string; sex: string; nationality: string;
  address: string; city: string; stateUt: string; bloodGroup: string;
  unitsRequired: string; hospitalName: string; doctorName: string; disease: string;
  contactPerson: string; mobile: string; email: string;
}

// =================================================================================
//  OPERATIONAL DATA
// =================================================================================

// The base for all blood units in inventory (Modules 11 & 12)
export interface BloodUnitBase {
  id: string;
  donorCardId: string;
  bloodUnitNo: string;
  bloodGroup: string;
  collectionDate: string;
  expiryDate: string;
  testStatus: 'Pending' | 'Passed' | 'Failed';
}

// A whole blood unit (Module 11)
export type WholeBloodUnit = BloodUnitBase;

// A PRBC unit (Module 12)
export interface PrbcUnit extends BloodUnitBase {
  source: 'Internal' | 'External';
}

// Represents a donor's "credit" for a donation (Modules 3 & 7)
export interface DonorCard {
  id: string;
  bloodUnitNo: string;
  donationDate: string;
  donatedAt: string; // Name of the Blood Bank
  status: 'Available' | 'Used' | 'Expired';
  usedForPatientId?: string;
}

// =================================================================================
//  DASHBOARD, NETWORK & TRANSFERS
// =================================================================================

// For the main admin dashboard widgets
export interface DashboardData {
  stats: {
    totalUnits: string; totalDonors: string;
    pendingRequests: string; partnerBanks: string;
  };
  inventoryByGroup: { name: string; units: number }[];
  recentActivity: { id: number; type: string; description: string; time: string }[];
}

// For the search results on the Inter-Bank Network page (Module 2)
export interface BloodBankSearchResult {
  id: string;
  name: string;
  city: string;
  state: string;
  requestSent?: boolean; 
  isPartner?: boolean; 
}

// For the Sent/Received request tabs on the Network page (Module 2)
export interface PartnershipRequest {
  id: string;
  bloodBankName: string;
  city: string;
  state: string;
  date: string;
  status?: 'Approved' | 'Denied';
}

// A simplified type for listing partner banks in dropdowns
export interface PartnerBank {
  id: string;
  name: string;
  city: string;
}

// For the main transfer history table (Module 15-18)
export interface TransferLog {
  id: string;
  type: 'Outgoing' | 'Incoming';
  partnerBank: string;
  bloodGroup: string;
  units: number;
  status: 'Pending' | 'Approved' | 'Shipped' | 'Received' | 'Denied';
  date: string;
}

// For a single item within a Form A request (Module 15)
export interface FormARequestItem {
  id: number;
  bloodGroup: string;
  component: string;
  units: number;
}

// For the complete data submitted by Form A (Module 15)
export interface FormARequestData {
  targetBankId: string;
  items: FormARequestItem[];
}

