"use client";

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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Clock,
  Users,
  Loader2,
  Search,
  Filter,
  ArrowUpDown,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

// Mock data for courses
const coursesData = [
  {
    id: "cs101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    progress: 75,
    image: "monitor.png",
    duration: "8 weeks",
    students: 1240,
    badge: "In Progress",
    description:
      "A comprehensive introduction to the fundamental concepts of computer science, including algorithms, data structures, and problem-solving techniques.",
  },
  {
    id: "cs201",
    title: "Data Structures and Algorithms",
    instructor: "Prof. Ada Lovelace",
    progress: 45,
    image: "structure.png",
    duration: "10 weeks",
    students: 890,
    badge: "In Progress",
    description:
      "Learn about fundamental data structures and algorithms, their implementation, and analysis of their efficiency.",
  },
  {
    id: "cs301",
    title: "Database Systems",
    instructor: "Dr. Edgar Codd",
    progress: 90,
    image: "database.png",
    duration: "12 weeks",
    students: 650,
    badge: "Almost Complete",
    description:
      "Study the design, implementation, and management of database systems.",
  },
  {
    id: "cs401",
    title: "Web Development",
    instructor: "Prof. Tim Berners-Lee",
    progress: 30,
    image: "code.png",
    duration: "8 weeks",
    students: 1120,
    badge: "In Progress",
    description: "Master modern web development techniques and frameworks.",
  },
  {
    id: "cs501",
    title: "Artificial Intelligence",
    instructor: "Dr. Geoffrey Hinton",
    progress: 15,
    image: "chip.png",
    duration: "14 weeks",
    students: 780,
    badge: "Just Started",
    description:
      "Explore the fundamentals of artificial intelligence and machine learning.",
  },
];

// Separate component for course card to improve readability
function CourseCard({ course }: { course: (typeof coursesData)[0] }) {
  return (
    <Link key={course.id} href={`/courses/${course.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="aspect-video w-full overflow-hidden flex items-center justify-center">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="h-[200px] w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <Badge variant={course.progress === 100 ? "default" : "secondary"}>
              {course.badge}
            </Badge>
          </div>
          <CardDescription className="flex items-center">
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage
                src={`/placeholder.svg?height=30&width=30&text=${course.instructor
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
            {course.instructor}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {course.students} students
            </div>
          </div>
          {course.description && (
            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full justify-between">
            {course.progress === 0
              ? "Start Learning"
              : course.progress === 100
              ? "View Certificate"
              : "Continue Learning"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

// Loading component
function LoadingCourses() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

// Empty state component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <AlertCircle className="h-12 w-12 text-muted-foreground" />
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  );
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("progress");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredAndSortedCourses = useMemo(() => {
    let result = coursesData.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === "progress") {
        return sortOrder === "desc"
          ? b.progress - a.progress
          : a.progress - b.progress;
      } else if (sortBy === "students") {
        return sortOrder === "desc"
          ? b.students - a.students
          : a.students - b.students;
      } else if (sortBy === "title") {
        return sortOrder === "desc"
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [searchQuery, sortBy, sortOrder]);

  const enrolledCourses = filteredAndSortedCourses.filter(
    (course) => course.progress > 0 && course.progress < 100
  );
  const recommendedCourses = filteredAndSortedCourses.filter(
    (course) => course.progress === 0
  );
  const completedCourses = filteredAndSortedCourses.filter(
    (course) => course.progress === 100
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">
            Browse and manage your enrolled courses
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Browse All Courses</Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowUpDown
              className={cn("h-4 w-4", sortOrder === "asc" ? "rotate-180" : "")}
            />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-6">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          {enrolledCourses.length === 0 ? (
            <EmptyState message="No enrolled courses found" />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          {recommendedCourses.length === 0 ? (
            <EmptyState message="No recommended courses found" />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedCourses.length === 0 ? (
            <EmptyState message="No completed courses found" />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
