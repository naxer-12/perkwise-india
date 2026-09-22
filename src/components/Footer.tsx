import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PerkWiseLogo } from './PerkWiseLogo';
import { useTranslation } from '../i18n/useTranslation';
import type { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

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
            {t('footer.mission')}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('footer.rbiAligned')}</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {t('footer.interactiveModules')}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('card-guide')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                {t('nav.cardGuide')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('lounges')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                {t('nav.loungeFinder')} (Airport & Railway Access)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('calculator')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                {t('calculator.title')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('life-operations')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Beyond Cards: {t('nav.financeHacks')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('library')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                {t('nav.dealsHub')}
              </button>
            </li>
          </ul>
        </div>

        {/* Life Facets / Finance Hacks */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {t('footer.keyLifeFacets')}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><span>{t('financeHacks.hotelLoyalty')}</span></li>
            <li><span>{t('financeHacks.debitCards')}</span></li>
            <li><span>{t('financeHacks.govtSchemes')}</span></li>
            <li><span>{t('financeHacks.groceryFood')}</span></li>
            <li><span>{t('financeHacks.fuelTransit')}</span></li>
          </ul>
        </div>
      </div>

      {/* Statutory Disclaimer & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p className="text-center sm:text-left">
          <strong>{t('footer.disclaimerTitle')}:</strong> {t('footer.disclaimerText')}
        </p>
        <div className="flex items-center gap-1 shrink-0 text-slate-400">
          <span>{t('footer.craftedFor')}</span>
        </div>
      </div>
    </footer>
  );
};
