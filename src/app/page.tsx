"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  const skills = [
    "TypeScript", "React", "Next.js", "Node.js",
    "Python", "PostgreSQL", "AWS", "Docker"
  ]

  const projects = [
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Real-time data visualization platform with ML-driven insights",
      tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
      link: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "Scalable marketplace with payment processing and inventory management",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      link: "#"
    },
    {
      title: "Developer Tools CLI",
      description: "Command-line tool for automating development workflows",
      tech: ["Rust", "TypeScript", "GitHub API"],
      link: "#"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl space-y-6"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-sm">
            <Terminal className="h-3 w-3" />
            <span>Available for new projects</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
          >
            Christopher Blackwell
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Full-stack developer crafting exceptional digital experiences with modern technologies and clean, maintainable code.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:hello@example.com">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8"
        >
          <ArrowDown className="h-6 w-6 animate-bounce text-muted-foreground" />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            <h2 className="text-3xl font-bold">Technical Skills</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-4 py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group h-full p-6 transition-all hover:shadow-lg">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href={project.link}>View Project →</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Let's Connect</h2>
            <p className="text-muted-foreground">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <Button size="lg" asChild>
              <Link href="mailto:hello@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}