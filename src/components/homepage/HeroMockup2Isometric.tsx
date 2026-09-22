import React, { useState } from 'react';
import { 
  ArrowRight, 
  CreditCard, 
  Sparkles, 
  Zap, 
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
  tier: string;
  color: string;
  returnRate: string;
  loungePerk: string;
  welcomeVoucher: string;
}

const DECK_CARDS: DeckCard[] = [
  {
    id: 'infinia',
    name: 'HDFC Infinia Metal',
    bank: 'HDFC Bank',
    tier: 'Super Premium',
    color: 'from-slate-900 via-zinc-800 to-black',
    returnRate: '33.3% SmartBuy',
    loungePerk: 'Unlimited Global Lounges',
    welcomeVoucher: '12,500 Reward Points'
  },
  {
    id: 'scapia',
    name: 'Scapia Federal',
    bank: 'Federal Bank',
    tier: 'Zero Forex',
    color: 'from-rose-950 via-rose-900 to-slate-950',
    returnRate: '0% Forex Markup',
    loungePerk: 'Unlimited Airport Lounges',
    welcomeVoucher: 'Lifetime Free'
  },
  {
    id: 'swiggy',
    name: 'Swiggy HDFC Bank',
    bank: 'HDFC Bank',
    tier: 'Cashback Online',
    color: 'from-orange-950 via-amber-900 to-slate-950',
    returnRate: '10% Food & Groceries',
    loungePerk: 'Domestic Lounges Eligible',
    welcomeVoucher: 'Swiggy One VIP'
  },
  {
    id: 'tata-neu',
    name: 'Tata Neu Infinity',
    bank: 'HDFC Bank',
    tier: 'RuPay UPI',
    color: 'from-purple-950 via-indigo-950 to-slate-950',
    returnRate: '1.5% on UPI Scan',
    loungePerk: '8 Airport Lounges',
    welcomeVoucher: '1,499 NeuCoins'
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
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Column: Kinetic Messaging & Selection Details */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>3D Perspective Deck • Spatial Visualizer</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            Find the Exact Card That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
              Pays You Back.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
            No affiliate bias. No marketing fluff. Explore India’s verified credit cards with interactive reward matrices, spend criteria waivers, and airport lounge access terms.
          </p>

          {/* Active Card Quick Alpha Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Hovering: {activeCard.name}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeCard.bank}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
              <div className="p-2 rounded-lg bg-slate-950/60">
                <span className="text-[10px] text-slate-400 block">Top Return</span>
                <span className="font-bold text-emerald-400">{activeCard.returnRate}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/60">
                <span className="text-[10px] text-slate-400 block">Lounge Perk</span>
                <span className="font-bold text-cyan-300 truncate block">{activeCard.loungePerk}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/60">
                <span className="text-[10px] text-slate-400 block">Welcome Pack</span>
                <span className="font-bold text-amber-300 truncate block">{activeCard.welcomeVoucher}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreCards}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <CreditCard className="w-4 h-4" />
              <span>Explore All {cardsCount} Audited Cards</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onExploreLounges && (
              <button
                onClick={onExploreLounges}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plane className="w-4 h-4 text-amber-400" />
                <span>Lounge Recogniser</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Interactive 3D Fanned Card Deck */}
        <div className="lg:col-span-6 flex justify-center py-6">
          <div className="relative w-[340px] sm:w-[400px] h-[340px] flex items-center justify-center [perspective:1000px]">
            {/* Floating Kinetic Reward Pill */}
            <div className="absolute -top-4 right-2 px-3 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold shadow-lg flex items-center gap-1.5 animate-bounce z-40">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>+₹18,500 Net Cashback Stream</span>
            </div>

            {/* Fanned Isometric Card Stack */}
            {DECK_CARDS.map((card, index) => {
              const isActive = activeCardIndex === index;
              // Staggered isometric offsets
              const rotZ = (index - 1.5) * 9;
              const translateY = (index - 1.5) * 18;
              const translateX = (index - 1.5) * 22;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setActiveCardIndex(index)}
                  onClick={() => setActiveCardIndex(index)}
                  style={{
                    transform: isActive 
                      ? `translateY(-35px) scale(1.08) rotateZ(0deg) translateZ(50px)` 
                      : `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotZ}deg)`,
                    zIndex: isActive ? 30 : 10 + index
                  }}
                  className={`absolute w-[290px] sm:w-[320px] aspect-[1.58/1] rounded-2xl bg-gradient-to-br ${card.color} p-5 border cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between select-none ${
                    isActive 
                      ? 'border-amber-400/90 ring-4 ring-amber-400/20 shadow-amber-500/20' 
                      : 'border-slate-700/80 hover:border-slate-500 opacity-90'
                  }`}
                >
                  {/* Top line: Bank & Contactless chip */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-5 rounded bg-amber-400/80 border border-amber-300 shadow-xs" />
                      <span className="text-[11px] font-mono text-slate-300 font-bold">{card.bank}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
                      {card.tier}
                    </span>
                  </div>

                  {/* Center: Card Name */}
                  <div>
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-white">
                      {card.name}
                    </h4>
                    <span className="text-[11px] text-amber-300 font-bold block mt-0.5">
                      {card.returnRate}
                    </span>
                  </div>

                  {/* Bottom: Number & Network */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                    <span>•••• 9421</span>
                    <span className="text-white font-bold">{card.loungePerk}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
