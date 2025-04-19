// app/dashboard/layout.tsx
import type React from "react"
import { SidebarLayout } from "@/components/sidebar/sidebar-layout"
import { AuthProvider } from "@/components/auth-provider" // Your custom client component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </AuthProvider>
  )
}
