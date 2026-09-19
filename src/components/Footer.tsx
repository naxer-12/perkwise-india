import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PerkWiseLogo } from './PerkWiseLogo';

interface FooterProps {
  onNavigate: (tab: 'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand & Mission */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <PerkWiseLogo size="sm" animated={false} />
            <span className="font-extrabold text-lg text-white tracking-tight">PerkWise India 🇮🇳</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            India’s unbiased consumer awareness repository and mathematical personal finance compendium. 
            Designed to optimize daily life operations, eliminate unnecessary fees, unlock member privileges, 
            and elevate financial literacy across all strata of consumers.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RBI Master Directions & DGCA Passenger Charter Aligned</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Interactive Modules</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('card-guide')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Credit & Debit Card Buying Guide
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('calculator')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Spend & Net ROI Simulator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('life-operations')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Beyond Cards: Daily Life Operations
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('provenance')} className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Data Provenance & Real-Time Sync</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Life Facets */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Key Life Facets</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><span>Hotel Loyalty & 50% Dining (Accor/Marriott)</span></li>
            <li><span>1% Debit Card Cashbacks & High-Yield Banking</span></li>
            <li><span>Government Social Security (PMJJBY/PMSBY)</span></li>
            <li><span>Grocery Passes & Delivery Fee Insulation</span></li>
            <li><span>Zero Forex Currency & International Travel</span></li>
          </ul>
        </div>
      </div>

      {/* Statutory Disclaimer & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p className="text-center sm:text-left">
          <strong>Statutory Disclaimer:</strong> PerkWise India is an independent consumer education initiative. 
          Information is compiled from publicly verified bank disclosures, RBI circulars, and merchant terms. 
          We do not solicit financial deposits or credit card applications directly.
        </p>
        <div className="flex items-center gap-1 shrink-0 text-slate-400">
          <span>Crafted for Indian Consumers</span>
        </div>
      </div>
    </footer>
  );
};
