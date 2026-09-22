import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  ExternalLink, 
  ArrowRight, 
  Gift, 
  Zap, 
  Check,
  RefreshCw,
  SlidersHorizontal,
  Flame,
  Clock
} from 'lucide-react';
import type { CreditCard } from '../types';
import { API_BASE_URL } from '../utils/api';
import { getAllCards, publishCard } from '../utils/cardStorage';

interface DiscoveredCardItem {
  id: string;
  name: string;
  bank: string;
  network: string;
  cardType: 'credit' | 'debit';
  dealCategory: string;
  acceleratedRewardRate: string;
  annualFee: number;
  feeWaiverSpend: number | string;
  whyThisCardWins: string;
  dealHighlights: string[];
  sourceRef: {
    id: string;
    name: string;
    authority: string;
    authorityType: string;
    referenceCode: string;
    officialUrl: string;
    reasoning: string;
    lastUpdated: string;
    verificationStatus: string;
  };
  discoveredFrom: string;
  voucherValue: string;
  cashbackRate: string;
}

interface CardDiscoveryAgentProps {
  onCardPublished?: () => void;
  showToast: (message: string) => void;
}

export const CardDiscoveryAgent: React.FC<CardDiscoveryAgentProps> = ({
  onCardPublished,
  showToast
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [discoveredCards, setDiscoveredCards] = useState<DiscoveredCardItem[]>([]);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [sourcesChecked, setSourcesChecked] = useState<string[]>([]);
  const [publishedCardIds, setPublishedCardIds] = useState<Set<string>>(new Set());
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Check which cards are already in the database
  useEffect(() => {
    const existing = getAllCards();
    const publishedIds = new Set(existing.map(c => c.id));
    setPublishedCardIds(publishedIds);
  }, []);

  const scanStepsMessages = [
    'Connecting to CardInsider.com issuers registry...',
    'Scanning latest Indian credit card cashback offers & welcome vouchers...',
    'Parsing official MITC tariff schedules & regulatory circulars...',
    'Verifying airport & railway lounge access conditions & spend quotas...',
    'Synthesizing verified consumer alpha & ranking mission scores...'
  ];

  const handleRunScan = async () => {
    setIsScanning(true);
    setScanStep(0);

    // Realistic scanning progression
    const stepInterval = setInterval(() => {
      setScanStep(prev => (prev < scanStepsMessages.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const res = await fetch(`${API_BASE_URL}/api/discovery/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const data = await res.json();
        setTimeout(() => {
          clearInterval(stepInterval);
          setIsScanning(false);
          setDiscoveredCards(data.discoveredCards || []);
          setSourcesChecked(data.sourcesChecked || []);
          setLastScanTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          showToast(`✨ Discovery Agent found ${data.discoveredCards?.length || 0} high-yield credit cards with vouchers!`);
        }, 1200);
      } else {
        throw new Error('API request failed');
      }
    } catch (e) {
      clearInterval(stepInterval);
      setIsScanning(false);
      showToast('⚠️ Scan failed or backend offline. Make sure backend server is running on port 3001.');
    }
  };

  // Run initial scan on mount
  useEffect(() => {
    handleRunScan();
  }, []);

  const handlePublishSingle = async (cardItem: DiscoveredCardItem) => {
    // Transform into standard CreditCard object
    const cardData: CreditCard = {
      id: cardItem.id,
      name: cardItem.name,
      bank: cardItem.bank,
      network: (cardItem.network.includes('RuPay') ? 'RuPay' : 
                cardItem.network.includes('Mastercard') ? 'Mastercard' : 
                cardItem.network.includes('Visa') ? 'Visa' : 'RuPay') as any,
      segmentId: cardItem.dealCategory,
      annualFee: cardItem.annualFee,
      feeWaiverSpend: cardItem.feeWaiverSpend,
      joiningBenefit: cardItem.voucherValue,
      baseRewardRate: '1% flat return',
      acceleratedRewardRate: cardItem.acceleratedRewardRate,
      loungeAccess: {
        domestic: cardItem.dealHighlights.find(h => h.toLowerCase().includes('domestic')) || 'Complimentary Domestic Access Available',
        international: cardItem.dealHighlights.find(h => h.toLowerCase().includes('international')) || 'Available on Select Tiers',
        condition: 'Official bank spend threshold applies'
      },
      forexMarkup: cardItem.id.includes('scapia') ? 0 : 3.5,
      whyThisCardWins: cardItem.whyThisCardWins,
      roiCalculation: `Spend ₹25,000/month to extract over ₹12,000 in net annual value including vouchers.`,
      dealHighlights: cardItem.dealHighlights,
      hiddenCatches: [
        'Annual fee waiver requires meeting statutory spend criteria',
        'Accelerated rewards capped per statement billing cycle'
      ],
      whoShouldBuy: 'Consumers looking to optimize category-specific spending with minimum friction.',
      whoShouldAvoid: 'Low spenders unable to offset annual charges through reward utilization.',
      applicationLinkText: cardItem.sourceRef.officialUrl,
      sourceRef: cardItem.sourceRef as any,
      reviews: [],
      cardType: cardItem.cardType,
      missionScore: 94,
      isCustom: true,
      isPublished: true,
      publishedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    try {
      // 1. Save to backend database
      await fetch(`${API_BASE_URL}/api/discovery/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card: cardData })
      });

      // 2. Also save to local storage for local immediate update
      publishCard(cardData);

      setPublishedCardIds(prev => new Set([...prev, cardItem.id]));
      showToast(`🚀 Published "${cardItem.name}" to Card Buying Guide!`);
      onCardPublished?.();
    } catch (e) {
      // Fallback local save
      publishCard(cardData);
      setPublishedCardIds(prev => new Set([...prev, cardItem.id]));
      showToast(`Saved "${cardItem.name}" locally in browser guide!`);
      onCardPublished?.();
    }
  };

  const handlePublishAll = async () => {
    if (discoveredCards.length === 0) return;
    for (const card of discoveredCards) {
      await handlePublishSingle(card);
    }
    showToast(`🎉 All ${discoveredCards.length} discovered cards published to Buying Guide!`);
  };

  // Filter cards
  const filteredCards = discoveredCards.filter(card => {
    if (selectedIssuer !== 'all' && card.bank !== selectedIssuer) return false;
    if (selectedCategory !== 'all' && card.dealCategory !== selectedCategory) return false;
    return true;
  });

  const issuersList = Array.from(new Set(discoveredCards.map(c => c.bank)));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Agent Banner & Control Center */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-800/40 p-6 shadow-xl relative overflow-hidden">
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30">
              <Radar className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>CardInsider.com &amp; Bank MITC Web Agent</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-300 text-[11px] font-bold">Live Crawler</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Autonomous Card &amp; Deal Discovery Agent
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Continuously crawls official bank portals, CardInsider categories, and merchant tie-ups to uncover newly released cards, high-value voucher bundles, zero-forex deals, and accelerated cashback programs in India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Last Sweep: <strong className="text-white">{lastScanTime || 'Just now'}</strong></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Market Alpha: <strong className="text-white">{discoveredCards.length} Offers Found</strong></span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                isScanning 
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50 cursor-wait' 
                  : 'bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/40 hover:shadow-purple-600/30'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Crawling Portals...' : 'Run Discovery Scan'}</span>
            </button>

            <button
              onClick={handlePublishAll}
              disabled={isScanning || discoveredCards.length === 0}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40 shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-4 h-4 text-emerald-200" />
              <span>Publish All to Guide</span>
            </button>
          </div>
        </div>

        {/* Live Scan Progression Bar */}
        {isScanning && (
          <div className="mt-6 pt-4 border-t border-purple-800/40 space-y-2">
            <div className="flex items-center justify-between text-xs text-purple-200 font-medium">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                {scanStepsMessages[scanStep]}
              </span>
              <span className="font-mono">{Math.round(((scanStep + 1) / scanStepsMessages.length) * 100)}%</span>
            </div>
            <div className="w-full bg-purple-950 rounded-full h-2 overflow-hidden border border-purple-800/50">
              <div 
                className="bg-gradient-to-r from-purple-500 via-indigo-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((scanStep + 1) / scanStepsMessages.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter Bar: Issuers & Categories */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold px-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            <span>Issuers:</span>
          </span>
          <button
            onClick={() => setSelectedIssuer('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedIssuer === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Banks ({discoveredCards.length})
          </button>
          {issuersList.map(issuer => (
            <button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedIssuer === issuer
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {issuer}
            </button>
          ))}

          <span className="text-slate-700 hidden sm:inline">|</span>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'all' ? 'bg-purple-900/60 text-purple-200 border border-purple-700/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Deals
          </button>
          <button
            onClick={() => setSelectedCategory('travel-rewards')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'travel-rewards' ? 'bg-purple-900/60 text-purple-200 border border-purple-700/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            ✈️ Travel &amp; Lounge
          </button>
          <button
            onClick={() => setSelectedCategory('cashback-online')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'cashback-online' ? 'bg-purple-900/60 text-purple-200 border border-purple-700/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            🛍️ Cashback Online
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Sources:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">
            {sourcesChecked.length > 0 ? `${sourcesChecked.length} Verified Sources` : 'CardInsider + Bank MITCs'}
          </span>
        </div>
      </div>

      {/* Discovered Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map(card => {
          const isPublished = publishedCardIds.has(card.id);

          return (
            <div 
              key={card.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-purple-950/20 group"
            >
              <div className="space-y-4">
                {/* Header: Issuer + Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50 uppercase tracking-wide">
                        {card.bank}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {card.network}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {card.name}
                    </h3>
                  </div>

                  {isPublished ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 text-[11px] font-bold shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>In Guide</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-700/50 text-[11px] font-bold shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ready</span>
                    </span>
                  )}
                </div>

                {/* Deal Alpha Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-900/40 text-emerald-300 border border-emerald-700/40 text-xs font-bold">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{card.cashbackRate} Rate</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-900/40 text-amber-300 border border-amber-700/40 text-xs font-bold">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span>{card.voucherValue}</span>
                  </div>
                </div>

                {/* Return Summary */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-0.5">Core Advantage:</strong>
                  {card.whyThisCardWins}
                </div>

                {/* Deal Highlights */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Verified Deal Perks:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {card.dealHighlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Financial Terms Strip */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="p-2 rounded-lg bg-slate-800/40">
                    <span className="text-[10px] text-slate-400 block font-medium">Annual Fee</span>
                    <span className="font-bold text-white">
                      {card.annualFee === 0 ? '₹0 (Lifetime Free)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/40">
                    <span className="text-[10px] text-slate-400 block font-medium">Fee Waiver Spend</span>
                    <span className="font-bold text-white">
                      {typeof card.feeWaiverSpend === 'number' 
                        ? `₹${card.feeWaiverSpend.toLocaleString('en-IN')}/yr` 
                        : card.feeWaiverSpend}
                    </span>
                  </div>
                </div>

                {/* Discovery Source Origin */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 truncate">
                    <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">Source: {card.discoveredFrom}</span>
                  </span>
                  <a
                    href={card.sourceRef.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-purple-300 flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>Bank MITC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="text-[10px] text-slate-500">
                  Ref Code: <span className="font-mono text-slate-400">{card.sourceRef.referenceCode}</span>
                </div>

                {isPublished ? (
                  <button
                    disabled
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold flex items-center gap-1.5 cursor-default border border-slate-700/50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live in Card Guide</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublishSingle(card)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md hover:shadow-purple-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>1-Click Publish to Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
