import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import type { LanguageCode, LanguageOption } from '../i18n/types';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  className = ''
}) => {
  const { language, setLanguage, currentLanguage, supportedLanguages, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left shrink-0 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold ${
          isOpen
            ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs ring-2 ring-emerald-500/20'
            : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700 hover:text-slate-900 shadow-2xs'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={`${t('common.changeLanguage')} (${currentLanguage.nativeName})`}
      >
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <Globe className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12 ${
            isOpen ? 'text-emerald-600' : 'text-slate-500 group-hover:text-emerald-600'
          }`} />
        </div>
        
        <span className="font-bold text-slate-900 tracking-tight">{currentLanguage.nativeName}</span>
        
        {!compact && (
          <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
            ({currentLanguage.name})
          </span>
        )}
        
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180 text-emerald-600' : ''
        }`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-black/5"
          role="menu"
        >
          <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                {t('common.selectLanguage')}
              </span>
              <span className="text-[10px] text-slate-400 block">
                8 Languages • 100% Client-Side Sync
              </span>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
              {currentLanguage.code.toUpperCase()}
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
            {supportedLanguages.map((opt: LanguageOption) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'hover:bg-slate-100/90 text-slate-700 hover:text-slate-900 font-medium'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm shrink-0">{opt.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">{opt.nativeName}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                          ({opt.name})
                        </span>
                      </div>
                      <span className={`text-[9px] block leading-tight ${isSelected ? 'text-emerald-100/90' : 'text-slate-400'}`}>
                        {opt.region}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 pt-2 pb-1 border-t border-slate-100 text-[10px] text-slate-400 text-center font-medium">
            {t('common.languageSubtitle')}
          </div>
        </div>
      )}
    </div>
  );
};
