import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  ChevronRight, 
  Info, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  Star, 
  Zap, 
  CheckSquare, 
  MessageSquare, 
  Search, 
  Sparkles, 
  ArrowRight,
  CreditCard as CreditCardIcon
} from 'lucide-react';
import { CREDIT_CARD_SEGMENTS, CREDIT_CARDS_DATA } from '../data/creditCardsData';
import type { CreditCard, ReviewItem } from '../types';
import { ReviewFeedbackModal } from './ReviewFeedbackModal';

interface CreditCardGuideProps {
  onGoToChecklist: (card?: CreditCard) => void;
  onSelectCardForCalculator?: (cardName: string) => void;
  highlightCardId?: string | null;
}

const SEGMENT_TAB_LABELS: Record<string, string> = {
  'entry-level': '1. Entry-Level',
  'cashback-online': '2. Cashback & Online',
  'utilities-hyperlocal': '3. Utilities & Food',
  'travel-forex': '4. Travel & Forex',
  'fuel-commute': '5. Fuel & Commute',
  'rupay-upi': '6. RuPay UPI',
  'ultra-premium': '7. Ultra-Premium',
  'high-yield-debit': '8. Debit Card Deals'
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
    return 'Fee: ₹0 (Lifetime Free)';
  }
  if (typeof card.feeWaiverSpend === 'number') {
    const waiverLakhs = (card.feeWaiverSpend / 100000).toFixed(1).replace('.0', '');
    return `Fee: ₹${card.annualFee.toLocaleString('en-IN')} (Waived on ₹${waiverLakhs}L)`;
  }
  return `Fee: ₹${card.annualFee.toLocaleString('en-IN')}${card.feeWaiverSpend !== 'None' ? ` (${card.feeWaiverSpend})` : ''}`;
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
  if (text.includes('5% flat cashback on ALMOST ALL ONLINE')) return '5% Flat Cashback';
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
  return card.acceleratedRewardRate.split('(')[0].trim().slice(0, 24);
}

