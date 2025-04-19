"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ContentCard from "../components/ContentCard"

interface ContentHubProps {
  onLogout: () => void
}

const ContentHub: React.FC<ContentHubProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Content Hub</h2>
                <p className="text-gray-600 dark:text-gray-300">Access all your course materials in one place</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
                  <i className="feather-filter mr-2 h-4 w-4"></i>
                  Filters
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Upload Content
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
                <div className="relative flex-1">
                  <i className="feather-search absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
                  <input
                    type="search"
                    placeholder="Search by title, course, instructor, or keywords..."
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {["all", "documents", "videos", "presentations", "recent"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium capitalize`}
                    >
                      {tab === "all" ? "All Content" : tab === "recent" ? "Recently Viewed" : tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="py-6">
                {activeTab === "all" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        title: "Database Normalization",
                        course: "Database Systems",
                        type: "PDF",
                        icon: "file-text",
                        date: "May 5, 2023",
                        size: "2.4 MB",
                        downloads: 145,
                      },
                      {
                        title: "Introduction to Algorithms",
                        course: "Data Structures and Algorithms",
                        type: "Video",
                        icon: "video",
                        date: "May 3, 2023",
                        duration: "45:12",
                        views: 230,
                      },
                      {
                        title: "Web Development Basics",
                        course: "Web Development",
                        type: "Presentation",
                        icon: "image",
                        date: "April 28, 2023",
                        slides: 42,
                        views: 189,
                      },
                      {
                        title: "SQL Cheat Sheet",
                        course: "Database Systems",
                        type: "Excel",
                        icon: "file",
                        date: "April 25, 2023",
                        size: "1.2 MB",
                        downloads: 312,
                      },
                      {
                        title: "Object-Oriented Programming",
                        course: "Computer Science",
                        type: "PDF",
                        icon: "file-text",
                        date: "April 20, 2023",
                        size: "3.8 MB",
                        downloads: 278,
                      },
                      {
                        title: "Machine Learning Fundamentals",
                        course: "Artificial Intelligence",
                        type: "Video",
                        icon: "video",
                        date: "April 15, 2023",
                        duration: "1:12:45",
                        views: 425,
                      },
                    ].map((content, i) => (
                      <ContentCard
                        key={i}
                        title={content.title}
                        course={content.course}
                        type={content.type}
                        icon={content.icon}
                        date={content.date}
                        size={content.size}
                        duration={content.duration}
                        slides={content.slides}
                        views={content.views}
                        downloads={content.downloads}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <ContentCard
                      title="Database Normalization"
                      course="Database Systems"
                      type="PDF"
                      icon="file-text"
                      date="May 5, 2023"
                      size="2.4 MB"
                      downloads={145}
                    />
                    {/* More document cards would be here */}
                  </div>
                )}

                {/* Other tab content would be similar */}
                {activeTab === "videos" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Video content would go here */}</div>
                )}

                {activeTab === "presentations" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Presentation content would go here */}
                  </div>
                )}

                {activeTab === "recent" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Recently viewed content would go here */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ContentHub
