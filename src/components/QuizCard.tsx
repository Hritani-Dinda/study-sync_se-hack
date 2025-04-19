import type React from "react"
import { Link } from "react-router-dom"

interface QuizCardProps {
  id: string
  title: string
  course: string
  date: string
  duration: string
  questions: number
  points: number
  status: string
}

const QuizCard: React.FC<QuizCardProps> = ({ id, title, course, date, duration, questions, points, status }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === "Open"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
            <i className="feather-book-open h-4 w-4 mr-1"></i>
            {course}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <i className="feather-calendar h-4 w-4 mr-1"></i>
            {date} •<i className="feather-clock h-4 w-4 mx-1"></i>
            {duration}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Questions: {questions}</span>
            <span>Points: {points}</span>
          </div>
          <Link
            to={`/quiz/${id}`}
            className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
              status === "Open"
                ? "text-white bg-indigo-600 hover:bg-indigo-700"
                : "text-gray-700 bg-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
            }`}
            aria-disabled={status !== "Open"}
          >
            {status === "Open" ? "Start Quiz" : "Not Available Yet"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuizCard
