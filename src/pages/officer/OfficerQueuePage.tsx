import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface OfficerQueuePageProps {
  onSelectApplication: (id: string) => void;
}

export const OfficerQueuePage: React.FC<OfficerQueuePageProps> = ({ onSelectApplication }) => {
  const { applications, schemes } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [schemeFilter, setSchemeFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesScheme = schemeFilter === 'ALL' || app.schemeId === schemeFilter;
    const matchesState = stateFilter === 'ALL' || app.state === stateFilter;

    return matchesSearch && matchesStatus && matchesScheme && matchesState;
  });

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage) || 1;
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const uniqueStates = Array.from(new Set(applications.map(a => a.state)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Scrutiny Queue & Dossier Review</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Comprehensive application records requiring document verification, AI scrutiny checks, and clearance decisions
          </p>
        </div>
        <div className="text-xs font-semibold text-[#176B87] bg-[#EAF3F8] px-3 py-1.5 rounded border border-[#176B87]/30">
          {filteredApps.length} Records in Active Queue
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#DCE5E2] space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[240px] flex items-center gap-2 px-3 py-1.5 bg-[#F8FAF9] border border-[#DCE5E2] rounded-md">
            <Search className="w-4 h-4 text-[#64757D]" />
            <input
              type="text"
              placeholder="Search by Application ID, Applicant Name, Institution, or District..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full text-xs text-[#263640] placeholder-slate-400 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 border border-[#DCE5E2] rounded bg-white text-xs text-[#263640] focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNDER_DOCUMENT_REVIEW">Under Document Review</option>
              <option value="DEFICIENCY_RAISED">Deficiency Raised</option>
              <option value="RESUBMITTED">Resubmitted</option>
              <option value="ELIGIBILITY_VERIFIED">Eligibility Verified</option>
              <option value="SELECTED">Selected</option>
              <option value="SANCTIONED">Sanctioned</option>
              <option value="DISBURSED">Disbursed</option>
            </select>

            <select
              value={schemeFilter}
              onChange={e => {
                setSchemeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 border border-[#DCE5E2] rounded bg-white text-xs text-[#263640] focus:outline-none max-w-[180px] truncate"
            >
              <option value="ALL">All Schemes</option>
              {schemes.map(s => (
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>

            <select
              value={stateFilter}
              onChange={e => {
                setStateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 border border-[#DCE5E2] rounded bg-white text-xs text-[#263640] focus:outline-none"
            >
              <option value="ALL">All States</option>
              {uniqueStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Operational Table (Section 22) */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8FAF9] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
              <tr>
                <th className="p-3">Application ID</th>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Scheme</th>
                <th className="p-3">State & Inst.</th>
                <th className="p-3">Submitted</th>
                <th className="p-3">AI Finding</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5E2]">
              {paginatedApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-xs text-[#64757D]">
                    No applications match the current filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedApps.map(app => {
                  const hasAnomaly = app.documents.some(d => d.aiFinding?.requiresManualReview);

                  return (
                    <tr key={app.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#123B5D]">
                        {app.id}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-[#263640]">{app.applicantName}</div>
                        <div className="text-[10px] text-[#64757D]">ST ({app.programme})</div>
                      </td>
                      <td className="p-3 text-[#64757D] max-w-[200px] truncate" title={app.schemeName}>
                        {app.schemeName}
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-[#263640]">{app.state}</div>
                        <div className="text-[10px] text-[#64757D] truncate max-w-[140px]">{app.institution}</div>
                      </td>
                      <td className="p-3 text-[#64757D] whitespace-nowrap">
                        {app.submittedAt}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {hasAnomaly ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#C58A27] font-semibold bg-[#FCF5E8] px-2 py-0.5 rounded border border-[#E8CA8C]">
                            <AlertCircle className="w-3 h-3" />
                            <span>Mismatch (71%)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#247A5A] font-medium bg-[#E8F4EF] px-2 py-0.5 rounded border border-[#247A5A]/30">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>AI Verified</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => onSelectApplication(app.id)}
                          className="px-3 py-1 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Scrutinize
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-[#F8FAF9] border-t border-[#DCE5E2] flex items-center justify-between text-xs text-[#64757D]">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredApps.length)} of {filteredApps.length} entries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-[#DCE5E2] disabled:opacity-40 hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-medium text-[#263640]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-[#DCE5E2] disabled:opacity-40 hover:bg-white cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
