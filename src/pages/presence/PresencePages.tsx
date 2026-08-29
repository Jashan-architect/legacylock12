import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Heart,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  Settings,
  Mail,
  Smartphone,
  PhoneCall,
  ArrowRight,
  Shield,
  RefreshCw,
  Sliders,
  Calendar,
  Layers,
  Bell
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useToast } from '../../context/ToastContext';
import { CheckInButton } from '../../components/common/CheckInButton';

// CHECK-IN PROMPT SCREEN (User lands here from email/sms heartbeat reminder)
export const CheckInPromptPage: React.FC = () => {
  const { checkInState } = useVault();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
          <Heart className="w-10 h-10 fill-emerald-500/20" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
            <span>Scheduled Heartbeat Cycle</span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Confirm your presence
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
            A single tap confirms you are active and resets your {checkInState.frequencyDays || 30}-day continuity countdown timer.
          </p>
        </div>

        {/* 4-State Interactive Checkin Component */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
          <CheckInButton
            size="lg"
            className="w-full"
            onSuccess={() => navigate('/check-in-confirmed')}
          />
          <p className="text-[11px] text-slate-400">
            Last recorded pulse: <span className="text-slate-300 font-mono">{checkInState.lastCheckInDate}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left text-xs text-slate-400">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Next Scheduled Cycle</span>
            <span className="text-white font-semibold">{checkInState.nextCheckInDate || 'Sep 27, 2026'}</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Escalation Grace Period</span>
            <span className="text-emerald-400 font-semibold">{checkInState.gracePeriodDays} Days Active</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-center gap-4 text-xs">
          <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
            Go to Vault Dashboard
          </Link>
          <span className="text-slate-700">•</span>
          <Link to="/check-in-config" className="text-indigo-400 hover:underline">
            Configure Heartbeat
          </Link>
        </div>
      </div>
    </div>
  );
};

