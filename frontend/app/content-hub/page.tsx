"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  FileText,
  Video,
  ImageIcon,
  FileSpreadsheet,
  Download,
  BookOpen,
  Clock,
  Calendar,
} from "lucide-react"

export default function ContentHubPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Hub</h2>
          <p className="text-muted-foreground">Access all your course materials in one place</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>Upload Content</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, course, instructor, or keywords..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="presentations">Presentations</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Database Normalization",
                course: "Database Systems",
                type: "PDF",
                icon: FileText,
                date: "May 5, 2023",
                size: "2.4 MB",
                downloads: 145,
              },
              {
                title: "Introduction to Algorithms",
                course: "Data Structures and Algorithms",
                type: "Video",
                icon: Video,
                date: "May 3, 2023",
                duration: "45:12",
                views: 230,
              },
              {
                title: "Web Development Basics",
                course: "Web Development",
                type: "Presentation",
                icon: ImageIcon,
                date: "April 28, 2023",
                slides: 42,
                views: 189,
              },
              {
                title: "SQL Cheat Sheet",
                course: "Database Systems",
                type: "Excel",
                icon: FileSpreadsheet,
                date: "April 25, 2023",
                size: "1.2 MB",
                downloads: 312,
              },
              {
                title: "Object-Oriented Programming",
                course: "Computer Science",
                type: "PDF",
                icon: FileText,
                date: "April 20, 2023",
                size: "3.8 MB",
                downloads: 278,
              },
              {
                title: "Machine Learning Fundamentals",
                course: "Artificial Intelligence",
                type: "Video",
                icon: Video,
                date: "April 15, 2023",
                duration: "1:12:45",
                views: 425,
              },
            ].map((content, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4" />
                        {content.course}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{content.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex h-24 items-center justify-center rounded-md bg-muted">
                    <content.icon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {content.date}
                    </div>
                    <div className="flex items-center">
                      {content.type === "Video" ? (
                        <>
                          <Clock className="mr-1 h-4 w-4" />
                          {content.duration}
                        </>
                      ) : (
                        <>
                          {content.size && <span>{content.size}</span>}
                          {content.slides && <span>{content.slides} slides</span>}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {content.type === "Video" ? (
                      <>Watch</>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Document content cards would go here */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Database Normalization</CardTitle>
                    <CardDescription className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4" />
                      Database Systems
                    </CardDescription>
                  </div>
                  <Badge variant="outline">PDF</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex h-24 items-center justify-center rounded-md bg-muted">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    May 5, 2023
                  </div>
                  <div>2.4 MB</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
            {/* More document cards would be here */}
          </div>
        </TabsContent>

        {/* Other tab content would be similar */}
        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Video content would go here */}</div>
        </TabsContent>

        <TabsContent value="presentations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Presentation content would go here */}</div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Recently viewed content would go here */}</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
