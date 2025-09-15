# Bloodbankgroup.com - Frontend

This is the official frontend repository for **Bloodbankgroup.com**, a modern, full-stack blood bank management system. The goal of this project is to create a professional, industry-level application to streamline blood bank operations, designed for presentation to major healthcare institutions like AIIMS for funding and adoption.

---

## ✨ Key Features

- **Secure Admin Authentication:** Complete registration and login flow with OTP email verification.
- **Real-time Dashboard:** A data-rich "mission control" center with stats, charts, and recent activity.
- **Comprehensive Inventory Management:** Detailed tracking of Whole Blood and PRBC units.
- **Donor & Patient CRM:** Centralized management of donor and patient records.
- **Advanced Inter-Bank Collaboration:** A network for blood banks to connect and manage digital transfers using Forms A & B.
- **Dynamic Reporting:** Generation of key operational reports with PDF export functionality.
- **Modern UI/UX:** A clean, minimalistic interface with a professional look and feel, including a light/dark mode theme.

---

## 🚀 Tech Stack

- **Framework:** **Next.js** (with App Router)
- **Language:** **TypeScript**
- **Styling:** **Tailwind CSS**
- **UI & Visualization:**
  - **React**
  - **Recharts** (for data charts)
  - **Lucide Icons** (for a clean icon set)
  - **Framer Motion** (for animations, planned)

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js** (v18.x or later recommended)
- **npm** or **yarn**

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd bloodbankgroup-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a new file named `.env.local` in the root of the project and add the necessary environment variables.
    ```env
    # Example
    BACKEND_API_URL=http://localhost:8080/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📜 Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs the ESLint linter to check for code quality issues.

---

## 🗺️ Project Roadmap

This is the official development plan for the application, broken down into key milestones.

### Milestone 1: Foundation & User Onboarding
**Goal:** To build the project's public face and the secure entry point for administrators.
- ✅ **Project Foundation:** Technical setup is complete.
- 🚧 **Professional Homepage:** Design a trustworthy public portal.
- ✅ **Blood Bank & Admin Registration (Module 1):** Build the complete registration form with OTP verification.
- ✅ **Admin Login & Authentication:** Build the `/login` page and password reset flow.

### Milestone 2: The Admin's Core Workspace
**Goal:** To create the main dashboard environment where the admin will spend most of their time.
- ✅ **Application Shell:** Create the main layout with a persistent Header and Sidebar.
- ✅ **Main Dashboard Page (Module 19):** Build a data-rich dashboard with widgets, charts, and an activity feed.
- 🚧 **Theme Toggle:** Implement a light/dark mode toggle in the Header.
- 📝 **Donor Registration & Management (Module 6):** Build the form and data table for managing donors.

### Milestone 3: Core Daily Operations
**Goal:** To build the critical, high-traffic features for managing inventory and patient needs.
- 📝 **Inventory Management (Modules 11 & 12):** Create a detailed data table to track all blood units and their status.
- 📝 **Patient Management (Module 5):** Build the system for managing patient records and their blood requirements.
- 📝 **Donation Fulfillment Flow (Modules 3, 7, 9):** Implement the workflow to connect a donor card to a patient's need.

### Milestone 4: Advanced Collaboration & Reporting
**Goal:** To implement the innovative networking and data features that make this platform unique.
- 📝 **Inter-Bank Network & Transfers (Modules 2, 15-18):** Build the complete digital system for blood transfers between banks (Forms A & B).
- 📝 **Balance Sheet Management (Modules 13 & 14):** Create pages to display daily receivables and deliverables.
- 📝 **Date-Wise Donations Report (Module 4):** Build the reporting page with PDF export functionality.

### Milestone 5: Final Polish & Presentation Readiness
**Goal:** To prepare a flawless, impressive application for the final presentation.
- 📝 **UI/UX Polish & Animations:** Integrate `framer-motion` for a fluid user experience.
- 📝 **Final Testing & Demo Preparation:** Populate with realistic demo data and conduct thorough end-to-end testing.


🩸 https://www.google.com/search?q=Bloodbankgroup.com: The Digital Donation Flow
Last Updated: September 15, 2025
Status: Core Feature Defined

This document outlines the complete end-to-end process for a Voluntary Digital Donation. This innovative feature allows a donor to digitally assign a previously donated unit of blood (represented by a "Donor Card") to a specific patient in need, creating a seamless and auditable trail.

actors Involved
Three key parties are involved in this workflow:

👤 The Donor: A registered individual who has previously donated blood.

🏥 The Original Bank: The blood bank where the donor made their physical donation.

🏨 The Recipient Bank: The blood bank where the patient is admitted and needs blood.

Phase 1: Creating the Digital Asset (The Donor Card)
This phase is the prerequisite for any digital donation. It converts a physical act into a digital credit.

[Step 1] Physical Donation: A donor (e.g., Rohan) visits a partner blood bank (the Original Bank) and donates one unit of blood.

[Step 2] Admin Action: The admin at the Original Bank logs into their dashboard, finds or creates Rohan's profile, and registers the new donation (Module 6).

[Step 3] System Creates Credit: The system automatically generates a Donor Card (Module 3) linked to Rohan's account.

Status: The card is marked as Available.

Notification: If Rohan is a new donor, he receives a welcome email with credentials to access his Donor Portal.

Outcome: Rohan now possesses a digital "credit" for one unit of blood, visible in his online account.

Phase 2: The Donor's Action (The "Donate Now" Flow)
This phase is driven entirely by the donor's goodwill and actions within their portal.

[Step 4] Donor Logs In: Rohan logs into his secure Donor Portal on Bloodbankgroup.com.

[Step 5] Views Patients: He navigates to the "Patients in Need" page, which displays a public list of patients requiring blood (Module 5). He finds a patient, Priya, who needs his blood group.

[Step 6] Initiates Donation: Rohan clicks the "Donate a Card" button for Priya. A modal appears, showing his list of Available Donor Cards.

[Step 7] Confirms & Submits: Rohan selects a card and clicks "Confirm Donation" (Module 7).

An API call (submitDonorCardTransfer) is made.

The system creates a Pending Transfer record.

The selected Donor Card's status is "locked" or "reserved".

A notification is instantly sent to the admin of the Recipient Bank.

Outcome: Rohan has successfully initiated the transfer. He receives a success message, and his part of the process is complete.

Phase 3: Fulfillment & Digital Accounting
This is the final phase where the digital transfer is approved, and the system's ledgers are updated.

[Step 8] Recipient Admin Review: The admin at the Recipient Bank sees a new notification on their dashboard for a pending voluntary donation.

[Step 9] Admin Approves: The admin reviews the request and clicks "Approve."

[Step 10] System Finalizes Transaction: This triggers a final API call that performs several crucial updates:

✅ Donor Card Status: The card's status is changed to Used.

✅ Patient Record: Priya's record is updated to show one unit has been secured.

✅ Balance Sheet Update (Module 9):

The Recipient Bank gains a "Receivable Asset" from the Original Bank.

The Original Bank gains a "Deliverable Liability" to the Recipient Bank.

[Step 11] Physical Fulfillment: The admin at the Recipient Bank can now confidently release one physical unit of blood from their own stock to Priya's family, knowing their inventory is digitally balanced by the credit from the Original Bank.

summarised Flowchart
Donor gives blood at Bank A
      ↓
Bank A Admin creates Donor Card (Status: Available)
      ↓
Donor logs in, sees Patient at Bank B
      ↓
Donor assigns their card to the Patient
      ↓
Bank B Admin gets a notification
      ↓
Bank B Admin approves the transfer
      ↓
System updates:
  - Donor Card → Used
  - Patient Record → Unit Secured
  - Bank A Balance Sheet → Liability
  - Bank B Balance Sheet → Asset
      ↓
Bank B releases physical blood to the Patient
