import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Application } from '../../types';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  X, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface MyApplicationsPageProps {
  onResolveDeficiency: () => void;
  onOpenSanction: (sanctionId: string) => void;
}

export const MyApplicationsPage: React.FC<MyApplicationsPageProps> = ({
  onResolveDeficiency,
  onOpenSanction
}) => {
  const { applications, currentUser } = useApp();
  const [selectedAppForTimeline, setSelectedAppForTimeline] = useState<Application | null>(null);

  const myApps = applications.filter(a => a.applicantEmail === currentUser.email || a.id === 'TS-2026-00421');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">My Applications & Submission History</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Track status, scrutiny reviews, deficiencies, and disbursements across all submitted dossiers
          </p>
        </div>
        <span className="text-xs font-semibold text-[#176B87] bg-[#EAF3F8] px-3 py-1 rounded border border-[#176B87]/30">
          {myApps.length} Submitted Dossiers
        </span>
      </div>

      {/* Applications Table / Cards */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8FAF9] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
              <tr>
                <th className="p-3.5">Application ID</th>
                <th className="p-3.5">Scheme Details</th>
                <th className="p-3.5">Institution</th>
                <th className="p-3.5">Submitted On</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5E2]">
              {myApps.map(app => (
                <tr key={app.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                  <td className="p-3.5 font-bold text-[#123B5D] font-mono">
                    {app.id}
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-[#263640]">{app.schemeName}</div>
                    <div className="text-[11px] text-[#64757D]">{app.schemeType}</div>
                  </td>
                  <td className="p-3.5 text-[#64757D]">
                    {app.institution}
                  </td>
                  <td className="p-3.5 text-[#64757D] whitespace-nowrap">
                    {app.submittedAt}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                    {app.status === 'DEFICIENCY_RAISED' && (
                      <button
                        onClick={onResolveDeficiency}
                        className="px-2.5 py-1 bg-[#C58A27] hover:bg-[#a9741e] text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Resolve Now
                      </button>
                    )}

                    {app.sanctionId && (
                      <button
                        onClick={() => onOpenSanction(app.sanctionId!)}
                        className="px-2.5 py-1 bg-[#247A5A] hover:bg-[#185C46] text-white rounded text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Sanction Order
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedAppForTimeline(app)}
                      className="px-2.5 py-1 bg-[#F8FAF9] hover:bg-slate-100 border border-[#DCE5E2] text-[#176B87] rounded text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Track Journey
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Timeline Drawer Modal (Section 19) */}
      {selectedAppForTimeline && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCE5E2]">
              <div>
                <span className="text-xs font-bold text-[#176B87]">AUDITABLE APPLICATION TIMELINE</span>
                <h3 className="text-sm font-bold text-[#123B5D] mt-0.5">
                  Dossier #{selectedAppForTimeline.id} — {selectedAppForTimeline.schemeName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppForTimeline(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4">
              <div className="mb-4 p-3 bg-[#F8FAF9] rounded border border-[#DCE5E2] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#64757D]">Current State:</span>
                  <div className="mt-1">
                    <StatusBadge status={selectedAppForTimeline.status} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[#64757D]">Submitted By:</span>
                  <div className="font-semibold text-[#123B5D]">{selectedAppForTimeline.applicantName}</div>
                </div>
              </div>

              {/* Vertical Step Timeline */}
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DCE5E2]">
                {selectedAppForTimeline.timeline.map((event, idx) => (
                  <div key={event.id || idx} className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 rounded-full bg-[#123B5D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 z-10">
                      ✓
                    </div>

                    <div className="flex-1 bg-white p-3 rounded border border-[#DCE5E2] text-xs">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-[#123B5D]">{event.status.replace(/_/g, ' ')}</span>
                        <span className="text-[10px] text-[#64757D]">{event.timestamp}</span>
                      </div>
                      <p className="text-[#64757D] leading-relaxed mb-1.5">{event.description}</p>
                      <div className="text-[10px] text-[#247A5A] font-medium">
                        Actor: {event.actor} ({event.role})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE5E2] text-right">
              <button
                onClick={() => setSelectedAppForTimeline(null)}
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
