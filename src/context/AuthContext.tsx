import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '../types';
import { MockApiService } from '../services/apiService';
import { INITIAL_USER, INITIAL_NOMINEE_USER, INITIAL_EXECUTOR_USER } from '../services/mockData';
import { useToast } from './ToastContext';

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email?: string, password?: string, asRole?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: 'owner' | 'nominee' | 'executor') => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  isLocked: boolean;
  lockVault: () => void;
  unlockVault: (passphrase?: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    MockApiService.getCurrentUser().then((u) => {
      setUser(u);
    });
  }, []);

  const login = async (email?: string, password?: string, asRole: UserRole = 'owner') => {
    let target = INITIAL_USER;
    if (asRole === 'nominee') target = INITIAL_NOMINEE_USER;
    if (asRole === 'executor') target = INITIAL_EXECUTOR_USER;

    if (email) {
      target = { ...target, email };
    }

    const saved = await MockApiService.setCurrentUser(target);
    setUser(saved);
    setIsLocked(false);
    showToast({
      type: 'success',
      title: 'Authenticated Successfully',
      message: `Welcome back, ${saved.name}. Zero-knowledge session active.`
    });
  };

  const logout = () => {
    setUser(null);
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'Your encryption keys have been flushed from browser memory.'
    });
  };

  const switchRole = async (targetRole: 'owner' | 'nominee' | 'executor') => {
    const updated = await MockApiService.switchPersona(targetRole);
    setUser(updated);
    setIsLocked(false);
    showToast({
      type: 'info',
      title: 'Active Persona Switched',
      message: `Now viewing as: ${updated.name} (${updated.role.toUpperCase()})`
    });
  };

  const updateUser = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    await MockApiService.setCurrentUser(updated);
    setUser(updated);
  };

  const lockVault = () => {
    setIsLocked(true);
    showToast({
      type: 'warning',
      title: 'Vault Encrypted & Locked',
      message: 'Passphrase or Passkey required to unmask records.'
    });
  };

  const unlockVault = (passphrase?: string) => {
    setIsLocked(false);
    showToast({
      type: 'success',
      title: 'Vault Unlocked',
      message: 'Local memory decryption key restored.'
    });
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || 'guest',
        login,
        logout,
        switchRole,
        updateUser,
        isLocked,
        lockVault,
        unlockVault
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
