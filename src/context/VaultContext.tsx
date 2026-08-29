import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  VaultRecord,
  CheckInState,
  CheckInLog,
  TrusteeNominee,
  AuditLogItem,
  NotificationItem,
  SupportTicket,
  ClaimDossier,
  VaultDocument,
  AssetCategory
} from '../types';
import { MockApiService } from '../services/apiService';
import { useToast } from './ToastContext';

interface VaultContextValue {
  records: VaultRecord[];
  isLoading: boolean;
  checkInState: CheckInState;
  checkInLogs: CheckInLog[];
  trustees: TrusteeNominee[];
  auditLogs: AuditLogItem[];
  notifications: NotificationItem[];
  supportTickets: SupportTicket[];
  claimDossier: ClaimDossier;
  addRecord: (record: Omit<VaultRecord, 'id' | 'createdAt' | 'updatedAt'>) => Promise<VaultRecord>;
  updateRecord: (id: string, updates: Partial<VaultRecord>) => Promise<VaultRecord>;
  deleteRecord: (id: string) => Promise<boolean>;
  getRecordById: (id: string) => VaultRecord | undefined;
  performCheckIn: (simulateFailure?: boolean) => Promise<void>;
  updateCheckInConfig: (updates: Partial<CheckInState>) => Promise<void>;
  pauseRelease: (reason: string, notes?: string) => Promise<void>;
  resumeRelease: () => Promise<void>;
  addTrustee: (trustee: Omit<TrusteeNominee, 'id' | 'status' | 'lastActive'>) => Promise<TrusteeNominee>;
  updateTrusteeStatus: (id: string, status: 'verified' | 'pending' | 'revoked') => Promise<void>;
  attachDocumentToRecord: (recordId: string, doc: VaultDocument) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  sendTicketMessage: (ticketId: string, text: string, attachment?: VaultDocument) => Promise<void>;
  approveDossierRelease: () => Promise<void>;
  reloadAll: () => Promise<void>;
  resetAll: () => Promise<void>;
}

const VaultContext = createContext<VaultContextValue | undefined>(undefined);

