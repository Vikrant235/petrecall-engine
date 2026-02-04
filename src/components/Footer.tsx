import React from 'react';
import { PawPrint, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <div className="relative">
                <PawPrint className="h-4 w-4 text-primary-foreground" />
                <Shield className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 text-primary-foreground" />
              </div>
            </div>
            <span className="text-lg font-semibold text-secondary">PetRecall</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </a>
            <a
              href="mailto:help@petrecall.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Support
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 PetRecall Systems.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
