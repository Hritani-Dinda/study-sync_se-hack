import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, Trophy, Users, Globe, ArrowRight, Star } from "lucide-react"

export default function CompetitionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inter-College Competitions</h2>
          <p className="text-muted-foreground">Compete with students from other colleges and universities</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search competitions..."
              className="w-full pl-8 md:w-[250px] lg:w-[300px]"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="my-competitions">My Competitions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "1",
                title: "National Coding Championship",
                organizer: "Tech University Alliance",
                startDate: "June 15, 2023",
                endDate: "June 18, 2023",
                participants: 1250,
                category: "Programming",
                description:
                  "Showcase your coding skills in this prestigious national competition. Solve challenging problems and compete against the best programmers from colleges across the country.",
                prizes: ["$5,000 First Prize", "$2,500 Second Prize", "$1,000 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Coding+Championship",
                featured: true,
                registrationOpen: true,
              },
              {
                id: "2",
                title: "AI Innovation Challenge",
                organizer: "Future Tech Foundation",
                startDate: "July 10, 2023",
                endDate: "July 25, 2023",
                participants: 850,
                category: "Artificial Intelligence",
                description:
                  "Design and develop innovative AI solutions to real-world problems. This competition encourages creative applications of machine learning and artificial intelligence.",
                prizes: ["$3,000 First Prize", "$1,500 Second Prize", "$750 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=AI+Challenge",
                featured: true,
                registrationOpen: true,
              },
              {
                id: "3",
                title: "Data Science Hackathon",
                organizer: "Global Data Alliance",
                startDate: "June 25, 2023",
                endDate: "June 27, 2023",
                participants: 620,
                category: "Data Science",
                description:
                  "Analyze complex datasets and extract meaningful insights in this intensive 48-hour hackathon. Work with real-world data to solve pressing challenges.",
                prizes: ["$2,000 First Prize", "$1,000 Second Prize", "$500 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Data+Hackathon",
                registrationOpen: true,
              },
              {
                id: "4",
                title: "Cybersecurity Defense Competition",
                organizer: "National Security Network",
                startDate: "July 5, 2023",
                endDate: "July 6, 2023",
                participants: 480,
                category: "Cybersecurity",
                description:
                  "Defend your systems against simulated cyber attacks in this intense competition. Test your security skills and learn from industry experts.",
                prizes: ["$4,000 First Prize", "$2,000 Second Prize", "$1,000 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Cybersecurity",
                registrationOpen: true,
              },
              {
                id: "5",
                title: "Robotics Engineering Challenge",
                organizer: "International Robotics Association",
                startDate: "August 12, 2023",
                endDate: "August 14, 2023",
                participants: 350,
                category: "Robotics",
                description:
                  "Design, build, and program robots to complete specific tasks and challenges. Showcase your engineering and programming skills.",
                prizes: ["$6,000 First Prize", "$3,000 Second Prize", "$1,500 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Robotics",
                registrationOpen: false,
              },
              {
                id: "6",
                title: "Blockchain Innovation Cup",
                organizer: "Distributed Ledger Consortium",
                startDate: "July 20, 2023",
                endDate: "July 22, 2023",
                participants: 290,
                category: "Blockchain",
                description:
                  "Develop innovative blockchain applications that solve real-world problems. Explore the potential of distributed ledger technology.",
                prizes: ["$3,500 First Prize", "$1,750 Second Prize", "$750 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Blockchain",
                registrationOpen: true,
              },
            ].map((competition) => (
              <Card
                key={competition.id}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={competition.image || "/placeholder.svg"}
                    alt={competition.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-xl">{competition.title}</CardTitle>
                      <CardDescription>{competition.organizer}</CardDescription>
                    </div>
                    {competition.featured && <Badge>Featured</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{competition.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.startDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.participants} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.category}</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.prizes.length} prizes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-between">
                  <Badge variant={competition.registrationOpen ? "success" : "outline"}>
                    {competition.registrationOpen ? "Registration Open" : "Coming Soon"}
                  </Badge>
                  <Button size="sm" asChild>
                    <Link href={`/competitions/${competition.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "7",
                title: "Web Development Showdown",
                organizer: "Frontend Masters Alliance",
                startDate: "May 1, 2023",
                endDate: "May 20, 2023",
                participants: 780,
                category: "Web Development",
                description:
                  "Create innovative and responsive web applications using modern frameworks and technologies. Compete for recognition and valuable prizes.",
                prizes: ["$4,000 First Prize", "$2,000 Second Prize", "$1,000 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Web+Dev",
                progress: 65,
                daysLeft: 8,
              },
              {
                id: "8",
                title: "Mobile App Innovation Contest",
                organizer: "App Developers Association",
                startDate: "May 5, 2023",
                endDate: "May 25, 2023",
                participants: 620,
                category: "Mobile Development",
                description:
                  "Design and develop innovative mobile applications that solve real-world problems or provide unique entertainment experiences.",
                prizes: ["$3,500 First Prize", "$1,750 Second Prize", "$750 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Mobile+Apps",
                progress: 50,
                daysLeft: 13,
              },
            ].map((competition) => (
              <Card
                key={competition.id}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={competition.image || "/placeholder.svg"}
                    alt={competition.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-xl">{competition.title}</CardTitle>
                      <CardDescription>{competition.organizer}</CardDescription>
                    </div>
                    <Badge variant="warning">Ongoing</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{competition.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{competition.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${competition.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.daysLeft} days left</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.participants} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.category}</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{competition.prizes.length} prizes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    View Leaderboard
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/competitions/${competition.id}`}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "9",
                title: "Machine Learning Challenge",
                organizer: "AI Research Consortium",
                startDate: "March 10, 2023",
                endDate: "March 25, 2023",
                participants: 950,
                category: "Machine Learning",
                description:
                  "Develop machine learning models to solve complex prediction problems using provided datasets.",
                prizes: ["$5,000 First Prize", "$2,500 Second Prize", "$1,000 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=ML+Challenge",
                winners: [
                  { name: "Team Alpha", position: 1, college: "MIT" },
                  { name: "Data Wizards", position: 2, college: "Stanford University" },
                  { name: "ML Pioneers", position: 3, college: "Carnegie Mellon" },
                ],
              },
              {
                id: "10",
                title: "Game Development Jam",
                organizer: "Game Developers Guild",
                startDate: "February 15, 2023",
                endDate: "February 18, 2023",
                participants: 420,
                category: "Game Development",
                description:
                  "Create an original game in 72 hours based on a surprise theme revealed at the start of the competition.",
                prizes: ["$3,000 First Prize", "$1,500 Second Prize", "$750 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Game+Jam",
                winners: [
                  { name: "Pixel Punks", position: 1, college: "DigiPen Institute" },
                  { name: "Gamesmith", position: 2, college: "USC" },
                  { name: "Level Up", position: 3, college: "NYU" },
                ],
              },
              {
                id: "11",
                title: "IoT Innovation Challenge",
                organizer: "Connected Devices Alliance",
                startDate: "January 20, 2023",
                endDate: "February 5, 2023",
                participants: 380,
                category: "Internet of Things",
                description:
                  "Design and prototype innovative IoT solutions that address real-world challenges in smart cities, healthcare, or agriculture.",
                prizes: ["$4,000 First Prize", "$2,000 Second Prize", "$1,000 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=IoT+Challenge",
                winners: [
                  { name: "Connected Future", position: 1, college: "Georgia Tech" },
                  { name: "Smart Systems", position: 2, college: "Caltech" },
                  { name: "IoT Innovators", position: 3, college: "University of Michigan" },
                ],
              },
            ].map((competition) => (
              <Card
                key={competition.id}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={competition.image || "/placeholder.svg"}
                    alt={competition.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-xl">{competition.title}</CardTitle>
                      <CardDescription>{competition.organizer}</CardDescription>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{competition.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Winners</h4>
                    <div className="space-y-2">
                      {competition.winners.map((winner) => (
                        <div key={winner.position} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {winner.position === 1 ? (
                              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                            ) : winner.position === 2 ? (
                              <Trophy className="mr-2 h-5 w-5 text-gray-400" />
                            ) : (
                              <Trophy className="mr-2 h-5 w-5 text-amber-700" />
                            )}
                            <div>
                              <p className="font-medium">{winner.name}</p>
                              <p className="text-xs text-muted-foreground">{winner.college}</p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {winner.position === 1 ? "1st" : winner.position === 2 ? "2nd" : "3rd"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    View Results
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/competitions/${competition.id}`}>
                      Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-competitions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "7",
                title: "Web Development Showdown",
                organizer: "Frontend Masters Alliance",
                startDate: "May 1, 2023",
                endDate: "May 20, 2023",
                participants: 780,
                category: "Web Development",
                description:
                  "Create innovative and responsive web applications using modern frameworks and technologies.",
                prizes: ["$4,000 First Prize", "$2,000 Second Prize", "$1,000 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=Web+Dev",
                progress: 65,
                daysLeft: 8,
                status: "ongoing",
                teamName: "Code Crafters",
                teamMembers: 4,
              },
              {
                id: "2",
                title: "AI Innovation Challenge",
                organizer: "Future Tech Foundation",
                startDate: "July 10, 2023",
                endDate: "July 25, 2023",
                participants: 850,
                category: "Artificial Intelligence",
                description: "Design and develop innovative AI solutions to real-world problems.",
                prizes: ["$3,000 First Prize", "$1,500 Second Prize", "$750 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=AI+Challenge",
                status: "registered",
                teamName: "Neural Network Ninjas",
                teamMembers: 3,
              },
              {
                id: "9",
                title: "Machine Learning Challenge",
                organizer: "AI Research Consortium",
                startDate: "March 10, 2023",
                endDate: "March 25, 2023",
                participants: 950,
                category: "Machine Learning",
                description:
                  "Develop machine learning models to solve complex prediction problems using provided datasets.",
                prizes: ["$5,000 First Prize", "$2,500 Second Prize", "$1,000 Third Prize"],
                image: "/placeholder.svg?height=200&width=300&text=ML+Challenge",
                status: "completed",
                teamName: "Predictive Pioneers",
                teamMembers: 4,
                position: 5,
              },
            ].map((competition) => (
              <Card
                key={competition.id}
                className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={competition.image || "/placeholder.svg"}
                    alt={competition.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-xl">{competition.title}</CardTitle>
                      <CardDescription>{competition.teamName}</CardDescription>
                    </div>
                    {competition.status === "ongoing" && <Badge variant="warning">Ongoing</Badge>}
                    {competition.status === "registered" && <Badge variant="outline">Registered</Badge>}
                    {competition.status === "completed" && <Badge variant="secondary">Completed</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{competition.teamMembers} team members</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{competition.category}</span>
                    </div>
                  </div>

                  {competition.status === "ongoing" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{competition.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${competition.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{competition.daysLeft} days remaining</span>
                      </div>
                    </div>
                  )}

                  {competition.status === "registered" && (
                    <div className="text-center py-2">
                      <p className="text-sm">
                        Starting in {new Date(competition.startDate).getDate() - new Date().getDate()} days
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Team registration complete</p>
                    </div>
                  )}

                  {competition.status === "completed" && (
                    <div className="text-center py-2">
                      <div className="flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="font-medium">Ranked {competition.position}th place</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Out of {competition.participants} teams</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-between">
                  {competition.status === "ongoing" && (
                    <Button size="sm" className="w-full" asChild>
                      <Link href={`/competitions/${competition.id}`}>
                        Continue Working
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {competition.status === "registered" && (
                    <Button size="sm" className="w-full" asChild>
                      <Link href={`/competitions/${competition.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {competition.status === "completed" && (
                    <Button size="sm" className="w-full" variant="outline" asChild>
                      <Link href={`/competitions/${competition.id}`}>
                        View Results
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
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
