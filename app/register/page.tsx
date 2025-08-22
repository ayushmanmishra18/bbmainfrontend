"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
// Assuming you are using shadcn/ui components. If not, these will need to be created.
// To install them: npx shadcn-ui@latest add button input label card
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Icons from lucide-react: npm install lucide-react
import { ArrowLeft, Building, User, CheckCircle2 } from "lucide-react"

// NOTE: This component assumes you have a Header and Footer component.
// You can create placeholder components if they don't exist yet.
// e.g., in src/components/layout/Header.tsx -> export const Header = () => <header className="h-16 border-b"></header>;
// e.g., in src/components/layout/Footer.tsx -> export const Footer = () => <footer className="h-16 border-t"></footer>;


const Footer = () => {
    return (
        <footer className="bg-background border-t">
            <div className="container p-4 text-center text-sm text-foreground">
                © {new Date().getFullYear()} BloodBankGroup.com. All Rights Reserved.
            </div>
        </footer>
    )
}


export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    bankName: "",
    address: "",
    state: "",
    pincode: "",
    contactMobile: "",
    email: "", // Blood bank's general email
    contactPerson: "",
    registrationNo: "",
    validUpto: "",
    gstNo: "",
    bankName_: "",
    ifsc: "",
    upiId: "",
    adminName: "",
    designation: "",
    adminMobile: "",
    adminEmail: "", // Admin's email for verification
  })

  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSendOtp = () => {
    if (!formData.adminEmail) {
      alert("Please enter the Admin Email first.")
      return
    }
    // 🔗 TODO: call backend API here
    console.log("Sending OTP to Admin Email:", formData.adminEmail)
    setOtpSent(true)
  }

  const handleVerifyOtp = () => {
    // 🔗 TODO: call backend API here to verify the OTP
    if (otp === "123456") { // Using a placeholder OTP for now
      setOtpVerified(true)
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpVerified) {
      alert("Please verify the admin email before registering.")
      return
    }
    console.log("Form submitted:", formData)
    // Redirect to login or a success page after submission
    router.push("/login")
  }

  const clearForm = () => {
    setFormData({
      bankName: "",
      address: "",
      state: "",
      pincode: "",
      contactMobile: "",
      email: "",
      contactPerson: "",
      registrationNo: "",
      validUpto: "",
      gstNo: "",
      bankName_: "",
      ifsc: "",
      upiId: "",
      adminName: "",
      designation: "",
      adminMobile: "",
      adminEmail: "",
    })
    setOtp("")
    setOtpSent(false)
    setOtpVerified(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
    

      <main className="flex-1 py-10">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-10">
            <Button variant="ghost" className="mb-4" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">Blood Bank Registration</h1>
            <p className="text-foreground/60">
              Register your blood bank to join our network and start making a difference.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Blood Bank Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <CardTitle>Blood Bank Details</CardTitle>
                </div>
                <CardDescription>Provide your blood bank's basic information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bankName">Blood Bank Name *</Label>
                    <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="contactMobile">Contact Mobile *</Label>
                    <Input id="contactMobile" name="contactMobile" value={formData.contactMobile} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">General Email ID *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="registrationNo">Registration No *</Label>
                    <Input id="registrationNo" name="registrationNo" value={formData.registrationNo} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="validUpto">Valid Upto *</Label>
                    <Input id="validUpto" name="validUpto" type="date" value={formData.validUpto} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="gstNo">GST No</Label>
                    <Input id="gstNo" name="gstNo" value={formData.gstNo} onChange={handleInputChange} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Account Details */}
            <Card>
              <CardHeader>
                <CardTitle>Bank Account Details</CardTitle>
                <CardDescription>Optional: For receiving donations or payments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bankName_">Bank Name</Label>
                    <Input id="bankName_" name="bankName_" value={formData.bankName_} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="ifsc">IFSC Code</Label>
                    <Input id="ifsc" name="ifsc" value={formData.ifsc} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" name="upiId" value={formData.upiId} onChange={handleInputChange} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Admin Details</CardTitle>
                </div>
                <CardDescription>The primary contact for this account. Email must be verified.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="adminName">Admin Name *</Label>
                    <Input id="adminName" name="adminName" value={formData.adminName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" name="designation" value={formData.designation} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="adminMobile">Admin Mobile *</Label>
                    <Input id="adminMobile" name="adminMobile" value={formData.adminMobile} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="adminEmail">Admin Email * (for verification)</Label>
                    <div className="flex gap-2">
                      <Input id="adminEmail" name="adminEmail" type="email" value={formData.adminEmail} onChange={handleInputChange} required disabled={otpSent} />
                      <Button type="button" onClick={handleSendOtp} disabled={otpVerified}>
                        {otpVerified ? "Verified" : otpSent ? "Resend OTP" : "Send OTP"}
                      </Button>
                    </div>
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="md:col-span-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <div className="flex gap-2 mt-1">
                        <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" />
                        <Button type="button" onClick={handleVerifyOtp}>
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}

                  {otpVerified && (
                    <div className="md:col-span-2 flex items-center text-green-600 gap-2 text-sm font-medium">
                      <CheckCircle2 className="h-5 w-5" />
                      Admin Email has been successfully verified.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button type="button" variant="outline" onClick={clearForm}>
                Clear Form
              </Button>
              <Button type="submit" disabled={!otpVerified}>
                Register Blood Bank
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
