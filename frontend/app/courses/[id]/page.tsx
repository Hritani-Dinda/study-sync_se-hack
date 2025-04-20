"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Users, Calendar, CheckCircle2, AlertCircle, ArrowLeft, Lock, Unlock } from "lucide-react"
import { type CourseData, getCourseById } from "@/lib/course-data"
import { RecentActivityFeed } from "@/components/courses/recent-activity-feed"
import { AssignmentCard } from "@/components/courses/assignment-card"
import { VideoCard } from "@/components/courses/video-card"
import { QuizCard } from "@/components/courses/quiz-card"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (params!.id) {
      const courseData = getCourseById(params!.id as string)
      setCourse(courseData)
      setLoading(false)
    }
  }, [params!.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-8">
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

  // Mock data for sequential content
  const modules = [
    {
      id: "module1",
      title: "Module 1: Introduction",
      description: "Get started with the fundamentals",
      progress: 100,
      unlocked: true,
      completed: true,
      content: [
        { id: "video1", type: "video", title: "Course Introduction", completed: true, unlocked: true },
        { id: "quiz1", type: "quiz", title: "Introduction Quiz", completed: true, unlocked: true },
        { id: "assignment1", type: "assignment", title: "Getting Started Assignment", completed: true, unlocked: true },
      ],
    },
    {
      id: "module2",
      title: "Module 2: Core Concepts",
      description: "Learn the essential concepts and principles",
      progress: 75,
      unlocked: true,
      completed: false,
      content: [
        { id: "video2", type: "video", title: "Core Principles", completed: true, unlocked: true },
        { id: "video3", type: "video", title: "Advanced Techniques", completed: true, unlocked: true },
        { id: "quiz2", type: "quiz", title: "Core Concepts Quiz", completed: false, unlocked: true },
        { id: "assignment2", type: "assignment", title: "Practical Application", completed: false, unlocked: true },
      ],
    },
    {
      id: "module3",
      title: "Module 3: Advanced Topics",
      description: "Explore advanced topics and specialized techniques",
      progress: 0,
      unlocked: false,
      completed: false,
      content: [
        { id: "video4", type: "video", title: "Advanced Applications", completed: false, unlocked: false },
        { id: "quiz3", type: "quiz", title: "Advanced Topics Quiz", completed: false, unlocked: false },
        { id: "assignment3", type: "assignment", title: "Final Project", completed: false, unlocked: false },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push("/courses")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground flex items-center mt-1">
              <BookOpen className="mr-2 h-4 w-4" />
              {course.instructor}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={course.progress >= 90 ? "secondary" : course.progress >= 50 ? "outline" : "default"}>
              {course.progress >= 90 ? "Almost Complete" : course.progress >= 50 ? "In Progress" : "Just Started"}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              {course.students} students
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {course.description ||
                      "This comprehensive course covers all the essential concepts and practical applications in the field. Through a combination of lectures, hands-on exercises, and real-world projects, you'll gain the skills needed to excel in this subject area."}
                  </p>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold">What you'll learn</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {course.learningOutcomes?.map((outcome, index) => <li key={index}>{outcome}</li>) || (
                        <>
                          <li>Understand fundamental principles and theories in the subject</li>
                          <li>Apply concepts to solve real-world problems</li>
                          <li>Develop critical thinking and analytical skills</li>
                          <li>Master essential tools and technologies used in the field</li>
                          <li>Create portfolio-worthy projects to showcase your abilities</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>Track your course completion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Videos Watched</span>
                          <span>
                            {course.videosWatched || 5}/{course.totalVideos || 12}
                          </span>
                        </div>
                        <Progress
                          value={((course.videosWatched || 5) / (course.totalVideos || 12)) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Assignments Completed</span>
                          <span>
                            {course.assignmentsCompleted || 3}/{course.totalAssignments || 8}
                          </span>
                        </div>
                        <Progress
                          value={((course.assignmentsCompleted || 3) / (course.totalAssignments || 8)) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Quizzes Passed</span>
                          <span>
                            {course.quizzesPassed || 2}/{course.totalQuizzes || 5}
                          </span>
                        </div>
                        <Progress
                          value={((course.quizzesPassed || 2) / (course.totalQuizzes || 5)) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Don't miss these important dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.deadlines?.map((deadline, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">{deadline.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-4 w-4" />
                              {deadline.date}
                            </div>
                          </div>
                          {deadline.urgent && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                      )) || (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="font-medium">Assignment 3: Data Analysis</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                Tomorrow, 11:59 PM
                              </div>
                            </div>
                            <Badge variant="destructive">Urgent</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="font-medium">Mid-term Quiz</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                May 15, 2:00 PM
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="font-medium">Group Project Submission</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                May 20, 5:00 PM
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivityFeed courseId={params!.id as string} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modules" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Modules</CardTitle>
                  <CardDescription>Complete modules sequentially to progress through the course</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    {modules.map((module, index) => (
                      <div
                        key={module.id}
                        className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                          module.unlocked
                            ? "hover:shadow-md hover:-translate-y-1"
                            : "opacity-75 bg-muted/30 cursor-not-allowed"
                        }`}
                      >
                        <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center">
                              {module.unlocked ? (
                                <Unlock className="h-4 w-4 mr-2 text-green-500" />
                              ) : (
                                <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                              )}
                              {module.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            {module.completed && <Badge variant="outline">Completed</Badge>}
                            {!module.completed && module.unlocked && <Badge variant="outline">In Progress</Badge>}
                            {!module.unlocked && <Badge variant="outline">Locked</Badge>}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                          <div className="space-y-3">
                            {module.content.map((item) => (
                              <div
                                key={item.id}
                                className={`flex justify-between items-center p-3 rounded-md border ${
                                  item.unlocked
                                    ? "hover:bg-muted/50 cursor-pointer"
                                    : "opacity-75 bg-muted/30 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-center">
                                  {item.type === "video" && (
                                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                  )}
                                  {item.type === "quiz" && (
                                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3">
                                      <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                  )}
                                  {item.type === "assignment" && (
                                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mr-3">
                                      <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                                  </div>
                                </div>
                                <div>
                                  {item.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                  {!item.completed && item.unlocked && <Badge variant="outline">Not Completed</Badge>}
                                  {!item.unlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                                </div>
                              </div>
                            ))}
                          </div>
                          {module.unlocked && (
                            <Button className="w-full mt-4">
                              {module.completed ? "Review Module" : "Continue Module"}
                            </Button>
                          )}
                          {!module.unlocked && (
                            <Button disabled className="w-full mt-4">
                              Complete Previous Module to Unlock
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Videos</CardTitle>
                  <CardDescription>Watch lectures and tutorials for this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.videos?.map((video, index) => (
                      <VideoCard key={index} video={video} courseId={params!.id as string} />
                    )) || (
                      <>
                        <VideoCard
                          video={{
                            id: "1",
                            title: "Introduction to the Course",
                            duration: "10:15",
                            thumbnail: "/placeholder.svg?height=100&width=200&text=Intro",
                            watched: true,
                            date: "April 10, 2023",
                          }}
                          courseId={params!.id as string}
                        />
                        <VideoCard
                          video={{
                            id: "2",
                            title: "Core Concepts and Principles",
                            duration: "25:30",
                            thumbnail: "/placeholder.svg?height=100&width=200&text=Concepts",
                            watched: true,
                            date: "April 12, 2023",
                          }}
                          courseId={params!.id as string}
                        />
                        <VideoCard
                          video={{
                            id: "3",
                            title: "Practical Applications",
                            duration: "18:45",
                            thumbnail: "/placeholder.svg?height=100&width=200&text=Applications",
                            watched: true,
                            date: "April 15, 2023",
                          }}
                          courseId={params!.id as string}
                        />
                        <VideoCard
                          video={{
                            id: "4",
                            title: "Advanced Techniques",
                            duration: "32:20",
                            thumbnail: "/placeholder.svg?height=100&width=200&text=Advanced",
                            watched: false,
                            date: "April 18, 2023",
                          }}
                          courseId={params!.id as string}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${params!.id}/videos`}>View All Videos</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Assignments</CardTitle>
                  <CardDescription>Complete these assignments to progress in the course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.assignments?.map((assignment, index) => (
                      <AssignmentCard key={index} assignment={assignment} courseId={params!.id as string} />
                    )) || (
                      <>
                        <AssignmentCard
                          assignment={{
                            id: "1",
                            title: "Assignment 1: Fundamentals",
                            dueDate: "April 20, 2023",
                            status: "completed",
                            grade: "95/100",
                            description: "Apply the fundamental concepts covered in the first module.",
                          }}
                          courseId={params!.id as string}
                        />
                        <AssignmentCard
                          assignment={{
                            id: "2",
                            title: "Assignment 2: Problem Solving",
                            dueDate: "May 5, 2023",
                            status: "completed",
                            grade: "88/100",
                            description: "Solve a set of problems using the techniques learned in class.",
                          }}
                          courseId={params!.id as string}
                        />
                        <AssignmentCard
                          assignment={{
                            id: "3",
                            title: "Assignment 3: Data Analysis",
                            dueDate: "Tomorrow, 11:59 PM",
                            status: "pending",
                            description: "Analyze the provided dataset and present your findings.",
                          }}
                          courseId={params!.id as string}
                        />
                        <AssignmentCard
                          assignment={{
                            id: "4",
                            title: "Assignment 4: Final Project",
                            dueDate: "May 25, 2023",
                            status: "not-started",
                            description:
                              "Create a comprehensive project that demonstrates all the skills learned in this course.",
                          }}
                          courseId={params!.id as string}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${params!.id}/assignments`}>View All Assignments</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Quizzes</CardTitle>
                  <CardDescription>Test your knowledge with these quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.quizzes?.map((quiz, index) => (
                      <QuizCard key={index} quiz={quiz} courseId={params!.id as string} />
                    )) || (
                      <>
                        <QuizCard
                          quiz={{
                            id: "1",
                            title: "Quiz 1: Basic Concepts",
                            dueDate: "April 15, 2023",
                            status: "completed",
                            score: "90%",
                            questions: 10,
                            timeLimit: "15 minutes",
                          }}
                          courseId={params!.id as string}
                        />
                        <QuizCard
                          quiz={{
                            id: "2",
                            title: "Quiz 2: Intermediate Topics",
                            dueDate: "May 1, 2023",
                            status: "completed",
                            score: "85%",
                            questions: 15,
                            timeLimit: "20 minutes",
                          }}
                          courseId={params!.id as string}
                        />
                        <QuizCard
                          quiz={{
                            id: "3",
                            title: "Mid-term Quiz",
                            dueDate: "May 15, 2023",
                            status: "upcoming",
                            questions: 25,
                            timeLimit: "45 minutes",
                          }}
                          courseId={params!.id as string}
                        />
                        <QuizCard
                          quiz={{
                            id: "4",
                            title: "Final Quiz",
                            dueDate: "May 30, 2023",
                            status: "not-started",
                            questions: 30,
                            timeLimit: "60 minutes",
                          }}
                          courseId={params!.id as string}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${params!.id}/quizzes`}>View All Quizzes</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-md flex items-center justify-center">
                  <img
                    src={course.image || "/placeholder.svg?height=200&width=400&text=Course+Image"}
                    alt={course.title}
                    className="max-h-[200px] max-w-[90%] object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Instructor:</span>
                    <Link href={`/professors/alan-turing`} className="font-medium hover:text-primary">
                      {course.instructor}
                    </Link>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">{course.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium">{course.level || "Intermediate"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="font-medium">{course.lastUpdated || "April 2023"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${course.progress * 2.51} 251.2`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{course.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    <span>{course.videosWatched || 5} videos watched</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    <span>{course.assignmentsCompleted || 3} assignments completed</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    <span>{course.quizzesPassed || 2} quizzes passed</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/courses/${params!.id}/modules/module1`}>Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`/placeholder.svg?height=50&width=50&text=${course.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}`}
                  />
                  <AvatarFallback>
                    {course.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/professors/alan-turing`} className="font-medium hover:text-primary">
                    {course.instructor}
                  </Link>
                  <p className="text-sm text-muted-foreground">{course.instructorTitle || "Professor"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {course.instructorBio ||
                  "An experienced educator with expertise in this field. Has taught thousands of students and brings real-world experience to the classroom."}
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                <Link href={`/professors/alan-turing`}>View Professor Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
