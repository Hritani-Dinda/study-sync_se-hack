"use client"

import { useState } from "react"
import { useQuizBattle } from "./QuizBattleContext"

// Sample quiz questions - in production, these would come from your backend
const sampleQuestions = [
  {
    id: "1",
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    timeLimit: 15,
    correctAnswer: "Paris",
  },
  {
    id: "2",
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    timeLimit: 15,
    correctAnswer: "Mars",
  },
  {
    id: "3",
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    timeLimit: 10,
    correctAnswer: "4",
  },
]

export default function WaitingRoom() {
  const { roomId, participants, startQuiz } = useQuizBattle()
  const [isLoading, setIsLoading] = useState(false)

  const handleStartQuiz = () => {
    setIsLoading(true)
    // In a real app, you might fetch questions from an API here
    startQuiz(sampleQuestions)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Waiting Room</h2>
      <div className="mb-4">
        <p className="text-gray-600">
          Room ID: <span className="font-semibold">{roomId}</span>
        </p>
        <p className="text-gray-600 mt-2">Share this Room ID with friends to join!</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Participants ({participants.length})</h3>
        <ul className="border rounded-md divide-y">
          {participants.map((participant, index) => (
            <li key={index} className="px-4 py-2">
              {participant.username}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleStartQuiz}
        disabled={participants.length < 1 || isLoading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {isLoading ? "Starting..." : "Start Quiz Battle"}
      </button>
    </div>
  )
}
