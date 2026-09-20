import type { LanguageCode, TranslationSchema } from '../types';
import { en } from './en';
import { hi } from './hi';
import { gu } from './gu';
import { mr } from './mr';
import { ta } from './ta';
import { te } from './te';
import { bn } from './bn';
import { kn } from './kn';

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  en,
  hi,
  gu,
  mr,
  ta,
  te,
  bn,
  kn,
};

/**
 * Safely lookup a dot-separated translation key path, e.g. "nav.dealsHub" or "common.save"
 * Fallback gracefully to English or provided fallback string.
 */
export function getTranslation(lang: LanguageCode, keyPath: string, fallback?: string): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const parts = keyPath.split('.');
  
  let current: any = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      current = undefined;
      break;
    }
  }

  if (typeof current === 'string') {
    return current;
  }

  // Fallback to English
  let enCurrent: any = TRANSLATIONS.en;
  for (const part of parts) {
    if (enCurrent && typeof enCurrent === 'object' && part in enCurrent) {
      enCurrent = enCurrent[part];
    } else {
      enCurrent = undefined;
      break;
    }
  }

  if (typeof enCurrent === 'string') {
    return enCurrent;
  }

  return fallback || keyPath;
}
