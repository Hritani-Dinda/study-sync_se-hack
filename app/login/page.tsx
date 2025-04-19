"use client"
import Link from "next/link"
import { SignIn } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { hash } from "crypto"

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">← Back</Button>
      </Link>
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to Campus LMS</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>
        
        <SignIn routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
            }
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}