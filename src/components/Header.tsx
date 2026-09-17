import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  CreditCard, 
  CheckSquare, 
  Calculator, 
  Compass, 
  BookOpen, 
  Menu, 
  X, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks';
  setActiveTab: (tab: 'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks') => void;
  bookmarkCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  searchQuery,
  setSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global '/' shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isCardsGroupActive = activeTab === 'card-guide' || activeTab === 'checklist';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Status & Cadence Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Real-Time Statutory Gazette
        </span>
        <span className="hidden md:inline text-slate-400">•</span>
        <span className="hidden md:inline">
          Daily Web Crawler sweeps deals at 03:00 AM IST • 100% Unbiased & Zero-Affiliate
        </span>
        <span className="md:hidden">
          Daily Crawler at 03:00 IST • 100% Unbiased
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('library'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">PerkWise</span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  INDIA 🇮🇳
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 hidden xl:block leading-none mt-0.5">
                Maxing Deals, Schemes & Daily Operations
              </p>
            </div>
          </div>

          {/* Desktop Global Search */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search guides, cards, schemes... (Press '/')"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'library' && e.target.value.trim().length > 0) {
                  setActiveTab('library');
                }
              }}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 1. Deals & Perks Hub */}
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'library' 
                  ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 ${activeTab === 'library' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Deals Hub</span>
            </button>

            {/* 2. Cohesive Credit Cards & Eligibility Segmented Control */}
            <div className={`flex items-center p-0.5 rounded-xl border transition-all ${
              isCardsGroupActive 
                ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300/30' 
                : 'bg-slate-100/80 border-slate-200/90'
            }`}>
              <button
                onClick={() => setActiveTab('card-guide')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'card-guide'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Structured credit card comparison sheets"
              >
                <CreditCard className={`w-3.5 h-3.5 ${activeTab === 'card-guide' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>Card Buying Guide</span>
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'checklist'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Check salary, CIBIL, and documentation readiness"
              >
                <CheckSquare className={`w-3.5 h-3.5 ${activeTab === 'checklist' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>Prerequisites</span>
              </button>
            </div>

            {/* 3. ROI Savings Calculator */}
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'calculator' 
                  ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Calculator className={`w-3.5 h-3.5 ${activeTab === 'calculator' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Calculator</span>
            </button>

            {/* 4. Daily Operations Hub */}
            <button
              onClick={() => setActiveTab('life-operations')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'life-operations' 
                  ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${activeTab === 'life-operations' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Life Hacks</span>
            </button>

            {/* 5. Live Gazette & Daily Agent */}
            <button
              onClick={() => setActiveTab('provenance')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'provenance' 
                  ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === 'provenance' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Gazette & Agent</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            </button>

            {/* Bookmarks Button */}
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'text-emerald-700 bg-emerald-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {bookmarkCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
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
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search all guides and schemes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTab('library');
              }}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 rounded-lg border border-slate-200 outline-hidden"
            />
          </div>

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
                Credit Cards & Eligibility
              </span>
              <button
                onClick={() => { setActiveTab('card-guide'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'card-guide' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Credit Card Buying Guide (All Segments)</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  Audited
                </span>
              </button>
              <button
                onClick={() => { setActiveTab('checklist'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'checklist' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>Prerequisites & Application Checklist</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                  Interactive
                </span>
              </button>
            </div>

            {/* Section 3: Tools & Verification */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                Tools & Real-Time Provenance
              </span>
              <button
                onClick={() => { setActiveTab('calculator'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'calculator' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <span>Savings Calculator & Wallet Stack</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => { setActiveTab('provenance'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  activeTab === 'provenance' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Live Gazette & Daily Crawler Agent</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
