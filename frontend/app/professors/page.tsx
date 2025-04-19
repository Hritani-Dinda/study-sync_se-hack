import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Mail, ExternalLink, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ProfessorsPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Professors</h2>
          <p className="text-muted-foreground">Browse our faculty members and their courses</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search professors..."
              className="w-full rounded-md pl-8 md:w-[250px] lg:w-[300px]"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">All Professors</TabsTrigger>
          <TabsTrigger value="computer-science">Computer Science</TabsTrigger>
          <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "alan-turing",
                name: "Dr. Alan Turing",
                title: "Professor of Computer Science",
                department: "Computer Science",
                courses: ["Introduction to Computer Science", "Artificial Intelligence Fundamentals"],
                expertise: ["Algorithms", "Computational Theory", "Artificial Intelligence"],
                image: "/placeholder.svg?height=150&width=150&text=AT",
                email: "alan.turing@university.edu",
                featured: true,
              },
              {
                id: "ada-lovelace",
                name: "Prof. Ada Lovelace",
                title: "Associate Professor of Computer Science",
                department: "Computer Science",
                courses: ["Data Structures and Algorithms", "Programming Paradigms"],
                expertise: ["Data Structures", "Algorithm Design", "Programming Languages"],
                image: "/placeholder.svg?height=150&width=150&text=AL",
                email: "ada.lovelace@university.edu",
                featured: true,
              },
              {
                id: "edgar-codd",
                name: "Dr. Edgar Codd",
                title: "Professor of Database Systems",
                department: "Computer Science",
                courses: ["Database Systems", "Advanced Database Design"],
                expertise: ["Relational Databases", "Data Modeling", "Query Optimization"],
                image: "/placeholder.svg?height=150&width=150&text=EC",
                email: "edgar.codd@university.edu",
              },
              {
                id: "tim-berners-lee",
                name: "Prof. Tim Berners-Lee",
                title: "Professor of Web Technologies",
                department: "Computer Science",
                courses: ["Web Development", "Internet Architecture"],
                expertise: ["Web Standards", "Internet Protocols", "Semantic Web"],
                image: "/placeholder.svg?height=150&width=150&text=TBL",
                email: "tim.bernerslee@university.edu",
              },
              {
                id: "geoffrey-hinton",
                name: "Dr. Geoffrey Hinton",
                title: "Professor of Machine Learning",
                department: "Computer Science",
                courses: ["Artificial Intelligence", "Neural Networks"],
                expertise: ["Deep Learning", "Neural Networks", "Machine Learning"],
                image: "/placeholder.svg?height=150&width=150&text=GH",
                email: "geoffrey.hinton@university.edu",
                featured: true,
              },
              {
                id: "grace-hopper",
                name: "Dr. Grace Hopper",
                title: "Professor Emeritus",
                department: "Computer Science",
                courses: ["Programming Basics", "Compiler Design"],
                expertise: ["Compilers", "Programming Languages", "Software Development"],
                image: "/placeholder.svg?height=150&width=150&text=GH",
                email: "grace.hopper@university.edu",
              },
              {
                id: "vint-cerf",
                name: "Prof. Vint Cerf",
                title: "Professor of Network Engineering",
                department: "Engineering",
                courses: ["Computer Networks", "Internet Protocols"],
                expertise: ["Network Architecture", "Internet Protocols", "Distributed Systems"],
                image: "/placeholder.svg?height=150&width=150&text=VC",
                email: "vint.cerf@university.edu",
              },
              {
                id: "linus-torvalds",
                name: "Dr. Linus Torvalds",
                title: "Adjunct Professor",
                department: "Computer Science",
                courses: ["Operating Systems", "Open Source Development"],
                expertise: ["Operating Systems", "Kernel Development", "Version Control"],
                image: "/placeholder.svg?height=150&width=150&text=LT",
                email: "linus.torvalds@university.edu",
              },
              {
                id: "andrew-ng",
                name: "Dr. Andrew Ng",
                title: "Professor of Machine Learning",
                department: "Computer Science",
                courses: ["Machine Learning Fundamentals", "Deep Learning"],
                expertise: ["Machine Learning", "Neural Networks", "AI Applications"],
                image: "/placeholder.svg?height=150&width=150&text=AN",
                email: "andrew.ng@university.edu",
              },
            ].map((professor) => (
              <Card
                key={professor.id}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{professor.name}</CardTitle>
                    {professor.featured && <Badge>Featured</Badge>}
                  </div>
                  <CardDescription>{professor.title}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={professor.image || "/placeholder.svg"} alt={professor.name} />
                      <AvatarFallback>
                        {professor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 text-center">
                      <p className="text-sm text-muted-foreground">Department: {professor.department}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {professor.expertise.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Courses:</p>
                    <ul className="space-y-1">
                      {professor.courses.map((course, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`mailto:${professor.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/professors/${professor.id}`}>
                      View Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="computer-science" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "alan-turing",
                name: "Dr. Alan Turing",
                title: "Professor of Computer Science",
                department: "Computer Science",
                courses: ["Introduction to Computer Science", "Artificial Intelligence Fundamentals"],
                expertise: ["Algorithms", "Computational Theory", "Artificial Intelligence"],
                image: "/placeholder.svg?height=150&width=150&text=AT",
                email: "alan.turing@university.edu",
                featured: true,
              },
              {
                id: "ada-lovelace",
                name: "Prof. Ada Lovelace",
                title: "Associate Professor of Computer Science",
                department: "Computer Science",
                courses: ["Data Structures and Algorithms", "Programming Paradigms"],
                expertise: ["Data Structures", "Algorithm Design", "Programming Languages"],
                image: "/placeholder.svg?height=150&width=150&text=AL",
                email: "ada.lovelace@university.edu",
                featured: true,
              },
              {
                id: "edgar-codd",
                name: "Dr. Edgar Codd",
                title: "Professor of Database Systems",
                department: "Computer Science",
                courses: ["Database Systems", "Advanced Database Design"],
                expertise: ["Relational Databases", "Data Modeling", "Query Optimization"],
                image: "/placeholder.svg?height=150&width=150&text=EC",
                email: "edgar.codd@university.edu",
              },
              {
                id: "tim-berners-lee",
                name: "Prof. Tim Berners-Lee",
                title: "Professor of Web Technologies",
                department: "Computer Science",
                courses: ["Web Development", "Internet Architecture"],
                expertise: ["Web Standards", "Internet Protocols", "Semantic Web"],
                image: "/placeholder.svg?height=150&width=150&text=TBL",
                email: "tim.bernerslee@university.edu",
              },
              {
                id: "geoffrey-hinton",
                name: "Dr. Geoffrey Hinton",
                title: "Professor of Machine Learning",
                department: "Computer Science",
                courses: ["Artificial Intelligence", "Neural Networks"],
                expertise: ["Deep Learning", "Neural Networks", "Machine Learning"],
                image: "/placeholder.svg?height=150&width=150&text=GH",
                email: "geoffrey.hinton@university.edu",
                featured: true,
              },
            ].map((professor) => (
              <Card
                key={professor.id}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{professor.name}</CardTitle>
                    {professor.featured && <Badge>Featured</Badge>}
                  </div>
                  <CardDescription>{professor.title}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={professor.image || "/placeholder.svg"} alt={professor.name} />
                      <AvatarFallback>
                        {professor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 text-center">
                      <p className="text-sm text-muted-foreground">Department: {professor.department}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {professor.expertise.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Courses:</p>
                    <ul className="space-y-1">
                      {professor.courses.map((course, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`mailto:${professor.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/professors/${professor.id}`}>
                      View Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mathematics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Mathematics professors would be listed here */}
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <p className="text-muted-foreground">No mathematics professors are currently available.</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engineering" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "vint-cerf",
                name: "Prof. Vint Cerf",
                title: "Professor of Network Engineering",
                department: "Engineering",
                courses: ["Computer Networks", "Internet Protocols"],
                expertise: ["Network Architecture", "Internet Protocols", "Distributed Systems"],
                image: "/placeholder.svg?height=150&width=150&text=VC",
                email: "vint.cerf@university.edu",
              },
            ].map((professor) => (
              <Card
                key={professor.id}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{professor.name}</CardTitle>
                    {professor.featured && <Badge>Featured</Badge>}
                  </div>
                  <CardDescription>{professor.title}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={professor.image || "/placeholder.svg"} alt={professor.name} />
                      <AvatarFallback>
                        {professor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 text-center">
                      <p className="text-sm text-muted-foreground">Department: {professor.department}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {professor.expertise.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Courses:</p>
                    <ul className="space-y-1">
                      {professor.courses.map((course, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`mailto:${professor.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/professors/${professor.id}`}>
                      View Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
