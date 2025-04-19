import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface AssignmentCardProps {
  assignment: {
    id: string
    title: string
    dueDate: string
    status: string
    grade?: string
    description?: string
  }
  courseId: string
  showDetails?: boolean
}

export function AssignmentCard({ assignment, courseId, showDetails = false }: AssignmentCardProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "submitted":
        return <CheckCircle2 className="h-5 w-5 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "not-started":
        return <Clock className="h-5 w-5 text-muted-foreground" />
      case "late":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {getStatusIcon(assignment.status)}
              <h3 className="font-semibold">{assignment.title}</h3>
            </div>
            {showDetails && assignment.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
            )}
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Due: {assignment.dueDate}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-end">
              {getStatusBadge(assignment.status)}
              {assignment.grade && (
                <Badge variant="outline" className="ml-2">
                  Grade: {assignment.grade}
                </Badge>
              )}
            </div>
            <Button asChild className="w-full md:w-auto">
              <Link href={`/courses/${courseId}/assignments/${assignment.id}`}>
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
  )
}
