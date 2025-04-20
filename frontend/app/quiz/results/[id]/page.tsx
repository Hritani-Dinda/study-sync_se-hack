"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, ArrowLeft, Share2, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample quiz results data (fallback if no session data)
const resultsData = {
  "intro-programming": {
    title: "Introduction to Programming",
    course: "Computer Science 101",
    date: "April 28, 2023",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeSpent: "32 minutes",
    rank: "12/45",
    status: "Passed",
    questions: [
      {
        id: 1,
        question: "What is a variable in programming?",
        userAnswer: "A container for storing data values",
        correctAnswer: "A container for storing data values",
        isCorrect: true
      },
      {
        id: 2,
        question: "Which of the following is NOT a data type in most programming languages?",
        userAnswer: "Float",
        correctAnswer: "Decimal",
        isCorrect: false
      },
      {
        id: 3,
        question: "What does the 'if' statement do?",
        userAnswer: "Executes a block of code if a specified condition is true",
        correctAnswer: "Executes a block of code if a specified condition is true",
        isCorrect: true
      },
      {
        id: 4,
        question: "What is the purpose of a loop in programming?",
        userAnswer: "To repeat a block of code multiple times",
        correctAnswer: "To repeat a block of code multiple times",
        isCorrect: true
      },
      {
        id: 5,
        question: "Which operator is used for assignment in most programming languages?",
        userAnswer: "==",
        correctAnswer: "=",
        isCorrect: false
      }
    ]
  },
  "data-types": {
    title: "Data Types and Variables",
    course: "Computer Science 101",
    date: "May 5, 2023",
    score: 92,
    totalQuestions: 25,
    correctAnswers: 23,
    timeSpent: "28 minutes",
    rank: "5/42",
    status: "Passed",
    questions: [
      {
        id: 1,
        question: "Which data type is used to store whole numbers?",
        userAnswer: "Integer",
        correctAnswer: "Integer",
        isCorrect: true
      },
      {
        id: 2,
        question: "What is the size of a boolean data type?",
        userAnswer: "1 bit",
        correctAnswer: "1 bit",
        isCorrect: true
      },
      {
        id: 3,
        question: "Which data type is used to store a single character?",
        userAnswer: "String",
        correctAnswer: "Char",
        isCorrect: false
      },
      {
        id: 4,
        question: "What is the range of values for an 8-bit signed integer?",
        userAnswer: "-128 to 127",
        correctAnswer: "-128 to 127",
        isCorrect: true
      },
      {
        id: 5,
        question: "Which data type is used to store decimal numbers with high precision?",
        userAnswer: "Double",
        correctAnswer: "Double",
        isCorrect: true
      }
    ]
  }
}

// Define the question type
interface Question {
  id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizResult {
  title: string;
  course: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: string;
  rank: string;
  status: string;
  questions: Question[];
}

export default function QuizResultsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<QuizResult | null>(null)
  
  useEffect(() => {
    if (!params?.id) {
      router.push('/quiz')
      return
    }
    
    const quizId = params.id as string
    
    // Try to get result from sessionStorage first
    try {
      const sessionResult = sessionStorage.getItem(`quiz-result-${quizId}`)
      
      if (sessionResult) {
        // Use session data if available
        setResult(JSON.parse(sessionResult))
        setLoading(false)
        return
      }
    } catch (err) {
      console.error('Error reading from sessionStorage:', err)
    }
    
    // Fall back to sample data if available
    const sampleResult = resultsData[quizId as keyof typeof resultsData]
    
    if (sampleResult) {
      setResult(sampleResult as unknown as QuizResult)
    } else {
      // No result found
      toast({
        title: "Quiz result not found",
        description: "We couldn't find the results for this quiz.",
        variant: "destructive"
      })
      
      // Redirect after a brief delay
      setTimeout(() => router.push('/quiz'), 2000)
    }
    
    setLoading(false)
  }, [params, router, toast])
  
  if (loading || !result) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Results...</h1>
          <p className="text-muted-foreground">Please wait while we fetch your quiz results.</p>
        </div>
      </div>
    )
  }
  
  const scorePercentage = result.score
  
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{result.title} - Results</h1>
          <p className="text-muted-foreground">{result.course}</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quiz Summary</CardTitle>
            <CardDescription>Completed on {result.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Score</span>
                    <span className="text-sm font-medium">{result.score}%</span>
                  </div>
                  <Progress value={scorePercentage} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Correct Answers</span>
                    <span className="text-sm font-medium">{result.correctAnswers}/{result.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time Spent</span>
                    <span className="text-sm font-medium">{result.timeSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rank</span>
                    <span className="text-sm font-medium">{result.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`text-sm font-medium ${result.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                      {result.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold mb-2">{result.score}%</div>
                <div className={`text-xl font-medium ${result.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                  {result.status}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push('/quiz')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                toast({
                  title: "Link copied",
                  description: "Result link copied to clipboard.",
                })
              }}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" onClick={() => {
                // Basic print functionality for now
                window.print()
                toast({
                  title: "Print triggered",
                  description: "Sending results to printer...",
                })
              }}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <h2 className="text-xl font-semibold mb-4">Question Review</h2>
        
        <div className="space-y-4">
          {result.questions.map((question: Question) => (
            <Card key={question.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  {question.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium mb-2">{question.question}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      Your answer: {question.userAnswer}
                    </p>
                    {!question.isCorrect && (
                      <p className="text-sm text-green-600">
                        Correct answer: {question.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={() => router.push('/quiz')}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Quiz Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
} 