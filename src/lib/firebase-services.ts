import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll 
} from 'firebase/storage';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  db, 
  storage, 
  auth, 
  COLLECTIONS,
  HeroData,
  AboutData,
  Skill,
  Project,
  BlogPost,
  ContactSubmission,
  SiteSettings
} from './firebase';

// Authentication Services
export const authService = {
  // Sign in
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { user: null, error: errorMessage };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  },

  // Get current user
  getCurrentUser: () => auth.currentUser,

  // Listen to auth state changes
  onAuthStateChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  }
};

// File Upload Services
export const fileService = {
  // Upload file to Firebase Storage
  uploadFile: async (file: File, path: string): Promise<{ url: string | null; error: string | null }> => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { url: downloadURL, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { url: null, error: errorMessage };
    }
  },

  // Delete file from Firebase Storage
  deleteFile: async (path: string): Promise<{ error: string | null }> => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  },

  // List files in a directory
  listFiles: async (path: string) => {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      const files = await Promise.all(
        result.items.map(async (item) => ({
          name: item.name,
          fullPath: item.fullPath,
          url: await getDownloadURL(item)
        }))
      );
      return { files, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { files: [], error: errorMessage };
    }
  }
};

// Hero Section Services
export const heroService = {
  // Get hero data
  getHero: async (): Promise<{ data: HeroData | null; error: string | null }> => {
    try {
      const heroCollection = collection(db, COLLECTIONS.HERO);
      const heroSnapshot = await getDocs(heroCollection);
      
      if (!heroSnapshot.empty) {
        const heroDoc = heroSnapshot.docs[0];
        const data = { id: heroDoc.id, ...heroDoc.data() } as HeroData;
        return { data, error: null };
      }
      
      return { data: null, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: null, error: errorMessage };
    }
  },

  // Update hero data
  updateHero: async (data: Partial<HeroData>): Promise<{ error: string | null }> => {
    try {
      const heroCollection = collection(db, COLLECTIONS.HERO);
      const heroSnapshot = await getDocs(heroCollection);
      
      const updateData = {
        ...data,
        updatedAt: new Date()
      };

      if (!heroSnapshot.empty) {
        // Update existing document
        const heroDoc = heroSnapshot.docs[0];
        await updateDoc(doc(db, COLLECTIONS.HERO, heroDoc.id), updateData);
      } else {
        // Create new document
        await addDoc(heroCollection, updateData);
      }
      
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  }
};

// About Section Services
export const aboutService = {
  // Get about data
  getAbout: async (): Promise<{ data: AboutData | null; error: string | null }> => {
    try {
      const aboutCollection = collection(db, COLLECTIONS.ABOUT);
      const aboutSnapshot = await getDocs(aboutCollection);
      
      if (!aboutSnapshot.empty) {
        const aboutDoc = aboutSnapshot.docs[0];
        const data = { id: aboutDoc.id, ...aboutDoc.data() } as AboutData;
        return { data, error: null };
      }
      
      return { data: null, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: null, error: errorMessage };
    }
  },

  // Update about data
  updateAbout: async (data: Partial<AboutData>): Promise<{ error: string | null }> => {
    try {
      const aboutCollection = collection(db, COLLECTIONS.ABOUT);
      const aboutSnapshot = await getDocs(aboutCollection);
      
      const updateData = {
        ...data,
        updatedAt: new Date()
      };

      if (!aboutSnapshot.empty) {
        const aboutDoc = aboutSnapshot.docs[0];
        await updateDoc(doc(db, COLLECTIONS.ABOUT, aboutDoc.id), updateData);
      } else {
        await addDoc(aboutCollection, updateData);
      }
      
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  }
};

// Skills Services
export const skillsService = {
  // Get all skills
  getSkills: async (): Promise<{ data: Skill[]; error: string | null }> => {
    try {
      const skillsQuery = query(
        collection(db, COLLECTIONS.SKILLS),
        orderBy('order', 'asc')
      );
      const skillsSnapshot = await getDocs(skillsQuery);
      const skills = skillsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Skill[];
      
      return { data: skills, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: [], error: errorMessage };
    }
  },

  // Add skill
  addSkill: async (skill: Omit<Skill, 'id'>): Promise<{ id: string | null; error: string | null }> => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.SKILLS), skill);
      return { id: docRef.id, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { id: null, error: errorMessage };
    }
  },

  // Update skill
  updateSkill: async (id: string, skill: Partial<Skill>): Promise<{ error: string | null }> => {
    try {
      await updateDoc(doc(db, COLLECTIONS.SKILLS, id), skill);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  },

  // Delete skill
  deleteSkill: async (id: string): Promise<{ error: string | null }> => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.SKILLS, id));
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  }
};

// Projects Services
export const projectsService = {
  // Get all projects
  getProjects: async (): Promise<{ data: Project[]; error: string | null }> => {
    try {
      const projectsQuery = query(
        collection(db, COLLECTIONS.PROJECTS),
        orderBy('order', 'asc')
      );
      const projectsSnapshot = await getDocs(projectsQuery);
      const projects = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      
      return { data: projects, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: [], error: errorMessage };
    }
  },

  // Get project by ID
  getProject: async (id: string): Promise<{ data: Project | null; error: string | null }> => {
    try {
      const projectDoc = await getDoc(doc(db, COLLECTIONS.PROJECTS, id));
      if (projectDoc.exists()) {
        const data = { id: projectDoc.id, ...projectDoc.data() } as Project;
        return { data, error: null };
      }
      return { data: null, error: 'Project not found' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: null, error: errorMessage };
    }
  },

  // Add project
  addProject: async (project: Omit<Project, 'id'>): Promise<{ id: string | null; error: string | null }> => {
    try {
      const projectData = {
        ...project,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.PROJECTS), projectData);
      return { id: docRef.id, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { id: null, error: errorMessage };
    }
  },

  // Update project
  updateProject: async (id: string, project: Partial<Project>): Promise<{ error: string | null }> => {
    try {
      const updateData = {
        ...project,
        updatedAt: new Date()
      };
      await updateDoc(doc(db, COLLECTIONS.PROJECTS, id), updateData);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  },

  // Delete project
  deleteProject: async (id: string): Promise<{ error: string | null }> => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  }
};

