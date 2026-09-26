import { 
  User, 
  ApplicantProfile, 
  Scheme, 
  Application, 
  PaymentBatch, 
  Sanction, 
  FellowshipProgress, 
  Notification, 
  AuditLog 
} from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'usr-student-01',
    email: 'applicant@saarthi.demo',
    name: 'Rahul Oraon',
    role: 'APPLICANT',
    state: 'Jharkhand',
    district: 'Ranchi',
    designation: 'Research Scholar (PhD)'
  },
  {
    id: 'usr-student-02',
    email: 'student@demo.com',
    name: 'Rahul Oraon',
    role: 'APPLICANT',
    state: 'Jharkhand',
    district: 'Ranchi',
    designation: 'Research Scholar (PhD)'
  },
  {
    id: 'usr-officer-01',
    email: 'officer@saarthi.demo',
    name: 'Dr. Arvind Mahato',
    role: 'OFFICER',
    state: 'Jharkhand',
    district: 'Ranchi',
    designation: 'Scrutiny & Verification Officer'
  },
  {
    id: 'usr-officer-02',
    email: 'officer@demo.com',
    name: 'Dr. Arvind Mahato',
    role: 'OFFICER',
    state: 'Jharkhand',
    district: 'Ranchi',
    designation: 'Scrutiny & Verification Officer'
  },
  {
    id: 'usr-committee-01',
    email: 'selection@saarthi.demo',
    name: 'Prof. S. Soren',
    role: 'SELECTION_COMMITTEE',
    state: 'Odisha',
    district: 'Bhubaneswar',
    designation: 'Member Secretary, Selection Board'
  },
  {
    id: 'usr-committee-02',
    email: 'committee@demo.com',
    name: 'Prof. S. Soren',
    role: 'SELECTION_COMMITTEE',
    state: 'Odisha',
    district: 'Bhubaneswar',
    designation: 'Member Secretary, Selection Board'
  },
  {
    id: 'usr-finance-01',
    email: 'finance@saarthi.demo',
    name: 'K. Murmu',
    role: 'FINANCE_OFFICER',
    state: 'Central',
    designation: 'Senior Accounts Officer, DBT Division'
  },
  {
    id: 'usr-finance-02',
    email: 'finance@demo.com',
    name: 'K. Murmu',
    role: 'FINANCE_OFFICER',
    state: 'Central',
    designation: 'Senior Accounts Officer, DBT Division'
  },
  {
    id: 'usr-admin-01',
    email: 'admin@saarthi.demo',
    name: 'System Administrator',
    role: 'SUPER_ADMIN',
    state: 'Central',
    designation: 'System Architect & Administrator'
  },
  {
    id: 'usr-admin-02',
    email: 'admin@demo.com',
    name: 'System Administrator',
    role: 'SUPER_ADMIN',
    state: 'Central',
    designation: 'System Architect & Administrator'
  }
];

export const SEED_PROFILES: Record<string, ApplicantProfile> = {
  'applicant@saarthi.demo': {
    id: 'prof-rahul-01',
    userId: 'usr-student-01',
    fullName: 'Rahul Oraon',
    dob: '2000-08-14',
    gender: 'MALE',
    mobile: '+91 98765 43210',
    email: 'applicant@saarthi.demo',
    state: 'Jharkhand',
    district: 'Ranchi',
    fullAddress: 'Vill: Bero, PO: Bero, Dist: Ranchi, Jharkhand',
    pincode: '835202',
    category: 'ST',
    tribeCommunity: 'Oraon (Kurukh)',
    certificateNo: 'JH-ST-2023-884192',
    certificateIssueDate: '2023-04-12',
    issuingAuthority: 'Sub-Divisional Officer, Ranchi Sadar',
    institution: 'National Tribal Central University',
    course: 'Doctor of Philosophy (PhD) in Environmental Studies',
    programme: 'PhD',
    currentYear: 'Year 2 (2025-26)',
    marksPercentage: 68.4,
    cgpa: 7.4,
    rollNo: 'NTCU/ENV/PHD/2024/019',
    annualFamilyIncome: 180000,
    incomeCertificateNo: 'JH-INC-2026-11029',
    incomeIssueDate: '2026-04-10',
    incomeIssuingAuthority: 'Circle Officer, Bero Block, Ranchi',
    accountHolderName: 'Rahul Oraon',
    bankName: 'State Bank of India',
    maskedAccountNumber: '•••• •••• •••• 4092',
    ifscCode: 'SBIN0001234',
    dbtStatus: 'LINKED'
  },
  'student@demo.com': {
    id: 'prof-rahul-01',
    userId: 'usr-student-01',
    fullName: 'Rahul Oraon',
    dob: '2000-08-14',
    gender: 'MALE',
    mobile: '+91 98765 43210',
    email: 'student@demo.com',
    state: 'Jharkhand',
    district: 'Ranchi',
    fullAddress: 'Vill: Bero, PO: Bero, Dist: Ranchi, Jharkhand',
    pincode: '835202',
    category: 'ST',
    tribeCommunity: 'Oraon (Kurukh)',
    certificateNo: 'JH-ST-2023-884192',
    certificateIssueDate: '2023-04-12',
    issuingAuthority: 'Sub-Divisional Officer, Ranchi Sadar',
    institution: 'National Tribal Central University',
    course: 'Doctor of Philosophy (PhD) in Environmental Studies',
    programme: 'PhD',
    currentYear: 'Year 2 (2025-26)',
    marksPercentage: 68.4,
    cgpa: 7.4,
    rollNo: 'NTCU/ENV/PHD/2024/019',
    annualFamilyIncome: 180000,
    incomeCertificateNo: 'JH-INC-2026-11029',
    incomeIssueDate: '2026-04-10',
    incomeIssuingAuthority: 'Circle Officer, Bero Block, Ranchi',
    accountHolderName: 'Rahul Oraon',
    bankName: 'State Bank of India',
    maskedAccountNumber: '•••• •••• •••• 4092',
    ifscCode: 'SBIN0001234',
    dbtStatus: 'LINKED'
  }
};

