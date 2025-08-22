"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { Search, Filter, Eye, Edit, Ban } from "lucide-react"

const bloodBanks = [
  {
    id: 1,
    name: "City General Blood Bank",
    address: "123 Main St, Mumbai",
    state: "Maharashtra",
    contact: "+91 98765 43210",
    email: "contact@citygeneral.com",
    status: "Active",
    registrationNo: "BB001",
  },
  {
    id: 2,
    name: "Metro Health Blood Center",
    address: "456 Park Ave, Delhi",
    state: "Delhi",
    contact: "+91 98765 43211",
    email: "info@metrohealth.com",
    status: "Active",
    registrationNo: "BB002",
  },
  {
    id: 3,
    name: "Community Blood Bank",
    address: "789 Oak St, Bangalore",
    state: "Karnataka",
    contact: "+91 98765 43212",
    email: "support@community.com",
    status: "Inactive",
    registrationNo: "BB003",
  },
]

export default function BloodBanksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
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

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bank.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesState = stateFilter === "all" || bank.state === stateFilter
    const matchesStatus = statusFilter === "all" || bank.status.toLowerCase() === statusFilter
    
    return matchesSearch && matchesState && matchesStatus
  })

  const handleDeactivate = (bank: any) => {
    setConfirmDialog({
      open: true,
      title: "Deactivate Blood Bank",
      description: `Are you sure you want to deactivate ${bank.name}? This action can be reversed later.`,
      onConfirm: () => {
        console.log("Deactivating blood bank:", bank.id)
        setConfirmDialog(prev => ({ ...prev, open: false }))
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blood Banks</h1>
          <p className="text-muted-foreground">Manage registered blood banks in your network</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
          <CardDescription>
            Find blood banks by name, location, or other criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, city, state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blood Banks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Blood Banks ({filteredBloodBanks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBloodBanks.map((bank) => (
                <TableRow key={bank.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{bank.name}</div>
                      <div className="text-sm text-muted-foreground">{bank.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{bank.address}</div>
                      <div className="text-muted-foreground">{bank.state}</div>
                    </div>
                  </TableCell>
                  <TableCell>{bank.contact}</TableCell>
                  <TableCell>{bank.registrationNo}</TableCell>
                  <TableCell>
                    <Badge variant={bank.status === "Active" ? "default" : "secondary"}>
                      {bank.status}
                    </Badge>
                  </TableCell>
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
                        onClick={() => handleDeactivate(bank)}
                      >
                        <Ban className="h-4 w-4" />
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