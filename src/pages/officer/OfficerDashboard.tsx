import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { 
  FileCheck2, 
  AlertCircle, 
  CheckCircle2, 
  Award, 
  IndianRupee, 
  BarChart3, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';

interface OfficerDashboardProps {
  onNavigateToScrutiny: (appId: string) => void;
  onNavigateToQueue: () => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({
  onNavigateToScrutiny,
  onNavigateToQueue
}) => {
  const { applications, currentUser } = useApp();

  // Metrics from master prompt
  const totalAppsCount = 12450;
  const pendingReviewCount = 2184;
  const deficienciesCount = 642;
  const verifiedCount = 7821;
  const selectedCount = 1205;
  const disbursedCount = 918;

  // Active review applications in seeded dataset
  const queueApps = applications.filter(a => ['UNDER_DOCUMENT_REVIEW', 'RESUBMITTED', 'DEFICIENCY_RAISED', 'SUBMITTED'].includes(a.status));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Scrutiny Command Center</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Operational dashboard for application scrutiny, automated AI anomaly review, and eligibility verification
          </p>
        </div>
        <div className="text-xs text-[#64757D] bg-[#F8FAF9] px-3 py-1.5 rounded border border-[#DCE5E2]">
          Assigned Officer: <span className="font-semibold text-[#123B5D]">{currentUser.name}</span>
        </div>
      </div>

      {/* Top Metrics Row: Restrained Information Blocks (Section 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[11px] font-medium text-[#64757D] block">Total Applications</span>
          <div className="text-xl font-bold text-[#123B5D] mt-1">{totalAppsCount.toLocaleString()}</div>
          <span className="text-[10px] text-[#247A5A] font-medium">Cohort 2026-27</span>
        </div>

        <div className="bg-[#EAF3F8] p-3.5 rounded-lg border border-[#176B87]/30">
          <span className="text-[11px] font-semibold text-[#176B87] block">Pending Review</span>
          <div className="text-xl font-bold text-[#123B5D] mt-1">{pendingReviewCount.toLocaleString()}</div>
          <span className="text-[10px] text-[#64757D]">Active in queue</span>
        </div>

        <div className="bg-[#FCF5E8] p-3.5 rounded-lg border border-[#E8CA8C]">
          <span className="text-[11px] font-semibold text-[#C58A27] block">Deficiencies Raised</span>
          <div className="text-xl font-bold text-[#C58A27] mt-1">{deficienciesCount.toLocaleString()}</div>
          <span className="text-[10px] text-[#64757D]">Applicant action</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[11px] font-medium text-[#64757D] block">Verified & Approved</span>
          <div className="text-xl font-bold text-[#247A5A] mt-1">{verifiedCount.toLocaleString()}</div>
          <span className="text-[10px] text-[#247A5A] font-medium">62.8% clearance</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[11px] font-medium text-[#64757D] block">Selected by Board</span>
          <div className="text-xl font-bold text-[#185C46] mt-1">{selectedCount.toLocaleString()}</div>
          <span className="text-[10px] text-[#64757D]">Merit approved</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[11px] font-medium text-[#64757D] block">Disbursed (DBT)</span>
          <div className="text-xl font-bold text-[#123B5D] mt-1">{disbursedCount.toLocaleString()}</div>
          <span className="text-[10px] text-[#247A5A] font-medium">NPCI direct credit</span>
        </div>
      </div>

      {/* Visualizations Grid (Section 23 - Authentic, Restrained SVG Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Application Funnel Chart */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#DCE5E2]">
            <h3 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
              Application Clearance Funnel
            </h3>
            <span className="text-[11px] text-[#64757D]">Conversion pipeline</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Applications Submitted</span>
                <span className="font-bold text-[#123B5D]">12,450 (100%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#123B5D] rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">AI Verification Passed</span>
                <span className="font-bold text-[#176B87]">10,266 (82.4%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '82.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Officer Verified (Eligible)</span>
                <span className="font-bold text-[#247A5A]">7,821 (62.8%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#247A5A] rounded-full" style={{ width: '62.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Selected for Award</span>
                <span className="font-bold text-[#185C46]">1,205 (9.7%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#185C46] rounded-full" style={{ width: '9.7%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Disbursed via DBT</span>
                <span className="font-bold text-[#247A5A]">918 (7.4%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#247A5A] rounded-full" style={{ width: '7.4%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* State-wise Distribution Bar Representation */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#DCE5E2]">
            <h3 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
              State-wise Scheduled Tribe Applications
            </h3>
            <span className="text-[11px] text-[#64757D]">Top 5 tribal states</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Jharkhand</span>
                <span className="font-semibold text-[#123B5D]">3,840 apps (30.8%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Odisha</span>
                <span className="font-semibold text-[#123B5D]">2,910 apps (23.4%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '59%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Chhattisgarh</span>
                <span className="font-semibold text-[#123B5D]">2,150 apps (17.3%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '43%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Madhya Pradesh</span>
                <span className="font-semibold text-[#123B5D]">1,820 apps (14.6%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '36%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-[#263640]">Assam & North East</span>
                <span className="font-semibold text-[#123B5D]">1,730 apps (13.9%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '34%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Scrutiny Queue Table Preview */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
              Priority Scrutiny Queue
            </h2>
            <p className="text-[11px] text-[#64757D]">Applications flagged with AI anomalies or pending verification</p>
          </div>

          <button
            onClick={onNavigateToQueue}
            className="text-xs font-semibold text-[#176B87] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Queue ({applications.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAFCFB] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
              <tr>
                <th className="p-3">Application ID</th>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Scheme</th>
                <th className="p-3">State</th>
                <th className="p-3">AI Finding</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5E2]">
              {queueApps.slice(0, 5).map(app => {
                const hasAnomaly = app.documents.some(d => d.aiFinding?.requiresManualReview);

                return (
                  <tr key={app.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#123B5D]">
                      {app.id}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-[#263640]">{app.applicantName}</div>
                      <div className="text-[10px] text-[#64757D]">{app.institution}</div>
                    </td>
                    <td className="p-3 text-[#64757D]">
                      {app.schemeName}
                    </td>
                    <td className="p-3 text-[#64757D]">
                      {app.state}
                    </td>
                    <td className="p-3">
                      {hasAnomaly ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#C58A27] font-semibold bg-[#FCF5E8] px-2 py-0.5 rounded border border-[#E8CA8C]">
                          <AlertCircle className="w-3 h-3" />
                          <span>Income Mismatch (71%)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#247A5A] font-medium bg-[#E8F4EF] px-2 py-0.5 rounded border border-[#247A5A]/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Checks Passed</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onNavigateToScrutiny(app.id)}
                        className="px-3 py-1 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Scrutinize
                      </button>
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
