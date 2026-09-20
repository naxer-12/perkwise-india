import { createContext } from 'react';
import type { LanguageCode, LanguageOption } from './types';

export interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (keyPath: string, fallback?: string) => string;
  currentLanguage: LanguageOption;
  supportedLanguages: LanguageOption[];
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
