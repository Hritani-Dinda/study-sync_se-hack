"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Video, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface GMeetSchedulerProps {
  courseId: string
  onSchedule: (meeting: {
    title: string
    date: Date
    duration: number
    description: string
    attendees: string[]
  }) => void
}

export function GMeetScheduler({ courseId, onSchedule }: GMeetSchedulerProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState<Date>()
  const [duration, setDuration] = useState(30)
  const [description, setDescription] = useState("")
  const [attendees, setAttendees] = useState<string[]>([])

  const handleSchedule = () => {
    if (!date || !title) return

    onSchedule({
      title,
      date,
      duration,
      description,
      attendees,
    })

    // Reset form
    setTitle("")
    setDate(undefined)
    setDuration(30)
    setDescription("")
    setAttendees([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Google Meet</CardTitle>
        <CardDescription>Create and schedule a new meeting for your students</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Meeting Title</Label>
          <Input
            id="title"
            placeholder="Enter meeting title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Date and Time</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPPp") : "Pick a date and time"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="flex flex-col gap-4 p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        const newDate = new Date(selectedDate)
                        if (date) {
                          newDate.setHours(date.getHours())
                          newDate.setMinutes(date.getMinutes())
                        }
                        setDate(newDate)
                      }
                    }}
                    initialFocus
                  />
                  <div className="flex items-center gap-2">
                    <Label>Time:</Label>
                    <Input
                      type="time"
                      disabled={!date}
                      value={date ? format(date, "HH:mm") : ""}
                      onChange={(e) => {
                        const time = e.target.value
                        if (date && time) {
                          const [hours, minutes] = time.split(":").map(Number)
                          const newDate = new Date(date)
                          newDate.setHours(hours)
                          newDate.setMinutes(minutes)
                          setDate(newDate)
                        }
                      }}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Input
              type="number"
              min="15"
              max="240"
              step="15"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-32"
            />
            <span className="flex items-center">minutes</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter meeting description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Attendees</Label>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter student email"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  setAttendees([...attendees, e.currentTarget.value])
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button variant="outline" size="icon">
              <Users className="h-4 w-4" />
            </Button>
          </div>
          {attendees.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {attendees.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
                >
                  {email}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => {
                      setAttendees(attendees.filter((_, i) => i !== index))
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleSchedule}
          disabled={!date || !title}
        >
          Schedule Meeting
        </Button>
      </CardContent>
    </Card>
  )
}