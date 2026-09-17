import type { CreditCard, CreditCardSegment } from '../types';
import { SOURCES } from './sourcesData';

export const CREDIT_CARD_SEGMENTS: CreditCardSegment[] = [
  {
    id: 'entry-level',
    segmentTitle: '1. Entry-Level, Fresh Graduates & Low-Spenders',
    persona: 'Students, first-time earners, or conservative spenders (₹10k - ₹25k/month)',
    monthlySpendProfile: '₹10,000 - ₹25,000 / month across basic shopping, food, and mobile recharges',
    summaryReasoning: 'New credit users need zero-friction cards with zero or easily waivable annual fees, high approval rates, and instant flat cashback without complicated reward catalogues or point expiry anxiety.',
    recommendedCardIds: ['amazon-pay-icici', 'hdfc-millennia', 'idfc-first-wow']
  },
  {
    id: 'cashback-online',
    segmentTitle: '2. Pure Cashback & Online Shopping Maximizers',
    persona: 'Digital natives spending heavily on Amazon, Flipkart, Myntra, electronics, and apps',
    monthlySpendProfile: '₹25,000 - ₹60,000 / month primarily spent through online checkout portals',
    summaryReasoning: 'Points can get devalued; direct statement credit is king. For online shoppers, a flat 5% direct cashback on nearly all online merchant checkout pages destroys traditional reward systems.',
    recommendedCardIds: ['sbi-cashback', 'hdfc-swiggy', 'hsbc-live-plus']
  },
  {
    id: 'utilities-hyperlocal',
    segmentTitle: '3. Household Utilities, Telecom & Food Delivery',
    persona: 'Heads of households paying electricity, broadband, DTH, gas, and weekly groceries',
    monthlySpendProfile: '₹20,000 - ₹50,000 / month on recurring bills, Wi-Fi, electricity, and pantry staples',
    summaryReasoning: 'Most standard credit cards give 0% or a dismal 0.2% on utility bills and merchant apps. Targeted utility-cobranded cards offer up to 10-25% cashback on bills and food orders.',
    recommendedCardIds: ['airtel-axis', 'tata-neu-infinity-hdfc']
  },
  {
    id: 'travel-forex',
    segmentTitle: '4. Domestic & International Travelers (Air Miles & Zero Forex)',
    persona: 'Frequent vacationers, business travelers, and international holidaymakers',
    monthlySpendProfile: '₹40,000 - ₹1,50,000 / month with at least 1-2 domestic flights/month or 1-2 international trips/year',
    summaryReasoning: 'Banks typically slap an extortionate 3.5% + 18% GST (total ~4.13%) foreign currency fee plus lounge access restrictions. Travel cards eliminate forex markups and yield 8-10% reward value via airline/hotel partner transfers.',
    recommendedCardIds: ['axis-atlas', 'scapia-federal', 'au-ixigo']
  },
  {
    id: 'fuel-commute',
    segmentTitle: '5. Daily Commuters & Fuel Surcharge Optimizers',
    persona: 'Car/bike owners commuting daily and spending ₹4,000 - ₹12,000/month on petrol or diesel',
    monthlySpendProfile: '₹4,000 - ₹12,000 on fuel plus toll/FASTag expenses',
    summaryReasoning: 'Fuel is explicitly excluded from rewards on almost every card and incurs a 1% surcharge. Co-branded fuel cards not only waive the 1% surcharge but give up to 7.25% value back in free fuel.',
    recommendedCardIds: ['bpcl-sbi-octane', 'hpcl-bob-energie']
  },
  {
    id: 'rupay-upi',
    segmentTitle: '6. UPI QR Code & Small Merchant Power Users',
    persona: 'Consumers who make 80% of their daily payments at local kirana stores, cafes, and street vendors via PhonePe/GPay/Paytm',
    monthlySpendProfile: '₹15,000 - ₹45,000 spent via UPI scan & pay transactions',
    summaryReasoning: '90% of merchant POS terminals in India have been superseded by QR codes where regular credit cards fail. RuPay Credit Cards on UPI let you use bank credit on QR scans while pocketing 1.5% to 5% returns.',
    recommendedCardIds: ['phonepe-sbi-select-black', 'tata-neu-infinity-rupay', 'kiwi-axis-rupay']
  },
  {
    id: 'ultra-premium',
    segmentTitle: '7. Ultra-Premium, HNIs & Milestone Chasers',
    persona: 'High-earners with spends > ₹15-20 Lakhs per annum looking for luxury, concierge, and 33%+ travel returns',
    monthlySpendProfile: '₹1,50,000 - ₹5,00,000+ / month across family expenses, luxury shopping, and foreign stays',
    summaryReasoning: 'Super-premium cards like Infinia convert flights and 5-star hotels into near-zero cost assets via 5X/10X SmartBuy portals and 1:1 reward redemption, while granting unlimited global lounge visits with complimentary guests.',
    recommendedCardIds: ['hdfc-infinia-metal', 'axis-olympus']
  }
];

