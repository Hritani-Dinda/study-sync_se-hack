export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: number;
  deviceId?: string; // For tracking attendance device
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late";
  deviceId: string;
  timestamp: string;
  courseId: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  instructor: string;
  schedule: {
    day: string;
    time: string;
  }[];
}

// Sample Students Data
export const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    rollNumber: "2023001",
    department: "Computer Science",
    year: 2023,
    deviceId: "DEV001",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    rollNumber: "2023002",
    department: "Electrical Engineering",
    year: 2023,
    deviceId: "DEV002",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    rollNumber: "2023003",
    department: "Mechanical Engineering",
    year: 2023,
    deviceId: "DEV003",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    rollNumber: "2023004",
    department: "Computer Science",
    year: 2023,
    deviceId: "DEV004",
  },
  {
    id: "5",
    name: "Alex Wilson",
    email: "alex.wilson@example.com",
    rollNumber: "2023005",
    department: "Electrical Engineering",
    year: 2023,
    deviceId: "DEV005",
  },
  {
    id: "6",
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    rollNumber: "2023006",
    department: "Mechanical Engineering",
    year: 2023,
    deviceId: "DEV006",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    rollNumber: "2023007",
    department: "Computer Science",
    year: 2023,
    deviceId: "DEV007",
  },
  {
    id: "8",
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    rollNumber: "2023008",
    department: "Electrical Engineering",
    year: 2023,
    deviceId: "DEV008",
  },
];

// Sample Courses Data
export const courses: Course[] = [
  {
    id: "CS101",
    name: "Introduction to Programming",
    code: "CS101",
    department: "Computer Science",
    instructor: "Dr. Sarah Williams",
    schedule: [
      { day: "Monday", time: "09:00-10:30" },
      { day: "Wednesday", time: "09:00-10:30" },
    ],
  },
  {
    id: "EE201",
    name: "Circuit Theory",
    code: "EE201",
    department: "Electrical Engineering",
    instructor: "Prof. Robert Brown",
    schedule: [
      { day: "Tuesday", time: "11:00-12:30" },
      { day: "Thursday", time: "11:00-12:30" },
    ],
  },
  {
    id: "CS201",
    name: "Data Structures and Algorithms",
    code: "CS201",
    department: "Computer Science",
    instructor: "Dr. Michael Chen",
    schedule: [
      { day: "Tuesday", time: "10:00-11:30" },
      { day: "Thursday", time: "10:00-11:30" },
    ],
  },
  {
    id: "ME301",
    name: "Thermodynamics",
    code: "ME301",
    department: "Mechanical Engineering",
    instructor: "Prof. James Wilson",
    schedule: [
      { day: "Monday", time: "13:00-14:30" },
      { day: "Wednesday", time: "13:00-14:30" },
    ],
  },
  {
    id: "EE301",
    name: "Digital Electronics",
    code: "EE301",
    department: "Electrical Engineering",
    instructor: "Dr. Lisa Anderson",
    schedule: [
      { day: "Tuesday", time: "14:00-15:30" },
      { day: "Friday", time: "14:00-15:30" },
    ],
  },
];

// Sample Attendance Records
export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "1",
    date: "2024-04-20",
    status: "present",
    deviceId: "DEV001",
    timestamp: "2024-04-20T09:00:00Z",
    courseId: "CS101",
  },
  {
    id: "2",
    studentId: "2",
    date: "2024-04-20",
    status: "late",
    deviceId: "DEV002",
    timestamp: "2024-04-20T09:15:00Z",
    courseId: "CS101",
  },
  {
    id: "3",
    studentId: "3",
    date: "2024-04-20",
    status: "absent",
    deviceId: "DEV003",
    timestamp: "2024-04-20T09:00:00Z",
    courseId: "CS101",
  },
  {
    id: "4",
    studentId: "4",
    date: "2024-04-20",
    status: "present",
    deviceId: "DEV004",
    timestamp: "2024-04-20T09:00:00Z",
    courseId: "CS201",
  },
  {
    id: "5",
    studentId: "5",
    date: "2024-04-20",
    status: "late",
    deviceId: "DEV005",
    timestamp: "2024-04-20T10:15:00Z",
    courseId: "EE301",
  },
  {
    id: "6",
    studentId: "6",
    date: "2024-04-20",
    status: "present",
    deviceId: "DEV006",
    timestamp: "2024-04-20T13:00:00Z",
    courseId: "ME301",
  },
  {
    id: "7",
    studentId: "7",
    date: "2024-04-20",
    status: "absent",
    deviceId: "DEV007",
    timestamp: "2024-04-20T09:00:00Z",
    courseId: "CS201",
  },
  {
    id: "8",
    studentId: "8",
    date: "2024-04-20",
    status: "present",
    deviceId: "DEV008",
    timestamp: "2024-04-20T14:00:00Z",
    courseId: "EE301",
  },
  {
    id: "9",
    studentId: "1",
    date: "2024-04-21",
    status: "present",
    deviceId: "DEV001",
    timestamp: "2024-04-21T09:00:00Z",
    courseId: "CS101",
  },
  {
    id: "10",
    studentId: "2",
    date: "2024-04-21",
    status: "present",
    deviceId: "DEV002",
    timestamp: "2024-04-21T09:00:00Z",
    courseId: "CS101",
  },
  {
    id: "11",
    studentId: "3",
    date: "2024-04-21",
    status: "late",
    deviceId: "DEV003",
    timestamp: "2024-04-21T09:20:00Z",
    courseId: "CS101",
  },
];
