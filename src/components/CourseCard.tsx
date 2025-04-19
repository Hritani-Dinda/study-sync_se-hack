import type React from "react"
import { Link } from "react-router-dom"

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  progress: number
  image: string
  duration?: string
  students?: number
  badge?: string
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  progress,
  image,
  duration,
  students,
  badge,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/300x150"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          {badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center mt-1">
          <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
            <i className="feather-user h-3 w-3"></i>
          </div>
          <p className="ml-2 text-sm text-gray-600 dark:text-gray-300">{instructor}</p>
        </div>
        {(duration || students) && (
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            {duration && (
              <div className="flex items-center">
                <i className="feather-clock h-4 w-4 mr-1"></i>
                {duration}
              </div>
            )}
            {students && (
              <div className="flex items-center">
                <i className="feather-users h-4 w-4 mr-1"></i>
                {students} students
              </div>
            )}
          </div>
        )}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Progress</span>
            <span className="text-gray-900 dark:text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to={`/courses/${id}`}
            className="w-full inline-flex justify-between items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Continue Learning
            <i className="feather-chevron-right h-4 w-4"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
