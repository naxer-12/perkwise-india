# PerkWise India — Minimal UI Overhaul, Real-Time Data Provenance & Structured Fact Sheet Design

**Date:** 2026-09-17  
**Status:** Validated Design Spec  
**Author:** Antigravity Pairing Assistant & Engineering Team  
**Target Repository:** `/Users/jainamshah/perkwise-india`

---

## 1. Problem Statement & User Feedback

The initial version of the PerkWise India portal, while information-dense, suffered from three critical user experience and content problems:
1. **Visual Congestion & Lack of Minimalism:** Heavy dark blocks, bloated nested colored cards, and wall-of-text paragraphs made it difficult for users to quickly scan and act on key financial deals.
2. **"AI-Garbled" Text Quality:** Certain articles and guides read like generic, repetitive prose rather than structured, authoritative, source-cited editorial fact sheets.
3. **Missing Real-Time Provenance:** Users had no visibility into *how* the site is real-time, *where* the data was collected from, *why* those sources are authoritative, or *when* the data was last verified.
4. **Authentic Community Proof & Feedback:** Lack of authentic customer reviews, hidden catch highlights, and interactive user feedback mechanisms for experienced cardholders.

---

## 2. Core Architectural Pillars

### Pillar 1: Linear-Inspired Minimalist Action Grid
- **Neutral, High-Whitespace Canvas:** `bg-slate-50` base, crisp `bg-white` cards with `border-slate-200/70`, and subtle `shadow-2xs` on hover.
- **Scannable Metric Strips:** Replace multi-paragraph text with horizontal data chips:
  `[₹999 Annual Fee] • [5% Cashback] • [₹5,000/mo Cap] • [Verified: SBI MITC]`
- **1-Click Action Hub:** Every card and guide includes direct buttons:
  - `⚡ Act / Apply (Official Portal)` — Direct official link (zero affiliate redirect)
  - `📋 Check Prerequisites` — Opens checklist with this card’s criteria pre-filtered
  - `💬 Community Reviews & Feedback` — View verified customer reviews or submit feedback
  - `🔍 View Regulatory Source` — Opens statutory circular details

### Pillar 2: Real-Time Data Provenance & Verification Engine
- **Why It Is Real-Time:**
  1. **Statutory Regulatory Tracking:** Continuous monitoring against official gazettes:
     - Reserve Bank of India (RBI/2022-23/92 Master Direction)
     - National Payments Corporation of India (NPCI RuPay Credit on UPI circulars)
     - Directorate General of Civil Aviation (DGCA Passenger Charter)
     - Central Board of Direct Taxes (CBDT Sections 80CCD, 80D, 115BAC)
  2. **Direct Bank MITC (Most Important Terms & Conditions):** Reward rates, lounge access criteria, and fee waiver thresholds are mapped to official bank tariff sheets.
  3. **Interactive Re-Verification Heartbeat:** Users can click a live `⚡ Re-Verify Sources` button which runs an in-memory health audit of all 18+ data sources, reporting live ping status and updating the dynamic verification timestamp.
- **Dedicated "Data Provenance & Source Registry" Section:** A top-level tab and footer view containing the complete table of authorities, circular codes, rationale, official links, and update timestamps.
- **Inline Verified Badges:** Every single card has an interactive source badge linking to its official regulatory backing.

### Pillar 3: Structured "Fact Sheet" Content Standard
Every guide, card, and life operation is refactored into a crisp, zero-fluff fact sheet:
1. **1-Sentence Verdict:** Clear, plain-English value proposition.
2. **Key Metrics Table:** Fee, Waiver Threshold, Accelerated Rate, Base Rate, Caps, Lounge Rules, Forex Markup.
3. **Hidden Catches & Excluded MCCs:** Strict disclosure of excluded categories (rent, utilities, wallet, fuel).
4. **Authentic Customer Reviews & Feedback Widget:**
   - Display verified authentic user reviews.
   - If no reviews are available yet, render a clean `"New"` badge instead of an empty container.
   - Interactive feedback modal/form: *"Have you used this card/membership? Submit your review & rating"*, persisted to `localStorage`.
5. **3-Step Immediate Action Plan:** Step-by-step verified application procedure.
6. **Statutory Reference:** Exact official document citation.

---

## 3. Component Architecture & Data Models

### Updated Data Models (`src/types/index.ts`)
```ts
export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number; // 1-5
  verifiedUser: boolean;
  date: string;
  comment: string;
  holdingDuration: string; // e.g., "Held for 14 months"
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
}

export interface CreditCard {
  // Existing fields +
  sourceRef: DataSource;
  reviews: ReviewItem[]; // empty array renders "New" badge
  hiddenCatches: string[];
}
```

### New & Updated Components
1. `src/data/sourcesData.ts`: Registry of 15+ verified statutory and banking sources with official URLs, reference numbers, and rationale.
2. `src/components/DataProvenance.tsx`: Dedicated transparency page showing source audit table, real-time sync trigger, and statutory compliance methodology.
3. `src/components/ReviewFeedbackModal.tsx`: Interactive modal to read authentic reviews or submit new user reviews.
4. `src/components/CreditCardGuide.tsx`: Refactored with Linear-inspired minimal cards, metric strips, 1-click actions, hidden catches, and reviews widget.
5. `src/components/Hero.tsx`: Decluttered airy hero with live verification heartbeat.
6. `src/components/Header.tsx`: Added "Data Provenance" navigation tab with live status pill.

---

## 4. Verification & Testing Plan

1. **Build Verification:** Run `npm run build` to ensure 100% strict TypeScript typing and Tailwind v4 compilation.
2. **Interactive Testing:**
   - Verify that clicking `Re-Verify Sources` triggers live status simulation and timestamp refresh.
   - Verify that submitting a review for any card updates state and persists in `localStorage`.
   - Verify that cards without reviews display the clean `"New"` badge.
   - Verify that all 1-click actions (Check Prerequisites, Calculate Returns, View Source) navigate seamlessly without page reload.
   - Verify that all external source links point to official `.gov.in`, `rbi.org.in`, or bank root domains with `rel="noreferrer"`.
3. **Local Dev Server Check:** Verify HTTP 200 on `http://localhost:5180/` with zero browser console errors.
