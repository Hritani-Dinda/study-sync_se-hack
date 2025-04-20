"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  BarChart3,
  Target,
  Award,
  Bookmark,
  MessageSquare,
  Bell,
  Settings,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [editing, setEditing] = useState(false);

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
  };

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
  ];

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
  ];

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
  ];

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
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
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

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40"></div>
            <div className="relative px-6">
              <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-background">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userProfile.image} alt={userProfile.name} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
              <div className="pt-16">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{userProfile.name}</h3>
                    <p className="text-muted-foreground">
                      {userProfile.department}
                    </p>
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
                      <p className="text-sm text-muted-foreground">
                        {userProfile.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Student ID</p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.studentId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Year</p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.year}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="mb-2 font-medium">About</h4>
                  {editing ? (
                    <Textarea
                      defaultValue={userProfile.bio}
                      placeholder="Write a short bio about yourself..."
                      className="resize-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {userProfile.bio}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Joined {userProfile.joinDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Last active: {userProfile.lastActive}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">GPA</span>
                    <span className="font-medium">{userProfile.gpa}</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Credits
                    </span>
                    <span className="font-medium">
                      {userProfile.totalCredits}
                    </span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Enrolled
                    </span>
                    <span className="font-medium">
                      {userProfile.enrolledCourses}
                    </span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Completed
                    </span>
                    <span className="font-medium">
                      {userProfile.completedCourses}
                    </span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Performance Summary</CardTitle>
                  <CardDescription>
                    Your academic performance across all courses
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Average Quiz Score</p>
                          <p className="text-sm text-muted-foreground">
                            Across all courses
                          </p>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          87%
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Assignment Completion</p>
                          <p className="text-sm text-muted-foreground">
                            Submission rate
                          </p>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          92%
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Attendance Rate</p>
                          <p className="text-sm text-muted-foreground">
                            Virtual sessions
                          </p>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          85%
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Participation</p>
                          <p className="text-sm text-muted-foreground">
                            Discussion activity
                          </p>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          78%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                  <CardDescription>
                    Your enrolled courses and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 overflow-hidden rounded-md">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {course.instructor}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/courses/${course.id}`}>
                              View Course
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Your badges and accomplishments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start space-x-4 rounded-lg border p-4"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
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
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Earned on {achievement.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Achievements
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
