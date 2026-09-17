export interface CrawledCandidate {
  id: string;
  sourceUrl: string;
  title: string;
  discoveredAt: string;
  scanCycle: string;
  entityType: 'Credit Card Deal' | 'High-Yield Debit Deal' | 'RuPay UPI Card' | 'Zero-Forex Travel Card' | 'Fintech Scheme';
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
    'Searching and crawling for credit card and debit card deals runs strictly ONCE A DAY. This intentional daily pacing filters out ephemeral marketing noise, respects bank server rate limits, and allows our reasoning engine to rigorously vet MITC terms against our zero-affiliate mission before generating detailed Fact Sheets in the Buying Guide.',
  gazetteCadence: 
    'Continuous Real-Time Webhooks & Polling. Statutory gazettes (RBI Master Directions, NPCI circulars, DGCA rules) carry legal enforceability and synchronize in real-time.',
  itemsScannedInLastRun: 74,
  itemsApproved: 17,
  itemsRejected: 57,
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
    entityType: 'RuPay UPI Card',
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
    actionTaken: 'Detailed information sheet added to Buying Guide under RuPay UPI segment with full Fact Sheet.',
    linkedResourceCardId: 'phonepe-sbi-select-black',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '10% on monthly electricity, broadband, and recharge bills + RuPay UPI QR payments, recovering fee within 2 months.'
  },

  // 2. HDFC Millennia Debit Card (1% Bill Pay Hack)
  {
    id: 'cand-hdfc-millennia-debit',
    sourceUrl: 'https://www.hdfcbank.com/personal/pay/cards/debit-cards/millennia-debit-card',
    title: 'HDFC Millennia Debit Card (1% Bill Pay & Wallet Hack)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'High-Yield Debit Deal',
    issuingEntity: 'HDFC Bank Limited',
    missionScore: 96,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'The top risk-free cash deal in Indian personal finance: yields direct 1% cashback on wallet loads and paying other banks\' credit card bills through PayZapp/NetBanking. Capped at ₹400/month, this yields ₹4,800/yr in pure risk-free cash back directly into your savings account with zero debt liability and 4 domestic airport lounge visits/yr.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under High-Yield Debit Cards segment.',
    linkedResourceCardId: 'hdfc-millennia-debit',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '1% cash back on paying credit card bills & wallet loads up to ₹4,800/yr free cash into savings account.'
  },

  // 3. Cashback SBI Card
  {
    id: 'cand-sbi-cashback',
    sourceUrl: 'https://www.sbicard.com/en/personal/credit-cards/rewards/cashback-sbi-card.page',
    title: 'Cashback SBI Card (Flat 5% Statement Credit)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Credit Card Deal',
    issuingEntity: 'SBI Card & Payment Services',
    missionScore: 98,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'The highest pure cashback yield for online shoppers in India: 5% flat direct statement credit across 99% of online checkouts (Amazon, Flipkart, Myntra, electronics, flight tickets, Nykaa) up to ₹5,000/month cap (₹60,000/year max cashback). Replaces opaque reward points with real INR credit on the monthly statement.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Pure Cashback segment.',
    linkedResourceCardId: 'sbi-cashback',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '5% flat direct statement credit on 99% of online checkouts up to ₹5,000/mo cap (₹60,000/yr).'
  },

  // 4. IDFC FIRST Wealth Debit Card
  {
    id: 'cand-idfc-wealth-debit',
    sourceUrl: 'https://www.idfcfirstbank.com/personal-banking/debit-cards/wealth-debit-card',
    title: 'IDFC FIRST Wealth Debit Card (BOGO Movies & Airport Lounges)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'High-Yield Debit Deal',
    issuingEntity: 'IDFC FIRST Bank Limited',
    missionScore: 95,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Unprecedented lifestyle perks on a zero-debt debit card: Buy 1 Get 1 Free on Movie Tickets up to ₹250 twice every month on BookMyShow (saving ₹6,000/yr) + 2 domestic airport and 2 railway lounges per quarter (16 visits/year) + lowest private banking forex markup of 1.5% and free Roadside Assistance with ₹0 annual card fee.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under High-Yield Debit Cards segment.',
    linkedResourceCardId: 'idfc-wealth-debit',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: 'BOGO ₹250 movie tickets 2x/mo (₹6,000/yr savings) + 16 free airport & rail lounges/yr on a zero-fee debit card.'
  },

  // 5. Airtel Axis Bank Credit Card
  {
    id: 'cand-airtel-axis',
    sourceUrl: 'https://www.axisbank.com/retail/cards/credit-card/airtel-axis-bank-credit-card',
    title: 'Airtel Axis Bank Credit Card (25% Telecom & 10% Utilities)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Credit Card Deal',
    issuingEntity: 'Axis Bank / Bharti Airtel',
    missionScore: 97,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'High recurring household utility value: 25% cashback on Airtel mobile, broadband, and DTH bills (capped at ₹250/mo), 10% on electricity, gas, and water bills via Airtel Thanks BBPS (capped at ₹250/mo), and 10% on Swiggy, Zomato, and BigBasket (capped at ₹500/mo). Generates up to ₹12,000/year in household bill savings for an annual fee of just ₹500.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Utilities & Food segment.',
    linkedResourceCardId: 'airtel-axis',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '25% on Airtel bills + 10% on utility bills + 10% on food delivery, yielding up to ₹12,000/yr in recurring cash savings.'
  },

  // 6. Fi Federal Bank VISA Platinum Debit Card
  {
    id: 'cand-fi-federal-debit',
    sourceUrl: 'https://fi.money/features/debit-card',
    title: 'Fi Federal Bank VISA Platinum Debit Card (0% Forex & Rewards)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Zero-Forex Travel Card',
    issuingEntity: 'The Federal Bank Limited / Fi Money',
    missionScore: 93,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Zero forex markup without taking on debt or needing credit underwriting: Eliminates the standard 3.5% + GST foreign currency fee on international POS payments, ATM cash withdrawals, and overseas websites. Earns up to 2% rewards in Fi Coins redeemable for Amazon vouchers or digital gold, with zero annual maintenance charges.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under High-Yield Debit Cards segment.',
    linkedResourceCardId: 'fi-federal-debit',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '0% Forex markup on international cards & ATM spends without credit checks or annual fees.'
  },

  // 7. HSBC Live+ Credit Card
  {
    id: 'cand-hsbc-live-plus',
    sourceUrl: 'https://www.hsbc.co.in/credit-cards/products/live-plus/',
    title: 'HSBC Live+ Credit Card (10% Dining, Food & Groceries)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Credit Card Deal',
    issuingEntity: 'The Hongkong and Shanghai Banking Corporation',
    missionScore: 96,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'The definitive dining and grocery card: 10% accelerated cashback across all offline restaurants, dining outlets, grocery stores (Reliance Smart, Nature\'s Basket), and food delivery apps (Swiggy, Zomato, Blinkit, Zepto) up to ₹1,000/month. Generates ₹12,000/year cashback on non-discretionary everyday food expenditures.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Cashback & Online segment.',
    linkedResourceCardId: 'hsbc-live-plus',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '10% cashback on all dining, food delivery, and supermarkets up to ₹1,000/month (₹12,000/year).'
  },

  // 8. Tata Neu Infinity RuPay Credit Card
  {
    id: 'cand-tata-neu-infinity-rupay',
    sourceUrl: 'https://www.tataneu.com/credit-card',
    title: 'Tata Neu Infinity RuPay Credit Card (UPI Edition)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'RuPay UPI Card',
    issuingEntity: 'HDFC Bank / Tata Digital',
    missionScore: 96,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Top-tier UPI credit card return: 1.5% NeuCoins on all merchant UPI QR code scan-and-pay transactions, plus 10% NeuCoins on Tata Neu (BigBasket, 1mg, Air India Express, Croma, Westside, Tata CliQ). 1 NeuCoin = ₹1.00 hard value redeemable across the entire Tata ecosystem.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under RuPay UPI segment.',
    linkedResourceCardId: 'tata-neu-infinity-rupay',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '1.5% on all UPI QR code merchant transactions + 10% on BigBasket, 1mg, Croma & Air India Express.'
  },

  // 9. AU Ixigo Travel Credit Card
  {
    id: 'cand-au-ixigo',
    sourceUrl: 'https://www.aubank.in/personal-banking/credit-cards/ixigo-au-credit-card',
    title: 'AU Ixigo Co-Branded Travel Credit Card (0% Forex & 16 Lounges)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Zero-Forex Travel Card',
    issuingEntity: 'AU Small Finance Bank',
    missionScore: 95,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'The ultimate dual-transit card: 0% foreign currency markup on all international transactions, 16 complimentary domestic airport lounge visits per year, and 8 complimentary railway lounge visits per year. 10% instant discount on train bookings with zero payment gateway processing fees.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Travel & Forex segment.',
    linkedResourceCardId: 'au-ixigo',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '0% Forex markup + 16 Airport Lounges + 8 Railway Lounges per year for low ₹999 fee.'
  },

  // 10. Federal Bank Scapia Credit Card
  {
    id: 'cand-scapia-federal',
    sourceUrl: 'https://www.federalbank.co.in/scapia-credit-card',
    title: 'Federal Bank Scapia Co-Branded Travel Credit Card',
    discoveredAt: 'Discovered in prior daily crawl cycle',
    scanCycle: 'Cycle #141 (September 16, 2026)',
    entityType: 'Zero-Forex Travel Card',
    issuingEntity: 'The Federal Bank Limited',
    missionScore: 94,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Zero annual fee travel card: Contractually binds Federal Bank to 0% foreign currency markup on all overseas transactions, saving travelers 4.13% (3.5% fee + GST). Transparent ₹5,000 monthly spend rule unlocks unlimited domestic airport lounge access with zero joining or renewal charges.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Travel & Forex segment.',
    linkedResourceCardId: 'scapia-federal',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: 'Zero forex markup on all overseas spending + domestic lounge access for ₹0 annual fee.'
  },

  // 11. Jupiter CSB Bank Edge+ RuPay Debit Card
  {
    id: 'cand-jupiter-csb-edge-debit',
    sourceUrl: 'https://jupiter.money/debit-card',
    title: 'Jupiter CSB Bank Edge+ RuPay Debit Card (UPI Cashback & Lounges)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'High-Yield Debit Deal',
    issuingEntity: 'CSB Bank Limited / Jupiter Money',
    missionScore: 92,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Guaranteed cashback on daily UPI & debit spends: Assured 1% to 2% Jewels cashback on merchant UPI QR code scans and POS purchases. Jewels convert 1:1 into digital gold or hard cash with zero expiry. Includes 0% forex markup on select overseas purchases and quarterly airport lounge visits.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under High-Yield Debit Cards segment.',
    linkedResourceCardId: 'jupiter-csb-edge-debit',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '1-2% Jewels cashback on merchant UPI QR payments + digital gold conversion + domestic lounge access.'
  },

  // 12. IndusInd Bank Exclusive Debit Card
  {
    id: 'cand-indusind-exclusive-debit',
    sourceUrl: 'https://www.indusind.com/in/en/personal/cards/debit-cards/exclusive-debit-card.html',
    title: 'IndusInd Bank Exclusive Debit Card (BookMyShow BOGO & Lounges)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'High-Yield Debit Deal',
    issuingEntity: 'IndusInd Bank Limited',
    missionScore: 93,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'High-value entertainment perks on debit: Buy 1 Get 1 Free on BookMyShow up to ₹500/month (saves ₹6,000/yr), covering premium IMAX and 3D weekend screenings where ordinary cards cap out at ₹150. Plus 8 complimentary domestic airport lounges per year and zero fuel surcharge with ₹0 annual maintenance fee.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under High-Yield Debit Cards segment.',
    linkedResourceCardId: 'indusind-exclusive-debit',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: 'BOGO Movie Tickets on BookMyShow up to ₹500/mo + 8 free airport lounges/yr with zero card fee.'
  },

  // 13. Kiwi Axis Bank RuPay Credit Card
  {
    id: 'cand-kiwi-axis-rupay',
    sourceUrl: 'https://gokiwi.in',
    title: 'Kiwi Axis Bank RuPay Credit Card (Virtual UPI Cashback)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'RuPay UPI Card',
    issuingEntity: 'Axis Bank / Kiwi Fintech',
    missionScore: 92,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Lifetime Free virtual credit card dedicated to UPI: Flat 2% cashback for Neon subscribers (1.5% base) on all merchant QR code scan-and-pay transactions via the Kiwi app. Instant virtual card generation within 2 minutes with zero paper documentation and zero joining/renewal fees.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under RuPay UPI segment.',
    linkedResourceCardId: 'kiwi-axis-rupay',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: 'Flat 1.5% - 2% on everyday UPI merchant QR scans on a Lifetime Free virtual card.'
  },

  // 14. SBI Platinum International Debit Card
  {
    id: 'cand-sbi-platinum-debit',
    sourceUrl: 'https://www.sbi.co.in/web/personal-banking/cards/debit-card/sbi-platinum-international-debit-card',
    title: 'SBI Platinum International Debit Card (8 Lounges for ₹350/yr)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'High-Yield Debit Deal',
    issuingEntity: 'State Bank of India',
    missionScore: 91,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'The most accessible airport lounge card in India: Any SBI savings account holder can request an instant upgrade on the YONO app. For a nominal fee of just ₹350 + GST (~₹413/year), unlocks 8 domestic airport lounge visits per year across India (worth ₹12,000+), bypassing credit checks and income criteria.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under High-Yield Debit Cards segment.',
    linkedResourceCardId: 'sbi-platinum-debit',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '8 complimentary domestic airport lounges per year for just ₹350 + GST annual fee with zero CIBIL checks.'
  },

  // 15. BPCL SBI Card Octane
  {
    id: 'cand-bpcl-sbi-octane',
    sourceUrl: 'https://www.sbicard.com/en/personal/credit-cards/fuel/bpcl-sbi-card-octane.page',
    title: 'BPCL SBI Card Octane (7.25% Fuel Valueback)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Credit Card Deal',
    issuingEntity: 'SBI Card / Bharat Petroleum',
    missionScore: 93,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Top fuel savings instrument: 7.25% value back (25 reward points per ₹100 = 6.25% + 1% surcharge waiver) on BPCL petrol, diesel, and Bharatgas LPG cylinder bookings. Converts daily commute fuel burns into hundreds of liters of free fuel annually.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Fuel & Commute segment.',
    linkedResourceCardId: 'bpcl-sbi-octane',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '7.25% value back on BPCL fuel and Bharatgas LPG bookings, waiving the 1% surcharge.'
  },

  // 16. Amazon Pay ICICI Bank Credit Card
  {
    id: 'cand-amazon-pay-icici',
    sourceUrl: 'https://www.icicibank.com/personal-banking/cards/credit-cards/amazon-pay-credit-card',
    title: 'Amazon Pay ICICI Bank Credit Card (Lifetime Free & 5% Uncapped)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Credit Card Deal',
    issuingEntity: 'ICICI Bank / Amazon India',
    missionScore: 98,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'Unsurpassed starter card value: 100% Lifetime Free forever with zero maintenance fees. Gives Prime members 5% uncapped cashback on all Amazon.in purchases and 2% on 100+ partner merchants, automatically crediting real cash to Amazon Pay balance every month with zero point conversion fees.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Entry-Level segment.',
    linkedResourceCardId: 'amazon-pay-icici',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '100% Lifetime Free forever with uncapped 5% cash back on Amazon purchases and zero maintenance fees.'
  },

  // 17. HDFC Bank Infinia Credit Card (Metal Edition)
  {
    id: 'cand-hdfc-infinia-metal',
    sourceUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card',
    title: 'HDFC Bank Infinia Credit Card Metal Edition (33.3% Travel Return)',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Credit Card Deal',
    issuingEntity: 'HDFC Bank Limited',
    missionScore: 99,
    verdict: 'APPROVED_AND_INGESTED',
    missionReasoning:
      'The crown jewel of Indian credit cards: 33.3% net return on flight and hotel bookings through SmartBuy (5X reward points, 1 point = ₹1.00 hard cash value for flights/hotels). Unlimited domestic and international Priority Pass lounge visits for primary cardholder and complimentary guests, 2% low forex markup, and 12,500 renewal reward points that fully offset the annual fee.',
    evaluationChecklist: {
      hasStatutoryLicense: true,
      netConsumerRoiPositive: true,
      hiddenFeesDisclosed: true,
      zeroAffiliateBias: true
    },
    actionTaken: 'Detailed information sheet added to Buying Guide under Ultra-Premium segment.',
    linkedResourceCardId: 'hdfc-infinia-metal',
    badge: 'Approved & Ingested into Guide',
    customerInsightSummary: '33.3% travel return on SmartBuy flights & hotels + unlimited worldwide lounge access with guest passes.'
  },

  // 18. Unregulated NBFC PayLater (REJECTED EXAMPLE)
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

  // 19. Commercial Affiliate Coupon Arbitrage (REJECTED EXAMPLE)
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
  },

  // 20. Deceptive Co-Branded Card with 3.85% Forex & Hidden Penalty (REJECTED EXAMPLE)
  {
    id: 'cand-deceptive-card-trap',
    sourceUrl: 'https://lifestyle-reward-promotions.sample.in/glam-card',
    title: 'Deceptive "Lifetime Free" Co-Branded Card with ₹1,200 Inactivity Penalties',
    discoveredAt: 'Discovered in today\'s 03:00 AM crawl cycle',
    scanCycle: 'Cycle #142 (September 17, 2026)',
    entityType: 'Fintech Scheme',
    issuingEntity: 'Commercial Card Aggregator White-Label',
    missionScore: 31,
    verdict: 'REJECTED_ANTI_CONSUMER',
    missionReasoning:
      'DECEPTIVE TARIFF STRUCTURE: Billed as "Lifetime Free" on marketing splash pages, but the MITC tariff schedule levies a ₹1,200 "Annual Maintenance & Account Activity Fee" if total annual expenditure is less than ₹1,50,000. In addition, imposes an exorbitant 3.85% + GST forex markup on cross-border transactions and ₹150 redemption fee per reward claim. Rejected to protect consumer financial welfare.',
    evaluationChecklist: {
      hasStatutoryLicense: false,
      netConsumerRoiPositive: false,
      hiddenFeesDisclosed: false,
      zeroAffiliateBias: false
    },
    actionTaken: 'Excluded from index. Notified in consumer protection alert log.',
    badge: 'Rejected — Deceptive Fee Structure',
    customerInsightSummary: 'Filtered out fake "Lifetime Free" card with hidden ₹1,200 inactivity penalty and 3.85% forex markup.'
  }
];
