import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  X,
  Search,
  ExternalLink,
  Shield,
  Layers,
  Heart,
  Users,
  FileText,
  Key,
  HelpCircle,
  Settings,
  Sparkles,
  Lock,
  ArrowRight,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export interface ScreenRouteItem {
  path: string;
  name: string;
  category: string;
  description: string;
  roleRequired?: string;
  isPopular?: boolean;
}

export const ALL_SCREENS: ScreenRouteItem[] = [
  // Marketing & Public
  { path: '/', name: 'Landing Page', category: 'Public & Showcase', description: 'Primary homepage & zero-knowledge security overview', isPopular: true },
  { path: '/calmer-way', name: 'A Calmer Way to Prepare', category: 'Public & Showcase', description: 'Empathetic journey roadmap & boundary framework' },
  { path: '/pricing', name: 'Transparent Pricing Plans', category: 'Public & Showcase', description: 'Essential, Family & Professional tiers' },
  { path: '/contact', name: 'Contact & Support', category: 'Public & Showcase', description: 'Encrypted communication & vulnerability disclosures' },

  // Authentication & Onboarding
  { path: '/sign-in', name: 'Secure Sign In', category: 'Authentication & Setup', description: 'Zero-knowledge passphrase & passkey login' },
  { path: '/create-account', name: 'Create Secure Account', category: 'Authentication & Setup', description: 'Client-side encryption enrollment' },
  { path: '/confirm-identity', name: 'Confirm Identity (MFA)', category: 'Authentication & Setup', description: 'New device hardware challenge & 6-digit MFA' },
  { path: '/onboarding', name: 'Onboarding Dashboard', category: 'Authentication & Setup', description: '5-step continuity setup progress ring', isPopular: true },
  { path: '/what-to-secure', name: 'What Would You Like to Secure?', category: 'Authentication & Setup', description: 'Asset category selection catalog' },
  { path: '/create-passphrase', name: 'Create Vault Passphrase', category: 'Authentication & Setup', description: 'Master passphrase strength engine & AES-256' },
  { path: '/recovery-setup', name: 'Secure Recovery Setup', category: 'Authentication & Setup', description: 'Secondary backup channels & trusted recovery' },
  { path: '/recovery-confirmation', name: 'Recovery Kit Confirmation', category: 'Authentication & Setup', description: 'Physical safe & emergency kit storage checklist' },

  // User Dashboard & Vault CRUD
  { path: '/dashboard', name: 'User Main Dashboard', category: 'Owner Vault Management', description: 'Executive summary, health score & continuity pulses', isPopular: true },
  { path: '/vault', name: 'Encrypted Vault CRUD Grid', category: 'Owner Vault Management', description: 'Interactive record management, filtering & live search', isPopular: true },
  { path: '/asset-details', name: 'Asset Record Details', category: 'Owner Vault Management', description: 'Deep-dive into Chase Savings, documents & nominee status' },
  { path: '/edit-asset', name: 'Edit Asset Record', category: 'Owner Vault Management', description: 'Visibility rules, attachments & permission matrix' },
  { path: '/add-bank', name: 'Add Bank / Deposit Record', category: 'Owner Vault Management', description: '4-step institutional record wizard' },
  { path: '/review-bank', name: 'Review Bank Record', category: 'Owner Vault Management', description: 'Pre-encryption metadata review before committing' },
  { path: '/add-crypto', name: 'Add Crypto Record', category: 'Owner Vault Management', description: 'Hardware discovery coordinates & exchange metadata' },
  { path: '/add-investment', name: 'Add Investment Record', category: 'Owner Vault Management', description: 'Vanguard folio, advisor links & claim notes' },
  { path: '/add-insurance', name: 'Add Insurance Record', category: 'Owner Vault Management', description: 'Life/health policy numbers, premium dates & checklist' },
  { path: '/add-digital-legacy', name: 'Add Digital Legacy Record', category: 'Owner Vault Management', description: 'Google Drive, Apple iCloud & Microsoft instructions' },

  // Continuity, Check-in & Heartbeat
  { path: '/check-in-prompt', name: 'Just Checking In (Heartbeat)', category: 'Continuity & Check-ins', description: 'Interactive presence pulse & time extension', isPopular: true },
  { path: '/check-in-confirmed', name: 'Check-in Confirmed', category: 'Continuity & Check-ins', description: 'Success confirmation & next reminder countdown' },
  { path: '/check-in-config', name: 'Check-in Policy Configuration', category: 'Continuity & Check-ins', description: 'Frequency intervals, grace periods & escalation rules' },
  { path: '/check-in-history', name: 'Check-in History & Logs', category: 'Continuity & Check-ins', description: 'Audit timeline of presence events & streak counter' },
  { path: '/escalation-center', name: 'Escalation Center', category: 'Continuity & Check-ins', description: 'Pending trigger warning, time remaining & system log', isPopular: true },
  { path: '/pause-release', name: 'Pause Release Process', category: 'Continuity & Check-ins', description: 'Temporary halt protocol with security verification' },

  // Trustees, Nominees & Permissions
  { path: '/trustees', name: 'Trustees & Nominees Directory', category: 'Trustees & Access Control', description: 'Roles hierarchy: Heirs, Executors & Reviewers', isPopular: true },
  { path: '/invite-trustee', name: 'Invite a Trusted Person', category: 'Trustees & Access Control', description: 'Role selector, permission template & safe preview' },
  { path: '/contact-status', name: 'Contact Detail & Status', category: 'Trustees & Access Control', description: 'Onboarding timeline for Robert Sterling, Esq.' },

  // Documents & Verification
  { path: '/document-vault', name: 'Secure Document Vault & Upload', category: 'Documents & Verification', description: 'AES-256 chunked uploader with file classification', isPopular: true },
  { path: '/ai-document-review', name: 'Document Verification Panel', category: 'Documents & Verification', description: 'Split-screen bounding boxes & confidence checks' },
  { path: '/death-certificate-upload', name: 'Upload Death Certificate', category: 'Documents & Verification', description: 'Official verification submission form & guidance' },
  { path: '/institution-checklist', name: 'Institutional Document Checklist', category: 'Documents & Verification', description: 'Progress tracker by bank, mutual funds & legal' },

  // Release, Dossier & Nominee Experience
  { path: '/claim-dossier-preview', name: 'Claim Preparation Dossier', category: 'Release & Nominee Portal', description: 'Official institution-specific claim dossier preview' },
  { path: '/controlled-release', name: 'Controlled Release Approval', category: 'Release & Nominee Portal', description: 'Multi-sig consensus threshold & identity verification' },
  { path: '/release-complete', name: 'Release Complete Dashboard', category: 'Release & Nominee Portal', description: 'Unlocked download center & institution action steps', isPopular: true },
  { path: '/nominee-invite', name: 'Nominee Invitation Landing', category: 'Release & Nominee Portal', description: 'Invitation portal for designated heirs' },
  { path: '/nominee-auth', name: 'Nominee Authentication', category: 'Release & Nominee Portal', description: 'Invitation token verification & passkey auth' },
  { path: '/nominee-identity-verify', name: 'Nominee Identity Verification', category: 'Release & Nominee Portal', description: 'Government ID submission & liveness verification' },
  { path: '/nominee-claim-dashboard', name: 'Nominee Claim Dashboard', category: 'Release & Nominee Portal', description: 'Active case management for Robert Vance', isPopular: true },

  // Security, Audit, Settings & Support
  { path: '/security-center', name: 'Security Center & Devices', category: 'Security & System', description: 'Health score (82/100), safeguards & active sessions', isPopular: true },
  { path: '/privacy-console', name: 'Security & Privacy Console', category: 'Security & System', description: 'Zero-knowledge diagrams & client-side controls' },
  { path: '/audit-log', name: 'System Audit Log', category: 'Security & System', description: 'Immutable transparent audit trail with filters' },
  { path: '/notifications', name: 'Notification Center', category: 'Security & System', description: 'Grouped security, heartbeat & people alerts' },
  { path: '/support-hub', name: 'Support & System State Hub', category: 'Security & System', description: 'System states: Offline, uploading, empty vault' },
  { path: '/support-ticket', name: 'Support Ticket #TK-8829', category: 'Security & System', description: 'Encrypted communication thread with Sarah J.' },
  { path: '/settings', name: 'Settings & Data Controls', category: 'Security & System', description: 'Export vault, session revocation & Danger Zone deletion' }
];

