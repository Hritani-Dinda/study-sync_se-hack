"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import CourseCard from "../components/CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [studyStreak, setStudyStreak] = useState(7);
  const navigate = useNavigate();

  const carouselItems = [
    {
      title: "Upcoming Quiz: Database Normalization",
      description:
        "Prepare for your upcoming quiz on database normalization concepts",
      icon: "award",
      link: "/quiz/database-normalization",
      linkText: "Prepare Now",
      badge: "In 2 Days",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
    },
    {
      title: "New Course Available: Machine Learning Basics",
      description: "Enroll in our new course on machine learning fundamentals",
      icon: "book-open",
      link: "/courses/machine-learning",
      linkText: "Enroll Now",
      badge: "New",
      color: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
    },
    {
      title: "Your Performance Report is Ready",
      description: "View your latest performance metrics across all courses",
      icon: "bar-chart-2",
      link: "/performance",
      linkText: "View Report",
      badge: "Updated",
      color: "bg-gradient-to-r from-purple-500 to-pink-600 text-white",
    },
  ];

  const nextSlide = () => {
    setCurrentCarouselIndex(
      (prevIndex) => (prevIndex + 1) % carouselItems.length
    );
  };

  const prevSlide = () => {
    setCurrentCarouselIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Add smooth scroll to top when changing tabs
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleScheduleClick = () => {
    navigate("/schedule");
  };

  // Quick stats data
  const quickStats = [
    { label: "Today's Study Time", value: "2.5h", progress: 75 },
    { label: "Course Completion", value: "65%", progress: 65 },
    { label: "Quiz Performance", value: "88%", progress: 88 },
    { label: "Task Completion", value: "90%", progress: 90 },
  ];

  // Motivational quotes
  const quotes = [
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The only way to do great work is to love what you do.",
    "Don't watch the clock; do what it does. Keep going.",
  ];

  // Weather data (mock)
  const weather = {
    temperature: 22,
    condition: "Sunny",
    icon: "sun",
  };

  // Calendar events (mock)
  const upcomingEvents = [
    { time: "10:00 AM", title: "Database Lecture", type: "lecture" },
    { time: "2:00 PM", title: "Group Study Session", type: "study" },
    { time: "4:30 PM", title: "Quiz Preparation", type: "quiz" },
  ];

  const courses = [
    {
      id: "cs101",
      title: "Computer Science 101",
      instructor: "Dr. Alan Turing",
      progress: 75,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: "from-blue-500 to-indigo-600",
      link: "/courses/computer-science",
    },
    {
      id: "ds201",
      title: "Data Structures & Algorithms",
      instructor: "Prof. Ada Lovelace",
      progress: 45,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: "from-purple-500 to-pink-600",
      link: "/courses/data-structures",
    },
    {
      id: "db301",
      title: "Database Systems",
      instructor: "Dr. Edgar Codd",
      progress: 90,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: "from-green-500 to-emerald-600",
      link: "/courses/database-systems",
    },
    {
      id: "web401",
      title: "Web Development",
      instructor: "Prof. Tim Berners-Lee",
      progress: 30,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      color: "from-yellow-500 to-orange-600",
      link: "/courses/web-development",
    },
  ];

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "dark" : ""
      } bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300`}
    >
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Enhanced Header with Search */}
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Welcome Back, John! 👋
                </motion.h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Here's what's happening with your courses today.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses, quizzes, or materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                  <i className="feather-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNotificationClick}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <i className="feather-bell mr-2 h-4 w-4"></i>
                  Notifications
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScheduleClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  <i className="feather-calendar mr-2 h-4 w-4"></i>
                  Schedule
                </motion.button>
              </div>
            </div>

            {/* Study Streak and Weather Widget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Study Streak</h3>
                    <p className="text-3xl font-bold">{studyStreak} days</p>
                    <p className="text-sm opacity-80">Keep it up! 🔥</p>
                  </div>
                  <div className="text-4xl">🔥</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Today's Weather</h3>
                    <p className="text-3xl font-bold">
                      {weather.temperature}°C
                    </p>
                    <p className="text-sm opacity-80">{weather.condition}</p>
                  </div>
                  <i className={`feather-${weather.icon} text-4xl`}></i>
                </div>
              </motion.div>
            </div>

            {/* Quick Stats with Circular Progress */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-12 h-12">
                      <CircularProgressbar
                        value={stat.progress}
                        text={`${stat.progress}%`}
                        styles={buildStyles({
                          pathColor: "#6366F1",
                          textColor: "#4B5563",
                          trailColor: "#E5E7EB",
                        })}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Courses Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate(course.link)}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                  >
                    <div
                      className={`h-32 bg-gradient-to-r ${course.color}`}
                    ></div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {course.instructor}
                      </p>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center">
                <i className="feather-quote-left text-4xl opacity-50 mr-4"></i>
                <div>
                  <p className="text-lg italic">
                    {quotes[Math.floor(Math.random() * quotes.length)]}
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    - StudySync Motivation
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Calendar Mini-Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Today's Schedule
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm text-gray-500 dark:text-gray-400">
                      {event.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {event.type}
                      </p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                      <i className="feather-arrow-right"></i>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Action Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-4 shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              onClick={() => navigate("/quick-action")}
            >
              <i className="feather-plus h-6 w-6"></i>
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
