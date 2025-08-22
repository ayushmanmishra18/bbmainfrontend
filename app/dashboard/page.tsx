import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Users, UserPlus, MessageSquare } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    type: "Donor Registration",
    name: "John Smith",
    bloodGroup: "O+",
    date: "2025-01-21",
    time: "10:30 AM"
  },
  {
    id: 2,
    type: "Patient Request",
    name: "Mary Johnson",
    bloodGroup: "A-",
    date: "2025-01-21",
    time: "09:15 AM"
  },
  {
    id: 3,
    type: "Blood Bank Join",
    name: "City General Hospital",
    bloodGroup: "-",
    date: "2025-01-20",
    time: "03:45 PM"
  },
  {
    id: 4,
    type: "Donor Registration",
    name: "Robert Davis",
    bloodGroup: "B+",
    date: "2025-01-20",
    time: "02:20 PM"
  },
  {
    id: 5,
    type: "Patient Request",
    name: "Sarah Wilson",
    bloodGroup: "AB-",
    date: "2025-01-20",
    time: "11:10 AM"
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your blood bank network.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Blood Banks"
          value="127"
          description="+12 from last month"
          icon={Building}
          trend={{ value: 8.2, label: "from last month" }}
        />
        <StatsCard
          title="Active Donors"
          value="3,247"
          description="+201 from last month"
          icon={Users}
          trend={{ value: 15.3, label: "from last month" }}
        />
        <StatsCard
          title="Active Patients"
          value="892"
          description="+89 from last month"
          icon={UserPlus}
          trend={{ value: 11.7, label: "from last month" }}
        />
        <StatsCard
          title="Pending Requests"
          value="24"
          description="Need attention"
          icon={MessageSquare}
          trend={{ value: -5.2, label: "from yesterday" }}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest registrations and requests in your network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.type}</TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>
                    {activity.bloodGroup !== "-" && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                        {activity.bloodGroup}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                  <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}