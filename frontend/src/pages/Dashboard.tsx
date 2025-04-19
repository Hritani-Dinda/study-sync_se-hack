"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import DashboardCard from "../components/DashboardCard"
import CourseCard from "../components/CourseCard"

interface DashboardProps {
  onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)

  const carouselItems = [
    {
      title: "Upcoming Quiz: Database Normalization",
      description: "Prepare for your upcoming quiz on database normalization concepts",
      icon: "award",
      link: "/quiz/database-normalization",
      linkText: "Prepare Now",
      badge: "In 2 Days",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    },
    {
      title: "New Course Available: Machine Learning Basics",
      description: "Enroll in our new course on machine learning fundamentals",
      icon: "book-open",
      link: "/courses/machine-learning",
      linkText: "Enroll Now",
      badge: "New",
      color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    },
    {
      title: "Your Performance Report is Ready",
      description: "View your latest performance metrics across all courses",
      icon: "bar-chart-2",
      link: "/performance",
      linkText: "View Report",
      badge: "Updated",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    },
  ]

  const nextSlide = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)
  }

  // Auto-rotate carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome back, John! Here's what's happening with your courses.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
                  <i className="feather-bell mr-2 h-4 w-4"></i>
                  Notifications
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <i className="feather-calendar mr-2 h-4 w-4"></i>
                  Schedule
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div className="relative mt-6 overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
              >
                {carouselItems.map((item, index) => (
                  <div key={index} className={`min-w-full ${item.color} rounded-lg shadow-sm p-6`}>
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                      <div className="mb-4 flex items-start space-x-4 md:mb-0">
                        <div className="rounded-full bg-white p-2 dark:bg-gray-800">
                          <i className={`feather-${item.icon} h-6 w-6`}></i>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-20">
                              {item.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">{item.description}</p>
                        </div>
                      </div>
                      <Link
                        to={item.link}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        {item.linkText}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800"
              >
                <i className="feather-chevron-left h-4 w-4"></i>
                <span className="sr-only">Previous slide</span>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800"
              >
                <i className="feather-chevron-right h-4 w-4"></i>
                <span className="sr-only">Next slide</span>
              </button>

              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 w-6 rounded-full transition-colors ${
                      index === currentCarouselIndex
                        ? "bg-indigo-600 dark:bg-indigo-500"
                        : "bg-indigo-300/30 dark:bg-indigo-700/30"
                    }`}
                    onClick={() => setCurrentCarouselIndex(index)}
                  >
                    <span className="sr-only">Go to slide {index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {["overview", "courses", "quizzes", "performance"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium capitalize`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="py-6">
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <DashboardCard
                        title="Courses Enrolled"
                        value={5}
                        subtitle="+1 from last semester"
                        icon="book-open"
                      />
                      <DashboardCard title="Upcoming Quizzes" value={3} subtitle="Next quiz in 2 days" icon="award" />
                      <DashboardCard title="Average Score" value="87%" subtitle="+2% from last month" icon="award" />
                      <DashboardCard title="Study Time" value="12.5h" subtitle="This week" icon="clock" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                      <div className="col-span-4 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center">
                              <div className="mr-4 space-y-1">
                                <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                                  Completed Quiz: Introduction to Data Structures
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {i === 1 ? "Today" : i === 2 ? "Yesterday" : "3 days ago"}
                                </p>
                              </div>
                              <div className="ml-auto font-medium text-gray-900 dark:text-white">{90 - i * 5}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-3 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h3>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                          Don't miss these important dates
                        </p>
                        <div className="space-y-4">
                          {[
                            { title: "Database Assignment", date: "Tomorrow, 11:59 PM", urgent: true },
                            { title: "Algorithm Quiz", date: "May 15, 2:00 PM", urgent: false },
                            { title: "Group Project Submission", date: "May 20, 5:00 PM", urgent: false },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center">
                              <div className="mr-4 space-y-1">
                                <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                              </div>
                              {item.urgent && (
                                <span className="ml-auto inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-300">
                                  Urgent
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "courses" && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <CourseCard
                      id="cs101"
                      title="Introduction to Computer Science"
                      instructor="Dr. Alan Turing"
                      progress={75}
                      image="https://via.placeholder.com/300x150?text=CS101"
                    />
                    <CourseCard
                      id="cs201"
                      title="Data Structures and Algorithms"
                      instructor="Prof. Ada Lovelace"
                      progress={45}
                      image="https://via.placeholder.com/300x150?text=CS201"
                    />
                    <CourseCard
                      id="cs301"
                      title="Database Systems"
                      instructor="Dr. Edgar Codd"
                      progress={90}
                      image="https://via.placeholder.com/300x150?text=CS301"
                    />
                    <CourseCard
                      id="cs401"
                      title="Web Development"
                      instructor="Prof. Tim Berners-Lee"
                      progress={30}
                      image="https://via.placeholder.com/300x150?text=CS401"
                    />
                    <CourseCard
                      id="cs501"
                      title="Artificial Intelligence"
                      instructor="Dr. Geoffrey Hinton"
                      progress={15}
                      image="https://via.placeholder.com/300x150?text=CS501"
                    />
                  </div>
                )}

                {activeTab === "quizzes" && (
                  <div className="space-y-4">
                    {[
                      {
                        id: "db-norm",
                        title: "Database Normalization",
                        course: "Database Systems",
                        date: "May 12, 2:00 PM",
                        duration: "45 minutes",
                        questions: 20,
                        points: 100,
                        status: "Open",
                      },
                      {
                        id: "sort-algo",
                        title: "Sorting Algorithms",
                        course: "Data Structures and Algorithms",
                        date: "May 15, 10:00 AM",
                        duration: "60 minutes",
                        questions: 25,
                        points: 125,
                        status: "Open",
                      },
                      {
                        id: "html-css",
                        title: "HTML and CSS Basics",
                        course: "Web Development",
                        date: "May 18, 3:30 PM",
                        duration: "30 minutes",
                        questions: 15,
                        points: 75,
                        status: "Not Yet Open",
                      },
                    ].map((quiz) => (
                      <div
                        key={quiz.id}
                        className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  quiz.status === "Open"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {quiz.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                              <i className="feather-book-open h-4 w-4 mr-1"></i>
                              {quiz.course}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <i className="feather-calendar h-4 w-4 mr-1"></i>
                              {quiz.date} •<i className="feather-clock h-4 w-4 mx-1"></i>
                              {quiz.duration}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                              <span>Questions: {quiz.questions}</span>
                              <span>Points: {quiz.points}</span>
                            </div>
                            <Link
                              to={`/quiz/${quiz.id}`}
                              className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                                quiz.status === "Open"
                                  ? "text-white bg-indigo-600 hover:bg-indigo-700"
                                  : "text-gray-700 bg-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
                              }`}
                              aria-disabled={quiz.status !== "Open"}
                            >
                              {quiz.status === "Open" ? "Start Quiz" : "Not Available Yet"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "performance" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Performance Overview</h3>
                      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        Your academic performance across all courses
                      </p>
                      <div className="flex h-[300px] items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">Performance chart will be displayed here</p>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Course Performance</h3>
                      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Your progress in each course</p>
                      <div className="space-y-4">
                        {[
                          { course: "Computer Science", score: 92 },
                          { course: "Data Structures", score: 78 },
                          { course: "Database Systems", score: 85 },
                          { course: "Web Development", score: 65 },
                          { course: "Artificial Intelligence", score: 72 },
                        ].map((item, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {item.course}
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.score}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                              <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${item.score}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default Dashboard
