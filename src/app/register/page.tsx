// src/app/register/page.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerNewBloodBank } from "../../lib/api";
import { AdminDetails, BloodBankDetails } from "../../types";
import FormInput from "../../components/ui/FormInput";
import PublicHeader from "../../components/layout/PublicHeader";
import PublicFooter from "../../components/layout/PublicFooter";

const RegisterPage = () => {
  // All state and handler logic remains the same
  const [bloodBankDetails, setBloodBankDetails] = useState<BloodBankDetails>({
    name: "",
    address: "",
    stateUt: "",
    pincode: "",
    mobile: "",
    email: "",
    contactPerson: "",
    registrationNo: "",
    validUpto: "",
    gstNo: "",
    bankName: "",
    ifsc: "",
    upiId: "",
  });
  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    name: "",
    designation: "",
    mobile: "",
    email: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleBloodBankChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBloodBankDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  const handleAdminChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email" && isVerified) {
      setIsVerified(false);
      setIsOtpSent(false);
      setMessage("");
    }
    setAdminDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async () => {
    setError("");
    setMessage("");
    if (!adminDetails.email) {
      setError("Please enter an email address first.");
      return;
    }
    setIsSendingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSendingOtp(false);
    setIsOtpSent(true);
    setCountdown(60);
    setMessage("A 6-digit OTP has been sent to your email.");
  };

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");
    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }
    setIsVerifyingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (otp === "123456") {
      setIsVerified(true);
      setMessage("Email successfully verified!");
    } else {
      setError("Invalid OTP. Please try again.");
    }
    setIsVerifyingOtp(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      setError("Please verify your email before registering.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await registerNewBloodBank(
        bloodBankDetails,
        adminDetails
      );
      setMessage(response.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-subtle dark:bg-gray-950">
      <PublicHeader />
      <main className="flex-grow flex items-center justify-center p-4 pt-32 pb-12">
        <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-2 text-content dark:text-gray-100">
            Blood Bank Registration
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Create a new blood bank account
          </p>

          {message && (
            <div
              className="bg-green-100/80 border-l-4 border-green-500 text-green-800 p-4 mb-6 rounded-r-lg"
              role="alert"
            >
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div
              className="bg-red-100/80 border-l-4 border-red-500 text-red-800 p-4 mb-6 rounded-r-lg"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Blood Bank Details Section */}
            <section>
              <h2 className="text-xl font-semibold border-b border-subtle dark:border-gray-700 pb-3 mb-6">
                Blood Bank Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <FormInput
                  className="md:col-span-2"
                  id="name"
                  name="name"
                  label="Name of Blood Bank"
                  value={bloodBankDetails.name}
                  onChange={handleBloodBankChange}
                  required
                />
                <FormInput
                  className="md:col-span-2"
                  id="address"
                  name="address"
                  label="Address"
                  value={bloodBankDetails.address}
                  onChange={handleBloodBankChange}
                  required
                />
                <FormInput
                  id="stateUt"
                  name="stateUt"
                  label="State/UT"
                  value={bloodBankDetails.stateUt}
                  onChange={handleBloodBankChange}
                  required
                />
                <FormInput
                  id="pincode"
                  name="pincode"
                  label="Pincode"
                  value={bloodBankDetails.pincode}
                  onChange={handleBloodBankChange}
                  required
                />
                <FormInput
                  id="mobile"
                  name="mobile"
                  label="Contact Mobile No"
                  type="tel"
                  value={bloodBankDetails.mobile}
                  onChange={handleBloodBankChange}
                  required
                />
                <FormInput
                  id="email"
                  name="email"
                  label="Contact Email ID"
                  type="email"
                  value={bloodBankDetails.email}
                  onChange={handleBloodBankChange}
                  required
                />
                <FormInput
                  className="md:col-span-2"
                  id="contactPerson"
                  name="contactPerson"
                  label="Contact Person Name"
                  value={bloodBankDetails.contactPerson}
                  onChange={handleBloodBankChange}
                  required
                />
                <FormInput
                  id="registrationNo"
                  name="registrationNo"
                  label="Registration No."
                  value={bloodBankDetails.registrationNo}
                  onChange={handleBloodBankChange}
                />
                <FormInput
                  id="validUpto"
                  name="validUpto"
                  label="Valid Up-to"
                  type="date"
                  value={bloodBankDetails.validUpto}
                  onChange={handleBloodBankChange}
                />
                <FormInput
                  className="md:col-span-2"
                  id="gstNo"
                  name="gstNo"
                  label="GST No."
                  value={bloodBankDetails.gstNo}
                  onChange={handleBloodBankChange}
                />

                <h3 className="text-lg font-semibold md:col-span-2 mt-4 -mb-2 dark:text-gray-200">
                  Bank Account Details
                </h3>
                <FormInput
                  id="bankName"
                  name="bankName"
                  label="Name of Bank"
                  value={bloodBankDetails.bankName}
                  onChange={handleBloodBankChange}
                />
                <FormInput
                  id="ifsc"
                  name="ifsc"
                  label="IFSC Code"
                  value={bloodBankDetails.ifsc}
                  onChange={handleBloodBankChange}
                />
                <FormInput
                  className="md:col-span-2"
                  id="upiId"
                  name="upiId"
                  label="UPI ID"
                  value={bloodBankDetails.upiId}
                  onChange={handleBloodBankChange}
                />
              </div>
            </section>

            {/* Administrator Details & OTP Section */}
            <section>
              <h2 className="text-xl font-semibold border-b border-subtle dark:border-gray-700 pb-3 mb-6">
                Administrator Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <FormInput
                  id="admin_name"
                  name="name"
                  label="Admin Name"
                  value={adminDetails.name}
                  onChange={handleAdminChange}
                  required
                  disabled={isVerified}
                />
                <FormInput
                  id="admin_designation"
                  name="designation"
                  label="Designation"
                  value={adminDetails.designation}
                  onChange={handleAdminChange}
                  required
                  disabled={isVerified}
                />
                <FormInput
                  id="admin_mobile"
                  name="mobile"
                  label="Admin Mobile No"
                  type="tel"
                  value={adminDetails.mobile}
                  onChange={handleAdminChange}
                  required
                  disabled={isVerified}
                />

                <div className="md:col-span-2">
                  <label
                    htmlFor="admin_email"
                    className="block text-sm font-medium mb-1 dark:text-gray-300"
                  >
                    Admin Email for Login
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      id="admin_email"
                      name="email"
                      value={adminDetails.email}
                      onChange={handleAdminChange}
                      className="flex-grow px-3 py-2 bg-subtle border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:bg-gray-200"
                      placeholder="you@example.com"
                      required
                      disabled={isOtpSent || isVerified}
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp || countdown > 0 || isVerified}
                      className="px-4 py-2 font-semibold text-blue-500 bg-transparent border-2 border-blue-500 rounded-md hover:bg-blue-500/10 transition-colors disabled:opacity-50 disabled:border-gray-500 disabled:text-gray-500 whitespace-nowrap"
                    >
                      {isSendingOtp ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                </div>

                {isOtpSent && !isVerified && (
                  <div className="md:col-span-2 p-4 bg-subtle dark:bg-gray-800/50 rounded-lg space-y-4 border dark:border-gray-700">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium dark:text-gray-300"
                    >
                      Enter 6-Digit OTP
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="flex-grow tracking-widest text-center px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isVerifyingOtp}
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400"
                      >
                        {isVerifyingOtp ? "Verifying..." : "Verify"}
                      </button>
                    </div>
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                      {countdown > 0 ? (
                        <p>
                          Resend OTP in{" "}
                          <span className="font-bold">{countdown}s</span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-blue-500 hover:underline font-medium"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={!isVerified || isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:bg-blue-500/50 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registering..." : "Register Blood Bank"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default RegisterPage;
