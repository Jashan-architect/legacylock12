import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Key,
  Shield,
  FileText,
  Lock,
  Download,
  Building2,
  Check
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useToast } from '../../context/ToastContext';

// TRUSTEES DIRECTORY SCREEN
export const TrusteesDirectoryPage: React.FC = () => {
  const { trustees, updateTrusteeStatus } = useVault();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Trustees & Designated Nominees
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage authorized heirs, legal executors, and emergency contacts under multi-sig consensus.
          </p>
        </div>
        <Link
          to="/invite-trustee"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Trusted Contact</span>
        </Link>
      </div>

      {/* Trustees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trustees.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-sm">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-white">{t.name}</h3>
                    <span className="text-xs text-indigo-400 font-medium">{t.relationship}</span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    t.status === 'verified'
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {t.status === 'verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  <span className="capitalize">{t.status}</span>
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.phone}</span>
                </div>
              </div>

              {/* Roles Badge & Allocated Records */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                <span className="text-slate-400 font-medium">Role: <strong className="text-white capitalize">{t.role}</strong></span>
                <span className="text-slate-400">Allocated Records: <strong className="text-indigo-400">{t.allocatedAssetsCount}</strong></span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <Link
                to={`/trustee-details?id=${t.id}`}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
              >
                <span>Manage Permissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => {
                  if (window.confirm(`Revoke trustee authorization for ${t.name}?`)) {
                    updateTrusteeStatus(t.id, 'revoked');
                  }
                }}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
              >
                Revoke Access
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// INVITE TRUSTEE SCREEN
export const InviteTrusteePage: React.FC = () => {
  const navigate = useNavigate();
  const { addTrustee } = useVault();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Immediate Family (Son)');
  const [role, setRole] = useState<'nominee' | 'executor' | 'emergency_contact'>('nominee');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTrustee({
      name,
      email,
      phone,
      relationship,
      role: role === 'executor' ? 'Executor' : role === 'emergency_contact' ? 'Trusted Contact' : 'Nominee',
      allocatedAssetsCount: 2,
      permissionTemplate: 'standard'
    });
    navigate('/trustees');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <Link to="/trustees" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Trustees Directory</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Invite Trusted Contact</h1>
          <p className="text-xs text-slate-400 mt-1">
            Designate an heir or executor who can participate in verified consensus release.
          </p>
        </div>

        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Robert Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="robert@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (SMS)</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Relationship</label>
              <input
                type="text"
                required
                placeholder="Son / Daughter / Spouse"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="nominee">Nominee / Beneficiary</option>
                <option value="executor">Legal Co-Executor</option>
                <option value="emergency_contact">Emergency Contact Only</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-3">
            <Shield className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>They will receive an encrypted invitation link to verify their contact credentials.</span>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Link to="/trustees" className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <span>Send Encrypted Invitation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// TRUSTEE DETAILS SCREEN
export const TrusteeDetailsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || 'tru-001';
  const { trustees, records } = useVault();
  const trustee = trustees.find((t) => t.id === id) || trustees[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <Link to="/trustees" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Trustees</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              {trustee?.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h1 className="font-headline font-extrabold text-2xl text-white">{trustee?.name}</h1>
              <p className="text-xs text-slate-400">{trustee?.relationship} • {trustee?.email}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/20">
            {trustee?.status}
          </span>
        </div>

        <div>
          <h3 className="font-headline font-bold text-base text-white mb-3">Allocated Estate Vault Records</h3>
          <div className="space-y-2.5">
            {records.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <div>
                    <p className="font-bold text-white">{r.title}</p>
                    <p className="text-[11px] text-slate-400">{r.institution}</p>
                  </div>
                </div>
                <span className="text-indigo-400 font-mono font-semibold">Post-Mortem Locked</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// NOMINEE CLAIM DASHBOARD (Heir Portal)
export const NomineeClaimDashboardPage: React.FC = () => {
  const { records } = useVault();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Heir Portal Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Beneficiary Heir Portal</span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Estate Continuity Claim Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Welcome, Robert Vance. You have been designated as primary beneficiary for the estate of Eleanor Vance.
          </p>
        </div>

        <Link
          to="/claim-initiation"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all shrink-0"
        >
          <span>Initiate Verified Claim Flow</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Allocated Assets for Heir */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="font-headline font-bold text-xl text-white">Designated Asset Portfolios</h2>
            <p className="text-xs text-slate-400">
              Institutional dossiers prepared for your statutory claim submission.
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            3 Ready for Claim
          </span>
        </div>

        <div className="space-y-3">
          {records.slice(0, 3).map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-white">{rec.title}</h4>
                  <p className="text-xs text-slate-400">{rec.institution} • Masked ID: {rec.identifierMasked}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/claim-dossier-preview`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  View Prepared Dossier
                </Link>
                <Link
                  to="/claim-checklist"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                >
                  Step-by-Step Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
