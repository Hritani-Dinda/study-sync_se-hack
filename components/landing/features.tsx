"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, FileText, Trophy, BarChart3, Smartphone, Shield } from "lucide-react"

const features = [
  {
    name: "Role-Based Dashboards",
    description: "Personalized dashboards for students, instructors, and admins with role-specific tools and insights.",
    icon: Users,
  },
  {
    name: "Structured Course Creation",
    description: "Design sequential learning pathways with multimedia content and prerequisites.",
    icon: BookOpen,
  },
  {
    name: "Centralized Content Hub",
    description: "Searchable library of course materials with integrated viewers and version control.",
    icon: FileText,
  },
  {
    name: "Multiplayer Quiz Battles",
    description: "Real-time peer competitions with instant feedback and live leaderboards.",
    icon: Trophy,
  },
  {
    name: "Performance Analytics",
    description: "Detailed insights into student progress and instructor effectiveness.",
    icon: BarChart3,
  },
  {
    name: "Cross-Device Experience",
    description: "Fully optimized for both mobile and desktop with offline access.",
    icon: Smartphone,
  },
  {
    name: "Admin & Moderation Tools",
    description: "Comprehensive tools for managing courses, users, and content.",
    icon: Shield,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful Features for Modern Learning</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform combines the best of structured learning with engaging interactive elements
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative pl-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
