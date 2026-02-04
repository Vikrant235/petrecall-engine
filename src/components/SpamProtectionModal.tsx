import React from 'react';
import { Shield, Clock, CheckCircle } from 'lucide-react';

interface SpamProtectionModalProps {
  isOpen: boolean;
  fileName: string;
  recordCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const SpamProtectionModal: React.FC<SpamProtectionModalProps> = ({
  isOpen,
  fileName,
  recordCount,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-secondary">
              Spam Protection Protocol Initiated
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* File info */}
          <div className="mb-6 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Selected file:</p>
            <p className="mt-1 font-medium text-secondary">{fileName}</p>
            <p className="text-sm text-muted-foreground">
              {recordCount > 0 ? `${recordCount} records detected` : 'Processing...'}
            </p>
          </div>

          {/* Explanation */}
          <p className="text-muted-foreground leading-relaxed">
            To ensure 99% deliverability and prevent your practice's domain from being flagged as spam, we use a{' '}
            <span className="font-semibold text-secondary">'Smart Drip'</span> algorithm.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Instead of blasting all{' '}
                <span className="font-semibold text-secondary">{recordCount || 'N'}</span> emails at once, we will send{' '}
                <span className="font-semibold text-primary">15 emails per day</span> starting tomorrow at 9:00 AM.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-success" />
              <p className="text-sm text-muted-foreground">
                This mimics human behavior, keeps you in the Primary Inbox, and prevents your front desk from being overwhelmed with calls.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button onClick={onConfirm} className="btn-primary flex-1">
              <CheckCircle className="h-4 w-4" />
              I Understand - Start Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpamProtectionModal;
