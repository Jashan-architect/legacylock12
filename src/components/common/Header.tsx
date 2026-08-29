import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Lock,
  Unlock,
  Bell,
  User,
  Heart,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Sparkles,
  Search,
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  FileSearch,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useVault } from '../../context/VaultContext';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout, role, switchRole, lockVault, isLocked } = useAuth();
  const { notifications, checkInState } = useVault();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: 'Portfolio', path: '/dashboard' },
    { label: 'Vault', path: '/vault' },
    { label: 'Trustees & Nominees', path: '/trustees' },
    { label: 'Security & Audit', path: '/security-center' },
    { label: 'Support Hub', path: '/support-hub' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070707]/95 backdrop-blur-xl border-b border-[#1F1F1F] w-full transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-6 min-w-0">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6F1F] border border-[#D4AF37]/40 flex items-center justify-center text-black shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 fill-black/20 text-black shrink-0" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5 truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                LegacyLock
                <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded border border-[#D4AF37]/30 hidden xs:inline-block">
                  AES-256
                </span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden md:block">
                Digital Estate Continuity
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#151515] text-[#D4AF37] border border-[#2A2A2A]'
                      : 'text-gray-300 hover:text-white hover:bg-[#111111]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          {/* Quick Check-in pill (desktop only) */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/check-in-prompt"
              className="inline-flex items-center gap-1.5 bg-[#0F0F0F] hover:bg-[#151515] text-[#D4AF37] text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse fill-[#D4AF37]/20 shrink-0" />
              <span className="hidden md:inline">Heartbeat: Active</span>
              <span className="md:hidden">Active</span>
            </Link>
          </div>

          {/* Notifications Button */}
          <Link
            to="/notifications"
            className="relative p-1.5 sm:p-2 text-gray-300 hover:text-white hover:bg-[#111111] rounded-lg transition-colors border border-transparent hover:border-[#1F1F1F] shrink-0"
            title="Notification Center"
          >
            <Bell className="w-4 h-4 shrink-0" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full ring-2 ring-[#070707]" />
            )}
          </Link>

          {/* Lock / Unlock Vault Button */}
          <button
            onClick={lockVault}
            className={`p-1.5 sm:p-2 rounded-lg border transition-colors shrink-0 ${
              isLocked
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/50'
                : 'border-[#1F1F1F] text-gray-300 hover:text-white hover:bg-[#111111]'
            }`}
            title={isLocked ? 'Vault is Locked' : 'Lock Vault Now'}
          >
            {isLocked ? <Lock className="w-4 h-4 text-rose-400 shrink-0" /> : <Unlock className="w-4 h-4 text-[#D4AF37] shrink-0" />}
          </button>

          {/* Theme Toggle Switcher (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 p-1 sm:p-1.5 rounded-lg border border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#111111] hover:border-[#2A2A2A] transition-all shrink-0 group"
            title={`Currently in ${isDark ? 'Obsidian Dark' : 'Ivory Light'} theme. Click to switch.`}
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Theme`}
          >
            <div
              className={`p-1 rounded-md flex items-center justify-center transition-all ${
                !isDark
                  ? 'bg-[#D4AF37] text-black shadow-sm'
                  : 'text-gray-400 group-hover:text-gray-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 shrink-0" />
            </div>
            <div
              className={`p-1 rounded-md flex items-center justify-center transition-all ${
                isDark
                  ? 'bg-[#D4AF37] text-black shadow-sm'
                  : 'text-gray-400 group-hover:text-gray-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 shrink-0" />
            </div>
            <span className="hidden xl:inline text-[11px] font-semibold pr-1 text-gray-300">
              {isDark ? 'Dark' : 'Light'}
            </span>
          </button>

          {/* User Profile & Role Switcher */}
          {user ? (
            <div className="relative shrink-0">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 sm:pl-2 rounded-lg bg-[#0A0A0A] hover:bg-[#111111] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors shrink-0"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-md object-cover border border-[#2A2A2A] shrink-0"
                />
                <div className="text-left hidden md:block leading-tight min-w-0">
                  <div className="text-xs font-bold text-white truncate max-w-[90px] lg:max-w-[110px]">{user.name}</div>
                  <div className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                    {user.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-64 max-w-xs rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-[#1F1F1F]">
                    <p className="text-xs font-bold text-white font-serif">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 font-medium">
                      <ShieldCheck className="w-3 h-3 shrink-0" /> Tier: {user.tier}
                    </div>
                  </div>

                  {/* Switch Role Fast */}
                  <div className="py-2 border-b border-[#1F1F1F]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase px-3 mb-1 tracking-wider">
                      Switch Active Persona
                    </p>
                    <button
                      onClick={() => {
                        switchRole('owner');
                        setIsProfileOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        role === 'owner' ? 'bg-[#151515] text-[#D4AF37] font-bold border border-[#2A2A2A]' : 'text-gray-300 hover:bg-[#111111]'
                      }`}
                    >
                      Eleanor Vance (Estate Owner)
                    </button>
                    <button
                      onClick={() => {
                        switchRole('nominee');
                        setIsProfileOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        role === 'nominee' ? 'bg-[#151515] text-[#D4AF37] font-bold border border-[#2A2A2A]' : 'text-gray-300 hover:bg-[#111111]'
                      }`}
                    >
                      Robert Vance (Nominee / Heir)
                    </button>
                    <button
                      onClick={() => {
                        switchRole('executor');
                        setIsProfileOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        role === 'executor' ? 'bg-[#151515] text-[#D4AF37] font-bold border border-[#2A2A2A]' : 'text-gray-300 hover:bg-[#111111]'
                      }`}
                    >
                      Robert Sterling (Executor)
                    </button>
                  </div>

                  <div className="py-2 border-b border-[#1F1F1F]">
                    <div className="text-[10px] font-semibold text-gray-500 uppercase px-3 mb-1.5 tracking-wider">
                      Appearance Theme
                    </div>
                    <div className="flex items-center justify-between px-3 py-1">
                      <span className="text-xs text-gray-300 flex items-center gap-1.5">
                        {isDark ? <Moon className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Sun className="w-3.5 h-3.5 text-[#B88E1F]" />}
                        <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                      </span>
                      <button
                        onClick={toggleTheme}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#151515] text-[#D4AF37] hover:bg-[#202020] border border-[#2A2A2A] transition-colors"
                      >
                        Switch to {isDark ? 'Light' : 'Dark'}
                      </button>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-gray-300 hover:bg-[#111111] transition-colors"
                    >
                      Settings & Data Controls
                    </Link>
                    <Link
                      to="/audit-log"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-gray-300 hover:bg-[#111111] transition-colors"
                    >
                      Security Audit Trail
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs text-rose-400 hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 shrink-0" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors shadow-md shadow-[#D4AF37]/20 shrink-0"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 sm:p-2 text-gray-300 hover:text-white hover:bg-[#111111] rounded-lg lg:hidden transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#1F1F1F] bg-[#070707] px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Heartbeat quick status on mobile drawer */}
          <Link
            to="/check-in-prompt"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] text-white"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#D4AF37] animate-pulse fill-[#D4AF37]/30 shrink-0" />
              <div>
                <div className="text-xs font-bold font-serif">Heartbeat Pulse Check-in</div>
                <div className="text-[10px] text-gray-400">Streak: {checkInState.streakDays || 180}d • Active</div>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase bg-[#D4AF37] text-black px-2.5 py-1 rounded-md">Check In</span>
          </Link>

          <div className="space-y-1 pt-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase px-3 tracking-wider">Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-300 hover:bg-[#111111] hover:text-white"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="space-y-1 pt-2 border-t border-[#1F1F1F]">
            <p className="text-[10px] font-bold text-gray-500 uppercase px-3 tracking-wider">Dashboard Views</p>
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-[#111111] hover:text-white"
            >
              <LayoutDashboard className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Main Dashboard</span>
            </Link>
            <Link
              to="/vault"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-[#111111] hover:text-white"
            >
              <Lock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Encrypted Vault Records</span>
            </Link>
            <Link
              to="/trustees"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-[#111111] hover:text-white"
            >
              <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Trustees & Nominees</span>
            </Link>
            <Link
              to="/document-vault"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-[#111111] hover:text-white"
            >
              <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Document Vault & AI Verification</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-[#111111] hover:text-white"
            >
              <Settings className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Settings & Privacy Controls</span>
            </Link>

            {/* Mobile Theme Toggle Pill */}
            <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between px-3 py-2">
              <span className="text-xs text-gray-300 flex items-center gap-2 font-medium">
                {isDark ? <Moon className="w-4 h-4 text-[#D4AF37] shrink-0" /> : <Sun className="w-4 h-4 text-[#B88E1F] shrink-0" />}
                <span>Theme: {isDark ? 'Dark (Obsidian)' : 'Light (Ivory)'}</span>
              </span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#151515] text-[#D4AF37] hover:bg-[#202020] border border-[#2A2A2A] transition-colors"
              >
                Switch to {isDark ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

