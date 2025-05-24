"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Clock, Check, Reply, Trash2, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ContactSubmission } from "@/lib/firebase";

interface MessagesManagementProps {
  messages: ContactSubmission[];
  onMarkAsRead: (id: string) => Promise<void>;
  onMarkAsReplied: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function MessagesManagement({ messages, onMarkAsRead, onMarkAsReplied, onDelete, isLoading }: MessagesManagementProps) {
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const handleMarkAsRead = async (message: ContactSubmission) => {
    if (!message.read) {
      await onMarkAsRead(message.id!);
    }
    setSelectedMessage(message);
  };

  const handleMarkAsReplied = async (message: ContactSubmission) => {
    await onMarkAsReplied(message.id!);
    if (selectedMessage?.id === message.id) {
      setSelectedMessage({ ...message, replied: true });
    }
  };

  const handleDelete = async (message: ContactSubmission) => {
    if (confirm(`Are you sure you want to delete this message from ${message.name}?`)) {
      await onDelete(message.id!);
      if (selectedMessage?.id === message.id) {
        setSelectedMessage(null);
      }
    }
  };

  const filteredMessages = messages
    .filter(message => {
      switch (filter) {
        case 'unread': return !message.read;
        case 'read': return message.read && !message.replied;
        case 'replied': return message.replied;
        default: return true;
      }
    })
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt.seconds * 1000) : new Date();
      const dateB = b.createdAt ? new Date(b.createdAt.seconds * 1000) : new Date();
      return sortBy === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const getMessageStatus = (message: ContactSubmission) => {
    if (message.replied) return { label: 'Replied', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (message.read) return { label: 'Read', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    return { label: 'New', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Messages Management</h2>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Messages Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{messages.length}</div>
          <div className="text-sm text-muted-foreground">Total Messages</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-red-500">{messages.filter(m => !m.read).length}</div>
          <div className="text-sm text-muted-foreground">Unread</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">{messages.filter(m => m.read && !m.replied).length}</div>
          <div className="text-sm text-muted-foreground">Read</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{messages.filter(m => m.replied).length}</div>
          <div className="text-sm text-muted-foreground">Replied</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-lg font-semibold">Messages ({filteredMessages.length})</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredMessages.map((message) => {
              const status = getMessageStatus(message);
              return (
                <motion.div
                  key={message.id}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                    selectedMessage?.id === message.id
                      ? "bg-primary/20 border-primary/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10",
                    !message.read && "border-l-4 border-l-red-500"
                  )}
                  onClick={() => handleMarkAsRead(message)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {message.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{message.name}</h4>
                        <p className="text-xs text-muted-foreground">{message.email}</p>
                      </div>
                    </div>
                    <span className={cn("px-2 py-1 rounded-full text-xs", status.bg, status.color)}>
                      {status.label}
                    </span>
                  </div>
                  
                  <h5 className="font-medium text-sm mb-1">{message.subject}</h5>
                  <p className="text-xs text-muted-foreground line-clamp-2">{message.message}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {getTimeAgo(message.createdAt)}
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedMessage.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!selectedMessage.replied && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsReplied(selectedMessage)}
                      disabled={isLoading}
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Mark as Replied
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Subject</h4>
                  <p className="text-lg">{selectedMessage.subject}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Message</h4>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground">Received</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(selectedMessage.createdAt)}</span>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground">Status</h5>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedMessage.replied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : selectedMessage.read ? (
                        <Eye className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Mail className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm">{getMessageStatus(selectedMessage).label}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Reply Section */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-semibold mb-2">Quick Actions</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Reply via Email
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${selectedMessage.phone || ''}`} className={!selectedMessage.phone ? 'pointer-events-none opacity-50' : ''}>
                        <Clock className="h-4 w-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-12 text-center">
              <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Message Selected</h3>
              <p className="text-muted-foreground">Select a message from the list to view its details</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
