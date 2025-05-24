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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 navbar-transition",
          isScrolled ? "px-6 py-4" : "px-0 py-6"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={cn(
            "navbar-transition",
            isScrolled
              ? "max-w-5xl mx-auto navbar-floating rounded-full px-8 py-4 shadow-2xl"
              : "w-full navbar-default px-6 py-2"
          )}
          layout
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-2xl font-bold gradient-text cursor-pointer">
                Portfolio
              </h1>
            </motion.div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <motion.div
                className={cn(
                  "flex items-center transition-all duration-500",
                  isScrolled ? "gap-6" : "gap-8"
                )}
                layout
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "nav-link text-sm font-medium transition-all duration-300 relative group px-3 py-2 rounded-lg",
                      isScrolled
                        ? "text-foreground hover:text-primary hover:bg-white/10"
                        : "text-foreground/90 hover:text-primary hover:bg-white/5"
                    )}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Right Side Actions */}
            <motion.div 
              className="flex items-center gap-4"
              layout
            >
              <ThemeToggle variant={isScrolled ? "default" : "glass"} />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isScrolled ? "default" : "glass"}
                  size="sm"
                  asChild
                  className="hidden sm:flex"
                >
                  <a href="/dashboard">Dashboard</a>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Content */}
            <motion.div
              className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="border-t pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="w-full"
                  >
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