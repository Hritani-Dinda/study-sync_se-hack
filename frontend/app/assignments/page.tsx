import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Filter, Search, FileText, CheckCircle2, AlertCircle, XCircle } from "lucide-react"

export default function AssignmentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
          <p className="text-muted-foreground">Manage and track all your course assignments</p>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assignments..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0">
        <Card className="md:w-[260px] lg:w-[280px]">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="all" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                  <label htmlFor="all" className="text-sm">
                    All
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="pending" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="pending" className="text-sm">
                    Pending
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="submitted" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="submitted" className="text-sm">
                    Submitted
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="completed" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="completed" className="text-sm">
                    Completed
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="late" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="late" className="text-sm">
                    Late
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="cs101">Introduction to Computer Science</SelectItem>
                  <SelectItem value="cs201">Data Structures and Algorithms</SelectItem>
                  <SelectItem value="cs301">Database Systems</SelectItem>
                  <SelectItem value="cs401">Artificial Intelligence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="due-soon">Due Soon</SelectItem>
                  <SelectItem value="due-later">Due Later</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all" className="space-y-4">
              {[
                {
                  id: "1",
                  title: "Assignment 1: Database Normalization",
                  course: "Database Systems",
                  dueDate: "Tomorrow, 11:59 PM",
                  status: "pending",
                  description: "Apply normalization techniques to the provided database schema.",
                  urgent: true,
                },
                {
                  id: "2",
                  title: "Assignment 2: Algorithm Analysis",
                  course: "Data Structures and Algorithms",
                  dueDate: "May 15, 2023",
                  status: "submitted",
                  submittedAt: "May 10, 2023",
                  description: "Analyze the time and space complexity of the given algorithms.",
                },
                {
                  id: "3",
                  title: "Assignment 3: Neural Networks",
                  course: "Artificial Intelligence",
                  dueDate: "May 5, 2023",
                  status: "completed",
                  grade: "92/100",
                  description: "Implement a simple neural network for image classification.",
                },
                {
                  id: "4",
                  title: "Assignment 4: Web Development Basics",
                  course: "Introduction to Computer Science",
                  dueDate: "May 20, 2023",
                  status: "not-started",
                  description: "Create a simple web page using HTML, CSS, and JavaScript.",
                },
                {
                  id: "5",
                  title: "Assignment 5: Operating Systems",
                  course: "Computer Architecture",
                  dueDate: "April 30, 2023",
                  status: "late",
                  description: "Implement a simple process scheduler for a mock operating system.",
                },
              ].map((assignment) => (
                <Card
                  key={assignment.id}
                  className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          {assignment.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : assignment.status === "submitted" ? (
                            <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                          ) : assignment.status === "pending" ? (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          ) : assignment.status === "late" ? (
                            <XCircle className="h-5 w-5 text-destructive" />
                          ) : (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          )}
                          <h3 className="font-semibold">{assignment.title}</h3>
                          {assignment.urgent && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          Due: {assignment.dueDate}
                        </div>
                        {assignment.submittedAt && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            Submitted: {assignment.submittedAt}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-end">
                          {assignment.status === "completed" ? (
                            <Badge variant="success">Completed</Badge>
                          ) : assignment.status === "submitted" ? (
                            <Badge variant="warning">Submitted</Badge>
                          ) : assignment.status === "pending" ? (
                            <Badge variant="warning">Pending</Badge>
                          ) : assignment.status === "late" ? (
                            <Badge variant="destructive">Late</Badge>
                          ) : (
                            <Badge variant="outline">Not Started</Badge>
                          )}
                          {assignment.grade && (
                            <Badge variant="outline" className="ml-2">
                              Grade: {assignment.grade}
                            </Badge>
                          )}
                        </div>
                        <Button asChild className="w-full md:w-auto">
                          <Link href={`/courses/cs301/assignments/${assignment.id}`}>
                            {assignment.status === "completed"
                              ? "View Feedback"
                              : assignment.status === "submitted"
                                ? "View Submission"
                                : "View Assignment"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {[
                {
                  id: "1",
                  title: "Assignment 1: Database Normalization",
                  course: "Database Systems",
                  dueDate: "Tomorrow, 11:59 PM",
                  status: "pending",
                  description: "Apply normalization techniques to the provided database schema.",
                  urgent: true,
                },
                {
                  id: "4",
                  title: "Assignment 4: Web Development Basics",
                  course: "Introduction to Computer Science",
                  dueDate: "May 20, 2023",
                  status: "not-started",
                  description: "Create a simple web page using HTML, CSS, and JavaScript.",
                },
              ].map((assignment) => (
                <Card
                  key={assignment.id}
                  className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <h3 className="font-semibold">{assignment.title}</h3>
                          {assignment.urgent && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          Due: {assignment.dueDate}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-end">
                          <Badge variant="warning">Pending</Badge>
                        </div>
                        <Button asChild className="w-full md:w-auto">
                          <Link href={`/courses/cs301/assignments/${assignment.id}`}>View Assignment</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-4">
              {[
                {
                  id: "2",
                  title: "Assignment 2: Algorithm Analysis",
                  course: "Data Structures and Algorithms",
                  dueDate: "May 15, 2023",
                  status: "submitted",
                  submittedAt: "May 10, 2023",
                  description: "Analyze the time and space complexity of the given algorithms.",
                },
              ].map((assignment) => (
                <Card
                  key={assignment.id}
                  className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                          <h3 className="font-semibold">{assignment.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          Due: {assignment.dueDate}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          Submitted: {assignment.submittedAt}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-end">
                          <Badge variant="warning">Submitted</Badge>
                        </div>
                        <Button asChild className="w-full md:w-auto">
                          <Link href={`/courses/cs301/assignments/${assignment.id}`}>View Submission</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {[
                {
                  id: "3",
                  title: "Assignment 3: Neural Networks",
                  course: "Artificial Intelligence",
                  dueDate: "May 5, 2023",
                  status: "completed",
                  grade: "92/100",
                  description: "Implement a simple neural network for image classification.",
                },
              ].map((assignment) => (
                <Card
                  key={assignment.id}
                  className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <h3 className="font-semibold">{assignment.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          Due: {assignment.dueDate}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-end">
                          <Badge variant="success">Completed</Badge>
                          <Badge variant="outline" className="ml-2">
                            Grade: {assignment.grade}
                          </Badge>
                        </div>
                        <Button asChild className="w-full md:w-auto">
                          <Link href={`/courses/cs301/assignments/${assignment.id}`}>View Feedback</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
