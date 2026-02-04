import React from 'react';
import { CheckCircle, Mail, Calendar } from 'lucide-react';

interface UploadSuccessProps {
  isOpen: boolean;
  onReturn: () => void;
}

const UploadSuccess: React.FC<UploadSuccessProps> = ({ isOpen, onReturn }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md">
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Success icon */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl font-bold text-secondary">Upload Successful!</h2>

            {/* Body */}
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Your data is being processed. The first batch of emails is scheduled for tomorrow morning.
            </p>

            {/* Info cards */}
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-secondary">First Batch</p>
                  <p className="text-xs text-muted-foreground">Tomorrow at 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <Mail className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-secondary">Weekly Report</p>
                  <p className="text-xs text-muted-foreground">Performance updates via email</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <button onClick={onReturn} className="btn-primary mt-8 w-full">
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSuccess;
