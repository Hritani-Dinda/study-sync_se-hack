// /app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect("/login")
  }
  
  const firstName = user.firstName || "User"
  
  return <DashboardClient firstName={firstName} />
}