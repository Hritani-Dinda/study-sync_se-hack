"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

interface NavbarProps {
  onLogout: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "home" },
    { name: "Courses", href: "/courses", icon: "book-open" },
    { name: "Content Hub", href: "/content-hub", icon: "file-text" },
    { name: "Quizzes", href: "/quiz", icon: "award" },
    { name: "Leaderboard", href: "/leaderboard", icon: "bar-chart-2" },
    { name: "Profile", href: "/profile", icon: "user" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Simple icon component using Feather icons classes
  const Icon = ({ name }: { name: string }) => <i className={`feather-${name} h-5 w-5`}></i>

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Campus LMS</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? "border-indigo-500 text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <span className="mr-2">
                    <i className={`feather-${item.icon}`}></i>
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {theme === "dark" ? <i className="feather-sun h-5 w-5"></i> : <i className="feather-moon h-5 w-5"></i>}
            </button>
            <div className="ml-3 relative">
              <button
                onClick={onLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {theme === "dark" ? <i className="feather-sun h-5 w-5"></i> : <i className="feather-moon h-5 w-5"></i>}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <i className="feather-x h-6 w-6"></i> : <i className="feather-menu h-6 w-6"></i>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-gray-700 dark:text-white"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2">
                  <i className={`feather-${item.icon}`}></i>
                </span>
                {item.name}
              </Link>
            ))}
            <button
              onClick={onLogout}
              className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="mr-2">
                <i className="feather-log-out"></i>
              </span>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
