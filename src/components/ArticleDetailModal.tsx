import React, { useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  CheckSquare, 
  ArrowRight,
  ExternalLink,
  FileText
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import type { Article } from '../types';
import { useTranslation } from '../i18n/useTranslation';
import { getLocalizedArticle, getLocalizedCategory } from '../i18n/contentTranslations';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onGoToChecklist?: () => void;
}

const CATEGORY_MAP: Record<string, string> = {};
CATEGORIES_DATA.forEach(cat => {
  CATEGORY_MAP[cat.id] = cat.name;
});

const ARTICLE_OUTLAYS: Record<string, string> = {
  'art-cc-stacking-strategy': '₹999 - ₹1,499 / yr (Fee waivable with spend)',
  'art-hdfc-millennia-debit': '₹500 + GST / yr (Often waivable with salary/preferred tiers)',
  'art-accor-plus-luxury-stays': '₹15,000 - ₹17,000 / yr (Includes 1-2 complimentary luxury room nights)',
  'art-swiggy-one-vs-zomato-gold': '₹598 - ₹1,196 / yr (Quarterly subscriptions ₹149 - ₹299)',
  'art-bbps-utilities-cashback': '₹0 (Zero convenience fee on standard BBPS utilities)',
  'art-bpcl-octane-fuel-valueback': '₹1,499 + GST / yr (Waived on ₹2,00,000 annual spend)',
  'art-zero-forex-travel-cards': '₹0 (Lifetime Free / ₹0 annual fee options available)',
  'art-super-topup-health-insurance': '₹2,500 - ₹4,800 / yr (For ₹25L - ₹50L deductible top-up cover)',
  'art-pmjjby-pmsby-govt-welfare': '₹456 / yr (₹436 PMJJBY + ₹20 PMSBY statutory debit)',
  'art-nps-80ccd-tax-shelter': '₹1,000 / yr minimum contribution (CRA maintenance fee ~₹350/yr)',
  'art-rupay-credit-cards-upi': '₹0 - ₹1,499 / yr (Lifetime Free options available)',
  'art-times-prime-aggregator': '₹1,199 / yr (Frequently promotional at ₹899 - ₹999)',
  'art-sgb-secondary-market-guide': '₹0 management fees (Traded at spot price on NSE/BSE)',
  'art-apple-samsung-corporate-student-discounts': '₹0 (Free verification with work or .edu email)',
  'art-gst-input-tax-credit-gadgets': '₹0 (Statutory business purchase offset)',
  'art-marriott-bonvoy-free-nights': '₹3,000 + GST / yr (Includes 15,000 pt free night certificate)',
  'art-dgca-flight-delay-compensation': '₹0 (Statutory passenger right under DGCA charter)',
  'art-cibil-score-repair-blueprint': '₹0 (1 free official credit report per bureau per year by RBI mandate)'
};

function getArticleOutlay(article: Article): string {
  if (ARTICLE_OUTLAYS[article.id]) {
    return ARTICLE_OUTLAYS[article.id];
  }
  if (article.category === 'govt-schemes') return '₹0 (Statutory Citizen Scheme)';
  if (article.title.toLowerCase().includes('free') || article.annualBenefit.toLowerCase().includes('free')) return '₹0 (Zero Upfront Cost)';
  return '₹0 - ₹999 / yr (Variable or waivable)';
}

function getActionStep1(article: Article): string {
  if (article.prerequisites && article.prerequisites.length > 0) {
    return `Verify pre-qualification standards: ${article.prerequisites[0]} (ensure documents & eligibility criteria are met before applying).`;
  }
  return 'Check qualification criteria, identity documentation (PAN / Aadhaar), and eligibility thresholds before initiating application.';
}

function getActionStep2(article: Article): string {
  return `Submit application strictly via the verified official portal (${article.sourceRef.authority}). Avoid unofficial third-party brokers, SMS links, or scam aggregators.`;
}

