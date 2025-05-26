"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsapAnimations } from "@/lib/animations";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { FileCode2, Code2, TypeIcon, Palette } from "lucide-react";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { BlogSection } from "@/components/portfolio/blog-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Github, Linkedin, Mail, Download, ExternalLink, ArrowUp } from "lucide-react";

export default function HomePage() {
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    let isMouseInViewport = false;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;
    let floatingAnimations: gsap.core.Tween[] = [];
    let mouseTrackingAnimations: gsap.core.Tween[] = [];

    // Start floating animations
    const startFloatingAnimations = () => {
      // Kill existing floating animations first
      floatingAnimations.forEach((anim) => anim?.kill());
      floatingAnimations = [];

      // Start new floating animations from current positions
      const elements = [
        { selector: ".floating-element-4", amplitude: 12, duration: 3 },
        { selector: ".floating-element-5", amplitude: 15, duration: 4 },
        { selector: ".floating-element-6", amplitude: 10, duration: 2 },
        { selector: ".floating-element-7", amplitude: 14, duration: 3.5 },
      ];

      elements.forEach(({ selector, amplitude, duration }) => {
        const animation = gsapAnimations.float2(selector, amplitude, duration);
        if (animation) {
          floatingAnimations.push(animation);
        }
      });
    };

    // Stop floating animations
    const stopFloatingAnimations = () => {
      floatingAnimations.forEach((anim) => anim?.kill());
      floatingAnimations = [];
    };

    // Mouse tracking for 3D effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseInViewport) return;

      // Mark mouse as moving
      isMouseMoving = true;

      // Clear previous timeout
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }

      // Stop floating animations when mouse starts moving
      if (floatingAnimations.length > 0) {
        stopFloatingAnimations();
      }

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      // Kill previous mouse tracking animations
      mouseTrackingAnimations.forEach((anim) => anim?.kill());
      mouseTrackingAnimations = [];

      // Add floating cards to mouse tracking
      const trackingConfigs = [
        {
          selector: ".floating-element-4",
          rotationY: xPercent * 15,
          rotationX: yPercent * 15,
          x: xPercent * 25,
          y: yPercent * 25,
        },
        {
          selector: ".floating-element-5",
          rotationY: xPercent * -20,
          rotationX: yPercent * -20,
          x: xPercent * -30,
          y: yPercent * -30,
        },
        {
          selector: ".floating-element-6",
          rotationY: xPercent * 22,
          rotationX: yPercent * 22,
          x: xPercent * 35,
          y: yPercent * 35,
        },
        {
          selector: ".floating-element-7",
          rotationY: xPercent * -12,
          rotationX: yPercent * -12,
          x: xPercent * -20,
          y: yPercent * -20,
        },
      ];

      trackingConfigs.forEach((config) => {
        const animation = gsap.to(config.selector, {
          duration: 1.4,
          rotationY: config.rotationY,
          rotationX: config.rotationX,
          x: config.x,
          y: config.y,
          ease: "power1.out",
        });
        mouseTrackingAnimations.push(animation);
      });

      // Set timeout to restart floating animations after mouse stops
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
        if (isMouseInViewport && !isMouseMoving) {
          // Wait for current mouse tracking animations to complete
          setTimeout(() => {
            startFloatingAnimations();
          }, 100);
        }
      }, 1500); // 1.5 seconds after mouse stops moving
    };

    // Mouse enter viewport
    const handleMouseEnter = () => {
      isMouseInViewport = true;
      // Don't immediately stop floating - let mouse movement handle it
    };

    // Mouse leave viewport
    const handleMouseLeave = () => {
      isMouseInViewport = false;
      isMouseMoving = false;

      // Clear timeout
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }

      // Kill all mouse tracking animations
      mouseTrackingAnimations.forEach((anim) => anim?.kill());
      mouseTrackingAnimations = [];

      // Smoothly reset all transforms and restart floating
      const elements = [".floating-element-4", ".floating-element-5", ".floating-element-6", ".floating-element-7"];

      gsap.to(elements, {
        duration: 2,
        rotationY: 0,
        rotationX: 0,
        x: 0,
        // Don't reset Y to avoid jump - floating will handle it
        ease: "power2.out",
        onComplete: () => {
          // Restart floating animations after reset
          setTimeout(() => {
            startFloatingAnimations();
          }, 200);
        },
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize GSAP animations after component mounts
    const tl = gsap.timeline({ delay: 0.2 });

    // Smooth hero content animation
    tl.fromTo(".hero-title", { opacity: 0, y: 100, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" })
      .fromTo(".hero-subtitle", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8")
      .fromTo(".hero-description", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .fromTo(".hero-buttons", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .fromTo(".hero-social", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

    // Start initial floating animations after hero content loads
    setTimeout(() => {
      startFloatingAnimations();
    }, 4000); // Start after hero animations complete

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      // Clear timeout
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }

      // Kill all animations
      floatingAnimations.forEach((anim) => anim?.kill());
      mouseTrackingAnimations.forEach((anim) => anim?.kill());

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global Background with Enhanced Glassmorphism */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className="absolute  inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 gradient-transition" />

        {/* Enhanced mesh background */}
        <div className="absolute inset-0 mesh-bg-enhanced opacity-60" />

        {/* Animated gradient orbs with enhanced animations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animated-bg-orb" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-3xl animated-bg-orb" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animated-bg-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animated-bg-orb" />
        {/* <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animated-bg-orb" />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-2xl animated-bg-orb" /> */}

        {/* Global Floating Elements*/}
        <motion.div
          className="absolute floating-element-1 -bottom-36 -left-36"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [
              0, // Start at -bottom-18 -left-18 (CSS position)
              "50vw", // Bottom-center (center minus half element width)
              "100vw", // Bottom-right (viewport width minus half element to stay half cut)
              "100vw", // Top-right (same x position)
              "50vw", // Top-center (center minus half element width)
              0, // Top-left (back to start x)
              0, // Back to start position
            ],
            y: [
              0, // Start at -bottom-18 -left-18 (CSS position)
              0, // Bottom-center (same level)
              0, // Bottom-right (same level)
              "-100vh", // Top-right (negative viewport height plus half element to stay half cut)
              "-100vh", // Top-center (same level)
              "-100vh", // Top-left (same level)
              0, // Back to start position
            ],
          }}
          transition={{
            opacity: { duration: 1.5, delay: 2, ease: "easeOut" },
            scale: { duration: 1.5, delay: 2, ease: "easeOut" },
            x: {
              duration: 120,
              delay: 3,
              ease: "linear",
              repeat: Infinity,
            },
            y: {
              duration: 120,
              delay: 3,
              ease: "linear",
              repeat: Infinity,
            },
          }}
        >
          <div className="w-72 h-72 rounded-full bg-gradient-to-r from-blue-400/90 to-purple-600/60 opacity-30 blur-2xl animate-pulse transform-gpu" />
        </motion.div>
        <motion.div
          className="absolute floating-element-2 -top-36 -right-36"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [
              0, // Start at -top-16 -right-16 (CSS position)
              "-50vw", // Bottom-center (center minus half element width)
              "-100vw", // Bottom-right (viewport width minus half element to stay half cut)
              "-100vw", // Top-right (same x position)
              "-50vw", // Top-center (center minus half element width)
              0, // Bottom-right (viewport width minus element width for half cut)
              0, // Back to start position (Top-right)
            ],
            y: [
              0, // Start at -top-16 -right-16 (CSS position)
              0, // Top-center (same level)
              0, // Top-left (same level)
              "100vh", // Top-right (negative viewport height plus half element to stay half cut)
              "100vh", // Top-center (same level)
              "100vh", // Top-left (same level)
              0, // Back to start position
            ],
          }}
          transition={{
            opacity: { duration: 1.5, delay: 2, ease: "easeOut" },
            scale: { duration: 1.5, delay: 2, ease: "easeOut" },
            x: {
              duration: 120, // Slightly different duration for variety
              delay: 3, // Start after element 1
              ease: "linear",
              repeat: Infinity,
            },
            y: {
              duration: 120,
              delay: 3,
              ease: "linear",
              repeat: Infinity,
            },
          }}
        >
          <div className="w-72 h-72 rounded-full bg-gradient-to-r from-pink-400 to-red-600 opacity-30 blur-2xl animate-pulse transform-gpu" />
        </motion.div>

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
        {/* Interactive 3D Floating Cards */}
        <motion.div className="absolute top-1/3 right-1/4 floating-element-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 2, ease: "easeOut" }}>
          <div className="w-24 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg backdrop-blur-sm border border-white/20 shadow-2xl transform-gpu flex items-center justify-center">
            <FileCode2 className="w-8 h-8 text-white/80" />
          </div>
        </motion.div>
        <motion.div className="absolute bottom-1/3 left-1/4 floating-element-5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 2.3, ease: "easeOut" }}>
          <div className="w-20 h-14 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-lg backdrop-blur-sm border border-white/20 shadow-2xl transform-gpu flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white/80" />
          </div>
        </motion.div>
        <motion.div className="absolute top-1/4 left-[30%] floating-element-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 2.6, ease: "easeOut" }}>
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400/25 to-cyan-500/25 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl transform-gpu flex items-center justify-center">
            <TypeIcon className="w-4 h-4 text-white/80" />
          </div>
        </motion.div>
        <motion.div className="absolute bottom-1/4 right-[30%] floating-element-7" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 2.9, ease: "easeOut" }}>
          <div className="w-14 h-10 bg-gradient-to-br from-emerald-400/25 to-teal-500/25 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl transform-gpu flex items-center justify-center">
            <Palette className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-6">
          <div className="hero-content">
            {" "}
            {/* Main Heading with advanced animated typography */}
            <div className="mb-8">
              <h1 className="hero-title responsive-text-6xl font-bold mb-6 opacity-0 perspective-1000">
                <motion.span className="gradient-text inline-block" initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} style={{ transformOrigin: "center bottom" }}>
                  A Developer's
                </motion.span>
                <br />
                <motion.span className="text-foreground inline-block" initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }} style={{ transformOrigin: "center top" }}>
                  Journey
                </motion.span>
              </h1>

              {/* Animated typewriter effect */}
              <motion.p className="hero-subtitle responsive-text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed  opacity-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.5 }}>
                <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 1.8, ease: "easeInOut" }} className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-primary/60" style={{ borderRight: "2px solid" }}>
                  Crafting exceptional digital experiences with modern technologies
                </motion.span>
              </motion.p>

              {/* Simple description animation */}
              <motion.div className="hero-description responsive-text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}>
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
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2 }} whileHover={{ scale: 1.1 }} onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center hover:border-primary/60 transition-colors duration-300">
            <motion.div className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
        </motion.div>
      </section>
      {/* About Section Preview */}
      <section className="py-20 px-6 relative" id="about">
        {/* Enhanced Decorative 3D Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-xl"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-green-400/10 to-cyan-400/10 rounded-full blur-lg"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 transform rotate-45"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Floating Code Elements */}
          <motion.div
            className="absolute top-1/3 right-1/3 text-2xl opacity-10"
            animate={{
              rotate: [0, 360],
              y: [0, -15, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            &lt;/&gt;
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/2 text-xl opacity-10"
            animate={{
              rotate: [0, -360],
              x: [0, 25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            {}
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">A Snapshot of My Expertise</p>
          </motion.div>

          {/* Main Content Layout - Adjusted ratio like reference */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {" "}
            {/* Left Side - Large Photo Card (2/5 width) */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-2">
              <div className="relative">
                {/* Large Photo Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg">
                  <div className="relative overflow-hidden">
                    {" "}
                    <div className="aspect-[4/5]">
                      {/* Real photo from Unsplash */}
                      <img src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4" alt="Professional developer portrait" className="w-full h-full object-cover" />
                    </div>
                    {/* Decorative overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Floating decoration around photo */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-40"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -180, -360],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </motion.div>
            {/* Right Side - Content (3/5 width) */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-3 space-y-6">
              {/* Profile Description */}
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold mb-4 gradient-text">A Snapshot of My Expertise</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I am a web designer and front-end developer specializing in creating clean, user-friendly digital experiences. With a passion for intuitive design and high-quality code, I focus on building software solutions that enhance user experience and make a meaningful impact.
                </p>
                <p className="text-muted-foreground leading-relaxed">My expertise lies in seamlessly blending design and development to deliver visually appealing and highly functional web applications.</p>
              </GlassCard>

              {/* Skills Section - No Background Container */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold gradient-text">Core Skills</h3>
                  <motion.button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowAllSkills(!showAllSkills)}>
                    {showAllSkills ? "Show Less" : "View All"}
                  </motion.button>{" "}
                </div>{" "}
                {/* Main 6 Skills - Square Icon Cards */}
                <div className="grid grid-cols-6 gap-1 md:gap-2 mb-6">
                  {[
                    { name: "React", iconPath: "/react.svg", color: "from-blue-500 to-cyan-500" },
                    { name: "Next.js", iconPath: "/nextjs.svg", color: "from-gray-700 to-gray-900" },
                    { name: "TypeScript", iconPath: "/typescript.svg", color: "from-blue-600 to-blue-800" },
                    { name: "Tailwind", iconPath: "/tailwind.svg", color: "from-cyan-500 to-blue-500" },
                    { name: "Node.js", iconPath: "/nodejs.svg", color: "from-green-500 to-green-700" },
                    { name: "Firebase", iconPath: "/firebase.svg", color: "from-yellow-500 to-orange-500" },
                  ].map((skill, index) => (
                    <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }} viewport={{ once: true }} whileHover={{ scale: 1.1 }} className="relative group flex justify-center">
                      <div className={`aspect-square w-12 sm:w-14 md:w-18 bg-gradient-to-br ${skill.color} p-2 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-all duration-200 flex items-center justify-center`}>
                        <img src={skill.iconPath} alt={skill.name} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" style={{ filter: "brightness(0) invert(1)" }} />
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10">{skill.name}</div>
                    </motion.div>
                  ))}{" "}
                </div>
                {/* Additional Skills - Circular Icons in same container */}
                <AnimatePresence mode="wait">
                  {" "}
                  {showAllSkills && (
                    <motion.div
                      key="additional-skills"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: showAllSkills ? 0 : 0.5, // Delay exit animation to let skill icons animate first
                      }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-semibold text-muted-foreground">Additional Skills</h4>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { name: "JavaScript", icon: "JS" },
                          { name: "Python", icon: "🐍" },
                          { name: "Node.js", icon: "📗" },
                          { name: "MongoDB", icon: "🍃" },
                          { name: "PostgreSQL", icon: "🐘" },
                          { name: "Docker", icon: "🐳" },
                          { name: "AWS", icon: "☁️" },
                          { name: "Git", icon: "📝" },
                          { name: "Figma", icon: "🎨" },
                          { name: "Leadership", icon: "👑" },
                          { name: "Communication", icon: "💬" },
                          { name: "Problem Solving", icon: "🧩" },
                        ].map((skill, index, array) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: showAllSkills
                                ? index * 0.05 // forward delay when showing
                                : (array.length - index - 1) * 0.03, // reverse delay when hiding
                            }}
                            whileHover={{ scale: 1.1 }}
                            className="relative group"
                          >
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-lg hover:bg-white/20 transition-all duration-200 cursor-pointer">{skill.icon}</div>
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">{skill.name}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
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
      <ContactSection /> {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 relative bg-muted/20 backdrop-blur-sm">
        {/* Footer Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="responsive-text-2xl font-bold gradient-text mb-4">Portfolio</h3>
              <p className="responsive-text-base text-muted-foreground mb-6 leading-relaxed">Creating exceptional digital experiences with modern technologies and innovative design.</p>
              <div className="flex gap-3">
                <Button variant="glass" size="icon" className="hover-glow transition-all duration-300">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="glass" size="icon" className="hover-glow transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="glass" size="icon" className="hover-glow transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="responsive-text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
              <div className="space-y-3">
                <a href="#about" className="block responsive-text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1">
                  About
                </a>
                <a href="#skills" className="block responsive-text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1">
                  Skills
                </a>
                <a href="#projects" className="block responsive-text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1">
                  Projects
                </a>
                <a href="#blog" className="block responsive-text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1">
                  Blog
                </a>
                <a href="#contact" className="block responsive-text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="responsive-text-lg font-semibold mb-4 text-foreground">Services</h4>
              <div className="space-y-3">
                <p className="responsive-text-sm text-muted-foreground">Web Development</p>
                <p className="responsive-text-sm text-muted-foreground">Mobile Apps</p>
                <p className="responsive-text-sm text-muted-foreground">UI/UX Design</p>
                <p className="responsive-text-sm text-muted-foreground">Consulting</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="responsive-text-sm text-muted-foreground">&copy; 2024 Portfolio. All rights reserved. Crafted with ❤️ and modern tech.</p>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      <motion.button className="fixed bottom-8 right-8 glass-card p-3 rounded-full shadow-lg z-40" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
