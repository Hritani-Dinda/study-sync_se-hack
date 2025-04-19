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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John! Here's what's happening with your courses.</p>
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

      <DashboardCarousel />

      <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="quizzes">Upcoming Quizzes</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+1 from last semester</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Quizzes</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next quiz in 2 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5h</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Completed Quiz: Introduction to Data Structures
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? "Today" : i === 2 ? "Yesterday" : "3 days ago"}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">{90 - i * 5}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Don't miss these important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Database Assignment", date: "Tomorrow, 11:59 PM", urgent: true },
                    { title: "Algorithm Quiz", date: "May 15, 2:00 PM", urgent: false },
                    { title: "Group Project Submission", date: "May 20, 5:00 PM", urgent: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      {item.urgent && (
                        <Badge variant="destructive" className="ml-auto">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="Introduction to Computer Science"
              instructor="Dr. Alan Turing"
              progress={75}
              image="/placeholder.svg?height=100&width=200&text=CS101"
              href="/courses/cs101"
            />
            <CourseCard
              title="Data Structures and Algorithms"
              instructor="Prof. Ada Lovelace"
              progress={45}
              image="/placeholder.svg?height=100&width=200&text=CS201"
              href="/courses/cs201"
            />
            <CourseCard
              title="Database Systems"
              instructor="Dr. Edgar Codd"
              progress={90}
              image="/placeholder.svg?height=100&width=200&text=CS301"
              href="/courses/cs301"
            />
            <CourseCard
              title="Web Development"
              instructor="Prof. Tim Berners-Lee"
              progress={30}
              image="/placeholder.svg?height=100&width=200&text=CS401"
              href="/courses/cs401"
            />
            <CourseCard
              title="Artificial Intelligence"
              instructor="Dr. Geoffrey Hinton"
              progress={15}
              image="/placeholder.svg?height=100&width=200&text=CS501"
              href="/courses/cs501"
            />
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                title: "Database Normalization",
                course: "Database Systems",
                date: "May 12, 2:00 PM",
                duration: "45 minutes",
                questions: 20,
                points: 100,
              },
              {
                title: "Sorting Algorithms",
                course: "Data Structures and Algorithms",
                date: "May 15, 10:00 AM",
                duration: "60 minutes",
                questions: 25,
                points: 125,
              },
              {
                title: "HTML and CSS Basics",
                course: "Web Development",
                date: "May 18, 3:30 PM",
                duration: "30 minutes",
                questions: 15,
                points: 75,
              },
            ].map((quiz, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">{quiz.course}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {quiz.date} • {quiz.duration}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Questions: {quiz.questions}</span>
                        <span>Points: {quiz.points}</span>
                      </div>
                      <Button className="w-full">Prepare for Quiz</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your academic performance across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Performance chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Your progress in each course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { course: "Computer Science", score: 92 },
                    { course: "Data Structures", score: 78 },
                    { course: "Database Systems", score: 85 },
                    { course: "Web Development", score: 65 },
                    { course: "Artificial Intelligence", score: 72 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.course}</span>
                        <span className="text-sm font-medium">{item.score}%</span>
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
