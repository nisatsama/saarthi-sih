import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scheme } from '../../types';
import { evaluateEligibility } from '../../services/ruleEngine';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  X,
  Calendar,
  IndianRupee,
  Layers
} from 'lucide-react';

interface ApplicantSchemesPageProps {
  onApply: (schemeId: string) => void;
}

export const ApplicantSchemesPage: React.FC<ApplicantSchemesPageProps> = ({ onApply }) => {
  const { schemes, profile } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [inspectingScheme, setInspectingScheme] = useState<Scheme | null>(null);

  const filteredSchemes = schemes.filter(sch => {
    const matchesSearch = 
      sch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = levelFilter === 'ALL' || sch.academicLevel === levelFilter || sch.academicLevel === 'All';
    const matchesType = typeFilter === 'ALL' || sch.type === typeFilter;

    return matchesSearch && matchesLevel && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Scheme Discovery & Eligibility</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Explore national and central scholarship/fellowship programs for Scheduled Tribe students
          </p>
        </div>
        <div className="text-xs text-[#64757D] bg-[#F8FAF9] px-3 py-1.5 rounded border border-[#DCE5E2]">
          Evaluating against profile: <span className="font-semibold text-[#123B5D]">{profile.fullName}</span> ({profile.programme})
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#64757D]" />
          <input
            type="text"
            placeholder="Search schemes by name, keyword, or code..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs text-[#263640] placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#64757D]">Level:</span>
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="px-2 py-1 border border-[#DCE5E2] rounded text-xs text-[#263640] bg-white focus:outline-none"
            >
              <option value="ALL">All Levels</option>
              <option value="PhD">PhD</option>
              <option value="PostGraduate">Post Graduate</option>
              <option value="UnderGraduate">Under Graduate</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#64757D]">Type:</span>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-2 py-1 border border-[#DCE5E2] rounded text-xs text-[#263640] bg-white focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="FELLOWSHIP">Fellowship</option>
              <option value="SCHOLARSHIP">Scholarship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map(sch => {
          const evalResult = evaluateEligibility(profile, sch.rules);

          return (
            <div
              key={sch.id}
              className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col justify-between hover:border-[#176B87]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#176B87]">{sch.code}</span>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#EAF3F8] text-[#123B5D] px-2 py-0.5 rounded text-[11px] font-medium">
                      {sch.type}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      {sch.academicLevel}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[#123B5D] leading-snug mb-1.5">
                  {sch.name}
                </h3>

                <p className="text-xs text-[#64757D] leading-relaxed mb-4">
                  {sch.description}
                </p>

                {/* Key Attributes */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#F8FAF9] rounded border border-[#DCE5E2] text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-[#64757D] block">Financial Award</span>
                    <span className="font-bold text-[#185C46]">₹{sch.annualAmount.toLocaleString('en-IN')} / year</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64757D] block">Application Deadline</span>
                    <span className="font-medium text-[#263640] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#64757D]" />
                      {sch.endDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions and Eligibility Status */}
              <div className="pt-3 border-t border-[#DCE5E2] flex items-center justify-between gap-2">
                <div>
                  {evalResult.eligible ? (
                    <button
                      onClick={() => setInspectingScheme(sch)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#247A5A] hover:underline cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#247A5A]" />
                      <span>Likely Eligible ({evalResult.conditions.filter(c => c.passed).length}/{evalResult.conditions.length} Rules)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setInspectingScheme(sch)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64757D] hover:underline cursor-pointer"
                    >
                      <XCircle className="w-4 h-4 text-[#C58A27]" />
                      <span>Review Conditions ({evalResult.conditions.filter(c => !c.passed).length} Unmet)</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectingScheme(sch)}
                    className="px-3 py-1.5 text-xs font-medium border border-[#DCE5E2] hover:bg-slate-50 text-[#263640] rounded transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onApply(sch.id)}
                    className="px-4 py-1.5 text-xs font-semibold bg-[#176B87] hover:bg-[#123B5D] text-white rounded transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Eligibility Inspection Drawer/Modal */}
      {inspectingScheme && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCE5E2]">
              <div>
                <span className="text-xs font-bold text-[#176B87]">{inspectingScheme.code}</span>
                <h3 className="text-base font-bold text-[#123B5D] leading-tight">
                  {inspectingScheme.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectingScheme(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scheme Details */}
            <div className="py-4 space-y-4 text-xs">
              <p className="text-[#64757D] leading-relaxed">
                {inspectingScheme.description}
              </p>

              {/* Dynamic Rule Evaluation Breakdown */}
              <div className="p-3.5 bg-[#F8FAF9] border border-[#DCE5E2] rounded-lg">
                <h4 className="font-bold text-xs text-[#123B5D] mb-2 uppercase tracking-wide flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Dynamic Eligibility Rules Evaluation</span>
                </h4>
                <p className="text-[11px] text-[#64757D] mb-3">
                  Tested in real-time against applicant profile credentials:
                </p>

                <div className="space-y-2">
                  {evaluateEligibility(profile, inspectingScheme.rules).conditions.map((c, i) => (
                    <div 
                      key={i}
                      className={`p-2.5 rounded border text-xs flex items-start justify-between gap-3 ${c.passed ? 'bg-[#E8F4EF] border-[#247A5A]/30 text-[#185C46]' : 'bg-[#FCF5E8] border-[#E8CA8C] text-[#C58A27]'}`}
                    >
                      <div className="flex items-start gap-2">
                        {c.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#247A5A] mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#C58A27] mt-0.5 shrink-0" />
                        )}
                        <div>
                          <div className="font-semibold">{c.rule}</div>
                          <div className="text-[11px] opacity-80 mt-0.5">
                            Required: {String(c.requiredValue)} · Actual: {String(c.actualValue)}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/70">
                        {c.passed ? 'Satisfied' : 'Unmet'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div>
                <h4 className="font-bold text-xs text-[#123B5D] mb-2 uppercase tracking-wide">
                  Required Documents Checklist ({inspectingScheme.requiredDocuments.length})
                </h4>
                <div className="divide-y divide-[#DCE5E2] border border-[#DCE5E2] rounded-md">
                  {inspectingScheme.requiredDocuments.map(doc => (
                    <div key={doc.id} className="p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#176B87]" />
                        <span className="font-medium text-[#263640]">{doc.name}</span>
                      </div>
                      <span className="text-[10px] text-[#64757D]">
                        {doc.allowedFormats.join(', ')} (Max {(doc.maxSizeBytes / (1024 * 1024)).toFixed(0)}MB)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#DCE5E2] flex items-center justify-between">
              <button
                onClick={() => setInspectingScheme(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#263640] rounded text-xs font-medium cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const sId = inspectingScheme.id;
                  setInspectingScheme(null);
                  onApply(sId);
                }}
                className="px-4 py-1.5 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
