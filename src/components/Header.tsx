import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  CreditCard, 
  Calculator, 
  Compass, 
  BookOpen, 
  Menu, 
  X, 
  ArrowRight,
  Globe
} from 'lucide-react';

import { PerkWiseLogo } from './PerkWiseLogo';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../i18n/useTranslation';
import type { SiteConfig } from '../types';

interface HeaderProps {
  activeTab: 'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks';
  setActiveTab: (tab: 'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks') => void;
  bookmarkCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSearch?: () => void;
  siteConfig?: SiteConfig;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  onOpenSearch,
  siteConfig
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, supportedLanguages } = useTranslation();

  // Global '/' and 'Cmd+K' / 'Ctrl+K' shortcuts to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA';
      if (!isInput) {
        if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
          e.preventDefault();
          onOpenSearch?.();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs select-none">
      {/* Top Notification Bar */}
      {(!siteConfig || siteConfig.showNotificationBar) && (
        <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            {t('common.independent')}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 font-normal truncate max-w-xl sm:max-w-2xl">
            {siteConfig?.notificationMessage || t('common.notificationDefault')}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* 1. Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('library'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <PerkWiseLogo size="md" animated={true} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  PerkWise
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                  INDIA 🇮🇳
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 hidden xl:block leading-none mt-0.5">
                {t('footer.tagline')}
              </p>
            </div>
          </div>

          {/* 2. Structured Desktop Navigation Bar - Clean Single-Line Structured Variant */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <nav className="h-10 flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 shadow-2xs shrink-0 flex-nowrap">
              {/* Deals Hub */}
              {(!siteConfig || siteConfig.showDealsHub) && (
                <button
                  type="button"
                  onClick={() => setActiveTab('library')}
                  className={`h-8 whitespace-nowrap shrink-0 group flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'library' 
                      ? 'text-emerald-800 bg-white font-bold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <BookOpen className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${activeTab === 'library' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="whitespace-nowrap">{t('nav.dealsHub')}</span>
                </button>
              )}

              {/* Credit Card Buying Guide */}
              {(!siteConfig || siteConfig.showCardGuide) && (
                <button
                  type="button"
                  onClick={() => setActiveTab('card-guide')}
                  className={`h-8 whitespace-nowrap shrink-0 group flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'card-guide' || activeTab === 'checklist'
                      ? 'text-emerald-800 bg-white font-bold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                  title={t('cardGuide.title')}
                >
                  <CreditCard className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${activeTab === 'card-guide' || activeTab === 'checklist' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="whitespace-nowrap">{t('nav.cardGuide')}</span>
                </button>
              )}

              {/* ROI Savings Calculator */}
              {(!siteConfig || siteConfig.showCalculator) && (
                <button
                  type="button"
                  onClick={() => setActiveTab('calculator')}
                  className={`h-8 whitespace-nowrap shrink-0 group flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'calculator' 
                      ? 'text-emerald-800 bg-white font-bold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Calculator className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${activeTab === 'calculator' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="whitespace-nowrap">{t('nav.calculator')}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap shrink-0">
                    {t('common.soon')}
                  </span>
                </button>
              )}

              {/* Finance Hacks Hub */}
              {(!siteConfig || siteConfig.showLifeOperations) && (
                <button
                  type="button"
                  onClick={() => setActiveTab('life-operations')}
                  className={`h-8 whitespace-nowrap shrink-0 group flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'life-operations' 
                      ? 'text-emerald-800 bg-white font-bold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Compass className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45 shrink-0 ${activeTab === 'life-operations' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="whitespace-nowrap">{t('nav.financeHacks')}</span>
                </button>
              )}

              {/* Bookmarks Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('bookmarks')}
                className={`h-8 whitespace-nowrap shrink-0 group flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'bookmarks'
                    ? 'text-emerald-800 bg-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${activeTab === 'bookmarks' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span className="whitespace-nowrap">{t('nav.savedItems')}</span>
                {bookmarkCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                    {bookmarkCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* 3. Search & Structured Language Tool (Desktop) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Compact Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center justify-between w-36 lg:w-44 xl:w-56 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 rounded-xl border border-slate-200/90 transition-all cursor-pointer shadow-2xs group shrink-0"
              title="Global search (⌘K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                <span className="truncate font-medium">{t('common.searchPlaceholder')}</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector Tool */}
            <LanguageSelector />
          </div>

          {/* 4. Mobile Actions (Search, Language, Bookmarks & Drawer Trigger) */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <LanguageSelector compact={true} />

            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bookmarks')}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Organized into Clear Thematic Sections */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150 shadow-xl">
          {/* Prominent Mobile Language Switcher Grid */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('common.selectLanguage')}</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                8 Languages
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {supportedLanguages.map(langOpt => (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => {
                    setLanguage(langOpt.code);
                  }}
                  className={`px-2 py-1.5 rounded-xl text-center transition-all cursor-pointer ${
                    language === langOpt.code
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium'
                  }`}
                >
                  <span className="block text-xs font-bold">{langOpt.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch?.();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100 rounded-xl text-slate-500 text-xs font-medium border border-slate-200 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>{t('common.searchPlaceholder')}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono border border-slate-200">
              ⌘K
            </span>
          </button>

          <div className="space-y-4">
            {/* Section 1: Discover Perks & Finance Hacks */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Discover Perks &amp; Finance Hacks
              </span>
              <button
                type="button"
                onClick={() => { setActiveTab('library'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'library' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>{t('nav.dealsHub')}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('life-operations'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'life-operations' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>{t('nav.financeHacks')} (Debit, Hotels, Health)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Section 2: Credit Cards & Eligibility */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                {t('categories.creditCards')}
              </span>
              <button
                type="button"
                onClick={() => { setActiveTab('card-guide'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'card-guide' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>{t('nav.cardGuide')}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  {t('common.audited')}
                </span>
              </button>
            </div>

            {/* Section 3: Tools & Features */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Tools &amp; Features
              </span>
              {(!siteConfig || siteConfig.showCalculator) && (
                <button
                  type="button"
                  onClick={() => { setActiveTab('calculator'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeTab === 'calculator' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span>{t('nav.calculator')}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    {t('common.comingSoon')}
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => { setActiveTab('bookmarks'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'bookmarks' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-slate-500" />
                  <span>{t('nav.savedItems')}</span>
                </div>
                <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                  {bookmarkCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
