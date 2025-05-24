"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  variant?: "default" | "glass" | "neon"
}

export function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant={variant === "glass" ? "glass" : variant === "neon" ? "neon" : "ghost"}
        size="icon"
        className={cn("relative", className)}
        disabled
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant={variant === "glass" ? "glass" : variant === "neon" ? "neon" : "ghost"}
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative transition-all duration-300",
        variant === "glass" && "hover:bg-white/20",
        variant === "neon" && "hover:shadow-neon",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun 
        className={cn(
          "h-4 w-4 transition-all duration-300",
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )} 
      />
      <Moon 
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )} 
      />
    </Button>
  )
}

// Animated theme toggle with more visual effects
export function AnimatedThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("w-14 h-7 rounded-full bg-muted", className)} />
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        theme === "dark" 
          ? "bg-gradient-to-r from-purple-600 to-blue-600" 
          : "bg-gradient-to-r from-yellow-400 to-orange-500",
        className
      )}
      aria-label="Toggle theme"
    >
      <div
        className={cn(
          "absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center",
          theme === "dark" 
            ? "left-7 bg-slate-800 text-blue-400" 
            : "left-0.5 bg-white text-yellow-500"
        )}
      >
        {theme === "dark" ? (
          <Moon className="h-3 w-3" />
        ) : (
          <Sun className="h-3 w-3" />
        )}
      </div>
    </button>
  )
}