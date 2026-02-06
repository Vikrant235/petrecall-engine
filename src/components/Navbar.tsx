import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, PawPrint } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  variant?: 'landing' | 'dashboard';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'landing' }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <div className="relative">
              <PawPrint className="h-5 w-5 text-primary-foreground" />
              <Shield className="absolute -bottom-1 -right-1 h-3 w-3 text-primary-foreground" />
            </div>
          </div>
          <span className="text-xl font-bold text-secondary">
            {variant === 'dashboard' ? 'PetRecall Dashboard' : 'PetRecall'}
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {variant === 'dashboard' && user ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:block">
                Dr. {user.displayName?.split(' ').pop() || 'User'}
              </span>
              <button
                onClick={signOut}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-secondary text-sm">
              Client Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
