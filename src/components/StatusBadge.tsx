import React from 'react';
import { ApplicationStatus, DocumentStatus } from '../types';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Award, 
  IndianRupee, 
  XCircle,
  RefreshCw,
  Cpu
} from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus | DocumentStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  switch (status) {
    case 'SUBMITTED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#EAF3F8] text-[#176B87] border border-[#176B87]/30 ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Submitted</span>
        </span>
      );

    case 'UNDER_AI_REVIEW':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#EAF3F8] text-[#2A8C82] border border-[#2A8C82]/30 ${sizeClasses}`}>
          <Cpu className="w-3.5 h-3.5" />
          <span>AI Verification</span>
        </span>
      );

    case 'UNDER_DOCUMENT_REVIEW':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-100 text-[#123B5D] border border-slate-300 ${sizeClasses}`}>
          <FileText className="w-3.5 h-3.5" />
          <span>Officer Review</span>
        </span>
      );

    case 'DEFICIENCY_RAISED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#FCF5E8] text-[#C58A27] border border-[#E8CA8C] ${sizeClasses}`}>
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Action Required</span>
        </span>
      );

    case 'RESUBMITTED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#EAF3F8] text-[#176B87] border border-[#176B87]/40 ${sizeClasses}`}>
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Resubmitted</span>
        </span>
      );

    case 'ELIGIBILITY_VERIFIED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#E8F4EF] text-[#247A5A] border border-[#247A5A]/30 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified</span>
        </span>
      );

    case 'SHORTLISTED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#E8F4EF] text-[#247A5A] border border-[#247A5A]/30 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Shortlisted</span>
        </span>
      );

    case 'SELECTED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-[#E8F4EF] text-[#185C46] border border-[#247A5A]/40 ${sizeClasses}`}>
          <Award className="w-3.5 h-3.5 text-[#247A5A]" />
          <span>Selected</span>
        </span>
      );

    case 'WAITLISTED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#FCF5E8] text-[#C58A27] border border-[#E8CA8C] ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Waitlisted</span>
        </span>
      );

    case 'REJECTED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#FDF1F1] text-[#C84B4B] border border-[#F2BCBC] ${sizeClasses}`}>
          <XCircle className="w-3.5 h-3.5" />
          <span>Rejected</span>
        </span>
      );

    case 'SANCTIONED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-[#E8F4EF] text-[#123B5D] border border-[#123B5D]/30 ${sizeClasses}`}>
          <Award className="w-3.5 h-3.5 text-[#247A5A]" />
          <span>Sanctioned</span>
        </span>
      );

    case 'PAYMENT_PENDING':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-[#EAF3F8] text-[#176B87] border border-[#176B87]/30 ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Payment Pending</span>
        </span>
      );

    case 'DISBURSED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-[#E8F4EF] text-[#185C46] border border-[#247A5A]/40 ${sizeClasses}`}>
          <IndianRupee className="w-3.5 h-3.5 text-[#247A5A]" />
          <span>Disbursed</span>
        </span>
      );

    // Document statuses
    case 'VERIFIED':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-[#E8F4EF] text-[#247A5A] border border-[#247A5A]/30 ${sizeClasses}`}>
          <CheckCircle2 className="w-3 h-3" />
          <span>Verified</span>
        </span>
      );

    case 'REQUIRES_REVIEW':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-[#FCF5E8] text-[#C58A27] border border-[#E8CA8C] ${sizeClasses}`}>
          <AlertCircle className="w-3 h-3" />
          <span>Needs Review</span>
        </span>
      );

    case 'UPLOADED':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-[#EAF3F8] text-[#176B87] border border-[#176B87]/30 ${sizeClasses}`}>
          <CheckCircle2 className="w-3 h-3" />
          <span>Uploaded</span>
        </span>
      );

    case 'PROCESSING':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-300 ${sizeClasses}`}>
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Analyzing</span>
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-300 ${sizeClasses}`}>
          {String(status).replace(/_/g, ' ')}
        </span>
      );
  }
};
