# 🚀 Modern Portfolio Website

A cutting-edge, interactive portfolio website built with Next.js 14, featuring glassmorphism design, smooth animations, and a comprehensive dashboard for content management. This project showcases modern web development skills and 2025 UI/UX trends.

![Portfolio Preview](https://via.placeholder.com/1200x600/667eea/ffffff?text=Modern+Portfolio+Website)

## ✨ Features

### 🎨 **Modern Design & UI/UX**
- **Glassmorphism Effects** - Translucent cards with backdrop blur
- **Interactive 3D Elements** - CSS 3D transforms and hover effects
- **Micro-interactions** - Smooth button animations and form interactions
- **Dark/Light Mode** - System preference detection with smooth transitions
- **Gradient Overlays** - Dynamic gradient backgrounds and mesh gradients
- **Responsive Design** - Mobile-first approach with optimized layouts

### 🎭 **Advanced Animations**
- **GSAP Integration** - Professional scroll-triggered animations
- **Framer Motion** - Smooth page transitions and component animations
- **Smooth Scrolling** - Enhanced navigation experience
- **Loading States** - Elegant loading animations and transitions

### 📱 **Portfolio Sections**
- **Hero Section** - Animated typography with 3D elements
- **About Me** - Professional introduction with skills overview
- **Skills & Technologies** - Interactive filtering and progress bars
- **Projects Showcase** - Featured projects with detailed modals
- **Blog Section** - Article showcase with tag filtering
- **Contact Form** - Functional contact form with validation

### 🛠️ **Dashboard Management**
- **Content Management** - Edit hero, about, projects, and blog content
- **Media Upload** - Image and file management system
- **Analytics Overview** - Project stats and visitor metrics
- **Message Management** - Contact form submissions handling
- **Real-time Updates** - Live content editing capabilities

### 🔧 **Technical Features**
- **Next.js 14** - Latest App Router with server components
- **TypeScript** - Full type safety and better DX
- **Firebase Integration** - Authentication, database, and storage
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Performance** - Optimized images, code splitting, and caching

## 🛠️ Tech Stack

### **Frontend**
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [GSAP](https://greensock.com/gsap/) - Professional animation library

### **Backend & Database**
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service
  - Firestore - NoSQL database
  - Authentication - User management
  - Storage - File uploads
  - Hosting - Web hosting

### **UI Components**
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

### **Development Tools**
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://typicode.github.io/husky/) - Git hooks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication
5. Enable Storage

### 2. Configure Authentication
- Enable Email/Password authentication
- Add your domain to authorized domains

### 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated users
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Admin dashboard
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── portfolio/          # Portfolio sections
│   │   │   ├── skills-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   ├── blog-section.tsx
│   │   │   └── contact-section.tsx
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── lib/
│       ├── animations.ts       # GSAP & Framer Motion utilities
│       ├── firebase.ts         # Firebase configuration
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── next.config.ts              # Next.js configuration
└── package.json
```

## 🎨 Customization

### **Colors & Themes**
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // Add your custom colors
}
```

### **Animations**
Modify `src/lib/animations.ts` to customize animations:
```typescript
export const customAnimation = {
  fadeIn: (element: string, duration = 1) => {
    return gsap.fromTo(element, 
      { opacity: 0 }, 
      { opacity: 1, duration }
    );
  }
};
```

### **Content**
Update the content in each section component:
- `src/components/portfolio/skills-section.tsx` - Skills and technologies
- `src/components/portfolio/projects-section.tsx` - Project showcase
- `src/components/portfolio/blog-section.tsx` - Blog articles

## 📱 Dashboard Features

### **Content Management**
- Edit hero section content
- Manage about section
- Add/edit/delete projects
- Create and publish blog posts
- Handle contact form submissions

### **Media Management**
- Upload and organize images
- Manage project screenshots
- Handle resume/CV files

### **Analytics**
- View project statistics
- Monitor contact form submissions
- Track blog post views

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### **Other Platforms**
- **Netlify**: Connect GitHub repository
- **AWS Amplify**: Deploy from GitHub
- **Railway**: One-click deployment

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [GSAP](https://greensock.com/) for professional animations
- [Firebase](https://firebase.google.com/) for backend services
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

If you have any questions or need help with setup, feel free to:
- Open an issue on GitHub
- Contact me at [your-email@example.com](mailto:your-email@example.com)
- Connect with me on [LinkedIn](https://linkedin.com/in/yourusername)

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
