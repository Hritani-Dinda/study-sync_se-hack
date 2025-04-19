"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Calendar,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  CheckCircle2,
} from "lucide-react"
import { type CourseData, getCourseById, getVideoById } from "@/lib/course-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseData | null>(null)
  const [video, setVideo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [comment, setComment] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (params.id && params.videoId) {
      const courseData = getCourseById(params.id as string)
      setCourse(courseData)

      const videoData = getVideoById(params.id as string, params.videoId as string)
      setVideo(videoData)

      setLoading(false)
    }
  }, [params.id, params.videoId])

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      // Mark video as watched
      if (video) {
        setVideo({
          ...video,
          watched: true,
        })
      }
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [video])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width

    videoRef.current.currentTime = pos * duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    // Add comment logic would go here
    console.log("Adding comment:", comment)
    setComment("")
  }

  const skipForward = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime += 10
  }

  const skipBackward = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime -= 10
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoRef.current.requestFullscreen()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!course || !video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AlertCircle className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold">Video Not Found</h1>
          <p className="text-muted-foreground">The video you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href={`/courses/${params.id}/videos`}>Back to Videos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push(`/courses/${params.id}/videos`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Videos
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{video.title}</h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={video.watched ? "success" : "outline"}>{video.watched ? "Watched" : "Unwatched"}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {video.date}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg bg-black aspect-video">
              <video ref={videoRef} className="h-full w-full" poster={video.thumbnail} onClick={togglePlay}>
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white transition-opacity hover:bg-black/70"
                  >
                    <Play className="h-8 w-8 fill-white" />
                  </button>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div
                  ref={progressRef}
                  className="relative h-1 w-full cursor-pointer rounded-full bg-white/30 mb-2"
                  onClick={handleProgressClick}
                >
                  <div
                    className="absolute h-full rounded-full bg-primary"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button onClick={togglePlay} className="text-white hover:text-primary">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button onClick={skipBackward} className="text-white hover:text-primary">
                      <SkipBack className="h-5 w-5" />
                    </button>
                    <button onClick={skipForward} className="text-white hover:text-primary">
                      <SkipForward className="h-5 w-5" />
                    </button>
                    <button onClick={toggleMute} className="text-white hover:text-primary">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <span className="text-xs text-white">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <button onClick={toggleFullscreen} className="text-white hover:text-primary">
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>
                  {video.views || "245"} views • {video.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40&text=${course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}`}
                      />
                      <AvatarFallback>
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">{course.instructorTitle || "Professor"}</p>
                    </div>
                  </div>
                  <Button variant="outline">Subscribe</Button>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {video.likes || "124"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      {video.dislikes || "8"}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <p className="whitespace-pre-wrap">
                    {video.description ||
                      "In this video, we explore the fundamental concepts and principles of the subject. You'll learn about key theories, practical applications, and how to apply these ideas in real-world scenarios."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddComment} className="mb-6">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!comment.trim()}>
                      Comment
                    </Button>
                  </div>
                </form>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=SW" />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Sarah Williams</span>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm">
                        This was really helpful! I especially liked the explanation about the core principles at 12:45.
                      </p>
                      <div className="flex items-center space-x-2 text-sm">
                        <button className="text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="mr-1 inline-block h-3 w-3" />
                          15
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">
                          <ThumbsDown className="mr-1 inline-block h-3 w-3" />2
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">Reply</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Alex Johnson</span>
                        <span className="text-xs text-muted-foreground">1 week ago</span>
                      </div>
                      <p className="text-sm">
                        Could you provide more examples of practical applications? I'm still struggling with how to
                        apply this in real-world scenarios.
                      </p>
                      <div className="flex items-center space-x-2 text-sm">
                        <button className="text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="mr-1 inline-block h-3 w-3" />8
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">
                          <ThumbsDown className="mr-1 inline-block h-3 w-3" />0
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Up Next</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.videos
                ?.slice(0, 5)
                .filter((v) => v.id !== video.id)
                .map((nextVideo, index) => (
                  <Link
                    key={index}
                    href={`/courses/${params.id}/videos/${nextVideo.id}`}
                    className="flex gap-2 hover:bg-muted p-2 rounded-md transition-colors"
                  >
                    <div className="relative h-20 w-32 flex-shrink-0">
                      <img
                        src={nextVideo.thumbnail || "/placeholder.svg"}
                        alt={nextVideo.title}
                        className="h-full w-full object-cover rounded-md"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {nextVideo.duration}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-2 text-sm">{nextVideo.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>
                      <div className="flex items-center mt-1">
                        {nextVideo.watched ? (
                          <span className="text-xs flex items-center text-muted-foreground">
                            <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                            Watched
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not watched</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/courses/${params.id}/videos`}>View All Videos</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Take notes while watching..." rows={6} />
              <Button className="mt-4 w-full">Save Notes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {video.resources?.map((resource: any, index: number) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4 rotate-[135deg]" />
                      {resource.name}
                    </a>
                  </li>
                )) || (
                  <>
                    <li>
                      <a href="#" className="flex items-center text-sm text-primary hover:underline">
                        <ArrowLeft className="mr-2 h-4 w-4 rotate-[135deg]" />
                        Lecture Slides
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-sm text-primary hover:underline">
                        <ArrowLeft className="mr-2 h-4 w-4 rotate-[135deg]" />
                        Supplementary Reading
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-sm text-primary hover:underline">
                        <ArrowLeft className="mr-2 h-4 w-4 rotate-[135deg]" />
                        Practice Exercises
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
