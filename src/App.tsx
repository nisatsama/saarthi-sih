import React, { useState, useEffect } from 'react';
import { I18nProvider } from './i18n';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { SanctionOrderModal } from './components/SanctionOrderModal';
import { Toast } from './components/Toast';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { Sanction } from './types';

// Applicant Pages
import { ApplicantDashboard } from './pages/applicant/ApplicantDashboard';
import { ApplicantProfilePage } from './pages/applicant/ApplicantProfilePage';
import { ApplicantSchemesPage } from './pages/applicant/ApplicantSchemesPage';
import { ApplicationWizard } from './pages/applicant/ApplicationWizard';
import { ApplicantDocumentsPage } from './pages/applicant/ApplicantDocumentsPage';
import { ApplicantFellowshipPage } from './pages/applicant/ApplicantFellowshipPage';
import { MyApplicationsPage } from './pages/applicant/MyApplicationsPage';

// Officer Pages
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { OfficerQueuePage } from './pages/officer/OfficerQueuePage';
import { ApplicationScrutinyPage } from './pages/officer/ApplicationScrutinyPage';
import { OfficerDeficienciesPage } from './pages/officer/OfficerDeficienciesPage';

// Selection Committee Pages
import { SelectionBoardPage } from './pages/committee/SelectionBoardPage';

// Finance Pages
import { FinanceSanctionAndPaymentsPage } from './pages/finance/FinanceSanctionAndPaymentsPage';

// Admin Pages
import { SchemeBuilderPage } from './pages/admin/SchemeBuilderPage';
import { AuditLogPage } from './pages/admin/AuditLogPage';
import { PlatformAnalyticsPage } from './pages/admin/PlatformAnalyticsPage';

