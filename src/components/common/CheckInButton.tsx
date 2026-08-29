import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Loader2, CheckCircle2, AlertOctagon, RotateCcw, ShieldCheck } from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useToast } from '../../context/ToastContext';

export type CheckInButtonState = 'idle' | 'loading' | 'confirmed' | 'failed';

interface CheckInButtonProps {
  size?: 'sm' | 'md' | 'lg';
  showSimulateToggle?: boolean;
  onSuccess?: () => void;
  className?: string;
}

export const CheckInButton: React.FC<CheckInButtonProps> = ({
  size = 'md',
  showSimulateToggle = true,
  onSuccess,
  className = ''
}) => {
  const { performCheckIn, checkInState } = useVault();
  const { showToast } = useToast();
  const [buttonState, setButtonState] = useState<CheckInButtonState>('idle');
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCheckIn = async () => {
    if (buttonState === 'loading') return;

    setButtonState('loading');
    setErrorMessage('');

    try {
      await performCheckIn(simulateFailure);
      setButtonState('confirmed');
      if (onSuccess) onSuccess();

      // Reset back to idle after 4.5s
      setTimeout(() => {
        setButtonState('idle');
      }, 4500);
    } catch (err: any) {
      setButtonState('failed');
      setErrorMessage(err.message || 'Heartbeat signature verification timed out.');
    }
  };

  const sizeClasses = {
    sm: 'h-9 sm:h-10 px-3 sm:px-4 text-xs font-semibold rounded-lg',
    md: 'h-11 sm:h-12 px-3 sm:px-6 text-xs sm:text-sm font-semibold rounded-lg',
    lg: 'h-12 sm:h-14 px-3 sm:px-8 text-xs sm:text-base font-bold rounded-lg'
  };

  return (
    <div className={`flex flex-col items-center gap-2 max-w-full w-full sm:w-auto ${className}`}>
      <motion.button
        onClick={handleCheckIn}
        disabled={buttonState === 'loading'}
        whileHover={buttonState !== 'loading' ? { scale: 1.02 } : undefined}
        whileTap={buttonState !== 'loading' ? { scale: 0.98 } : undefined}
        className={`relative overflow-hidden flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 shadow-xl max-w-full w-full sm:w-auto ${
          sizeClasses[size]
        } ${
          buttonState === 'idle'
            ? 'bg-[#D4AF37] text-black font-bold uppercase tracking-wider hover:bg-[#E5C158] shadow-[#D4AF37]/20 border border-[#D4AF37]'
            : buttonState === 'loading'
            ? 'bg-[#151515] text-gray-300 border border-[#2A2A2A] cursor-wait'
            : buttonState === 'confirmed'
            ? 'bg-emerald-900/40 text-emerald-300 shadow-emerald-900/30 border border-emerald-500/50'
            : 'bg-rose-950/50 text-rose-300 shadow-rose-950/30 border border-rose-500/50'
        }`}
      >
        <AnimatePresence mode="wait">
          {buttonState === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 truncate"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-black/30 animate-pulse shrink-0" />
              <span className="truncate">I Am Active • Check-in</span>
            </motion.span>
          )}

          {buttonState === 'loading' && (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 truncate"
            >
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-[#D4AF37] shrink-0" />
              <span className="truncate">Verifying presence...</span>
            </motion.span>
          )}

          {buttonState === 'confirmed' && (
            <motion.span
              key="confirmed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center gap-2 font-semibold text-emerald-200 truncate"
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
              <span className="truncate">Confirmed (Next: 30d)</span>
            </motion.span>
          )}

          {buttonState === 'failed' && (
            <motion.span
              key="failed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center gap-2 text-rose-200 truncate"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 animate-spin shrink-0" style={{ animationDuration: '3s' }} />
              <span className="truncate">Timed Out • Retry</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Optional feedback banner under button for state 3 & 4 */}
      {buttonState === 'failed' && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose-400 flex items-center gap-1 font-medium"
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>{errorMessage}</span>
        </motion.p>
      )}

      {showSimulateToggle && (
        <div className="flex items-center gap-2 mt-1">
          <label className="text-[11px] text-gray-400 flex items-center gap-1.5 cursor-pointer bg-[#0A0A0A] px-2.5 py-1 rounded-md border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
              className="rounded border-[#2A2A2A] text-[#D4AF37] focus:ring-[#D4AF37] w-3.5 h-3.5 bg-[#050505]"
            />
            <span>Simulate Network Handshake Error</span>
          </label>
        </div>
      )}
    </div>
  );
};