export const QuickScreenSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, switchRole } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const categories = ['all', ...Array.from(new Set(ALL_SCREENS.map((s) => s.category)))];

  const filteredScreens = ALL_SCREENS.filter((s) => {
    const matchesCat = selectedCat === 'all' || s.category === selectedCat;
    const matchesSearch =
      search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.path.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating HUD Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-16 sm:bottom-6 left-3 sm:left-6 z-[9000] bg-[#0A0A0A]/95 text-white hover:bg-[#151515] border border-[#2A2A2A] hover:border-[#D4AF37] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl backdrop-blur-xl flex items-center gap-2 sm:gap-2.5 text-xs font-semibold group transition-all duration-200 max-w-[calc(100vw-2rem)]"
      >
        <Compass className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform shrink-0" />
        <span className="hidden sm:inline font-serif">Screen Explorer (51 Layouts)</span>
        <span className="sm:hidden font-serif">51 Screens</span>
        <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] px-1.5 sm:px-2 py-0.5 rounded font-mono font-bold shrink-0">
          {ALL_SCREENS.length}
        </span>
      </motion.button>

      {/* Full-Screen / Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-6 border-b border-[#1F1F1F] bg-[#050505] flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif font-bold text-white text-sm sm:text-lg truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        LegacyLock Screen Explorer
                      </h2>
                      <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                        Zero broken links. Instant jump to all 51 screens or test roles.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={toggleTheme}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-[#111111] rounded-lg transition-colors border border-transparent hover:border-[#1F1F1F] shrink-0 flex items-center gap-1.5 text-xs font-semibold"
                      title={`Switch to ${isDark ? 'Light' : 'Dark'} Theme`}
                    >
                      {isDark ? <Sun className="w-4 h-4 text-[#D4AF37] shrink-0" /> : <Moon className="w-4 h-4 text-[#B88E1F] shrink-0" />}
                      <span className="hidden sm:inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-[#111111] rounded-lg transition-colors border border-transparent hover:border-[#1F1F1F] shrink-0"
                    >
                      <X className="w-5 h-5 shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Persona Switcher Bar */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 pt-2 border-t border-[#1F1F1F]">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium flex items-center gap-1 mr-1 shrink-0">
                      <UserCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> Role:
                    </span>
                    <button
                      onClick={() => switchRole('owner')}
                      className={`px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
                        user?.role === 'owner'
                          ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                          : 'bg-[#151515] text-gray-300 hover:bg-[#202020] border border-[#2A2A2A]'
                      }`}
                    >
                      Owner (Eleanor)
                    </button>
                    <button
                      onClick={() => switchRole('nominee')}
                      className={`px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
                        user?.role === 'nominee'
                          ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                          : 'bg-[#151515] text-gray-300 hover:bg-[#202020] border border-[#2A2A2A]'
                      }`}
                    >
                      Nominee / Heir (Robert)
                    </button>
                    <button
                      onClick={() => switchRole('executor')}
                      className={`px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
                        user?.role === 'executor'
                          ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                          : 'bg-[#151515] text-gray-300 hover:bg-[#202020] border border-[#2A2A2A]'
                      }`}
                    >
                      Executor (Sterling)
                    </button>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className="sm:hidden px-2 py-0.5 rounded text-[10px] font-semibold bg-[#151515] text-gray-300 border border-[#2A2A2A] flex items-center gap-1 shrink-0"
                  >
                    {isDark ? <Sun className="w-3 h-3 text-[#D4AF37]" /> : <Moon className="w-3 h-3 text-[#B88E1F]" />}
                    <span>{isDark ? 'Light' : 'Dark'}</span>
                  </button>
                </div>

                {/* Search & Category Pills */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 shrink-0" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Filter 51 screens..."
                      className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-colors shrink-0 ${
                          selectedCat === cat
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-[#151515] text-gray-400 hover:text-white border border-[#222]'
                        }`}
                      >
                        {cat === 'all' ? 'All (51)' : cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Screens Grid */}
              <div className="p-3 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 bg-[#070707]">
                {filteredScreens.map((screen) => {
                  const isCurrent = location.pathname === screen.path;
                  return (
                    <button
                      key={screen.path}
                      onClick={() => handleSelect(screen.path)}
                      className={`text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                        isCurrent
                          ? 'bg-[#151515] border-[#D4AF37] ring-1 ring-[#D4AF37]/50'
                          : 'bg-[#0A0A0A] border-[#1A1A1A] hover:border-[#2A2A2A] hover:bg-[#111111]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[9px] sm:text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 sm:px-2 py-0.5 rounded border border-[#D4AF37]/30 truncate">
                            {screen.path}
                          </span>
                          {screen.isPopular && (
                            <span className="text-[8px] sm:text-[9px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded border border-[#D4AF37]/30 font-mono shrink-0">
                              CORE
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif font-bold text-white text-xs group-hover:text-[#D4AF37] transition-colors truncate">
                          {screen.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {screen.description}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#1F1F1F] flex items-center justify-between text-[10px] text-gray-500">
                        <span className="truncate">{screen.category}</span>
                        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
