"use client"
import QuizBattle from "@/components/QuizBattle/QuizBattle"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function QuizBattlePage() {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quiz Battle</h1>
          <p className="text-muted-foreground">Challenge other players in real-time!</p>
        </div>
        <Link href="/quiz">
          <Button variant="outline">Back to Quiz Dashboard</Button>
        </Link>
      </div>
      <QuizBattle />
    </div>
  )
}