// Blog Services
export const blogService = {
  // Get all blog posts
  getBlogPosts: async (): Promise<{ data: BlogPost[]; error: string | null }> => {
    try {
      const blogQuery = query(
        collection(db, COLLECTIONS.BLOG),
        orderBy('createdAt', 'desc')
      );
      const blogSnapshot = await getDocs(blogQuery);
      const posts = blogSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      
      return { data: posts, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: [], error: errorMessage };
    }
  },

  // Get blog post by ID
  getBlogPost: async (id: string): Promise<{ data: BlogPost | null; error: string | null }> => {
    try {
      const postDoc = await getDoc(doc(db, COLLECTIONS.BLOG, id));
      if (postDoc.exists()) {
        const data = { id: postDoc.id, ...postDoc.data() } as BlogPost;
        return { data, error: null };
      }
      return { data: null, error: 'Post not found' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: null, error: errorMessage };
    }
  },

  // Add blog post
  addBlogPost: async (post: Omit<BlogPost, 'id'>): Promise<{ id: string | null; error: string | null }> => {
    try {
      const postData = {
        ...post,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.BLOG), postData);
      return { id: docRef.id, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { id: null, error: errorMessage };
    }
  },

  // Update blog post
  updateBlogPost: async (id: string, post: Partial<BlogPost>): Promise<{ error: string | null }> => {
    try {
      const updateData = {
        ...post,
        updatedAt: new Date()
      };
      await updateDoc(doc(db, COLLECTIONS.BLOG, id), updateData);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  },

  // Delete blog post
  deleteBlogPost: async (id: string): Promise<{ error: string | null }> => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.BLOG, id));
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  }
};

// Contact Services
export const contactService = {
  // Get all contact submissions
  getContactSubmissions: async (): Promise<{ data: ContactSubmission[]; error: string | null }> => {
    try {
      const contactQuery = query(
        collection(db, COLLECTIONS.CONTACT),
        orderBy('createdAt', 'desc')
      );
      const contactSnapshot = await getDocs(contactQuery);
      const submissions = contactSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactSubmission[];
      
      return { data: submissions, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: [], error: errorMessage };
    }
  },

  // Mark message as read
  markAsRead: async (id: string): Promise<{ error: string | null }> => {
    try {
      await updateDoc(doc(db, COLLECTIONS.CONTACT, id), { read: true });
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  },

  // Mark message as replied
  markAsReplied: async (id: string): Promise<{ error: string | null }> => {
    try {
      await updateDoc(doc(db, COLLECTIONS.CONTACT, id), { replied: true });
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  },

  // Delete contact submission
  deleteContactSubmission: async (id: string): Promise<{ error: string | null }> => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CONTACT, id));
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  }
};

// Settings Services
export const settingsService = {
  // Get site settings
  getSettings: async (): Promise<{ data: SiteSettings | null; error: string | null }> => {
    try {
      const settingsCollection = collection(db, COLLECTIONS.SETTINGS);
      const settingsSnapshot = await getDocs(settingsCollection);
      
      if (!settingsSnapshot.empty) {
        const settingsDoc = settingsSnapshot.docs[0];
        const data = { id: settingsDoc.id, ...settingsDoc.data() } as SiteSettings;
        return { data, error: null };
      }
      
      return { data: null, error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { data: null, error: errorMessage };
    }
  },

  // Update site settings
  updateSettings: async (data: Partial<SiteSettings>): Promise<{ error: string | null }> => {
    try {
      const settingsCollection = collection(db, COLLECTIONS.SETTINGS);
      const settingsSnapshot = await getDocs(settingsCollection);
      
      const updateData = {
        ...data,
        updatedAt: new Date()
      };

      if (!settingsSnapshot.empty) {
        const settingsDoc = settingsSnapshot.docs[0];
        await updateDoc(doc(db, COLLECTIONS.SETTINGS, settingsDoc.id), updateData);
      } else {
        await addDoc(settingsCollection, updateData);
      }
      
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { error: errorMessage };
    }
  }
};

// Real-time listeners
export const realtimeService = {
  // Listen to projects changes
  listenToProjects: (callback: (projects: Project[]) => void) => {
    const projectsQuery = query(
      collection(db, COLLECTIONS.PROJECTS),
      orderBy('order', 'asc')
    );
    
    return onSnapshot(projectsQuery, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      callback(projects);
    });
  },

  // Listen to blog posts changes
  listenToBlogPosts: (callback: (posts: BlogPost[]) => void) => {
    const blogQuery = query(
      collection(db, COLLECTIONS.BLOG),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(blogQuery, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      callback(posts);
    });
  },

  // Listen to contact submissions changes
  listenToContactSubmissions: (callback: (submissions: ContactSubmission[]) => void) => {
    const contactQuery = query(
      collection(db, COLLECTIONS.CONTACT),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(contactQuery, (snapshot) => {
      const submissions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactSubmission[];
      callback(submissions);
    });
  }
};