export const SEED_SCHEMES: Scheme[] = [
  {
    id: 'sch-001',
    code: 'NFST-PHD',
    name: 'National Fellowship for ST Students (NFST)',
    description: 'Provides financial assistance to Scheduled Tribe students pursuing M.Phil and Ph.D. degrees in Sciences, Humanities and Social Sciences across UGC recognized universities.',
    type: 'FELLOWSHIP',
    academicLevel: 'PhD',
    totalAmount: 360000,
    annualAmount: 360000,
    installments: 4,
    startDate: '2026-01-01',
    endDate: '2026-11-30',
    status: 'PUBLISHED',
    rules: [
      {
        id: 'rule-01',
        schemeId: 'sch-001',
        field: 'category',
        fieldLabel: 'Social Category',
        operator: 'EQUALS',
        value: 'ST',
        dataType: 'STRING',
        errorMessage: 'Applicant must belong to the Scheduled Tribe (ST) category.',
        active: true
      },
      {
        id: 'rule-02',
        schemeId: 'sch-001',
        field: 'programme',
        fieldLabel: 'Degree Programme',
        operator: 'EQUALS',
        value: 'PhD',
        dataType: 'STRING',
        errorMessage: 'Applicant must be enrolled in a recognised PhD programme.',
        active: true
      },
      {
        id: 'rule-03',
        schemeId: 'sch-001',
        field: 'marksPercentage',
        fieldLabel: 'Post-Graduation Marks',
        operator: 'GREATER_THAN_EQUAL',
        value: 55,
        dataType: 'NUMBER',
        errorMessage: 'Minimum 55% marks required in Post-Graduation qualification.',
        active: true
      },
      {
        id: 'rule-04',
        schemeId: 'sch-001',
        field: 'annualFamilyIncome',
        fieldLabel: 'Annual Family Income Limit',
        operator: 'LESS_THAN_EQUAL',
        value: 600000,
        dataType: 'NUMBER',
        errorMessage: 'Annual parental/family income must not exceed ₹6,00,000.',
        active: true
      }
    ],
    requiredDocuments: [
      {
        id: 'req-01',
        schemeId: 'sch-001',
        documentType: 'ST_CERTIFICATE',
        name: 'ST Community Certificate',
        description: 'Digitally signed caste certificate issued by competent revenue authority.',
        required: true,
        maxSizeBytes: 5242880,
        allowedFormats: ['PDF', 'JPG', 'PNG']
      },
      {
        id: 'req-02',
        schemeId: 'sch-001',
        documentType: 'INCOME_CERTIFICATE',
        name: 'Income Certificate (Current Financial Year)',
        description: 'Valid income certificate issued by Circle Officer / Tehsildar / SDO.',
        required: true,
        maxSizeBytes: 5242880,
        allowedFormats: ['PDF', 'JPG', 'PNG']
      },
      {
        id: 'req-03',
        schemeId: 'sch-001',
        documentType: 'MARKSHEET',
        name: 'Post-Graduation Final Marksheet / Degree',
        description: 'Consolidated marksheet or provisional degree certificate.',
        required: true,
        maxSizeBytes: 5242880,
        allowedFormats: ['PDF', 'JPG', 'PNG']
      },
      {
        id: 'req-04',
        schemeId: 'sch-001',
        documentType: 'ADMISSION_PROOF',
        name: 'PhD Admission / Registration Letter',
        description: 'Official enrolment or admission letter with departmental stamp.',
        required: true,
        maxSizeBytes: 5242880,
        allowedFormats: ['PDF', 'JPG', 'PNG']
      },
      {
        id: 'req-05',
        schemeId: 'sch-001',
        documentType: 'RESEARCH_PROPOSAL',
        name: 'Synopsis / Research Proposal (Max 5 pages)',
        description: 'Detailed research framework approved by DRC or research guide.',
        required: true,
        maxSizeBytes: 10485760,
        allowedFormats: ['PDF']
      }
    ],
    selectionCriteria: [
      { id: 'crit-01', name: 'Academic Performance (PG Marks)', weightage: 40, description: 'Evaluation based on Post Graduate final percentage/CGPA' },
      { id: 'crit-02', name: 'Research Proposal & Feasibility', weightage: 35, description: 'Academic significance, methodology, relevance to tribal heritage/development' },
      { id: 'crit-03', name: 'Socio-Economic Need & Priority Groups', weightage: 25, description: 'Priority given to Particularly Vulnerable Tribal Groups (PVTGs) and remote regions' }
    ]
  },
  {
    id: 'sch-002',
    code: 'NOS-ST',
    name: 'National Overseas Scholarship for ST Students',
    description: 'Financial assistance to meritorious ST students for pursuing Master level courses, Ph.D. and Post-Doctoral research programmes abroad.',
    type: 'SCHOLARSHIP',
    academicLevel: 'PostGraduate',
    totalAmount: 1500000,
    annualAmount: 1500000,
    installments: 2,
    startDate: '2026-02-01',
    endDate: '2026-10-15',
    status: 'PUBLISHED',
    rules: [
      {
        id: 'rule-05',
        schemeId: 'sch-002',
        field: 'category',
        fieldLabel: 'Social Category',
        operator: 'EQUALS',
        value: 'ST',
        dataType: 'STRING',
        errorMessage: 'Applicant must belong to Scheduled Tribe (ST).',
        active: true
      },
      {
        id: 'rule-06',
        schemeId: 'sch-002',
        field: 'marksPercentage',
        fieldLabel: 'Minimum Academic Score',
        operator: 'GREATER_THAN_EQUAL',
        value: 60,
        dataType: 'NUMBER',
        errorMessage: 'Minimum 60% marks or equivalent grade required.',
        active: true
      },
      {
        id: 'rule-07',
        schemeId: 'sch-002',
        field: 'annualFamilyIncome',
        fieldLabel: 'Annual Family Income Limit',
        operator: 'LESS_THAN_EQUAL',
        value: 800000,
        dataType: 'NUMBER',
        errorMessage: 'Family income must not exceed ₹8,00,000 per annum.',
        active: true
      }
    ],
    requiredDocuments: [
      { id: 'req-06', schemeId: 'sch-002', documentType: 'ST_CERTIFICATE', name: 'ST Community Certificate', description: 'Certified ST certificate.', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] },
      { id: 'req-07', schemeId: 'sch-002', documentType: 'INCOME_CERTIFICATE', name: 'Income Certificate', description: 'Certified income certificate.', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] },
      { id: 'req-08', schemeId: 'sch-002', documentType: 'ADMISSION_PROOF', name: 'Unconditional Foreign University Offer Letter', description: 'Valid admission offer letter.', required: true, maxSizeBytes: 10485760, allowedFormats: ['PDF'] }
    ],
    selectionCriteria: [
      { id: 'crit-04', name: 'Global University QS Ranking', weightage: 50, description: 'Reputation of target international institution' },
      { id: 'crit-05', name: 'Undergraduate / PG Academic Merits', weightage: 30, description: 'Past academic track record' },
      { id: 'crit-06', name: 'Field of National Priority', weightage: 20, description: 'STEM, Healthcare, Agriculture, Indigenous Studies' }
    ]
  },
  {
    id: 'sch-003',
    code: 'TCE-ST',
    name: 'Top Class Education Scholarship for ST Students',
    description: 'Encourages ST students to study at premier notified institutes like IITs, IIMs, NITs, AIIMS, National Law Universities and premier central institutions.',
    type: 'SCHOLARSHIP',
    academicLevel: 'UnderGraduate',
    totalAmount: 250000,
    annualAmount: 250000,
    installments: 1,
    startDate: '2026-03-01',
    endDate: '2026-12-15',
    status: 'PUBLISHED',
    rules: [
      { id: 'rule-08', schemeId: 'sch-003', field: 'category', fieldLabel: 'Social Category', operator: 'EQUALS', value: 'ST', dataType: 'STRING', errorMessage: 'Applicant must be ST.', active: true },
      { id: 'rule-09', schemeId: 'sch-003', field: 'annualFamilyIncome', fieldLabel: 'Income Ceiling', operator: 'LESS_THAN_EQUAL', value: 600000, dataType: 'NUMBER', errorMessage: 'Income ceiling is ₹6,00,000.', active: true }
    ],
    requiredDocuments: [
      { id: 'req-09', schemeId: 'sch-003', documentType: 'ST_CERTIFICATE', name: 'ST Certificate', description: 'Proof of ST status', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] },
      { id: 'req-10', schemeId: 'sch-003', documentType: 'INCOME_CERTIFICATE', name: 'Income Certificate', description: 'Valid income document', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] },
      { id: 'req-11', schemeId: 'sch-003', documentType: 'ADMISSION_PROOF', name: 'Fee Receipt / Admission Letter', description: 'Notified institute fee receipt', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] }
    ],
    selectionCriteria: [
      { id: 'crit-07', name: 'Entrance Rank / Score', weightage: 60, description: 'JEE / NEET / CAT rank percentile' },
      { id: 'crit-08', name: 'Socio-economic Need', weightage: 40, description: 'Income brackets and backward district index' }
    ]
  },
  {
    id: 'sch-004',
    code: 'PMS-ST',
    name: 'Post-Matric Scholarship for ST Students',
    description: 'Centrally sponsored scheme providing financial support to ST students studying at post-matriculation or post-secondary stages.',
    type: 'SCHOLARSHIP',
    academicLevel: 'All',
    totalAmount: 75000,
    annualAmount: 75000,
    installments: 1,
    startDate: '2026-01-15',
    endDate: '2026-10-31',
    status: 'PUBLISHED',
    rules: [
      { id: 'rule-10', schemeId: 'sch-004', field: 'category', fieldLabel: 'Social Category', operator: 'EQUALS', value: 'ST', dataType: 'STRING', errorMessage: 'Applicant must be ST.', active: true },
      { id: 'rule-11', schemeId: 'sch-004', field: 'annualFamilyIncome', fieldLabel: 'Annual Income Ceiling', operator: 'LESS_THAN_EQUAL', value: 250000, dataType: 'NUMBER', errorMessage: 'Parental income cannot exceed ₹2,50,000.', active: true }
    ],
    requiredDocuments: [
      { id: 'req-12', schemeId: 'sch-004', documentType: 'ST_CERTIFICATE', name: 'ST Certificate', description: 'Government verified certificate', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF', 'JPG'] },
      { id: 'req-13', schemeId: 'sch-004', documentType: 'INCOME_CERTIFICATE', name: 'Income Certificate', description: 'Issued by competent officer', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF', 'JPG'] },
      { id: 'req-14', schemeId: 'sch-004', documentType: 'MARKSHEET', name: 'Previous Examination Marksheet', description: 'Class 12th or UG marksheet', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] }
    ],
    selectionCriteria: [
      { id: 'crit-09', name: 'Universal Entitlement', weightage: 100, description: 'Subject to meeting eligibility conditions and verification' }
    ]
  },
  {
    id: 'sch-005',
    code: 'TRCF-ST',
    name: 'Tribal Research & Cultural Documentation Fellowship',
    description: 'Promotes scholarly research into tribal dialects, oral traditions, customary rights, indigenous forest management, and ethnomedicine.',
    type: 'FELLOWSHIP',
    academicLevel: 'PhD',
    totalAmount: 280000,
    annualAmount: 280000,
    installments: 4,
    startDate: '2026-04-01',
    endDate: '2026-11-15',
    status: 'PUBLISHED',
    rules: [
      { id: 'rule-12', schemeId: 'sch-005', field: 'category', fieldLabel: 'Social Category', operator: 'EQUALS', value: 'ST', dataType: 'STRING', errorMessage: 'Must belong to ST community.', active: true },
      { id: 'rule-13', schemeId: 'sch-005', field: 'programme', fieldLabel: 'Academic Programme', operator: 'EQUALS', value: 'PhD', dataType: 'STRING', errorMessage: 'Enrolled in PhD or Post-Doctoral studies.', active: true }
    ],
    requiredDocuments: [
      { id: 'req-15', schemeId: 'sch-005', documentType: 'ST_CERTIFICATE', name: 'ST Certificate', description: 'Valid ST certificate', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] },
      { id: 'req-16', schemeId: 'sch-005', documentType: 'RESEARCH_PROPOSAL', name: 'Tribal Culture Synopsis', description: 'Detailed research framework', required: true, maxSizeBytes: 10485760, allowedFormats: ['PDF'] }
    ],
    selectionCriteria: [
      { id: 'crit-10', name: 'Relevance to Indigenous Knowledge Systems', weightage: 50, description: 'Focus on documenting endangered traditions' },
      { id: 'crit-11', name: 'Academic & Field Methodology', weightage: 50, description: 'Fieldwork rigor and ethical engagement with local communities' }
    ]
  }
];

