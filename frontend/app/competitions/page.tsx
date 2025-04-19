import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function CompetitionsPage() {
  // Check the current user
  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  // Global competitions data - would typically come from a database
  const competitions = [
    {
      id: 1,
      title: "Annual Coding Challenge",
      description: "Compete with students from around the world in this prestigious coding competition.",
      startDate: "June 15, 2023",
      endDate: "June 18, 2023",
      participants: 248,
      prize: "$1,000 Scholarship",
      difficulty: "Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Coding+Challenge",
    },
    {
      id: 2,
      title: "Math Olympiad",
      description: "Test your mathematical skills against the brightest minds in academia.",
      startDate: "July 10, 2023",
      endDate: "July 11, 2023",
      participants: 156,
      prize: "$750 Scholarship",
      difficulty: "Intermediate",
      image: "/placeholder.svg?height=200&width=400&text=Math+Olympiad",
    },
    {
      id: 3,
      title: "Science Fair",
      description: "Present your innovative science projects and win recognition from industry experts.",
      startDate: "August 5, 2023",
      endDate: "August 7, 2023",
      participants: 89,
      prize: "Internship Opportunity",
      difficulty: "Beginner to Advanced",
      image: "/placeholder.svg?height=200&width=400&text=Science+Fair",
    },
    {
      id: 4,
      title: "Debate Tournament",
      description: "Sharpen your critical thinking and public speaking skills in this debate competition.",
      startDate: "September 20, 2023",
      endDate: "September 22, 2023",
      participants: 64,
      prize: "Certificate and Recognition",
      difficulty: "Intermediate",
      image: "/placeholder.svg?height=200&width=400&text=Debate+Tournament",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Global Competitions</h1>
        <p className="text-muted-foreground">
          Participate in competitions from around the world and showcase your skills
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((competition) => (
          <Card
            key={competition.id}
            className="overflow-hidden border-primary/20 hover:border-primary transition-colors"
          >
            <div
              className="aspect-video w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${competition.image})` }}
            />
            <CardHeader className="bg-primary/5">
              <div className="flex justify-between items-start">
                <CardTitle>{competition.title}</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {competition.difficulty}
                </Badge>
              </div>
              <CardDescription>{competition.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  <span>
                    {competition.startDate} - {competition.endDate}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <span>{competition.participants} participants</span>
                </div>
                <div className="flex items-center col-span-2">
                  <Trophy className="mr-2 h-4 w-4 text-primary" />
                  <span>{competition.prize}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/competitions/${competition.id}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Create Your Own Competition</CardTitle>
          <CardDescription>
            Are you a teacher or organization looking to host a competition? Create your own and invite students to
            participate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Hosting a competition is a great way to engage students and promote learning in a fun and competitive
            environment.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/teacher/competitions/create">Create Competition</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
