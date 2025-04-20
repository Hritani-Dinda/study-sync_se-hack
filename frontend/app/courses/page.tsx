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
    category: "Computer Science",
    level: "Beginner",
    prerequisites: "None",
    skills: ["Programming", "Algorithms", "Problem Solving"],
    isRecommended: true,
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
    category: "Computer Science",
    level: "Intermediate",
    prerequisites: "Basic Programming",
    skills: ["Data Structures", "Algorithms", "Complexity Analysis"],
    isRecommended: true,
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
    category: "Computer Science",
    level: "Intermediate",
    prerequisites: "Basic Programming",
    skills: ["SQL", "Database Design", "Normalization"],
    isRecommended: false,
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
    category: "Web Development",
    level: "Beginner",
    prerequisites: "Basic HTML/CSS",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    isRecommended: true,
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
    category: "AI/ML",
    level: "Advanced",
    prerequisites: "Python, Linear Algebra",
    skills: ["Machine Learning", "Neural Networks", "Deep Learning"],
    isRecommended: false,
  },
  {
    id: "cs601",
    title: "Mobile App Development",
    instructor: "Prof. Steve Jobs",
    progress: 0,
    image: "/placeholder.svg?height=100&width=200&text=CS601",
    duration: "10 weeks",
    students: 950,
    badge: "New",
    description:
      "Learn to build cross-platform mobile applications using modern frameworks.",
    category: "Mobile Development",
    level: "Intermediate",
    prerequisites: "JavaScript",
    skills: ["React Native", "Mobile UI/UX", "App Deployment"],
    isRecommended: true,
  },
  {
    id: "cs701",
    title: "Cloud Computing",
    instructor: "Dr. Jeff Bezos",
    progress: 0,
    image: "/placeholder.svg?height=100&width=200&text=CS701",
    duration: "12 weeks",
    students: 820,
    badge: "New",
    description:
      "Master cloud computing concepts and services with hands-on projects.",
    category: "Cloud Computing",
    level: "Intermediate",
    prerequisites: "Basic Networking",
    skills: ["AWS", "Azure", "Cloud Architecture"],
    isRecommended: true,
  },
];

// Separate component for course card to improve readability
function CourseCard({
  course,
  onJoinCourse,
}: {
  course: (typeof coursesData)[0];
  onJoinCourse?: (courseId: string) => void;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <div className="flex items-center space-x-2">
            {course.isRecommended && (
              <Badge variant="default" className="bg-green-500">
                Recommended
              </Badge>
            )}
            <Badge variant={course.progress === 100 ? "default" : "secondary"}>
              {course.badge}
            </Badge>
          </div>
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
          {course.progress > 0 && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </>
          )}
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
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <span className="font-medium mr-2">Category:</span>
              <Badge variant="outline">{course.category}</Badge>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium mr-2">Level:</span>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            <div className="flex items-center text-sm">
              <span className="font-medium mr-2">Prerequisites:</span>
              <span className="text-muted-foreground">
                {course.prerequisites}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {course.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {course.progress === 0 ? (
          <Button
            className="w-full justify-between"
            onClick={() => onJoinCourse?.(course.id)}
          >
            Join Course
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : course.progress === 100 ? (
          <Button variant="outline" className="w-full justify-between">
            View Certificate
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full justify-between">
            Continue Learning
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
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
  const [activeTab, setActiveTab] = useState("enrolled");

  const handleJoinCourse = (courseId: string) => {
    // TODO: Implement course joining logic
    console.log(`Joining course: ${courseId}`);
    // Update the course progress to indicate enrollment
    const updatedCourses = coursesData.map((course) =>
      course.id === courseId
        ? { ...course, progress: 1, badge: "In Progress" }
        : course
    );
    // Update the courses data (in a real app, this would be an API call)
    coursesData.splice(0, coursesData.length, ...updatedCourses);
  };

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
    (course) => course.isRecommended
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

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
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
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          {enrolledCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <CourseCard course={course} />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="You haven't enrolled in any courses yet." />
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          {recommendedCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onJoinCourse={handleJoinCourse}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="No recommended courses available at the moment." />
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <CourseCard course={course} />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="You haven't completed any courses yet." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
