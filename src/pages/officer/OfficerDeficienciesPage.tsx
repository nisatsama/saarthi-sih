import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { AlertCircle, CheckCircle2, Clock, ArrowRight, FileText } from 'lucide-react';

interface OfficerDeficienciesPageProps {
  onSelectApplication: (id: string) => void;
}

export const OfficerDeficienciesPage: React.FC<OfficerDeficienciesPageProps> = ({ onSelectApplication }) => {
  const { applications } = useApp();

  const allDeficiencies = applications.flatMap(app => 
    app.deficiencies.map(def => ({
      ...def,
      applicantName: app.applicantName,
      schemeName: app.schemeName,
      appStatus: app.status
    }))
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Deficiency Management & Resolution Audit</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Monitor correction requests issued to applicants, response compliance, and resolved resubmissions
          </p>
        </div>
        <span className="text-xs font-semibold text-[#C58A27] bg-[#FCF5E8] px-3 py-1.5 rounded border border-[#E8CA8C]">
          {allDeficiencies.filter(d => d.status === 'OPEN').length} Open Correction Requests
        </span>
      </div>

      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8FAF9] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
              <tr>
                <th className="p-3.5">Application ID</th>
                <th className="p-3.5">Applicant & Scheme</th>
                <th className="p-3.5">Target Document</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Explanation</th>
                <th className="p-3.5">Deadline</th>
                <th className="p-3.5">Deficiency Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5E2]">
              {allDeficiencies.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-xs text-[#64757D]">
                    No active or historical deficiency records.
                  </td>
                </tr>
              ) : (
                allDeficiencies.map(def => (
                  <tr key={def.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-[#123B5D]">
                      {def.applicationId}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-[#263640]">{def.applicantName}</div>
                      <div className="text-[10px] text-[#64757D] truncate max-w-[160px]">{def.schemeName}</div>
                    </td>
                    <td className="p-3.5 font-medium text-[#123B5D]">
                      {def.documentType.replace(/_/g, ' ')}
                    </td>
                    <td className="p-3.5">
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {def.reasonType.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#64757D] max-w-[220px]">
                      <p className="line-clamp-2">{def.explanation}</p>
                      {def.resolutionNote && (
                        <p className="text-[10px] text-[#247A5A] mt-1 font-medium">{def.resolutionNote}</p>
                      )}
                    </td>
                    <td className="p-3.5 text-[#64757D] whitespace-nowrap">
                      {def.deadline}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {def.status === 'OPEN' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#C58A27] bg-[#FCF5E8] border border-[#E8CA8C] px-2 py-0.5 rounded font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          <span>Open</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#247A5A] bg-[#E8F4EF] border border-[#247A5A]/30 px-2 py-0.5 rounded font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Resolved</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectApplication(def.applicationId)}
                        className="px-3 py-1 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Open Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
