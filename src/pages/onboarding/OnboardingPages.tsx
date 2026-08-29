import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  PlusCircle,
  Clock,
  FileText,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Lock,
  Building2,
  Scale,
  Cloud,
  Home,
  Bitcoin,
  HeartHandshake,
  Key,
  ShieldAlert,
  Download,
  Check
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// ONBOARDING DASHBOARD
export const OnboardingDashboardPage: React.FC = () => {
  const steps = [
    { title: 'Add First Asset', desc: 'Securely catalog your primary bank or crypto wallet', status: 'completed', time: '2 mins', path: '/add-bank' },
    { title: 'Designate Trusted Contact', desc: 'Appoint an heir or executor for consensus access', status: 'active', time: '2 mins', path: '/invite-trustee' },
    { title: 'Configure Check-in Protocol', desc: 'Set interval and grace period for presence heartbeat', status: 'pending', time: '1 min', path: '/check-in-config' },
    { title: 'Store Emergency Directives', desc: 'Write confidential guidance for your family', status: 'pending', time: '3 mins', path: '/add-digital-legacy' },
    { title: 'Download Recovery Kit', desc: 'Print or store local emergency offline key', status: 'pending', time: '2 mins', path: '/recovery-confirmation' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Progress header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" className="text-slate-800" fill="none" />
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" className="text-indigo-500" strokeDasharray="264" strokeDashoffset="210" strokeLinecap="round" fill="none" />
            </svg>
            <span className="absolute font-headline font-bold text-xl text-white">20%</span>
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
              Setup in progress
            </div>
            <h1 className="font-headline font-bold text-2xl text-white">Let's build your continuity plan</h1>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
              Complete these core steps to ensure your digital estate is secured and ready for future transition.
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((s, idx) => (
            <Link
              key={s.title}
              to={s.path}
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-200 group ${
                s.status === 'completed'
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  : s.status === 'active'
                  ? 'bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-600/10'
                  : 'bg-slate-950/40 border-slate-850 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    s.status === 'completed'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : s.status === 'active'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {s.status === 'completed' ? <Check className="w-5 h-5" /> : <span>{idx + 1}</span>}
                </div>
                <div className="min-w-0">
                  <h3 className="font-headline font-bold text-sm text-white group-hover:text-indigo-300 transition-colors truncate">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">{s.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {s.time}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link to="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            Skip setup & go to Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
};

// WHAT WOULD YOU LIKE TO SECURE?
export const WhatToSecurePage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(['bank', 'legal', 'crypto']);
  const navigate = useNavigate();

  const categories = [
    { id: 'bank', title: 'Financial Accounts', desc: 'Checking, high-yield savings, certificates of deposit', icon: Building2 },
    { id: 'investment', title: 'Investments & Brokerage', desc: 'Stocks, mutual funds, retirement IRAs', icon: Sparkles },
    { id: 'crypto', title: 'Crypto & Discovery', desc: 'Hardware wallet locations, public addresses, metadata', icon: Bitcoin },
    { id: 'insurance', title: 'Insurance Policies', desc: 'Life, health, property coverage details & policies', icon: HeartHandshake },
    { id: 'digital', title: 'Digital Legacy & Cloud', desc: 'Google Inactive Account, Apple legacy contacts, photos', icon: Cloud },
    { id: 'legal', title: 'Legal Documents & Wills', desc: 'Revocable trusts, powers of attorney, healthcare directives', icon: Scale },
    { id: 'property', title: 'Real Estate & Deeds', desc: 'Property titles, home deeds, vehicle ownership', icon: Home }
  ];

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="font-headline font-extrabold text-3xl text-white">What would you like to secure?</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Select the categories you'd like to organize first. We'll guide you step-by-step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((c) => {
            const Icon = c.icon;
            const isChecked = selected.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggle(c.id)}
                className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 ${
                  isChecked
                    ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-600/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isChecked ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-bold text-sm text-white">{c.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 ${
                    isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => navigate('/create-passphrase')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <span>Continue to Passphrase Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// CREATE VAULT PASSPHRASE
export const CreatePassphrasePage: React.FC = () => {
  const [passphrase, setPassphrase] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase.length < 8) {
      showToast({ type: 'warning', title: 'Passphrase too short', message: 'Use at least 8 characters.' });
      return;
    }
    if (passphrase !== confirm) {
      showToast({ type: 'error', title: 'Passphrases do not match', message: 'Please re-enter to confirm.' });
      return;
    }
    showToast({ type: 'success', title: 'Vault Encrypted', message: 'AES-256 master key generated locally.' });
    navigate('/recovery-setup');
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
          <Key className="w-6 h-6" />
        </div>

        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Create Master Passphrase</h1>
          <p className="text-xs text-slate-400 mt-1">This passphrase locks your encrypted vault. It is never sent to us.</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Master Passphrase</label>
            <input
              type="password"
              required
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="e.g. correct horse battery staple"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Passphrase</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter to confirm"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Encrypt My Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

// RECOVERY SETUP & CONFIRMATION
export const RecoverySetupPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Emergency Recovery Pathways</h1>
          <p className="text-xs text-slate-400 mt-1">
            Establish secondary recovery channels so you are never permanently locked out.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Backup Email</label>
            <input
              type="email"
              placeholder="backup@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Backup Phone (SMS)</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => navigate('/recovery-confirmation')}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Save & Generate Recovery Kit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const RecoveryKitConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [checked, setChecked] = useState([true, false, false, true]);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <Download className="w-8 h-8" />
        </div>

        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Recovery Kit Secured</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Your encrypted offline recovery kit has been generated. Store it safely in a physical safe or offline media.
          </p>
        </div>

        <div className="space-y-2 text-left bg-slate-950 p-4 rounded-2xl border border-slate-800">
          {[
            'Downloaded to secure encrypted device',
            'Printed and stored in a physical fireproof safe',
            'Not shared in unencrypted email or cloud chats',
            'Accessible to you in an emergency'
          ].map((item, idx) => (
            <label key={item} className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => {
                  const n = [...checked];
                  n[idx] = !n[idx];
                  setChecked(n);
                }}
                className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 bg-slate-900"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => {
            showToast({ type: 'success', title: 'Onboarding Complete', message: 'Welcome to your LegacyLock Vault.' });
            navigate('/dashboard');
          }}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
        >
          I Stored My Recovery Kit Safely → Enter Dashboard
        </button>
      </div>
    </div>
  );
};