const MainAppContent: React.FC = () => {
  const { currentUser, sanctions, isAuthenticated } = useApp();
  
  // Public flow: LANDING -> LOGIN or REGISTER -> PORTAL
  const [viewMode, setViewMode] = useState<'LANDING' | 'LOGIN' | 'REGISTER' | 'PORTAL'>(() => {
    return isAuthenticated ? 'PORTAL' : 'LANDING';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeApplicationId, setActiveApplicationId] = useState<string>('TS-2026-00421');
  const [applyingSchemeId, setApplyingSchemeId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSanctionModal, setActiveSanctionModal] = useState<Sanction | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync viewMode when auth state changes externally
  useEffect(() => {
    if (!isAuthenticated && viewMode === 'PORTAL') {
      setViewMode('LANDING');
    }
  }, [isAuthenticated, viewMode]);

  // Reset tab to default dashboard when current user or role changes
  useEffect(() => {
    if (currentUser.role === 'SELECTION_COMMITTEE') {
      setActiveTab('selection');
    } else if (currentUser.role === 'FINANCE_OFFICER') {
      setActiveTab('sanctions');
    } else {
      setActiveTab('dashboard');
    }
  }, [currentUser.role]);

  // 1. Landing Page View
  if (viewMode === 'LANDING') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
        <LandingPage
          onExploreSchemes={() => {
            if (isAuthenticated) {
              setViewMode('PORTAL');
              setActiveTab('schemes');
            } else {
              setViewMode('LOGIN');
            }
          }}
          onGoToLogin={() => setViewMode('LOGIN')}
          onGoToRegister={() => setViewMode('REGISTER')}
        />
        <Toast />
      </div>
    );
  }

  // 2. Dedicated Login View
  if (viewMode === 'LOGIN') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
        <LoginPage
          onSuccess={() => {
            setViewMode('PORTAL');
            setActiveTab('dashboard');
          }}
          onGoToRegister={() => setViewMode('REGISTER')}
          onGoToLanding={() => setViewMode('LANDING')}
        />
        <Toast />
      </div>
    );
  }

  // 3. Dedicated Applicant Registration View
  if (viewMode === 'REGISTER') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
        <RegisterPage
          onSuccess={() => {
            setViewMode('PORTAL');
            setActiveTab('dashboard');
          }}
          onGoToLogin={() => setViewMode('LOGIN')}
          onGoToLanding={() => setViewMode('LANDING')}
        />
        <Toast />
      </div>
    );
  }

  // 4. Protected Route Guard: If in PORTAL but not authenticated, show Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
        <LoginPage
          onSuccess={() => {
            setViewMode('PORTAL');
            setActiveTab('dashboard');
          }}
          onGoToRegister={() => setViewMode('REGISTER')}
          onGoToLanding={() => setViewMode('LANDING')}
        />
        <Toast />
      </div>
    );
  }

  // Handle application selection from queue or global search
  const handleSelectApplication = (appId: string) => {
    setActiveApplicationId(appId);
    if (currentUser.role === 'OFFICER' || currentUser.role === 'SUPER_ADMIN') {
      setActiveTab('scrutiny');
    } else {
      setActiveTab('applications');
    }
  };

  const handleOpenSanctionById = (sanctionId: string) => {
    const s = sanctions[sanctionId];
    if (s) {
      setActiveSanctionModal(s);
    }
  };

  const renderContent = () => {
    // If currently applying for a scheme
    if (applyingSchemeId) {
      return (
        <ApplicationWizard
          schemeId={applyingSchemeId}
          onCancel={() => setApplyingSchemeId(null)}
          onSuccess={() => {
            setApplyingSchemeId(null);
            setActiveTab('applications');
          }}
        />
      );
    }

    // Role-based view resolution
    switch (currentUser.role) {
      case 'APPLICANT':
        switch (activeTab) {
          case 'schemes':
            return (
              <ApplicantSchemesPage 
                onApply={(sId) => setApplyingSchemeId(sId)} 
              />
            );
          case 'applications':
            return (
              <MyApplicationsPage 
                onResolveDeficiency={() => setActiveTab('documents')}
                onOpenSanction={handleOpenSanctionById}
              />
            );
          case 'documents':
            return <ApplicantDocumentsPage />;
          case 'fellowship':
            return <ApplicantFellowshipPage />;
          case 'profile':
            return <ApplicantProfilePage />;
          case 'dashboard':
          default:
            return (
              <ApplicantDashboard
                onNavigate={(tab) => setActiveTab(tab)}
                onApplyScheme={(sId) => setApplyingSchemeId(sId)}
                onResolveDeficiency={() => setActiveTab('documents')}
              />
            );
        }

      case 'OFFICER':
        switch (activeTab) {
          case 'applications':
            return (
              <OfficerQueuePage 
                onSelectApplication={handleSelectApplication} 
              />
            );
          case 'scrutiny':
            return (
              <ApplicationScrutinyPage
                applicationId={activeApplicationId}
                onBack={() => setActiveTab('applications')}
              />
            );
          case 'deficiencies':
            return (
              <OfficerDeficienciesPage 
                onSelectApplication={handleSelectApplication} 
              />
            );
          case 'verified':
            return (
              <OfficerQueuePage 
                onSelectApplication={handleSelectApplication} 
              />
            );
          case 'reports':
          case 'analytics':
            return <PlatformAnalyticsPage />;
          case 'audit':
            return <AuditLogPage />;
          case 'profile':
            return <ApplicantProfilePage />;
          case 'dashboard':
          default:
            return (
              <OfficerDashboard
                onNavigateToScrutiny={handleSelectApplication}
                onNavigateToQueue={() => setActiveTab('applications')}
              />
            );
        }

      case 'SELECTION_COMMITTEE':
        switch (activeTab) {
          case 'applications':
            return (
              <OfficerQueuePage 
                onSelectApplication={handleSelectApplication} 
              />
            );
          case 'schemes':
            return (
              <ApplicantSchemesPage 
                onApply={(sId) => setApplyingSchemeId(sId)} 
              />
            );
          case 'analytics':
            return <PlatformAnalyticsPage />;
          case 'audit':
            return <AuditLogPage />;
          case 'profile':
            return <ApplicantProfilePage />;
          case 'selection':
          default:
            return <SelectionBoardPage />;
        }

      case 'FINANCE_OFFICER':
        switch (activeTab) {
          case 'analytics':
            return <PlatformAnalyticsPage />;
          case 'audit':
            return <AuditLogPage />;
          case 'profile':
            return <ApplicantProfilePage />;
          case 'sanctions':
          case 'payments':
          case 'dashboard':
          default:
            return (
              <FinanceSanctionAndPaymentsPage
                onOpenSanctionModal={(s) => setActiveSanctionModal(s)}
              />
            );
        }

      case 'SUPER_ADMIN':
      default:
        switch (activeTab) {
          case 'schemes':
            return <SchemeBuilderPage />;
          case 'applications':
            return (
              <OfficerQueuePage 
                onSelectApplication={handleSelectApplication} 
              />
            );
          case 'sanctions':
            return (
              <FinanceSanctionAndPaymentsPage
                onOpenSanctionModal={(s) => setActiveSanctionModal(s)}
              />
            );
          case 'analytics':
            return <PlatformAnalyticsPage />;
          case 'audit':
            return <AuditLogPage />;
          case 'profile':
            return <ApplicantProfilePage />;
          case 'dashboard':
          default:
            return (
              <OfficerDashboard
                onNavigateToScrutiny={handleSelectApplication}
                onNavigateToQueue={() => setActiveTab('applications')}
              />
            );
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#263640]">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={(tab) => setActiveTab(tab)}
        onGoToLanding={() => setViewMode('LANDING')}
      />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setApplyingSchemeId(null);
          }}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectApplication={(appId) => handleSelectApplication(appId)}
        onSelectScheme={() => {
          setActiveTab('schemes');
        }}
      />

      {/* Printable Sanction Order Modal */}
      <SanctionOrderModal
        sanction={activeSanctionModal}
        onClose={() => setActiveSanctionModal(null)}
      />

      {/* Toast Notification Container */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </I18nProvider>
  );
}
