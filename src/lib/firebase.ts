import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // These will be environment variables
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

// Types for our data models
export interface HeroData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  updatedAt: Date;
}

export interface AboutData {
  id: string;
  title: string;
  description: string;
  image?: string;
  resumeUrl?: string;
  experience: string;
  location: string;
  availability: string;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-100
  icon?: string;
  color?: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: Date;
  endDate?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  readingTime: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: Date;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    darkMode: boolean;
  };
  updatedAt: Date;
}

// Firestore collection names
export const COLLECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  BLOG: 'blog',
  CONTACT: 'contact',
  SETTINGS: 'settings',
  USERS: 'users',
} as const;

// Helper functions for Firestore operations
export const createTimestamp = () => new Date();

export const convertFirestoreTimestamp = (timestamp: { toDate?: () => Date } | Date | null | undefined) => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return timestamp;
};