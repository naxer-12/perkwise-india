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
  Lock
} from 'lucide-react';

import { PerkWiseLogo } from './PerkWiseLogo';
import type { SiteConfig } from '../types';

interface HeaderProps {
  activeTab: 'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks' | 'admin';
  setActiveTab: (tab: 'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks' | 'admin') => void;
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification Bar */}
      {(!siteConfig || siteConfig.showNotificationBar) && (
        <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            Independent &amp; Source-Backed
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 font-normal">
            {siteConfig?.notificationMessage || 'Zero Affiliate Bias • Verified Against Official Bank MITCs & RBI Schedules'}
          </span>
        </div>
      )}

      {/* Admin Mode Bar if in Admin */}
      {activeTab === 'admin' && (
        <div className="bg-purple-900 text-purple-100 text-xs py-1.5 px-4 flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Lock className="w-3.5 h-3.5 text-purple-300" />
              <span>PerkWise Control Deck &amp; Admin Mode Active</span>
              <span className="hidden sm:inline text-purple-300/70 text-[11px]">• Publishing &amp; component settings apply live</span>
            </div>
            <button
              onClick={() => setActiveTab('card-guide')}
              className="text-xs bg-purple-700 hover:bg-purple-600 text-white font-medium px-2.5 py-0.5 rounded cursor-pointer transition-colors"
            >
              Exit to Live Site →
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('library'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <PerkWiseLogo size="md" animated={true} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  PerkWise
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  INDIA 🇮🇳
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 hidden xl:block leading-none mt-0.5">
                Maxing Deals, Schemes &amp; Daily Operations
              </p>
            </div>
          </div>

          {/* Desktop Global Search Trigger (Mintlify / Raycast style command palette) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden md:flex items-center justify-between flex-1 max-w-xs lg:max-w-sm px-3.5 py-2 text-xs bg-slate-100 hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 rounded-xl border border-slate-200/90 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:scale-115 group-hover:rotate-6 transition-all duration-200 shrink-0" />
              <span className="truncate font-medium">Search cards, deals, sources...</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs group-hover:border-slate-300">
                ⌘K
              </kbd>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 1. Deals & Perks Hub */}
            {(!siteConfig || siteConfig.showDealsHub) && (
              <button
                onClick={() => setActiveTab('library')}
                className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'library' 
                    ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-115 group-hover:-rotate-6 ${activeTab === 'library' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span>Deals Hub</span>
              </button>
            )}

            {/* 2. Credit & Debit Card Buying Guide */}
            {(!siteConfig || siteConfig.showCardGuide) && (
              <button
                onClick={() => setActiveTab('card-guide')}
                className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'card-guide' || activeTab === 'checklist'
                    ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                title="Structured credit and debit card buying guide"
              >
                <CreditCard className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6 ${activeTab === 'card-guide' || activeTab === 'checklist' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span>Card Buying Guide</span>
              </button>
            )}

            {/* 3. ROI Savings Calculator */}
            {(!siteConfig || siteConfig.showCalculator) && (
              <button
                onClick={() => setActiveTab('calculator')}
                className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'calculator' 
                    ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Calculator className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-115 group-hover:-translate-y-0.5 ${activeTab === 'calculator' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span>Calculator</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  Coming Soon
                </span>
              </button>
            )}

            {/* 4. Daily Operations Hub */}
            {(!siteConfig || siteConfig.showLifeOperations) && (
              <button
                onClick={() => setActiveTab('life-operations')}
                className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'life-operations' 
                    ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-45 ${activeTab === 'life-operations' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span>Life Hacks</span>
              </button>
            )}

            {/* Admin Console indicator if active */}
            {activeTab === 'admin' && (
              <span className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg text-purple-700 bg-purple-50 border border-purple-200">
                <Lock className="w-3.5 h-3.5 text-purple-600" />
                <span>Admin Console</span>
              </span>
            )}

            {/* Bookmarks Button */}
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'text-emerald-700 bg-emerald-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-115 group-hover:-translate-y-0.5 ${activeTab === 'bookmarks' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
              <span>Saved</span>
              {bookmarkCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold animate-pulse-subtle">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Actions: Search Trigger & Menu Button */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Organized into Clear Thematic Sections */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
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
              <span>Search cards, guides, sources...</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono border border-slate-200">
              ⌘K
            </span>
          </button>

          <div className="space-y-4">
            {/* Section 1: Discover Perks */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Discover Perks & Hacks
              </span>
              <button
                onClick={() => { setActiveTab('library'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'library' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Deals & Schemes Knowledge Hub</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => { setActiveTab('life-operations'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'life-operations' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Daily Life Hacks (Debit, Hotels, Health)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Section 2: Credit Cards & Eligibility */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Credit & Debit Cards
              </span>
              <button
                onClick={() => { setActiveTab('card-guide'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'card-guide' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Card Buying Guide (All Segments)</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  Audited
                </span>
              </button>
            </div>

            {/* Section 3: Tools & Verification */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Tools &amp; Features
              </span>
              {(!siteConfig || siteConfig.showCalculator) && (
                <button
                  onClick={() => { setActiveTab('calculator'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeTab === 'calculator' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span>Savings Calculator</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Coming Soon
                  </span>
                </button>
              )}
              <button
                onClick={() => { setActiveTab('bookmarks'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'bookmarks' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-slate-500" />
                  <span>Saved Reading List</span>
                </div>
                <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                  {bookmarkCount} items
                </span>
              </button>
              <button
                onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'admin' ? 'bg-purple-50 text-purple-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                  <span>Admin Portal</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                  Control
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
