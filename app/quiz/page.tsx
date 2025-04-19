import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Trophy, Users, BookOpen } from "lucide-react"

export default function QuizPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
          <p className="text-muted-foreground">Test your knowledge with interactive quizzes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Join Quiz Battle</Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="battles">Quiz Battles</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                title: "Database Normalization",
                course: "Database Systems",
                date: "May 12, 2:00 PM",
                duration: "45 minutes",
                questions: 20,
                points: 100,
                status: "Open",
              },
              {
                title: "Sorting Algorithms",
                course: "Data Structures and Algorithms",
                date: "May 15, 10:00 AM",
                duration: "60 minutes",
                questions: 25,
                points: 125,
                status: "Open",
              },
              {
                title: "HTML and CSS Basics",
                course: "Web Development",
                date: "May 18, 3:30 PM",
                duration: "30 minutes",
                questions: 15,
                points: 75,
                status: "Not Yet Open",
              },
            ].map((quiz, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <Badge variant={quiz.status === "Open" ? "default" : "outline"}>{quiz.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <BookOpen className="mr-1 inline-block h-4 w-4" />
                        {quiz.course}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 inline-block h-4 w-4" />
                        {quiz.date} •
                        <Clock className="mx-1 inline-block h-4 w-4" />
                        {quiz.duration}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Questions: {quiz.questions}</span>
                        <span>Points: {quiz.points}</span>
                      </div>
                      <Button className="w-full" disabled={quiz.status !== "Open"}>
                        {quiz.status === "Open" ? "Start Quiz" : "Not Available Yet"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="battles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Data Structures Challenge",
                participants: 24,
                startTime: "Today, 4:00 PM",
                duration: "30 minutes",
                status: "Enrolling",
                prize: "500 XP + Badge",
              },
              {
                title: "Algorithm Showdown",
                participants: 16,
                startTime: "Tomorrow, 2:00 PM",
                duration: "45 minutes",
                status: "Enrolling",
                prize: "750 XP + Badge",
              },
              {
                title: "Database Design Battle",
                participants: 12,
                startTime: "May 14, 3:00 PM",
                duration: "60 minutes",
                status: "Enrolling",
                prize: "1000 XP + Badge",
              },
              {
                title: "Web Dev Warrior",
                participants: 32,
                startTime: "May 16, 5:00 PM",
                duration: "40 minutes",
                status: "Coming Soon",
                prize: "600 XP + Badge",
              },
            ].map((battle, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{battle.title}</CardTitle>
                    <Badge variant={battle.status === "Enrolling" ? "default" : "outline"}>{battle.status}</Badge>
                  </div>
                  <CardDescription>
                    <Trophy className="mr-1 inline-block h-4 w-4" />
                    Prize: {battle.prize}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        <Users className="mr-1 inline-block h-4 w-4" />
                        Participants:
                      </span>
                      <span>{battle.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        <Calendar className="mr-1 inline-block h-4 w-4" />
                        Start Time:
                      </span>
                      <span>{battle.startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        <Clock className="mr-1 inline-block h-4 w-4" />
                        Duration:
                      </span>
                      <span>{battle.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={battle.status === "Enrolling" ? "default" : "outline"}
                    disabled={battle.status !== "Enrolling"}
                  >
                    {battle.status === "Enrolling" ? "Join Battle" : "Coming Soon"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                title: "Introduction to Programming",
                course: "Computer Science 101",
                date: "April 28, 2023",
                score: "85/100",
                rank: "12/45",
                status: "Passed",
              },
              {
                title: "Data Types and Variables",
                course: "Computer Science 101",
                date: "April 15, 2023",
                score: "92/100",
                rank: "5/45",
                status: "Passed",
              },
              {
                title: "Basic SQL Commands",
                course: "Database Systems",
                date: "April 10, 2023",
                score: "78/100",
                rank: "18/40",
                status: "Passed",
              },
            ].map((quiz, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          {quiz.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <BookOpen className="mr-1 inline-block h-4 w-4" />
                        {quiz.course}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="mr-1 inline-block h-4 w-4" />
                        Completed on {quiz.date}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Score: {quiz.score}</span>
                        <span>Rank: {quiz.rank}</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
