"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

interface ProgressChartProps {
  showLegend?: boolean
}

export function ProgressChart({ showLegend = false }: ProgressChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample data for the chart
  const progressData = [
    { name: "Week 1", CS101: 10, CS201: 5, CS301: 15, CS401: 8, CS501: 3 },
    { name: "Week 2", CS101: 25, CS201: 15, CS301: 30, CS401: 20, CS501: 10 },
    { name: "Week 3", CS101: 40, CS201: 25, CS301: 45, CS401: 30, CS501: 15 },
    { name: "Week 4", CS101: 55, CS201: 35, CS301: 60, CS401: 35, CS501: 20 },
    { name: "Week 5", CS101: 65, CS201: 45, CS301: 75, CS401: 40, CS501: 25 },
    { name: "Week 6", CS101: 75, CS201: 55, CS301: 90, CS401: 45, CS501: 30 },
    { name: "Current", CS101: 75, CS201: 45, CS301: 90, CS401: 30, CS501: 15 },
  ]

  // Sample data for assignment completion
  const assignmentData = [
    { name: "CS101", completed: 3, total: 8 },
    { name: "CS201", completed: 2, total: 6 },
    { name: "CS301", completed: 4, total: 5 },
    { name: "CS401", completed: 1, total: 4 },
    { name: "CS501", completed: 0, total: 3 },
  ]

  if (!mounted) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progressData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey="CS101"
              stroke="hsl(var(--chart-1))"
              activeDot={{ r: 8 }}
              name="Intro to CS"
            />
            <Line type="monotone" dataKey="CS201" stroke="hsl(var(--chart-2))" name="Data Structures" />
            <Line type="monotone" dataKey="CS301" stroke="hsl(var(--chart-3))" name="Database Systems" />
            <Line type="monotone" dataKey="CS401" stroke="hsl(var(--chart-4))" name="Web Development" />
            <Line type="monotone" dataKey="CS501" stroke="hsl(var(--chart-5))" name="AI" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showLegend && (
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={assignmentData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="hsl(var(--chart-1))" name="Completed" />
              <Bar dataKey="total" stackId="a" fill="hsl(var(--chart-2))" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