function getCardCapInfo(card: CreditCard): { chip: string; details: string } {
  switch (card.id) {
    case 'hdfc-millennia-debit':
      return {
        chip: 'Cap: ₹400/mo (₹4.8k/yr)',
        details: '₹400 direct statement cashback per calendar month on 1% wallet reloads and credit card bill payments via PayZapp/NetBanking.'
      };
    case 'idfc-wealth-debit':
      return {
        chip: 'Cap: ₹500/mo (Movies)',
        details: '2 free BOGO tickets up to ₹250 each per calendar month on BookMyShow/Paytm (₹6,000/yr). 16 domestic airport/rail lounges.'
      };
    case 'fi-federal-debit':
      return {
        chip: 'Cap: No Upper Cap',
        details: 'Uncapped 0% forex markup on all overseas transactions and foreign currency spends. 1 domestic airport lounge visit/quarter.'
      };
    case 'jupiter-csb-edge-debit':
      return {
        chip: 'Cap: ₹500/mo (Jewels)',
        details: '1% to 2% assured Jewels cashback on merchant UPI QR code scans and debit POS. Direct digital gold or bank cash conversion.'
      };
    case 'indusind-exclusive-debit':
      return {
        chip: 'Cap: ₹500/mo (Movies)',
        details: 'Buy 1 Get 1 free movie ticket up to ₹500 per month on BookMyShow (covers IMAX/3D). 8 domestic airport lounges per year.'
      };
    case 'sbi-platinum-debit':
      return {
        chip: 'Cap: 8 Lounges / Year',
        details: '2 complimentary domestic airport lounges per quarter (8 per year) for a nominal ₹350 + GST annual fee. Uncapped 5X Rewardz abroad.'
      };
    case 'phonepe-sbi-select-black':
      return {
        chip: 'Cap: ₹1,500/mo (PhonePe)',
        details: '2,000 reward points (~₹1,500 value back) per billing cycle on 10% PhonePe app spends. 1% base on UPI & offline is uncapped.'
      };
    case 'sbi-cashback':
      return {
        chip: 'Cap: ₹5,000/mo',
        details: '₹5,000 cashback per billing cycle on 5% online shopping (~₹1,00,000 eligible spend). 1% offline is uncapped.'
      };
    case 'hdfc-millennia':
      return {
        chip: 'Cap: ₹1,000/mo',
        details: '₹1,000 CashPoints per calendar month on 5% partner apps. Additional ₹1,000/mo cap on other categories.'
      };
    case 'amazon-pay-icici':
      return {
        chip: 'Cap: No Upper Cap',
        details: 'Zero monthly or annual capping on 5% Amazon Prime or 1% base cashback. Unlimited wallet credit.'
      };
    case 'idfc-first-wow':
      return {
        chip: 'Cap: FD-Backed Limit',
        details: 'No reward point caps. Monthly spend ceiling is strictly 100% of the underlying Fixed Deposit.'
      };
    case 'hdfc-swiggy':
      return {
        chip: 'Cap: ₹1,500/mo (Food)',
        details: '₹1,500 per month on 10% Swiggy orders + ₹1,500 per month on 5% other partner merchants.'
      };
    case 'hsbc-live-plus':
      return {
        chip: 'Cap: ₹1,000/mo (Dining)',
        details: '₹1,000 cashback per calendar month across 10% dining, grocery, and food delivery spends.'
      };
    case 'airtel-axis':
      return {
        chip: 'Cap: ₹250+₹250/mo',
        details: '₹250/month on 25% Airtel bills + ₹250/month on 10% utility bills + ₹500/month on food delivery apps.'
      };
    case 'tata-neu-infinity-hdfc':
      return {
        chip: 'Cap: Uncapped Tata Neu',
        details: 'Uncapped 5% NeuCoins on Tata ecosystem apps (+5% additional with NeuPass). No monthly ceiling.'
      };
    case 'axis-atlas':
      return {
        chip: 'Cap: Tier-Based Milestones',
        details: 'No monthly cap on base or accelerated travel EDGE Miles. Milestones unlock at ₹3L, ₹7.5L, and ₹15L spends.'
      };
    case 'scapia-federal':
      return {
        chip: 'Cap: No Upper Cap',
        details: 'Uncapped Scapia coins on all spends. Zero forex fee with no transaction limit.'
      };
    case 'au-ixigo':
      return {
        chip: 'Cap: Uncapped Rewards',
        details: 'No reward point caps. 10% instant discount on train bookings capped at 2 transactions per calendar month.'
      };
    case 'bpcl-sbi-octane':
      return {
        chip: 'Cap: ~₹625/mo (Fuel)',
        details: '2,500 reward points (~₹625 value back) per billing cycle on 7.25% BPCL fuel spends (up to ₹4,000/txn).'
      };
    case 'hpcl-bob-energie':
      return {
        chip: 'Cap: ~₹250/mo (Fuel)',
        details: '1,000 reward points (~₹250 value back) per calendar month on 5% HPCL fuel spends.'
      };
    case 'tata-neu-infinity-rupay':
      return {
        chip: 'Cap: 500 Coins/mo (UPI)',
        details: '500 NeuCoins per calendar month on 1.5% UPI QR code payments. Uncapped on Tata ecosystem apps.'
      };
    case 'kiwi-axis-rupay':
      return {
        chip: 'Cap: ₹1,000/mo (UPI)',
        details: '₹1,000 statement cashback per calendar month on 2% UPI QR payments via Kiwi app.'
      };
    case 'hdfc-infinia-metal':
      return {
        chip: 'Cap: 15k pts/mo (SmartBuy)',
        details: '15,000 reward points per calendar month on 5X SmartBuy accelerated portals. Base 3.33% rewards are uncapped.'
      };
    case 'axis-olympus':
      return {
        chip: 'Cap: Uncapped EDGE Miles',
        details: 'Completely uncapped base (1 EDGE Mile/₹100) and international/Travel Edge accelerated earn rates.'
      };
    default:
      return {
        chip: 'Cap: Standard Terms',
        details: 'Subject to bank fair use policy and monthly statement cycle thresholds.'
      };
  }
}

function getLoungeChip(card: CreditCard): string {
  const dom = card.loungeAccess.domestic.toLowerCase();
  if (dom.includes('no complimentary') || dom.includes('none') || dom.includes('no airport')) {
    return 'Lounge: None';
  }
  if (dom.includes('unlimited')) {
    return 'Lounge: Unlimited';
  }
  if (dom.includes('1 complimentary') || dom.includes('1 per')) {
    return 'Lounge: 1/qtr';
  }
  if (dom.includes('2 complimentary') || dom.includes('2 per')) {
    return 'Lounge: 2/qtr';
  }
  return 'Lounge: Available';
}

function getForexChip(card: CreditCard): string {
  if (card.forexMarkup === 0) {
    return 'Forex: 0.0%';
  }
  return `Forex: ${card.forexMarkup}%`;
}

export const CreditCardGuide: React.FC<CreditCardGuideProps> = ({
  onGoToChecklist,
  highlightCardId
}) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('cashback-online');
  const [cards, setCards] = useState<CreditCard[]>(() => {
    return CREDIT_CARDS_DATA.map((card) => ({
      ...card,
      reviews: loadReviewsForCard(card.id, card.reviews)
    }));
  });
  const [selectedCardForReview, setSelectedCardForReview] = useState<CreditCard | null>(null);

  // Sync if highlightCardId is set from Checklist
  useEffect(() => {
    if (highlightCardId) {
      const found = cards.find(c => c.id === highlightCardId);
      if (found) {
        setSelectedSegmentId(found.segmentId);
        setTimeout(() => {
          const el = document.getElementById(`card-${highlightCardId}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }, [highlightCardId, cards]);

  // Sync reviews if localStorage changed or on initial hydration
  useEffect(() => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        reviews: loadReviewsForCard(card.id, card.reviews)
      }))
    );
  }, []);

  const activeSegment = useMemo(() => {
    return CREDIT_CARD_SEGMENTS.find((s) => s.id === selectedSegmentId) || CREDIT_CARD_SEGMENTS[0];
  }, [selectedSegmentId]);

  const cardsInSegment = useMemo(() => {
    return cards.filter((c) => c.segmentId === selectedSegmentId);
  }, [cards, selectedSegmentId]);

  const handleAddReview = (cardId: string, newReview: ReviewItem) => {
    setCards((prevCards) =>
      prevCards.map((c) => {
        if (c.id === cardId) {
          const updatedReviews = [newReview, ...c.reviews.filter((r) => r.id !== newReview.id)];
          return {
            ...c,
            reviews: updatedReviews
          };
        }
        return c;
      })
    );

    setSelectedCardForReview((prev) => {
      if (prev && prev.id === cardId) {
        return {
          ...prev,
          reviews: [newReview, ...prev.reviews.filter((r) => r.id !== newReview.id)]
        };
      }
      return prev;
    });

    // Mirror to localStorage
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
      console.warn('Could not persist review to localStorage in CreditCardGuide:', e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Seamless Sub-Navigation Switcher: Bridge between Cards & Checklist */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-white text-slate-900 shadow-xs border border-slate-200">
            <CreditCardIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Credit Card Buying Guide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <button
            onClick={() => onGoToChecklist()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all cursor-pointer"
          >
            <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
            <span>Prerequisites Checklist</span>
          </button>
        </div>

        <div className="text-xs text-slate-600 px-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Unsure if your CIBIL or salary qualifies?</span>
          <button
            onClick={() => onGoToChecklist()}
            className="font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
          >
            Check 6-Stage Prerequisites →
          </button>
        </div>
      </div>

      {/* Header & Value Proposition */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>The Holistic Indian Consumer Credit Card Buying Guide</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Credit & Debit Card Buying Guide & Fact Sheets
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Zero affiliate bias or marketing fluff. Sourced by our autonomous agent and audited against bank MITC tariff sheets.
          Every card and deal scoring &gt; 90 features a comprehensive Fact Sheet below.
        </p>

        {/* Quick Filter Pill Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedSegmentId('entry-level')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedSegmentId !== 'high-yield-debit'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Credit Cards (18 Cards • Segments 1-7)
          </button>
          <button
            onClick={() => setSelectedSegmentId('high-yield-debit')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedSegmentId === 'high-yield-debit'
                ? 'bg-purple-50 text-purple-800 border border-purple-300 shadow-2xs font-bold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            💳 High-Yield Debit Card Deals (6 Deals • Segment 8)
          </button>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>All Cards Vetted (Mission Score &gt; 90)</span>
          </span>
        </div>
      </div>

      {/* Segment Selector Tabs */}
      <div className="bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
        <div className="flex flex-wrap sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {CREDIT_CARD_SEGMENTS.map((seg) => {
            const isSelected = seg.id === selectedSegmentId;
            const tabLabel = SEGMENT_TAB_LABELS[seg.id] || seg.segmentTitle;
            return (
              <button
                key={seg.id}
                onClick={() => setSelectedSegmentId(seg.id)}
                className={`flex-1 min-w-[125px] sm:min-w-0 py-2.5 px-2 text-center rounded-xl text-xs transition-all ${
                  isSelected
                    ? seg.id === 'high-yield-debit'
                      ? 'bg-white text-purple-950 font-bold shadow-xs border border-purple-200'
                      : 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                }`}
              >
                <div className="truncate">{tabLabel}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Segment Strategic Context */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Segment Strategic Context
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {activeSegment.segmentTitle}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              <strong className="text-slate-700">Target Persona:</strong> {activeSegment.persona}
            </p>
          </div>
          <div className="sm:text-right bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 shrink-0">
            <span className="text-[11px] text-slate-500 font-medium block">Monthly Spend Range</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">{activeSegment.monthlySpendProfile}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 font-semibold">Strategic Rationale: </strong>
            <span>{activeSegment.summaryReasoning}</span>
          </div>
        </div>
      </div>

      {/* Cards List in This Segment */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Audited Contenders for this Segment
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold border border-slate-200">
              {cardsInSegment.length} Cards Analyzed
            </span>
          </div>
          <button
            onClick={() => onGoToChecklist()}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group cursor-pointer"
          >
            <span>Application Readiness Checklist</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="space-y-6">
          {cardsInSegment.map((card, idx) => {
            const isFirst = idx === 0;
            const punchyVerdict = card.whyThisCardWins.split('. ')[0].trim() + '.';
            const feeChip = getFeeChip(card);
            const rewardChip = getRewardChip(card);
            const capInfo = getCardCapInfo(card);
            const loungeChip = getLoungeChip(card);
            const forexChip = getForexChip(card);

            const cardReviews = card.reviews || [];
            const hasReviews = cardReviews.length > 0;
            const avgRating = hasReviews
              ? (cardReviews.reduce((sum, r) => sum + r.rating, 0) / cardReviews.length).toFixed(1)
              : null;

            return (
              <div
                key={card.id}
                id={`card-${card.id}`}
                className={`bg-white rounded-2xl border p-6 sm:p-7 space-y-5 transition-all hover:shadow-md ${
                  isFirst 
                    ? 'border-emerald-300 ring-1 ring-emerald-300/30' 
                    : 'border-slate-200/80'
                }`}
              >
                {/* 1. Card Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                        card.cardType === 'debit'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {card.cardType === 'debit' ? 'High-Yield Debit Card Deal' : 'Credit Card'}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {card.bank}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {card.network}
                      </span>
                      {card.missionScore && card.missionScore >= 90 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>🎯 Mission Score: {card.missionScore}/100 • Agent Ingested</span>
                        </span>
                      )}
                      {isFirst && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-xs">
                          #1 Segment Pick
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {card.name}
                  </h4>

                  {/* 1-sentence punchy verdict (zero generic AI prose) */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {punchyVerdict}
                  </p>
                </div>

                {/* 2. Scannable Metric Strip */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80">
                    {feeChip}
                  </span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80">
                    {rewardChip}
                  </span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80">
                    {capInfo.chip}
                  </span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80">
                    {loungeChip}
                  </span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md font-medium border ${
                    card.forexMarkup === 0
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80'
                  }`}>
                    {forexChip}
                  </span>
                </div>

                {/* 3. Core Data Table (Fact Sheet) */}
                <div className="border border-slate-200/80 rounded-xl overflow-hidden text-xs bg-white">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="w-1/3 sm:w-1/4 bg-slate-50/70 p-3 font-semibold text-slate-600 align-top border-r border-slate-100">
                          Joining / Annual Fee & Waiver Criteria
                        </td>
                        <td className="p-3 text-slate-800 space-y-1">
                          <div className="font-bold text-slate-900">
                            {card.annualFee === 0 ? '₹0 (Lifetime Free)' : `₹${card.annualFee.toLocaleString('en-IN')} + 18% GST`}
                            <span className="font-normal text-slate-500 ml-2">
                              ({typeof card.feeWaiverSpend === 'number'
                                ? `Fee waived on ₹${(card.feeWaiverSpend / 100000).toFixed(1).replace('.0', '')}L annual spend`
                                : card.feeWaiverSpend})
                            </span>
                          </div>
                          {card.joiningBenefit && (
                            <div className="text-[11px] text-slate-500">
                              <strong className="text-slate-600">Joining Benefit: </strong>
                              {card.joiningBenefit}
                            </div>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className="w-1/3 sm:w-1/4 bg-slate-50/70 p-3 font-semibold text-slate-600 align-top border-r border-slate-100">
                          Accelerated Rewards & Base Rewards
                        </td>
                        <td className="p-3 text-slate-800 space-y-1">
                          <div>
                            <strong className="text-emerald-700 font-semibold">Accelerated: </strong>
                            <span>{card.acceleratedRewardRate}</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            <strong className="text-slate-600">Base Return: </strong>
                            <span>{card.baseRewardRate}</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-1/3 sm:w-1/4 bg-slate-50/70 p-3 font-semibold text-slate-600 align-top border-r border-slate-100">
                          Monthly / Quarterly Caps
                        </td>
                        <td className="p-3 text-slate-800">
                          <span className="font-medium text-slate-800">{capInfo.details}</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-1/3 sm:w-1/4 bg-slate-50/70 p-3 font-semibold text-slate-600 align-top border-r border-slate-100">
                          Airport Lounge Access & Qualification Rules
                        </td>
                        <td className="p-3 text-slate-800 space-y-0.5">
                          <div className="font-medium text-slate-800">
                            Domestic: {card.loungeAccess.domestic}
                            {card.loungeAccess.international && card.loungeAccess.international !== 'None' && (
                              <span className="text-slate-600 ml-1.5">• Int'l: {card.loungeAccess.international}</span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            <strong className="text-slate-600">Spend Condition: </strong>
                            {card.loungeAccess.condition}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-1/3 sm:w-1/4 bg-slate-50/70 p-3 font-semibold text-slate-600 align-top border-r border-slate-100">
                          Forex Currency Conversion Markup
                        </td>
                        <td className="p-3 text-slate-800">
                          <span className={`font-semibold ${card.forexMarkup === 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
                            {card.forexMarkup === 0 
                              ? '0.0% (Zero Forex Markup — No currency conversion penalty)' 
                              : `${card.forexMarkup}% + 18% GST (Effective total surcharge ~${(card.forexMarkup * 1.18).toFixed(2)}%)`}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 4. Hidden Catches & Excluded Spends Box */}
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Hidden Catches & Excluded Spends</span>
                  </div>
                  <ul className="space-y-1 text-xs text-amber-950/90">
                    {card.hiddenCatches.map((catchItem, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                        <span className="leading-relaxed">{catchItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. Authentic Customer Reviews / "New" Badge Widget */}
                <div 
                  onClick={() => setSelectedCardForReview(card)}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  {hasReviews ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>★ {avgRating} / 5.0</span>
                          </span>
                          <span className="text-xs font-medium text-slate-600">
                            ({cardReviews.length} verified {cardReviews.length === 1 ? 'cardholder' : 'cardholders'})
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 italic line-clamp-1">
                          "{cardReviews[0].comment}"
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCardForReview(card);
                        }}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span>Read Reviews & Submit Feedback</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          New
                        </span>
                        <span className="text-xs text-slate-600 font-medium">
                          No verified cardholder reviews yet • Share your experience
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCardForReview(card);
                        }}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span>Write First Review</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 6. 1-Click Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={card.sourceRef.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Apply on Official Bank Portal</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 text-emerald-200" />
                    </a>

                    <button
                      onClick={() => onGoToChecklist(card)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>Check Prerequisites</span>
                    </button>

                    <button
                      onClick={() => setSelectedCardForReview(card)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>Reviews & Feedback</span>
                    </button>
                  </div>

                  <a
                    href={card.sourceRef.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-700 transition-colors"
                    title={`View statutory disclosure: ${card.sourceRef.name}`}
                  >
                    <Search className="w-3 h-3 text-slate-400" />
                    <span>
                      Source: <strong className="font-semibold text-slate-700 underline underline-offset-2">{card.sourceRef.referenceCode}</strong> • Verified {card.sourceRef.lastUpdated}
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Avoid Rejections & Checklist Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Avoid Unnecessary Rejections & Hard Inquiries</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Ready to Apply? Run the Application Checklist First.
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Submitting applications without preparing salary slips, checking CIBIL inquiries, or understanding 
            the 90-day bank cooling-off rule leads to automatic rejections. Use our interactive checklist to guarantee 
            smooth approvals.
          </p>
        </div>

        <button
          onClick={() => onGoToChecklist()}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Launch Interactive Checklist</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Review Feedback Modal */}
      {selectedCardForReview && (
        <ReviewFeedbackModal
          card={selectedCardForReview}
          onClose={() => setSelectedCardForReview(null)}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
};
