export type UserRole = 'owner' | 'nominee' | 'executor' | 'reviewer' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  tier: 'Standard' | 'Platinum' | 'Enterprise';
  mfaEnabled: boolean;
  passkeyEnabled: boolean;
  recoveryKitGenerated: boolean;
  emergencyPhone?: string;
  country?: string;
}

export type AssetCategory =
  | 'bank'
  | 'investment'
  | 'crypto'
  | 'insurance'
  | 'digital'
  | 'legal'
  | 'property'
  | 'personal';

export interface VaultRecord {
  id: string;
  title: string;
  category: AssetCategory;
  institution: string;
  accountType: string;
  identifierMasked: string; // e.g. "•••• •••• 4598"
  nomineeStatus: 'Registered' | 'Pending' | 'Not Registered' | 'Uncertain';
  assignedNomineeId?: string;
  assignedNomineeName?: string;
  claimGuidance?: string;
  specialInstructions?: string;
  advisorName?: string;
  advisorContact?: string;
  statementLocation?: string;
  createdAt: string;
  updatedAt: string;
  completionPercent: number;
  isEncrypted: boolean;
  valueEstimate?: string;
  attachedDocuments?: VaultDocument[];
  visibilityRule: 'post_mortem' | 'metadata_visible' | 'immediate';
  status: 'active' | 'archived' | 'pending_verification' | 'verified';
}

export interface VaultDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  category: string;
  uploadDate: string;
  isEncrypted: boolean;
  watermarked?: boolean;
  expiryHours?: number;
  status: 'verified' | 'needs_correction' | 'pending_review' | 'encrypted';
  previewUrl?: string;
  confidenceScore?: 'high' | 'medium' | 'low';
}

export interface CheckInState {
  frequencyDays: number; // e.g. 30, 60, 90
  gracePeriodDays: number; // e.g. 7, 14, 30
  lastCheckInDate: string;
  nextCheckInDate: string;
  streakDays: number;
  unresolvedAlerts: number;
  totalConfirmations: number;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  escalationEnabled: boolean;
  escalationStatus: 'normal' | 'reminder_sent' | 'grace_period' | 'verification' | 'review' | 'release_ready' | 'paused';
  pauseReason?: string;
  pauseExpiresAt?: string;
}

export interface CheckInLog {
  id: string;
  timestamp: string;
  channel: 'App Push' | 'Email' | 'SMS' | 'Manual Web';
  device: string;
  location: string;
  status: 'Confirmed' | 'Reminder Sent' | 'Missed but Recovered' | 'Escalation Alert';
  details?: string;
}

export interface TrusteeNominee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'Nominee' | 'Executor' | 'Professional Reviewer' | 'Trusted Contact';
  relationship: string;
  status: 'verified' | 'pending' | 'revoked';
  allocatedAssetsCount: number;
  lastActive: string;
  permissionTemplate: 'standard' | 'limited' | 'full';
  avatar?: string;
  notes?: string;
  invitationCode?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actorRole: string;
  context: string;
  result: 'Success' | 'Failed' | 'Warning' | 'Encrypted';
  details?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'security' | 'check_in' | 'people' | 'documents' | 'system';
  severity: 'info' | 'warning' | 'critical' | 'success';
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface SupportTicketMessage {
  id: string;
  sender: 'user' | 'agent';
  senderName: string;
  timestamp: string;
  text: string;
  attachment?: {
    name: string;
    size: string;
    isEncrypted: boolean;
  };
}

export interface SupportTicket {
  id: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Open' | 'Resolved' | 'Escalated';
  createdAt: string;
  lastActivity: string;
  assignedAgent: {
    name: string;
    initials: string;
    role: string;
  };
  messages: SupportTicketMessage[];
}

export interface ClaimDossier {
  caseId: string;
  preparedDate: string;
  status: 'Ready for Review' | 'In Verification' | 'Approved' | 'Released';
  claimantName: string;
  claimantRole: string;
  claimantEmail: string;
  claimantPhone: string;
  items: {
    institution: string;
    type: string;
    identifier: string;
    status: 'Verified' | 'Pending' | 'Action Required';
    logoIcon: string;
    nextSteps: string[];
    phone?: string;
    portalUrl?: string;
  }[];
  requiredApprovals: {
    current: number;
    required: number;
    pendingSignatures: string[];
  };
}
