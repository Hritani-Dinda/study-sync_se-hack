"use client"

import type React from "react"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import ContentHub from "./pages/ContentHub"
import Quiz from "./pages/Quiz"
import QuizDetail from "./pages/QuizDetail"
import QuizResults from "./pages/QuizResults"
import Leaderboard from "./pages/Leaderboard"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import { ThemeProvider } from "./context/ThemeContext"
import { SessionProvider } from "next-auth/react"

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Simple authentication handler
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return <>{children}</>
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/content-hub"
            element={
              <ProtectedRoute>
                <ContentHub onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <QuizDetail onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/results"
            element={
              <ProtectedRoute>
                <QuizResults onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
