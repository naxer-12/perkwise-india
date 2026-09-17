import type { ChecklistItem } from '../types';

export interface ChecklistStage {
  stageId: number;
  stageTitle: string;
  stageShortTitle: string;
  description: string;
  iconName: string;
}

export const CHECKLIST_STAGES: ChecklistStage[] = [
  {
    stageId: 1,
    stageTitle: 'Stage 1: Pre-Requisite Audit & Profile Health',
    stageShortTitle: '1. Profile Audit',
    description: 'Ensure your baseline financial health and credit eligibility meet strict RBI and bank underwriting criteria before submitting any application.',
    iconName: 'ShieldCheck'
  },
  {
    stageId: 2,
    stageTitle: 'Stage 2: KYC & Identity Verification Readiness',
    stageShortTitle: '2. Identity & KYC',
    description: 'Avoid automatic system rejections by ensuring your PAN, Aadhaar, and current address records are 100% matched and up-to-date.',
    iconName: 'FileBadge'
  },
  {
    stageId: 3,
    stageTitle: 'Stage 3: Income Documentation & Financial Proofs',
    stageShortTitle: '3. Income Proofs',
    description: 'Prepare clean, verifiable salary slips, bank statements, or ITR acknowledgment files before beginning the digital application form.',
    iconName: 'Receipt'
  },
  {
    stageId: 4,
    stageTitle: 'Stage 4: Relationship Strategy & Cooling-Off Audit',
    stageShortTitle: '4. Bank Strategy',
    description: 'Strategically time your application to protect your CIBIL score and unlock pre-approved offers with zero income document friction.',
    iconName: 'Compass'
  },
  {
    stageId: 5,
    stageTitle: 'Stage 5: Video-KYC (V-KYC) Room & Equipment Setup',
    stageShortTitle: '5. V-KYC Readiness',
    description: 'Get your physical documents, environment, and smartphone permissions ready for a smooth 3-minute video verification with the bank agent.',
    iconName: 'Video'
  },
  {
    stageId: 6,
    stageTitle: 'Stage 6: Post-Approval Setup & Smart Security Guardrails',
    stageShortTitle: '6. Post-Approval',
    description: 'Configure your card correctly within the first 30 days to avoid accidental fees, prevent card cancellation, and safeguard against fraud.',
    iconName: 'Sliders'
  }
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Stage 1
  {
    id: 'cibil-score-check',
    stageId: 1,
    stageTitle: 'Stage 1: Pre-Requisite Audit & Profile Health',
    title: 'CIBIL / Credit Bureau Score >= 750 (or Clean Credit History)',
    description: 'Check your official credit score via OneScore, Paisabazaar, or bank apps. Prime cards (SBI, HDFC, Axis, ICICI) require 750+ for instant algorithmic approval.',
    required: true,
    applicableFor: 'all',
    proTip: 'If your score is between 700-740, stick to entry-level cards like Amazon Pay ICICI or apply where you hold an active salary account.',
    pitfallToAvoid: 'Never apply for multiple cards if your score is below 700. It triggers a hard rejection, causing an immediate 10-25 point score drop.',
    documentsNeeded: ['Free CIBIL Report PDF / Experian Score screenshot']
  },
  {
    id: 'age-and-citizenship',
    stageId: 1,
    stageTitle: 'Stage 1: Pre-Requisite Audit & Profile Health',
    title: 'Age Eligibility (21 to 65 Years) & Resident Indian Status',
    description: 'Most banks mandate an age between 21 and 65 years. Add-on cards are available for family members aged 18+.',
    required: true,
    applicableFor: 'all',
    proTip: 'Students aged 18-20 can apply for a Fixed-Deposit backed card like IDFC WOW or get an Add-on card under a parent’s primary account.',
    pitfallToAvoid: 'Applying when 18-20 for unsecured cards results in automatic system rejection regardless of income.',
    documentsNeeded: ['Date of Birth proof on PAN / Aadhaar']
  },
  {
    id: 'dti-ratio',
    stageId: 1,
    stageTitle: 'Stage 1: Pre-Requisite Audit & Profile Health',
    title: 'Debt-to-Income (DTI) Ratio Under 40%',
    description: 'Ensure your existing monthly EMIs (personal loans, car loans, existing credit card EMIs) do not exceed 40-50% of your net in-hand monthly salary.',
    required: true,
    applicableFor: 'salaried',
    proTip: 'Close small buy-now-pay-later (BNPL) accounts (Lazypay, Simpl, Amazon Pay Later) if inactive, as they appear as active credit lines on CIBIL.',
    pitfallToAvoid: 'Carrying large revolving balances on existing credit cards signals financial distress to bank underwriters.'
  },
  {
    id: 'employment-stability',
    stageId: 1,
    stageTitle: 'Stage 1: Pre-Requisite Audit & Profile Health',
    title: 'Minimum Employment Vintage (6 Months Salaried / 2 Years Self-Employed)',
    description: 'Salaried employees must have completed probation or at least 6 months at their current employer (or 1 year total work experience).',
    required: true,
    applicableFor: 'all',
    proTip: 'Wait until you receive at least 3 consecutive salary credits with your current employer before initiating an application.',
    pitfallToAvoid: 'Applying during job transition or probation period when salary slips may show temporary prorated amounts.'
  },

  // Stage 2
  {
    id: 'pan-aadhaar-linkage',
    stageId: 2,
    stageTitle: 'Stage 2: KYC & Identity Verification Readiness',
    title: 'PAN Card Linked to Aadhaar & Operational on Income Tax Portal',
    description: 'Verify on the Income Tax e-filing portal that your PAN is active and linked to Aadhaar. Any spelling mismatch between PAN and Aadhaar names will abort digital KYC.',
    required: true,
    applicableFor: 'all',
    proTip: 'Check your name spelling, father’s name, and date of birth across both documents. They must match letter-for-letter.',
    pitfallToAvoid: 'If your PAN is marked inoperative due to Aadhaar non-linkage, your application will be instantly blocked by automated KYC bots.',
    documentsNeeded: ['Original Physical PAN Card', 'Aadhaar Card with full DOB']
  },
  {
    id: 'aadhaar-mobile-otp',
    stageId: 2,
    stageTitle: 'Stage 2: KYC & Identity Verification Readiness',
    title: 'Aadhaar Linked to Active Mobile Number for Instant OTP',
    description: 'Digital paperless e-KYC uses UIDAI OTP verification. Your mobile number registered with UIDAI must be active and able to receive instant SMS OTPs.',
    required: true,
    applicableFor: 'all',
    proTip: 'Test receiving an OTP by downloading your e-Aadhaar from the official UIDAI portal before starting the bank application.',
    pitfallToAvoid: 'Starting an application with an old phone number where you cannot receive the UIDAI OTP within the 5-minute session timeout window.'
  },
  {
    id: 'address-proof-current',
    stageId: 2,
    stageTitle: 'Stage 2: KYC & Identity Verification Readiness',
    title: 'Current Residence Address Matches Serviceable Pincode',
    description: 'If your Aadhaar has your hometown permanent address but you reside in a rented apartment in Bengaluru/Mumbai/Gurugram, have an official document ready.',
    required: true,
    applicableFor: 'all',
    proTip: 'Keep a recent utility bill (electricity, piped gas, broadband bill) or registered rent agreement in your name ready as secondary address proof.',
    pitfallToAvoid: 'Giving a rural or unserviceable pincode where bank courier agents do not deliver physical cards.'
  },

  // Stage 3
  {
    id: 'salary-slips',
    stageId: 3,
    stageTitle: 'Stage 3: Income Documentation & Financial Proofs',
    title: 'Last 3 Months Salary Slips (PDF Format)',
    description: 'Original computer-generated salary slips containing company logo, employer corporate email/domain, employee ID, and detailed gross/net deductions.',
    required: true,
    applicableFor: 'salaried',
    proTip: 'Ensure salary slips are password-unlocked or note down the PDF password (e.g. DDMM+EmpID) so you can enter it when prompted during document upload.',
    pitfallToAvoid: 'Uploading cropped, blurry phone camera photos of printed slips. Always upload clean original digital PDFs.',
    documentsNeeded: ['Month 1, 2, and 3 Salary Slips PDF']
  },
  {
    id: 'bank-statement-salary',
    stageId: 3,
    stageTitle: 'Stage 3: Income Documentation & Financial Proofs',
    title: 'Last 6 Months Bank Statement Showing Salary Credits',
    description: 'Official digital bank statement showing consistent salary credits from your registered employer matching your salary slip amounts.',
    required: true,
    applicableFor: 'salaried',
    proTip: 'Use NetBanking Account Aggregator (AA) consent during application for 10-second instant paperless verification without uploading PDFs.',
    pitfallToAvoid: 'Statements with frequent cheque bounces, negative balance penalties, or irregular cash deposits that trigger risk flags.',
    documentsNeeded: ['6 Months Bank Statement PDF downloaded from NetBanking']
  },
  {
    id: 'form16-itr',
    stageId: 3,
    stageTitle: 'Stage 3: Income Documentation & Financial Proofs',
    title: 'Latest Form 16 (Part A & B) or Last 2 Years ITR V + Computation',
    description: 'For salaried: Latest Form 16. For self-employed/freelancers: Last 2 financial years ITR V acknowledgment with complete computation sheet showing net taxable income > ₹5 Lakhs.',
    required: false,
    applicableFor: 'all',
    proTip: 'For premium cards (Axis Atlas, HDFC Infinia), submitting Form 16 with gross salary > ₹18-25 Lakhs guarantees higher credit limits.',
    pitfallToAvoid: 'Self-employed individuals submitting ITR with business turnover instead of net taxable income.',
    documentsNeeded: ['Form 16 Part A & B PDF' , 'ITR V Acknowledgement + Computation Sheet']
  },

  // Stage 4
  {
    id: 'pre-approved-offer-check',
    stageId: 4,
    stageTitle: 'Stage 4: Relationship Strategy & Cooling-Off Audit',
    title: 'Check Pre-Approved / Pre-Qualified Offers in Existing NetBanking',
    description: 'Log into your primary salary or savings bank mobile app (HDFC, ICICI, Axis, SBI) and check the "Cards / Offers" tab for pre-approved cards.',
    required: false,
    applicableFor: 'all',
    proTip: 'Pre-approved cards require ZERO income documents and zero physical verification. They are approved instantly within 60 seconds with 100% success rate!',
    pitfallToAvoid: 'Applying through third-party unsolicited spam phone calls instead of your bank’s official verified mobile app.'
  },
  {
    id: 'inquiry-cooldown',
    stageId: 4,
    stageTitle: 'Stage 4: Relationship Strategy & Cooling-Off Audit',
    title: 'Ensure No Other Credit Inquiries in Past 90 Days',
    description: 'Verify you have not applied for a personal loan or credit card in the last 3 months. Multiple hard inquiries in a short span signal desperation to credit algorithms.',
    required: true,
    applicableFor: 'all',
    proTip: 'Space out your credit card applications by at least 90 to 120 days to allow your CIBIL score to absorb the inquiry and rebound.',
    pitfallToAvoid: 'Submitting 3-4 applications across different banks on the same weekend ("shotgun approach") — almost guarantees multiple rejections.'
  },
  {
    id: 'cooling-off-bank-rejection',
    stageId: 4,
    stageTitle: 'Stage 4: Relationship Strategy & Cooling-Off Audit',
    title: 'Verify 6-Month Cooling-Off Period if Previously Rejected by Same Bank',
    description: 'If HDFC, SBI, or Axis rejected your application recently, their core banking systems enforce a mandatory 180-day cooling-off lock.',
    required: true,
    applicableFor: 'all',
    proTip: 'If recently rejected by Bank A, apply to Bank B (which operates on independent underwriting) or wait out the full 6 months.',
    pitfallToAvoid: 'Re-applying to the same bank within 30-60 days; the automated engine will auto-reject it without pulling fresh documents.'
  },

  // Stage 5
  {
    id: 'vkyc-original-pan',
    stageId: 5,
    stageTitle: 'Stage 5: Video-KYC (V-KYC) Room & Equipment Setup',
    title: 'Original Physical Hard Plastic PAN Card in Hand',
    description: 'During Video KYC, the bank officer will ask you to show the physical PAN card to the rear camera. E-PAN or photocopies are strictly prohibited.',
    required: true,
    applicableFor: 'all',
    proTip: 'Clean the camera lens of your smartphone so the PAN number, photo, and hologram are razor sharp under good room lighting.',
    pitfallToAvoid: 'Showing a digital PDF copy on a laptop screen or an old laminated photocopy — the agent will immediately terminate the call.',
    documentsNeeded: ['Original Physical PAN Card']
  },
  {
    id: 'vkyc-paper-pen',
    stageId: 5,
    stageTitle: 'Stage 5: Video-KYC (V-KYC) Room & Equipment Setup',
    title: 'Blank White A4 Paper & Dark Blue/Black Ballpoint Pen',
    description: 'The bank agent will ask you to sign live on a blank white sheet of paper while streaming on camera to match with your PAN record.',
    required: true,
    applicableFor: 'all',
    proTip: 'Practice your signature once beforehand to ensure it matches your PAN card signature.',
    pitfallToAvoid: 'Using ruled notebook paper or gel pens that smudge. Use plain printer paper.'
  },
  {
    id: 'vkyc-environment-gps',
    stageId: 5,
    stageTitle: 'Stage 5: Video-KYC (V-KYC) Room & Equipment Setup',
    title: 'Quiet Well-Lit Room & Browser Geolocation/GPS Allowed',
    description: 'Per RBI regulations, Video KYC must be conducted within Indian geographic territory. You must grant browser location, camera, and microphone permissions.',
    required: true,
    applicableFor: 'all',
    proTip: 'Sit facing a window or bright lamp so your face is clearly lit without heavy shadows behind you.',
    pitfallToAvoid: 'Attempting V-KYC while connected to a corporate VPN (which masks your Indian IP) or while physically traveling outside India.'
  },

  // Stage 6
  {
    id: 'activate-card-30-days',
    stageId: 6,
    stageTitle: 'Stage 6: Post-Approval Setup & Smart Security Guardrails',
    title: 'Mandatory Card Activation & OTP Pin Setup Within 30 Days',
    description: 'Under RBI Master Directions, if a cardholder does not activate their newly issued credit card with an OTP transaction or PIN setup within 30 days, the bank is legally obligated to permanently cancel the card.',
    required: true,
    applicableFor: 'all',
    proTip: 'As soon as the physical card arrives, set your 4-digit ATM PIN via NetBanking and make a small ₹100 recharge or grocery transaction.',
    pitfallToAvoid: 'Letting the card sit unopened in its courier envelope for more than 30 days.'
  },
  {
    id: 'set-transaction-limits',
    stageId: 6,
    stageTitle: 'Stage 6: Post-Approval Setup & Smart Security Guardrails',
    title: 'Configure Online, POS, and International Limits in Mobile App',
    description: 'Set custom daily spending limits (e.g. ₹25,000 for e-commerce, ₹10,000 for POS). Disable ATM cash withdrawals and International transactions until you actually travel.',
    required: true,
    applicableFor: 'all',
    proTip: 'Turn off ATM cash withdrawals completely. Withdrawing cash on a credit card attracts immediate 3.5% finance charges from day 1 with zero interest-free period.',
    pitfallToAvoid: 'Leaving international transactions turned ON when residing in India — this exposes you to foreign payment gateway fraud without OTP.'
  },
  {
    id: 'setup-auto-debit-total',
    stageId: 6,
    stageTitle: 'Stage 6: Post-Approval Setup & Smart Security Guardrails',
    title: 'Enable Auto-Debit for "TOTAL AMOUNT DUE" (Never "Minimum Due")',
    description: 'Set up an automatic mandate from your primary bank account to clear the full credit card statement balance every month 2 days before the due date.',
    required: true,
    applicableFor: 'all',
    proTip: 'Never select "Minimum Amount Due". Revolving a balance triggers an extortionate 42% - 48% annualized interest rate and invalidates the interest-free grace period on all subsequent purchases.',
    pitfallToAvoid: 'Relying on manual reminders to pay bills — a single day of missed payment incurs a ₹1,200 late fee plus damaging CIBIL report.'
  },
  {
    id: 'claim-joining-vouchers',
    stageId: 6,
    stageTitle: 'Stage 6: Post-Approval Setup & Smart Security Guardrails',
    title: 'Claim Welcome Vouchers & Complete Milestone Spend in First 30-90 Days',
    description: 'Check welcome bonus criteria (e.g. spend ₹10,000 within 30 days to unlock ₹1,000 Amazon voucher or 5,000 welcome points).',
    required: false,
    applicableFor: 'all',
    proTip: 'Add the card as default payment method on your routine apps (Swiggy, Amazon, Uber) to effortlessly hit the welcome spend target.',
    pitfallToAvoid: 'Forgetting to claim the voucher code sent via SMS/email within its 30-day validity window.'
  }
];
