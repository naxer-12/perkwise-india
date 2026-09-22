import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Train, 
  MapPin, 
  ArrowRight, 
  Coffee, 
  Wifi
} from 'lucide-react';

interface HeroMockup4Props {
  onExploreCards: () => void;
  onExploreLounges?: () => void;
  cardsCount?: number;
}

interface FlightCity {
  city: string;
  code: string;
  terminal: string;
  lounge: string;
  operator: string;
}

const AIRPORT_HUBS: FlightCity[] = [
  { city: 'New Delhi', code: 'DEL', terminal: 'T3 International/Domestic', lounge: 'Encalm Privé & VIP', operator: 'Encalm' },
  { city: 'Mumbai', code: 'BOM', terminal: 'T2 Domestic', lounge: 'Adani Lounge & Travel Club', operator: 'Adani Airports' },
  { city: 'Bengaluru', code: 'BLR', terminal: 'T1 & T2', lounge: '080 Lounge International', operator: '080 Transit' },
  { city: 'Hyderabad', code: 'HYD', terminal: 'Main Terminal', lounge: 'Encalm Lounge', operator: 'Encalm' },
  { city: 'NDLS Station', code: 'RLY', terminal: 'Platform 16', lounge: 'IRCTC Executive Lounge', operator: 'IRCTC' }
];

export const HeroMockup4Runway: React.FC<HeroMockup4Props> = ({
  onExploreCards,
  onExploreLounges,
  cardsCount = 26
}) => {
  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const activeHub = AIRPORT_HUBS[activeHubIndex];

  // Auto-cycle through airport hubs like a flight board
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHubIndex(prev => (prev + 1) % AIRPORT_HUBS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-sky-950/40 to-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Aviation Radar Sweep Background */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/20 pointer-events-none opacity-40">
        <div className="w-full h-full rounded-full border border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute inset-1/4 rounded-full border border-cyan-500/20" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left: Travel Alpha Story */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-950/90 text-sky-300 border border-sky-700/50">
            <Plane className="w-3.5 h-3.5 text-sky-400" />
            <span>Airport &amp; Railway Executive Lounge Concierge</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            Never Pay for Airport Food Again.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300">
              Lounge Access Decoded.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
            Recent bank revisions have altered lounge spend thresholds across Axis, ICICI, and HDFC. Check your exact eligibility, visit quotas, and station lounges before packing your bags.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onExploreLounges && (
              <button
                onClick={onExploreLounges}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Plane className="w-4 h-4" />
                <span>Open Lounge Recogniser Tool</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onExploreCards}
              className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Compare {cardsCount} Cards</span>
            </button>
          </div>
        </div>

        {/* Right: Mechanical Split-Flap Flight Board & Boarding Pass */}
        <div className="lg:col-span-6 space-y-4">
          {/* Mechanical Flight Board Display */}
          <div className="rounded-2xl bg-slate-950 border-2 border-slate-800 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="font-mono text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                LIVE DEPARTURE &amp; LOUNGE DIRECTORY
              </span>
              <span className="text-slate-400 text-[11px] font-mono">INDIA TRANSIT RADAR</span>
            </div>

            {/* Split Flap Hub Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-black font-mono tracking-widest text-cyan-400">
                    {activeHub.code}
                  </span>
                  <div className="text-xs font-bold text-slate-300 mt-0.5">{activeHub.city}</div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                    Free Entry Valid
                  </span>
                  <div className="text-xs text-slate-400 mt-1 font-mono">{activeHub.terminal}</div>
                </div>
              </div>

              {/* Lounge Details */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeHub.lounge}</span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{activeHub.operator}</span>
              </div>
            </div>

            {/* Hub Selector Pills */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pt-1 scrollbar-none">
              {AIRPORT_HUBS.map((hub, idx) => (
                <button
                  key={hub.code}
                  type="button"
                  onClick={() => setActiveHubIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeHubIndex === idx
                      ? 'bg-cyan-500 text-slate-950 shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {hub.code}
                </button>
              ))}
            </div>
          </div>

          {/* Complimentary Perks Strip */}
          <div className="grid grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Free Chef Buffet</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>High-Speed Wi-Fi</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Train className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>8 Railway Hubs</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
