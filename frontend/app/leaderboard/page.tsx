"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Filter } from "lucide-react"

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("weekly")

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
          <p className="text-muted-foreground">See how you rank against other students</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="overall" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="courses">By Course</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz Battles</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Top 3 students */}
            <Card className="bg-gradient-to-b from-silver-100 to-silver-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-300 dark:border-gray-700">
              <CardHeader className="pb-2 text-center">
                <Medal className="mx-auto h-8 w-8 text-gray-500" />
                <CardTitle className="text-xl">2nd Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="mx-auto h-16 w-16 border-2 border-gray-300">
                  <AvatarImage src="/placeholder.svg?height=50&width=50&text=JD" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-lg font-semibold">Jane Doe</h3>
                <p className="text-muted-foreground">Computer Science</p>
                <div className="mt-2 text-2xl font-bold">9,850 pts</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 border-2 border-amber-300 dark:border-amber-700">
              <CardHeader className="pb-2 text-center">
                <Trophy className="mx-auto h-8 w-8 text-amber-500" />
                <CardTitle className="text-xl">1st Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="mx-auto h-20 w-20 border-4 border-amber-300">
                  <AvatarImage src="/placeholder.svg?height=50&width=50&text=JS" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-lg font-semibold">John Smith</h3>
                <p className="text-muted-foreground">Computer Science</p>
                <div className="mt-2 text-2xl font-bold">12,450 pts</div>
                <Badge className="mt-2 bg-amber-500">Top Performer</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-2 border-orange-300 dark:border-orange-800">
              <CardHeader className="pb-2 text-center">
                <Award className="mx-auto h-8 w-8 text-orange-500" />
                <CardTitle className="text-xl">3rd Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="mx-auto h-16 w-16 border-2 border-orange-300">
                  <AvatarImage src="/placeholder.svg?height=50&width=50&text=AJ" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-lg font-semibold">Alex Johnson</h3>
                <p className="text-muted-foreground">Data Science</p>
                <div className="mt-2 text-2xl font-bold">8,720 pts</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Rankings</CardTitle>
              <CardDescription>
                {timeframe === "weekly" && "This Week's Top Performers"}
                {timeframe === "monthly" && "This Month's Top Performers"}
                {timeframe === "alltime" && "All-Time Top Performers"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    rank: 1,
                    name: "John Smith",
                    avatar: "JS",
                    department: "Computer Science",
                    points: 12450,
                    badges: ["Top Performer", "Quiz Master"],
                  },
                  {
                    rank: 2,
                    name: "Jane Doe",
                    avatar: "JD",
                    department: "Computer Science",
                    points: 9850,
                    badges: ["Rising Star"],
                  },
                  { rank: 3, name: "Alex Johnson", avatar: "AJ", department: "Data Science", points: 8720, badges: [] },
                  {
                    rank: 4,
                    name: "Sarah Williams",
                    avatar: "SW",
                    department: "Cybersecurity",
                    points: 7650,
                    badges: ["Consistent"],
                  },
                  {
                    rank: 5,
                    name: "Michael Brown",
                    avatar: "MB",
                    department: "Software Engineering",
                    points: 7200,
                    badges: [],
                  },
                  {
                    rank: 6,
                    name: "Emily Davis",
                    avatar: "ED",
                    department: "Computer Science",
                    points: 6890,
                    badges: [],
                  },
                  { rank: 7, name: "David Wilson", avatar: "DW", department: "Data Science", points: 6540, badges: [] },
                  {
                    rank: 8,
                    name: "Lisa Martinez",
                    avatar: "LM",
                    department: "Artificial Intelligence",
                    points: 6120,
                    badges: ["Newcomer"],
                  },
                  {
                    rank: 9,
                    name: "Robert Taylor",
                    avatar: "RT",
                    department: "Computer Science",
                    points: 5980,
                    badges: [],
                  },
                  {
                    rank: 10,
                    name: "Jennifer Anderson",
                    avatar: "JA",
                    department: "Web Development",
                    points: 5750,
                    badges: [],
                  },
                ].map((student) => (
                  <div key={student.rank} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-semibold">
                        {student.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${student.avatar}`} />
                        <AvatarFallback>{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-wrap gap-1">
                        {student.badges.map((badge, i) => (
                          <Badge key={i} variant="outline" className="bg-primary/10">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-right font-semibold">{student.points.toLocaleString()} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                course: "Database Systems",
                topStudent: "John Smith",
                avatar: "JS",
                averageScore: 87,
                participants: 45,
                yourRank: 8,
                yourScore: 82,
              },
              {
                course: "Data Structures and Algorithms",
                topStudent: "Jane Doe",
                avatar: "JD",
                averageScore: 82,
                participants: 38,
                yourRank: 5,
                yourScore: 85,
              },
              {
                course: "Web Development",
                topStudent: "Alex Johnson",
                avatar: "AJ",
                averageScore: 79,
                participants: 52,
                yourRank: 12,
                yourScore: 78,
              },
              {
                course: "Artificial Intelligence",
                topStudent: "Sarah Williams",
                avatar: "SW",
                averageScore: 75,
                participants: 30,
                yourRank: 15,
                yourScore: 72,
              },
            ].map((course, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{course.course}</CardTitle>
                  <CardDescription>{course.participants} students enrolled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        <span className="font-medium">Top Student:</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{course.topStudent}</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`/placeholder.svg?height=30&width=30&text=${course.avatar}`} />
                          <AvatarFallback>{course.avatar}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Average Score:</span>
                      <span>{course.averageScore}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your Rank:</span>
                      <span>
                        {course.yourRank} of {course.participants}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your Score:</span>
                      <span className="font-semibold">{course.yourScore}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Battle Champions</CardTitle>
              <CardDescription>Top performers in multiplayer quiz battles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "John Smith", avatar: "JS", wins: 28, losses: 4, winRate: "87.5%", points: 4250 },
                  {
                    rank: 2,
                    name: "Sarah Williams",
                    avatar: "SW",
                    wins: 25,
                    losses: 5,
                    winRate: "83.3%",
                    points: 3980,
                  },
                  { rank: 3, name: "Alex Johnson", avatar: "AJ", wins: 22, losses: 6, winRate: "78.6%", points: 3650 },
                  { rank: 4, name: "Jane Doe", avatar: "JD", wins: 20, losses: 8, winRate: "71.4%", points: 3420 },
                  { rank: 5, name: "Michael Brown", avatar: "MB", wins: 18, losses: 7, winRate: "72.0%", points: 3180 },
                ].map((student) => (
                  <div key={student.rank} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-semibold">
                        {student.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${student.avatar}`} />
                        <AvatarFallback>{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          W: {student.wins} / L: {student.losses}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{student.points} pts</p>
                      <p className="text-sm text-muted-foreground">Win Rate: {student.winRate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