function getActionStep3(article: Article): string {
  if (article.stepsToAvail && article.stepsToAvail.length > 0) {
    const lastStep = article.stepsToAvail[article.stepsToAvail.length - 1];
    return `Complete onboarding & activation: ${lastStep.replace(/^Step \d+:\s*/i, '')}`;
  }
  return 'Activate mandatory e-mandate / auto-debit for full payment, configure category notifications, and schedule calendar alerts to redeem accumulated value before expiration.';
}

function renderDetailedContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${elements.length}`} className="space-y-2 my-3 pl-1">
            {currentList}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="space-y-2 my-3">
            {currentList}
          </ul>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  const formatText = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={`h-${idx}`} className="text-base sm:text-lg font-bold text-slate-900 mt-5 mb-2 pb-1 border-b border-slate-100 flex items-center gap-2">
          <span>{line.replace('### ', '')}</span>
        </h4>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={`h2-${idx}`} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2 pb-1.5 border-b border-slate-200">
          {line.replace('## ', '')}
        </h3>
      );
    } else if (/^\d+\.\s/.test(line)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      const match = line.match(/^(\d+)\.\s*(.*)/);
      if (match) {
        currentList.push(
          <li key={`li-${idx}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 text-xs shrink-0 mt-0.5">{match[1]}.</span>
            <div className="flex-1">{formatText(match[2])}</div>
          </li>
        );
      }
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      const text = line.replace(/^[-*]\s*/, '');
      currentList.push(
        <li key={`li-${idx}`} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
          <div className="flex-1">{formatText(text)}</div>
        </li>
      );
    } else {
      flushList();
      elements.push(
        <p key={`p-${idx}`} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-2">
          {formatText(line)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onGoToChecklist
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [article, onClose]);

  const { t, language } = useTranslation();

  if (!article) return null;

  const localizedArticle = getLocalizedArticle(article, language);
  const rawCat = CATEGORIES_DATA.find(c => c.id === article.category);
  const categoryName = rawCat ? getLocalizedCategory(rawCat, language).shortName : (CATEGORY_MAP[article.category] || article.category);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: localizedArticle.title,
        text: localizedArticle.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/80">
              {categoryName}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('articleModal.auditedFactSheet')}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title={isBookmarked ? 'Remove bookmark' : t('articleModal.saveArticle')}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title={t('articleModal.shareArticle')}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
              title={t('articleModal.closeModal')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          {/* Article Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                {t('articleModal.auditedBenefit')}: {article.annualBenefit}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{localizedArticle.readTime}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('articleModal.updated')}: {article.lastUpdated}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs text-slate-600">
                {t('articleModal.level')}: <strong className="text-slate-800">{localizedArticle.difficulty}</strong>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {localizedArticle.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {localizedArticle.summary}
            </p>

            {/* Verified Statutory Badge with Direct Official Link */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={article.sourceRef.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('articleModal.verifiedAuthority')}: {article.sourceRef.authority}</span>
                <ExternalLink className="w-3 h-3 text-emerald-600 ml-0.5 shrink-0" />
              </a>
              <span className="text-xs text-slate-600 font-mono bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
                {t('common.circularRef')}: {article.sourceRef.referenceCode}
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                {t('articleModal.updated')}: {article.sourceRef.lastUpdated}
              </span>
            </div>
          </div>

          {/* Key Metrics Fact Sheet Table */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden text-xs sm:text-sm bg-white shadow-2xs">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                {t('articleModal.keyMetricsTable')}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {article.sourceRef.verificationStatus}
              </span>
            </div>
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="w-1/3 sm:w-1/4 bg-slate-50/60 p-3.5 font-semibold text-slate-600 align-top border-r border-slate-100">
                    {t('articleModal.programName')}
                  </td>
                  <td className="p-3.5 text-slate-900 font-bold">
                    {article.membershipOrScheme}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 sm:w-1/4 bg-slate-50/60 p-3.5 font-semibold text-slate-600 align-top border-r border-slate-100">
                    {t('articleModal.annualOutlay')}
                  </td>
                  <td className="p-3.5 text-slate-800 font-medium">
                    {getArticleOutlay(article)}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 sm:w-1/4 bg-slate-50/60 p-3.5 font-semibold text-slate-600 align-top border-r border-slate-100">
                    {t('articleModal.statutoryAuthority')}
                  </td>
                  <td className="p-3.5 text-slate-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">{article.sourceRef.authority}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-normal">
                        {article.sourceRef.authorityType}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 sm:w-1/4 bg-slate-50/60 p-3.5 font-semibold text-slate-600 align-top border-r border-slate-100">
                    {t('articleModal.referenceCircular')}
                  </td>
                  <td className="p-3.5 text-slate-800">
                    <code className="font-mono text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                      {article.sourceRef.referenceCode}
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 sm:w-1/4 bg-slate-50/60 p-3.5 font-semibold text-slate-600 align-top border-r border-slate-100">
                    {t('articleModal.auditedBenefit')}
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
                      {article.annualBenefit}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 sm:w-1/4 bg-slate-50/60 p-3.5 font-semibold text-slate-600 align-top border-r border-slate-100">
                    {t('articleModal.auditedValidity')}
                  </td>
                  <td className="p-3.5 text-slate-700">
                    {article.sourceRef.lastUpdated}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Core Takeaways & Value Checklist */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 animate-pulse-subtle" />
              <span>{t('common.keyTakeaway')}</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites & Documents Needed */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>{t('articleModal.prerequisitesTitle')}</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {article.prerequisites.map((prereq, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-snug">{prereq}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3-Step Immediate Action Plan */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>{t('articleModal.actionBlueprint')}</span>
              </h3>
              <span className="text-[11px] font-medium text-slate-500">
                Zero-friction execution protocol
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Step 1: Eligibility check */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2 flex flex-col justify-between shadow-2xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Step 1
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Eligibility check</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Eligibility & Criteria Check
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {getActionStep1(article)}
                  </p>
                </div>
              </div>

              {/* Step 2: Official digital submission portal */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2 flex flex-col justify-between shadow-2xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Step 2
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Portal Submission</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Official Digital Submission Portal
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {getActionStep2(article)}
                  </p>
                </div>
                <a
                  href={article.sourceRef.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-emerald-700 font-semibold text-xs border border-slate-200 transition-colors mt-2"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Step 3: Setup & auto-debit / redemption */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2 flex flex-col justify-between shadow-2xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Step 3
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Setup & Redemption</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Setup & Auto-Debit / Redemption
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {getActionStep3(article)}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Steps sequence */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Detailed Execution Sequence:
              </div>
              <div className="space-y-2">
                {article.stepsToAvail.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {step.replace(/^Step \d+:\s*/i, '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The Catch: Hidden Pitfalls, Fine Print & Exclusions */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2.5">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t('articleModal.criticalWarningsTitle')}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950/90">
              {article.finePrint.map((fine, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed">{fine}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* In-Depth Analytical Breakdown */}
          <div className="space-y-3 border-t border-slate-200/80 pt-6">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                {t('articleModal.deepDiveContent')}
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              {renderDetailedContent(article.detailedContent)}
            </div>
          </div>

          {/* Statutory Source Footnote with Direct Link */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('articleModal.officialCircular')}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Audited under <strong>{article.sourceRef.authority}</strong> ({article.sourceRef.authorityType}) • Circular Ref: <code className="font-mono text-slate-800 bg-slate-200/80 px-1.5 py-0.5 rounded text-[11px]">{article.sourceRef.referenceCode}</code>
              </p>
              <p className="text-[11px] text-slate-500">
                Regulatory Reasoning: {article.sourceRef.reasoning}
              </p>
            </div>
            <a
              href={article.sourceRef.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-emerald-700 font-semibold border border-slate-200 shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              <span>{t('common.officialSource')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200/80 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 truncate max-w-sm">
            {t('articleModal.programName')}: <span className="font-semibold text-slate-800">{article.membershipOrScheme}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {onGoToChecklist && (
              <button
                onClick={() => {
                  onClose();
                  onGoToChecklist();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>{t('articleModal.goToChecklist')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
