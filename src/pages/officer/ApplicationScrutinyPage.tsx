import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { ApplicationDocument } from '../../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Cpu, 
  FileText, 
  ShieldAlert, 
  User, 
  GraduationCap, 
  IndianRupee, 
  Eye, 
  Clock, 
  Send,
  X,
  ShieldCheck,
  Building
} from 'lucide-react';

interface ApplicationScrutinyPageProps {
  applicationId: string;
  onBack: () => void;
}

export const ApplicationScrutinyPage: React.FC<ApplicationScrutinyPageProps> = ({
  applicationId,
  onBack
}) => {
  const { applications, raiseDeficiency, verifyApplication, setToast } = useApp();
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);
  const [deficiencyReason, setDeficiencyReason] = useState<'MISSING_DOCUMENT' | 'INVALID_DOCUMENT' | 'INFORMATION_MISMATCH' | 'UNREADABLE_DOCUMENT' | 'OTHER'>('INFORMATION_MISMATCH');
  const [deficiencyExplanation, setDeficiencyExplanation] = useState('Income value in application (₹1,80,000) does not match extracted revenue certificate value (₹3,40,000). Certificate is also from an expired financial year (FY 2023-24). Please upload current FY 2026-27 authenticated certificate.');
  const [deficiencyDeadline, setDeficiencyDeadline] = useState('2026-10-10');
  const [selectedDocForOcr, setSelectedDocForOcr] = useState<ApplicationDocument | null>(null);

  const app = applications.find(a => a.id === applicationId) || applications[0];

  const incomeDoc = app.documents.find(d => d.documentType === 'INCOME_CERTIFICATE') || app.documents[1];

  const handleRaiseDeficiencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomeDoc) return;
    raiseDeficiency(app.id, incomeDoc.id, deficiencyReason, deficiencyExplanation, deficiencyDeadline);
    setShowDeficiencyModal(false);
  };

  const handleVerifyApplication = () => {
    verifyApplication(app.id, 'All documentary evidence and academic qualifications scrutinized and approved in accordance with NFST guidelines.');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Dossier Bar */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs text-[#176B87] hover:underline flex items-center gap-1 mb-1 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Queue</span>
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#123B5D]">
              Application Dossier #{app.id}
            </h1>
            <StatusBadge status={app.status} />
          </div>
          <p className="text-xs text-[#64757D] mt-0.5">
            Scheme: <strong>{app.schemeName}</strong> · Submitted: {app.submittedAt}
          </p>
        </div>

        {/* Human-in-the-loop Reminder Pill (Section 20) */}
        <div className="bg-[#EAF3F8] border border-[#176B87]/30 px-3 py-1.5 rounded-md text-xs text-[#123B5D] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#176B87] shrink-0" />
          <div>
            <div className="font-semibold text-[11px]">AI ASSISTS → OFFICER DECIDES</div>
            <div className="text-[10px] text-[#64757D]">Final legal determination rests with the Scrutiny Officer</div>
          </div>
        </div>
      </div>

      {/* Sticky Decision Bar (Section 22) */}
      <div className="bg-white p-4 rounded-lg border border-[#DCE5E2] shadow-xs flex flex-wrap items-center justify-between gap-3 sticky top-16 z-20">
        <div className="text-xs font-semibold text-[#123B5D] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#176B87]" />
          <span>Officer Action for Dossier #{app.id}:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {app.status !== 'ELIGIBILITY_VERIFIED' && app.status !== 'SELECTED' && app.status !== 'SANCTIONED' && app.status !== 'DISBURSED' && (
            <>
              <button
                onClick={() => setShowDeficiencyModal(true)}
                className="px-4 py-2 bg-[#FCF5E8] hover:bg-[#faebd0] text-[#C58A27] border border-[#E8CA8C] rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Raise Deficiency</span>
              </button>

              <button
                onClick={handleVerifyApplication}
                className="px-5 py-2 bg-[#247A5A] hover:bg-[#185C46] text-white rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify Application</span>
              </button>
            </>
          )}

          {app.status === 'ELIGIBILITY_VERIFIED' && (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#247A5A] bg-[#E8F4EF] px-3 py-1.5 rounded border border-[#247A5A]/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Application Verified & Queued for Selection Committee</span>
            </div>
          )}

          {['SELECTED', 'SANCTIONED', 'DISBURSED'].includes(app.status) && (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#185C46] bg-[#E8F4EF] px-3 py-1.5 rounded border border-[#247A5A]/40">
              <CheckCircle2 className="w-4 h-4" />
              <span>Award Approved: {app.status}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Applicant Dossier & Documents (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Applicant Credentials Summary Card */}
          <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
            <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#DCE5E2]">
              <User className="w-4 h-4 text-[#176B87]" />
              <span>Applicant Profile & Identity</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[#64757D] block">Candidate:</span>
                <span className="font-semibold text-[#263640]">{app.applicantName}</span>
              </div>
              <div>
                <span className="text-[#64757D] block">Social Category:</span>
                <span className="font-semibold text-[#247A5A]">ST (Oraon Tribe)</span>
              </div>
              <div>
                <span className="text-[#64757D] block">Domicile State:</span>
                <span className="font-medium text-[#263640]">{app.state} ({app.district})</span>
              </div>
              <div>
                <span className="text-[#64757D] block">Enrolled Programme:</span>
                <span className="font-medium text-[#263640]">{app.programme}</span>
              </div>
              <div>
                <span className="text-[#64757D] block">Qualifying PG Marks:</span>
                <span className="font-bold text-[#185C46]">{app.percentage}% (&gt;= 55% Pass)</span>
              </div>
              <div>
                <span className="text-[#64757D] block">Declared Family Income:</span>
                <span className="font-bold text-[#263640]">₹{app.annualIncome.toLocaleString('en-IN')} / yr</span>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <span className="text-[#64757D] block">Host Institution:</span>
                <span className="font-semibold text-[#123B5D]">{app.institution}</span>
              </div>
            </div>
          </div>

          {/* Documents Scrutiny List (Section 22) */}
          <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
            <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
                Submitted Documents Scrutiny ({app.documents.length})
              </h2>
              <span className="text-[11px] text-[#64757D]">Click inspect to view OCR extraction</span>
            </div>

            <div className="divide-y divide-[#DCE5E2]">
              {app.documents.map(doc => {
                const isNeedsReview = doc.status === 'REQUIRES_REVIEW';

                return (
                  <div 
                    key={doc.id}
                    className={`p-4 transition-colors ${isNeedsReview ? 'bg-[#FCF5E8]/40' : 'bg-white'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md shrink-0 mt-0.5 ${isNeedsReview ? 'bg-[#FCF5E8] text-[#C58A27] border border-[#E8CA8C]' : 'bg-[#E8F4EF] text-[#247A5A]'}`}>
                          <FileText className="w-4 h-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#123B5D]">
                              {doc.documentType.replace(/_/g, ' ')}
                            </span>
                            <StatusBadge status={doc.status} size="sm" />
                          </div>

                          <div className="text-[11px] text-[#64757D] mt-0.5">
                            File: <span className="font-mono">{doc.fileName}</span> · Size: {doc.fileSize} · Uploaded: {doc.uploadedAt}
                          </div>

                          {doc.officerRemark && (
                            <div className="text-[11px] text-[#C58A27] font-medium mt-1">
                              Officer Remark: {doc.officerRemark}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedDocForOcr(doc)}
                        className="px-3 py-1.5 bg-[#F8FAF9] hover:bg-slate-100 border border-[#DCE5E2] text-[#176B87] rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-end sm:self-center"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect OCR / AI Audit</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Assistance Panel (Section 19 & 22) (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE5E2]">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#2A8C82]" />
                <h3 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
                  AI Assistance Panel
                </h3>
              </div>
              <span className="text-[10px] bg-[#EAF3F8] text-[#2A8C82] px-2 py-0.5 rounded font-semibold border border-[#2A8C82]/20">
                Active Engine
              </span>
            </div>

            {/* AI Document Scores */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F8FAF9] rounded border border-[#DCE5E2]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#64757D]">Extraction Confidence</span>
                  <span className="font-bold text-[#185C46]">
                    {incomeDoc?.aiFinding?.confidence ? `${Math.round(incomeDoc.aiFinding.confidence * 100)}%` : '94%'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#247A5A] rounded-full" 
                    style={{ width: `${(incomeDoc?.aiFinding?.confidence || 0.94) * 100}%` }} 
                  />
                </div>
              </div>

              {/* Individual Checks (Section 19) */}
              <div className="divide-y divide-[#DCE5E2] border border-[#DCE5E2] rounded bg-white text-xs">
                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-[#263640]">Name Match</span>
                  <span className="font-semibold text-[#247A5A] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✓ Passed (98%)</span>
                  </span>
                </div>

                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-[#263640]">Date / Validity Match</span>
                  <span className="font-semibold text-[#247A5A] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✓ Passed</span>
                  </span>
                </div>

                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-[#263640]">Income Consistency</span>
                  {incomeDoc?.aiFinding?.incomeMatch === false ? (
                    <span className="font-bold text-[#C58A27] flex items-center gap-1 bg-[#FCF5E8] px-1.5 py-0.5 rounded">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>⚠ Mismatch (71%)</span>
                    </span>
                  ) : (
                    <span className="font-semibold text-[#247A5A] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>✓ Passed</span>
                    </span>
                  )}
                </div>

                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-[#263640]">Document Quality</span>
                  <span className="font-semibold text-[#247A5A] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✓ High (300 DPI)</span>
                  </span>
                </div>

                <div className="p-2.5 flex items-center justify-between">
                  <span className="text-[#263640]">Duplicate Risk</span>
                  <span className="font-semibold text-[#247A5A]">
                    ✓ 2% (Negligible)
                  </span>
                </div>
              </div>

              {/* AI Finding Narrative Callout (Section 19) */}
              <div className={`p-3 rounded border text-xs leading-relaxed ${incomeDoc?.aiFinding?.incomeMatch === false ? 'bg-[#FCF5E8] border-[#E8CA8C] text-[#263640]' : 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#185C46]'}`}>
                <div className="font-bold text-[#123B5D] uppercase text-[10px] tracking-wide mb-1">
                  AI-Assisted Finding & Recommendation:
                </div>
                {incomeDoc?.aiFinding?.incomeMatch === false ? (
                  <>
                    <p className="text-xs">
                      The income value extracted from this document (₹2,60,000) differs from the amount entered in the application (₹1,80,000). Issue date belongs to previous financial year.
                    </p>
                    <div className="mt-2 font-bold text-[#C58A27]">
                      Recommended action: Raise deficiency or request valid 2026-27 income certificate.
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-[#247A5A]">
                      All optical extractions conform with declared database values. Income, Community, and Degree criteria satisfied without anomalies.
                    </p>
                    <div className="mt-2 font-bold text-[#185C46]">
                      Recommended action: Proceed to verification.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Modal (Section 18) */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCE5E2]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#C58A27]" />
                <h3 className="text-sm font-bold text-[#123B5D]">Raise Application Deficiency</h3>
              </div>
              <button 
                onClick={() => setShowDeficiencyModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRaiseDeficiencySubmit} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#263640] mb-1">Target Document</label>
                <input
                  type="text"
                  disabled
                  value="Income Certificate (INCOME_CERTIFICATE)"
                  className="w-full px-3 py-2 border border-[#DCE5E2] rounded bg-slate-50 text-[#64757D]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#263640] mb-1">Deficiency Category *</label>
                <select
                  value={deficiencyReason}
                  onChange={e => setDeficiencyReason(e.target.value as any)}
                  className="w-full px-3 py-2 border border-[#DCE5E2] rounded bg-white text-[#263640] focus:outline-none"
                >
                  <option value="INFORMATION_MISMATCH">Information Mismatch (Data differs from document)</option>
                  <option value="MISSING_DOCUMENT">Missing Document</option>
                  <option value="INVALID_DOCUMENT">Invalid Document / Expired Financial Year</option>
                  <option value="UNREADABLE_DOCUMENT">Unreadable Document / Low Quality</option>
                  <option value="OTHER">Other Reason</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#263640] mb-1">Explanation & Guidance for Applicant *</label>
                <textarea
                  rows={3}
                  value={deficiencyExplanation}
                  onChange={e => setDeficiencyExplanation(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-[#DCE5E2] rounded text-[#263640] focus:outline-none focus:border-[#176B87]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#263640] mb-1">Correction Deadline *</label>
                <input
                  type="date"
                  value={deficiencyDeadline}
                  onChange={e => setDeficiencyDeadline(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-[#DCE5E2] rounded text-[#263640] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#DCE5E2] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowDeficiencyModal(false)}
                  className="px-4 py-2 border border-[#DCE5E2] hover:bg-slate-50 text-[#263640] rounded text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C58A27] hover:bg-[#a9741e] text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Notify Applicant & Raise Deficiency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OCR Preview Drawer */}
      {selectedDocForOcr && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCE5E2]">
              <div>
                <span className="text-xs font-bold text-[#176B87]">OCR OPTICAL EXTRACTION</span>
                <h3 className="text-sm font-bold text-[#123B5D]">
                  {selectedDocForOcr.documentType.replace(/_/g, ' ')}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocForOcr(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="border border-[#DCE5E2] rounded divide-y divide-[#DCE5E2] bg-[#FAFCFB]">
                {Object.entries(selectedDocForOcr.aiFinding?.extractedFields || {}).map(([key, val]) => (
                  <div key={key} className="p-2.5 flex items-center justify-between">
                    <span className="font-medium text-[#64757D]">{key}:</span>
                    <span className="font-semibold text-[#263640] font-mono">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE5E2] text-right">
              <button
                onClick={() => setSelectedDocForOcr(null)}
                className="px-4 py-1.5 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
