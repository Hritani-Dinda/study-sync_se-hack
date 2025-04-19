"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  PlusCircle,
  Users,
  XCircle,
  Bell,
  TrendingUp,
} from "lucide-react"
import type { CourseData } from "@/lib/course-data"

interface TeacherDashboardProps {
  firstName: string
  courses: CourseData[]
}

export default function TeacherDashboard({ firstName, courses }: TeacherDashboardProps) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Grade midterm exams", completed: false, dueDate: "May 15, 2023" },
    { id: 2, text: "Prepare lecture slides for next week", completed: false, dueDate: "May 12, 2023" },
    { id: 3, text: "Review student project proposals", completed: true, dueDate: "May 8, 2023" },
    { id: 4, text: "Faculty meeting", completed: false, dueDate: "May 16, 2023" },
    { id: 5, text: "Update course syllabus", completed: true, dueDate: "May 5, 2023" },
  ])
  const [newTask, setNewTask] = useState("")

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)

    const formattedDate = nextWeek.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        dueDate: formattedDate,
      },
    ])
    setNewTask("")
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {firstName}!</h1>
        <p className="text-muted-foreground">{currentDate}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-primary/10 p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            My Courses
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            To-Do List
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Students
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {courses.length > 0 ? "+1 from last semester" : "No courses yet"}
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+18 from last semester</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">4 need grading</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Quizzes</CardTitle>
                <GraduationCap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next quiz in 2 days</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>You have {tasks.filter((t) => !t.completed).length} pending tasks</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {tasks
                    .filter((task) => !task.completed)
                    .slice(0, 3)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                            className="border-primary text-primary"
                          />
                          <Label
                            htmlFor={`task-${task.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {task.text}
                          </Label>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4 text-primary" />
                          {task.dueDate}
                        </div>
                      </div>
                    ))}
                  {tasks.filter((task) => !task.completed).length > 3 && (
                    <Button
                      variant="outline"
                      className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary"
                      asChild
                    >
                      <Link href="#tasks">View All Tasks</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your courses</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">New assignment submissions</p>
                      <p className="text-sm text-muted-foreground">5 students submitted "Data Structures Project"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Student questions</p>
                      <p className="text-sm text-muted-foreground">3 new questions in "Database Systems"</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Quiz completed</p>
                      <p className="text-sm text-muted-foreground">"Algorithms Quiz 2" completed by 28 students</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks for teachers</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href="/teacher/quizzes/create">
                      <PlusCircle className="h-5 w-5 text-primary" />
                      <span>Create Quiz</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href="/teacher/assignments/create">
                      <PlusCircle className="h-5 w-5 text-primary" />
                      <span>Create Assignment</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href="/teacher/grades">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span>Grade Submissions</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href="/teacher/announcements">
                      <Bell className="h-5 w-5 text-primary" />
                      <span>Post Announcement</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href="/teacher/courses/create">
                      <PlusCircle className="h-5 w-5 text-primary" />
                      <span>Create Course</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href="/teacher/reports">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>View Reports</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle>Upcoming Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="rounded-lg border p-3 hover:bg-primary/5 transition-colors">
                    <div className="flex justify-between">
                      <div className="font-medium">Database Systems</div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        10:00 AM
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">Room 302, Engineering Building</div>
                  </div>
                  <div className="rounded-lg border p-3 hover:bg-primary/5 transition-colors">
                    <div className="flex justify-between">
                      <div className="font-medium">Data Structures</div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        1:30 PM
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">Room 201, Computer Science Building</div>
                  </div>
                  <div className="rounded-lg border p-3 hover:bg-primary/5 transition-colors">
                    <div className="flex justify-between">
                      <div className="font-medium">Office Hours</div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        3:00 PM
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">Room 405, Faculty Office</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button asChild>
              <Link href="/teacher/courses/create">Create New Course</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-primary/20">
                <div
                  className="aspect-video w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${course.image || "/placeholder.svg?height=200&width=400&text=Course"})`,
                  }}
                />
                <CardHeader className="bg-primary/5">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description?.substring(0, 100)}...</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-primary" />
                      <span>{course.students?.length || 0} students</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4 text-primary" />
                      <span>{course.assignments?.length || 0} assignments</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="mr-1 h-4 w-4 text-primary" />
                      <span>{course.quizzes?.length || 0} quizzes</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-primary" />
                      <span>{course.duration || "16 weeks"}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href={`/teacher/courses/${course.id}`}>Manage</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/teacher/courses/${course.id}/students`}>View Students</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">To-Do List</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5 hover:border-primary">
                  Filter
                </Button>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5 hover:border-primary">
                  Sort
                </Button>
              </div>
            </div>

            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle>Add New Task</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={addTask} className="flex space-x-2">
                  <Input
                    placeholder="Enter a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!newTask.trim()}>
                    Add Task
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-medium">Pending Tasks</h3>
              {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <Card key={task.id} className="border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                            className="border-primary text-primary"
                          />
                          <Label
                            htmlFor={`task-${task.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {task.text}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4 text-primary" />
                            {task.dueDate}
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                            <XCircle className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              <h3 className="font-medium mt-6">Completed Tasks</h3>
              {tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <Card key={task.id} className="bg-muted/30 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                            className="border-primary text-primary"
                          />
                          <Label
                            htmlFor={`task-${task.id}`}
                            className="text-sm font-medium leading-none line-through text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {task.text}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                            Completed
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                            <XCircle className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">My Students</h2>
            <div className="flex space-x-2">
              <Input placeholder="Search students..." className="w-64" />
              <Button>Search</Button>
            </div>
          </div>

          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>Student Roster</CardTitle>
              <CardDescription>View and manage your students across all courses</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    name: "Alex Johnson",
                    email: "alex.j@example.com",
                    course: "Database Systems",
                    grade: "A-",
                    lastActive: "Today",
                  },
                  {
                    id: 2,
                    name: "Samantha Lee",
                    email: "sam.lee@example.com",
                    course: "Data Structures",
                    grade: "B+",
                    lastActive: "Yesterday",
                  },
                  {
                    id: 3,
                    name: "Michael Chen",
                    email: "m.chen@example.com",
                    course: "Database Systems",
                    grade: "A",
                    lastActive: "2 days ago",
                  },
                  {
                    id: 4,
                    name: "Jessica Taylor",
                    email: "j.taylor@example.com",
                    course: "Web Development",
                    grade: "A-",
                    lastActive: "Today",
                  },
                  {
                    id: 5,
                    name: "David Wilson",
                    email: "d.wilson@example.com",
                    course: "Data Structures",
                    grade: "B",
                    lastActive: "3 days ago",
                  },
                ].map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm">{student.course}</p>
                        <p className="text-sm font-medium">{student.grade}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Last Active</p>
                        <p className="text-sm">{student.lastActive}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 hover:bg-primary/5 hover:border-primary"
                        asChild
                      >
                        <Link href={`/teacher/students/${student.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 248 students</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled className="border-primary/20">
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 hover:bg-primary/5 hover:border-primary"
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
