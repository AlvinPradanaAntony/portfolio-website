"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsapAnimations } from "@/lib/animations";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { BlogSection } from "@/components/portfolio/blog-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Code2,
  Palette,
  Smartphone,
  Database,
  Globe,
  Zap,
  ArrowUp
} from "lucide-react";

export default function HomePage() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize GSAP animations after component mounts with smoother timing
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Smooth hero content animation
    tl.fromTo(".hero-title", 
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(".hero-subtitle", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8"
    )
    .fromTo(".hero-description", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6"
    )
    .fromTo(".hero-buttons", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4"
    )
    .fromTo(".hero-social", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4"
    );

    // Smooth floating elements
    gsapAnimations.float(".floating-element-1", 15, 6);
    gsapAnimations.float(".floating-element-2", 20, 8);
    gsapAnimations.float(".floating-element-3", 12, 5);
    
    // Parallax background effect
    gsap.to(".hero-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global Background with Enhanced Glassmorphism */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 gradient-transition" />
        
        {/* Enhanced mesh background */}
        <div className="absolute inset-0 mesh-bg-enhanced opacity-60" />
        
        {/* Animated gradient orbs with enhanced animations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animated-bg-orb" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-3xl animated-bg-orb" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animated-bg-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animated-bg-orb" />
        
        {/* Additional floating particles */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animated-bg-orb" />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-2xl animated-bg-orb" />
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 glass-bg" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden section-transition">
        {/* Hero-specific animated background */}
        <div className="hero-bg absolute inset-0 mesh-bg opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-pink-500/8" />
        
        {/* Additional hero background elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent dark:via-black/5" />
        
        {/* Floating Elements with improved animations */}
        <div className="absolute top-20 left-20 floating-element-1">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 blur-xl animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-20 floating-element-2">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-red-600 opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-1/2 left-10 floating-element-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-600 opacity-20 blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Additional floating particles */}
        <div className="absolute top-1/3 right-1/4 floating-element-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 blur-sm" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 floating-element-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-25 blur-md" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="hero-content">
            {/* Main Heading with improved animations */}
            <div className="mb-8">
              <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 opacity-0">
                <span className="gradient-text inline-block">Creative</span>
                <br />
                <span className="text-foreground inline-block">Developer</span>
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 opacity-0">
                Crafting exceptional digital experiences with modern technologies
              </p>
              <p className="hero-description text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed opacity-0">
                Innovative design, and cutting-edge development practices.
              </p>
            </div>

            {/* CTA Buttons with stagger animation */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0">
              <Button variant="gradient" size="xl" className="group transform hover:scale-105 transition-all duration-300" asChild>
                <a href="#projects">
                  View My Work
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="glass" size="xl" className="group transform hover:scale-105 transition-all duration-300">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                Download Resume
              </Button>
            </div>

            {/* Social Links with smooth hover effects */}
            <div className="hero-social flex justify-center gap-4 opacity-0">
              <Button variant="glass" size="icon" className="hover-glow transform hover:scale-110 transition-all duration-300">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="glass" size="icon" className="hover-glow transform hover:scale-110 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="glass" size="icon" className="hover-glow transform hover:scale-110 transition-all duration-300">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator with improved animation */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center hover:border-primary/60 transition-colors duration-300"
          >
            <motion.div 
              className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section Preview */}
      <section className="py-20 px-6 relative section-transition" id="about">
        {/* Section transition overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-black/5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate full-stack developer with expertise in modern web technologies, 
              creating scalable applications and beautiful user experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code2, title: "Frontend Development", desc: "React, Next.js, TypeScript" },
              { icon: Database, title: "Backend Development", desc: "Node.js, Python, PostgreSQL" },
              { icon: Palette, title: "UI/UX Design", desc: "Figma, Adobe Creative Suite" },
              { icon: Smartphone, title: "Mobile Development", desc: "React Native, Flutter" },
              { icon: Globe, title: "Web Technologies", desc: "HTML5, CSS3, JavaScript" },
              { icon: Zap, title: "Performance", desc: "Optimization, SEO, Accessibility" },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <GlassCard className="p-6 text-center hover:bg-white/15 transition-all duration-300">
                  <skill.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <div className="relative section-transition">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-purple-50/20 dark:from-blue-950/5 dark:to-purple-950/5 gradient-transition" />
        <SkillsSection />
      </div>

      {/* Projects Section */}
      <div className="relative section-transition">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 to-pink-50/20 dark:from-purple-950/5 dark:to-pink-950/5 gradient-transition" />
        <ProjectsSection />
      </div>

      {/* Blog Section */}
      <div className="relative section-transition">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 to-cyan-50/20 dark:from-pink-950/5 dark:to-cyan-950/5 gradient-transition" />
        <BlogSection />
      </div>

      {/* Contact Section */}
      <div className="relative section-transition">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/20 to-blue-50/20 dark:from-cyan-950/5 dark:to-blue-950/5 gradient-transition" />
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t relative section-transition">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100/30 to-transparent dark:from-slate-900/30 gradient-transition" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
                <p className="text-muted-foreground mb-4">
                  Creating exceptional digital experiences with modern technologies and innovative design.
                </p>
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors">About</a>
                  <a href="#skills" className="block text-muted-foreground hover:text-foreground transition-colors">Skills</a>
                  <a href="#projects" className="block text-muted-foreground hover:text-foreground transition-colors">Projects</a>
                  <a href="#blog" className="block text-muted-foreground hover:text-foreground transition-colors">Blog</a>
                  <a href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Web Development</p>
                  <p className="text-muted-foreground">Mobile Apps</p>
                  <p className="text-muted-foreground">UI/UX Design</p>
                  <p className="text-muted-foreground">Consulting</p>
                </div>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 Portfolio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 glass-card p-3 rounded-full shadow-lg z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
