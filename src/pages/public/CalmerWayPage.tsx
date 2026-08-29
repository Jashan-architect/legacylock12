import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Compass, CheckCircle2, AlertTriangle, ArrowRight, Lock, Sparkles } from 'lucide-react';

export const CalmerWayPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A Mindful Approach to Succession Planning</span>
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            A calmer way to prepare for the unexpected.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Transform the daunting task of end-of-life and digital estate planning into an organized, guided journey. We balance uncompromising zero-knowledge security with empathetic family support.
          </p>
        </div>

        {/* 3 Step Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold text-sm flex items-center justify-center mb-6">
                01
              </div>
              <h3 className="font-headline font-bold text-white text-lg mb-2">Secure your life</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Organize critical assets, digital accounts, and personal directives in a client-side encrypted vault, accessible only to you and your designated trustees.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-indigo-400 font-medium">
              Zero-Knowledge AES-256
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-7 flex flex-col justify-between md:translate-y-4">
            <div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center mb-6">
                02
              </div>
              <h3 className="font-headline font-bold text-white text-lg mb-2">Stay connected</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Automated periodic heartbeat check-ins verify your presence calmly. If multiple reminder thresholds elapse, verified consensus escalation initiates safely.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-emerald-400 font-medium">
              Multi-Channel Heartbeat
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-7 flex flex-col justify-between md:translate-y-8">
            <div>
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-sm flex items-center justify-center mb-6">
                03
              </div>
              <h3 className="font-headline font-bold text-white text-lg mb-2">Guide the right person</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Securely deliver an institution-ready claim dossier to your verified heirs, ensuring they have an exact roadmap with zero guesswork.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-amber-400 font-medium">
              Verified Consensus Trigger
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 space-y-6">
          <h2 className="font-headline font-bold text-xl text-white text-center">Lifecycle Preview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mx-auto mb-2 ring-4 ring-indigo-500/20" />
              <h4 className="font-bold text-xs text-white">1. Setup</h4>
              <p className="text-[11px] text-slate-400">Build vault & nominees</p>
            </div>
            <div className="space-y-1">
              <div className="w-3 h-3 rounded-full bg-indigo-400 mx-auto mb-2" />
              <h4 className="font-bold text-xs text-white">2. Maintenance</h4>
              <p className="text-[11px] text-slate-400">Periodic automated pulses</p>
            </div>
            <div className="space-y-1">
              <div className="w-3 h-3 rounded-full bg-amber-400 mx-auto mb-2" />
              <h4 className="font-bold text-xs text-white">3. Escalation</h4>
              <p className="text-[11px] text-slate-400">Grace period verification</p>
            </div>
            <div className="space-y-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-xs text-white">4. Dossier Delivery</h4>
              <p className="text-[11px] text-slate-400">Authorized heir access</p>
            </div>
          </div>
        </div>

        {/* Explicit Scope Boundaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-headline font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>What LegacyLock Does NOT Do</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Does not perform automatic fund liquidation or direct withdrawals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Does not bypass institutional statutory KYC or legal court probate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Does not make automated medical or clinical declarations.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-tr from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 text-center space-y-4">
            <h3 className="font-headline font-bold text-lg text-white">Ready to begin your continuity plan?</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Start with a structured, zero-stress checklist designed to bring complete peace of mind.
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
            >
              <span>Start with Secure Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
