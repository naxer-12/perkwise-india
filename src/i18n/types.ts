export type LanguageCode = 'en' | 'hi' | 'gu' | 'mr' | 'ta' | 'te' | 'bn' | 'kn';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳', region: 'Pan-India / International' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'National / North & Central' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Gujarat & Global Diaspora' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Maharashtra' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu & Puducherry' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Andhra Pradesh & Telangana' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'West Bengal & East' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka' },
];

export interface TranslationSchema {
  common: {
    independent: string;
    notificationDefault: string;
    searchPlaceholder: string;
    verifiedSources: string;
    auditedCards: string;
    buyingSegments: string;
    comingSoon: string;
    soon: string;
    audited: string;
    readMore: string;
    applyNow: string;
    viewDetails: string;
    close: string;
    save: string;
    saved: string;
    clear: string;
    back: string;
    copy: string;
    copied: string;
    loading: string;
    all: string;
    resetFilters: string;
    allDifficulties: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    verifiedSheets: string;
    noResultsMatched: string;
    adjustSearchCriteria: string;
    exploreCards: string;
    selectLanguage: string;
    languageSubtitle: string;
    changeLanguage: string;
    closeLanguage: string;
    officialSource: string;
    readingTime: string;
    minsRead: string;
    minRead: string;
    keyTakeaway: string;
    sourceAuthority: string;
    circularRef: string;
    savedFactSheetsDesc: string;
  };
  nav: {
    dealsHub: string;
    cardGuide: string;
    calculator: string;
    financeHacks: string;
    savedItems: string;
    search: string;
    menu: string;
    language: string;
  };
  hero: {
    regulatoryBadge: string;
    headlinePart1: string;
    headlineGradient: string;
    subheadline: string;
    exploreGuideCta: string;
    calculateRoiCta: string;
  };
  categories: {
    all: string;
    creditCards: string;
    bankAccounts: string;
    travelHotels: string;
    healthcareInsurance: string;
    govtSchemes: string;
    utilitiesBills: string;
    foodGrocery: string;
    shoppingEcommerce: string;
  };
  cardGuide: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allSegments: string;
    annualFee: string;
    rewardRate: string;
    loungeAccess: string;
    minIncome: string;
    verifiedMitc: string;
    viewBlueprint: string;
    applyChecklist: string;
    noAnnualFee: string;
    waivable: string;
    perksAndDeals: string;
    avoidRejectionsTitle: string;
    avoidRejectionsDesc: string;
    filterAll: string;
    filterCredit: string;
    filterDebit: string;
    clickCardHint: string;
    feeWaiverSpend: string;
    whyThisCardWins: string;
    dealsAndTraps: string;
    verifiedBankMitc: string;
    readinessChecklist: string;
    applyOnline: string;
    addToCompare: string;
    compareSelected: string;
    compareCards: string;
    domesticLounge: string;
    intlLounge: string;
    superPremium: string;
    travelHotels: string;
    cashbackDaily: string;
    fuelCommute: string;
    entryLevel: string;
    fdBacked: string;
  };
  checklist: {
    title: string;
    subtitle: string;
    readinessAudit: string;
    cibilScore: string;
    minIncomeReq: string;
    kycDocuments: string;
    addressProof: string;
    approvalProbability: string;
    highProbability: string;
    moderateProbability: string;
    lowProbability: string;
    actionItemsNeeded: string;
    proTip: string;
    resetChecklist: string;
    copySummary: string;
    selectAnotherCard: string;
    returnToCardGuide: string;
  };
  financeHacks: {
    badge: string;
    title: string;
    subtitle: string;
    avgAnnualSavings: string;
    actionChecklist: string;
    verifiedRules: string;
    blueprintBanner: string;
    dailyFrictionPoint: string;
    smartSolution: string;
    highImpactPrograms: string;
    essentialOptions: string;
    roiAndBreakeven: string;
    costLabel: string;
    exploreCategoryArticles: string;
    debitCards: string;
    hotelLoyalty: string;
    groceryFood: string;
    utilitiesBills: string;
    healthWellness: string;
    govtSchemes: string;
    fuelTransit: string;
    entertainmentOtt: string;
    workspaceHardware: string;
  };
  calculator: {
    title: string;
    badge: string;
    description: string;
    whatsComing: string;
    feature1: string;
    feature2: string;
    feature3: string;
    monthlySpend: string;
    estRewards: string;
    backToCards: string;
    onlineShopping: string;
    foodDelivery: string;
    groceries: string;
    travelFlights: string;
    fuelCommute: string;
    utilitiesBills: string;
    kiranaUpi: string;
    annualSpend: string;
    netRoi: string;
    topRecommendations: string;
  };
  cardModal: {
    factSheet: string;
    prerequisites: string;
    reviews: string;
    feeWaiverAudit: string;
    loungeRules: string;
    rewardsMatrix: string;
    hiddenCatches: string;
    userReviews: string;
    applyDirectly: string;
    officialBankPortal: string;
    annualFeeHeading: string;
    waiverRule: string;
    loungeRulesHeading: string;
    rewardBenefitsHeading: string;
    whyWinsHeading: string;
    warningsHeading: string;
    officialLinkHeading: string;
    verifiedUser: string;
    submitReview: string;
    yourName: string;
    yourCity: string;
    yourExperience: string;
    shareFeedback: string;
    holdingPeriod: string;
    successFeedback: string;
    communityReviews: string;
    noReviewsYet: string;
  };
  articleModal: {
    officialCircular: string;
    verifiedAuthority: string;
    circularDate: string;
    deepDiveContent: string;
    shareArticle: string;
    saveArticle: string;
    closeModal: string;
    auditedFactSheet: string;
    auditedBenefit: string;
    level: string;
    updated: string;
    keyMetricsTable: string;
    programName: string;
    annualOutlay: string;
    statutoryAuthority: string;
    referenceCircular: string;
    auditedValidity: string;
    actionBlueprint: string;
    prerequisitesTitle: string;
    criticalWarningsTitle: string;
    readyToExecute: string;
    goToChecklist: string;
    closeFactSheet: string;
  };
  provenance: {
    title: string;
    subtitle: string;
    sourcesRegistry: string;
    rbiDirectives: string;
    updateHistory: string;
  };
  footer: {
    tagline: string;
    mission: string;
    rbiAligned: string;
    interactiveModules: string;
    keyLifeFacets: string;
    disclaimerTitle: string;
    disclaimerText: string;
    craftedFor: string;
  };
  searchModal: {
    title: string;
    placeholder: string;
    popularSearches: string;
    noResults: string;
    quickResults: string;
    allResults: string;
    creditCards: string;
    guidesAndDeals: string;
    officialSources: string;
    toNavigate: string;
    toSelect: string;
    toClose: string;
  };
}
