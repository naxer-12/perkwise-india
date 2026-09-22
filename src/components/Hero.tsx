import React, { useMemo } from 'react';
import { 
  Layers
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ARTICLES_DATA } from '../data/articlesData';
import type { LifeCategory, SiteConfig } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { useTranslation } from '../i18n/useTranslation';
import { getLocalizedCategory } from '../i18n/contentTranslations';

import { HeroMockup2Isometric } from './homepage/HeroMockup2Isometric';

interface HeroProps {
  selectedCategory: LifeCategory | 'all';
  setSelectedCategory: (cat: LifeCategory | 'all') => void;
  onExploreCardsClick: () => void;
  onStartChecklistClick?: () => void;
  onExploreLoungesClick?: () => void;
  onExploreHacksClick?: () => void;
  onSelectCard?: (cardId: string) => void;
  siteConfig?: SiteConfig;
  cardsCount?: number;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  setSelectedCategory,
  onExploreCardsClick,
  onExploreLoungesClick,
  onExploreHacksClick: _onExploreHacksClick,
  onSelectCard,
  cardsCount
}) => {
  const { t, language } = useTranslation();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const article of ARTICLES_DATA) {
      counts[article.category] = (counts[article.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="w-full">
      {/* Primary Hero: Calming 3D Card Deck & Exciting Deals */}
      <HeroMockup2Isometric
        onExploreCards={onExploreCardsClick}
        onExploreLounges={onExploreLoungesClick}
        onSelectCard={onSelectCard}
        cardsCount={cardsCount}
      />

      {/* 3. Scannable Category Filter Chips Strip */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Browse By Category:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-5xl">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`group px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/70'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-115 ${selectedCategory === 'all' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-900'}`} />
              <span>{t('categories.all')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                selectedCategory === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {ARTICLES_DATA.length}
              </span>
            </button>
            {CATEGORIES_DATA.map((cat) => {
              const localizedCat = getLocalizedCategory(cat, language);
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/70'
                  }`}
                >
                  <CategoryIcon 
                    category={cat.id} 
                    className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-900'}`} 
                  />
                  <span>{localizedCat.shortName}</span>
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
