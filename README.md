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