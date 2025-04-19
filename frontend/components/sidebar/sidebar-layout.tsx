"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import {
  BookOpen,
  Home,
  BarChart3,
  Search,
  FileText,
  Trophy,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  GraduationCap,
  ClipboardList,
  Globe,
  School,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if the user is on a teacher page
    setIsTeacher(pathname?.includes("/teacher"))
  }, [pathname])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleSignOut = () => {
    signOut(() => router.push("/"))
  }

  const studentNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Assignments", href: "/assignments", icon: ClipboardList },
    { name: "Content Hub", href: "/content-hub", icon: FileText },
    { name: "Professors", href: "/professors", icon: GraduationCap },
    { name: "Quizzes", href: "/quiz", icon: Trophy },
    { name: "Competitions", href: "/competitions", icon: Globe },
    { name: "Leaderboard", href: "/leaderboard", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const teacherNavigation = [
    { name: "Dashboard", href: "/teacher/dashboard", icon: Home },
    { name: "Courses", href: "/teacher/courses", icon: BookOpen },
    { name: "Assignments", href: "/teacher/assignments", icon: ClipboardList },
    { name: "Quizzes", href: "/teacher/quizzes", icon: Trophy },
    { name: "Students", href: "/teacher/students", icon: User },
    { name: "Competitions", href: "/competitions", icon: Globe },
    { name: "Reports", href: "/teacher/reports", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const navigation = isTeacher ? teacherNavigation : studentNavigation

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={closeSidebar} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar shadow-lg transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-5">
            <Link
              href={isTeacher ? "/teacher/dashboard" : "/dashboard"}
              className="flex items-center space-x-2"
              onClick={closeSidebar}
            >
              <span className="text-xl font-bold text-primary">StudySync</span>
              {isTeacher && (
                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                  Teacher
                </Badge>
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative mx-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-primary/20 bg-background py-2 pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-primary/10 hover:text-primary",
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-primary/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl || "/placeholder.svg"} alt="Profile" className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{isTeacher ? "Teacher" : "Student"}</p>
                </div>
              </div>
              {isMounted && (
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full justify-start border-primary/20 hover:bg-primary/5 hover:border-primary"
              size="sm"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>

            <Button
              variant="outline"
              className="mt-2 w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5"
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-card shadow z-10">
          <div className="flex h-16 items-center justify-between px-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              {isTeacher && (
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5" asChild>
                  <Link href="/dashboard">
                    <School className="mr-2 h-4 w-4 text-primary" />
                    Switch to Student View
                  </Link>
                </Button>
              )}
              {!isTeacher && user && (
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5" asChild>
                  <Link href="/teacher/dashboard">
                    <GraduationCap className="mr-2 h-4 w-4 text-primary" />
                    Switch to Teacher View
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                Help
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary/10 lg:hidden flex items-center justify-center">
                {user?.imageUrl ? (
                  <img src={user.imageUrl || "/placeholder.svg"} alt="Profile" className="h-8 w-8 rounded-full" />
                ) : (
                  <User className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
