"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { useTheme } from "../context/ThemeContext"

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      name: "Role-Based Dashboards",
      description:
        "Personalized dashboards for students, instructors, and admins with role-specific tools and insights.",
      icon: "users",
    },
    {
      name: "Structured Course Creation",
      description: "Design sequential learning pathways with multimedia content and prerequisites.",
      icon: "book-open",
    },
    {
      name: "Centralized Content Hub",
      description: "Searchable library of course materials with integrated viewers and version control.",
      icon: "file-text",
    },
    {
      name: "Multiplayer Quiz Battles",
      description: "Real-time peer competitions with instant feedback and live leaderboards.",
      icon: "award",
    },
    {
      name: "Performance Analytics",
      description: "Detailed insights into student progress and instructor effectiveness.",
      icon: "bar-chart-2",
    },
    {
      name: "Cross-Device Experience",
      description: "Fully optimized for both mobile and desktop with offline access.",
      icon: "smartphone",
    },
    {
      name: "Admin & Moderation Tools",
      description: "Comprehensive tools for managing courses, users, and content.",
      icon: "shield",
    },
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Computer Science Student",
      content:
        "The multiplayer quiz battles have completely changed how I study. Competing with classmates makes learning fun and motivates me to improve.",
      avatar: "AJ",
    },
    {
      name: "Dr. Sarah Chen",
      role: "Professor of Biology",
      content:
        "As an instructor, I can easily create structured courses and track student progress. The analytics help me identify where students need additional support.",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "Engineering Student",
      content:
        "The content hub is a game-changer. Having all course materials in one searchable place saves me hours of time each week.",
      avatar: "MR",
    },
    {
      name: "Prof. David Kim",
      role: "Department Chair",
      content:
        "The admin tools give us unprecedented visibility into engagement across courses. We've seen a 40% increase in student participation since adopting this platform.",
      avatar: "DK",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-sm backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Campus LMS</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {theme === "dark" ? <i className="feather-sun h-5 w-5"></i> : <i className="feather-moon h-5 w-5"></i>}
            </button>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Log in
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Transform Campus Learning with
                <span className="text-indigo-600 dark:text-indigo-400"> Interactive Experiences</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                A modern learning management system that combines structured courses, centralized content, and real-time
                multiplayer quizzes to make learning engaging and competitive.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full sm:w-auto"
                >
                  Get Started
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 w-full sm:w-auto"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Powerful Features for Modern Learning
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Our platform combines the best of structured learning with engaging interactive elements
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-7xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div key={feature.name} className="relative pl-16">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <i className={`feather-${feature.icon} h-6 w-6`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Loved by Students and Educators
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Hear what our users have to say about their experience
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
