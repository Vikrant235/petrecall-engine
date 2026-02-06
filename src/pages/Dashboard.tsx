import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import StatusCards from '@/components/StatusCards';
import UploadZone from '@/components/UploadZone';
import OnboardingModal from '@/components/OnboardingModal';
import SpamProtectionModal from '@/components/SpamProtectionModal';
import UploadSuccess from '@/components/UploadSuccess';
import * as XLSX from 'xlsx';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSpamProtection, setShowSpamProtection] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordCount, setRecordCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingComplete = localStorage.getItem('petrecall_onboarding_complete');
    if (user && !onboardingComplete) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('petrecall_onboarding_complete', 'true');
  };

  const processFile = async (file: File) => {
    return new Promise<number>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (file.name.endsWith('.csv')) {
          const text = data as string;
          const rows = text.split('\n').filter(row => row.trim() !== '');
          resolve(Math.max(0, rows.length - 1)); // Subtract header
        } else {
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData.length);
        }
      };
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);
    
    const count = await processFile(file);
    setRecordCount(count);

    const statuses = [
      { label: 'Uploading...', delay: 0 },
      { label: 'Scanning for duplicates...', delay: 800 },
      { label: 'Verifying email formats...', delay: 1600 },
      { label: 'Securely Encryption...', delay: 2400 },
      { label: 'Done.', delay: 3200 },
    ];

    statuses.forEach((status, index) => {
      setTimeout(() => {
        setUploadStatus(status.label);
        setUploadProgress(((index + 1) / statuses.length) * 100);
        
        if (index === statuses.length - 1) {
          setTimeout(() => {
            setIsUploading(false);
            setShowSpamProtection(true);
          }, 500);
        }
      }, status.delay);
    });
  };

  const handleConfirmCampaign = () => {
    setShowSpamProtection(false);
    setShowSuccess(true);
  };

  const handleCancelUpload = () => {
    setShowSpamProtection(false);
    setSelectedFile(null);
    setRecordCount(0);
    setUploadProgress(0);
    setUploadStatus('');
  };

  const handleReturnToDashboard = () => {
    setShowSuccess(false);
    setSelectedFile(null);
    // We keep the recordCount now as it represents queued emails
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navbar variant="dashboard" />
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Status Cards */}
          <StatusCards emailsQueued={showSuccess ? recordCount : 0} />

          {/* Upload Zone / Progress */}
          <div className="mt-8">
            {isUploading ? (
              <div className="card-medical p-8 text-center">
                <h2 className="mb-4 text-xl font-semibold text-secondary">{uploadStatus}</h2>
                <div className="h-4 w-full overflow-hidden rounded-full bg-accent">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Processing {recordCount} records from {selectedFile?.name}
                </p>
              </div>
            ) : !showSuccess ? (
              <UploadZone onFileSelect={handleFileSelect} />
            ) : (
              <div className="card-medical p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                    <div className="h-6 w-6 rounded-full bg-success" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-secondary">Campaign Active</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {recordCount} emails are currently queued for processing.
                </p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="btn-primary mt-6 px-8"
                >
                  Create New Campaign
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <OnboardingModal isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
      
      <SpamProtectionModal
        isOpen={showSpamProtection}
        fileName={selectedFile?.name || ''}
        recordCount={recordCount}
        onConfirm={handleConfirmCampaign}
        onCancel={handleCancelUpload}
      />
      
      <UploadSuccess isOpen={showSuccess} onReturn={handleReturnToDashboard} />
    </div>
  );
};

export default Dashboard;
