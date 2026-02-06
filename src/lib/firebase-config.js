/**
 * Firebase Configuration Module
 * 
 * This module initializes Firebase and makes it available globally for other modules.
 * 
 * SECURITY NOTES:
 * - Never commit actual API keys to version control
 * - Use environment variables in production
 * - Enable App Check in Firebase Console for additional security
 * - Configure proper security rules in Firebase Console
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Enable Google Authentication in Firebase Console > Authentication > Sign-in method
 * 3. Enable Email/Password Authentication in Firebase Console > Authentication > Sign-in method
 * 4. Add your domain to Authorized domains in Firebase Console
 * 5. Replace the placeholder values below with your actual Firebase config
 * 6. For production, move these values to environment variables
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration object
// Replace these placeholder values with your actual Firebase project config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Validate configuration
const validateConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(
    field => !firebaseConfig[field] || firebaseConfig[field].startsWith('YOUR_')
  );
  
  if (missingFields.length > 0) {
    console.warn(
      `Firebase config incomplete. Missing or placeholder values: ${missingFields.join(', ')}. ` +
      'Please update firebase-config.js with your actual Firebase project credentials.'
    );
    return false;
  }
  return true;
};

// Initialize Firebase app (only if not already initialized)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Check if config is valid
const isConfigValid = validateConfig();

// Export configuration and instances
export { firebaseConfig, validateConfig, auth, googleProvider, isConfigValid };
export default app;
