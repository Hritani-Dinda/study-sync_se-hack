"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import LeaderboardCard from "../components/LeaderboardCard"

interface LeaderboardProps {
  onLogout: () => void
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overall")
  const [timeframe, setTimeframe] = useState("weekly")

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h2>
                <p className="text-gray-600 dark:text-gray-300">See how you rank against other students</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
                  <i className="feather-filter mr-2 h-4 w-4"></i>
                  Filter
                </button>
                <select
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="alltime">All Time</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {["overall", "courses", "quizzes"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium capitalize`}
                    >
                      {tab === "overall" ? "Overall" : tab === "courses" ? "By Course" : "Quiz Battles"}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="py-6">
                {activeTab === "overall" && (
                  <div className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-3">
                      {/* Top 3 students */}
                      <div className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-sm">
                        <div className="p-4 text-center border-b border-gray-200 dark:border-gray-700">
                          <i className="feather-award h-8 w-8 mx-auto text-gray-500"></i>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">2nd Place</h3>
                        </div>
                        <div className="p-6 text-center">
                          <div className="mx-auto h-16 w-16 rounded-full border-2 border-gray-300 bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                            JD
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Jane Doe</h3>
                          <p className="text-gray-600 dark:text-gray-300">Computer Science</p>
                          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">9,850 pts</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-b from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg shadow-sm">
                        <div className="p-4 text-center border-b border-yellow-200 dark:border-yellow-800">
                          <i className="feather-award h-8 w-8 mx-auto text-yellow-500"></i>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">1st Place</h3>
                        </div>
                        <div className="p-6 text-center">
                          <div className="mx-auto h-20 w-20 rounded-full border-4 border-yellow-300 bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white dark:border-yellow-600">
                            JS
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">John Smith</h3>
                          <p className="text-gray-600 dark:text-gray-300">Computer Science</p>
                          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">12,450 pts</div>
                          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                            Top Performer
                          </span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-2 border-orange-300 dark:border-orange-800 rounded-lg shadow-sm">
                        <div className="p-4 text-center border-b border-orange-200 dark:border-orange-800">
                          <i className="feather-award h-8 w-8 mx-auto text-orange-500"></i>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">3rd Place</h3>
                        </div>
                        <div className="p-6 text-center">
                          <div className="mx-auto h-16 w-16 rounded-full border-2 border-orange-300 bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white dark:border-orange-600">
                            AJ
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Alex Johnson</h3>
                          <p className="text-gray-600 dark:text-gray-300">Data Science</p>
                          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">8,720 pts</div>
                        </div>
                      </div>
                    </div>

                    <LeaderboardCard
                      title="Leaderboard Rankings"
                      description={
                        timeframe === "weekly"
                          ? "This Week's Top Performers"
                          : timeframe === "monthly"
                            ? "This Month's Top Performers"
                            : "All-Time Top Performers"
                      }
                      entries={[
                        {
                          rank: 1,
                          name: "John Smith",
                          avatar: "JS",
                          score: 12450,
                          department: "Computer Science",
                          badges: ["Top Performer", "Quiz Master"],
                        },
                        {
                          rank: 2,
                          name: "Jane Doe",
                          avatar: "JD",
                          score: 9850,
                          department: "Computer Science",
                          badges: ["Rising Star"],
                        },
                        {
                          rank: 3,
                          name: "Alex Johnson",
                          avatar: "AJ",
                          score: 8720,
                          department: "Data Science",
                          badges: [],
                        },
                        {
                          rank: 4,
                          name: "Sarah Williams",
                          avatar: "SW",
                          score: 7650,
                          department: "Cybersecurity",
                          badges: ["Consistent"],
                        },
                        {
                          rank: 5,
                          name: "Michael Brown",
                          avatar: "MB",
                          score: 7200,
                          department: "Software Engineering",
                          badges: [],
                        },
                        {
                          rank: 6,
                          name: "Emily Davis",
                          avatar: "ED",
                          score: 6890,
                          department: "Computer Science",
                          badges: [],
                        },
                        {
                          rank: 7,
                          name: "David Wilson",
                          avatar: "DW",
                          score: 6540,
                          department: "Artificial Intelligence",
                          badges: ["Most Improved"],
                        },
                        {
                          rank: 8,
                          name: "Lisa Taylor",
                          avatar: "LT",
                          score: 6120,
                          department: "Data Science",
                          badges: [],
                        },
                        {
                          rank: 9,
                          name: "Robert Martin",
                          avatar: "RM",
                          score: 5950,
                          department: "Software Engineering",
                          badges: [],
                        },
                        {
                          rank: 10,
                          name: "You",
                          avatar: "YO",
                          score: 5820,
                          department: "Computer Science",
                          badges: ["New Entry"],
                          highlight: true,
                        },
                      ]}
                    />
                  </div>
                )}

                {activeTab === "courses" && (
                  <div className="space-y-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {/* Course cards */}
                      {["Data Structures", "Machine Learning", "Web Development", "Database Systems"].map((course) => (
                        <div key={course} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{course}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {timeframe === "weekly"
                                ? "This Week's Leaders"
                                : timeframe === "monthly"
                                  ? "This Month's Leaders"
                                  : "All-Time Leaders"}
                            </p>
                          </div>
                          <div className="p-5">
                            <div className="space-y-4">
                              {[1, 2, 3].map((rank) => (
                                <div key={rank} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-gray-700 dark:text-white">
                                      {rank === 1 ? "JS" : rank === 2 ? "JD" : "AJ"}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {rank === 1 ? "John Smith" : rank === 2 ? "Jane Doe" : "Alex Johnson"}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {rank === 1 || rank === 2 ? "Computer Science" : "Data Science"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {rank === 1 ? "4,520" : rank === 2 ? "3,850" : "3,210"} pts
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Rank #{rank}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6">
                              <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                                View Full Ranking
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "quizzes" && (
                  <div className="space-y-8">
                    <LeaderboardCard
                      title="Quiz Battle Rankings"
                      description={
                        timeframe === "weekly"
                          ? "This Week's Quiz Champions"
                          : timeframe === "monthly"
                            ? "This Month's Quiz Champions"
                            : "All-Time Quiz Champions"
                      }
                      entries={[
                        {
                          rank: 1,
                          name: "John Smith",
                          avatar: "JS",
                          score: 98,
                          department: "Computer Science",
                          badges: ["Quiz Master"],
                          additionalInfo: "Won 45 battles",
                        },
                        {
                          rank: 2,
                          name: "Sarah Williams",
                          avatar: "SW",
                          score: 95,
                          department: "Cybersecurity",
                          badges: ["Consistent"],
                          additionalInfo: "Won 42 battles",
                        },
                        {
                          rank: 3,
                          name: "Jane Doe",
                          avatar: "JD",
                          score: 92,
                          department: "Computer Science",
                          badges: ["Rising Star"],
                          additionalInfo: "Won 40 battles",
                        },
                        {
                          rank: 4,
                          name: "Michael Brown",
                          avatar: "MB",
                          score: 88,
                          department: "Software Engineering",
                          badges: [],
                          additionalInfo: "Won 38 battles",
                        },
                        {
                          rank: 5,
                          name: "Alex Johnson",
                          avatar: "AJ",
                          score: 85,
                          department: "Data Science",
                          badges: [],
                          additionalInfo: "Won 37 battles",
                        },
                        {
                          rank: 8,
                          name: "You",
                          avatar: "YO",
                          score: 78,
                          department: "Computer Science",
                          badges: ["Fast Learner"],
                          additionalInfo: "Won 32 battles",
                          highlight: true,
                        },
                      ]}
                    />

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Quiz Battles</h3>
                      </div>
                      <div className="p-5">
                        <div className="space-y-4">
                          {[
                            {
                              winner: "Jane Doe",
                              loser: "Alex Johnson",
                              topic: "Data Structures",
                              score: "8-5",
                            },
                            {
                              winner: "You",
                              loser: "Sarah Williams",
                              topic: "Algorithms",
                              score: "7-6",
                            },
                            {
                              winner: "John Smith",
                              loser: "You",
                              topic: "Database Systems",
                              score: "9-7",
                            },
                            {
                              winner: "Michael Brown",
                              loser: "Lisa Taylor",
                              topic: "Web Development",
                              score: "10-8",
                            },
                          ].map((battle, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`h-10 w-10 rounded-full ${
                                      battle.winner === "You"
                                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                        : "bg-indigo-100 text-indigo-600 dark:bg-gray-600 dark:text-white"
                                    } flex items-center justify-center`}
                                  >
                                    {battle.winner === "Jane Doe"
                                      ? "JD"
                                      : battle.winner === "You"
                                        ? "YO"
                                        : battle.winner === "John Smith"
                                          ? "JS"
                                          : "MB"}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{battle.winner}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Winner</div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold text-gray-900 dark:text-white">{battle.score}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{battle.topic}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div>
                                    <div className="font-medium text-right text-gray-900 dark:text-white">
                                      {battle.loser}
                                    </div>
                                    <div className="text-sm text-right text-gray-500 dark:text-gray-400">
                                      Challenger
                                    </div>
                                  </div>
                                  <div
                                    className={`h-10 w-10 rounded-full ${
                                      battle.loser === "You"
                                        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                        : "bg-indigo-100 text-indigo-600 dark:bg-gray-600 dark:text-white"
                                    } flex items-center justify-center`}
                                  >
                                    {battle.loser === "Alex Johnson"
                                      ? "AJ"
                                      : battle.loser === "Sarah Williams"
                                        ? "SW"
                                        : battle.loser === "You"
                                          ? "YO"
                                          : "LT"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6">
                          <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                            View All Battles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Leaderboard
