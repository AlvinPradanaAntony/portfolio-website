"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Briefcase, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface DashboardStats {
  projects: number;
  blogPosts: number;
  messages: number;
  views: number;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats] = useState<DashboardStats>({
    projects: 12,
    blogPosts: 8,
    messages: 24,
    views: 1250
  });

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "hero", label: "Hero Section", icon: User },
    { id: "about", label: "About", icon: FileText },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const statsCards = [
    { title: "Total Projects", value: stats.projects, icon: Briefcase, color: "text-blue-500" },
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-green-500" },
    { title: "Messages", value: stats.messages, icon: MessageSquare, color: "text-purple-500" },
    { title: "Total Views", value: stats.views, icon: Eye, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle variant="glass" />
            <Button variant="outline" size="sm">
              View Site
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card/30 backdrop-blur-sm min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
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
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s an overview of your portfolio performance.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsCards.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <GlassCard className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <stat.icon className={cn("h-8 w-8", stat.color)} />
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "E-commerce Platform", status: "In Progress", date: "2 days ago" },
                          { name: "Portfolio Website", status: "Completed", date: "1 week ago" },
                          { name: "Mobile App", status: "Planning", date: "3 days ago" },
                        ].map((project, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <p className="font-medium">{project.name}</p>
                              <p className="text-sm text-muted-foreground">{project.date}</p>
                            </div>
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs",
                              project.status === "Completed" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                              project.status === "In Progress" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                              project.status === "Planning" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            )}>
                              {project.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "John Doe", message: "Interested in collaboration...", time: "2h ago" },
                          { name: "Jane Smith", message: "Love your latest project!", time: "5h ago" },
                          { name: "Mike Johnson", message: "Can we discuss a project?", time: "1d ago" },
                        ].map((msg, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              {msg.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{msg.name}</p>
                              <p className="text-sm text-muted-foreground">{msg.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "hero" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Hero Section</h2>
                  <Button variant="gradient">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>

                <GlassCard className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        defaultValue="Creative Developer"
                        className="w-full px-3 py-2 border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subtitle</label>
                      <input
                        type="text"
                        defaultValue="Crafting exceptional digital experiences"
                        className="w-full px-3 py-2 border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        rows={4}
                        defaultValue="Crafting exceptional digital experiences with modern technologies, innovative design, and cutting-edge development practices."
                        className="w-full px-3 py-2 border rounded-lg bg-background"
                      />
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Projects</h2>
                  <Button variant="gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <GlassCard key={i} className="p-6">
                      <div className="aspect-video bg-muted rounded-lg mb-4" />
                      <h3 className="font-semibold mb-2">Project {i}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Description of project {i} goes here...
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Add other tab content here */}
            {activeTab !== "overview" && activeTab !== "hero" && activeTab !== "projects" && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">
                  {sidebarItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-muted-foreground">
                  This section is under development. Coming soon!
                </p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}