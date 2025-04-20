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

export function StudentAttendance() {
  const [selectedStudent, setSelectedStudent] = useState<string>("1");

  // Get student details
  const student = students.find((s) => s.id === selectedStudent);

  // Get student's attendance records
  const studentAttendance = attendanceRecords.filter(
    (record) => record.studentId === selectedStudent
  );

  // Calculate attendance statistics
  const totalClasses = studentAttendance.length;
  const presentClasses = studentAttendance.filter(
    (r) => r.status === "present"
  ).length;
  const lateClasses = studentAttendance.filter(
    (r) => r.status === "late"
  ).length;
  const attendancePercentage = (presentClasses / totalClasses) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Select
                value={selectedStudent}
                onValueChange={setSelectedStudent}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.rollNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {student && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalClasses}</div>
                    <div className="text-sm text-muted-foreground">
                      Total Classes
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {presentClasses}
                    </div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {lateClasses}
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
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Device ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAttendance.map((record) => {
                      const course = courses.find(
                        (c) => c.id === record.courseId
                      );
                      return (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {course?.name} ({course?.code})
                          </TableCell>
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
