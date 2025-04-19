"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, Trophy, AlertCircle } from "lucide-react"
import { type CourseData, getCourseById } from "@/lib/course-data"
import { QuizCard } from "@/components/courses/quiz-card"

export default function CourseQuizzesPage() {
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

  // Default quizzes if none provided
  const quizzes = course.quizzes || [
    {
      id: "1",
      title: "Quiz 1: Basic Concepts",
      dueDate: "April 15, 2023",
      status: "completed",
      score: "90%",
      questions: 10,
      timeLimit: "15 minutes",
    },
    {
      id: "2",
      title: "Quiz 2: Intermediate Topics",
      dueDate: "May 1, 2023",
      status: "completed",
      score: "85%",
      questions: 15,
      timeLimit: "20 minutes",
    },
    {
      id: "3",
      title: "Mid-term Quiz",
      dueDate: "May 15, 2023",
      status: "upcoming",
      questions: 25,
      timeLimit: "45 minutes",
    },
    {
      id: "4",
      title: "Final Quiz",
      dueDate: "May 30, 2023",
      status: "not-started",
      questions: 30,
      timeLimit: "60 minutes",
    },
  ]

  const filteredQuizzes = quizzes
    .filter((quiz) => {
      if (activeTab === "all") return true
      if (activeTab === "completed") return quiz.status === "completed"
      if (activeTab === "upcoming") return quiz.status === "upcoming"
      if (activeTab === "not-started") return quiz.status === "not-started"
      return true
    })
    .filter((quiz) => {
      if (!searchQuery) return true
      return quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-3xl font-bold">Course Quizzes</h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border bg-card p-4">
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search quizzes..."
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
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} courseId={params.id as string} showDetails={true} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No quizzes found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No quizzes matching "${searchQuery}"`
                    : `No ${activeTab !== "all" ? activeTab : ""} quizzes available`}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
