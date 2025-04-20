"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Trophy, Users, BookOpen, Search, Filter, CheckCircle, ArrowRight, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { getPublishedQuizzes, QuizItem } from "@/lib/quiz-data"

export default function QuizPage() {
  const [quizData, setQuizData] = useState<Record<string, QuizItem>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredQuizzes, setFilteredQuizzes] = useState<[string, QuizItem][]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  
  // Load all published quizzes
  useEffect(() => {
    try {
      setIsLoading(true)
      // Get only published quizzes for students
      const publishedQuizzes = getPublishedQuizzes();
      setQuizData(publishedQuizzes);
    } catch (err) {
      console.error('Error loading quizzes:', err);
      toast({
        title: "Error",
        description: "Failed to load quizzes. Please refresh the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
    
    // Check for updates every 30 seconds
    const interval = setInterval(() => {
      const publishedQuizzes = getPublishedQuizzes();
      setQuizData(publishedQuizzes);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [toast]);
  
  // Load the list of completed quizzes
  useEffect(() => {
    try {
      const storedCompletedQuizzes = sessionStorage.getItem('completedQuizzes')
      if (storedCompletedQuizzes) {
        setCompletedQuizzes(JSON.parse(storedCompletedQuizzes))
      }
    } catch (err) {
      console.error('Error loading completed quizzes:', err)
    }
  }, [])
  
  // Filter quizzes based on search term and active tab
  useEffect(() => {
    if (isLoading) return
    
    if (searchTerm.trim() === "") {
      if (activeTab === "all") {
        setFilteredQuizzes(Object.entries(quizData))
      } else if (activeTab === "completed") {
        setFilteredQuizzes(Object.entries(quizData).filter(([id]) => completedQuizzes.includes(id)))
      } else {
        setFilteredQuizzes(Object.entries(quizData).filter(([id]) => !completedQuizzes.includes(id)))
      }
    } else {
      const term = searchTerm.toLowerCase()
      let filtered = Object.entries(quizData).filter(([_, quiz]) => 
        quiz.title.toLowerCase().includes(term) || 
        quiz.course.toLowerCase().includes(term)
      )
      
      if (activeTab === "completed") {
        filtered = filtered.filter(([id]) => completedQuizzes.includes(id))
      } else if (activeTab === "pending") {
        filtered = filtered.filter(([id]) => !completedQuizzes.includes(id))
      }
      
      setFilteredQuizzes(filtered)
    }
  }, [searchTerm, activeTab, completedQuizzes, quizData, isLoading])
  
  const quizCount = Object.keys(quizData).length
  const completedCount = completedQuizzes.length
  const pendingCount = quizCount - completedCount
  
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
            <p className="text-muted-foreground">Test your knowledge with interactive quizzes</p>
          </div>
          <div>
            <Link href="/quiz-battle">
              <Button>Join Quiz Battle</Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-2 justify-end">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search quizzes..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Quizzes ({quizCount})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading quizzes...</p>
              </div>
            ) : filteredQuizzes.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No quizzes found</h3>
                <p className="text-muted-foreground mt-2">Check back later for new quizzes.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredQuizzes.map(([id, quiz]) => (
                  <Card key={id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle>{quiz.title}</CardTitle>
                      <CardDescription>{quiz.course}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{quiz.timeLimit} mins</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span>{quiz.questions.length} Questions</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 border-t flex justify-between items-center">
                      {completedQuizzes.includes(id) ? (
                        <>
                          <Badge variant="outline" className="mr-2">Completed</Badge>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/quiz/${id}`}>Retake</Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/quiz/results/${id}`}>View Results</Link>
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="mr-2">Pending</Badge>
                          <Button size="sm" asChild>
                            <Link href={`/quiz/${id}`}>Start Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading quizzes...</p>
              </div>
            ) : completedCount === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No completed quizzes yet</h3>
                <p className="text-muted-foreground mt-2">Start taking quizzes to see your results here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredQuizzes.map(([id, quiz]) => (
                  <Card key={id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle>{quiz.title}</CardTitle>
                      <CardDescription>{quiz.course}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{quiz.timeLimit} mins</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span>{quiz.questions.length} Questions</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 border-t flex justify-between items-center">
                      <Badge variant="outline" className="mr-2">Completed</Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/quiz/${id}`}>Retake</Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/quiz/results/${id}`}>View Results</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading quizzes...</p>
              </div>
            ) : pendingCount === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No pending quizzes</h3>
                <p className="text-muted-foreground mt-2">You've completed all available quizzes!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredQuizzes.map(([id, quiz]) => (
                  <Card key={id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle>{quiz.title}</CardTitle>
                      <CardDescription>{quiz.course}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{quiz.timeLimit} mins</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span>{quiz.questions.length} Questions</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 border-t flex justify-between items-center">
                      <Badge variant="outline" className="mr-2">Pending</Badge>
                      <Button size="sm" asChild>
                        <Link href={`/quiz/${id}`}>Start Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
