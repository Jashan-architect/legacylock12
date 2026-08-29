import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, ShieldCheck, FileText, CheckCircle2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070707] border-t border-[#1F1F1F] text-gray-400 text-xs w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <span>LegacyLock</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Zero-knowledge digital estate organization, client-side encryption, and regulatory-aligned continuity consensus protocols.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/30 max-w-full">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">AES-256 Client Memory Safe</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider font-serif">Vault & Continuity</h4>
            <ul className="space-y-2">
              <li><Link to="/vault" className="hover:text-[#D4AF37] transition-colors">Encrypted Vault</Link></li>
              <li><Link to="/check-in-prompt" className="hover:text-[#D4AF37] transition-colors">Presence Check-in Pulse</Link></li>
              <li><Link to="/check-in-config" className="hover:text-[#D4AF37] transition-colors">Heartbeat Configuration</Link></li>
              <li><Link to="/document-vault" className="hover:text-[#D4AF37] transition-colors">Secure Document Storage</Link></li>
              <li><Link to="/escalation-center" className="hover:text-[#D4AF37] transition-colors">Escalation Protocol</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider font-serif">Trustees & Release</h4>
            <ul className="space-y-2">
              <li><Link to="/trustees" className="hover:text-[#D4AF37] transition-colors">Trustees & Nominees</Link></li>
              <li><Link to="/invite-trustee" className="hover:text-[#D4AF37] transition-colors">Invite Trusted Contact</Link></li>
              <li><Link to="/claim-dossier-preview" className="hover:text-[#D4AF37] transition-colors">Claim Preparation Dossier</Link></li>
              <li><Link to="/controlled-release" className="hover:text-[#D4AF37] transition-colors">Controlled Multi-Sig Release</Link></li>
              <li><Link to="/nominee-claim-dashboard" className="hover:text-[#D4AF37] transition-colors">Nominee Heir Portal</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider font-serif">Security & Compliance</h4>
            <ul className="space-y-2">
              <li><Link to="/security-center" className="hover:text-[#D4AF37] transition-colors">Security Center</Link></li>
              <li><Link to="/privacy-console" className="hover:text-[#D4AF37] transition-colors">Zero-Knowledge Whitepaper</Link></li>
              <li><Link to="/audit-log" className="hover:text-[#D4AF37] transition-colors">Immutable Audit Log</Link></li>
              <li><Link to="/support-hub" className="hover:text-[#D4AF37] transition-colors">Support & State Hub</Link></li>
              <li><Link to="/pricing" className="hover:text-[#D4AF37] transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Scrubbing Compliance Disclaimer */}
        <div className="pt-6 border-t border-[#1F1F1F] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p className="leading-relaxed text-center md:text-left max-w-2xl">
            LegacyLock facilitates zero-knowledge organization and structured consensus transfer instructions. Individual financial and legal institutions follow independent statutory claim verification and regulatory-aligned compliance frameworks.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-medium">
            <Link to="/privacy-console" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/pricing" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/security-center" className="hover:text-gray-300 transition-colors">Security Model</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
