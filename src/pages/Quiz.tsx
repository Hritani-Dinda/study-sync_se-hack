"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import QuizCard from "../components/QuizCard"

interface QuizProps {
  onLogout: () => void
}

const Quiz: React.FC<QuizProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Quizzes</h2>
                <p className="text-gray-600 dark:text-gray-300">Test your knowledge with interactive quizzes</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Join Quiz Battle
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {["upcoming", "battles", "completed"].map((tab) => (
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
                {activeTab === "upcoming" && (
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
                      <QuizCard
                        key={quiz.id}
                        id={quiz.id}
                        title={quiz.title}
                        course={quiz.course}
                        date={quiz.date}
                        duration={quiz.duration}
                        questions={quiz.questions}
                        points={quiz.points}
                        status={quiz.status}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "battles" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        title: "Data Structures Challenge",
                        participants: 24,
                        startTime: "Today, 4:00 PM",
                        duration: "30 minutes",
                        status: "Enrolling",
                        prize: "500 XP + Badge",
                      },
                      {
                        title: "Algorithm Showdown",
                        participants: 16,
                        startTime: "Tomorrow, 2:00 PM",
                        duration: "45 minutes",
                        status: "Enrolling",
                        prize: "750 XP + Badge",
                      },
                      {
                        title: "Database Design Battle",
                        participants: 12,
                        startTime: "May 14, 3:00 PM",
                        duration: "60 minutes",
                        status: "Enrolling",
                        prize: "1000 XP + Badge",
                      },
                      {
                        title: "Web Dev Warrior",
                        participants: 32,
                        startTime: "May 16, 5:00 PM",
                        duration: "40 minutes",
                        status: "Coming Soon",
                        prize: "600 XP + Badge",
                      },
                    ].map((battle, i) => (
                      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{battle.title}</h3>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                battle.status === "Enrolling"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {battle.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mt-1">
                            <i className="feather-award h-4 w-4 mr-1"></i>
                            Prize: {battle.prize}
                          </p>
                        </div>
                        <div className="p-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                                <i className="feather-users h-4 w-4 mr-1"></i>
                                Participants:
                              </span>
                              <span className="text-gray-900 dark:text-white">{battle.participants}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                                <i className="feather-calendar h-4 w-4 mr-1"></i>
                                Start Time:
                              </span>
                              <span className="text-gray-900 dark:text-white">{battle.startTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                                <i className="feather-clock h-4 w-4 mr-1"></i>
                                Duration:
                              </span>
                              <span className="text-gray-900 dark:text-white">{battle.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                          <button
                            className={`w-full inline-flex justify-center items-center px-4 py-2 border ${
                              battle.status === "Enrolling"
                                ? "border-transparent text-white bg-indigo-600 hover:bg-indigo-700"
                                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                            } rounded-md shadow-sm text-sm font-medium`}
                            disabled={battle.status !== "Enrolling"}
                          >
                            {battle.status === "Enrolling" ? "Join Battle" : "Coming Soon"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "completed" && (
                  <div className="space-y-4">
                    {[
                      {
                        title: "Introduction to Programming",
                        course: "Computer Science 101",
                        date: "April 28, 2023",
                        score: "85/100",
                        rank: "12/45",
                        status: "Passed",
                      },
                      {
                        title: "Data Types and Variables",
                        course: "Computer Science 101",
                        date: "April 15, 2023",
                        score: "92/100",
                        rank: "5/45",
                        status: "Passed",
                      },
                      {
                        title: "Basic SQL Commands",
                        course: "Database Systems",
                        date: "April 10, 2023",
                        score: "78/100",
                        rank: "18/40",
                        status: "Passed",
                      },
                    ].map((quiz, i) => (
                      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                                {quiz.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                              <i className="feather-book-open h-4 w-4 mr-1"></i>
                              {quiz.course}
                            </p>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <i className="feather-calendar h-4 w-4 mr-1"></i>
                              Completed on {quiz.date}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                              <span>Score: {quiz.score}</span>
                              <span>Rank: {quiz.rank}</span>
                            </div>
                            <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                              View Results
                            </button>
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

export default Quiz
