"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Upload,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Send,
  MessageSquare,
  Paperclip,
  File,
} from "lucide-react"
import { type CourseData, getCourseById, getAssignmentById } from "@/lib/course-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function AssignmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseData | null>(null)
  const [assignment, setAssignment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [submissionText, setSubmissionText] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [comment, setComment] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (params.id && params.assignmentId) {
      const courseData = getCourseById(params.id as string)
      setCourse(courseData)

      const assignmentData = getAssignmentById(params.id as string, params.assignmentId as string)
      setAssignment(assignmentData)

      setLoading(false)
    }
  }, [params.id, params.assignmentId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)

      // Update assignment status
      if (assignment) {
        setAssignment({
          ...assignment,
          status: "submitted",
          submittedAt: new Date().toLocaleString(),
        })
      }
    }, 1500)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    // Add comment logic would go here
    console.log("Adding comment:", comment)
    setComment("")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!course || !assignment) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AlertCircle className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold">Assignment Not Found</h1>
          <p className="text-muted-foreground">
            The assignment you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href={`/courses/${params.id}/assignments`}>Back to Assignments</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "submitted":
        return <Badge variant="warning">Submitted</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      case "late":
        return <Badge variant="destructive">Late</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => router.push(`/courses/${params.id}/assignments`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assignments
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(assignment.status)}
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Due: {assignment.dueDate}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="submission" className="flex-1">
                Submission
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex-1">
                Feedback
              </TabsTrigger>
              <TabsTrigger value="discussion" className="flex-1">
                Discussion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-8">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle>Assignment Description</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{assignment.description || "No description provided."}</p>

                    {assignment.instructions && (
                      <>
                        <h3>Instructions</h3>
                        <p>{assignment.instructions}</p>
                      </>
                    )}

                    {assignment.requirements && (
                      <>
                        <h3>Requirements</h3>
                        <ul>
                          {assignment.requirements.map((req: string, index: number) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {!assignment.requirements && (
                      <>
                        <h3>Requirements</h3>
                        <ul>
                          <li>Complete all parts of the assignment as described</li>
                          <li>Submit your work before the deadline</li>
                          <li>Follow the formatting guidelines provided in class</li>
                          <li>Cite all sources properly using the required citation style</li>
                          <li>Ensure your submission is original and free of plagiarism</li>
                        </ul>
                      </>
                    )}

                    {assignment.resources && assignment.resources.length > 0 && (
                      <>
                        <h3>Resources</h3>
                        <ul>
                          {assignment.resources.map((resource: any, index: number) => (
                            <li key={index}>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                {resource.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-6">
                  {assignment.attachments && assignment.attachments.length > 0 && (
                    <div className="w-full">
                      <h3 className="text-sm font-medium mb-3">Attachments</h3>
                      <div className="space-y-2">
                        {assignment.attachments.map((attachment: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-md border p-3 bg-background hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{attachment.name}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="bg-muted/50">
                  <CardTitle>Grading Criteria</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {assignment.gradingCriteria ? (
                      assignment.gradingCriteria.map((criteria: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 border-b last:border-0">
                          <div>
                            <p className="font-medium">{criteria.name}</p>
                            <p className="text-sm text-muted-foreground">{criteria.description}</p>
                          </div>
                          <Badge variant="outline">{criteria.points} points</Badge>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex justify-between items-center p-3 border-b">
                          <div>
                            <p className="font-medium">Understanding of Concepts</p>
                            <p className="text-sm text-muted-foreground">
                              Demonstrates clear understanding of the core concepts
                            </p>
                          </div>
                          <Badge variant="outline">30 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 border-b">
                          <div>
                            <p className="font-medium">Application</p>
                            <p className="text-sm text-muted-foreground">
                              Correctly applies concepts to solve problems
                            </p>
                          </div>
                          <Badge variant="outline">30 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 border-b">
                          <div>
                            <p className="font-medium">Analysis</p>
                            <p className="text-sm text-muted-foreground">
                              Provides thoughtful analysis and interpretation
                            </p>
                          </div>
                          <Badge variant="outline">20 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <div>
                            <p className="font-medium">Presentation</p>
                            <p className="text-sm text-muted-foreground">
                              Work is well-organized and clearly presented
                            </p>
                          </div>
                          <Badge variant="outline">20 points</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submission" className="space-y-8">
              <Card>
                <CardHeader className="bg-muted/50">
                  <CardTitle>Submit Your Assignment</CardTitle>
                  <CardDescription>
                    {assignment.status === "completed"
                      ? "You have already completed this assignment."
                      : assignment.status === "submitted"
                        ? "Your submission is being reviewed."
                        : `Due by ${assignment.dueDate}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {assignment.status === "completed" || assignment.status === "submitted" ? (
                    <div className="space-y-6">
                      <div className="rounded-md bg-muted p-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <p className="font-medium">
                            {assignment.status === "completed" ? "Assignment completed" : "Assignment submitted"}
                          </p>
                        </div>
                        {assignment.submittedAt && (
                          <p className="mt-2 text-sm text-muted-foreground">Submitted on {assignment.submittedAt}</p>
                        )}
                      </div>

                      {assignment.submissionText && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Your Submission</h3>
                          <div className="rounded-md border p-4">
                            <p className="whitespace-pre-wrap">{assignment.submissionText}</p>
                          </div>
                        </div>
                      )}

                      {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Submitted Files</h3>
                          <div className="space-y-2">
                            {assignment.submittedFiles.map((file: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border p-3 bg-background hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center">
                                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>{file.name}</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : submitted ? (
                    <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-6 text-center">
                      <CheckCircle2 className="mx-auto h-8 w-8 text-green-500 mb-2" />
                      <h3 className="font-medium text-green-800 dark:text-green-300">
                        Assignment Submitted Successfully!
                      </h3>
                      <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                        Your submission has been received and is now pending review.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="submission-text">Submission Text</Label>
                        <Textarea
                          id="submission-text"
                          placeholder="Enter your submission text here..."
                          rows={8}
                          value={submissionText}
                          onChange={(e) => setSubmissionText(e.target.value)}
                          className="resize-y"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Upload Files</Label>
                        <div
                          ref={dropZoneRef}
                          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            isDragging
                              ? "border-primary bg-primary/5"
                              : "border-muted-foreground/25 hover:border-primary/50"
                          }`}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="rounded-full bg-muted p-3">
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Drag and drop your files here</p>
                              <p className="text-xs text-muted-foreground">or click to browse from your computer</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Browse Files
                            </Button>
                          </div>
                          <Input
                            id="file-upload"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                          />
                        </div>

                        {files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium">Selected Files ({files.length})</p>
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border p-3 bg-background hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center">
                                  <File className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <span className="text-sm truncate max-w-[200px] block">{file.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {(file.size / 1024).toFixed(2)} KB
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </form>
                  )}
                </CardContent>
                {!submitted && assignment.status !== "completed" && assignment.status !== "submitted" && (
                  <CardFooter className="flex justify-between bg-muted/30 p-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmissionText("")
                        setFiles([])
                      }}
                    >
                      Clear All
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={submitting || (!submissionText && files.length === 0)}
                    >
                      {submitting ? "Submitting..." : "Submit Assignment"}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-8">
              <Card>
                <CardHeader className="bg-muted/50">
                  <CardTitle>Instructor Feedback</CardTitle>
                  <CardDescription>
                    {assignment.status === "completed"
                      ? "Your assignment has been graded."
                      : "Feedback will be available after your assignment is graded."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {assignment.status === "completed" ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Grade</h3>
                        <div className="text-2xl font-bold">{assignment.grade}</div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">Comments</h3>
                        <div className="rounded-md border p-4">
                          <p className="whitespace-pre-wrap">
                            {assignment.feedback ||
                              "Great work on this assignment! You demonstrated a solid understanding of the concepts and applied them effectively. Your analysis was thorough and well-presented."}
                          </p>
                        </div>
                      </div>

                      {assignment.gradingBreakdown && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Grading Breakdown</h3>
                          <div className="space-y-2">
                            {assignment.gradingBreakdown.map((item: any, index: number) => (
                              <div
                                key={index}
                                className="flex justify-between items-center rounded-md border p-3 bg-background"
                              >
                                <span>{item.criteria}</span>
                                <span className="font-medium">
                                  {item.score}/{item.total}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold">Feedback Pending</h3>
                      <p className="text-muted-foreground">
                        {assignment.status === "submitted"
                          ? "Your assignment has been submitted and is awaiting feedback."
                          : "Submit your assignment to receive feedback."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-8">
              <Card>
                <CardHeader className="bg-muted/50">
                  <CardTitle>Discussion</CardTitle>
                  <CardDescription>Ask questions or discuss this assignment</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=JS" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">John Smith</span>
                              <span className="text-sm text-muted-foreground ml-2">You</span>
                            </div>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm">
                            I'm having trouble understanding the third requirement. Could you please clarify what you
                            mean by "analyze the data"?
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 pl-10">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=AT" />
                          <AvatarFallback>AT</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">Dr. Alan Turing</span>
                              <Link href="/professors/alan-turing">
                                <span className="text-xs bg-primary/10 text-primary rounded px-1.5 py-0.5 ml-2 cursor-pointer hover:bg-primary/20 transition-colors">
                                  Instructor
                                </span>
                              </Link>
                            </div>
                            <span className="text-xs text-muted-foreground">1 day ago</span>
                          </div>
                          <p className="text-sm">
                            Great question! By "analyze the data," I mean you should identify patterns, calculate
                            relevant statistics, and draw meaningful conclusions from the dataset provided.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <form onSubmit={handleAddComment} className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=JS" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <Textarea
                          placeholder="Add a comment or ask a question..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Paperclip className="mr-2 h-4 w-4" />
                            Attach
                          </Button>
                          <Button type="submit" size="sm" disabled={!comment.trim()}>
                            <Send className="mr-2 h-4 w-4" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="bg-muted/50">
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{getStatusBadge(assignment.status)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">{assignment.dueDate}</span>
                  </div>
                  {assignment.grade && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Grade:</span>
                      <span className="font-medium">{assignment.grade}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Points:</span>
                    <span className="font-medium">{assignment.points || "100"} points</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{assignment.type || "Individual"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="bg-muted/50">
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-muted">
                <div className="relative">
                  <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <p className="font-medium">Assignment Created</p>
                    <p className="text-xs text-muted-foreground">{assignment.createdAt || "April 10, 2023"}</p>
                  </div>
                </div>

                {(assignment.status === "submitted" || assignment.status === "completed") && (
                  <div className="relative">
                    <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-primary"></div>
                    <div className="space-y-1">
                      <p className="font-medium">Submitted</p>
                      <p className="text-xs text-muted-foreground">{assignment.submittedAt || "May 1, 2023"}</p>
                    </div>
                  </div>
                )}

                {assignment.status === "completed" && (
                  <div className="relative">
                    <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-green-500"></div>
                    <div className="space-y-1">
                      <p className="font-medium">Graded</p>
                      <p className="text-xs text-muted-foreground">{assignment.gradedAt || "May 3, 2023"}</p>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-muted"></div>
                  <div className="space-y-1">
                    <p className="font-medium">Due Date</p>
                    <p className="text-xs text-muted-foreground">{assignment.dueDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="bg-muted/50">
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {assignment.status === "not-started" || assignment.status === "pending" ? (
                <Button className="w-full" onClick={() => setActiveTab("submission")}>
                  Submit Assignment
                </Button>
              ) : assignment.status === "submitted" ? (
                <Button variant="outline" className="w-full" disabled>
                  Awaiting Feedback
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("feedback")}>
                  View Feedback
                </Button>
              )}

              <Button variant="outline" className="w-full" onClick={() => setActiveTab("discussion")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask a Question
              </Button>

              {assignment.canResubmit && (
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("submission")}>
                  Resubmit Assignment
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
