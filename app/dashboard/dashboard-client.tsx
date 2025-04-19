// /app/dashboard/dashboard-client.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, Trophy, Clock, Bell } from "lucide-react"
import { DashboardCarousel } from "@/components/dashboard/dashboard-carousel"
import { CourseCard } from "@/components/dashboard/course-card"

type DashboardClientProps = {
  firstName: string
}

export default function DashboardClient({ firstName }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {firstName}! Here's what's happening with your courses.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* The rest of your dashboard code remains the same */}
      <DashboardCarousel />

      <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
        {/* ... all your existing tabs code ... */}
        {/* Copy all your existing TabsList, TabsContent components here */}
      </Tabs>
    </div>
  )
}