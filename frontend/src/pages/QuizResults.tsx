"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

interface QuizResultsProps {
  onLogout: () => void
}

const QuizResults: React.FC<QuizResultsProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("summary")

  // Mock quiz results data
  const quizResults = {
    title: "Database Normalization",
    course: "Database Systems",
    score: 80,
    correctAnswers: 4,
    totalQuestions: 5,
    timeTaken: "3:45",
    rank: 2,
    totalParticipants: 24,
    earnedXP: 240,
    badge: "Quick Thinker",
    questions: [
      {
        id: 1,
        text: "Which normal form eliminates transitive dependencies?",
        yourAnswer: "c",
        correctAnswer: "c",
        isCorrect: true,
      },
      {
        id: 2,
        text: "A relation is in 1NF if and only if:",
        yourAnswer: "c",
        correctAnswer: "c",
        isCorrect: true,
      },
      {
        id: 3,
        text: "Which of the following is NOT a type of database key?",
        yourAnswer: "b",
        correctAnswer: "d",
        isCorrect: false,
      },
      {
        id: 4,
        text: "What is a superkey?",
        yourAnswer: "a",
        correctAnswer: "a",
        isCorrect: true,
      },
      {
        id: 5,
        text: "Which normal form deals with multi-valued dependencies?",
        yourAnswer: "c",
        correctAnswer: "c",
        isCorrect: true,
      },
    ],
    leaderboard: [
      { rank: 1, name: "John Smith", avatar: "JS", score: 100, timeTaken: "3:12" },
      { rank: 2, name: "You", avatar: "You", score: 80, timeTaken: "3:45" },
      { rank: 3, name: "Jane Doe", avatar: "JD", score: 80, timeTaken: "4:02" },
      { rank: 4, name: "Alex Johnson", avatar: "AJ", score: 60, timeTaken: "3:58" },
      { rank: 5, name: "Sarah Williams", avatar: "SW", score: 60, timeTaken: "4:15" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="mb-8 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Results</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {quizResults.title} - {quizResults.course}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
              <i className="feather-share-2 mr-2 h-4 w-4"></i>
              Share Results
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Performance</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300">
                    {quizResults.badge}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-6 flex flex-col items-center justify-center">
                  <div className="relative mb-4 flex h-36 w-36 items-center justify-center rounded-full border-8 border-indigo-100 dark:border-indigo-900/20">
                    <div
                      className="absolute inset-0 rounded-full border-8 border-indigo-600"
                      style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - quizResults.score}%)` }}
                    ></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">{quizResults.score}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Score</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
                      <div className="flex items-center justify-center space-x-1">
                        <i className="feather-check-circle h-4 w-4 text-green-500"></i>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {quizResults.correctAnswers}/{quizResults.totalQuestions}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Correct</div>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
                      <div className="flex items-center justify-center space-x-1">
                        <i className="feather-clock h-4 w-4 text-indigo-600"></i>
                        <span className="font-semibold text-gray-900 dark:text-white">{quizResults.timeTaken}</span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Time</div>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
                      <div className="flex items-center justify-center space-x-1">
                        <i className="feather-award h-4 w-4 text-yellow-500"></i>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {quizResults.rank}/{quizResults.totalParticipants}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Rank</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">XP Earned</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      +{quizResults.earnedXP} XP
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-2 rounded-full bg-indigo-600" style={{ width: "65%" }}></div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-300">
                    <span>Level 3</span>
                    <span>2,450 / 3,000 XP to Level 4</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("summary")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "summary"
                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab("questions")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "questions"
                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    Questions
                  </button>
                </div>
              </div>

              {activeTab === "summary" ? (
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="h-[200px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                      <p className="text-gray-500 dark:text-gray-400">Performance chart will be displayed here</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-300">Accuracy</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{quizResults.score}%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-300">Average Time per Question</span>
                        <span className="font-semibold text-gray-900 dark:text-white">45 seconds</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <span className="text-gray-700 dark:text-gray-300">Compared to Class Average</span>
                        <span className="font-semibold text-green-500">+12%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
                      <i className="feather-bar-chart-2 mr-2 h-4 w-4"></i>
                      View Detailed Analytics
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="space-y-6">
                    {quizResults.questions.map((question, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white">Question {index + 1}</h3>
                          {question.isCorrect ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                              Correct
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                              Incorrect
                            </span>
                          )}
                        </div>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">{question.text}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                            <span className="text-gray-700 dark:text-gray-300">Your Answer</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-900 dark:text-white">
                                Option {question.yourAnswer.toUpperCase()}
                              </span>
                              {question.isCorrect ? (
                                <i className="feather-check-circle h-4 w-4 text-green-500"></i>
                              ) : (
                                <i className="feather-x-circle h-4 w-4 text-red-500"></i>
                              )}
                            </div>
                          </div>
                          {!question.isCorrect && (
                            <div className="flex items-center justify-between rounded-lg border border-green-500 bg-green-50 p-3 dark:border-green-700 dark:bg-green-900/20">
                              <span className="text-gray-700 dark:text-gray-300">Correct Answer</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-900 dark:text-white">
                                  Option {question.correctAnswer.toUpperCase()}
                                </span>
                                <i className="feather-check-circle h-4 w-4 text-green-500"></i>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Leaderboard</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Top performers in this quiz</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {quizResults.leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between rounded-lg p-3 ${
                        player.name === "You" ? "bg-indigo-50 dark:bg-indigo-900/20" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            player.rank === 1
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {player.rank}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                          {player.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{player.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{player.timeTaken}</p>
                        </div>
                      </div>
                      <div className="text-right font-semibold text-gray-900 dark:text-white">{player.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recommendations</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">Review Database Keys</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You missed a question about database keys. Review this topic to improve your understanding.
                    </p>
                    <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      View Resource
                    </button>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">Practice Quiz: Database Keys</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Take this focused quiz to strengthen your knowledge of database keys.
                    </p>
                    <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      Start Practice Quiz
                    </button>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">Next Quiz: Database Design</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Continue your learning journey with the next quiz in the series.
                    </p>
                    <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      Enroll in Next Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizResults
