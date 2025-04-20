"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Trophy, ArrowUp, ArrowDown, Minus, Timer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getQuizById } from "@/lib/quiz-data"

// Define interfaces for type safety
interface Option {
  id: string
  text: string
}

interface Question {
  id: number
  text: string
  options: Option[]
  correctAnswer: string
}

interface Opponent {
  name: string
  avatar: string
  score: number
  answered: number
  rank: number
  change: number
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  
  if (!params?.id) {
    router.push('/quiz')
    return <div>Loading...</div>
  }
  
  const quizId = params.id as string
  const [quiz, setQuiz] = useState<any>(null)
  
  // Fetch quiz data
  useEffect(() => {
    const quizData = getQuizById(quizId)
    if (quizData) {
      setQuiz(quizData)
    } else {
      toast({
        title: "Quiz not found",
        description: "The quiz you're looking for does not exist",
        variant: "destructive"
      })
      router.push('/quiz')
    }
  }, [quizId, router, toast])
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [opponents, setOpponents] = useState<Opponent[]>([])
  const [userRank, setUserRank] = useState(1)
  const [userRankChange, setUserRankChange] = useState(0)
  const [showLiveLeaderboard, setShowLiveLeaderboard] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [userQuizId, setUserQuizId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false)

  // Check if quiz was already completed
  useEffect(() => {
    if (quizId) {
      // Try to get previous quiz results
      try {
        const sessionResult = sessionStorage.getItem(`quiz-result-${quizId}`)
        if (sessionResult) {
          setHasCompletedQuiz(true)
          setResult(JSON.parse(sessionResult))
        }
      } catch (err) {
        console.error('Error checking completed quiz status:', err)
      }
      
      setIsLoading(false)
    }
  }, [quizId])

  // Set initial time based on quiz timeLimit
  useEffect(() => {
    if (quiz?.timeLimit) {
      // Convert minutes to seconds
      setTimeLeft(parseInt(quiz.timeLimit) * 60);
    }
  }, [quiz]);

  // Timer effect
  useEffect(() => {
    if (!quiz || isLoading) return;
    
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted, quiz, isLoading])

