"use client"

import { useState } from "react"
import { useQuizBattle } from "./QuizBattleContext"

export default function QuizQuestion() {
  const { currentQuestion, questionTimeLeft, submitAnswer, lastAnswerResult, nextQuestion } = useQuizBattle()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)

  if (!currentQuestion) return null

  const handleSubmitAnswer = () => {
    if (selectedAnswer && !hasAnswered) {
      submitAnswer(selectedAnswer)
      setHasAnswered(true)
    }
  }

  const handleNextQuestion = () => {
    nextQuestion()
    setSelectedAnswer(null)
    setHasAnswered(false)
  }

  // Calculate progress bar width
  const progressPercentage = (questionTimeLeft / currentQuestion.timeLimit) * 100

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      {lastAnswerResult ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">{lastAnswerResult.isCorrect ? "Correct!" : "Incorrect!"}</h2>
          <div className={`text-2xl font-bold mb-4 ${lastAnswerResult.isCorrect ? "text-green-500" : "text-red-500"}`}>
            {lastAnswerResult.isCorrect ? "+" + lastAnswerResult.score : "0"} points
          </div>

          <p className="mb-4">
            The correct answer was: <span className="font-semibold">{lastAnswerResult.correctAnswer}</span>
          </p>

          <button
            onClick={handleNextQuestion}
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next Question
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Time left: {questionTimeLeft}s</span>
              <span>Question {currentQuestion.id}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !hasAnswered && setSelectedAnswer(option)}
                className={`w-full py-2 px-4 border rounded-md text-left transition-colors ${
                  selectedAnswer === option ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-gray-400"
                }`}
                disabled={hasAnswered}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || hasAnswered || questionTimeLeft === 0}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Submit Answer
          </button>
        </>
      )}
    </div>
  )
}
