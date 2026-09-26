import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scheme, SchemeRule, RequiredDocument, DocumentType } from '../../types';
import { 
  Plus, 
  Layers, 
  Trash2, 
  CheckCircle2, 
  BookOpen, 
  Edit3, 
  X, 
  Calendar, 
  IndianRupee,
  ShieldCheck
} from 'lucide-react';

export const SchemeBuilderPage: React.FC = () => {
  const { schemes, addScheme, updateScheme, setToast } = useApp();
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);

  // New Scheme Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'FELLOWSHIP' | 'SCHOLARSHIP'>('FELLOWSHIP');
  const [academicLevel, setAcademicLevel] = useState<'PhD' | 'PostGraduate' | 'UnderGraduate' | 'All'>('PhD');
  const [annualAmount, setAnnualAmount] = useState<number>(300000);
  const [installments, setInstallments] = useState<number>(4);
  const [startDate, setStartDate] = useState('2026-04-01');
  const [endDate, setEndDate] = useState('2026-11-30');

  // Configurable Rules
  const [rules, setRules] = useState<SchemeRule[]>([
    {
      id: 'rule-custom-1',
      schemeId: '',
      field: 'category',
      fieldLabel: 'Category',
      operator: 'EQUALS',
      value: 'ST',
      dataType: 'STRING',
      errorMessage: 'Candidate must belong to Scheduled Tribe (ST) category.',
      active: true
    },
    {
      id: 'rule-custom-2',
      schemeId: '',
      field: 'marksPercentage',
      fieldLabel: 'Qualifying Marks',
      operator: 'GREATER_THAN_EQUAL',
      value: 55,
      dataType: 'NUMBER',
      errorMessage: 'Minimum 55% aggregate marks required.',
      active: true
    },
    {
      id: 'rule-custom-3',
      schemeId: '',
      field: 'annualFamilyIncome',
      fieldLabel: 'Income Limit',
      operator: 'LESS_THAN_EQUAL',
      value: 600000,
      dataType: 'NUMBER',
      errorMessage: 'Annual income must not exceed ₹6,00,000.',
      active: true
    }
  ]);

  const handleAddRule = () => {
    const newRule: SchemeRule = {
      id: `rule-custom-${Date.now()}`,
      schemeId: '',
      field: 'programme',
      fieldLabel: 'Degree Programme',
      operator: 'EQUALS',
      value: 'PhD',
      dataType: 'STRING',
      errorMessage: 'Must be enrolled in designated degree programme.',
      active: true
    };
    setRules(prev => [...prev, newRule]);
  };

  const handleRemoveRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const handleSaveScheme = (e: React.FormEvent) => {
    e.preventDefault();
    const newSchemeId = `sch-custom-${Date.now()}`;
    const newScheme: Scheme = {
      id: newSchemeId,
      code,
      name,
      description,
      type,
      academicLevel,
      totalAmount: annualAmount,
      annualAmount,
      installments,
      startDate,
      endDate,
      status: 'PUBLISHED',
      rules: rules.map(r => ({ ...r, schemeId: newSchemeId })),
      requiredDocuments: [
        { id: `req-${Date.now()}-1`, schemeId: newSchemeId, documentType: 'ST_CERTIFICATE', name: 'ST Caste Certificate', description: 'Certified revenue proof', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] },
        { id: `req-${Date.now()}-2`, schemeId: newSchemeId, documentType: 'INCOME_CERTIFICATE', name: 'Income Certificate', description: 'Certified income proof', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] },
        { id: `req-${Date.now()}-3`, schemeId: newSchemeId, documentType: 'MARKSHEET', name: 'Qualifying Degree Marksheet', description: 'Degree marksheet', required: true, maxSizeBytes: 5242880, allowedFormats: ['PDF'] }
      ],
      selectionCriteria: [
        { id: 'crit-c1', name: 'Academic Merit', weightage: 50, description: 'Aggregate academic percentage' },
        { id: 'crit-c2', name: 'Socio-economic Need', weightage: 50, description: 'Income bracket and remote tribal domicile' }
      ]
    };

    addScheme(newScheme);
    setShowBuilderModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-[#DCE5E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#123B5D]">Scheme Engine & Rule Configurator</h1>
          <p className="text-xs text-[#64757D] mt-0.5">
            Configure schemes, define reusable qualification rule sets, and specify document validation criteria
          </p>
        </div>

        <button
          onClick={() => setShowBuilderModal(true)}
          className="px-4 py-2 bg-[#176B87] hover:bg-[#123B5D] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Configure New Scheme</span>
        </button>
      </div>

      {/* Reusable Architecture Principle Banner (Section 2) */}
      <div className="p-4 bg-[#EAF3F8] border border-[#176B87]/30 rounded-lg flex items-start gap-3 text-xs">
        <Layers className="w-5 h-5 text-[#176B87] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-[#123B5D] uppercase tracking-wide">
            Configurable Scheme + Generic Rule Engine Architecture
          </h3>
          <p className="text-[#64757D] mt-1 leading-relaxed">
            Schemes do not use hardcoded conditionals. The SAARTHI Rule Engine interprets dynamic operators (<code>EQUALS</code>, <code>GREATER_THAN_EQUAL</code>, <code>LESS_THAN_EQUAL</code>, <code>IN</code>) against candidate profile attributes across all workflows.
          </p>
        </div>
      </div>

      {/* Schemes Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes.map(sch => (
          <div key={sch.id} className="bg-white p-5 rounded-lg border border-[#DCE5E2] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE5E2]">
              <div>
                <span className="font-mono font-bold text-xs text-[#176B87]">{sch.code}</span>
                <h3 className="font-bold text-sm text-[#123B5D] leading-snug">{sch.name}</h3>
              </div>
              <span className="bg-[#E8F4EF] text-[#247A5A] text-[10px] font-bold px-2 py-0.5 rounded border border-[#247A5A]/30">
                {sch.status}
              </span>
            </div>

            <p className="text-xs text-[#64757D] line-clamp-2">
              {sch.description}
            </p>

            <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#F8FAF9] rounded border border-[#DCE5E2] text-xs">
              <div>
                <span className="text-[#64757D] text-[10px] block">Grant Amount</span>
                <span className="font-bold text-[#185C46]">₹{sch.annualAmount.toLocaleString('en-IN')}/yr</span>
              </div>
              <div>
                <span className="text-[#64757D] text-[10px] block">Configured Rules</span>
                <span className="font-bold text-[#123B5D]">{sch.rules.length} Rules Active</span>
              </div>
            </div>

            {/* Configured Rules Summary List */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-[#64757D] uppercase tracking-wider block">
                Active Eligibility Criteria:
              </span>
              {sch.rules.map(r => (
                <div key={r.id} className="text-[11px] p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-medium text-[#263640]">{r.fieldLabel}:</span>
                  <span className="font-mono text-[#176B87]">
                    {r.operator} {String(r.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Builder Modal (Section 23) */}
      {showBuilderModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCE5E2]">
              <div>
                <span className="text-xs font-bold text-[#176B87]">SCHEME ENGINE BUILDER</span>
                <h3 className="text-base font-bold text-[#123B5D]">Configure New Scheme & Rules</h3>
              </div>
              <button 
                onClick={() => setShowBuilderModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveScheme} className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-medium text-[#263640] mb-1">Scheme Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Tribal Doctoral Fellowship"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DCE5E2] rounded focus:outline-none focus:border-[#176B87]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#263640] mb-1">Scheme Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NTDF-2026"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DCE5E2] rounded focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#263640] mb-1">Scheme Type *</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#DCE5E2] rounded bg-white focus:outline-none"
                  >
                    <option value="FELLOWSHIP">Fellowship</option>
                    <option value="SCHOLARSHIP">Scholarship</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#263640] mb-1">Annual Grant (₹) *</label>
                  <input
                    type="number"
                    required
                    value={annualAmount}
                    onChange={e => setAnnualAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-[#DCE5E2] rounded focus:outline-none font-semibold text-[#185C46]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#263640] mb-1">Installments Count *</label>
                  <input
                    type="number"
                    required
                    value={installments}
                    onChange={e => setInstallments(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-[#DCE5E2] rounded focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-medium text-[#263640] mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Scheme summary and objectives..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DCE5E2] rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Eligibility Rules Editor (Section 13 & 23) */}
              <div className="pt-2 border-t border-[#DCE5E2]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xs text-[#123B5D] uppercase tracking-wide">
                    Configured Eligibility Rules ({rules.length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddRule}
                    className="text-xs text-[#176B87] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Rule</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {rules.map((rule, idx) => (
                    <div key={rule.id} className="p-2.5 bg-[#F8FAF9] rounded border border-[#DCE5E2] flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Field Label"
                        value={rule.fieldLabel}
                        onChange={e => {
                          const val = e.target.value;
                          setRules(prev => prev.map((r, i) => i === idx ? { ...r, fieldLabel: val } : r));
                        }}
                        className="w-1/3 px-2 py-1 border border-[#DCE5E2] rounded bg-white text-xs"
                      />

                      <select
                        value={rule.operator}
                        onChange={e => {
                          const op = e.target.value as any;
                          setRules(prev => prev.map((r, i) => i === idx ? { ...r, operator: op } : r));
                        }}
                        className="w-1/3 px-2 py-1 border border-[#DCE5E2] rounded bg-white text-xs font-mono"
                      >
                        <option value="EQUALS">EQUALS</option>
                        <option value="NOT_EQUALS">NOT_EQUALS</option>
                        <option value="GREATER_THAN_EQUAL">&gt;= (GREATER_THAN_EQUAL)</option>
                        <option value="LESS_THAN_EQUAL">&lt;= (LESS_THAN_EQUAL)</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Value"
                        value={String(rule.value)}
                        onChange={e => {
                          const val = e.target.value;
                          setRules(prev => prev.map((r, i) => i === idx ? { ...r, value: val } : r));
                        }}
                        className="w-1/3 px-2 py-1 border border-[#DCE5E2] rounded bg-white text-xs font-mono"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveRule(rule.id)}
                        className="text-slate-400 hover:text-[#C84B4B] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCE5E2] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowBuilderModal(false)}
                  className="px-4 py-2 border border-[#DCE5E2] hover:bg-slate-50 text-[#263640] rounded text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#247A5A] hover:bg-[#185C46] text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Publish Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
