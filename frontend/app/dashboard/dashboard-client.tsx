// /app/dashboard/dashboard-client.tsx

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Trophy, Clock, Bell, Users } from "lucide-react";
import { DashboardCarousel } from "@/components/dashboard/dashboard-carousel";
import { CourseCard } from "@/components/dashboard/course-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { AttendanceDashboard } from "@/components/dashboard/attendance-dashboard";

type DashboardClientProps = {
  firstName: string;
  courses: {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    image: string;
  }[];
};

export default function DashboardClient({
  firstName,
  courses,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Format dates for Google Calendar URL
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  // Generate Google Calendar links for assignments/deadlines
  const getGoogleCalendarLink = (
    title: string,
    date: string,
    description = ""
  ): string => {
    // Parse date string and create start/end times
    // For simplicity, we'll assume "Tomorrow, 11:59 PM" style dates
    // In a real app, you'd want more precise date parsing
    const deadlineDate = new Date();

    if (date.includes("Tomorrow")) {
      deadlineDate.setDate(deadlineDate.getDate() + 1);
    }

    // Set to the time mentioned (or default to end of day)
    if (date.includes("11:59 PM")) {
      deadlineDate.setHours(23, 59, 0);
    }

    // Event duration (1 hour by default)
    const endDate = new Date(deadlineDate);
    endDate.setHours(endDate.getHours() + 1);

    const startFormatted = formatDate(deadlineDate);
    const endFormatted = formatDate(endDate);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(
      description
    )}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {firstName}! Here's what's happening with your
            courses.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Calendar Integration</DialogTitle>
                <DialogDescription>
                  View your schedule or add items to your calendar.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Upcoming Deadlines</h3>
                  <div className="border p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Database Assignment</p>
                        <p className="text-sm text-muted-foreground">
                          Tomorrow, 11:59 PM
                        </p>
                      </div>
                      <a
                        href={getGoogleCalendarLink(
                          "Database Assignment",
                          "Tomorrow, 11:59 PM",
                          "CS301 - Complete your assignment"
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Add to Google Calendar
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Weekly Schedule</h3>
                  <iframe
                    src="https://calendar.google.com/calendar/embed?src=YOUR_EMAIL@gmail.com&ctz=America%2FNew_York&mode=WEEK&showTitle=0&showNav=1&showTabs=1"
                    style={{ border: 0 }}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    scrolling="no"
                  ></iframe>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button asChild>
                  <a
                    href="https://calendar.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Google Calendar
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DashboardCarousel />

      <Tabs
        defaultValue="overview"
        className="space-y-8"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Courses Enrolled
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last semester
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Quizzes
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Next quiz in 2 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Study Time
                </CardTitle>
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
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>
                  Your progress across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>
                  Don't miss these important dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Database Assignment",
                      date: "Tomorrow, 11:59 PM",
                      urgent: true,
                      courseId: "cs301",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center space-x-2">
                        {item.urgent && (
                          <Badge variant="destructive" className="mr-2">
                            Urgent
                          </Badge>
                        )}
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/courses/${item.courseId}`}>View</Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                          <a
                            href={getGoogleCalendarLink(
                              item.title,
                              item.date,
                              `Work on ${item.title}`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Add to Google Calendar"
                          >
                            <Calendar className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                image={course.image}
                href={`/courses/${course.id}`}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>
                  Your academic performance across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Average Quiz Score</p>
                      <p className="text-sm text-muted-foreground">
                        Across all courses
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-primary">87%</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Attendance Rate</p>
                      <p className="text-sm text-muted-foreground">
                        Virtual sessions
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-primary">85%</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Assignment Completion</p>
                      <p className="text-sm text-muted-foreground">
                        Submission rate
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-primary">92%</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Participation</p>
                      <p className="text-sm text-muted-foreground">
                        Discussion activity
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-primary">78%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course-wise Performance</CardTitle>
                <CardDescription>
                  Your progress in individual courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{course.title}</p>
                        <span className="text-sm font-medium">
                          {course.progress}%
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <AttendanceDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
