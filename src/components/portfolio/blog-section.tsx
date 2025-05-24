"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motionVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Calendar, Clock, ArrowRight, Eye } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  readingTime: number;
  views: number;
  createdAt: string;
  publishedAt: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Explore the latest features of Next.js 14 and how they can revolutionize your web development workflow with improved performance and developer experience.",
    content: "Full blog content here...",
    coverImage: "/api/placeholder/600/300",
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    readingTime: 8,
    views: 1250,
    createdAt: "2024-01-15",
    publishedAt: "2024-01-15",
    slug: "building-modern-web-applications-nextjs-14"
  },
  {
    id: "2",
    title: "The Future of UI Design: Glassmorphism and Beyond",
    excerpt: "Dive deep into the glassmorphism design trend and discover how to implement stunning visual effects that enhance user experience in modern applications.",
    content: "Full blog content here...",
    coverImage: "/api/placeholder/600/300",
    tags: ["UI/UX", "Design", "CSS"],
    published: true,
    readingTime: 6,
    views: 890,
    createdAt: "2024-01-10",
    publishedAt: "2024-01-10",
    slug: "future-ui-design-glassmorphism"
  },
  {
    id: "3",
    title: "Mastering GSAP Animations for Web Developers",
    excerpt: "Learn how to create smooth, professional animations using GSAP that will make your websites stand out and provide exceptional user experiences.",
    content: "Full blog content here...",
    coverImage: "/api/placeholder/600/300",
    tags: ["Animation", "GSAP", "JavaScript"],
    published: true,
    readingTime: 10,
    views: 2100,
    createdAt: "2024-01-05",
    publishedAt: "2024-01-05",
    slug: "mastering-gsap-animations"
  },
  {
    id: "4",
    title: "Firebase Integration: From Setup to Production",
    excerpt: "A comprehensive guide to integrating Firebase into your applications, covering authentication, database, storage, and deployment best practices.",
    content: "Full blog content here...",
    coverImage: "/api/placeholder/600/300",
    tags: ["Firebase", "Backend", "Database"],
    published: true,
    readingTime: 12,
    views: 1680,
    createdAt: "2023-12-28",
    publishedAt: "2023-12-28",
    slug: "firebase-integration-setup-production"
  },
  {
    id: "5",
    title: "TypeScript Best Practices for React Developers",
    excerpt: "Discover essential TypeScript patterns and practices that will improve your React development workflow and help you write more maintainable code.",
    content: "Full blog content here...",
    coverImage: "/api/placeholder/600/300",
    tags: ["TypeScript", "React", "Best Practices"],
    published: true,
    readingTime: 9,
    views: 1420,
    createdAt: "2023-12-20",
    publishedAt: "2023-12-20",
    slug: "typescript-best-practices-react"
  },
  {
    id: "6",
    title: "Building Responsive Layouts with Tailwind CSS",
    excerpt: "Master the art of creating beautiful, responsive layouts using Tailwind CSS utility classes and modern CSS Grid and Flexbox techniques.",
    content: "Full blog content here...",
    coverImage: "/api/placeholder/600/300",
    tags: ["Tailwind CSS", "CSS", "Responsive Design"],
    published: true,
    readingTime: 7,
    views: 950,
    createdAt: "2023-12-15",
    publishedAt: "2023-12-15",
    slug: "responsive-layouts-tailwind-css"
  }
];

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

export function BlogSection() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(6);

  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 px-6" id="blog">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionVariants.container}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={motionVariants.item}
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
          >
            Latest Blog Posts
          </motion.h2>
          <motion.p 
            variants={motionVariants.item}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Insights, tutorials, and thoughts on web development, design trends, 
            and the latest technologies shaping the digital landscape.
          </motion.p>
        </motion.div>

        {/* Tag Filter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionVariants.fadeUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium",
              selectedTag === null
                ? "bg-primary text-primary-foreground shadow-lg"
                : "glass-card hover:bg-white/20 text-muted-foreground hover:text-foreground"
            )}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                selectedTag === tag
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "glass-card hover:bg-white/20 text-muted-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {displayedPosts.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionVariants.fadeUp}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Featured Article</h3>
            <GlassCard className="overflow-hidden group cursor-pointer hover:bg-white/15 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-50">📝</div>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(displayedPosts[0].publishedAt)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {displayedPosts[0].readingTime} min read
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {displayedPosts[0].views.toLocaleString()} views
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {displayedPosts[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {displayedPosts[0].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {displayedPosts[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="gradient" className="w-fit group">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <GlassCard className="overflow-hidden h-full">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl opacity-50">📄</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min
                    </div>
                  </div>
                  <h3 className="font-bold mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium group">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </GlassCard>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {hasMorePosts && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={loadMorePosts}
              className="group"
            >
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}

        {/* Blog Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionVariants.fadeUp}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Articles Published", value: blogPosts.length },
            { label: "Total Views", value: blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString() },
            { label: "Topics Covered", value: allTags.length },
            { label: "Avg. Reading Time", value: `${Math.round(blogPosts.reduce((sum, post) => sum + post.readingTime, 0) / blogPosts.length)} min` },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}