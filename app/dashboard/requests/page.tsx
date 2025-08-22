"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { Check, X, Trash2 } from "lucide-react"

const sentRequests = [
  {
    id: 1,
    bloodBankName: "Metro Medical Center",
    requestType: "Blood Units",
    bloodGroup: "O+",
    units: 5,
    status: "Pending",
    requestDate: "2025-01-21",
  },
  {
    id: 2,
    bloodBankName: "City General Hospital",
    requestType: "Emergency Supply",
    bloodGroup: "AB-",
    units: 2,
    status: "Approved",
    requestDate: "2025-01-20",
  },
  {
    id: 3,
    bloodBankName: "Community Blood Bank",
    requestType: "Blood Units",
    bloodGroup: "A+",
    units: 3,
    status: "Denied",
    requestDate: "2025-01-19",
  },
]

const receivedRequests = [
  {
    id: 1,
    bloodBankName: "Regional Health Center",
    requestType: "Blood Units",
    bloodGroup: "B+",
    units: 4,
    status: "Pending",
    requestDate: "2025-01-21",
  },
  {
    id: 2,
    bloodBankName: "Emergency Medical Services",
    requestType: "Emergency Supply",
    bloodGroup: "O-",
    units: 6,
    status: "Pending",
    requestDate: "2025-01-21",
  },
  {
    id: 3,
    bloodBankName: "District Hospital",
    requestType: "Blood Units",
    bloodGroup: "A-",
    units: 2,
    status: "Approved",
    requestDate: "2025-01-20",
  },
]

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  "Approved": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  "Denied": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
}

export default function RequestsPage() {
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

  const handleApprove = (request: any) => {
    console.log("Approving request:", request.id)
    // Handle approve logic
  }

  const handleDeny = (request: any) => {
    console.log("Denying request:", request.id)
    // Handle deny logic
  }

  const handleDelete = (request: any, type: 'sent' | 'received') => {
    setConfirmDialog({
      open: true,
      title: "Delete Request",
      description: `Are you sure you want to delete this request? This will remove it from both sender and receiver sides. This action cannot be undone.`,
      onConfirm: () => {
        console.log("Deleting request:", request.id, "Type:", type)
        setConfirmDialog(prev => ({ ...prev, open: false }))
      }
    })
  }

  const RequestTable = ({ 
    requests, 
    type, 
    showActions = true 
  }: { 
    requests: any[], 
    type: 'sent' | 'received',
    showActions?: boolean 
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Blood Bank</TableHead>
          <TableHead>Request Type</TableHead>
          <TableHead>Blood Group</TableHead>
          <TableHead>Units</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          {showActions && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.bloodBankName}</TableCell>
            <TableCell>{request.requestType}</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-red-600 border-red-600">
                {request.bloodGroup}
              </Badge>
            </TableCell>
            <TableCell>{request.units}</TableCell>
            <TableCell>
              <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                {request.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{request.requestDate}</TableCell>
            {showActions && (
              <TableCell>
                <div className="flex items-center gap-2">
                  {type === 'received' && request.status === 'Pending' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleApprove(request)}
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeny(request)}
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(request, type)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blood Requests</h1>
        <p className="text-muted-foreground">Manage blood requests sent to and received from other blood banks</p>
      </div>

      <Tabs defaultValue="received" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received">Received Requests</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          <Card>
            <CardHeader>
              <CardTitle>Received Requests</CardTitle>
              <CardDescription>
                Requests from other blood banks that need your approval or response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RequestTable 
                requests={receivedRequests} 
                type="received" 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent">
          <Card>
            <CardHeader>
              <CardTitle>Sent Requests</CardTitle>
              <CardDescription>
                Requests you have sent to other blood banks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RequestTable 
                requests={sentRequests} 
                type="sent" 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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