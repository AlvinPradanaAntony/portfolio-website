"use client";

import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LazySectionProps {
  activeTab: string;
  targetTab: string;
  children: React.ReactNode;
}

// Loading component for lazy sections
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading section...</p>
      </div>
    </div>
  );
}

// Lazy section wrapper with performance monitoring
export function LazySection({ activeTab, targetTab, children }: LazySectionProps) {
  const isActive = activeTab === targetTab;
  
  React.useEffect(() => {
    if (isActive) {
      console.log(`🔍 [DEBUG] Dashboard: Loading section "${targetTab}"`);
    }
  }, [isActive, targetTab]);

  if (!isActive) {
    return null;
  }

  return (
    <Suspense fallback={<SectionLoader />}>
      <motion.div
        key={`section-${targetTab}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}

// Lazy load dashboard components
export const LazyHeroSection = lazy(() => 
  import("@/components/dashboard/hero-section").then(module => ({
    default: module.HeroSection
  }))
);

export const LazyAboutSection = lazy(() => 
  import("@/components/dashboard/about-section").then(module => ({
    default: module.AboutSection
  }))
);

export const LazySkillsManagement = lazy(() => 
  import("@/components/dashboard/skills-management").then(module => ({
    default: module.SkillsManagement
  }))
);

export const LazyProjectsManagement = lazy(() => 
  import("@/components/dashboard/projects-management").then(module => ({
    default: module.ProjectsManagement
  }))
);

export const LazyBlogManagement = lazy(() => 
  import("@/components/dashboard/blog-management").then(module => ({
    default: module.BlogManagement
  }))
);

export const LazyMessagesManagement = lazy(() => 
  import("@/components/dashboard/messages-management").then(module => ({
    default: module.MessagesManagement
  }))
);

// Performance monitoring hook
export function usePerformanceMonitor(sectionName: string) {
  React.useEffect(() => {
    const startTime = performance.now();
    console.log(`🔍 [DEBUG] Dashboard: ${sectionName} component mounted`);
    
    return () => {
      const endTime = performance.now();
      console.log(`🔍 [DEBUG] Dashboard: ${sectionName} component unmounted after ${(endTime - startTime).toFixed(2)}ms`);
    };
  }, [sectionName]);
}