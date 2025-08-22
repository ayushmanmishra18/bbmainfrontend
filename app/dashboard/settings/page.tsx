"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, User, CreditCard, Shield, Key } from "lucide-react"

export default function SettingsPage() {
  const [bloodBankInfo, setBloodBankInfo] = useState({
    bankName: "City General Blood Bank",
    address: "123 Main Street, Mumbai, Maharashtra",
    state: "Maharashtra",
    pincode: "400001",
    contactMobile: "+91 98765 43210",
    email: "contact@citygeneral.com",
    contactPerson: "Dr. Sarah Johnson",
    registrationNo: "BB001",
    validUpto: "2026-12-31",
    gstNo: "27ABCDE1234F1Z5",
  })

  const [adminInfo, setAdminInfo] = useState({
    adminName: "Dr. Sarah Johnson",
    designation: "Chief Medical Officer",
    adminMobile: "+91 98765 43210",
    adminEmail: "sarah.johnson@citygeneral.com",
  })

  const [bankDetails, setBankDetails] = useState({
    bankName: "State Bank of India",
    accountNumber: "1234567890",
    ifsc: "SBIN0001234",
    upiId: "citygeneral@paytm",
  })

  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleBloodBankUpdate = (field: string, value: string) => {
    setBloodBankInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleAdminUpdate = (field: string, value: string) => {
    setAdminInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleBankUpdate = (field: string, value: string) => {
    setBankDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityUpdate = (field: string, value: string) => {
    setSecurityInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = (section: string) => {
    console.log(`Saving ${section} information`)
    // Handle save logic
  }

  const handleReset = (section: string) => {
    console.log(`Resetting ${section} information`)
    // Handle reset logic
  }

  const handleClearForm = (section: string) => {
    switch (section) {
      case 'bloodBank':
        setBloodBankInfo({
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
        })
        break
      case 'admin':
        setAdminInfo({
          adminName: "",
          designation: "",
          adminMobile: "",
          adminEmail: "",
        })
        break
      case 'banking':
        setBankDetails({
          bankName: "",
          accountNumber: "",
          ifsc: "",
          upiId: "",
        })
        break
      case 'security':
        setSecurityInfo({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        break
    }
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (securityInfo.newPassword !== securityInfo.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    console.log("Changing password")
    setSecurityInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your blood bank profile and account settings</p>
      </div>

      <Tabs defaultValue="bloodbank" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="bloodbank">Blood Bank</TabsTrigger>
          <TabsTrigger value="admin">Administrator</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="bloodbank">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <CardTitle>Blood Bank Information</CardTitle>
              </div>
              <CardDescription>
                Update your blood bank's basic information and credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Blood Bank Name</Label>
                  <Input
                    id="bankName"
                    value={bloodBankInfo.bankName}
                    onChange={(e) => handleBloodBankUpdate('bankName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={bloodBankInfo.contactPerson}
                    onChange={(e) => handleBloodBankUpdate('contactPerson', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={bloodBankInfo.address}
                  onChange={(e) => handleBloodBankUpdate('address', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State/UT</Label>
                  <Input
                    id="state"
                    value={bloodBankInfo.state}
                    onChange={(e) => handleBloodBankUpdate('state', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={bloodBankInfo.pincode}
                    onChange={(e) => handleBloodBankUpdate('pincode', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactMobile">Contact Mobile</Label>
                  <Input
                    id="contactMobile"
                    value={bloodBankInfo.contactMobile}
                    onChange={(e) => handleBloodBankUpdate('contactMobile', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bloodBankInfo.email}
                    onChange={(e) => handleBloodBankUpdate('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registrationNo">Registration No</Label>
                  <Input
                    id="registrationNo"
                    value={bloodBankInfo.registrationNo}
                    onChange={(e) => handleBloodBankUpdate('registrationNo', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="validUpto">Valid Upto</Label>
                  <Input
                    id="validUpto"
                    type="date"
                    value={bloodBankInfo.validUpto}
                    onChange={(e) => handleBloodBankUpdate('validUpto', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gstNo">GST No</Label>
                <Input
                  id="gstNo"
                  value={bloodBankInfo.gstNo}
                  onChange={(e) => handleBloodBankUpdate('gstNo', e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => handleSave('bloodBank')}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => handleReset('bloodBank')}>
                  Reset
                </Button>
                <Button variant="outline" onClick={() => handleClearForm('bloodBank')}>
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <CardTitle>Administrator Details</CardTitle>
              </div>
              <CardDescription>
                Update administrator information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminName">Administrator Name</Label>
                  <Input
                    id="adminName"
                    value={adminInfo.adminName}
                    onChange={(e) => handleAdminUpdate('adminName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={adminInfo.designation}
                    onChange={(e) => handleAdminUpdate('designation', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminMobile">Contact Mobile</Label>
                  <Input
                    id="adminMobile"
                    value={adminInfo.adminMobile}
                    onChange={(e) => handleAdminUpdate('adminMobile', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Email ID</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={adminInfo.adminEmail}
                    onChange={(e) => handleAdminUpdate('adminEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => handleSave('admin')}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => handleReset('admin')}>
                  Reset
                </Button>
                <Button variant="outline" onClick={() => handleClearForm('admin')}>
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <CardTitle>Bank Account Details</CardTitle>
              </div>
              <CardDescription>
                Update your banking information for transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={bankDetails.bankName}
                    onChange={(e) => handleBankUpdate('bankName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={(e) => handleBankUpdate('accountNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    value={bankDetails.ifsc}
                    onChange={(e) => handleBankUpdate('ifsc', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={bankDetails.upiId}
                    onChange={(e) => handleBankUpdate('upiId', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => handleSave('banking')}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => handleReset('banking')}>
                  Reset
                </Button>
                <Button variant="outline" onClick={() => handleClearForm('banking')}>
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Change your account password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={securityInfo.currentPassword}
                    onChange={(e) => handleSecurityUpdate('currentPassword', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={securityInfo.newPassword}
                    onChange={(e) => handleSecurityUpdate('newPassword', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securityInfo.confirmPassword}
                    onChange={(e) => handleSecurityUpdate('confirmPassword', e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit">
                    Change Password
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleClearForm('security')}>
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <CardTitle>API Keys</CardTitle>
              </div>
              <CardDescription>
                Manage API keys for third-party integrations (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">API Keys Management</h3>
                <p>This feature is coming soon. You'll be able to generate and manage API keys for integrating with external services.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}