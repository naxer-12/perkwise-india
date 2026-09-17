export interface CrawledCandidate {
  id: string;
  sourceUrl: string;
  title: string;
  discoveredAt: string;
  scanCycle: string;
  entityType: 'Credit Card' | 'Fintech Scheme' | 'Hotel Loyalty' | 'Statutory Regulation' | 'Consumer Right';
  issuingEntity: string;
  missionScore: number; // 0 to 100
  verdict: 'APPROVED_AND_INGESTED' | 'REJECTED_ANTI_CONSUMER' | 'REJECTED_COMMERCIAL_NOISE';
  missionReasoning: string;
  evaluationChecklist: {
    hasStatutoryLicense: boolean;
    netConsumerRoiPositive: boolean;
    hiddenFeesDisclosed: boolean;
    zeroAffiliateBias: boolean;
  };
  actionTaken: string;
  linkedResourceCardId?: string;
  badge: string;
  customerInsightSummary: string;
}

export interface DailyAgentConfig {
  crawlSchedule: string;
  lastRunTimestamp: string;
  nextRunCountdownHours: number;
  cadenceRationale: string;
  gazetteCadence: string;
  itemsScannedInLastRun: number;
  itemsApproved: number;
  itemsRejected: number;
  activeCrawlerStatus: 'Idle (Waiting for 03:00 IST Cron)' | 'Scanning Web Sources' | 'Reasoning with Mission' | 'Synthesizing Fact Sheet';
}

export const DAILY_AGENT_CONFIG: DailyAgentConfig = {
  crawlSchedule: 'Once every 24 hours at 03:00 AM IST (Automated Nightly Sweep)',
  lastRunTimestamp: 'Today at 03:00 AM IST',
  nextRunCountdownHours: 13,
  cadenceRationale: 
    'Searching and crawling for commercial deals, cards, and perks runs strictly ONCE A DAY. This intentional daily pacing filters out ephemeral promotional noise, respects server rate limits, and allows our reasoning engine to rigorously vet terms against our zero-affiliate mission before generating high-reading-UX Fact Sheets.',
  gazetteCadence: 
    'Continuous Real-Time Webhooks & Polling. Unlike commercial deals, statutory gazettes (RBI Master Directions, NPCI UPI circulars, DGCA passenger rights) carry immediate legal enforceability and are synchronized in real-time.',
  itemsScannedInLastRun: 68,
  itemsApproved: 13,
  itemsRejected: 55,
  activeCrawlerStatus: 'Idle (Waiting for 03:00 IST Cron)'
};

