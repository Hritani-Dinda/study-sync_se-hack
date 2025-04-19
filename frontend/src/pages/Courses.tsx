"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CourseCard from "../components/CourseCard"

interface CoursesProps {
  onLogout: () => void
}

const Courses: React.FC<CoursesProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("enrolled")

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Courses</h2>
                <p className="text-gray-600 dark:text-gray-300">Browse and manage your enrolled courses</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Browse All Courses
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {["enrolled", "recommended", "completed"].map((tab) => (
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
                {activeTab === "enrolled" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        id: "cs101",
                        title: "Introduction to Computer Science",
                        instructor: "Dr. Alan Turing",
                        progress: 75,
                        image: "https://via.placeholder.com/300x150?text=CS101",
                        duration: "8 weeks",
                        students: 1240,
                        badge: "In Progress",
                      },
                      {
                        id: "cs201",
                        title: "Data Structures and Algorithms",
                        instructor: "Prof. Ada Lovelace",
                        progress: 45,
                        image: "https://via.placeholder.com/300x150?text=CS201",
                        duration: "10 weeks",
                        students: 890,
                        badge: "In Progress",
                      },
                      {
                        id: "cs301",
                        title: "Database Systems",
                        instructor: "Dr. Edgar Codd",
                        progress: 90,
                        image: "https://via.placeholder.com/300x150?text=CS301",
                        duration: "12 weeks",
                        students: 650,
                        badge: "Almost Complete",
                      },
                      {
                        id: "cs401",
                        title: "Web Development",
                        instructor: "Prof. Tim Berners-Lee",
                        progress: 30,
                        image: "https://via.placeholder.com/300x150?text=CS401",
                        duration: "8 weeks",
                        students: 1120,
                        badge: "In Progress",
                      },
                      {
                        id: "cs501",
                        title: "Artificial Intelligence",
                        instructor: "Dr. Geoffrey Hinton",
                        progress: 15,
                        image: "https://via.placeholder.com/300x150?text=CS501",
                        duration: "14 weeks",
                        students: 780,
                        badge: "Just Started",
                      },
                    ].map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        progress={course.progress}
                        image={course.image}
                        duration={course.duration}
                        students={course.students}
                        badge={course.badge}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "recommended" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        id: "ml101",
                        title: "Machine Learning Fundamentals",
                        instructor: "Dr. Andrew Ng",
                        progress: 0,
                        image: "https://via.placeholder.com/300x150?text=ML101",
                        duration: "12 weeks",
                        students: 2340,
                        badge: "Popular",
                      },
                      {
                        id: "cc201",
                        title: "Cloud Computing",
                        instructor: "Prof. Werner Vogels",
                        progress: 0,
                        image: "https://via.placeholder.com/300x150?text=CC201",
                        duration: "8 weeks",
                        students: 1560,
                        badge: "New",
                      },
                      {
                        id: "mad301",
                        title: "Mobile App Development",
                        instructor: "Dr. Katie Bouman",
                        progress: 0,
                        image: "https://via.placeholder.com/300x150?text=MAD301",
                        duration: "10 weeks",
                        students: 980,
                        badge: "Trending",
                      },
                    ].map((course) => (
                      <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300">
                              {course.badge}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                              <i className="feather-user h-3 w-3"></i>
                            </div>
                            <p className="ml-2 text-sm text-gray-600 dark:text-gray-300">{course.instructor}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <i className="feather-clock h-4 w-4 mr-1"></i>
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <i className="feather-users h-4 w-4 mr-1"></i>
                              {course.students} students
                            </div>
                          </div>
                          <div className="mt-4">
                            <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "completed" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        id: "pb101",
                        title: "Programming Basics",
                        instructor: "Dr. Grace Hopper",
                        grade: "A",
                        image: "https://via.placeholder.com/300x150?text=PB101",
                        completedDate: "January 15, 2023",
                        certificate: true,
                      },
                      {
                        id: "cn201",
                        title: "Computer Networks",
                        instructor: "Prof. Vint Cerf",
                        grade: "B+",
                        image: "https://via.placeholder.com/300x150?text=CN201",
                        completedDate: "November 10, 2022",
                        certificate: true,
                      },
                      {
                        id: "os301",
                        title: "Operating Systems",
                        instructor: "Dr. Linus Torvalds",
                        grade: "A-",
                        image: "https://via.placeholder.com/300x150?text=OS301",
                        completedDate: "August 22, 2022",
                        certificate: true,
                      },
                    ].map((course) => (
                      <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              Completed
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                              <i className="feather-user h-3 w-3"></i>
                            </div>
                            <p className="ml-2 text-sm text-gray-600 dark:text-gray-300">{course.instructor}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Completed on {course.completedDate}
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">Grade: {course.grade}</div>
                          </div>
                          <div className="mt-4">
                            {course.certificate ? (
                              <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                                View Certificate
                              </button>
                            ) : (
                              <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600">
                                No Certificate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Courses
