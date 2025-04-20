import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ComputerScience: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                Computer Science 101
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Introduction to Programming and Algorithms
              </p>
            </div>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Enroll Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Preview Course
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">Course Overview</h3>
              <ul className="space-y-2">
                <li>• 12 Weeks Duration</li>
                <li>• 4 Projects</li>
                <li>• 24 Hours of Content</li>
                <li>• Certificate on Completion</li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2">
                <li>• Programming Fundamentals</li>
                <li>• Data Structures</li>
                <li>• Algorithms</li>
                <li>• Problem Solving</li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">Requirements</h3>
              <ul className="space-y-2">
                <li>• Basic Math Knowledge</li>
                <li>• No Prior Coding Required</li>
                <li>• Dedication to Learn</li>
                <li>• Computer Access</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Course Curriculum
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Introduction to Programming",
                  duration: "2 weeks",
                  progress: 100,
                },
                {
                  title: "Data Types and Variables",
                  duration: "1 week",
                  progress: 100,
                },
                {
                  title: "Control Structures",
                  duration: "2 weeks",
                  progress: 75,
                },
                {
                  title: "Functions and Modules",
                  duration: "2 weeks",
                  progress: 50,
                },
                {
                  title: "Object-Oriented Programming",
                  duration: "3 weeks",
                  progress: 0,
                },
                { title: "Final Project", duration: "2 weeks", progress: 0 },
              ].map((module, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {module.duration}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {module.progress}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Instructor
            </h2>
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Instructor"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Dr. Alan Turing
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Professor of Computer Science
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Dr. Turing is a renowned computer scientist with over 20 years of
              experience in teaching and research. He specializes in algorithms
              and artificial intelligence.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Experience
                </p>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  20+ Years
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Students
                </p>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  10,000+
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComputerScience;
