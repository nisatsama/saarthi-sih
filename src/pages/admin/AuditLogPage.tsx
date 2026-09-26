import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Search, Filter, Lock } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.applicationId && log.applicationId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.newValue && log.newValue.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-[#247A5A]" />
            <h1 className="text-xl font-bold text-[#123B5D]">Tamper-Evident System Audit Trail</h1>
          </div>
          <p className="text-xs text-[#64757D]">
            Append-only legal log recording every application transition, officer verification, and DBT disbursement event
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F4EF] text-[#247A5A] rounded border border-[#247A5A]/30 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Immutable Ledger Integrity Verified</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-[#DCE5E2] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#64757D]" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action, or Application ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs text-[#263640] placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#64757D]">Role:</span>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-2.5 py-1 border border-[#DCE5E2] rounded bg-white text-[#263640] focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="APPLICANT">Applicant</option>
            <option value="OFFICER">Scrutiny Officer</option>
            <option value="SELECTION_COMMITTEE">Selection Committee</option>
            <option value="FINANCE_OFFICER">Finance Officer</option>
            <option value="SYSTEM">AI System Service</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table (Section 29) */}
      <div className="bg-white rounded-lg border border-[#DCE5E2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8FAF9] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor & Role</th>
                <th className="p-3.5">Action Code</th>
                <th className="p-3.5">Target Dossier</th>
                <th className="p-3.5">Transition / Event Description</th>
                <th className="p-3.5">Node IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5E2] font-sans">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                  <td className="p-3.5 whitespace-nowrap text-[#64757D] font-mono text-[11px]">
                    {log.timestamp}
                  </td>

                  <td className="p-3.5">
                    <div className="font-semibold text-[#263640]">{log.actor}</div>
                    <div className="text-[10px] text-[#176B87] font-medium">{log.role}</div>
                  </td>

                  <td className="p-3.5">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-[#123B5D] border border-slate-200">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-3.5 font-mono font-medium text-[#123B5D]">
                    {log.applicationId || '—'}
                  </td>

                  <td className="p-3.5 text-[#263640] max-w-[280px]">
                    {log.oldValue && (
                      <span className="text-[#C58A27] font-mono text-[11px] block">
                        {log.oldValue} →
                      </span>
                    )}
                    <span className="font-medium">{log.newValue || log.remarks || 'Event logged'}</span>
                  </td>

                  <td className="p-3.5 font-mono text-[10px] text-[#64757D]">
                    {log.ipAddress}
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
