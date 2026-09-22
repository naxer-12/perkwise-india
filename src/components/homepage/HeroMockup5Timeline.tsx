import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  CreditCard, 
  Utensils, 
  ShoppingBag, 
  Film,
  Zap,
  Plane
} from 'lucide-react';

interface HeroMockup5Props {
  onExploreCards: () => void;
  onExploreHacks?: () => void;
  cardsCount?: number;
}

interface DayCheckpoint {
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  activity: string;
  toolUsed: string;
  savings: number;
  highlight: string;
}

const DAY_CHECKPOINTS: DayCheckpoint[] = [
  {
    time: '08:30 AM',
    icon: Zap,
    activity: 'Metro Transit & Auto-Pay Fuel',
    toolUsed: 'IndianOil Axis / RuPay NCMC',
    savings: 180,
    highlight: '4% fuel surcharge waiver & contactless tap-to-pay transit discount'
  },
  {
    time: '01:15 PM',
    icon: Utensils,
    activity: 'Team Lunch Ordering',
    toolUsed: 'Swiggy HDFC Bank Card',
    savings: 350,
    highlight: '10% instant statement cashback credit with no voucher friction'
  },
  {
    time: '04:30 PM',
    icon: Plane,
    activity: 'Business Flight & Airport Lounge',
    toolUsed: 'ICICI Sapphiro / Encalm Pass',
    savings: 1850,
    highlight: 'Complimentary luxury lounge buffet & fast-track Wi-Fi'
  },
  {
    time: '07:45 PM',
    icon: ShoppingBag,
    activity: 'Evening Grocery & Pharmacy Restock',
    toolUsed: 'Tata Neu Infinity (10% NeuCoins)',
    savings: 420,
    highlight: '10% NeuCoins on BigBasket & 1mg medicine refills'
  },
  {
    time: '10:15 PM',
    icon: Film,
    activity: 'Weekend Movie Booking',
    toolUsed: 'BookMyShow BOGO Privilege',
    savings: 450,
    highlight: 'Buy 1 Get 1 free movie ticket discount credited instantly'
  }
];

export const HeroMockup5Timeline: React.FC<HeroMockup5Props> = ({
  onExploreCards,
  onExploreHacks,
  cardsCount = 26
}) => {
  const [selectedCheckpointIndex, setSelectedCheckpointIndex] = useState(1);
  const current = DAY_CHECKPOINTS[selectedCheckpointIndex];

  // Cumulative savings up to selected checkpoint
  const cumulativeSavings = DAY_CHECKPOINTS.slice(0, selectedCheckpointIndex + 1).reduce(
    (acc, item) => acc + item.savings, 
    0
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Headline & Overview */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>24-Hour Life Operations Simulation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            A Typical 24-Hour Day,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Mathematically Optimized.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            From morning metro commutes to late-night movie bookings, see how much money stays in your pocket when routine daily transactions are routed correctly.
          </p>
        </div>

        {/* Interactive Timeline Stepper */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          
          {/* Timeline Nodes Bar */}
          <div className="flex items-center justify-between relative">
            {/* Background connection line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-4 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${(selectedCheckpointIndex / (DAY_CHECKPOINTS.length - 1)) * 92}%` }}
            />

            {DAY_CHECKPOINTS.map((cp, idx) => {
              const IconComp = cp.icon;
              const isSelected = selectedCheckpointIndex === idx;
              const isPassed = idx <= selectedCheckpointIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCheckpointIndex(idx)}
                  className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group focus:outline-none"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 shadow-lg scale-110' 
                      : isPassed
                      ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                      : 'bg-slate-800 border border-slate-700 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap ${
                    isSelected ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {cp.time}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Checkpoint Detail Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4 border-t border-slate-800">
            <div className="md:col-span-8 space-y-2 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  {current.time} Focus
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-300 font-semibold">{current.toolUsed}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {current.activity}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {current.highlight}
              </p>
            </div>

            {/* Savings Badge */}
            <div className="md:col-span-4 rounded-2xl bg-slate-950 p-4 border border-emerald-900/40 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Accumulated Day Alpha
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                +₹{cumulativeSavings.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-500 block">
                Single day savings on ordinary routines
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onExploreCards}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Explore The Card Buying Guide ({cardsCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onExploreHacks && (
              <button
                onClick={onExploreHacks}
                className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Browse All Routine Life Hacks</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
