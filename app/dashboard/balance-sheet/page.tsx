"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Search, RefreshCw, Share, Building, Clock } from "lucide-react"

const bloodInventory = [
  {
    id: 1,
    bloodBankName: "City General Blood Bank",
    bloodGroup: "A+",
    unitsAvailable: 45,
    lastUpdated: "2025-01-21 14:30",
    isOwn: true,
  },
  {
    id: 2,
    bloodBankName: "City General Blood Bank",
    bloodGroup: "A-",
    unitsAvailable: 12,
    lastUpdated: "2025-01-21 14:30",
    isOwn: true,
  },
  {
    id: 3,
    bloodBankName: "Metro Medical Center",
    bloodGroup: "A+",
    unitsAvailable: 28,
    lastUpdated: "2025-01-21 13:45",
    isOwn: false,
  },
  {
    id: 4,
    bloodBankName: "Community Hospital",
    bloodGroup: "O+",
    unitsAvailable: 67,
    lastUpdated: "2025-01-21 15:00",
    isOwn: false,
  },
  {
    id: 5,
    bloodBankName: "Regional Health Center",
    bloodGroup: "B+",
    unitsAvailable: 23,
    lastUpdated: "2025-01-21 12:15",
    isOwn: false,
  },
]

const largeOrganizations = [
  "Fortis Healthcare",
  "Apollo Hospitals",
  "Max Healthcare",
  "Manipal Hospitals",
]

export default function BalanceSheetPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all")
  const [showAllBanks, setShowAllBanks] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [requestUnits, setRequestUnits] = useState("")
  const [preferentialAccess, setPreferentialAccess] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState("")

  const filteredInventory = bloodInventory.filter(item => {
    const matchesSearch = item.bloodBankName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBloodGroup = bloodGroupFilter === "all" || item.bloodGroup === bloodGroupFilter
    const matchesView = showAllBanks || item.isOwn
    
    return matchesSearch && matchesBloodGroup && matchesView
  })

  // Auto-refresh every 10 seconds if enabled
  useEffect(() => {
    if (!autoRefresh) return
    
    const interval = setInterval(() => {
      console.log("Auto-refreshing balance sheet data...")
      // In a real app, this would fetch updated data
    }, 10000)
    
    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleShareRequest = (item: any) => {
    setSelectedRow(item)
    setShareDialogOpen(true)
  }

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sending request:", {
      bloodBank: selectedRow?.bloodBankName,
      bloodGroup: selectedRow?.bloodGroup,
      units: requestUnits,
    })
    setShareDialogOpen(false)
    setRequestUnits("")
    setSelectedRow(null)
  }

  const handleRefresh = () => {
    console.log("Manually refreshing balance sheet...")
    // In a real app, this would fetch updated data
  }

  const getStockStatus = (units: number) => {
    if (units > 50) return { status: "High", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" }
    if (units > 20) return { status: "Medium", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" }
    return { status: "Low", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300" }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Balance Sheet</h1>
        <p className="text-muted-foreground">Real-time blood inventory across your network</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Controls</CardTitle>
          <CardDescription>
            Configure how you want to view and access blood inventory data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search blood banks..."
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
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="text-sm">Show All Banks</span>
                <Switch 
                  checked={showAllBanks} 
                  onCheckedChange={setShowAllBanks}
                />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Auto-refresh (10s)</span>
                <Switch 
                  checked={autoRefresh} 
                  onCheckedChange={setAutoRefresh}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Preferential Access</span>
                <Switch 
                  checked={preferentialAccess} 
                  onCheckedChange={setPreferentialAccess}
                />
                {preferentialAccess && (
                  <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {largeOrganizations.map((org) => (
                        <SelectItem key={org} value={org}>{org}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Inventory ({filteredInventory.length} entries)</CardTitle>
          <CardDescription>
            Current blood stock levels across {showAllBanks ? "all" : "your"} blood banks
            {autoRefresh && " • Auto-refreshing every 10 seconds"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blood Bank</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Units Available</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const stockInfo = getStockStatus(item.unitsAvailable)
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.bloodBankName}</span>
                        {item.isOwn && (
                          <Badge variant="outline" className="text-xs">
                            Own
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        {item.bloodGroup}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">
                      {item.unitsAvailable}
                    </TableCell>
                    <TableCell>
                      <Badge className={stockInfo.color}>
                        {stockInfo.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {item.lastUpdated}
                    </TableCell>
                    <TableCell>
                      {!item.isOwn && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShareRequest(item)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Request Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Blood Units</DialogTitle>
            <DialogDescription>
              Send a request to {selectedRow?.bloodBankName} for {selectedRow?.bloodGroup} blood units.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendRequest} className="space-y-4">
            <div>
              <Label htmlFor="requestUnits">Number of Units Requested</Label>
              <Input
                id="requestUnits"
                type="number"
                min="1"
                max={selectedRow?.unitsAvailable}
                value={requestUnits}
                onChange={(e) => setRequestUnits(e.target.value)}
                placeholder="Enter number of units"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Available units: {selectedRow?.unitsAvailable}
              </p>
            </div>
            <DialogFooter>
              <Button type="submit">Send Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}