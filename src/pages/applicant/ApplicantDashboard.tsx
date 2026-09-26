import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { evaluateEligibility } from '../../services/ruleEngine';
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ExternalLink,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface ApplicantDashboardProps {
  onNavigate: (tab: string) => void;
  onApplyScheme: (schemeId: string) => void;
  onResolveDeficiency: () => void;
}

export const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({
  onNavigate,
  onApplyScheme,
  onResolveDeficiency
}) => {
  const { profile, applications, schemes, currentUser } = useApp();

  // Find active applicant applications
  const myApplications = applications.filter(a => a.applicantEmail === currentUser.email || a.id === 'TS-2026-00421');

  // Check if any application has deficiency
  const activeDeficiencyApp = myApplications.find(a => a.status === 'DEFICIENCY_RAISED');
  const openDeficiency = activeDeficiencyApp?.deficiencies.find(d => d.status === 'OPEN');

  // Recommended schemes (first 3)
  const recommendedSchemes = schemes.slice(0, 3);

  // Calculate profile completion
  const profileFields = [
    profile.fullName,
    profile.dob,
    profile.mobile,
    profile.category,
    profile.tribeCommunity,
    profile.certificateNo,
    profile.institution,
    profile.marksPercentage,
    profile.annualFamilyIncome,
    profile.maskedAccountNumber
  ];
  const filledCount = profileFields.filter(Boolean).length;
  const completionPercentage = Math.round((filledCount / profileFields.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Welcome Heading */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">
            Good morning, {profile.fullName.split(' ')[0]}.
          </h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Here's what's happening with your scholarship and fellowship applications.
          </p>
        </div>

        {/* Profile Completion Widget */}
        <div className="flex items-center gap-3 bg-[#F8FAF9] px-3.5 py-2 rounded-md border border-[#DCE5E2] w-full sm:w-auto">
          <div>
            <div className="flex justify-between items-center gap-4 text-xs font-semibold text-[#263640] mb-1">
              <span>Profile Completion</span>
              <span className="text-[#185C46]">{completionPercentage}%</span>
            </div>
            <div className="w-36 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#247A5A] rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="text-xs text-[#176B87] hover:underline font-medium shrink-0 cursor-pointer"
          >
            Review
          </button>
        </div>
      </div>

      {/* Metrics Row: Restrained Information Blocks (Not giant cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[11px] font-medium text-[#64757D] block">Applications</span>
          <div className="text-2xl font-bold text-[#123B5D] mt-1">{myApplications.length}</div>
          <span className="text-[10px] text-[#64757D]">Registered dossiers</span>
        </div>

        <div className={`p-3.5 rounded-lg border transition-colors ${activeDeficiencyApp ? 'bg-[#FCF5E8] border-[#E8CA8C]' : 'bg-white border-[#DCE5E2]'}`}>
          <span className="text-[11px] font-medium text-[#64757D] block">Action Required</span>
          <div className={`text-2xl font-bold mt-1 ${activeDeficiencyApp ? 'text-[#C58A27]' : 'text-[#263640]'}`}>
            {activeDeficiencyApp ? 1 : 0}
          </div>
          <span className="text-[10px] text-[#64757D]">{activeDeficiencyApp ? 'Correction requested' : 'None pending'}</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[11px] font-medium text-[#64757D] block">Selected / Sanctioned</span>
          <div className="text-2xl font-bold text-[#185C46] mt-1">
            {myApplications.filter(a => ['SELECTED', 'SANCTIONED', 'DISBURSED'].includes(a.status)).length}
          </div>
          <span className="text-[10px] text-[#64757D]">Awarded schemes</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[11px] font-medium text-[#64757D] block">Disbursed (DBT)</span>
          <div className="text-2xl font-bold text-[#123B5D] mt-1">
            {myApplications.filter(a => a.status === 'DISBURSED').length}
          </div>
          <span className="text-[10px] text-[#64757D]">Transferred to bank</span>
        </div>
      </div>

      {/* Action Required Banner (Priority Human Workflow) */}
      {activeDeficiencyApp && (
        <div className="bg-[#FCF5E8] border border-[#E8CA8C] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-[#C58A27] text-white rounded-md shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#C58A27] uppercase tracking-wide">
                  Action Required on Dossier #{activeDeficiencyApp.id}
                </span>
                <span className="text-[10px] text-[#64757D]">
                  Deadline: {openDeficiency?.deadline || '10 Oct 2026'}
                </span>
              </div>
              <p className="text-xs font-medium text-[#263640] mt-0.5">
                {openDeficiency?.explanation || 'Income Certificate requires correction due to declared value discrepancy.'}
              </p>
              <p className="text-[11px] text-[#64757D] mt-0.5">
                Please upload the updated certificate to resume verification by Scrutiny Officer.
              </p>
            </div>
          </div>

          <button
            onClick={onResolveDeficiency}
            className="px-4 py-2 bg-[#C58A27] hover:bg-[#a9741e] text-white text-xs font-semibold rounded-md transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Resolve & Re-upload
          </button>
        </div>
      )}

      {/* Active Application Status Tracker */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE5E2] mb-4">
          <div>
            <h2 className="text-sm font-bold text-[#123B5D]">Active Application Dossier</h2>
            <p className="text-xs text-[#64757D]">Primary submitted application status and timeline</p>
          </div>
          <button
            onClick={() => onNavigate('applications')}
            className="text-xs text-[#176B87] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>All Applications</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {myApplications.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64757D]">
            No applications submitted yet. Explore schemes to start your application.
          </div>
        ) : (
          (() => {
            const primaryApp = myApplications[0];
            return (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#123B5D]">{primaryApp.id}</span>
                      <span className="text-xs font-medium text-[#263640]">{primaryApp.schemeName}</span>
                    </div>
                    <span className="text-[11px] text-[#64757D] mt-0.5 block">
                      Enrolled: {primaryApp.institution} · Submitted {primaryApp.submittedAt}
                    </span>
                  </div>

                  <StatusBadge status={primaryApp.status} />
                </div>

                {/* Horizontal Step Timeline */}
                <div className="mt-4 pt-4 border-t border-[#DCE5E2] grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-2 rounded bg-[#E8F4EF] border border-[#247A5A]/30">
                    <div className="flex items-center gap-1 text-[#247A5A] font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>1. Submitted</span>
                    </div>
                    <span className="text-[10px] text-[#64757D] mt-0.5 block">Online Portal</span>
                  </div>

                  <div className={`p-2 rounded border ${['UNDER_AI_REVIEW', 'UNDER_DOCUMENT_REVIEW', 'DEFICIENCY_RAISED', 'RESUBMITTED', 'ELIGIBILITY_VERIFIED', 'SELECTED', 'SANCTIONED', 'DISBURSED'].includes(primaryApp.status) ? 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#247A5A]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-1 font-semibold text-[11px]">
                      {primaryApp.status === 'DEFICIENCY_RAISED' ? (
                        <AlertCircle className="w-3.5 h-3.5 text-[#C58A27]" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      <span>2. Scrutiny</span>
                    </div>
                    <span className="text-[10px] text-[#64757D] mt-0.5 block">
                      {primaryApp.status === 'DEFICIENCY_RAISED' ? 'Correction req.' : 'AI + Officer'}
                    </span>
                  </div>

                  <div className={`p-2 rounded border ${['ELIGIBILITY_VERIFIED', 'SHORTLISTED', 'SELECTED', 'SANCTIONED', 'DISBURSED'].includes(primaryApp.status) ? 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#247A5A]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-1 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>3. Verification</span>
                    </div>
                    <span className="text-[10px] text-[#64757D] mt-0.5 block">Eligible</span>
                  </div>

                  <div className={`p-2 rounded border ${['SELECTED', 'SANCTIONED', 'DISBURSED'].includes(primaryApp.status) ? 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#247A5A]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-1 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>4. Selection</span>
                    </div>
                    <span className="text-[10px] text-[#64757D] mt-0.5 block">Committee Award</span>
                  </div>

                  <div className={`p-2 rounded border ${['DISBURSED'].includes(primaryApp.status) ? 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#247A5A]' : primaryApp.status === 'SANCTIONED' ? 'bg-[#EAF3F8] border-[#176B87]/30 text-[#176B87]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <div className="flex items-center gap-1 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>5. DBT Credit</span>
                    </div>
                    <span className="text-[10px] text-[#64757D] mt-0.5 block">
                      {primaryApp.status === 'DISBURSED' ? 'Credited' : primaryApp.status === 'SANCTIONED' ? 'Sanctioned' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Recommended Opportunities: 3-4 Informational Scheme Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-[#123B5D]">Recommended Schemes</h2>
            <p className="text-xs text-[#64757D]">Opportunities matching your profile and academic level</p>
          </div>
          <button
            onClick={() => onNavigate('schemes')}
            className="text-xs text-[#176B87] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All Schemes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedSchemes.map(sch => {
            const eligibility = evaluateEligibility(profile, sch.rules);

            return (
              <div
                key={sch.id}
                className="bg-white p-4 rounded-lg border border-[#DCE5E2] flex flex-col justify-between hover:border-[#176B87]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-semibold text-[#176B87]">{sch.code}</span>
                    <span className="text-[#64757D]">Deadline: {sch.endDate}</span>
                  </div>

                  <h3 className="font-bold text-xs text-[#123B5D] leading-snug mb-1">
                    {sch.name}
                  </h3>

                  <p className="text-xs text-[#64757D] line-clamp-2 leading-relaxed mb-3">
                    {sch.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCE5E2]">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div>
                      <span className="text-[10px] text-[#64757D] block">Financial Grant</span>
                      <span className="font-bold text-[#185C46]">₹{sch.annualAmount.toLocaleString('en-IN')}/yr</span>
                    </div>

                    <div>
                      {eligibility.eligible ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#247A5A] bg-[#E8F4EF] px-2 py-0.5 rounded border border-[#247A5A]/30">
                          <CheckCircle2 className="w-3 h-3" />
                          Likely Eligible
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#64757D] bg-slate-100 px-2 py-0.5 rounded">
                          Review Rules
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onApplyScheme(sch.id)}
                      className="w-full py-1.5 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Apply Now
                    </button>
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
