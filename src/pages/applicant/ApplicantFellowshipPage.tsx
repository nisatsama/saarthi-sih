import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  IndianRupee, 
  FileCheck, 
  Upload, 
  User, 
  BookOpen, 
  Award,
  ChevronRight
} from 'lucide-react';

export const ApplicantFellowshipPage: React.FC = () => {
  const { fellowshipProgress, updateFellowshipReport, applications, setToast } = useApp();
  const [submittingReportYear, setSubmittingReportYear] = useState<number | null>(null);

  const fp = fellowshipProgress['TS-2026-00421'] || Object.values(fellowshipProgress)[0];
  const activeApp = applications.find(a => a.id === fp?.applicationId);

  const handleSubmitAnnualReport = (year: number) => {
    updateFellowshipReport(fp.applicationId, year, 'SUBMITTED');
    setSubmittingReportYear(null);
    setToast(`Year ${year} Research Progress Report submitted for Supervisor Review.`);
  };

  if (!fp) {
    return (
      <div className="bg-white p-8 rounded-lg border border-[#DCE5E2] text-center text-xs text-[#64757D]">
        No active fellowship awards registered for this account.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#176B87]">FELLOWSHIP COHORT 2024-2027</span>
            <span className="text-[10px] bg-[#E8F4EF] text-[#247A5A] px-2 py-0.5 rounded font-semibold border border-[#247A5A]/30">
              Active Award
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#123B5D]">{fp.schemeName}</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Dossier: <span className="font-mono font-semibold text-[#123B5D]">{fp.applicationId}</span> · Scholar: <strong>{fp.applicantName}</strong>
          </p>
        </div>

        <div className="text-right bg-[#F8FAF9] p-3 rounded border border-[#DCE5E2] text-xs">
          <span className="text-[10px] text-[#64757D] block">Current Academic Cycle</span>
          <span className="font-bold text-[#123B5D]">Year {fp.currentYear} of {fp.totalYears}</span>
        </div>
      </div>

      {/* Research Topic & Supervisor Metadata Card */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-3">
        <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#176B87]" />
          <span>Doctoral Dissertation & Institutional Affiliation</span>
        </h2>

        <div className="p-3.5 bg-[#F8FAF9] rounded border border-[#DCE5E2] text-xs space-y-2">
          <div>
            <span className="text-[#64757D] block font-medium">Research Topic:</span>
            <span className="font-semibold text-[#123B5D] text-sm">{fp.topic}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#DCE5E2]">
            <div>
              <span className="text-[#64757D] block">Research Supervisor / Guide:</span>
              <span className="font-medium text-[#263640]">{fp.guideName}</span>
            </div>
            <div>
              <span className="text-[#64757D] block">Host Institution:</span>
              <span className="font-medium text-[#263640]">National Tribal Central University</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fellowship Multi-Year Progress Roadmap (Section 28) */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE5E2]">
          <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wide flex items-center gap-2">
            <Award className="w-4 h-4 text-[#247A5A]" />
            <span>Fellowship Milestones & DBT Grant Installments</span>
          </h2>
          <span className="text-[11px] text-[#64757D]">
            Total Grant: <strong>₹3,60,000</strong> (₹90,000 / installment)
          </span>
        </div>

        <div className="space-y-4">
          {fp.milestones.map(milestone => {
            const isCompleted = milestone.status === 'COMPLETED';
            const isCurrent = milestone.status === 'IN_PROGRESS';
            const isUpcoming = milestone.status === 'UPCOMING';

            return (
              <div
                key={milestone.year}
                className={`p-4 rounded-lg border transition-all ${isCompleted ? 'bg-[#E8F4EF]/40 border-[#247A5A]/30' : isCurrent ? 'bg-white border-[#176B87]/50 shadow-xs ring-1 ring-[#176B87]/20' : 'bg-slate-50 border-slate-200 opacity-70'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${isCompleted ? 'bg-[#247A5A] text-white' : isCurrent ? 'bg-[#176B87] text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : milestone.year}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs text-[#123B5D]">
                          {milestone.title}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] bg-[#E8F4EF] text-[#247A5A] px-2 py-0.2 rounded font-semibold border border-[#247A5A]/30">
                            Completed & Credited
                          </span>
                        )}
                        {isCurrent && (
                          <span className="text-[10px] bg-[#EAF3F8] text-[#176B87] px-2 py-0.2 rounded font-semibold border border-[#176B87]/30">
                            Current Academic Stage
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#64757D] leading-relaxed">
                        {milestone.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#64757D]">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3 text-[#185C46]" />
                          <span>Installment: <strong>₹{milestone.installmentAmount?.toLocaleString('en-IN') || '90,000'}</strong></span>
                        </span>

                        {milestone.utrNo ? (
                          <span className="text-[#185C46] font-mono">
                            DBT Ref: {milestone.utrNo}
                          </span>
                        ) : (
                          <span>Due Date: {milestone.dueDate}</span>
                        )}

                        <span>
                          Annual Report: <strong className={milestone.reportStatus === 'APPROVED' ? 'text-[#247A5A]' : milestone.reportStatus === 'SUBMITTED' ? 'text-[#176B87]' : 'text-[#C58A27]'}>
                            {milestone.reportStatus || 'NOT_SUBMITTED'}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Action */}
                  <div className="self-end sm:self-center shrink-0">
                    {isCurrent && milestone.reportStatus !== 'APPROVED' && (
                      <button
                        onClick={() => handleSubmitAnnualReport(milestone.year)}
                        className="px-3 py-1.5 bg-[#176B87] hover:bg-[#123B5D] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Progress Report</span>
                      </button>
                    )}
                    {isCompleted && (
                      <span className="text-xs font-semibold text-[#247A5A] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Disbursed via DBT</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
