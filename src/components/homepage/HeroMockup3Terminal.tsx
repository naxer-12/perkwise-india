import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Plane
} from 'lucide-react';

interface HeroMockup3Props {
  onExploreCards: () => void;
  onExploreLounges?: () => void;
  cardsCount?: number;
}

const PROMPT_QUESTIONS = [
  {
    category: 'Lounges',
    query: 'Which card gives free airport lounge access with ₹0 annual fee?',
    answer: {
      cardName: 'Scapia Federal Bank Credit Card',
      badge: 'Lifetime Free (₹0)',
      summary: 'Unlimited domestic airport lounge access across India on spending just ₹5,000 per month.',
      highlight: '0% Forex Markup worldwide'
    }
  },
  {
    category: 'Dining & Groceries',
    query: 'What is the best card for 10% cashback on Swiggy and food delivery?',
    answer: {
      cardName: 'Swiggy HDFC Bank Credit Card',
      badge: '10% Statement Credit',
      summary: 'Direct monthly statement cashback on Swiggy food orders, Instamart groceries, and Dineout.',
      highlight: '3 Months Swiggy One VIP Included'
    }
  },
  {
    category: 'UPI Payments',
    query: 'Which RuPay credit card gives rewards on merchant UPI QR scans?',
    answer: {
      cardName: 'Tata Neu Infinity HDFC Bank (RuPay)',
      badge: '1.5% UPI Return',
      summary: 'Flat 1.5% NeuCoins on all routine UPI merchant payments plus 10% on Tata partner brands.',
      highlight: '8 Airport Lounges / year'
    }
  }
];

export const HeroMockup3Terminal: React.FC<HeroMockup3Props> = ({
  onExploreCards,
  onExploreLounges,
  cardsCount = 26
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const current = PROMPT_QUESTIONS[activeIdx];

  // Gentle, calm typewriter effect
  useEffect(() => {
    let i = 0;
    const full = current.query;
    setTypedText('');

    const interval = setInterval(() => {
      if (i < full.length) {
        setTypedText(full.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [activeIdx]);

  return (
    <div className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 text-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        
        {/* Simple Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Quick Answers • Zero Marketing Noise</span>
        </div>

        {/* Headline */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Ask what you need.{' '}
            <span className="text-emerald-600">Get honest answers.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Find out which card wins for your specific lifestyle, lounge trips, or monthly budget.
          </p>
        </div>

        {/* Minimal Clean Search Box */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 text-left">
            <div className="pl-2.5">
              <Search className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                {typedText}
                <span className="inline-block w-1.5 h-3.5 bg-emerald-500 ml-1 animate-pulse" />
              </div>
            </div>

            <button
              type="button"
              onClick={onExploreCards}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-all cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Clean Prompt Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <span className="text-xs text-slate-400 font-medium mr-1">Try asking:</span>
            {PROMPT_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/70'
                }`}
              >
                {q.category}
              </button>
            ))}
          </div>
        </div>

        {/* Instant Clean Answer Card */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 text-left shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Best Choice Recommendation
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {current.answer.badge}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {current.answer.cardName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {current.answer.summary}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span className="font-semibold text-emerald-700">
              Key Benefit: {current.answer.highlight}
            </span>

            <div className="flex items-center gap-3">
              {onExploreLounges && (
                <button
                  onClick={onExploreLounges}
                  className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Plane className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lounges</span>
                </button>
              )}
              <button
                onClick={onExploreCards}
                className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Guide ({cardsCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
