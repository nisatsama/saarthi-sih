export type UserRole = 
  | 'APPLICANT' 
  | 'OFFICER' 
  | 'SELECTION_COMMITTEE' 
  | 'FINANCE_OFFICER' 
  | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  state: string;
  district?: string;
  designation?: string;
}

export interface ApplicantProfile {
  id: string;
  userId: string;
  // Personal
  fullName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  mobile: string;
  email: string;
  state: string;
  district: string;
  fullAddress: string;
  pincode: string;
  
  // Tribal Identity
  category: 'ST';
  tribeCommunity: string;
  certificateNo: string;
  certificateIssueDate: string;
  issuingAuthority: string;
  
  // Education
  institution: string;
  course: string;
  programme: 'PhD' | 'MTech' | 'PostGraduate' | 'UnderGraduate';
  currentYear: string;
  marksPercentage: number;
  cgpa?: number;
  rollNo: string;
  
  // Financial
  annualFamilyIncome: number;
  incomeCertificateNo: string;
  incomeIssueDate: string;
  incomeIssuingAuthority: string;
  
  // Bank / DBT
  accountHolderName: string;
  bankName: string;
  maskedAccountNumber: string;
  ifscCode: string;
  dbtStatus: 'LINKED' | 'PENDING' | 'FAILED';
}

export type RuleOperator = 
  | 'EQUALS' 
  | 'NOT_EQUALS' 
  | 'GREATER_THAN' 
  | 'GREATER_THAN_EQUAL' 
  | 'LESS_THAN' 
  | 'LESS_THAN_EQUAL' 
  | 'IN' 
  | 'CONTAINS';

export interface SchemeRule {
  id: string;
  schemeId: string;
  field: string;
  fieldLabel: string;
  operator: RuleOperator;
  value: string | number | string[];
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ARRAY';
  errorMessage: string;
  active: boolean;
}

export type DocumentType = 
  | 'ST_CERTIFICATE' 
  | 'INCOME_CERTIFICATE' 
  | 'MARKSHEET' 
  | 'ADMISSION_PROOF' 
  | 'RESEARCH_PROPOSAL' 
  | 'BONAFIDE_CERTIFICATE'
  | 'BANK_PASSBOOK';

export interface RequiredDocument {
  id: string;
  schemeId: string;
  documentType: DocumentType;
  name: string;
  description: string;
  required: boolean;
  maxSizeBytes: number;
  allowedFormats: string[];
}

export interface SelectionCriterion {
  id: string;
  name: string;
  weightage: number; // e.g. 40
  description: string;
}

export interface Scheme {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'FELLOWSHIP' | 'SCHOLARSHIP';
  academicLevel: 'PhD' | 'PostGraduate' | 'UnderGraduate' | 'All';
  totalAmount: number;
  annualAmount: number;
  installments: number;
  startDate: string;
  endDate: string;
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
  rules: SchemeRule[];
  requiredDocuments: RequiredDocument[];
  selectionCriteria: SelectionCriterion[];
}

export type ApplicationStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'UNDER_AI_REVIEW' 
  | 'UNDER_DOCUMENT_REVIEW' 
  | 'DEFICIENCY_RAISED' 
  | 'RESUBMITTED' 
  | 'ELIGIBILITY_VERIFIED' 
  | 'SHORTLISTED' 
  | 'SELECTED' 
  | 'WAITLISTED' 
  | 'REJECTED' 
  | 'SANCTIONED' 
  | 'PAYMENT_PENDING' 
  | 'DISBURSED' 
  | 'COMPLETED';

export type DocumentStatus = 
  | 'UPLOADED' 
  | 'PROCESSING' 
  | 'VERIFIED' 
  | 'REQUIRES_REVIEW' 
  | 'REJECTED' 
  | 'REPLACED';

