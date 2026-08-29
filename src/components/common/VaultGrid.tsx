import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Lock,
  Eye,
  EyeOff,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  Shield,
  Building2,
  TrendingUp,
  Bitcoin,
  HeartHandshake,
  Cloud,
  Scale,
  Home,
  FileHeart,
  CheckCircle2,
  AlertCircle,
  X,
  Check
} from 'lucide-react';
import { VaultRecord, AssetCategory } from '../../types';
import { useVault } from '../../context/VaultContext';
import { useToast } from '../../context/ToastContext';

interface VaultGridProps {
  initialCategory?: string;
  onRecordSelect?: (record: VaultRecord) => void;
  showAddButton?: boolean;
}

export const VaultGrid: React.FC<VaultGridProps> = ({
  initialCategory = 'all',
  onRecordSelect,
  showAddButton = true
}) => {
  const { records, deleteRecord, addRecord, updateRecord } = useVault();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [unmaskedIds, setUnmaskedIds] = useState<Record<string, boolean>>({});
  const [editingRecord, setEditingRecord] = useState<VaultRecord | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState<boolean>(false);

  // New Record Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<AssetCategory>('bank');
  const [newInstitution, setNewInstitution] = useState('');
  const [newAccountType, setNewAccountType] = useState('Checking / Savings');
  const [newIdentifier, setNewIdentifier] = useState('');
  const [newNomineeStatus, setNewNomineeStatus] = useState<'Registered' | 'Pending' | 'Not Registered' | 'Uncertain'>('Registered');
  const [newValueEstimate, setNewValueEstimate] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  const categories = [
    { id: 'all', label: 'All Assets', icon: Shield },
    { id: 'bank', label: 'Bank & Deposits', icon: Building2 },
    { id: 'investment', label: 'Investments', icon: TrendingUp },
    { id: 'crypto', label: 'Crypto & Discovery', icon: Bitcoin },
    { id: 'insurance', label: 'Insurance', icon: HeartHandshake },
    { id: 'digital', label: 'Digital Legacy', icon: Cloud },
    { id: 'legal', label: 'Legal & Wills', icon: Scale },
    { id: 'property', label: 'Property & Deeds', icon: Home },
    { id: 'personal', label: 'Personal Directives', icon: FileHeart }
  ];

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.accountType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.identifierMasked.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [records, selectedCategory, searchQuery]);

  const toggleUnmask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUnmaskedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to permanently cryptographically shred "${title}"?`)) {
      await deleteRecord(id);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newInstitution.trim()) {
      showToast({
        type: 'warning',
        title: 'Missing Required Fields',
        message: 'Please provide an asset title and institution.'
      });
      return;
    }

    const masked = newIdentifier
      ? `•••• •••• ${newIdentifier.slice(-4)}`
      : '•••• •••• 9921';

    await addRecord({
      title: newTitle,
      category: newCategory,
      institution: newInstitution,
      accountType: newAccountType,
      identifierMasked: masked,
      nomineeStatus: newNomineeStatus,
      valueEstimate: newValueEstimate || '$0',
      claimGuidance: newInstructions || 'Follow institution standard claim verification with estate dossier.',
      completionPercent: 100,
      isEncrypted: true,
      visibilityRule: 'post_mortem',
      status: 'verified'
    });

    // Reset Form
    setNewTitle('');
    setNewInstitution('');
    setNewIdentifier('');
    setNewValueEstimate('');
    setNewInstructions('');
    setIsAddingRecord(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;

    await updateRecord(editingRecord.id, {
      title: editingRecord.title,
      institution: editingRecord.institution,
      accountType: editingRecord.accountType,
      valueEstimate: editingRecord.valueEstimate,
      nomineeStatus: editingRecord.nomineeStatus,
      claimGuidance: editingRecord.claimGuidance
    });

    setEditingRecord(null);
  };

  const getCategoryIcon = (category: AssetCategory) => {
    switch (category) {
      case 'bank':
        return <Building2 className="w-5 h-5 text-indigo-400" />;
      case 'investment':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'crypto':
        return <Bitcoin className="w-5 h-5 text-amber-400" />;
      case 'insurance':
        return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      case 'digital':
        return <Cloud className="w-5 h-5 text-sky-400" />;
      case 'legal':
        return <Scale className="w-5 h-5 text-purple-400" />;
      case 'property':
        return <Home className="w-5 h-5 text-teal-400" />;
      case 'personal':
      default:
        return <FileHeart className="w-5 h-5 text-pink-400" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets by title, institution, or masked ID..."
            className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showAddButton && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingRecord(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-lg shadow-[#D4AF37]/15 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Record</span>
            </button>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 border border-[#D4AF37]'
                  : 'bg-[#0F0F0F] text-gray-400 hover:text-white hover:bg-[#151515] border border-[#1F1F1F]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-black' : 'text-gray-400'}`} />
              <span className="shrink-0">{cat.label}</span>
              {cat.id !== 'all' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded shrink-0 ${
                    isSelected ? 'bg-black/20 text-black font-mono font-bold' : 'bg-[#1F1F1F] text-gray-400 font-mono'
                  }`}
                >
                  {records.filter((r) => r.category === cat.id).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredRecords.map((record) => {
            const isUnmasked = unmaskedIds[record.id];
            return (
              <motion.div
                key={record.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onRecordSelect && onRecordSelect(record)}
                className="group relative bg-[#0A0A0A] hover:bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#2A2A2A] rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl cursor-pointer"
              >
                {/* Top Header */}
                <div>
                  <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#151515] border border-[#2A2A2A] flex items-center justify-center shrink-0 text-[#D4AF37]">
                        {getCategoryIcon(record.category)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider block truncate">
                          {record.institution}
                        </span>
                        <h3 className="font-serif font-bold text-white text-xs sm:text-sm truncate group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {record.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingRecord(record);
                        }}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-[#151515] rounded-md transition-colors shrink-0"
                        title="Edit Record"
                      >
                        <Edit2 className="w-3.5 h-3.5 shrink-0" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(record.id, record.title, e)}
                        className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-[#151515] rounded-md transition-colors shrink-0"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>

                  {/* Masked Account Number & Category */}
                  <div className="bg-[#050505] rounded-lg p-2.5 sm:p-3 border border-[#1A1A1A] flex items-center justify-between mb-3 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <Lock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="font-mono text-xs text-gray-200 tracking-wider truncate">
                        {isUnmasked ? record.identifierMasked.replace(/•/g, '7') : record.identifierMasked}
                      </span>
                    </div>
                    <button
                      onClick={(e) => toggleUnmask(record.id, e)}
                      className="text-gray-400 hover:text-[#D4AF37] transition-colors p-1 shrink-0 ml-2"
                      title={isUnmasked ? 'Mask Account Identifier' : 'Unmask Identifier'}
                    >
                      {isUnmasked ? <EyeOff className="w-3.5 h-3.5 shrink-0" /> : <Eye className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  </div>

                  {/* Guidance snippet */}
                  {record.claimGuidance && (
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                      {record.claimGuidance}
                    </p>
                  )}
                </div>

                {/* Bottom Metadata & Links */}
                <div className="pt-3 border-t border-[#1F1F1F] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[#D4AF37] font-medium bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      <CheckCircle2 className="w-3 h-3 shrink-0" /> {record.nomineeStatus}
                    </span>
                    {record.valueEstimate && (
                      <span className="font-mono text-gray-300 text-[10px] sm:text-[11px]">
                        {record.valueEstimate}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/asset-details?id=${record.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#D4AF37] hover:text-[#E5C158] font-semibold inline-flex items-center gap-1 transition-colors text-xs shrink-0"
                  >
                    <span>Details</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-16 bg-[#0A0A0A] rounded-2xl border border-[#1F1F1F] p-8">
          <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-white text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>No Records Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
            {searchQuery
              ? `No asset records matched "${searchQuery}". Try searching by another keyword.`
              : 'No asset records in this category yet. Click "Add Record" to securely encrypt a new asset.'}
          </p>
          {showAddButton && (
            <button
              onClick={() => setIsAddingRecord(true)}
              className="mt-4 inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Record Now</span>
            </button>
          )}
        </div>
      )}

      {/* ADD RECORD MODAL */}
      <AnimatePresence>
        {isAddingRecord && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#1F1F1F] bg-[#050505]">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif font-bold text-white text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Add Encrypted Vault Record</h3>
                </div>
                <button
                  onClick={() => setIsAddingRecord(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as AssetCategory)}
                      className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="bank">Bank Account</option>
                      <option value="investment">Investment / Brokerage</option>
                      <option value="crypto">Cryptocurrency Discovery</option>
                      <option value="insurance">Insurance Policy</option>
                      <option value="digital">Digital Legacy & Cloud</option>
                      <option value="legal">Legal & Family Trust</option>
                      <option value="property">Real Estate & Deed</option>
                      <option value="personal">Personal Directives</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Institution / Platform</label>
                    <input
                      type="text"
                      required
                      value={newInstitution}
                      onChange={(e) => setNewInstitution(e.target.value)}
                      placeholder="e.g. Chase Bank, Vanguard"
                      className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Asset Title / Name</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Primary High Yield Savings"
                    className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Account / Client ID (Last 4)</label>
                    <input
                      type="text"
                      value={newIdentifier}
                      onChange={(e) => setNewIdentifier(e.target.value)}
                      placeholder="e.g. 4829"
                      maxLength={8}
                      className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Estimated Value</label>
                    <input
                      type="text"
                      value={newValueEstimate}
                      onChange={(e) => setNewValueEstimate(e.target.value)}
                      placeholder="e.g. $50,000"
                      className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Claim Guidance for Family</label>
                  <textarea
                    rows={3}
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    placeholder="Instructions on who to contact, branch location, physical folder reference..."
                    className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#1F1F1F]">
                  <button
                    type="button"
                    onClick={() => setIsAddingRecord(false)}
                    className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-bold bg-[#D4AF37] hover:bg-[#E5C158] text-black rounded-lg shadow-md transition-all"
                  >
                    Encrypt & Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT RECORD MODAL */}
      <AnimatePresence>
        {editingRecord && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#1F1F1F] bg-[#050505]">
                <div className="flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif font-bold text-white text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Edit Asset Record</h3>
                </div>
                <button
                  onClick={() => setEditingRecord(null)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Asset Title</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.title}
                    onChange={(e) => setEditingRecord({ ...editingRecord, title: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Institution</label>
                    <input
                      type="text"
                      required
                      value={editingRecord.institution}
                      onChange={(e) => setEditingRecord({ ...editingRecord, institution: e.target.value })}
                      className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Nominee Status</label>
                    <select
                      value={editingRecord.nomineeStatus}
                      onChange={(e) => setEditingRecord({ ...editingRecord, nomineeStatus: e.target.value as any })}
                      className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Registered">Registered</option>
                      <option value="Pending">Pending</option>
                      <option value="Not Registered">Not Registered</option>
                      <option value="Uncertain">Uncertain</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Estimated Value</label>
                  <input
                    type="text"
                    value={editingRecord.valueEstimate || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, valueEstimate: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Claim Guidance</label>
                  <textarea
                    rows={3}
                    value={editingRecord.claimGuidance || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, claimGuidance: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#1F1F1F]">
                  <button
                    type="button"
                    onClick={() => setEditingRecord(null)}
                    className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-bold bg-[#D4AF37] hover:bg-[#E5C158] text-black rounded-lg shadow-md transition-all"
                  >
                    Update Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
