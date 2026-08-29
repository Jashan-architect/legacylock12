import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Key,
  ShieldCheck,
  Fingerprint,
  Smartphone,
  History,
  FileText,
  HelpCircle,
  Bell,
  User,
  CheckCircle2,
  AlertTriangle,
  Download,
  Trash2,
  Check
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

// SECURITY CENTER SCREEN
export const SecurityCenterPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
          Security Center & Threat Model
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review cryptographic posture, encryption enclave status, and zero-knowledge whitepaper guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-headline font-bold text-base text-white">Client-Side Isolation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All records are encrypted in browser memory via WebCrypto AES-256-GCM before transport.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Fingerprint className="w-5 h-5" />
          </div>
          <h3 className="font-headline font-bold text-base text-white">FIDO2 / WebAuthn</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hardware biometric passkeys protect against phishing and unauthorized device registration.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-headline font-bold text-base text-white">Consensus Triggers</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No single party or automated server can unilaterally decrypt estate records.
          </p>
        </div>
      </div>
    </div>
  );
};

// PRIVACY CONSOLE SCREEN
export const PrivacyConsolePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
          Privacy Console & Zero-Knowledge Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Clear disclosures on data segregation, metadata protection, and institutional boundaries.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <h3 className="font-headline font-bold text-base text-white">1. Zero-Knowledge Master Encryption</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            LegacyLock does not possess master decryption keys. In the event of a platform compromise, stored blobs remain undecryptable ciphertext without your local passkey or multi-sig consensus shares.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-headline font-bold text-base text-white">2. Regulatory-Aligned Institutional Boundaries</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            LegacyLock does not execute automatic liquidations or direct wire transfers. Asset claim dossiers provide verified consensus roadmaps for statutory bank probate processes.
          </p>
        </div>
      </div>
    </div>
  );
};

// AUDIT LOG SCREEN
export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useVault();

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Immutable Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete cryptographic audit trail of all vault operations, session logins, and consensus events.
          </p>
        </div>
        <button
          onClick={() => alert('Audit log exported to CSV.')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Log</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 px-3">Timestamp</th>
                <th className="pb-3 px-3">Action</th>
                <th className="pb-3 px-3">Actor Role</th>
                <th className="pb-3 px-3">Details</th>
                <th className="pb-3 px-3">Enclave Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/40 transition-colors">
                  <td className="py-4 px-3 text-white font-mono text-[11px]">{log.timestamp}</td>
                  <td className="py-4 px-3 font-semibold text-indigo-300">{log.action}</td>
                  <td className="py-4 px-3 capitalize text-slate-400">{log.actorRole}</td>
                  <td className="py-4 px-3 text-slate-300">{log.details}</td>
                  <td className="py-4 px-3 font-mono text-[10px] text-slate-500">{log.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// SECURITY SETTINGS SCREEN
export const SecuritySettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const { theme, setTheme, toggleTheme, isDark } = useTheme();
  const [passkeyActive, setPasskeyActive] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('15');

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
          Security & Display Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Hardware keys, multi-factor authentication, appearance theme, and automatic session lockouts.
        </p>
      </div>

      {/* Appearance Theme Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div>
          <h3 className="font-headline font-bold text-base text-white">Interface Theme Mode</h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose between Obsidian Dark theme or Ivory Light theme with luxury gold accents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setTheme('dark');
              showToast({ type: 'success', title: 'Theme Updated', message: 'Obsidian Dark theme applied.' });
            }}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
              isDark
                ? 'border-[#D4AF37] bg-[#121212] ring-2 ring-[#D4AF37]/30'
                : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${isDark ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-slate-800 text-slate-400'}`}>
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>Obsidian Dark</span>
                {isDark && <span className="text-[10px] bg-[#D4AF37] text-black font-bold px-2 py-0.5 rounded">Active</span>}
              </div>
              <p className="text-xs text-slate-400 mt-1">Deep obsidian canvas with high-contrast gold accents.</p>
            </div>
          </button>

          <button
            onClick={() => {
              setTheme('light');
              showToast({ type: 'success', title: 'Theme Updated', message: 'Ivory Light theme applied.' });
            }}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
              !isDark
                ? 'border-[#B88E1F] bg-[#FAF8F5] ring-2 ring-[#B88E1F]/30'
                : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${!isDark ? 'bg-[#B88E1F]/20 text-[#B88E1F]' : 'bg-slate-800 text-slate-400'}`}>
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>Ivory Light</span>
                {!isDark && <span className="text-[10px] bg-[#B88E1F] text-white font-bold px-2 py-0.5 rounded">Active</span>}
              </div>
              <p className="text-xs text-slate-400 mt-1">Clean warm ivory background with tailored readability.</p>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h3 className="font-headline font-bold text-base text-white">Hardware Key (FIDO2)</h3>
            <p className="text-xs text-slate-400">YubiKey or TouchID / FaceID Passkey authentication</p>
          </div>
          <button
            onClick={() => {
              setPasskeyActive(!passkeyActive);
              showToast({ type: 'success', title: 'Passkey Updated', message: 'FIDO2 configuration saved.' });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              passkeyActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {passkeyActive ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-base text-white">Auto-Lock Inactivity Timeout</h3>
            <p className="text-xs text-slate-400">Lock vault memory after period of client inactivity</p>
          </div>
          <select
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
          >
            <option value="5">5 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// PROFILE SETTINGS SCREEN
export const ProfileSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || 'Eleanor Vance');
  const [email, setEmail] = useState(user?.email || 'eleanor.vance@legacylock.vault');

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">Profile Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Manage estate holder personal info and primary email.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-5 shadow-2xl">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Legal Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          onClick={() => showToast({ type: 'success', title: 'Profile Updated', message: 'Changes saved locally.' })}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

// NOTIFICATIONS CENTER SCREEN
export const NotificationsCenterPage: React.FC = () => {
  const { notifications } = useVault();

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">Notifications & Alerts</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Heartbeat pulse reminders, trustee responses, and security pings.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border flex items-start gap-4 ${
              n.read ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-900 border-indigo-500/40 text-slate-200'
            }`}
          >
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-white">{n.title}</h4>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{n.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// SUPPORT HUB SCREEN
export const SupportHubPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">Support & State Hub</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Legal state guidance, emergency recovery assistance, and contact.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <h3 className="font-headline font-bold text-base text-white">State Probate Guides</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Access statutory forms, non-probate transfer laws, and transfer-on-death rules for all 50 states.
          </p>
          <Link to="/contact" className="text-xs text-indigo-400 hover:underline font-semibold block pt-2">
            Browse State Legal Guides →
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <h3 className="font-headline font-bold text-base text-white">Emergency Key Assistance</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Need assistance with paper recovery kits or multi-sig consensus authorization?
          </p>
          <Link to="/contact" className="text-xs text-indigo-400 hover:underline font-semibold block pt-2">
            Contact Security Support →
          </Link>
        </div>
      </div>
    </div>
  );
};

// 404 NOT FOUND PAGE
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="font-headline font-extrabold text-4xl text-white">404</h1>
        <p className="text-sm text-slate-400">The requested screen does not exist or has been cryptographically moved.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
