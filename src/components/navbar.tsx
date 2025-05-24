"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Check which section is currently in view - improved detection algorithm
      const sections = ["about", "skills", "projects", "blog", "contact"];

      // Calculate which section has the most visibility in the viewport
      let mostVisibleSection = "";
      let maxVisibility = 0;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate how much of the section is visible in the viewport
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const visibilityRatio = visibleHeight > 0 ? visibleHeight / element.clientHeight : 0;

          // Choose section with highest visibility
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = section;
          }
        }
      });

      // Special case for top of page
      if (scrollPosition < 100) {
        // If near the top, set to empty or "home" section
        setActiveSection("");
      } else if (maxVisibility > 0.1) {
        // Only activate if at least 10% visible
        setActiveSection(mostVisibleSection);
      }
    };

    // Check scroll position immediately when component mounts
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#blog", label: "Blog", id: "blog" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Extract the section id from the href and set it as active
      const sectionId = href.replace("#", "");
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-linear", isScrolled ? "px-6 py-3" : "px-0 py-6")} initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <div
          className={cn("transition-all duration-500 ease-linear", isScrolled ? "max-w-4xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-full px-8 py-3 border border-white/20 dark:border-white/10" : "w-full px-6 py-2")}
          style={{
            boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)" : "none",
            transition: "all 0.5s ease-linear",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <h1 className="text-2xl font-bold gradient-text cursor-pointer">Portfolio</h1>
            </motion.div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className={cn("flex items-center transition-all duration-500 ease-linear", isScrolled ? "gap-4" : "gap-8")}>
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={cn("text-sm font-medium transition-all duration-300 relative px-4 py-2 rounded-full", isActive ? "text-primary bg-primary/10 shadow-sm" : isScrolled ? "text-foreground hover:text-primary hover:bg-white/10" : "text-foreground/90 hover:text-primary hover:bg-white/5", "hover:scale-105")}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      whileTap={{
                        scale: 0.95,
                        transition: { duration: 0.1 },
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-primary/5 rounded-full border border-primary/20"
                          layoutId="activeNavItem"
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <div>
                <ThemeToggle variant={isScrolled ? "default" : "glass"} />
              </div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
              >
                <Button variant={isScrolled ? "default" : "glass"} size="sm" asChild className="hidden sm:flex transition-all duration-300">
                  <a href="/dashboard">Dashboard</a>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.1 },
                }}
              >
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="fixed inset-0 z-40 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

            {/* Mobile Menu Content */}
            <motion.div
              className="absolute top-20 left-4 right-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-2xl p-6 border border-white/20 dark:border-white/10"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={cn("block w-full text-left px-4 py-3 rounded-lg transition-all duration-200", isActive ? "text-primary bg-primary/10 border border-primary/20" : "text-foreground hover:bg-white/10 hover:text-primary")}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
                <div className="border-t border-white/10 pt-4 mt-4">
                  <Button variant="default" size="sm" asChild className="w-full">
                    <a href="/dashboard">Dashboard</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
