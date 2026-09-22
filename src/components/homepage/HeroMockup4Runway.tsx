import React, { useState } from 'react';
import { 
  Plane, 
  ArrowRight, 
  Coffee, 
  Wifi,
  Armchair,
  Check
} from 'lucide-react';

interface HeroMockup4Props {
  onExploreCards: () => void;
  onExploreLounges?: () => void;
  cardsCount?: number;
}

interface AirportHub {
  city: string;
  code: string;
  terminal: string;
  lounge: string;
  operator: string;
  accessTip: string;
}

const AIRPORT_HUBS: AirportHub[] = [
  { 
    city: 'New Delhi', 
    code: 'DEL', 
    terminal: 'Terminal 3', 
    lounge: 'Encalm Privé & Executive VIP', 
    operator: 'Encalm Hospitality',
    accessTip: 'Free with HDFC Infinia, ICICI Sapphiro, and eligible Axis cards.'
  },
  { 
    city: 'Mumbai', 
    code: 'BOM', 
    terminal: 'Terminal 2', 
    lounge: 'Adani Lounge & Travel Club', 
    operator: 'Adani Airports',
    accessTip: 'Free entry with domestic quotas; ₹10k-₹50k quarterly spend applies.'
  },
  { 
    city: 'Bengaluru', 
    code: 'BLR', 
    terminal: 'T1 & T2', 
    lounge: '080 Transit & VIP Lounge', 
    operator: '080 Hospitality',
    accessTip: 'Complimentary buffet and workstations for eligible Mastercard/Visa tiers.'
  },
  { 
    city: 'Hyderabad', 
    code: 'HYD', 
    terminal: 'Main Concourse', 
    lounge: 'Encalm Lounge', 
    operator: 'Encalm Hospitality',
    accessTip: 'Unlimited for select premium cards; 1-2 visits/quarter on mid-tier cards.'
  },
  { 
    city: 'New Delhi Rly', 
    code: 'NDLS', 
    terminal: 'Platform 16', 
    lounge: 'IRCTC Executive Railway Lounge', 
    operator: 'IRCTC',
    accessTip: 'Complimentary 2-hour stay & buffet with ICICI Coral & SBI PRIME.'
  }
];

export const HeroMockup4Runway: React.FC<HeroMockup4Props> = ({
  onExploreCards,
  onExploreLounges,
  cardsCount = 26
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeHub = AIRPORT_HUBS[activeIdx];

  return (
    <div className="relative bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50 text-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto space-y-8 text-center">
        
        {/* Simple Travel Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs">
          <Plane className="w-3.5 h-3.5 text-sky-600" />
          <span>Airport &amp; Railway Lounge Directory</span>
          <span className="text-sky-300">•</span>
          <span className="text-sky-700 font-normal">43 Hubs Across India</span>
        </div>

        {/* Calm Headline */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Never wonder if you have{' '}
            <span className="text-sky-700">lounge access.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Bank spend rules changed recently. Know your eligibility, free visit quotas, and station lounges before you arrive.
          </p>
        </div>

        {/* Clean Hub Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {AIRPORT_HUBS.map((hub, idx) => (
            <button
              key={hub.code}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-2xs'
              }`}
            >
              <span>{hub.city}</span>
              <span className="text-[10px] opacity-70 ml-1 font-mono font-normal">({hub.code})</span>
            </button>
          ))}
        </div>

        {/* Clean Lounge Access Card */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-slate-200/90 p-6 text-left shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                {activeHub.city} ({activeHub.code}) • {activeHub.terminal}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                {activeHub.lounge}
              </h3>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                Operated by {activeHub.operator}
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Free with Card</span>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800 block mb-0.5">Eligibility Tip:</strong>
            {activeHub.accessTip}
          </div>

          {/* Amenities Strip */}
          <div className="flex items-center gap-6 pt-2 text-xs text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-emerald-600" />
              <span>Complimentary Buffet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span>Free Wi-Fi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Armchair className="w-4 h-4 text-emerald-600" />
              <span>Recliner Seating</span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onExploreLounges && (
            <button
              onClick={onExploreLounges}
              className="px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plane className="w-4 h-4" />
              <span>Search All 43 Lounges by Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onExploreCards}
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Compare {cardsCount} Cards</span>
          </button>
        </div>

      </div>
    </div>
  );
};
