// /app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardClient from "./dashboard-client"
import { getAllCourses } from "@/lib/course-data"

export default async function DashboardPage() {
  // Check the current user
  const user = await currentUser()

  if (!user) {
    redirect("/login") // Redirect to login page if no user
  }

  // Extract the user's first name or default to "User"
  const firstName = user.firstName || "User"

  // Fetch courses (this can be done directly in the client component too)
  const courses = getAllCourses()

  // Return the client-side component and pass the firstName and courses as props
  return <DashboardClient firstName={firstName} courses={courses} />
}
