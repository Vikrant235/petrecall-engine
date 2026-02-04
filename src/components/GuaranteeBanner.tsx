import React from 'react';
import { ShieldCheck } from 'lucide-react';

const GuaranteeBanner: React.FC = () => {
  return (
    <section className="gradient-primary py-12 lg:py-16">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-center lg:gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-foreground lg:text-2xl">
              The 'Zero-Risk' Promise
            </h3>
            <p className="mt-1 text-primary-foreground/90 lg:text-lg">
              No setup fees. No contracts. If we don't generate at least 3 bookings in the first 30 days, you owe us $0.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeBanner;
