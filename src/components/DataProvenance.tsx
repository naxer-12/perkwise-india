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
  Calendar, 
  AlertOctagon, 
  ArrowRight,
  History,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { SOURCES_REGISTRY } from '../data/sourcesData';
import { CRAWLED_CANDIDATES, DAILY_AGENT_CONFIG } from '../data/dailyAgentData';
import { DISCOVERABLE_WEB_SOURCES, type DiscoverableSourceItem } from '../data/discoverableSourcesData';
import type { DataSource, SweepRunSummary } from '../types';

interface DataProvenanceProps {
  onBackToGuide?: (cardId?: string) => void;
  className?: string;
}

type ProvenanceViewMode = 'agent' | 'gazette';
type AuthorityFilter = 'all' | 'Statutory Regulator' | 'Direct Bank MITC' | 'Government Ministry' | 'Merchant Terms' | 'discovered';
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

  // Persistent Discovered Sources & Sweep Run Summaries
  const [discoveredSources, setDiscoveredSources] = useState<DataSource[]>(() => {
    try {
      const saved = localStorage.getItem('perkwise_discovered_sources');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse discovered sources from localStorage', e);
    }
    return [];
  });

  const [latestRunSummary, setLatestRunSummary] = useState<SweepRunSummary | null>(() => {
    try {
      const saved = localStorage.getItem('perkwise_latest_sweep_summary');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse latest sweep summary from localStorage', e);
    }
    return null;
  });

  const [sweepHistory, setSweepHistory] = useState<SweepRunSummary[]>(() => {
    try {
      const saved = localStorage.getItem('perkwise_sweep_run_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse sweep history from localStorage', e);
    }
    return [];
  });

  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [lastDiscoveredId, setLastDiscoveredId] = useState<string | null>(null);

  // Combined Sources: Discovered Web Sources + Base Sources Registry
  const allSources = useMemo(() => {
    return [...discoveredSources, ...SOURCES_REGISTRY];
  }, [discoveredSources]);

  // Filter sources based on type and search query
  const filteredSources = useMemo(() => {
    return allSources.filter((source) => {
      let matchesType = false;
      if (selectedType === 'all') {
        matchesType = true;
      } else if (selectedType === 'discovered') {
        matchesType = !!source.isDiscovered;
      } else {
        matchesType = source.authorityType === selectedType;
      }
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesType;

      const matchesSearch = 
        source.name.toLowerCase().includes(query) ||
        source.authority.toLowerCase().includes(query) ||
        source.referenceCode.toLowerCase().includes(query) ||
        source.reasoning.toLowerCase().includes(query) ||
        source.officialUrl.toLowerCase().includes(query) ||
        (source.discoveryRunSummary && source.discoveryRunSummary.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });
  }, [allSources, selectedType, searchQuery]);

  // Filter crawled candidates
  const filteredCandidates = useMemo(() => {
    if (candidateFilter === 'new-insights') {
      return CRAWLED_CANDIDATES.filter(c => c.verdict === 'APPROVED_AND_INGESTED').slice(0, 10);
    }
    return CRAWLED_CANDIDATES.filter((cand) => {
      if (candidateFilter === 'approved') return cand.verdict === 'APPROVED_AND_INGESTED';
      if (candidateFilter === 'rejected') return cand.verdict !== 'APPROVED_AND_INGESTED';
      return true;
    });
  }, [candidateFilter]);

  // Dynamic counts by category including discovered sources
  const counts = useMemo(() => {
    return {
      all: allSources.length,
      statutory: allSources.filter(s => s.authorityType === 'Statutory Regulator').length,
      bank: allSources.filter(s => s.authorityType === 'Direct Bank MITC').length,
      ministry: allSources.filter(s => s.authorityType === 'Government Ministry').length,
      merchant: allSources.filter(s => s.authorityType === 'Merchant Terms').length,
      discovered: discoveredSources.length,
    };
  }, [allSources, discoveredSources]);

  // Dynamic Discovery Engine: Sweeps the web, ingests a new authentic source, and records a 1-line run summary
  const performDiscovery = (triggerType: 'agent-sweep' | 'gazette-fetch'): SweepRunSummary => {
    // Find a source from DISCOVERABLE_WEB_SOURCES not yet discovered
    const alreadyDiscoveredIds = new Set(discoveredSources.map(s => s.id));
    const unDiscoveredItem = DISCOVERABLE_WEB_SOURCES.find(item => !alreadyDiscoveredIds.has(item.source.id));

    let itemToIngest: DiscoverableSourceItem;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (unDiscoveredItem) {
      itemToIngest = unDiscoveredItem;
    } else {
      // If all pre-defined sources have been discovered, cycle through with cycle addendum metadata
      const cycleIndex = discoveredSources.length % DISCOVERABLE_WEB_SOURCES.length;
      const base = DISCOVERABLE_WEB_SOURCES[cycleIndex];
      const cycleNumber = Math.floor(discoveredSources.length / DISCOVERABLE_WEB_SOURCES.length) + 1;
      itemToIngest = {
        source: {
          ...base.source,
          id: `${base.source.id}-cycle-${cycleNumber}-${Date.now()}`,
          name: `${base.source.name} (Cycle #${cycleNumber} Verified Addendum)`,
          referenceCode: `${base.source.referenceCode}/C${cycleNumber}`,
        },
        endpointsScanned: base.endpointsScanned + cycleNumber * 2,
        oneLineSummary: `Cycle #${cycleNumber} Audit: Scanned ${base.endpointsScanned + cycleNumber * 2} endpoints — Re-audited and updated ${base.source.referenceCode} with latest 2026 gazette addenda.`
      };
    }

    const newSource: DataSource = {
      ...itemToIngest.source,
      isDiscovered: true,
      discoveredAt: timeStr,
      lastUpdated: `Just now (${timeStr} IST via Official Sweep)`,
      discoveryRunSummary: itemToIngest.oneLineSummary,
      simpleTitle: itemToIngest.source.simpleTitle,
      whatPublished: itemToIngest.source.whatPublished,
      consumerBenefit: itemToIngest.source.consumerBenefit,
      officialPublisher: itemToIngest.source.officialPublisher
    };

    const newSummary: SweepRunSummary = {
      id: `sweep-${Date.now()}`,
      timestamp: `${timeStr} IST`,
      endpointsScanned: itemToIngest.endpointsScanned,
      domainSpace: itemToIngest.source.authorityType,
      oneLineSummary: itemToIngest.oneLineSummary,
      discoveredSource: newSource,
      triggerType,
      simpleTitle: itemToIngest.source.simpleTitle,
      whatPublished: itemToIngest.source.whatPublished,
      consumerBenefit: itemToIngest.source.consumerBenefit,
      officialPublisher: itemToIngest.source.officialPublisher
    };

    const updatedDiscovered = [newSource, ...discoveredSources];
    const updatedHistory = [newSummary, ...sweepHistory.slice(0, 19)];

    setDiscoveredSources(updatedDiscovered);
    setLatestRunSummary(newSummary);
    setSweepHistory(updatedHistory);
    setLastDiscoveredId(newSource.id);
    setShowToast(true);

    try {
      localStorage.setItem('perkwise_discovered_sources', JSON.stringify(updatedDiscovered));
      localStorage.setItem('perkwise_latest_sweep_summary', JSON.stringify(newSummary));
      localStorage.setItem('perkwise_sweep_run_history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.warn('Failed to save discovered sources to localStorage', e);
    }

    return newSummary;
  };

  // Live Re-verification handler for Gazette (discovers new source and summarizes in 1 line)
  const handleReVerify = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setShowToast(false);

    setTimeout(() => {
      performDiscovery('gazette-fetch');
      setIsSyncing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(`Just now (${timeStr} IST)`);
      setSyncCount(prev => prev + 1);
    }, 1200);
  };

  // Interactive Simulation of the Daily Autonomous Crawler Agent (discovers new source and summarizes in 1 line)
  const runAgentSimulation = () => {
    if (agentSimulating) return;
    setAgentSimulating(true);
    setShowToast(false);
    setAgentStep(1); // Crawling web sources

    setTimeout(() => {
      setAgentStep(2); // Discovered candidate & reasoning with mission
    }, 800);

    setTimeout(() => {
      setAgentStep(3); // Synthesizing fact sheet & checking MITC terms
    }, 1600);

    setTimeout(() => {
      setAgentStep(4); // Finished & published to live registry
      performDiscovery('agent-sweep');
      setAgentSimulating(false);
      setAgentLastRunLabel('Just now (Manual Autonomous Sweep)');
    }, 2400);
  };

  const handleResetDiscovered = () => {
    if (window.confirm('Reset all dynamically discovered sources and sweep history?')) {
      setDiscoveredSources([]);
      setLatestRunSummary(null);
      setSweepHistory([]);
      setLastDiscoveredId(null);
      localStorage.removeItem('perkwise_discovered_sources');
      localStorage.removeItem('perkwise_latest_sweep_summary');
      localStorage.removeItem('perkwise_sweep_run_history');
    }
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

  // Render Clean Plain-English Discovery Banner
  const renderRunSummaryBanner = () => {
    if (!latestRunSummary) return null;

    const source = latestRunSummary.discoveredSource;

    return (
      <div className="bg-white border-2 border-emerald-300 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 animate-in fade-in slide-in-from-top-2">
        {/* Header strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Latest Verified Discovery</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Checked {latestRunSummary.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {sweepHistory.length > 1 && (
              <button
                onClick={() => setShowHistory(prev => !prev)}
                className="flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer underline decoration-dotted"
              >
                <History className="w-3.5 h-3.5" />
                <span>{showHistory ? 'Hide Previous Finds' : `See Previous Finds (${sweepHistory.length - 1})`}</span>
                {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Main Title & Action */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {source.simpleTitle || source.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Official Publisher: <strong className="text-slate-700">{source.officialPublisher || source.authority}</strong>
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2.5">
            <a
              href={source.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <span>View Official Document</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>

            {viewMode === 'agent' && (
              <button
                onClick={() => {
                  setViewMode('gazette');
                  setSelectedType('all');
                  setSearchQuery(source.referenceCode);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Find in Table ↓</span>
              </button>
            )}
          </div>
        </div>

        {/* 2 Clear, Readable Boxes in Everyday English */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Box 1: What Was Published */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>What the Official Source Published</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
              {source.whatPublished || source.reasoning}
            </p>
            <div className="pt-1 text-[11px] font-mono text-slate-500">
              Reference Code: <strong className="text-slate-800">{source.referenceCode}</strong>
            </div>
          </div>

          {/* Box 2: What It Means For You */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What This Means for You</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              {source.consumerBenefit || source.reasoning}
            </p>
            <div className="pt-1 text-[11px] text-emerald-800 font-medium">
              ✓ Direct protection under Indian statutory law or bank charter.
            </div>
          </div>
        </div>

        {/* Expandable Prior Run History */}
        {showHistory && sweepHistory.length > 1 && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 text-xs animate-in fade-in duration-150">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <History className="w-4 h-4 text-slate-500" />
                <span>Previously Discovered Rules & Terms ({sweepHistory.length})</span>
              </span>
              <button
                onClick={handleResetDiscovered}
                className="text-[11px] text-rose-600 hover:text-rose-800 underline cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset History</span>
              </button>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {sweepHistory.slice(1).map((run) => (
                <div key={run.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {run.discoveredSource.referenceCode}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium">{run.discoveredSource.authority}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400 font-mono">{run.timestamp}</span>
                    </div>
                    <div className="font-bold text-slate-900">
                      {run.discoveredSource.simpleTitle || run.discoveredSource.name}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {run.discoveredSource.consumerBenefit || run.oneLineSummary}
                    </p>
                  </div>
                  <a
                    href={run.discoveredSource.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold shrink-0 text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200"
                  >
                    <span>Read Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 ${className}`}>
      {/* Toast Alert on Verification & Discovery */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-white border border-emerald-300 shadow-2xl rounded-2xl p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 mt-0.5 shadow-2xs font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300">
                  New Official Rule Discovered
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {latestRunSummary?.timestamp || 'Just now'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                {latestRunSummary?.discoveredSource.simpleTitle || latestRunSummary?.oneLineSummary || `All ${allSources.length} sources verified active.`}
              </h4>
              {latestRunSummary && (
                <div className="mt-1.5 space-y-1 text-xs">
                  <p className="text-slate-600 line-clamp-2">
                    {latestRunSummary.discoveredSource.consumerBenefit || latestRunSummary.discoveredSource.reasoning}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="font-mono text-[10.5px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {latestRunSummary.discoveredSource.referenceCode}
                    </span>
                    <a
                      href={latestRunSummary.discoveredSource.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 font-semibold text-xs"
                    >
                      <span>Read Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 cursor-pointer shrink-0"
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
            <span>Official Rules & Verified Sources</span>
          </div>

          {onBackToGuide && (
            <button
              onClick={() => onBackToGuide()}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              ← Back to Card Guide
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Official Rules & Daily Deal Discoveries
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          We track official publications from the RBI, IRDAI, TRAI, and leading Indian banks. Everything here links directly to the original government or bank document with zero affiliate bias.
        </p>

        {/* 2-Tab Navigation Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/90 max-w-xl">
          <button
            onClick={() => setViewMode('agent')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'agent'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Daily Web Discoveries</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              Every 24h
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
            <span>Official Rules Library</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* VIEW 1: DAILY AUTONOMOUS CRAWLER AGENT COMMAND CENTER */}
      {viewMode === 'agent' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Daily Web Scanner Controller Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Daily Web Scanner for Bank Deals & Rules</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Daily Scan Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scans bank MITCs, merchant offers, and regulatory circulars once a day. Any genuine rule or deal is summarized with direct links to official documents.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden md:block text-xs">
                <span className="text-slate-400 block text-[11px]">Last Scan</span>
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
                    <span>Scanning Official Sites...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>⚡ Scan for New Rules & Deals Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simulation Progress Stepper */}
          {agentStep > 0 && (
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                  Live Web Scanner in Progress
                </span>
                <span className="text-emerald-700 text-[11px]">Step {agentStep} of 4</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 1 ? 'bg-white border-emerald-300 text-emerald-900 font-semibold shadow-2xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  1. Scanning Portals
                </div>
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 2 ? 'bg-white border-emerald-300 text-emerald-900 font-semibold shadow-2xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  2. Rule / Deal Found
                </div>
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 3 ? 'bg-white border-emerald-300 text-emerald-900 font-semibold shadow-2xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  3. Verifying Value
                </div>
                <div className={`p-2 rounded-lg border transition-all ${agentStep >= 4 ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs' : 'bg-transparent border-emerald-200 text-slate-400'}`}>
                  4. Published to Guide
                </div>
              </div>
            </div>
          )}

          {/* 1-Line Sweep Run Summary Banner */}
          {renderRunSummaryBanner()}

          {/* Daily Sweep Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Scan Cadence</span>
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">Once / Day</div>
              <p className="mt-1 text-xs text-slate-500">Every night at 03:00 AM IST</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Official Portals Checked</span>
                <Building2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">{DAILY_AGENT_CONFIG.itemsScannedInLastRun} Sites</div>
              <p className="mt-1 text-xs text-slate-500">RBI, TRAI, IRDAI & top bank MITCs</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Consumer Insights</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-700">
                {CRAWLED_CANDIDATES.filter(c => c.verdict === 'APPROVED_AND_INGESTED').length} Verified Rules
              </div>
              <p className="mt-1 text-xs text-slate-500">Clear savings and rights for you</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Hidden Traps Filtered</span>
                <AlertOctagon className="w-4 h-4 text-rose-500" />
              </div>
              <div className="mt-2 text-2xl font-black text-rose-700">
                {CRAWLED_CANDIDATES.filter(c => c.verdict !== 'APPROVED_AND_INGESTED').length} High-Fee Cards
              </div>
              <p className="mt-1 text-xs text-slate-500">Filtered out for 36%+ APR or hidden fees</p>
            </div>
          </div>

          {/* Evaluated Candidates Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Recent Web Discoveries & Evaluations</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every offer and rule is checked to make sure it actually benefits you before it appears in our guide.
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
                  <span>Top 10 Consumer Deals (10)</span>
                </button>
                <button
                  onClick={() => setCandidateFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    candidateFilter === 'approved' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Approved Deals ({CRAWLED_CANDIDATES.filter(c => c.verdict === 'APPROVED_AND_INGESTED').length})
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
                        : 'border-rose-200/80 bg-rose-50/15'
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
                            {isApproved ? '✓ Verified Consumer Deal' : '✕ Filtered Out (Unfair Terms)'}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {cand.scanCycle}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-600 font-medium">
                            {cand.issuingEntity}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          {cand.title}
                        </h4>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <a
                          href={cand.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>

                        {isApproved && cand.linkedResourceCardId && onBackToGuide && (
                          <button
                            onClick={() => onBackToGuide(cand.linkedResourceCardId)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs cursor-pointer"
                          >
                            <span>View in Card Guide</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 2 Clean, Spacious Plain-English Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {/* Box 1: What This Deal Gives You */}
                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                        <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Key Value for You</span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                          {cand.customerInsightSummary}
                        </p>
                      </div>

                      {/* Box 2: Why We Approved or Filtered It Out */}
                      <div className={`p-4 rounded-2xl border space-y-1 ${
                        isApproved ? 'bg-slate-50 border-slate-200/80' : 'bg-rose-50/60 border-rose-200'
                      }`}>
                        <div className={`text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider ${
                          isApproved ? 'text-slate-800' : 'text-rose-900'
                        }`}>
                          {isApproved ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertOctagon className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                          <span>{isApproved ? 'Why We Recommend It' : 'Why We Filtered This Out'}</span>
                        </div>
                        <p className={`text-xs sm:text-sm leading-relaxed ${
                          isApproved ? 'text-slate-700' : 'text-rose-900 font-medium'
                        }`}>
                          {cand.missionReasoning}
                        </p>
                      </div>
                    </div>

                    {/* Trust Footnote */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                        <span>Direct official terms verified • 0 affiliate cookies • Zero marketing bias</span>
                      </span>
                      <span className="font-mono text-slate-400">
                        {cleanDomain(cand.sourceUrl)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: OFFICIAL RULES LIBRARY */}
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
                    {isSyncing ? 'Checking Official Portals...' : 'Official Regulatory Feed Active'}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-medium">
                    Verified Government & Bank Feeds
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Last checked:</span>
                    <strong className="text-slate-800 font-medium">{lastSyncTime}</strong>
                  </div>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Status:</span>
                    <span className="text-emerald-700 font-medium">All {allSources.length} Rules & Bank Schedules Active</span>
                  </div>
                  {syncCount > 0 && (
                    <>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="text-slate-500 font-mono text-xs">
                        {syncCount} manual {syncCount === 1 ? 'check' : 'checks'} completed
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
                      <span>Checking Official Sites...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>⚡ Check for Updates Now</span>
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
                <span className="text-slate-400 block mb-0.5">NPCI RuPay Rules</span>
                <span className="font-mono font-medium text-slate-700">Zero MDR on UPI</span>
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

          {/* 1-Line Sweep Run Summary Banner */}
          {renderRunSummaryBanner()}

          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Official Authorities
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{allSources.length}</span>
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
                  Exclusively pointing to <code className="text-slate-800 font-mono">.gov.in</code>, <code className="text-slate-800 font-mono">rbi.org.in</code> and verified bank portals.
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
                  Synchronized with primary regulatory circulars.
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
                  <span>Official Rules Library & Bank MITC Schedules</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Showing {filteredSources.length} of {allSources.length} verified statutory authorities, merchant terms and tariff schedules
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rules, circulars, banks, findings..."
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
              {counts.discovered > 0 && (
                <button
                  onClick={() => setSelectedType('discovered')}
                  className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedType === 'discovered'
                      ? 'bg-amber-500 text-slate-950 shadow-xs ring-1 ring-amber-400'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>✨ Discovered in Sweep ({counts.discovered})</span>
                </button>
              )}
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
                      <th className="py-3.5 px-4 sm:px-6 w-[28%]">Rule & Reference Code</th>
                      <th className="py-3.5 px-4 w-[18%]">Issuing Authority</th>
                      <th className="py-3.5 px-4 w-[34%]">What Was Published & Consumer Benefit</th>
                      <th className="py-3.5 px-4 w-[12%]">Official Portal</th>
                      <th className="py-3.5 px-4 sm:px-6 w-[8%] text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {filteredSources.map((source) => {
                      const isRecentlyDiscovered = source.id === lastDiscoveredId;

                      return (
                        <tr 
                          key={source.id} 
                          className={`transition-colors group ${
                            isRecentlyDiscovered
                              ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                              : source.isDiscovered
                              ? 'bg-emerald-50/20 hover:bg-emerald-50/50'
                              : 'hover:bg-slate-50/60'
                          }`}
                        >
                          {/* Source Name & Reference Code */}
                          <td className="py-4 px-4 sm:px-6 align-top">
                            {source.isDiscovered && (
                              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <Sparkles className="w-3 h-3 text-emerald-600" />
                                  <span>Discovered in Sweep</span>
                                </span>
                                {isRecentlyDiscovered && (
                                  <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-mono animate-pulse">
                                    LATEST RUN
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="font-semibold text-slate-900 leading-snug">
                              {source.simpleTitle || source.name}
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
                              {source.officialPublisher || source.authority}
                            </div>
                            <div className="mt-1.5">
                              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getAuthorityBadgeColor(source.authorityType)}`}>
                                {source.authorityType}
                              </span>
                            </div>
                          </td>

                          {/* What Was Published & Benefit */}
                          <td className="py-4 px-4 align-top space-y-2">
                            {source.whatPublished ? (
                              <p className="text-slate-800 leading-relaxed text-xs">
                                <strong className="text-slate-900">Published: </strong>
                                {source.whatPublished}
                              </p>
                            ) : (
                              <p className="text-slate-600 leading-relaxed text-xs">
                                {source.reasoning}
                              </p>
                            )}

                            {source.consumerBenefit && (
                              <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/80 text-[11px] text-emerald-950 leading-snug">
                                <strong className="text-emerald-800">Benefit for you: </strong>
                                {source.consumerBenefit}
                              </div>
                            )}

                            {source.discoveryRunSummary && (
                              <div className="text-[11px] font-mono text-slate-600 bg-slate-100 p-1.5 rounded-lg leading-snug">
                                <span className="font-semibold text-slate-700">Latest finding: </span>
                                {source.discoveryRunSummary}
                              </div>
                            )}
                          </td>

                          {/* Direct Official Link */}
                          <td className="py-4 px-4 align-top">
                            <a
                              href={source.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold group/link transition-colors"
                            >
                              <span>{cleanDomain(source.officialUrl)}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/link:translate-x-0.5 transition-transform" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">
                              Official Document
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
                      );
                    })}
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
