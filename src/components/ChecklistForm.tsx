import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckSquare, 
  AlertTriangle, 
  Lightbulb, 
  RotateCcw, 
  Copy, 
  Check, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';
import { CHECKLIST_STAGES, CHECKLIST_ITEMS } from '../data/checklistData';
import { CREDIT_CARDS_DATA } from '../data/creditCardsData';
import type { CreditCard } from '../types';

interface ChecklistFormProps {
  onGoToGuide?: (targetCardId?: string) => void;
  targetCardId?: string | null;
  onClearTargetCard?: () => void;
  onSelectTargetCard?: (cardId: string | null) => void;
}

export const ChecklistForm: React.FC<ChecklistFormProps> = ({ 
  onGoToGuide,
  targetCardId,
  onClearTargetCard,
  onSelectTargetCard
}) => {
  // Stored state in localStorage
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('perkwise_checklist_state');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedPersona, setSelectedPersona] = useState<'all' | 'salaried' | 'self-employed' | 'students'>('all');
  const [activeStageId, setActiveStageId] = useState<number | 'all'>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Active target card details if evaluating for a specific card
  const targetCard: CreditCard | undefined = useMemo(() => {
    if (!targetCardId) return undefined;
    return CREDIT_CARDS_DATA.find(c => c.id === targetCardId);
  }, [targetCardId]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('perkwise_checklist_state', JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  // Filter items by persona and stage
  const filteredItems = CHECKLIST_ITEMS.filter(item => {
    const matchesPersona = selectedPersona === 'all' || item.applicableFor === 'all' || item.applicableFor === selectedPersona;
    const matchesStage = activeStageId === 'all' || item.stageId === activeStageId;
    return matchesPersona && matchesStage;
  });

  const totalRelevantItems = CHECKLIST_ITEMS.filter(item => 
    selectedPersona === 'all' || item.applicableFor === 'all' || item.applicableFor === selectedPersona
  );

  const completedCount = totalRelevantItems.filter(item => checkedIds.includes(item.id)).length;
  const completionPercentage = totalRelevantItems.length > 0 
    ? Math.round((completedCount / totalRelevantItems.length) * 100) 
    : 0;

  const toggleItem = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(i => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your checklist progress?')) {
      setCheckedIds([]);
    }
  };

  const handleCopyReport = () => {
    const text = `PerkWise India - Credit Card & Perks Application Readiness Report
Completion: ${completionPercentage}% (${completedCount}/${totalRelevantItems.length} items verified)
User Persona: ${selectedPersona.toUpperCase()}
Target Card: ${targetCard ? targetCard.name : 'General Credit Assessment'}

Verified Items:
${totalRelevantItems
  .filter(item => checkedIds.includes(item.id))
  .map(item => `✓ ${item.title}`)
  .join('\n')}

Pending Action Items:
${totalRelevantItems
  .filter(item => !checkedIds.includes(item.id))
  .map(item => `✗ ${item.title} (Pro-tip: ${item.proTip})`)
  .join('\n')}
    `;
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const getReadinessVerdict = () => {
    if (completionPercentage === 100) {
      return {
        label: '100% Prepared — Bulletproof Readiness',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        note: 'Your financial documents, KYC, and application timing are in pristine shape. You have the highest probability of instant digital V-KYC approval.'
      };
    }
    if (completionPercentage >= 75) {
      return {
        label: 'High Approval Probability (Ready for Submission)',
        color: 'text-teal-700 bg-teal-50 border-teal-300',
        note: 'You meet all mandatory core requirements. Review the remaining pending points to ensure a frictionless experience.'
      };
    }
    if (completionPercentage >= 50) {
      return {
        label: 'Moderate Readiness (Requires Attention)',
        color: 'text-amber-700 bg-amber-50 border-amber-300',
        note: 'Important document or credit health prerequisites remain unchecked. Resolving them first avoids unnecessary hard rejection marks.'
      };
    }
    return {
      label: 'Early Preparation Phase (Do Not Apply Yet)',
      color: 'text-rose-700 bg-rose-50 border-rose-300',
      note: 'Applying now carries high risk of automated bot rejection. Complete the Stage 1 Profile Audit and Stage 2 KYC checks first.'
    };
  };

  const verdict = getReadinessVerdict();

  // Dynamic cards qualified for based on readiness percentage
  const qualifiedCards = useMemo(() => {
    if (completionPercentage >= 85) {
      return CREDIT_CARDS_DATA.slice(0, 5);
    }
    if (completionPercentage >= 60) {
      return CREDIT_CARDS_DATA.filter(c => 
        c.id === 'phonepe-sbi-select-black' || 
        c.id === 'amazon-pay-icici' || 
        c.id === 'sbi-cashback' || 
        c.id === 'airtel-axis' ||
        c.id === 'tata-neu-infinity-rupay'
      );
    }
    if (completionPercentage >= 35) {
      return CREDIT_CARDS_DATA.filter(c => 
        c.id === 'amazon-pay-icici' || 
        c.id === 'idfc-first-wow' || 
        c.id === 'kiwi-axis-rupay' ||
        c.id === 'phonepe-sbi-select-black'
      );
    }
    return CREDIT_CARDS_DATA.filter(c => c.id === 'idfc-first-wow' || c.id === 'amazon-pay-icici');
  }, [completionPercentage]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Clean Context Action & Card Selector Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Pre-Flight Underwriting Auditor</span>
          <span className="text-slate-300">•</span>
          <span>6-Stage Institutional Verification</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium whitespace-nowrap">Audit for Card:</span>
          <select
            value={targetCardId || ''}
            onChange={(e) => onSelectTargetCard?.(e.target.value || null)}
            className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
          >
            <option value="">General Pre-requisites (All Cards)</option>
            {CREDIT_CARDS_DATA.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.bank})
              </option>
            ))}
          </select>
          {onGoToGuide && (
            <button
              onClick={() => onGoToGuide(targetCardId || undefined)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline ml-2 cursor-pointer whitespace-nowrap"
            >
              Card Guide →
            </button>
          )}
        </div>
      </div>

      {/* Target Card Specific Prerequisite Banner */}
      {targetCard && (
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white rounded-2xl p-6 border border-emerald-500/30 shadow-md animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Targeted Audit Mode
                </span>
                <span className="text-xs text-slate-400">
                  {targetCard.bank} • {targetCard.network} Network
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Eligibility Audit: {targetCard.name}
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Evaluating prerequisites for this card. Banks check automated credit score bands, address consistency, and KYC records before routing to digital underwriting.
              </p>
            </div>

            <div className="flex sm:flex-col items-end gap-2 shrink-0">
              {onClearTargetCard && (
                <button
                  onClick={onClearTargetCard}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Card</span>
                </button>
              )}
              {onGoToGuide && (
                <button
                  onClick={() => onGoToGuide(targetCard.id)}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors cursor-pointer"
                >
                  <span>View Fact Sheet</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Benchmark Chips for Target Card */}
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[11px]">Recommended CIBIL</span>
              <span className="font-bold text-emerald-400 font-mono text-sm">
                {targetCard.id === 'hdfc-infinia-metal' ? '780+' : targetCard.id === 'amazon-pay-icici' ? '710+' : '730+'}
              </span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[11px]">Fee & Waiver Spend</span>
              <span className="font-bold text-white font-mono text-sm">
                {targetCard.annualFee === 0 ? '₹0 (Lifetime Free)' : `₹${targetCard.annualFee.toLocaleString('en-IN')}`}
              </span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[11px]">Core Strength</span>
              <span className="font-bold text-white truncate block">
                {targetCard.acceleratedRewardRate.split('+')[0].trim().slice(0, 24)}
              </span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[11px]">Primary Prerequisite</span>
              <span className="font-bold text-amber-300 truncate block">
                {targetCard.id === 'phonepe-sbi-select-black' 
                  ? 'PhonePe app & Aadhaar link' 
                  : targetCard.id === 'airtel-axis' 
                  ? 'Airtel Thanks app' 
                  : 'Aadhaar-PAN mobile link'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Interactive Algorithmic Readiness Form</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Credit Card & Perks Application Readiness Checklist
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Indian scheduled banks use automated algorithmic underwriting. A single typo in your PAN name, an unlinked Aadhaar, 
          or an unverified salary slip will trigger an immediate rejection that marks your CIBIL score for 180 days.
        </p>
      </div>

      {/* Readiness Index & Progress Tracker Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Application Readiness Index
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {completionPercentage}%
              </span>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${verdict.color}`}>
                {verdict.label}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSuccess ? 'Report Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset checklist progress"
              aria-label="Reset checklist"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/80">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-medium text-slate-500">
            <span>{completedCount} of {totalRelevantItems.length} prerequisites satisfied</span>
            <span>{totalRelevantItems.length - completedCount} items pending</span>
          </div>
        </div>

        {/* Dynamic Underwriting Verdict Note */}
        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="font-semibold text-slate-800">Underwriting Assessment:</span> {verdict.note}
        </p>

        {/* Dynamic Cards You Currently Qualify For */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Cards Matching Your Current Readiness ({qualifiedCards.length} Qualified):</span>
            </span>
            <span className="text-[11px] text-slate-400">Updates as you check boxes</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {qualifiedCards.map(card => (
              <div 
                key={card.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 hover:border-emerald-300 transition-colors"
              >
                <span>{card.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {card.bank}
                </span>
                {onGoToGuide && (
                  <button
                    onClick={() => onGoToGuide(card.id)}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
                  >
                    View Guide →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Options: Persona & Stages */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        {/* Persona Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Your Profile:</span>
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'all', label: 'All Applicants' },
              { id: 'salaried', label: 'Salaried Employee' },
              { id: 'self-employed', label: 'Self-Employed / Freelancer' },
              { id: 'students', label: 'Student / Beginner' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedPersona === p.id 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stage Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">View Stage:</span>
          <select
            value={activeStageId}
            onChange={(e) => setActiveStageId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="all">All 6 Stages ({CHECKLIST_ITEMS.length} items)</option>
            {CHECKLIST_STAGES.map(s => (
              <option key={s.stageId} value={s.stageId}>
                {s.stageShortTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stage-by-Stage Checklist Items */}
      <div className="space-y-8">
        {CHECKLIST_STAGES
          .filter(stage => activeStageId === 'all' || stage.stageId === activeStageId)
          .map(stage => {
            const stageItems = filteredItems.filter(item => item.stageId === stage.stageId);
            if (stageItems.length === 0) return null;

            const stageCompletedCount = stageItems.filter(item => checkedIds.includes(item.id)).length;

            return (
              <div key={stage.stageId} className="space-y-3">
                {/* Stage Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      {stage.stageId}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {stage.stageTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {stageCompletedCount}/{stageItems.length} verified
                  </span>
                </div>
                <p className="text-xs text-slate-500">{stage.description}</p>

                {/* Items in Stage */}
                <div className="space-y-2.5">
                  {stageItems.map(item => {
                    const isChecked = checkedIds.includes(item.id);
                    const isExpanded = expandedItemId === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`rounded-xl border transition-all ${
                          isChecked 
                            ? 'bg-emerald-50/40 border-emerald-200' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="p-4 flex items-start gap-3.5">
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleItem(item.id)}
                            className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                : 'border-slate-300 hover:border-emerald-500 bg-white'
                            }`}
                            aria-label={`Mark ${item.title} as ${isChecked ? 'incomplete' : 'complete'}`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>

                          {/* Item Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div 
                                onClick={() => toggleItem(item.id)}
                                className="cursor-pointer select-none"
                              >
                                <span className={`text-sm font-semibold transition-colors ${
                                  isChecked ? 'line-through text-slate-500' : 'text-slate-900'
                                }`}>
                                  {item.title}
                                </span>
                                {item.required && (
                                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700">
                                    MANDATORY
                                  </span>
                                )}
                              </div>

                              {/* Expand Details Trigger */}
                              <button
                                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
                                aria-label="Toggle details"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>

                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Documents Needed Chip */}
                            {item.documentsNeeded && item.documentsNeeded.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                  <FileText className="w-3 h-3 text-slate-400" />
                                  <span>Required Docs:</span>
                                </span>
                                {item.documentsNeeded.map((doc, idx) => (
                                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                                    {doc}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Expanded Section: Pro Tip & Pitfall */}
                            {isExpanded && (
                              <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-150">
                                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
                                  <div className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1 mb-1">
                                    <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Insider Pro-Tip</span>
                                  </div>
                                  <p className="text-xs text-slate-700 leading-relaxed">
                                    {item.proTip}
                                  </p>
                                </div>

                                <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/80">
                                  <div className="text-[11px] font-bold text-rose-800 uppercase flex items-center gap-1 mb-1">
                                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                                    <span>Fatal Pitfall to Avoid</span>
                                  </div>
                                  <p className="text-xs text-slate-700 leading-relaxed">
                                    {item.pitfallToAvoid}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Bottom Completion Summary */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Compliance & RBI Security Guidelines</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold">
          {completionPercentage === 100 
            ? "Congratulations! You're 100% Prepared for Instant Approval" 
            : "Review Incomplete Items Before Submitting Applications"}
        </h3>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
          Remember: every rejected credit card application triggers a hard inquiry that lowers your CIBIL score 
          and enforces a 180-day cooling-off lockout. Preparing beforehand guarantees a seamless digital V-KYC experience.
        </p>

        {onGoToGuide && (
          <div className="pt-2">
            <button
              onClick={() => onGoToGuide()}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Browse Recommended Credit Cards for Your Segment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
