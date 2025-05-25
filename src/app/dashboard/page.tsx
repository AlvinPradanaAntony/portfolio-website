"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, MessageSquare, Globe, AlertCircle, Check } from "lucide-react";
import { authService, heroService, aboutService, skillsService, projectsService, blogService, contactService, fileService } from "@/lib/firebase-services";
import { HeroData, AboutData, Skill, Project, BlogPost, ContactSubmission } from "@/lib/firebase";

// Import new dashboard components
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { DashboardWidgets } from "@/components/dashboard/widgets";
import { DashboardErrorBoundary } from "@/components/dashboard/error-boundary";
import {
  LazySection,
  LazyHeroSection,
  LazyAboutSection,
  LazySkillsManagement,
  LazyProjectsManagement,
  LazyBlogManagement,
  LazyMessagesManagement
} from "@/components/dashboard/lazy-section";

export default function DashboardPage() {
  console.log("🔍 [DEBUG] Dashboard: Component rendering");
  const [activeTab, setActiveTab] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Data states
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactSubmission[]>([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Auto-clear success/error messages to prevent memory leaks
  useEffect(() => {
    if (success) {
      console.log("🔍 [DEBUG] Dashboard: Success message shown:", success);
      const timer = setTimeout(() => {
        console.log("🔍 [DEBUG] Dashboard: Auto-clearing success message");
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      console.log("🔍 [DEBUG] Dashboard: Error message shown:", error);
      const timer = setTimeout(() => {
        console.log("🔍 [DEBUG] Dashboard: Auto-clearing error message");
        setError(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    console.log("🔍 [DEBUG] Dashboard: Auth state change effect triggered");
    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      console.log("🔍 [DEBUG] Dashboard: Auth state changed", { user: !!currentUser });
      if (!currentUser) {
        console.log("🔍 [DEBUG] Dashboard: No user, redirecting to login");
        router.push("/dashboard/login");
      } else {
        console.log("🔍 [DEBUG] Dashboard: User authenticated, loading data");
        setLoading(false);
        loadAllData();
      }
    });
    return () => {
      console.log("🔍 [DEBUG] Dashboard: Cleaning up auth listener");
      unsubscribe();
    };
  }, [router]);

  // Load all data from Firebase
  const loadAllData = async () => {
    console.log("🔍 [DEBUG] Dashboard: Starting data load");
    const startTime = performance.now();
    setIsLoading(true);
    
    try {
      console.log("🔍 [DEBUG] Dashboard: Loading hero data");
      const { data: heroResult } = await heroService.getHero();
      if (heroResult) setHeroData(heroResult);

      console.log("🔍 [DEBUG] Dashboard: Loading about data");
      const { data: aboutResult } = await aboutService.getAbout();
      if (aboutResult) setAboutData(aboutResult);

      console.log("🔍 [DEBUG] Dashboard: Loading skills");
      const { data: skillsResult } = await skillsService.getSkills();
      setSkills(skillsResult);

      console.log("🔍 [DEBUG] Dashboard: Loading projects");
      const { data: projectsResult } = await projectsService.getProjects();
      setProjects(projectsResult);

      console.log("🔍 [DEBUG] Dashboard: Loading blog posts");
      const { data: blogResult } = await blogService.getBlogPosts();
      setBlogPosts(blogResult);

      console.log("🔍 [DEBUG] Dashboard: Loading contact messages");
      const { data: contactResult } = await contactService.getContactSubmissions();
      setContactMessages(contactResult);
      
      const endTime = performance.now();
      console.log(`🔍 [DEBUG] Dashboard: Data load completed in ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
      console.error("🔍 [DEBUG] Dashboard: Error loading data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD operations for Hero
  const updateHeroData = async (data: Partial<HeroData>) => {
    setIsLoading(true);
    try {
      const { success } = await heroService.updateHero(data);
      if (success) {
        setHeroData((prev) => (prev ? { ...prev, ...data } : null));
        setSuccess("Hero data updated successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Hero update error:", err);
      setError("Failed to update hero data");
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD operations for About
  const updateAboutData = async (data: Partial<AboutData>) => {
    setIsLoading(true);
    try {
      const { success } = await aboutService.updateAbout(data);
      if (success) {
        setAboutData((prev) => (prev ? { ...prev, ...data } : null));
        setSuccess("About data updated successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: About update error:", err);
      setError("Failed to update about data");
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD operations for Skills
  const addSkill = async (skill: Omit<Skill, "id">) => {
    setIsLoading(true);
    try {
      const { data, success } = await skillsService.addSkill(skill);
      if (success && data) {
        setSkills((prev) => [...prev, data]);
        setSuccess("Skill added successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Add skill error:", err);
      setError("Failed to add skill");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSkill = async (id: string, skill: Partial<Skill>) => {
    setIsLoading(true);
    try {
      const { success } = await skillsService.updateSkill(id, skill);
      if (success) {
        setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...skill } : s)));
        setSuccess("Skill updated successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Update skill error:", err);
      setError("Failed to update skill");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSkill = async (id: string) => {
    setIsLoading(true);
    try {
      const { success } = await skillsService.deleteSkill(id);
      if (success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
        setSuccess("Skill deleted successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Delete skill error:", err);
      setError("Failed to delete skill");
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD operations for Projects
  const addProject = async (project: Omit<Project, "id">) => {
    setIsLoading(true);
    try {
      const { data, success } = await projectsService.addProject(project);
      if (success && data) {
        setProjects((prev) => [...prev, data]);
        setSuccess("Project added successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Add project error:", err);
      setError("Failed to add project");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    setIsLoading(true);
    try {
      const { success } = await projectsService.updateProject(id, project);
      if (success) {
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...project } : p)));
        setSuccess("Project updated successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Update project error:", err);
      setError("Failed to update project");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    try {
      const { success } = await projectsService.deleteProject(id);
      if (success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setSuccess("Project deleted successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Delete project error:", err);
      setError("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD operations for Blog
  const addBlogPost = async (post: Omit<BlogPost, "id">) => {
    setIsLoading(true);
    try {
      const { data, success } = await blogService.addBlogPost(post);
      if (success && data) {
        setBlogPosts((prev) => [...prev, data]);
        setSuccess("Blog post added successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Add blog post error:", err);
      setError("Failed to add blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    setIsLoading(true);
    try {
      const { success } = await blogService.updateBlogPost(id, post);
      if (success) {
        setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...post } : p)));
        setSuccess("Blog post updated successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Update blog post error:", err);
      setError("Failed to update blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlogPost = async (id: string) => {
    setIsLoading(true);
    try {
      const { success } = await blogService.deleteBlogPost(id);
      if (success) {
        setBlogPosts((prev) => prev.filter((p) => p.id !== id));
        setSuccess("Blog post deleted successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Delete blog post error:", err);
      setError("Failed to delete blog post");
    } finally {
      setIsLoading(false);
    }
  };

  // Contact message operations
  const markMessageAsRead = async (id: string) => {
    try {
      const { success } = await contactService.markAsRead(id);
      if (success) {
        setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Mark message as read error:", err);
      setError("Failed to mark message as read");
    }
  };

  const markMessageAsReplied = async (id: string) => {
    try {
      const { success } = await contactService.markAsReplied(id);
      if (success) {
        setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, replied: true } : m)));
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Mark message as replied error:", err);
      setError("Failed to mark message as replied");
    }
  };

  const deleteContactMessage = async (id: string) => {
    try {
      const { success } = await contactService.deleteContactSubmission(id);
      if (success) {
        setContactMessages((prev) => prev.filter((m) => m.id !== id));
        setSuccess("Message deleted successfully");
      }
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: Delete message error:", err);
      setError("Failed to delete message");
    }
  };

  // File upload handler
  const handleFileUpload = async (file: File, path: string) => {
    try {
      const { data: url, success } = await fileService.uploadFile(file, path);
      if (success && url) {
        return url;
      }
      return null;
    } catch (err) {
      console.error("🔍 [DEBUG] Dashboard: File upload error:", err);
      setError("Failed to upload file");
      return null;
    }
  };

  // Toggle collapse handler
  const handleToggleCollapse = useCallback(() => {
    console.log("🔍 [DEBUG] Dashboard: Toggling sidebar collapse");
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  // Mobile sidebar handlers
  const handleToggleMobileSidebar = useCallback(() => {
    console.log("🔍 [DEBUG] Dashboard: Toggling mobile sidebar");
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  }, [isMobileSidebarOpen]);

  const handleCloseMobileSidebar = useCallback(() => {
    console.log("🔍 [DEBUG] Dashboard: Closing mobile sidebar");
    setIsMobileSidebarOpen(false);
  }, []);

  // Logout handler
  const handleLogout = useCallback(async () => {
    console.log("🔍 [DEBUG] Dashboard: Logging out");
    await authService.signOut();
    router.push("/dashboard/login");
  }, [router]);

  // Add performance monitoring
  useEffect(() => {
    console.log("🔍 [DEBUG] Dashboard: State update", {
      activeTab,
      isCollapsed,
      isMobileSidebarOpen,
      loading,
      isLoading,
      hasAnimated,
      dataLoaded: {
        hero: !!heroData,
        about: !!aboutData,
        skills: skills.length,
        projects: projects.length,
        blogPosts: blogPosts.length,
        messages: contactMessages.length
      }
    });
  }, [activeTab, isCollapsed, isMobileSidebarOpen, loading, isLoading, hasAnimated, heroData, aboutData, skills.length, projects.length, blogPosts.length, contactMessages.length]);

  // Memoize expensive calculations
  const dashboardStats = useMemo(() => {
    console.log("🔍 [DEBUG] Dashboard: Recalculating stats");
    return {
      totalProjects: projects.length,
      totalSkills: skills.length,
      totalBlogPosts: blogPosts.length,
      totalMessages: contactMessages.length,
      unreadMessages: contactMessages.filter(m => !m.read).length
    };
  }, [projects.length, skills.length, blogPosts.length, contactMessages.length, contactMessages]);

  if (loading) {
    console.log("🔍 [DEBUG] Dashboard: Showing loading screen");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Overview Dashboard Content
  const OverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here&apos;s what&apos;s happening with your portfolio.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          key="stats-projects"
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          transition={{
            delay: 0.1,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
          }}
          onAnimationComplete={() => setHasAnimated(true)}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          key="stats-skills"
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
          }}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Skills</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalSkills}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          key="stats-blog"
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
          }}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalBlogPosts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          key="stats-messages"
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
          }}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalMessages}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          key="recent-projects"
          initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.01,
            x: 2,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          transition={{
            delay: 0.5,
            duration: 0.7,
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 1.2,
          }}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20 cursor-pointer"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project, index) => (
              <div key={project.id} className="flex items-center gap-3 p-3 bg-white/10 dark:bg-black/10 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">{project.title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{project.status}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          key="recent-messages"
          initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.01,
            x: -2,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          transition={{
            delay: 0.6,
            duration: 0.7,
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 1.2,
          }}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20 cursor-pointer"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {contactMessages.slice(0, 3).map((message) => (
              <div key={message.id} className="flex items-center gap-3 p-3 bg-white/10 dark:bg-black/10 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{message.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">{message.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm truncate">{message.subject}</p>
                </div>
                {!message.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {/* Global Background with Enhanced Glassmorphism - same as landing page */}
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

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} isCollapsed={isCollapsed} onToggleCollapse={handleToggleCollapse} isMobileOpen={isMobileSidebarOpen} onCloseMobileSidebar={handleCloseMobileSidebar} />

      {/* Navbar */}
      <DashboardNavbar onLogout={handleLogout} isCollapsed={isCollapsed} onToggleSidebar={handleToggleMobileSidebar} />

      {/* Main Content */}
      <div className={`pt-16 min-h-screen transition-all duration-300 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"} ml-0`}>
        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-2">
              <DashboardErrorBoundary>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20">
                  {/* Content based on active tab */}
                  {activeTab === "overview" && <OverviewContent />}

                  <LazySection activeTab={activeTab} targetTab="hero">
                    <LazyHeroSection
                      heroData={heroData}
                      onUpdate={updateHeroData}
                      onFileUpload={handleFileUpload}
                      isLoading={isLoading}
                    />
                  </LazySection>

                  <LazySection activeTab={activeTab} targetTab="about">
                    <LazyAboutSection
                      aboutData={aboutData}
                      onUpdate={updateAboutData}
                      onFileUpload={handleFileUpload}
                      isLoading={isLoading}
                    />
                  </LazySection>

                  <LazySection activeTab={activeTab} targetTab="skills">
                    <LazySkillsManagement
                      skills={skills}
                      onAdd={addSkill}
                      onUpdate={updateSkill}
                      onDelete={deleteSkill}
                      isLoading={isLoading}
                    />
                  </LazySection>

                  <LazySection activeTab={activeTab} targetTab="projects">
                    <LazyProjectsManagement
                      projects={projects}
                      onAdd={addProject}
                      onUpdate={updateProject}
                      onDelete={deleteProject}
                      onFileUpload={handleFileUpload}
                      isLoading={isLoading}
                    />
                  </LazySection>

                  <LazySection activeTab={activeTab} targetTab="blog">
                    <LazyBlogManagement
                      posts={blogPosts}
                      onAdd={addBlogPost}
                      onUpdate={updateBlogPost}
                      onDelete={deleteBlogPost}
                      onFileUpload={handleFileUpload}
                      isLoading={isLoading}
                    />
                  </LazySection>

                  <LazySection activeTab={activeTab} targetTab="messages">
                    <LazyMessagesManagement
                      messages={contactMessages}
                      onMarkAsRead={markMessageAsRead}
                      onMarkAsReplied={markMessageAsReplied}
                      onDelete={deleteContactMessage}
                      isLoading={isLoading}
                    />
                  </LazySection>

                  {activeTab === "settings" && (
                    <motion.div
                      key="settings-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h2>
                      </div>
                      <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Settings management is under development. Coming soon!</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </DashboardErrorBoundary>
            </div>

            {/* Widgets Sidebar */}
            <div className="xl:col-span-1">
              <motion.div key="dashboard-widgets" initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2, type: "tween" }}>
                <DashboardWidgets />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-4 right-4 bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-4 right-4 bg-green-500/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            {success}
          </div>
        </motion.div>
      )}
    </div>
  );
}
