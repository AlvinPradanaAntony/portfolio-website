"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Star, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skill } from "@/lib/firebase";

interface SkillsManagementProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill, 'id'>) => Promise<void>;
  onUpdate: (id: string, skill: Partial<Skill>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function SkillsManagement({ skills, onAdd, onUpdate, onDelete, isLoading }: SkillsManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: 80,
    category: "Frontend",
    icon: "",
    description: "",
    order: skills.length
  });

  const categories = ["Frontend", "Backend", "Database", "DevOps", "Design", "Mobile", "Other"];

  const resetForm = () => {
    setFormData({
      name: "",
      level: 80,
      category: "Frontend",
      icon: "",
      description: "",
      order: skills.length
    });
    setEditingSkill(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSkill) {
      await onUpdate(editingSkill.id!, formData);
    } else {
      await onAdd(formData);
    }
    
    resetForm();
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.icon || "",
      description: skill.description || "",
      order: skill.order
    });
    setEditingSkill(skill);
    setShowAddForm(true);
  };

  const handleDelete = async (skill: Skill) => {
    if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      await onDelete(skill.id!);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Skills Management</h2>
        <Button 
          variant="default" 
          onClick={() => setShowAddForm(true)}
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Skill
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
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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

              <div>
                <label className="block text-sm font-medium mb-2">Level ({formData.level}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon (optional)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="e.g., react, javascript, python"
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description (optional)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : (editingSkill ? "Update Skill" : "Add Skill")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      )}

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <GlassCard key={category} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {category}
                <span className="text-sm text-muted-foreground">({categorySkills.length})</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {skill.icon && (
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-medium">{skill.icon.slice(0, 2).toUpperCase()}</span>
                        </div>
                      )}
                      <h4 className="font-medium">{skill.name}</h4>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(skill)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(skill)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Proficiency</span>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    
                    {skill.description && (
                      <p className="text-xs text-muted-foreground mt-2">{skill.description}</p>
                    )}

                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < Math.floor(skill.level / 20) 
                              ? "text-yellow-500 fill-current" 
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Skills Overview */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Skills Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{skills.length}</div>
            <div className="text-sm text-muted-foreground">Total Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{Object.keys(groupedSkills).length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {skills.filter(skill => skill.level >= 80).length}
            </div>
            <div className="text-sm text-muted-foreground">Expert Level</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}