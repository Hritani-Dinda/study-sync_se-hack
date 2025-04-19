"use client"
import { useState } from "react"
import Link from "next/link"
import { SignIn } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, School } from "lucide-react"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null)

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">← Back</Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to StudySync</h1>
          <p className="text-sm text-muted-foreground">Choose your role to continue</p>
        </div>

        {!selectedRole ? (
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-center text-primary">Select Your Role</CardTitle>
              <CardDescription className="text-center">
                Sign in as a teacher or student to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => setSelectedRole("teacher")}
              >
                <School className="h-8 w-8 text-primary" />
                <span>Teacher Login</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => setSelectedRole("student")}
              >
                <GraduationCap className="h-8 w-8 text-primary" />
                <span>Student Login</span>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-center text-primary">
                {selectedRole === "teacher" ? "Teacher Login" : "Student Login"}
              </CardTitle>
              <CardDescription className="text-center">Sign in to your {selectedRole} account</CardDescription>
            </CardHeader>
            <CardContent>
              <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none",
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                  },
                }}
                redirectUrl={selectedRole === "teacher" ? "/teacher/dashboard" : "/dashboard"}
                initialValues={{
                  emailAddress: selectedRole === "teacher" ? "teacher@example.com" : "student@example.com",
                }}
              />
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => setSelectedRole(null)}>
                Back to Role Selection
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
