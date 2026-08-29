import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Lock,
  Heart,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { checkInState } = useVault();

  const navItems = [
    { label: 'Portfolio', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Vault', path: '/vault', icon: Lock },
    { label: 'Check-in', path: '/check-in-prompt', icon: Heart, badge: 'Active' },
    { label: 'Trustees', path: '/trustees', icon: Users },
    { label: 'Security', path: '/security-center', icon: ShieldCheck }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070707]/95 backdrop-blur-xl border-t border-[#1F1F1F] px-2 py-1.5 flex items-center justify-around safe-area-bottom"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        const isHeart = item.path === '/check-in-prompt';

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all min-w-[56px] ${
              isActive
                ? 'text-[#D4AF37]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110' : ''
                } ${isHeart ? 'text-[#D4AF37] animate-pulse fill-[#D4AF37]/20' : ''}`}
              />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]" />
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
