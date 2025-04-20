// Define the quiz data structure
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface QuizItem {
  id: string;
  title: string;
  course: string;
  description?: string;
  timeLimit: string; // in minutes
  dueDate?: string;
  createdBy: string;
  createdAt: string;
  isPublished: boolean;
  questions: QuizQuestion[];
}

// In-memory quiz data storage - simulates a database
let quizData: Record<string, QuizItem> = {
  "db-normalization": {
    id: "db-normalization",
    title: "Database Normalization",
    course: "Database Systems",
    timeLimit: "10",
    createdBy: "teacher-1",
    createdAt: new Date().toISOString(),
    isPublished: true,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of database normalization?",
        options: [
          "To improve query performance",
          "To reduce data redundancy and dependency",
          "To increase storage efficiency",
          "To simplify database design"
        ],
        correct: 1
      },
      {
        id: 2,
        question: "Which normal form eliminates partial dependencies?",
        options: [
          "First Normal Form (1NF)",
          "Second Normal Form (2NF)",
          "Third Normal Form (3NF)",
          "Boyce-Codd Normal Form (BCNF)"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "In 3NF, which type of dependency is eliminated?",
        options: [
          "Partial dependencies",
          "Transitive dependencies",
          "Functional dependencies",
          "Multivalued dependencies"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "What is a superkey in database design?",
        options: [
          "A primary key with a foreign key constraint",
          "A set of one or more columns that can uniquely identify a row",
          "A key that is used for indexing",
          "A key that is shared between multiple tables"
        ],
        correct: 1
      },
      {
        id: 5,
        question: "Which of the following is NOT a benefit of normalization?",
        options: [
          "Reduced data redundancy",
          "Improved data integrity",
          "Simplified queries",
          "Better query performance in all cases"
        ],
        correct: 3
      }
    ]
  },
  "sorting-algorithms": {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    course: "Data Structures and Algorithms",
    timeLimit: "10",
    createdBy: "teacher-1",
    createdAt: new Date().toISOString(),
    isPublished: true,
    questions: [
      {
        id: 1,
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: [
          "Bubble Sort",
          "Quick Sort",
          "Insertion Sort",
          "Selection Sort"
        ],
        correct: 1
      },
      {
        id: 2,
        question: "What is the time complexity of Merge Sort?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "Which sorting algorithm is in-place?",
        options: [
          "Merge Sort",
          "Quick Sort",
          "Counting Sort",
          "Radix Sort"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "What is the space complexity of Bubble Sort?",
        options: [
          "O(1)",
          "O(n)",
          "O(n log n)",
          "O(n²)"
        ],
        correct: 0
      },
      {
        id: 5,
        question: "Which sorting algorithm is stable?",
        options: [
          "Quick Sort",
          "Heap Sort",
          "Merge Sort",
          "Selection Sort"
        ],
        correct: 2
      }
    ]
  },
  "html-css-basics": {
    id: "html-css-basics",
    title: "HTML and CSS Basics",
    course: "Web Development",
    timeLimit: "10",
    createdBy: "teacher-1",
    createdAt: new Date().toISOString(),
    isPublished: true,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correct: 0
      },
      {
        id: 2,
        question: "Which HTML tag is used for creating a hyperlink?",
        options: [
          "<link>",
          "<a>",
          "<href>",
          "<url>"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Style System",
          "Colorful Style Sheets"
        ],
        correct: 1
      },
      {
        id: 4,
        question: "Which CSS property is used to change the text color?",
        options: [
          "text-color",
          "font-color",
          "color",
          "text-style"
        ],
        correct: 2
      },
      {
        id: 5,
        question: "Which HTML element is used for creating a paragraph?",
        options: [
          "<paragraph>",
          "<p>",
          "<para>",
          "<text>"
        ],
        correct: 1
      }
    ]
  }
};

// Get all quizzes
export function getAllQuizzes(): Record<string, QuizItem> {
  // Return a copy to prevent direct modification
  return { ...quizData };
}

// Get all published quizzes for students
export function getPublishedQuizzes(): Record<string, QuizItem> {
  // Filter to only include published quizzes
  const publishedQuizzes: Record<string, QuizItem> = {};
  
  Object.entries(quizData).forEach(([id, quiz]) => {
    if (quiz.isPublished) {
      publishedQuizzes[id] = { ...quiz };
    }
  });
  
  return publishedQuizzes;
}

// Get a specific quiz by ID
export function getQuizById(id: string): QuizItem | null {
  return quizData[id] ? { ...quizData[id] } : null;
}

// Create or update a quiz
export function saveQuiz(quiz: QuizItem): QuizItem {
  // Set creation time for new quizzes
  if (!quiz.createdAt) {
    quiz.createdAt = new Date().toISOString();
  }
  
  // Ensure the ID is set
  if (!quiz.id) {
    // Generate a URL-friendly ID based on the title
    quiz.id = quiz.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Save to our data store
  quizData[quiz.id] = { ...quiz };
  
  // Save to localStorage for persistence across page refreshes
  if (typeof window !== 'undefined') {
    try {
      const allQuizzes = { ...quizData };
      localStorage.setItem('studySync_quizzes', JSON.stringify(allQuizzes));
    } catch (err) {
      console.error('Failed to save quiz data to localStorage:', err);
    }
  }
  
  // Return a copy of the saved quiz
  return { ...quiz };
}

// Publish a quiz to make it available to students
export function publishQuiz(id: string): boolean {
  if (quizData[id]) {
    quizData[id] = { 
      ...quizData[id], 
      isPublished: true 
    };
    
    // Sync with localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('studySync_quizzes', JSON.stringify(quizData));
      } catch (err) {
        console.error('Failed to save quiz data to localStorage:', err);
      }
    }
    
    return true;
  }
  return false;
}

// Delete a quiz
export function deleteQuiz(id: string): boolean {
  if (quizData[id]) {
    const { [id]: removed, ...remaining } = quizData;
    quizData = remaining;
    
    // Sync with localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('studySync_quizzes', JSON.stringify(quizData));
      } catch (err) {
        console.error('Failed to save quiz data to localStorage:', err);
      }
    }
    
    return true;
  }
  return false;
}

// Load quiz data from localStorage on initialization
if (typeof window !== 'undefined') {
  try {
    const savedQuizzes = localStorage.getItem('studySync_quizzes');
    if (savedQuizzes) {
      const parsedQuizzes = JSON.parse(savedQuizzes);
      // Merge with the default quizzes
      quizData = { ...quizData, ...parsedQuizzes };
    }
  } catch (err) {
    console.error('Failed to load quiz data from localStorage:', err);
  }
} 