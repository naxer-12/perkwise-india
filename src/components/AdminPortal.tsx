import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  Layers, 
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
  ArrowLeft,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Check,
  RefreshCw,
  Info
} from 'lucide-react';
import { CREDIT_CARD_SEGMENTS } from '../data/creditCardsData';
import { SOURCES_REGISTRY } from '../data/sourcesData';
import type { CreditCard, DataSource, SiteConfig } from '../types';
import { 
  getSiteConfig, 
  saveSiteConfig, 
  resetSiteConfig, 
  getAllCards, 
  publishCard, 
  deleteCustomCard, 
  toggleCardActiveStatus 
} from '../utils/cardStorage';
import { CardVisual } from './CardVisual';
import { DataProvenance } from './DataProvenance';

interface AdminPortalProps {
  onExitAdmin: () => void;
  onNavigateToCard?: (cardId: string) => void;
  onUpdateConfig?: (config: SiteConfig) => void;
}

type AdminTab = 'cards' | 'site-controls' | 'official-rules';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onExitAdmin,
  onNavigateToCard,
  onUpdateConfig
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('cards');
  const [siteConfig, setSiteConfigState] = useState<SiteConfig>(getSiteConfig);
  const [cardsList, setCardsList] = useState<CreditCard[]>(getAllCards);
  const [cardSearch, setCardSearch] = useState('');
  const [cardFilterSegment, setCardFilterSegment] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Quick fill sample card
  const handleFillSample = () => {
    setFormName('PhonePe SBI Card SELECT');
    setFormBank('SBI Card');
    setFormCardType('credit');
    setFormNetwork('RuPay');
    setFormSegmentId('utilities-hyperlocal');
    setFormAnnualFee(1499);
    setFormFeeWaiverSpend('₹2,00,000 / year');
    setFormInterestAPR(42);
    setFormForexMarkup(3.5);
    setFormJoiningBenefit('₹1,500 PhonePe Gift Card upon payment of joining fee');
    setFormBaseRewardRate('1% on general retail POS & e-commerce');
    setFormAcceleratedRewardRate('10% reward points on PhonePe app utility, recharge & bill payments');
    setFormWhyWins('Industry-leading 10% returns on daily utility recharges and bill payments via PhonePe.');
    setFormRoiCalc('Monthly ₹15,000 bill pay yields ₹18,000 annual rewards, exceeding fee by 12x.');
    setFormLoungeDomestic('8 visits / year (2 per quarter)');
    setFormLoungeInternational('2 visits / year (Priority Pass)');
    setFormLoungeCondition('No prior spend criteria needed');
    setFormHighlights('10% on PhonePe app bill pay\nRuPay UPI linkage enabled with 2% scan-and-pay\nComplimentary domestic & international lounge passes');
    setFormCatches('Accelerated rewards capped at ₹1,500/mo\nGovernment tax payments excluded');
    setWhoBuy('Consumers with household bill expenses (electricity, gas, broadband) over ₹10k/month.');
    setWhoAvoid('Users who pay utility bills via corporate portals or employer reimbursement.');
    setFormCustomImage('');
    setFormApplyLink('https://www.sbicard.com');
    setFormAuthorityName('Direct Bank MITC Tariff Sheet');
    setFormOfficialUrl('https://www.sbicard.com');
    setFormMissionScore(96);
    showToast('Sample card details loaded into form!');
  };

  // Reset Form
  const handleResetForm = () => {
    setEditingCardId(null);
    setFormName('');
    setFormBank('SBI Card');
    setFormCardType('credit');
    setFormNetwork('Visa');
    setFormSegmentId('cashback-online');
    setFormAnnualFee(499);
    setFormFeeWaiverSpend('₹1,00,000');
    setFormInterestAPR(42);
    setFormForexMarkup(3.5);
    setFormJoiningBenefit('');
    setFormBaseRewardRate('1% base rewards');
    setFormAcceleratedRewardRate('5% accelerated rewards');
    setFormWhyWins('');
    setFormRoiCalc('');
    setFormLoungeDomestic('None');
    setFormLoungeInternational('None');
    setFormLoungeCondition('Standard bank terms');
    setFormHighlights('');
    setFormCatches('');
    setWhoBuy('');
    setWhoAvoid('');
    setFormCustomImage('');
    setFormApplyLink('');
    setFormMissionScore(90);
  };

  // Edit an existing card
  const handleEditCard = (card: CreditCard) => {
    setEditingCardId(card.id);
    setFormName(card.name);
    setFormBank(card.bank);
    setFormCardType(card.cardType || 'credit');
    setFormNetwork(card.network);
    setFormSegmentId(card.segmentId);
    setFormAnnualFee(card.annualFee);
    setFormFeeWaiverSpend(String(card.feeWaiverSpend));
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
    setFormHighlights(card.dealHighlights?.join('\n') || '');
    setFormCatches(card.hiddenCatches?.join('\n') || '');
    setWhoBuy(card.whoShouldBuy || '');
    setWhoAvoid(card.whoShouldAvoid || '');
    setFormCustomImage(card.customImageUrl || '');
    setFormApplyLink(card.applicationLinkText || '');
    setFormAuthorityName(card.sourceRef?.authority || 'Direct Bank MITC');
    setFormOfficialUrl(card.sourceRef?.officialUrl || 'https://www.rbi.org.in');
    setFormMissionScore(card.missionScore || 90);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded "${card.name}" into editor`);
  };

  // Publish Card
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Please enter a Card Name');
      return;
    }

    const id = editingCardId || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const highlightsArray = formHighlights
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const catchesArray = formCatches
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const sourceRef: DataSource = {
      id: `src-${id}`,
      name: `${formBank} ${formName} MITC Schedule`,
      authority: formAuthorityName || `${formBank} Regulatory Disclosure`,
      authorityType: formCardType === 'credit' ? 'Direct Bank MITC' : 'Statutory Regulator',
      referenceCode: `MITC-${formBank.toUpperCase().slice(0, 4)}-${new Date().getFullYear()}`,
      officialUrl: formOfficialUrl || 'https://www.rbi.org.in',
      reasoning: 'Direct bank tariff disclosure and statutory consumer return verification.',
      lastUpdated: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      verificationStatus: 'Live & Verified',
      simpleTitle: `${formBank} ${formName}`,
      whatPublished: 'Verified annual fees, waiver schedules, and reward return caps.',
      consumerBenefit: formWhyWins || 'Consumer savings and rewards optimization.',
      officialPublisher: formBank
    };

    const newCard: CreditCard = {
      id,
      name: formName.trim(),
      bank: formBank.trim(),
      cardType: formCardType,
      network: formNetwork,
      segmentId: formSegmentId,
      annualFee: Number(formAnnualFee) || 0,
      feeWaiverSpend: isNaN(Number(formFeeWaiverSpend)) ? formFeeWaiverSpend : Number(formFeeWaiverSpend),
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
      dealHighlights: highlightsArray.length > 0 ? highlightsArray : ['Comprehensive reward rates', 'Verified fee waiver'],
      hiddenCatches: catchesArray.length > 0 ? catchesArray : ['Standard bank terms and conditions apply'],
      whoShouldBuy: formWhoBuy.trim() || 'General consumers seeking reliable financial returns.',
      whoShouldAvoid: formWhoAvoid.trim() || 'Users with non-matching spend profiles.',
      applicationLinkText: formApplyLink.trim() || 'https://www.rbi.org.in',
      sourceRef,
      reviews: [],
      missionScore: formMissionScore || 90,
      customImageUrl: formCustomImage.trim() || undefined,
      isCustom: true,
      isPublished: true,
      publishedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    publishCard(newCard);
    setCardsList(getAllCards());
    showToast(`✓ Card "${newCard.name}" published successfully! Live in buying guide.`);
    handleResetForm();
  };

  // Toggle card active/inactive
  const handleToggleCardActive = (cardId: string, currentStatus: boolean | undefined) => {
    const nextStatus = currentStatus === false ? true : false;
    toggleCardActiveStatus(cardId, nextStatus);
    setCardsList(getAllCards());
    showToast(`Card status updated: ${nextStatus ? 'Active on live site' : 'Deactivated from public view'}`);
  };

  // Delete custom card
  const handleDeleteCard = (cardId: string, cardName: string) => {
    if (window.confirm(`Are you sure you want to delete the published card "${cardName}"?`)) {
      deleteCustomCard(cardId);
      setCardsList(getAllCards());
      showToast(`Deleted "${cardName}" from database`);
      if (editingCardId === cardId) {
        handleResetForm();
      }
    }
  };

  // Save site config
  const handleSaveConfig = () => {
    saveSiteConfig(siteConfig);
    onUpdateConfig?.(siteConfig);
    showToast('✓ Site configuration saved and applied to live interface!');
  };

  // Reset site config
  const handleResetConfig = () => {
    if (window.confirm('Reset all site section toggles and text to factory defaults?')) {
      const def = resetSiteConfig();
      setSiteConfigState(def);
      onUpdateConfig?.(def);
      showToast('Site settings reset to default.');
    }
  };

  // Filtered cards for management table
  const filteredCards = useMemo(() => {
    return cardsList.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(cardSearch.toLowerCase()) || 
                          c.bank.toLowerCase().includes(cardSearch.toLowerCase()) ||
                          c.id.toLowerCase().includes(cardSearch.toLowerCase());
      const matchSegment = cardFilterSegment === 'all' || c.segmentId === cardFilterSegment;
      return matchSearch && matchSegment;
    });
  }, [cardsList, cardSearch, cardFilterSegment]);

  // Preview card object for real-time visual feedback
  const previewCard: CreditCard = useMemo(() => {
    return {
      id: editingCardId || 'preview-card',
      name: formName || 'Card Name Preview',
      bank: formBank || 'Issuing Bank',
      cardType: formCardType,
      network: formNetwork,
      segmentId: formSegmentId,
      annualFee: Number(formAnnualFee) || 0,
      feeWaiverSpend: formFeeWaiverSpend || '₹1,00,000',
      joiningBenefit: formJoiningBenefit || 'Sample joining benefit',
      baseRewardRate: formBaseRewardRate || '1% base',
      acceleratedRewardRate: formAcceleratedRewardRate || '5% accelerated',
      whyThisCardWins: formWhyWins || 'Outstanding value for targeted spends.',
      roiCalculation: formRoiCalc || 'Spend ₹20,000/mo to yield net ₹9,500/year.',
      loungeAccess: {
        domestic: formLoungeDomestic || '4 visits/yr',
        international: formLoungeInternational || 'None',
        condition: formLoungeCondition || 'Standard terms'
      },
      forexMarkup: formForexMarkup || 3.5,
      dealHighlights: formHighlights ? formHighlights.split('\n').filter(Boolean) : ['Highlight 1', 'Highlight 2'],
      hiddenCatches: formCatches ? formCatches.split('\n').filter(Boolean) : ['Catch 1'],
      whoShouldBuy: formWhoBuy || 'Target consumer group',
      whoShouldAvoid: formWhoAvoid || 'Avoid group',
      applicationLinkText: formApplyLink || '#',
      sourceRef: SOURCES_REGISTRY[0],
      reviews: [],
      missionScore: formMissionScore || 90,
      customImageUrl: formCustomImage || undefined
    };
  }, [
    editingCardId, formName, formBank, formCardType, formNetwork, formSegmentId,
    formAnnualFee, formFeeWaiverSpend, formJoiningBenefit, formBaseRewardRate,
    formAcceleratedRewardRate, formWhyWins, formRoiCalc, formLoungeDomestic,
    formLoungeInternational, formLoungeCondition, formForexMarkup, formHighlights,
    formCatches, formWhoBuy, formWhoAvoid, formApplyLink, formMissionScore, formCustomImage
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 selection:bg-purple-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Command Bar */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  PerkWise Control Deck
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-widest font-semibold">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage live sections, publish cards, and audit statutory gazettes behind the scenes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Site</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-slate-800/80 pt-1">
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'cards'
                ? 'border-purple-500 text-purple-300 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <CardIcon className="w-4 h-4 text-purple-400" />
            <span>Card Publishing Studio</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 font-mono">
              {cardsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('site-controls')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'site-controls'
                ? 'border-purple-500 text-purple-300 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>Site &amp; Component Controls</span>
          </button>

          <button
            onClick={() => setActiveTab('official-rules')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'official-rules'
                ? 'border-purple-500 text-purple-300 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Rules &amp; Gazette Crawler</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* TAB 1: CARD PUBLISHING STUDIO */}
        {activeTab === 'cards' && (
          <div className="space-y-8">
            {/* Header / Intro */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-purple-400" />
                  <span>Manual Card Publishing Studio</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Publish new credit or debit cards, configure reward formulas, specify lounge terms, and manage card availability. Every published card immediately integrates into the public buying guide, global search, and comparison models.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleFillSample}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>Fill Sample Details</span>
                </button>
                {editingCardId && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            {/* Publishing Studio Layout: Form + Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Card Form (7 cols) */}
              <form onSubmit={handlePublish} className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{editingCardId ? `Editing: ${formName}` : 'New Card Specification'}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">* Required parameters</span>
                </div>

                {/* Basic Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Card Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PhonePe SBI Card SELECT"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Issuing Bank *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SBI Card, HDFC Bank, Axis Bank"
                      value={formBank}
                      onChange={(e) => setFormBank(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Card Type *
                    </label>
                    <select
                      value={formCardType}
                      onChange={(e) => setFormCardType(e.target.value as 'credit' | 'debit')}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="credit">Credit Card</option>
                      <option value="debit">High-Yield Debit Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Payment Network *
                    </label>
                    <select
                      value={formNetwork}
                      onChange={(e) => setFormNetwork(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="RuPay">RuPay (UPI-Linked)</option>
                      <option value="American Express">American Express</option>
                      <option value="Diners Club">Diners Club</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Buying Segment *
                    </label>
                    <select
                      value={formSegmentId}
                      onChange={(e) => setFormSegmentId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      {CREDIT_CARD_SEGMENTS.map(seg => (
                        <option key={seg.id} value={seg.id}>{seg.segmentTitle}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mission / Quality Score (0–100)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formMissionScore}
                      onChange={(e) => setFormMissionScore(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Financials & Tariffs */}
                <div className="border-t border-slate-800/80 pt-4 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Financials, Fees &amp; Forex
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Annual Fee (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder="0 for Lifetime Free"
                        value={formAnnualFee}
                        onChange={(e) => setFormAnnualFee(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Fee Waiver Spend
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₹2,00,000 or Lifetime Free"
                        value={formFeeWaiverSpend}
                        onChange={(e) => setFormFeeWaiverSpend(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Forex Markup (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min={0}
                        placeholder="0 for Zero Forex"
                        value={formForexMarkup}
                        onChange={(e) => setFormForexMarkup(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Rewards & Value Equation */}
                <div className="border-t border-slate-800/80 pt-4 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Reward Mechanics &amp; Value Proposition
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Base Reward Rate
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1% on all retail POS & online"
                        value={formBaseRewardRate}
                        onChange={(e) => setFormBaseRewardRate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Accelerated Reward Rate
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5% cashback on Flipkart & Swiggy"
                        value={formAcceleratedRewardRate}
                        onChange={(e) => setFormAcceleratedRewardRate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Joining Benefit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹1,000 Amazon voucher upon paying joining fee"
                      value={formJoiningBenefit}
                      onChange={(e) => setFormJoiningBenefit(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Why This Card Wins (Mathematical thesis)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Explain the consumer advantage in clear terms..."
                      value={formWhyWins}
                      onChange={(e) => setFormWhyWins(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Net ROI Benchmark Calculation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spend ₹25,000/mo to yield net annual savings of ₹14,200"
                      value={formRoiCalc}
                      onChange={(e) => setFormRoiCalc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Lounge Access Privileges */}
                <div className="border-t border-slate-800/80 pt-4 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Lounge Access Privileges
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Domestic Lounge
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4 visits / year (1/qtr)"
                        value={formLoungeDomestic}
                        onChange={(e) => setFormLoungeDomestic(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        International Lounge
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 visits via Priority Pass"
                        value={formLoungeInternational}
                        onChange={(e) => setFormLoungeInternational(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Access Condition
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₹50k spend in previous qtr"
                        value={formLoungeCondition}
                        onChange={(e) => setFormLoungeCondition(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Highlights & Fine Print */}
                <div className="border-t border-slate-800/80 pt-4 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Highlights &amp; Hidden Fine Print (One per line)
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Deal Highlights
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Enter key perks (one per line)..."
                        value={formHighlights}
                        onChange={(e) => setFormHighlights(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Hidden Catches &amp; Exclusions
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Enter catches & caps (one per line)..."
                        value={formCatches}
                        onChange={(e) => setFormCatches(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Who Should Buy
                      </label>
                      <input
                        type="text"
                        placeholder="Profile of ideal cardholder..."
                        value={formWhoBuy}
                        onChange={(e) => setWhoBuy(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Who Should Avoid
                      </label>
                      <input
                        type="text"
                        placeholder="Profile that would lose money..."
                        value={formWhoAvoid}
                        onChange={(e) => setWhoAvoid(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Artwork & Links */}
                <div className="border-t border-slate-800/80 pt-4 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Visual Presentation &amp; Official MITC URL
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Custom Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://... (or leave blank for clean vector fallback)"
                        value={formCustomImage}
                        onChange={(e) => setFormCustomImage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Official Bank / MITC Portal Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.bank.com/mitc"
                        value={formApplyLink}
                        onChange={(e) => setFormApplyLink(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Submit Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Clear Form
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingCardId ? 'Save & Update Card Details' : 'Publish Card to Live Directory'}</span>
                  </button>
                </div>
              </form>

              {/* Live Preview Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 sticky top-32">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Public Card Preview</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                      Real-time
                    </span>
                  </div>

                  {/* Card Visual in Hero presentation */}
                  <div className="w-full bg-slate-900/80 rounded-xl p-4 flex items-center justify-center border border-slate-800 mb-4">
                    <div className="w-full max-w-[280px]">
                      <CardVisual card={previewCard} variant="thumbnail" />
                    </div>
                  </div>

                  {/* Preview Summary */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Card Name:</span>
                      <span className="font-bold text-white text-right">{previewCard.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Bank &amp; Network:</span>
                      <span className="text-slate-200">{previewCard.bank} • {previewCard.network}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Annual Fee:</span>
                      <span className="font-bold text-emerald-400">
                        {previewCard.annualFee === 0 ? '₹0 (Lifetime Free)' : `₹${previewCard.annualFee.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Segment:</span>
                      <span className="text-purple-300 font-medium capitalize">
                        {previewCard.segmentId.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <div className="border-t border-slate-800/80 pt-2.5">
                      <span className="text-slate-400 block mb-1">Accelerated Reward Rate:</span>
                      <span className="text-slate-200 font-semibold">{previewCard.acceleratedRewardRate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">ROI Benchmark:</span>
                      <span className="text-emerald-400 font-mono text-[11px]">{previewCard.roiCalculation}</span>
                    </div>
                  </div>

                  <div className="mt-5 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[11px] text-purple-200 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>
                      Clicking <strong>Publish Card</strong> writes this item directly to the active catalog. It instantly shows up in the public buying guide, search palette, and checklist generator.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Published Cards Directory Management */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Manage Card Directory &amp; Visibilities</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Total {cardsList.length} cards ({cardsList.filter(c => c.isCustom).length} custom published, {cardsList.filter(c => c.isPublished !== false).length} currently active on live site)
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search cards by name or bank..."
                      value={cardSearch}
                      onChange={(e) => setCardSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-48 sm:w-60"
                    />
                  </div>

                  <select
                    value={cardFilterSegment}
                    onChange={(e) => setCardFilterSegment(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="all">All Segments</option>
                    {CREDIT_CARD_SEGMENTS.map(s => (
                      <option key={s.id} value={s.id}>{s.segmentTitle}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cards Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3">Card &amp; Bank</th>
                      <th className="py-3 px-3">Segment &amp; Network</th>
                      <th className="py-3 px-3">Annual Fee</th>
                      <th className="py-3 px-3">Key Return</th>
                      <th className="py-3 px-3">Origin</th>
                      <th className="py-3 px-3">Live Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredCards.map((card) => {
                      const isActive = card.isPublished !== false;
                      const isCustom = Boolean(card.isCustom);

                      return (
                        <tr key={card.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-8 shrink-0 bg-slate-900 rounded overflow-hidden flex items-center justify-center p-0.5 border border-slate-800">
                                <CardVisual card={card} variant="thumbnail" />
                              </div>
                              <div>
                                <span className="font-bold text-white block">{card.name}</span>
                                <span className="text-[11px] text-slate-400">{card.bank}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="text-[11px] text-purple-300 font-medium block capitalize">
                              {card.segmentId.replace(/-/g, ' ')}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {card.network} • {card.cardType || 'credit'}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 font-semibold text-slate-200">
                            {card.annualFee === 0 ? '₹0 (LTF)' : `₹${card.annualFee.toLocaleString('en-IN')}`}
                          </td>

                          <td className="py-3.5 px-3 max-w-[200px]">
                            <span className="line-clamp-2 text-[11px] text-slate-300">
                              {card.acceleratedRewardRate}
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            {isCustom ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                Custom Published
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400">
                                Built-In
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-3">
                            <button
                              onClick={() => handleToggleCardActive(card.id, isActive)}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                              }`}
                              title={isActive ? 'Click to deactivate from public view' : 'Click to reactivate on public site'}
                            >
                              {isActive ? (
                                <>
                                  <Eye className="w-3 h-3 text-emerald-400" />
                                  <span>Active (Live)</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3 h-3 text-rose-400" />
                                  <span>Hidden</span>
                                </>
                              )}
                            </button>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleEditCard(card)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-purple-900/60 text-slate-300 hover:text-purple-200 transition-colors cursor-pointer"
                                title="Edit card details in form"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {onNavigateToCard && (
                                <button
                                  onClick={() => onNavigateToCard(card.id)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="View this card in public guide"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {isCustom && (
                                <button
                                  onClick={() => handleDeleteCard(card.id, card.name)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 transition-colors cursor-pointer"
                                  title="Delete custom card"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
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

        {/* TAB 2: SITE & COMPONENT CONTROLS */}
        {activeTab === 'site-controls' && (
          <div className="space-y-8">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  <span>Site Sections &amp; Component Control</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Enable or disable individual sections, configure hero copy, control top ticker announcements, and manage user submission flags. Changes take effect across the live app immediately upon saving.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleResetConfig}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </div>

            {/* Section Visibility Switches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Public Section Modules */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block border-b border-slate-800 pb-2">
                  Interactive Modules Visibility
                </span>

                {/* Deals Hub */}
                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <div>
                    <span className="text-xs font-bold text-white block">Deals Hub (Resource Library)</span>
                    <span className="text-[11px] text-slate-400">Shows curated consumer deals, fact sheets, and daily life guides.</span>
                  </div>
                  <button
                    onClick={() => setSiteConfigState(prev => ({ ...prev, showDealsHub: !prev.showDealsHub }))}
                    className="p-1 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {siteConfig.showDealsHub ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Card Buying Guide */}
                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <div>
                    <span className="text-xs font-bold text-white block">Credit &amp; Debit Card Buying Guide</span>
                    <span className="text-[11px] text-slate-400">The 8-segment audited card directory with visual cards and fact sheets.</span>
                  </div>
                  <button
                    onClick={() => setSiteConfigState(prev => ({ ...prev, showCardGuide: !prev.showCardGuide }))}
                    className="p-1 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {siteConfig.showCardGuide ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Savings Calculator */}
                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <div>
                    <span className="text-xs font-bold text-white block">ROI Savings Calculator (Coming Soon)</span>
                    <span className="text-[11px] text-slate-400">Controls visibility of the Spend &amp; Net ROI simulation tab.</span>
                  </div>
                  <button
                    onClick={() => setSiteConfigState(prev => ({ ...prev, showCalculator: !prev.showCalculator }))}
                    className="p-1 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {siteConfig.showCalculator ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Life Operations */}
                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <div>
                    <span className="text-xs font-bold text-white block">Life Hacks: Daily Life Operations</span>
                    <span className="text-[11px] text-slate-400">Beyond cards: dining privileges, fuel passes, and government social security.</span>
                  </div>
                  <button
                    onClick={() => setSiteConfigState(prev => ({ ...prev, showLifeOperations: !prev.showLifeOperations }))}
                    className="p-1 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {siteConfig.showLifeOperations ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* User Reviews Module */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-xs font-bold text-white block">Verified Customer Reviews &amp; Submissions</span>
                    <span className="text-[11px] text-slate-400">Allows visitors to read and submit verified Indian cardholder reviews.</span>
                  </div>
                  <button
                    onClick={() => setSiteConfigState(prev => ({ ...prev, enableUserReviews: !prev.enableUserReviews }))}
                    className="p-1 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {siteConfig.enableUserReviews ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Announcements & Banner Customization */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block border-b border-slate-800 pb-2">
                  Notification Bar &amp; Hero Copy
                </span>

                {/* Notification Bar Toggle */}
                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <div>
                    <span className="text-xs font-bold text-white block">Top Notification Bar</span>
                    <span className="text-[11px] text-slate-400">Display the dark announcement bar above the main header.</span>
                  </div>
                  <button
                    onClick={() => setSiteConfigState(prev => ({ ...prev, showNotificationBar: !prev.showNotificationBar }))}
                    className="p-1 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {siteConfig.showNotificationBar ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Custom Ticker Announcement */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Notification Bar Announcement Text
                  </label>
                  <input
                    type="text"
                    value={siteConfig.notificationMessage || ''}
                    onChange={(e) => setSiteConfigState(prev => ({ ...prev, notificationMessage: e.target.value }))}
                    placeholder="e.g. Zero Affiliate Bias • Verified Against Official Bank MITCs & RBI Schedules"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Displays alongside the "Independent &amp; Source-Backed" live pulse badge.
                  </span>
                </div>

                {/* Hero Headline */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hero Section Main Headline
                  </label>
                  <input
                    type="text"
                    value={siteConfig.heroHeadline || ''}
                    onChange={(e) => setSiteConfigState(prev => ({ ...prev, heroHeadline: e.target.value }))}
                    placeholder="Stop Leaving Money on the Table. Every Rupee, Loyalty Perk & Scheme Optimized."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Hero Subheadline */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hero Section Subheading
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.heroSubheadline || ''}
                    onChange={(e) => setSiteConfigState(prev => ({ ...prev, heroSubheadline: e.target.value }))}
                    placeholder="India’s unbiased consumer awareness repository and mathematical personal finance compendium..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveConfig}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save &amp; Apply Changes to Live Site</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: OFFICIAL RULES & GAZETTE CRAWLER (Controlled from behind!) */}
        {activeTab === 'official-rules' && (
          <div className="space-y-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Official Rules &amp; Statutory Gazette Crawler Engine</span>
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Admin Controlled
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                  This statutory verification module is completely hidden from public visitors and only accessible in this Admin Portal. Use it to audit 25+ statutory schedules, trigger automated web sweeps, discover new regulators/merchants, and inspect candidate deals before approving them.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>Crawler Schedule: Daily at 03:00 IST</span>
                </span>
              </div>
            </div>

            {/* Embedded DataProvenance Component */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-slate-900">
              <DataProvenance
                onBackToGuide={(cardId) => {
                  if (cardId && onNavigateToCard) {
                    onNavigateToCard(cardId);
                  }
                }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
