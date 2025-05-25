"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, Settings, LogOut, ChevronDown, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface NavbarProps {
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleSidebar?: () => void; // Added for mobile responsiveness
}

export function DashboardNavbar({ onLogout, isCollapsed, onToggleSidebar }: NavbarProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Dummy notifications data
  const notifications = [
    { id: 1, message: "New message received", time: "5 minutes ago", read: false },
    { id: 2, message: "Your profile was updated", time: "1 hour ago", read: true },
    { id: 3, message: "New comment on your blog post", time: "3 hours ago", read: false },
  ];

  return (
    <div className={`fixed top-0 right-0 h-16 z-30 transition-all duration-300 ${isCollapsed ? "lg:left-16" : "lg:left-64"} left-0`}>
      <div className="h-full px-4 sm:px-6 flex items-center justify-between bg-white/5 backdrop-blur-md dark:bg-black/5">
        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-gray-600 dark:text-gray-300">
            <Menu size={22} />
          </Button>
        </div>

        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent dark:bg-black/10 dark:border-white/10"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 dark:bg-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)} className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 dark:bg-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-start ${!notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
                        <div className="flex-shrink-0 mr-3">
                          <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center">
                            <Bell size={14} />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="ghost" className="w-full justify-center text-sm text-blue-600 dark:text-blue-400">
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 dark:bg-black/10 dark:border-white/10 rounded-full pr-3 pl-1 h-9 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {" "}
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User size={16} className="text-gray-700 dark:text-gray-300" />
              </div>
              <span className="font-medium text-sm hidden sm:inline-block">Admin</span>
              <ChevronDown size={14} />
            </Button>

            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      onClick={() => {
                        setShowProfileDropdown(false);
                      }}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      onClick={() => {
                        setShowProfileDropdown(false);
                      }}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onLogout();
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
