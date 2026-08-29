import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Lock,
  Users,
  ShieldCheck,
  FileText,
  Activity,
  Settings,
  HelpCircle,
  AlertTriangle,
  LogOut,
  PlusCircle,
  CheckCircle2,
  FileSearch,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, role, lockVault } = useAuth();

  const isOwner = role === 'owner';
  const isNominee = role === 'nominee';
  const isExecutor = role === 'executor';

  const menuItems = [
    {
      label: 'Main Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['owner', 'executor']
    },
    {
      label: 'Nominee Case Dashboard',
      path: '/nominee-claim-dashboard',
      icon: Users,
      roles: ['nominee', 'executor', 'owner'],
      badge: isNominee ? 'Active Case' : undefined
    },
    {
      label: 'Encrypted Vault',
      path: '/vault',
      icon: Lock,
      roles: ['owner', 'executor']
    },
    {
      label: 'Trustees & Nominees',
      path: '/trustees',
      icon: Users,
      roles: ['owner', 'executor']
    },
    {
      label: 'Continuity & Check-ins',
      path: '/check-in-history',
      icon: Activity,
      roles: ['owner', 'executor']
    },
    {
      label: 'Secure Document Vault',
      path: '/document-vault',
      icon: FileText,
      roles: ['owner', 'executor', 'nominee']
    },
    {
      label: 'Verification & AI Review',
      path: '/ai-document-review',
      icon: FileSearch,
      roles: ['owner', 'executor', 'nominee']
    },
    {
      label: 'Security Center',
      path: '/security-center',
      icon: ShieldCheck,
      roles: ['owner', 'executor']
    },
    {
      label: 'Escalation Center',
      path: '/escalation-center',
      icon: AlertTriangle,
      roles: ['owner', 'executor']
    },
    {
      label: 'Settings & Data',
      path: '/settings',
      icon: Settings,
      roles: ['owner', 'executor', 'nominee']
    }
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(role) || role === 'owner'
  );

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-[#1F1F1F] min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden lg:flex shrink-0">
      <div className="space-y-6">
        {/* User Card */}
        <div className="p-3.5 rounded-xl bg-[#0F0F0F] border border-[#1A1A1A] flex items-center gap-3">
          <img
            src={user?.avatarUrl}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-lg object-cover border border-[#2A2A2A] shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-serif font-bold text-white text-xs truncate">
              {user?.name || 'Eleanor Vance'}
            </h3>
            <p className="text-[11px] text-[#D4AF37] font-medium flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>{role === 'nominee' ? 'Heir Mode' : 'Zero-Knowledge Active'}</span>
            </p>
          </div>
        </div>

        {/* Quick Action Button */}
        {isOwner && (
          <Link
            to="/invite-trustee"
            className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs py-2.5 rounded-lg shadow-lg shadow-[#D4AF37]/15 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Invite Trusted Person</span>
          </Link>
        )}

        {/* Navigation List */}
        <nav className="space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A] font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-[#111111]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-1.5 py-0.5 rounded border border-[#D4AF37]/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Support & Emergency */}
      <div className="pt-4 border-t border-[#1F1F1F] space-y-1.5">
        <Link
          to="/support-hub"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-[#111111] transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-gray-500" />
          <span>Support & System States</span>
        </Link>
        <Link
          to="/escalation-center"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-400/90 hover:text-amber-300 hover:bg-amber-950/20 transition-colors"
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Escalation Protocol</span>
        </Link>
      </div>
    </aside>
  );
};
