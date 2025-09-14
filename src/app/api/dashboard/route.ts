import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const dummyData = {
    stats: {
      totalUnits: '1,204', totalDonors: '852',
      pendingRequests: '12', partnerBanks: '8',
    },
    inventoryByGroup: [
      { name: 'A+', units: 150 }, { name: 'A-', units: 45 },
      { name: 'B+', units: 180 }, { name: 'B-', units: 30 },
      { name: 'AB+', units: 75 }, { name: 'AB-', units: 20 },
      { name: 'O+', units: 450 }, { name: 'O-', units: 254 },
    ],
    recentActivity: [
      { id: 1, type: 'Donation', description: 'Voluntary donation from Donor ID #4521 (O+)', time: '2h ago' },
      { id: 2, type: 'Transfusion', description: '2 units of A- issued to Patient ID #P9876', time: '5h ago' },
      { id: 3, type: 'Transfer', description: 'Incoming transfer request from City Hospital', time: '1d ago' },
      { id: 4, type: 'Patient', description: 'New patient registered: Priya Singh (B+)', time: '2d ago' },
    ],
  };

  return NextResponse.json({ success: true, data: dummyData });
}