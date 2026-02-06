import React from 'react';
import { Activity, Mail, Shield } from 'lucide-react';

interface StatusCardsProps {
  emailsQueued?: number;
}

const StatusCards: React.FC<StatusCardsProps> = ({ emailsQueued = 0 }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Campaign Status */}
      <div className="card-status">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Campaign Status</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-success animate-pulse-soft" />
              <span className="text-lg font-semibold text-secondary">
                {emailsQueued > 0 ? 'Active' : 'Ready for Upload'}
              </span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Activity className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Emails Queued */}
      <div className="card-status">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Emails Queued</p>
            <p className="mt-2 text-3xl font-bold text-secondary">{emailsQueued.toLocaleString()}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Mail className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Spam Protection */}
      <div className="card-status">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Spam Protection</p>
            <div className="mt-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold text-secondary">Active</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <div className="h-3 w-3 rounded-full bg-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
