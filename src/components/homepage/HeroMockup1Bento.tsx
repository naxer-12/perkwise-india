import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CreditCard, 
  Plane, 
  TrendingUp, 
  Coffee,
  Wifi,
  Compass
} from 'lucide-react';

interface HeroMockup1Props {
  onExploreCards: () => void;
  onExploreLounges?: () => void;
  onExploreHacks?: () => void;
  cardsCount?: number;
}

export const HeroMockup1Bento: React.FC<HeroMockup1Props> = ({
  onExploreCards,
  onExploreLounges,
  onExploreHacks,
  cardsCount = 26
}) => {
  const [savingsCount, setSavingsCount] = useState(38400);
  const [activeChip, setActiveChip] = useState<'shopping' | 'travel' | 'dining'>('shopping');

  // Realistic incrementing savings ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSavingsCount(prev => (prev > 45000 ? 38400 : prev + 75));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Top Tag & High Impact Headline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-700/50 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Fintech Alpha Bento • India Edition</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">RBI Master Direction Audited</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            Maximize Every Rupee.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Zero Guesswork.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
            Stop losing thousands in overlooked rewards, airport lounge passes, and foreign markup fees. PerkWise delivers mathematical clarity for cards, lounges, and daily finance hacks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreCards}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <CreditCard className="w-4 h-4" />
              <span>Explore Verified Card Guide ({cardsCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onExploreLounges && (
              <button
                onClick={onExploreLounges}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plane className="w-4 h-4 text-cyan-400" />
                <span>Lounge Recogniser (43 Hubs)</span>
              </button>
            )}

            {onExploreHacks && (
              <button
                onClick={onExploreHacks}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Finance Hacks</span>
              </button>
            )}
          </div>
        </div>

        {/* Bento Grid Layout Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          {/* Bento Cell 1: Interactive Shimmering Metal Card */}
          <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 pb-4">
                <span className="font-mono uppercase tracking-wider text-[11px] text-emerald-400 font-bold">Premium Card Engine</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800/50">Top Alpha</span>
              </div>

              {/* Shimmering Metallic Card Graphic */}
              <div className="w-full aspect-[1.58/1] rounded-xl bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-900 p-4 border border-slate-700/80 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                {/* Metallic diagonal beam */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-5 rounded bg-amber-400/80 border border-amber-300 shadow-inner" />
                    <span className="text-[10px] font-mono text-slate-400">EMV Contactless</span>
                  </div>
                  <span className="text-xs font-black tracking-widest text-white/90">INFINIA</span>
                </div>

                <div>
                  <div className="text-[11px] font-mono tracking-widest text-slate-300">•••• 8824</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                    <span>REWARD RETURN</span>
                    <span className="text-emerald-400 font-bold">Up to 33.3% Net</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Annual Fee Waiver</span>
              <span className="font-semibold text-white">₹10 Lakhs spend</span>
            </div>
          </div>

          {/* Bento Cell 2: Live Savings Telemetry & Spend Router */}
          <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col justify-between group hover:border-teal-500/40 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between text-xs pb-3">
                <span className="font-mono text-teal-400 uppercase tracking-wider text-[11px] font-bold">Simulated Annual Alpha</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-teal-300 bg-teal-950/70 px-2 py-0.5 rounded border border-teal-800/40">
                  <TrendingUp className="w-3 h-3" />
                  <span>Real-time</span>
                </span>
              </div>

              {/* Ticker Display */}
              <div className="py-2">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                  ₹{savingsCount.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Estimated average annual return across grocery, flight bookings, and UPI payments.
                </p>
              </div>

              {/* Interactive Spend Router Buttons */}
              <div className="space-y-1.5 pt-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Spend Routing Profile</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveChip('shopping')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      activeChip === 'shopping' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Shopping
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChip('travel')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      activeChip === 'travel' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Travel
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChip('dining')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      activeChip === 'dining' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Dining
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Selected Yield:</span>
              <span className="font-bold text-emerald-400">
                {activeChip === 'shopping' ? '10% Instant Statement Cashback' : 
                 activeChip === 'travel' ? '0% Forex + 16 Free Lounges' : 
                 '20% Dineout Dining Rebate'}
              </span>
            </div>
          </div>

          {/* Bento Cell 3: Airport & Railway Lounge Access Pass */}
          <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col justify-between group hover:border-cyan-500/40 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between text-xs pb-3">
                <span className="font-mono text-cyan-400 uppercase tracking-wider text-[11px] font-bold">Lounge Radar Engine</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>43 Hubs</span>
                </span>
              </div>

              {/* Lounge Access Pill */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">DEL • Terminal 3 Encalm</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                    Complimentary
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Coffee className="w-3 h-3 text-slate-500" />
                    <span>Buffet Included</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-slate-500" />
                    <span>Free Wi-Fi</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 pt-3 leading-relaxed">
                Check visit quotas, spend qualifications (Axis ₹50k, ICICI ₹10k), and executive railway stations before traveling.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Railway Executive:</span>
              <span className="text-xs font-bold text-amber-300">NDLS, ANVT, Sealdah</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
