import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  CreditCard as CardIcon, 
  Sliders, 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Save, 
  ExternalLink, 
  Search, 
  ToggleLeft, 
  ToggleRight, 
  RefreshCw, 
  Info, 
  Radio, 
  Download, 
  Upload, 
  Globe, 
  Server
} from 'lucide-react';
import { CREDIT_CARD_SEGMENTS } from '../data/creditCardsData';
import type { CreditCard, DataSource, SiteConfig } from '../types';
import { 
  getSiteConfig, 
  saveSiteConfig, 
  resetSiteConfig, 
  getAllCards, 
  publishCard, 
  deleteCustomCard, 
  toggleCardActiveStatus,
  syncWithBackend
} from '../utils/cardStorage';
import { 
  API_BASE_URL, 
  checkBackendHealth, 
  broadcastUpdate
} from '../utils/api';
import { CardVisual } from '../components/CardVisual';
import { DataProvenance } from '../components/DataProvenance';

type AdminTab = 'cards' | 'site-controls' | 'official-rules' | 'bridge';

export const AdminApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('cards');
  const [siteConfig, setSiteConfigState] = useState<SiteConfig>(getSiteConfig);
  const [cardsList, setCardsList] = useState<CreditCard[]>(getAllCards);
  const [cardSearch, setCardSearch] = useState('');
  const [cardFilterSegment, setCardFilterSegment] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Connection Bridge State
  const [apiUrl, setApiUrl] = useState<string>(API_BASE_URL);
  const [frontendUrl, setFrontendUrl] = useState<string>('http://localhost:5180');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [backendPingTime, setBackendPingTime] = useState<number | null>(null);

  // Form State for Card Publishing
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formBank, setFormBank] = useState('SBI Card');
  const [formCardType, setFormCardType] = useState<'credit' | 'debit'>('credit');
  const [formNetwork, setFormNetwork] = useState<'Visa' | 'Mastercard' | 'RuPay' | 'American Express' | 'Diners Club'>('RuPay');
  const [formSegmentId, setFormSegmentId] = useState('cashback-online');
  const [formAnnualFee, setFormAnnualFee] = useState<number>(499);
  const [formFeeWaiverSpend, setFormFeeWaiverSpend] = useState('₹1,00,000 / year');
  const [formInterestAPR, setFormInterestAPR] = useState<number>(42);
  const [formForexMarkup, setFormForexMarkup] = useState<number>(3.5);
  const [formJoiningBenefit, setFormJoiningBenefit] = useState('₹500 Gift Voucher on first transaction within 30 days');
  const [formBaseRewardRate, setFormBaseRewardRate] = useState('1% cashback on all retail transactions');
  const [formAcceleratedRewardRate, setFormAcceleratedRewardRate] = useState('5% accelerated cashback on top online merchants');
  const [formWhyWins, setFormWhyWins] = useState('Exceptional flat returns with low threshold for annual fee waiver.');
  const [formRoiCalc, setFormRoiCalc] = useState('Spend ₹20,000/mo to unlock net annual benefit of ₹9,500 after fees.');
  const [formLoungeDomestic, setFormLoungeDomestic] = useState('4 visits / year (1 per calendar quarter)');
  const [formLoungeInternational, setFormLoungeInternational] = useState('None');
  const [formLoungeCondition, setFormLoungeCondition] = useState('Requires ₹50,000 spend in previous calendar quarter');
  const [formHighlights, setFormHighlights] = useState('Flat 5% online return\nDirect statement cashback credit\nZero surcharge on fuel up to ₹4,000');
  const [formCatches, setFormCatches] = useState('No reward on wallet reload\nRent payment incurs 1% fee\nMonthly accelerated cap of ₹5,000');
  const [formWhoBuy, setWhoBuy] = useState('Salaried & self-employed individuals with high online shopping spend.');
  const [formWhoAvoid, setWhoAvoid] = useState('Low spenders who cannot meet the annual spend waiver criteria.');
  const [formCustomImage, setFormCustomImage] = useState('');
  const [formApplyLink, setFormApplyLink] = useState('https://www.sbicard.com');
  const [formAuthorityName, setFormAuthorityName] = useState('Direct Bank MITC Tariff Sheet');
  const [formOfficialUrl, setFormOfficialUrl] = useState('https://www.sbicard.com');
  const [formMissionScore, setFormMissionScore] = useState<number>(92);

  // Check backend health periodically and on load
  const verifyBackend = async (urlToTest = apiUrl) => {
    setBackendStatus('checking');
    const start = performance.now();
    const result = await checkBackendHealth(urlToTest);
    const duration = Math.round(performance.now() - start);
    if (result.ok) {
      setBackendStatus('connected');
      setBackendPingTime(duration);
    } else {
      setBackendStatus('offline');
      setBackendPingTime(null);
    }
  };

  useEffect(() => {
    verifyBackend();
    const interval = setInterval(() => verifyBackend(), 15000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  // Sync cards list on storage changes
  useEffect(() => {
    const handleUpdate = () => {
      setCardsList(getAllCards());
    };
    window.addEventListener('perkwise_cards_updated', handleUpdate);
    return () => window.removeEventListener('perkwise_cards_updated', handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handlePushLive = () => {
    broadcastUpdate('bundle', {
      siteConfig,
      cards: cardsList,
      timestamp: Date.now()
    });
    showToast('🚀 Live data signal broadcasted to connected frontend!');
  };

  const handleExportBundle = async () => {
    const bundle = {
      siteConfig,
      customCards: cardsList.filter(c => c.isCustom),
      deactivatedCardIds: cardsList.filter(c => c.isPublished === false).map(c => c.id),
      exportedAt: new Date().toISOString(),
      generator: 'PerkWise Standalone Admin Panel v1.0'
    };

    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `perkwise-database-bundle-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾 Database bundle downloaded successfully.');
  };

  const handleImportBundle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.siteConfig) {
          saveSiteConfig(parsed.siteConfig);
          setSiteConfigState(parsed.siteConfig);
        }
        if (Array.isArray(parsed.customCards)) {
          localStorage.setItem('perkwise_custom_cards', JSON.stringify(parsed.customCards));
        }
        if (Array.isArray(parsed.deactivatedCardIds)) {
          localStorage.setItem('perkwise_deactivated_cards', JSON.stringify(parsed.deactivatedCardIds));
        }
        setCardsList(getAllCards());
        broadcastUpdate('bundle', parsed);
        showToast('✅ Database bundle imported and synced with frontend!');
      } catch (err: any) {
        alert('Invalid JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleSyncRemote = async () => {
    showToast('🔄 Synchronizing data from backend server...');
    const res = await syncWithBackend();
    if (res.success) {
      setCardsList(getAllCards());
      setSiteConfigState(getSiteConfig());
      showToast('✨ Synchronized successfully with backend server!');
    } else {
      showToast('⚠️ Backend sync: ' + (res.error || 'Server offline, using cached store'));
    }
  };

  const handleConfigToggle = (key: keyof SiteConfig) => {
    const updated = {
      ...siteConfig,
      [key]: !siteConfig[key]
    };
    setSiteConfigState(updated);
    saveSiteConfig(updated);
    showToast(`Updated: ${key} is now ${updated[key] ? 'ENABLED' : 'DISABLED'}`);
  };

  const handleConfigTextChange = (key: keyof SiteConfig, value: string) => {
    const updated = {
      ...siteConfig,
      [key]: value
    };
    setSiteConfigState(updated);
    saveSiteConfig(updated);
  };

  const handleResetConfig = () => {
    if (confirm('Are you sure you want to reset all site settings to default factory values?')) {
      const def = resetSiteConfig();
      setSiteConfigState(def);
      showToast('Site settings reset to default.');
    }
  };

  const handleCardToggle = (cardId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    toggleCardActiveStatus(cardId, newStatus);
    setCardsList(getAllCards());
    showToast(`Card ${newStatus ? 'published live' : 'hidden from public view'}.`);
  };

  const handleCardDelete = (cardId: string) => {
    if (confirm('Are you sure you want to delete this custom card permanently?')) {
      deleteCustomCard(cardId);
      setCardsList(getAllCards());
      showToast('Custom card deleted.');
    }
  };

  const handleEditCard = (card: CreditCard) => {
    setEditingCardId(card.id);
    setFormName(card.name);
    setFormBank(card.bank);
    setFormCardType(card.cardType || 'credit');
    setFormNetwork(card.network as any || 'RuPay');
    setFormSegmentId(card.segmentId);
    setFormAnnualFee(card.annualFee);
    setFormFeeWaiverSpend(String(card.feeWaiverSpend || ''));
    setFormInterestAPR(card.interestAPR || 42);
    setFormForexMarkup(card.forexMarkup || 3.5);
    setFormJoiningBenefit(card.joiningBenefit || '');
    setFormBaseRewardRate(card.baseRewardRate || '');
    setFormAcceleratedRewardRate(card.acceleratedRewardRate || '');
    setFormWhyWins(card.whyThisCardWins || '');
    setFormRoiCalc(card.roiCalculation || '');
    setFormLoungeDomestic(card.loungeAccess?.domestic || 'None');
    setFormLoungeInternational(card.loungeAccess?.international || 'None');
    setFormLoungeCondition(card.loungeAccess?.condition || 'Standard bank terms');
    setFormHighlights((card.dealHighlights || []).join('\n'));
    setFormCatches((card.hiddenCatches || []).join('\n'));
    setWhoBuy(card.whoShouldBuy || '');
    setWhoAvoid(card.whoShouldAvoid || '');
    setFormCustomImage(card.customImageUrl || '');
    setFormApplyLink(card.applicationLinkText || '');
    setFormAuthorityName(card.sourceRef?.authority || 'Direct Bank MITC Tariff Sheet');
    setFormOfficialUrl(card.sourceRef?.officialUrl || '');
    setFormMissionScore(card.missionScore || 92);

    setActiveTab('cards');
    window.scrollTo({ top: 300, behavior: 'smooth' });
    showToast(`Editing "${card.name}"`);
  };

  const resetForm = () => {
    setEditingCardId(null);
    setFormName('');
    setFormBank('SBI Card');
    setFormCardType('credit');
    setFormNetwork('RuPay');
    setFormSegmentId('cashback-online');
    setFormAnnualFee(499);
    setFormFeeWaiverSpend('₹1,00,000 / year');
    setFormInterestAPR(42);
    setFormForexMarkup(3.5);
    setFormJoiningBenefit('₹500 Gift Voucher on first transaction within 30 days');
    setFormBaseRewardRate('1% cashback on all retail transactions');
    setFormAcceleratedRewardRate('5% accelerated cashback on top online merchants');
    setFormWhyWins('Exceptional flat returns with low threshold for annual fee waiver.');
    setFormRoiCalc('Spend ₹20,000/mo to unlock net annual benefit of ₹9,500 after fees.');
    setFormLoungeDomestic('4 visits / year (1 per calendar quarter)');
    setFormLoungeInternational('None');
    setFormLoungeCondition('Requires ₹50,000 spend in previous calendar quarter');
    setFormHighlights('Flat 5% online return\nDirect statement cashback credit\nZero surcharge on fuel up to ₹4,000');
    setFormCatches('No reward on wallet reload\nRent payment incurs 1% fee\nMonthly accelerated cap of ₹5,000');
    setWhoBuy('Salaried & self-employed individuals with high online shopping spend.');
    setWhoAvoid('Low spenders who cannot meet the annual spend waiver criteria.');
    setFormCustomImage('');
    setFormApplyLink('https://www.sbicard.com');
    setFormAuthorityName('Direct Bank MITC Tariff Sheet');
    setFormOfficialUrl('https://www.sbicard.com');
    setFormMissionScore(92);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      alert('Card name is required.');
      return;
    }

    const cardId = editingCardId || `custom-${Date.now()}-${formName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    const sourceRef: DataSource = {
      id: `src-${cardId}`,
      name: `${formBank} ${formName} MITC Schedule`,
      authority: formAuthorityName.trim() || `${formBank} Regulatory Disclosure`,
      authorityType: formCardType === 'credit' ? 'Direct Bank MITC' : 'Statutory Regulator',
      referenceCode: `MITC-${formBank.toUpperCase().slice(0, 4)}-${new Date().getFullYear()}`,
      officialUrl: formOfficialUrl.trim() || 'https://www.rbi.org.in',
      reasoning: 'Direct bank tariff disclosure and statutory consumer return verification.',
      lastUpdated: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      verificationStatus: 'Live & Verified',
      simpleTitle: `${formBank} ${formName}`,
      whatPublished: 'Verified annual fees, waiver schedules, and reward return caps.',
      consumerBenefit: formWhyWins.trim() || 'Consumer savings and rewards optimization.',
      officialPublisher: formBank
    };

    const newCard: CreditCard = {
      id: cardId,
      name: formName.trim(),
      bank: formBank.trim(),
      cardType: formCardType,
      network: formNetwork,
      segmentId: formSegmentId,
      annualFee: Number(formAnnualFee) || 0,
      feeWaiverSpend: formFeeWaiverSpend.trim(),
      interestAPR: Number(formInterestAPR) || 42,
      forexMarkup: Number(formForexMarkup) || 3.5,
      joiningBenefit: formJoiningBenefit.trim(),
      baseRewardRate: formBaseRewardRate.trim(),
      acceleratedRewardRate: formAcceleratedRewardRate.trim(),
      whyThisCardWins: formWhyWins.trim(),
      roiCalculation: formRoiCalc.trim(),
      loungeAccess: {
        domestic: formLoungeDomestic.trim(),
        international: formLoungeInternational.trim(),
        condition: formLoungeCondition.trim()
      },
      dealHighlights: formHighlights.split('\n').map(s => s.trim()).filter(Boolean),
      hiddenCatches: formCatches.split('\n').map(s => s.trim()).filter(Boolean),
      whoShouldBuy: formWhoBuy.trim(),
      whoShouldAvoid: formWhoAvoid.trim(),
      customImageUrl: formCustomImage.trim() || undefined,
      applicationLinkText: formApplyLink.trim() || 'https://www.rbi.org.in',
      sourceRef,
      reviews: [],
      missionScore: Number(formMissionScore) || 90,
      isCustom: true,
      isPublished: true,
      publishedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    publishCard(newCard);
    setCardsList(getAllCards());
    resetForm();
    showToast(editingCardId ? `Card "${newCard.name}" updated successfully!` : `Card "${newCard.name}" published live!`);
  };

  const filteredCards = useMemo(() => {
    return cardsList.filter(card => {
      const matchSearch = 
        card.name.toLowerCase().includes(cardSearch.toLowerCase()) ||
        card.bank.toLowerCase().includes(cardSearch.toLowerCase());
      const matchSegment = cardFilterSegment === 'all' || card.segmentId === cardFilterSegment;
      return matchSearch && matchSegment;
    });
  }, [cardsList, cardSearch, cardFilterSegment]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-purple-400/30">
          <CheckCircle2 className="w-5 h-5 text-purple-200 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Command Deck */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-purple-900/40 shadow-xl">
        {/* Backend Connection Status Banner */}
        <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 font-medium text-slate-400">
                <Server className="w-3.5 h-3.5 text-purple-400" />
                <span>Backend API:</span>
                <code className="text-purple-300 font-mono bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-900/50">
                  {apiUrl}
                </code>
              </span>

              {backendStatus === 'connected' ? (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected ({backendPingTime}ms)
                </span>
              ) : backendStatus === 'checking' ? (
                <span className="inline-flex items-center gap-1 text-amber-300 font-semibold bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/60">
                  <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                  Pinging...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                  <Radio className="w-3 h-3 text-slate-500" />
                  Offline (Using Local Store)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePushLive}
                className="px-2.5 py-1 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-medium text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Send real-time broadcast signal to connected frontend"
              >
                <Radio className="w-3 h-3 text-purple-200" />
                <span>Push Live</span>
              </button>

              <button
                type="button"
                onClick={handleSyncRemote}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-[11px] transition-colors flex items-center gap-1 cursor-pointer border border-slate-700"
                title="Pull latest data from backend server"
              >
                <RefreshCw className="w-3 h-3 text-slate-400" />
                <span>Sync</span>
              </button>

              <a
                href={frontendUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-700/80 text-emerald-200 font-medium text-[11px] transition-colors flex items-center gap-1 cursor-pointer border border-emerald-700/50"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-inner">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    PerkWise Backend Admin Panel
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50">
                    Standalone Studio
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Separate administrative control panel connecting with the frontend interface
                </p>
              </div>
            </div>

            {/* Quick action: Export & Import */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportBundle}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer transition-colors"
                title="Download full database JSON bundle"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Export DB</span>
              </button>

              <label className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Import DB</span>
                <input type="file" accept=".json" onChange={handleImportBundle} className="hidden" />
              </label>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-t border-slate-800/80 pt-2 pb-2">
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'cards'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <CardIcon className="w-3.5 h-3.5" />
              <span>Card Publishing Studio</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-950/80 text-purple-200 font-mono">
                {cardsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('site-controls')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'site-controls'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Frontend Visibility Controls</span>
            </button>

            <button
              onClick={() => setActiveTab('official-rules')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'official-rules'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Rules &amp; Compliance Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('bridge')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'bridge'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Frontend Connection Bridge</span>
              <span className={`w-2 h-2 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Administrative Views */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: CARD PUBLISHING STUDIO */}
        {activeTab === 'cards' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Form Section: Add or Edit Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {editingCardId ? `Editing Card: ${formName}` : 'Publish New Credit / Debit Card'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Changes publish instantly to the backend and synchronize directly to the frontend interface.
                    </p>
                  </div>
                </div>

                {editingCardId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleFormSubmit} className="pt-6 space-y-6">
                {/* Basic Card Identifiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Card Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. SBI Cashback Card"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Bank / Issuer *
                    </label>
                    <input
                      type="text"
                      required
                      value={formBank}
                      onChange={(e) => setFormBank(e.target.value)}
                      placeholder="e.g. HDFC Bank, Axis Bank, SBI Card"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Card Type
                    </label>
                    <select
                      value={formCardType}
                      onChange={(e) => setFormCardType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Payment Network
                    </label>
                    <select
                      value={formNetwork}
                      onChange={(e) => setFormNetwork(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="RuPay">RuPay (UPI Enabled)</option>
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="American Express">American Express</option>
                      <option value="Diners Club">Diners Club</option>
                    </select>
                  </div>
                </div>

                {/* Segment & Financial Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Buying Segment
                    </label>
                    <select
                      value={formSegmentId}
                      onChange={(e) => setFormSegmentId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      {CREDIT_CARD_SEGMENTS.map(seg => (
                        <option key={seg.id} value={seg.id}>{seg.segmentTitle}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Annual Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={formAnnualFee}
                      onChange={(e) => setFormAnnualFee(Number(e.target.value))}
                      placeholder="0 for Lifetime Free"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Fee Waiver Spend Condition
                    </label>
                    <input
                      type="text"
                      value={formFeeWaiverSpend}
                      onChange={(e) => setFormFeeWaiverSpend(e.target.value)}
                      placeholder="e.g. ₹2,00,000 / year"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Forex Markup (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formForexMarkup}
                      onChange={(e) => setFormForexMarkup(Number(e.target.value))}
                      placeholder="e.g. 0 or 3.5"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Rewards & Value Engine */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Base Reward Rate
                    </label>
                    <input
                      type="text"
                      value={formBaseRewardRate}
                      onChange={(e) => setFormBaseRewardRate(e.target.value)}
                      placeholder="e.g. 1% cashback on all spends"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Accelerated Reward Rate
                    </label>
                    <input
                      type="text"
                      value={formAcceleratedRewardRate}
                      onChange={(e) => setFormAcceleratedRewardRate(e.target.value)}
                      placeholder="e.g. 5% cashback on top online merchants"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Lounge Access Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Domestic Lounges
                    </label>
                    <input
                      type="text"
                      value={formLoungeDomestic}
                      onChange={(e) => setFormLoungeDomestic(e.target.value)}
                      placeholder="e.g. 4 visits / year (1/quarter)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      International Lounges
                    </label>
                    <input
                      type="text"
                      value={formLoungeInternational}
                      onChange={(e) => setFormLoungeInternational(e.target.value)}
                      placeholder="e.g. Priority Pass with 2 free visits"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Lounge Spend Criterion
                    </label>
                    <input
                      type="text"
                      value={formLoungeCondition}
                      onChange={(e) => setFormLoungeCondition(e.target.value)}
                      placeholder="e.g. ₹50,000 spend in preceding quarter"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Statutory MITC Source & Official URL */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      MITC Authority Source
                    </label>
                    <input
                      type="text"
                      value={formAuthorityName}
                      onChange={(e) => setFormAuthorityName(e.target.value)}
                      placeholder="e.g. Direct Bank MITC Tariff Sheet"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Official MITC / Bank Disclosure URL
                    </label>
                    <input
                      type="url"
                      value={formOfficialUrl}
                      onChange={(e) => setFormOfficialUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Official Application Link
                    </label>
                    <input
                      type="url"
                      value={formApplyLink}
                      onChange={(e) => setFormApplyLink(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Submit / Reset Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingCardId ? 'Save & Push to Backend' : 'Publish Card Live'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Cards Table & Control Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Published Cards &amp; Directory ({filteredCards.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Toggle visibility to hide or show cards on the consumer frontend without deleting.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={cardSearch}
                      onChange={(e) => setCardSearch(e.target.value)}
                      placeholder="Search cards..."
                      className="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 w-44"
                    />
                  </div>

                  <select
                    value={cardFilterSegment}
                    onChange={(e) => setCardFilterSegment(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="all">All Segments</option>
                    {CREDIT_CARD_SEGMENTS.map(s => (
                      <option key={s.id} value={s.id}>{s.segmentTitle}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cards Table */}
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Card / Bank</th>
                      <th className="px-4 py-3">Segment</th>
                      <th className="px-4 py-3">Annual Fee</th>
                      <th className="px-4 py-3">Rewards / Lounges</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredCards.map((card) => {
                      const isPublished = card.isPublished !== false;
                      return (
                        <tr key={card.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                                <CardVisual card={card} variant="thumbnail" />
                              </div>
                              <div>
                                <div className="font-semibold text-white flex items-center gap-1.5">
                                  <span>{card.name}</span>
                                  {card.isCustom && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                                      Custom
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-400">{card.bank} • {card.network}</span>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                              {CREDIT_CARD_SEGMENTS.find(s => s.id === card.segmentId)?.segmentTitle.split('(')[0] || card.segmentId}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span className="font-medium text-white">
                              {card.annualFee === 0 ? '₹0 (LTF)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <div className="max-w-xs truncate text-[11px]">
                              <span className="text-emerald-400 font-medium">{card.baseRewardRate}</span>
                              {card.loungeAccess?.domestic && (
                                <span className="text-slate-400 block truncate">Lounge: {card.loungeAccess.domestic}</span>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => handleCardToggle(card.id, isPublished)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                                isPublished
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              }`}
                            >
                              {isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{isPublished ? 'Published' : 'Hidden'}</span>
                            </button>
                          </td>

                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleEditCard(card)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title="Edit card details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {card.isCustom && (
                                <button
                                  type="button"
                                  onClick={() => handleCardDelete(card.id)}
                                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
                                  title="Delete custom card"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
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
        )}

        {/* TAB 2: SITE VISIBILITY & LAYOUT CONTROLS */}
        {activeTab === 'site-controls' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Frontend Visibility &amp; Feature Toggles
                    </h2>
                    <p className="text-xs text-slate-400">
                      Enable or disable public sections of the consumer site in real-time.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetConfig}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset to Defaults</span>
                </button>
              </div>

              {/* Module Visibility Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Notification Bar */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Top Notification Ticker</span>
                    <span className="text-[11px] text-slate-400">Statutory notice banner across the header</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfigToggle('showNotificationBar')}
                    className="cursor-pointer"
                  >
                    {siteConfig.showNotificationBar ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Deals Hub */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Deals &amp; Schemes Knowledge Hub</span>
                    <span className="text-[11px] text-slate-400">Deals directory and articles repository</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfigToggle('showDealsHub')}
                    className="cursor-pointer"
                  >
                    {siteConfig.showDealsHub ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Card Guide */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Credit &amp; Debit Card Buying Guide</span>
                    <span className="text-[11px] text-slate-400">Standardized card matrix &amp; comparison</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfigToggle('showCardGuide')}
                    className="cursor-pointer"
                  >
                    {siteConfig.showCardGuide ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Finance Hacks */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Finance Hacks: Daily Operations</span>
                    <span className="text-[11px] text-slate-400">Debit cards, hotel loyalty, health hacks, govt schemes</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfigToggle('showLifeOperations')}
                    className="cursor-pointer"
                  >
                    {siteConfig.showLifeOperations ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Calculator */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Spend &amp; Net ROI Calculator</span>
                    <span className="text-[11px] text-slate-400">Mathematical savings estimator</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfigToggle('showCalculator')}
                    className="cursor-pointer"
                  >
                    {siteConfig.showCalculator ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* User Reviews */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">User Community Reviews</span>
                    <span className="text-[11px] text-slate-400">Allow community members to submit empirical card reviews</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleConfigToggle('enableUserReviews')}
                    className="cursor-pointer"
                  >
                    {siteConfig.enableUserReviews ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Editable Copy & Headlines */}
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">Live Headlines &amp; Notification Messages</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Notification Bar Message
                  </label>
                  <input
                    type="text"
                    value={siteConfig.notificationMessage || ''}
                    onChange={(e) => handleConfigTextChange('notificationMessage', e.target.value)}
                    placeholder="e.g. Zero Affiliate Bias • Verified Against Official Bank MITCs & RBI Schedules"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hero Section Headline
                  </label>
                  <input
                    type="text"
                    value={siteConfig.heroHeadline || ''}
                    onChange={(e) => handleConfigTextChange('heroHeadline', e.target.value)}
                    placeholder="e.g. Stop Leaving Money on the Table. Every Rupee, Loyalty Perk & Scheme Optimized."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hero Section Subheadline
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.heroSubheadline || ''}
                    onChange={(e) => handleConfigTextChange('heroSubheadline', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OFFICIAL RULES & COMPLIANCE AUDIT */}
        {activeTab === 'official-rules' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="mb-6 flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Official Rules &amp; Compliance Audit Studio
                    </h2>
                    <p className="text-xs text-slate-400">
                      Hidden from consumer frontend. Audits 25+ statutory schedules, automated web sweeps, and candidate discoveries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Provenance & Gazette */}
              <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 text-slate-900">
                <DataProvenance />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FRONTEND CONNECTION & DEPLOYMENT BRIDGE */}
        {activeTab === 'bridge' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Frontend Connection &amp; Cross-Site Architecture
                  </h2>
                  <p className="text-xs text-slate-400">
                    Connect this backend admin panel to the frontend interface running locally or hosted on a separate site.
                  </p>
                </div>
              </div>

              {/* Connection Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Backend API Endpoint
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                      {backendStatus === 'connected' ? `Online (${backendPingTime}ms)` : 'Offline'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      API Server URL
                    </label>
                    <input
                      type="text"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="http://localhost:3001/api or https://api.perkwise.in"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => verifyBackend(apiUrl)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Test Connection</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setApiUrl('http://localhost:3001/api'); verifyBackend('http://localhost:3001/api'); }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                    >
                      Reset to Localhost:3001
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Consumer Frontend Site Target
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                      Receiver
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Frontend URL
                    </label>
                    <input
                      type="text"
                      value={frontendUrl}
                      onChange={(e) => setFrontendUrl(e.target.value)}
                      placeholder="http://localhost:5180 or https://perkwise.in"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={frontendUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Launch Public Frontend Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Architecture Explanation Card */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-purple-400" />
                  <span>How the Separate Backend Admin Panel &amp; Frontend Interface Communicate</span>
                </h3>

                <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>1. Removed from Public Site:</strong> The public site contains zero admin controls, no admin URLs, no admin badges, and no keyboard shortcuts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>2. Separate Site Hosting:</strong> This Admin Panel is a standalone app hosted at <code>admin.html</code> or deployed to a separate subdomain (e.g. <code>admin.perkwise.in</code>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>3. Backend REST Server:</strong> The backend API server (<code>server/server.js</code> on port 3001) persists all changes into JSON database (<code>server/data/db.json</code>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>4. Real-time Live Bridge:</strong> When you publish a card or change visibility toggles, a live broadcast signal is transmitted via Server-Sent Events (SSE) and BroadcastChannel to the frontend interface, updating it without manual refreshes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
