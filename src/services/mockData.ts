import {
  VaultRecord,
  CheckInState,
  CheckInLog,
  TrusteeNominee,
  AuditLogItem,
  NotificationItem,
  SupportTicket,
  ClaimDossier,
  UserProfile
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-001',
  name: 'Eleanor Vance',
  email: 'eleanor.vance@legacylock.vault',
  role: 'owner',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  tier: 'Platinum',
  mfaEnabled: true,
  passkeyEnabled: true,
  recoveryKitGenerated: true,
  emergencyPhone: '+1 (555) 389-9921',
  country: 'United States'
};

export const INITIAL_NOMINEE_USER: UserProfile = {
  id: 'nom-001',
  name: 'Robert Vance (Nominee)',
  email: 'robert.vance@familygroup.org',
  role: 'nominee',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  tier: 'Standard',
  mfaEnabled: true,
  passkeyEnabled: true,
  recoveryKitGenerated: false,
  country: 'United States'
};

export const INITIAL_EXECUTOR_USER: UserProfile = {
  id: 'exe-001',
  name: 'Robert Sterling, Esq.',
  email: 'robert.sterling@sterlinglaw.com',
  role: 'executor',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  tier: 'Platinum',
  mfaEnabled: true,
  passkeyEnabled: true,
  recoveryKitGenerated: true,
  country: 'United States'
};

