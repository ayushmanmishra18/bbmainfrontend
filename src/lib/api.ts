import { 
  BloodBankDetails, 
  AdminDetails, 
  DonorDetails, 
  PatientDetails, 
  DonorCard, 
  WholeBloodUnit, 
  PrbcUnit,
  BloodBankSearchResult
} from '@/types';

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

export const loginDonor = async (email: string, password: string) => {
  console.log("Logging in Donor with:", { email, password });
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (email === 'donor@example.com' && password === 'password123') {
    return { success: true, user: { name: 'Ramesh Kumar' } };
  } else {
    throw new Error('Invalid email or password for donor.');
  }
};

// --- Dashboard Functions ---
export const getDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  return handleResponse(response);
};

// --- Donor Management API Functions ---
export const getDonors = async () => {
  console.log("Fetching donor list from backend...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyDonors = [
    { id: 'D001', name: 'Ramesh Kumar', bloodGroup: 'O+', mobile: '9876543210', city: 'Delhi' },
    { id: 'D002', name: 'Sunita Sharma', bloodGroup: 'A-', mobile: '9123456789', city: 'Mumbai' },
    { id: 'D003', name: 'Amit Singh', bloodGroup: 'B+', mobile: '9988776655', city: 'Bangalore' },
  ];
  return { success: true, data: dummyDonors };
};

export const addNewDonor = async (donorData: Omit<DonorDetails, 'id'>) => {
  console.log("Adding new donor:", donorData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Donor added successfully!' };
};

// --- Patient Management API Functions ---
export const getPatients = async () => {
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

// --- Inventory Management API Functions ---
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

// --- Donor Portal API Functions ---
export const getMyDonorCards = async (): Promise<{ success: true, data: DonorCard[] }> => {
  console.log("Fetching donor cards for the logged-in user...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyCards: DonorCard[] = [
    { id: 'DC5432', bloodUnitNo: 'BU9876', donationDate: '2025-08-15', donatedAt: 'AIIMS, Delhi', status: 'Available' },
    { id: 'DC5112', bloodUnitNo: 'BU9555', donationDate: '2025-06-01', donatedAt: 'City Hospital, Mumbai', status: 'Used', usedForPatientId: 'P001' },
    { id: 'DC4321', bloodUnitNo: 'BU8765', donationDate: '2025-02-20', donatedAt: 'AIIMS, Delhi', status: 'Expired' },
  ];
  return { success: true, data: dummyCards };
};

export const getPublicPatientList = async (): Promise<{ success: true, data: PatientDetails[] }> => {
  console.log("Fetching public patient list...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const dummyPatients: PatientDetails[] = [
    { id: 'P001', name: 'Aarav Sharma', age: '35', sex: 'Male', bloodGroup: 'A+', unitsRequired: '2', hospitalName: 'City Hospital', city: 'Delhi', contactPerson: 'Rohan Sharma', mobile: '9876543211', nationality: 'Indian', address: '123 Main St', stateUt: 'Delhi', doctorName: 'Dr. Gupta', disease: 'Anemia', email: 'aarav@example.com' },
    { id: 'P002', name: 'Priya Singh', age: '28', sex: 'Female', bloodGroup: 'B-', unitsRequired: '1', hospitalName: 'Apollo Hospital', city: 'Mumbai', contactPerson: 'Amit Singh', mobile: '9123456788', nationality: 'Indian', address: '456 Park Ave', stateUt: 'Maharashtra', doctorName: 'Dr. Iyer', disease: 'Thalassemia', email: 'priya@example.com' },
  ];
  return { success: true, data: dummyPatients };
};

export const submitDonorCardTransfer = async (patientId: string, cardId: string) => {
  console.log(`Submitting transfer of Donor Card [${cardId}] to Patient [${patientId}]`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Donation successful! The blood bank has been notified.' };
};

// --- Network & Groups API Functions ---
export const searchBloodBanks = async (query: string): Promise<{ success: true, data: BloodBankSearchResult[] }> => {
  console.log(`Searching for blood banks with query: "${query}"`);
  await new Promise(resolve => setTimeout(resolve, 750));
  const allBanks: BloodBankSearchResult[] = [
    { id: 'BB101', name: 'City Hospital Blood Bank', city: 'Delhi', state: 'Delhi', isPartner: false },
    { id: 'BB102', name: 'Apollo Blood Donation Center', city: 'Mumbai', state: 'Maharashtra', isPartner: true },
    { id: 'BB103', name: 'Fortis Blood Services', city: 'Bangalore', state: 'Karnataka', isPartner: false },
    { id: 'BB104', name: 'Red Cross Delhi Branch', city: 'Delhi', state: 'Delhi', isPartner: false },
  ];
  const results = query ? allBanks.filter(bank => 
    bank.name.toLowerCase().includes(query.toLowerCase()) || 
    bank.city.toLowerCase().includes(query.toLowerCase())
  ) : allBanks;
  return { success: true, data: results };
};

export const sendPartnershipRequest = async (targetBankId: string) => {
  console.log(`Sending partnership request to Blood Bank ID: ${targetBankId}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Partnership request sent successfully!' };
};


