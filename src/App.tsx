import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResourceLibrary } from './components/ResourceLibrary';
import { CreditCardGuide } from './components/CreditCardGuide';
import { ChecklistForm } from './components/ChecklistForm';
import { SavingsCalculator } from './components/SavingsCalculator';
import { LifeOperationsHub } from './components/LifeOperationsHub';
import { DataProvenance } from './components/DataProvenance';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { Footer } from './components/Footer';
import type { Article, LifeCategory } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks'>('library');
  const [selectedCategory, setSelectedCategory] = useState<LifeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [targetCardForChecklist, setTargetCardForChecklist] = useState<string | null>(null);
  const [targetCardForGuide, setTargetCardForGuide] = useState<string | null>(null);

  // Bookmarks in localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('perkwise_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('perkwise_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const toggleBookmark = (articleId: string) => {
    if (bookmarks.includes(articleId)) {
      setBookmarks(bookmarks.filter(id => id !== articleId));
    } else {
      setBookmarks([...bookmarks, articleId]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Sticky Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarks.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'library' && (
          <>
            <Hero
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onExploreCardsClick={() => setActiveTab('card-guide')}
              onStartChecklistClick={() => setActiveTab('checklist')}
              onInspectProvenance={() => setActiveTab('provenance')}
            />
            <ResourceLibrary
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
              onSelectArticle={(article) => setActiveArticle(article)}
            />
          </>
        )}

        {activeTab === 'card-guide' && (
          <CreditCardGuide
            onGoToChecklist={(card) => {
              if (card) {
                setTargetCardForChecklist(card.id);
              }
              setActiveTab('checklist');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            highlightCardId={targetCardForGuide}
          />
        )}

        {activeTab === 'checklist' && (
          <ChecklistForm
            targetCardId={targetCardForChecklist}
            onClearTargetCard={() => setTargetCardForChecklist(null)}
            onSelectTargetCard={(id) => setTargetCardForChecklist(id)}
            onGoToGuide={(cardId) => {
              if (cardId) {
                setTargetCardForGuide(cardId);
              }
              setActiveTab('card-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'calculator' && (
          <SavingsCalculator
            onGoToCards={() => setActiveTab('card-guide')}
          />
        )}

        {activeTab === 'life-operations' && (
          <LifeOperationsHub
            onSelectArticleByCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('library');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'provenance' && (
          <DataProvenance
            onBackToGuide={(cardId) => {
              if (cardId) {
                setTargetCardForGuide(cardId);
              }
              setActiveTab('card-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'bookmarks' && (
          <ResourceLibrary
            selectedCategory="all"
            setSelectedCategory={() => {}}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelectArticle={(article) => setActiveArticle(article)}
            isBookmarksOnly={true}
          />
        )}
      </main>

      {/* Detail Modal */}
      {activeArticle && (
        <ArticleDetailModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          isBookmarked={bookmarks.includes(activeArticle.id)}
          onToggleBookmark={toggleBookmark}
          onGoToChecklist={() => {
            setActiveArticle(null);
            setActiveTab('checklist');
          }}
        />
      )}

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App;
