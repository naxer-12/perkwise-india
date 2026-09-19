import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Landmark, 
  ShoppingBag, 
  Zap, 
  Fuel, 
  HeartPulse, 
  Film, 
  Laptop, 
  CheckSquare, 
  AlertCircle
} from 'lucide-react';
import { LIFE_OPERATIONS_FACETS } from '../data/lifeOperationsData';
import type { LifeCategory } from '../types';

interface LifeOperationsHubProps {
  onSelectArticleByCategory?: (category: LifeCategory) => void;
}

export const LifeOperationsHub: React.FC<LifeOperationsHubProps> = ({
  onSelectArticleByCategory
}) => {
  const [selectedFacetId, setSelectedFacetId] = useState<string>(LIFE_OPERATIONS_FACETS[0].id);

  const activeFacet = LIFE_OPERATIONS_FACETS.find(f => f.id === selectedFacetId) || LIFE_OPERATIONS_FACETS[0];

  const getFacetIcon = (cat: LifeCategory) => {
    switch (cat) {
      case 'debit-cards': return Landmark;
      case 'hotel-loyalty': return Building2;
      case 'grocery-food': return ShoppingBag;
      case 'utilities-bills': return Zap;
      case 'health-wellness': return HeartPulse;
      case 'govt-schemes': return ShieldCheck;
      case 'fuel-transit': return Fuel;
      case 'entertainment-ott': return Film;
      case 'workspace-hardware': return Laptop;
      default: return Compass;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <Compass className="w-3.5 h-3.5" />
          <span>Beyond Credit Cards: Holistic Daily Life Optimization</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ease Out Everyday Life Operations & Unlock Member Arbitrage
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Modern personal finance is not just credit cards. It is how you manage everyday friction points: 
          telemedicine, 50% dining discounts, zero-delivery grocery passes, 1% debit cashbacks, 
          and sovereign government micro-insurance schemes.
        </p>
      </div>

      {/* Facet Navigation Tabs */}
      <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-1.5">
          {LIFE_OPERATIONS_FACETS.map(facet => {
            const Icon = getFacetIcon(facet.category);
            const isSelected = facet.id === selectedFacetId;
            return (
              <button
                key={facet.id}
                onClick={() => setSelectedFacetId(facet.id)}
                className={`group py-2.5 px-2 text-center rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-125 group-hover:-translate-y-0.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span className="line-clamp-1 text-[11px]">{facet.title.split(':')[0].split(',')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Facet Comprehensive Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-6">
        {/* Facet Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8">
          <div className="max-w-4xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Daily Life Blueprint
              </span>
              <span className="text-xs text-slate-400">
                Average Annual Savings: <strong className="text-emerald-400 font-semibold">{activeFacet.averageAnnualSavings}</strong>
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              {activeFacet.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              {activeFacet.subheading}
            </p>
          </div>
        </div>

        {/* Friction vs Smart Solution Comparative Grid */}
        <div className="px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/70 space-y-1.5">
            <div className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>The Daily Consumer Friction Point</span>
            </div>
            <p className="text-xs text-rose-950/80 leading-relaxed font-medium">
              {activeFacet.dailyFrictionPoint}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-1.5">
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600 animate-pulse-subtle" />
              <span>The PerkWise Smart Arbitrage Solution</span>
            </div>
            <p className="text-xs text-emerald-950/80 leading-relaxed font-medium">
              {activeFacet.smartSolution}
            </p>
          </div>
        </div>

        {/* Top Programs / Schemes Breakdown */}
        <div className="px-6 sm:px-8 space-y-4">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>High-Impact Programs & Schemes</span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold border border-slate-200">
              {activeFacet.topProgramsOrSchemes.length} Essential Options
            </span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeFacet.topProgramsOrSchemes.map((prog, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50/60 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="border-b border-slate-200 pb-2">
                    <h5 className="font-bold text-slate-900 text-sm">{prog.name}</h5>
                    <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                      Cost: {prog.cost}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {prog.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 font-medium">
                  <strong>ROI & Break-even:</strong> {prog.breakEven}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Checklist for this Facet */}
        <div className="px-6 sm:px-8 pb-8 space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Immediate Steps to Take for This Facet:</span>
          </h4>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            {activeFacet.actionChecklist.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {onSelectArticleByCategory && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onSelectArticleByCategory(activeFacet.category)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group cursor-pointer"
              >
                <span>Read in-depth knowledge guides on {activeFacet.category.replace('-', ' ')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
