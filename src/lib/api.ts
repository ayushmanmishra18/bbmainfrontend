import {
  BloodBankDetails, AdminDetails, DonorDetails, PatientDetails,
  DonorCard, WholeBloodUnit, PrbcUnit, BloodBankSearchResult,
  PartnershipRequest, PartnerBank, TransferLog, FormARequestData,
  TransferRequestDetails
} from '@/types';

const API_BASE_URL = '/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    throw new Error(errorData.message);
  }
  return response.json();
};

// =================================================================================
//  AUTHENTICATION FUNCTIONS
// =================================================================================

export const registerNewBloodBank = async (bankDetails: BloodBankDetails, adminDetails: AdminDetails) => {
  console.log("Submitting registration data:", { bankDetails, adminDetails });
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Registration successful!' };
};

export const loginAdmin = async (email: string, password: string) => {
  console.log("Logging in Admin with:", { email, password });
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (email === 'admin@bloodbank.com' && password === 'password123') {
    return { success: true };
  } else {
    throw new Error('Invalid email or password.');
  }
};

export const loginDonor = async (email: string, password: string) => {
  console.log("Logging in Donor with:", { email, password });
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (email === 'donor@example.com' && password === 'password123') {
    return { success: true, user: { name: 'Ramesh Kumar' } };
  } else {
    throw new Error('Invalid email or password for donor.');
  }
};

// =================================================================================
//  ADMIN DASHBOARD FUNCTIONS
// =================================================================================

export const getDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  return handleResponse(response);
};

// =================================================================================
//  DONOR MANAGEMENT FUNCTIONS (Admin-side)
// =================================================================================

export const getDonors = async () => {
  console.log("Fetching donor list...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyDonors = [
    { id: 'D001', name: 'Ramesh Kumar', bloodGroup: 'O+', mobile: '9876543210', city: 'Delhi' },
    { id: 'D002', name: 'Sunita Sharma', bloodGroup: 'A-', mobile: '9123456789', city: 'Mumbai' },
  ];
  return { success: true, data: dummyDonors };
};

export const addNewDonor = async (donorData: Omit<DonorDetails, 'id'>) => {
  console.log("Adding new donor:", donorData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Donor added successfully!' };
};

// =================================================================================
//  PATIENT MANAGEMENT FUNCTIONS (Admin-side)
// =================================================================================

export const getPatients = async (): Promise<{ success: true, data: PatientDetails[] }> => {
  console.log("Fetching patient list...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyPatients: PatientDetails[] = [
    { id: 'P001', name: 'Aarav Sharma', age: '35', sex: 'Male', bloodGroup: 'A+', unitsRequired: '2', hospitalName: 'City Hospital', city: 'Delhi', contactPerson: 'Rohan Sharma', mobile: '9876543211', nationality: 'Indian', address: '123 Main St', stateUt: 'Delhi', doctorName: 'Dr. Gupta', disease: 'Anemia', email: 'aarav@example.com' },
    { id: 'P002', name: 'Priya Singh', age: '28', sex: 'Female', bloodGroup: 'B-', unitsRequired: '1', hospitalName: 'Apollo Hospital', city: 'Mumbai', contactPerson: 'Amit Singh', mobile: '9123456788', nationality: 'Indian', address: '456 Park Ave', stateUt: 'Maharashtra', doctorName: 'Dr. Iyer', disease: 'Thalassemia', email: 'priya@example.com' },
  ];
  return { success: true, data: dummyPatients };
};

export const addNewPatient = async (patientData: Omit<PatientDetails, 'id'>) => {
  console.log("Adding new patient:", patientData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Patient registered successfully!' };
};

// =================================================================================
//  INVENTORY MANAGEMENT FUNCTIONS (Admin-side)
// =================================================================================

export const getWholeBloodInventory = async (): Promise<{ success: true, data: WholeBloodUnit[] }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyData: WholeBloodUnit[] = [
    { id: 'WB001', donorCardId: 'DC5432', bloodUnitNo: 'BU9876', bloodGroup: 'O+', collectionDate: '2025-09-10', expiryDate: '2025-10-15', testStatus: 'Passed' },
    { id: 'WB002', donorCardId: 'DC5433', bloodUnitNo: 'BU9877', bloodGroup: 'A-', collectionDate: '2025-09-12', expiryDate: '2025-10-17', testStatus: 'Pending' },
  ];
  return { success: true, data: dummyData };
};

export const getPrbcInventory = async (): Promise<{ success: true, data: PrbcUnit[] }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyData: PrbcUnit[] = [
    { id: 'PRBC001', donorCardId: 'DC5112', bloodUnitNo: 'BU9555', bloodGroup: 'B+', collectionDate: '2025-09-08', expiryDate: '2025-10-20', testStatus: 'Passed', source: 'Internal' },
    { id: 'PRBC002', donorCardId: 'DC5113', bloodUnitNo: 'BU9556', bloodGroup: 'AB-', collectionDate: '2025-09-09', expiryDate: '2025-10-21', testStatus: 'Passed', source: 'External' },
  ];
  return { success: true, data: dummyData };
};

