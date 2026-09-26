import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  IndianRupee, 
  ShieldCheck,
  Building
} from 'lucide-react';

export const PlatformAnalyticsPage: React.FC = () => {
  const { schemes } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Platform Analytics & Performance KPIs</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Real-time pipeline metrics, clearance velocity, geographic distribution, and disbursement outcomes
          </p>
        </div>
        <div className="text-xs font-semibold text-[#185C46] bg-[#E8F4EF] px-3 py-1.5 rounded border border-[#247A5A]/30">
          Academic Year 2026-27 Active Cycle
        </div>
      </div>

      {/* Top Level Metric KPIs (Section 30) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[#64757D] text-[11px] block">Total Applications</span>
          <div className="text-xl font-bold text-[#123B5D] mt-1">12,450</div>
          <span className="text-[10px] text-[#247A5A] font-medium">+14.2% YoY intake</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[#64757D] text-[11px] block">Verified & Eligible</span>
          <div className="text-xl font-bold text-[#247A5A] mt-1">7,821</div>
          <span className="text-[10px] text-[#64757D]">62.8% clearance</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[#64757D] text-[11px] block">Average Verification Time</span>
          <div className="text-xl font-bold text-[#176B87] mt-1">2.4 Days</div>
          <span className="text-[10px] text-[#247A5A] font-medium">Down from 18 days</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[#64757D] text-[11px] block">Deficiency Rate</span>
          <div className="text-xl font-bold text-[#C58A27] mt-1">5.1%</div>
          <span className="text-[10px] text-[#64757D]">642 total raised</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[#64757D] text-[11px] block">Selection Rate</span>
          <div className="text-xl font-bold text-[#185C46] mt-1">9.7%</div>
          <span className="text-[10px] text-[#64757D]">1,205 awardees</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2]">
          <span className="text-[#64757D] text-[11px] block">DBT Success Rate</span>
          <div className="text-xl font-bold text-[#185C46] mt-1">97.2%</div>
          <span className="text-[10px] text-[#247A5A] font-medium">Aadhaar bridge</span>
        </div>
      </div>

      {/* Visual Funnel and Intake Trend (Section 30) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* End-to-End Funnel */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE5E2]">
            <h3 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
              End-to-End Clearance Funnel
            </h3>
            <span className="text-[11px] text-[#64757D]">Intake to Disbursement</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#263640]">1. Applications Received</span>
                <span className="font-mono font-bold text-[#123B5D]">12,450 (100%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#123B5D] rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#263640]">2. Rule Validation Passed</span>
                <span className="font-mono font-bold text-[#176B87]">10,812 (86.8%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '86.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#263640]">3. Scrutiny Officer Verified</span>
                <span className="font-mono font-bold text-[#247A5A]">7,821 (62.8%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#247A5A] rounded-full" style={{ width: '62.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#263640]">4. Selected by Committee</span>
                <span className="font-mono font-bold text-[#185C46]">1,205 (9.7%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#185C46] rounded-full" style={{ width: '9.7%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#263640]">5. Sanction Orders Issued</span>
                <span className="font-mono font-bold text-[#176B87]">1,090 (8.7%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '8.7%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-[#263640]">6. Direct Benefit Transferred</span>
                <span className="font-mono font-bold text-[#247A5A]">918 (7.4%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#247A5A] rounded-full" style={{ width: '7.4%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Deficiency Causes Breakdown */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE5E2]">
            <h3 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
              Deficiency Categories Breakdown
            </h3>
            <span className="text-[11px] text-[#64757D]">642 total anomalies flagged</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#263640] font-medium">Income Certificate Discrepancy / Expired FY</span>
                <span className="font-bold text-[#C58A27]">314 cases (48.9%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#C58A27] rounded-full" style={{ width: '48.9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#263640] font-medium">Unreadable / Low DPI Marksheet Scan</span>
                <span className="font-bold text-[#123B5D]">158 cases (24.6%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#123B5D] rounded-full" style={{ width: '24.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#263640] font-medium">Missing Research Synopsis / DRC Approval</span>
                <span className="font-bold text-[#176B87]">96 cases (15.0%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#176B87] rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#263640] font-medium">Name Spelling Variation between ST Cert & Aadhaar</span>
                <span className="font-bold text-[#2A8C82]">74 cases (11.5%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#2A8C82] rounded-full" style={{ width: '11.5%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scheme Performance Table */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
            Scheme Performance Summary
          </h2>
          <span className="text-[11px] text-[#64757D]">Active Centrally Administered Programs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAFCFB] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
              <tr>
                <th className="p-3.5">Scheme Code</th>
                <th className="p-3.5">Scheme Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5 text-center">Annual Grant</th>
                <th className="p-3.5 text-center">Applications</th>
                <th className="p-3.5 text-center">Verified</th>
                <th className="p-3.5 text-center">Disbursed (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5E2]">
              {schemes.map(s => (
                <tr key={s.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                  <td className="p-3.5 font-bold font-mono text-[#176B87]">
                    {s.code}
                  </td>
                  <td className="p-3.5 font-semibold text-[#263640]">
                    {s.name}
                  </td>
                  <td className="p-3.5 text-[#64757D]">
                    {s.type} ({s.academicLevel})
                  </td>
                  <td className="p-3.5 text-center font-semibold text-[#185C46]">
                    ₹{s.annualAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-center font-medium">
                    {s.code === 'NFST-PHD' ? '4,120' : s.code === 'NOS-ST' ? '890' : s.code === 'TCE-ST' ? '2,450' : '4,990'}
                  </td>
                  <td className="p-3.5 text-center text-[#247A5A] font-semibold">
                    {s.code === 'NFST-PHD' ? '2,740' : s.code === 'NOS-ST' ? '420' : s.code === 'TCE-ST' ? '1,890' : '2,771'}
                  </td>
                  <td className="p-3.5 text-center font-bold text-[#185C46]">
                    {s.code === 'NFST-PHD' ? '₹8.28 Cr' : s.code === 'NOS-ST' ? '₹6.30 Cr' : s.code === 'TCE-ST' ? '₹4.72 Cr' : '₹3.74 Cr'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