// CHECK-IN CONFIRMED CELEBRATION SCREEN
export const CheckInConfirmedPage: React.FC = () => {
  const { checkInState } = useVault();

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto"
        >
          <ShieldCheck className="w-8 h-8" />
        </motion.div>

        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Check-in confirmed</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
            Your presence has been recorded and cryptographically sealed. Next check-in due on{' '}
            <strong className="text-white">{checkInState.nextCheckInDate || 'Sep 27, 2026'}</strong>.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-left">
          <div className="flex justify-between">
            <span className="text-slate-400">Consecutive Streak:</span>
            <span className="font-bold text-emerald-400">{checkInState.streakDays || 180} Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Active Trustees Informed:</span>
            <span className="text-white">0 (Quiet Mode)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Proof Hash:</span>
            <span className="font-mono text-[11px] text-indigo-400">0x9F41...B2A0</span>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all block"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

// CHECK-IN CONFIGURATION SCREEN
export const CheckInConfigPage: React.FC = () => {
  const { checkInState, updateCheckInConfig } = useVault();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [frequency, setFrequency] = useState(checkInState.frequencyDays || 30);
  const [gracePeriod, setGracePeriod] = useState(checkInState.gracePeriodDays || 14);
  const [channels, setChannels] = useState(checkInState.channels || ['Email', 'SMS', 'In-App']);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCheckInConfig({
      frequencyDays: Number(frequency),
      gracePeriodDays: Number(gracePeriod),
      channels
    });
    navigate('/dashboard');
  };

  const toggleChannel = (ch: string) => {
    setChannels((prev) => (prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Heartbeat Pulse Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Customize cadence, escalation threshold, and multi-channel delivery rules.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 fill-emerald-500/20" />
          <span>Active Pulse Protocol</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Frequency & Cadence */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-headline font-bold text-base text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Check-in Cadence Interval</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              { label: 'Weekly', days: 7, desc: 'Highest frequency' },
              { label: 'Monthly', days: 30, desc: 'Recommended standard' },
              { label: 'Quarterly', days: 90, desc: 'Minimal check-ins' },
              { label: 'Bi-Annual', days: 180, desc: 'Low interaction' }
            ].map((opt) => (
              <button
                key={opt.days}
                type="button"
                onClick={() => setFrequency(opt.days)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  frequency === opt.days
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-headline font-bold text-sm text-white">{opt.label}</div>
                <div className="font-mono text-xs text-indigo-400 mt-0.5">{opt.days} Days</div>
                <div className="text-[10px] text-slate-400 mt-2">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Grace Period & Escalation Window */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-headline font-bold text-base text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Grace Period & Warning Phase</span>
          </h3>
          <p className="text-xs text-slate-400">
            If you do not respond to a scheduled check-in, LegacyLock enters this silent grace period, sending redundant reminders across all channels before notifying your designated trustees.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[7, 14, 30].map((days) => (
              <label
                key={days}
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  gracePeriod === days
                    ? 'bg-emerald-950/40 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="grace"
                  checked={gracePeriod === days}
                  onChange={() => setGracePeriod(days)}
                  className="text-emerald-500 focus:ring-emerald-400"
                />
                <div>
                  <span className="font-bold text-xs text-white block">{days} Days Grace Period</span>
                  <span className="text-[10px] text-slate-400 block">3 reminder retries sent</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Multi-Channel Alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-headline font-bold text-base text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Multi-Channel Notification Redundancy</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Email', icon: Mail, desc: 'Primary encrypted email' },
              { name: 'SMS', icon: Smartphone, desc: 'SMS text message prompt' },
              { name: 'In-App', icon: Bell, desc: 'Dashboard & push alert' }
            ].map((ch) => {
              const Icon = ch.icon;
              const active = channels.includes(ch.name);
              return (
                <button
                  key={ch.name}
                  type="button"
                  onClick={() => toggleChannel(ch.name)}
                  className={`p-4 rounded-2xl border flex items-center gap-3 text-left transition-all ${
                    active
                      ? 'bg-slate-950 border-indigo-500 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${active ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">{ch.name}</h4>
                    <p className="text-[10px] text-slate-400">{ch.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link to="/dashboard" className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

// CHECK-IN HISTORY SCREEN
export const CheckInHistoryPage: React.FC = () => {
  const { checkInLogs } = useVault();

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Presence Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete cryptographic history of all presence pulses, verification methods, and response latencies.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">Status: 100% Verified</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 px-3">Timestamp</th>
                <th className="pb-3 px-3">Channel</th>
                <th className="pb-3 px-3">Device / Enclave</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Latency</th>
                <th className="pb-3 px-3">Cryptographic Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {checkInLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/40 transition-colors">
                  <td className="py-4 px-3 text-white font-mono text-[11px]">{log.timestamp}</td>
                  <td className="py-4 px-3 font-semibold text-slate-200">{log.channel}</td>
                  <td className="py-4 px-3 text-slate-400">{log.device}</td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-slate-400 font-mono">{log.location}</td>
                  <td className="py-4 px-3 font-mono text-indigo-400 text-[10px]">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ESCALATION PROTOCOL CENTER
export const EscalationCenterPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
          Continuity & Escalation Protocols
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review the step-by-step verification pipeline that triggers when check-ins are unresponsive.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex gap-5 items-start">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold shrink-0">
            01
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-headline font-bold text-white text-sm">Primary Heartbeat Request</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard automated pulse ping sent across email and SMS. User has standard window (e.g. 7 days) to click a single secure confirmation link.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex gap-5 items-start">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-mono font-bold shrink-0">
            02
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-headline font-bold text-white text-sm">Grace Period Escalation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If initial pulse is unanswered, an intensified grace period initiates. Redundant push notifications and alternate emergency backup numbers are pinged.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex gap-5 items-start">
          <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center font-mono font-bold shrink-0">
            03
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-headline font-bold text-white text-sm">Designated Trustee Multi-Sig Consensus</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designated co-executors receive notice to verify status. Consensus requires at least 2 independent trustees to submit verification proofs.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 flex gap-5 items-start bg-gradient-to-r from-emerald-950/20 to-slate-900">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-mono font-bold shrink-0">
            04
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-headline font-bold text-white text-sm">Controlled Dossier Release</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nominees unlock customized claim dossiers and instructions, enabling structured submission to institutional probate and asset divisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// MISSED CHECK-IN WARNING PAGE
export const MissedCheckInWarningPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-bounce">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-500/30">
            Grace Period Warning Level 1
          </span>
          <h1 className="font-headline font-extrabold text-2xl text-white mt-3">
            Missed Heartbeat Detected
          </h1>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Your scheduled 30-day pulse was not recorded. You have <strong className="text-amber-300">11 days remaining</strong> in your grace period before secondary emergency contacts are pinged.
          </p>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-2">
          <CheckInButton
            size="lg"
            className="w-full"
            onSuccess={() => navigate('/check-in-confirmed')}
          />
        </div>

        <Link
          to="/dashboard"
          className="text-xs text-slate-400 hover:text-white transition-colors block"
        >
          Dismiss & View Dashboard
        </Link>
      </div>
    </div>
  );
};
