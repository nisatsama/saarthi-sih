import React, { useState, useRef, useEffect } from 'react';
import { useI18n, Language } from './index';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'header' | 'light' | 'dark';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'header' 
}) => {
  const { language, setLanguage, languages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const currentOption = languages.find(l => l.code === language) || languages[0];

  const buttonStyles = {
    header: 'bg-[#F8FAF9] hover:bg-slate-100 text-[#123B5D] border border-[#DCE5E2]',
    light: 'bg-white hover:bg-slate-50 text-[#123B5D] border border-[#DCE5E2]',
    dark: 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select interface language"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer select-none ${buttonStyles[variant]}`}
      >
        <Globe className={`w-3.5 h-3.5 ${variant === 'dark' ? 'text-slate-200' : 'text-[#176B87]'}`} />
        <span className="font-medium text-[11px]">{currentOption.nativeName}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''} ${variant === 'dark' ? 'text-slate-300' : 'text-slate-400'}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1.5 w-44 bg-white rounded-lg border border-[#DCE5E2] shadow-lg z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1.5 border-b border-[#DCE5E2] bg-[#F8FAF9] text-[10px] font-semibold text-[#64757D] uppercase tracking-wider">
            Language / भाषा / ᱯᱟᱹᱨᱥᱤ
          </div>

          <div className="py-1">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-[#E8F4EF] text-[#185C46] font-bold' 
                      : 'text-[#263640] hover:bg-[#EAF3F8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 font-sans">({lang.name})</span>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#247A5A] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
