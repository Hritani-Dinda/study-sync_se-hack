"use client";

import { useState } from "react";
import { students, courses, attendanceRecords } from "@/lib/sample-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CourseAttendance() {
  const [selectedCourse, setSelectedCourse] = useState<string>("CS101");

  // Get course details
  const course = courses.find((c) => c.id === selectedCourse);

  // Get course's attendance records
  const courseAttendance = attendanceRecords.filter(
    (record) => record.courseId === selectedCourse
  );

  // Calculate attendance statistics
  const totalStudents = students.filter((s) =>
    courseAttendance.some((r) => r.studentId === s.id)
  ).length;
  const presentStudents = courseAttendance.filter(
    (r) => r.status === "present"
  ).length;
  const lateStudents = courseAttendance.filter(
    (r) => r.status === "late"
  ).length;
  const attendancePercentage = (presentStudents / totalStudents) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {course && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalStudents}</div>
                    <div className="text-sm text-muted-foreground">
                      Total Students
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {presentStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {lateStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">Late</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {attendancePercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Attendance
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Device ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseAttendance.map((record) => {
                      const student = students.find(
                        (s) => s.id === record.studentId
                      );
                      return (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{student?.name}</TableCell>
                          <TableCell>{student?.rollNumber}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                record.status === "present"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "late"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(record.timestamp).toLocaleTimeString()}
                          </TableCell>
                          <TableCell>{record.deviceId}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
