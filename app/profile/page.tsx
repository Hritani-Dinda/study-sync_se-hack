"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  FileText,
  Trophy,
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  Pencil,
  Save,
  X,
  Upload,
  Shield,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [editing, setEditing] = useState(false)

  const userProfile = {
    name: "John Smith",
    email: "john.smith@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU12345",
    department: "Computer Science",
    year: "Junior (3rd Year)",
    gpa: "3.8/4.0",
    enrolledCourses: 5,
    completedCourses: 12,
    totalCredits: 75,
    bio: "Computer Science student with a passion for artificial intelligence and web development. Looking to expand my knowledge and skills through collaborative projects and research opportunities.",
    image: "/placeholder.svg?height=200&width=200&text=JS",
    joinDate: "September 2021",
    lastActive: "Today, 2:30 PM",
  }

  const enrolledCourses = [
    {
      id: "cs301",
      title: "Database Systems",
      instructor: "Dr. Alan Turing",
      progress: 65,
      nextDeadline: "Assignment 3: Tomorrow, 11:59 PM",
      image: "/placeholder.svg?height=100&width=200&text=DB",
    },
    {
      id: "cs401",
      title: "Artificial Intelligence",
      instructor: "Dr. Geoffrey Hinton",
      progress: 42,
      nextDeadline: "Quiz 2: May 15, 2:00 PM",
      image: "/placeholder.svg?height=100&width=200&text=AI",
    },
    {
      id: "cs201",
      title: "Data Structures and Algorithms",
      instructor: "Prof. Ada Lovelace",
      progress: 78,
      nextDeadline: "Final Project: May 25, 5:00 PM",
      image: "/placeholder.svg?height=100&width=200&text=DSA",
    },
  ]

  const achievements = [
    {
      id: "1",
      title: "Perfect Score",
      description: "Achieved 100% on a quiz or assignment",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      date: "April 15, 2023",
      count: 3,
    },
    {
      id: "2",
      title: "Course Completion",
      description: "Successfully completed a course",
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      date: "December 20, 2022",
      count: 12,
    },
    {
      id: "3",
      title: "Top Performer",
      description: "Ranked in the top 5% of a course",
      icon: <Trophy className="h-6 w-6 text-amber-500" />,
      date: "March 10, 2023",
      count: 2,
    },
    {
      id: "4",
      title: "Consistent Learner",
      description: "Logged in for 30 consecutive days",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      date: "February 5, 2023",
      count: 1,
    },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "assignment",
      title: "Submitted Assignment 2: Algorithm Analysis",
      course: "Data Structures and Algorithms",
      date: "Yesterday, 4:30 PM",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "2",
      type: "quiz",
      title: "Completed Quiz 1: Database Fundamentals",
      course: "Database Systems",
      date: "May 8, 2023, 2:15 PM",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      score: "85%",
    },
    {
      id: "3",
      type: "video",
      title: "Watched Video: Introduction to Neural Networks",
      course: "Artificial Intelligence",
      date: "May 7, 2023, 7:45 PM",
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
    },
    {
      id: "4",
      type: "forum",
      title: "Posted in Discussion: Normalization Techniques",
      course: "Database Systems",
      date: "May 5, 2023, 11:20 AM",
      icon: <MessageSquare className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "5",
      type: "enrollment",
      title: "Enrolled in Course: Artificial Intelligence",
      course: "Artificial Intelligence",
      date: "May 1, 2023, 9:00 AM",
      icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
    },
  ]

  const upcomingDeadlines = [
    {
      id: "1",
      title: "Assignment 3: Data Analysis",
      course: "Database Systems",
      dueDate: "Tomorrow, 11:59 PM",
      type: "assignment",
      urgent: true,
    },
    {
      id: "2",
      title: "Quiz 2: Neural Networks",
      course: "Artificial Intelligence",
      dueDate: "May 15, 2:00 PM",
      type: "quiz",
    },
    {
      id: "3",
      title: "Final Project Submission",
      course: "Data Structures and Algorithms",
      dueDate: "May 25, 5:00 PM",
      type: "project",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setEditing(!editing)}>
            {editing ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
          {editing && (
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40"></div>
            <div className="relative px-6">
              <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-background">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userProfile.image || "/placeholder.svg"} alt={userProfile.name} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
              <div className="pt-16">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{userProfile.name}</h3>
                    <p className="text-muted-foreground">{userProfile.department}</p>
                  </div>
                  {editing && (
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Computer Science</Badge>
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">AI</Badge>
                  <Badge variant="secondary">Data Science</Badge>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{userProfile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Student ID</p>
                      <p className="text-sm text-muted-foreground">{userProfile.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Year</p>
                      <p className="text-sm text-muted-foreground">{userProfile.year}</p>
                    </div>
                  </div>
                </div>
                <div className="my-6 border-t pt-6">
                  <h4 className="mb-2 font-medium">About</h4>
                  {editing ? (
                    <Textarea
                      defaultValue={userProfile.bio}
                      placeholder="Write a short bio about yourself..."
                      className="resize-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
                  )}
                </div>
                <div className="mb-6 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined {userProfile.joinDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last active: {userProfile.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">GPA</span>
                <span className="font-medium">{userProfile.gpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Enrolled Courses</span>
                <span className="font-medium">{userProfile.enrolledCourses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed Courses</span>
                <span className="font-medium">{userProfile.completedCourses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Credits</span>
                <span className="font-medium">{userProfile.totalCredits}</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm">
                  <span>Degree Progress</span>
                  <span>62%</span>
                </div>
                <Progress value={62} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Badges and accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {achievement.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="font-medium">{achievement.title}</p>
                      {achievement.count > 1 && (
                        <Badge variant="outline" className="ml-2">
                          x{achievement.count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">Earned on {achievement.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Your current courses and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-full md:w-auto">
                          <div className="aspect-video w-full md:w-[120px] overflow-hidden rounded-md">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <p className="text-xs text-muted-foreground">Next deadline: {course.nextDeadline}</p>
                        </div>
                        <Button asChild>
                          <Link href={`/courses/${course.id}`}>Continue</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/courses">View All Courses</Link>
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Don't miss these important dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingDeadlines.map((deadline) => (
                        <div key={deadline.id} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">{deadline.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-4 w-4" />
                              {deadline.dueDate}
                            </div>
                            <p className="text-xs text-muted-foreground">{deadline.course}</p>
                          </div>
                          {deadline.urgent && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Your academic performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Average Quiz Score</p>
                          <p className="text-sm text-muted-foreground">Across all courses</p>
                        </div>
                        <div className="text-2xl font-bold">87%</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Assignment Completion</p>
                          <p className="text-sm text-muted-foreground">Submission rate</p>
                        </div>
                        <div className="text-2xl font-bold">92%</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Attendance Rate</p>
                          <p className="text-sm text-muted-foreground">Virtual sessions</p>
                        </div>
                        <div className="text-2xl font-bold">85%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>All your enrolled and completed courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="enrolled">
                    <TabsList className="mb-4">
                      <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="saved">Saved</TabsTrigger>
                    </TabsList>
                    <TabsContent value="enrolled" className="space-y-4">
                      {enrolledCourses.map((course) => (
                        <div
                          key={course.id}
                          className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-full md:w-auto">
                            <div className="aspect-video w-full md:w-[120px] overflow-hidden rounded-md">
                              <img
                                src={course.image || "/placeholder.svg"}
                                alt={course.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                            <p className="text-xs text-muted-foreground">Next deadline: {course.nextDeadline}</p>
                          </div>
                          <Button asChild>
                            <Link href={`/courses/${course.id}`}>Continue</Link>
                          </Button>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="completed">
                      <div className="space-y-4">
                        {[
                          {
                            id: "cs101",
                            title: "Introduction to Computer Science",
                            instructor: "Dr. Alan Turing",
                            grade: "A",
                            completedDate: "December 2022",
                            image: "/placeholder.svg?height=100&width=200&text=CS101",
                          },
                          {
                            id: "math201",
                            title: "Discrete Mathematics",
                            instructor: "Dr. John Nash",
                            grade: "A-",
                            completedDate: "December 2022",
                            image: "/placeholder.svg?height=100&width=200&text=MATH",
                          },
                        ].map((course) => (
                          <div
                            key={course.id}
                            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-full md:w-auto">
                              <div className="aspect-video w-full md:w-[120px] overflow-hidden rounded-md">
                                <img
                                  src={course.image || "/placeholder.svg"}
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-1 space-y-2">
                              <div>
                                <h4 className="font-medium">{course.title}</h4>
                                <p className="text-sm text-muted-foreground">{course.instructor}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">Grade: {course.grade}</Badge>
                                <span className="text-sm text-muted-foreground">Completed: {course.completedDate}</span>
                              </div>
                            </div>
                            <Button variant="outline" asChild>
                              <Link href={`/courses/${course.id}`}>Review</Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="saved">
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No Saved Courses</h3>
                        <p className="text-muted-foreground max-w-md">
                          You haven't saved any courses yet. Browse the course catalog and save courses you're
                          interested in for later.
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/courses">Browse Courses</Link>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {activity.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{activity.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <BookOpen className="mr-1 h-4 w-4" />
                            {activity.course}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {activity.date}
                          </div>
                          {activity.score && (
                            <div className="flex items-center text-sm">
                              <Badge variant="outline" className="mr-1">
                                Score: {activity.score}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                  <CardDescription>Your learning habits and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Hours Spent This Week</span>
                        <span>12.5 hours</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "62%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">62% of your weekly goal (20 hours)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Most Active Day</p>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <span>Wednesday</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Most Active Time</p>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <span>7:00 PM - 9:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userProfile.name} disabled={!editing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={userProfile.email} disabled={!editing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={userProfile.phone} disabled={!editing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={userProfile.department} disabled={!editing} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Assignment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Receive reminders about upcoming assignments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Quiz Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified about upcoming quizzes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Course Announcements</Label>
                      <p className="text-sm text-muted-foreground">Receive updates from your instructors</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Public
                      </Button>
                      <Button variant="outline" size="sm">
                        <EyeOff className="mr-2 h-4 w-4" />
                        Private
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" disabled={!editing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" disabled={!editing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" disabled={!editing} />
                  </div>
                  <Button variant="outline" className="w-full" disabled={!editing}>
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border border-destructive/50 p-4">
                    <div className="flex flex-col space-y-2">
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Once you delete your account, there is no going back. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm" className="mt-2 w-full sm:w-auto">
                        <LogOut className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function MessageSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
