# PerkWise India — Minimal Redesign, Real-Time Data Provenance & Structured Fact Sheets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the PerkWise India application to replace visual clutter and verbose prose with a Linear-inspired minimalist design, structured source-backed fact sheets, authentic customer reviews with "New" badge fallbacks, and a real-time data provenance transparency engine.

**Architecture:** Extend the TypeScript data models to include statutory data sources and customer reviews. Build a dedicated Data Provenance verification view with dynamic sync, an authentic review/feedback modal with `localStorage` persistence, and re-architect the Hero, CreditCardGuide, ResourceLibrary, and Modal components to follow a clean, metric-first, action-oriented design.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Lucide React, Vite.

**Spec:** `docs/superpowers/specs/2026-09-17-perkwise-redesign-and-provenance-design.md`

## Global Constraints
- High-whitespace, minimal styling (`bg-slate-50`, `bg-white`, subtle borders `border-slate-200/70`).
- No generic AI boilerplate or fluff paragraphs; emphasize structured data tables, metric chips, and 3-step action plans.
- All statutory links must point directly to official government (`.gov.in`, `rbi.org.in`) or verified bank root domains.
- Unreviewed items must render a clean `"New"` badge instead of an empty box.
- Zero build or TypeScript errors (`tsc -b && vite build`).

---

