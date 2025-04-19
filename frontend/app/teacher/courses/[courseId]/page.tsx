"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, GraduationCap, Users, BookOpen, Calendar, Video } from "lucide-react"
import { GMeetScheduler } from "./components/gmeet-scheduler"
import { MeetingsList } from "./components/meetings-list"

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const [meetings, setMeetings] = useState<Array<{
    id: string
    title: string
    date: Date
    duration: number
    description: string
    attendees: string[]
    meetLink: string
  }>>([])

  const handleScheduleMeeting = async (meeting: {
    title: string
    date: Date
    duration: number
    description: string
    attendees: string[]
  }) => {
    // TODO: Replace with actual Google Meet API call
    const meetLink = "https://meet.google.com/abc-defg-hij" // This would come from the API

    setMeetings([
      ...meetings,
      {
        id: Date.now().toString(),
        ...meeting,
        meetLink,
      },
    ])

    // TODO: Send notifications to attendees
    // This would be handled by your backend
  }

  const handleDeleteMeeting = (id: string) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== id))
  }

  // TODO: Replace with actual SQL query to fetch course data
  const course = {
    id: params.courseId,
    title: "Sample Course",
    description: "This is a sample course description",
    students: 0,
    assignments: 0,
    quizzes: 0,
    duration: "16 weeks"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <Button>Edit Course</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.students}</div>
                <p className="text-xs text-muted-foreground">Enrolled students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.assignments}</div>
                <p className="text-xs text-muted-foreground">Total assignments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.quizzes}</div>
                <p className="text-xs text-muted-foreground">Total quizzes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Duration</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.duration}</div>
                <p className="text-xs text-muted-foreground">Course length</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
              <CardDescription>Detailed information about the course</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {/* TODO: Replace with actual course description from database */}
                This is a placeholder for the course description. In the future, this will be populated with data from the database.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Manage course assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with actual assignments list from database */}
              <p className="text-muted-foreground">No assignments yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes">
          <Card>
            <CardHeader>
              <CardTitle>Quizzes</CardTitle>
              <CardDescription>Manage course quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with actual quizzes list from database */}
              <p className="text-muted-foreground">No quizzes yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with actual students list from database */}
              <p className="text-muted-foreground">No students enrolled yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Course schedule and important dates</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with actual schedule from database */}
              <p className="text-muted-foreground">No schedule set yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          <GMeetScheduler courseId={course.id} onSchedule={handleScheduleMeeting} />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Scheduled Meetings</h2>
              <Button variant="outline" asChild>
                <a
                  href={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
                    "your-calendar-id@group.calendar.google.com"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Calendar
                </a>
              </Button>
            </div>
            <MeetingsList meetings={meetings} onDelete={handleDeleteMeeting} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 