export const INITIAL_VAULT_RECORDS: VaultRecord[] = [
  {
    id: 'vlt-001',
    title: 'Chase Premier Savings',
    category: 'bank',
    institution: 'JPMorgan Chase Bank',
    accountType: 'Savings Account',
    identifierMasked: '•••• •••• 4092',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'nom-001',
    assignedNomineeName: 'Robert Vance',
    claimGuidance: 'Contact the Downtown Metro branch. Provide government ID and the verified consensus claim dossier.',
    statementLocation: 'Digital (Chase Online Portal)',
    advisorName: 'Marcus Thorne',
    advisorContact: '+1-800-935-9935',
    createdAt: '2024-01-15',
    updatedAt: '2024-10-20',
    completionPercent: 100,
    isEncrypted: true,
    valueEstimate: '$124,500',
    visibilityRule: 'post_mortem',
    status: 'verified',
    attachedDocuments: [
      {
        id: 'doc-101',
        name: 'Chase_Account_Statement_Q3.pdf',
        size: '2.4 MB',
        type: 'pdf',
        category: 'Financial',
        uploadDate: '2024-10-18',
        isEncrypted: true,
        status: 'verified',
        confidenceScore: 'high'
      }
    ]
  },
  {
    id: 'vlt-002',
    title: 'Vanguard Total Stock Market ETF',
    category: 'investment',
    institution: 'Vanguard Brokerage',
    accountType: 'Investment Brokerage / Mutual Fund',
    identifierMasked: '•••• •••• 9102',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'nom-001',
    assignedNomineeName: 'Robert Vance',
    claimGuidance: 'Submit transfer of asset documentation via Vanguard Institutional Succession Gateway with Estate Case LL-9982-AX.',
    statementLocation: 'Digital (Vanguard Portal)',
    advisorName: 'Sarah Jenkins, CFP',
    advisorContact: 'advisor@vanguard.com',
    createdAt: '2024-02-10',
    updatedAt: '2024-10-18',
    completionPercent: 100,
    isEncrypted: true,
    valueEstimate: '$345,000',
    visibilityRule: 'post_mortem',
    status: 'verified'
  },
  {
    id: 'vlt-003',
    title: 'Ledger Cold Storage Discovery',
    category: 'crypto',
    institution: 'Self-Custody Hardware (Ledger Nano X)',
    accountType: 'Ethereum & Bitcoin Discovery Metadata',
    identifierMasked: '0x71A...98Fd',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'nom-001',
    assignedNomineeName: 'Robert Vance',
    claimGuidance: 'Hardware key stored in primary home safe deposit capsule #102. Never store private seed words online; discovery coordinates only.',
    statementLocation: 'Physical Safe / Vault Box #102',
    createdAt: '2024-03-01',
    updatedAt: '2024-10-05',
    completionPercent: 100,
    isEncrypted: true,
    valueEstimate: '3.4 BTC / 24 ETH',
    visibilityRule: 'post_mortem',
    status: 'verified'
  },
  {
    id: 'vlt-004',
    title: 'Acme Life Term Insurance Policy',
    category: 'insurance',
    institution: 'Acme Life & Casualty',
    accountType: 'Term Life Insurance ($1.5M)',
    identifierMasked: 'POL-••••-8819',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'nom-001',
    assignedNomineeName: 'Robert Vance',
    claimGuidance: 'Official death certificate and nominee ID proof required for policy claim settlement.',
    statementLocation: 'Physical Red Filing Cabinet / Cloud PDF',
    advisorName: 'David Miller',
    advisorContact: '+1 (555) 782-9011',
    createdAt: '2024-04-12',
    updatedAt: '2024-09-12',
    completionPercent: 85,
    isEncrypted: true,
    valueEstimate: '$1,500,000 Death Benefit',
    visibilityRule: 'post_mortem',
    status: 'verified'
  },
  {
    id: 'vlt-005',
    title: 'Google Photos & iCloud Legacy Roadmap',
    category: 'digital',
    institution: 'Google LLC / Apple Inc.',
    accountType: 'Digital Cloud Archives & Photos',
    identifierMasked: 'e••••••@gmail.com',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'nom-001',
    assignedNomineeName: 'Robert Vance',
    claimGuidance: 'Inactive Account Manager is configured with trusted contact email. See attached instructions for token redemption.',
    statementLocation: 'Google Inactive Account Settings',
    createdAt: '2024-05-19',
    updatedAt: '2024-10-19',
    completionPercent: 90,
    isEncrypted: true,
    visibilityRule: 'metadata_visible',
    status: 'verified'
  },
  {
    id: 'vlt-006',
    title: 'Master Family Trust & Last Will',
    category: 'legal',
    institution: 'Sterling & Associates LLP',
    accountType: 'Revocable Living Trust Document',
    identifierMasked: 'TRST-2023-VANCE',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'exe-001',
    assignedNomineeName: 'Robert Sterling, Esq.',
    claimGuidance: 'Execute under the jurisdiction of King County Probate Court. Original notarized copy in Sterling Law vault.',
    statementLocation: 'Sterling Law Vault / Encrypted PDF',
    advisorName: 'Robert Sterling, Esq.',
    advisorContact: 'robert.sterling@sterlinglaw.com',
    createdAt: '2023-10-12',
    updatedAt: '2024-10-21',
    completionPercent: 100,
    isEncrypted: true,
    visibilityRule: 'post_mortem',
    status: 'verified'
  },
  {
    id: 'vlt-007',
    title: 'Primary Residence Property Deed',
    category: 'property',
    institution: 'County Land Registry',
    accountType: 'Real Estate Title & Deed',
    identifierMasked: 'PARCEL-992-10-A',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'nom-001',
    assignedNomineeName: 'Robert Vance',
    claimGuidance: 'Property title has survivorship clause. Submit death certificate to county registrar.',
    statementLocation: 'Home Fireproof Safe',
    createdAt: '2023-11-04',
    updatedAt: '2024-08-14',
    completionPercent: 100,
    isEncrypted: true,
    valueEstimate: '$820,000',
    visibilityRule: 'post_mortem',
    status: 'verified'
  },
  {
    id: 'vlt-008',
    title: 'Personal Directives & Letters to Family',
    category: 'personal',
    institution: 'LegacyLock Enclave',
    accountType: 'Encrypted Personal Audio & Letters',
    identifierMasked: 'DIR-••••-FAMILY',
    nomineeStatus: 'Registered',
    assignedNomineeId: 'nom-001',
    assignedNomineeName: 'Robert Vance',
    claimGuidance: 'Final words of guidance, ethical legacy, and guidance on values for the children.',
    statementLocation: 'LegacyLock Encrypted Enclave',
    createdAt: '2024-06-01',
    updatedAt: '2024-10-01',
    completionPercent: 75,
    isEncrypted: true,
    visibilityRule: 'post_mortem',
    status: 'active'
  }
];

export const INITIAL_CHECKIN_STATE: CheckInState = {
  frequencyDays: 30,
  gracePeriodDays: 14,
  lastCheckInDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  nextCheckInDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 27).toISOString(), // in 27 days
  streakDays: 180,
  unresolvedAlerts: 0,
  totalConfirmations: 24,
  channels: {
    email: true,
    sms: true,
    push: true
  },
  escalationEnabled: true,
  escalationStatus: 'normal'
};