export const CRAWLED_CANDIDATES: CrawledCandidate[] = [
  // 1. PhonePe SBI Card Select Black
  {
    id: 'cand-phonepe-sbi-select-black',
    sourceUrl: 'https://www.phonepe.com/credit-cards/phonepe-sbi-card-select-black-credit-card/',
    title: 'PhonePe SBI Card Select Black Credit Card',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Credit Card',
    issuingEntity: 'SBI Card / PhonePe Private Limited',
    missionScore: 94,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'High genuine consumer utility: Provides up to 10% value back on PhonePe app utility bill payments and mobile recharges where ordinary credit cards yield 0%. The RuPay variant bridges credit card rewards to everyday UPI merchant QR code scan-and-pay. First-year annual fee of ₹1,499 is fully recovered via welcome voucher, resulting in ~₹11,700/year net household gain for typical utility spenders. Zero affiliate redirect links used.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Synthesized into Linear-style Fact Sheet with verified MITC reference and published to RuPay UPI & Cashback segments with "New" status.',
    linkedResourceCardId: 'phonepe-sbi-select-black',
    badge: 'Approved & Published',
    customerInsightSummary: '10% on monthly electricity, broadband, and recharge bills + RuPay UPI QR payments, recovering fee within 2 months.'
  },

  // 2. TRAI DND & Spam Regulations (NEW)
  {
    id: 'cand-trai-dnd-spam',
    sourceUrl: 'https://www.trai.gov.in',
    title: 'TRAI National DND & Anti-Spam Telemarketer Quarantine Mandate',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Consumer Right',
    issuingEntity: 'Telecom Regulatory Authority of India (TRAI)',
    missionScore: 99,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Crucial consumer defense: Governs the statutory right to block predatory loan spam, unsolicited credit card telemarketing, and digital phishing via 1909 DND. Directs telecom providers to disconnect and blacklist repeated offenders for 2 years and enforces a 24-hour SLA to isolate unauthorized financial callers. No commercial interest; 100% consumer empowerment.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Ingested into Daily Life Operations Hub as the definitive Spam & Financial Fraud Defense Blueprint.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Statutory right to 1909 DND, 2-year carrier blacklisting of spam telemarketers, and 24h quarantine on financial phishing.'
  },

  // 3. RBI Integrated Ombudsman Scheme (NEW)
  {
    id: 'cand-rbi-integrated-ombudsman',
    sourceUrl: 'https://cms.rbi.org.in',
    title: 'RBI Integrated Ombudsman Scheme: ₹20 Lakh Compensation & Card SLA Rules',
    discoveredAt: 'Discovered in statutory gazette sync',
    scanCycle: 'Statutory Real-Time Stream (September 17, 2026)',
    entityType: 'Statutory Regulation',
    issuingEntity: 'Reserve Bank of India (RBI)',
    missionScore: 98,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Massive legal leverage for Indian bank customers: Grants the Banking Ombudsman statutory power to award up to ₹20 Lakh compensation for direct financial loss and ₹1 Lakh for mental harassment caused by wrongful bank charges, failed chargebacks, or unsolicited card issuance. Legally mandates a ₹500/day bank penalty for failure to close a credit card within 7 working days.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Added to Statutory Provenance Registry with direct portal link to the RBI CMS dispute resolution portal.',
    badge: 'Approved & Published',
    customerInsightSummary: '₹20 Lakh award power, ₹1 Lakh harassment compensation, and automatic ₹500/day bank penalty if credit card closure exceeds 7 days.'
  },

  // 4. IRDAI Cashless Everywhere Initiative (NEW)
  {
    id: 'cand-irdai-cashless-everywhere',
    sourceUrl: 'https://bimabharosa.irdai.gov.in',
    title: 'IRDAI & GIC "Cashless Everywhere" Universal Hospitalization Framework',
    discoveredAt: 'Discovered in statutory gazette sync',
    scanCycle: 'Statutory Real-Time Stream (September 17, 2026)',
    entityType: 'Statutory Regulation',
    issuingEntity: 'Insurance Regulatory & Development Authority / GIC',
    missionScore: 97,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Gamechanger for medical treatment in India: Eliminates traditional "network hospital" barriers. Policyholders can now demand 100% cashless treatment at ANY hospital in India by intimating their insurer 48 hours before an elective admission, or within 48 hours of an emergency admission. Ends the painful cycle of borrowing money to pay hospital bills while waiting for reimbursements.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Published in Life Operations Hub under Health Insurance & Emergency Hospitalization SOPs.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Right to 100% cashless hospitalization across any hospital in India with 48h advance notice or 48h emergency notification.'
  },

  // 5. PM Surya Ghar Muft Bijli Yojana (NEW)
  {
    id: 'cand-pm-surya-ghar-solar',
    sourceUrl: 'https://pmsuryaghar.gov.in',
    title: 'Ministry of Power PM Surya Ghar: ₹78,000 Direct Rooftop Solar Subsidy',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Statutory Regulation',
    issuingEntity: 'Ministry of New & Renewable Energy / BEE',
    missionScore: 96,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Extremely high return on investment: Government gazette provides direct DBT bank transfer subsidy of ₹78,000 for residential 3kW rooftop solar installations. Offsets 300 units of monthly power consumption, reducing a typical Indian household\'s electricity bills from ₹3,500/month to near-zero (generating ₹38,000 - ₹45,000 in net annual savings with 3-year breakeven).',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Added to Utilities & Home Operations section with official subsidy application steps.',
    badge: 'Approved & Published',
    customerInsightSummary: '₹78,000 direct DBT capital subsidy for 3kW rooftop solar, wiping out up to ₹42,000/year in household electricity bills permanently.'
  },

  // 6. NPCI UPI AutoPay & E-Mandate Rights (NEW)
  {
    id: 'cand-npci-upi-autopay',
    sourceUrl: 'https://www.npci.org.in',
    title: 'NPCI & RBI 24-Hour Pre-Debit Notice & 1-Click Mandate Revocation Rights',
    discoveredAt: 'Discovered in statutory gazette sync',
    scanCycle: 'Statutory Real-Time Stream (September 17, 2026)',
    entityType: 'Consumer Right',
    issuingEntity: 'NPCI & Reserve Bank of India',
    missionScore: 95,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Direct statutory protection against subscription traps: Mandates that banks and payment aggregators must send an SMS and email notification at least 24 hours prior to deducting any recurring fee. In addition, consumers possess the legally binding right to pause or cancel any mandate directly from their UPI app (PhonePe, GPay, Paytm) with immediate effect, bypassing obstructive merchant cancellation flows.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Published as a core Financial Self-Defense guide in the Knowledge Hub.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Mandatory 24h pre-debit SMS alert for all subscriptions, plus instant 1-click mandate cancellation inside UPI apps.'
  },

  // 7. National Consumer Helpline & E-Daakhil (NEW)
  {
    id: 'cand-mca-nch-consumer-helpline',
    sourceUrl: 'https://consumerhelpline.gov.in',
    title: 'National Consumer Helpline 1915 & Paperless E-Daakhil Court Filing',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Consumer Right',
    issuingEntity: 'Ministry of Consumer Affairs, Food & Public Distribution',
    missionScore: 96,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Zero-cost dispute resolution: Toll-free 1915 service resolves e-commerce refund refusals, airline flight refund delays, and defective product warranty denials with an 88% pre-litigation settlement rate within 45 days. If unresolved, the statutory E-Daakhil portal permits consumers to file cases online in district consumer commissions without retaining an advocate.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Added to Consumer Rights Directory with direct helpline guidelines and E-Daakhil procedural steps.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Free 1915 helpline with 88% pre-court resolution rate for denied refunds, plus lawyer-free digital filing on E-Daakhil.'
  },

  // 8. EPFO EDLI ₹7 Lakh Free Life Insurance (NEW)
  {
    id: 'cand-epfo-edli-life-cover',
    sourceUrl: 'https://www.epfindia.gov.in',
    title: 'EPFO EDLI Scheme: Automatic ₹7,00,000 Free Life Insurance for Salaried Workers',
    discoveredAt: 'Discovered in statutory gazette sync',
    scanCycle: 'Statutory Real-Time Stream (September 17, 2026)',
    entityType: 'Statutory Regulation',
    issuingEntity: 'Ministry of Labour & Employment / EPFO',
    missionScore: 97,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Unclaimed statutory benefit: Every active member of the Employees\' Provident Fund (EPF) is automatically insured for up to ₹7,00,000 (minimum ₹2,50,000) under the EDLI Scheme. The premium is paid 100% by the employer (0.5% of wages), requiring ₹0 deduction from the employee. Applies even if death occurs in the first month of employment. Ingested to prevent families from losing out on valid statutory claims.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Added to Workplace & Corporate Perks Blueprint with claim documentation checklist.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Free ₹7 Lakh statutory term life cover for all EPF-contributing employees with zero salary deductions.'
  },

  // 9. SEBI Direct Mutual Funds & SCORES 2.0 (NEW)
  {
    id: 'cand-sebi-direct-funds-scores',
    sourceUrl: 'https://scores.sebi.gov.in',
    title: 'SEBI Direct Mutual Fund Plan Savings & 21-Day SCORES 2.0 Resolution SLA',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Statutory Regulation',
    issuingEntity: 'Securities and Exchange Board of India (SEBI)',
    missionScore: 96,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Massive long-term wealth multiplier: SEBI regulations mandate "Direct Plans" with zero distributor commissions, saving retail investors 0.75% to 1.25% in annual total expense ratios (TER). On a ₹20,000 monthly SIP over 20 years, switching from Regular to Direct plans puts an extra ₹35 Lakhs to ₹48 Lakhs directly into the investor\'s pocket. Backed by SCORES 2.0 with automatic 21-day timebound escalation.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Synthesized into Investments & Wealth Architecture with Direct vs Regular compound comparison calculator.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Zero distributor commission saves 1% annually, compounding to an extra ₹35 Lakhs+ on a 20-year SIP with 21-day SEBI dispute SLA.'
  },

  // 10. NHAI FASTag Local Pass & Chargeback SLAs (NEW)
  {
    id: 'cand-nhai-fastag-local-pass',
    sourceUrl: 'https://ihmcl.co.in',
    title: 'NHAI FASTag 20km Local Pass (~₹330/mo) & 7-Day Auto-Chargeback Mandate',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Statutory Regulation',
    issuingEntity: 'National Highways Authority of India (NHAI)',
    missionScore: 94,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'High recurring savings for commuters: Statutory National Highways Fee Rules entitle private non-commercial vehicle owners residing within 20 km of a toll plaza to an unlimited monthly local pass (~₹330/month vs ₹150 per single crossing), saving daily commuters over ₹3,000 to ₹4,500 every month. In addition, incorrect double toll deductions must be refunded within 7 working days via the 1033 helpline.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Ingested into Commuting & Fuel Operations Hub with local pass verification documentation.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Unlimited toll crossings for ~₹330/month for residents within 20 km of a toll plaza + 7-day auto-refund for wrong debits.'
  },

  // 11. CBIC Baggage Rules & Used Laptop Duty Exemption (NEW)
  {
    id: 'cand-cbic-customs-duty-free',
    sourceUrl: 'https://www.cbic.gov.in',
    title: 'CBIC International Baggage Rules: 1 Used Laptop & ₹50,000 Duty-Free Right',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Consumer Right',
    issuingEntity: 'Central Board of Indirect Taxes & Customs',
    missionScore: 93,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Vital protection against airport harassment: Notification No. 30/2016-Customs explicitly establishes that any passenger of age 18 or above (except crew) is legally entitled to bring one used personal laptop duty-free, in addition to ₹50,000 worth of general articles and 2 liters of alcohol. Clear statutory citation protects travelers from unlawful customs duty demands upon arrival at Indian international airports.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Published in Travel & Forex Operations Hub as the International Arrival Rights Checklist.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Statutory right to bring 1 personal laptop + ₹50,000 general goods + 2L alcohol duty-free through green channel.'
  },

  // 12. Federal Bank Scapia (Approved Card)
  {
    id: 'cand-federal-scapia',
    sourceUrl: 'https://www.federalbank.co.in/scapia-credit-card',
    title: 'Federal Bank Scapia Co-Branded Travel Credit Card',
    discoveredAt: 'Discovered in prior daily crawl cycle',
    scanCycle: 'Cycle #141 (September 16, 2026)',
    entityType: 'Credit Card',
    issuingEntity: 'The Federal Bank Limited',
    missionScore: 91,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'High consumer utility: Contractually binds Federal Bank to 0% foreign currency markup, saving travelers 4.13% (3.5% fee + 18% GST) on all overseas transactions. No annual maintenance charges. Transparent ₹5,000 monthly spend rule for domestic lounge access. Excellent fit for independent travel optimization.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Added to Travel & Forex segment Fact Sheet with MITC citation FED-SCAPIA-MITC-2026.',
    linkedResourceCardId: 'scapia-federal',
    badge: 'Approved & Published',
    customerInsightSummary: 'Zero forex markup on all overseas card spending, saving 4.13% with zero annual fee.'
  },

  // 13. IRDAI Super Top-Up Architecture
  {
    id: 'cand-irdai-health-topup',
    sourceUrl: 'https://www.irdai.gov.in/gazette/health-super-topup-regulations',
    title: 'IRDAI Statutory Health Insurance Super Top-Up Architecture',
    discoveredAt: 'Discovered in statutory gazette sync',
    scanCycle: 'Statutory Real-Time Stream (September 17, 2026)',
    entityType: 'Statutory Regulation',
    issuingEntity: 'Insurance Regulatory and Development Authority of India',
    missionScore: 98,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Exceptional statutory consumer value: IRDAI regulation standardizes deductible thresholds across health insurers, allowing families with a base ₹5 Lakh employer policy to purchase a ₹1 Crore Super Top-Up for merely ~₹1,100/month. Mandates cashless approval within 60 minutes and caps pre-existing condition wait times. Published in Life Operations Hub.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Ingested into Health & Insurance Life Operations Blueprint with direct IRDAI reference citation.',
    badge: 'Approved & Published',
    customerInsightSummary: 'Allows purchasing ₹1 Crore catastrophic health coverage for ~₹1,100/mo by anchoring on a ₹5 Lakh deductible.'
  },

  // 14. Unregulated NBFC PayLater (REJECTED EXAMPLE)
  {
    id: 'cand-nbfc-paylater-trap',
    sourceUrl: 'https://fast-instant-credit-promotions.sample.in/checkout-boost',
    title: 'Unregulated NBFC "0% Interest Instant PayLater" Credit Line',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Fintech Scheme',
    issuingEntity: 'Third-Party Unregulated FinTech Intermediary',
    missionScore: 12,
    verdict: 'REJECTED_ANTI_CONSUMER',
    missionReasoning:
      'FAILED MISSION INTEGRITY AUDIT: Advertises "0% interest for 15 days" but buries a 3% monthly rollover interest rate (equivalent to 42.6% APR) in the sub-clause, accompanied by a 4% mandatory upfront "platform handling fee". In addition, failure to pay triggers aggressive digital contact-book permissions. Excluded to protect Indian consumers from predatory debt traps.',
    evaluationChecklist: {
      hasStatutoryLicense: false,
      netConsumerRoiPositive: false,
      hiddenFeesDisclosed: false,
      zeroAffiliateBias: false
    },
    actionTaken: 'Permanently blacklisted from crawl registry. Added to anti-fraud consumer warning database.',
    badge: 'Rejected — Predatory APR Trap',
    customerInsightSummary: 'Spotted and blocked deceptive 42% compounding interest buried behind "0% 15-day promotional teaser".'
  },

  // 15. Commercial Affiliate Coupon Arbitrage (REJECTED EXAMPLE)
  {
    id: 'cand-affiliate-coupon-arbitrage',
    sourceUrl: 'https://mega-savings-cashback-offers.sample.com/deals',
    title: 'Aggregator Affiliate Coupon Network with 90-Day Lockup',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Fintech Scheme',
    issuingEntity: 'Commercial Coupon Affiliate Arbitrage Network',
    missionScore: 24,
    verdict: 'REJECTED_COMMERCIAL_NOISE',
    missionReasoning:
      'VIOLATES ZERO-AFFILIATE POLICY: Demands users route transactions through opaque affiliate redirect tracking links. Analysis shows a 38% tracking drop-off rate, a 90-day holding delay on cashback withdrawals, and a minimum withdrawal threshold of ₹1,000. Provides no direct merchant or banking MITC agreement. Rejected as commercial noise.',
    evaluationChecklist: {
      hasStatutoryLicense: false,
      netConsumerRoiPositive: false,
      hiddenFeesDisclosed: false,
      zeroAffiliateBias: false
    },
    actionTaken: 'Rejected from indexing. PerkWise only indexes direct bank MITCs and statutory government schemes.',
    badge: 'Rejected — Commercial Arbitrage',
    customerInsightSummary: 'Filtered out commercial affiliate cookie trap with 38% tracking drop-off and 90-day cash holding lockup.'
  }
];
