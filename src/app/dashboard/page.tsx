"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  User,
  Briefcase,
  Bell,
  TrendingUp,
  Activity,
  BarChart3,
  Eye,
  MessageSquare,
  Settings,
  Globe,
  X,
  Check,
  AlertCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import {
  authService,
  heroService,
  aboutService,
  skillsService,
  projectsService,
  blogService,
  contactService,
  fileService
} from "@/lib/firebase-services";
import {
  HeroData,
  AboutData,
  Skill,
  Project,
  BlogPost,
  ContactSubmission
} from "@/lib/firebase";

// Import dashboard components
import { HeroSection } from "@/components/dashboard/hero-section";
import { AboutSection } from "@/components/dashboard/about-section";
import { SkillsManagement } from "@/components/dashboard/skills-management";
import { ProjectsManagement } from "@/components/dashboard/projects-management";
import { MessagesManagement } from "@/components/dashboard/messages-management";
import { BlogManagement } from "@/components/dashboard/blog-management";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
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

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      if (!currentUser) {
        // Redirect to login if not authenticated
        router.push("/dashboard/login");
      } else {
        setLoading(false);
        // Load initial data
        loadAllData();
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Load all data from Firebase
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      // Load hero data
      const { data: heroResult } = await heroService.getHero();
      if (heroResult) setHeroData(heroResult);

      // Load about data
      const { data: aboutResult } = await aboutService.getAbout();
      if (aboutResult) setAboutData(aboutResult);

      // Load skills
      const { data: skillsResult } = await skillsService.getSkills();
      setSkills(skillsResult);

      // Load projects
      const { data: projectsResult } = await projectsService.getProjects();
      setProjects(projectsResult);

      // Load blog posts
      const { data: blogResult } = await blogService.getBlogPosts();
      setBlogPosts(blogResult);

      // Load contact messages
      const { data: contactResult } = await contactService.getContactSubmissions();
      setContactMessages(contactResult);

    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const { error } = await authService.signOut();
    if (error) {
      setError('Failed to logout');
    } else {
      router.push('/dashboard/login');
    }
  };

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    if (type === 'success') {
      setSuccess(message);
      setError(null);
    } else {
      setError(message);
      setSuccess(null);
    }
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 5000);
  };

  // CRUD Functions for Hero Section
  const updateHeroData = async (data: Partial<HeroData>) => {
    setIsLoading(true);
    const { error } = await heroService.updateHero(data);
    if (error) {
      showNotification('Failed to update hero section', 'error');
    } else {
      showNotification('Hero section updated successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
  };

  // CRUD Functions for About Section
  const updateAboutData = async (data: Partial<AboutData>) => {
    setIsLoading(true);
    const { error } = await aboutService.updateAbout(data);
    if (error) {
      showNotification('Failed to update about section', 'error');
    } else {
      showNotification('About section updated successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
  };

  // CRUD Functions for Skills
  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    setIsLoading(true);
    const { error } = await skillsService.addSkill(skill);
    if (error) {
      showNotification('Failed to add skill', 'error');
    } else {
      showNotification('Skill added successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const updateSkill = async (id: string, skill: Partial<Skill>) => {
    setIsLoading(true);
    const { error } = await skillsService.updateSkill(id, skill);
    if (error) {
      showNotification('Failed to update skill', 'error');
    } else {
      showNotification('Skill updated successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const deleteSkill = async (id: string) => {
    setIsLoading(true);
    const { error } = await skillsService.deleteSkill(id);
    if (error) {
      showNotification('Failed to delete skill', 'error');
    } else {
      showNotification('Skill deleted successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  // CRUD Functions for Projects
  const addProject = async (project: Omit<Project, 'id'>) => {
    setIsLoading(true);
    const { error } = await projectsService.addProject(project);
    if (error) {
      showNotification('Failed to add project', 'error');
    } else {
      showNotification('Project added successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    setIsLoading(true);
    const { error } = await projectsService.updateProject(id, project);
    if (error) {
      showNotification('Failed to update project', 'error');
    } else {
      showNotification('Project updated successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    const { error } = await projectsService.deleteProject(id);
    if (error) {
      showNotification('Failed to delete project', 'error');
    } else {
      showNotification('Project deleted successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  // CRUD Functions for Blog Posts
  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    setIsLoading(true);
    const { error } = await blogService.addBlogPost(post);
    if (error) {
      showNotification('Failed to add blog post', 'error');
    } else {
      showNotification('Blog post added successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    setIsLoading(true);
    const { error } = await blogService.updateBlogPost(id, post);
    if (error) {
      showNotification('Failed to update blog post', 'error');
    } else {
      showNotification('Blog post updated successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const deleteBlogPost = async (id: string) => {
    setIsLoading(true);
    const { error } = await blogService.deleteBlogPost(id);
    if (error) {
      showNotification('Failed to delete blog post', 'error');
    } else {
      showNotification('Blog post deleted successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  // Contact message functions
  const markMessageAsRead = async (id: string) => {
    const { error } = await contactService.markAsRead(id);
    if (error) {
      showNotification('Failed to mark message as read', 'error');
    } else {
      loadAllData();
    }
  };

  const markMessageAsReplied = async (id: string) => {
    const { error } = await contactService.markAsReplied(id);
    if (error) {
      showNotification('Failed to mark message as replied', 'error');
    } else {
      loadAllData();
    }
  };

  const deleteContactMessage = async (id: string) => {
    setIsLoading(true);
    const { error } = await contactService.deleteContactSubmission(id);
    if (error) {
      showNotification('Failed to delete message', 'error');
    } else {
      showNotification('Message deleted successfully', 'success');
      loadAllData();
    }
    setIsLoading(false);
    setShowModal(false);
  };

  // File upload function
  const handleFileUpload = async (file: File, path: string) => {
    setIsLoading(true);
    const { url, error } = await fileService.uploadFile(file, path);
    if (error) {
      showNotification('Failed to upload file', 'error');
      return null;
    } else {
      showNotification('File uploaded successfully', 'success');
      return url;
    }
    setIsLoading(false);
  };


  if (loading) {
    // Optionally show a loading spinner or message
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl gradient-text">Loading dashboard...</p>
      </div>
    );
  }


  // Calculate stats from real data
  const portfolioStats = {
    totalProjects: projects.length,
    publishedProjects: projects.filter(p => p.status === 'published').length,
    draftProjects: projects.filter(p => p.status === 'draft').length,
    totalBlogPosts: blogPosts.length,
    publishedPosts: blogPosts.filter(p => p.status === 'published').length,
    draftPosts: blogPosts.filter(p => p.status === 'draft').length,
    totalMessages: contactMessages.length,
    newMessages: contactMessages.filter(m => !m.read).length,
    readMessages: contactMessages.filter(m => m.read).length,
    totalViews: blogPosts.reduce((sum, post) => sum + (post.views || 0), 0),
    monthlyViews: Math.floor(blogPosts.reduce((sum, post) => sum + (post.views || 0), 0) * 0.3)
  };

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "hero", label: "Hero Section", icon: User },
    { id: "about", label: "About Me", icon: FileText },
    { id: "skills", label: "Skills", icon: BarChart3, badge: skills.length },
    { id: "projects", label: "Projects", icon: Briefcase, badge: projects.length },
    { id: "blog", label: "Blog Posts", icon: FileText, badge: blogPosts.length },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: portfolioStats.newMessages },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Get recent items (last 3)
  const recentProjects = projects.slice(0, 3);
  const recentBlogPosts = blogPosts.slice(0, 3);
  const recentMessages = contactMessages.slice(0, 3);

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

      {/* Notifications */}
      {(success || error) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50"
        >
          <GlassCard className={cn(
            "p-4 flex items-center gap-3",
            success && "border-green-500/50 bg-green-500/10",
            error && "border-red-500/50 bg-red-500/10"
          )}>
            {success && <Check className="h-5 w-5 text-green-500" />}
            {error && <AlertCircle className="h-5 w-5 text-red-500" />}
            <span className="text-sm">{success || error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSuccess(null);
                setError(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </GlassCard>
        </motion.div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold gradient-text">Portfolio Dashboard</h1>
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setActiveTab("messages")}
            >
              <Bell className="h-5 w-5" />
              {portfolioStats.newMessages > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {portfolioStats.newMessages}
                </span>
              )}
            </Button>
            <ThemeToggle variant="glass" />
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                View Site
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-white/5 dark:bg-black/5 backdrop-blur-md min-h-[calc(100vh-4rem)]">
          <div className="p-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm",
                    activeTab === item.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Welcome Section */}
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s an overview of your portfolio performance and content.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Projects</p>
                        <p className="text-2xl font-bold">{portfolioStats.totalProjects}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {portfolioStats.publishedProjects} published
                        </p>
                      </div>
                      <Briefcase className="h-8 w-8 text-blue-500" />
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Blog Posts</p>
                        <p className="text-2xl font-bold">{portfolioStats.totalBlogPosts}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {portfolioStats.publishedPosts} published
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Messages</p>
                        <p className="text-2xl font-bold">{portfolioStats.totalMessages}</p>
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <Bell className="h-3 w-3" />
                          {portfolioStats.newMessages} new
                        </p>
                      </div>
                      <MessageSquare className="h-8 w-8 text-purple-500" />
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Views</p>
                        <p className="text-2xl font-bold">{portfolioStats.totalViews}</p>
                        <p className="text-xs text-blue-600 flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {portfolioStats.monthlyViews} this month
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-orange-500" />
                    </div>
                  </GlassCard>
                </div>

                {/* Content Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Projects */}
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Recent Projects</h3>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("projects")}>
                        View All
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                project.status === "Published" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                                project.status === "Draft" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              )}>
                                {project.status}
                              </span>
                              <span className="text-xs text-muted-foreground">{project.createdAt}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Recent Blog Posts */}
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Recent Blog Posts</h3>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("blog")}>
                        View All
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {recentBlogPosts.map((post) => (
                        <div key={post.id} className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                post.status === "Published" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                                post.status === "Draft" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              )}>
                                {post.status}
                              </span>
                              <span className="text-xs text-muted-foreground">{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                {/* Recent Messages */}
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Recent Messages</h3>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("messages")}>
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                          {message.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{message.name}</h4>
                            <span className="text-xs text-muted-foreground">{message.receivedAt}</span>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">{message.subject}</p>
                          <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
                          <span className={cn(
                            "inline-block px-2 py-1 rounded-full text-xs mt-2",
                            message.status === "New" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                            message.status === "Read" && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                            message.status === "Replied" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          )}>
                            {message.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {activeTab === "hero" && (
              <HeroSection
                heroData={heroData}
                onUpdate={updateHeroData}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            )}

            {activeTab === "about" && (
              <AboutSection
                aboutData={aboutData}
                onUpdate={updateAboutData}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            )}

            {activeTab === "skills" && (
              <SkillsManagement
                skills={skills}
                onAdd={addSkill}
                onUpdate={updateSkill}
                onDelete={deleteSkill}
                isLoading={isLoading}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsManagement
                projects={projects}
                onAdd={addProject}
                onUpdate={updateProject}
                onDelete={deleteProject}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            )}

            {activeTab === "blog" && (
              <BlogManagement
                posts={blogPosts}
                onAdd={addBlogPost}
                onUpdate={updateBlogPost}
                onDelete={deleteBlogPost}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            )}

            {activeTab === "messages" && (
              <MessagesManagement
                messages={contactMessages}
                onMarkAsRead={markMessageAsRead}
                onMarkAsReplied={markMessageAsReplied}
                onDelete={deleteContactMessage}
                isLoading={isLoading}
              />
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Settings</h2>
                </div>
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-6">
                    Settings management is under development. Coming soon!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}