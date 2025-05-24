# 🚀 Portfolio Website - Setup Guide

## 📋 Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **Firebase** account (free tier available)

## 🔧 Installation Steps

### 1. Clone & Install Dependencies

```bash
# Navigate to project directory
cd portfolio-website

# Install dependencies
npm install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "my-portfolio")
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Enable Firebase Services
1. **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Click "Save"

2. **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode"
   - Select location closest to your users
   - Click "Done"

3. **Storage**:
   - Go to Storage
   - Click "Get started"
   - Choose "Start in test mode"
   - Select location
   - Click "Done"

#### Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) to add web app
4. Enter app nickname (e.g., "Portfolio Website")
5. Click "Register app"
6. Copy the configuration object

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local
```

Edit `.env.local` with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Security Rules

#### Firestore Rules
Go to Firestore Database > Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write all documents
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to portfolio data
    match /hero/{document} {
      allow read: if true;
    }
    match /about/{document} {
      allow read: if true;
    }
    match /skills/{document} {
      allow read: if true;
    }
    match /projects/{document} {
      allow read: if true;
    }
    match /blog/{document} {
      allow read: if true;
    }
  }
}
```

#### Storage Rules
Go to Storage > Rules and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow authenticated users to upload/download files
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to portfolio images
    match /hero/{allPaths=**} {
      allow read: if true;
    }
    match /about/{allPaths=**} {
      allow read: if true;
    }
    match /projects/{allPaths=**} {
      allow read: if true;
    }
    match /blog/{allPaths=**} {
      allow read: if true;
    }
  }
}
```

### 5. Create Admin User

1. Run the development server:
```bash
npm run dev
```

2. Go to `http://localhost:3000/dashboard/login`

3. Try to login with any email/password - this will fail but create the user in Firebase Auth

4. Go to Firebase Console > Authentication > Users

5. Find your user and note the UID

6. Go to Firestore Database and create a collection called `admins`

7. Create a document with your UID as the document ID and add field:
   ```
   role: "admin"
   email: "your-email@example.com"
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📱 Accessing the Application

- **Portfolio Website**: http://localhost:3000
- **Dashboard Login**: http://localhost:3000/dashboard/login
- **Dashboard**: http://localhost:3000/dashboard

## 🔐 Default Login

After setting up Firebase Auth, you can create an account by:

1. Going to `/dashboard/login`
2. Entering any email/password
3. The system will create the account automatically
4. Make sure to add the user to the `admins` collection in Firestore

## 🛠️ Troubleshooting

### Common Issues

#### 1. Firebase Configuration Error
```
Error: Firebase configuration is missing
```
**Solution**: Check that all environment variables in `.env.local` are correctly set.

#### 2. Authentication Error
```
Error: User not authenticated
```
**Solution**: Make sure you've created an admin user in Firestore `admins` collection.

#### 3. Firestore Permission Denied
```
Error: Missing or insufficient permissions
```
**Solution**: Check Firestore security rules and ensure they allow the required operations.

#### 4. Storage Upload Error
```
Error: Upload failed
```
**Solution**: Check Storage security rules and ensure they allow file uploads.

#### 5. Build Errors
```
Error: Module not found
```
**Solution**: Run `npm install` to ensure all dependencies are installed.

### Debug Mode

Enable debug mode by adding to `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

This will show additional console logs for debugging.

## 📊 Initial Data Setup

The dashboard will be empty initially. You can add content through:

1. **Hero Section**: Add your main title, subtitle, and profile image
2. **About Section**: Add your bio, experience, and contact info
3. **Skills**: Add your technical skills with proficiency levels
4. **Projects**: Add your portfolio projects with images and links
5. **Blog**: Add blog posts and articles

## 🔄 Data Backup

To backup your data:

1. Go to Firebase Console > Firestore Database
2. Click "Export" to backup your database
3. Go to Storage to download uploaded files

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure environment variables
4. Deploy

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📞 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify Firebase configuration
3. Check security rules
4. Ensure all dependencies are installed
5. Review the troubleshooting section above

## 🎯 Next Steps

After setup:

1. Customize the design and colors in `tailwind.config.ts`
2. Add your own content through the dashboard
3. Customize the portfolio sections as needed
4. Add your own branding and styling
5. Deploy to production

---

**Happy coding! 🚀**