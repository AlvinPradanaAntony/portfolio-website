"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  User,
  Briefcase,
  MessageSquare,
  Settings,
  BarChart3,
  Globe,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen?: boolean;
  onCloseMobileSidebar?: () => void;
}

const sidebarItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "hero", label: "Hero", icon: Globe },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ 
  activeTab, 
  onTabChange, 
  isCollapsed, 
  onToggleCollapse, 
  isMobileOpen = false, 
  onCloseMobileSidebar 
}: SidebarProps) {
  return (
    <div>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCloseMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 lg:hidden",
          "bg-white/20 backdrop-blur-xl dark:bg-black/10 shadow-2xl",
          "transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full relative p-6">
          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseMobileSidebar}
            className="absolute right-2 top-2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md dark:bg-black/30 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white z-50"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Mobile Logo */}
          <div className="mb-8 mt-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dashboard</p>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              MAIN
            </div>
            
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onCloseMobileSidebar?.();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                    "hover:bg-white/20 hover:backdrop-blur-md dark:hover:bg-black/20",
                    isActive
                      ? "bg-white/30 backdrop-blur-md border border-white/40 text-gray-900 dark:text-white shadow-lg dark:bg-black/30 dark:border-white/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Bottom section */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="rounded-xl bg-white/20 backdrop-blur-md dark:bg-black/20 shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">admin@portfolio.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div
        className="fixed left-0 top-0 h-full z-40 transition-all duration-300 hidden lg:block bg-white/5 backdrop-blur-xl dark:bg-black/10"
        style={{ width: isCollapsed ? "64px" : "256px" }}
      >
        <div className={`h-full relative ${isCollapsed ? "p-3" : "p-6"}`}>
          {/* Collapse Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white/30 backdrop-blur-md dark:bg-black/30 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white z-50 shadow-lg"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          {/* Logo */}
          <div className="mb-8">
            {!isCollapsed ? (
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Portfolio
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dashboard</p>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                MAIN
              </div>
            )}
            
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center rounded-xl text-left transition-all duration-200",
                    "hover:bg-white/20 hover:backdrop-blur-md dark:hover:bg-black/20",
                    isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                    isActive
                      ? "bg-white/30 backdrop-blur-md border border-white/40 text-gray-900 dark:text-white shadow-lg dark:bg-black/30 dark:border-white/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && (
                    <div className="flex items-center flex-1">
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  )}
                  {isCollapsed && isActive && (
                    <motion.div
                      className="absolute right-1 w-1 h-6 bg-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className={`absolute bottom-6 ${isCollapsed ? "left-3 right-3" : "left-6 right-6"}`}>
            <div className={cn(
              "rounded-xl bg-white/20 backdrop-blur-md border border-white/30 dark:bg-black/20 dark:border-white/20 shadow-lg",
              isCollapsed ? "p-2" : "p-4"
            )}>
              <div className={cn(
                "flex items-center",
                isCollapsed ? "justify-center" : "gap-3"
              )}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">admin@portfolio.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
