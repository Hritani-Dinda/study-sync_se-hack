"use client"

import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Timer, Trophy, Users, CheckCircle, XCircle, ArrowLeft, Share2, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Player = {
  id: string
  username: string
  score: number
  hasAnswered?: boolean
}

type Question = {
  id: number
  question: string
  options: string[]
  correct: number
}

// Sample quiz questions for reference
const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary purpose of database normalization?",
    options: [
      "To improve query performance",
      "To reduce data redundancy and dependency",
      "To increase storage efficiency",
      "To simplify database design"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: [
      "Bubble Sort",
      "Quick Sort",
      "Insertion Sort",
      "Selection Sort"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    id: 4,
    question: "Which of the following is NOT a JavaScript framework?",
    options: [
      "React",
      "Angular",
      "Vue",
      "Django"
    ],
    correct: 3
  },
  {
    id: 5,
    question: "What is the time complexity of binary search?",
    options: [
      "O(n)",
      "O(n log n)",
      "O(log n)",
      "O(n²)"
    ],
    correct: 2
  }
]

type GameState = "joining" | "waiting" | "playing" | "finished"

export default function QuizBattle() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameState, setGameState] = useState<GameState>("joining")
  const [room, setRoom] = useState("")
  const [username, setUsername] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isHost, setIsHost] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(30) // 30 seconds per question
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [totalQuestions, setTotalQuestions] = useState<number>(0)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null)
  const [isStartingGame, setIsStartingGame] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    newSocket.on("connect", () => {
      console.log("Connected to server")
      setIsConnected(true)
      setError(null)
      toast({
        title: "Connected to server",
        description: "You can now join or create a quiz battle room",
      })
    })

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err)
      setError("Failed to connect to server. Please try again.")
      setIsConnected(false)
      toast({
        title: "Connection error",
        description: "Failed to connect to server. Please try again.",
        variant: "destructive",
      })
    })

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server")
      setIsConnected(false)
      setError("Disconnected from server. Trying to reconnect...")
      toast({
        title: "Disconnected",
        description: "Disconnected from server. Trying to reconnect...",
        variant: "destructive",
      })
    })

    newSocket.on("error", (data) => {
      console.error("Server error:", data)
      setError(data.message || "An error occurred")
      setIsStartingGame(false)
      toast({
        title: "Error",
        description: data.message || "An error occurred",
        variant: "destructive",
      })
    })

    newSocket.on("userJoined", ({ participants, host }) => {
      console.log("Players updated:", participants)
      console.log("Host ID:", host)
      console.log("Current socket ID:", newSocket.id)
      console.log("Is host?", host === newSocket.id)
      
      // If host is undefined and there are participants, set the first player as host
      if (!host && participants.length > 0) {
        host = participants[0].id;
        console.log("Setting first player as host:", host);
      }
      
      setPlayers(participants)
      setIsHost(host === newSocket.id)
      setError(null)
      
      if (participants.length > 1) {
        toast({
          title: "New player joined",
          description: `${participants[participants.length - 1].username} has joined the room`,
        })
      }
    })

    newSocket.on("userLeft", ({ participants, host }) => {
      console.log("Player left, remaining:", participants)
      console.log("New host:", host)
      setPlayers(participants)
      setIsHost(host === newSocket.id)
      
      if (participants.length < players.length) {
        const leftPlayer = players.find(p => !participants.some((np: Player) => np.id === p.id))
        if (leftPlayer) {
          toast({
            title: "Player left",
            description: `${leftPlayer.username} has left the room`,
          })
        }
      }
    })

    newSocket.on("gameStart", (questionData: Question) => {
      console.log("Game started with question:", questionData)
      setGameState("playing")
      setCurrentQuestion(questionData)
      setHasAnswered(false)
      setSelectedAnswer(null)
      setError(null)
      setTimeLeft(30) // Reset timer to 30 seconds
      setShowCorrectAnswer(false)
      setCorrectAnswerIndex(null)
      setQuestionNumber(1)
      setTotalQuestions(sampleQuestions.length)
      setIsStartingGame(false)
      
      // Start countdown timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      toast({
        title: "Game started!",
        description: "Answer the questions as quickly as possible to earn more points",
      })
    })

    newSocket.on("updateScores", (newScores: Record<string, number>) => {
      console.log("Scores updated:", newScores)
      setScores(newScores)
    })

    newSocket.on("gameEnd", (finalScores: Record<string, number>) => {
      console.log("Game ended with scores:", finalScores)
      setScores(finalScores)
      setGameState("finished")
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      // Sort players by score for the leaderboard
      const sortedPlayers = [...players].sort((a, b) => 
        (finalScores[b.id] || 0) - (finalScores[a.id] || 0)
      );
      
      toast({
        title: "Game over!",
        description: "Check the leaderboard to see the final results",
      })
    })

    newSocket.on("nextQuestion", (data: { question: Question, questionNumber: number, totalQuestions: number }) => {
      console.log("Next question received:", data)
      setCurrentQuestion(data.question)
      setQuestionNumber(data.questionNumber)
      setTotalQuestions(data.totalQuestions)
      setHasAnswered(false)
      setSelectedAnswer(null)
      setTimeLeft(30) // Reset timer to 30 seconds
      setShowCorrectAnswer(false)
      setCorrectAnswerIndex(null)
      
      // Start countdown timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    })

    newSocket.on("showCorrectAnswer", (correctIndex: number) => {
      console.log("Showing correct answer:", correctIndex)
      setShowCorrectAnswer(true)
      setCorrectAnswerIndex(correctIndex)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    })

    setSocket(newSocket)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      newSocket.disconnect()
    }
  }, [toast])

  // Auto-submit answer when timer runs out
  useEffect(() => {
    if (gameState === "playing" && timeLeft === 0 && !hasAnswered && currentQuestion) {
      console.log("Time's up! Auto-submitting answer");
      // Auto-submit with no answer (-1)
      if (socket && room) {
        socket.emit("submitAnswer", { roomId: room, answer: -1 });
        setHasAnswered(true);
        
        setTimeout(() => {
          if (currentQuestion) {
            setShowCorrectAnswer(true);
            setCorrectAnswerIndex(currentQuestion.correct);
          }
        }, 1000);
      }
    }
  }, [timeLeft, gameState, hasAnswered, currentQuestion, socket, room]);

  const handleJoinRoom = (roomId: string) => {
    if (!isConnected) {
      setError("Not connected to server. Please try again.")
      return
    }
    
    if (socket && roomId.trim() && username.trim()) {
      console.log(`Joining room ${roomId} as ${username}`)
      socket.emit("joinRoom", { roomId: roomId.trim(), username: username.trim() })
      setRoom(roomId.trim())
      setGameState("waiting")
      setError(null)
    } else {
      setError("Please enter both username and room code")
    }
  }

  const handleCreateRoom = () => {
    if (!isConnected) {
      setError("Not connected to server. Please try again.")
      return
    }
    
    if (username.trim()) {
      const newRoomId = Math.random().toString(36).substring(7)
      handleJoinRoom(newRoomId)
    } else {
      setError("Please enter a username")
    }
  }

  const handleStartGame = () => {
    if (!isConnected || isStartingGame) {
      return
    }
    
    setIsStartingGame(true)
    setError(null)
    
    if (socket && room) {
      // If we're the first player, we should be able to start the game
      if (players.length > 0 && players[0].id === socket.id) {
        console.log("Starting game as first player")
        console.log("Room ID:", room)
        // Send sample questions to the server
        socket.emit("startGame", { 
          roomId: room,
          questions: sampleQuestions 
        })
      } else if (isHost) {
        console.log("Starting game as host")
        console.log("Room ID:", room)
        // Send sample questions to the server
        socket.emit("startGame", { 
          roomId: room,
          questions: sampleQuestions 
        })
      } else {
        console.log("Cannot start game:", { 
          socket: !!socket, 
          room: !!room, 
          isHost,
          isFirstPlayer: players.length > 0 && players[0].id === socket.id
        })
        setError("You must be the host to start the game")
        setIsStartingGame(false)
      }
    } else {
      setError("Connection error. Please try again.")
      setIsStartingGame(false)
    }
  }

  const handleAnswer = (answerIndex: number) => {
    if (!isConnected) {
      setError("Not connected to server. Please try again.")
      return
    }
    
    if (socket && room && !hasAnswered) {
      console.log(`Submitting answer ${answerIndex} for room ${room}`)
      socket.emit("submitAnswer", { roomId: room, answer: answerIndex })
      setSelectedAnswer(answerIndex)
      setHasAnswered(true)
      setError(null)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      // Show the correct answer after a short delay
      setTimeout(() => {
        if (currentQuestion) {
          setShowCorrectAnswer(true)
          setCorrectAnswerIndex(currentQuestion.correct)
        }
      }, 1000)
    }
  }

  const handlePlayAgain = () => {
    setGameState("joining")
    setRoom("")
    setPlayers([])
    setCurrentQuestion(null)
    setScores({})
    setSelectedAnswer(null)
    setHasAnswered(false)
    setIsHost(false)
    setError(null)
    setTimeLeft(30)
    setQuestionNumber(0)
    setTotalQuestions(0)
    setShowCorrectAnswer(false)
    setCorrectAnswerIndex(null)
  }

  const renderError = () => {
    if (!error) return null
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  const renderJoinRoom = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Join Quiz Battle</CardTitle>
        <CardDescription className="text-center">
          Enter your username and room code to join a battle, or create a new room
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderError()}
        <div className="space-y-4">
          <Input 
            placeholder="Enter your username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="mb-2"
            disabled={!isConnected}
          />
          <Input 
            placeholder="Enter room code" 
            value={room} 
            onChange={(e) => setRoom(e.target.value)} 
            disabled={!isConnected}
          />
          <div className="flex flex-col gap-2">
            <Button 
              onClick={() => handleJoinRoom(room)} 
              disabled={!room.trim() || !username.trim() || !isConnected}
            >
              Join Room
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCreateRoom} 
              disabled={!username.trim() || !isConnected}
            >
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
        <CardDescription className="text-center">
          Room Code: <Badge variant="outline" className="ml-1">{room}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderError()}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Players ({players.length})</span>
            <span className="text-sm text-muted-foreground">
              {isHost ? "You are the host" : "Waiting for host to start"}
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  <span>{player.username}</span>
                  {player.id === socket?.id && <Badge>You</Badge>}
                  {player.id === socket?.id && isHost && <Badge variant="secondary">Host</Badge>}
                  {index === 0 && <Badge variant="outline">First Player</Badge>}
                </div>
                <span className="text-sm text-muted-foreground">
                  {scores[player.id] || 0} points
                </span>
              </div>
            ))}
          </div>
          {(isHost || (players.length > 0 && players[0].id === socket?.id)) && (
            <Button 
              className="w-full mt-4" 
              onClick={handleStartGame}
              disabled={players.length < 1 || !isConnected || isStartingGame}
            >
              {isStartingGame ? "Starting Game..." : "Start Game"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderQuestion = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-2xl">Question {questionNumber || 1}</CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>
        <Progress value={(timeLeft / 30) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {renderError()}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion?.options.map((option, index) => (
            <Button
              key={index}
              variant={
                showCorrectAnswer 
                  ? index === correctAnswerIndex 
                    ? "default" 
                    : index === selectedAnswer 
                      ? "destructive" 
                      : "outline"
                  : selectedAnswer === index 
                    ? "secondary" 
                    : "outline"
              }
              onClick={() => handleAnswer(index)}
              disabled={hasAnswered || !isConnected || showCorrectAnswer}
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
        <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
        <CardDescription className="text-center">Room Code: <Badge variant="outline" className="ml-1">{room}</Badge></CardDescription>
      </CardHeader>
      <CardContent>
        {renderError()}
        <div className="mb-6 p-4 bg-muted rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-muted-foreground">Thanks for participating in the quiz battle.</p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Leaderboard</h3>
          {players
            .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
            .map((player, index) => (
              <div key={player.id} className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                  <span className="font-medium">{player.username}</span>
                  {player.id === socket?.id && <Badge>You</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{scores[player.id] || 0} points</span>
                  {index === 0 && <Badge variant="secondary">Winner</Badge>}
                </div>
              </div>
            ))}
        </div>
        <div className="flex gap-2 mt-6">
          <Button 
            className="w-full" 
            onClick={handlePlayAgain}
            disabled={!isConnected}
          >
            Play Again
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              toast({
                title: "Link copied",
                description: "Room link copied to clipboard",
              })
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
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
