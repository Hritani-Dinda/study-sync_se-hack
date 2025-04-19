import { CheckCircle2, FileText, Video, Trophy, Clock } from "lucide-react"

interface RecentActivityFeedProps {
  courseId: string
}

export function RecentActivityFeed({ courseId }: RecentActivityFeedProps) {
  // This would typically fetch data from an API
  const activities = [
    {
      id: 1,
      type: "video",
      title: "Watched: Introduction to the Course",
      timestamp: "Today, 2:30 PM",
      icon: Video,
    },
    {
      id: 2,
      type: "assignment",
      title: "Submitted: Assignment 2: Problem Solving",
      timestamp: "Yesterday, 4:15 PM",
      icon: FileText,
    },
    {
      id: 3,
      type: "quiz",
      title: "Completed: Quiz 2: Intermediate Topics",
      timestamp: "2 days ago",
      icon: Trophy,
    },
    {
      id: 4,
      type: "video",
      title: "Watched: Core Concepts and Principles",
      timestamp: "3 days ago",
      icon: Video,
    },
    {
      id: 5,
      type: "assignment",
      title: "Completed: Assignment 1: Fundamentals",
      timestamp: "1 week ago",
      icon: CheckCircle2,
    },
  ]

  const getIconColor = (type: string) => {
    switch (type) {
      case "video":
        return "text-blue-500"
      case "assignment":
        return "text-green-500"
      case "quiz":
        return "text-amber-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <div className={`rounded-full bg-muted p-2 ${getIconColor(activity.type)}`}>
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {activity.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
