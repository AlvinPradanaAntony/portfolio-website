"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, ExternalLink, Upload, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/firebase";

interface ProjectsManagementProps {
  projects: Project[];
  onAdd: (project: Omit<Project, 'id'>) => Promise<void>;
  onUpdate: (id: string, project: Partial<Project>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onFileUpload: (file: File, path: string) => Promise<string | null>;
  isLoading: boolean;
}

export function ProjectsManagement({ projects, onAdd, onUpdate, onDelete, onFileUpload, isLoading }: ProjectsManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    technologies: [] as string[],
    liveUrl: "",
    githubUrl: "",
    status: "draft" as "published" | "draft" | "archived",
    featured: false,
    order: projects.length,
    category: "Web Development"
  });

  const [techInput, setTechInput] = useState("");
  const categories = ["Web Development", "Mobile App", "Desktop App", "UI/UX Design", "API", "Other"];
  const statusOptions = [
    { value: "published", label: "Published", color: "text-green-500" },
    { value: "draft", label: "Draft", color: "text-yellow-500" },
    { value: "archived", label: "Archived", color: "text-gray-500" }
  ];

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      image: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
      status: "draft",
      featured: false,
      order: projects.length,
      category: "Web Development"
    });
    setTechInput("");
    setEditingProject(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      await onUpdate(editingProject.id!, formData);
    } else {
      await onAdd(formData);
    }
    
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || "",
      image: project.image,
      technologies: project.technologies,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      status: project.status,
      featured: project.featured || false,
      order: project.order,
      category: project.category || "Web Development"
    });
    setEditingProject(project);
    setShowAddForm(true);
  };

  const handleDelete = async (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      await onDelete(project.id!);
    }
  };

  const handleFileUpload = async (file: File) => {
    const path = `projects/images/${Date.now()}_${file.name}`;
    const url = await onFileUpload(file, path);
    if (url) {
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const filteredProjects = projects.sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects Management</h2>
        <Button 
          variant="default" 
          onClick={() => setShowAddForm(true)}
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
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
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title</label>
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
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Detailed Description</label>
                <textarea
                  rows={4}
                  value={formData.longDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Image</label>
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
                      alt="Project" 
                      className="w-full h-32 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Technologies</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    placeholder="Enter technology name"
                    className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addTechnology}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-primary/70 hover:text-primary"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Live URL (optional)</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL (optional)</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
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
                  <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : (editingProject ? "Update Project" : "Add Project")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-4 overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Eye className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  {project.featured && (
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-500 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    project.status === "published" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                    project.status === "draft" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                    project.status === "archived" && "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  )}>
                    {project.status}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {project.createdAt ? new Date(project.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-1">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project)}
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

      {/* Projects Overview */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Projects Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {projects.filter(p => p.status === 'published').length}
            </div>
            <div className="text-sm text-muted-foreground">Published</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {projects.filter(p => p.status === 'draft').length}
            </div>
            <div className="text-sm text-muted-foreground">Drafts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-muted-foreground">Featured</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}