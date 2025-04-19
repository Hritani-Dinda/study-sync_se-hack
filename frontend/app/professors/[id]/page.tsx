"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, ExternalLink, Clock, Users, Star, MapPin, GraduationCap } from "lucide-react"

// Mock data for professor profiles
const professors = [
  {
    id: "alan-turing",
    name: "Dr. Alan Turing",
    title: "Professor of Computer Science",
    department: "Computer Science",
    courses: [
      { id: "1", title: "Introduction to Computer Science", students: 1240, duration: "8 weeks" },
      { id: "2", title: "Artificial Intelligence Fundamentals", students: 980, duration: "10 weeks" },
    ],
    expertise: ["Algorithms", "Computational Theory", "Artificial Intelligence"],
    image: "/placeholder.svg?height=200&width=200&text=AT",
    email: "alan.turing@university.edu",
    phone: "+1 (555) 123-4567",
    office: "Computer Science Building, Room 301",
    officeHours: "Monday and Wednesday, 2:00 PM - 4:00 PM",
    bio: "Dr. Alan Turing is a renowned professor of Computer Science with over 15 years of teaching experience. His research focuses on computational theory, artificial intelligence, and algorithm design. He has published numerous papers in top-tier journals and has received multiple awards for his contributions to the field.",
    education: [
      { degree: "Ph.D. in Computer Science", institution: "Cambridge University", year: "2005" },
      { degree: "M.S. in Computer Science", institution: "Oxford University", year: "2002" },
      { degree: "B.S. in Mathematics", institution: "Imperial College London", year: "2000" },
    ],
    publications: [
      {
        title: "Advances in Computational Theory",
        journal: "Journal of Computer Science",
        year: "2018",
        link: "#",
      },
      {
        title: "Modern Approaches to Algorithm Design",
        journal: "Computational Research Quarterly",
        year: "2016",
        link: "#",
      },
      {
        title: "The Future of Artificial Intelligence",
        journal: "AI Review",
        year: "2015",
        link: "#",
      },
    ],
    awards: [
      { title: "Outstanding Faculty Award", year: "2019" },
      { title: "Excellence in Teaching", year: "2017" },
      { title: "Research Innovation Award", year: "2015" },
    ],
    rating: 4.8,
    reviews: 156,
    featured: true,
  },
  {
    id: "ada-lovelace",
    name: "Prof. Ada Lovelace",
    title: "Associate Professor of Computer Science",
    department: "Computer Science",
    courses: [
      { id: "3", title: "Data Structures and Algorithms", students: 890, duration: "10 weeks" },
      { id: "4", title: "Programming Paradigms", students: 750, duration: "8 weeks" },
    ],
    expertise: ["Data Structures", "Algorithm Design", "Programming Languages"],
    image: "/placeholder.svg?height=200&width=200&text=AL",
    email: "ada.lovelace@university.edu",
    phone: "+1 (555) 234-5678",
    office: "Computer Science Building, Room 205",
    officeHours: "Tuesday and Thursday, 1:00 PM - 3:00 PM",
    bio: "Prof. Ada Lovelace is an Associate Professor of Computer Science specializing in data structures, algorithm design, and programming languages. She has a passion for teaching and mentoring students, and her research has been instrumental in advancing the field of computer science education.",
    education: [
      { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2008" },
      { degree: "M.S. in Computer Science", institution: "MIT", year: "2005" },
      { degree: "B.S. in Computer Engineering", institution: "UC Berkeley", year: "2003" },
    ],
    publications: [
      {
        title: "Efficient Data Structures for Modern Applications",
        journal: "Journal of Algorithms",
        year: "2019",
        link: "#",
      },
      {
        title: "Comparative Analysis of Programming Paradigms",
        journal: "Programming Language Review",
        year: "2017",
        link: "#",
      },
    ],
    awards: [
      { title: "Distinguished Teaching Award", year: "2020" },
      { title: "Faculty Mentor of the Year", year: "2018" },
    ],
    rating: 4.9,
    reviews: 203,
    featured: true,
  },
  // Add more professors as needed
]

export default function ProfessorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [professor, setProfessor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const professorData = professors.find((p) => p.id === params.id)
      setProfessor(professorData)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!professor) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Professor Not Found</h1>
          <p className="text-muted-foreground">The professor you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href="/professors">Back to Professors</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push("/professors")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Professors
        </Button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/3">
            <Avatar className="h-32 w-32 md:h-48 md:w-48 transform transition-all duration-300 hover:scale-105">
              <AvatarImage src={professor.image || "/placeholder.svg"} alt={professor.name} />
              <AvatarFallback className="text-2xl">
                {professor.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{professor.name}</h1>
              <p className="text-muted-foreground">{professor.title}</p>
              <div className="flex items-center justify-center md:justify-start mt-2 space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{professor.rating}</span>
                <span className="text-muted-foreground">({professor.reviews} reviews)</span>
              </div>
              {professor.featured && <Badge className="mt-2">Featured Professor</Badge>}
            </div>

            <Card className="w-full transform transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${professor.email}`} className="text-sm text-primary hover:underline">
                      {professor.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-sm text-muted-foreground">{professor.office}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground">{professor.officeHours}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-4">
                <Button className="w-full" asChild>
                  <Link href={`mailto:${professor.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Professor
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-full transform transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-lg">Expertise</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {professor.expertise.map((skill: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3 space-y-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Biography</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{professor.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Awards & Recognition</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {professor.awards.map((award: any, i: number) => (
                        <div
                          key={i}
                          className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">{award.title}</p>
                          </div>
                          <Badge variant="outline">{award.year}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Courses Taught</CardTitle>
                    <CardDescription>Current and upcoming courses by {professor.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {professor.courses.map((course: any) => (
                        <div
                          key={course.id}
                          className="border rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                        >
                          <div className="p-4 border-b bg-muted/30">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-4 w-4" />
                                {course.duration}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="mr-1 h-4 w-4" />
                                {course.students} students
                              </div>
                            </div>
                            <Button asChild className="w-full">
                              <Link href={`/courses/${course.id}`}>View Course</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="publications" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Research Publications</CardTitle>
                    <CardDescription>Academic papers and research work</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {professor.publications.map((pub: any, i: number) => (
                        <div
                          key={i}
                          className="border rounded-lg p-4 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                        >
                          <h3 className="font-semibold">{pub.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-muted-foreground">{pub.journal}</p>
                            <Badge variant="outline">{pub.year}</Badge>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={pub.link}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Publication
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Educational Background</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="relative space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-muted">
                      {professor.education.map((edu: any, i: number) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-primary"></div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <p className="font-medium">{edu.degree}</p>
                              <Badge variant="outline">{edu.year}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
