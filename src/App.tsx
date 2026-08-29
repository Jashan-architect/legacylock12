import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { VaultProvider } from './context/VaultContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { QuickScreenSwitcher } from './components/common/QuickScreenSwitcher';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Pages
import { LandingPage } from './pages/public/LandingPage';
import { CalmerWayPage } from './pages/public/CalmerWayPage';
import { PricingPlansPage, ContactPage } from './pages/public/PricingPlansPage';
import { SignInPage, CreateAccountPage, ConfirmIdentityPage } from './pages/auth/AuthPages';
import {
  OnboardingDashboardPage,
  WhatToSecurePage,
  CreatePassphrasePage,
  RecoverySetupPage,
  RecoveryKitConfirmationPage
} from './pages/onboarding/OnboardingPages';
import { DashboardPage, EncryptedVaultPage } from './pages/vault/DashboardPage';
import { AssetDetailPage, EditAssetRecordPage } from './pages/vault/AssetDetailsPages';
import {
  AddBankRecordPage,
  ReviewBankRecordPage,
  AddCryptoRecordPage,
  AddInvestmentRecordPage,
  AddInsuranceRecordPage,
  AddDigitalLegacyPage
} from './pages/vault/RecordWizards';
import {
  CheckInPromptPage,
  CheckInConfirmedPage,
  CheckInConfigPage,
  CheckInHistoryPage,
  EscalationCenterPage,
  MissedCheckInWarningPage
} from './pages/presence/PresencePages';
import {
  TrusteesDirectoryPage,
  InviteTrusteePage,
  TrusteeDetailsPage,
  NomineeClaimDashboardPage
} from './pages/trustees/TrusteePages';
import {
  ClaimInitiationPage,
  ClaimVerificationUploadPage,
  ClaimDossierPreviewPage,
  ClaimChecklistPage,
  ClaimStatusTrackingPage,
  ControlledReleaseMultiSigPage,
  DocumentVaultPage
} from './pages/claims/ClaimAndDocPages';
import {
  SecurityCenterPage,
  PrivacyConsolePage,
  AuditLogPage,
  SecuritySettingsPage,
  ProfileSettingsPage,
  NotificationsCenterPage,
  SupportHubPage,
  NotFoundPage
} from './pages/settings/SettingsAndSecurityPages';

// Dashboard Layout Wrapper (Header + Sidebar + Content + Footer + MobileBottomNav)
const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex flex-col selection:bg-[#D4AF37] selection:text-black">
      <Header />
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 gap-4 sm:gap-8 pb-20 lg:pb-8">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
      <Footer />
      <MobileBottomNav />
      <QuickScreenSwitcher />
    </div>
  );
};

// Public Layout Wrapper
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex flex-col selection:bg-[#D4AF37] selection:text-black">
      <Header />
      <main className="flex-1 min-w-0 w-full">
        <Outlet />
      </main>
      <Footer />
      <QuickScreenSwitcher />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <VaultProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/calmer-way" element={<CalmerWayPage />} />
                  <Route path="/pricing" element={<PricingPlansPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Auth Routes */}
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/create-account" element={<CreateAccountPage />} />
                  <Route path="/confirm-identity" element={<ConfirmIdentityPage />} />

                  {/* Onboarding Flow */}
                  <Route path="/onboarding" element={<OnboardingDashboardPage />} />
                  <Route path="/what-to-secure" element={<WhatToSecurePage />} />
                  <Route path="/create-passphrase" element={<CreatePassphrasePage />} />
                  <Route path="/recovery-setup" element={<RecoverySetupPage />} />
                  <Route path="/recovery-confirmation" element={<RecoveryKitConfirmationPage />} />

                  {/* Standalone Presence Prompts */}
                  <Route path="/check-in-prompt" element={<CheckInPromptPage />} />
                  <Route path="/check-in-confirmed" element={<CheckInConfirmedPage />} />
                  <Route path="/missed-check-in-warning" element={<MissedCheckInWarningPage />} />
                </Route>

                {/* Protected Dashboard Routes with Sidebar Navigation */}
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/vault" element={<EncryptedVaultPage />} />
                  <Route path="/asset-details" element={<AssetDetailPage />} />
                  <Route path="/edit-asset" element={<EditAssetRecordPage />} />

                  {/* Vault Wizards */}
                  <Route path="/add-bank" element={<AddBankRecordPage />} />
                  <Route path="/review-bank" element={<ReviewBankRecordPage />} />
                  <Route path="/add-crypto" element={<AddCryptoRecordPage />} />
                  <Route path="/add-investment" element={<AddInvestmentRecordPage />} />
                  <Route path="/add-insurance" element={<AddInsuranceRecordPage />} />
                  <Route path="/add-digital-legacy" element={<AddDigitalLegacyPage />} />

                  {/* Presence & Heartbeat */}
                  <Route path="/check-in-config" element={<CheckInConfigPage />} />
                  <Route path="/check-in-history" element={<CheckInHistoryPage />} />
                  <Route path="/escalation-center" element={<EscalationCenterPage />} />

                  {/* Trustees & Nominees */}
                  <Route path="/trustees" element={<TrusteesDirectoryPage />} />
                  <Route path="/invite-trustee" element={<InviteTrusteePage />} />
                  <Route path="/trustee-details" element={<TrusteeDetailsPage />} />
                  <Route path="/nominee-claim-dashboard" element={<NomineeClaimDashboardPage />} />

                  {/* Claims & Documents */}
                  <Route path="/claim-initiation" element={<ClaimInitiationPage />} />
                  <Route path="/claim-verification-upload" element={<ClaimVerificationUploadPage />} />
                  <Route path="/claim-dossier-preview" element={<ClaimDossierPreviewPage />} />
                  <Route path="/claim-checklist" element={<ClaimChecklistPage />} />
                  <Route path="/claim-status" element={<ClaimStatusTrackingPage />} />
                  <Route path="/controlled-release" element={<ControlledReleaseMultiSigPage />} />
                  <Route path="/document-vault" element={<DocumentVaultPage />} />

                  {/* Security & Settings */}
                  <Route path="/settings" element={<SecuritySettingsPage />} />
                  <Route path="/security-center" element={<SecurityCenterPage />} />
                  <Route path="/privacy-console" element={<PrivacyConsolePage />} />
                  <Route path="/audit-log" element={<AuditLogPage />} />
                  <Route path="/security-settings" element={<SecuritySettingsPage />} />
                  <Route path="/profile-settings" element={<ProfileSettingsPage />} />
                  <Route path="/notifications" element={<NotificationsCenterPage />} />
                  <Route path="/support-hub" element={<SupportHubPage />} />
                </Route>

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </VaultProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
