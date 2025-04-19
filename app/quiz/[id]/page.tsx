"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(5).fill(null))
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [opponents, setOpponents] = useState([
    { name: "Jane Doe", avatar: "JD", score: 0, answered: 0 },
    { name: "Alex Johnson", avatar: "AJ", score: 0, answered: 0 },
    { name: "Sarah Williams", avatar: "SW", score: 0, answered: 0 },
  ])

  // Mock quiz data
  const quiz = {
    title: "Database Normalization",
    course: "Database Systems",
    questions: [
      {
        id: 1,
        text: "Which normal form eliminates transitive dependencies?",
        options: [
          { id: "a", text: "First Normal Form (1NF)" },
          { id: "b", text: "Second Normal Form (2NF)" },
          { id: "c", text: "Third Normal Form (3NF)" },
          { id: "d", text: "Boyce-Codd Normal Form (BCNF)" },
        ],
        correctAnswer: "c",
      },
      {
        id: 2,
        text: "A relation is in 1NF if and only if:",
        options: [
          { id: "a", text: "It has no partial dependencies" },
          { id: "b", text: "It has no transitive dependencies" },
          { id: "c", text: "All its attributes are atomic" },
          { id: "d", text: "It has no multi-valued dependencies" },
        ],
        correctAnswer: "c",
      },
      {
        id: 3,
        text: "Which of the following is NOT a type of database key?",
        options: [
          { id: "a", text: "Primary Key" },
          { id: "b", text: "Foreign Key" },
          { id: "c", text: "Composite Key" },
          { id: "d", text: "Reference Key" },
        ],
        correctAnswer: "d",
      },
      {
        id: 4,
        text: "What is a superkey?",
        options: [
          { id: "a", text: "A key that uniquely identifies each record in a table" },
          { id: "b", text: "A key that contains no redundant attributes" },
          { id: "c", text: "A key that references another table" },
          { id: "d", text: "A key that consists of multiple attributes" },
        ],
        correctAnswer: "a",
      },
      {
        id: 5,
        text: "Which normal form deals with multi-valued dependencies?",
        options: [
          { id: "a", text: "3NF" },
          { id: "b", text: "BCNF" },
          { id: "c", text: "4NF" },
          { id: "d", text: "5NF" },
        ],
        correctAnswer: "c",
      },
    ],
  }

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !quizSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, quizSubmitted])

  // Simulate opponent progress
  useEffect(() => {
    if (quizSubmitted) return

    const interval = setInterval(() => {
      setOpponents((prev) =>
        prev.map((opponent) => {
          // Randomly decide if opponent answers a question
          if (Math.random() > 0.7 && opponent.answered < quiz.questions.length) {
            const correct = Math.random() > 0.3 // 70% chance of correct answer
            return {
              ...opponent,
              answered: opponent.answered + 1,
              score: correct ? opponent.score + 20 : opponent.score,
            }
          }
          return opponent
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [quizSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
      setShowFeedback(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setShowFeedback(false)
    }
  }

  const handleSubmit = () => {
    setQuizSubmitted(true)
    // Calculate score and show results
    setTimeout(() => {
      router.push("/quiz/results")
    }, 3000)
  }

  const handleCheckAnswer = () => {
    setShowFeedback(true)
  }

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <p className="text-muted-foreground">{quiz.course}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <Button variant="outline" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </CardTitle>
                <Badge variant="outline">
                  {showFeedback && selectedAnswer === quiz.questions[currentQuestion].correctAnswer
                    ? "Correct"
                    : showFeedback
                      ? "Incorrect"
                      : "20 Points"}
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-lg font-medium">{quiz.questions[currentQuestion].text}</p>
                <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect} className="space-y-3">
                  {quiz.questions[currentQuestion].options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                        showFeedback && option.id === quiz.questions[currentQuestion].correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : showFeedback &&
                              selectedAnswer === option.id &&
                              option.id !== quiz.questions[currentQuestion].correctAnswer
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "hover:bg-muted"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} disabled={showFeedback} />
                      <Label htmlFor={option.id} className="w-full cursor-pointer">
                        {option.text}
                      </Label>
                      {showFeedback && option.id === quiz.questions[currentQuestion].correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {showFeedback &&
                        selectedAnswer === option.id &&
                        option.id !== quiz.questions[currentQuestion].correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <div className="space-x-2">
                {!showFeedback && selectedAnswer && <Button onClick={handleCheckAnswer}>Check Answer</Button>}
                {(showFeedback || !selectedAnswer) && (
                  <Button onClick={handleNext} disabled={currentQuestion === quiz.questions.length - 1}>
                    Next
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : answers[index] ? "outline" : "ghost"}
                className={`h-10 w-10 ${answers[index] ? "border-primary bg-primary/10 text-primary" : ""}`}
                onClick={() => {
                  setCurrentQuestion(index)
                  setSelectedAnswer(answers[index])
                  setShowFeedback(false)
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Leaderboard</CardTitle>
              <CardDescription>See how you compare to others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-primary/10 p-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">You</p>
                      <p className="text-xs">{answers.filter(Boolean).length} answered</p>
                    </div>
                  </div>
                  <div className="text-right font-semibold">
                    {answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length * 20} pts
                  </div>
                </div>

                {opponents.map((opponent, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {index + 1 === 0 ? 1 : index + 1 === 1 ? 3 : 4}
                      </div>
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${opponent.avatar}`} />
                        <AvatarFallback>{opponent.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{opponent.name}</p>
                        <p className="text-xs">{opponent.answered} answered</p>
                      </div>
                    </div>
                    <div className="text-right font-semibold">{opponent.score} pts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quiz Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span>{quiz.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Answered:</span>
                  <span>
                    {answers.filter(Boolean).length} of {quiz.questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Left:</span>
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {quizSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Quiz Submitted!</CardTitle>
              <CardDescription className="text-center">Calculating your results...</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p>Redirecting to results page...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
