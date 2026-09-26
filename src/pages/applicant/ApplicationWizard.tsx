import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scheme, DocumentType, ApplicationDocument } from '../../types';
import { evaluateEligibility } from '../../services/ruleEngine';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Lock,
  AlertCircle,
  Save,
  Clock
} from 'lucide-react';

interface ApplicationWizardProps {
  schemeId: string;
  onCancel: () => void;
  onSuccess: (appId: string) => void;
}

export const ApplicationWizard: React.FC<ApplicationWizardProps> = ({ schemeId, onCancel, onSuccess }) => {
  const { schemes, profile, submitApplication, setToast } = useApp();
  const scheme = schemes.find(s => s.id === schemeId) || schemes[0];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [agreedToDeclaration, setAgreedToDeclaration] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, { name: string; size: string }>>({
    'ST_CERTIFICATE': { name: 'ST_Certificate_Rahul_Oraon.pdf', size: '1.4 MB' },
    'INCOME_CERTIFICATE': { name: 'Income_Certificate_2026.pdf', size: '1.1 MB' },
    'MARKSHEET': { name: 'MSc_Consolidated_Marksheet.pdf', size: '2.1 MB' },
    'ADMISSION_PROOF': { name: 'PhD_Enrolment_Order.pdf', size: '920 KB' },
    'RESEARCH_PROPOSAL': { name: 'Research_Synopsis_Forest_Rights.pdf', size: '3.4 MB' }
  });

  const evalResult = evaluateEligibility(profile, scheme.rules);

  const handleSimulatedFileUpload = (docType: DocumentType) => {
    const fakeFileName = `${docType.toLowerCase()}_${profile.fullName.replace(/\s+/g, '_')}_verified.pdf`;
    setUploadedFiles(prev => ({
      ...prev,
      [docType]: { name: fakeFileName, size: '1.2 MB' }
    }));
    setToast(`File '${fakeFileName}' uploaded. AI consistency verification: Passed.`);
  };

  const handleFinalSubmit = () => {
    if (!agreedToDeclaration) {
      setToast('Please confirm the mandatory applicant declaration before submitting.');
      return;
    }

    const docs: ApplicationDocument[] = Object.entries(uploadedFiles).map(([docType, file], idx) => ({
      id: `doc-wiz-${Date.now()}-${idx}`,
      applicationId: '',
      documentType: docType as DocumentType,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: 'Just now',
      status: 'VERIFIED',
      aiFinding: {
        confidence: 0.98,
        nameMatch: true,
        dobMatch: true,
        incomeMatch: true,
        documentQuality: true,
        duplicateRisk: 0,
        extractedFields: {
          'Applicant Name': profile.fullName,
          'Community': profile.tribeCommunity,
          'Extracted Income': `₹${profile.annualFamilyIncome.toLocaleString('en-IN')}`
        },
        notes: 'Pre-submission document verification passed without anomalies.',
        requiresManualReview: false
      }
    }));

    const newApp = submitApplication({
      schemeId: scheme.id,
      schemeName: scheme.name,
      schemeType: scheme.type,
      documents: docs
    });

    onSuccess(newApp.id);
  };

  const steps = [
    { num: 1, title: 'Profile' },
    { num: 2, title: 'Eligibility' },
    { num: 3, title: 'Education' },
    { num: 4, title: 'Documents' },
    { num: 5, title: 'Bank / DBT' },
    { num: 6, title: 'Declaration & Submit' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex items-center justify-between">
        <div>
          <button
            onClick={onCancel}
            className="text-xs text-[#176B87] hover:underline flex items-center gap-1 mb-1 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Schemes</span>
          </button>
          <h1 className="text-lg font-bold text-[#123B5D]">
            Application Form: {scheme.name}
          </h1>
          <p className="text-xs text-[#64757D]">
            Scheme Code: <span className="font-semibold text-[#176B87]">{scheme.code}</span> · Scheduled Tribe Welfare Division
          </p>
        </div>

        <button
          onClick={() => {
            setToast('Application draft saved locally.');
            onCancel();
          }}
          className="px-3 py-1.5 border border-[#DCE5E2] hover:bg-slate-50 text-[#263640] rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Draft</span>
        </button>
      </div>

      {/* Progress Steps Indicator */}
      <div className="bg-white p-4 rounded-lg border border-[#DCE5E2]">
        <div className="grid grid-cols-6 gap-2">
          {steps.map(step => {
            const isCompleted = step.num < currentStep;
            const isCurrent = step.num === currentStep;

            return (
              <div 
                key={step.num}
                onClick={() => isCompleted && setCurrentStep(step.num)}
                className={`text-center py-2 px-1 rounded transition-colors ${isCurrent ? 'bg-[#EAF3F8] text-[#176B87] font-semibold' : isCompleted ? 'text-[#247A5A] font-medium cursor-pointer' : 'text-slate-400'}`}
              >
                <div className="text-[11px] flex items-center justify-center gap-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#247A5A]" />
                  ) : (
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${isCurrent ? 'bg-[#176B87] text-white font-bold' : 'bg-slate-200 text-slate-600'}`}>
                      {step.num}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Area */}
      <div className="bg-white p-6 rounded-lg border border-[#DCE5E2] min-h-[380px] flex flex-col justify-between">
        <div>
          {/* Step 1: Profile Check */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#123B5D] pb-2 border-b border-[#DCE5E2]">
                Step 1: Verify Profile Credentials
              </h3>
              <p className="text-[#64757D]">
                These verified attributes from your applicant profile will be attached to the application.
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8FAF9] rounded border border-[#DCE5E2]">
                <div>
                  <span className="text-[#64757D] block">Full Name:</span>
                  <span className="font-semibold text-[#263640]">{profile.fullName}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Category & Tribe:</span>
                  <span className="font-semibold text-[#247A5A]">{profile.category} ({profile.tribeCommunity})</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Date of Birth:</span>
                  <span className="font-medium text-[#263640]">{profile.dob}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Domicile State & District:</span>
                  <span className="font-medium text-[#263640]">{profile.state}, {profile.district}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Aadhaar-Linked Mobile:</span>
                  <span className="font-medium text-[#263640]">{profile.mobile}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Email:</span>
                  <span className="font-medium text-[#263640]">{profile.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dynamic Eligibility */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#123B5D] pb-2 border-b border-[#DCE5E2]">
                Step 2: Real-time Eligibility Rule Engine Evaluation
              </h3>
              <p className="text-[#64757D]">
                The system automatically evaluates your verified credentials against the scheme's statutory criteria:
              </p>

              <div className="space-y-2.5">
                {evalResult.conditions.map((cond, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded border flex items-center justify-between ${cond.passed ? 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#185C46]' : 'bg-[#FCF5E8] border-[#E8CA8C] text-[#C58A27]'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      {cond.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#247A5A]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#C58A27]" />
                      )}
                      <div>
                        <div className="font-semibold">{cond.rule}</div>
                        <div className="text-[11px] opacity-80">
                          Threshold: {String(cond.requiredValue)} · Extracted Value: {String(cond.actualValue)}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/80">
                      {cond.passed ? 'Passed' : 'Attention Required'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Education */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#123B5D] pb-2 border-b border-[#DCE5E2]">
                Step 3: Academic Enrolment Details
              </h3>

              <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8FAF9] rounded border border-[#DCE5E2]">
                <div className="col-span-2">
                  <span className="text-[#64757D] block">Institution:</span>
                  <span className="font-semibold text-[#263640]">{profile.institution}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Programme:</span>
                  <span className="font-semibold text-[#123B5D]">{profile.programme}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Course:</span>
                  <span className="font-medium text-[#263640]">{profile.course}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Qualifying Marks:</span>
                  <span className="font-bold text-[#185C46]">{profile.marksPercentage}%</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Roll Number:</span>
                  <span className="font-mono text-[#263640]">{profile.rollNo}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents Upload */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#123B5D] pb-2 border-b border-[#DCE5E2]">
                Step 4: Upload Required Documents ({scheme.requiredDocuments.length})
              </h3>
              <p className="text-[#64757D]">
                Ensure certificates are digitally signed and legible. The SAARTHI AI engine will verify name and consistency upon submission.
              </p>

              <div className="space-y-3">
                {scheme.requiredDocuments.map(reqDoc => {
                  const uploaded = uploadedFiles[reqDoc.documentType];

                  return (
                    <div
                      key={reqDoc.id}
                      className="p-3 border border-[#DCE5E2] rounded-md flex items-center justify-between bg-[#FAFCFB]"
                    >
                      <div className="flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-[#176B87] mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-[#263640]">{reqDoc.name}</div>
                          <div className="text-[11px] text-[#64757D]">{reqDoc.description}</div>
                          {uploaded && (
                            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#247A5A] font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Uploaded: {uploaded.name} ({uploaded.size})</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleSimulatedFileUpload(reqDoc.documentType)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-[#DCE5E2] text-[#123B5D] rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploaded ? 'Replace' : 'Upload'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Bank Details */}
          {currentStep === 5 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#123B5D] pb-2 border-b border-[#DCE5E2]">
                Step 5: Direct Benefit Transfer (DBT) Account
              </h3>

              <div className="p-4 bg-[#E8F4EF] border border-[#247A5A]/30 rounded-md flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#247A5A] shrink-0" />
                <div>
                  <div className="font-bold text-[#185C46]">Aadhaar Payment Bridge Validated</div>
                  <div className="text-[11px] text-[#247A5A] mt-0.5">
                    Your bank account at <strong>{profile.bankName}</strong> ({profile.maskedAccountNumber}) is mapped in NPCI for automated direct credits.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8FAF9] rounded border border-[#DCE5E2]">
                <div>
                  <span className="text-[#64757D] block">Account Holder:</span>
                  <span className="font-semibold text-[#263640]">{profile.accountHolderName}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Bank Name:</span>
                  <span className="font-semibold text-[#263640]">{profile.bankName}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">Account Number:</span>
                  <span className="font-mono text-[#263640]">{profile.maskedAccountNumber}</span>
                </div>
                <div>
                  <span className="text-[#64757D] block">IFSC:</span>
                  <span className="font-mono text-[#263640]">{profile.ifscCode}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Declaration & Submit */}
          {currentStep === 6 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#123B5D] pb-2 border-b border-[#DCE5E2]">
                Step 6: Review & Final Declaration
              </h3>

              <div className="p-3 bg-[#F8FAF9] border border-[#DCE5E2] rounded text-xs space-y-1">
                <div><strong>Scheme:</strong> {scheme.name} ({scheme.code})</div>
                <div><strong>Applicant:</strong> {profile.fullName} (ST - {profile.tribeCommunity})</div>
                <div><strong>University:</strong> {profile.institution}</div>
                <div><strong>Annual Amount:</strong> ₹{scheme.annualAmount.toLocaleString('en-IN')}</div>
              </div>

              <div className="p-4 bg-[#FAFCFB] border border-[#DCE5E2] rounded-md space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToDeclaration}
                    onChange={e => setAgreedToDeclaration(e.target.checked)}
                    className="mt-0.5 rounded text-[#176B87] focus:ring-[#176B87]"
                  />
                  <span className="text-xs text-[#263640] leading-relaxed">
                    I hereby solemnly declare that all statements made and certificates uploaded in this application are true, complete, and correct to the best of my knowledge and belief. I understand that any false or fabricated information will lead to immediate cancellation of award and recovery of disbursed amounts under the Public Demands Recovery Act.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="pt-6 border-t border-[#DCE5E2] flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-[#DCE5E2] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-[#263640] rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < 6 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
              className="px-5 py-2 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              disabled={!agreedToDeclaration}
              className="px-6 py-2 bg-[#247A5A] hover:bg-[#185C46] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Application Online</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
