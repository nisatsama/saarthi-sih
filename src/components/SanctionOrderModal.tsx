import React from 'react';
import { Sanction } from '../types';
import { SaarthiLogo } from './SaarthiLogo';
import { X, Printer, Download, CheckCircle2, Shield } from 'lucide-react';

interface SanctionOrderModalProps {
  sanction: Sanction | null;
  onClose: () => void;
}

export const SanctionOrderModal: React.FC<SanctionOrderModalProps> = ({ sanction, onClose }) => {
  if (!sanction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-2xl max-w-3xl w-full my-6 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 py-3 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#123B5D]">Official Award Sanction Order</span>
            <span className="text-[10px] bg-[#E8F4EF] text-[#247A5A] px-2 py-0.5 rounded font-medium border border-[#247A5A]/30">
              Validated
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#176B87] hover:bg-[#123B5D] text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Sanction Document Container */}
        <div className="p-8 sm:p-10 font-serif text-[#263640] leading-normal bg-white">
          {/* Official Letterhead */}
          <div className="text-center pb-5 border-b-2 border-[#123B5D]">
            <div className="flex justify-center mb-2">
              <SaarthiLogo size={36} compact={true} />
            </div>
            <h2 className="text-sm font-bold tracking-wider text-[#123B5D] uppercase">
              SCHOLARSHIP & FELLOWSHIP MANAGEMENT SYSTEM (SAARTHI)
            </h2>
            <p className="text-xs text-[#64757D] font-sans mt-0.5">
              Scheduled Tribes Development & Welfare Division · Ministry of Tribal Affairs
            </p>
            <p className="text-[11px] text-[#64757D] font-sans">
              Shastri Bhawan / Pragati Complex, New Delhi - 110001
            </p>
          </div>

          {/* Reference & Date */}
          <div className="flex justify-between items-start text-xs font-sans mt-5 mb-6 text-[#263640]">
            <div>
              <p><strong>Sanction Order No:</strong> <span className="font-mono text-[#123B5D] font-bold">{sanction.sanctionOrderNo}</span></p>
              <p className="mt-0.5"><strong>Application Dossier:</strong> <span className="font-mono">{sanction.applicationId}</span></p>
            </div>
            <div className="text-right">
              <p><strong>Date of Sanction:</strong> {sanction.sanctionedAt.split(' ')[0]}</p>
              <p className="mt-0.5"><strong>Financial Year:</strong> 2026-27</p>
            </div>
          </div>

          {/* Subject */}
          <div className="p-3 bg-[#F8FAF9] border-l-4 border-[#123B5D] rounded-r text-xs font-sans mb-6">
            <strong>SUBJECT:</strong> Financial Sanction for Award of <em>{sanction.schemeName}</em> to <strong>{sanction.applicantName}</strong> under Scheduled Tribes Fellowship & Scholarship Directive.
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-3.5 text-xs text-justify font-sans leading-relaxed text-[#263640]">
            <p>
              Sanction of the Competent Authority is hereby conveyed for the award of fellowship/scholarship grants amounting to 
              <strong className="text-[#185C46]"> ₹{sanction.totalAmount.toLocaleString('en-IN')} (Rupees {sanction.totalAmount === 360000 ? 'Three Lakh Sixty Thousand' : sanction.totalAmount === 240000 ? 'Two Lakh Forty Thousand' : 'Two Lakh Fifty Thousand'} Only)</strong> to:
            </p>

            <div className="grid grid-cols-2 gap-2 p-3 border border-[#DCE5E2] rounded bg-[#FAFCFB] text-xs">
              <div>
                <span className="text-[#64757D]">Awardee Name:</span>
                <div className="font-bold text-[#123B5D]">{sanction.applicantName}</div>
              </div>
              <div>
                <span className="text-[#64757D]">Scheme Code:</span>
                <div className="font-bold">{sanction.schemeName}</div>
              </div>
              <div>
                <span className="text-[#64757D]">Beneficiary State:</span>
                <div>Jharkhand / Direct Central Allocation</div>
              </div>
              <div>
                <span className="text-[#64757D]">Sanctioning Officer:</span>
                <div>{sanction.sanctionedBy}</div>
              </div>
            </div>

            <p>
              The grant is admissible subject to the terms and conditions outlined in the scheme guidelines and satisfactory half-yearly academic progress reports endorsed by the Research Supervisor and Registrar/Dean of the institution.
            </p>

            <h4 className="font-bold text-xs text-[#123B5D] uppercase tracking-wide pt-2">
              Disbursement Schedule (Direct Benefit Transfer via PFMS/Aadhaar)
            </h4>

            {/* Installments Table */}
            <div className="overflow-hidden border border-[#DCE5E2] rounded">
              <table className="w-full text-xs">
                <thead className="bg-[#EAF3F8] text-[#123B5D] font-semibold text-left">
                  <tr>
                    <th className="p-2 border-b border-[#DCE5E2]">Installment</th>
                    <th className="p-2 border-b border-[#DCE5E2]">Scheduled Date</th>
                    <th className="p-2 border-b border-[#DCE5E2]">Amount (₹)</th>
                    <th className="p-2 border-b border-[#DCE5E2]">Milestone Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE5E2]">
                  {sanction.installments.map(inst => (
                    <tr key={inst.installmentNo}>
                      <td className="p-2 font-medium">Installment {inst.installmentNo}</td>
                      <td className="p-2 text-[#64757D]">{inst.dueDate}</td>
                      <td className="p-2 font-semibold text-[#185C46]">₹{inst.amount.toLocaleString('en-IN')}</td>
                      <td className="p-2 text-[#64757D]">
                        {inst.installmentNo === 1 ? 'Admissible upon enrolment verification' : 'Subject to satisfactory annual progress review'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-2.5 rounded bg-[#FCF5E8] border border-[#E8CA8C] text-[11px] text-[#C58A27] font-medium">
              * Official Sanction Document: Disbursement is executed through the SAARTHI DBT engine to Aadhaar-seeded accounts.
            </div>
          </div>

          {/* Signature Block */}
          <div className="mt-8 pt-6 border-t border-[#DCE5E2] flex justify-between items-end font-sans">
            <div className="flex items-center gap-2 text-[11px] text-[#64757D]">
              <Shield className="w-4 h-4 text-[#247A5A]" />
              <span>Digitally Authenticated by SAARTHI Central Registry</span>
            </div>

            <div className="text-right">
              <div className="font-bold text-xs text-[#123B5D]">{sanction.sanctionedBy}</div>
              <div className="text-[11px] text-[#64757D]">Senior Accounts Officer, DBT Division</div>
              <div className="text-[10px] text-slate-400 mt-1">SAARTHI Electronic Signature #8841920</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F8FAF9] border-t border-[#DCE5E2] text-right no-print">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#263640] rounded-md text-xs font-medium cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
