import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Heart,
  Users,
  FileText,
  Activity,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  TrendingUp,
  Building2,
  Key
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useAuth } from '../../context/AuthContext';
import { CheckInButton } from '../../components/common/CheckInButton';
import { VaultGrid } from '../../components/common/VaultGrid';

export const DashboardPage: React.FC = () => {
  const { records, checkInState, trustees, notifications, checkInLogs } = useVault();
  const { user } = useAuth();

  const verifiedTrusteesCount = trustees.filter((t) => t.status === 'verified').length;

  return (
    <div className="space-y-8">
      {/* Top Banner with Heartbeat Check-in */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
              Continuity Plan Active & Healthy
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Welcome, {user?.name || 'Eleanor'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
            Your encrypted vault holds <span className="text-[#D4AF37] font-bold">{records.length} records</span> protected under client-side AES-256 encryption. Heartbeat interval set to{' '}
            <span className="text-white font-semibold font-mono">{checkInState.frequencyDays || 30} days</span>.
          </p>
        </div>

        {/* 4-State Check-in Button */}
        <div className="shrink-0 w-full sm:w-auto relative z-10">
          <CheckInButton size="lg" />
        </div>
      </div>

      {/* Metric Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Vault Status */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Vault Records</span>
            <div className="w-8 h-8 rounded-lg bg-[#151515] text-[#D4AF37] flex items-center justify-center border border-[#222]">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-2xl text-white">{records.length}</span>
            <span className="text-[11px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 font-mono">
              100% Encrypted
            </span>
          </div>
          <div className="w-full bg-[#151515] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        {/* Metric 2: Trustees & Heirs */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Trustees / Heirs</span>
            <div className="w-8 h-8 rounded-lg bg-[#151515] text-[#D4AF37] flex items-center justify-center border border-[#222]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-2xl text-white">
              {verifiedTrusteesCount} <span className="text-xs font-normal text-gray-400 font-mono">/ {trustees.length}</span>
            </span>
            <span className="text-[11px] text-green-400 font-semibold bg-green-950/40 px-2 py-0.5 rounded border border-green-800/40">
              Consensus Ready
            </span>
          </div>
          <p className="text-[11px] text-gray-400 truncate">Robert Sterling (Executor), Robert Vance (Heir)</p>
        </div>

        {/* Metric 3: Heartbeat Streak */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Heartbeat Streak</span>
            <div className="w-8 h-8 rounded-lg bg-[#151515] text-[#D4AF37] flex items-center justify-center border border-[#222]">
              <Heart className="w-4 h-4 fill-[#D4AF37]/20" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-2xl text-white font-mono">{checkInState.streakDays || 180}d</span>
            <span className="text-[11px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              Active Pulse
            </span>
          </div>
          <p className="text-[11px] text-gray-400">0 unresolved alerts in grace period</p>
        </div>

        {/* Metric 4: Security Health */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Security Posture</span>
            <div className="w-8 h-8 rounded-lg bg-[#151515] text-[#D4AF37] flex items-center justify-center border border-[#222]">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-2xl text-white font-mono">82 / 100</span>
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Grade A
            </span>
          </div>
          <p className="text-[11px] text-gray-400">Passkey & Hardware Auth active</p>
        </div>
      </div>

      {/* Main Vault CRUD Grid Section */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-4 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-lg sm:text-xl text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Encrypted Asset Vault</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Live CRUD grid with instant filtering, masking, inline editing, and detail drilling.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/add-bank"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#151515] hover:bg-[#202020] text-gray-200 hover:text-white rounded-lg text-xs font-semibold border border-[#2A2A2A] transition-colors shrink-0"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Add Bank</span>
            </Link>
            <Link
              to="/add-crypto"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#151515] hover:bg-[#202020] text-gray-200 hover:text-white rounded-lg text-xs font-semibold border border-[#2A2A2A] transition-colors shrink-0"
            >
              <Key className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Add Crypto</span>
            </Link>
            <Link
              to="/add-investment"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#151515] hover:bg-[#202020] text-gray-200 hover:text-white rounded-lg text-xs font-semibold border border-[#2A2A2A] transition-colors shrink-0"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Add Investment</span>
            </Link>
          </div>
        </div>

        <VaultGrid />
      </div>

      {/* Recent Heartbeat Activity & Continue Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Logs */}
        <div className="lg:col-span-8 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
            <h3 className="font-serif font-bold text-base text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              <Activity className="w-4 h-4 text-[#D4AF37]" />
              <span>Recent Presence Logs</span>
            </h3>
            <Link to="/check-in-history" className="text-xs text-[#D4AF37] hover:underline font-mono">
              View All History →
            </Link>
          </div>

          <div className="space-y-3">
            {checkInLogs.slice(0, 3).map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-3.5 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A] text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <span>{log.channel}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{log.device}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">{log.details}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {log.status}
                  </span>
                  <div className="text-[10px] text-gray-500 mt-1 font-mono">{log.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Setup checklist */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Continuity Guardrails</h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-gray-300">Master Passphrase Encrypted</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-gray-300">Offline Recovery Kit Stored</span>
            </div>
            <Link
              to="/invite-trustee"
              className="flex items-center justify-between p-3 rounded-xl bg-[#151515] border border-[#2A2A2A] hover:border-[#D4AF37] text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>Confirm Co-Executor</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EncryptedVaultPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F1F] pb-6">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Encrypted Vault Panel
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Zero-knowledge cryptographic storage for all digital, financial, and estate records.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3.5 py-1.5 rounded-lg text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>AES-256 Client Isolation</span>
        </div>
      </div>

      <VaultGrid showAddButton={true} />
    </div>
  );
};
