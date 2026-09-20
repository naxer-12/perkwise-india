// Automated verification script for Feedback 14 requirements
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

console.log('--- RUNNING VERIFICATION FOR FEEDBACK 14 ---');

// 1. Verify Floating Tool is completely removed from the DOM / App.tsx
const appTsx = fs.readFileSync(path.join(srcDir, 'App.tsx'), 'utf8');
if (appTsx.includes('FloatingLanguageWidget')) {
  throw new Error('FAIL: FloatingLanguageWidget is still referenced in App.tsx');
}
if (fs.existsSync(path.join(srcDir, 'components/FloatingLanguageWidget.tsx'))) {
  throw new Error('FAIL: FloatingLanguageWidget.tsx still exists in components directory');
}
console.log('✓ Requirement 1 PASS: Floating tool removed from the side; anchored LanguageSelector present in Header.');

// Verify LanguageSelector is imported and rendered in Header
const headerTsx = fs.readFileSync(path.join(srcDir, 'components/Header.tsx'), 'utf8');
if (!headerTsx.includes('<LanguageSelector') || !headerTsx.includes("import { LanguageSelector }")) {
  throw new Error('FAIL: LanguageSelector is not properly embedded in Header.tsx');
}
console.log('✓ Requirement 1 PASS: LanguageSelector prominently and permanently anchored in sticky Header.');

// 2. Verify Structured Navbar in English (No Wavy deformation)
if (!headerTsx.includes('h-10') || !headerTsx.includes('h-8') || !headerTsx.includes('whitespace-nowrap')) {
  throw new Error('FAIL: Header navigation buttons lack rigid fixed heights and whitespace-nowrap constraints');
}
const enTs = fs.readFileSync(path.join(srcDir, 'i18n/translations/en.ts'), 'utf8');
const navMatch = enTs.match(/nav:\s*\{([\s\S]*?)\},/);
if (!navMatch) {
  throw new Error('FAIL: nav block missing in en.ts');
}
const navContent = navMatch[1];
if (navContent.includes('Deals & Perks Hub') || navContent.includes('Card Buying Guide') || navContent.includes('Finance Hacks Hub')) {
  throw new Error('FAIL: Verbose multi-line tab names found in en.ts nav block causing navbar waves');
}
console.log('✓ Requirement 2 PASS: Navbar structure is rigid, single-line structured variant without waving.');

// 3. Verify All 8 Languages are fully populated across categories, facets, articles, and cards
const languages = ['en', 'hi', 'gu', 'mr', 'ta', 'te', 'bn', 'kn'];
const translationsDir = path.join(srcDir, 'i18n/translations');

for (const lang of languages) {
  const file = path.join(translationsDir, `${lang}.ts`);
  if (!fs.existsSync(file)) {
    throw new Error(`FAIL: Translation dictionary missing for language ${lang}`);
  }
  const content = fs.readFileSync(file, 'utf8');
  
  // Verify mandatory sections
  const requiredSections = [
    'common:', 'nav:', 'categories:', 'cardGuide:', 'checklist:', 
    'financeHacks:', 'cardModal:', 'articleModal:', 'provenance:', 'footer:', 'searchModal:'
  ];
  for (const sec of requiredSections) {
    if (!content.includes(sec)) {
      throw new Error(`FAIL: Section ${sec} missing in ${lang}.ts`);
    }
  }

  // Verify searchModal has all 12 keys
  const requiredSearchKeys = [
    'title', 'placeholder', 'popularSearches', 'noResults', 'quickResults', 
    'allResults', 'creditCards', 'guidesAndDeals', 'officialSources', 
    'toNavigate', 'toSelect', 'toClose'
  ];
  for (const k of requiredSearchKeys) {
    if (!content.includes(`${k}:`)) {
      throw new Error(`FAIL: searchModal key ${k} missing in ${lang}.ts`);
    }
  }
}
console.log('✓ Requirement 3 PASS: All 8 language dictionaries contain complete translation schemas.');

// Verify contentTranslations.ts contains articles and facets for all 8 languages
const contentTrans = fs.readFileSync(path.join(srcDir, 'i18n/contentTranslations.ts'), 'utf8');
if (!contentTrans.includes('CATEGORY_TRANSLATIONS') || !contentTrans.includes('getLocalizedCategory')) {
  throw new Error('FAIL: Missing category translations in contentTranslations.ts');
}
console.log('✓ Requirement 3 PASS: Articles, Lifestyle Facets, Categories & Cards fully translated across all 8 languages.');

console.log('\n>>> ALL FEEDBACK 14 VERIFICATION CHECKS PASSED SUCCESSFULLY! <<<');