export const VaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<VaultRecord[]>([]);
  const [checkInState, setCheckInState] = useState<CheckInState>({} as CheckInState);
  const [checkInLogs, setCheckInLogs] = useState<CheckInLog[]>([]);
  const [trustees, setTrustees] = useState<TrusteeNominee[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [claimDossier, setClaimDossier] = useState<ClaimDossier>({} as ClaimDossier);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { showToast } = useToast();

  const reloadAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [recs, chk, logs, trusts, aud, notifs, tkts, dos] = await Promise.all([
        MockApiService.getVaultRecords(),
        MockApiService.getCheckInState(),
        MockApiService.getCheckInLogs(),
        MockApiService.getTrustees(),
        MockApiService.getAuditLogs(),
        MockApiService.getNotifications(),
        MockApiService.getSupportTickets(),
        MockApiService.getClaimDossier()
      ]);

      setRecords(recs);
      setCheckInState(chk);
      setCheckInLogs(logs);
      setTrustees(trusts);
      setAuditLogs(aud);
      setNotifications(notifs);
      setSupportTickets(tkts);
      setClaimDossier(dos);
    } catch (err) {
      console.error('Failed to load mock vault data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadAll();
  }, [reloadAll]);

  const addRecord = async (recordData: Omit<VaultRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await MockApiService.createVaultRecord(recordData);
    setRecords((prev) => [created, ...prev]);
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: 'success',
      title: 'Record Encrypted & Saved',
      message: `${created.title} was safely added with AES-256 zero-knowledge encryption.`
    });
    return created;
  };

  const updateRecord = async (id: string, updates: Partial<VaultRecord>) => {
    const updated = await MockApiService.updateVaultRecord(id, updates);
    setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)));
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: 'success',
      title: 'Record Updated',
      message: `${updated.title} details updated successfully.`
    });
    return updated;
  };

  const deleteRecord = async (id: string) => {
    const target = records.find((r) => r.id === id);
    await MockApiService.deleteVaultRecord(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: 'info',
      title: 'Record Shredded',
      message: `${target?.title || 'Record'} has been permanently wiped from the vault.`
    });
    return true;
  };

  const getRecordById = (id: string) => {
    return records.find((r) => r.id === id);
  };

  const performCheckIn = async (simulateFailure = false) => {
    try {
      const res = await MockApiService.performCheckIn(simulateFailure);
      setCheckInState(res.state);
      const logs = await MockApiService.getCheckInLogs();
      setCheckInLogs(logs);
      const updatedAudit = await MockApiService.getAuditLogs();
      setAuditLogs(updatedAudit);
      showToast({
        type: 'success',
        title: 'Check-in Verified',
        message: 'Your active heartbeat was securely confirmed across consensus nodes.'
      });
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Check-in Verification Failed',
        message: err.message || 'Signature handshake timed out. Please retry.'
      });
      throw err;
    }
  };

  const updateCheckInConfig = async (updates: Partial<CheckInState>) => {
    const updated = await MockApiService.updateCheckInConfig(updates);
    setCheckInState(updated);
    showToast({
      type: 'success',
      title: 'Policy Updated',
      message: 'Heartbeat interval and grace period rules saved.'
    });
  };

  const pauseRelease = async (reason: string, notes?: string) => {
    const updated = await MockApiService.pauseReleaseProtocol(reason, notes);
    setCheckInState(updated);
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: 'warning',
      title: 'Continuity Protocol Paused',
      message: 'Scheduled triggers are suspended until manually resumed or expiration.'
    });
  };

  const resumeRelease = async () => {
    const updated = await MockApiService.resumeReleaseProtocol();
    setCheckInState(updated);
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: 'success',
      title: 'Continuity Protocol Resumed',
      message: 'Active monitoring restored.'
    });
  };

  const addTrustee = async (trusteeData: Omit<TrusteeNominee, 'id' | 'status' | 'lastActive'>) => {
    const created = await MockApiService.inviteTrustee(trusteeData);
    setTrustees((prev) => [...prev, created]);
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: 'success',
      title: 'Secure Invitation Dispatched',
      message: `Invitation generated for ${created.name} (${created.role}).`
    });
    return created;
  };

  const updateTrusteeStatus = async (id: string, status: 'verified' | 'pending' | 'revoked') => {
    const updated = await MockApiService.updateTrusteeStatus(id, status);
    setTrustees((prev) => prev.map((t) => (t.id === id ? updated : t)));
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: status === 'revoked' ? 'warning' : 'success',
      title: `Trustee ${status === 'revoked' ? 'Access Revoked' : 'Status Updated'}`,
      message: `${updated.name}'s permissions have been set to ${status}.`
    });
  };

  const attachDocumentToRecord = async (recordId: string, doc: VaultDocument) => {
    const target = records.find((r) => r.id === recordId);
    if (!target) return;
    const currentDocs = target.attachedDocuments || [];
    await updateRecord(recordId, {
      attachedDocuments: [doc, ...currentDocs]
    });
  };

  const markNotificationRead = async (id: string) => {
    await MockApiService.markNotificationAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = async () => {
    await MockApiService.markAllNotificationsAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast({
      type: 'info',
      title: 'All Notifications Cleared',
      message: 'All unread notifications marked as acknowledged.'
    });
  };

  const sendTicketMessage = async (ticketId: string, text: string, attachment?: VaultDocument) => {
    const updated = await MockApiService.addTicketMessage(ticketId, text, attachment);
    setSupportTickets((prev) => prev.map((t) => (t.id === ticketId ? updated : t)));
    showToast({
      type: 'success',
      title: 'Secure Message Sent',
      message: 'Transmitted via encrypted support enclave.'
    });
  };

  const approveDossierRelease = async () => {
    const updated = await MockApiService.approveControlledRelease();
    setClaimDossier(updated);
    const updatedAudit = await MockApiService.getAuditLogs();
    setAuditLogs(updatedAudit);
    showToast({
      type: 'success',
      title: 'Controlled Release Approved',
      message: 'Multi-sig consensus threshold reached. Encrypted claim packets unlocked.'
    });
  };

  const resetAll = async () => {
    await MockApiService.resetAllData();
    await reloadAll();
    showToast({
      type: 'info',
      title: 'State Reset to Defaults',
      message: 'All synthetic datasets have been restored.'
    });
  };

  return (
    <VaultContext.Provider
      value={{
        records,
        isLoading,
        checkInState,
        checkInLogs,
        trustees,
        auditLogs,
        notifications,
        supportTickets,
        claimDossier,
        addRecord,
        updateRecord,
        deleteRecord,
        getRecordById,
        performCheckIn,
        updateCheckInConfig,
        pauseRelease,
        resumeRelease,
        addTrustee,
        updateTrusteeStatus,
        attachDocumentToRecord,
        markNotificationRead,
        markAllNotificationsRead,
        sendTicketMessage,
        approveDossierRelease,
        reloadAll,
        resetAll
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = (): VaultContextValue => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};
