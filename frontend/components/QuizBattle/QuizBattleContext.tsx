"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { io, type Socket } from "socket.io-client"

type Participant = {
  userId?: string
  username: string
  score: number
}

type Question = {
  id: string
  text: string
  options: string[]
  timeLimit: number
  correctAnswer?: string // Hidden on client until answered
}

type QuizBattleContextType = {
  socket: Socket | null
  username: string
  roomId: string
  isConnected: boolean
  isInRoom: boolean
  isQuizActive: boolean
  participants: Participant[]
  currentQuestion: Question | null
  leaderboard: Participant[]
  questionTimeLeft: number
  lastAnswerResult: {
    isCorrect: boolean
    score: number
    correctAnswer: string
  } | null
  quizComplete: boolean
  setUsername: (name: string) => void
  setRoomId: (id: string) => void
  joinRoom: () => void
  startQuiz: (questions: Question[]) => void
  submitAnswer: (answer: string) => void
  nextQuestion: () => void
}

export const QuizBattleContext = createContext<QuizBattleContextType | null>(null)

export const useQuizBattle = () => {
  const context = useContext(QuizBattleContext)
  if (!context) {
    throw new Error("useQuizBattle must be used within a QuizBattleProvider")
  }
  return context
}

type QuizBattleProviderProps = {
  children: ReactNode
}

export const QuizBattleProvider = ({ children }: QuizBattleProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isInRoom, setIsInRoom] = useState(false)
  const [isQuizActive, setIsQuizActive] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [leaderboard, setLeaderboard] = useState<Participant[]>([])
  const [questionTimeLeft, setQuestionTimeLeft] = useState(0)
  const [lastAnswerResult, setLastAnswerResult] = useState<{
    isCorrect: boolean
    score: number
    correctAnswer: string
  } | null>(null)
  const [quizComplete, setQuizComplete] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io()
    setSocket(socketInstance)

    socketInstance.on("connect", () => {
      setIsConnected(true)
      console.log("Connected to Socket.IO server")
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from Socket.IO server")
    })

    return () => {
      if (timer) clearInterval(timer)
      socketInstance.disconnect()
    }
  }, [])

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return

    // Room events
    socket.on("userJoined", ({ participants: roomParticipants }) => {
      setParticipants(roomParticipants)
      setIsInRoom(true)
    })

    socket.on("userLeft", ({ participants: roomParticipants }) => {
      setParticipants(roomParticipants)
    })

    // Quiz events
    socket.on("newQuestion", (question: Question) => {
      setCurrentQuestion(question)
      setIsQuizActive(true)
      setLastAnswerResult(null)

      // Start countdown timer
      if (timer) clearInterval(timer)
      setQuestionTimeLeft(question.timeLimit)

      const countdownTimer = setInterval(() => {
        setQuestionTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      setTimer(countdownTimer)
    })

    socket.on("questionTimeUp", ({ correctAnswer }) => {
      if (timer) clearInterval(timer)
      setQuestionTimeLeft(0)

      if (currentQuestion && !lastAnswerResult) {
        setLastAnswerResult({
          isCorrect: false,
          score: 0,
          correctAnswer,
        })
      }
    })

    socket.on("answerResult", (result) => {
      if (timer) clearInterval(timer)
      setLastAnswerResult(result)
    })

    socket.on("leaderboardUpdate", (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard)
    })

    socket.on("quizComplete", ({ leaderboard: finalLeaderboard }) => {
      setLeaderboard(finalLeaderboard)
      setIsQuizActive(false)
      setCurrentQuestion(null)
      setQuizComplete(true)
    })

    return () => {
      socket.off("userJoined")
      socket.off("userLeft")
      socket.off("newQuestion")
      socket.off("questionTimeUp")
      socket.off("answerResult")
      socket.off("leaderboardUpdate")
      socket.off("quizComplete")
    }
  }, [socket, currentQuestion, lastAnswerResult, timer])

  const joinRoom = () => {
    if (socket && username && roomId) {
      socket.emit("joinRoom", { roomId, username })
    }
  }

  const startQuiz = (questions: Question[]) => {
    if (socket && isInRoom) {
      socket.emit("startQuiz", { roomId, questions })
    }
  }

  const submitAnswer = (answer: string) => {
    if (socket && isInRoom && currentQuestion) {
      socket.emit("submitAnswer", { roomId, answer })
    }
  }

  const nextQuestion = () => {
    if (socket && isInRoom) {
      socket.emit("nextQuestion", { roomId })
    }
  }

  const value = {
    socket,
    username,
    roomId,
    isConnected,
    isInRoom,
    isQuizActive,
    participants,
    currentQuestion,
    leaderboard,
    questionTimeLeft,
    lastAnswerResult,
    quizComplete,
    setUsername,
    setRoomId,
    joinRoom,
    startQuiz,
    submitAnswer,
    nextQuestion,
  }

  return <QuizBattleContext.Provider value={value}>{children}</QuizBattleContext.Provider>
}
