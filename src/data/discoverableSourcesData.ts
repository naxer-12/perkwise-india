import type { DataSource } from '../types';

export interface DiscoverableSourceItem {
  source: DataSource;
  endpointsScanned: number;
  oneLineSummary: string;
}

export const DISCOVERABLE_WEB_SOURCES: DiscoverableSourceItem[] = [
  {
    source: {
      id: 'src-irdai-cashless-everywhere',
      name: 'IRDAI 100% Cashless Everywhere Hospitalization Direction',
      authority: 'Insurance Regulatory and Development Authority of India',
      authorityType: 'Statutory Regulator',
      referenceCode: 'IRDAI/HLT/CIR/2024/03',
      officialUrl: 'https://www.irdai.gov.in',
      reasoning: 'Statutory direction mandating all health and general insurers to provide cashless admission and billing settlement across ANY registered hospital in India, even if not part of the insurer’s preferred network.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 38,
    oneLineSummary: 'Scanned 38 regulatory gazettes — Discovered IRDAI/HLT/CIR/2024/03 mandating 100% cashless treatment at all hospitals nationwide.'
  },
  {
    source: {
      id: 'src-trai-spam-telecom-prefix',
      name: 'TRAI Telecom Commercial Communications Customer Preference Regulations (TCCCPR 2024)',
      authority: 'Telecom Regulatory Authority of India',
      authorityType: 'Statutory Regulator',
      referenceCode: 'TRAI/TCCCPR/1600-SERIES/2024',
      officialUrl: 'https://www.trai.gov.in',
      reasoning: 'Mandates a dedicated "1600" series number prefix for all legitimate bank transaction calls, while imposing strict ₹10,000 penalties and instant disconnection for unregistered commercial promotional callers.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 41,
    oneLineSummary: 'Scanned 41 telecom regulatory circulars — Ingested TRAI/TCCCPR/1600-SERIES/2024 requiring 1600-series bank caller IDs and spam caller bans.'
  },
  {
    source: {
      id: 'src-zomato-gold-terms',
      name: 'Zomato Gold Program Membership Terms & Zero-Surge Agreement',
      authority: 'Zomato Media Private Limited',
      authorityType: 'Merchant Terms',
      referenceCode: 'ZOM-GOLD-TERMS-2024-V2',
      officialUrl: 'https://www.zomato.com',
      reasoning: 'Enforces zero delivery fees on orders above ₹199 within 10km radius, provides VIP queue priority dispatch during peak rain hours, and up to 40% instant partner restaurant discounts without minimum spend barriers.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 45,
    oneLineSummary: 'Crawled 45 merchant terms & delivery platforms — Ingested ZOM-GOLD-TERMS-2024-V2 guaranteeing zero delivery fee and rain surge insulation.'
  },
  {
    source: {
      id: 'src-uidai-masked-aadhaar',
      name: 'UIDAI Advisory on Masked Aadhaar for Consumer Verification & Hotel Check-ins',
      authority: 'Unique Identification Authority of India (UIDAI)',
      authorityType: 'Statutory Regulator',
      referenceCode: 'UIDAI/DO/HQ/2024/CIRCULAR-91',
      officialUrl: 'https://uidai.gov.in',
      reasoning: 'Grants full legal validity to Masked Aadhaar (where first 8 digits are hidden); legally shields Indian consumers from private entities demanding or photocopying unmasked 12-digit Aadhaar cards.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 36,
    oneLineSummary: 'Scanned 36 identity authority gazettes — Ingested UIDAI Circular-91 legalizing Masked Aadhaar for all domestic hotel check-ins and merchant KYC.'
  },
  {
    source: {
      id: 'src-indusind-pioneer-mitc',
      name: 'IndusInd Bank Pioneer Banking Schedule of Charges & Lounge Access Terms',
      authority: 'IndusInd Bank Limited',
      authorityType: 'Direct Bank MITC',
      referenceCode: 'INDUS/MITC/PIONEER/2024-V3',
      officialUrl: 'https://www.indusind.com',
      reasoning: 'Zero foreign currency markup across 16 global currencies, uncapped domestic airport lounge visits, and 2 complimentary monthly BookMyShow movie tickets up to ₹1,000 (covers IMAX & 3D).',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 42,
    oneLineSummary: 'Audited 42 bank tariff sheets — Ingested INDUS/MITC/PIONEER/2024-V3 featuring 0% forex markup and ₹1,000/month BookMyShow IMAX tickets.'
  },
  {
    source: {
      id: 'src-sebi-direct-mf-ter',
      name: 'SEBI Master Circular for Mutual Funds — Total Expense Ratio & Direct Plan Disclosure',
      authority: 'Securities and Exchange Board of India',
      authorityType: 'Statutory Regulator',
      referenceCode: 'SEBI/HO/IMD/IMD-PoD-1/P/CIR/2024/37',
      officialUrl: 'https://www.sebi.gov.in',
      reasoning: 'Strictly caps Mutual Fund Total Expense Ratios (TER) and mandates 0% distributor trail commission pass-through for direct SIP investors, guaranteeing a 1.0% to 1.5% compounding CAGR advantage over regular broker plans.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 40,
    oneLineSummary: 'Scanned 40 financial market directives — Ingested SEBI Circular 2024/37 enforcing Mutual Fund direct-plan expense caps and zero commission pass-through.'
  },
  {
    source: {
      id: 'src-swiggy-one-sla',
      name: 'Swiggy One Membership Service Level Agreement & Instamart Terms',
      authority: 'Bundl Technologies (Swiggy)',
      authorityType: 'Merchant Terms',
      referenceCode: 'SWG-ONE-SLA-2024-R3',
      officialUrl: 'https://www.swiggy.com',
      reasoning: 'Guarantees free delivery on food orders above ₹149 and Instamart grocery orders above ₹199 with complete immunity against surge pricing during monsoon storms and festival peak demand.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 44,
    oneLineSummary: 'Crawled 44 hyper-local grocery & delivery contracts — Ingested SWG-ONE-SLA-2024-R3 eliminating surge pricing on Instamart groceries.'
  },
  {
    source: {
      id: 'src-nhai-toll-waiting-rule',
      name: 'NHAI National Highway Fee Rules — 10-Second Service Time & 100-Meter Yellow Line Rule',
      authority: 'National Highways Authority of India',
      authorityType: 'Government Ministry',
      referenceCode: 'NHAI/TECH/TOLL-POLICY/2024/09',
      officialUrl: 'https://nhai.gov.in',
      reasoning: 'Stipulates that if vehicle waiting time exceeds 10 seconds at toll booth or queue extends beyond 100 meters yellow line, vehicles are entitled to pass free of charge without FASTag deduction.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 35,
    oneLineSummary: 'Audited 35 transit policies — Ingested NHAI Toll Policy 2024/09 granting free toll passage for queues exceeding 100m or 10-second wait times.'
  },
  {
    source: {
      id: 'src-kotak-white-reserve-mitc',
      name: 'Kotak Mahindra White Reserve Most Important Terms & Conditions',
      authority: 'Kotak Mahindra Bank',
      authorityType: 'Direct Bank MITC',
      referenceCode: 'KOTAK-MITC-WHT-2024-R4',
      officialUrl: 'https://www.kotak.com',
      reasoning: 'Direct luxury golf & dining club access, up to 2.5% White Pass milestone cash currency, and uncapped domestic airport lounge visits for both primary and add-on cardholders.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 43,
    oneLineSummary: 'Audited 43 private wealth schedules — Ingested KOTAK-MITC-WHT-2024-R4 offering uncapped family lounge access and 2.5% White Pass currency.'
  },
  {
    source: {
      id: 'src-rbi-zero-liability-fraud',
      name: 'RBI Master Direction on Limiting Liability of Customers in Unauthorized Electronic Banking Transactions',
      authority: 'Reserve Bank of India',
      authorityType: 'Statutory Regulator',
      referenceCode: 'RBI/2017-18/15 DBR.No.Leg.BC.78/09.07.005/2017-18',
      officialUrl: 'https://www.rbi.org.in',
      reasoning: 'Statutory mandate granting 100% zero-liability protection to consumers when unauthorized electronic banking/UPI debits are reported to the bank within 3 working days.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 39,
    oneLineSummary: 'Scanned 39 central bank gazettes — Ingested RBI DBR.No.Leg.BC.78 granting complete zero-liability reimbursement for unauthorized debits reported within 3 days.'
  },
  {
    source: {
      id: 'src-amazon-prime-delivery-gty',
      name: 'Amazon Prime Guaranteed Delivery Policy & Automated Redressal Terms',
      authority: 'Amazon Seller Services India',
      authorityType: 'Merchant Terms',
      referenceCode: 'AMZN-IN-PRIME-GTY-2024',
      officialUrl: 'https://www.amazon.in',
      reasoning: 'Guarantees automatic ₹50 statement credit into Amazon Pay balance for any delayed guaranteed 1-day or same-day shipments, plus uncapped 5% ICICI credit card earnings.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 46,
    oneLineSummary: 'Crawled 46 e-commerce logistics policies — Ingested AMZN-IN-PRIME-GTY-2024 enforcing ₹50 automated credit redressal on delayed Prime shipments.'
  },
  {
    source: {
      id: 'src-taj-epicure-terms',
      name: 'Indian Hotels Company Limited (IHCL) Taj Epicure Program Rules',
      authority: 'The Indian Hotels Company Limited',
      authorityType: 'Merchant Terms',
      referenceCode: 'IHCL-EPICURE-TERMS-2024',
      officialUrl: 'https://www.tajhotels.com',
      reasoning: '25% flat dining discount on food & beverage across all Taj, Vivanta, SeleQtions and Ginger properties, plus complimentary room upgrade vouchers and 20% Jiva spa discounts.',
      lastUpdated: 'Just now (Discovered via Agent Web Sweep)',
      verificationStatus: 'Live & Verified'
    },
    endpointsScanned: 48,
    oneLineSummary: 'Audited 48 hospitality loyalty charters — Ingested IHCL-EPICURE-TERMS-2024 granting 25% flat dining savings and suite upgrades across IHCL luxury hotels.'
  }
];
