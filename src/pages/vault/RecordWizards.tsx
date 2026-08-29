import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Bitcoin,
  TrendingUp,
  HeartHandshake,
  Cloud,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  FileText,
  Save
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useToast } from '../../context/ToastContext';

// ADD BANK RECORD
export const AddBankRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const [bankName, setBankName] = useState('JPMorgan Chase Bank');
  const [branch, setBranch] = useState('Downtown Metro Branch');
  const [accountType, setAccountType] = useState('Private Checking');
  const [last4, setLast4] = useState('8392');
  const [nomineeStatus, setNomineeStatus] = useState<'Registered' | 'Pending' | 'Not Registered' | 'Uncertain'>('Registered');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      `/review-bank?bank=${encodeURIComponent(bankName)}&branch=${encodeURIComponent(
        branch
      )}&type=${encodeURIComponent(accountType)}&last4=${last4}&nominee=${nomineeStatus}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Stepper */}
      <div className="flex items-center justify-between text-xs font-semibold border-b border-slate-800 pb-4">
        <span className="text-indigo-400">1. INSTITUTION & ACCOUNT</span>
        <span className="text-slate-500">2. NOMINEE STATUS</span>
        <span className="text-slate-500">3. CLAIM GUIDANCE</span>
        <span className="text-slate-500">4. ENCRYPTED REVIEW</span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="font-headline font-extrabold text-2xl text-white">Add Deposit Record</h1>
          <p className="text-xs text-slate-400 mt-1">Enter financial institution details. Full numbers are never stored.</p>
        </div>

        <form onSubmit={handleNext} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Bank Name</label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / City</label>
              <input
                type="text"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Account Type</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option>Private Checking</option>
                <option>High Yield Savings</option>
                <option>Certificate of Deposit (CD)</option>
                <option>Money Market Account</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Last 4 Digits</label>
              <input
                type="text"
                maxLength={4}
                required
                value={last4}
                onChange={(e) => setLast4(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nominee Registration Status</label>
            <select
              value={nomineeStatus}
              onChange={(e) => setNomineeStatus(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="Registered">Registered with Bank</option>
              <option value="Pending">Nominee Update Pending</option>
              <option value="Not Registered">Not Registered</option>
              <option value="Uncertain">Uncertain / Verify</option>
            </select>
          </div>

          {/* Zero knowledge trust banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Zero-Knowledge Encryption: Private keys never touch our servers. Stored in client enclave.</span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <Link to="/vault" className="text-xs font-semibold text-slate-400 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <span>Continue to Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// REVIEW BANK RECORD
export const ReviewBankRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useVault();
  const { showToast } = useToast();

  const handleCommit = async () => {
    await addRecord({
      title: 'JPMorgan Chase Bank (Private Checking)',
      category: 'bank',
      institution: 'JPMorgan Chase Bank',
      accountType: 'Private Checking',
      identifierMasked: '•••• •••• 8392',
      nomineeStatus: 'Registered',
      valueEstimate: '$65,000',
      claimGuidance: 'Contact Downtown Metro branch manager. Present certified death certificate and verified succession case dossier.',
      completionPercent: 100,
      isEncrypted: true,
      visibilityRule: 'post_mortem',
      status: 'verified'
    });
    navigate('/vault');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <Link to="/add-bank" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Edit Form</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-white">Secure Record Review</h1>
            <p className="text-xs text-slate-400 mt-0.5">Verify details before committing to zero-knowledge vault.</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            READY FOR AES-256
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-1">Institution</span>
            <span className="text-white font-bold text-sm">JPMorgan Chase Bank</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-1">Account Masked ID</span>
            <span className="text-white font-mono font-bold text-sm">•••• 8392</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-1">Account Type</span>
            <span className="text-white font-medium">Private Checking</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-1">Nominee Status</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Registered
            </span>
          </div>
        </div>

        <button
          onClick={handleCommit}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          <span>Encrypt and Save to Vault</span>
        </button>
      </div>
    </div>
  );
};

// ADD CRYPTO RECORD
export const AddCryptoRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useVault();
  const [tab, setTab] = useState<'hardware' | 'exchange'>('hardware');
  const [name, setName] = useState('Ledger Nano X - Multi-Sig Vault');
  const [network, setNetwork] = useState('Bitcoin / Ethereum');
  const [publicAddress, setPublicAddress] = useState('0x71C...B991');
  const [safeLocation, setSafeLocation] = useState('Home safe capsule #102');
  const [instructions, setInstructions] = useState('Recovery seed stored in metal capsule in master vault. Never paste raw words.');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRecord({
      title: name,
      category: 'crypto',
      institution: tab === 'hardware' ? 'Self-Custody Hardware' : 'Cryptocurrency Exchange',
      accountType: network,
      identifierMasked: publicAddress,
      nomineeStatus: 'Registered',
      valueEstimate: '2.5 BTC / 18 ETH',
      claimGuidance: `Location: ${safeLocation}. Instructions: ${instructions}`,
      completionPercent: 100,
      isEncrypted: true,
      visibilityRule: 'post_mortem',
      status: 'verified'
    });
    navigate('/vault');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
            <Bitcoin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-white">Add Crypto Record</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Securely document crypto discovery metadata. We store discovery coordinates, NEVER private keys.
            </p>
          </div>
        </div>

        {/* Security Warning Banner */}
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Security Warning:</strong> Never upload a private key or seed phrase to LegacyLock. We only store discovery metadata to help your family find assets.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setTab('hardware')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === 'hardware' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Self-Custody Hardware Wallet
          </button>
          <button
            type="button"
            onClick={() => setTab('exchange')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === 'exchange' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Exchange Account (Coinbase / Binance)
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Wallet / Device Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Network</label>
              <input
                type="text"
                required
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Public Address / Coordinates (Public Only)</label>
            <input
              type="text"
              required
              value={publicAddress}
              onChange={(e) => setPublicAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Physical Hardware Safe Location</label>
            <input
              type="text"
              required
              value={safeLocation}
              onChange={(e) => setSafeLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Recovery Guidance for Heir</label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Link to="/vault" className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Safe Recovery Instructions</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ADD INVESTMENT RECORD
export const AddInvestmentRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useVault();
  const [platform, setPlatform] = useState('Fidelity Investments');
  const [type, setType] = useState('Mutual Fund / Index ETF');
  const [folio, setFolio] = useState('•••• •••• 4491');
  const [guidance, setGuidance] = useState('Submit transfer of asset form to Fidelity Estate Division.');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRecord({
      title: `${platform} (${type})`,
      category: 'investment',
      institution: platform,
      accountType: type,
      identifierMasked: folio,
      nomineeStatus: 'Registered',
      valueEstimate: '$180,000',
      claimGuidance: guidance,
      completionPercent: 100,
      isEncrypted: true,
      visibilityRule: 'post_mortem',
      status: 'verified'
    });
    navigate('/vault');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-white">Secure Investment Record</h1>
            <p className="text-xs text-slate-400 mt-0.5">Catalog your assets to ensure seamless generational transfer.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform / AMC Name</label>
              <input
                type="text"
                required
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Class</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option>Mutual Fund / Index ETF</option>
                <option>Direct Equities / Stocks</option>
                <option>Government Bonds / Fixed Income</option>
                <option>Real Estate Investment Trust (REIT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Folio / Client ID Masked</label>
            <input
              type="text"
              required
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Claim Guidance</label>
            <textarea
              rows={3}
              value={guidance}
              onChange={(e) => setGuidance(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Link to="/vault" className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Securely</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ADD INSURANCE RECORD
export const AddInsuranceRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useVault();
  const [insurer, setInsurer] = useState('Prudential Life');
  const [policyType, setPolicyType] = useState('Term Life ($2.0M)');
  const [policyNo, setPolicyNo] = useState('POL-••••-7718');
  const [agentContact, setAgentContact] = useState('Marcus Thorne: +1-800-999-1122');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRecord({
      title: `${insurer} Policy (${policyType})`,
      category: 'insurance',
      institution: insurer,
      accountType: policyType,
      identifierMasked: policyNo,
      nomineeStatus: 'Registered',
      valueEstimate: '$2,000,000 Benefit',
      claimGuidance: `Agent: ${agentContact}. Original death certificate required.`,
      completionPercent: 100,
      isEncrypted: true,
      visibilityRule: 'post_mortem',
      status: 'verified'
    });
    navigate('/vault');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-white">Secure Insurance Record</h1>
            <p className="text-xs text-slate-400 mt-0.5">Policy details & claim agent contact coordinates.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Insurer Name</label>
              <input
                type="text"
                required
                value={insurer}
                onChange={(e) => setInsurer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Policy Type</label>
              <input
                type="text"
                required
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Policy Number Masked</label>
            <input
              type="text"
              required
              value={policyNo}
              onChange={(e) => setPolicyNo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Agent Contact Details</label>
            <input
              type="text"
              required
              value={agentContact}
              onChange={(e) => setAgentContact(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Link to="/vault" className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Secure Insurance Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ADD DIGITAL LEGACY RECORD
export const AddDigitalLegacyPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useVault();
  const [provider, setProvider] = useState('Apple iCloud & Legacy Contact');
  const [contactName, setContactName] = useState('Robert Vance');
  const [instructions, setInstructions] = useState('Legacy Contact key printed in safe box. Grants access to photo archives and notes.');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRecord({
      title: provider,
      category: 'digital',
      institution: 'Apple Inc.',
      accountType: 'iCloud & Media Vault',
      identifierMasked: 'appleid••••@icloud.com',
      nomineeStatus: 'Registered',
      assignedNomineeName: contactName,
      claimGuidance: instructions,
      completionPercent: 100,
      isEncrypted: true,
      visibilityRule: 'metadata_visible',
      status: 'verified'
    });
    navigate('/vault');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-600/20 text-sky-400 flex items-center justify-center">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-white">Add Digital Legacy</h1>
            <p className="text-xs text-slate-400 mt-0.5">Secure instructions for Apple, Google, or Microsoft cloud assets.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Provider Service</label>
            <input
              type="text"
              required
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Designated Legacy Contact</label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Roadmap & Instructions</label>
            <textarea
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Link to="/vault" className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Digital Legacy Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
