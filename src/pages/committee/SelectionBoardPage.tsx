import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Sliders, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import confetti from 'canvas-confetti';

export const SelectionBoardPage: React.FC = () => {
  const { applications, selectCandidate, currentUser } = useApp();
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState('ALL');

  // Applications eligible for selection
  const eligibleApps = applications.filter(a => 
    ['ELIGIBILITY_VERIFIED', 'SHORTLISTED', 'SELECTED', 'WAITLISTED', 'REJECTED'].includes(a.status)
  ).sort((a, b) => (b.score?.totalScore || 0) - (a.score?.totalScore || 0));

  const filteredApps = eligibleApps.filter(a => 
    selectedSchemeFilter === 'ALL' || a.schemeId === selectedSchemeFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Selection Board & Merit Allocation</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Transparent scoring and award allocation for scrutinized Scheduled Tribe scholarship and fellowship candidates
          </p>
        </div>
        <div className="text-xs text-[#64757D] bg-[#F8FAF9] px-3 py-1.5 rounded border border-[#DCE5E2]">
          Board Chair: <span className="font-semibold text-[#123B5D]">{currentUser.name}</span>
        </div>
      </div>

      {/* Transparent Scoring Criteria Banner (Section 26) */}
      <div className="p-4 bg-[#EAF3F8] border border-[#176B87]/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Sliders className="w-4 h-4 text-[#176B87] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#123B5D]">
              Objective Selection Criteria Model:
            </span>
            <p className="text-[#64757D] mt-0.5">
              Academic Performance (40 pts) + Research Proposal Quality (35 pts) + Socio-Economic Priority & Remoteness (25 pts) = Total Score (100 pts).
            </p>
          </div>
        </div>

        <span className="text-[10px] text-[#247A5A] bg-white px-2.5 py-1 rounded font-semibold border border-[#247A5A]/30 shrink-0">
          Configurable Merit Criteria
        </span>
      </div>

      {/* Eligible Candidates Table */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
            Merit Rank Order ({filteredApps.length} Candidates)
          </h2>
          <span className="text-[11px] text-[#64757D]">
            All listed candidates possess verified revenue and academic credentials
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAFCFB] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
              <tr>
                <th className="p-3 text-center">Rank</th>
                <th className="p-3">Candidate & Dossier</th>
                <th className="p-3">Scheme</th>
                <th className="p-3 text-center">Academic (40)</th>
                <th className="p-3 text-center">Research (35)</th>
                <th className="p-3 text-center">Socio-Econ (25)</th>
                <th className="p-3 text-center">Total (100)</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Board Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5E2]">
              {filteredApps.map((app, idx) => {
                const rank = idx + 1;
                const score = app.score || {
                  academicScore: 35,
                  researchScore: 30,
                  socioEconomicScore: 20,
                  totalScore: 85
                };

                return (
                  <tr key={app.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                    <td className="p-3 text-center font-bold text-[#123B5D]">
                      #{rank}
                    </td>

                    <td className="p-3">
                      <div className="font-semibold text-[#263640]">{app.applicantName}</div>
                      <div className="text-[10px] text-[#64757D] font-mono">{app.id} · {app.state}</div>
                    </td>

                    <td className="p-3 text-[#64757D] max-w-[180px] truncate" title={app.schemeName}>
                      {app.schemeName}
                    </td>

                    <td className="p-3 text-center font-medium text-[#263640]">
                      {score.academicScore}
                    </td>

                    <td className="p-3 text-center font-medium text-[#263640]">
                      {score.researchScore}
                    </td>

                    <td className="p-3 text-center font-medium text-[#263640]">
                      {score.socioEconomicScore}
                    </td>

                    <td className="p-3 text-center font-bold text-sm text-[#185C46]">
                      {score.totalScore}
                    </td>

                    <td className="p-3">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    <td className="p-3 text-right whitespace-nowrap space-x-1.5">
                      {app.status !== 'SELECTED' ? (
                        <>
                          <button
                            onClick={() => {
                              selectCandidate(app.id, 'SELECTED', `Awarded by National Selection Board. Merit Rank #${rank} with score of ${score.totalScore}/100.`);
                              confetti({
                                particleCount: 70,
                                spread: 65,
                                origin: { y: 0.6 }
                              });
                            }}
                            className="px-3 py-1 bg-[#247A5A] hover:bg-[#185C46] text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            Select for Award
                          </button>
                          <button
                            onClick={() => selectCandidate(app.id, 'WAITLISTED', `Candidate placed on waitlist rank #${rank}.`)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#263640] rounded text-xs font-medium transition-colors cursor-pointer"
                          >
                            Waitlist
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-[#247A5A] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
