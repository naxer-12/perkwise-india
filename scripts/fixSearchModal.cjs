const fs = require('fs');
const path = require('path');

const searchModalData = {
  en: {
    title: 'Universal Financial Search',
    placeholder: 'Search cards, deals, circulars, or finance hacks...',
    popularSearches: 'Popular Searches',
    noResults: 'No matching results found',
    quickResults: 'Real-time search across 24 Cards, 24 Guides & 15 Sources',
    allResults: 'All Results',
    creditCards: 'Cards & Deals (24)',
    guidesAndDeals: 'Daily Guides (24)',
    officialSources: 'Statutory Sources (15)',
    toNavigate: 'Navigate',
    toSelect: 'Select',
    toClose: 'Close',
  },
  hi: {
    title: 'सार्वभौमिक वित्तीय खोज',
    placeholder: 'कार्ड का नाम, ऑफर या आधिकारिक नियम खोजें...',
    popularSearches: 'लोकप्रिय खोजें',
    noResults: 'कोई परिणाम नहीं मिला',
    quickResults: '24 कार्ड्स, 24 गाइड्स और 15 स्रोतों में रीयल-टाइम खोज',
    allResults: 'सभी परिणाम',
    creditCards: 'कार्ड्स और डील्स (24)',
    guidesAndDeals: 'दैनिक गाइड्स (24)',
    officialSources: 'वैधानिक स्रोत (15)',
    toNavigate: 'नेविगेट करें',
    toSelect: 'चुनें',
    toClose: 'बंद करें',
  },
  gu: {
    title: 'સાર્વત્રિક નાણાકીય શોધ',
    placeholder: 'કાર્ડનું નામ, ઓફર અથવા સત્તાવાર નિયમો શોધો...',
    popularSearches: 'લોકપ્રિય શોધો',
    noResults: 'કોઈ પરિણામ મળ્યું નથી',
    quickResults: '24 કાર્ડ્સ, 24 માર્ગદર્શિકાઓ અને 15 સ્ત્રોતોમાં રીઅલ-ટાઇમ શોધ',
    allResults: 'બધા પરિણામો',
    creditCards: 'કાર્ડ્સ અને ડીલ્સ (24)',
    guidesAndDeals: 'દૈનિક માર્ગદર્શિકાઓ (24)',
    officialSources: 'કાનૂની સ્ત્રોતો (15)',
    toNavigate: 'નેવિગેટ કરો',
    toSelect: 'પસંદ કરો',
    toClose: 'બંધ કરો',
  },
  mr: {
    title: 'सार्वभौमिक वित्तीय शोध',
    placeholder: 'कार्डचे नाव, ऑफर्स किंवा अधिकृत नियम शोधा...',
    popularSearches: 'लोकप्रिय शोध',
    noResults: 'काहीही परिणाम आढळले नाहीत',
    quickResults: '24 कार्ड, 24 मार्गदर्शक आणि 15 स्रोतांमध्ये थेट शोध',
    allResults: 'सर्व निकाल',
    creditCards: 'कार्ड आणि डील्स (24)',
    guidesAndDeals: 'दैनिक मार्गदर्शक (24)',
    officialSources: 'वैधानिक स्रोत (15)',
    toNavigate: 'नेव्हिगेट करा',
    toSelect: 'निवडा',
    toClose: 'बंद करा',
  },
  ta: {
    title: 'அனைத்து நிதி தேடல்',
    placeholder: 'கார்டுகள், சலுகைகள் அல்லது விதிகளைத் தேடுங்கள்...',
    popularSearches: 'பிரபலமான தேடல்கள்',
    noResults: 'பொருந்தும் முடிவுகள் எதுவும் இல்லை',
    quickResults: '24 கார்டுகள், 24 வழிகாட்டிகள் மற்றும் 15 ஆதாரங்களில் நேரடி தேடல்',
    allResults: 'அனைத்து முடிவுகளும்',
    creditCards: 'கார்டுகள் & சலுகைகள் (24)',
    guidesAndDeals: 'தினசரி வழிகாட்டிகள் (24)',
    officialSources: 'சட்டப்பூர்வ ஆதாரங்கள் (15)',
    toNavigate: 'நகர்த்த',
    toSelect: 'தேர்வு செய்ய',
    toClose: 'மூட',
  },
  te: {
    title: 'సార్వత్రిక ఆర్థిక శోధన',
    placeholder: 'కార్డుల పేర్లు, ఆఫర్లు లేదా నిబంధనలను శోధించండి...',
    popularSearches: 'ప్రసిద్ధ శోధనలు',
    noResults: 'ఫలితాలు ఏవీ కనుగొనబడలేదు',
    quickResults: '24 కార్డులు, 24 గೈడ్‌లు మరియు 15 వనరులలో నిజ-సమయ శోధన',
    allResults: 'అన్ని ఫలితాలు',
    creditCards: 'కార్డులు & డీల్స్ (24)',
    guidesAndDeals: 'రోజువారీ గైడ్‌లు (24)',
    officialSources: 'చట్టబద్ధమైన వనరులు (15)',
    toNavigate: 'నావిగేట్ చేయండి',
    toSelect: 'ఎంచుకోండి',
    toClose: 'మూసివేయండి',
  },
  bn: {
    title: 'সার্বজনীন আর্থিক অনুসন্ধান',
    placeholder: 'কার্ডের নাম, ডিল বা অফিসিয়াল নিয়ম খুঁজুন...',
    popularSearches: 'জনপ্রিয় অনুসন্ধান',
    noResults: 'কোনো ফলাফল পাওয়া যায়নি',
    quickResults: '২৪টি কার্ড, ২৪টি গাইড এবং ১৫টি উৎসে রিয়েল-টাইম অনুসন্ধান',
    allResults: 'সমস্ত ফলাফল',
    creditCards: 'কার্ড ও ডিল (২৪)',
    guidesAndDeals: 'দৈনিক গাইড (২৪)',
    officialSources: 'সংবিধিবদ্ধ উৎস (১৫)',
    toNavigate: 'নেভিগেট করুন',
    toSelect: 'নির্বাচন করুন',
    toClose: 'বন্ধ করুন',
  },
  kn: {
    title: 'ಸಾರ್ವತ್ರಿಕ ಹಣಕಾಸು ಹುಡುಕಾಟ',
    placeholder: 'ಕಾರ್ಡ್ ಹೆಸರು, ಆಫರ್ ಅಥವಾ ನಿಯಮಗಳನ್ನು ಹುಡುಕಿ...',
    popularSearches: 'ಜನಪ್ರಿಯ ಹುಡುಕಾಟಗಳು',
    noResults: 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    quickResults: '24 ಕಾರ್ಡ್‌ಗಳು, 24 ಮಾರ್ಗದರ್ಶಿಗಳು ಮತ್ತು 15 ಮೂಲಗಳಲ್ಲಿ ಹುಡುಕಾಟ',
    allResults: 'ಎಲ್ಲಾ ಫಲಿತಾಂಶಗಳು',
    creditCards: 'ಕಾರ್ಡ್‌ಗಳು ಮತ್ತು ಡೀಲ್‌ಗಳು (24)',
    guidesAndDeals: 'ದೈನಂದಿನ ಮಾರ್ಗದರ್ಶಿಗಳು (24)',
    officialSources: 'ಶಾಸನಬದ್ಧ ಮೂಲಗಳು (15)',
    toNavigate: 'ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ',
    toSelect: 'ಆಯ್ಕೆಮಾಡಿ',
    toClose: 'ಮುಚ್ಚಿ',
  }
};

const dir = path.join(__dirname, '../src/i18n/translations');
for (const [lang, modal] of Object.entries(searchModalData)) {
  const file = path.join(dir, lang + '.ts');
  let content = fs.readFileSync(file, 'utf8');

  // Find footer block and cut off after it
  const footerIdx = content.indexOf('footer: {');
  if (footerIdx === -1) {
    console.error('Could not find footer in', lang);
    continue;
  }
  const endFooterIdx = content.indexOf('},', footerIdx);
  if (endFooterIdx === -1) {
    console.error('Could not find end of footer in', lang);
    continue;
  }
  const prefix = content.slice(0, endFooterIdx + 2);

  const lines = Object.entries(modal).map(([k, v]) => `    ${k}: '${v}',`).join('\n');
  const searchBlock = '\n  searchModal: {\n' + lines + '\n  },\n};\n';

  fs.writeFileSync(file, prefix + searchBlock, 'utf8');
  console.log('Fixed searchModal in', lang);
}
