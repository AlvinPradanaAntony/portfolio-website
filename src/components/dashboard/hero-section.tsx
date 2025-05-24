"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { HeroData } from "@/lib/firebase";

interface HeroSectionProps {
  heroData: HeroData | null;
  onUpdate: (data: Partial<HeroData>) => Promise<void>;
  onFileUpload: (file: File, path: string) => Promise<string | null>;
  isLoading: boolean;
}

export function HeroSection({ heroData, onUpdate, onFileUpload, isLoading }: HeroSectionProps) {
  const [formData, setFormData] = useState({
    title: heroData?.title || "Creative Developer",
    subtitle: heroData?.subtitle || "Crafting exceptional digital experiences with modern technologies",
    description: heroData?.description || "Innovative design, and cutting-edge development practices.",
    primaryButtonText: heroData?.primaryButtonText || "View My Work",
    primaryButtonLink: heroData?.primaryButtonLink || "#projects",
    secondaryButtonText: heroData?.secondaryButtonText || "Download Resume",
    resumeUrl: heroData?.resumeUrl || "",
    profileImage: heroData?.profileImage || ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await onUpdate(formData);
  };

  const handleFileUpload = async (file: File, type: 'resume' | 'profile') => {
    const path = `hero/${type}/${Date.now()}_${file.name}`;
    const url = await onFileUpload(file, path);
    if (url) {
      if (type === 'resume') {
        setFormData(prev => ({ ...prev, resumeUrl: url }));
      } else {
        setFormData(prev => ({ ...prev, profileImage: url }));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Hero Section</h2>
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
          <h3 className="text-lg font-semibold mb-4">Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Main Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
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
              <label className="block text-sm font-medium mb-2">Profile Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'profile');
                  }}
                  className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formData.profileImage && (
                <div className="mt-2">
                  <img 
                    src={formData.profileImage} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Call-to-Action Buttons</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Button Text</label>
              <input
                type="text"
                value={formData.primaryButtonText}
                onChange={(e) => handleInputChange('primaryButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Button Link</label>
              <input
                type="text"
                value={formData.primaryButtonLink}
                onChange={(e) => handleInputChange('primaryButtonLink', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
              <input
                type="text"
                value={formData.secondaryButtonText}
                onChange={(e) => handleInputChange('secondaryButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Resume File</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'resume');
                  }}
                  className="flex-1 px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formData.resumeUrl && (
                <div className="mt-2">
                  <a 
                    href={formData.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View Current Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Preview Section */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <motion.div 
          className="text-center space-y-4 p-8 rounded-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {formData.profileImage && (
            <div className="flex justify-center mb-6">
              <img 
                src={formData.profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold gradient-text">{formData.title}</h1>
          <h2 className="text-xl text-muted-foreground">{formData.subtitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{formData.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="px-8">
              {formData.primaryButtonText}
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              {formData.secondaryButtonText}
            </Button>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
}