// =================================================================================
//  DONOR PORTAL FUNCTIONS
// =================================================================================

export const getMyDonorCards = async (): Promise<{ success: true, data: DonorCard[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyCards: DonorCard[] = [
    { id: 'DC5432', bloodUnitNo: 'BU9876', donationDate: '2025-08-15', donatedAt: 'AIIMS, Delhi', status: 'Available' },
    { id: 'DC5112', bloodUnitNo: 'BU9555', donationDate: '2025-06-01', donatedAt: 'City Hospital, Mumbai', status: 'Used', usedForPatientId: 'P001' },
  ];
  return { success: true, data: dummyCards };
};

export const getPublicPatientList = async (): Promise<{ success: true, data: PatientDetails[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyPatients: PatientDetails[] = [
    { id: 'P001', name: 'Aarav Sharma', bloodGroup: 'A+', unitsRequired: '2', hospitalName: 'City Hospital', city: 'Delhi', stateUt: 'Delhi', contactPerson: '', mobile: '', age: '', sex: '', nationality: '', address: '', doctorName: '', disease: '', email: '' },
  ];
  return { success: true, data: dummyPatients };
};

export const submitDonorCardTransfer = async (patientId: string, cardId: string) => {
  console.log(`Submitting transfer of Donor Card [${cardId}] to Patient [${patientId}]`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Donation successful! The blood bank has been notified.' };
};

// =================================================================================
//  INTER-BANK NETWORK & TRANSFERS FUNCTIONS
// =================================================================================

export const searchBloodBanks = async (query: string): Promise<{ success: true, data: BloodBankSearchResult[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const allBanks: BloodBankSearchResult[] = [
    { id: 'BB101', name: 'City Hospital Blood Bank', city: 'Delhi', state: 'Delhi', isPartner: true },
    { id: 'BB102', name: 'Apollo Blood Services', city: 'Mumbai', state: 'Maharashtra', isPartner: false },
  ];
  const filteredBanks = query ? allBanks.filter(b => b.name.toLowerCase().includes(query.toLowerCase())) : allBanks;
  return { success: true, data: filteredBanks };
};

export const sendPartnershipRequest = async (targetBankId: string) => {
  console.log(`Sending partnership request to Blood Bank ID: ${targetBankId}`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Request sent successfully!' };
};

export const getSentRequests = async (): Promise<{ success: true, data: PartnershipRequest[] }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data: PartnershipRequest[] = [{ id: 'REQ001', bloodBankName: 'Apollo Blood Services', city: 'Mumbai', state: 'Maharashtra', date: '2025-09-14' }];
    return { success: true, data };
};

export const getReceivedRequests = async (): Promise<{ success: true, data: PartnershipRequest[] }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data: PartnershipRequest[] = [{ id: 'REQ002', bloodBankName: 'Red Cross Delhi', city: 'Delhi', state: 'Delhi', date: '2025-09-13' }];
    return { success: true, data };
};

export const approveRequest = async (requestId: string) => {
  console.log(`Approving request ID: ${requestId}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Request approved successfully.' };
};

export const denyRequest = async (requestId: string) => {
  console.log(`Denying request ID: ${requestId}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Request denied.' };
};

export const getPartnerBanks = async (): Promise<{ success: true, data: PartnerBank[] }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyPartners: PartnerBank[] = [
    { id: 'BB102', name: 'Apollo Blood Services', city: 'Mumbai' },
    { id: 'BB105', name: 'National Blood Centre', city: 'Delhi' },
  ];
  return { success: true, data: dummyPartners };
};

export const getTransferHistory = async (): Promise<{ success: true, data: TransferLog[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyHistory: TransferLog[] = [
    { id: 'TRN001', type: 'Outgoing', partnerBank: 'Apollo Blood Services', bloodGroup: 'A+', units: 5, status: 'Received', date: '2025-09-10' },
    { id: 'TRN002', type: 'Incoming', partnerBank: 'National Blood Centre', bloodGroup: 'O-', units: 10, status: 'Shipped', date: '2025-09-14' },
  ];
  return { success: true, data: dummyHistory };
};

export const submitFormARequest = async (requestData: FormARequestData) => {
  console.log("Submitting Form A Transfer Request:", requestData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Transfer request (Form A) sent successfully!' };
};

export const getTransferRequestDetails = async (transferId: string): Promise<{ success: true, data: TransferRequestDetails }> => {
  console.log(`Fetching details for Transfer ID: ${transferId}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyDetails: TransferRequestDetails = {
    id: transferId, type: 'Incoming', partnerBank: 'National Blood Centre', bloodGroup: 'Multiple',
    units: 13, status: 'Pending', date: '2025-09-15',
    fromBank: { name: 'National Blood Centre', address: '1 Red Cross Road, New Delhi', licenseNo: 'DL-12345', contact: '011-23456789' },
    items: [
      { id: 1, bloodGroup: 'O-', component: 'PRBC', units: 10 },
      { id: 2, bloodGroup: 'B-', component: 'PRBC', units: 3 },
    ]
  };
  return { success: true, data: dummyDetails };
};

export const respondToTransferRequest = async (transferId: string, response: 'approve' | 'deny') => {
  console.log(`Responding to Transfer ID: ${transferId} with action: ${response}`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: `Request has been successfully ${response === 'approve' ? 'approved' : 'denied'}.` };
};

// Add these to src/lib/api.ts
import { FormBIssueItem, FormBData } from '@/types'; // Add new types to the import

// ...

// --- NEW FUNCTIONS FOR FORM B ---

export const getApprovedTransferDetailsForIssue = async (transferId: string): Promise<{ success: true, data: { itemsToIssue: FormBIssueItem[] } }> => {
  console.log(`Fetching approved items for Transfer ID: ${transferId} to prepare Form B`);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // The backend would look up its inventory to find available units matching the request
  const dummyItems: FormBIssueItem[] = [
    { id: 'PRBC005', donorCardId: 'DC5120', bloodUnitNo: 'BU9560', bloodGroup: 'O-', component: 'PRBC', collectionDate: '2025-09-01', expiryDate: '2025-10-12', testStatus: 'Passed' },
    { id: 'PRBC006', donorCardId: 'DC5121', bloodUnitNo: 'BU9561', bloodGroup: 'O-', component: 'PRBC', collectionDate: '2025-09-02', expiryDate: '2025-10-13', testStatus: 'Passed' },
    { id: 'PRBC007', donorCardId: 'DC5122', bloodUnitNo: 'BU9562', bloodGroup: 'B-', component: 'PRBC', collectionDate: '2025-09-03', expiryDate: '2025-10-14', testStatus: 'Passed' },
  ];
  return { success: true, data: { itemsToIssue: dummyItems } };
};

export const submitFormB = async (formData: FormBData) => {
  console.log("Submitting Form B:", formData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Form B submitted successfully. Blood units are now marked as shipped.' };
};