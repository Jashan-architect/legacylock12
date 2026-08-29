import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Shield,
  Lock,
  Heart,
  Users,
  FolderLock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Key,
  Compass,
  Fingerprint,
  History,
  Sparkles,
  Layers
} from 'lucide-react';
import { CheckInButton } from '../../components/common/CheckInButton';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero-Knowledge Digital Estate Continuity Architecture</span>
              </div>

              <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Your family should not have to search for your financial life.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Organize your digital estate with client-side encryption. Securely document assets, set up periodic presence check-ins, and prepare verified consensus claim dossiers for your loved ones.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/onboarding"
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Build Continuity Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/vault"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700/80 transition-colors"
                >
                  <FolderLock className="w-4 h-4 text-indigo-400" />
                  <span>Explore Encrypted Vault</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-indigo-400" />
                  <span>Client-Side AES-256</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-emerald-400" />
                  <span>User-Controlled Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-400" />
                  <span>Immutable Audit Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Multi-Sig Consensus</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-headline font-bold text-white text-sm">Active Estate Health</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    PROTECTED (82/100)
                  </span>
                </div>

                {/* 4-State Interactive Checkin Widget in Hero */}
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800/80 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Automated Heartbeat Pulse</span>
                    <span className="text-[11px] text-slate-400">Interval: 30 Days</span>
                  </div>
                  <CheckInButton size="md" className="w-full" />
                </div>

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Encrypted Records</span>
                    <span className="text-lg font-bold text-white font-headline">8 Active</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">100% Client-side</span>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Designated Nominees</span>
                    <span className="text-lg font-bold text-white font-headline">4 Trustees</span>
                    <span className="text-[10px] text-indigo-400 block mt-0.5">Consensus Verified</span>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs py-3 rounded-xl border border-slate-700 transition-colors"
                >
                  <span>Launch Live Estate Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: 3 Pillars (Organize, Confirm, Guide) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-white">
            A structured methodology for the unpredictable.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            LegacyLock separates storage from execution, providing rigorous cryptographic security while you are active, and clear guidance for your family when needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Organize */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <FolderLock className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-lg text-white mb-2">1. Organize</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Catalog financial accounts, crypto discovery coordinates, insurance policies, and wills in a zero-knowledge encrypted vault.
              </p>
            </div>
            <Link
              to="/vault"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Vault Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Tile 2: Confirm */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 fill-emerald-500/20" />
              </div>
              <h3 className="font-headline font-bold text-lg text-white mb-2">2. Confirm</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Automated, calm check-ins verify your well-being. If multiple reminder thresholds and grace periods elapse, continuity protocols begin.
              </p>
            </div>
            <Link
              to="/check-in-config"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Configure Check-in Rules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Tile 3: Guide */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-lg text-white mb-2">3. Guide</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Deliver custom institution-specific claim dossiers and step-by-step instructions to designated heirs, sparing them stressful discovery.
              </p>
            </div>
            <Link
              to="/claim-dossier-preview"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Preview Claim Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scope Disclaimer Strip */}
      <section className="bg-slate-950 py-10 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
            Regulatory-Aligned Compliance Framework
          </h4>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
            LegacyLock organizes information and prepares verified consensus triggers. Financial institutions and courts execute asset transfers independently under applicable jurisdiction laws and institutional verification procedures.
          </p>
        </div>
      </section>
    </div>
  );
};
