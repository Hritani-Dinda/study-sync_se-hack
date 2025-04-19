import type React from "react"

interface ContentCardProps {
  title: string
  course: string
  type: string
  icon: string
  date: string
  size?: string
  duration?: string
  slides?: number
  views?: number
  downloads?: number
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  course,
  type,
  icon,
  date,
  size,
  duration,
  slides,
  views,
  downloads,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mt-1">
              <i className="feather-book-open h-4 w-4 mr-1"></i>
              {course}
            </p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {type}
          </span>
        </div>
        <div className="flex h-24 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 mt-4">
          <i className={`feather-${icon} h-12 w-12 text-gray-400 dark:text-gray-300`}></i>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <i className="feather-calendar h-4 w-4 mr-1"></i>
            {date}
          </div>
          <div className="flex items-center">
            {type === "Video" ? (
              <>
                <i className="feather-clock h-4 w-4 mr-1"></i>
                {duration}
              </>
            ) : (
              <>
                {size && <span>{size}</span>}
                {slides && <span>{slides} slides</span>}
              </>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
            {type === "Video" ? (
              <>Watch</>
            ) : (
              <>
                <i className="feather-download h-4 w-4 mr-2"></i>
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentCard
