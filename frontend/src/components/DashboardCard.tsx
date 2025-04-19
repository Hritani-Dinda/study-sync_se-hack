import type React from "react"

interface DashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: string
  iconColor?: string
  change?: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = "text-indigo-600",
  change,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <i className={`feather-${icon} h-5 w-5 ${iconColor}`}></i>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        {change && (
          <p className="mt-1 text-xs text-green-600 dark:text-green-400">
            <i className="feather-arrow-up h-3 w-3 inline"></i> {change}
          </p>
        )}
      </div>
    </div>
  )
}

export default DashboardCard
