"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Calendar, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/firebase";

interface BlogManagementProps {
  posts: BlogPost[];
  onAdd: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  onUpdate: (id: string, post: Partial<BlogPost>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onFileUpload: (file: File, path: string) => Promise<string | null>;
  isLoading: boolean;
}

export function BlogManagement({ posts, onAdd, onUpdate, onDelete, onFileUpload, isLoading }: BlogManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    tags: [] as string[],
    status: "draft" as "published" | "draft",
    featured: false,
    readTime: "5 min read",
    category: "Technology"
  });

  const [tagInput, setTagInput] = useState("");
  const categories = ["Technology", "Web Development", "Mobile", "Design", "Tutorial", "News", "Other"];
  const statusOptions = [
    { value: "published", label: "Published", color: "text-green-500" },
    { value: "draft", label: "Draft", color: "text-yellow-500" }
  ];

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      tags: [],
      status: "draft",
      featured: false,
      readTime: "5 min read",
      category: "Technology"
    });
    setTagInput("");
    setEditingPost(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      await onUpdate(editingPost.id!, formData);
    } else {
      await onAdd(formData);
    }
    
    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      image: post.image || "",
      tags: post.tags || [],
      status: post.status,
      featured: post.featured || false,
      readTime: post.readTime || "5 min read",
      category: post.category || "Technology"
    });
    setEditingPost(post);
    setShowAddForm(true);
  };

  const handleDelete = async (post: BlogPost) => {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      await onDelete(post.id!);
    }
  };

  const handleFileUpload = async (file: File) => {
    const path = `blog/images/${Date.now()}_${file.name}`;
    const url = await onFileUpload(file, path);
    if (url) {
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const filteredPosts = posts.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt.seconds * 1000) : new Date();
    const dateB = b.createdAt ? new Date(b.createdAt.seconds * 1000) : new Date();
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Blog Management</h2>
        <Button 
          variant="default" 
          onClick={() => setShowAddForm(true)}
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Post
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Post Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Featured" 
                      className="w-full h-32 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Enter tag name"
                    className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-primary/70 hover:text-primary"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "published" | "draft" }))}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Featured Post</label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : (editingPost ? "Update Post" : "Add Post")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            className="group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mb-4 overflow-hidden">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Eye className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {(post.tags?.length || 0) > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-500 text-xs rounded-full">
                      +{(post.tags?.length || 0) - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    post.status === "published" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                    post.status === "draft" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  )}>
                    {post.status}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.createdAt)}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Blog Overview */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Blog Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{posts.length}</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {posts.filter(p => p.status === 'published').length}
            </div>
            <div className="text-sm text-muted-foreground">Published</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {posts.filter(p => p.status === 'draft').length}
            </div>
            <div className="text-sm text-muted-foreground">Drafts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {posts.reduce((sum, post) => sum + (post.views || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}