export const INITIAL_CHECKIN_LOGS: CheckInLog[] = [
  {
    id: 'chk-001',
    timestamp: 'Oct 24, 2024 • 09:41 AM UTC',
    channel: 'App Push',
    device: 'iPhone 15 Pro • iOS 18',
    location: 'San Francisco, CA (Region level)',
    status: 'Confirmed',
    details: 'Biometric biometric heartbeat check-in verified successfully.'
  },
  {
    id: 'chk-002',
    timestamp: 'Sep 24, 2024 • 10:15 AM UTC',
    channel: 'Email',
    device: 'MacBook Pro • macOS Sonoma',
    location: 'San Francisco, CA (Region level)',
    status: 'Confirmed',
    details: 'Magic token confirmed from verified primary device.'
  },
  {
    id: 'chk-003',
    timestamp: 'Aug 25, 2024 • 08:30 AM UTC',
    channel: 'SMS',
    device: 'iPhone 15 Pro',
    location: 'Location Masked',
    status: 'Missed but Recovered',
    details: 'Grace period notification resolved within 24 hours.'
  },
  {
    id: 'chk-004',
    timestamp: 'Jul 24, 2024 • 11:20 AM UTC',
    channel: 'Manual Web',
    device: 'Chrome on macOS',
    location: 'London, UK (Travel Mode)',
    status: 'Confirmed',
    details: 'Web session verified via passkey auth.'
  }
];

export const INITIAL_TRUSTEES: TrusteeNominee[] = [
  {
    id: 'trust-001',
    name: 'Robert Sterling, Esq.',
    email: 'robert.sterling@sterlinglaw.com',
    phone: '+1 (555) 892-1100',
    role: 'Executor',
    relationship: 'Legal Counsel',
    status: 'verified',
    allocatedAssetsCount: 8,
    lastActive: '2 days ago',
    permissionTemplate: 'full',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    notes: 'Primary legal representative holding probate authority.'
  },
  {
    id: 'trust-002',
    name: 'Robert Vance',
    email: 'robert.vance@familygroup.org',
    phone: '+1 (555) 774-3329',
    role: 'Nominee',
    relationship: 'Son / Primary Heir',
    status: 'verified',
    allocatedAssetsCount: 7,
    lastActive: 'Today',
    permissionTemplate: 'standard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    notes: 'Designated beneficiary for bank, property, and investment portfolios.'
  },
  {
    id: 'trust-003',
    name: 'Sarah Jenkins',
    email: 's.jenkins@compliancereview.org',
    phone: '+1 (555) 439-0021',
    role: 'Professional Reviewer',
    relationship: 'Fiduciary Compliance Officer',
    status: 'verified',
    allocatedAssetsCount: 8,
    lastActive: '5 days ago',
    permissionTemplate: 'limited',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    notes: 'Third-party auditor validating documentation against estate consensus protocols.'
  },
  {
    id: 'trust-004',
    name: 'Marcus Chen',
    email: 'marcus.chen@emergencycontact.io',
    phone: '+1 (555) 612-9900',
    role: 'Trusted Contact',
    relationship: 'Lifelong Friend',
    status: 'pending',
    allocatedAssetsCount: 0,
    lastActive: 'Never',
    permissionTemplate: 'limited',
    notes: 'Non-beneficiary safety contact receiving heartbeat alerts only.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-001',
    timestamp: 'Oct 28, 2024 • 14:32:30 UTC',
    action: 'Vault opened & records reviewed',
    actor: 'Eleanor Vance (Owner)',
    actorRole: 'Owner',
    context: 'Chrome on macOS • San Francisco, CA',
    result: 'Success'
  },
  {
    id: 'aud-002',
    timestamp: 'Oct 28, 2024 • 12:15:05 UTC',
    action: 'Asset updated: JPMorgan Chase Checking Details',
    actor: 'Eleanor Vance (Owner)',
    actorRole: 'Owner',
    context: 'Mobile App • San Francisco, CA',
    result: 'Encrypted'
  },
  {
    id: 'aud-003',
    timestamp: 'Oct 27, 2024 • 09:45:12 UTC',
    action: 'Unrecognized Device Authentication Challenge',
    actor: 'Unknown Hardware IP',
    actorRole: 'Unknown',
    context: 'Firefox on Windows • Unknown IP',
    result: 'Failed',
    details: 'Passkey challenge failed. Blocked by Zero-Knowledge Security Policy.'
  },
  {
    id: 'aud-004',
    timestamp: 'Oct 26, 2024 • 16:20:00 UTC',
    action: 'Continuity heart-beat ping scheduled',
    actor: 'Automated Inheritance Engine',
    actorRole: 'System Protocol',
    context: 'Internal Secure Enclave',
    result: 'Success'
  },
  {
    id: 'aud-005',
    timestamp: 'Oct 25, 2024 • 11:05:45 UTC',
    action: 'Trustee invitation verified & accepted: Robert Sterling, Esq.',
    actor: 'Robert Sterling (Executor)',
    actorRole: 'Executor',
    context: 'Safari on iOS • New York, NY',
    result: 'Success'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    title: 'Upcoming Presence Verification Check-in',
    description: 'Your next scheduled continuity check-in is due in 27 days. No immediate action required.',
    timestamp: '2 hours ago',
    category: 'check_in',
    severity: 'info',
    read: false,
    actionUrl: '/check-in-prompt',
    actionLabel: 'Check-in Now'
  },
  {
    id: 'notif-002',
    title: 'New Hardware Device Verified',
    description: 'Chrome browser on macOS was verified as a trusted device via passkey.',
    timestamp: '5 hours ago',
    category: 'security',
    severity: 'success',
    read: false,
    actionUrl: '/security-center',
    actionLabel: 'Review Device'
  },
  {
    id: 'notif-003',
    title: 'Trustee Protocol Confirmed',
    description: 'Robert Sterling, Esq. accepted executor responsibilities under consensus rules.',
    timestamp: 'Yesterday',
    category: 'people',
    severity: 'info',
    read: true,
    actionUrl: '/trustees',
    actionLabel: 'Manage Access'
  },
  {
    id: 'notif-004',
    title: 'Document Retention Review',
    description: "Your 'Master Family Trust PDF' has completed its annual cryptographic audit.",
    timestamp: '2 days ago',
    category: 'documents',
    severity: 'info',
    read: true,
    actionUrl: '/document-vault',
    actionLabel: 'View Audit'
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TK-8829',
    title: 'Question regarding Estate Consensus Protocols & KYC Verification',
    category: 'Security & Access Control',
    status: 'In Progress',
    createdAt: 'Oct 24, 2024',
    lastActivity: '2 hours ago',
    assignedAgent: {
      name: 'Sarah Jenkins',
      initials: 'SJ',
      role: 'Compliance Officer'
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        senderName: 'Eleanor Vance',
        timestamp: 'Oct 24, 10:15 AM',
        text: 'I want to verify how the nominee claim guidance works when multiple institutions are listed. Will my executor receive the claim packets sequentially or simultaneously once consensus triggers?'
      },
      {
        id: 'msg-2',
        sender: 'agent',
        senderName: 'Sarah Jenkins',
        timestamp: 'Oct 24, 10:45 AM',
        text: 'Hello Eleanor. Under our verified consensus trigger framework, once the continuity protocol is authorized and validated, each institution receives an independently watermarked and encrypted claim preparation dossier specific to that institution.'
      },
      {
        id: 'msg-3',
        sender: 'user',
        senderName: 'Eleanor Vance',
        timestamp: '2 hours ago',
        text: 'That is clear and reassuring. I have also uploaded the updated affidavit.',
        attachment: {
          name: 'Affidavit_of_Succession_2024.pdf',
          size: '1.8 MB',
          isEncrypted: true
        }
      }
    ]
  }
];

