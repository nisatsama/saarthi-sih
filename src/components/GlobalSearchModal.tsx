import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, FileText, BookOpen, User, ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApplication: (id: string) => void;
  onSelectScheme: (id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectApplication,
  onSelectScheme
}) => {
  const { applications, schemes } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event or props
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredApps = searchTerm.trim() === '' ? [] : applications.filter(a => 
    a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.state.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const filteredSchemes = searchTerm.trim() === '' ? [] : schemes.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-xl border border-[#DCE5E2] shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Input Bar */}
        <div className="p-3 border-b border-[#DCE5E2] flex items-center gap-2 bg-[#F8FAF9]">
          <Search className="w-4 h-4 text-[#64757D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by Application ID (e.g. TS-2026-00421), Applicant name, State, Scheme..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-[#263640] placeholder-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="text-[10px] bg-white border border-[#DCE5E2] px-1.5 py-0.5 rounded text-slate-500 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-2">
          {searchTerm.trim() === '' ? (
            <div className="p-6 text-center text-xs text-[#64757D]">
              <p className="font-medium text-[#263640] mb-1">Quick Search</p>
              <p>Type to search through all applications, schemes, and applicant records.</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                <button 
                  onClick={() => setSearchTerm('TS-2026-00421')} 
                  className="px-2 py-1 rounded bg-[#EAF3F8] text-[#176B87] text-[11px] font-medium hover:bg-slate-200 cursor-pointer"
                >
                  TS-2026-00421 (Rahul Oraon)
                </button>
                <button 
                  onClick={() => setSearchTerm('NFST-PHD')} 
                  className="px-2 py-1 rounded bg-[#EAF3F8] text-[#176B87] text-[11px] font-medium hover:bg-slate-200 cursor-pointer"
                >
                  NFST-PHD
                </button>
                <button 
                  onClick={() => setSearchTerm('Jharkhand')} 
                  className="px-2 py-1 rounded bg-[#EAF3F8] text-[#176B87] text-[11px] font-medium hover:bg-slate-200 cursor-pointer"
                >
                  Jharkhand
                </button>
              </div>
            </div>
          ) : filteredApps.length === 0 && filteredSchemes.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#64757D]">
              No records match "{searchTerm}"
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApps.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold text-[#64757D] uppercase tracking-wider">
                    Applications ({filteredApps.length})
                  </div>
                  <div className="space-y-1">
                    {filteredApps.map(app => (
                      <button
                        key={app.id}
                        onClick={() => {
                          onSelectApplication(app.id);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-md hover:bg-[#F8FAF9] flex items-center justify-between border border-transparent hover:border-[#DCE5E2] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start gap-2.5">
                          <FileText className="w-4 h-4 text-[#176B87] mt-0.5 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-[#123B5D] group-hover:underline">
                                {app.id}
                              </span>
                              <span className="text-xs text-[#263640] font-medium">
                                {app.applicantName}
                              </span>
                              <span className="text-[10px] text-[#64757D]">({app.state})</span>
                            </div>
                            <div className="text-[11px] text-[#64757D] mt-0.5">
                              {app.schemeName} · {app.institution}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <StatusBadge status={app.status} size="sm" />
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#176B87]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredSchemes.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold text-[#64757D] uppercase tracking-wider border-t border-[#DCE5E2] pt-2">
                    Schemes ({filteredSchemes.length})
                  </div>
                  <div className="space-y-1">
                    {filteredSchemes.map(sch => (
                      <button
                        key={sch.id}
                        onClick={() => {
                          onSelectScheme(sch.id);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-md hover:bg-[#F8FAF9] flex items-center justify-between border border-transparent hover:border-[#DCE5E2] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start gap-2.5">
                          <BookOpen className="w-4 h-4 text-[#247A5A] mt-0.5 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-[#123B5D] group-hover:underline">
                                {sch.code}
                              </span>
                              <span className="text-xs text-[#263640]">
                                {sch.name}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#64757D] mt-0.5 line-clamp-1">
                              {sch.description}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-semibold text-[#185C46]">
                            ₹{sch.annualAmount.toLocaleString('en-IN')}/yr
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
