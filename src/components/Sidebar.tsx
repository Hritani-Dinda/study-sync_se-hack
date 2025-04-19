"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

interface SidebarProps {
  onLogout: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true)
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            {isOpen ? (
              <span className="text-xl font-bold text-gray-900 dark:text-white">Campus LMS</span>
            ) : (
              <span className="text-xl font-bold text-gray-900 dark:text-white">LMS</span>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <i className="feather-chevron-left h-5 w-5"></i>
              ) : (
                <i className="feather-chevron-right h-5 w-5"></i>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? "bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    } flex items-center p-2 rounded-md group`}
                  >
                    <i className={`feather-${item.icon} h-5 w-5`}></i>
                    {isOpen && <span className="ml-3">{item.name}</span>}
                    {!isOpen && (
                      <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-gray-100 invisible group-hover:visible">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {isOpen && (
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                    <i className="feather-user h-4 w-4"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
                  </div>
                </div>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
              >
                {theme === "dark" ? <i className="feather-sun h-5 w-5"></i> : <i className="feather-moon h-5 w-5"></i>}
              </button>
            </div>
            <button
              onClick={onLogout}
              className={`${
                isOpen ? "flex items-center w-full" : "flex justify-center"
              } mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none`}
            >
              <i className="feather-log-out h-4 w-4"></i>
              {isOpen && <span className="ml-2">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
