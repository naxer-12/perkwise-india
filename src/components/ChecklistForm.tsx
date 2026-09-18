import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckSquare, 
  ArrowLeft, 
  Copy, 
  Check, 
  ShieldCheck,
  ExternalLink,
  Zap,
  RotateCcw
} from 'lucide-react';
import { CREDIT_CARDS_DATA } from '../data/creditCardsData';
import type { CreditCard } from '../types';
import { CardVisual } from './CardVisual';

interface ChecklistFormProps {
  targetCardId?: string | null;
  onClearTargetCard?: () => void;
  onSelectTargetCard?: (cardId: string | null) => void;
  onGoToGuide?: (targetCardId?: string) => void;
}

export const ChecklistForm: React.FC<ChecklistFormProps> = ({ 
  targetCardId,
  onSelectTargetCard,
  onGoToGuide
}) => {
  // Default to first card if no card selected
  const activeCardId = targetCardId || 'phonepe-sbi-select-black';
  const card: CreditCard = useMemo(() => {
    return CREDIT_CARDS_DATA.find(c => c.id === activeCardId) || CREDIT_CARDS_DATA[0];
  }, [activeCardId]);

  const isDebit = card.cardType === 'debit';

  // Specific CIBIL and salary thresholds
  const targetCibil = isDebit 
    ? 'No CIBIL Required' 
    : card.annualFee >= 5000 
      ? '780+' 
      : card.annualFee >= 1000 
        ? '750+' 
        : card.id === 'idfc-first-wow'
          ? 'No CIBIL (FD-Backed)'
          : '720+';

  const minIncome = isDebit
    ? 'Average Monthly Balance (AMB) dependent on account tier'
    : card.annualFee >= 10000 
      ? '₹36 Lakhs/year ITR or ₹3,00,000/mo net salary' 
      : card.annualFee >= 3000 
        ? '₹12-15 Lakhs/year ITR or ₹1,00,000/mo net salary' 
        : '₹3.6-6 Lakhs/year ITR or ₹25,000-50,000/mo net salary';

  // Interactive Readiness Checklist IDs
  const storageKey = `perkwise_card_readiness_${card.id}`;
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync state on card change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`perkwise_card_readiness_${card.id}`);
      setCheckedIds(saved ? JSON.parse(saved) : []);
    } catch {
      setCheckedIds([]);
    }
  }, [card.id]);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(`perkwise_card_readiness_${card.id}`, JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds, card.id]);

  // Mandatory Readiness Criteria for this specific card
  const readinessChecklist = useMemo(() => {
    if (isDebit) {
      return [
        {
          id: 'account_eligibility',
          title: 'Savings / Salary Account Eligibility',
          detail: `Verify eligibility for ${card.bank} savings account variant. Maintain required initial funding and monthly AMB.`
        },
        {
          id: 'aadhaar_pan',
          title: 'Aadhaar & PAN Seeding',
          detail: 'Aadhaar must be linked to PAN with active mobile number for UIDAI OTP e-KYC.'
        },
        {
          id: 'vkyc_setup',
          title: 'Video-KYC Setup (Camera, Light, GPS)',
          detail: 'Original physical PAN card in hand, blank paper + blue pen, clear room lighting, inside India.'
        },
        {
          id: 'initial_deposit',
          title: 'Initial Account Funding',
          detail: 'Netbanking / UPI ready for initial funding to activate debit card dispatch.'
        },
        {
          id: 'activation_perks',
          title: 'Card Milestone & Welcome Bonus',
          detail: `Activate virtual debit card in ${card.bank} app and execute first qualifying transaction within 30 days.`
        }
      ];
    }

    return [
      {
        id: 'cibil_score',
        title: `CIBIL Score Benchmark (${targetCibil})`,
        detail: `Verified credit score is ${targetCibil} with zero 30+ DPD (Days Past Due) defaults in last 24 months.`
      },
      {
        id: 'cooling_off',
        title: `90-Day Bank Cooling-Off Period with ${card.bank}`,
        detail: `Confirm you have had no rejected credit card applications with ${card.bank} within the last 90 calendar days.`
      },
      {
        id: 'hard_inquiries',
        title: 'Hard Inquiries Velocity Check (< 3 in 6 Months)',
        detail: 'Fewer than 3 hard credit inquiries on your CIBIL report in the past 6 months to avoid being flagged as credit-hungry.'
      },
      {
        id: 'physical_pan',
        title: 'Original Physical PAN Card Ready for Camera',
        detail: 'Physical laminated PAN card in pristine condition (e-PAN printouts and digital photos are strictly rejected during Video-KYC).'
      },
      {
        id: 'aadhaar_otp',
        title: 'Aadhaar Linked with Active Mobile',
        detail: 'UIDAI linked mobile number is active to receive instant OTP for digital application signing.'
      },
      {
        id: 'income_documents',
        title: 'Income Proof Dossier (Unprotected PDF)',
        detail: 'Last 3 months salary slips with matching bank salary credit statements, or last 2 years ITR V + Computation of Income.'
      },
      {
        id: 'vkyc_readiness',
        title: 'Video-KYC Environment (Geo-Location & Blank Paper)',
        detail: 'Physically present within Indian territory (GPS geo-tag), white background, blank paper and pen for live signature.'
      }
    ];
  }, [card, isDebit, targetCibil]);

  const completedCount = readinessChecklist.filter(item => checkedIds.includes(item.id)).length;
  const completionPercentage = Math.round((completedCount / readinessChecklist.length) * 100);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(i => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset prerequisites checklist for this card?')) {
      setCheckedIds([]);
    }
  };

  const handleCopySummary = () => {
    const text = `PerkWise India — Application Readiness Report
Card: ${card.name} (${card.bank})
Readiness Score: ${completionPercentage}% (${completedCount}/${readinessChecklist.length} prerequisites satisfied)
Target CIBIL: ${targetCibil}
Min Income / ITR: ${minIncome}
Bank Cooling Period: 90 Days Mandatory
Official Bank Apply URL: ${card.sourceRef.officialUrl}
Statutory Reference: ${card.sourceRef.referenceCode}`;
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onGoToGuide?.(card.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Card Buying Guide</span>
          </button>

          <div className="text-xs text-slate-500 hidden md:flex items-center gap-1.5">
            <span>Card Guide</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">{card.bank}</span>
            <span>/</span>
            <span className="text-emerald-700 font-semibold truncate max-w-[200px]">{card.name}</span>
          </div>
        </div>

        {/* Card Switcher Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium whitespace-nowrap">Switch Card:</span>
          <select
            value={card.id}
            onChange={(e) => onSelectTargetCard?.(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-800 text-xs focus:outline-hidden focus:border-emerald-500 shadow-2xs"
          >
            {CREDIT_CARDS_DATA.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.bank})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Card Context Showcase Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Card Visual on the Left */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-[260px] h-[160px]">
              <CardVisual card={card} variant="thumbnail" interactive={false} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2">
              Statutory MITC: {card.sourceRef.referenceCode}
            </span>
          </div>

          {/* Card Context & Key Parameters on the Right */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Targeted Application Blueprint
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-semibold">{card.bank}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-semibold">{card.network} Network</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Prerequisites & Application Steps: {card.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {card.whyThisCardWins}
              </p>
            </div>

            {/* 4 Crucial Institutional Underwriting Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Target CIBIL</span>
                <span className="text-emerald-400 font-black text-sm mt-0.5 block">{targetCibil}</span>
                <span className="text-[10px] text-slate-400">Zero 30+ DPD defaults</span>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Income / ITR</span>
                <span className="text-white font-bold text-xs mt-0.5 block truncate" title={minIncome}>{minIncome.split('(')[0]}</span>
                <span className="text-[10px] text-slate-400">3 mos payslip / 2 yr ITR</span>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Cooling Period</span>
                <span className="text-amber-300 font-bold text-xs mt-0.5 block">90 Days Mandatory</span>
                <span className="text-[10px] text-slate-400">No rejection in 90 days</span>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Annual Fee</span>
                <span className="text-white font-bold text-xs mt-0.5 block">
                  {card.annualFee === 0 ? '₹0 (Lifetime Free)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
                </span>
                <span className="text-[10px] text-slate-400">Waiver: {card.feeWaiverSpend === 'None' ? 'None' : typeof card.feeWaiverSpend === 'number' ? `₹${card.feeWaiverSpend/100000}L spend` : card.feeWaiverSpend}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Readiness Score & Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Application Readiness Score
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {completionPercentage}%
              </span>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                completionPercentage === 100 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : completionPercentage >= 70
                    ? 'bg-teal-50 text-teal-800 border-teal-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {completionPercentage === 100 
                  ? '✓ 100% Prepared — High Digital Approval Odds' 
                  : completionPercentage >= 70 
                    ? 'Good Readiness — Review Pending Items' 
                    : 'Action Needed Before Applying'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSuccess ? 'Report Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset checklist"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-medium text-slate-500">
            <span>{completedCount} of {readinessChecklist.length} prerequisites verified</span>
            <span>{readinessChecklist.length - completedCount} items remaining</span>
          </div>
        </div>

        {/* Interactive Checks List */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
            Mandatory Institutional Prerequisites Checklist:
          </span>

          <div className="grid grid-cols-1 gap-2">
            {readinessChecklist.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-300/30'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                    isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-300'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complete Step-by-Step Application Walkthrough */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Application Protocol</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            5-Step Frictionless Application & V-KYC Walkthrough
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Follow this sequential protocol to pass algorithmic screening and complete digital onboarding in under 15 minutes.
          </p>
        </div>

        {/* The 5 Sequential Steps */}
        <div className="space-y-4">
          {/* STEP 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Institutional Eligibility & CIBIL Pre-Screen
                </h3>
                <span className="text-xs text-slate-500 font-medium">Verify credit parameters before submitting personal data</span>
              </div>
            </div>

            <div className="text-xs text-slate-700 space-y-2 leading-relaxed pl-11">
              <p>
                <strong>Credit Score Guardrail:</strong> {card.bank} algorithms check your CIBIL score automatically. For <strong className="text-slate-900">{card.name}</strong>, ensure your score is at least <strong>{targetCibil}</strong>. A single 30+ day DPD in the last 24 months triggers manual underwriting or outright rejection.
              </p>
              <p>
                <strong>Hard Inquiry Velocity:</strong> Ensure you have fewer than 3 hard credit inquiries across all banks in the previous 6 months. Multiple concurrent applications flag you as "credit-hungry" in credit bureau algorithms.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Mandatory Document & Financial Dossier Assembly
                </h3>
                <span className="text-xs text-slate-500 font-medium">Prepare unencrypted PDFs and physical cards beforehand</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-11 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Identity & Address KYC</strong>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li>Original physical laminated PAN card (original required for camera).</li>
                  <li>Aadhaar card with active linked mobile number for OTP e-Sign.</li>
                  <li>Current address proof if staying in rented premises.</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-1">Income Proof</strong>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li><strong>Salaried:</strong> Latest 3 months salary slips with matching salary credit bank statement.</li>
                  <li><strong>Self-Employed:</strong> Last 2 years ITR acknowledgement + Computation of Income.</li>
                  <li><strong>Account Aggregator (AA):</strong> NetBanking credentials for 60s digital fetch.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Bank-Specific Rules & 90-Day Cooling-Off Window
                </h3>
                <span className="text-xs text-slate-500 font-medium">Underwriting policies enforced by {card.bank}</span>
              </div>
            </div>

            <div className="text-xs text-slate-700 space-y-2 leading-relaxed pl-11">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Crucial Bank Rule:</strong> {card.bank} enforces a strict 90-day cooling-off rule. If an application was rejected within the last 90 days, re-applying now will cause an instant automated system rejection and register a wasted hard inquiry.
              </div>
              <p>
                <strong>Pincode Blacklist Check:</strong> Ensure your current residential and office pincode is serviceable by {card.bank}. Applying from unserviceable non-metro pincodes often results in automated cancellation.
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Digital Portal Submission & Video-KYC (V-KYC) Call
                </h3>
                <span className="text-xs text-slate-500 font-medium">The live identity and camera verification process</span>
              </div>
            </div>

            <div className="text-xs text-slate-700 space-y-2.5 leading-relaxed pl-11">
              <p>
                Access the official bank portal link (provided below). Enter your mobile number, PAN, and address exactly as printed on official records. Avoid using nicknames or varying initials.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">During the Video-KYC Call with the Bank Executive:</strong>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li><strong>Geo-Location Verification:</strong> Bank systems verify your GPS coordinates. You must be physically inside India with VPN turned off.</li>
                  <li><strong>Physical PAN Inspection:</strong> Hold the original PAN card up to the rear/front camera when instructed.</li>
                  <li><strong>Live Signature:</strong> Sign in real-time on a blank white paper with blue/black pen while the camera records.</li>
                  <li><strong>Basic Security Questions:</strong> You will be asked your Date of Birth, Father’s Name, and current employer name.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                5
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Post-Approval Activation & Joining Bonus Optimization
                </h3>
                <span className="text-xs text-slate-500 font-medium">Claim welcome benefits and adhere to RBI security mandate</span>
              </div>
            </div>

            <div className="text-xs text-slate-700 space-y-2 leading-relaxed pl-11">
              <p>
                <strong>Virtual Card Access:</strong> Upon V-KYC approval, your virtual card details are generated within 24-48 hours inside the {card.bank} mobile app. Physical card is dispatched via Speed Post / Blue Dart in 3-5 working days.
              </p>
              <p>
                <strong>RBI Master Direction Requirement:</strong> Under RBI/2022-23/92, cards are issued with online and contactless transactions disabled by default. You must log in to the bank app and manually enable online transactions within 30 days, or the card will be deactivated.
              </p>
              <p>
                <strong>Claiming Joining Benefit:</strong> Make a qualifying purchase (e.g. ₹500 - ₹2,000) within 30 days to receive your joining benefit: <strong className="text-emerald-700">{card.joiningBenefit}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Action Bottom Callout */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Ready to Submit Your Application</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Apply on {card.bank} Official Portal
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Proceed directly to the bank’s official underwriting portal. Zero affiliate commissions, zero spam calls, and 100% direct bank processing under RBI regulations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => onGoToGuide?.(card.id)}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
          >
            ← Back to Guide
          </button>

          <a
            href={card.sourceRef.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Proceed to Official Bank Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
