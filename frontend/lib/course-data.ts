export interface CourseData {
  id: string
  title: string
  instructor: string
  progress: number
  image: string
  duration: string
  students: number
  badge: string
  description?: string
  learningOutcomes?: string[]
  instructorTitle?: string
  instructorBio?: string
  level?: string
  lastUpdated?: string
  videosWatched?: number
  totalVideos?: number
  assignmentsCompleted?: number
  totalAssignments?: number
  quizzesPassed?: number
  totalQuizzes?: number
  deadlines?: {
    title: string
    date: string
    urgent?: boolean
  }[]
  videos?: {
    id: string
    title: string
    duration: string
    thumbnail: string
    watched: boolean
    date: string
    description?: string
    resources?: {
      name: string
      url: string
    }[]
  }[]
  assignments?: {
    id: string
    title: string
    dueDate: string
    status: string
    grade?: string
    description?: string
    instructions?: string
    requirements?: string[]
    resources?: {
      name: string
      url: string
    }[]
    attachments?: {
      name: string
      url: string
    }[]
    gradingCriteria?: {
      name: string
      description: string
      points: number
    }[]
  }[]
  quizzes?: {
    id: string
    title: string
    dueDate: string
    status: string
    score?: string
    questions: number
    timeLimit: string
  }[]
}

// Mock data for courses
const coursesData: CourseData[] = [
  {
    id: "cs101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    progress: 75,
    image: "/monitor.png",
    duration: "8 weeks",
    students: 1240,
    badge: "In Progress",
    description:
      "A comprehensive introduction to the fundamental concepts of computer science, including algorithms, data structures, and problem-solving techniques.",
    learningOutcomes: [
      "Understand basic programming concepts and syntax",
      "Develop problem-solving skills using computational thinking",
      "Implement simple algorithms and data structures",
      "Analyze the efficiency of algorithms",
      "Create small programs to solve real-world problems",
    ],
    level: "Beginner",
    lastUpdated: "April 2023",
    videosWatched: 5,
    totalVideos: 12,
    assignmentsCompleted: 3,
    totalAssignments: 8,
    quizzesPassed: 2,
    totalQuizzes: 5,
    deadlines: [
      {
        title: "Assignment 3: Data Analysis",
        date: "Tomorrow, 11:59 PM",
        urgent: true,
      },
      {
        title: "Mid-term Quiz",
        date: "May 15, 2:00 PM",
      },
      {
        title: "Group Project Submission",
        date: "May 20, 5:00 PM",
      },
    ],
    videos: [
      {
        id: "1",
        title: "Introduction to the Course",
        duration: "10:15",
        thumbnail: "/placeholder.svg?height=100&width=200&text=Intro",
        watched: true,
        date: "April 10, 2023",
      },
      {
        id: "2",
        title: "Core Concepts and Principles",
        duration: "25:30",
        thumbnail: "/placeholder.svg?height=100&width=200&text=Concepts",
        watched: true,
        date: "April 12, 2023",
      },
      {
        id: "3",
        title: "Practical Applications",
        duration: "18:45",
        thumbnail: "/placeholder.svg?height=100&width=200&text=Applications",
        watched: true,
        date: "April 15, 2023",
      },
      {
        id: "4",
        title: "Advanced Techniques",
        duration: "32:20",
        thumbnail: "/placeholder.svg?height=100&width=200&text=Advanced",
        watched: false,
        date: "April 18, 2023",
      },
      {
        id: "5",
        title: "Problem Solving Strategies",
        duration: "28:15",
        thumbnail: "/placeholder.svg?height=100&width=200&text=Strategies",
        watched: false,
        date: "April 20, 2023",
      },
      {
        id: "6",
        title: "Case Studies and Examples",
        duration: "45:10",
        thumbnail: "/placeholder.svg?height=100&width=200&text=Examples",
        watched: false,
        date: "April 25, 2023",
      },
    ],
    assignments: [
      {
        id: "1",
        title: "Assignment 1: Fundamentals",
        dueDate: "April 20, 2023",
        status: "completed",
        grade: "95/100",
        description: "Apply the fundamental concepts covered in the first module.",
      },
      {
        id: "2",
        title: "Assignment 2: Problem Solving",
        dueDate: "May 5, 2023",
        status: "completed",
        grade: "88/100",
        description: "Solve a set of problems using the techniques learned in class.",
      },
      {
        id: "3",
        title: "Assignment 3: Data Analysis",
        dueDate: "Tomorrow, 11:59 PM",
        status: "pending",
        description: "Analyze the provided dataset and present your findings.",
      },
      {
        id: "4",
        title: "Assignment 4: Final Project",
        dueDate: "May 25, 2023",
        status: "not-started",
        description: "Create a comprehensive project that demonstrates all the skills learned in this course.",
      },
    ],
    quizzes: [
      {
        id: "1",
        title: "Quiz 1: Basic Concepts",
        dueDate: "April 15, 2023",
        status: "completed",
        score: "90%",
        questions: 10,
        timeLimit: "15 minutes",
      },
      {
        id: "2",
        title: "Quiz 2: Intermediate Topics",
        dueDate: "May 1, 2023",
        status: "completed",
        score: "85%",
        questions: 15,
        timeLimit: "20 minutes",
      },
      {
        id: "3",
        title: "Mid-term Quiz",
        dueDate: "May 15, 2023",
        status: "upcoming",
        questions: 25,
        timeLimit: "45 minutes",
      },
      {
        id: "4",
        title: "Final Quiz",
        dueDate: "May 30, 2023",
        status: "not-started",
        questions: 30,
        timeLimit: "60 minutes",
      },
    ],
  },
  {
    id: "cs201",
    title: "Data Structures and Algorithms",
    instructor: "Prof. Ada Lovelace",
    progress: 45,
    image: "/structure.png",
    duration: "10 weeks",
    students: 890,
    badge: "In Progress",
  },
  {
    id: "cs301",
    title: "Database Systems",
    instructor: "Dr. Edgar Codd",
    progress: 90,
    image: "/database.png",
    duration: "12 weeks",
    students: 650,
    badge: "Almost Complete",
  },
  {
    id: "cs401",
    title: "Web Development",
    instructor: "Prof. Tim Berners-Lee",
    progress: 30,
    image: "/code.png",
    duration: "8 weeks",
    students: 1120,
    badge: "In Progress",
  },
  {
    id: "cs501",
    title: "Artificial Intelligence",
    instructor: "Dr. Geoffrey Hinton",
    progress: 15,
    image: "/chip.png",
    duration: "14 weeks",
    students: 780,
    badge: "Just Started",
  },
]

// Function to get all courses
export function getAllCourses(): CourseData[] {
  return coursesData
}

// Function to get a course by ID
export function getCourseById(id: string): CourseData | null {
  return coursesData.find((course) => course.id === id) || null
}

// Function to get an assignment by ID
export function getAssignmentById(courseId: string, assignmentId: string): any {
  const course = getCourseById(courseId)
  if (!course || !course.assignments) return null

  return course.assignments.find((assignment) => assignment.id === assignmentId) || null
}

// Function to get a video by ID
export function getVideoById(courseId: string, videoId: string): any {
  const course = getCourseById(courseId)
  if (!course || !course.videos) return null

  return course.videos.find((video) => video.id === videoId) || null
}

// Function to get a quiz by ID
export function getQuizById(courseId: string, quizId: string): any {
  const course = getCourseById(courseId)
  if (!course || !course.quizzes) return null

  return course.quizzes.find((quiz) => quiz.id === quizId) || null
}
