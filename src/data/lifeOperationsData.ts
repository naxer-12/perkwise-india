import type { LifeOperationFacet } from '../types';

export const LIFE_OPERATIONS_FACETS: LifeOperationFacet[] = [
  {
    id: 'debit-cards-banking',
    title: 'High-Yield Banking, 1% Debit Cashback & Zero-Forex Cards',
    category: 'debit-cards',
    subheading: 'How to earn rewards and protect capital without credit cards or debt risk',
    dailyFrictionPoint: 'Keeping money in traditional 2.5% - 3% big-bank savings accounts while debit card swipes earn 0% and foreign ATMs eat 5% in fees.',
    smartSolution: 'Utilize 1% cashback debit cards for wallet/utility payments, keep emergency reserves in high-yield 7% savings accounts, and switch to zero-forex debit cards for international travel.',
    averageAnnualSavings: '₹12,000 - ₹28,000',
    topProgramsOrSchemes: [
      {
        name: 'HDFC Millennia Debit Card 1% Cashback Hack',
        cost: '₹500 / year (often free with Classic/Preferred/Imperia accounts)',
        perks: [
          '1% cashback on Wallet Loads (Paytm, Mobikwik) and Credit Card bill payments via PayZapp/NetBanking',
          'Capped at ₹400 per month = ₹4,800 free cash every year',
          '4 complimentary domestic airport lounge visits per year (quarterly spend criteria applies)',
          'High daily ATM withdrawal limit of ₹50,000 and POS limit of ₹3.5 Lakhs'
        ],
        breakEven: 'Break-even in 1.5 months; nets ₹4,300+ pure cash profit annually'
      },
      {
        name: 'Zero-Forex Debit Cards (Niyo Global / Fi Money / Jupiter)',
        cost: '₹0 (Lifetime Free with Federal Bank / Equitas / CSB partnerships)',
        perks: [
          '0% Forex Markup on international POS swipes, online global websites, and foreign ATMs',
          'Live interbank exchange rates without the usual 3.5% + 18% GST extortion',
          'Zero domestic maintenance fees when meeting balance or salary criteria',
          'Instant in-app card locking, location-based fraud protection, and virtual cards'
        ],
        breakEven: 'Instant break-even on the very first $100 international transaction (saves ₹350+)'
      },
      {
        name: 'High-Yield Savings & Family Banking (IDFC FIRST / AU Small Finance)',
        cost: '₹0 (Zero fee for maintaining required Average Monthly Balance)',
        perks: [
          'Earn 7.0% to 7.25% p.a. interest on savings balance above ₹5 Lakhs (vs 2.7% at SBI/HDFC)',
          'Monthly interest credit directly into account (compounding interest 12 times a year)',
          'Family Banking: Link 4-6 family member accounts under one pooled relationship balance to waive minimum balance across all of them'
        ],
        breakEven: 'Earns ₹20,000 - ₹45,000 extra interest annually on a ₹5-10 Lakh family cash reserve'
      }
    ],
    actionChecklist: [
      'Check your current HDFC debit card type; upgrade to Millennia Debit via NetBanking to start pocketing ₹400/month',
      'Open a Niyo Global or Fi Money account before traveling abroad to avoid carrying risky currency notes or high-fee forex cards',
      'Group family accounts into a single Family Banking ID to unlock priority privileges, free locker discounts, and zero-balance waivers for parents'
    ]
  },
  {
    id: 'hotel-loyalty-programs',
    title: 'Hotel Loyalty Programs: 50% Dining & Free 5-Star Nights',
    category: 'hotel-loyalty',
    subheading: 'Enjoy luxury weekend getaways and fine dining at a fraction of standard tariff',
    dailyFrictionPoint: 'Paying full retail price (₹12,000 - ₹25,000/night) for leisure stays and ₹4,000+ for 5-star hotel buffets and celebrations.',
    smartSolution: 'Leverage hotel co-branded partnerships, loyalty status tiers, and dining privilege programs that pay for themselves in a single weekend.',
    averageAnnualSavings: '₹30,000 - ₹85,000',
    topProgramsOrSchemes: [
      {
        name: 'Accor Plus Membership (Novotel, Pullman, Sofitel, Fairmont, ibis)',
        cost: '₹13,999 - ₹17,999 / year (or via Axis Bank / corporate tie-ups)',
        perks: [
          '50% FLAT discount on dining bill when 2 people dine at any Accor hotel restaurant across Asia-Pacific (India, Thailand, Bali, Singapore, etc.)',
          '1 or 2 "Stay Plus" complimentary room night vouchers redeemable at luxury properties',
          'Automatic Silver Elite status in Accor Live Limitless (ALL)',
          'Red Hot Rooms: Up to 50% off standard room rack rates during member sales'
        ],
        breakEven: 'Redeeming 1 Stay Plus night at Novotel Goa or Pullman Aerocity (value ₹12,000) + two 50% dinners completely covers the annual fee'
      },
      {
        name: 'Marriott Bonvoy HDFC Bank Credit Card',
        cost: '₹3,000 + GST / year',
        perks: [
          '1 Free Night Award (FNA) voucher every year worth up to 15,000 Marriott Bonvoy points (redeemable at top Courtyard, Fairfield, Le Méridien, or Sheraton properties)',
          '10 Elite Night Credits credited automatically every year, fast-tracking Gold/Platinum Elite status',
          'Silver Elite status included + 12 complimentary domestic lounge visits + 12 international lounge visits per year',
          'Earn 8 Marriott Bonvoy points per ₹150 spent at participating Marriott properties'
        ],
        breakEven: 'The annual Free Night Award alone is worth ₹8,000 - ₹14,000, yielding 300% ROI on the ₹3,000 fee'
      },
      {
        name: 'Taj Epicure & Tata Neu Luxury Stays (IHCL)',
        cost: 'Complimentary with Tata Neu Infinity / HDFC cards or direct membership',
        perks: [
          '25% discount on food and beverage across iconic Taj, SeleQtions, and Vivanta hotels',
          '20% discount on J Wellness Circle luxury spa therapies',
          'Complimentary room upgrade vouchers and round of celebration cakes/wine on birthdays/anniversaries',
          'Earn 5% - 10% NeuCoins on direct IHCL bookings through the Tata Neu portal'
        ],
        breakEven: 'Saves ₹3,000 - ₹6,000 per family celebration dinner at Taj restaurants'
      }
    ],
    actionChecklist: [
      'If dining out at 5-star hotels twice a year, get Accor Plus for the 50% food bill reduction',
      'Hold the Marriott Bonvoy HDFC card for an automatic luxury staycation every year for ₹3,000',
      'Sign up for free loyalty accounts (Marriott Bonvoy, Accor ALL, IHCL Taj) to unlock instant free Wi-Fi, member room rates, and late checkout'
    ]
  },
  {
    id: 'food-grocery-passes',
    title: 'Daily Groceries & Food Delivery: Eliminating Surge & Delivery Fees',
    category: 'grocery-food',
    subheading: 'Slash 15-20% off your monthly kitchen, pantry, and restaurant delivery bills',
    dailyFrictionPoint: 'Paying ₹40 - ₹80 delivery fees plus ₹30 surge pricing and handling fees on every single Swiggy/Zomato/Zepto order (costing an extra ₹1,500/month).',
    smartSolution: 'Deploy high-ROI food delivery passes paired with co-branded cards to get zero delivery fees, uncapped dining discounts, and 10% cashbacks.',
    averageAnnualSavings: '₹14,000 - ₹32,000',
    topProgramsOrSchemes: [
      {
        name: 'Swiggy One vs Zomato Gold Membership',
        cost: '₹149 - ₹299 for 3 months (frequently discounted or free via credit cards)',
        perks: [
          'Free unlimited delivery on all restaurant orders above ₹149 within 7-10 km radius',
          'Zero delivery fee on Swiggy Instamart / Zomato Blinkit on orders above ₹199',
          'Zero surge pricing during heavy rains, festival rushes, and peak dinner hours',
          'Up to 30% additional discount on Swiggy Dineout and Zomato Dining Out restaurant bills'
        ],
        breakEven: 'Break-even in just 3-4 orders. Urban users placing 15 orders/month save ₹900 - ₹1,400 monthly in pure delivery & surge fees'
      },
      {
        name: 'Zepto Pass & Blinkit VIP Subscriptions',
        cost: '₹19 to ₹99 / month',
        perks: [
          'Unlimited free delivery on quick-commerce grocery orders above ₹99',
          'Up to 20% extra discount on daily essentials, milk, bread, and fruits',
          'Priority packing during peak morning 7 AM - 9 AM breakfast slots',
          'Special promotional prices on snacks and personal care'
        ],
        breakEven: 'Break-even in only 2 orders per month'
      },
      {
        name: 'BigBasket bbstar & Tata Neu Grocery Stack',
        cost: '₹299 / 6 months or free with Tata Neu app',
        perks: [
          'Free delivery on orders above ₹199 (vs standard ₹499 threshold)',
          'Access to exclusive reserved delivery slots during festival days',
          'Stack with Tata Neu Infinity Card for 10% NeuCoins cashback on all monthly grocery baskets'
        ],
        breakEven: 'Saves ₹600 - ₹1,200 every month on a standard family grocery basket of ₹8,000'
      }
    ],
    actionChecklist: [
      'Never place an order without an active Swiggy One or Zomato Gold pass — calculate your monthly orders and renew quarterly',
      'Pay via HDFC Swiggy Card (10% cashback) or HSBC Live+ (10% cashback on groceries and dining)',
      'Stack quick-commerce passes during sale days with wallet UPI offers for double dipping'
    ]
  },
  {
    id: 'utilities-recharges-optimization',
    title: 'Utility Bills, Electricity, Gas & Broadband Automation',
    category: 'utilities-bills',
    subheading: 'Automate repetitive household bills and pocket 5-25% in real cashback',
    dailyFrictionPoint: 'Missing electricity/broadband due dates leading to late fines, or paying through basic UPI apps that offer useless scratch cards and gambling coupons.',
    smartSolution: 'Route all household utility bills through Bharat BillPay (BBPS) rebate channels and co-branded bill payment cards.',
    averageAnnualSavings: '₹6,000 - ₹15,000',
    topProgramsOrSchemes: [
      {
        name: 'Airtel Thanks BBPS & Airtel Axis Card Stack',
        cost: '₹500 card fee (waived on ₹2 Lakh spend)',
        perks: [
          '25% cashback on Airtel broadband, DTH, and mobile recharges (save ₹250/month)',
          '10% cashback on all State Electricity Board, Piped Natural Gas (PNG), and municipal water bills (save ₹250/month)',
          'Automated bill fetch ensures you never miss a due date or pay late penalties'
        ],
        breakEven: 'Instant break-even on the first electricity bill of the year'
      },
      {
        name: 'Amazon Pay Gift Card + SBI Cashback 5% Loop',
        cost: '₹0 setup',
        perks: [
          'Buy Amazon Pay Gift Cards on Gyftr / Amazon using SBI Cashback Card to earn 5% cashback',
          'Load gift voucher into Amazon Pay Balance',
          'Pay electricity, gas, water, and broadband bills via Amazon Pay BBPS using the loaded balance at an effective 5% net discount!'
        ],
        breakEven: 'Earns ₹250 - ₹500 every month on ₹5,000 - ₹10,000 household utilities'
      },
      {
        name: 'Tata Neu BBPS 5% NeuCoins Portal',
        cost: '₹0',
        perks: [
          'Pay electricity and utility bills on Tata Neu app using Tata Neu RuPay card to get 5% NeuCoins',
          'No convenience fee charged on most municipal electricity utility boards'
        ],
        breakEven: 'Direct savings from day one'
      }
    ],
    actionChecklist: [
      'Consolidate electricity, water, PNG gas, and Wi-Fi bills on one BBPS auto-fetch portal',
      'Stop paying bills directly on utility company portals with zero-reward debit cards',
      'Schedule bills 5 days before the due date to ensure bank settlement clearance'
    ]
  },
  {
    id: 'healthcare-wellness-insurance',
    title: 'Healthcare Subscriptions, Pharmacy Deals & Super Top-Up Insurance',
    category: 'health-wellness',
    subheading: 'Protect family health and slash 60% off private medical expenses',
    dailyFrictionPoint: 'Spending ₹800 - ₹1,500 every time a family member needs a quick doctor consultation, paying retail for chronic medications, and paying exorbitant health insurance premiums.',
    smartSolution: 'Adopt telemedicine subscriptions for routine family illnesses, pharmacy subscription plans for chronic meds, and the "Base + Super Top-Up" insurance strategy.',
    averageAnnualSavings: '₹22,000 - ₹60,000',
    topProgramsOrSchemes: [
      {
        name: 'Super Top-Up Health Insurance Architecture',
        cost: '₹3,500 - ₹6,000 / year for ₹50 Lakh to ₹1 Crore coverage',
        perks: [
          'How it works: Keep a modest base health policy of ₹5 Lakhs (or employer corporate cover), and attach a ₹50 Lakh Super Top-Up policy with a ₹5 Lakh deductible',
          'A standalone ₹50 Lakh base policy costs ₹30,000 - ₹45,000/year; a ₹5L Base + ₹50L Super Top-Up costs only ~₹14,000/year!',
          'Protects against catastrophic critical illness (cancer, bypass, organ transplants) without breaking your bank'
        ],
        breakEven: 'Saves ₹18,000 - ₹30,000 EVERY YEAR in health insurance premiums while giving 10X higher coverage'
      },
      {
        name: 'Practo Plus Telemedicine Family Membership',
        cost: '₹1,999 - ₹2,999 / year for up to 4 family members',
        perks: [
          'Unlimited 24/7 video and audio doctor consultations across 20+ specialties (General Physician, Pediatrician, Gynecologist, Dermatologist)',
          'Zero appointment fees — consult qualified doctors in 60 seconds from home',
          'Special discounts on home lab tests and prescription medicine deliveries'
        ],
        breakEven: 'Break-even after just 3 doctor visits in a year'
      },
      {
        name: 'Tata 1mg Care Plan & Apollo 24|7 Circle',
        cost: '₹199 - ₹599 / year',
        perks: [
          'Extra 5% to 7% discount on prescription medicines (vital for elderly parents on diabetes/BP medication)',
          'Free blood sample home collection + 2 complimentary comprehensive full-body lab checkup packages worth ₹1,500 each',
          'Zero delivery charges on health orders above ₹99'
        ],
        breakEven: 'The free health checkup package alone is worth 3X the subscription fee'
      }
    ],
    actionChecklist: [
      'Audit your family health cover: add a ₹50 Lakh or ₹1 Crore Super Top-Up with HDFC ERGO, Care, or Niva Bupa to shield against medical inflation',
      'Sign up for Tata 1mg Care Plan if ordering chronic medication monthly to trigger automatic delivery discounts and free lab tests',
      'Activate Practo Plus for elderly parents or young children to get midnight pediatric/physician guidance without hospital ER chaos'
    ]
  },
  {
    id: 'government-welfare-schemes',
    title: 'Essential Government Financial Welfare & Sovereign Social Security',
    category: 'govt-schemes',
    subheading: 'Unlock subsidized sovereign insurance, guaranteed pensions, and tax shelters',
    dailyFrictionPoint: 'Unawareness of official Government of India welfare schemes that provide life insurance and pensions for less than the cost of a cup of tea.',
    smartSolution: 'Enroll in mandatory sovereign micro-insurance through your savings bank account and maximize statutory tax-sheltered investment vehicles.',
    averageAnnualSavings: '₹25,000 - ₹70,000 in tax deductions & risk protection',
    topProgramsOrSchemes: [
      {
        name: 'PMJJBY (Pradhan Mantri Jeevan Jyoti Bima Yojana)',
        cost: '₹436 / year (only ₹1.19 per day!)',
        perks: [
          '₹2,00,000 pure term life insurance cover payable to family nominee in case of death due to any cause',
          'Available to all Indian bank account holders aged 18 to 50 years',
          'No medical test required; auto-debited once a year from your savings account in May'
        ],
        breakEven: 'Cheapest life insurance protection in human history'
      },
      {
        name: 'PMSBY (Pradhan Mantri Suraksha Bima Yojana)',
        cost: '₹20 / year (less than a cup of chai!)',
        perks: [
          '₹2,00,000 accidental death and permanent total disability cover (₹1,00,000 for partial disability)',
          'Available to all bank account holders aged 18 to 70 years',
          'Auto-debited from your bank account annually'
        ],
        breakEven: 'Unbeatable ₹2 Lakh security for just twenty rupees a year'
      },
      {
        name: 'NPS Section 80CCD(1B) Dedicated ₹50,000 Tax Shield',
        cost: '₹50,000 annual investment',
        perks: [
          'Exclusive tax deduction under Section 80CCD(1B) OVER AND ABOVE the standard ₹1.5 Lakh Section 80C limit',
          'If you fall in the 30% tax bracket, investing ₹50,000 saves you ₹15,600 (31.2% with cess) in direct income tax every year!',
          'Lowest fund management fee in the world (0.09%) invested in a blend of Equity, Corporate Bonds, and Government Gilts'
        ],
        breakEven: 'Guaranteed 31.2% instant return on day one via income tax savings'
      },
      {
        name: 'Sovereign Gold Bonds (SGB) Secondary Market & RBI Retail Direct',
        cost: 'Variable market price',
        perks: [
          'Buy Government of India SGBs on NSE/BSE secondary markets (often at a 2-4% discount to physical gold rates)',
          'Earn 2.50% p.a. guaranteed sovereign interest credited semi-annually to your bank account',
          '100% CAPITAL GAINS TAX EXEMPTION at redemption maturity (no 20% LTCG tax vs physical/mutual fund gold)',
          'RBI Retail Direct: Buy Sovereign Treasury Bills (T-Bills) and Government Bonds directly from the Reserve Bank with 0% brokerage'
        ],
        breakEven: 'Beats physical gold by 2.5% p.a. yield + eliminates 3% GST + saves 20% LTCG tax'
      }
    ],
    actionChecklist: [
      'Log into NetBanking or visit your bank branch to ensure PMJJBY (₹436) and PMSBY (₹20) auto-debits are activated on your account',
      'Open an NPS Tier-1 account on Protean/CRA and deposit ₹50,000 before March 31st to claim your Section 80CCD(1B) tax refund',
      'Open an RBI Retail Direct account for risk-free parking of emergency funds in 91-day Government of India Treasury Bills'
    ]
  },
  {
    id: 'commute-fuel-transit',
    title: 'Daily Commute, Fuel & Transit Optimization',
    category: 'fuel-transit',
    subheading: 'Insulate your daily office travel from toll hikes, traffic surge, and petrol prices',
    dailyFrictionPoint: 'Spending ₹5,000 - ₹12,000 every month on fuel surcharges, metro tokens, cab surge pricing, and manual FASTag top-ups.',
    smartSolution: 'Integrate co-branded fuel cards, metro monthly passes with auto-top-up, and automated FASTag balance sweeps.',
    averageAnnualSavings: '₹9,000 - ₹20,000',
    topProgramsOrSchemes: [
      {
        name: 'BPCL Octane 7.25% Value-Back Strategy',
        cost: '₹1,499 / year (waived on ₹2 Lakh spend)',
        perks: [
          'Earn 25 reward points per ₹100 spent at BPCL fuel stations (6.25% return) + 1% fuel surcharge waiver = 7.25% total savings',
          'Instant redemption for fuel right at the petrol pump POS terminal (4 points = ₹1)',
          'Includes Bharatgas household LPG cylinder bookings'
        ],
        breakEven: 'Commuters spending ₹6,000/month save ₹5,220 every year in free petrol'
      },
      {
        name: 'Metro Smart Card Auto-Top-Up & Monthly Passes',
        cost: '₹50 refundable card deposit',
        perks: [
          'Flat 10% to 20% discount on metro train fares compared to single-journey paper/QR tokens',
          'Avoid 15-minute queues at ticket counters during morning peak rush hours',
          'Auto-recharge enabled via National Common Mobility Card (NCMC) or RuPay cards'
        ],
        breakEven: 'Saves 40 minutes of weekly queue time + ₹2,400 - ₹4,800 in yearly commute fares'
      },
      {
        name: 'FASTag Monthly Local Pass & Auto-Cashback',
        cost: '₹0 (standard NHAI pricing)',
        perks: [
          'If commuting through a highway toll plaza daily, buy the NHAI Monthly Pass (typically ~₹330/month for unlimited passes within 20km radius vs paying ₹100+ per round trip!)',
          'Auto-recharge FASTag using credit cards to earn reward points and prevent blacklisting at toll barriers'
        ],
        breakEven: 'Daily toll commuters save over ₹2,000 every month with the NHAI 20km local pass'
      }
    ],
    actionChecklist: [
      'Stop buying daily metro tokens: switch to an NCMC Smart Card for an immediate 10-20% fare discount',
      'If you live within 20 km of a toll booth, apply for the NHAI local monthly pass via the IHMCL portal',
      'Use BPCL Octane SBI or HPCL BOB card for all fuel refills to reclaim 5-7.25% in value'
    ]
  },
  {
    id: 'entertainment-memberships',
    title: 'Entertainment, Movies & All-in-One Subscription Bundles',
    category: 'entertainment-ott',
    subheading: 'Stop paying individually for 5 different OTT apps and full price for cinema seats',
    dailyFrictionPoint: 'Subscribing separately to Netflix, Disney+ Hotstar, SonyLIV, YouTube Premium, and Amazon Prime, racking up ₹1,200+/month in fragmented recurring bills.',
    smartSolution: 'Leverage multi-app aggregator memberships like Times Prime and credit/debit card Buy-One-Get-One (BOGO) cinema privileges.',
    averageAnnualSavings: '₹8,000 - ₹18,000',
    topProgramsOrSchemes: [
      {
        name: 'Times Prime All-in-One Aggregator Bundle',
        cost: '₹999 - ₹1,199 / year (often available for ₹699 via corporate or card offers)',
        perks: [
          'Disney+ Hotstar Super (6 months) included',
          'SonyLIV Premium (6 months) included',
          'Google One 100GB Cloud Storage (6 months) included',
          'Cricbuzz Plus, Discovery+, and Gaana Plus subscriptions bundled',
          'Exclusive discounts on Uber Premier, Starbucks (20% off), Cult.fit, and Ferns N Petals'
        ],
        breakEven: 'Purchasing Hotstar + SonyLIV separately costs ₹1,800+; Times Prime bundles both plus 15 other perks for half the cost'
      },
      {
        name: 'BookMyShow BOGO Master Strategy',
        cost: 'Free with qualifying credit/debit cards',
        perks: [
          'Buy One Get One (BOGO) free movie ticket up to ₹250 - ₹500 per ticket',
          'Available on cards like ICICI Sapphiro/Rubyx, Axis Neo/Select, SBI Elite, IndusInd Legend, and select RuPay Select debit cards',
          'Weekend IMAX & 4DX ticket cost halved'
        ],
        breakEven: 'Watching 1 movie a month with a partner saves ₹3,000 - ₹6,000 every year'
      }
    ],
    actionChecklist: [
      'Never pay retail price for individual OTT apps — check Times Prime or Airtel/Jio fiber bundled plans first',
      'Always check the "Offers" tab on BookMyShow before entering your card details to trigger your card’s BOGO quota',
      'Cancel inactive subscriptions before auto-renewal via Google Play Store / Apple Subscriptions settings'
    ]
  },
  {
    id: 'hardware-workplace-perks',
    title: 'Workplace, Hardware & Productivity Ecosystem Discounts',
    category: 'workspace-hardware',
    subheading: 'Save tens of thousands on laptops, phones, and software via legitimate schemes',
    dailyFrictionPoint: 'Paying full retail price for laptops, phones, monitors, and cloud storage when corporate, student, and GST discounts exist.',
    smartSolution: 'Utilize corporate Employee Purchase Programs (EPP), student education stores, GST Input Tax Credit (ITC), and family cloud pools.',
    averageAnnualSavings: '₹25,000 - ₹80,000 on major purchases',
    topProgramsOrSchemes: [
      {
        name: 'Apple & Samsung Corporate / Student EPP Discounts',
        cost: '₹0 (requires corporate email ID or college student ID)',
        perks: [
          'Apple Education Store: 10% - 15% discount on MacBooks & iPads + complimentary AirPods or Apple Pencil during summer promotions',
          'Apple Corporate EPP: 7% - 10% discount on iPhones, Macs, and accessories through corporate partner portals',
          'Samsung Corporate Privilege: Up to 25% - 30% off Galaxy smartphones, OLED TVs, and monitors with corporate email login + free screen replacement'
        ],
        breakEven: 'Saves ₹10,000 - ₹25,000 on a single laptop or flagship smartphone purchase'
      },
      {
        name: 'GST Input Tax Credit (18% ITC) for Freelancers & Founders',
        cost: 'Requires active GSTIN',
        perks: [
          'All business-related hardware purchases (laptops, office chairs, monitors, phones, Wi-Fi routers) carry 18% GST',
          'Provide your GSTIN on Amazon Business, Croma, or Apple Store to claim 100% of the 18% GST back against your output tax liability',
          'In addition, claim 100% depreciation (or 40% WDV) in your ITR computation to reduce taxable profit'
        ],
        breakEven: 'Saves ₹18,000 on a ₹1,00,000 laptop purchase + cuts income tax liability'
      },
      {
        name: 'Microsoft 365 & Google One Family Cloud Sharing',
        cost: '₹6,199 / year for M365 Family (shared across 6 people = ₹86/month per person)',
        perks: [
          'Each of the 6 members gets 1,000 GB (1 TB) of private, isolated OneDrive cloud storage',
          'Full desktop access to Word, Excel, PowerPoint, Outlook on PC/Mac/iPad for 5 devices per person',
          'Google One 2TB plan can also be shared with up to 5 family members with unified billing'
        ],
        breakEven: 'Buying standalone 1TB storage from Dropbox/Google costs ₹650+/month per person; M365 Family costs just ₹86/month'
      }
    ],
    actionChecklist: [
      'Register on Amazon Business using your GSTIN to automatically receive GST input tax invoices on all electronics and office supplies',
      'Before purchasing any Apple or Samsung device, log in with your official corporate/university email to unlock the EPP store',
      'Convert individual cloud storage subscriptions into a single Microsoft 365 or Google One Family plan to divide costs by 6'
    ]
  }
];
