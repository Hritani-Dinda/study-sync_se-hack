"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, FileText, AlertCircle } from "lucide-react"
import { type CourseData, getCourseById } from "@/lib/course-data"
import { AssignmentCard } from "@/components/courses/assignment-card"

export default function CourseAssignmentsPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (params.id) {
      const courseData = getCourseById(params.id as string)
      setCourse(courseData)
      setLoading(false)
    }
  }, [params.id])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic
    console.log("Searching for:", searchQuery)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AlertCircle className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold">Course Not Found</h1>
          <p className="text-muted-foreground">The course you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Default assignments if none provided
  const assignments = course.assignments || [
    {
      id: "1",
      title: "Assignment 1: Fundamentals",
      dueDate: "April 20, 2023",
      status: "completed",
      grade: "95/100",
      description: "Apply the fundamental concepts covered in the first module.",
    },
    {
      id: "2",
      title: "Assignment 2: Problem Solving",
      dueDate: "May 5, 2023",
      status: "completed",
      grade: "88/100",
      description: "Solve a set of problems using the techniques learned in class.",
    },
    {
      id: "3",
      title: "Assignment 3: Data Analysis",
      dueDate: "Tomorrow, 11:59 PM",
      status: "pending",
      description: "Analyze the provided dataset and present your findings.",
    },
    {
      id: "4",
      title: "Assignment 4: Final Project",
      dueDate: "May 25, 2023",
      status: "not-started",
      description: "Create a comprehensive project that demonstrates all the skills learned in this course.",
    },
    {
      id: "5",
      title: "Assignment 5: Research Paper",
      dueDate: "June 10, 2023",
      status: "not-started",
      description: "Research a topic related to the course and write a paper on your findings.",
    },
  ]

  const filteredAssignments = assignments
    .filter((assignment) => {
      if (activeTab === "all") return true
      if (activeTab === "completed") return assignment.status === "completed"
      if (activeTab === "pending") return assignment.status === "pending"
      if (activeTab === "not-started") return assignment.status === "not-started"
      return true
    })
    .filter((assignment) => {
      if (!searchQuery) return true
      return (
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (assignment.description && assignment.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push(`/courses/${params.id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>
          <Button asChild>
            <Link href={`/courses/${params.id}/assignments/new`}>Create New Assignment</Link>
          </Button>
        </div>
      </div>

      <div className="mb-6 rounded-lg border bg-card p-4">
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assignments..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </form>
      </div>

      <Tabs defaultValue="all" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                courseId={params.id as string}
                showDetails={true}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No assignments found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No assignments matching "${searchQuery}"`
                    : `No ${activeTab !== "all" ? activeTab : ""} assignments available`}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
