import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResourceLibrary } from './components/ResourceLibrary';
import { CreditCardGuide } from './components/CreditCardGuide';
import { ChecklistForm } from './components/ChecklistForm';
import { SavingsCalculator } from './components/SavingsCalculator';
import { LifeOperationsHub } from './components/LifeOperationsHub';
import { DataProvenance } from './components/DataProvenance';
import { AdminPortal } from './components/AdminPortal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { CardDetailModal } from './components/CardDetailModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';
import type { Article, CreditCard, LifeCategory, SiteConfig } from './types';
import { getSiteConfig, getEffectiveCards } from './utils/cardStorage';

export function App() {
  const [activeTab, setActiveTab] = useState<'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks' | 'admin'>('library');
  const [selectedCategory, setSelectedCategory] = useState<LifeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [selectedCardForDetail, setSelectedCardForDetail] = useState<CreditCard | null>(null);
  const [targetCardForChecklist, setTargetCardForChecklist] = useState<string | null>(null);
  const [targetCardForGuide, setTargetCardForGuide] = useState<string | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig);
  const [cards, setCards] = useState<CreditCard[]>(getEffectiveCards);

  // Hash listener for direct #admin navigation & Ctrl+Shift+A shortcut
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setActiveTab('admin');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setActiveTab('admin');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+A or Cmd+Shift+A to toggle admin portal
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setActiveTab(prev => prev === 'admin' ? 'card-guide' : 'admin');
      }
    };

    const handleConfigUpdated = (e: any) => {
      if (e.detail) {
        setSiteConfig(e.detail);
      } else {
        setSiteConfig(getSiteConfig());
      }
    };

    const handleCardsUpdated = () => {
      setCards(getEffectiveCards());
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('perkwise_config_updated', handleConfigUpdated);
    window.addEventListener('perkwise_cards_updated', handleCardsUpdated);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('perkwise_config_updated', handleConfigUpdated);
      window.removeEventListener('perkwise_cards_updated', handleCardsUpdated);
    };
  }, []);

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
        onOpenSearch={() => setIsSearchModalOpen(true)}
        siteConfig={siteConfig}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'admin' && (
          <AdminPortal
            onExitAdmin={() => {
              setActiveTab('card-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToCard={(cardId) => {
              setTargetCardForGuide(cardId);
              setActiveTab('card-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateConfig={(newCfg) => setSiteConfig(newCfg)}
          />
        )}

        {activeTab === 'library' && (
          <>
            <Hero
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onExploreCardsClick={() => setActiveTab('card-guide')}
              onStartChecklistClick={() => setActiveTab('checklist')}
              siteConfig={siteConfig}
              cardsCount={cards.length}
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
            cards={cards}
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
            cards={cards}
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
          <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between bg-purple-950/30 border border-purple-800/40 p-3.5 rounded-xl text-xs text-purple-200">
              <span>Official Rules have moved to the <strong>Admin Portal</strong> for background compliance control.</span>
              <button
                onClick={() => setActiveTab('admin')}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Open Admin Portal →
              </button>
            </div>
            <DataProvenance
              onBackToGuide={(cardId) => {
                if (cardId) {
                  setTargetCardForGuide(cardId);
                }
                setActiveTab('card-guide');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
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

      {/* Global Universal Search & Command Palette */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        cards={cards}
        onSelectCard={(card) => {
          setSelectedCardForDetail(card);
          setTargetCardForGuide(card.id);
          setActiveTab('card-guide');
        }}
        onSelectArticle={(article) => {
          setActiveArticle(article);
        }}
        onSelectSource={(source) => {
          window.open(source.officialUrl, '_blank');
        }}
      />

      {/* Global Card Detail Showcase Modal */}
      {selectedCardForDetail && (
        <CardDetailModal
          card={selectedCardForDetail}
          onClose={() => setSelectedCardForDetail(null)}
          onGoToChecklist={(card) => {
            setSelectedCardForDetail(null);
            setTargetCardForChecklist(card.id);
            setActiveTab('checklist');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Article Detail Modal */}
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
