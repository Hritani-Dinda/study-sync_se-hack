"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Trophy, BookOpen, BarChart3 } from "lucide-react"

const carouselItems = [
  {
    title: "Upcoming Quiz: Database Normalization",
    description: "Prepare for your upcoming quiz on database normalization concepts",
    icon: Trophy,
    link: "/quiz/database-normalization",
    linkText: "Prepare Now",
    badge: "In 2 Days",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "New Course Available: Machine Learning Basics",
    description: "Enroll in our new course on machine learning fundamentals",
    icon: BookOpen,
    link: "/courses/machine-learning",
    linkText: "Enroll Now",
    badge: "New",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Your Performance Report is Ready",
    description: "View your latest performance metrics across all courses",
    icon: BarChart3,
    link: "/performance",
    linkText: "View Report",
    badge: "Updated",
    color: "bg-purple-500/10 text-purple-500",
  },
]

export function DashboardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item, index) => (
          <Card key={index} className={`min-w-full ${item.color} border-none shadow-sm`}>
            <CardContent className="flex flex-col items-start justify-between p-6 md:flex-row md:items-center">
              <div className="mb-4 flex items-start space-x-4 md:mb-0">
                <div className="rounded-full bg-background p-2">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant="outline">{item.badge}</Badge>
                  </div>
                  <p className="mt-1 text-sm">{item.description}</p>
                </div>
              </div>
              <Link href={item.link}>
                <Button variant="secondary" size="sm">
                  {item.linkText}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => {
              setCurrentIndex(index)
            }}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
