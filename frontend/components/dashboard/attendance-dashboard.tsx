"use client";

import { useState } from "react";
import {
  students,
  courses,
  attendanceRecords,
  type Student,
  type Course,
  type AttendanceRecord,
} from "../../lib/sample-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AttendanceDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>("2024-04-20");

  // Filter attendance records for selected date
  const todaysAttendance = attendanceRecords.filter(
    (record: AttendanceRecord) => record.date === selectedDate
  );

  // Get unique courses for the day
  const todaysCourses = courses.filter((course: Course) =>
    todaysAttendance.some(
      (record: AttendanceRecord) => record.courseId === course.id
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysCourses.map((course: Course) => (
              <div key={course.id} className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {course.name} ({course.code})
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Device ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysAttendance
                      .filter(
                        (record: AttendanceRecord) =>
                          record.courseId === course.id
                      )
                      .map((record: AttendanceRecord) => {
                        const student = students.find(
                          (s: Student) => s.id === record.studentId
                        );
                        return (
                          <TableRow key={record.id}>
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
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {
                  todaysAttendance.filter(
                    (r: AttendanceRecord) => r.status === "present"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {
                  todaysAttendance.filter(
                    (r: AttendanceRecord) => r.status === "late"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Late</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {
                  todaysAttendance.filter(
                    (r: AttendanceRecord) => r.status === "absent"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Absent</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
