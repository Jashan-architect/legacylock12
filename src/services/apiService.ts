import {
  VaultRecord,
  CheckInState,
  CheckInLog,
  TrusteeNominee,
  AuditLogItem,
  NotificationItem,
  SupportTicket,
  ClaimDossier,
  UserProfile,
  VaultDocument
} from '../types';
import {
  INITIAL_USER,
  INITIAL_NOMINEE_USER,
  INITIAL_EXECUTOR_USER,
  INITIAL_VAULT_RECORDS,
  INITIAL_CHECKIN_STATE,
  INITIAL_CHECKIN_LOGS,
  INITIAL_TRUSTEES,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_CLAIM_DOSSIER
} from './mockData';

const STORAGE_KEYS = {
  USER: 'legacylock_user_v1',
  VAULT: 'legacylock_vault_v1',
  CHECKIN: 'legacylock_checkin_v1',
  CHECKIN_LOGS: 'legacylock_checkin_logs_v1',
  TRUSTEES: 'legacylock_trustees_v1',
  AUDIT: 'legacylock_audit_v1',
  NOTIFICATIONS: 'legacylock_notifications_v1',
  TICKETS: 'legacylock_tickets_v1',
  DOSSIER: 'legacylock_dossier_v1'
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to store key: ${key}`, err);
  }
}

// Global API service
export class MockApiService {
  // USER / AUTH
  static async getCurrentUser(): Promise<UserProfile> {
    return getStored<UserProfile>(STORAGE_KEYS.USER, INITIAL_USER);
  }

  static async setCurrentUser(user: UserProfile): Promise<UserProfile> {
    setStored(STORAGE_KEYS.USER, user);
    this.addAuditLog('User Session / Persona Switched', user.name, user.role, 'App Runtime', 'Success');
    return user;
  }

  static async switchPersona(role: 'owner' | 'nominee' | 'executor'): Promise<UserProfile> {
    let target = INITIAL_USER;
    if (role === 'nominee') target = INITIAL_NOMINEE_USER;
    if (role === 'executor') target = INITIAL_EXECUTOR_USER;
    return this.setCurrentUser(target);
  }

  // VAULT CRUD
  static async getVaultRecords(): Promise<VaultRecord[]> {
    return getStored<VaultRecord[]>(STORAGE_KEYS.VAULT, INITIAL_VAULT_RECORDS);
  }

  static async getVaultRecordById(id: string): Promise<VaultRecord | undefined> {
    const records = await this.getVaultRecords();
    return records.find((r) => r.id === id);
  }

  static async createVaultRecord(record: Omit<VaultRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<VaultRecord> {
    const records = await this.getVaultRecords();
    const newRecord: VaultRecord = {
      ...record,
      id: `vlt-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newRecord, ...records];
    setStored(STORAGE_KEYS.VAULT, updated);
    this.addAuditLog(`Created Vault Asset: ${newRecord.title}`, 'Current User', 'Owner', 'Web Enclave', 'Encrypted');
    return newRecord;
  }

  static async updateVaultRecord(id: string, updates: Partial<VaultRecord>): Promise<VaultRecord> {
    const records = await this.getVaultRecords();
    let updatedRecord: VaultRecord | undefined;
    const updated = records.map((r) => {
      if (r.id === id) {
        updatedRecord = {
          ...r,
          ...updates,
          updatedAt: new Date().toISOString().split('T')[0]
        };
        return updatedRecord;
      }
      return r;
    });
    if (!updatedRecord) throw new Error('Record not found');
    setStored(STORAGE_KEYS.VAULT, updated);
    this.addAuditLog(`Updated Vault Asset: ${updatedRecord.title}`, 'Current User', 'Owner', 'Web Enclave', 'Encrypted');
    return updatedRecord;
  }

  static async deleteVaultRecord(id: string): Promise<boolean> {
    const records = await this.getVaultRecords();
    const target = records.find((r) => r.id === id);
    const updated = records.filter((r) => r.id !== id);
    setStored(STORAGE_KEYS.VAULT, updated);
    if (target) {
      this.addAuditLog(`Cryptographically Shredded Record: ${target.title}`, 'Current User', 'Owner', 'Web Enclave', 'Success');
    }
    return true;
  }

  // CHECK-IN API & 4-STATE ENGINE
  static async getCheckInState(): Promise<CheckInState> {
    return getStored<CheckInState>(STORAGE_KEYS.CHECKIN, INITIAL_CHECKIN_STATE);
  }

  static async updateCheckInConfig(updates: Partial<CheckInState>): Promise<CheckInState> {
    const current = await this.getCheckInState();
    const updated = { ...current, ...updates };
    setStored(STORAGE_KEYS.CHECKIN, updated);
    this.addAuditLog('Updated Continuity & Heartbeat Configuration', 'Current User', 'Owner', 'Web Enclave', 'Success');
    return updated;
  }

  static async performCheckIn(simulateFailure = false): Promise<{ success: boolean; message: string; state: CheckInState }> {
    // Artificial slight latency for realism
    await new Promise((res) => setTimeout(res, 1200));

    if (simulateFailure) {
      this.addAuditLog('Check-in Signature Challenge Failed (Simulated)', 'Current User', 'Owner', 'Web Enclave', 'Failed');
      throw new Error('Network timeout: Could not register heartbeat with consensus nodes. Please retry.');
    }

    const current = await this.getCheckInState();
    const now = new Date();
    const nextDate = new Date(now.getTime() + 1000 * 60 * 60 * 24 * current.frequencyDays);

    const updatedState: CheckInState = {
      ...current,
      lastCheckInDate: now.toISOString(),
      nextCheckInDate: nextDate.toISOString(),
      streakDays: current.streakDays + 1,
      totalConfirmations: current.totalConfirmations + 1,
      escalationStatus: 'normal'
    };

    setStored(STORAGE_KEYS.CHECKIN, updatedState);

    // Record Log
    const logs = await this.getCheckInLogs();
    const newLog: CheckInLog = {
      id: `chk-${Date.now().toString(36)}`,
      timestamp: `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC`,
      channel: 'Manual Web',
      device: navigator.userAgent.includes('Mac') ? 'MacBook Pro • macOS' : 'Standard Web Session',
      location: 'Verified Region (Masked)',
      status: 'Confirmed',
      details: 'Presence verified via zero-knowledge heartbeat consensus protocol.'
    };
    setStored(STORAGE_KEYS.CHECKIN_LOGS, [newLog, ...logs]);

    this.addAuditLog('Heartbeat Verified & Confirmed', 'Current User', 'Owner', 'Web Session', 'Success');

    return {
      success: true,
      message: 'Check-in confirmed. Next scheduled check-in updated.',
      state: updatedState
    };
  }

  static async pauseReleaseProtocol(reason: string, notes?: string): Promise<CheckInState> {
    const current = await this.getCheckInState();
    const updated: CheckInState = {
      ...current,
      escalationStatus: 'paused',
      pauseReason: reason
    };
    setStored(STORAGE_KEYS.CHECKIN, updated);
    this.addAuditLog(`Continuity Protocol Paused: ${reason}`, 'Current User', 'Owner', 'Security Center', 'Warning');
    return updated;
  }

  static async resumeReleaseProtocol(): Promise<CheckInState> {
    const current = await this.getCheckInState();
    const updated: CheckInState = {
      ...current,
      escalationStatus: 'normal',
      pauseReason: undefined
    };
    setStored(STORAGE_KEYS.CHECKIN, updated);
    this.addAuditLog('Continuity Protocol Resumed', 'Current User', 'Owner', 'Security Center', 'Success');
    return updated;
  }

  static async getCheckInLogs(): Promise<CheckInLog[]> {
    return getStored<CheckInLog[]>(STORAGE_KEYS.CHECKIN_LOGS, INITIAL_CHECKIN_LOGS);
  }

  // TRUSTEES & NOMINEES
  static async getTrustees(): Promise<TrusteeNominee[]> {
    return getStored<TrusteeNominee[]>(STORAGE_KEYS.TRUSTEES, INITIAL_TRUSTEES);
  }

  static async inviteTrustee(trustee: Omit<TrusteeNominee, 'id' | 'status' | 'lastActive'>): Promise<TrusteeNominee> {
    const current = await this.getTrustees();
    const newTrustee: TrusteeNominee = {
      ...trustee,
      id: `trust-${Date.now().toString(36)}`,
      status: 'pending',
      lastActive: 'Invited just now',
      invitationCode: `INV-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    };
    const updated = [...current, newTrustee];
    setStored(STORAGE_KEYS.TRUSTEES, updated);
    this.addAuditLog(`Sent Trustee Invitation: ${newTrustee.name} (${newTrustee.role})`, 'Current User', 'Owner', 'Access Control', 'Success');
    return newTrustee;
  }

  static async updateTrusteeStatus(id: string, status: 'verified' | 'pending' | 'revoked'): Promise<TrusteeNominee> {
    const current = await this.getTrustees();
    let updatedTrustee: TrusteeNominee | undefined;
    const updated = current.map((t) => {
      if (t.id === id) {
        updatedTrustee = { ...t, status };
        return updatedTrustee;
      }
      return t;
    });
    if (!updatedTrustee) throw new Error('Trustee not found');
    setStored(STORAGE_KEYS.TRUSTEES, updated);
    this.addAuditLog(`Updated Trustee Status: ${updatedTrustee.name} to ${status}`, 'Current User', 'Owner', 'Access Control', status === 'revoked' ? 'Warning' : 'Success');
    return updatedTrustee;
  }

  // AUDIT LOGS
  static async getAuditLogs(): Promise<AuditLogItem[]> {
    return getStored<AuditLogItem[]>(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOGS);
  }

  static addAuditLog(action: string, actor: string, actorRole: string, context: string, result: 'Success' | 'Failed' | 'Warning' | 'Encrypted'): void {
    const current = getStored<AuditLogItem[]>(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOGS);
    const now = new Date();
    const newItem: AuditLogItem = {
      id: `aud-${Date.now().toString(36)}`,
      timestamp: `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC`,
      action,
      actor,
      actorRole,
      context,
      result
    };
    setStored(STORAGE_KEYS.AUDIT, [newItem, ...current]);
  }

  // NOTIFICATIONS
  static async getNotifications(): Promise<NotificationItem[]> {
    return getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  static async markNotificationAsRead(id: string): Promise<void> {
    const current = await this.getNotifications();
    const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
    setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
  }

  static async markAllNotificationsAsRead(): Promise<void> {
    const current = await this.getNotifications();
    const updated = current.map((n) => ({ ...n, read: true }));
    setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
  }

  // SUPPORT TICKETS
  static async getSupportTickets(): Promise<SupportTicket[]> {
    return getStored<SupportTicket[]>(STORAGE_KEYS.TICKETS, INITIAL_SUPPORT_TICKETS);
  }

  static async addTicketMessage(ticketId: string, text: string, attachment?: VaultDocument): Promise<SupportTicket> {
    const tickets = await this.getSupportTickets();
    let updatedTicket: SupportTicket | undefined;
    const updated = tickets.map((t) => {
      if (t.id === ticketId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: 'user' as const,
          senderName: 'Eleanor Vance',
          timestamp: 'Just now',
          text,
          attachment: attachment
            ? {
                name: attachment.name,
                size: attachment.size,
                isEncrypted: attachment.isEncrypted
              }
            : undefined
        };
        updatedTicket = {
          ...t,
          lastActivity: 'Just now',
          messages: [...t.messages, newMsg]
        };
        return updatedTicket;
      }
      return t;
    });
    if (!updatedTicket) throw new Error('Ticket not found');
    setStored(STORAGE_KEYS.TICKETS, updated);
    return updatedTicket;
  }

  // CLAIM DOSSIER
  static async getClaimDossier(): Promise<ClaimDossier> {
    return getStored<ClaimDossier>(STORAGE_KEYS.DOSSIER, INITIAL_CLAIM_DOSSIER);
  }

  static async approveControlledRelease(): Promise<ClaimDossier> {
    const dossier = await this.getClaimDossier();
    const updated: ClaimDossier = {
      ...dossier,
      status: 'Approved',
      requiredApprovals: {
        current: dossier.requiredApprovals.required,
        required: dossier.requiredApprovals.required,
        pendingSignatures: []
      }
    };
    setStored(STORAGE_KEYS.DOSSIER, updated);
    this.addAuditLog('Final Consensus Release Authorized & Approved', 'Robert Sterling, Esq. (Executor)', 'Executor', 'Multi-sig Gateway', 'Success');
    return updated;
  }

  // RESET ALL DATA
  static async resetAllData(): Promise<void> {
    localStorage.clear();
    setStored(STORAGE_KEYS.USER, INITIAL_USER);
    setStored(STORAGE_KEYS.VAULT, INITIAL_VAULT_RECORDS);
    setStored(STORAGE_KEYS.CHECKIN, INITIAL_CHECKIN_STATE);
    setStored(STORAGE_KEYS.CHECKIN_LOGS, INITIAL_CHECKIN_LOGS);
    setStored(STORAGE_KEYS.TRUSTEES, INITIAL_TRUSTEES);
    setStored(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOGS);
    setStored(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    setStored(STORAGE_KEYS.TICKETS, INITIAL_SUPPORT_TICKETS);
    setStored(STORAGE_KEYS.DOSSIER, INITIAL_CLAIM_DOSSIER);
  }
}