### Task 1: Data Models & Sources Registry Expansion

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/data/sourcesData.ts`
- Modify: `src/data/creditCardsData.ts`
- Modify: `src/data/articlesData.ts`

**Interfaces:**
- Produces: `DataSource`, `ReviewItem` types and `SOURCES_REGISTRY` dataset containing 18+ verified statutory authorities and bank MITC disclosures.

- [ ] **Step 1: Update TypeScript definitions in `src/types/index.ts`**
Add `ReviewItem`, `DataSource`, and update `CreditCard` and `Article` to include `sourceRef`, `reviews`, and `hiddenCatches`.

- [ ] **Step 2: Create `src/data/sourcesData.ts`**
Populate official statutory sources (RBI Master Directions, NPCI RuPay circulars, DGCA Passenger Charter, Income Tax Sections, Bank MITC sheets) with reference codes, reasoning, official URLs, and verification timestamps.

- [ ] **Step 3: Update `src/data/creditCardsData.ts` and `src/data/articlesData.ts`**
Attach exact `sourceRef` and authentic reviews (or empty arrays) to cards.

- [ ] **Step 4: Verify build**
Run `npm run build` in `/Users/jainamshah/perkwise-india` to ensure all types compile.

---

### Task 2: Real-Time Data Provenance & Verification Engine Component

**Files:**
- Create: `src/components/DataProvenance.tsx`

**Interfaces:**
- Consumes: `SOURCES_REGISTRY` from `src/data/sourcesData.ts`.
- Produces: `DataProvenance` React component with live sync trigger, status indicator, and filterable statutory source table.

- [ ] **Step 1: Implement `src/components/DataProvenance.tsx`**
Create the component with:
- "Why & How PerkWise is Real-Time" architectural explanation banner
- Interactive `⚡ Re-Verify Sources / Check Gazettes` button with live ping simulation and dynamic timestamp refresh
- Summary metric cards (Total Sources, Statutory Regulators, Direct Bank Schedules, Average Verification Score)
- Complete audit table displaying Authority, Reference Code, Rationale, Official Link, and Last Verified status.

- [ ] **Step 2: Verify build**
Run `npm run build` to confirm clean typing.

---

### Task 3: Authentic Customer Reviews & User Feedback Modal

**Files:**
- Create: `src/components/ReviewFeedbackModal.tsx`

**Interfaces:**
- Consumes: `CreditCard`, `ReviewItem` from `src/types/index.ts`.
- Produces: `ReviewFeedbackModal` React component with customer review list, empty-state fallback to `"New"`, and interactive feedback form saving reviews into `localStorage`.

- [x] **Step 1: Implement `src/components/ReviewFeedbackModal.tsx`**
- Show verified authentic customer reviews with holding duration and ratings.
- If reviews are empty, render a clean `"New"` badge with a prompt for first feedback.
- Interactive form allowing the user to submit rating (1-5 stars), holding duration, and review comment.
- Saves submitted feedback to `localStorage` under `perkwise_user_reviews`.

- [x] **Step 2: Verify build**
Run `npm run build` to ensure no errors.

---

### Task 4: Linear-Inspired Minimalist Redesign: Hero & Header

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Updates `Header` navigation items to include `'provenance'` ("Data Sources & Live Sync") with live status pulse.
- Updates `Hero` to be minimal, airy, with scannable category chips and live statutory verification badge.

- [x] **Step 1: Update `src/components/Header.tsx`**
Add the Data Provenance tab with live green pulse dot and badge.

- [x] **Step 2: Update `src/components/Hero.tsx`**
Replace heavy dark blocks with a light, spacious hero containing 1-sentence value proposition, search bar, and live verification heartbeat.

- [x] **Step 3: Verify build**
Run `npm run build`.

---

### Task 5: Structured Fact Sheet Redesign: Credit Card Buying Guide

**Files:**
- Modify: `src/components/CreditCardGuide.tsx`

**Interfaces:**
- Consumes: `CREDIT_CARD_SEGMENTS`, `CREDIT_CARDS_DATA`, `ReviewFeedbackModal`.
- Produces: Overhauled `CreditCardGuide` with horizontal metric strips, structured data tables, hidden catches, "New" badge or review summary, and 1-click action triggers.

- [x] **Step 1: Refactor `src/components/CreditCardGuide.tsx`**
- Replace cluttered cards with clean white cards, subtle borders, and scannable metric strips:
  `[Fee] • [Accelerated Rate] • [Cap] • [Lounge] • [Forex]`
- Key Metrics Fact Sheet table comparing fees, base rate, accelerated rate, caps, and lounge rules.
- Explicit "Hidden Catches & Excluded Categories" box.
- "Authentic Reviews / New" pill opening `ReviewFeedbackModal`.
- 1-Click Action Bar: `[Apply on Official Portal]`, `[Check Prerequisites]`, `[Reviews & Feedback]`, `[View Source Disclosure]`.

- [x] **Step 2: Verify build**
Run `npm run build`.

---

### Task 6: Structured Fact Sheet Redesign: Resource Library & Article Modal

**Files:**
- Modify: `src/components/ResourceLibrary.tsx`
- Modify: `src/components/ArticleDetailModal.tsx`

**Interfaces:**
- Overhauls resource cards and article modal into crisp, structured fact sheets with zero fluff prose, 3-point action plans, and official source links.

- [x] **Step 1: Refactor `src/components/ResourceLibrary.tsx`**
Make card items compact with metric badges, direct statutory citations, and 1-click "Read Fact Sheet" button.

- [x] **Step 2: Refactor `src/components/ArticleDetailModal.tsx`**
Structure modal into: 1-sentence verdict, key metrics data table, 3-step action plan, fine print traps, and official regulatory citations.

- [x] **Step 3: Verify build**
Run `npm run build`.

---

### Task 7: Main App Routing, Local Dev Server & Verification

**Files:**
- Modify: `src/App.tsx`
- Modify: `README.md`

**Interfaces:**
- Coordinates tabs: `'library' | 'card-guide' | 'checklist' | 'calculator' | 'life-operations' | 'provenance' | 'bookmarks'`.

- [ ] **Step 1: Update `src/App.tsx`**
Wire up `DataProvenance` tab and `ReviewFeedbackModal`.

- [ ] **Step 2: Test dev server on port 5180**
Ensure dev server serves the updated app, test with `curl`, and verify zero console errors.

- [ ] **Step 3: Update `README.md`**
Document the real-time data provenance architecture, statutory sources, and Fact Sheet standards.
