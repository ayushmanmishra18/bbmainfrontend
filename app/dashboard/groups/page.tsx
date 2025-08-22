"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { Users, Plus, Send, FileText, Database, UserMinus, Eye, Settings } from "lucide-react"

const groups = [
  {
    id: 1,
    name: "Mumbai Blood Banks Network",
    members: 12,
    lastActivity: "2 hours ago",
    unreadMessages: 3,
    hasDbAccess: true,
    isPoolingEnabled: true,
  },
  {
    id: 2,
    name: "Emergency Response Group",
    members: 8,
    lastActivity: "1 day ago",
    unreadMessages: 0,
    hasDbAccess: false,
    isPoolingEnabled: false,
  },
  {
    id: 3,
    name: "Regional Coordination",
    members: 15,
    lastActivity: "3 hours ago",
    unreadMessages: 5,
    hasDbAccess: true,
    isPoolingEnabled: true,
  },
]

const groupMembers = [
  { id: 1, name: "City General Blood Bank", role: "Admin", status: "Active" },
  { id: 2, name: "Metro Medical Center", role: "Member", status: "Active" },
  { id: 3, name: "Community Hospital", role: "Member", status: "Active" },
  { id: 4, name: "Regional Health Center", role: "Member", status: "Pending" },
]

const groupMessages = [
  {
    id: 1,
    sender: "City General",
    message: "We have urgent need for O+ blood units. Anyone can help?",
    timestamp: "10:30 AM",
    type: "text"
  },
  {
    id: 2,
    sender: "Metro Medical",
    message: "We can provide 5 units of O+. Please coordinate.",
    timestamp: "10:45 AM",
    type: "text"
  },
  {
    id: 3,
    sender: "Community Hospital",
    message: "Shared updated inventory report",
    timestamp: "11:15 AM",
    type: "file"
  },
]

export default function GroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<any>(groups[0])
  const [newMessage, setNewMessage] = useState("")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Inviting member:", inviteEmail)
    setInviteDialogOpen(false)
    setInviteEmail("")
  }

  const handleRemoveMember = (member: any) => {
    setConfirmDialog({
      open: true,
      title: "Remove Member",
      description: `Are you sure you want to remove ${member.name} from the group? This will remove them from both your group and their group list.`,
      onConfirm: () => {
        console.log("Removing member:", member.id)
        setConfirmDialog(prev => ({ ...prev, open: false }))
      }
    })
  }

  const togglePooling = () => {
    const updatedGroup = { ...selectedGroup, isPoolingEnabled: !selectedGroup.isPoolingEnabled }
    setSelectedGroup(updatedGroup)
    console.log("Pooling toggled:", updatedGroup.isPoolingEnabled)
  }

  const toggleDbAccess = () => {
    const updatedGroup = { ...selectedGroup, hasDbAccess: !selectedGroup.hasDbAccess }
    setSelectedGroup(updatedGroup)
    console.log("Database access toggled:", updatedGroup.hasDbAccess)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blood Bank Groups</h1>
        <p className="text-muted-foreground">Collaborate with other blood banks through groups</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Groups</CardTitle>
              <CardDescription>Blood bank networks you're part of</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedGroup?.id === group.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      <p className="text-xs opacity-75">
                        {group.members} members • {group.lastActivity}
                      </p>
                    </div>
                    {group.unreadMessages > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {group.unreadMessages}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Group Details */}
        <div className="lg:col-span-2 space-y-4">
          {selectedGroup && (
            <>
              {/* Group Header */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedGroup.name}</CardTitle>
                      <CardDescription>
                        {selectedGroup.members} members • Last active {selectedGroup.lastActivity}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Invite
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Invite Blood Bank</DialogTitle>
                            <DialogDescription>
                              Enter the email of the blood bank you want to invite to this group.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleInviteMember}>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="inviteEmail">Email Address</Label>
                                <Input
                                  id="inviteEmail"
                                  type="email"
                                  value={inviteEmail}
                                  onChange={(e) => setInviteEmail(e.target.value)}
                                  placeholder="bloodbank@example.com"
                                  required
                                />
                              </div>
                            </div>
                            <DialogFooter className="mt-4">
                              <Button type="submit">Send Invitation</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span className="text-sm">Database Access</span>
                      <Switch 
                        checked={selectedGroup.hasDbAccess} 
                        onCheckedChange={toggleDbAccess}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Blood Pooling</span>
                      <Switch 
                        checked={selectedGroup.isPoolingEnabled} 
                        onCheckedChange={togglePooling}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {groupMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={member.status === "Active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {member.status}
                          </Badge>
                          {member.status === "Active" && member.role !== "Admin" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveMember(member)}
                            >
                              <UserMinus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Group Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {groupMessages.map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {msg.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{msg.sender}</p>
                            <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-2">
                            {msg.type === "file" ? (
                              <div className="flex items-center gap-2 text-sm text-blue-600">
                                <FileText className="h-4 w-4" />
                                {msg.message}
                              </div>
                            ) : (
                              <p className="text-sm">{msg.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="min-h-[60px] resize-none"
                    />
                    <div className="flex flex-col gap-2">
                      <Button type="submit" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

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