import React from 'react';
import { Lock, Mail, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const HeroSection: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <section className="gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Main headline */}
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
            Reactivate 'Lost' Patients{' '}
            <span className="text-primary">Without Lifting a Finger.</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground [animation-delay:100ms]">
            The automated patient recall system that fills your calendar with appointments.
            We email your overdue patients personalized vaccine reminders.{' '}
            <span className="font-medium text-foreground">You pay nothing unless they book.</span>
          </p>

          {/* CTA Button */}
          <div className="mt-10 animate-fade-in [animation-delay:200ms]">
            <button onClick={signInWithGoogle} className="btn-google group">
              <GoogleIcon />
              <span>Get Started with Google</span>
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 animate-fade-in [animation-delay:300ms]">
            <div className="trust-badge mx-auto inline-flex">
              <Lock className="h-3.5 w-3.5" />
              <span>256-bit Encrypted Data • Compliance Ready</span>
            </div>
          </div>

          {/* Feature pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in [animation-delay:400ms]">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span>Primary Inbox Delivery</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Automated Scheduling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
