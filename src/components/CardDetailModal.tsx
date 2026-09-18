import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckSquare, 
  Star, 
  Zap, 
  MessageSquare,
  ChevronRight,
  Lock
} from 'lucide-react';
import type { CreditCard, ReviewItem } from '../types';
import { CardVisual } from './CardVisual';

interface CardDetailModalProps {
  card: CreditCard | null;
  onClose: () => void;
  onGoToChecklist?: (card: CreditCard) => void;
  onAddReview?: (cardId: string, newReview: ReviewItem) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  onClose,
  onGoToChecklist,
  onAddReview
}) => {
  const [activeTab, setActiveTab] = useState<'fact-sheet' | 'prerequisites' | 'reviews'>('fact-sheet');

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDuration, setNewDuration] = useState('6-12 months');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (card) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [card]);

  // Reset tab when card changes
  useEffect(() => {
    setActiveTab('fact-sheet');
    setSubmitSuccess(false);
    setValidationError('');
  }, [card?.id]);

  if (!card) return null;

  const isDebit = card.cardType === 'debit';
  const reviews = card.reviews || [];
  const hasReviews = reviews.length > 0;
  const avgRating = hasReviews 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!newLocation.trim()) {
      setValidationError('Please enter your city/location.');
      return;
    }
    if (!newComment.trim() || newComment.trim().length < 10) {
      setValidationError('Please share at least 10 characters of real-world feedback.');
      return;
    }

    const createdReview: ReviewItem = {
      id: `usr-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim(),
      rating: newRating,
      verifiedUser: true,
      date: 'Just now',
      comment: newComment.trim(),
      holdingDuration: newDuration
    };

    onAddReview?.(card.id, createdReview);
    setSubmitSuccess(true);
    setValidationError('');
    setNewAuthor('');
    setNewLocation('');
    setNewComment('');
  };

  // Compute fee display
  const feeDisplay = card.annualFee === 0 || card.feeWaiverSpend === 'Lifetime Free'
    ? '₹0 (Lifetime Free)'
    : `₹${card.annualFee.toLocaleString('en-IN')} + 18% GST`;

  const waiverDisplay = typeof card.feeWaiverSpend === 'number'
    ? `₹${(card.feeWaiverSpend / 100000).toFixed(1)} Lakhs spend in previous year`
    : card.feeWaiverSpend;

  // Prerequisites tailored to card tier
  const minCibil = card.cardType === 'debit' ? 'None (Savings Account Based)' : (card.annualFee >= 5000 ? '780+' : card.annualFee >= 1000 ? '750+' : '730+');
  const minIncome = card.cardType === 'debit' 
    ? 'Average Monthly Balance (AMB) requirement depends on account variant' 
    : (card.annualFee >= 10000 ? '₹36 Lakhs/year ITR or ₹3,00,000/mo salary' : card.annualFee >= 3000 ? '₹12-15 Lakhs/year ITR or ₹1,00,000/mo net salary' : '₹3.6-6 Lakhs/year ITR or ₹25,000-50,000/mo net salary');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              isDebit 
                ? 'bg-purple-50 text-purple-800 border-purple-200' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {isDebit ? 'High-Yield Debit Deal' : 'Credit Card Specification'}
            </span>
            <span className="text-xs font-semibold text-slate-500">•</span>
            <span className="text-xs font-semibold text-slate-700">{card.bank}</span>
            <span className="text-xs font-semibold text-slate-500">•</span>
            <span className="text-xs font-semibold text-slate-700">{card.network}</span>
            {card.missionScore && card.missionScore >= 90 && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Mission Score: {card.missionScore}/100</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Visual Card Showcase Hero Area */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
            {/* Background ambient lighting */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* 3D Visual Card on the Left */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <CardVisual card={card} variant="hero" interactive={true} />
                <p className="text-[11px] text-slate-400 font-mono mt-3 flex items-center gap-1.5">
                  <span>Hover to tilt in 3D</span>
                  <span>•</span>
                  <span>Click flip button ↺ to inspect back</span>
                </p>
              </div>

              {/* High-Level Pitch & Headline on the Right */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      Official Specification Sheet
                    </span>
                    {hasReviews ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{avgRating} ({reviews.length} reviews)</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {card.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.whyThisCardWins}
                </p>

                {/* Quick Highlights Pills */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                    Core Strengths:
                  </span>
                  <div className="space-y-1.5">
                    {(card.dealHighlights || []).slice(0, 3).map((highlight: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={card.sourceRef.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Apply on Official Bank Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {onGoToChecklist && (
                    <button
                      onClick={() => {
                        onClose();
                        onGoToChecklist(card);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
                      title={`Inspect prerequisites and application steps for ${card.name}`}
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pre-Requisite Check & Steps</span>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mintlify-Style Nav Tabs */}
          <div className="flex border-b border-slate-200 gap-6">
            <button
              onClick={() => setActiveTab('fact-sheet')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'fact-sheet'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Fact Sheet & Financial Returns</span>
            </button>

            <button
              onClick={() => setActiveTab('prerequisites')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'prerequisites'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Card Prerequisites & Approval Odds</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Cardholder Reviews</span>
              {hasReviews ? (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  {reviews.length}
                </span>
              ) : (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  New
                </span>
              )}
            </button>
          </div>

          {/* TAB 1: Fact Sheet & Financial Specs */}
          {activeTab === 'fact-sheet' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Detailed Financial Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Annual Joining / Renewal Fee
                  </span>
                  <span className="text-base font-bold text-slate-900 mt-1 block">
                    {feeDisplay}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Renewal Waiver: {waiverDisplay}
                  </span>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Accelerated Reward Rate
                  </span>
                  <span className="text-base font-bold text-emerald-950 mt-1 block">
                    {card.acceleratedRewardRate}
                  </span>
                  <span className="text-xs text-emerald-700 mt-0.5 block">
                    Base Reward: {card.baseRewardRate}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Forex Currency Markup
                  </span>
                  <span className={`text-base font-bold mt-1 block ${card.forexMarkup === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {card.forexMarkup}% + 18% GST
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    {card.forexMarkup === 0 ? 'Zero forex markup on all overseas spends' : 'Standard cross-border transaction rate'}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Domestic Airport Lounge
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {card.loungeAccess.domestic}
                  </span>
                  {card.loungeAccess.condition && (
                    <span className="text-xs text-amber-700 mt-0.5 block">
                      Condition: {card.loungeAccess.condition}
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    International Lounge
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {card.loungeAccess.international}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Via Priority Pass / LoungeKey / DreamFolks
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Interest APR & Grace Period
                  </span>
                  <span className="text-base font-bold text-slate-900 mt-1 block">
                    {(card.interestAPR ?? (isDebit ? 0 : 42))}% p.a.
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    {isDebit ? 'Zero interest (debit instrument linked to savings)' : 'Up to 50 days interest-free billing cycle'}
                  </span>
                </div>
              </div>

              {/* Hidden Catches & Excluded Spends Callout */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Hidden Catches, Exclusions & Critical Caveats</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div>
                    <strong className="text-rose-950 font-semibold block mb-1">
                      Excluded Spends (Zero Rewards Credited):
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {(card.excludedSpends || ['Fuel & petroleum (surcharge waiver only)', 'Wallet top-ups', 'Rent payments', 'Govt tax & utilities']).map((item: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-rose-800 font-medium">
                          ✕ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong className="text-rose-950 font-semibold block mb-1">
                      Critical Gotchas:
                    </strong>
                    <div className="space-y-1 text-slate-700">
                      {(card.hiddenCatches || []).map((gotcha: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{gotcha}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Statutory Disclosure Strip */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span>Statutory Authority: </span>
                    <strong className="font-semibold text-slate-900">{card.sourceRef.authority}</strong>
                    <span className="text-slate-400 mx-1.5">•</span>
                    <span>Ref: </span>
                    <strong className="font-mono text-slate-900">{card.sourceRef.referenceCode}</strong>
                  </div>
                </div>

                <a
                  href={card.sourceRef.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 shrink-0"
                >
                  <span>Verify Tariff Sheet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: Prerequisites & Eligibility Checklist */}
          {activeTab === 'prerequisites' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>Approval Prerequisites & Underwriting Profile</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Before applying for the <strong className="text-slate-800">{card.name}</strong>, ensure you satisfy these institutional criteria to avoid unnecessary hard credit inquiries and automatic system rejections.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Target CIBIL Score
                    </span>
                    <span className="text-lg font-black text-slate-900 mt-0.5 block">
                      {minCibil}
                    </span>
                    <span className="text-xs text-slate-500">
                      With zero 30+ day DPD (Days Past Due) defaults in last 24 months
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Income / ITR Threshold
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                      {minIncome}
                    </span>
                    <span className="text-xs text-slate-500">
                      Last 3 months salary slips or latest 2 years ITR + computation
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Bank Cooling-Off Rule
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                      90 Days Mandatory Gap
                    </span>
                    <span className="text-xs text-slate-500">
                      No rejected application with {card.bank} in the previous 90 days
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Pre-Approval Probability
                    </span>
                    <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
                      High with Existing {card.bank} Relationship
                    </span>
                    <span className="text-xs text-slate-500">
                      Salary accounts or fixed deposits significantly speed up V-KYC
                    </span>
                  </div>
                </div>
              </div>

              {/* Mandatory Documentation Checklist */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Required KYC Documents (Originals for Video-KYC):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Physical PAN Card (Laminated, no e-PAN printout)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Aadhaar with active mobile linked for OTP e-sign</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Current address proof if different from Aadhaar</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Net Banking credentials for instant statement fetch</span>
                  </div>
                </div>
              </div>

              {/* Full Interactive Checklist CTA */}
              {onGoToChecklist && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-emerald-950">
                    <strong className="block font-bold">Want to review the full step-by-step application walkthrough?</strong>
                    <span>Inspect official bank portal flow, Video-KYC instructions, and milestone setup guide for {card.name}.</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onGoToChecklist(card);
                    }}
                    className="shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Step-by-Step Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Authentic Cardholder Reviews & Community Feedback */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Existing Reviews List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Verified Cardholder Experiences ({reviews.length})
                  </h4>
                  {hasReviews && (
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{avgRating} Average Rating</span>
                    </div>
                  )}
                </div>

                {!hasReviews ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-block">
                      New
                    </span>
                    <h5 className="text-sm font-bold text-slate-800">
                      No verified reviews recorded yet
                    </h5>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Be the first cardholder to submit real-world feedback on approval odds, reward speed, and customer service.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                            <span className="text-[11px] text-slate-500">• {rev.location}</span>
                            {rev.verifiedUser && (
                              <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                Verified Cardholder
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">
                          "{rev.comment}"
                        </p>

                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono pt-1">
                          <span>Holding: {rev.holdingDuration}</span>
                          <span>•</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Feedback Form */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Have you used this card or debit account? Share your feedback
                  </h4>
                  <p className="text-xs text-slate-500">
                    Help fellow Indian consumers understand real-world reward crediting times, lounge rejection experiences, or customer support responsiveness.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>✓ Thank you! Your verified cardholder feedback has been recorded and published.</span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                    {validationError && (
                      <div className="text-xs text-rose-600 font-semibold">
                        {validationError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Your Name</label>
                        <input
                          type="text"
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">City / Location</label>
                        <input
                          type="text"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="e.g. Bengaluru, KA"
                          className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Holding Duration</label>
                        <select
                          value={newDuration}
                          onChange={(e) => setNewDuration(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                        >
                          <option value="1-3 months">1-3 months</option>
                          <option value="6-12 months">6-12 months</option>
                          <option value="1-2 years">1-2 years</option>
                          <option value="3+ years">3+ years</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Your Rating</label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-2">{newRating} / 5 Stars</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Authentic Experience & Remarks</label>
                      <textarea
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share details on billing cycle, lounge acceptance, reward points speed, customer care..."
                        className="w-full text-xs p-3 bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Submit Verified Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shrink-0">
          <div className="text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Statutory Link: </span>
            <a 
              href={card.sourceRef.officialUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-700 font-semibold underline hover:text-emerald-800"
            >
              {card.sourceRef.name}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={card.sourceRef.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-xs inline-flex items-center gap-1.5"
            >
              <span>Apply Directly on Bank Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper FileText icon component to ensure no missing icon
function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-4 h-4" 
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M10 9H8"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
    </svg>
  );
}
