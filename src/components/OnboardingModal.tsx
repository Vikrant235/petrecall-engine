import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Upload, Shield, Rocket, Check } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const steps = [
  {
    icon: Sparkles,
    header: 'Welcome to the Pilot Program.',
    body: "You are currently running the 'Reactivation Engine' in Trial Mode. No setup fees applied.",
  },
  {
    icon: Upload,
    header: 'Secure Data Upload.',
    body: 'Upload your patient CSV file securely. We only need Name, Pet Name, and Last Visit Date.',
  },
  {
    icon: Shield,
    header: "The 'Safety Limit' Protocol.",
    body: 'To guarantee 100% Primary Inbox delivery (and zero spam), the system is hard-locked to send exactly 15 emails per day.',
  },
  {
    icon: Rocket,
    header: 'Ready to Launch.',
    body: 'Your dashboard is ready. Upload your list to start the daily drip campaign immediately.',
  },
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const Icon = currentStepData.icon;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Progress indicator */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-6 bg-primary'
                    : index < currentStep
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
              <Icon className="h-8 w-8 text-primary" />
            </div>

            {/* Header */}
            <h2 className="text-2xl font-bold text-secondary">{currentStepData.header}</h2>

            {/* Body */}
            <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
              {currentStepData.body}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                currentStep === 0
                  ? 'cursor-not-allowed text-muted-foreground/50'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {/* Next/Complete button */}
            {isLastStep ? (
              <button onClick={handleComplete} className="btn-primary">
                <Check className="h-4 w-4" />
                Go to Dashboard
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
