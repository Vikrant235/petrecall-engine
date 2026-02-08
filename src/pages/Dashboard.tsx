import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import StatusCards from '@/components/StatusCards';
import UploadZone from '@/components/UploadZone';
import OnboardingModal from '@/components/OnboardingModal';
import SpamProtectionModal from '@/components/SpamProtectionModal';
import UploadSuccess from '@/components/UploadSuccess';
import ExcelJS from 'exceljs';

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
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (file.name.endsWith('.csv')) {
          const text = data as string;
          const rows = text.split('\n').filter(row => row.trim() !== '');
          resolve(Math.max(0, rows.length - 1)); // Subtract header
        } else {
          const workbook = new ExcelJS.Workbook();
          const buffer = data as ArrayBuffer;
          await workbook.xlsx.load(buffer);
          const worksheet = workbook.getWorksheet(1);
          if (worksheet) {
            // exceljs rowCount includes empty rows often, but rowCount is generally correct for data
            // Subtract 1 for the header
            resolve(Math.max(0, worksheet.actualRowCount - 1));
          } else {
            resolve(0);
          }
        }
      };
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
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
    // The recordCount is now preserved to show in StatusCards
  };

  const handleCreateNewCampaign = () => {
    setRecordCount(0);
    setSelectedFile(null);
    setShowSuccess(false);
    setUploadProgress(0);
    setUploadStatus('');
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
          <StatusCards emailsQueued={recordCount} />

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
            ) : recordCount === 0 ? (
              <UploadZone onFileSelect={handleFileSelect} />
            ) : (
              <div className="card-medical p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <div className="h-8 w-8 rounded-full bg-success animate-pulse" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-secondary">File Uploaded & Processing</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {recordCount.toLocaleString()} emails are currently in progress.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <div className="rounded-lg bg-accent/50 px-4 py-2 text-xs font-medium text-primary">
                    Campaign Active
                  </div>
                </div>
                <button 
                  onClick={handleCreateNewCampaign}
                  className="btn-secondary mt-8 text-xs opacity-50 hover:opacity-100 transition-opacity"
                >
                  Clear and Upload New File
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
