"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motionVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  date: string;
}

const projectsData: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    longDescription: "A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, inventory management, and admin dashboard. Includes real-time notifications and responsive design.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    category: "Web Development",
    featured: true,
    status: "completed",
    date: "2024"
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative project management tool",
    longDescription: "A comprehensive task management application with team collaboration features, real-time updates, file sharing, and progress tracking. Built with modern React patterns and state management.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    category: "Web Development",
    featured: true,
    status: "completed",
    date: "2024"
  },
  {
    id: "3",
    title: "Mobile Banking App",
    description: "Secure mobile banking solution",
    longDescription: "A secure mobile banking application with biometric authentication, transaction history, bill payments, and financial analytics. Features end-to-end encryption and compliance with banking standards.",
    technologies: ["React Native", "Firebase", "Biometric Auth", "Redux"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/example",
    category: "Mobile Development",
    featured: false,
    status: "completed",
    date: "2023"
  },
  {
    id: "4",
    title: "AI Content Generator",
    description: "AI-powered content creation platform",
    longDescription: "An intelligent content generation platform that uses machine learning to create blog posts, social media content, and marketing copy. Features custom templates and brand voice training.",
    technologies: ["Python", "OpenAI API", "FastAPI", "React", "PostgreSQL"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    category: "AI/ML",
    featured: true,
    status: "in-progress",
    date: "2024"
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "Modern portfolio with glassmorphism design",
    longDescription: "A cutting-edge portfolio website featuring glassmorphism design, smooth animations, and modern UI/UX trends. Built with Next.js and includes a comprehensive dashboard for content management.",
    technologies: ["Next.js", "GSAP", "Framer Motion", "Firebase", "Tailwind CSS"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    category: "Web Development",
    featured: false,
    status: "completed",
    date: "2024"
  },
  {
    id: "6",
    title: "Blockchain Voting System",
    description: "Secure voting platform using blockchain",
    longDescription: "A decentralized voting system built on blockchain technology ensuring transparency, security, and immutability. Features smart contracts for vote validation and real-time result tracking.",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/example",
    category: "Blockchain",
    featured: false,
    status: "planned",
    date: "2024"
  }
];

const categories = ["All", "Web Development", "Mobile Development", "AI/ML", "Blockchain"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const otherProjects = filteredProjects.filter(project => !project.featured);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "planned": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <section className="py-20 px-6" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionVariants.container}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={motionVariants.item}
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            variants={motionVariants.item}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A showcase of my recent work, featuring innovative solutions and cutting-edge technologies
            across various domains and industries.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionVariants.fadeUp}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300 font-medium",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "glass-card hover:bg-white/20 text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Featured Work</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <GlassCard className="overflow-hidden h-full">
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-50">🚀</div>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(project.status))}>
                          {project.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {project.date}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live Demo
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(project.status))}>
                        {project.status.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      {project.liveUrl && (
                        <Button variant="ghost" size="sm" className="p-2">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="ghost" size="sm" className="p-2">
                          <Github className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    {selectedProject.liveUrl && (
                      <Button variant="gradient" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live Demo
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button variant="outline" className="flex-1">
                        <Github className="h-4 w-4 mr-2" />
                        View Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}