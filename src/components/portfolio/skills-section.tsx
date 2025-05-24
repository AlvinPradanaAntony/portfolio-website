"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/card";
import { motionVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
}

const skillsData: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "Frontend", icon: "⚛️", color: "text-blue-500" },
  { name: "Next.js", level: 90, category: "Frontend", icon: "▲", color: "text-black dark:text-white" },
  { name: "TypeScript", level: 88, category: "Frontend", icon: "📘", color: "text-blue-600" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", icon: "🎨", color: "text-cyan-500" },
  { name: "Vue.js", level: 75, category: "Frontend", icon: "💚", color: "text-green-500" },
  
  // Backend
  { name: "Node.js", level: 85, category: "Backend", icon: "🟢", color: "text-green-600" },
  { name: "Python", level: 80, category: "Backend", icon: "🐍", color: "text-yellow-500" },
  { name: "PostgreSQL", level: 78, category: "Backend", icon: "🐘", color: "text-blue-700" },
  { name: "MongoDB", level: 82, category: "Backend", icon: "🍃", color: "text-green-700" },
  { name: "Firebase", level: 88, category: "Backend", icon: "🔥", color: "text-orange-500" },
  
  // Tools & Others
  { name: "Git", level: 90, category: "Tools", icon: "📚", color: "text-orange-600" },
  { name: "Docker", level: 75, category: "Tools", icon: "🐳", color: "text-blue-500" },
  { name: "AWS", level: 70, category: "Tools", icon: "☁️", color: "text-orange-400" },
  { name: "Figma", level: 85, category: "Design", icon: "🎨", color: "text-purple-500" },
  { name: "Photoshop", level: 80, category: "Design", icon: "🖼️", color: "text-blue-600" },
];

const categories = ["All", "Frontend", "Backend", "Tools", "Design"];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section className="py-20 px-6" id="skills">
      <div className="max-w-6xl mx-auto">
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
            Skills & Technologies
          </motion.h2>
          <motion.p 
            variants={motionVariants.item}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A comprehensive overview of my technical expertise and proficiency levels
            across various technologies and tools.
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

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{skill.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency</span>
                    <span className={skill.color}>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionVariants.fadeUp}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Technologies", value: "15+" },
            { label: "Projects Completed", value: "50+" },
            { label: "Happy Clients", value: "30+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}