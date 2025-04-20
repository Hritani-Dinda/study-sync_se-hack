"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Plus, Trash2, Save } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group-fix"
import { saveQuiz, publishQuiz } from "@/lib/quiz-data"
import { useToast } from "@/components/ui/use-toast"

export default function CreateQuizPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("details")
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [timeLimit, setTimeLimit] = useState("30")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple-choice",
      text: "",
      options: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false },
      ],
      points: 5,
    },
  ])

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "multiple-choice",
      text: "",
      options: [
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false },
      ],
      points: 5,
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestionText = (id: number, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)))
  }

  const updateQuestionType = (id: number, type: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, type } : q)))
  }

  const updateQuestionPoints = (id: number, points: number) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, points } : q)))
  }

  const updateOptionText = (questionId: number, optionId: number, text: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((o) => (o.id === optionId ? { ...o, text } : o)),
          }
        }
        return q
      }),
    )
  }

  const setCorrectOption = (questionId: number, optionId: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((o) => ({ ...o, isCorrect: o.id === optionId })),
          }
        }
        return q
      }),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate the quiz has at least one question
    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question to your quiz",
        variant: "destructive"
      })
      return
    }
    
    // Transform questions to match our expected format
    const formattedQuestions = questions.map(q => ({
      id: q.id,
      question: q.text,
      options: q.type === "multiple-choice" 
        ? q.options.map(o => o.text)
        : q.type === "true-false"
        ? ["True", "False"]
        : [q.options[0]?.text || ""], // For short-answer
      correct: q.type === "multiple-choice"
        ? q.options.findIndex(o => o.isCorrect)
        : q.type === "true-false"
        ? q.options.findIndex(o => o.isCorrect)
        : 0 // For short-answer, the first (and only) option is correct
    }))
    
    // Create the quiz object to save
    const quizToSave = {
      id: "", // Will be generated from title if empty
      title: quizTitle,
      description: quizDescription,
      course: selectedCourse,
      timeLimit: timeLimit,
      dueDate: dueDate,
      createdBy: "current-user-id", // This would normally come from auth
      createdAt: new Date().toISOString(),
      isPublished: isPublished,
      questions: formattedQuestions
    }
    
    // Save the quiz
    try {
      const savedQuiz = saveQuiz(quizToSave)
      
      // If set to publish immediately, publish it
      if (isPublished) {
        publishQuiz(savedQuiz.id)
      }
      
      toast({
        title: "Success",
        description: `Quiz "${quizTitle}" ${isPublished ? 'created and published' : 'saved as draft'}`,
      })
      
      // Redirect to dashboard
      router.push("/teacher/dashboard")
    } catch (error) {
      console.error("Error saving quiz:", error)
      toast({
        title: "Error",
        description: "Failed to save quiz. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push("/teacher/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Create New Quiz</h1>
            <p className="text-muted-foreground">Design a quiz for your students</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => router.push("/teacher/dashboard")}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Save Quiz
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="w-full bg-primary/10 p-1">
          <TabsTrigger
            value="details"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Quiz Details
          </TabsTrigger>
          <TabsTrigger
            value="questions"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Questions
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Set the basic details for your quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input
                  id="quiz-title"
                  placeholder="Enter quiz title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiz-description">Description</Label>
                <Textarea
                  id="quiz-description"
                  placeholder="Enter quiz description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger id="course" className="border-primary/20">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs101">CS101: Introduction to Programming</SelectItem>
                      <SelectItem value="cs201">CS201: Data Structures</SelectItem>
                      <SelectItem value="cs301">CS301: Database Systems</SelectItem>
                      <SelectItem value="cs401">CS401: Web Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input
                    id="due-date"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border-primary/20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="time-limit"
                      type="number"
                      min="1"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      className="w-24 border-primary/20"
                    />
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push("/teacher/dashboard")}
                className="border-primary/20 hover:bg-primary/5 hover:border-primary"
              >
                Cancel
              </Button>
              <Button onClick={() => setActiveTab("questions")}>Continue to Questions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Quiz Questions</h2>
            <Button onClick={addQuestion}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <Card key={question.id} className="border-primary/20">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 bg-primary/5">
                  <div>
                    <CardTitle>Question {index + 1}</CardTitle>
                    <CardDescription>
                      {question.type === "multiple-choice"
                        ? "Multiple Choice Question"
                        : question.type === "true-false"
                          ? "True/False Question"
                          : "Short Answer Question"}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Select value={question.type} onValueChange={(value) => updateQuestionType(question.id, value)}>
                      <SelectTrigger className="w-[180px] border-primary/20">
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuestion(question.id)}
                      disabled={questions.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                    <Textarea
                      id={`question-${question.id}`}
                      placeholder="Enter your question"
                      value={question.text}
                      onChange={(e) => updateQuestionText(question.id, e.target.value)}
                      rows={2}
                      className="border-primary/20"
                    />
                  </div>

                  {question.type === "multiple-choice" && (
                    <div className="space-y-4">
                      <Label>Answer Options</Label>
                      <RadioGroup
                        value={questions.find(q => q.id === question.id)?.options.findIndex(o => o.isCorrect)?.toString() || ""}
                        onValueChange={(value) => setCorrectOption(question.id, parseInt(value))}
                      >
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2 mb-2">
                            <RadioGroupItem value={option.id.toString()} id={`q${question.id}-option-${option.id}`} />
                            <Input
                              placeholder={`Option ${option.id}`}
                              value={option.text}
                              onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                              className="flex-1 border-primary/20"
                            />
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="space-y-4">
                      <Label>Correct Answer</Label>
                      <RadioGroup
                        value={questions.find(q => q.id === question.id)?.options.findIndex(o => o.isCorrect)?.toString() || "1"}
                        onValueChange={(value) => setCorrectOption(question.id, parseInt(value))}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="1" id={`q${question.id}-true`} />
                          <Label htmlFor={`q${question.id}-true`}>True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id={`q${question.id}-false`} />
                          <Label htmlFor={`q${question.id}-false`}>False</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {question.type === "short-answer" && (
                    <div className="space-y-2">
                      <Label htmlFor={`answer-${question.id}`}>Correct Answer</Label>
                      <Input
                        id={`answer-${question.id}`}
                        placeholder="Enter the correct answer"
                        value={question.options[0]?.text || ""}
                        onChange={(e) => updateOptionText(question.id, 1, e.target.value)}
                        className="border-primary/20"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor={`points-${question.id}`}>Points</Label>
                    <Input
                      id={`points-${question.id}`}
                      type="number"
                      min="1"
                      value={question.points}
                      onChange={(e) => updateQuestionPoints(question.id, Number.parseInt(e.target.value))}
                      className="w-24 border-primary/20"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveTab("details")}
              className="border-primary/20 hover:bg-primary/5 hover:border-primary"
            >
              Back to Details
            </Button>
            <Button onClick={() => setActiveTab("settings")}>Continue to Settings</Button>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>Quiz Settings</CardTitle>
              <CardDescription>Configure how your quiz will be presented to students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center space-x-2">
                <Switch id="shuffle-questions" />
                <Label htmlFor="shuffle-questions">Shuffle question order</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="shuffle-options" />
                <Label htmlFor="shuffle-options">Shuffle answer options</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-results" />
                <Label htmlFor="show-results">Show results immediately after submission</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="one-attempt" defaultChecked />
                <Label htmlFor="one-attempt">Limit to one attempt only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="require-password" />
                <Label htmlFor="require-password">Require password to access</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="access-password">Access Password</Label>
                <Input
                  id="access-password"
                  type="password"
                  placeholder="Enter password"
                  disabled
                  className="border-primary/20"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("questions")}
                className="border-primary/20 hover:bg-primary/5 hover:border-primary"
              >
                Back to Questions
              </Button>
              <Button onClick={() => setActiveTab("preview")}>Preview Quiz</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>{quizTitle || "Quiz Title"}</CardTitle>
              <CardDescription>{quizDescription || "No description provided."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between rounded-lg border p-4 bg-primary/5">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Time Limit</div>
                  <div className="text-sm text-muted-foreground">{timeLimit} minutes</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Total Questions</div>
                  <div className="text-sm text-muted-foreground">{questions.length}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Total Points</div>
                  <div className="text-sm text-muted-foreground">{questions.reduce((sum, q) => sum + q.points, 0)}</div>
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="rounded-lg border p-4 hover:bg-primary/5 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <div className="text-sm text-muted-foreground">{question.points} points</div>
                    </div>
                    <p className="my-2">{question.text || "Question text will appear here."}</p>

                    {question.type === "multiple-choice" && (
                      <div className="space-y-2 mt-4">
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroup
                              value={option.isCorrect ? option.id.toString() : ""}
                              disabled
                            >
                              <RadioGroupItem
                                value={option.id.toString()}
                                id={`preview-q${question.id}-option-${option.id}`}
                                disabled
                              />
                            </RadioGroup>
                            <Label htmlFor={`preview-q${question.id}-option-${option.id}`}>
                              {option.text || `Option ${option.id}`}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "true-false" && (
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroup value="true" disabled>
                            <RadioGroupItem value="true" id={`preview-q${question.id}-true`} disabled />
                          </RadioGroup>
                          <Label htmlFor={`preview-q${question.id}-true`}>True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroup value="false" disabled>
                            <RadioGroupItem value="false" id={`preview-q${question.id}-false`} disabled />
                          </RadioGroup>
                          <Label htmlFor={`preview-q${question.id}-false`}>False</Label>
                        </div>
                      </div>
                    )}

                    {question.type === "short-answer" && (
                      <div className="mt-4">
                        <Input
                          placeholder="Student answer will be entered here"
                          disabled
                          className="border-primary/20"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("settings")}
                className="border-primary/20 hover:bg-primary/5 hover:border-primary"
              >
                Back to Settings
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save Quiz
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
