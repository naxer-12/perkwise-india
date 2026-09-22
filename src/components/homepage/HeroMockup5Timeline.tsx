import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  CreditCard, 
  Utensils, 
  ShoppingBag, 
  Plane,
  Zap
} from 'lucide-react';

interface HeroMockup5Props {
  onExploreCards: () => void;
  onExploreHacks?: () => void;
  cardsCount?: number;
}

interface RoutineItem {
  time: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  bestCard: string;
  benefit: string;
  estimatedSaving: number;
}

const ROUTINE_ITEMS: RoutineItem[] = [
  {
    time: '08:30 AM',
    label: 'Morning Metro & Fuel',
    icon: Zap,
    bestCard: 'RuPay NCMC / IndianOil Axis',
    benefit: 'Contactless metro fare rebate and 4% fuel surcharge waiver.',
    estimatedSaving: 150
  },
  {
    time: '01:15 PM',
    label: 'Team Lunch Delivery',
    icon: Utensils,
    bestCard: 'Swiggy HDFC Bank Card',
    benefit: '10% direct statement cashback with zero voucher friction.',
    estimatedSaving: 350
  },
  {
    time: '04:30 PM',
    label: 'Flight & Airport Lounge',
    icon: Plane,
    bestCard: 'ICICI Sapphiro / HDFC Infinia',
    benefit: 'Complimentary executive lounge buffet, drinks, and fast Wi-Fi.',
    estimatedSaving: 1800
  },
  {
    time: '08:00 PM',
    label: 'Evening Groceries',
    icon: ShoppingBag,
    bestCard: 'Tata Neu Infinity (RuPay)',
    benefit: '10% NeuCoins return on BigBasket & 1.5% on UPI scan & pay.',
    estimatedSaving: 400
  }
];

export const HeroMockup5Timeline: React.FC<HeroMockup5Props> = ({
  onExploreCards,
  onExploreHacks,
  cardsCount = 26
}) => {
  const [activeIdx, setActiveIdx] = useState(1);
  const active = ROUTINE_ITEMS[activeIdx];

  const totalSavings = ROUTINE_ITEMS.slice(0, activeIdx + 1).reduce(
    (acc, curr) => acc + curr.estimatedSaving, 
    0
  );

  return (
    <div className="relative bg-gradient-to-b from-amber-50/20 via-white to-slate-50/50 text-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto space-y-8 text-center">
        
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Routine Spends Simulator</span>
        </div>

        {/* Minimal Headline */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            A normal day.{' '}
            <span className="text-emerald-600">Quietly saving thousands.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            See how small, daily optimizations add up across morning transit, lunch delivery, flights, and grocery restocks.
          </p>
        </div>

        {/* Minimal Interactive Routine Container */}
        <div className="max-w-3xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Step Pill Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ROUTINE_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-500 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold">{item.time}</span>
                  <span className="text-[10px] text-slate-500 truncate w-full text-center">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Routine Detail Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/70">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {active.time} Moment
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {active.label}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  Card: {active.bestCard}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {active.benefit}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200/70">
              <span className="text-slate-500">Savings on this routine:</span>
              <span className="font-bold text-emerald-700 text-sm">
                +₹{active.estimatedSaving}
              </span>
            </div>
          </div>

          {/* Running Savings Total */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold block">Total Estimated Routine Savings:</span>
              <span className="text-[11px] text-emerald-700">Accumulated for steps up to {active.time}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
              ₹{totalSavings.toLocaleString('en-IN')}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={onExploreCards}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Explore The Card Buying Guide ({cardsCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onExploreHacks && (
              <button
                onClick={onExploreHacks}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Browse Routine Finance Hacks →
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
