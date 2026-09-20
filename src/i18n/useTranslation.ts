import { useContext } from 'react';
import { LanguageContext, type LanguageContextValue } from './context';
import { SUPPORTED_LANGUAGES } from './types';
import { getTranslation } from './translations';

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback if rendered outside provider
    return {
      language: 'en',
      setLanguage: () => {},
      t: (keyPath: string, fallback?: string) => getTranslation('en', keyPath, fallback),
      currentLanguage: SUPPORTED_LANGUAGES[0],
      supportedLanguages: SUPPORTED_LANGUAGES,
    };
  }
  return ctx;
}
