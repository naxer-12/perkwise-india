import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Command,
  Plane
} from 'lucide-react';

interface HeroMockup3Props {
  onExploreCards: () => void;
  onExploreLounges?: () => void;
  cardsCount?: number;
}

const PROMPT_SUGGESTIONS = [
  {
    query: 'Which card gives free airport lounge access with ₹0 annual fee?',
    answerCard: {
      title: 'Scapia Federal Bank Credit Card',
      badge: 'Lifetime Free (₹0)',
      highlight: 'Unlimited Domestic Airport Lounge Access across India on ₹5,000 monthly spend.',
      perk: '0% Forex Markup worldwide'
    }
  },
  {
    query: 'Best RuPay card for 1.5% cashback on routine UPI merchant payments?',
    answerCard: {
      title: 'Tata Neu Infinity HDFC Bank (RuPay)',
      badge: 'UPI QR King',
      highlight: '1.5% flat NeuCoins on all scan-and-pay UPI transactions + 10% on Tata brands.',
      perk: '8 Airport Lounges included'
    }
  },
  {
    query: 'Do I get free railway lounge access at New Delhi Railway Station?',
    answerCard: {
      title: 'IRCTC Executive Lounge (NDLS Platform 16)',
      badge: 'Railway Alpha',
      highlight: 'Complimentary buffet & recliners with ICICI Coral/Rubyx, SBI PRIME, and IRCTC cards.',
      perk: '2-Hour Stay + Wi-Fi Included'
    }
  },
  {
    query: 'How to bypass the Axis Bank ₹50,000 quarterly lounge spend barrier?',
    answerCard: {
      title: 'Axis Bank Burgundy / Magnus Exemption',
      badge: 'Policy Audit',
      highlight: 'Burgundy Private & Magnus with Burgundy status retain unconditional zero-spend lounge entry.',
      perk: 'Set A & Set B Lounges Covered'
    }
  }
];

export const HeroMockup3Terminal: React.FC<HeroMockup3Props> = ({
  onExploreCards,
  onExploreLounges,
  cardsCount = 26
}) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentSuggestion = PROMPT_SUGGESTIONS[activeSuggestionIndex];

  // Realistic typewriter effect
  useEffect(() => {
    const fullText = currentSuggestion.query;
    let charIndex = 0;
    setDisplayText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 28);

    return () => clearInterval(typeInterval);
  }, [activeSuggestionIndex]);

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background terminal grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 text-center">
        {/* Terminal Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-emerald-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>PERKWISE HIGH-ALPHA CLI v2.4</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">100% Statutorily Verified</span>
        </div>

        {/* Minimalist Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
          The Search Engine for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
            Indian Financial Alpha.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Ask questions about card eligibility, railway lounges, spend thresholds, and hidden fees. Backed by verified RBI guidelines and bank schedules.
        </p>

        {/* Terminal Search Command Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-slate-900/90 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/40 p-2 sm:p-2.5 flex items-center gap-3">
            <div className="pl-2">
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

            <div className="flex-1 text-left">
              <span className="text-xs sm:text-sm font-mono text-white tracking-wide">
                {displayText}
              </span>
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-400 shrink-0">
              <Command className="w-3 h-3" />
              <span>ENTER</span>
            </div>
          </div>

          {/* Quick Query Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
            {PROMPT_SUGGESTIONS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSuggestionIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                  activeSuggestionIndex === idx
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                Prompt #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Live Answer Preview Card */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-5 text-left shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Verified Engine Result
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              {currentSuggestion.answerCard.badge}
            </span>
          </div>

          <div className="pt-3 space-y-2">
            <h3 className="text-base font-bold text-white">
              {currentSuggestion.answerCard.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentSuggestion.answerCard.highlight}
            </p>
            <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold font-mono">
                Alpha Perk: {currentSuggestion.answerCard.perk}
              </span>
              <div className="flex items-center gap-3">
                {onExploreLounges && (
                  <button
                    onClick={onExploreLounges}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>Check Lounges</span>
                  </button>
                )}
                <button
                  onClick={onExploreCards}
                  className="text-xs font-bold text-white hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2 font-mono">
          <div><strong className="text-white font-bold">43</strong> Lounges Audited</div>
          <span>•</span>
          <div><strong className="text-white font-bold">{cardsCount}</strong> Verified Cards</div>
          <span>•</span>
          <div><strong className="text-emerald-400 font-bold">0%</strong> Hidden Affiliate Bias</div>
        </div>

      </div>
    </div>
  );
};