export const CREDIT_CARDS_DATA: CreditCard[] = [
  {
    id: 'amazon-pay-icici',
    name: 'Amazon Pay ICICI Bank Credit Card',
    bank: 'ICICI Bank',
    network: 'Visa',
    segmentId: 'entry-level',
    annualFee: 0,
    feeWaiverSpend: 'Lifetime Free',
    joiningBenefit: '₹1,500 - ₹2,000 in welcome Amazon Pay balance + coupon bouquet during sign-up promotions',
    baseRewardRate: '1% unlimited flat cashback on all domestic and international merchant spends',
    acceleratedRewardRate: '5% unlimited cashback for Amazon Prime members (3% for non-Prime) + 2% on 100+ partner merchants (flights, hotels, Swiggy, Uber)',
    loungeAccess: {
      domestic: 'No complimentary lounge visits',
      international: 'None',
      condition: 'Focuses purely on fee-free cashback rather than airport lifestyle perks'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'It is the most consumer-friendly, hassle-free credit card in India. There are ZERO annual fees forever, NO minimum redemption threshold (cashback automatically credits to your Amazon Pay wallet every month as real cash), and NO caps on the 5% cashback. Even if you hold it for 10 years without spending, it costs you ₹0.',
    roiCalculation: 'On an average monthly spend of ₹15,000 (₹7,000 on Amazon Prime, ₹3,000 on partner apps, ₹5,000 offline/other): Earn (₹350 + ₹60 + ₹50) = ₹460/month = ₹5,520 NET profit every single year with zero fees.',
    dealHighlights: [
      'Lifetime Free forever with no fine print or spend thresholds',
      'Uncapped 5% cashback on Amazon.in purchases for Prime members',
      '2% cashback on bill payments, recharges, flight bookings via Amazon Pay',
      '1% fuel surcharge waiver across all petrol pumps in India',
      'Direct automatic monthly wallet credit (no point conversion fees)'
    ],
    hiddenCatches: [
      'No airport lounge access included',
      'Cashback credited as Amazon Pay Balance (spendable on Amazon or merchant checkouts, but cannot be transferred directly to a bank savings account)',
      'Forex markup is 3.5% + GST — avoid using overseas'
    ],
    whoShouldBuy: 'Everyone in India who buys anything on Amazon and wants a zero-maintenance, zero-fee secondary or starter card.',
    whoShouldAvoid: 'Frequent flyers needing airport lounge access or high-spenders hunting for airline miles transfer programs.',
    applicationLinkText: 'Check Eligibility on ICICI Bank / Amazon App',
    sourceRef: SOURCES.ICICI_MITC,
    reviews: [
      {
        id: 'rev-apay-1',
        author: 'Rohan Nair',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        verifiedUser: true,
        date: '2026-08-14',
        comment: 'Absolute no-brainer. Had this card for over 2 years now. Zero annual fees, and cashback silently credits to Amazon Pay balance on statement date without clicking any redemption buttons. Perfect starter and daily driver.',
        holdingDuration: 'Held for 26 months'
      },
      {
        id: 'rev-apay-2',
        author: 'Priya Shenoy',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        verifiedUser: true,
        date: '2026-07-28',
        comment: 'The uncapped 5% on Amazon Prime is unmatched. I save ₹800-1,400 every month on household groceries and electronics. Only downside is 3.5% forex fee, so never use it abroad.',
        holdingDuration: 'Held for 18 months'
      },
      {
        id: 'rev-apay-3',
        author: 'Amitav Sen',
        location: 'Pune, Maharashtra',
        rating: 4,
        verifiedUser: true,
        date: '2026-06-19',
        comment: 'Lifetime Free card with high credit limit given instantly. Would love domestic lounge access, but for ₹0 fee, complaining would be unfair.',
        holdingDuration: 'Held for 11 months'
      }
    ]
  },
  {
    id: 'hdfc-millennia',
    name: 'HDFC Millennia Credit Card',
    bank: 'HDFC Bank',
    network: 'Visa',
    segmentId: 'entry-level',
    annualFee: 1000,
    feeWaiverSpend: 100000,
    joiningBenefit: '1,000 CashPoints upon paying joining fee',
    baseRewardRate: '1% cashback on offline merchant spends and wallet loads',
    acceleratedRewardRate: '5% cashback on Flipkart, Amazon, Swiggy, Zomato, Myntra, Tata CLiQ, Uber, BookMyShow, Cult.fit (Capped at ₹1,000 CashPoints per calendar month)',
    loungeAccess: {
      domestic: '1 complimentary domestic airport lounge visit per calendar quarter',
      international: 'None',
      condition: 'Spend ₹1 Lakh or more in a calendar quarter to unlock next quarter lounge access'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'HDFC Millennia is the quintessential all-rounder card for India’s salaried millennial. It covers nearly every app installed on an Indian phone (Amazon, Flipkart, Swiggy, Zomato, Uber) with 5% cashback, and CashPoints can be redeemed 1:1 against your credit card statement bill balance.',
    roiCalculation: 'On monthly spends of ₹20,000 (₹15,000 on partner merchants like Swiggy/Flipkart/Amazon + ₹5,000 offline): Earn ₹750 + ₹50 = ₹800/month = ₹9,600/year. Minus ₹1,000 annual fee (waived if spending > ₹1 Lakh) = Net Gain: ₹9,600/year.',
    dealHighlights: [
      '5% cashback on top 10 consumer apps in India',
      'CashPoints redeemable 1:1 directly as statement cash against your card bill',
      'Annual fee easily waived on ₹1 Lakh annual spend (~₹8,334/month)',
      '1% fuel surcharge waiver up to ₹250 per statement cycle'
    ],
    hiddenCatches: [
      'Monthly cap of ₹1,000 on accelerated 5% cashback',
      'Quarterly lounge access now requires ₹1 Lakh quarterly spend',
      'Redemption fee of ₹99 + GST applies when converting CashPoints to statement cash'
    ],
    whoShouldBuy: 'Salaried individuals with a monthly take-home > ₹35,000 who want a reliable core credit card from India’s largest private bank.',
    whoShouldAvoid: 'People who already spend > ₹40,000 online each month and would easily breach the ₹1,000 monthly cap (choose SBI Cashback instead).',
    applicationLinkText: 'Apply via HDFC NetBanking / Official Portal',
    sourceRef: SOURCES.HDFC_MITC,
    reviews: []
  },
  {
    id: 'idfc-first-wow',
    name: 'IDFC FIRST WOW Credit Card',
    bank: 'IDFC FIRST Bank',
    network: 'Visa',
    segmentId: 'entry-level',
    annualFee: 0,
    feeWaiverSpend: 'Lifetime Free',
    joiningBenefit: 'Zero joining fee + 100% guarantee approval backed by Fixed Deposit',
    baseRewardRate: '1X to 3X reward points on all domestic spends',
    acceleratedRewardRate: 'Zero Forex Markup on all international spends + 4X points on spends > ₹20k/month',
    loungeAccess: {
      domestic: 'Access through select Visa Infinite/Platinum variants depending on FD size',
      international: 'None',
      condition: 'FD size based'
    },
    forexMarkup: 0,
    whyThisCardWins: 'For students, housewives, freelancers without ITR, or individuals with a damaged CIBIL score (<700), standard banks reject applications outright. IDFC WOW requires NO income proof and NO credit history — you simply open an FD of ₹2,000 to ₹1 Lakh and get an instant 100% credit limit with ZERO Forex markup and zero annual fee.',
    roiCalculation: 'Earn 7.25% p.a. guaranteed interest on your FD while simultaneously earning credit card reward points, establishing a solid 750+ CIBIL score within 6 months, and saving 4.13% on foreign transactions.',
    dealHighlights: [
      '100% approval guaranteed — No salary slips, no ITR required',
      '0% Foreign Currency Markup fee (phenomenal for international vacations or student exams)',
      'Earns regular FD interest while giving you full credit card benefits',
      'Reports on-time payments to CIBIL every month, fast-tracking credit score repair'
    ],
    hiddenCatches: [
      'Credit limit is strictly capped at 100% of your Fixed Deposit amount',
      'Premature FD withdrawal closes the credit card',
      'Base domestic reward rate is relatively modest (~0.75%)'
    ],
    whoShouldBuy: 'Students, first-time credit card applicants, freelancers, or anyone with a sub-720 CIBIL score aiming to build credit.',
    whoShouldAvoid: 'Experienced cardholders with steady salaried incomes who qualify for higher-tier unsecured cards.',
    applicationLinkText: 'Open Instant FD on IDFC FIRST Mobile App',
    sourceRef: SOURCES.IDFC_MITC,
    reviews: []
  },
  {
    id: 'sbi-cashback',
    name: 'Cashback SBI Card',
    bank: 'State Bank of India (SBI Cards)',
    network: 'Visa',
    segmentId: 'cashback-online',
    annualFee: 999,
    feeWaiverSpend: 200000,
    joiningBenefit: 'Welcome bonus vouchers during seasonal festive drives',
    baseRewardRate: '1% flat cashback on all offline merchant transactions',
    acceleratedRewardRate: '5% flat cashback on ALMOST ALL ONLINE SPENDS without merchant restrictions (Capped at generous ₹5,000 cashback per billing cycle)',
    loungeAccess: {
      domestic: 'No complimentary lounge access',
      international: 'None',
      condition: 'De-bundled to maximize pure cashback economics'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'SBI Cashback is widely regarded as the GOAT (Greatest of All Time) cashback credit card in India. Unlike cards restricted to Amazon or Flipkart, SBI Cashback gives 5% whether you shop on Nykaa, Ajio, IKEA, Blinkit, BookMyShow, or independent direct-to-consumer websites. With a huge ₹5,000 monthly cap, you can spend up to ₹1,00,000 online each month and earn up to ₹60,000 every year automatically credited to your statement.',
    roiCalculation: 'On an online monthly spend of ₹40,000 across multiple merchants: Earn 5% = ₹2,000/month = ₹24,000 annual cashback. Minus ₹999 fee (waived if spending ₹2L/year) = Net Annual Profit of ₹23,001 to ₹24,000 pure cash.',
    dealHighlights: [
      '5% direct statement cashback across 99% of online websites in India',
      'Massive ₹5,000 monthly cashback ceiling (highest among consumer cards)',
      'Cashback auto-credits to your card statement 2 days before the next bill cycle',
      'No point catalogue, no coupon redemption, no conversion fee'
    ],
    hiddenCatches: [
      'Excludes rent payments, utility bills, wallet loads, school fees, and jewellery purchases from 5% cashback',
      'No airport lounge visits',
      'Requires ₹2,00,000 annual spend to waive the ₹999 + GST renewal fee'
    ],
    whoShouldBuy: 'Anyone who spends ₹20,000+ online each month across shopping, gadgets, apparel, and multiple apps.',
    whoShouldAvoid: 'Offline supermarket shoppers or individuals wanting luxury travel miles and lounge perks.',
    applicationLinkText: 'Apply via SBI Card SPRINT Portal',
    sourceRef: SOURCES.SBI_CARD_MITC,
    reviews: [
      {
        id: 'rev-sbicb-1',
        author: 'Vikramaditya Verma',
        location: 'New Delhi',
        rating: 5,
        verifiedUser: true,
        date: '2026-08-30',
        comment: 'The single highest ROI card in India today. 5% flat cashback on literally any online merchant portal — Flipkart, Myntra, BookMyShow, Nykaa. Directly credited as statement cash. Keep in mind the ₹5,000 monthly cashback ceiling.',
        holdingDuration: 'Held for 15 months'
      },
      {
        id: 'rev-sbicb-2',
        author: 'Sneha Reddy',
        location: 'Hyderabad, Telangana',
        rating: 4,
        verifiedUser: true,
        date: '2026-08-05',
        comment: 'Phenomenal online returns. I easily hit ₹2,000+ cashback each month. The ₹999 fee gets waived if you spend ₹2 Lakhs, which is easy if you consolidate family online shopping.',
        holdingDuration: 'Held for 9 months'
      },
      {
        id: 'rev-sbicb-3',
        author: 'Karthik Sundaram',
        location: 'Chennai, Tamil Nadu',
        rating: 5,
        verifiedUser: true,
        date: '2026-07-12',
        comment: 'Direct statement cash rebate means zero point devaluation risk. Do not use for rent or utility bills though, as those are excluded from the 5%.',
        holdingDuration: 'Held for 21 months'
      }
    ]
  },
  {
    id: 'hdfc-swiggy',
    name: 'Swiggy HDFC Bank Credit Card',
    bank: 'HDFC Bank',
    network: 'Mastercard',
    segmentId: 'cashback-online',
    annualFee: 500,
    feeWaiverSpend: 200000,
    joiningBenefit: 'Complimentary 3-month Swiggy One membership worth ₹1,199',
    baseRewardRate: '1% flat cashback on other retail spends',
    acceleratedRewardRate: '10% flat cashback on Swiggy (Food delivery, Instamart grocery, Dineout) + 5% on 1,000+ top online apps (Amazon, Flipkart, Nykaa, Uber, Zara, Nike)',
    loungeAccess: {
      domestic: 'None',
      international: 'None',
      condition: 'Tailored for urban foodie & quick-commerce lifestyle'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'For urban professionals who order meals or daily groceries via Swiggy Instamart 3-5 times a week, no card comes close. Getting 10% direct cashback on food and Instamart (up to ₹1,500/month) PLUS 5% on Amazon/Flipkart/Uber (up to ₹1,500/month) provides up to ₹3,000 per month (₹36,000/year) in direct statement cashback.',
    roiCalculation: 'On monthly spends of ₹8,000 on Swiggy/Instamart + ₹10,000 on Amazon/Uber: Earn (₹800 + ₹500) = ₹1,300/month = ₹15,600/year. Minus ₹500 fee = Net Gain: ₹15,100/year.',
    dealHighlights: [
      '10% cashback on Swiggy Food, Instamart, and Dineout (Capped at ₹1,500/month)',
      '5% cashback on extensive online shopping list (Capped at ₹1,500/month)',
      'Cashback auto-credits directly as real cash against your HDFC credit card statement',
      'Very low annual fee of ₹500'
    ],
    hiddenCatches: [
      'Requires ordering through the Swiggy ecosystem to unlock the 10% tier',
      'Wallet reloads, utility bills, and fuel are excluded from rewards'
    ],
    whoShouldBuy: 'Urban bachelors, couples, and food lovers who rely on Swiggy food delivery and Instamart quick groceries.',
    whoShouldAvoid: 'Strict home cooks who buy groceries exclusively from local physical mandis or who rarely order food online.',
    applicationLinkText: 'Apply via Swiggy App or HDFC Bank Website',
    sourceRef: SOURCES.HDFC_MITC,
    reviews: []
  },
  {
    id: 'hsbc-live-plus',
    name: 'HSBC Live+ Credit Card',
    bank: 'HSBC Bank India',
    network: 'Visa',
    segmentId: 'cashback-online',
    annualFee: 999,
    feeWaiverSpend: 200000,
    joiningBenefit: '₹1,000 cashback upon spending ₹10,000 in first 30 days',
    baseRewardRate: '1.5% unlimited flat cashback on all other eligible retail spends',
    acceleratedRewardRate: '10% accelerated cashback on Dining, Food Delivery (Zomato, Swiggy) and Offline/Online Groceries (Blinkit, Zepto, Nature Basket, Reliance Smart, DMart)',
    loungeAccess: {
      domestic: '4 complimentary domestic airport lounge visits per calendar year (1/quarter)',
      international: 'None',
      condition: 'Unconditional — no spend qualification criteria'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'HSBC Live+ (formerly Cashback) uniquely gives 10% cashback on OFFLINE supermarkets (DMart, Reliance Fresh, Nature’s Basket) as well as online food apps (Zomato/Swiggy). In addition, its base reward rate on all other spends is an impressive 1.5% uncapped (higher than most standard 1% cards).',
    roiCalculation: 'On monthly spends of ₹10,000 on Groceries/Dining + ₹15,000 on other expenses: Earn ₹1,000 (10% capped) + ₹225 (1.5% uncapped) = ₹1,225/month = ₹14,700/year. Minus ₹999 fee = Net Gain: ₹13,701/year.',
    dealHighlights: [
      '10% cashback on both online AND offline grocery purchases (DMart, Nature Basket, BigBasket)',
      '10% on Zomato & Swiggy food orders',
      'Unconditional domestic lounge access (no quarterly spend barrier)',
      'High base reward rate of 1.5% uncapped'
    ],
    hiddenCatches: [
      'The 10% accelerated dining & grocery category has a monthly cap of ₹1,000',
      'HSBC branches are concentrated in Tier-1 metros (Delhi, Mumbai, Bengaluru, Chennai, Pune, Hyderabad, Kolkata)'
    ],
    whoShouldBuy: 'Metro residents who spend ₹10,000+ each month on household groceries and restaurant dining.',
    whoShouldAvoid: 'Residents in Tier-2/Tier-3 cities where HSBC banking infrastructure and physical verification are limited.',
    applicationLinkText: 'Apply on HSBC India Website',
    sourceRef: SOURCES.HSBC_MITC,
    reviews: []
  },
  {
    id: 'airtel-axis',
    name: 'Airtel Axis Bank Credit Card',
    bank: 'Axis Bank',
    network: 'Visa',
    segmentId: 'utilities-hyperlocal',
    annualFee: 500,
    feeWaiverSpend: 200000,
    joiningBenefit: '₹500 Amazon voucher upon first transaction within 30 days',
    baseRewardRate: '1% flat cashback on general retail merchant spends',
    acceleratedRewardRate: '25% cashback on Airtel mobile/DTH/Fiber via Airtel Thanks + 10% on Electricity/Water/Gas utility bills via Airtel Thanks + 10% on Swiggy, Zomato, BigBasket',
    loungeAccess: {
      domestic: '4 complimentary domestic lounge visits per calendar year',
      international: 'None',
      condition: 'Spend-linked per quarter based on Axis Bank general lounge rules'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'It is the single highest-yielding utility bill credit card in Indian banking history. Paying a ₹1,000 Airtel Wi-Fi bill yields ₹250 cashback every month. Paying your monthly ₹2,500 home electricity bill nets ₹250 cashback. Ordering groceries on BigBasket nets another ₹250-₹500. It recovers its ₹500 fee within the very first month.',
    roiCalculation: 'Monthly spends: ₹1,200 Airtel broadband (25% = ₹250 max), ₹3,000 electricity/gas (10% = ₹250 max), ₹4,000 Swiggy/Zomato/BigBasket (10% = ₹400): Total cashback = ₹900/month = ₹10,800/year. Minus ₹500 fee = Net Gain: ₹10,300/year.',
    dealHighlights: [
      '25% cashback on Airtel Wi-Fi, Postpaid, and DTH recharges (Cap: ₹250/mo)',
      '10% cashback on all utility bills: Electricity, Piped Gas, Water (Cap: ₹250/mo)',
      '10% cashback on Zomato, Swiggy, BigBasket (Cap: ₹500/mo)',
      'Cashback auto-credits straight into the card statement every month'
    ],
    hiddenCatches: [
      'Utility and Airtel cashback is ONLY paid if the bills are processed through the Airtel Thanks App (Bharat BillPay)',
      'Strict monthly category caps (₹250 for Airtel, ₹250 for utilities, ₹500 for food/grocery)',
      'Non-Airtel telecom recharges (Jio, Vi) only earn 10% via utility category'
    ],
    whoShouldBuy: 'Anyone who uses Airtel broadband or postpaid connections and pays standard domestic electricity and utility bills.',
    whoShouldAvoid: 'People without any Airtel services or those who don’t want to pay bills through the Airtel Thanks interface.',
    applicationLinkText: 'Apply via Airtel Thanks App',
    sourceRef: SOURCES.AXIS_MITC,
    reviews: [
      {
        id: 'rev-airtel-1',
        author: 'Ananya Kapoor',
        location: 'Gurgaon, Haryana',
        rating: 5,
        verifiedUser: true,
        date: '2026-08-22',
        comment: 'Incredible utility card. 25% on my Airtel Wi-Fi and family postpaids, plus 10% on electricity bills and Zomato/Swiggy. Recovers its ₹500 fee in the very first month.',
        holdingDuration: 'Held for 16 months'
      },
      {
        id: 'rev-airtel-2',
        author: 'Deepak Chawla',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        verifiedUser: true,
        date: '2026-07-19',
        comment: 'I pay my Bangalore BESCOM electricity bill and Airtel broadband through Airtel Thanks app and easily net ₹450-500 every single month. Must-have for any household.',
        holdingDuration: 'Held for 12 months'
      },
      {
        id: 'rev-airtel-3',
        author: 'Meera Joshi',
        location: 'Pune, Maharashtra',
        rating: 4,
        verifiedUser: true,
        date: '2026-06-11',
        comment: 'Great cashback on Swiggy and Zomato (10% up to ₹500). Just remember to monitor the ₹250 monthly cap on utility bills.',
        holdingDuration: 'Held for 8 months'
      }
    ]
  },
  {
    id: 'tata-neu-infinity-hdfc',
    name: 'Tata Neu Infinity HDFC Bank Credit Card',
    bank: 'HDFC Bank',
    network: 'RuPay',
    segmentId: 'utilities-hyperlocal',
    annualFee: 1499,
    feeWaiverSpend: 300000,
    joiningBenefit: '1,499 NeuCoins upon card activation',
    baseRewardRate: '1.5% NeuCoins on all non-Tata domestic spends and merchant RuPay UPI QR scans',
    acceleratedRewardRate: '10% NeuCoins on Tata Neu ecosystem purchases (5% card + 5% NeuPass) across BigBasket, Tata 1mg medicines, Croma electronics, Tata CLiQ fashion, Air India & IHCL Taj stays',
    loungeAccess: {
      domestic: '8 complimentary domestic airport lounge visits per year (2 per quarter)',
      international: '4 complimentary international lounge visits per year (Priority Pass)',
      condition: 'Spend-linked per quarter based on HDFC standard criteria'
    },
    forexMarkup: 2.0,
    whyThisCardWins: 'The ultimate conglomerate super-card. The Tata group touches every facet of Indian life: BigBasket for daily vegetables/groceries, Tata 1mg for all prescription medicines, Croma for household electronics, Air India Express for flights, and Taj for luxury getaways. Earning 10% back on all of them in NeuCoins (1 NeuCoin = ₹1) is extraordinary. Furthermore, being on the RuPay network, you can link it to UPI apps and earn 1.5% on roadside QR code payments.',
    roiCalculation: 'Monthly household spend: ₹8,000 on BigBasket + ₹2,000 on 1mg pharmacy + ₹10,000 on UPI QR scans: Earn 10% on Tata (₹1,000) + 1.5% on UPI (₹150) = ₹1,150/month = ₹13,800/year. Minus ₹1,499 fee = Net Gain: ₹12,301/year.',
    dealHighlights: [
      '10% value back on BigBasket groceries, 1mg medicines, and Croma appliances',
      '1.5% NeuCoins on RuPay UPI merchant QR code payments',
      '8 domestic + 4 international lounge visits (rare for a ₹1,499 fee card)',
      'Reduced foreign exchange markup of just 2.0% (vs industry standard 3.5%)',
      '1 NeuCoin = ₹1 direct deduction at checkout across all Tata brands'
    ],
    hiddenCatches: [
      'Rewards are credited as NeuCoins (spendable across Tata brands, not transferable to bank accounts)',
      'NeuCoins have a 1-year rolling expiry if not used',
      'To get the full 10%, transactions must be placed through the Tata Neu App'
    ],
    whoShouldBuy: 'Families that actively buy groceries from BigBasket, medicines from 1mg, and want a high-performing RuPay UPI card with airport lounge access.',
    whoShouldAvoid: 'People who prefer cash statement credit or don’t utilize Tata ecosystem services.',
    applicationLinkText: 'Apply via Tata Neu App or HDFC Bank Portal',
    sourceRef: SOURCES.HDFC_MITC,
    reviews: []
  },
  {
    id: 'axis-atlas',
    name: 'Axis Bank Atlas Credit Card',
    bank: 'Axis Bank',
    network: 'Visa',
    segmentId: 'travel-forex',
    annualFee: 5000,
    feeWaiverSpend: 'None',
    joiningBenefit: '5,000 EDGE Miles upon paying joining fee and making first swipe within 30 days (worth ₹10,000 in hotel stays)',
    baseRewardRate: '2 EDGE Miles per ₹100 spent (4% - 8% effective reward rate when converted to airline/hotel partners)',
    acceleratedRewardRate: '5 EDGE Miles per ₹100 on direct Airline and Hotel spends (10% - 20% effective return value)',
    loungeAccess: {
      domestic: '8 to 18 complimentary domestic lounge visits per year depending on tier (Silver/Gold/Platinum)',
      international: '4 to 12 complimentary international lounge visits per year (via card or Priority Pass)',
      condition: 'Tier upgrades based on annual spend milestones'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'Axis Atlas is without question the sharpest travel card in India for unlocking luxury hotel stays and business class flights. 1 EDGE Mile converts to 2 Partner Points across Accor Live Limitless (ALL), Singapore KrisFlyer, Qatar Airways Privilege Club, and Air France Flying Blue. Because 1 Accor ALL point is fixed at €0.02 (~₹1.80), earning 5 EDGE Miles per ₹100 on flights gives 10 Accor points = ~₹18 return per ₹100 spent (an unbelievable 18% return!).',
    roiCalculation: 'Annual spend of ₹7.5 Lakhs (qualifying for Gold Tier): Welcome Bonus (5,000 miles) + Base Spends (15,000 miles) + Milestone Bonus (5,000 miles) = 25,000 EDGE Miles = 50,000 Accor Points = ~₹90,000 worth of luxury stays at Novotel, Pullman, Sofitel, or Fairmont hotels worldwide! Minus ₹5,000 fee = Net Gain: ₹85,000 in free vacations.',
    dealHighlights: [
      '5 EDGE Miles per ₹100 spent directly on ANY airline website or hotel front desk',
      'Unrivaled 1:2 transfer ratio to Accor, KrisFlyer, and Qatar Airways',
      'Milestone bonuses up to 10,000 bonus EDGE Miles on reaching spend tiers',
      'Domestic & international lounge access that can be shared with guest travelers'
    ],
    hiddenCatches: [
      'Annual fee of ₹5,000 is NOT waivable (though the annual renewal bonus of 2,500 - 5,000 miles offsets it)',
      'Excludes wallet loads, rent, fuel, and government transactions from miles accrual',
      'Requires understanding the airline/hotel point transfer ecosystem to maximize value'
    ],
    whoShouldBuy: 'Anyone who books flights and hotels for work or leisure and wants 5-star hotel vacations across Paris, Bali, Dubai, or Singapore on points.',
    whoShouldAvoid: 'People who want simple cashback and don’t travel or care for luxury hotel points.',
    applicationLinkText: 'Apply on Axis Bank Official Website',
    sourceRef: SOURCES.AXIS_MITC,
    reviews: [
      {
        id: 'rev-atlas-1',
        author: 'Siddharth Kulkarni',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        verifiedUser: true,
        date: '2026-08-25',
        comment: 'The reigning king of travel credit cards in India. 5 EDGE Miles per ₹100 spent directly on airline websites and hotels, transferring 1:2 to Accor and airline programs. Funded my entire Bali luxury resort stay on points!',
        holdingDuration: 'Held for 19 months'
      },
      {
        id: 'rev-atlas-2',
        author: 'Tanvi Deshmukh',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        verifiedUser: true,
        date: '2026-07-31',
        comment: 'Direct booking multiplier means I do not have to book through buggy bank portals. Tier milestones (Gold/Platinum) grant bonus miles that easily beat the ₹5,000 annual fee.',
        holdingDuration: 'Held for 14 months'
      },
      {
        id: 'rev-atlas-3',
        author: 'Harshvardhan Goel',
        location: 'New Delhi',
        rating: 4,
        verifiedUser: true,
        date: '2026-06-27',
        comment: 'Outstanding reward rate for frequent domestic and international flyers. Keep an eye on the partner transfer quota limits introduced recently.',
        holdingDuration: 'Held for 22 months'
      }
    ]
  },
  {
    id: 'scapia-federal',
    name: 'Scapia Federal Bank Credit Card',
    bank: 'Federal Bank',
    network: 'Visa',
    segmentId: 'travel-forex',
    annualFee: 0,
    feeWaiverSpend: 'Lifetime Free',
    joiningBenefit: 'Lifetime Free with no joining charges',
    baseRewardRate: '10% Scapia Coins on all online/offline domestic transactions (worth 2% on travel)',
    acceleratedRewardRate: '20% Scapia Coins on flight and hotel bookings made inside the Scapia app (worth 4% on travel)',
    loungeAccess: {
      domestic: 'Unlimited domestic airport lounge access across India',
      international: 'None',
      condition: 'Requires only ₹5,000 spend on the card in the previous billing cycle'
    },
    forexMarkup: 0,
    whyThisCardWins: 'Zero Forex markup combined with Lifetime Free status and the lowest lounge spend qualification in the country (just ₹5,000 spend in previous cycle vs ₹50k-₹1L for others). When traveling to Europe, Dubai, Bangkok, or the US, typical Indian credit cards charge 3.5% + 18% GST (total 4.13%). Scapia charges 0.0%, saving you thousands on every foreign tap or hotel payment.',
    roiCalculation: 'On an international family vacation spending ₹2,00,000 abroad: Normal bank card loses ₹8,260 in forex fees; Scapia charges ₹0 in forex fee + earns 10% Scapia Coins. Total savings: ~₹12,000 on a single holiday.',
    dealHighlights: [
      '0% Foreign Currency Markup fee globally',
      'Unlimited domestic airport lounges upon spending just ₹5,000/month',
      '100% Lifetime Free credit card with instant virtual activation',
      'Scapia Coins redeemable instantly 5 Coins = ₹1 on flights and hotels with no convenience fee'
    ],
    hiddenCatches: [
      'Card onboarding is subject to Federal Bank RBI credit guidelines (occasional geographic/pincode restrictions)',
      'Coins are redeemable only within the Scapia travel booking engine'
    ],
    whoShouldBuy: 'International travelers, students booking foreign currency tests/exams, and frequent domestic flyers wanting easy lounge access.',
    whoShouldAvoid: 'People who never travel abroad and don’t use airport lounges.',
    applicationLinkText: 'Download Scapia App on iOS/Android',
    sourceRef: SOURCES.FEDERAL_SCAPIA_MITC,
    reviews: []
  },
  {
    id: 'au-ixigo',
    name: 'AU Ixigo Credit Card',
    bank: 'AU Small Finance Bank',
    network: 'Visa',
    segmentId: 'travel-forex',
    annualFee: 999,
    feeWaiverSpend: 100000,
    joiningBenefit: '1,000 Reward Points + ₹1,000 Ixigo travel vouchers upon first spend within 30 days',
    baseRewardRate: '5 to 10 reward points per ₹100 spent',
    acceleratedRewardRate: '20 reward points per ₹100 spent on train & bus bookings via Ixigo',
    loungeAccess: {
      domestic: '8 complimentary domestic airport lounge visits per year (2 per quarter)',
      international: '8 complimentary international airport lounge visits per year + 8 Railway Lounge visits per year',
      condition: 'Unconditional for international & railway lounges'
    },
    forexMarkup: 0,
    whyThisCardWins: 'It is the most comprehensive multimodal travel card in India. It offers ZERO foreign currency markup (0%), 16 domestic/international airport lounge visits, PLUS 8 railway executive lounge visits across Indian railway stations (New Delhi, Agra, Ahmedabad, Jaipur, etc.), all with a nominal ₹999 fee easily waivable on ₹1L spend.',
    roiCalculation: 'Using 8 railway executive lounges (worth ₹4,000) + 4 airport lounges (worth ₹6,000) + saving 4.13% on ₹1,00,000 foreign spends (worth ₹4,130) = Total Annual Value of ₹14,130 with zero net cost.',
    dealHighlights: [
      'Zero Foreign Currency Markup (0% Forex)',
      '8 Railway Executive Lounge visits per year across India',
      '8 International airport lounge visits per year via Priority Pass',
      'Zero payment gateway charges on train bookings via Ixigo'
    ],
    hiddenCatches: [
      'Requires AU Small Finance Bank serviceable pincode',
      'Annual fee of ₹999 requires ₹1 Lakh spend for waiver in year 2 onwards'
    ],
    whoShouldBuy: 'Travelers who mix both railway journeys and international flights and need zero-forex plus railway lounge comfort.',
    whoShouldAvoid: 'Cardholders who fly exclusively on company corporate cards.',
    applicationLinkText: 'Apply via AU Small Finance Bank / Ixigo App',
    sourceRef: SOURCES.AU_BANK_MITC,
    reviews: []
  },
  {
    id: 'bpcl-sbi-octane',
    name: 'BPCL SBI Card Octane',
    bank: 'State Bank of India (SBI Cards)',
    network: 'Visa',
    segmentId: 'fuel-commute',
    annualFee: 1499,
    feeWaiverSpend: 200000,
    joiningBenefit: '6,000 Reward Points worth ₹1,500 in BPCL fuel upon paying joining fee',
    baseRewardRate: '1 reward point per ₹100 on general spends',
    acceleratedRewardRate: '25 reward points per ₹100 spent on BPCL fuel, lubricants, and Bharatgas LPG cylinders (7.25% value back = 6.25% points + 1% surcharge waiver)',
    loungeAccess: {
      domestic: '4 complimentary domestic airport lounge visits per calendar year (1 per quarter)',
      international: 'None',
      condition: 'Unconditional'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'It provides the highest mathematically proven return on fuel in the Indian market: a massive 7.25% value back on BPCL petrol, diesel, and Bharatgas bookings up to ₹10,000 monthly spend. Reward points can be converted instantly into free fuel at any BPCL petrol pump POS machine at 4 points = ₹1.',
    roiCalculation: 'On monthly fuel spend of ₹8,000 at BPCL petrol pumps: Earn 7.25% = ₹580/month = ₹6,960 per year in free fuel. Minus ₹1,499 annual fee = Net Gain: ₹5,461 in free fuel + 4 airport lounge visits.',
    dealHighlights: [
      '7.25% value back on BPCL fuel (25 points per ₹100 + 1% surcharge waiver)',
      'Points redeemable instantly for free fuel at BPCL fuel stations',
      'Includes Bharatgas household LPG cylinder bookings via official app',
      '4 complimentary domestic airport lounge visits included'
    ],
    hiddenCatches: [
      'Benefits are strictly restricted to Bharat Petroleum (BPCL) outlets; IndianOil or HPCL transactions earn only base rewards',
      'Maximum accelerated reward points capped at 2,500 points per month (equivalent to ₹10,000 monthly fuel spend)'
    ],
    whoShouldBuy: 'Daily office commuters, cab owners, or family drivers who spend ₹4,000 - ₹10,000/month on fuel and have a nearby BPCL petrol pump.',
    whoShouldAvoid: 'EV owners or commuters who rely solely on metro/buses or have only IndianOil/HPCL bunks in their neighborhood.',
    applicationLinkText: 'Apply on SBI Card Official Portal',
    sourceRef: SOURCES.SBI_CARD_MITC,
    reviews: []
  },
  {
    id: 'hpcl-bob-energie',
    name: 'HPCL Bank of Baroda ENERGIE Credit Card',
    bank: 'Bank of Baroda',
    network: 'RuPay',
    segmentId: 'fuel-commute',
    annualFee: 499,
    feeWaiverSpend: 50000,
    joiningBenefit: '2,000 Reward Points worth ₹500 on spending ₹5,000 in first 60 days',
    baseRewardRate: '2 reward points per ₹150 on other retail spends',
    acceleratedRewardRate: '24 reward points per ₹150 (up to 5% savings) on HPCL fuel via HP Pay app + 1% fuel surcharge waiver',
    loungeAccess: {
      domestic: '4 complimentary domestic airport lounge visits per year (1/quarter)',
      international: 'None',
      condition: 'Unconditional'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'With an accessible annual fee of just ₹499 and an easy fee waiver threshold of just ₹50,000 annual spend (~₹4,166/month), this RuPay fuel card gives up to 5% savings at HPCL pumps and supports RuPay UPI merchant QR payments.',
    roiCalculation: 'On monthly fuel spend of ₹5,000 at HPCL pumps: Earn ~₹250/month = ₹3,000/year. Fee is 100% waived by easily surpassing ₹50,000 annual spend = Net Annual Gain of ₹3,000 pure fuel savings.',
    dealHighlights: [
      'Up to 5% savings on HPCL fuel purchases via HP Pay app',
      'RuPay variant enables UPI QR code linking on PhonePe/GPay',
      'Extremely low spend requirement of ₹50k for 100% fee waiver',
      '4 complimentary domestic lounge visits included'
    ],
    hiddenCatches: [
      'Maximum reward points on fuel capped at 1,000 points per billing cycle',
      'Best returns require using the HP Pay mobile wallet/app at the pump'
    ],
    whoShouldBuy: 'Commuters with nearby HPCL petrol stations who want an affordable card that also doubles up as a RuPay UPI card.',
    whoShouldAvoid: 'Drivers with no HPCL fuel stations along their daily route.',
    applicationLinkText: 'Apply on BOB Financial Portal',
    sourceRef: SOURCES.BOB_FINANCIAL_MITC,
    reviews: []
  },
  {
    id: 'phonepe-sbi-select-black',
    name: 'PhonePe SBI Card Select Black Credit Card',
    bank: 'SBI Card',
    network: 'RuPay',
    segmentId: 'rupay-upi',
    annualFee: 1499,
    feeWaiverSpend: 200000,
    joiningBenefit: 'Welcome gift voucher / reward points worth ₹1,500 credited upon fee payment and first transaction within 30 days',
    baseRewardRate: '1 reward point per ₹100 spent (1% base rate) on general retail, dining, and merchant checkout portals',
    acceleratedRewardRate: 'Up to 10% reward points on PhonePe app spends (electricity, broadband, mobile recharges, water, DTH & Switch) + 5% on partner merchants',
    loungeAccess: {
      domestic: '8 complimentary domestic airport lounge visits per calendar year (2 visits per quarter)',
      international: 'None',
      condition: 'Complimentary via RuPay India lounge network program'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'Over 500 million Indians use PhonePe and UPI for everyday transactions, yet traditional credit cards give 0% on utility bills and cannot scan merchant QR codes. The PhonePe SBI Card Select Black bridges this divide: issued on the RuPay network, it links directly into the PhonePe app for instant UPI QR code scan-and-pay while unlocking accelerated 10% value back on high-frequency recurring bills like electricity, gas, broadband, and mobile recharges. For a household spending ₹15,000/month on utilities and UPI, this yields over ₹12,000 in net gains annually.',
    roiCalculation: 'On ₹10,000 monthly PhonePe bills/recharges (10% = ₹1,000/mo) + ₹10,000 RuPay UPI scans & dining (1% = ₹100/mo) = ₹1,100/month = ₹13,200/year. Minus ₹1,499 annual fee = Net Household Profit: ₹11,701/year.',
    dealHighlights: [
      'Up to 10% value back on utility bill payments, recharges, and merchant orders inside the PhonePe app',
      'Native RuPay credit card on UPI linking for scan-and-pay at 35+ million merchant QR codes',
      '8 complimentary domestic airport lounge visits per year (2 per quarter across major Indian terminals)',
      'Welcome gift voucher worth ₹1,500 offsetting 100% of the first-year joining fee',
      '1% fuel surcharge waiver across all petrol pumps in India (for transactions ₹500 to ₹4,000)'
    ],
    hiddenCatches: [
      'Accelerated 10% PhonePe app rewards are capped at 2,000 reward points (~₹1,500) per monthly billing cycle',
      'Peer-to-peer UPI transfers (sending money to personal mobile numbers/VPAs) are strictly excluded from rewards under RBI/NPCI guidelines',
      'Fuel spends, wallet reloads, rent payments, and government/tax payments earn 0 reward points',
      'Standard 3.5% forex markup on international transactions — intended strictly for domestic UPI and Indian spending'
    ],
    whoShouldBuy: 'Consumers who use PhonePe as their primary digital wallet for electricity, Wi-Fi, and mobile bills and want domestic airport lounge access on a RuPay UPI card.',
    whoShouldAvoid: 'International travelers seeking 0% forex markup or users looking for direct airline frequent-flyer air miles conversions.',
    applicationLinkText: 'Apply on PhonePe App or SBI Card Official Portal',
    sourceRef: SOURCES.PHONEPE_SBIC,
    reviews: []
  },
  {
    id: 'tata-neu-infinity-rupay',
    name: 'Tata Neu Infinity RuPay Credit Card (UPI Edition)',
    bank: 'HDFC Bank',
    network: 'RuPay',
    segmentId: 'rupay-upi',
    annualFee: 1499,
    feeWaiverSpend: 300000,
    joiningBenefit: '1,499 NeuCoins upon card activation',
    baseRewardRate: '1.5% NeuCoins on all merchant RuPay UPI QR scans',
    acceleratedRewardRate: 'Up to 5% on Tata Neu UPI payments and 10% on Tata brands',
    loungeAccess: {
      domestic: '8 complimentary domestic lounge visits per year (2 per quarter)',
      international: '4 complimentary international lounge visits per year',
      condition: 'Quarterly spend criteria applies'
    },
    forexMarkup: 2.0,
    whyThisCardWins: 'Almost all credit cards offer 0% on UPI because credit cards previously could not be linked to UPI at all. RuPay revolutionized this. Linking Tata Neu Infinity RuPay on Google Pay, PhonePe, or Tata Neu allows you to scan ANY merchant QR code (tea stalls, kirana stores, cafes, pharmacies, salons) and earn 1.5% in real money (NeuCoins). For a consumer spending ₹30,000/month via UPI, this generates ₹5,400 per year out of thin air on transactions that previously earned ₹0.',
    roiCalculation: 'On ₹25,000 monthly UPI merchant QR spends: Earn 1.5% = ₹375/month = ₹4,500/year + ₹6,000 from grocery/pharmacy Tata apps = ₹10,500/year. Minus ₹1,499 fee = Net Gain: ₹9,001/year.',
    dealHighlights: [
      '1.5% flat NeuCoins on all merchant UPI QR code scans',
      'Accepted at tens of millions of QR codes across India via PhonePe, GPay, Paytm',
      'Includes 8 domestic + 4 international airport lounges',
      'Low 2% forex markup'
    ],
    hiddenCatches: [
      'UPI transactions to peer individuals (P2P money transfers to friends/family) do not earn rewards (merchant QR codes only)',
      'Small QR merchants below ₹2,000 sometimes disable credit card acceptance due to MDR rules'
    ],
    whoShouldBuy: 'Anyone who uses UPI for daily transactions at supermarkets, local stores, restaurants, and medical shops.',
    whoShouldAvoid: 'People who use cash or debit cards exclusively and dislike managing credit card billing cycles.',
    applicationLinkText: 'Apply on Tata Neu App or HDFC Bank',
    sourceRef: SOURCES.NPCI_RUPAY_UPI,
    reviews: []
  },
  {
    id: 'kiwi-axis-rupay',
    name: 'Kiwi Axis Bank RuPay Credit Card',
    bank: 'Axis Bank',
    network: 'RuPay',
    segmentId: 'rupay-upi',
    annualFee: 0,
    feeWaiverSpend: 'Lifetime Free',
    joiningBenefit: 'Lifetime Free virtual credit card issued instantly on your smartphone',
    baseRewardRate: '0.5% to 1.5% cashback on UPI spends',
    acceleratedRewardRate: 'Up to 2% flat cashback on scan & pay via Kiwi app on select milestone tiers',
    loungeAccess: {
      domestic: 'None',
      international: 'None',
      condition: 'Pure digital UPI card'
    },
    forexMarkup: 3.5,
    whyThisCardWins: 'It is a 100% digital, Lifetime Free RuPay credit card built from the ground up natively for UPI. There are no physical plastic card delivery delays — you get approved in 5 minutes, link it directly inside the Kiwi app, and immediately start earning direct cash rewards on every UPI merchant QR swipe.',
    roiCalculation: 'On ₹15,000 monthly UPI merchant spend: Earn ~1.5% = ₹225/month = ₹2,700/year in pure effortless cash with zero annual fee.',
    dealHighlights: [
      '100% Lifetime Free virtual RuPay card',
      '5-minute paperless V-KYC approval process',
      'Direct cashback credited to bank account or wallet',
      'Native in-app UPI transaction tracking and category categorization'
    ],
    hiddenCatches: [
      'Only virtual card provided by default (no physical card for offline magnetic/chip swipes)',
      'Cashback rates scale with Kiwi Neon subscription or milestone tiers'
    ],
    whoShouldBuy: 'Tech-savvy users wanting an instant Lifetime Free RuPay card dedicated solely to UPI payments.',
    whoShouldAvoid: 'Users wanting lounge access, physical metal cards, or airline miles.',
    applicationLinkText: 'Download Kiwi App on Play Store / App Store',
    sourceRef: SOURCES.NPCI_RUPAY_UPI,
    reviews: []
  },
  {
    id: 'hdfc-infinia-metal',
    name: 'HDFC Bank Infinia Credit Card (Metal Edition)',
    bank: 'HDFC Bank',
    network: 'Visa',
    segmentId: 'ultra-premium',
    annualFee: 12500,
    feeWaiverSpend: 1000000,
    joiningBenefit: '12,500 Reward Points upon fee payment and card activation (worth ₹12,500 in flights/hotels)',
    baseRewardRate: '5 reward points per ₹150 spent (3.33% base reward rate uncapped)',
    acceleratedRewardRate: 'Up to 5X reward points (33.3% net return) on flight bookings, hotel reservations, and gift vouchers via HDFC SmartBuy portal (Capped at 15,000 reward points per calendar month)',
    loungeAccess: {
      domestic: 'Unlimited domestic lounge access for primary and add-on cardholders + complimentary guest visits',
      international: 'Unlimited international lounge access via Priority Pass for primary & add-on members + unlimited complimentary guest visits',
      condition: 'Unconditional — no spend criteria'
    },
    forexMarkup: 2.0,
    whyThisCardWins: 'Infinia is universally recognized as the undisputed King of Indian Credit Cards. Its SmartBuy portal provides 5X rewards (16.6% to 33.3% return) on airline tickets, luxury hotels, and Amazon/Gyftr gift vouchers. Because 1 Infinia Reward Point is worth exactly ₹1.00 when booking flights or hotels, high-spenders literally fund luxury international family vacations for free every year.',
    roiCalculation: 'Annual spend of ₹15 Lakhs (with ₹3 Lakhs through SmartBuy for flights/vouchers + ₹12 Lakhs general retail): Base rewards: 40,000 points (₹40,000) + Accelerated SmartBuy: 60,000 points (₹60,000) = 1,00,000 Reward Points = ₹1,00,000 in free flights and luxury hotel stays! Fee of ₹12,500 is 100% waived on ₹10L spend = Net Pure Gain: ₹1,00,000/year.',
    dealHighlights: [
      '33.3% net reward rate on flight & hotel bookings via SmartBuy',
      '1 Reward Point = ₹1.00 hard cash value for flights and hotels on SmartBuy',
      'Unlimited international & domestic lounges with Priority Pass + guest visits',
      'Low 2% forex markup fee + Global 24/7 dedicated concierge service',
      'Fee waived completely on spending ₹10 Lakhs in a year'
    ],
    hiddenCatches: [
      'Strict invite-only eligibility: Minimum net monthly salary of ₹2.75 Lakhs - ₹3 Lakhs OR existing HDFC card with ₹8-10 Lakh limit and > ₹7.5 Lakh spends in last 6 months',
      'SmartBuy accelerated points capped at 15,000 points per month',
      'Excludes fuel, rent, and government transactions from base points'
    ],
    whoShouldBuy: 'High earners, founders, doctors, senior executives, and business owners spending > ₹12 Lakhs per year who love luxury travel.',
    whoShouldAvoid: 'Average spenders below ₹8-10 Lakh annual expenditure who cannot qualify or utilize the 1:1 SmartBuy travel redemption.',
    applicationLinkText: 'Invite-Only: Contact HDFC Imperia / Preferred RM',
    sourceRef: SOURCES.HDFC_MITC,
    reviews: []
  },
  {
    id: 'axis-olympus',
    name: 'Axis Bank Olympus Credit Card',
    bank: 'Axis Bank',
    network: 'Mastercard',
    segmentId: 'ultra-premium',
    annualFee: 20000,
    feeWaiverSpend: 'None',
    joiningBenefit: '2,500 EDGE Miles + ₹10,000 luxury hotel gift voucher',
    baseRewardRate: '1 EDGE Mile per ₹100 spent (Transfers 1:4 to partners)',
    acceleratedRewardRate: '2 EDGE Miles per ₹100 on international spends + 4 EDGE Miles per ₹100 on Axis Travel Edge',
    loungeAccess: {
      domestic: 'Unlimited domestic lounge access with guest privileges',
      international: 'Unlimited international lounge access via Priority Pass with complimentary guest privileges',
      condition: 'Unconditional'
    },
    forexMarkup: 1.8,
    whyThisCardWins: 'Designed for affluent global jetsetters, Olympus offers one of the lowest foreign currency markups in the country (1.8%), unlimited airport meet-and-greet VIP services at 32 airports worldwide, and 8 complimentary luxury airport transfers (chauffeured luxury car to and from the airport).',
    roiCalculation: '8 luxury airport chauffeured transfers (worth ₹20,000) + 2 airport meet-and-greet VIP services (worth ₹16,000) + ₹10,000 hotel voucher + miles value = ₹50,000+ tangible luxury value easily justifying the ₹20,000 fee.',
    dealHighlights: [
      'Lowest forex markup in super-premium segment (1.8%)',
      '8 complimentary luxury airport chauffeured transfers per year',
      '2 complimentary airport meet-and-greet VIP concierge services',
      'Unlimited international lounges for self + accompanying guests'
    ],
    hiddenCatches: [
      'Steep non-waivable annual fee of ₹20,000 + GST',
      'Requires Axis Bank Burgundy / High-Net-Worth private relationship'
    ],
    whoShouldBuy: 'Ultra-HNIs who frequently travel internationally and demand luxury airport transfers, VIP fast-track clearance, and global concierge.',
    whoShouldAvoid: 'Anyone seeking basic cashback or spending under ₹20 Lakhs annually.',
    applicationLinkText: 'Exclusive Burgundy / Axis Private Banking Portal',
    sourceRef: SOURCES.AXIS_MITC,
    reviews: []
  }
];
