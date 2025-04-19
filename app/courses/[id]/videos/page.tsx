"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, Video, AlertCircle } from "lucide-react"
import { type CourseData, getCourseById } from "@/lib/course-data"
import { VideoCard } from "@/components/courses/video-card"

export default function CourseVideosPage() {
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

  // Default videos if none provided
  const videos = course.videos || [
    {
      id: "1",
      title: "Introduction to the Course",
      duration: "10:15",
      thumbnail: "/placeholder.svg?height=100&width=200&text=Intro",
      watched: true,
      date: "April 10, 2023",
    },
    {
      id: "2",
      title: "Core Concepts and Principles",
      duration: "25:30",
      thumbnail: "/placeholder.svg?height=100&width=200&text=Concepts",
      watched: true,
      date: "April 12, 2023",
    },
    {
      id: "3",
      title: "Practical Applications",
      duration: "18:45",
      thumbnail: "/placeholder.svg?height=100&width=200&text=Applications",
      watched: true,
      date: "April 15, 2023",
    },
    {
      id: "4",
      title: "Advanced Techniques",
      duration: "32:20",
      thumbnail: "/placeholder.svg?height=100&width=200&text=Advanced",
      watched: false,
      date: "April 18, 2023",
    },
    {
      id: "5",
      title: "Problem Solving Strategies",
      duration: "28:15",
      thumbnail: "/placeholder.svg?height=100&width=200&text=Strategies",
      watched: false,
      date: "April 20, 2023",
    },
    {
      id: "6",
      title: "Case Studies and Examples",
      duration: "45:10",
      thumbnail: "/placeholder.svg?height=100&width=200&text=Examples",
      watched: false,
      date: "April 25, 2023",
    },
  ]

  const filteredVideos = videos
    .filter((video) => {
      if (activeTab === "all") return true
      if (activeTab === "watched") return video.watched
      if (activeTab === "unwatched") return !video.watched
      return true
    })
    .filter((video) => {
      if (!searchQuery) return true
      return video.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-3xl font-bold">Course Videos</h1>
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
              placeholder="Search videos..."
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
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="watched">Watched</TabsTrigger>
          <TabsTrigger value="unwatched">Unwatched</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => <VideoCard key={video.id} video={video} courseId={params.id as string} />)
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <Video className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No videos found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? `No videos matching "${searchQuery}"`
                        : `No ${activeTab !== "all" ? activeTab : ""} videos available`}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