export interface DocumentVerificationFinding {
  confidence: number; // e.g. 0.94
  nameMatch: boolean;
  dobMatch?: boolean;
  incomeMatch?: boolean;
  extractedIncome?: number;
  declaredIncome?: number;
  documentQuality: boolean;
  duplicateRisk: number; // percentage
  extractedFields: Record<string, string | number>;
  notes: string;
  requiresManualReview: boolean;
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  documentType: DocumentType;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: DocumentStatus;
  aiFinding?: DocumentVerificationFinding;
  officerRemark?: string;
}

export interface Deficiency {
  id: string;
  applicationId: string;
  documentId: string;
  documentType: DocumentType;
  reasonType: 'MISSING_DOCUMENT' | 'INVALID_DOCUMENT' | 'INFORMATION_MISMATCH' | 'UNREADABLE_DOCUMENT' | 'OTHER';
  explanation: string;
  raisedAt: string;
  raisedBy: string;
  deadline: string;
  status: 'OPEN' | 'RESOLVED';
  resolvedAt?: string;
  resolutionNote?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  status: ApplicationStatus;
  actor: string;
  role: string;
  description: string;
}

export interface ApplicationScore {
  academicScore: number;
  researchScore: number;
  socioEconomicScore: number;
  totalScore: number;
  rank?: number;
}

export interface Application {
  id: string; // e.g. 'TS-2026-00421'
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  schemeId: string;
  schemeName: string;
  schemeType: 'FELLOWSHIP' | 'SCHOLARSHIP';
  state: string;
  district: string;
  institution: string;
  programme: string;
  percentage: number;
  annualIncome: number;
  submittedAt: string;
  status: ApplicationStatus;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  documents: ApplicationDocument[];
  timeline: TimelineEvent[];
  score?: ApplicationScore;
  deficiencies: Deficiency[];
  sanctionId?: string;
  paymentId?: string;
}

export interface SanctionInstallment {
  installmentNo: number;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'DISBURSED';
  disbursedDate?: string;
  utrNo?: string;
}

export interface Sanction {
  id: string;
  sanctionOrderNo: string; // e.g. 'SAN/ST/2026/0421'
  applicationId: string;
  applicantName: string;
  schemeName: string;
  totalAmount: number;
  installments: SanctionInstallment[];
  sanctionedAt: string;
  sanctionedBy: string;
  remarks: string;
}

export interface FailedPaymentReason {
  applicationId: string;
  applicantName: string;
  amount: number;
  reason: string;
}

export interface PaymentBatch {
  id: string; // 'DBT-DEMO-2026-001'
  name: string;
  schemeName: string;
  createdAt: string;
  processedAt?: string;
  totalRecipients: number;
  totalAmount: number;
  successfulCount: number;
  failedCount: number;
  status: 'DRAFT' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  failures: FailedPaymentReason[];
}

export interface FellowshipMilestone {
  year: number;
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  description: string;
  dueDate?: string;
  completionDate?: string;
  reportStatus?: 'NOT_SUBMITTED' | 'SUBMITTED' | 'APPROVED';
  installmentAmount?: number;
  installmentStatus?: 'PAID' | 'DUE' | 'UPCOMING';
  utrNo?: string;
}

export interface FellowshipProgress {
  applicationId: string;
  applicantName: string;
  schemeName: string;
  currentYear: number;
  totalYears: number;
  guideName: string;
  topic: string;
  milestones: FellowshipMilestone[];
}

export interface Notification {
  id: string;
  recipientEmail: string;
  recipientRole: UserRole | 'ALL';
  title: string;
  message: string;
  type: 'DEFICIENCY' | 'VERIFICATION' | 'SELECTION' | 'SANCTION' | 'PAYMENT' | 'GENERAL';
  applicationId?: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  entity: string;
  applicationId?: string;
  oldValue?: string;
  newValue?: string;
  ipAddress: string;
  remarks?: string;
}

export interface EligibilityResult {
  eligible: boolean;
  conditions: {
    rule: string;
    field: string;
    requiredValue: string | number | string[];
    actualValue: string | number | boolean | undefined;
    passed: boolean;
    message: string;
  }[];
}
