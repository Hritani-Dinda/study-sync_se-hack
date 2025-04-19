"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Computer Science Student",
    content:
      "The multiplayer quiz battles have completely changed how I study. Competing with classmates makes learning fun and motivates me to improve.",
    avatar: "AJ",
  },
  {
    name: "Dr. Sarah Chen",
    role: "Professor of Biology",
    content:
      "As an instructor, I can easily create structured courses and track student progress. The analytics help me identify where students need additional support.",
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Engineering Student",
    content:
      "The content hub is a game-changer. Having all course materials in one searchable place saves me hours of time each week.",
    avatar: "MR",
  },
  {
    name: "Prof. David Kim",
    role: "Department Chair",
    content:
      "The admin tools give us unprecedented visibility into engagement across courses. We've seen a 40% increase in student participation since adopting this platform.",
    avatar: "DK",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by Students and Educators</h2>
          <p className="mt-4 text-lg text-muted-foreground">Hear what our users have to say about their experience</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${testimonial.avatar}`} />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
