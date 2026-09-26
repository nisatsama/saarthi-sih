/**
 * AI Document Intelligence Service for SAARTHI
 * Simulates OCR extraction, field comparison, anomaly detection, and tamper checks.
 * Adheres strictly to the Human-in-the-Loop principle:
 * AI provides diagnostic flags and confidence scores; final decisions rest with the Officer.
 */

import { DocumentType, ApplicantProfile } from '../types';

export interface DocumentVerificationCheck {
  type: 'NAME_MATCH' | 'INCOME_MATCH' | 'COMMUNITY_MATCH' | 'VALIDITY_CHECK' | 'SEAL_AUTHENTICITY' | 'TAMPER_DETECTION' | 'QUALITY_CHECK';
  label: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  confidenceScore: number;
  extractedValue: string;
  declaredValue: string;
  details: string;
}

export interface AIDocumentAnalysisResult {
  documentType: DocumentType;
  confidence: number;
  documentQualityScore: number;
  extractedFields: Record<string, string | number>;
  checks: DocumentVerificationCheck[];
  requiresManualReview: boolean;
  recommendation: 'APPROVE' | 'MANUAL_VERIFY' | 'REJECT';
  notes: string;
  scanTimestamp: string;
}

export function runAIDocumentIntelligence(
  docType: DocumentType,
  fileName: string,
  profile: ApplicantProfile,
  isCorrectedVersion: boolean = false
): AIDocumentAnalysisResult {
  const applicantName = profile.fullName;
  const declaredIncome = profile.annualFamilyIncome;
  const now = new Date().toISOString();

  switch (docType) {
    case 'INCOME_CERTIFICATE': {
      // In the demo story: if it's NOT the corrected version, trigger the intentional mismatch!
      const isMismatchDoc = !isCorrectedVersion && (
        fileName.includes('old') || 
        fileName.includes('TS-2026-00421') || 
        fileName.includes('mismatch') || 
        fileName.includes('Income_Certificate_2024')
      );
      
      const extractedIncome = isMismatchDoc ? 340000 : declaredIncome;
      const incomeStatus: 'PASS' | 'WARN' = isMismatchDoc ? 'WARN' : 'PASS';
      const confidence = isMismatchDoc ? 0.76 : 0.96;
      const requiresManual = isMismatchDoc;

      return {
        documentType: 'INCOME_CERTIFICATE',
        confidence,
        documentQualityScore: isMismatchDoc ? 0.74 : 0.95,
        extractedFields: {
          issuingAuthority: 'Circle Officer, Ranchi Sadar',
          state: 'Jharkhand',
          certificateNumber: isMismatchDoc ? 'JH-INC-2024-8812' : profile.incomeCertificateNo,
          candidateName: applicantName,
          extractedAnnualIncome: `₹${extractedIncome.toLocaleString('en-IN')}`,
          issueDate: isMismatchDoc ? '2024-03-12 (Prior Financial Year)' : '2026-04-10',
          validUntil: isMismatchDoc ? '2025-03-31 (Expired/Outdated)' : '2027-03-31',
        },
        checks: [
          {
            type: 'NAME_MATCH',
            label: 'Candidate Name Consistency',
            status: 'PASS',
            confidenceScore: 0.98,
            extractedValue: applicantName,
            declaredValue: applicantName,
            details: 'Name matches applicant profile registration.',
          },
          {
            type: 'INCOME_MATCH',
            label: 'Annual Income Verification',
            status: incomeStatus,
            confidenceScore: isMismatchDoc ? 0.65 : 0.96,
            extractedValue: `₹${extractedIncome.toLocaleString('en-IN')}`,
            declaredValue: `₹${declaredIncome.toLocaleString('en-IN')}`,
            details: isMismatchDoc
              ? `Mismatch Detected: Declared ₹${declaredIncome.toLocaleString('en-IN')} but document extracts ₹${extractedIncome.toLocaleString('en-IN')} with prior validity period.`
              : `Income verified at ₹${declaredIncome.toLocaleString('en-IN')} matching competent authority seal.`,
          },
          {
            type: 'VALIDITY_CHECK',
            label: 'Certificate Financial Year Validity',
            status: isMismatchDoc ? 'WARN' : 'PASS',
            confidenceScore: isMismatchDoc ? 0.70 : 0.95,
            extractedValue: isMismatchDoc ? 'FY 2023-24 (Expired)' : 'FY 2026-27 (Current)',
            declaredValue: 'FY 2026-27',
            details: isMismatchDoc
              ? 'Certificate validity expired on 31-03-2025. Current financial year certificate required.'
              : 'Certificate is valid for current financial year.',
          },
          {
            type: 'SEAL_AUTHENTICITY',
            label: 'Digital Signature & QR Seal',
            status: 'PASS',
            confidenceScore: 0.92,
            extractedValue: 'JharSewa State Portal Cryptographic Seal',
            declaredValue: 'Digital SDM / Tehsildar Seal',
            details: 'Digital signature verified against State Public Key Infrastructure.',
          }
        ],
        requiresManualReview: requiresManual,
        recommendation: isMismatchDoc ? 'MANUAL_VERIFY' : 'APPROVE',
        notes: isMismatchDoc
          ? 'Income discrepancy detected between application declaration and uploaded document. Recommend raising deficiency for current FY certificate.'
          : 'All certificate attributes validated against State Land & Revenue registry with high confidence.',
        scanTimestamp: now,
      };
    }

    case 'ST_CERTIFICATE': {
      return {
        documentType: 'ST_CERTIFICATE',
        confidence: 0.98,
        documentQualityScore: 0.96,
        extractedFields: {
          issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
          state: 'Jharkhand',
          certificateNumber: profile.certificateNo,
          community: profile.tribeCommunity,
          category: 'Scheduled Tribe (ST)',
          gazetteNotification: 'Constitution (Scheduled Tribes) Order, 1950 (Jharkhand Part XXII)',
        },
        checks: [
          {
            type: 'NAME_MATCH',
            label: 'Beneficiary Name Match',
            status: 'PASS',
            confidenceScore: 0.99,
            extractedValue: applicantName,
            declaredValue: applicantName,
            details: 'Exact name match with UIDAI identity record.',
          },
          {
            type: 'COMMUNITY_MATCH',
            label: 'Scheduled Tribe Community Gazette Match',
            status: 'PASS',
            confidenceScore: 0.98,
            extractedValue: profile.tribeCommunity,
            declaredValue: profile.tribeCommunity,
            details: `"${profile.tribeCommunity}" recognized under Jharkhand Scheduled Tribes Schedule.`,
          },
          {
            type: 'SEAL_AUTHENTICITY',
            label: 'SDM/Tehsildar Seal & QR Code',
            status: 'PASS',
            confidenceScore: 0.95,
            extractedValue: 'Cryptographic SDO Signature & QR Digest',
            declaredValue: 'SDO Ranchi',
            details: 'QR signature resolved and verified against State Caste Registry.',
          }
        ],
        requiresManualReview: false,
        recommendation: 'APPROVE',
        notes: 'Caste certificate verified directly with Jharkhand JharSewa portal.',
        scanTimestamp: now,
      };
    }

    case 'ADMISSION_PROOF': {
      return {
        documentType: 'ADMISSION_PROOF',
        confidence: 0.95,
        documentQualityScore: 0.91,
        extractedFields: {
          institution: 'Ranchi University, Ranchi',
          course: 'Ph.D in Botany & Plant Biotechnology',
          registrationNumber: 'RU/PHD/BOT/2026/042',
          admissionDate: '2026-02-15',
          guideName: 'Dr. Rameshwar Singh, Professor & HOD',
        },
        checks: [
          {
            type: 'NAME_MATCH',
            label: 'Scholar Name Match',
            status: 'PASS',
            confidenceScore: 0.97,
            extractedValue: applicantName,
            declaredValue: applicantName,
            details: 'Name matches University admission letter.',
          },
          {
            type: 'VALIDITY_CHECK',
            label: 'Enrollment Status & University Affiliation',
            status: 'PASS',
            confidenceScore: 0.94,
            extractedValue: 'Full-Time Doctoral Research Scholar',
            declaredValue: 'Ph.D Botany',
            details: 'Institution verified under UGC Section 2(f) and 12(B).',
          }
        ],
        requiresManualReview: false,
        recommendation: 'APPROVE',
        notes: 'Doctoral enrollment verified via UGC & University registrar portal.',
        scanTimestamp: now,
      };
    }

    case 'RESEARCH_PROPOSAL':
    case 'MARKSHEET':
    default: {
      return {
        documentType: docType,
        confidence: 0.94,
        documentQualityScore: 0.92,
        extractedFields: {
          documentTitle: fileName,
          extractedPages: 14,
          primaryLanguage: 'English',
        },
        checks: [
          {
            type: 'QUALITY_CHECK',
            label: 'Document Resolution & Legibility',
            status: 'PASS',
            confidenceScore: 0.95,
            extractedValue: '300 DPI Clear Scan',
            declaredValue: 'PDF Upload',
            details: 'Document meets all legibility and optical character standards.',
          }
        ],
        requiresManualReview: false,
        recommendation: 'APPROVE',
        notes: 'Document successfully indexed and verified for archival scrutiny.',
        scanTimestamp: now,
      };
    }
  }
}
