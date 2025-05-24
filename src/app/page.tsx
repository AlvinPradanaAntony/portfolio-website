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
    
    let isMouseInViewport = false;
    
    // Mouse tracking for 3D effects - only when mouse is in viewport
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseInViewport) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      // Apply smooth 3D transforms to floating elements
      gsap.to(".floating-element-1", {
        duration: 1.5,
        rotationY: xPercent * 8,
        rotationX: yPercent * 8,
        x: xPercent * 15,
        y: yPercent * 15,
        ease: "power1.out"
      });
      
      gsap.to(".floating-element-2", {
        duration: 1.8,
        rotationY: xPercent * -6,
        rotationX: yPercent * -6,
        x: xPercent * -12,
        y: yPercent * -12,
        ease: "power1.out"
      });
      
      gsap.to(".floating-element-3", {
        duration: 1.2,
        rotationY: xPercent * 10,
        rotationX: yPercent * 10,
        x: xPercent * 18,
        y: yPercent * 18,
        ease: "power1.out"
      });
      
      // Apply subtle parallax to hero content
      gsap.to(".hero-content", {
        duration: 2,
        rotationY: xPercent * 1,
        rotationX: yPercent * 1,
        ease: "power1.out"
      });
    };
    
    // Mouse enter/leave viewport detection
    const handleMouseEnter = () => {
      isMouseInViewport = true;
    };
    
    const handleMouseLeave = () => {
      isMouseInViewport = false;
      // Reset all transforms smoothly when mouse leaves
      gsap.to([".floating-element-1", ".floating-element-2", ".floating-element-3", ".hero-content"], {
        duration: 2,
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        ease: "power2.out"
      });
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize GSAP animations after component mounts with smoother timing
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Smooth hero content animation
    tl.fromTo(".hero-title",
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
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
    
    // Parallax background effect - disabled for full viewport coverage
    // gsap.to(".hero-bg", {
    //   yPercent: -20,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".hero-section",
    //     start: "top bottom",
    //     end: "bottom top",
    //     scrub: true,
    //   },
    // });

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero-specific animated background */}
        <div className="hero-bg fixed inset-0 mesh-bg opacity-15 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-pink-500/8" />
        
        {/* Additional hero background elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent dark:via-black/5" />
        
        {/* 3D Interactive Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 floating-element-1"
          initial={{ opacity: 0, scale: 0, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          whileHover={{
            scale: 1.2,
            rotateY: 180,
            transition: { duration: 0.6 }
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-30 blur-xl animate-pulse transform-gpu perspective-1000"
               style={{ transform: "rotateX(15deg) rotateY(15deg)" }} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-20 floating-element-2"
          initial={{ opacity: 0, scale: 0, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          whileHover={{
            scale: 1.3,
            rotateX: 360,
            transition: { duration: 0.8 }
          }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-red-600 opacity-30 blur-xl animate-pulse transform-gpu perspective-1000"
               style={{ transform: "rotateX(-15deg) rotateZ(15deg)" }} />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-10 floating-element-3"
          initial={{ opacity: 0, scale: 0, rotateZ: 180 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          whileHover={{
            scale: 1.1,
            rotateZ: -180,
            transition: { duration: 0.5 }
          }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-600 opacity-30 blur-xl animate-pulse transform-gpu perspective-1000"
               style={{ transform: "rotateY(-15deg) rotateX(15deg)" }} />
        </motion.div>
        
        {/* Interactive 3D Floating Cards */}
        <motion.div
          className="absolute top-1/3 right-1/4 floating-element-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-24 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg backdrop-blur-sm border border-white/20 shadow-2xl transform-gpu">
            <div className="p-2 text-xs text-white/80 font-medium">React</div>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 left-1/4 floating-element-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.3, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-20 h-14 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-lg backdrop-blur-sm border border-white/20 shadow-2xl transform-gpu">
            <div className="p-2 text-xs text-white/80 font-medium">Next.js</div>
          </div>
        </motion.div>
        
        {/* Additional 3D Interactive Particles */}
        <motion.div
          className="absolute top-1/4 left-1/3 floating-element-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.6, ease: "easeOut" }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400/25 to-cyan-500/25 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl transform-gpu">
            <div className="p-1 text-xs text-white/80 font-medium">TS</div>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-1/3 floating-element-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.9, ease: "easeOut" }}
        >
          <div className="w-14 h-10 bg-gradient-to-br from-emerald-400/25 to-teal-500/25 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl transform-gpu">
            <div className="p-1 text-xs text-white/80 font-medium">CSS</div>
          </div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="hero-content">
            {/* Main Heading with advanced animated typography */}
            <div className="mb-8">
              <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 opacity-0 perspective-1000">
                <motion.span
                  className="gradient-text inline-block"
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "center bottom" }}
                >
                  Creative
                </motion.span>
                <br />
                <motion.span
                  className="text-foreground inline-block"
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  style={{ transformOrigin: "center top" }}
                >
                  Developer
                </motion.span>
              </h1>
              
              {/* Animated typewriter effect */}
              <motion.p
                className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 opacity-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1.8, ease: "easeInOut" }}
                  className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-primary/60"
                  style={{ borderRight: "2px solid" }}
                >
                  Crafting exceptional digital experiences with modern technologies
                </motion.span>
              </motion.p>
              
              {/* Simple description animation */}
              <motion.div
                className="hero-description text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed opacity-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
              >
                Innovative design, and cutting-edge development practices.
              </motion.div>
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
      <section className="py-20 px-6 relative" id="about">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text perspective-1000"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {["About", "Me"].map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4"
                  initial={{
                    opacity: 0,
                    rotateX: 90,
                    y: 50
                  }}
                  whileInView={{
                    opacity: 1,
                    rotateX: 0,
                    y: 0
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformOrigin: "center bottom" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Passionate full-stack developer with expertise in modern web technologies,
              creating scalable applications and beautiful user experiences.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {[
              { icon: Code2, title: "Frontend Development", desc: "React, Next.js, TypeScript", color: "from-blue-500 to-cyan-500" },
              { icon: Database, title: "Backend Development", desc: "Node.js, Python, PostgreSQL", color: "from-green-500 to-emerald-500" },
              { icon: Palette, title: "UI/UX Design", desc: "Figma, Adobe Creative Suite", color: "from-purple-500 to-pink-500" },
              { icon: Smartphone, title: "Mobile Development", desc: "React Native, Flutter", color: "from-orange-500 to-red-500" },
              { icon: Globe, title: "Web Technologies", desc: "HTML5, CSS3, JavaScript", color: "from-yellow-500 to-orange-500" },
              { icon: Zap, title: "Performance", desc: "Optimization, SEO, Accessibility", color: "from-indigo-500 to-purple-500" },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{
                  opacity: 0,
                  y: 50,
                  rotateX: 45,
                  rotateY: 45,
                  scale: 0.8
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -15,
                  rotateX: 10,
                  rotateY: 10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                className="group"
              >
                <div className="relative">
                  {/* 3D Card Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-xl blur-xl transform translate-y-4 translate-x-4 group-hover:translate-y-6 group-hover:translate-x-6 transition-transform duration-300"
                       style={{ background: `linear-gradient(135deg, var(--blue-500), var(--cyan-500))` }} />
                  
                  {/* Main 3D Card */}
                  <GlassCard className="relative p-6 text-center hover:bg-white/15 transition-all duration-300 transform-gpu border-2 border-white/20 backdrop-blur-md">
                    {/* Gradient Background Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-5 rounded-xl group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* 3D Icon Container */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{
                        rotateY: 360,
                        scale: 1.2,
                        transition: { duration: 0.6 }
                      }}
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${skill.color} p-3 shadow-2xl transform-gpu`}
                           style={{ transform: "rotateX(10deg) rotateY(10deg)" }}>
                        <skill.icon className="h-full w-full text-white" />
                      </div>
                    </motion.div>
                    
                    {/* 3D Text Content */}
                    <div className="relative z-10">
                      <motion.h3
                        className="text-xl font-semibold mb-2"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {skill.title}
                      </motion.h3>
                      <motion.p
                        className="text-muted-foreground"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {skill.desc}
                      </motion.p>
                    </div>
                    
                    {/* 3D Highlight Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{
                           background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))`,
                           boxShadow: `0 20px 40px rgba(59, 130, 246, 0.2)`
                         }} />
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t relative">
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
