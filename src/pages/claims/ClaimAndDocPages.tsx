import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Download,
  Upload,
  Building2,
  Lock,
  Eye,
  Check,
  Key,
  Shield,
  Layers,
  FileCheck
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useToast } from '../../context/ToastContext';
import { SecureUploadZone } from '../../components/common/SecureUploadZone';

// CLAIM INITIATION SCREEN
export const ClaimInitiationPage: React.FC = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-white">Initiate Estate Continuity Claim</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-sig consensus verification protocol for beneficiary heirs.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
            Regulatory-Aligned Compliance Framework
          </h4>
          <p>
            Initiating a claim activates the consensus protocol. Two independent co-executors/trustees must verify the claim documents. LegacyLock does not automate financial transfers; it provides certified dossiers for institutional probate submission.
          </p>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 bg-slate-900"
          />
          <span className="text-xs text-slate-300 leading-relaxed">
            I certify that I am the designated legal beneficiary or executor, and wish to proceed with consensus document verification.
          </span>
        </label>

        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <Link to="/nominee-claim-dashboard" className="text-xs font-semibold text-slate-400 hover:text-white">
            Cancel
          </Link>
          <button
            disabled={!agreed}
            onClick={() => navigate('/claim-verification-upload')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <span>Proceed to Document Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// CLAIM VERIFICATION UPLOAD SCREEN
export const ClaimVerificationUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      <Link to="/claim-initiation" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Upload Statutory Verification Proof</h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload certified vital statistics or legal authorization for multi-trustee consensus.
          </p>
        </div>

        <SecureUploadZone
          category="Statutory Verification Proof"
          onUploadComplete={() => setUploaded(true)}
        />

        {uploaded && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Certified_Vital_Record.pdf uploaded & encrypted</span>
            </div>
            <button
              onClick={() => {
                showToast({ type: 'success', title: 'Claim Submitted', message: 'Consensus review initiated.' });
                navigate('/claim-status');
              }}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Submit for Consensus Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// CLAIM PREPARATION DOSSIER PREVIEW SCREEN
export const ClaimDossierPreviewPage: React.FC = () => {
  const { records } = useVault();

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Claim Preparation Dossier
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Standardized institutional packet prepared for statutory probate and banking division submission.
          </p>
        </div>
        <button
          onClick={() => alert('Encrypted dossier downloaded.')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Encrypted PDF Dossier</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl">
        {/* Header Metadata */}
        <div className="border-b border-slate-800 pb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Estate Owner</span>
            <span className="font-bold text-white">Eleanor Vance</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Designated Heir</span>
            <span className="font-bold text-white">Robert Vance (Son)</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Consensus Status</span>
            <span className="font-bold text-emerald-400">Multi-Sig Verified (2/2)</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Generated Date</span>
            <span className="font-mono text-white">August 28, 2026</span>
          </div>
        </div>

        {/* Catalog of Assets */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-base text-white">Itemized Estate Catalog</h3>
          <div className="space-y-3">
            {records.map((r, idx) => (
              <div key={r.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-indigo-400 font-bold">0{idx + 1}.</span>
                    <span className="font-bold text-white text-sm">{r.title}</span>
                  </div>
                  <span className="text-slate-400 font-mono">{r.valueEstimate || '$0.00'}</span>
                </div>
                <div className="text-slate-400 grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-900">
                  <div>Institution: <strong className="text-slate-200">{r.institution}</strong></div>
                  <div>Account Masked: <strong className="text-slate-200">{r.identifierMasked}</strong></div>
                </div>
                <div className="text-slate-300 text-[11px] bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                  <strong className="text-indigo-400">Claim Guidance:</strong> {r.claimGuidance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// CLAIM CHECKLIST GUIDE
export const ClaimChecklistPage: React.FC = () => {
  const [steps, setSteps] = useState([
    { title: 'Obtain 5 Certified Vital Death Certificates', done: true },
    { title: 'Submit Claim Packet to JPMorgan Chase Estate Division', done: false },
    { title: 'Present Power of Attorney / Revocable Trust to Brokerage', done: false },
    { title: 'File Life Insurance Claim with Policy #POL-••••-7718', done: false },
    { title: 'Access Offline Metal Capsule for Hardware Keys', done: false }
  ]);

  const toggle = (idx: number) => {
    const next = [...steps];
    next[idx].done = !next[idx].done;
    setSteps(next);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
          Step-by-Step Heir Claim Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Interactive checklist guiding your family through each institutional claim step without confusion.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-2xl">
        {steps.map((s, idx) => (
          <button
            key={s.title}
            onClick={() => toggle(idx)}
            className={`w-full p-4 rounded-2xl border flex items-center gap-4 text-left transition-all ${
              s.done ? 'bg-slate-950/40 border-slate-800 opacity-60' : 'bg-slate-950 border-slate-800 hover:border-indigo-500'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                s.done ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700'
              }`}
            >
              {s.done && <Check className="w-4 h-4" />}
            </div>
            <span className={`text-xs font-semibold ${s.done ? 'line-through text-slate-400' : 'text-white'}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// CLAIM STATUS TRACKING SCREEN
export const ClaimStatusTrackingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
          Continuity Claim Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Real-time tracking of multi-sig verification and dossier release.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Case Number</span>
            <span className="font-mono font-bold text-white text-lg">CLM-2026-8941</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Consensus Verified (2 of 2 Approvals)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white">Co-Executor Verification</h4>
            <p className="text-slate-400">Robert Sterling (Attorney): <strong className="text-emerald-400">Signed & Approved</strong></p>
            <p className="text-slate-400">Dr. Aris Thorne (Fiduciary): <strong className="text-emerald-400">Signed & Approved</strong></p>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white">Dossier Release</h4>
            <p className="text-slate-400">Status: <strong className="text-white">Full Access Granted</strong></p>
            <Link to="/claim-dossier-preview" className="text-indigo-400 hover:underline font-semibold block mt-1">
              Open Full Claim Dossier →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// CONTROLLED MULTI-SIG RELEASE SCREEN
export const ControlledReleaseMultiSigPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
          Multi-Sig Consensus Release Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Cryptographic release rules enforcing multi-party authorization before any estate disclosure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-white">Consensus Policy</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Required Signers:</span>
              <span className="font-bold text-white">2 of 3 Trustees</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Challenge Window:</span>
              <span className="font-bold text-white">72 Hours Reversible</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Encryption Method:</span>
              <span className="font-mono text-indigo-400">Shamir's Secret Sharing (2/3)</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-white">Current Signatures</h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-emerald-500/20">
              <span className="text-slate-300">Robert Vance (Heir)</span>
              <span className="text-emerald-400 font-bold">Signed (0x918...A2)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-emerald-500/20">
              <span className="text-slate-300">Robert Sterling (Executor)</span>
              <span className="text-emerald-400 font-bold">Signed (0x44B...1C)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SECURE DOCUMENT VAULT
export const DocumentVaultPage: React.FC = () => {
  const { records, attachDocumentToRecord } = useVault();
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
            Secure Document Storage
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Client-encrypted PDF, scan, and legal deed archives.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Encrypted File</span>
        </button>
      </div>

      {showUpload && (
        <div className="p-6 bg-slate-900 rounded-3xl border border-indigo-500/30">
          <SecureUploadZone
            category="Master Document Archive"
            onUploadComplete={(doc) => {
              attachDocumentToRecord(records[0]?.id || 'vlt-001', doc);
              setShowUpload(false);
            }}
          />
        </div>
      )}

      {/* Documents List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-2xl">
        <h3 className="font-headline font-bold text-base text-white mb-2">Stored Documents (AES-256)</h3>
        {records.flatMap((r) => r.attachedDocuments || []).map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">{doc.name}</p>
                <p className="text-[11px] text-slate-400">{doc.size} • Uploaded {doc.uploadDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/20">
                AES-256 Sealed
              </span>
              <button
                onClick={() => alert(`Downloading encrypted file: ${doc.name}`)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
