"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type LucideIcon = React.ComponentType<{
  className?: string
  size?: number | string
}>

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: string 
  trend?: {
    value: number
    label: string
  }
}

export function StatsCard({ title, value, description, icon: iconName, trend }: StatsCardProps) {
  const Icon = ({ className }: { className?: string }) => {
    const IconComponent = require(`lucide-react`)[iconName] as LucideIcon
    return <IconComponent className={className} />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          {trend && (
            <span className={cn(
              "font-medium",
              trend.value > 0 ? "text-green-600" : "text-red-600"
            )}>
              {trend.value > 0 ? "+" : ""}{trend.value}%
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}