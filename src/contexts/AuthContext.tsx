import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, isConfigValid } from '@/lib/firebase-config';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Helper to convert Firebase User to our User type
const formatUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase config is not valid, use localStorage fallback for demo
    if (!isConfigValid) {
      const savedUser = localStorage.getItem('petrecall_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('petrecall_user');
        }
      }
      setLoading(false);
      return;
    }

    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const formattedUser = formatUser(firebaseUser);
        setUser(formattedUser);
        localStorage.setItem('petrecall_user', JSON.stringify(formattedUser));
      } else {
        setUser(null);
        localStorage.removeItem('petrecall_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isConfigValid) {
      // Demo mode: simulate login
      const mockUser: User = {
        uid: 'demo-user-123',
        email: 'dr.smith@vetclinic.com',
        displayName: 'Dr. Sarah Smith',
        photoURL: null,
      };
      setUser(mockUser);
      localStorage.setItem('petrecall_user', JSON.stringify(mockUser));
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const formattedUser = formatUser(result.user);
      setUser(formattedUser);
      localStorage.setItem('petrecall_user', JSON.stringify(formattedUser));
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!isConfigValid) {
      // Demo mode: simulate login
      const mockUser: User = {
        uid: 'demo-user-123',
        email: email,
        displayName: `Dr. ${email.split('@')[0]}`,
        photoURL: null,
      };
      setUser(mockUser);
      localStorage.setItem('petrecall_user', JSON.stringify(mockUser));
      return;
    }

    try {
      const result = await firebaseSignInWithEmail(auth, email, password);
      const formattedUser = formatUser(result.user);
      setUser(formattedUser);
      localStorage.setItem('petrecall_user', JSON.stringify(formattedUser));
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!isConfigValid) {
      // Demo mode: simulate signup
      const mockUser: User = {
        uid: 'demo-user-' + Date.now(),
        email: email,
        displayName: `Dr. ${email.split('@')[0]}`,
        photoURL: null,
      };
      setUser(mockUser);
      localStorage.setItem('petrecall_user', JSON.stringify(mockUser));
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const formattedUser = formatUser(result.user);
      setUser(formattedUser);
      localStorage.setItem('petrecall_user', JSON.stringify(formattedUser));
    } catch (error: any) {
      console.error('Sign-up error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const signOut = async () => {
    if (isConfigValid) {
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        console.error('Sign-out error:', error);
      }
    }
    setUser(null);
    localStorage.removeItem('petrecall_user');
    localStorage.removeItem('petrecall_onboarding_complete');
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
}
