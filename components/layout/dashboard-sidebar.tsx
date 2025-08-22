"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  UserPlus, 
  MessageSquare, 
  UsersRound, 
  FileSpreadsheet, 
  Settings,
  Heart
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Blood Banks", href: "/dashboard/blood-banks", icon: Building },
  { name: "Donors", href: "/dashboard/donors", icon: Users },
  { name: "Patients", href: "/dashboard/patients", icon: UserPlus },
  { name: "Requests", href: "/dashboard/requests", icon: MessageSquare },
  { name: "Groups", href: "/dashboard/groups", icon: UsersRound },
  { name: "Balance Sheet", href: "/dashboard/balance-sheet", icon: FileSpreadsheet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 pt-14">
      <div className="flex-1 flex flex-col min-h-0 border-r bg-muted/20">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-4 w-4",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-primary"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}