import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield, Lock, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export const PricingPlansPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Knowledge Encryption Included in All Plans</span>
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Transparent pricing for lasting peace of mind.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Secure your digital legacy with plans tailored for individuals, families, and estate planners. No hidden lock-in, zero data harvesting.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Essential Plan */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="font-headline font-bold text-lg text-white">Essential</h3>
                <p className="text-xs text-slate-400 mt-1">For individuals starting digital estate organization.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-headline font-extrabold text-4xl text-white">$5</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>50 Encrypted Vault Records</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>1 Automated Heartbeat Channel (Email)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>2 Designated Trustees / Nominees</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>5 GB Client-Encrypted Storage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>30-Day Immutable Audit History</span>
                </li>
              </ul>
            </div>

            <Link
              to="/create-account"
              className="mt-8 w-full flex items-center justify-center py-3 bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
            >
              Choose Essential
            </Link>
          </div>

          {/* Family Plan (Popular) */}
          <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-headline font-bold text-lg text-white">Family</h3>
                <p className="text-xs text-indigo-300 mt-1">Complete protection for estates, heirs, and crypto assets.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-headline font-extrabold text-4xl text-white">$12</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>250 Encrypted Vault Records</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>3 Multi-Channel Heartbeats (Email, SMS, App)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>10 Designated Trustees / Executors</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>50 GB Client-Encrypted Storage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Institution Claim Dossier Generator</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Full Lifetime Audit Trail</span>
                </li>
              </ul>
            </div>

            <Link
              to="/create-account"
              className="mt-8 w-full flex items-center justify-center py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              Get Started with Family
            </Link>
          </div>

          {/* Professional Plan */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="font-headline font-bold text-lg text-white">Professional</h3>
                <p className="text-xs text-slate-400 mt-1">For attorneys, executors, and high-net-worth trusts.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-headline font-extrabold text-4xl text-white">$25</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>Unlimited Encrypted Records</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>All Check-in Channels + Custom Protocols</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>Unlimited Trustees & Legal Reviewers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>250 GB Storage with Custom Retention Rules</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span>24/7 Dedicated Legal & Compliance Support</span>
                </li>
              </ul>
            </div>

            <Link
              to="/create-account"
              className="mt-8 w-full flex items-center justify-center py-3 bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
            >
              Choose Professional
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 space-y-6">
          <h2 className="font-headline font-bold text-xl text-white text-center">Frequently Answered Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-300">
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Who holds the encryption keys?</h4>
              <p className="text-slate-400">
                You do. LegacyLock utilizes zero-knowledge architecture. All encryption occurs locally in your browser/device before transmitting metadata.
              </p>
            </div>
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Can I export my vault if I cancel?</h4>
              <p className="text-slate-400">
                Yes, at any time with one click in your settings. You can download an encrypted offline archive and activity report.
              </p>
            </div>
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">When do nominees get access?</h4>
              <p className="text-slate-400">
                Never during normal operations. Access is strictly governed by verified consensus triggers and the multi-step grace period policy you configure.
              </p>
            </div>
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">What happens if a check-in is missed accidentally?</h4>
              <p className="text-slate-400">
                A customizable multi-day grace period initiates, notifying you across multiple secondary channels before any contact alerts are triggered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Questions are part of a secure decision.
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our team is here to help you navigate digital legacy organization with clarity and care.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Message transmitted securely. Our team typically replies within 24 hours.');
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Category</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none">
                  <option>General Continuity Inquiries</option>
                  <option>Security & Cryptographic Model</option>
                  <option>Fiduciary / Professional Counsel</option>
                  <option>Vulnerability Disclosure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
              <textarea
                rows={5}
                required
                placeholder="How can our security and succession team assist you?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
            >
              Send Encrypted Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
