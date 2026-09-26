import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { DocumentType, ApplicationDocument } from '../../types';
import { 
  FolderCheck, 
  FileText, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  Cpu, 
  X, 
  RefreshCw,
  Clock,
  ShieldCheck
} from 'lucide-react';

import confetti from 'canvas-confetti';

export const ApplicantDocumentsPage: React.FC = () => {
  const { applications, currentUser, resolveDeficiency, uploadDocument, setToast } = useApp();
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<ApplicationDocument | null>(null);

  // Focus on Rahul's application
  const myApp = applications.find(a => a.applicantEmail === currentUser.email || a.id === 'TS-2026-00421') || applications[0];
  const openDeficiency = myApp?.deficiencies.find(d => d.status === 'OPEN');

  const handleResolveDeficiencyUpload = () => {
    if (!openDeficiency) return;
    resolveDeficiency(myApp.id, openDeficiency.id, 'Rahul_Oraon_Income_Cert_FY26-27_Valid.pdf');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleReplaceDocument = (docType: DocumentType) => {
    const updatedName = `${docType.toLowerCase()}_updated_scan.pdf`;
    uploadDocument(myApp.id, docType, updatedName, '1.4 MB');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Document Management & AI Scrutiny</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Dossier #{myApp.id} · Verified certificate repository with automated optical extraction
          </p>
        </div>
        <StatusBadge status={myApp.status} />
      </div>

      {/* Action Required: Deficiency Resolution Box (Section 25) */}
      {openDeficiency && (
        <div className="bg-[#FCF5E8] border-2 border-[#E8CA8C] rounded-lg p-5 space-y-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#C58A27] text-white rounded-md mt-0.5 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-[#C58A27] uppercase tracking-wider">
                  ACTION REQUIRED — INCOME CERTIFICATE CORRECTION
                </span>
                <span className="text-xs text-[#64757D] font-medium">
                  Resolution Deadline: <strong>{openDeficiency.deadline}</strong>
                </span>
              </div>

              <div className="mt-2 text-xs text-[#263640] space-y-1.5">
                <div>
                  <strong className="text-[#123B5D]">Issue Identified by Scrutiny Officer:</strong>
                  <p className="text-[#64757D] mt-0.5">{openDeficiency.explanation}</p>
                </div>
                <div>
                  <strong className="text-[#123B5D]">What you need to do:</strong>
                  <p className="text-[#64757D] mt-0.5">
                    Upload the current financial year (2026-27) certificate issued by the Circle Officer / Tehsildar reflecting your declared annual family income of ₹1,80,000.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={handleResolveDeficiencyUpload}
                  className="px-4 py-2 bg-[#247A5A] hover:bg-[#185C46] text-white text-xs font-bold rounded-md flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>Attach Current FY 2026-27 Certificate (Rahul_Oraon_Income_Cert_FY26-27_Valid.pdf)</span>
                </button>
                <span className="text-[11px] text-[#64757D]">
                  Triggers automated AI re-extraction & notifies officer
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Documents List */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
            Uploaded Documents Checklist ({myApp.documents.length})
          </h2>
          <span className="text-[11px] text-[#64757D]">
            AI Verification Engine: Active (OCR + Cross-Field Integrity)
          </span>
        </div>

        <div className="divide-y divide-[#DCE5E2]">
          {myApp.documents.map(doc => {
            const hasIssue = doc.status === 'REQUIRES_REVIEW' || doc.status === 'REJECTED';
            const isVerified = doc.status === 'VERIFIED';

            return (
              <div 
                key={doc.id}
                className={`p-4 transition-colors ${hasIssue ? 'bg-[#FCF5E8]/30' : isVerified ? 'bg-white' : 'bg-slate-50'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md shrink-0 mt-0.5 ${hasIssue ? 'bg-[#FCF5E8] text-[#C58A27] border border-[#E8CA8C]' : 'bg-[#E8F4EF] text-[#247A5A]'}`}>
                      <FileText className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#123B5D]">
                          {doc.documentType.replace(/_/g, ' ')}
                        </span>
                        <StatusBadge status={doc.status} size="sm" />
                      </div>

                      <div className="text-[11px] text-[#64757D] mt-0.5 flex flex-wrap items-center gap-3">
                        <span className="font-mono">{doc.fileName}</span>
                        <span>·</span>
                        <span>{doc.fileSize}</span>
                        <span>·</span>
                        <span>Uploaded: {doc.uploadedAt}</span>
                      </div>

                      {/* AI Finding summary */}
                      {doc.aiFinding && (
                        <div className="mt-2 text-xs flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#2A8C82] bg-[#EAF3F8] px-2 py-0.5 rounded font-medium border border-[#2A8C82]/20">
                            <Cpu className="w-3 h-3 text-[#2A8C82]" />
                            <span>AI Confidence: {Math.round(doc.aiFinding.confidence * 100)}%</span>
                          </span>

                          {doc.aiFinding.requiresManualReview ? (
                            <span className="text-[11px] text-[#C58A27] font-medium flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Discrepancy: Income value mismatch</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#247A5A] font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Name & Identity Match Verified</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => setSelectedDocForPreview(doc)}
                      className="px-3 py-1.5 text-xs font-medium bg-[#F8FAF9] hover:bg-slate-100 text-[#263640] border border-[#DCE5E2] rounded flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#64757D]" />
                      <span>Inspect AI Audit</span>
                    </button>

                    <button
                      onClick={() => handleReplaceDocument(doc.documentType)}
                      className="px-3 py-1.5 text-xs font-medium text-[#176B87] hover:bg-[#EAF3F8] rounded flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Replace</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Document Intelligence Audit Drawer / Modal */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCE5E2]">
              <div>
                <span className="text-xs font-bold text-[#176B87]">AI DOCUMENT INTELLIGENCE REPORT</span>
                <h3 className="text-sm font-bold text-[#123B5D] mt-0.5">
                  {selectedDocForPreview.documentType.replace(/_/g, ' ')}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Confidence Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#F8FAF9] rounded border border-[#DCE5E2]">
                <div>
                  <span className="text-[#64757D] block">Extraction Confidence:</span>
                  <span className="font-bold text-sm text-[#185C46]">
                    {Math.round((selectedDocForPreview.aiFinding?.confidence || 0.95) * 100)}%
                  </span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Document Legibility:</span>
                  <span className="font-semibold text-[#247A5A]">High (300 DPI Digital Seal)</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Name Match:</span>
                  <span className="font-semibold text-[#247A5A]">✓ 100% Pass (Rahul Oraon)</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Duplicate Document Risk:</span>
                  <span className="font-semibold text-[#247A5A]">Low (&lt; 2%)</span>
                </div>
              </div>

              {/* Extracted Fields Table */}
              <div>
                <h4 className="font-bold text-xs text-[#123B5D] uppercase tracking-wide mb-2">
                  Optical Character Recognition (OCR) Extracted Key-Values
                </h4>

                <div className="border border-[#DCE5E2] rounded divide-y divide-[#DCE5E2] bg-white">
                  {Object.entries(selectedDocForPreview.aiFinding?.extractedFields || {}).map(([key, val]) => (
                    <div key={key} className="p-2.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-[#64757D]">{key}</span>
                      <span className="font-semibold text-[#263640]">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Finding Note */}
              <div className={`p-3 rounded border text-xs ${selectedDocForPreview.aiFinding?.requiresManualReview ? 'bg-[#FCF5E8] border-[#E8CA8C] text-[#C58A27]' : 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#185C46]'}`}>
                <strong>AI-Assisted Finding:</strong>
                <p className="mt-1 leading-relaxed">
                  {selectedDocForPreview.aiFinding?.notes || 'All verification parameters conform to scheme standards.'}
                </p>
                <div className="mt-2 text-[10px] text-[#64757D]">
                  Human-in-the-loop: AI findings assist authorized officers. Final validation is executed by authorized revenue and scrutiny personnel.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE5E2] text-right">
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-1.5 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