export const SEED_APPLICATIONS: Application[] = [
  // Special Demo Story Application for Rahul Oraon
  {
    id: 'TS-2026-00421',
    applicantId: 'usr-student-01',
    applicantName: 'Rahul Oraon',
    applicantEmail: 'student@demo.com',
    schemeId: 'sch-001',
    schemeName: 'National Fellowship for ST Students (NFST)',
    schemeType: 'FELLOWSHIP',
    state: 'Jharkhand',
    district: 'Ranchi',
    institution: 'National Tribal Central University',
    programme: 'PhD',
    percentage: 68.4,
    annualIncome: 180000,
    submittedAt: '2026-09-24 11:30',
    status: 'UNDER_DOCUMENT_REVIEW',
    priority: 'HIGH',
    documents: [
      {
        id: 'doc-01',
        applicationId: 'TS-2026-00421',
        documentType: 'ST_CERTIFICATE',
        fileName: 'ST_Cert_Rahul_Oraon_2023.pdf',
        fileSize: '1.4 MB',
        uploadedAt: '2026-09-24 11:15',
        status: 'VERIFIED',
        aiFinding: {
          confidence: 0.98,
          nameMatch: true,
          dobMatch: true,
          documentQuality: true,
          duplicateRisk: 2,
          extractedFields: {
            'Name': 'Rahul Oraon',
            'Father': 'Mangra Oraon',
            'Tribe': 'Oraon',
            'Certificate No': 'JH-ST-2023-884192',
            'Issuing Authority': 'SDO Ranchi Sadar'
          },
          notes: 'High-confidence official digital seal identified. Community and name match verified.',
          requiresManualReview: false
        },
        officerRemark: 'Verified with state tribal registry.'
      },
      {
        id: 'doc-02',
        applicationId: 'TS-2026-00421',
        documentType: 'INCOME_CERTIFICATE',
        fileName: 'Income_Certificate_Old_Scan.pdf',
        fileSize: '980 KB',
        uploadedAt: '2026-09-24 11:18',
        status: 'REQUIRES_REVIEW',
        aiFinding: {
          confidence: 0.74,
          nameMatch: true,
          dobMatch: true,
          incomeMatch: false,
          extractedIncome: 260000,
          declaredIncome: 180000,
          documentQuality: true,
          duplicateRisk: 3,
          extractedFields: {
            'Name': 'Rahul Oraon',
            'Extracted Income': '₹2,60,000 / year',
            'Declared Income': '₹1,80,000 / year',
            'Certificate No': 'JH-INC-2024-00412',
            'Issue Date': '14-03-2024 (Expired FY)'
          },
          notes: 'Discrepancy detected: Extracted income ₹2,60,000 does not match declared ₹1,80,000. Certificate date also belongs to previous financial year.',
          requiresManualReview: true
        }
      },
      {
        id: 'doc-03',
        applicationId: 'TS-2026-00421',
        documentType: 'MARKSHEET',
        fileName: 'PG_MSc_Final_Marksheet_Consolidated.pdf',
        fileSize: '2.1 MB',
        uploadedAt: '2026-09-24 11:22',
        status: 'VERIFIED',
        aiFinding: {
          confidence: 0.96,
          nameMatch: true,
          documentQuality: true,
          duplicateRisk: 1,
          extractedFields: {
            'Student Name': 'Rahul Oraon',
            'Degree': 'M.Sc. Environmental Sciences',
            'Percentage': '68.4%',
            'Division': 'First Class'
          },
          notes: 'Marks verified against University database format. Threshold >= 55% satisfied.',
          requiresManualReview: false
        }
      },
      {
        id: 'doc-04',
        applicationId: 'TS-2026-00421',
        documentType: 'ADMISSION_PROOF',
        fileName: 'PhD_Enrolment_NationalTribalCU.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-09-24 11:24',
        status: 'VERIFIED',
        aiFinding: {
          confidence: 0.95,
          nameMatch: true,
          documentQuality: true,
          duplicateRisk: 0,
          extractedFields: {
            'Scholar': 'Rahul Oraon',
            'Department': 'Environmental Studies',
            'Enrolment No': 'NTCU/ENV/PHD/2024/019',
            'DRC Date': '10-09-2024'
          },
          notes: 'PhD enrolment confirmed.',
          requiresManualReview: false
        }
      },
      {
        id: 'doc-05',
        applicationId: 'TS-2026-00421',
        documentType: 'RESEARCH_PROPOSAL',
        fileName: 'Research_Synopsis_TribalForestRights.pdf',
        fileSize: '3.4 MB',
        uploadedAt: '2026-09-24 11:28',
        status: 'VERIFIED',
        aiFinding: {
          confidence: 0.92,
          nameMatch: true,
          documentQuality: true,
          duplicateRisk: 4,
          extractedFields: {
            'Title': 'Sustainable Agro-Forestry & Customary Knowledge Systems of the Oraon Community',
            'Pages': '14',
            'Originality Index': '96%'
          },
          notes: 'Proposal structure complies with academic fellowship standards.',
          requiresManualReview: false
        }
      }
    ],
    timeline: [
      {
        id: 'tl-01',
        timestamp: '2026-09-24 11:30',
        status: 'SUBMITTED',
        actor: 'Rahul Oraon',
        role: 'APPLICANT',
        description: 'Application successfully submitted online with 5 uploaded documents.'
      },
      {
        id: 'tl-02',
        timestamp: '2026-09-24 11:32',
        status: 'UNDER_AI_REVIEW',
        actor: 'AI Verification Engine',
        role: 'SYSTEM',
        description: 'Automated OCR extraction, text consistency checks, and anomaly detection completed.'
      },
      {
        id: 'tl-03',
        timestamp: '2026-09-24 14:00',
        status: 'UNDER_DOCUMENT_REVIEW',
        actor: 'Dr. Arvind Mahato',
        role: 'OFFICER',
        description: 'Application assigned to Scrutiny Officer. Pending officer review of flagged income document.'
      }
    ],
    score: {
      academicScore: 35,
      researchScore: 32,
      socioEconomicScore: 22,
      totalScore: 89,
      rank: 3
    },
    deficiencies: []
  },
  // Other realistic applications across states
  {
    id: 'TS-2026-00422',
    applicantId: 'usr-student-02',
    applicantName: 'Sushila Kisku',
    applicantEmail: 'sushila.kisku@demo.in',
    schemeId: 'sch-001',
    schemeName: 'National Fellowship for ST Students (NFST)',
    schemeType: 'FELLOWSHIP',
    state: 'Odisha',
    district: 'Mayurbhanj',
    institution: 'State Tribal University',
    programme: 'PhD',
    percentage: 74.2,
    annualIncome: 140000,
    submittedAt: '2026-09-22 09:40',
    status: 'ELIGIBILITY_VERIFIED',
    priority: 'NORMAL',
    documents: [
      { id: 'doc-21', applicationId: 'TS-2026-00422', documentType: 'ST_CERTIFICATE', fileName: 'Santhal_Community_Cert.pdf', fileSize: '1.2 MB', uploadedAt: '2026-09-22 09:10', status: 'VERIFIED' },
      { id: 'doc-22', applicationId: 'TS-2026-00422', documentType: 'INCOME_CERTIFICATE', fileName: 'Income_Certificate_2026.pdf', fileSize: '850 KB', uploadedAt: '2026-09-22 09:15', status: 'VERIFIED' },
      { id: 'doc-23', applicationId: 'TS-2026-00422', documentType: 'MARKSHEET', fileName: 'MTech_Final_Transcript.pdf', fileSize: '1.8 MB', uploadedAt: '2026-09-22 09:20', status: 'VERIFIED' }
    ],
    timeline: [
      { id: 'tl-21', timestamp: '2026-09-22 09:40', status: 'SUBMITTED', actor: 'Sushila Kisku', role: 'APPLICANT', description: 'Application submitted.' },
      { id: 'tl-22', timestamp: '2026-09-23 15:10', status: 'ELIGIBILITY_VERIFIED', actor: 'Dr. Arvind Mahato', role: 'OFFICER', description: 'All credentials and documents scrutinized and verified.' }
    ],
    score: {
      academicScore: 38,
      researchScore: 31,
      socioEconomicScore: 23,
      totalScore: 92,
      rank: 1
    },
    deficiencies: []
  },
  {
    id: 'TS-2026-00423',
    applicantId: 'usr-student-03',
    applicantName: 'Birsa Tirkey',
    applicantEmail: 'birsa.tirkey@demo.in',
    schemeId: 'sch-001',
    schemeName: 'National Fellowship for ST Students (NFST)',
    schemeType: 'FELLOWSHIP',
    state: 'Jharkhand',
    district: 'Gumla',
    institution: 'Central University of Jharkhand',
    programme: 'PhD',
    percentage: 61.5,
    annualIncome: 210000,
    submittedAt: '2026-09-20 16:20',
    status: 'DEFICIENCY_RAISED',
    priority: 'HIGH',
    documents: [
      { id: 'doc-31', applicationId: 'TS-2026-00423', documentType: 'ST_CERTIFICATE', fileName: 'Oraon_Cert_Gumla.pdf', fileSize: '1.5 MB', uploadedAt: '2026-09-20 16:00', status: 'VERIFIED' },
      { id: 'doc-32', applicationId: 'TS-2026-00423', documentType: 'MARKSHEET', fileName: 'PG_Marksheet_Blurred_Scan.pdf', fileSize: '420 KB', uploadedAt: '2026-09-20 16:05', status: 'REQUIRES_REVIEW' }
    ],
    timeline: [
      { id: 'tl-31', timestamp: '2026-09-20 16:20', status: 'SUBMITTED', actor: 'Birsa Tirkey', role: 'APPLICANT', description: 'Application submitted.' },
      { id: 'tl-32', timestamp: '2026-09-21 11:00', status: 'DEFICIENCY_RAISED', actor: 'Dr. Arvind Mahato', role: 'OFFICER', description: 'Marksheet is blurred and semester marks cannot be verified.' }
    ],
    score: {
      academicScore: 29,
      researchScore: 28,
      socioEconomicScore: 24,
      totalScore: 81,
      rank: 6
    },
    deficiencies: [
      {
        id: 'def-01',
        applicationId: 'TS-2026-00423',
        documentId: 'doc-32',
        documentType: 'MARKSHEET',
        reasonType: 'UNREADABLE_DOCUMENT',
        explanation: 'Uploaded marksheet copy has low DPI/blur; percentage and total marks not legible.',
        raisedAt: '2026-09-21 11:00',
        raisedBy: 'Dr. Arvind Mahato',
        deadline: '2026-10-05',
        status: 'OPEN'
      }
    ]
  },
  {
    id: 'TS-2026-00424',
    applicantId: 'usr-student-04',
    applicantName: 'Mangal Munda',
    applicantEmail: 'mangal.munda@demo.in',
    schemeId: 'sch-001',
    schemeName: 'National Fellowship for ST Students (NFST)',
    schemeType: 'FELLOWSHIP',
    state: 'Chhattisgarh',
    district: 'Bastar',
    institution: 'Bastar Vishwavidyalaya',
    programme: 'PhD',
    percentage: 71.0,
    annualIncome: 120000,
    submittedAt: '2026-09-18 10:15',
    status: 'SELECTED',
    priority: 'NORMAL',
    documents: [
      { id: 'doc-41', applicationId: 'TS-2026-00424', documentType: 'ST_CERTIFICATE', fileName: 'Munda_ST_Certificate.pdf', fileSize: '1.1 MB', uploadedAt: '2026-09-18 10:00', status: 'VERIFIED' }
    ],
    timeline: [
      { id: 'tl-41', timestamp: '2026-09-18 10:15', status: 'SUBMITTED', actor: 'Mangal Munda', role: 'APPLICANT', description: 'Application submitted.' },
      { id: 'tl-42', timestamp: '2026-09-19 14:00', status: 'ELIGIBILITY_VERIFIED', actor: 'Dr. Arvind Mahato', role: 'OFFICER', description: 'Verified.' },
      { id: 'tl-43', timestamp: '2026-09-23 16:30', status: 'SELECTED', actor: 'Prof. S. Soren', role: 'SELECTION_COMMITTEE', description: 'Selected in Merit List 1 (Rank 2).' }
    ],
    score: {
      academicScore: 36,
      researchScore: 33,
      socioEconomicScore: 25,
      totalScore: 94,
      rank: 2
    },
    deficiencies: []
  },
  {
    id: 'TS-2026-00425',
    applicantId: 'usr-student-05',
    applicantName: 'Ananya Kerketta',
    applicantEmail: 'ananya.kerketta@demo.in',
    schemeId: 'sch-001',
    schemeName: 'National Fellowship for ST Students (NFST)',
    schemeType: 'FELLOWSHIP',
    state: 'Odisha',
    district: 'Sundargarh',
    institution: 'National Institute of Technology Rourkela',
    programme: 'PhD',
    percentage: 76.5,
    annualIncome: 190000,
    submittedAt: '2026-09-15 14:00',
    status: 'SANCTIONED',
    priority: 'NORMAL',
    documents: [
      { id: 'doc-51', applicationId: 'TS-2026-00425', documentType: 'ST_CERTIFICATE', fileName: 'Kerketta_ST_Cert.pdf', fileSize: '1.3 MB', uploadedAt: '2026-09-15 13:40', status: 'VERIFIED' }
    ],
    timeline: [
      { id: 'tl-51', timestamp: '2026-09-15 14:00', status: 'SUBMITTED', actor: 'Ananya Kerketta', role: 'APPLICANT', description: 'Submitted.' },
      { id: 'tl-52', timestamp: '2026-09-17 11:20', status: 'ELIGIBILITY_VERIFIED', actor: 'Dr. Arvind Mahato', role: 'OFFICER', description: 'Verified.' },
      { id: 'tl-53', timestamp: '2026-09-21 17:00', status: 'SELECTED', actor: 'Prof. S. Soren', role: 'SELECTION_COMMITTEE', description: 'Selected.' },
      { id: 'tl-54', timestamp: '2026-09-24 10:15', status: 'SANCTIONED', actor: 'K. Murmu', role: 'FINANCE_OFFICER', description: 'Sanction Order No. SAN/ST/2026/0398 generated for ₹3,60,000.' }
    ],
    score: {
      academicScore: 39,
      researchScore: 34,
      socioEconomicScore: 23,
      totalScore: 96,
      rank: 1
    },
    sanctionId: 'san-001',
    deficiencies: []
  },
  {
    id: 'TS-2026-00426',
    applicantId: 'usr-student-06',
    applicantName: 'Somra Bhagat',
    applicantEmail: 'somra.bhagat@demo.in',
    schemeId: 'sch-003',
    schemeName: 'Top Class Education Scholarship for ST Students',
    schemeType: 'SCHOLARSHIP',
    state: 'Madhya Pradesh',
    district: 'Jhabua',
    institution: 'IIT Indore',
    programme: 'BTech',
    percentage: 84.0,
    annualIncome: 160000,
    submittedAt: '2026-09-12 11:00',
    status: 'DISBURSED',
    priority: 'NORMAL',
    documents: [],
    timeline: [
      { id: 'tl-61', timestamp: '2026-09-12 11:00', status: 'SUBMITTED', actor: 'Somra Bhagat', role: 'APPLICANT', description: 'Submitted.' },
      { id: 'tl-62', timestamp: '2026-09-18 16:00', status: 'DISBURSED', actor: 'K. Murmu', role: 'FINANCE_OFFICER', description: 'Direct Benefit Transfer ₹2,50,000 processed via PFMS/NPCI bridge.' }
    ],
    deficiencies: []
  }
];

