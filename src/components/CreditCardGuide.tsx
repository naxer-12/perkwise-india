import React, { useState, useEffect, useMemo } from 'react';
import { 
  Camera, 
  ChevronRight, 
  ExternalLink, 
  ShieldCheck, 
  Star, 
  Zap, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { CREDIT_CARD_SEGMENTS, CREDIT_CARDS_DATA } from '../data/creditCardsData';
import type { CreditCard, ReviewItem } from '../types';
import { CardVisual } from './CardVisual';
import { CardDetailModal } from './CardDetailModal';

interface CreditCardGuideProps {
  onGoToChecklist: (card?: CreditCard) => void;
  onSelectCardForCalculator?: (cardName: string) => void;
  highlightCardId?: string | null;
}

const SEGMENT_TAB_LABELS: Record<string, string> = {
  'entry-level': 'Entry-Level',
  'cashback-online': 'Cashback & Online',
  'utilities-hyperlocal': 'Utilities & Food',
  'travel-forex': 'Travel & Forex',
  'fuel-commute': 'Fuel & Commute',
  'rupay-upi': 'RuPay UPI',
  'ultra-premium': 'Ultra-Premium',
  'high-yield-debit': 'Debit Card Deals'
};

function loadReviewsForCard(cardId: string, baseReviews: ReviewItem[]): ReviewItem[] {
  if (typeof window === 'undefined') return baseReviews || [];
  try {
    const cardKey = `perkwise_custom_reviews_${cardId}`;
    const storedCard = localStorage.getItem(cardKey);
    const customList: ReviewItem[] = storedCard ? JSON.parse(storedCard) : [];

    const allStored = localStorage.getItem('perkwise_user_reviews');
    const allMap = allStored ? JSON.parse(allStored) : {};
    const moreList: ReviewItem[] = Array.isArray(allMap[cardId]) ? allMap[cardId] : [];

    const seen = new Set<string>();
    const combined: ReviewItem[] = [];
    for (const item of [...customList, ...moreList, ...(baseReviews || [])]) {
      if (item && item.id && !seen.has(item.id)) {
        seen.add(item.id);
        combined.push(item);
      }
    }
    return combined;
  } catch {
    return baseReviews || [];
  }
}

function getFeeChip(card: CreditCard): string {
  if (card.annualFee === 0 || card.feeWaiverSpend === 'Lifetime Free') {
    return '₹0 (LTF)';
  }
  if (typeof card.feeWaiverSpend === 'number') {
    const waiverLakhs = (card.feeWaiverSpend / 100000).toFixed(1).replace('.0', '');
    return `₹${card.annualFee.toLocaleString('en-IN')} (Waived on ₹${waiverLakhs}L)`;
  }
  return `₹${card.annualFee.toLocaleString('en-IN')}`;
}

function getRewardChip(card: CreditCard): string {
  const text = card.acceleratedRewardRate;
  if (text.includes('33.3%')) return '33.3% Travel (SmartBuy)';
  if (text.includes('25%')) return '25% Airtel / 10% Utility';
  if (text.includes('10% NeuCoins')) return '10% NeuCoins on Tata Apps';
  if (text.includes('10% cashback on dining') || text.includes('10% cashback on Swiggy')) return '10% Food & Grocery';
  if (text.includes('7.25%')) return '7.25% Fuel Savings';
  if (text.includes('5% savings on HPCL')) return '5.0% Fuel Savings';
  if (text.includes('10% reward points on PhonePe')) return '10% on PhonePe & Bills';
  if (text.includes('Flat 2% cashback on scan & pay')) return '2% Flat on UPI QR';
  if (text.includes('1.5% NeuCoins on UPI')) return '1.5% UPI / 10% Tata';
  if (text.includes('5% flat cashback on ALMOST ALL ONLINE')) return '5% Flat Online Cashback';
  if (text.includes('5% unlimited cashback')) return '5% Uncapped Cashback';
  if (text.includes('5% cashback')) return '5% Accelerated Cashback';
  if (text.includes('Zero Forex Markup') && card.forexMarkup === 0) return '0% Forex + Travel Rewards';
  if (text.includes('5 EDGE Miles')) return 'Up to 10% Air Miles';
  if (text.includes('1% CashBack on Wallet Reloads')) return '1% Bill Pay & Wallets';
  if (text.includes('Buy 1 Get 1 Free on Movie Tickets up to ₹250')) return 'BOGO Movies + 16 Lounges';
  if (text.includes('0% Foreign Currency Markup on international POS')) return '0% Forex + 2% Fi Coins';
  if (text.includes('Flat 1% to 2% assured Jewels')) return '1-2% Jewels UPI Cashback';
  if (text.includes('Buy 1 Get 1 Free on BookMyShow up to ₹500')) return 'BOGO ₹500 IMAX & Lounges';
  if (text.includes('5X SBI Rewardz points on international usage')) return '8 Lounges + 5X Rewardz';
  return card.acceleratedRewardRate.split('(')[0].trim().slice(0, 26);
}

function getCardCapInfo(card: CreditCard): string {
  switch (card.id) {
    case 'hdfc-millennia-debit':
      return 'Cap: ₹400/mo (₹4.8k/yr)';
    case 'idfc-wealth-debit':
      return 'Cap: ₹500/mo (Movies)';
    case 'fi-federal-debit':
      return 'Cap: Uncapped Forex';
    case 'jupiter-csb-edge-debit':
      return 'Cap: ₹500/mo (Jewels)';
    case 'indusind-exclusive-debit':
      return 'Cap: ₹500/mo (Movies)';
    case 'sbi-platinum-debit':
      return 'Cap: 8 Lounges / Year';
    case 'phonepe-sbi-select-black':
      return 'Cap: ₹1,500/mo (PhonePe)';
    case 'sbi-cashback':
      return 'Cap: ₹5,000/mo';
    case 'hdfc-millennia':
      return 'Cap: ₹1,000/mo';
    case 'amazon-pay-icici':
      return 'Cap: Unlimited';
    case 'airtel-axis':
      return 'Cap: ₹250+₹250/mo';
    case 'hdfc-infinia-metal':
      return 'Cap: 15k pts/mo';
    default:
      return 'Cap: Standard Terms';
  }
}

export const CreditCardGuide: React.FC<CreditCardGuideProps> = ({ 
  onGoToChecklist, 
  highlightCardId 
}) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [selectedCardForModal, setSelectedCardForModal] = useState<CreditCard | null>(null);
  const [cards, setCards] = useState<CreditCard[]>(CREDIT_CARDS_DATA);

  // Sync reviews from localStorage on initial hydration
  useEffect(() => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        reviews: loadReviewsForCard(card.id, card.reviews)
      }))
    );
  }, []);

  // Handle highlightCardId if triggered from search or external link
  useEffect(() => {
    if (highlightCardId) {
      const found = cards.find(c => c.id === highlightCardId);
      if (found) {
        setSelectedCardForModal(found);
      }
    }
  }, [highlightCardId, cards]);

  const handleAddReview = (cardId: string, newReview: ReviewItem) => {
    setCards((prevCards) =>
      prevCards.map((c) => {
        if (c.id === cardId) {
          const updatedReviews = [newReview, ...c.reviews.filter((r) => r.id !== newReview.id)];
          return { ...c, reviews: updatedReviews };
        }
        return c;
      })
    );

    setSelectedCardForModal((prev) => {
      if (prev && prev.id === cardId) {
        return {
          ...prev,
          reviews: [newReview, ...prev.reviews.filter((r) => r.id !== newReview.id)]
        };
      }
      return prev;
    });

    try {
      const cardKey = `perkwise_custom_reviews_${cardId}`;
      const existing = loadReviewsForCard(cardId, []);
      const updated = [newReview, ...existing.filter((r) => r.id !== newReview.id)];
      localStorage.setItem(cardKey, JSON.stringify(updated));

      const allStored = localStorage.getItem('perkwise_user_reviews');
      const allMap = allStored ? JSON.parse(allStored) : {};
      allMap[cardId] = [newReview, ...(allMap[cardId] || [])];
      localStorage.setItem('perkwise_user_reviews', JSON.stringify(allMap));
    } catch (e) {
      console.warn('Could not persist review:', e);
    }
  };

  // Filter cards by segment and type
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesType = 
        filterType === 'all' 
          ? true 
          : filterType === 'credit' 
            ? card.cardType !== 'debit' 
            : card.cardType === 'debit';
      
      const matchesSegment = 
        selectedSegmentId === 'all' 
          ? true 
          : card.segmentId === selectedSegmentId;

      return matchesType && matchesSegment;
    });
  }, [cards, selectedSegmentId, filterType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Header */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Credit & Debit Card Buying Guide
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Real card demonstrations, verified annual reward math, and step-by-step application pre-requisites.
        </p>

        {/* Clean Filter Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => { setFilterType('all'); setSelectedSegmentId('all'); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filterType === 'all' && selectedSegmentId === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Cards ({cards.length})
            </button>
            <button
              onClick={() => { setFilterType('credit'); if (selectedSegmentId === 'high-yield-debit') setSelectedSegmentId('all'); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filterType === 'credit'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Credit Cards (18)
            </button>
            <button
              onClick={() => { setFilterType('debit'); setSelectedSegmentId('all'); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filterType === 'debit'
                  ? 'bg-purple-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High-Yield Debit Deals (6)
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium px-2 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>Click any card to inspect real card demonstration, fee math, and application steps</span>
          </div>
        </div>
      </div>

      {/* Mintlify-Inspired Segment Scroller Tabs */}
      <div className="border-b border-slate-200 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedSegmentId('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            selectedSegmentId === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          All Segments
        </button>

        {CREDIT_CARD_SEGMENTS.map((seg) => {
          const isSelected = selectedSegmentId === seg.id;
          const label = SEGMENT_TAB_LABELS[seg.id] || seg.segmentTitle;
          return (
            <button
              key={seg.id}
              onClick={() => {
                setSelectedSegmentId(seg.id);
                if (seg.id === 'high-yield-debit') {
                  setFilterType('debit');
                } else if (filterType === 'debit') {
                  setFilterType('all');
                }
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? seg.id === 'high-yield-debit'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span>{label}</span>
              {seg.id === 'high-yield-debit' && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-200 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mintlify Blog-Style Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => {
          const isDebit = card.cardType === 'debit';
          const feeChip = getFeeChip(card);
          const rewardChip = getRewardChip(card);
          const capChip = getCardCapInfo(card);
          const cardReviews = card.reviews || [];
          const hasReviews = cardReviews.length > 0;
          const avgRating = hasReviews
            ? (cardReviews.reduce((sum, r) => sum + r.rating, 0) / cardReviews.length).toFixed(1)
            : null;

          return (
            <div
              key={card.id}
              id={`card-${card.id}`}
              onClick={() => setSelectedCardForModal(card)}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-slate-400/80 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Card Visual Header (Mintlify Hero Thumbnail Style) */}
              <div className="p-4 pb-2 bg-gradient-to-b from-slate-100/80 to-white/40 border-b border-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="w-full max-w-[280px] h-[168px] transform group-hover:scale-[1.03] transition-transform duration-300">
                  <CardVisual card={card} variant="thumbnail" interactive={false} />
                </div>

                {/* Inspect Overlay Cue */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/85 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-md">
                  <Camera className="w-3 h-3 text-emerald-400" />
                  <span>Real Card Demo</span>
                </div>
              </div>

              {/* Card Body & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category & Brand Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isDebit 
                          ? 'bg-purple-50 text-purple-800 border-purple-200' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {isDebit ? 'Debit Deal' : card.bank}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200">
                        {card.network}
                      </span>
                    </div>

                    {card.missionScore && card.missionScore >= 90 && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>Score {card.missionScore}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors tracking-tight line-clamp-1">
                    {card.name}
                  </h3>

                  {/* Verdict / Why This Card Wins */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {card.whyThisCardWins}
                  </p>
                </div>

                {/* Metrics Strip */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                      {rewardChip}
                    </span>
                    <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                      Fee: {feeChip}
                    </span>
                    <span className="text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md font-medium">
                      {capChip}
                    </span>
                  </div>

                  {/* User Reviews or 'New' Badge */}
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                    {hasReviews ? (
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{avgRating} ({cardReviews.length} verified cardholders)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded-sm text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          New
                        </span>
                        <span className="text-slate-500 text-[11px]">No verified reviews yet</span>
                      </div>
                    )}

                    <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div 
                className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCardForModal(card)}
                    className="font-bold text-slate-700 hover:text-emerald-700 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Fact Sheet</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => onGoToChecklist(card)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title={`Check prerequisites and application steps for ${card.name}`}
                  >
                    <span>Pre-Requisites</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <a
                  href={card.sourceRef.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 transition-colors"
                  title={`Direct application on ${card.bank}`}
                >
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>Apply</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Avoid Rejections Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Avoid Unnecessary Rejections & Hard Inquiries</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Ready to Apply? Inspect Card-Specific Pre-Requisite Steps First.
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Applying without preparing salary slips, checking 6-month hard inquiries, or adhering to bank 90-day cooling-off windows leads to automatic algorithmic rejections. Review prerequisites on your chosen card before submitting personal data.
          </p>
        </div>

        <button
          onClick={() => onGoToChecklist(filteredCards[0] || cards[0])}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Launch Pre-Requisites Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Global Card Detail & Showcase Modal */}
      {selectedCardForModal && (
        <CardDetailModal
          card={selectedCardForModal}
          onClose={() => setSelectedCardForModal(null)}
          onGoToChecklist={onGoToChecklist}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
};
