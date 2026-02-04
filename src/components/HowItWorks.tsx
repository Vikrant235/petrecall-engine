import React from 'react';
import { Upload, Filter, CalendarCheck } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload',
    description:
      "Export your 'Patients Not Seen in 12 Months' list from your practice software (Avimark, Cornerstone, etc) and drop it in our secure portal.",
  },
  {
    icon: Filter,
    step: '02',
    title: 'We Filter',
    description:
      "Our system cleans the data and formats personalized 'Medical Alert' emails that land in the Primary Inbox, not Spam.",
  },
  {
    icon: CalendarCheck,
    step: '03',
    title: 'You Book',
    description:
      "Owners reply directly to your front desk to book. We track the results. If it works, it's $199/mo. If not, it's free.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="container">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three simple steps to reactivate your lapsed patients and fill your appointment book.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="card-medical group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step number */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-primary">
                  Step {item.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-secondary">{item.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
