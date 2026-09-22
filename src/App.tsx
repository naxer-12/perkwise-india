import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResourceLibrary } from './components/ResourceLibrary';
import { CreditCardGuide } from './components/CreditCardGuide';
import { ChecklistForm } from './components/ChecklistForm';
import { SavingsCalculator } from './components/SavingsCalculator';
import { LifeOperationsHub } from './components/LifeOperationsHub';
import { LoungeRecogniser } from './components/LoungeRecogniser';
import { DataProvenance } from './components/DataProvenance';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { CardDetailModal } from './components/CardDetailModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';
import { LanguageProvider } from './i18n/LanguageContext';
import type { Article, CreditCard, LifeCategory, SiteConfig, NavigationTab } from './types';
import { getSiteConfig, getEffectiveCards, syncWithBackend } from './utils/cardStorage';
import { initLiveSyncListener } from './utils/api';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('library');
  const [selectedCategory, setSelectedCategory] = useState<LifeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [selectedCardForDetail, setSelectedCardForDetail] = useState<CreditCard | null>(null);
  const [targetCardForChecklist, setTargetCardForChecklist] = useState<string | null>(null);
  const [targetCardForGuide, setTargetCardForGuide] = useState<string | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig);
  const [cards, setCards] = useState<CreditCard[]>(getEffectiveCards);

  // Initialize live backend synchronization & local event listeners
  useEffect(() => {
    // Initial fetch from backend API if online
    syncWithBackend().catch(() => {});

    // Listen for live broadcast updates from backend admin panel
    const cleanupLiveSync = initLiveSyncListener(() => {
      setSiteConfig(getSiteConfig());
      setCards(getEffectiveCards());
    });

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

    window.addEventListener('perkwise_config_updated', handleConfigUpdated);
    window.addEventListener('perkwise_cards_updated', handleCardsUpdated);

    return () => {
      cleanupLiveSync();
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
        {activeTab === 'library' && (
          <>
            <Hero
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onExploreCardsClick={() => { setActiveTab('card-guide'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onStartChecklistClick={() => { setActiveTab('checklist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onExploreLoungesClick={() => { setActiveTab('lounges'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onExploreHacksClick={() => { setActiveTab('life-operations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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

        {activeTab === 'lounges' && (
          <LoungeRecogniser
            onNavigateToCardGuide={(cardId) => {
              if (cardId) {
                setTargetCardForGuide(cardId);
              }
              setActiveTab('card-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'provenance' && (
          <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
