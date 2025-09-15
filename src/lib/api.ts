import { 
  BloodBankDetails, AdminDetails, DonorDetails, PatientDetails, 
  DonorCard, WholeBloodUnit, PrbcUnit, BloodBankSearchResult, 
  PartnershipRequest, PartnerBank, TransferLog, FormARequestData 
} from '@/types';

// This points all API calls to our internal Next.js API routes
const API_BASE_URL = '/api'; 

/**
 * A helper function to handle API responses consistently.
 * It checks for errors and parses the JSON.
 * @param response The raw response from the fetch call.
 */
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    throw new Error(errorData.message);
  }
  return response.json();
};

// =================================================================================
//  AUTHENTICATION FUNCTIONS (For Registration & Login)
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
  console.log("Fetching donor list from backend...");
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
  console.log("Fetching Whole Blood inventory...");
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyData: WholeBloodUnit[] = [
    { id: 'WB001', donorCardId: 'DC5432', bloodUnitNo: 'BU9876', bloodGroup: 'O+', collectionDate: '2025-09-10', expiryDate: '2025-10-15', testStatus: 'Passed' },
    { id: 'WB002', donorCardId: 'DC5433', bloodUnitNo: 'BU9877', bloodGroup: 'A-', collectionDate: '2025-09-12', expiryDate: '2025-10-17', testStatus: 'Pending' },
  ];
  return { success: true, data: dummyData };
};

export const getPrbcInventory = async (): Promise<{ success: true, data: PrbcUnit[] }> => {
  console.log("Fetching PRBC inventory...");
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyData: PrbcUnit[] = [
    { id: 'PRBC001', donorCardId: 'DC5112', bloodUnitNo: 'BU9555', bloodGroup: 'B+', collectionDate: '2025-09-08', expiryDate: '2025-10-20', testStatus: 'Passed', source: 'Internal' },
    { id: 'PRBC002', donorCardId: 'DC5113', bloodUnitNo: 'BU9556', bloodGroup: 'AB-', collectionDate: '2025-09-09', expiryDate: '2025-10-21', testStatus: 'Passed', source: 'External' },
  ];
  return { success: true, data: dummyData };
};

// =================================================================================
//  DONOR PORTAL FUNCTIONS (For logged-in Donors)
// =================================================================================

export const getMyDonorCards = async (): Promise<{ success: true, data: DonorCard[] }> => {
  console.log("Fetching donor cards for the logged-in user...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyCards: DonorCard[] = [
    { id: 'DC5432', bloodUnitNo: 'BU9876', donationDate: '2025-08-15', donatedAt: 'AIIMS, Delhi', status: 'Available' },
    { id: 'DC5112', bloodUnitNo: 'BU9555', donationDate: '2025-06-01', donatedAt: 'City Hospital, Mumbai', status: 'Used', usedForPatientId: 'P001' },
  ];
  return { success: true, data: dummyCards };
};

export const getPublicPatientList = async (): Promise<{ success: true, data: PatientDetails[] }> => {
  console.log("Fetching public patient list...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyPatients: PatientDetails[] = [
    { id: 'P001', name: 'Aarav Sharma', bloodGroup: 'A+', unitsRequired: '2', hospitalName: 'City Hospital', city: 'Delhi', stateUt: 'Delhi', contactPerson: '', mobile: '', age: '', sex: '', nationality: '', address: '', doctorName: '', disease: '', email: '' },
    { id: 'P002', name: 'Priya Singh', bloodGroup: 'B-', unitsRequired: '1', hospitalName: 'Apollo Hospital', city: 'Mumbai', stateUt: 'Maharashtra', contactPerson: '', mobile: '', age: '', sex: '', nationality: '', address: '', doctorName: '', disease: '', email: '' },
  ];
  return { success: true, data: dummyPatients };
};

export const submitDonorCardTransfer = async (patientId: string, cardId: string) => {
  console.log(`Submitting transfer of Donor Card [${cardId}] to Patient [${patientId}]`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Donation successful! The blood bank has been notified.' };
};

// =================================================================================
//  INTER-BANK NETWORK & TRANSFER FUNCTIONS (Admin-side)
// =================================================================================

export const searchBloodBanks = async (query: string): Promise<{ success: true, data: BloodBankSearchResult[] }> => {
  console.log(`Searching for blood banks with query: "${query}"`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const allBanks: BloodBankSearchResult[] = [
    { id: 'BB101', name: 'City Hospital Blood Bank', city: 'Delhi', state: 'Delhi', isPartner: true },
    { id: 'BB102', name: 'Apollo Blood Services', city: 'Mumbai', state: 'Maharashtra', isPartner: false },
    { id: 'BB103', name: 'Fortis Blood Center', city: 'Bangalore', state: 'Karnataka', isPartner: false },
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
    const data: PartnershipRequest[] = [
        { id: 'REQ001', bloodBankName: 'Apollo Blood Services', city: 'Mumbai', state: 'Maharashtra', date: '2025-09-14' },
    ];
    return { success: true, data };
};

export const getReceivedRequests = async (): Promise<{ success: true, data: PartnershipRequest[] }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data: PartnershipRequest[] = [
        { id: 'REQ002', bloodBankName: 'Red Cross Delhi', city: 'Delhi', state: 'Delhi', date: '2025-09-13' },
    ];
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
  console.log("Fetching partner banks...");
  await new Promise(resolve => setTimeout(resolve, 500));
  const dummyPartners: PartnerBank[] = [
    { id: 'BB102', name: 'Apollo Blood Services', city: 'Mumbai' },
    { id: 'BB105', name: 'National Blood Centre', city: 'Delhi' },
  ];
  return { success: true, data: dummyPartners };
};

export const getTransferHistory = async (): Promise<{ success: true, data: TransferLog[] }> => {
  console.log("Fetching transfer history...");
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

