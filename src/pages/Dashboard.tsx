import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import StatusCards from '@/components/StatusCards';
import UploadZone from '@/components/UploadZone';
import OnboardingModal from '@/components/OnboardingModal';
import SpamProtectionModal from '@/components/SpamProtectionModal';
import UploadSuccess from '@/components/UploadSuccess';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSpamProtection, setShowSpamProtection] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordCount, setRecordCount] = useState(0);

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

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Simulate record count detection
    setRecordCount(Math.floor(Math.random() * 200) + 50);
    setShowSpamProtection(true);
  };

  const handleConfirmCampaign = () => {
    setShowSpamProtection(false);
    setShowSuccess(true);
  };

  const handleCancelUpload = () => {
    setShowSpamProtection(false);
    setSelectedFile(null);
    setRecordCount(0);
  };

  const handleReturnToDashboard = () => {
    setShowSuccess(false);
    setSelectedFile(null);
    setRecordCount(0);
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
          <StatusCards />

          {/* Upload Zone */}
          <div className="mt-8">
            <UploadZone onFileSelect={handleFileSelect} />
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
