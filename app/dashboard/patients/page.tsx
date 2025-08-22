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
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"

const patients = [
  {
    id: 1,
    name: "Sarah Wilson",
    age: 45,
    gender: "Female",
    requiredBloodGroup: "AB-",
    contact: "+91 98765 43220",
    hospital: "City General Hospital",
    requestStatus: "Pending",
    requestDate: "2025-01-21",
  },
  {
    id: 2,
    name: "Michael Brown",
    age: 38,
    gender: "Male",
    requiredBloodGroup: "O-",
    contact: "+91 98765 43221",
    hospital: "Metro Medical Center",
    requestStatus: "Approved",
    requestDate: "2025-01-20",
  },
  {
    id: 3,
    name: "Jennifer Davis",
    age: 29,
    gender: "Female",
    requiredBloodGroup: "A+",
    contact: "+91 98765 43222",
    hospital: "Community Hospital",
    requestStatus: "Fulfilled",
    requestDate: "2025-01-19",
  },
]

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  "Approved": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  "Fulfilled": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
}

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
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
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    requiredBloodGroup: "",
    contact: "",
    hospital: "",
  })

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBloodGroup = bloodGroupFilter === "all" || patient.requiredBloodGroup === bloodGroupFilter
    const matchesStatus = statusFilter === "all" || patient.requestStatus.toLowerCase() === statusFilter
    
    return matchesSearch && matchesBloodGroup && matchesStatus
  })

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new patient:", newPatient)
    setAddDialogOpen(false)
    clearForm()
  }

  const clearForm = () => {
    setNewPatient({
      name: "",
      age: "",
      gender: "",
      requiredBloodGroup: "",
      contact: "",
      hospital: "",
    })
  }

  const handleDelete = (patient: any) => {
    setConfirmDialog({
      open: true,
      title: "Delete Patient",
      description: `Are you sure you want to delete ${patient.name}? This action cannot be undone.`,
      onConfirm: () => {
        console.log("Deleting patient:", patient.id)
        setConfirmDialog(prev => ({ ...prev, open: false }))
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage patient blood requests and records</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Enter the patient's information to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={newPatient.gender} onValueChange={(value) => setNewPatient(prev => ({ ...prev, gender: value }))}>
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
                  <Label htmlFor="requiredBloodGroup">Required Blood Group *</Label>
                  <Select value={newPatient.requiredBloodGroup} onValueChange={(value) => setNewPatient(prev => ({ ...prev, requiredBloodGroup: value }))}>
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
                  value={newPatient.contact}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, contact: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="hospital">Hospital *</Label>
                <Input
                  id="hospital"
                  value={newPatient.hospital}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, hospital: e.target.value }))}
                  required
                />
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={clearForm}>
                  Clear Form
                </Button>
                <Button type="submit">Add Patient</Button>
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
            Find patients by name, blood group, or hospital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, hospital..."
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Required Blood</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}/{patient.gender}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      {patient.requiredBloodGroup}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>{patient.hospital}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[patient.requestStatus as keyof typeof statusColors]}>
                      {patient.requestStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{patient.requestDate}</TableCell>
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
                        onClick={() => handleDelete(patient)}
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