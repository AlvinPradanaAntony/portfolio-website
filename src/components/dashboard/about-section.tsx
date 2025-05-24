"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { AboutData } from "@/lib/firebase";

interface AboutSectionProps {
  aboutData: AboutData | null;
  onUpdate: (data: Partial<AboutData>) => Promise<void>;
  onFileUpload: (file: File, path: string) => Promise<string | null>;
  isLoading: boolean;
}

export function AboutSection({ aboutData, onUpdate, onFileUpload, isLoading }: AboutSectionProps) {
  const [formData, setFormData] = useState({
    title: aboutData?.title || "About Me",
    description: aboutData?.description || "I'm a passionate developer with expertise in modern web technologies.",
    image: aboutData?.image || "",
    experience: aboutData?.experience || "3+ Years",
    location: aboutData?.location || "Indonesia",
    email: aboutData?.email || "contact@example.com",
    phone: aboutData?.phone || "+62 123 456 789",
    highlights: aboutData?.highlights || [
      "Full-stack Development",
      "UI/UX Design",
      "Mobile Development"
    ]
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await onUpdate(formData);
  };

  const handleFileUpload = async (file: File) => {
    const path = `about/images/${Date.now()}_${file.name}`;
    const url = await onFileUpload(file, path);
    if (url) {
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, ""]
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">About Section</h2>
        <Button 
          variant="default" 
          onClick={handleSave}
          disabled={isLoading}
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Experience</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">About Image</label>
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
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="About" 
                    className="w-full h-32 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Highlights</h3>
          <Button variant="outline" size="sm" onClick={addHighlight}>
            <Plus className="h-4 w-4 mr-2" />
            Add Highlight
          </Button>
        </div>
        <div className="space-y-3">
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                placeholder="Enter highlight"
                className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => removeHighlight(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Preview Section */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">{formData.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{formData.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Experience</h4>
                <p className="font-medium">{formData.experience}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Location</h4>
                <p className="font-medium">{formData.location}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Email</h4>
                <p className="font-medium text-sm">{formData.email}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Phone</h4>
                <p className="font-medium text-sm">{formData.phone}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {formData.highlights.filter(h => h.trim()).map((highlight, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {formData.image && (
            <div className="flex justify-center lg:justify-end">
              <img 
                src={formData.image} 
                alt="About" 
                className="w-full max-w-md rounded-lg object-cover shadow-lg"
              />
            </div>
          )}
        </motion.div>
      </GlassCard>
    </div>
  );
}