export const INITIAL_CLAIM_DOSSIER: ClaimDossier = {
  caseId: 'LL-9982-AX',
  preparedDate: 'Oct 24, 2024',
  status: 'Ready for Review',
  claimantName: 'Robert Vance',
  claimantRole: 'Designated Heir / Nominee',
  claimantEmail: 'robert.vance@familygroup.org',
  claimantPhone: '+1 (555) 774-3329',
  items: [
    {
      institution: 'JPMorgan Chase Bank',
      type: 'Checking & Savings Accounts',
      identifier: '•••• •••• 4092',
      status: 'Verified',
      logoIcon: 'account_balance',
      phone: '1-800-935-9935',
      portalUrl: 'https://chase.com/estate-services',
      nextSteps: [
        'Present the certified claim preparation dossier to Estate Services division',
        'Provide official death certificate copy',
        'Verify identity using government ID (Driver License or Passport)'
      ]
    },
    {
      institution: 'Vanguard Brokerage',
      type: 'Investment Brokerage Portfolio',
      identifier: '•••• •••• 9102',
      status: 'Verified',
      logoIcon: 'trending_up',
      phone: '1-800-662-2739',
      portalUrl: 'https://vanguard.com/succession',
      nextSteps: [
        'Submit transfer of asset documentation via Vanguard Institutional Succession Gateway',
        'Reference Case LL-9982-AX during claimant verification'
      ]
    },
    {
      institution: 'Acme Life & Casualty',
      type: 'Term Life Insurance ($1.5M)',
      identifier: 'POL-••••-8819',
      status: 'Action Required',
      logoIcon: 'health_and_safety',
      phone: '1-800-555-0199',
      portalUrl: 'https://acmelife.com/claims',
      nextSteps: [
        'Submit claimant statement form #CLM-402',
        'Attach certified death certificate'
      ]
    }
  ],
  requiredApprovals: {
    current: 1,
    required: 2,
    pendingSignatures: ['Sarah Jenkins (Fiduciary Compliance)']
  }
};
