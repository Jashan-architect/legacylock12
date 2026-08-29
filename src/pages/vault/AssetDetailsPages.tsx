import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Lock,
  Building2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck,
  Shield,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Download,
  Share2,
  ExternalLink,
  Plus,
  Check
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useToast } from '../../context/ToastContext';
import { SecureUploadZone } from '../../components/common/SecureUploadZone';

export const AssetDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || 'vlt-001';
  const { getRecordById, deleteRecord, attachDocumentToRecord } = useVault();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const record = getRecordById(id) || getRecordById('vlt-001');
  const [unmasked, setUnmasked] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  if (!record) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Asset Record Not Found.</p>
        <Link to="/vault" className="text-indigo-400 hover:underline mt-2 inline-block">
          Return to Vault
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm(`Permanently delete "${record.title}"? This cannot be undone.`)) {
      await deleteRecord(record.id);
      navigate('/vault');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <Link
          to="/vault"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Vault Overview</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to={`/edit-asset?id=${record.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Record</span>
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Cryptographically Shred</span>
          </button>
        </div>
      </div>

      {/* Main Asset Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {record.institution}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">{record.accountType}</span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-white mt-0.5">
              {record.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">
              Estimated Value
            </span>
            <span className="font-mono font-bold text-xl text-white">
              {record.valueEstimate || '$0.00'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/30 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{record.nomineeStatus}</span>
          </span>
        </div>
      </div>

      {/* Bento Grid: Account Credentials, Guidance, & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Account Details & Instructions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Account Credentials */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-headline font-bold text-base text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Encrypted Account Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Account Identifier</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-white">
                    {unmasked ? record.identifierMasked.replace(/•/g, '7') : record.identifierMasked}
                  </span>
                  <button
                    onClick={() => setUnmasked(!unmasked)}
                    className="text-slate-400 hover:text-indigo-400 p-1"
                  >
                    {unmasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Statement Location</span>
                <p className="text-sm text-white truncate">
                  {record.statementLocation || 'Digital Portal'}
                </p>
              </div>
            </div>

            {/* Claim Guidance Instructions */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Succession & Claim Instructions for Family</span>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {record.claimGuidance}
              </div>
            </div>
          </div>

          {/* Attached Documents Vault */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-base text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Supporting Encrypted Documents</span>
              </h3>
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>

            {showUpload && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-500/30">
                <SecureUploadZone
                  category="Attached Asset Record"
                  onUploadComplete={(doc) => {
                    attachDocumentToRecord(record.id, doc);
                    setShowUpload(false);
                  }}
                />
              </div>
            )}

            <div className="space-y-2.5">
              {record.attachedDocuments && record.attachedDocuments.length > 0 ? (
                record.attachedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{doc.name}</p>
                        <p className="text-[11px] text-slate-400">{doc.size} • Uploaded {doc.uploadDate}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full text-[10px] font-semibold border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> AES-256 Encrypted
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">No documents currently attached.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Nominee & Access Protocols */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-5">
            <h3 className="font-headline font-bold text-base text-white">Nominee Allocation</h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center">
                  RV
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">
                    {record.assignedNomineeName || 'Robert Vance'}
                  </h4>
                  <p className="text-[11px] text-slate-400">Primary Heir (Son)</p>
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 shrink-0" />
                <span>Heir Verified under consensus rule</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Release Trigger</span>
                <span className="text-white font-medium">Verified Consensus Protocol</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Visibility Mode</span>
                <span className="text-indigo-400 font-medium">Post-Mortem Locked</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Reviewed</span>
                <span className="text-white font-medium">{record.updatedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditAssetRecordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || 'vlt-001';
  const { getRecordById, updateRecord } = useVault();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const record = getRecordById(id) || getRecordById('vlt-001');

  const [title, setTitle] = useState(record?.title || '');
  const [institution, setInstitution] = useState(record?.institution || '');
  const [nomineeStatus, setNomineeStatus] = useState(record?.nomineeStatus || 'Registered');
  const [claimGuidance, setClaimGuidance] = useState(record?.claimGuidance || '');
  const [visibilityRule, setVisibilityRule] = useState<'post_mortem' | 'metadata_visible' | 'immediate'>(
    record?.visibilityRule || 'post_mortem'
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;
    await updateRecord(record.id, {
      title,
      institution,
      nomineeStatus: nomineeStatus as any,
      claimGuidance,
      visibilityRule
    });
    navigate(`/asset-details?id=${record.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <Link
        to={`/asset-details?id=${id}`}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel & Return</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Edit Asset Record</h1>
          <p className="text-xs text-slate-400 mt-1">Update zero-knowledge metadata, instructions, and visibility rules.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Name</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Institution</label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nominee Registration Status</label>
              <select
                value={nomineeStatus}
                onChange={(e) => setNomineeStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Registered">Registered</option>
                <option value="Pending">Pending</option>
                <option value="Not Registered">Not Registered</option>
                <option value="Uncertain">Uncertain / Verify</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Claim Instructions for Family</label>
            <textarea
              rows={4}
              value={claimGuidance}
              onChange={(e) => setClaimGuidance(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* Visibility Rules Selection */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-slate-300">Visibility & Release Rules</label>
            <div className="space-y-2">
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  visibilityRule === 'post_mortem'
                    ? 'bg-indigo-950/30 border-indigo-500'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  checked={visibilityRule === 'post_mortem'}
                  onChange={() => setVisibilityRule('post_mortem')}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="font-bold text-xs text-white block">Post-Mortem Release Only</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Completely hidden from nominee until consensus triggers are validated.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  visibilityRule === 'metadata_visible'
                    ? 'bg-indigo-950/30 border-indigo-500'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  checked={visibilityRule === 'metadata_visible'}
                  onChange={() => setVisibilityRule('metadata_visible')}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="font-bold text-xs text-white block">Metadata Visible Now</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Nominee can see asset existence, but documents and instructions remain locked.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Link
              to={`/asset-details?id=${id}`}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