export const SEED_SANCTIONS: Record<string, Sanction> = {
  'san-001': {
    id: 'san-001',
    sanctionOrderNo: 'SAN/ST/2026/0398',
    applicationId: 'TS-2026-00425',
    applicantName: 'Ananya Kerketta',
    schemeName: 'National Fellowship for ST Students (NFST)',
    totalAmount: 360000,
    installments: [
      { installmentNo: 1, amount: 90000, dueDate: '2026-10-01', status: 'PENDING' },
      { installmentNo: 2, amount: 90000, dueDate: '2027-01-01', status: 'PENDING' },
      { installmentNo: 3, amount: 90000, dueDate: '2027-04-01', status: 'PENDING' },
      { installmentNo: 4, amount: 90000, dueDate: '2027-07-01', status: 'PENDING' }
    ],
    sanctionedAt: '2026-09-24 10:15',
    sanctionedBy: 'K. Murmu (Finance Officer, DBT Division)',
    remarks: 'Sanction approved as per Ministry of Tribal Affairs guidelines for NFST 2026-27 cohort.'
  }
};

export const SEED_PAYMENT_BATCHES: PaymentBatch[] = [
  {
    id: 'DBT-DEMO-2026-001',
    name: 'Q3 NFST & Higher Education DBT Batch',
    schemeName: 'National Fellowship for ST Students (NFST)',
    createdAt: '2026-09-25 09:30',
    processedAt: '2026-09-25 11:15',
    totalRecipients: 250,
    totalAmount: 42500000,
    successfulCount: 243,
    failedCount: 7,
    status: 'COMPLETED',
    failures: [
      { applicationId: 'TS-2026-00388', applicantName: 'Kameshwar Hembram', amount: 90000, reason: 'Aadhaar not seeded in designated bank account (NPCI mapper code 103)' },
      { applicationId: 'TS-2026-00391', applicantName: 'Pooja Marandi', amount: 90000, reason: 'Account closed or dormant' },
      { applicationId: 'TS-2026-00395', applicantName: 'Devdas Gond', amount: 90000, reason: 'Invalid IFSC code / Bank branch merger mismatch' },
      { applicationId: 'TS-2026-00402', applicantName: 'Sunita Bodo', amount: 90000, reason: 'Beneficiary name in bank does not match application record' },
      { applicationId: 'TS-2026-00407', applicantName: 'Gajanan Gamit', amount: 90000, reason: 'Temporary gateway timeout at remitting bank' },
      { applicationId: 'TS-2026-00411', applicantName: 'Chhagan Bhil', amount: 90000, reason: 'Daily credit limit reached on Jan Dhan basic savings account' },
      { applicationId: 'TS-2026-00415', applicantName: 'Meena Warli', amount: 90000, reason: 'NPCI mapper timeout' }
    ]
  },
  {
    id: 'DBT-DEMO-2026-002',
    name: 'Top Class Education October Batch',
    schemeName: 'Top Class Education Scholarship for ST Students',
    createdAt: '2026-09-26 08:00',
    totalRecipients: 120,
    totalAmount: 30000000,
    successfulCount: 0,
    failedCount: 0,
    status: 'DRAFT',
    failures: []
  }
];

