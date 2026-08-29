import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, FileText, Lock, CheckCircle2, ShieldCheck, AlertCircle, X, Sparkles } from 'lucide-react';
import { VaultDocument } from '../../types';
import { useToast } from '../../context/ToastContext';

interface SecureUploadZoneProps {
  onUploadComplete?: (doc: VaultDocument) => void;
  category?: string;
  className?: string;
  compact?: boolean;
}

export const SecureUploadZone: React.FC<SecureUploadZoneProps> = ({
  onUploadComplete,
  category = 'General Document',
  className = '',
  compact = false
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [currentFileSize, setCurrentFileSize] = useState<string>('');
  const [recentUploads, setRecentUploads] = useState<VaultDocument[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`;

    setCurrentFileName(file.name);
    setCurrentFileSize(sizeStr);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate chunked encryption & zero-knowledge client upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          const newDoc: VaultDocument = {
            id: `doc-${Date.now().toString(36)}`,
            name: file.name,
            size: sizeStr,
            type: file.name.split('.').pop() || 'pdf',
            category,
            uploadDate: new Date().toISOString().split('T')[0],
            isEncrypted: true,
            watermarked: true,
            status: 'verified',
            confidenceScore: 'high'
          };

          setRecentUploads((prevDocs) => [newDoc, ...prevDocs]);
          if (onUploadComplete) onUploadComplete(newDoc);

          showToast({
            type: 'success',
            title: 'File Encrypted & Uploaded',
            message: `${file.name} was successfully encrypted via AES-256 before storing.`
          });

          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 180);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden ${
          compact ? 'p-6 min-h-[160px]' : 'p-8 md:p-10 min-h-[220px]'
        } ${
          isDragging
            ? 'border-[#D4AF37] bg-[#D4AF37]/5 scale-[1.01]'
            : 'border-[#2A2A2A] bg-[#0A0A0A] hover:border-[#D4AF37]/60 hover:bg-[#0F0F0F]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.docx,.txt,.csv"
          onChange={handleFileInput}
        />

        <AnimatePresence mode="wait">
          {!isUploading ? (
            <motion.div
              key="drop-idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-xl bg-[#151515] border border-[#2A2A2A] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {isDragging ? 'Drop file to encrypt' : 'Drag & drop sensitive documents'}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  or click to select from your computer (PDF, PNG, JPG, DOCX up to 25MB)
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] px-2.5 py-1 rounded-md font-medium">
                  <Lock className="w-3 h-3" /> Zero-Knowledge Client AES-256
                </span>
                <span className="inline-flex items-center gap-1 bg-[#151515] border border-[#2A2A2A] text-gray-400 text-[11px] px-2.5 py-1 rounded-md font-medium">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Auto-Virus Scanned
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="drop-uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md flex flex-col items-center gap-4 py-2"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] animate-pulse">
                <Lock className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div className="w-full text-center">
                <div className="text-sm font-semibold text-white truncate max-w-xs mx-auto font-serif">
                  {currentFileName}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Encrypting locally before upload... ({currentFileSize})
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#050505] rounded-full h-2.5 overflow-hidden border border-[#2A2A2A] p-0.5">
                <motion.div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#E5C158] h-full rounded-full"
                  style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                  transition={{ ease: 'easeInOut' }}
                />
              </div>
              <div className="flex justify-between w-full text-[11px] text-gray-400">
                <span>Cryptographic hashing & envelope</span>
                <span className="font-mono text-[#D4AF37] font-bold">{Math.min(uploadProgress, 100)}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Uploaded items list */}
      {recentUploads.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-serif">Recently Encrypted</h4>
          <div className="space-y-2">
            {recentUploads.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#151515] flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#222]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">{doc.name}</p>
                    <p className="text-[10px] text-gray-500">{doc.size} • Uploaded today</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Encrypted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
