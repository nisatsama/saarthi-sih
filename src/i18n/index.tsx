import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './locales/en';
import { hi } from './locales/hi';
import { sat } from './locales/sat';

export type Language = 'en' | 'hi' | 'sat';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  shortLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', shortLabel: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', shortLabel: 'हिन्दी' },
  { code: 'sat', name: 'Santhali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', shortLabel: 'ᱥᱟᱱᱛᱟᱲᱤ' }
];

const translations: Record<Language, any> = {
  en,
  hi,
  sat
};

const STORAGE_KEY = 'saarthi_language';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatStatus: (status: string) => string;
  languages: LanguageOption[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper function to resolve nested dot-separated keys
function resolveKey(obj: any, path: string): string | undefined {
  if (!obj) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'hi' || saved === 'sat') {
        return saved;
      }
    } catch {
      // Ignore localStorage access errors
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  // Safe translation resolver with safe English fallback and interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
    // 1. Try selected language
    let text = resolveKey(translations[language], key);

    // 2. Safe fallback to English if missing or empty
    if (!text && language !== 'en') {
      text = resolveKey(translations.en, key);
    }

    // 3. If still missing, return user-friendly fallback
    if (!text) {
      const parts = key.split('.');
      return parts[parts.length - 1];
    }

    // 4. Perform {{param}} interpolation
    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        text = text!.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(paramVal));
      });
    }

    return text;
  };

  const formatStatus = (status: string): string => {
    const key = `status.${status}`;
    const translated = t(key);
    if (translated && translated !== status) {
      return translated;
    }
    // Clean formatted presentation fallback
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatStatus,
        languages: LANGUAGES
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