  // Simulate opponent progress
  useEffect(() => {
    if (isSubmitted || !quiz || isLoading) return
    
    const interval = setInterval(() => {
      setOpponents((prev) => {
        const newOpponents = prev.map((opponent) => {
          // Randomly decide if opponent answers a question
          if (Math.random() > 0.7 && opponent.answered < quiz.questions.length) {
            const correct = Math.random() > 0.3 // 70% chance of correct answer
            const newScore = correct ? opponent.score + 20 : opponent.score
            return {
              ...opponent,
              answered: opponent.answered + 1,
              score: newScore,
            }
          }
          return opponent
        })
        
        // Calculate new rankings
        const allParticipants = [
          {
            name: "You",
            score: answers.filter((answer, index) => 
              answer === quiz.questions[index]?.correct
            ).length * 20,
          },
          ...newOpponents.map((o) => ({ name: o.name, score: o.score })),
        ].sort((a, b) => b.score - a.score)
        
        const yourNewRank = allParticipants.findIndex((p) => p.name === "You") + 1
        const rankChange = userRank - yourNewRank
        
        // Update opponent ranks
        const updatedOpponents = newOpponents.map((opponent) => {
          const newRank = allParticipants.findIndex((p) => p.name === opponent.name) + 1
          const change = opponent.rank - newRank
          return {
            ...opponent,
            rank: newRank,
            change: change,
          }
        })
        
        // Update user rank
        if (yourNewRank !== userRank) {
          setUserRank(yourNewRank)
          setUserRankChange(rankChange)
        }
        
        return updatedOpponents
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isSubmitted, answers, userRank, quiz, isLoading])

  // Update leaderboard from API periodically
  useEffect(() => {
    if (isSubmitted || !quiz || isLoading) return
    
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/${params.id}/leaderboard`, {
          credentials: 'include'
        })
        
        if (response.ok) {
          const data = await response.json()
          setUserRank(data.user_rank)
          
          // Update opponents with real data while preserving local changes
          setOpponents(prev => {
            return data.opponents.map((newOpp: any) => {
              const existingOpp = prev.find(o => o.name === newOpp.name)
              return {
                ...newOpp,
                change: existingOpp?.change || 0
              }
            })
          })
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err)
      }
    }
    
    // Fetch real leaderboard data every 10 seconds
    const leaderboardInterval = setInterval(fetchLeaderboard, 10000)
    return () => clearInterval(leaderboardInterval)
  }, [params.id, quiz, isSubmitted, isLoading])

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = selectedAnswer
      setAnswers(newAnswers)
      
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        handleSubmit()
      }
    }
  }
  
  const handleSubmit = () => {
    if (!quiz) return;
    
    setIsSubmitted(true)
    
    // Calculate score
    let correctCount = 0
    quiz.questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correct) {
        correctCount++
      }
    })
    
    setScore(correctCount)
    setShowResults(true)
    setHasCompletedQuiz(true)
    
    // Save results to sessionStorage for the results page
    const resultData = {
      title: quiz.title,
      course: quiz.course,
      date: new Date().toLocaleDateString(),
      score: Math.round((correctCount / quiz.questions.length) * 100),
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      timeSpent: `${Math.floor((parseInt(quiz.timeLimit) * 60 - timeLeft) / 60)}:${String((parseInt(quiz.timeLimit) * 60 - timeLeft) % 60).padStart(2, '0')}`,
      rank: "1/1", // Placeholder for now
      status: correctCount >= (quiz.questions.length / 2) ? "Passed" : "Failed",
      questions: quiz.questions.map((question: any, index: number) => ({
        id: question.id,
        question: question.question,
        userAnswer: question.options[answers[index] || 0],
        correctAnswer: question.options[question.correct],
        isCorrect: answers[index] === question.correct
      }))
    }
    
    // Store in sessionStorage
    try {
      sessionStorage.setItem(`quiz-result-${quizId}`, JSON.stringify(resultData))
      
      // Also store list of completed quizzes
      const completedQuizzes = JSON.parse(sessionStorage.getItem('completedQuizzes') || '[]')
      if (!completedQuizzes.includes(quizId)) {
        completedQuizzes.push(quizId)
        sessionStorage.setItem('completedQuizzes', JSON.stringify(completedQuizzes))
      }
    } catch (err) {
      console.error('Failed to save quiz results to sessionStorage:', err)
    }
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  if (isLoading || !quiz) {
    return <div className="flex items-center justify-center h-[60vh]">Loading...</div>
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <p className="text-muted-foreground">{quiz.course}</p>
        </div>
        
        {!showResults && !hasCompletedQuiz ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <Progress value={progress} className="mb-6" />
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswer !== null ? selectedAnswer.toString() : undefined}
                  onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                >
                  {currentQuestion.options.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full" 
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
                </Button>
              </CardFooter>
            </Card>
          </>
        ) : hasCompletedQuiz && !showResults ? (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Already Completed</CardTitle>
              <CardDescription>
                You have already taken this quiz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You completed this quiz on {result?.date || 'a previous date'} with a score of {result?.score || 'N/A'}%.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push('/quiz')}>
                Back to Quizzes
              </Button>
              <Button onClick={() => router.push(`/quiz/results/${quizId}`)}>
                View Results
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
              <CardDescription>
                You scored {score} out of {quiz.questions.length} questions correctly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quiz.questions.map((question: any, index: number) => {
                  const isCorrect = answers[index] === question.correct
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium mb-2">{question.question}</p>
                          <p className="text-sm text-muted-foreground mb-1">
                            Your answer: {question.options[answers[index] || 0]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600">
                              Correct answer: {question.options[question.correct]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push('/quiz')}>
                Back to Quizzes
              </Button>
              <Button onClick={() => router.push(`/quiz/results/${quizId}`)}>
                View Detailed Results
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}