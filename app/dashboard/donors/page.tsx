"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { Search, Plus, Eye, Edit, Trash2, CreditCard } from "lucide-react"

const donors = [
  {
    id: 1,
    name: "John Smith",
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
    contact: "+91 98765 43210",
    city: "Mumbai",
    lastDonation: "2024-10-15",
  },
  {
    id: 2,
    name: "Mary Johnson",
    age: 32,
    gender: "Female",
    bloodGroup: "A-",
    contact: "+91 98765 43211",
    city: "Delhi",
    lastDonation: "2024-11-20",
  },
  {
    id: 3,
    name: "Robert Davis",
    age: 25,
    gender: "Male",
    bloodGroup: "B+",
    contact: "+91 98765 43212",
    city: "Bangalore",
    lastDonation: "2024-12-05",
  },
]

export default function DonorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    title: string
    description: string
    onConfirm: () => void
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
  })
  const [newDonor, setNewDonor] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    contact: "",
    city: "",
    lastDonation: "",
  })

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donor.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBloodGroup = bloodGroupFilter === "all" || donor.bloodGroup === bloodGroupFilter
    
    return matchesSearch && matchesBloodGroup
  })

  const handleAddDonor = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new donor:", newDonor)
    setAddDialogOpen(false)
    setNewDonor({
      name: "",
      age: "",
      gender: "",
      bloodGroup: "",
      contact: "",
      city: "",
      lastDonation: "",
    })
  }

  const clearForm = () => {
    setNewDonor({
      name: "",
      age: "",
      gender: "",
      bloodGroup: "",
      contact: "",
      city: "",
      lastDonation: "",
    })
  }

  const handleDelete = (donor: any) => {
    setConfirmDialog({
      open: true,
      title: "Delete Donor",
      description: `Are you sure you want to delete ${donor.name}? This action cannot be undone.`,
      onConfirm: () => {
        console.log("Deleting donor:", donor.id)
        setConfirmDialog(prev => ({ ...prev, open: false }))
      }
    })
  }

  const generateDonorCard = (donor: any) => {
    console.log("Generating digital donor card for:", donor.name)
    // This would generate a digital donor card
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Donors</h1>
          <p className="text-muted-foreground">Manage blood donors in your network</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Donor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Donor</DialogTitle>
              <DialogDescription>
                Enter the donor's information to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDonor} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newDonor.name}
                    onChange={(e) => setNewDonor(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newDonor.age}
                    onChange={(e) => setNewDonor(prev => ({ ...prev, age: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={newDonor.gender} onValueChange={(value) => setNewDonor(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group *</Label>
                  <Select value={newDonor.bloodGroup} onValueChange={(value) => setNewDonor(prev => ({ ...prev, bloodGroup: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="contact">Contact *</Label>
                <Input
                  id="contact"
                  type="tel"
                  value={newDonor.contact}
                  onChange={(e) => setNewDonor(prev => ({ ...prev, contact: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={newDonor.city}
                  onChange={(e) => setNewDonor(prev => ({ ...prev, city: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastDonation">Last Donation Date</Label>
                <Input
                  id="lastDonation"
                  type="date"
                  value={newDonor.lastDonation}
                  onChange={(e) => setNewDonor(prev => ({ ...prev, lastDonation: e.target.value }))}
                />
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={clearForm}>
                  Clear Form
                </Button>
                <Button type="submit">Add Donor</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
          <CardDescription>
            Find donors by name, blood group, or location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blood Groups</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Donors ({filteredDonors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Last Donation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">{donor.name}</TableCell>
                  <TableCell>{donor.age}/{donor.gender}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      {donor.bloodGroup}
                    </Badge>
                  </TableCell>
                  <TableCell>{donor.contact}</TableCell>
                  <TableCell>{donor.city}</TableCell>
                  <TableCell className="text-muted-foreground">{donor.lastDonation}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => generateDonorCard(donor)}
                      >
                        <CreditCard className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(donor)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
      />
    </div>
  )
}