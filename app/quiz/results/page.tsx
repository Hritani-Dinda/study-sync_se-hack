"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, Trophy, Share2, BarChart3 } from "lucide-react"

export default function QuizResultsPage() {
  const [activeTab, setActiveTab] = useState("summary")

  // Mock quiz results data
  const quizResults = {
    title: "Database Normalization",
    course: "Database Systems",
    score: 80,
    correctAnswers: 4,
    totalQuestions: 5,
    timeTaken: "3:45",
    rank: 2,
    totalParticipants: 24,
    earnedXP: 240,
    badge: "Quick Thinker",
    questions: [
      {
        id: 1,
        text: "Which normal form eliminates transitive dependencies?",
        yourAnswer: "c",
        correctAnswer: "c",
        isCorrect: true,
      },
      {
        id: 2,
        text: "A relation is in 1NF if and only if:",
        yourAnswer: "c",
        correctAnswer: "c",
        isCorrect: true,
      },
      {
        id: 3,
        text: "Which of the following is NOT a type of database key?",
        yourAnswer: "b",
        correctAnswer: "d",
        isCorrect: false,
      },
      {
        id: 4,
        text: "What is a superkey?",
        yourAnswer: "a",
        correctAnswer: "a",
        isCorrect: true,
      },
      {
        id: 5,
        text: "Which normal form deals with multi-valued dependencies?",
        yourAnswer: "c",
        correctAnswer: "c",
        isCorrect: true,
      },
    ],
    leaderboard: [
      { rank: 1, name: "John Smith", avatar: "JS", score: 100, timeTaken: "3:12" },
      { rank: 2, name: "You", avatar: "You", score: 80, timeTaken: "3:45" },
      { rank: 3, name: "Jane Doe", avatar: "JD", score: 80, timeTaken: "4:02" },
      { rank: 4, name: "Alex Johnson", avatar: "AJ", score: 60, timeTaken: "3:58" },
      { rank: 5, name: "Sarah Williams", avatar: "SW", score: 60, timeTaken: "4:15" },
    ],
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Quiz Results</h1>
          <p className="text-muted-foreground">
            {quizResults.title} - {quizResults.course}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Your Performance</CardTitle>
                <Badge className="bg-primary/10 text-primary">{quizResults.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col items-center justify-center">
                <div className="relative mb-4 flex h-36 w-36 items-center justify-center rounded-full border-8 border-primary/20">
                  <div
                    className="absolute inset-0 rounded-full border-8 border-primary"
                    style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - quizResults.score}%)` }}
                  ></div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">{quizResults.score}%</div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">
                        {quizResults.correctAnswers}/{quizResults.totalQuestions}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{quizResults.timeTaken}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Time</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-center space-x-1">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span className="font-semibold">
                        {quizResults.rank}/{quizResults.totalParticipants}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">XP Earned</span>
                  <span className="font-semibold text-primary">+{quizResults.earnedXP} XP</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Level 3</span>
                  <span>2,450 / 3,000 XP to Level 4</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="summary" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>How you performed in this quiz</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground">Performance chart will be displayed here</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span>Accuracy</span>
                        <span className="font-semibold">{quizResults.score}%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span>Average Time per Question</span>
                        <span className="font-semibold">45 seconds</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span>Compared to Class Average</span>
                        <span className="font-semibold text-green-500">+12%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="questions">
              <Card>
                <CardHeader>
                  <CardTitle>Question Review</CardTitle>
                  <CardDescription>Review your answers and see the correct solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {quizResults.questions.map((question, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">Question {index + 1}</h3>
                          {question.isCorrect ? (
                            <Badge className="bg-green-500/10 text-green-500">Correct</Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-500">Incorrect</Badge>
                          )}
                        </div>
                        <p className="mb-4">{question.text}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <span>Your Answer</span>
                            <div className="flex items-center space-x-2">
                              <span>Option {question.yourAnswer.toUpperCase()}</span>
                              {question.isCorrect ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </div>
                          {!question.isCorrect && (
                            <div className="flex items-center justify-between rounded-lg border border-green-500 bg-green-50 p-3 dark:bg-green-900/20">
                              <span>Correct Answer</span>
                              <div className="flex items-center space-x-2">
                                <span>Option {question.correctAnswer.toUpperCase()}</span>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top performers in this quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizResults.leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      player.name === "You" ? "bg-primary/10" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          player.rank === 1 ? "bg-amber-500 text-white" : "bg-muted"
                        }`}
                      >
                        {player.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${player.avatar}`} />
                        <AvatarFallback>{player.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-xs text-muted-foreground">{player.timeTaken}</p>
                      </div>
                    </div>
                    <div className="text-right font-semibold">{player.score}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">Review Database Keys</h3>
                  <p className="text-sm text-muted-foreground">
                    You missed a question about database keys. Review this topic to improve your understanding.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                    View Resource
                  </Button>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">Practice Quiz: Database Keys</h3>
                  <p className="text-sm text-muted-foreground">
                    Take this focused quiz to strengthen your knowledge of database keys.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                    Start Practice Quiz
                  </Button>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">Next Quiz: Database Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Continue your learning journey with the next quiz in the series.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                    Enroll in Next Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
