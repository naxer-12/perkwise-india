import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  MessageSquarePlus, 
  BadgeCheck,
  Building2
} from 'lucide-react';
import type { CreditCard, ReviewItem } from '../types';

export interface ReviewFeedbackModalProps {
  card: CreditCard | null;
  onClose: () => void;
  onAddReview?: (cardId: string, newReview: ReviewItem) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: '1/5 — Poor',
  2: '2/5 — Fair',
  3: '3/5 — Average',
  4: '4/5 — Good',
  5: '5/5 — Outstanding'
};

function loadCustomReviews(cardId?: string): ReviewItem[] {
  if (!cardId || typeof window === 'undefined') return [];
  try {
    // 1. Direct card-specific key
    const key = `perkwise_custom_reviews_${cardId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }

    // 2. Fallback to general perkwise_user_reviews map
    const allStored = localStorage.getItem('perkwise_user_reviews');
    if (allStored) {
      const parsedAll = JSON.parse(allStored);
      if (parsedAll && Array.isArray(parsedAll[cardId])) {
        return parsedAll[cardId];
      }
    }
  } catch (err) {
    console.warn('Error reading reviews from localStorage:', err);
  }
  return [];
}

export const ReviewFeedbackModal: React.FC<ReviewFeedbackModalProps> = ({
  card,
  onClose,
  onAddReview
}) => {
  const [sessionReviews, setSessionReviews] = useState<Record<string, ReviewItem[]>>({});
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [holdingDuration, setHoldingDuration] = useState('6-12 months');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Derive custom reviews for this card by combining localStorage with recent session submissions
  const customReviews = useMemo(() => {
    if (!card) return [];
    const localSaved = loadCustomReviews(card.id);
    const sessionSaved = sessionReviews[card.id] || [];
    const seenIds = new Set<string>();
    const combined: ReviewItem[] = [];

    for (const item of [...sessionSaved, ...localSaved]) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
      }
    }
    return combined;
  }, [card, sessionReviews]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (card) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [card, onClose]);

  if (!card) return null;

  // Combine custom-submitted reviews with verified seeded card reviews
  const allReviews: ReviewItem[] = [...customReviews, ...(card.reviews || [])];
  const hasReviews = allReviews.length > 0;
  const avgRating = hasReviews
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedAuthor = author.trim();
    const trimmedLocation = location.trim();
    const trimmedComment = comment.trim();

    if (!trimmedAuthor) {
      setValidationError('Please enter your full name or preferred display name.');
      return;
    }
    if (!trimmedLocation) {
      setValidationError('Please enter your city and state (e.g. Bengaluru, Karnataka).');
      return;
    }
    if (rating < 1 || rating > 5) {
      setValidationError('Please select a star rating between 1 and 5.');
      return;
    }
    if (!trimmedComment || trimmedComment.length < 10) {
      setValidationError('Please write a helpful review of at least 10 characters.');
      return;
    }

    const formattedHolding = holdingDuration.startsWith('Cardholder') || holdingDuration.startsWith('Held')
      ? holdingDuration
      : `Cardholder for ${holdingDuration}`;

    const newReview: ReviewItem = {
      id: `rev-custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      author: trimmedAuthor,
      location: trimmedLocation,
      rating,
      verifiedUser: true,
      date: new Date().toISOString().split('T')[0],
      comment: trimmedComment,
      holdingDuration: formattedHolding
    };

    // Update session state so it immediately reflects in the UI
    setSessionReviews((prev) => ({
      ...prev,
      [card.id]: [newReview, ...(prev[card.id] || [])]
    }));

    // Persist to localStorage
    try {
      const currentStored = loadCustomReviews(card.id);
      const updatedList = [newReview, ...currentStored.filter((r) => r.id !== newReview.id)];
      localStorage.setItem(`perkwise_custom_reviews_${card.id}`, JSON.stringify(updatedList));

      // Also maintain unified perkwise_user_reviews map
      const allStored = localStorage.getItem('perkwise_user_reviews');
      const allMap = allStored ? JSON.parse(allStored) : {};
      allMap[card.id] = [newReview, ...(allMap[card.id] || [])];
      localStorage.setItem('perkwise_user_reviews', JSON.stringify(allMap));
    } catch (err) {
      console.warn('Could not persist review to localStorage:', err);
    }

    // Trigger parent callback if provided
    onAddReview?.(card.id, newReview);

    // Reset form fields and trigger success notification
    setAuthor('');
    setLocation('');
    setComment('');
    setRating(5);
    setHoverRating(0);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="space-y-2 max-w-[85%]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                <Building2 className="w-3 h-3 text-slate-500" />
                {card.bank}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                {card.network}
              </span>
              
              {/* Aggregate Rating / New Badge */}
              {hasReviews ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{avgRating} / 5.0</span>
                  <span className="text-amber-700/80 font-normal">
                    ({allReviews.length} verified {allReviews.length === 1 ? 'cardholder' : 'cardholders'})
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 animate-pulse-subtle" />
                  <span>New</span>
                  <span className="text-emerald-700 font-normal hidden sm:inline">— No Verified Reviews Yet</span>
                </span>
              )}
            </div>

            <h2 id="review-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {card.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 max-h-[calc(92vh-130px)]">
          {/* Hidden Catches & Excluded Spends Reminder Box */}
          {card.hiddenCatches && card.hiddenCatches.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Hidden Catches & Excluded Spends (Community Verified)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950/85">
                {card.hiddenCatches.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews List Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Verified Cardholder Feedback ({allReviews.length})
              </h3>
            </div>

            {hasReviews ? (
              <div className="space-y-3">
                {allReviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">{rev.author}</span>
                        {rev.location && (
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {rev.location}
                          </span>
                        )}
                        {rev.verifiedUser && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Verified Cardholder
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {rev.holdingDuration && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {rev.holdingDuration}
                          </span>
                        )}
                        {rev.date && (
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        )}
                      </div>
                    </div>

                    {/* Star Rating Display */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${
                            star <= rev.rating 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-slate-200'
                          }`} 
                        />
                      ))}
                      <span className="text-xs font-semibold text-slate-700 ml-1">
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Clean Empty State with "New" Badge */
              <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <MessageSquarePlus className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 animate-pulse-subtle" />
                    <span>New Card / Scheme — No Verified Reviews Yet</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 pt-1">Be the First Cardholder to Review</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Be the first cardholder to submit real-world feedback on approval odds, reward speed, and customer service.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive User Feedback Form */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Have you used this card or membership? Share your feedback
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Share candid experiences on approval criteria, reward redemption speed, customer service, or lounge access reliability.
              </p>
            </div>

            {/* Success notification */}
            {submitSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  ✓ Thank you! Your cardholder feedback has been recorded.
                </span>
              </div>
            )}

            {/* Validation error */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Author Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Aditya Verma"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* City / Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Location <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* Holding Duration */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Holding Duration <span className="text-emerald-600">*</span>
                  </label>
                  <select
                    value={holdingDuration}
                    onChange={(e) => setHoldingDuration(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-slate-700"
                  >
                    <option value="1-3 months">1-3 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3+ years">3+ years</option>
                  </select>
                </div>

                {/* Star Rating Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Overall Rating <span className="text-emerald-600">*</span>
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`${star} out of 5 stars`}
                        className="p-1 rounded-lg hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 group"
                      >
                        <Star 
                          className={`w-5 h-5 transition-all duration-150 group-hover:scale-125 group-hover:rotate-6 active:scale-95 ${
                            (hoverRating || rating) >= star 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-slate-300'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-xs font-medium text-slate-600 ml-2">
                      {RATING_LABELS[hoverRating || rating] || `${rating}/5`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cardholder Experience & Practical Advice <span className="text-emerald-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share real-world feedback on reward crediting, lounge acceptance, fee waiver experience..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-y leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Verified Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
