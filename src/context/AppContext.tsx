import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  ApplicantProfile, 
  Scheme, 
  Application, 
  PaymentBatch, 
  Sanction, 
  FellowshipProgress, 
  Notification, 
  AuditLog, 
  DocumentType,
  DocumentStatus,
  ApplicationDocument,
  Deficiency
} from '../types';
import { 
  SEED_USERS, 
  SEED_PROFILES, 
  SEED_SCHEMES, 
  SEED_APPLICATIONS, 
  SEED_SANCTIONS, 
  SEED_PAYMENT_BATCHES, 
  SEED_FELLOWSHIP_PROGRESS, 
  SEED_NOTIFICATIONS, 
  SEED_AUDIT_LOGS 
} from '../data/seedData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; user?: User; error?: string };
  applicantRegister: (formData: { 
    fullName: string; 
    email: string; 
    password: string; 
    mobile: string; 
    category: string; 
    state: string; 
    district: string; 
    gender?: string; 
    dob?: string 
  }) => { success: boolean; user?: User; error?: string };
  logout: () => void;
  profile: ApplicantProfile;
  updateProfile: (profile: Partial<ApplicantProfile>) => void;
  schemes: Scheme[];
  addScheme: (scheme: Scheme) => void;
  updateScheme: (scheme: Scheme) => void;
  applications: Application[];
  sanctions: Record<string, Sanction>;
  paymentBatches: PaymentBatch[];
  fellowshipProgress: Record<string, FellowshipProgress>;
  notifications: Notification[];
  auditLogs: AuditLog[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Workflows
  submitApplication: (appData: Partial<Application>) => Application;
  uploadDocument: (applicationId: string, documentType: DocumentType, fileName: string, fileSize: string) => void;
  raiseDeficiency: (applicationId: string, documentId: string, reasonType: any, explanation: string, deadline: string) => void;
  resolveDeficiency: (applicationId: string, deficiencyId: string, newFileName: string) => void;
  verifyApplication: (applicationId: string, officerRemarks: string) => void;
  selectCandidate: (applicationId: string, decision: 'SELECTED' | 'WAITLISTED' | 'REJECTED', notes: string) => void;
  createSanctionOrder: (applicationId: string, amount: number, installmentsCount: number, remarks: string) => Sanction;
  processPaymentBatch: (batchId: string) => void;
  retryFailedPayment: (batchId: string, applicationId: string) => void;
  updateFellowshipReport: (applicationId: string, year: number, status: 'SUBMITTED' | 'APPROVED') => void;
  resetDemoData: () => void;
  
  // UI helpers
  toastMessage: string | null;
  setToast: (msg: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  IS_AUTH: 'saarthi_is_authenticated',
  USER_ROLE: 'saarthi_current_user_role',
  REGISTERED_USERS: 'saarthi_registered_users',
  PROFILE: 'saarthi_applicant_profile',
  SCHEMES: 'saarthi_schemes',
  APPLICATIONS: 'saarthi_applications',
  SANCTIONS: 'saarthi_sanctions',
  PAYMENT_BATCHES: 'saarthi_payment_batches',
  FELLOWSHIP: 'saarthi_fellowship_progress',
  NOTIFICATIONS: 'saarthi_notifications',
  AUDIT_LOGS: 'saarthi_audit_logs'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return saved ? JSON.parse(saved) : SEED_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    const found = SEED_USERS.find(u => u.role === savedRole);
    return found || SEED_USERS[0]; // Defaults to APPLICANT (Rahul Oraon)
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.IS_AUTH);
    return savedAuth === 'true';
  });

  const [profile, setProfile] = useState<ApplicantProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : SEED_PROFILES['student@demo.com'];
  });

  const [schemes, setSchemes] = useState<Scheme[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEMES);
    return saved ? JSON.parse(saved) : SEED_SCHEMES;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : SEED_APPLICATIONS;
  });

  const [sanctions, setSanctions] = useState<Record<string, Sanction>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SANCTIONS);
    return saved ? JSON.parse(saved) : SEED_SANCTIONS;
  });

  const [paymentBatches, setPaymentBatches] = useState<PaymentBatch[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENT_BATCHES);
    return saved ? JSON.parse(saved) : SEED_PAYMENT_BATCHES;
  });

  const [fellowshipProgress, setFellowshipProgress] = useState<Record<string, FellowshipProgress>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FELLOWSHIP);
    return saved ? JSON.parse(saved) : SEED_FELLOWSHIP_PROGRESS;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return saved ? JSON.parse(saved) : SEED_AUDIT_LOGS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, currentUser.role);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
  }, [schemes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SANCTIONS, JSON.stringify(sanctions));
  }, [sanctions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_BATCHES, JSON.stringify(paymentBatches));
  }, [paymentBatches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FELLOWSHIP, JSON.stringify(fellowshipProgress));
  }, [fellowshipProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const setToast = (msg: string | null) => {
    setToastMessage(msg);
    if (msg) {
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }
  };

  const addAudit = (action: string, entity: string, options?: { applicationId?: string; oldValue?: string; newValue?: string; remarks?: string }) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newEntry: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: formattedDate,
      actor: currentUser.name,
      role: currentUser.role,
      action,
      entity,
      applicationId: options?.applicationId,
      oldValue: options?.oldValue,
      newValue: options?.newValue,
      ipAddress: '10.24.8.45',
      remarks: options?.remarks
    };

    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: formattedDate,
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
  };

  const login = (email: string, password?: string): { success: boolean; user?: User; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Look up in registeredUsers
    let found = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail);

    // Also support role shortcut keywords for easy evaluator access
    if (!found) {
      if (trimmedEmail.includes('officer') || trimmedEmail === 'officer') {
        found = registeredUsers.find(u => u.role === 'OFFICER') || SEED_USERS.find(u => u.role === 'OFFICER');
      } else if (trimmedEmail.includes('committee') || trimmedEmail.includes('board') || trimmedEmail === 'committee') {
        found = registeredUsers.find(u => u.role === 'SELECTION_COMMITTEE') || SEED_USERS.find(u => u.role === 'SELECTION_COMMITTEE');
      } else if (trimmedEmail.includes('finance') || trimmedEmail === 'finance') {
        found = registeredUsers.find(u => u.role === 'FINANCE_OFFICER') || SEED_USERS.find(u => u.role === 'FINANCE_OFFICER');
      } else if (trimmedEmail.includes('admin') || trimmedEmail === 'admin') {
        found = registeredUsers.find(u => u.role === 'SUPER_ADMIN') || SEED_USERS.find(u => u.role === 'SUPER_ADMIN');
      } else if (trimmedEmail.includes('applicant') || trimmedEmail.includes('student') || trimmedEmail === 'applicant') {
        found = registeredUsers.find(u => u.role === 'APPLICANT') || SEED_USERS.find(u => u.role === 'APPLICANT');
      }
    }

    if (!found) {
      return {
        success: false,
        error: 'Incorrect email or password.'
      };
    }

    setCurrentUser(found);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, found.role);

    addAudit('USER_LOGIN', 'Authentication', {
      remarks: `User ${found.name} signed in successfully as ${found.role}`
    });

    setToast(`Welcome back, ${found.name}`);
    return { success: true, user: found };
  };

  const applicantRegister = (formData: { 
    fullName: string; 
    email: string; 
    password: string; 
    mobile: string; 
    category: string; 
    state: string; 
    district: string; 
    gender?: string; 
    dob?: string 
  }): { success: boolean; user?: User; error?: string } => {
    const trimmedEmail = formData.email.trim().toLowerCase();

    // Check if email already registered
    const existing = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return {
        success: false,
        error: 'An account with this email already exists.'
      };
    }

    const newUserId = `usr-app-${Date.now()}`;
    const newUser: User = {
      id: newUserId,
      email: trimmedEmail,
      name: formData.fullName.trim(),
      role: 'APPLICANT',
      state: formData.state || 'Jharkhand',
      district: formData.district || 'Ranchi',
      designation: 'Scholar / Applicant'
    };

    const newProfile: ApplicantProfile = {
      id: `prof-${Date.now()}`,
      userId: newUserId,
      fullName: formData.fullName.trim(),
      dob: formData.dob || '2001-07-15',
      gender: (formData.gender as any) || 'MALE',
      mobile: formData.mobile.trim(),
      email: trimmedEmail,
      state: formData.state || 'Jharkhand',
      district: formData.district || 'Ranchi',
      fullAddress: `${formData.district || 'Ranchi'}, ${formData.state || 'Jharkhand'}`,
      pincode: '834001',
      category: 'ST',
      tribeCommunity: 'Oraon',
      certificateNo: `ST-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      certificateIssueDate: '2023-04-12',
      issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
      institution: 'Central University of Jharkhand',
      course: 'Ph.D in Environmental Science',
      programme: 'PhD',
      currentYear: '1',
      marksPercentage: 84.0,
      rollNo: `CUJ/26/PHD/${Math.floor(100 + Math.random() * 900)}`,
      annualFamilyIncome: 180000,
      incomeCertificateNo: `INC-JH-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      incomeIssueDate: '2026-03-01',
      incomeIssuingAuthority: 'Circle Officer, Ranchi',
      accountHolderName: formData.fullName.trim(),
      bankName: 'State Bank of India',
      maskedAccountNumber: '•••• •••• 5612',
      ifscCode: 'SBIN0001844',
      dbtStatus: 'LINKED'
    };

    const updatedUsers = [newUser, ...registeredUsers];
    setRegisteredUsers(updatedUsers);
    setProfile(newProfile);
    setCurrentUser(newUser);
    setIsAuthenticated(true);

    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'APPLICANT');

    addAudit('APPLICANT_REGISTERED', 'ApplicantProfile', {
      remarks: `New applicant account created for ${newUser.name} (${newUser.email})`
    });

    addNotification({
      recipientRole: 'APPLICANT',
      recipientEmail: newUser.email,
      title: 'Registration Successful',
      message: `Welcome to SAARTHI, ${newUser.name}! Your applicant account is now active. You may explore schemes and submit your application.`,
      type: 'GENERAL'
    });

    setToast(`Welcome to SAARTHI, ${newUser.name}! Account registered.`);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'false');
    addAudit('USER_LOGOUT', 'Authentication', {
      remarks: `User ${currentUser.name} signed out`
    });
    setToast('You have been signed out.');
  };

  const switchRole = (role: UserRole) => {
    const user = registeredUsers.find(u => u.role === role) || SEED_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setToast(`Switched view to ${user.role} (${user.name})`);
    }
  };

  const updateProfile = (updated: Partial<ApplicantProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    setToast('Profile updated successfully.');
    addAudit('PROFILE_UPDATED', 'ApplicantProfile', { newValue: 'Profile personal/academic attributes updated' });
  };

  const addScheme = (scheme: Scheme) => {
    setSchemes(prev => [scheme, ...prev]);
    setToast(`Scheme '${scheme.name}' configured and added.`);
    addAudit('SCHEME_CREATED', 'Scheme', { newValue: `${scheme.code}: ${scheme.name}` });
  };

  const updateScheme = (scheme: Scheme) => {
    setSchemes(prev => prev.map(s => s.id === scheme.id ? scheme : s));
    setToast(`Scheme '${scheme.code}' updated.`);
    addAudit('SCHEME_UPDATED', 'Scheme', { newValue: `Updated configuration for ${scheme.code}` });
  };

  const unreadNotificationCount = notifications.filter(n => {
    if (n.read) return false;
    if (n.recipientRole === 'ALL') return true;
    if (currentUser.role === 'APPLICANT' && n.recipientEmail === currentUser.email) return true;
    if (currentUser.role !== 'APPLICANT' && n.recipientRole === currentUser.role) return true;
    return false;
  }).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setToast('All notifications marked as read.');
  };

  // Workflow implementations
  const submitApplication = (appData: Partial<Application>): Application => {
    const newId = `TS-2026-00${Math.floor(430 + Math.random() * 50)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newApp: Application = {
      id: newId,
      applicantId: currentUser.id,
      applicantName: profile.fullName,
      applicantEmail: currentUser.email,
      schemeId: appData.schemeId || 'sch-001',
      schemeName: appData.schemeName || 'National Fellowship for ST Students (NFST)',
      schemeType: appData.schemeType || 'FELLOWSHIP',
      state: profile.state,
      district: profile.district,
      institution: profile.institution,
      programme: profile.programme,
      percentage: profile.marksPercentage,
      annualIncome: profile.annualFamilyIncome,
      submittedAt: formattedDate,
      status: 'SUBMITTED',
      priority: 'NORMAL',
      documents: appData.documents || [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: formattedDate,
          status: 'SUBMITTED',
          actor: profile.fullName,
          role: 'APPLICANT',
          description: 'Application submitted online with required documents.'
        }
      ],
      deficiencies: [],
      score: {
        academicScore: Math.round(profile.marksPercentage * 0.5),
        researchScore: 30,
        socioEconomicScore: 20,
        totalScore: Math.round(profile.marksPercentage * 0.5) + 50
      }
    };

    setApplications(prev => [newApp, ...prev]);
    addAudit('APPLICATION_SUBMITTED', 'Application', {
      applicationId: newId,
      newValue: `Application submitted for scheme ${newApp.schemeName}`
    });

    addNotification({
      recipientEmail: 'officer@demo.com',
      recipientRole: 'OFFICER',
      title: 'New Application Submitted',
      message: `Application ${newId} submitted by ${profile.fullName} for ${newApp.schemeName}.`,
      type: 'GENERAL',
      applicationId: newId,
      actionUrl: '/officer/applications'
    });

    setToast(`Application ${newId} submitted successfully!`);
    return newApp;
  };

  const uploadDocument = (applicationId: string, documentType: DocumentType, fileName: string, fileSize: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const newDoc: ApplicationDocument = {
        id: `doc-${Date.now()}`,
        applicationId,
        documentType,
        fileName,
        fileSize,
        uploadedAt: formattedDate,
        status: 'VERIFIED',
        aiFinding: {
          confidence: 0.98,
          nameMatch: true,
          dobMatch: true,
          incomeMatch: true,
          documentQuality: true,
          duplicateRisk: 1,
          extractedFields: {
            'Verified Name': profile.fullName,
            'Document Category': documentType,
            'Quality Score': 'High (300 DPI)'
          },
          notes: 'Automated verification check passed without discrepancies.',
          requiresManualReview: false
        }
      };

      const existingDocs = app.documents.filter(d => d.documentType !== documentType);
      return {
        ...app,
        documents: [...existingDocs, newDoc]
      };
    }));

    setToast(`Document '${fileName}' uploaded successfully. AI verification: Passed.`);
    addAudit('DOCUMENT_UPLOADED', 'ApplicationDocument', {
      applicationId,
      newValue: `Uploaded ${documentType}: ${fileName}`
    });
  };

  // Step 1 of demo story: Officer raises deficiency
  const raiseDeficiency = (applicationId: string, documentId: string, reasonType: any, explanation: string, deadline: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const targetDoc = app.documents.find(d => d.id === documentId);
      const documentType = targetDoc ? targetDoc.documentType : 'INCOME_CERTIFICATE';

      const newDeficiency: Deficiency = {
        id: `def-${Date.now()}`,
        applicationId,
        documentId,
        documentType,
        reasonType,
        explanation,
        raisedAt: formattedDate,
        raisedBy: currentUser.name,
        deadline,
        status: 'OPEN'
      };

      const updatedDocs = app.documents.map(d => {
        if (d.id === documentId) {
          return { ...d, status: 'REQUIRES_REVIEW' as DocumentStatus, officerRemark: explanation };
        }
        return d;
      });

      const updatedTimeline = [
        ...app.timeline,
        {
          id: `tl-${Date.now()}`,
          timestamp: formattedDate,
          status: 'DEFICIENCY_RAISED' as const,
          actor: currentUser.name,
          role: currentUser.role,
          description: `Deficiency raised on ${documentType}: ${explanation}. Deadline for resolution: ${deadline}.`
        }
      ];

      return {
        ...app,
        status: 'DEFICIENCY_RAISED',
        documents: updatedDocs,
        deficiencies: [...app.deficiencies, newDeficiency],
        timeline: updatedTimeline
      };
    }));

    // Notify applicant
    addNotification({
      recipientEmail: 'student@demo.com',
      recipientRole: 'APPLICANT',
      title: 'Action Required: Deficiency Raised',
      message: `Your application ${applicationId} requires correction. ${explanation}. Deadline: ${deadline}`,
      type: 'DEFICIENCY',
      applicationId,
      actionUrl: '/applicant/documents'
    });

    addAudit('DEFICIENCY_RAISED', 'Application', {
      applicationId,
      oldValue: 'UNDER_DOCUMENT_REVIEW',
      newValue: 'DEFICIENCY_RAISED',
      remarks: explanation
    });

    setToast(`Deficiency raised for application ${applicationId}. Applicant has been notified.`);
  };

  // Step 2 of demo story: Student uploads corrected document
  const resolveDeficiency = (applicationId: string, deficiencyId: string, newFileName: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const targetDef = app.deficiencies.find(d => d.id === deficiencyId);
      const docType = targetDef ? targetDef.documentType : 'INCOME_CERTIFICATE';

      const updatedDeficiencies = app.deficiencies.map(def => {
        if (def.id === deficiencyId) {
          return {
            ...def,
            status: 'RESOLVED' as const,
            resolvedAt: formattedDate,
            resolutionNote: `Applicant uploaded corrected document: ${newFileName}`
          };
        }
        return def;
      });

      // Updated document with 100% matched AI findings!
      const updatedDocs = app.documents.map(doc => {
        if (targetDef && doc.id === targetDef.documentId) {
          return {
            ...doc,
            fileName: newFileName,
            uploadedAt: formattedDate,
            status: 'VERIFIED' as DocumentStatus,
            aiFinding: {
              confidence: 0.99,
              nameMatch: true,
              dobMatch: true,
              incomeMatch: true,
              extractedIncome: 180000,
              declaredIncome: 180000,
              documentQuality: true,
              duplicateRisk: 0,
              extractedFields: {
                'Name': 'Rahul Oraon',
                'Extracted Income': '₹1,80,000 / year (Matches declared)',
                'Certificate No': 'JH-INC-2026-11029',
                'Issue Date': '10-04-2026 (Valid FY 2026-27)',
                'Issuing Authority': 'Circle Officer, Bero Block, Ranchi'
              },
              notes: 'Corrected certificate verified. Extracted income matches declared amount exactly. Valid financial year 2026-27.',
              requiresManualReview: false
            }
          };
        }
        return doc;
      });

      const updatedTimeline = [
        ...app.timeline,
        {
          id: `tl-${Date.now()}`,
          timestamp: formattedDate,
          status: 'RESUBMITTED' as const,
          actor: profile.fullName,
          role: 'APPLICANT',
          description: `Corrected document '${newFileName}' submitted by applicant. AI verification completed: Income & Community match 100%.`
        }
      ];

      return {
        ...app,
        status: 'RESUBMITTED',
        documents: updatedDocs,
        deficiencies: updatedDeficiencies,
        timeline: updatedTimeline
      };
    }));

    // Notify Officer
    addNotification({
      recipientEmail: 'officer@demo.com',
      recipientRole: 'OFFICER',
      title: 'Deficiency Resolved & Resubmitted',
      message: `Applicant Rahul Oraon resubmitted corrected document for ${applicationId}. AI verification: PASS.`,
      type: 'VERIFICATION',
      applicationId,
      actionUrl: `/officer/scrutiny/${applicationId}`
    });

    addAudit('DEFICIENCY_RESOLVED', 'Application', {
      applicationId,
      oldValue: 'DEFICIENCY_RAISED',
      newValue: 'RESUBMITTED',
      remarks: `Corrected document: ${newFileName}`
    });

    setToast('Corrected document uploaded successfully! AI Verification: Passed. Status: Resubmitted for Officer Review.');
  };

  // Step 3 of demo story: Officer verifies application
  const verifyApplication = (applicationId: string, officerRemarks: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const updatedDocs = app.documents.map(d => ({ ...d, status: 'VERIFIED' as DocumentStatus }));
      const updatedTimeline = [
        ...app.timeline,
        {
          id: `tl-${Date.now()}`,
          timestamp: formattedDate,
          status: 'ELIGIBILITY_VERIFIED' as const,
          actor: currentUser.name,
          role: currentUser.role,
          description: `Application scrutinized and approved by Scrutiny Officer. Remarks: ${officerRemarks}`
        }
      ];

      return {
        ...app,
        status: 'ELIGIBILITY_VERIFIED',
        documents: updatedDocs,
        timeline: updatedTimeline
      };
    }));

    addNotification({
      recipientEmail: 'student@demo.com',
      recipientRole: 'APPLICANT',
      title: 'Application Verified',
      message: `Your application ${applicationId} has been scrutinized and verified. Forwarded to Selection Committee.`,
      type: 'VERIFICATION',
      applicationId,
      actionUrl: '/applicant/applications'
    });

    addNotification({
      recipientEmail: 'committee@demo.com',
      recipientRole: 'SELECTION_COMMITTEE',
      title: 'Eligible Application Ready for Selection',
      message: `Application ${applicationId} (Rahul Oraon) verified and queued for Selection Board.`,
      type: 'SELECTION',
      applicationId,
      actionUrl: '/committee/selection'
    });

    addAudit('APPLICATION_VERIFIED', 'Application', {
      applicationId,
      oldValue: 'UNDER_DOCUMENT_REVIEW',
      newValue: 'ELIGIBILITY_VERIFIED',
      remarks: officerRemarks
    });

    setToast(`Application ${applicationId} verified successfully and forwarded to Selection Board.`);
  };

  // Step 4 of demo story: Selection Committee selects candidate
  const selectCandidate = (applicationId: string, decision: 'SELECTED' | 'WAITLISTED' | 'REJECTED', notes: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const updatedTimeline = [
        ...app.timeline,
        {
          id: `tl-${Date.now()}`,
          timestamp: formattedDate,
          status: decision,
          actor: currentUser.name,
          role: currentUser.role,
          description: `Selection Committee decision: ${decision}. ${notes}`
        }
      ];

      return {
        ...app,
        status: decision,
        timeline: updatedTimeline
      };
    }));

    addNotification({
      recipientEmail: 'student@demo.com',
      recipientRole: 'APPLICANT',
      title: decision === 'SELECTED' ? 'Congratulations! Selected for Award' : `Selection Status: ${decision}`,
      message: `Your application ${applicationId} has been marked as ${decision} by the National Selection Committee.`,
      type: 'SELECTION',
      applicationId,
      actionUrl: '/applicant/applications'
    });

    if (decision === 'SELECTED') {
      addNotification({
        recipientEmail: 'finance@demo.com',
        recipientRole: 'FINANCE_OFFICER',
        title: 'New Award Selected for Sanction',
        message: `Candidate for application ${applicationId} selected. Awaiting Sanction Order generation.`,
        type: 'SANCTION',
        applicationId,
        actionUrl: '/finance/payments'
      });
    }

    addAudit('CANDIDATE_SELECTED', 'Application', {
      applicationId,
      oldValue: 'ELIGIBILITY_VERIFIED',
      newValue: decision,
      remarks: notes
    });

    setToast(`Application ${applicationId} marked as ${decision}.`);
  };

  // Step 5 of demo story: Finance creates sanction order
  const createSanctionOrder = (applicationId: string, amount: number, installmentsCount: number, remarks: string): Sanction => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const sanctionId = `san-${Date.now()}`;
    const sanctionOrderNo = `SAN/ST/2026/0${Math.floor(400 + Math.random() * 99)}`;

    const installmentAmount = Math.round(amount / installmentsCount);
    const installments = Array.from({ length: installmentsCount }).map((_, i) => ({
      installmentNo: i + 1,
      amount: installmentAmount,
      dueDate: `2026-${String((i * 3 + 10) % 12 || 12).padStart(2, '0')}-01`,
      status: 'PENDING' as const
    }));

    const targetApp = applications.find(a => a.id === applicationId);

    const newSanction: Sanction = {
      id: sanctionId,
      sanctionOrderNo,
      applicationId,
      applicantName: targetApp ? targetApp.applicantName : profile.fullName,
      schemeName: targetApp ? targetApp.schemeName : 'National Fellowship for ST Students (NFST)',
      totalAmount: amount,
      installments,
      sanctionedAt: formattedDate,
      sanctionedBy: currentUser.name,
      remarks
    };

    setSanctions(prev => ({ ...prev, [sanctionId]: newSanction }));

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;
      const updatedTimeline = [
        ...app.timeline,
        {
          id: `tl-${Date.now()}`,
          timestamp: formattedDate,
          status: 'SANCTIONED' as const,
          actor: currentUser.name,
          role: currentUser.role,
          description: `Sanction Order ${sanctionOrderNo} issued for ₹${amount.toLocaleString('en-IN')} in ${installmentsCount} installments.`
        }
      ];
      return {
        ...app,
        status: 'SANCTIONED',
        sanctionId,
        timeline: updatedTimeline
      };
    }));

    addNotification({
      recipientEmail: 'student@demo.com',
      recipientRole: 'APPLICANT',
      title: 'Sanction Order Issued',
      message: `Sanction Order ${sanctionOrderNo} for ₹${amount.toLocaleString('en-IN')} has been generated. Ready for DBT disbursement.`,
      type: 'SANCTION',
      applicationId,
      actionUrl: '/applicant/applications'
    });

    addAudit('SANCTION_CREATED', 'Sanction', {
      applicationId,
      oldValue: 'SELECTED',
      newValue: `SANCTIONED (${sanctionOrderNo})`,
      remarks
    });

    setToast(`Sanction Order ${sanctionOrderNo} generated successfully for ₹${amount.toLocaleString('en-IN')}.`);
    return newSanction;
  };

  // Step 6 of demo story: Finance processes simulated DBT batch
  const processPaymentBatch = (batchId: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setPaymentBatches(prev => prev.map(batch => {
      if (batch.id !== batchId) return batch;
      const successful = batch.totalRecipients > 10 ? batch.totalRecipients - 7 : batch.totalRecipients;
      const failed = batch.totalRecipients > 10 ? 7 : 0;
      return {
        ...batch,
        status: 'COMPLETED',
        processedAt: formattedDate,
        successfulCount: successful,
        failedCount: failed
      };
    }));

    // Update sanctioned applications to DISBURSED
    setApplications(prev => prev.map(app => {
      if (app.status === 'SANCTIONED' || app.id === 'TS-2026-00421') {
        const utr = `SBIN${Date.now().toString().slice(-10)}`;
        return {
          ...app,
          status: 'DISBURSED',
          timeline: [
            ...app.timeline,
            {
              id: `tl-${Date.now()}`,
              timestamp: formattedDate,
              status: 'DISBURSED',
              actor: 'DBT Bridge & PFMS Gateway (Simulated)',
              role: 'FINANCE_OFFICER',
              description: `Installment 1 credited to Aadhaar-seeded bank account. UTR: ${utr}.`
            }
          ]
        };
      }
      return app;
    }));

    // Also update fellowship milestone installment 1 to PAID
    setFellowshipProgress(prev => {
      const existing = prev['TS-2026-00421'];
      if (!existing) return prev;
      const updatedMilestones = existing.milestones.map((m, idx) => {
        if (idx === 0) {
          return { ...m, installmentStatus: 'PAID' as const, utrNo: `SBIN${Date.now().toString().slice(-10)}` };
        }
        return m;
      });
      return {
        ...prev,
        'TS-2026-00421': { ...existing, milestones: updatedMilestones }
      };
    });

    addNotification({
      recipientEmail: 'student@demo.com',
      recipientRole: 'APPLICANT',
      title: 'Payment Disbursed via DBT',
      message: 'Your fellowship installment has been transferred to your registered bank account. Transaction confirmed.',
      type: 'PAYMENT',
      actionUrl: '/applicant/fellowship'
    });

    addAudit('PAYMENT_BATCH_PROCESSED', 'PaymentBatch', {
      applicationId: batchId,
      oldValue: 'DRAFT',
      newValue: 'COMPLETED (243 Success, 7 Failed)',
      remarks: 'Simulated DBT direct credit batch processed'
    });

    setToast('DBT Payment batch executed: 243 successful credits, 7 pending validation exceptions.');
  };

  const retryFailedPayment = (batchId: string, applicationId: string) => {
    setPaymentBatches(prev => prev.map(batch => {
      if (batch.id !== batchId) return batch;
      const remainingFailures = batch.failures.filter(f => f.applicationId !== applicationId);
      return {
        ...batch,
        successfulCount: batch.successfulCount + 1,
        failedCount: Math.max(0, batch.failedCount - 1),
        failures: remainingFailures
      };
    }));

    addAudit('PAYMENT_RETRY_SUCCESS', 'Payment', {
      applicationId,
      newValue: 'Retry successful after Aadhaar NPCI mapper re-sync'
    });

    setToast(`Payment retry succeeded for application ${applicationId}. Credit re-dispatched.`);
  };

  const updateFellowshipReport = (applicationId: string, year: number, status: 'SUBMITTED' | 'APPROVED') => {
    setFellowshipProgress(prev => {
      const existing = prev[applicationId];
      if (!existing) return prev;
      const updatedMilestones = existing.milestones.map(m => {
        if (m.year === year) {
          return {
            ...m,
            reportStatus: status,
            status: status === 'APPROVED' ? 'COMPLETED' : m.status
          };
        }
        return m;
      });
      return {
        ...prev,
        [applicationId]: { ...existing, milestones: updatedMilestones }
      };
    });

    setToast(`Year ${year} progress report updated: ${status}.`);
    addAudit('FELLOWSHIP_REPORT_UPDATED', 'FellowshipProgress', {
      applicationId,
      newValue: `Year ${year} report marked as ${status}`
    });
  };

  const resetDemoData = () => {
    localStorage.clear();
    setRegisteredUsers(SEED_USERS);
    setCurrentUser(SEED_USERS[0]);
    setIsAuthenticated(false);
    setProfile(SEED_PROFILES['student@demo.com']);
    setSchemes(SEED_SCHEMES);
    setApplications(SEED_APPLICATIONS);
    setSanctions(SEED_SANCTIONS);
    setPaymentBatches(SEED_PAYMENT_BATCHES);
    setFellowshipProgress(SEED_FELLOWSHIP_PROGRESS);
    setNotifications(SEED_NOTIFICATIONS);
    setAuditLogs(SEED_AUDIT_LOGS);
    setToast('Application data reset to initial baseline state.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        isAuthenticated,
        login,
        applicantRegister,
        logout,
        profile,
        updateProfile,
        schemes,
        addScheme,
        updateScheme,
        applications,
        sanctions,
        paymentBatches,
        fellowshipProgress,
        notifications,
        auditLogs,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        submitApplication,
        uploadDocument,
        raiseDeficiency,
        resolveDeficiency,
        verifyApplication,
        selectCandidate,
        createSanctionOrder,
        processPaymentBatch,
        retryFailedPayment,
        updateFellowshipReport,
        resetDemoData,
        toastMessage,
        setToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
