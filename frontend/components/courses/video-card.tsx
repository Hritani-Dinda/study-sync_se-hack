import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, Play } from "lucide-react"

interface VideoCardProps {
  video: {
    id: string
    title: string
    duration: string
    thumbnail: string
    watched: boolean
    date: string
  }
  courseId: string
}

export function VideoCard({ video, courseId }: VideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">{video.duration}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <div className="rounded-full bg-black/60 p-3">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
        {video.watched && (
          <div className="absolute top-2 left-2">
            <Badge variant="success" className="flex items-center space-x-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Watched</span>
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-1">{video.title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {video.duration}
          </div>
          <div>{video.date}</div>
        </div>
        <Button asChild className="w-full mt-2">
          <Link href={`/courses/${courseId}/videos/${video.id}`}>{video.watched ? "Watch Again" : "Watch Now"}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
