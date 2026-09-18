import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  Search, 
  X, 
  CreditCard as CreditCardIcon, 
  BookOpen, 
  ShieldCheck, 
  CornerDownLeft, 
  ExternalLink
} from 'lucide-react';
import { CREDIT_CARDS_DATA } from '../data/creditCardsData';
import { ARTICLES_DATA } from '../data/articlesData';
import { SOURCES_REGISTRY } from '../data/sourcesData';
import type { CreditCard, Article, DataSource } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: CreditCard) => void;
  onSelectArticle: (article: Article) => void;
  onSelectSource?: (source: DataSource) => void;
}

type SearchResultItem = 
  | { type: 'card'; data: CreditCard }
  | { type: 'article'; data: Article }
  | { type: 'source'; data: DataSource };

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCard,
  onSelectArticle,
  onSelectSource
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'cards' | 'articles' | 'sources'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Search indexing
  const results = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();

    // If query is empty, show curated top picks
    if (!q) {
      const topCards: SearchResultItem[] = CREDIT_CARDS_DATA.slice(0, 4).map(c => ({ type: 'card', data: c }));
      const topArticles: SearchResultItem[] = ARTICLES_DATA.slice(0, 3).map(a => ({ type: 'article', data: a }));
      const topSources: SearchResultItem[] = SOURCES_REGISTRY.slice(0, 2).map(s => ({ type: 'source', data: s }));

      if (activeFilter === 'cards') return topCards;
      if (activeFilter === 'articles') return topArticles;
      if (activeFilter === 'sources') return topSources;
      return [...topCards, ...topArticles, ...topSources];
    }

    const matchedCards: SearchResultItem[] = CREDIT_CARDS_DATA.filter(c => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.bank.toLowerCase().includes(q) ||
        c.network.toLowerCase().includes(q) ||
        c.whyThisCardWins.toLowerCase().includes(q) ||
        (c.dealCategory && c.dealCategory.toLowerCase().includes(q)) ||
        c.acceleratedRewardRate.toLowerCase().includes(q) ||
        (c.cardType && c.cardType.toLowerCase().includes(q)) ||
        (c.dealHighlights && c.dealHighlights.some(b => b.toLowerCase().includes(q)))
      );
    }).map(c => ({ type: 'card', data: c }));

    const matchedArticles: SearchResultItem[] = ARTICLES_DATA.filter(a => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        (a.stepsToAvail && a.stepsToAvail.some(s => s.toLowerCase().includes(q)))
      );
    }).map(a => ({ type: 'article', data: a }));

    let allSources = SOURCES_REGISTRY;
    try {
      const savedDiscovered = localStorage.getItem('perkwise_discovered_sources');
      if (savedDiscovered) {
        const parsed = JSON.parse(savedDiscovered);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allSources = [...parsed, ...SOURCES_REGISTRY];
        }
      }
    } catch {
      // fallback to SOURCES_REGISTRY
    }

    const matchedSources: SearchResultItem[] = allSources.filter(s => {
      return (
        s.name.toLowerCase().includes(q) ||
        s.authority.toLowerCase().includes(q) ||
        s.referenceCode.toLowerCase().includes(q) ||
        s.reasoning.toLowerCase().includes(q) ||
        (s.discoveryRunSummary && s.discoveryRunSummary.toLowerCase().includes(q))
      );
    }).map(s => ({ type: 'source', data: s }));

    if (activeFilter === 'cards') return matchedCards;
    if (activeFilter === 'articles') return matchedArticles;
    if (activeFilter === 'sources') return matchedSources;

    return [...matchedCards, ...matchedArticles, ...matchedSources];
  }, [query, activeFilter]);

  const executeSelection = useCallback((item: SearchResultItem) => {
    onClose();
    if (item.type === 'card') {
      onSelectCard(item.data);
    } else if (item.type === 'article') {
      onSelectArticle(item.data);
    } else if (item.type === 'source') {
      if (onSelectSource) {
        onSelectSource(item.data);
      } else {
        window.open(item.data.officialUrl, '_blank');
      }
    }
  }, [onClose, onSelectCard, onSelectArticle, onSelectSource]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        if (results.length > 0 && results[selectedIndex]) {
          e.preventDefault();
          executeSelection(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, executeSelection]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3 bg-white">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cards, high-yield debit deals, guides, statutory sources..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 bg-slate-50/70 text-xs overflow-x-auto">
          <button
            onClick={() => { setActiveFilter('all'); setSelectedIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeFilter === 'all' 
                ? 'bg-emerald-600 text-white shadow-2xs' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => { setActiveFilter('cards'); setSelectedIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === 'cards' 
                ? 'bg-emerald-600 text-white shadow-2xs' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <CreditCardIcon className="w-3 h-3" />
            <span>Cards & Deals (24)</span>
          </button>
          <button
            onClick={() => { setActiveFilter('articles'); setSelectedIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === 'articles' 
                ? 'bg-emerald-600 text-white shadow-2xs' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Daily Guides (24)</span>
          </button>
          <button
            onClick={() => { setActiveFilter('sources'); setSelectedIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              activeFilter === 'sources' 
                ? 'bg-emerald-600 text-white shadow-2xs' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Statutory Sources (15)</span>
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100 p-2">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <p className="text-sm font-semibold text-slate-700">No matching results found</p>
              <p className="text-xs text-slate-400">
                Try searching for "PhonePe", "SBI", "Debit", "Lounge", "Forex", "Infinia", or "Section 80CCD".
              </p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              if (item.type === 'card') {
                const card = item.data;
                const isDebit = card.cardType === 'debit';
                return (
                  <div
                    key={`card-${card.id}`}
                    onClick={() => executeSelection(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/80 ring-1 ring-emerald-300/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isDebit ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <CreditCardIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900 truncate">
                            {card.name}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-sm ${
                            isDebit ? 'bg-purple-50 text-purple-800 border border-purple-200' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {card.bank}
                          </span>
                          {card.missionScore && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-sm border border-emerald-200">
                              Score {card.missionScore}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {card.acceleratedRewardRate} • Fee: ₹{card.annualFee.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                        View 3D Showcase
                      </span>
                      <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-300'}`} />
                    </div>
                  </div>
                );
              }

              if (item.type === 'article') {
                const article = item.data;
                return (
                  <div
                    key={`art-${article.id}`}
                    onClick={() => executeSelection(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/80 ring-1 ring-emerald-300/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900 truncate">
                            {article.title}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {article.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                        Read Guide
                      </span>
                      <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-300'}`} />
                    </div>
                  </div>
                );
              }

              if (item.type === 'source') {
                const source = item.data;
                return (
                  <div
                    key={`src-${source.id}`}
                    onClick={() => executeSelection(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/80 ring-1 ring-emerald-300/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900 truncate">
                            {source.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                            {source.referenceCode}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {source.authority} • {source.reasoning}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <ExternalLink className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    </div>
                  </div>
                );
              }

              return null;
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">↵</kbd>
              <span>Select</span>
            </span>
          </div>
          <span className="font-medium text-emerald-700">
            Real-time search across 24 Cards, 24 Guides & 15 Sources
          </span>
        </div>
      </div>
    </div>
  );
};
