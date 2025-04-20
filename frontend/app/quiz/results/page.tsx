"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Trophy, Share2, Home, RotateCcw } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

interface QuizResult {
  quizId: string
  quizTitle: string
  score: number
  total_possible: number
  correct_answers: number
  total_questions: number
  userRank: number
  totalParticipants: number
}

export default function QuizResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [results, setResults] = useState<QuizResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Try to get results from session storage
    const storedResults = sessionStorage.getItem('quizResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
      setIsLoading(false)
    } else {
      // If no results in session storage, try to fetch from API
      if (searchParams) {
        const quizId = searchParams.get('quiz')
        if (quizId) {
          fetchResults(quizId)
        } else {
          setError("No quiz ID found in URL parameters")
          setIsLoading(false)
        }
      } else {
        setError("URL parameters not available")
        setIsLoading(false)
      }
    }
  }, [searchParams])

  const fetchResults = async (quizId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/${quizId}/results`, {
        credentials: 'include'
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error('Failed to fetch quiz results')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error('Error fetching results:', err)
      setError('Failed to load quiz results')
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = () => {
    if (!results) return
    
    // Create share text
    const shareText = `I scored ${results.score}/${results.total_possible} points on the "${results.quizTitle}" quiz!`
    
    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Results',
        text: shareText,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err))
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Share link copied to clipboard",
          })
        })
        .catch(err => console.error('Error copying to clipboard:', err))
    }
  }

  const handleRetakeQuiz = () => {
    if (!results) return
    router.push(`/quiz/${results.quizId}`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl py-8 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Loading Results</CardTitle>
            <CardDescription className="text-center">Please wait...</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="container mx-auto max-w-6xl py-8 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Error</CardTitle>
            <CardDescription className="text-center">{error || "Failed to load quiz results"}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Calculate percentage score
  const scorePercentage = (results.score / results.total_possible) * 100
  
  // Determine message based on score
  let messageText = "Good effort!"
  let messageColor = "text-yellow-500"
  
  if (scorePercentage >= 80) {
    messageText = "Excellent work!"
    messageColor = "text-green-500"
  } else if (scorePercentage >= 60) {
    messageText = "Good job!"
    messageColor = "text-blue-500"
  } else if (scorePercentage < 40) {
    messageText = "Keep practicing!"
    messageColor = "text-red-500"
  }
  
  // Calculate XP earned
  const xpEarned = 100 + // Completion bonus
    (results.userRank === 1 ? 500 : 
     results.userRank === 2 ? 300 : 
     results.userRank === 3 ? 200 : 0)

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-3xl">{results.quizTitle} - Results</CardTitle>
              <CardDescription>Quiz completed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <h2 className={`text-4xl font-bold ${messageColor}`}>{messageText}</h2>
                <p className="mt-2 text-muted-foreground">
                  You answered {results.correct_answers} out of {results.total_questions} questions correctly
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative h-48 w-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold">{results.score}</span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="stroke-muted fill-none"
                      stroke-width="10"
                      cx="50"
                      cy="50"
                      r="40"
                    />
                    <circle
                      className="stroke-primary fill-none"
                      stroke-width="10"
                      stroke-linecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      stroke-dasharray={`${2 * Math.PI * 40}`}
                      stroke-dashoffset={`${2 * Math.PI * 40 * (1 - scorePercentage / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-xl font-bold">Points</p>
                  <p className="text-muted-foreground">
                    {results.score} out of {results.total_possible} possible points
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg bg-muted p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col items-center space-y-2 rounded-lg bg-background p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-lg font-semibold">{results.correct_answers}</span>
                    <span className="text-sm text-muted-foreground">Correct Answers</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg bg-background p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <span className="text-lg font-semibold">{results.total_questions - results.correct_answers}</span>
                    <span className="text-sm text-muted-foreground">Incorrect Answers</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleShare} className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
              <Button onClick={handleRetakeQuiz} className="flex items-center">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-primary" />
                Your Achievement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Your Rank</p>
                    <p className="text-xs text-muted-foreground">
                      {results.userRank === 1
                        ? "🥇 First Place"
                        : results.userRank === 2
                        ? "🥈 Second Place"
                        : results.userRank === 3
                        ? "🥉 Third Place"
                        : `Ranked #${results.userRank}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{results.score} pts</div>
                  <div className="text-xs text-muted-foreground">
                    {results.userRank} of {results.totalParticipants}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">XP Earned</span>
                  <span className="font-bold text-primary">{xpEarned} XP</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Completion Bonus</span>
                    <span>+100 XP</span>
                  </div>
                  {results.userRank === 1 && (
                    <div className="flex justify-between text-sm">
                      <span>1st Place Bonus</span>
                      <span>+500 XP</span>
                    </div>
                  )}
                  {results.userRank === 2 && (
                    <div className="flex justify-between text-sm">
                      <span>2nd Place Bonus</span>
                      <span>+300 XP</span>
                    </div>
                  )}
                  {results.userRank === 3 && (
                    <div className="flex justify-between text-sm">
                      <span>3rd Place Bonus</span>
                      <span>+200 XP</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span>{Math.round((results.correct_answers / results.total_questions) * 100)}%</span>
                </div>
                <Progress value={(results.correct_answers / results.total_questions) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Score</span>
                  <span>{Math.round((results.score / results.total_possible) * 100)}%</span>
                </div>
                <Progress value={(results.score / results.total_possible) * 100} className="h-2" />
              </div>
              
              <div className="pt-2">
                <Badge 
                  className={`${
                    scorePercentage >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : 
                    scorePercentage >= 60 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" :
                    scorePercentage >= 40 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" :
                    "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                  }`}
                >
                  {scorePercentage >= 80 ? "Excellent" : 
                   scorePercentage >= 60 ? "Good" :
                   scorePercentage >= 40 ? "Fair" :
                   "Needs Improvement"}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/quizzes">
                <Trophy className="mr-2 h-4 w-4" />
                More Quizzes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}