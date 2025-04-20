import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Mail, GraduationCap } from "lucide-react"

interface CourseStudentsPageProps {
  params: {
    courseId: string
  }
}

export default function CourseStudentsPage({ params }: CourseStudentsPageProps) {
  // TODO: Replace with actual SQL query to fetch course and student data
  const course = {
    id: params.courseId,
    title: "Sample Course",
    students: []
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Students in {course.title}</h1>
          <p className="text-muted-foreground">Manage enrolled students</p>
        </div>
        <Button>Add Students</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Roster</CardTitle>
              <CardDescription>View and manage enrolled students</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-8" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* TODO: Replace with actual students list from database */}
            <div className="text-center py-8 text-muted-foreground">
              <Users className="mx-auto h-12 w-12 mb-4" />
              <p>No students enrolled in this course yet.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Student Statistics</CardTitle>
            <CardDescription>Overview of student performance</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with actual statistics from database */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Total Students</span>
                </div>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Active Students</span>
                </div>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Average Grade</span>
                </div>
                <span className="font-medium">N/A</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest student interactions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with actual activity data from database */}
            <div className="text-center py-8 text-muted-foreground">
              <p>No recent activity to display.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 