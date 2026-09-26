import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Sanction, PaymentBatch } from '../../types';
import confetti from 'canvas-confetti';
import { 
  IndianRupee, 
  FileSignature, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Coins,
  CreditCard,
  RefreshCw,
  XCircle,
  Clock
} from 'lucide-react';

interface FinanceSanctionAndPaymentsPageProps {
  onOpenSanctionModal: (sanction: Sanction) => void;
}

export const FinanceSanctionAndPaymentsPage: React.FC<FinanceSanctionAndPaymentsPageProps> = ({
  onOpenSanctionModal
}) => {
  const { 
    applications, 
    sanctions, 
    paymentBatches, 
    createSanctionOrder, 
    processPaymentBatch, 
    retryFailedPayment,
    currentUser,
    setToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'BATCHES' | 'SANCTIONS'>('BATCHES');
  const [processingBatchId, setProcessingBatchId] = useState<string | null>(null);
  const [processProgress, setProcessProgress] = useState(0);

  // Find applications ready for sanction (status === 'SELECTED')
  const readyForSanction = applications.filter(a => a.status === 'SELECTED');

  const handleGenerateSanctionForApp = (appId: string) => {
    const s = createSanctionOrder(appId, 360000, 4, 'Approved under National Fellowship for Scheduled Tribe Students (NFST) FY 2026-27.');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onOpenSanctionModal(s);
  };

  const handleSimulateBatch = (batchId: string) => {
    setProcessingBatchId(batchId);
    setProcessProgress(15);

    const interval = setInterval(() => {
      setProcessProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setProcessProgress(100);
      setProcessingBatchId(null);
      processPaymentBatch(batchId);

      // Trigger celebratory feedback for disbursement completion
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });

      setToast(`Payment Batch ${batchId} cleared successfully! Beneficiaries disbursed via Aadhaar Payment Bridge (APBS).`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#185C46] mb-1">
            <Coins className="w-4 h-4" />
            <span>PFMS / NPCI Direct Benefit Transfer (Simulated Integration Sandbox)</span>
          </div>
          <h1 className="text-xl font-bold text-[#123B5D]">Direct Benefit Transfer (DBT) & Sanctions</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Financial sanction issuance, Aadhaar payment bridge batch execution, and transaction reconciliation
          </p>
        </div>
        <div className="text-xs text-[#64757D] bg-[#F8FAF9] px-3.5 py-2 rounded-lg border border-[#DCE5E2] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#247A5A]" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Authorized Officer</span>
            <span className="font-semibold text-[#123B5D]">{currentUser.name}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE5E2] gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('BATCHES')}
          className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${activeTab === 'BATCHES' ? 'border-[#176B87] text-[#176B87]' : 'border-transparent text-[#64757D] hover:text-[#263640]'}`}
        >
          <IndianRupee className="w-4 h-4" />
          <span>DBT Payment Batches ({paymentBatches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SANCTIONS')}
          className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${activeTab === 'SANCTIONS' ? 'border-[#176B87] text-[#176B87]' : 'border-transparent text-[#64757D] hover:text-[#263640]'}`}
        >
          <FileSignature className="w-4 h-4" />
          <span>Sanction Orders ({Object.keys(sanctions).length})</span>
        </button>
      </div>

      {activeTab === 'BATCHES' ? (
        <div className="space-y-6">
          {/* Batches Overview */}
          <div className="space-y-4">
            {paymentBatches.map(batch => {
              const isCompleted = batch.status === 'COMPLETED';
              const isCurrentlyProcessing = processingBatchId === batch.id;

              return (
                <div key={batch.id} className="bg-white rounded-xl border border-[#DCE5E2] overflow-hidden shadow-xs">
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE5E2] bg-[#F8FAF9]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#176B87]">{batch.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCompleted ? 'bg-[#E8F4EF] text-[#247A5A] border border-[#247A5A]/30' : 'bg-amber-100 text-[#C58A27] border border-amber-300'}`}>
                          {isCompleted ? 'Settlement Completed' : 'Draft Batch'}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#123B5D] mt-1">{batch.name}</h3>
                      <p className="text-xs text-[#64757D]">{batch.schemeName} · Created: {batch.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-xs">
                        <span className="text-[#64757D] text-[10px] block uppercase font-semibold">Total Batch Grant</span>
                        <span className="font-bold text-base text-[#185C46] font-mono">
                          ₹{(batch.totalAmount / 100000).toFixed(2)} Lakhs
                        </span>
                      </div>

                      {!isCompleted ? (
                        <button
                          onClick={() => handleSimulateBatch(batch.id)}
                          disabled={isCurrentlyProcessing}
                          className="px-4 py-2 bg-[#247A5A] hover:bg-[#185C46] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-2 disabled:opacity-50"
                        >
                          {isCurrentlyProcessing ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Clearing Batch ({processProgress}%)...</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Process DBT Payment Batch</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSimulateBatch(batch.id)}
                          disabled={isCurrentlyProcessing}
                          className="px-3.5 py-1.5 border border-[#DCE5E2] hover:bg-slate-50 text-[#123B5D] text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Re-run Simulated Batch</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar (During Simulation) */}
                  {isCurrentlyProcessing && (
                    <div className="px-5 py-3 bg-[#EAF3F8] border-b border-[#DCE5E2]">
                      <div className="flex justify-between text-xs text-[#123B5D] mb-1 font-semibold">
                        <span>Direct Clearing via NPCI Aadhaar Bridge & PFMS Gateway...</span>
                        <span>{processProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#247A5A] h-full transition-all duration-200"
                          style={{ width: `${processProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Batch Summary Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#DCE5E2] text-xs text-center bg-white">
                    <div className="p-3">
                      <span className="text-[#64757D] text-[11px] block">Total Recipients</span>
                      <span className="font-bold text-sm text-[#123B5D]">{batch.totalRecipients}</span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#64757D] text-[11px] block">Successful Direct Credits</span>
                      <span className="font-bold text-sm text-[#247A5A]">{batch.successfulCount}</span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#64757D] text-[11px] block">Validation Exceptions</span>
                      <span className={`font-bold text-sm ${batch.failedCount > 0 ? 'text-[#C58A27]' : 'text-slate-400'}`}>
                        {batch.failedCount}
                      </span>
                    </div>
                    <div className="p-3">
                      <span className="text-[#64757D] text-[11px] block">Success Settlement Rate</span>
                      <span className="font-bold text-sm text-[#185C46]">
                        {batch.totalRecipients > 0 ? `${((batch.successfulCount / batch.totalRecipients) * 100).toFixed(1)}%` : '0%'}
                      </span>
                    </div>
                  </div>

                  {/* Beneficiary Transaction Ledger Table */}
                  <div className="p-4 border-t border-[#DCE5E2] bg-white">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#123B5D] mb-3 font-heading flex items-center justify-between">
                      <span>Beneficiary Transaction Ledger & PFMS Settlement Logs</span>
                      <span className="text-[10px] text-slate-400 font-normal">Aadhaar Payment Bridge (APBS)</span>
                    </h4>
                    <div className="overflow-x-auto border border-[#DCE5E2] rounded-lg">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8FAF9] border-b border-[#DCE5E2] text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3">Beneficiary</th>
                            <th className="p-3">Application Ref</th>
                            <th className="p-3">Masked Account</th>
                            <th className="p-3">IFSC Code</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">PFMS UTR / Diagnostics</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {/* Highlight Rahul Oraon's Disbursal */}
                          <tr className="bg-[#E8F4EF]/70 font-semibold">
                            <td className="p-3">
                              <div className="font-bold text-[#123B5D]">Rahul Oraon</div>
                              <div className="text-[10px] text-[#247A5A]">Special Demo Beneficiary</div>
                            </td>
                            <td className="p-3 font-mono text-[#176B87]">TS-2026-00421</td>
                            <td className="p-3 font-mono">•••• •••• 8921</td>
                            <td className="p-3 font-mono">SBIN0001234</td>
                            <td className="p-3 font-mono text-[#185C46] font-bold">₹90,000</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isCompleted ? 'bg-[#E8F4EF] text-[#247A5A]' : 'bg-amber-100 text-[#C58A27]'
                              }`}>
                                {isCompleted ? 'SUCCESS' : 'QUEUED'}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-slate-600">
                              {isCompleted ? 'PFMS202609269941 (Disbursed via SBI)' : 'Awaiting batch run'}
                            </td>
                          </tr>

                          {/* Seeded transactions */}
                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-[#123B5D]">Sunita Soren</td>
                            <td className="p-3 font-mono text-[#176B87]">TS-2026-00388</td>
                            <td className="p-3 font-mono text-slate-600">•••• •••• 3412</td>
                            <td className="p-3 font-mono text-slate-600">PUNB0234100</td>
                            <td className="p-3 font-mono text-[#185C46] font-bold">₹90,000</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F4EF] text-[#247A5A]">
                                SUCCESS
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-slate-600">PFMS202609269942</td>
                          </tr>

                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-[#123B5D]">Birsa Tirkey</td>
                            <td className="p-3 font-mono text-[#176B87]">TS-2026-00392</td>
                            <td className="p-3 font-mono text-slate-600">•••• •••• 5590</td>
                            <td className="p-3 font-mono text-slate-600">BARB0RANCHI</td>
                            <td className="p-3 font-mono text-[#185C46] font-bold">₹90,000</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F4EF] text-[#247A5A]">
                                SUCCESS
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-slate-600">PFMS202609269943</td>
                          </tr>

                          <tr className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-[#123B5D]">Kavita Hansda</td>
                            <td className="p-3 font-mono text-[#176B87]">TS-2026-00405</td>
                            <td className="p-3 font-mono text-slate-600">•••• •••• 1109</td>
                            <td className="p-3 font-mono text-slate-600">UBIN0542312</td>
                            <td className="p-3 font-mono text-[#185C46] font-bold">₹90,000</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-[#C84B4B]">
                                REJECTED
                              </span>
                            </td>
                            <td className="p-3 text-[11px] text-[#C84B4B] font-medium flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>NPCI Mapper: Inactive Aadhaar seeding</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Failed Transactions Resolution List */}
                  {batch.failures && batch.failures.length > 0 && (
                    <div className="p-4 bg-[#FCF5E8]/40 border-t border-[#DCE5E2] text-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-[#C58A27]" />
                        <h4 className="font-bold text-xs text-[#C58A27] uppercase tracking-wide">
                          Exception Resolution Table ({batch.failures.length} Pending Exceptions)
                        </h4>
                      </div>

                      <div className="divide-y divide-[#DCE5E2] border border-[#E8CA8C] rounded-lg bg-white overflow-hidden">
                        {batch.failures.map(fail => (
                          <div key={fail.applicationId} className="p-3 flex items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#123B5D]">{fail.applicationId}</span>
                                <span className="font-semibold text-[#263640]">{fail.applicantName}</span>
                                <span className="text-[#185C46] font-bold">₹{fail.amount.toLocaleString('en-IN')}</span>
                              </div>
                              <p className="text-[11px] text-[#C58A27] mt-0.5">{fail.reason}</p>
                            </div>

                            <button
                              onClick={() => retryFailedPayment(batch.id, fail.applicationId)}
                              className="px-3 py-1 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold transition-colors cursor-pointer shrink-0"
                            >
                              Retry Credit
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Sanctions Tab */
        <div className="space-y-6">
          {/* Applications Awaiting Sanction Card */}
          {readyForSanction.length > 0 && (
            <div className="bg-[#EAF3F8] border border-[#176B87]/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-[#123B5D] uppercase tracking-wide">
                    Candidates Selected by Committee Awaiting Sanction ({readyForSanction.length})
                  </h3>
                  <p className="text-xs text-[#64757D]">Issue official financial sanction letters and schedule installment disbursement</p>
                </div>
              </div>

              <div className="divide-y divide-[#DCE5E2] border border-[#DCE5E2] rounded-lg bg-white">
                {readyForSanction.map(app => (
                  <div key={app.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#123B5D] font-mono">{app.id}</span>
                        <span className="font-semibold text-xs text-[#263640]">{app.applicantName}</span>
                        <span className="text-xs text-[#247A5A]">({app.state})</span>
                      </div>
                      <div className="text-[11px] text-[#64757D] mt-0.5">
                        {app.schemeName} · Enrolled at {app.institution}
                      </div>
                    </div>

                    <button
                      onClick={() => handleGenerateSanctionForApp(app.id)}
                      className="px-4 py-1.5 bg-[#247A5A] hover:bg-[#185C46] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>Issue Sanction Order</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Sanction Orders Table */}
          <div className="bg-white rounded-xl border border-[#DCE5E2] overflow-hidden shadow-xs">
            <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#DCE5E2] flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
                Issued Sanction Orders Repository
              </h2>
              <span className="text-[11px] text-[#64757D]">Officially verified sanction orders with government reference</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAFCFB] text-[#123B5D] border-b border-[#DCE5E2] font-semibold">
                  <tr>
                    <th className="p-3.5">Sanction Order No</th>
                    <th className="p-3.5">Candidate & App ID</th>
                    <th className="p-3.5">Scheme</th>
                    <th className="p-3.5">Total Grant</th>
                    <th className="p-3.5">Installments</th>
                    <th className="p-3.5">Sanctioned Date</th>
                    <th className="p-3.5 text-right">Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE5E2]">
                  {Object.values(sanctions).map(s => (
                    <tr key={s.id} className="hover:bg-[#F8FAF9]/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#123B5D]">
                        {s.sanctionOrderNo}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-[#263640]">{s.applicantName}</div>
                        <div className="text-[10px] text-[#64757D] font-mono">{s.applicationId}</div>
                      </td>
                      <td className="p-3.5 text-[#64757D] max-w-[180px] truncate">
                        {s.schemeName}
                      </td>
                      <td className="p-3.5 font-bold text-[#185C46]">
                        ₹{s.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 text-[#263640]">
                        {s.installments.length} Installments
                      </td>
                      <td className="p-3.5 text-[#64757D]">
                        {s.sanctionedAt.split(' ')[0]}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => onOpenSanctionModal(s)}
                          className="px-3 py-1 bg-[#176B87] hover:bg-[#123B5D] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                        >
                          View Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