export const SEED_FELLOWSHIP_PROGRESS: Record<string, FellowshipProgress> = {
  'TS-2026-00421': {
    applicationId: 'TS-2026-00421',
    applicantName: 'Rahul Oraon',
    schemeName: 'National Fellowship for ST Students (NFST)',
    currentYear: 2,
    totalYears: 3,
    guideName: 'Prof. Ramesh Chandra Soren (Dept. of Environmental Sciences)',
    topic: 'Sustainable Agro-Forestry & Customary Knowledge Systems of the Oraon Community',
    milestones: [
      {
        year: 1,
        title: 'Year 1: Foundation & Literature Review',
        status: 'COMPLETED',
        description: 'Coursework completion, synopsis defense, comprehensive viva, and literature review.',
        dueDate: '2025-08-31',
        completionDate: '2025-08-20',
        reportStatus: 'APPROVED',
        installmentAmount: 90000,
        installmentStatus: 'PAID',
        utrNo: 'SBIN25082098412'
      },
      {
        year: 2,
        title: 'Year 2: Field Data Collection & Ethno-Botanical Mapping',
        status: 'IN_PROGRESS',
        description: 'Extensive participatory rural appraisal (PRA) across 12 villages in Bero and Mandar blocks.',
        dueDate: '2026-10-15',
        reportStatus: 'SUBMITTED',
        installmentAmount: 90000,
        installmentStatus: 'DUE'
      },
      {
        year: 3,
        title: 'Year 3: Data Analysis, Dissertation Draft & Peer-Reviewed Publications',
        status: 'UPCOMING',
        description: 'Submission of 2 UGC-CARE listed research papers and pre-submission presentation.',
        dueDate: '2027-08-31',
        reportStatus: 'NOT_SUBMITTED',
        installmentAmount: 90000,
        installmentStatus: 'UPCOMING'
      }
    ]
  }
};

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-01',
    recipientEmail: 'student@demo.com',
    recipientRole: 'APPLICANT',
    title: 'Scrutiny Officer Assigned',
    message: 'Your application TS-2026-00421 has been assigned to Dr. Arvind Mahato for document review.',
    type: 'VERIFICATION',
    applicationId: 'TS-2026-00421',
    createdAt: '2026-09-24 14:00',
    read: true,
    actionUrl: '/applicant/applications'
  },
  {
    id: 'notif-02',
    recipientEmail: 'student@demo.com',
    recipientRole: 'APPLICANT',
    title: 'Application Received',
    message: 'Application TS-2026-00421 for National Fellowship for ST Students submitted successfully.',
    type: 'GENERAL',
    applicationId: 'TS-2026-00421',
    createdAt: '2026-09-24 11:30',
    read: true,
    actionUrl: '/applicant/applications'
  }
];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-01',
    timestamp: '2026-09-26 09:15',
    actor: 'K. Murmu',
    role: 'FINANCE_OFFICER',
    action: 'BATCH_CREATED',
    entity: 'PaymentBatch',
    applicationId: 'DBT-DEMO-2026-002',
    newValue: 'Created draft batch for 120 recipients (₹3,00,00,000)',
    ipAddress: '10.24.8.45'
  },
  {
    id: 'aud-02',
    timestamp: '2026-09-25 11:15',
    actor: 'K. Murmu',
    role: 'FINANCE_OFFICER',
    action: 'BATCH_PROCESSED',
    entity: 'PaymentBatch',
    applicationId: 'DBT-DEMO-2026-001',
    oldValue: 'PROCESSING',
    newValue: 'COMPLETED (243 Success, 7 Failed)',
    ipAddress: '10.24.8.45'
  },
  {
    id: 'aud-03',
    timestamp: '2026-09-24 10:15',
    actor: 'K. Murmu',
    role: 'FINANCE_OFFICER',
    action: 'SANCTION_ORDER_ISSUED',
    entity: 'Application',
    applicationId: 'TS-2026-00425',
    oldValue: 'SELECTED',
    newValue: 'SANCTIONED (SAN/ST/2026/0398)',
    ipAddress: '10.24.8.45'
  },
  {
    id: 'aud-04',
    timestamp: '2026-09-23 16:30',
    actor: 'Prof. S. Soren',
    role: 'SELECTION_COMMITTEE',
    action: 'CANDIDATE_SELECTED',
    entity: 'Application',
    applicationId: 'TS-2026-00424',
    oldValue: 'ELIGIBILITY_VERIFIED',
    newValue: 'SELECTED (Merit Rank 2, Score: 94)',
    ipAddress: '10.32.12.19'
  },
  {
    id: 'aud-05',
    timestamp: '2026-09-23 15:10',
    actor: 'Dr. Arvind Mahato',
    role: 'OFFICER',
    action: 'DOCUMENTS_VERIFIED',
    entity: 'Application',
    applicationId: 'TS-2026-00422',
    oldValue: 'UNDER_DOCUMENT_REVIEW',
    newValue: 'ELIGIBILITY_VERIFIED',
    ipAddress: '10.18.4.112'
  },
  {
    id: 'aud-06',
    timestamp: '2026-09-21 11:00',
    actor: 'Dr. Arvind Mahato',
    role: 'OFFICER',
    action: 'DEFICIENCY_RAISED',
    entity: 'Application',
    applicationId: 'TS-2026-00423',
    oldValue: 'UNDER_DOCUMENT_REVIEW',
    newValue: 'DEFICIENCY_RAISED (Marksheet blurred)',
    ipAddress: '10.18.4.112'
  },
  {
    id: 'aud-07',
    timestamp: '2026-09-24 11:32',
    actor: 'AI Document Intelligence Service',
    role: 'SYSTEM',
    action: 'AI_VERIFICATION_COMPLETED',
    entity: 'Application',
    applicationId: 'TS-2026-00421',
    newValue: 'Confidence 74%, Discrepancy flagged on Income Certificate',
    ipAddress: '127.0.0.1'
  }
];
