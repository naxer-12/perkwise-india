import React, { useMemo } from 'react';
import { 
  ShieldCheck, 
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ARTICLES_DATA } from '../data/articlesData';
import { SOURCES_REGISTRY } from '../data/sourcesData';
import { CREDIT_CARD_SEGMENTS, CREDIT_CARDS_DATA } from '../data/creditCardsData';
import type { LifeCategory } from '../types';

import { CategoryIcon } from './CategoryIcon';
import { Layers } from 'lucide-react';

interface HeroProps {
  selectedCategory: LifeCategory | 'all';
  setSelectedCategory: (cat: LifeCategory | 'all') => void;
  onExploreCardsClick: () => void;
  onStartChecklistClick?: () => void;
  onInspectProvenance?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  setSelectedCategory,
  onExploreCardsClick,
  onInspectProvenance
}) => {
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const article of ARTICLES_DATA) {
      counts[article.category] = (counts[article.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-slate-50/70 via-white to-white text-slate-900 pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* Audited Reference Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs max-w-2xl mx-auto">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Empirically audited reference sheets backed by official RBI Master Directions, NPCI mandates, Income Tax sections, and verified bank schedules.</span>
        </div>

        {/* Concise, Powerful Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Stop Leaving Money on the Table.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900">
            Every Rupee, Loyalty Perk &amp; Scheme Optimized.
          </span>
        </h1>

        {/* Human-Centered Subtext */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          India’s unbiased consumer awareness repository and mathematical personal finance compendium. Designed to optimize daily life operations, eliminate unnecessary fees, unlock member privileges, and elevate financial literacy across all strata of consumers.
        </p>

        {/* 1-Click Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreCardsClick}
            className="group px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer hover:shadow-sm"
          >
            <CreditCard className="w-4 h-4 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6" />
            <span>Explore Credit &amp; Debit Card Buying Guide</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onInspectProvenance?.()}
            className="group px-4 py-2.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs sm:text-sm font-semibold shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:scale-115" />
            <span>Inspect Real-Time Data Provenance</span>
          </button>
        </div>

        {/* Compact Metric Strip */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-900 font-semibold">{SOURCES_REGISTRY.length}</span> Verified Sources
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-700 font-semibold">{CREDIT_CARDS_DATA.length}</span> Audited Cards &amp; Deals
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-900 font-semibold">{CREDIT_CARD_SEGMENTS.length}</span> Buying Segments
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-900 font-semibold">{CATEGORIES_DATA.length}</span> Life Facets
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            100% Free &amp; Unbiased
          </div>
        </div>

        {/* Scannable, Compact Category Chips with Animated Icons & Counts */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Filter Knowledge Base by Daily Operation Category:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`group px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/70'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-115 ${selectedCategory === 'all' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-900'}`} />
              <span>All Categories</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                selectedCategory === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {ARTICLES_DATA.length}
              </span>
            </button>
            {CATEGORIES_DATA.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/70'
                  }`}
                >
                  <CategoryIcon 
                    category={cat.id} 
                    className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-900'}`} 
                  />
                  <span>{cat.shortName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
