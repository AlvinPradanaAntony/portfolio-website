"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Plus,
  TrendingUp,
  Users,
  Eye,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export function DashboardWidgets() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Update portfolio content", completed: false, priority: "high" },
    { id: "2", title: "Review project submissions", completed: true, priority: "medium" },
    { id: "3", title: "Respond to client messages", completed: false, priority: "high" },
    { id: "4", title: "Backup database", completed: false, priority: "low" },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Widget */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            My Calendar
          </h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">May 2025</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/10 dark:bg-black/10 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Meeting for case 1</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">7:00 - 8:30</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/10 dark:bg-black/10 rounded-lg">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Meeting for case 2</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">11:00 - 12:30</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/10 dark:bg-black/10 rounded-lg">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Meeting for case 3</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">14:00 - 15:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Widget */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            My Tasks
          </h3>
          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              className="flex items-center gap-3 p-3 bg-white/10 dark:bg-black/10 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors cursor-pointer"
              onClick={() => toggleTask(task.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {task.completed ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <Circle className="h-4 w-4 text-gray-400" />
              )}
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  task.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"
                )}>
                  {task.title}
                </p>
              </div>
              <div className={cn("w-2 h-2 rounded-full", getPriorityColor(task.priority))}></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Widget */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Quick Stats
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Page Views</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">2,847</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Visitors</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">1,234</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Messages</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">47</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 dark:bg-black/20 dark:border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">New project added</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">Skills updated</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">1 hour ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">New message received</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}