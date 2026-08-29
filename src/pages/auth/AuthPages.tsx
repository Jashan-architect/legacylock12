import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Lock,
  Key,
  Shield,
  Eye,
  EyeOff,
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// SIGN IN PAGE
export const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('eleanor.vance@legacylock.vault');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [roleSelection, setRoleSelection] = useState<'owner' | 'nominee' | 'executor'>('owner');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, roleSelection);
    if (roleSelection === 'nominee') {
      navigate('/nominee-claim-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
          <Lock className="w-3 h-3" />
          <span>Encrypted Session</span>
        </div>

        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Access Vault</h1>
          <p className="text-xs text-slate-400 mt-1">Authenticate to decrypt and manage your digital estate.</p>
        </div>

        {/* Persona quick select */}
        <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1">
          <button
            type="button"
            onClick={() => {
              setRoleSelection('owner');
              setEmail('eleanor.vance@legacylock.vault');
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              roleSelection === 'owner' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Owner
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleSelection('nominee');
              setEmail('robert.vance@familygroup.org');
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              roleSelection === 'nominee' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Nominee (Heir)
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleSelection('executor');
              setEmail('robert.sterling@sterlinglaw.com');
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              roleSelection === 'executor' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Executor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">Master Password</label>
              <Link to="/confirm-identity" className="text-xs text-indigo-400 hover:underline">
                Forgot access?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:border-indigo-500 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Securely</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
          <Link
            to="/confirm-identity"
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Fingerprint className="w-4 h-4 text-indigo-400" />
            <span>Sign in with Passkey / Hardware Key</span>
          </Link>
          <div className="text-center text-xs text-slate-400 pt-1">
            New to LegacyLock?{' '}
            <Link to="/create-account" className="text-indigo-400 hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// CREATE ACCOUNT PAGE
export const CreateAccountPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, 'owner');
    navigate('/what-to-secure');
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Create your account</h1>
          <p className="text-xs text-slate-400 mt-1">Begin organizing your encrypted digital estate.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              placeholder="Eleanor Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="eleanor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Master Password</label>
            <input
              type="password"
              required
              placeholder="At least 12 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none font-mono"
            />
            <div className="flex gap-1 mt-2">
              <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
              <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
              <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
              <div className="h-1 flex-1 bg-slate-700 rounded-full" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Create Secure Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-indigo-400 hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

// CONFIRM IDENTITY (MFA) PAGE
export const ConfirmIdentityPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [code, setCode] = useState(['4', '8', '2', '', '', '']);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Identity Verified',
      message: 'New hardware device authorized for this session.'
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Confirm it's you</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            We detected a sign-in attempt from a new device. Please verify via your authenticator code or passkey.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={code[index]}
                onChange={(e) => {
                  const next = [...code];
                  next[index] = e.target.value;
                  setCode(next);
                }}
                className="w-12 h-14 bg-slate-950 border border-slate-800 rounded-xl text-center font-mono font-bold text-xl text-white focus:border-indigo-500 focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
          >
            Verify & Unlock Vault
          </button>
        </form>

        <div className="text-xs text-slate-400">
          Didn't receive code?{' '}
          <button onClick={() => alert('Code resent')} className="text-indigo-400 hover:underline font-semibold">
            Resend in 30s
          </button>
        </div>
      </div>
    </div>
  );
};
