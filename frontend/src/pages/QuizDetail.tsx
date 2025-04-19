"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

interface QuizDetailProps {
  onLogout: () => void
}

const QuizDetail: React.FC<QuizDetailProps> = ({ onLogout }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(5).fill(null))
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [opponents, setOpponents] = useState([
    { name: "Jane Doe", avatar: "JD", score: 0, answered: 0 },
    { name: "Alex Johnson", avatar: "AJ", score: 0, answered: 0 },
    { name: "Sarah Williams", avatar: "SW", score: 0, answered: 0 },
  ])

  // Mock quiz data
  const quiz = {
    title: "Database Normalization",
    course: "Database Systems",
    questions: [
      {
        id: 1,
        text: "Which normal form eliminates transitive dependencies?",
        options: [
          { id: "a", text: "First Normal Form (1NF)" },
          { id: "b", text: "Second Normal Form (2NF)" },
          { id: "c", text: "Third Normal Form (3NF)" },
          { id: "d", text: "Boyce-Codd Normal Form (BCNF)" },
        ],
        correctAnswer: "c",
      },
      {
        id: 2,
        text: "A relation is in 1NF if and only if:",
        options: [
          { id: "a", text: "It has no partial dependencies" },
          { id: "b", text: "It has no transitive dependencies" },
          { id: "c", text: "All its attributes are atomic" },
          { id: "d", text: "It has no multi-valued dependencies" },
        ],
        correctAnswer: "c",
      },
      {
        id: 3,
        text: "Which of the following is NOT a type of database key?",
        options: [
          { id: "a", text: "Primary Key" },
          { id: "b", text: "Foreign Key" },
          { id: "c", text: "Composite Key" },
          { id: "d", text: "Reference Key" },
        ],
        correctAnswer: "d",
      },
      {
        id: 4,
        text: "What is a superkey?",
        options: [
          { id: "a", text: "A key that uniquely identifies each record in a table" },
          { id: "b", text: "A key that contains no redundant attributes" },
          { id: "c", text: "A key that references another table" },
          { id: "d", text: "A key that consists of multiple attributes" },
        ],
        correctAnswer: "a",
      },
      {
        id: 5,
        text: "Which normal form deals with multi-valued dependencies?",
        options: [
          { id: "a", text: "3NF" },
          { id: "b", text: "BCNF" },
          { id: "c", text: "4NF" },
          { id: "d", text: "5NF" },
        ],
        correctAnswer: "c",
      },
    ],
  }

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !quizSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, quizSubmitted])

  // Simulate opponent progress
  useEffect(() => {
    if (quizSubmitted) return

    const interval = setInterval(() => {
      setOpponents((prev) =>
        prev.map((opponent) => {
          // Randomly decide if opponent answers a question
          if (Math.random() > 0.7 && opponent.answered < quiz.questions.length) {
            const correct = Math.random() > 0.3 // 70% chance of correct answer
            return {
              ...opponent,
              answered: opponent.answered + 1,
              score: correct ? opponent.score + 20 : opponent.score,
            }
          }
          return opponent
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [quizSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
      setShowFeedback(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setShowFeedback(false)
    }
  }

  const handleSubmit = () => {
    setQuizSubmitted(true)
    // Calculate score and show results
    setTimeout(() => {
      navigate("/quiz/results")
    }, 3000)
  }

  const handleCheckAnswer = () => {
    setShowFeedback(true)
  }

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="mb-8 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{quiz.course}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 rounded-full bg-indigo-100 px-4 py-2 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300">
              <i className="feather-clock h-5 w-5"></i>
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Submit Quiz
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </h2>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      showFeedback && selectedAnswer === quiz.questions[currentQuestion].correctAnswer
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                        : showFeedback
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {showFeedback && selectedAnswer === quiz.questions[currentQuestion].correctAnswer
                      ? "Correct"
                      : showFeedback
                        ? "Incorrect"
                        : "20 Points"}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-6">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {quiz.questions[currentQuestion].text}
                  </p>
                  <div className="space-y-3">
                    {quiz.questions[currentQuestion].options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                          showFeedback && option.id === quiz.questions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
                            : showFeedback &&
                                selectedAnswer === option.id &&
                                option.id !== quiz.questions[currentQuestion].correctAnswer
                              ? "border-red-500 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                              : selectedAnswer === option.id
                                ? "border-indigo-500 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/20"
                                : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                        }`}
                        onClick={() => !showFeedback && handleAnswerSelect(option.id)}
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600">
                          {selectedAnswer === option.id && (
                            <div className="h-3 w-3 rounded-full bg-indigo-600 dark:bg-indigo-500"></div>
                          )}
                        </div>
                        <label className="w-full cursor-pointer text-gray-900 dark:text-white">{option.text}</label>
                        {showFeedback && option.id === quiz.questions[currentQuestion].correctAnswer && (
                          <i className="feather-check-circle h-5 w-5 text-green-500"></i>
                        )}
                        {showFeedback &&
                          selectedAnswer === option.id &&
                          option.id !== quiz.questions[currentQuestion].correctAnswer && (
                            <i className="feather-x-circle h-5 w-5 text-red-500"></i>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-200 p-4 dark:border-gray-700">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                    currentQuestion === 0
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700"
                      : "text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  }`}
                >
                  Previous
                </button>
                <div className="space-x-2">
                  {!showFeedback && selectedAnswer && (
                    <button
                      onClick={handleCheckAnswer}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Check Answer
                    </button>
                  )}
                  {(showFeedback || !selectedAnswer) && (
                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === quiz.questions.length - 1}
                      className={`inline-flex items-center px-4 py-2 border ${
                        currentQuestion === quiz.questions.length - 1
                          ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700"
                          : "border-transparent text-white bg-indigo-600 hover:bg-indigo-700"
                      } rounded-md shadow-sm text-sm font-medium`}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  className={`h-10 w-10 rounded-md ${
                    index === currentQuestion
                      ? "bg-indigo-600 text-white"
                      : answers[index]
                        ? "border border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setCurrentQuestion(index)
                    setSelectedAnswer(answers[index])
                    setShowFeedback(false)
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Leaderboard</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">See how you compare to others</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                        2
                      </div>
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                        You
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">You</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {answers.filter(Boolean).length} answered
                        </p>
                      </div>
                    </div>
                    <div className="text-right font-semibold text-gray-900 dark:text-white">
                      {answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length * 20}{" "}
                      pts
                    </div>
                  </div>

                  {opponents.map((opponent, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {index + 1 === 0 ? 1 : index + 1 === 1 ? 3 : 4}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                          {opponent.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{opponent.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{opponent.answered} answered</p>
                        </div>
                      </div>
                      <div className="text-right font-semibold text-gray-900 dark:text-white">{opponent.score} pts</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quiz Stats</h2>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Questions:</span>
                    <span className="text-gray-900 dark:text-white">{quiz.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Answered:</span>
                    <span className="text-gray-900 dark:text-white">
                      {answers.filter(Boolean).length} of {quiz.questions.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Time Left:</span>
                    <span className="text-gray-900 dark:text-white">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {quizSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">Quiz Submitted!</h2>
              <p className="text-center text-gray-600 dark:text-gray-300">Calculating your results...</p>
              <div className="mt-6 flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                <p className="text-gray-700 dark:text-gray-300">Redirecting to results page...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizDetail
