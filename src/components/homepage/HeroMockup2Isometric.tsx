import React, { useState } from 'react';
import { 
  ArrowRight, 
  CreditCard, 
  Sparkles, 
  Plane
} from 'lucide-react';

interface HeroMockup2Props {
  onExploreCards: () => void;
  onExploreLounges?: () => void;
  cardsCount?: number;
}

interface DeckCard {
  id: string;
  name: string;
  bank: string;
  tagline: string;
  cardTheme: string;
  textColor: string;
  keyDiscount: string;
  loungePerk: string;
  idealFor: string;
}

const DECK_CARDS: DeckCard[] = [
  {
    id: 'swiggy',
    name: 'Swiggy HDFC Bank',
    bank: 'HDFC Bank',
    tagline: 'Best for Everyday Dining & Groceries',
    cardTheme: 'from-orange-500 via-amber-500 to-amber-600',
    textColor: 'text-white',
    keyDiscount: '10% Instant Statement Cashback',
    loungePerk: 'Domestic Lounges Available',
    idealFor: 'Save ₹1,500+ every month on food orders, groceries & Dineout bills.'
  },
  {
    id: 'scapia',
    name: 'Scapia Federal Bank',
    bank: 'Federal Bank',
    tagline: 'Best for Travelers & Zero Forex',
    cardTheme: 'from-teal-700 via-emerald-800 to-slate-900',
    textColor: 'text-white',
    keyDiscount: '0% Forex Markup + Lifetime Free',
    loungePerk: 'Unlimited Airport Lounges (₹5k spend)',
    idealFor: 'Save 3.5% on international trips with unlimited domestic lounge access.'
  },
  {
    id: 'infinia',
    name: 'HDFC Infinia Metal',
    bank: 'HDFC Bank',
    tagline: 'The Gold Standard for Premium Flights & Hotels',
    cardTheme: 'from-slate-900 via-zinc-800 to-slate-950',
    textColor: 'text-white',
    keyDiscount: 'Up to 33.3% Value Back on SmartBuy',
    loungePerk: 'Unlimited Worldwide Lounges + Guests',
    idealFor: 'Premium lifestyle card with 1:1 points for luxury flights and hotel suites.'
  },
  {
    id: 'tata-neu',
    name: 'Tata Neu Infinity',
    bank: 'HDFC Bank',
    tagline: 'Best for Everyday UPI QR Payments',
    cardTheme: 'from-indigo-800 via-purple-900 to-slate-900',
    textColor: 'text-white',
    keyDiscount: '1.5% NeuCoins on UPI Scan & Pay',
    loungePerk: '8 Airport Lounges / year',
    idealFor: 'Earn real returns on routine tea, grocery, and merchant UPI QR codes.'
  }
];

export const HeroMockup2Isometric: React.FC<HeroMockup2Props> = ({
  onExploreCards,
  onExploreLounges,
  cardsCount = 26
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCard = DECK_CARDS[activeCardIndex];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-[#F4F7F5] text-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      
      {/* Calm, warm ambient light accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Calming, Confident & Exciting Messaging */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Calming Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Honest, Independent Card Intelligence</span>
            <span className="text-emerald-300">•</span>
            <span className="text-emerald-700 font-normal">India Edition</span>
          </div>

          {/* Clean, Grounded Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            All your cards.{' '}
            <span className="text-emerald-700">Real discounts.</span>{' '}
            Zero fine-print surprises.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg">
            Stop guessing at checkout. We mathematically audited India’s credit cards, spend conditions, and airport lounge rules so you always know which card to use.
          </p>

          {/* Exciting Deal Callout Card (Updates with hovered card) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-800">
                  {activeCard.name}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {activeCard.keyDiscount}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeCard.idealFor}
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Plane className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeCard.loungePerk}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{activeCard.bank}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onExploreCards}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 transition-all cursor-pointer hover:shadow"
            >
              <CreditCard className="w-4 h-4" />
              <span>Explore Verified Card Guide ({cardsCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onExploreLounges && (
              <button
                onClick={onExploreLounges}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plane className="w-4 h-4 text-emerald-600" />
                <span>Lounge Recogniser</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Tactile & Calming 3D Card Deck */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center py-4">
          
          {/* Helpful interactive hint */}
          <div className="text-[11px] font-medium text-slate-400 mb-3 flex items-center gap-1.5">
            <span>Hover or tap cards to reveal deals:</span>
          </div>

          <div className="relative w-[320px] sm:w-[380px] h-[300px] flex items-center justify-center [perspective:1000px]">
            
            {DECK_CARDS.map((card, index) => {
              const isActive = activeCardIndex === index;
              // Smooth, serene offsets (not frantic or extreme)
              const rotZ = (index - 1.5) * 6;
              const translateY = (index - 1.5) * 14;
              const translateX = (index - 1.5) * 18;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setActiveCardIndex(index)}
                  onClick={() => setActiveCardIndex(index)}
                  style={{
                    transform: isActive 
                      ? `translateY(-28px) scale(1.05) rotateZ(0deg) translateZ(40px)` 
                      : `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotZ}deg)`,
                    zIndex: isActive ? 30 : 10 + index
                  }}
                  className={`absolute w-[280px] sm:w-[320px] aspect-[1.58/1] rounded-2xl bg-gradient-to-br ${card.cardTheme} p-5 cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between select-none ${
                    isActive 
                      ? 'ring-4 ring-emerald-500/30 shadow-2xl scale-105' 
                      : 'opacity-90 hover:opacity-100 shadow-md'
                  }`}
                >
                  {/* Card Header: Chip & Bank */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Realistic Gold EMV Chip */}
                      <div className="w-7 h-5 rounded-md bg-amber-300 border border-amber-400/80 shadow-2xs flex items-center justify-center">
                        <div className="w-4 h-3 border border-amber-500/50 rounded-xs" />
                      </div>
                      <span className="text-xs font-bold text-white/90 tracking-wide">
                        {card.bank}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-white/80 bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      Contactless
                    </span>
                  </div>

                  {/* Card Title & Top Discount */}
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
                      {card.name}
                    </h4>
                    <span className="text-xs font-semibold text-amber-200 mt-1 block">
                      {card.keyDiscount}
                    </span>
                  </div>

                  {/* Card Footer: Masked Numbers & Lounge Access */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/70 pt-2 border-t border-white/15">
                    <span>•••• 4821</span>
                    <span className="text-white/90 font-medium font-sans text-[10px]">
                      {card.loungePerk}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Deal Badges underneath deck */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-sm">
            {DECK_CARDS.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveCardIndex(idx)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  activeCardIndex === idx
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {card.name.split(' ')[0]} {card.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
