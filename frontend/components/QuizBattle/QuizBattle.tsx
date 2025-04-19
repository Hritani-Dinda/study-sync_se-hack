"use client"

import { useState, useEffect } from "react"
import { io, type Socket } from "socket.io-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Player = {
  id: string
  score: number
}

type Question = {
  id: number
  question: string
  options: string[]
  correct: number
}

type GameState = "joining" | "waiting" | "playing" | "finished"

export default function QuizBattle() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameState, setGameState] = useState<GameState>("joining")
  const [room, setRoom] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)

  useEffect(() => {
    const newSocket = io("http://localhost:3001")

    newSocket.on("connect", () => {
      console.log("Connected to server")
    })

    newSocket.on("playerJoined", (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers)
    })

    newSocket.on("gameStart", (questionData: Question) => {
      setGameState("playing")
      setCurrentQuestion(questionData)
      setHasAnswered(false)
      setSelectedAnswer(null)
    })

    newSocket.on("updateScores", (newScores: Record<string, number>) => {
      setScores(newScores)
    })

    newSocket.on("gameEnd", (finalScores: Record<string, number>) => {
      setScores(finalScores)
      setGameState("finished")
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleJoinRoom = (roomId: string) => {
    if (socket && roomId.trim()) {
      setRoom(roomId)
      socket.emit("joinRoom", roomId)
      setGameState("waiting")
    }
  }

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(7)
    handleJoinRoom(newRoomId)
  }

  const handleStartGame = () => {
    if (socket && room) {
      socket.emit("startGame", room)
    }
  }

  const handleAnswer = (answerIndex: number) => {
    if (socket && room && !hasAnswered) {
      socket.emit("submitAnswer", { room, answer: answerIndex })
      setSelectedAnswer(answerIndex)
      setHasAnswered(true)
    }
  }

  const renderJoinRoom = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Join Quiz Battle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input placeholder="Enter room code" value={room} onChange={(e) => setRoom(e.target.value)} />
          <div className="flex flex-col gap-2">
            <Button onClick={() => handleJoinRoom(room)} disabled={!room.trim()}>
              Join Room
            </Button>
            <Button variant="outline" onClick={handleCreateRoom}>
              Create New Room
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderWaitingRoom = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Waiting Room</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-lg mb-4">Room Code: {room}</p>
          <p className="mb-2">Players in room:</p>
          <div className="space-y-2">
            {players.map((player, index) => (
              <div key={player.id} className="flex justify-between items-center">
                <span>Player {index + 1}</span>
                {index === 0 && <Badge>Host</Badge>}
              </div>
            ))}
          </div>
        </div>
        {players[0]?.id === socket?.id && (
          <Button className="w-full" onClick={handleStartGame} disabled={players.length < 1}>
            Start Game
          </Button>
        )}
      </CardContent>
    </Card>
  )

  const renderQuestion = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{currentQuestion?.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion?.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "secondary" : "outline"}
              onClick={() => handleAnswer(index)}
              disabled={hasAnswered}
              className="w-full text-left justify-start h-auto py-4 px-6"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderLeaderboard = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Final Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {players
            .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
            .map((player, index) => (
              <div key={player.id} className="flex justify-between items-center">
                <span>Player {index + 1}</span>
                <span>{scores[player.id] || 0} points</span>
              </div>
            ))}
        </div>
        <Button className="w-full mt-6" onClick={() => setGameState("joining")}>
          Play Again
        </Button>
      </CardContent>
    </Card>
  )

  const renderGameState = () => {
    switch (gameState) {
      case "joining":
        return renderJoinRoom()
      case "waiting":
        return renderWaitingRoom()
      case "playing":
        return renderQuestion()
      case "finished":
        return renderLeaderboard()
      default:
        return null
    }
  }

  return <div className="container max-w-4xl mx-auto p-6">{renderGameState()}</div>
}
