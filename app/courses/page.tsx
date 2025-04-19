import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Clock, Users } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Browse and manage your enrolled courses</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Browse All Courses</Button>
        </div>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-8">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Introduction to Computer Science",
                instructor: "Dr. Alan Turing",
                progress: 75,
                image: "/placeholder.svg?height=100&width=200&text=CS101",
                duration: "8 weeks",
                students: 1240,
                badge: "In Progress",
              },
              {
                title: "Data Structures and Algorithms",
                instructor: "Prof. Ada Lovelace",
                progress: 45,
                image: "/placeholder.svg?height=100&width=200&text=CS201",
                duration: "10 weeks",
                students: 890,
                badge: "In Progress",
              },
              {
                title: "Database Systems",
                instructor: "Dr. Edgar Codd",
                progress: 90,
                image: "/placeholder.svg?height=100&width=200&text=CS301",
                duration: "12 weeks",
                students: 650,
                badge: "Almost Complete",
              },
              {
                title: "Web Development",
                instructor: "Prof. Tim Berners-Lee",
                progress: 30,
                image: "/placeholder.svg?height=100&width=200&text=CS401",
                duration: "8 weeks",
                students: 1120,
                badge: "In Progress",
              },
              {
                title: "Artificial Intelligence",
                instructor: "Dr. Geoffrey Hinton",
                progress: 15,
                image: "/placeholder.svg?height=100&width=200&text=CS501",
                duration: "14 weeks",
                students: 780,
                badge: "Just Started",
              },
            ].map((course, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge>{course.badge}</Badge>
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
                <CardContent className="p-4">
                  <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {course.students} students
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
                    <Button variant="outline" className="w-full justify-between">
                      Continue Learning
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Machine Learning Fundamentals",
                instructor: "Dr. Andrew Ng",
                image: "/placeholder.svg?height=100&width=200&text=ML101",
                duration: "12 weeks",
                students: 2340,
                badge: "Popular",
              },
              {
                title: "Cloud Computing",
                instructor: "Prof. Werner Vogels",
                image: "/placeholder.svg?height=100&width=200&text=CC201",
                duration: "8 weeks",
                students: 1560,
                badge: "New",
              },
              {
                title: "Mobile App Development",
                instructor: "Dr. Katie Bouman",
                image: "/placeholder.svg?height=100&width=200&text=MAD301",
                duration: "10 weeks",
                students: 980,
                badge: "Trending",
              },
            ].map((course, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="secondary">{course.badge}</Badge>
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
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {course.students} students
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Enroll Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Programming Basics",
                instructor: "Dr. Grace Hopper",
                grade: "A",
                image: "/placeholder.svg?height=100&width=200&text=PB101",
                completedDate: "January 15, 2023",
                certificate: true,
              },
              {
                title: "Computer Networks",
                instructor: "Prof. Vint Cerf",
                grade: "B+",
                image: "/placeholder.svg?height=100&width=200&text=CN201",
                completedDate: "November 10, 2022",
                certificate: true,
              },
              {
                title: "Operating Systems",
                instructor: "Dr. Linus Torvalds",
                grade: "A-",
                image: "/placeholder.svg?height=100&width=200&text=OS301",
                completedDate: "August 22, 2022",
                certificate: true,
              },
            ].map((course, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline">Completed</Badge>
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
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Completed on {course.completedDate}</div>
                    <div className="text-lg font-bold">Grade: {course.grade}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {course.certificate ? (
                    <Button variant="outline" className="w-full">
                      View Certificate
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      No Certificate
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
