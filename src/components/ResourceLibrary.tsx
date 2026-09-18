import React, { useState } from 'react';
import { 
  BookOpen, 
  Bookmark, 
  ArrowRight, 
  Filter,
  Search,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ARTICLES_DATA } from '../data/articlesData';
import { CATEGORIES_DATA } from '../data/categoriesData';
import type { Article, LifeCategory } from '../types';

interface ResourceLibraryProps {
  selectedCategory: LifeCategory | 'all';
  setSelectedCategory: (cat: LifeCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarks: string[];
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  isBookmarksOnly?: boolean;
}

const CATEGORY_MAP: Record<string, string> = {};
CATEGORIES_DATA.forEach(cat => {
  CATEGORY_MAP[cat.id] = cat.shortName;
});

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  bookmarks,
  onToggleBookmark,
  onSelectArticle,
  isBookmarksOnly = false
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Filter logic
  const filteredArticles = ARTICLES_DATA.filter(article => {
    // If viewing bookmarks only
    if (isBookmarksOnly && !bookmarks.includes(article.id)) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && article.category !== selectedCategory) {
      return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all' && article.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchScheme = article.membershipOrScheme.toLowerCase().includes(q);
      const matchAuthority = article.sourceRef?.authority?.toLowerCase().includes(q) || false;
      const matchRefCode = article.sourceRef?.referenceCode?.toLowerCase().includes(q) || false;
      const matchTags = article.tags.some(t => t.toLowerCase().includes(q));
      const matchContent = article.detailedContent.toLowerCase().includes(q);
      return matchTitle || matchSummary || matchScheme || matchAuthority || matchRefCode || matchTags || matchContent;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBookmarksOnly ? 'Your Saved Reading List' : 'Actionable Consumer Library'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isBookmarksOnly 
              ? `Saved Fact Sheets (${filteredArticles.length})`
              : 'Actionable Consumer Fact Sheets, Perks & Schemes'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {isBookmarksOnly 
              ? 'Fact sheets and statutory circular breakdowns you have saved for immediate execution.'
              : 'Empirically audited reference sheets backed by official RBI Master Directions, NPCI mandates, Income Tax sections, and verified bank schedules.'}
          </p>
        </div>

        {/* Global Stats Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs bg-white text-slate-700 px-3 py-1.5 rounded-xl font-semibold border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{filteredArticles.length} Verified {filteredArticles.length === 1 ? 'Sheet' : 'Sheets'}</span>
          </span>
        </div>
      </div>

      {/* Search & Difficulty Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, circular codes, statutory authorities, schemes..."
            className="w-full pl-9 pr-8 py-2 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 border border-slate-200/90 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200/90 px-3 py-2 rounded-xl shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-transparent font-medium focus:outline-hidden text-slate-700 cursor-pointer"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors cursor-pointer font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Visible when not in bookmark-only mode) */}
      {!isBookmarksOnly && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            <span>All Categories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedCategory === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {ARTICLES_DATA.length}
            </span>
          </button>
          {CATEGORIES_DATA.map(cat => {
            const count = ARTICLES_DATA.filter(a => a.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span>{cat.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-3 shadow-2xs">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No fact sheets match your search criteria</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query, switching difficulty, or selecting "All Categories" to browse all guides and schemes.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => {
            const isBookmarked = bookmarks.includes(article.id);
            const categoryName = CATEGORY_MAP[article.category] || article.category.replace('-', ' ');

            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden cursor-pointer group p-5 sm:p-6 space-y-4 shadow-2xs"
              >
                <div className="space-y-3.5">
                  {/* Category Pill and Official Authority Chip */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/80">
                        {categoryName}
                      </span>
                      <span 
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80 flex items-center gap-1 truncate max-w-[170px]" 
                        title={`Audited under ${article.sourceRef.authority}`}
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{article.sourceRef.authority}</span>
                      </span>
                    </div>

                    {/* Bookmark Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                        isBookmarked 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                          : 'bg-white border-slate-200/80 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Save fact sheet'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-600' : ''}`} />
                    </button>
                  </div>

                  {/* Title and Punchy Summary */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug tracking-tight">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {article.summary}
                    </p>
                  </div>

                  {/* Horizontal Scannable Metric Strip: [Value] • [Level] • [Read] • [Verified] */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] text-slate-600 pt-0.5 pb-0.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80">
                      Value: {article.annualBenefit}
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80">
                      Level: {article.difficulty}
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80">
                      Read: {article.readTime}
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80 truncate max-w-[190px]" 
                      title={`Statutory Reference: ${article.sourceRef.referenceCode} (${article.sourceRef.authority})`}
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">Verified: {article.sourceRef.referenceCode}</span>
                    </span>
                  </div>

                  {/* Top Actionable Highlight Chip */}
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Top Actionable Highlight</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                      {article.keyTakeaways[0]}
                    </p>
                  </div>
                </div>

                {/* Card Footer: 1-Click Action */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs mt-auto">
                  <span className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]" title={article.membershipOrScheme}>
                    {article.membershipOrScheme}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArticle(article);
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-700 group-hover:text-emerald-800 transition-colors shrink-0"
                  >
                    <span>Read Fact Sheet & Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
