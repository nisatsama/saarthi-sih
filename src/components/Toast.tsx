import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, setToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#123B5D] text-white px-4 py-3 rounded-lg shadow-xl border border-white/20 flex items-center gap-3 text-xs max-w-md">
        <CheckCircle2 className="w-4 h-4 text-[#247A5A] shrink-0" />
        <span className="flex-1 font-medium">{toastMessage}</span>
        <button 
          onClick={() => setToast(null)}
          className="text-slate-300 hover:text-white p-0.5 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
