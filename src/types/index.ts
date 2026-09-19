export type LifeCategory = 
  | 'credit-cards'
  | 'debit-cards'
  | 'hotel-loyalty'
  | 'grocery-food'
  | 'utilities-bills'
  | 'fuel-transit'
  | 'travel-railways'
  | 'health-wellness'
  | 'entertainment-ott'
  | 'govt-schemes'
  | 'workspace-hardware';

export interface CategoryInfo {
  id: LifeCategory;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  color: string;
  tagline: string;
  annualPotentialSavings: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number; // 1 to 5
  verifiedUser: boolean;
  date: string;
  comment: string;
  holdingDuration: string; // e.g. "Held for 14 months"
}

export interface DataSource {
  id: string;
  name: string;
  authority: string;
  authorityType: 'Statutory Regulator' | 'Direct Bank MITC' | 'Government Ministry' | 'Merchant Terms';
  referenceCode: string;
  officialUrl: string;
  reasoning: string;
  lastUpdated: string;
  verificationStatus: 'Live & Verified' | 'Pending Gazette Review';
  isDiscovered?: boolean;
  discoveredAt?: string;
  discoveryRunSummary?: string;
  // Simple English clarity fields
  simpleTitle?: string;
  whatPublished?: string;
  consumerBenefit?: string;
  officialPublisher?: string;
}

export interface SweepRunSummary {
  id: string;
  timestamp: string;
  endpointsScanned: number;
  domainSpace: string;
  oneLineSummary: string;
  discoveredSource: DataSource;
  triggerType: 'agent-sweep' | 'gazette-fetch';
  simpleTitle?: string;
  whatPublished?: string;
  consumerBenefit?: string;
  officialPublisher?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: LifeCategory;
  summary: string;
  annualBenefit: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  publishedDate: string;
  lastUpdated: string;
  tags: string[];
  keyTakeaways: string[];
  membershipOrScheme: string;
  prerequisites: string[];
  stepsToAvail: string[];
  finePrint: string[];
  detailedContent: string;
  verifiedStatus: boolean;
  sourceRef: DataSource;
}

export interface CreditCardSegment {
  id: string;
  segmentTitle: string;
  persona: string;
  monthlySpendProfile: string;
  summaryReasoning: string;
  recommendedCardIds: string[];
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'American Express' | 'Diners Club';
  segmentId: string;
  annualFee: number;
  feeWaiverSpend: number | string;
  joiningBenefit: string;
  baseRewardRate: string;
  acceleratedRewardRate: string;
  loungeAccess: {
    domestic: string;
    international: string;
    condition: string;
  };
  forexMarkup: number; // in %
  whyThisCardWins: string;
  roiCalculation: string;
  dealHighlights: string[];
  hiddenCatches: string[];
  whoShouldBuy: string;
  whoShouldAvoid: string;
  applicationLinkText: string;
  sourceRef: DataSource;
  reviews: ReviewItem[];
  cardType?: 'credit' | 'debit';
  missionScore?: number; // 0 to 100
  dealCategory?: string;
  interestAPR?: number;
  excludedSpends?: string[];
  isCustom?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  customImageUrl?: string;
}

export interface SiteConfig {
  showNotificationBar: boolean;
  notificationMessage?: string;
  showDealsHub: boolean;
  showCardGuide: boolean;
  showCalculator: boolean;
  showLifeOperations: boolean;
  showHeroSection: boolean;
  enableUserReviews: boolean;
  heroHeadline?: string;
  heroSubheadline?: string;
}

export interface ChecklistItem {
  id: string;
  stageId: number;
  stageTitle: string;
  title: string;
  description: string;
  required: boolean;
  applicableFor: 'all' | 'salaried' | 'self-employed' | 'students';
  proTip: string;
  pitfallToAvoid: string;
  documentsNeeded?: string[];
}

export interface LifeOperationFacet {
  id: string;
  title: string;
  category: LifeCategory;
  subheading: string;
  dailyFrictionPoint: string;
  smartSolution: string;
  averageAnnualSavings: string;
  topProgramsOrSchemes: {
    name: string;
    cost: string;
    perks: string[];
    breakEven: string;
    linkUrl?: string;
  }[];
  actionChecklist: string[];
}
