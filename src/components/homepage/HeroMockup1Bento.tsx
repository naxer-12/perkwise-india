import React from 'react';
import { 
  ArrowRight, 
  CreditCard, 
  Plane, 
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
  return (
    <div className="relative bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 text-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto space-y-8 text-center">
        
        {/* Simple Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Independent Consumer Guide</span>
          <span className="text-emerald-300">•</span>
          <span className="text-emerald-700 font-normal">India 🇮🇳</span>
        </div>

        {/* Minimal, Human Headline */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Spend smarter.{' '}
            <span className="text-emerald-600">Keep more</span> of your money.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Honest, mathematical breakdowns for Indian credit cards, airport lounges, and everyday cashback. No affiliate bias, zero sponsored rankings.
          </p>
        </div>

        {/* Clean Primary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={onExploreCards}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Explore Card Buying Guide ({cardsCount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onExploreLounges && (
            <button
              onClick={onExploreLounges}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plane className="w-4 h-4 text-emerald-600" />
              <span>Check Airport Lounges</span>
            </button>
          )}

          {onExploreHacks && (
            <button
              onClick={onExploreHacks}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-500" />
              <span>Finance Hacks</span>
            </button>
          )}
        </div>

        {/* Clean Bento Grid (Minimal, Uncluttered, Easy to Read) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left max-w-4xl mx-auto">
          
          {/* Bento Tile 1: Top Everyday Picks */}
          <div className="md:col-span-2 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Top Recommended Cards by Category
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Audited
                </span>
              </div>

              <div className="divide-y divide-slate-100 pt-1">
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🍔</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Swiggy HDFC Bank</div>
                      <div className="text-[11px] text-slate-500">Food delivery &amp; grocery orders</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    10% Cashback
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">✈️</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Scapia Federal Bank</div>
                      <div className="text-[11px] text-slate-500">International trips &amp; lounges</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    0% Forex Markup
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">⚡</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Tata Neu Infinity RuPay</div>
                      <div className="text-[11px] text-slate-500">Routine merchant UPI QR scans</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    1.5% NeuCoins
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-1">
              Select any card in our buying guide to see full fees, waiver criteria, and RBI-aligned terms.
            </div>
          </div>

          {/* Bento Tile 2: Lounge & Value Summary */}
          <div className="md:col-span-1 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block pb-2 border-b border-slate-100">
                Lounge Access
              </span>

              <div className="pt-3 space-y-2">
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  43 Lounges
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verified airport &amp; IRCTC railway executive lounges across India with spend requirements and guest policies.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  Free Buffet
                </span>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  Recliners
                </span>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  High-Speed Wi-Fi
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-800">
              <strong className="block font-semibold">Average User Return:</strong>
              Over ₹32,000 yearly value unlocked on routine spends.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
