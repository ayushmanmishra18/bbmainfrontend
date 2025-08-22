import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your blood bank.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Blood Banks"
          value="24"
          description="+12% from last month"
          icon="Building"
          trend={{ value: 12, label: 'Increase' }}
        />
        <StatsCard
          title="Active Donors"
          value="1,234"
          description="+8% from last month"
          icon="Users"
          trend={{ value: 8, label: 'Increase' }}
        />
        <StatsCard
          title="Blood Units Available"
          value="1,234"
          description="+5% from last month"
          icon="Droplets"
          trend={{ value: 5, label: 'Increase' }}
        />
        <StatsCard
          title="Active Requests"
          value="24"
          description="+2 today"
          icon="Activity"
          trend={{ value: 2, label: 'New today' }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates from your blood bank network</CardDescription>
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
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.bloodGroup}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}