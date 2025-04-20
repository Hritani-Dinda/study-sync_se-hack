"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Video, Clock, Users, Calendar as CalendarIcon } from "lucide-react"

interface Meeting {
  id: string
  title: string
  date: Date
  duration: number
  description: string
  attendees: string[]
  meetLink: string
}

interface MeetingsListProps {
  meetings: Meeting[]
  onDelete: (id: string) => void
}

export function MeetingsList({ meetings, onDelete }: MeetingsListProps) {
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{meeting.title}</CardTitle>
                <CardDescription>{meeting.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(meeting.id)}
              >
                Delete
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(meeting.date, "PPP p")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{meeting.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{meeting.attendees.length} attendees</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <a
                    href={meeting.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Video className="h-4 w-4" />
                    Join Meeting
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      meeting.title
                    )}&dates=${format(meeting.date, "yyyyMMdd'T'HHmmss")}/${format(
                      new Date(meeting.date.getTime() + meeting.duration * 60000),
                      "yyyyMMdd'T'HHmmss"
                    )}&details=${encodeURIComponent(
                      meeting.description
                    )}&location=${encodeURIComponent(meeting.meetLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add to Calendar
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 