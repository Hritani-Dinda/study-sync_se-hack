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
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function AttendanceDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"daily" | "history">("daily");

  // Filter attendance records for selected date
  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const todaysAttendance = attendanceRecords.filter(
    (record: AttendanceRecord) => record.date === selectedDateStr
  );

  // Get unique courses for the day
  const todaysCourses = courses.filter((course: Course) =>
    todaysAttendance.some(
      (record: AttendanceRecord) => record.courseId === course.id
    )
  );

  // Calculate attendance history data
  const getAttendanceHistory = () => {
    const last30Days = [...Array(30)]
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      })
      .reverse();

    return last30Days.map((date) => {
      const dayRecords = attendanceRecords.filter(
        (record) => record.date === date
      );
      const presentCount = dayRecords.filter(
        (r) => r.status === "present"
      ).length;
      const totalCount = dayRecords.length;
      const percentage = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;

      return {
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        attendance: percentage,
      };
    });
  };

  // Function to get attendance status for a specific date
  const getDateAttendanceStatus = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const dateAttendance = attendanceRecords.filter(
      (record: AttendanceRecord) => record.date === dateStr
    );

    if (dateAttendance.length === 0) return null;

    const presentCount = dateAttendance.filter(
      (r) => r.status === "present"
    ).length;
    const totalCount = dateAttendance.length;

    return (presentCount / totalCount) * 100;
  };

  // Custom tile content for calendar
  const tileContent = ({ date }: { date: Date }) => {
    const attendancePercentage = getDateAttendanceStatus(date);
    if (attendancePercentage === null) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div
          className={`h-full ${
            attendancePercentage >= 80
              ? "bg-green-500"
              : attendancePercentage >= 50
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${attendancePercentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={view}
        onValueChange={(v) => setView(v as "daily" | "history")}
      >
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="w-full border-0"
                  tileContent={tileContent}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Statistics</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>
                Attendance Details for {selectedDate.toLocaleDateString()}
              </CardTitle>
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
                                  {new Date(
                                    record.timestamp
                                  ).toLocaleTimeString()}
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
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getAttendanceHistory()}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ fill: "#2563eb" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
