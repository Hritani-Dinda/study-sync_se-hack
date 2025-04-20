export interface Student {
  id: string;
  name: string;
  rollNumber: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: "present" | "late" | "absent";
  timestamp: string;
  deviceId: string;
}

export const students: Student[] = [
  { id: "1", name: "John Doe", rollNumber: "2024001" },
  { id: "2", name: "Jane Smith", rollNumber: "2024002" },
  { id: "3", name: "Bob Johnson", rollNumber: "2024003" },
];

export const courses: Course[] = [
  { id: "1", name: "Mathematics", code: "MATH101" },
  { id: "2", name: "Physics", code: "PHY101" },
  { id: "3", name: "Chemistry", code: "CHEM101" },
];

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "1",
    courseId: "1",
    date: "2024-04-20",
    status: "present",
    timestamp: "2024-04-20T09:00:00",
    deviceId: "DEV001",
  },
  {
    id: "2",
    studentId: "2",
    courseId: "1",
    date: "2024-04-20",
    status: "late",
    timestamp: "2024-04-20T09:15:00",
    deviceId: "DEV002",
  },
  {
    id: "3",
    studentId: "3",
    courseId: "1",
    date: "2024-04-20",
    status: "absent",
    timestamp: "2024-04-20T09:00:00",
    deviceId: "DEV003",
  },
];
