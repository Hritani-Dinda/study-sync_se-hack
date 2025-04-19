import type React from "react"

interface LeaderboardEntryProps {
  rank: number
  name: string
  avatar: string
  score: number
  department?: string
  badges?: string[]
  timeTaken?: string
  isCurrentUser?: boolean
  highlight?: boolean
  additionalInfo?: string
}

const LeaderboardCard: React.FC<{
  title: string
  description?: string
  entries: LeaderboardEntryProps[]
}> = ({ title, description, entries }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={`${entry.rank}-${entry.name}`}
              className={`flex items-center justify-between rounded-lg p-3 ${
                entry.isCurrentUser
                  ? "bg-indigo-50 dark:bg-indigo-900/20"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    entry.rank === 1
                      ? "bg-yellow-500 text-white"
                      : entry.rank === 2
                        ? "bg-gray-300 text-gray-800"
                        : entry.rank === 3
                          ? "bg-amber-600 text-white"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {entry.rank}
                </div>
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                  {entry.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{entry.name}</p>
                  {entry.department && <p className="text-sm text-gray-500 dark:text-gray-400">{entry.department}</p>}
                  {entry.timeTaken && <p className="text-xs text-gray-500 dark:text-gray-400">{entry.timeTaken}</p>}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex flex-wrap gap-1">
                  {entry.badges?.map((badge, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="text-right font-semibold text-gray-900 dark:text-white">
                  {typeof entry.score === "number" ? entry.score.toLocaleString() : entry.score}{" "}
                  {entry.score === 1 ? "pt" : "pts"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeaderboardCard
