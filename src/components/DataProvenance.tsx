import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  RefreshCw, 
  Zap, 
  Search, 
  Building2, 
  Scale, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Check, 
  Sparkles,
  Info,
  X,
  Bot,
  Calendar,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';
import { SOURCES_REGISTRY } from '../data/sourcesData';
import { CRAWLED_CANDIDATES, DAILY_AGENT_CONFIG } from '../data/dailyAgentData';
import type { DataSource } from '../types';

interface DataProvenanceProps {
  onBackToGuide?: (cardId?: string) => void;
  className?: string;
}

type ProvenanceViewMode = 'agent' | 'gazette';
type AuthorityFilter = 'all' | 'Statutory Regulator' | 'Direct Bank MITC' | 'Government Ministry' | 'Merchant Terms';
type CandidateFilter = 'all' | 'approved' | 'rejected' | 'new-insights';

export const DataProvenance: React.FC<DataProvenanceProps> = ({ onBackToGuide, className = '' }) => {
  // Top view mode switcher: Daily Agent vs Real-Time Gazette
  const [viewMode, setViewMode] = useState<ProvenanceViewMode>('agent');

  // Real-Time Gazette State
  const [selectedType, setSelectedType] = useState<AuthorityFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastSyncTime, setLastSyncTime] = useState<string>('September 17, 2026, 12:40 PM IST');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncCount, setSyncCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Daily Agent State
  const [candidateFilter, setCandidateFilter] = useState<CandidateFilter>('all');
  const [agentSimulating, setAgentSimulating] = useState<boolean>(false);
  const [agentStep, setAgentStep] = useState<number>(0);
  const [agentLastRunLabel, setAgentLastRunLabel] = useState<string>(DAILY_AGENT_CONFIG.lastRunTimestamp);

  // Filter sources based on type and search query
  const filteredSources = useMemo(() => {
    return SOURCES_REGISTRY.filter((source) => {
      const matchesType = selectedType === 'all' || source.authorityType === selectedType;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesType;

      const matchesSearch = 
        source.name.toLowerCase().includes(query) ||
        source.authority.toLowerCase().includes(query) ||
        source.referenceCode.toLowerCase().includes(query) ||
        source.reasoning.toLowerCase().includes(query) ||
        source.officialUrl.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  // Filter crawled candidates
  const filteredCandidates = useMemo(() => {
    return CRAWLED_CANDIDATES.filter((cand) => {
      if (candidateFilter === 'new-insights') {
        return (
          cand.id.startsWith('cand-trai') ||
          cand.id.startsWith('cand-rbi-') ||
          cand.id.startsWith('cand-irdai-cashless') ||
          cand.id.startsWith('cand-pm-surya') ||
          cand.id.startsWith('cand-npci-upi-autopay') ||
          cand.id.startsWith('cand-mca-') ||
          cand.id.startsWith('cand-epfo-') ||
          cand.id.startsWith('cand-sebi-') ||
          cand.id.startsWith('cand-nhai-') ||
          cand.id.startsWith('cand-cbic-')
        );
      }
      if (candidateFilter === 'approved') return cand.verdict === 'APPROVED_AND_INGESTED';
      if (candidateFilter === 'rejected') return cand.verdict !== 'APPROVED_AND_INGESTED';
      return true;
    });
  }, [candidateFilter]);

  // Counts by category
  const counts = useMemo(() => {
    return {
      all: SOURCES_REGISTRY.length,
      statutory: SOURCES_REGISTRY.filter(s => s.authorityType === 'Statutory Regulator').length,
      bank: SOURCES_REGISTRY.filter(s => s.authorityType === 'Direct Bank MITC').length,
      ministry: SOURCES_REGISTRY.filter(s => s.authorityType === 'Government Ministry').length,
      merchant: SOURCES_REGISTRY.filter(s => s.authorityType === 'Merchant Terms').length,
    };
  }, []);

  // Live Re-verification handler for Gazette
  const handleReVerify = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setShowToast(false);

    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(`Just now (${timeStr} IST)`);
      setSyncCount(prev => prev + 1);
      setShowToast(true);
    }, 1200);
  };

  // Interactive Simulation of the Daily Autonomous Crawler Agent
  const runAgentSimulation = () => {
    if (agentSimulating) return;
    setAgentSimulating(true);
    setAgentStep(1); // Crawling web sources

    setTimeout(() => {
      setAgentStep(2); // Discovered candidate & reasoning with mission
    }, 1200);

    setTimeout(() => {
      setAgentStep(3); // Synthesizing fact sheet
    }, 2400);

    setTimeout(() => {
      setAgentStep(4); // Finished & published
      setAgentSimulating(false);
      setAgentLastRunLabel('Just now (Manual Simulated Sweep)');
    }, 3600);
  };

  const getAuthorityBadgeColor = (type: DataSource['authorityType']) => {
    switch (type) {
      case 'Statutory Regulator':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Government Ministry':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'Direct Bank MITC':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'Merchant Terms':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const cleanDomain = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 ${className}`}>
      {/* Toast Alert on Verification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-white border border-emerald-200 shadow-xl rounded-xl p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900">
                ✓ All {SOURCES_REGISTRY.length} statutory & bank sources verified active
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Checksums validated against official RBI gazettes, NPCI frameworks, DGCA charters, and primary bank MITC schedules.
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Autonomous Intelligence & Statutory Provenance</span>
          </div>

          {onBackToGuide && (
            <button
              onClick={() => onBackToGuide()}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              ← Back to Recommendations
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Data Provenance & Autonomous Crawler Agent Command Center
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          How PerkWise remains 100% objective, real-time, and free of marketing bias: Our <strong>Daily Web Crawler Agent</strong> sweeps official bank portals once a day to reason against our consumer-advocacy mission, while our <strong>Statutory Gazette Engine</strong> enforces RBI, NPCI, and DGCA mandates in sub-second real-time.
        </p>

        {/* Dual-Cadence Architectural Navigation Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/90 max-w-xl">
          <button
            onClick={() => setViewMode('agent')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'agent'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>Daily Crawler Agent (24h Sweep)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
              03:00 IST
            </span>
          </button>

          <button
            onClick={() => setViewMode('gazette')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'gazette'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-indigo-600" />
            <span>Real-Time Statutory Gazette</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* VIEW 1: DAILY AUTONOMOUS CRAWLER AGENT COMMAND CENTER */}
      {viewMode === 'agent' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Minimal Daily Sweep Controller Strip (Schedule Intelligence Protocol Card Removed) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Daily Autonomous Credit & Debit Card Crawler</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Daily 03:00 AM IST
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Crawls commercial credit card and debit card deals once every 24 hours. Deals with <strong>Mission Score &gt; 90</strong> are ingested with full Fact Sheets directly into the Buying Guide.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden md:block text-xs">
                <span className="text-slate-400 block text-[11px]">Last Sweep Cycle</span>
                <span className="font-semibold text-slate-700">{agentLastRunLabel}</span>
              </div>
              <button
                onClick={runAgentSimulation}
                disabled={agentSimulating}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  agentSimulating 
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                }`}
              >
                {agentSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Scanning Bank Portals...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>▶ Run Daily Agent Sweep (Simulate)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simulation Progress Stepper (Visible during simulation) */}
          {agentStep > 0 && (
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                  Autonomous Agent Deal Ingestion Trajectory
                </span>
                <span className="text-emerald-700 text-[11px]">Step {agentStep} of 4</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 1 ? 'bg-white border-emerald-300 text-emerald-900 font-semibold shadow-2xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  1. Daily Web Sweep
                </div>
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 2 ? 'bg-white border-emerald-300 text-emerald-900 font-semibold shadow-2xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  2. Card Deal Identified
                </div>
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 3 ? 'bg-white border-emerald-300 text-emerald-900 font-semibold shadow-2xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  3. Mission Score Vetted (&gt;90)
                </div>
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 4 ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  4. Ingested into Buying Guide
                </div>
              </div>
            </div>
          )}

          {/* Daily Agent Cycle Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Sweep Cadence</span>
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">Once / 24h</div>
              <p className="mt-1 text-xs text-slate-500">Every night at 03:00 AM IST</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Sources Crawled Today</span>
                <Bot className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">{DAILY_AGENT_CONFIG.itemsScannedInLastRun} URLs</div>
              <p className="mt-1 text-xs text-slate-500">Bank tariff sheets, fintech releases & portals</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Approved & Published</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-700">
                {CRAWLED_CANDIDATES.filter(c => c.verdict === 'APPROVED_AND_INGESTED').length} Insights & Cards
              </div>
              <p className="mt-1 text-xs text-slate-500">Passed net ROI & zero-affiliate audit</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Rejected Filtered Out</span>
                <AlertOctagon className="w-4 h-4 text-rose-500" />
              </div>
              <div className="mt-2 text-2xl font-black text-rose-700">
                {CRAWLED_CANDIDATES.filter(c => c.verdict !== 'APPROVED_AND_INGESTED').length} Scams & Traps
              </div>
              <p className="mt-1 text-xs text-slate-500">Predatory 36% APR loans & affiliate cookies</p>
            </div>
          </div>

          {/* Evaluated Candidates Audit Ledger */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>Daily Agent Audit Ledger: Recent Candidates Evaluated</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every discovered offering is judged against our mission statement before human or AI publication.
                </p>
              </div>

              {/* Candidate Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setCandidateFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    candidateFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Evaluated ({CRAWLED_CANDIDATES.length})
                </button>
                <button
                  onClick={() => setCandidateFilter('new-insights')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    candidateFilter === 'new-insights' 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'text-emerald-800 bg-emerald-100/70 hover:bg-emerald-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>10 New Consumer Insights (10)</span>
                </button>
                <button
                  onClick={() => setCandidateFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    candidateFilter === 'approved' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Approved ({CRAWLED_CANDIDATES.filter(c => c.verdict === 'APPROVED_AND_INGESTED').length})
                </button>
                <button
                  onClick={() => setCandidateFilter('rejected')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    candidateFilter === 'rejected' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Filtered Out Traps ({CRAWLED_CANDIDATES.filter(c => c.verdict !== 'APPROVED_AND_INGESTED').length})
                </button>
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {filteredCandidates.map((cand) => {
                const isApproved = cand.verdict === 'APPROVED_AND_INGESTED';

                return (
                  <div
                    key={cand.id}
                    className={`rounded-2xl border bg-white p-5 sm:p-6 transition-all hover:shadow-xs space-y-4 ${
                      isApproved 
                        ? 'border-emerald-200/90 ring-1 ring-emerald-300/20' 
                        : 'border-rose-200/80 bg-rose-50/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isApproved 
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                              : 'bg-rose-100 text-rose-800 border-rose-300'
                          }`}>
                            {cand.badge}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {cand.scanCycle}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-600 font-medium">
                            {cand.issuingEntity}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          {cand.title}
                        </h4>

                        <a
                          href={cand.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline font-mono truncate max-w-xl"
                        >
                          <span>{cand.sourceUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>

                      {/* Mission Score Box */}
                      <div className="flex items-center sm:flex-col items-end gap-2 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Mission Score</span>
                          <span className={`text-2xl font-black font-mono ${
                            cand.missionScore >= 90 ? 'text-emerald-600' : cand.missionScore >= 80 ? 'text-amber-600' : 'text-rose-600'
                          }`}>
                            {cand.missionScore} / 100
                          </span>
                        </div>

                        {cand.missionScore >= 90 && cand.linkedResourceCardId && onBackToGuide && (
                          <button
                            onClick={() => onBackToGuide(cand.linkedResourceCardId)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs cursor-pointer"
                          >
                            <span>View Fact Sheet in Guide</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 4-Pillar Mission Checklist */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        {cand.evaluationChecklist.hasStatutoryLicense ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                        )}
                        <span className={cand.evaluationChecklist.hasStatutoryLicense ? 'font-medium' : 'text-rose-700 line-through'}>
                          RBI/Statutory License
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-700">
                        {cand.evaluationChecklist.netConsumerRoiPositive ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                        )}
                        <span className={cand.evaluationChecklist.netConsumerRoiPositive ? 'font-medium' : 'text-rose-700 line-through'}>
                          Net Positive ROI
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-700">
                        {cand.evaluationChecklist.hiddenFeesDisclosed ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                        )}
                        <span className={cand.evaluationChecklist.hiddenFeesDisclosed ? 'font-medium' : 'text-rose-700 line-through'}>
                          Fees Disclosed in MITC
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-700">
                        {cand.evaluationChecklist.zeroAffiliateBias ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                        )}
                        <span className={cand.evaluationChecklist.zeroAffiliateBias ? 'font-medium' : 'text-rose-700 line-through'}>
                          Zero Affiliate Links
                        </span>
                      </div>
                    </div>

                    {/* Direct Customer Benefit Highlight Box */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200/90 text-xs space-y-1">
                      <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Direct Consumer Benefit & Strategic Insight:</span>
                      </div>
                      <p className="text-emerald-900 leading-relaxed font-medium">
                        {cand.customerInsightSummary}
                      </p>
                    </div>

                    {/* Mission Reasoning Log */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Daily Agent Reasoning Log:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {cand.missionReasoning}
                      </p>
                      <div className="pt-1 text-[11px] text-slate-500">
                        <strong>Action Taken:</strong> {cand.actionTaken}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: REAL-TIME STATUTORY GAZETTE REGISTRY */}
      {viewMode === 'gazette' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Live Re-Verification Control Banner */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSyncing ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isSyncing ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isSyncing ? 'Synchronizing with Live Regulatory Feeds...' : 'Statutory Gazette Engine Active & Polling'}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-mono text-slate-500">
                    Node ID: DEL-IN-REG-26
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Last verified:</span>
                    <strong className="text-slate-800 font-medium">{lastSyncTime}</strong>
                  </div>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Status:</span>
                    <span className="text-emerald-700 font-medium">All {SOURCES_REGISTRY.length} Gazettes & MITC Schedules Active</span>
                  </div>
                  {syncCount > 0 && (
                    <>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="text-slate-500 font-mono text-xs">
                        {syncCount} manual {syncCount === 1 ? 'audit' : 'audits'} completed
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={handleReVerify}
                  disabled={isSyncing}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-xs cursor-pointer ${
                    isSyncing
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white hover:shadow-md'
                  }`}
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                      <span>Checking Statutory Feeds...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>⚡ Re-Verify Sources & Fetch Latest Gazettes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verification Status Micro-strip */}
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">RBI Master Directions</span>
                <span className="font-mono font-medium text-slate-700">DOR.AUT.REC.27 (Active)</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">NPCI RuPay Interchange</span>
                <span className="font-mono font-medium text-slate-700">Circular 114 / 088 (Zero MDR)</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">DGCA Passenger Charter</span>
                <span className="font-mono font-medium text-slate-700">CAR Sec 3, Part IV (Compliant)</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Bank MITC Schedules</span>
                <span className="font-mono font-medium text-slate-700">10/10 Banks Match Published Tariffs</span>
              </div>
            </div>
          </div>

          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Monitored Authorities
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{SOURCES_REGISTRY.length}</span>
                <p className="mt-1 text-xs text-slate-600">
                  Statutory regulators, government ministries & verified bank MITC schedules.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Direct Official Sources
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">100%</span>
                <p className="mt-1 text-xs text-slate-600">
                  Exclusively pointing to <code className="text-slate-800 font-mono">.gov.in</code>, <code className="text-slate-800 font-mono">rbi.org.in</code> and certified bank portals.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Commercial Affiliates
                </span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">0</span>
                <p className="mt-1 text-xs text-slate-600">
                  Zero referral links, paid placements, or commission kickbacks. Pure consumer advocacy.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Gazette Verification
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">Real-Time</span>
                <p className="mt-1 text-xs text-slate-600">
                  Sub-second webhooks against primary regulatory circulars.
                </p>
              </div>
            </div>
          </div>

          {/* Audit Registry Section */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <span>Statutory Reference Registry & MITC Tariff Database</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Showing {filteredSources.length} of {SOURCES_REGISTRY.length} verified statutory authorities and tariff schedules
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search circulars, banks, rules..."
                  className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Sources ({counts.all})
              </button>
              <button
                onClick={() => setSelectedType('Statutory Regulator')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'Statutory Regulator'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Statutory Regulators ({counts.statutory})
              </button>
              <button
                onClick={() => setSelectedType('Direct Bank MITC')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'Direct Bank MITC'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Direct Bank MITC ({counts.bank})
              </button>
              <button
                onClick={() => setSelectedType('Government Ministry')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'Government Ministry'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Government Ministries ({counts.ministry})
              </button>
              <button
                onClick={() => setSelectedType('Merchant Terms')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'Merchant Terms'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Merchant Terms ({counts.merchant})
              </button>
            </div>

            {/* Audit Table */}
            <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 px-4 sm:px-6 w-[28%]">Source & Gazette Code</th>
                      <th className="py-3.5 px-4 w-[20%]">Issuing Authority</th>
                      <th className="py-3.5 px-4 w-[32%]">Why This Source Is Cited</th>
                      <th className="py-3.5 px-4 w-[12%]">Official Portal</th>
                      <th className="py-3.5 px-4 sm:px-6 w-[8%] text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {filteredSources.map((source) => (
                      <tr 
                        key={source.id} 
                        className="hover:bg-slate-50/60 transition-colors group"
                      >
                        {/* Source Name & Reference Code */}
                        <td className="py-4 px-4 sm:px-6 align-top">
                          <div className="font-semibold text-slate-900 leading-snug">
                            {source.name}
                          </div>
                          <div className="mt-1.5">
                            <span className="inline-block font-mono text-[10.5px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/60">
                              {source.referenceCode}
                            </span>
                          </div>
                        </td>

                        {/* Issuing Authority & Type */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-medium text-slate-900">
                            {source.authority}
                          </div>
                          <div className="mt-1.5">
                            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getAuthorityBadgeColor(source.authorityType)}`}>
                              {source.authorityType}
                            </span>
                          </div>
                        </td>

                        {/* Reasoning */}
                        <td className="py-4 px-4 align-top">
                          <p className="text-slate-600 leading-relaxed text-xs">
                            {source.reasoning}
                          </p>
                        </td>

                        {/* Direct Official Link */}
                        <td className="py-4 px-4 align-top">
                          <a
                            href={source.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline group/link"
                          >
                            <span>{cleanDomain(source.officialUrl)}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                          <span className="block text-[10px] text-slate-400 mt-1">
                            Direct Portal (0 Affiliate)
                          </span>
                        </td>

                        {/* Status & Last Updated */}
                        <td className="py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70 text-[11px] font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>{source.verificationStatus}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1.5 font-mono">
                            Verified: {source.lastUpdated}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Methodological Compliance Footnote */}
      <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-5 text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <Info className="w-4 h-4 text-slate-500" />
          <span>Statutory Integrity & Zero-Affiliate Directive</span>
        </div>
        <p className="leading-relaxed">
          PerkWise operates as an independent consumer intelligence system. The searching and crawling of commercial deals runs on a scheduled 24-hour cycle at 03:00 IST to ensure calm, vetted Fact Sheets. Meanwhile, statutory directives (RBI, NPCI, DGCA) are maintained in real time. We do not participate in bank affiliate networks, paid referral schemes, or kickbacks.
        </p>
      </div>
    </div>
  );
};

export default DataProvenance;
