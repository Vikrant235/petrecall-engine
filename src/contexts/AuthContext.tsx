import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('petrecall_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('petrecall_user');
      }
    }
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    // Simulated Google sign-in for demo purposes
    // In production, this would use Firebase Auth
    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    
    const mockUser: User = {
      uid: 'demo-user-123',
      email: 'dr.smith@vetclinic.com',
      displayName: 'Dr. Sarah Smith',
      photoURL: null,
    };
    
    setUser(mockUser);
    localStorage.setItem('petrecall_user', JSON.stringify(mockUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('petrecall_user');
    localStorage.removeItem('petrecall_onboarding_complete');
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
