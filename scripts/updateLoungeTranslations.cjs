const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/i18n/translations');

const loungeI18n = {
  en: {
    navLabel: 'Lounges',
    data: {
      badge: 'Official Lounge Eligibility Engine',
      title: 'Airport & Railway Lounge Recogniser',
      subtitle: 'Search your credit or debit card to instantly see eligible lounges across India, quarterly visit quotas, and spend conditions.',
      liveSyncBadge: 'Live Verified',
      lastUpdatedPrefix: 'Last Synced:',
      syncButton: 'Sync Live',
      searchCardPlaceholder: 'Type your card name or bank (e.g. SBI, Coral, Infinia, Axis, HDFC)...',
      quickPicks: 'Popular Cards:',
      selectedCard: 'Selected Card Audit',
      domesticQuota: 'Domestic Airport Visits',
      railwayQuota: 'Railway Executive Lounges',
      spendCondition: 'Spend Requirement',
      guestPolicy: 'Guest Access Policy',
      allLounges: 'All Available Lounges',
      airportsOnly: 'Airport Lounges',
      railwayOnly: 'Railway Executive Lounges',
      internationalOnly: 'International Terminals',
      cityFilter: 'Filter by City',
      allCities: 'All Cities in India',
      searchLoungePlaceholder: 'Filter lounges by airport code, station or name...',
      eligibleBadge: '✓ Eligible with Card',
      ineligibleBadge: '✕ Not Included in Tier',
      viewDirections: 'Terminal Directions',
      timingsLabel: 'Operating Hours',
      amenitiesLabel: 'Amenities & Services',
      noLoungesFound: 'No lounges match your current search or filter criteria.',
      clearCardSelection: 'Clear Card'
    }
  },
  hi: {
    navLabel: 'लाउंज खोजें',
    data: {
      badge: 'आधिकारिक लाउंज पात्रता इंजन',
      title: 'एयरपोर्ट व रेलवे लाउंज रिकॉग्नाइज़र',
      subtitle: 'अपने क्रेडिट या डेबिट कार्ड की पात्रता तुरंत जांचें और भारत भर के एयरपोर्ट और रेलवे लाउंज तक मुफ्त पहुंच जानें।',
      liveSyncBadge: 'लाइव सत्यापित',
      lastUpdatedPrefix: 'अंतिम सिंक:',
      syncButton: 'लाइव सिंक करें',
      searchCardPlaceholder: 'कार्ड का नाम या बैंक टाइप करें (उदा. SBI, Coral, Infinia, Axis)...',
      quickPicks: 'लोकप्रिय कार्ड्स:',
      selectedCard: 'चयनित कार्ड विवरण',
      domesticQuota: 'घरेलू एयरपोर्ट लाउंज',
      railwayQuota: 'रेलवे एग्जीक्यूटिव लाउंज',
      spendCondition: 'खर्च की शर्त (Spend Rule)',
      guestPolicy: 'अतिथि प्रवेश नीति',
      allLounges: 'सभी उपलब्ध लाउंज',
      airportsOnly: 'एयरपोर्ट लाउंज',
      railwayOnly: 'रेलवे एग्जीक्यूटिव लाउंज',
      internationalOnly: 'अंतर्राष्ट्रीय टर्मिनल',
      cityFilter: 'शहर चुनें',
      allCities: 'भारत के सभी शहर',
      searchLoungePlaceholder: 'एयरपोर्ट कोड या लाउंज नाम से खोजें...',
      eligibleBadge: '✓ कार्ड के साथ उपलब्ध',
      ineligibleBadge: '✕ इस कार्ड टियर में शामिल नहीं',
      viewDirections: 'टर्मिनल दिशा-निर्देश',
      timingsLabel: 'समय',
      amenitiesLabel: 'सुविधाएं और सेवाएं',
      noLoungesFound: 'आपकी खोज से मिलता कोई लाउंज नहीं मिला।',
      clearCardSelection: 'कार्ड हटाएं'
    }
  },
  gu: {
    navLabel: 'લાઉન્જ',
    data: {
      badge: 'સત્તાવાર લાઉન્જ પાત્રતા એન્જિન',
      title: 'એરપોર્ટ અને રેલવે લાઉન્જ રેકગ્નાઇઝર',
      subtitle: 'તમારા ક્રેડિટ અથવા ડેબિટ કાર્ડની પાત્રતા શોધો અને ભારતના એરપોર્ટ અને રેલવે લાઉન્જની મફત એક્સેસ મેળવો.',
      liveSyncBadge: 'લાઇવ ચકાસાયેલ',
      lastUpdatedPrefix: 'છેલ્લું સિંક:',
      syncButton: 'લાઇવ સિંક',
      searchCardPlaceholder: 'કાર્ડનું નામ અથવા બેંક ટાઇપ કરો (દા.ત. SBI, Coral, Infinia, Axis)...',
      quickPicks: 'લોકપ્રિય કાર્ડ્સ:',
      selectedCard: 'પસંદ કરેલ કાર્ડ ઓડિટ',
      domesticQuota: 'ડોમેસ્ટિક એરપોર્ટ મુલાકાતો',
      railwayQuota: 'રેલવે એક્ઝિક્યુટિવ લાઉન્જ',
      spendCondition: 'ખર્ચની શરતો (Spend Rules)',
      guestPolicy: 'મહેમાન નીતિ',
      allLounges: 'તમામ ઉપલબ્ધ લાઉન્જ',
      airportsOnly: 'એરપોર્ટ લાઉન્જ',
      railwayOnly: 'રેલવે એક્ઝિક્યુટિવ લાઉન્જ',
      internationalOnly: 'આંતરરાષ્ટ્રીય ટર્મિનલ્સ',
      cityFilter: 'શહેર ફિલ્ટર',
      allCities: 'ભારતના તમામ શહેરો',
      searchLoungePlaceholder: 'એરપોર્ટ કોડ અથવા લાઉન્જ નામથી ફિલ્ટર કરો...',
      eligibleBadge: '✓ કાર્ડ સાથે ઉપલબ્ધ',
      ineligibleBadge: '✕ આ ટિયરમાં સામેલ નથી',
      viewDirections: 'ટર્મિનલ દિશાનિર્દેશો',
      timingsLabel: 'સમય',
      amenitiesLabel: 'સુવિધાઓ અને સેવાઓ',
      noLoungesFound: 'કોઈ લાઉન્જ મળ્યું નથી.',
      clearCardSelection: 'કાર્ડ દૂર કરો'
    }
  },
  mr: {
    navLabel: 'लाउंज शोधा',
    data: {
      badge: 'अधिकृत लाउंज पात्रता इंजिन',
      title: 'विमानतळ व रेल्वे लाउंज तपासणी',
      subtitle: 'तुमच्या क्रेडिट किंवा डेबिट कार्डाद्वारे भारतातील कोणते विमानतळ व रेल्वे लाउंज मोफत उपलब्ध आहेत ते तपासा.',
      liveSyncBadge: 'थेट पडताळणी',
      lastUpdatedPrefix: 'शेवटचे सिंक:',
      syncButton: 'थेट सिंक करा',
      searchCardPlaceholder: 'कार्ड नाव किंवा बँक प्रविष्ट करा (उदा. SBI, Coral, Infinia, Axis)...',
      quickPicks: 'लोकप्रिय कार्ड्स:',
      selectedCard: 'निवडलेले कार्ड तपशील',
      domesticQuota: 'देशांतर्गत विमानतळ भेटी',
      railwayQuota: 'रेल्वे एक्झिक्युटिव्ह लाउंज',
      spendCondition: 'खर्चाची अट (Spend Requirement)',
      guestPolicy: 'अतिथी नियम',
      allLounges: 'सर्व उपलब्ध लाउंज',
      airportsOnly: 'विमानतळ लाउंज',
      railwayOnly: 'रेल्वे एक्झिक्युटिव्ह लाउंज',
      internationalOnly: 'आंतरराष्ट्रीय टर्मिनल',
      cityFilter: 'शहर निवडा',
      allCities: 'भारतातील सर्व शहरे',
      searchLoungePlaceholder: 'विमानतळ कोड किंवा नावाने शोधा...',
      eligibleBadge: '✓ कार्डासह पात्र',
      ineligibleBadge: '✕ या टप्प्यात समाविष्ट नाही',
      viewDirections: 'टर्मिनल दिशानिर्देश',
      timingsLabel: 'वेळ',
      amenitiesLabel: 'सुविधा व सेवा',
      noLoungesFound: 'कोणताही लाउंज आढळला नाही.',
      clearCardSelection: 'कार्ड हटवा'
    }
  },
  ta: {
    navLabel: 'லவுஞ்ச்கள்',
    data: {
      badge: 'அதிகாரப்பூர்வ லவுஞ்ச் தகுதி இயந்திரம்',
      title: 'விமான & ரயில்வே லவுஞ்ச் கண்டறிதல்',
      subtitle: 'உங்கள் கிரெடிட் அல்லது டெபிட் கார்டின் மூலம் இந்தியாவில் இலவச லவுஞ்ச் அணுகலை உடனடியாக சரிபார்க்கவும்.',
      liveSyncBadge: 'நேரடி சரிபார்ப்பு',
      lastUpdatedPrefix: 'கடைசி புதுப்பிப்பு:',
      syncButton: 'நேரடி புதுப்பிப்பு',
      searchCardPlaceholder: 'கார்டு பெயர் அல்லது வங்கியை உள்ளிடவும்...',
      quickPicks: 'பிரபலமான கார்டுகள்:',
      selectedCard: 'தேர்ந்தெடுக்கப்பட்ட கார்டு',
      domesticQuota: 'உள்நாட்டு விமான நிலைய வருகைகள்',
      railwayQuota: 'ரயில்வே எக்ஸிகியூட்டிவ் லவுஞ்ச்',
      spendCondition: 'செலவு நிபந்தனை',
      guestPolicy: 'விருந்தினர் கொள்கை',
      allLounges: 'அனைத்து லவுஞ்ச்களும்',
      airportsOnly: 'விமான நிலைய லவுஞ்ச்கள்',
      railwayOnly: 'ரயில்வே எக்ஸிகியூட்டிவ் லவுஞ்ச்',
      internationalOnly: 'சர்வதேச முனையங்கள்',
      cityFilter: 'நகர வடிகட்டி',
      allCities: 'இந்தியாவின் அனைத்து நகரங்களும்',
      searchLoungePlaceholder: 'விமான நிலைய குறியீட்டின் மூலம் தேடவும்...',
      eligibleBadge: '✓ கார்டுடன் தகுதியானது',
      ineligibleBadge: '✕ இதில் சேர்க்கப்படவில்லை',
      viewDirections: 'முனைய வழிகாட்டுதல்கள்',
      timingsLabel: 'இயங்கும் நேரம்',
      amenitiesLabel: 'வசதிகள் மற்றும் சேவைகள்',
      noLoungesFound: 'எந்த லவுஞ்ச்களும் பொருந்தவில்லை.',
      clearCardSelection: 'கார்டை அழிக்கவும்'
    }
  },
  te: {
    navLabel: 'లాంజ్‌లు',
    data: {
      badge: 'అధికారిక లాంజ్ అర్హత ఇంజిన్',
      title: 'విమానాశ్రయ & రైల్వే లాంజ్ రికగ్నైజర్',
      subtitle: 'మీ క్రెడిట్ లేదా డెబిట్ కార్డుతో భారతదేశంలోని ఉచిత లాంజ్ ప్రవేశాన్ని తక్షణమే పరిశీలించండి.',
      liveSyncBadge: 'ప్రత్యక్ష పరిశీలన',
      lastUpdatedPrefix: 'చివరి సింక్:',
      syncButton: 'సింక్ చేయండి',
      searchCardPlaceholder: 'కార్డు పేరు లేదా బ్యాంకు నమోదు చేయండి...',
      quickPicks: 'ప్రసిద్ధ కార్డులు:',
      selectedCard: 'ఎంచుకున్న కార్డు వివరాలు',
      domesticQuota: 'దేశీయ విమానాశ్రయ ప్రవేశాలు',
      railwayQuota: 'రైల్వే ఎగ్జిక్యూటివ్ లాంజ్‌లు',
      spendCondition: 'ఖర్చు నిబంధన',
      guestPolicy: 'అతిథి విధానం',
      allLounges: 'అన్ని లాంజ్‌లు',
      airportsOnly: 'విమానాశ్రయ లాంజ్‌లు',
      railwayOnly: 'రైల్వే ఎగ్జిక్యూటివ్ లాంజ్‌లు',
      internationalOnly: 'అంతర్జాతీయ టెర్మినల్స్',
      cityFilter: 'నగరం ఎంచుకోండి',
      allCities: 'భారతదేశంలోని అన్ని నగరాలు',
      searchLoungePlaceholder: 'లాంజ్ పేరు ద్వారా శోధించండి...',
      eligibleBadge: '✓ కార్డుతో అందుబాటులో ఉంది',
      ineligibleBadge: '✕ ఈ శ్రేణిలో చేర్చబడలేదు',
      viewDirections: 'టెర్మినల్ దిశలు',
      timingsLabel: 'వేళలు',
      amenitiesLabel: 'సౌకర్యాలు & సేవలు',
      noLoungesFound: 'లాంజ్‌లు ఏవీ కనుగొనబడలేదు.',
      clearCardSelection: 'కార్డు తీసివేయండి'
    }
  },
  bn: {
    navLabel: 'লাউঞ্জ',
    data: {
      badge: 'অফিসিয়াল লাউঞ্জ যোগ্যতা ইঞ্জিন',
      title: 'বিমানবন্দর ও রেলওয়ে লাউঞ্জ চেকার',
      subtitle: 'আপনার ক্রেডিট বা ডেবিট কার্ডের মাধ্যমে ভারতের সমস্ত যোগ্য লাউঞ্জের বিনামূল্যে প্রবেশাধিকার জানুন।',
      liveSyncBadge: 'লাইভ যাচাইকৃত',
      lastUpdatedPrefix: 'সর্বশেষ সিঙ্ক:',
      syncButton: 'লাইভ সিঙ্ক',
      searchCardPlaceholder: 'কার্ডের নাম বা ব্যাংক টাইপ করুন...',
      quickPicks: 'জনপ্রিয় কার্ড:',
      selectedCard: 'নির্বাচিত কার্ড অডিট',
      domesticQuota: 'অভ্যন্তরীণ বিমানবন্দর প্রবেশাধিকার',
      railwayQuota: 'রেলওয়ে এক্সিকিউটিভ লাউঞ্জ',
      spendCondition: 'ব্যয়ের শর্ত (Spend Rule)',
      guestPolicy: 'অতিথি প্রবেশ নীতি',
      allLounges: 'সমস্ত উপলব্ধ লাউঞ্জ',
      airportsOnly: 'বিমানবন্দর লাউঞ্জ',
      railwayOnly: 'রেলওয়ে এক্সিকিউটিভ লাউঞ্জ',
      internationalOnly: 'আন্তর্জাতিক টার্মিনাল',
      cityFilter: 'শহর ফিল্টার',
      allCities: 'ভারতের সমস্ত শহর',
      searchLoungePlaceholder: 'বিমানবন্দর বা লাউঞ্জের নাম দিয়ে খুঁজুন...',
      eligibleBadge: '✓ কার্ডের সাথে অন্তর্ভুক্ত',
      ineligibleBadge: '✕ এই স্তরে অন্তর্ভুক্ত নয়',
      viewDirections: 'টার্মিনাল দিকনির্দেশ',
      timingsLabel: 'সময়সূচী',
      amenitiesLabel: 'সুবিধা ও পরিষেবা',
      noLoungesFound: 'কোনো লাউঞ্জ পাওয়া যায়নি।',
      clearCardSelection: 'কার্ড সরান'
    }
  },
  kn: {
    navLabel: 'ಲೌಂಜ್‌ಗಳು',
    data: {
      badge: 'ಅಧಿಕೃತ ಲೌಂಜ್ ಅರ್ಹತಾ ಎಂಜಿನ್',
      title: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಮತ್ತು ರೈಲ್ವೆ ಲೌಂಜ್ ಪರೀಕ್ಷಕ',
      subtitle: 'ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಅಥವಾ ಡೆಬಿಟ್ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಭಾರತದಾದ್ಯಂತ ಉಚಿತ ಲೌಂಜ್ ಪ್ರವೇಶವನ್ನು ತಕ್ಷಣವೇ ಪರಿಶೀಲಿಸಿ.',
      liveSyncBadge: 'ಲೈವ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
      lastUpdatedPrefix: 'ಕೊನೆಯ ಸಿಂಕ್:',
      syncButton: 'ಸಿಂಕ್ ಮಾಡಿ',
      searchCardPlaceholder: 'ಕಾರ್ಡ್ ಹೆಸರು ಅಥವಾ ಬ್ಯಾಂಕ್ ನಮೂದಿಸಿ...',
      quickPicks: 'ಜನಪ್ರಿಯ ಕಾರ್ಡ್‌ಗಳು:',
      selectedCard: 'ಆಯ್ಕೆಮಾಡಿದ ಕಾರ್ಡ್ ಮಾಹಿತಿ',
      domesticQuota: 'ದೇಶೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ ಪ್ರವೇಶಗಳು',
      railwayQuota: 'ರೈಲ್ವೆ ಎಕ್ಸಿಕ್ಯೂಟಿವ್ ಲೌಂಜ್‌ಗಳು',
      spendCondition: 'ವೆಚ್ಚದ ಷರತ್ತು',
      guestPolicy: 'ಅತಿಥಿ ನೀತಿ',
      allLounges: 'ಎಲ್ಲಾ ಲಭ್ಯವಿರುವ ಲೌಂಜ್‌ಗಳು',
      airportsOnly: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಲೌಂಜ್‌ಗಳು',
      railwayOnly: 'ರೈಲ್ವೆ ಎಕ್ಸಿಕ್ಯೂಟಿವ್ ಲೌಂಜ್‌ಗಳು',
      internationalOnly: 'ಅಂತರರಾಷ್ಟ್ರೀಯ ಟರ್ಮಿನಲ್‌ಗಳು',
      cityFilter: 'ನಗರ ಆಯ್ಕೆಮಾಡಿ',
      allCities: 'ಭಾರತದ ಎಲ್ಲಾ ನಗರಗಳು',
      searchLoungePlaceholder: 'ಕೋಡ್ ಅಥವಾ ಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ...',
      eligibleBadge: '✓ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಲಭ್ಯವಿದೆ',
      ineligibleBadge: '✕ ಈ ಶ್ರೇಣಿಯಲ್ಲಿ ಸೇರಿಸಲಾಗಿಲ್ಲ',
      viewDirections: 'ಟರ್ಮಿನಲ್ ಮಾರ್ಗಸೂಚಿಗಳು',
      timingsLabel: 'ಸಮಯ',
      amenitiesLabel: 'ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸೇವೆಗಳು',
      noLoungesFound: 'ಯಾವುದೇ ಲೌಂಜ್ ಕಂಡುಬಂದಿಲ್ಲ.',
      clearCardSelection: 'ಕಾರ್ಡ್ ತೆಗೆದುಹಾಕಿ'
    }
  }
};

for (const [lang, obj] of Object.entries(loungeI18n)) {
  const filePath = path.join(dir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add nav.loungeFinder if missing
  if (!content.match(/loungeFinder:\s*'/)) {
    content = content.replace(/(savedItems:\s*'[^']*',)/, `$1\n    loungeFinder: '${obj.navLabel}',`);
  }

  // Add or replace loungeFinder: { ... } block
  const lines = Object.entries(obj.data).map(([k, v]) => `    ${k}: '${v}',`).join('\n');
  const loungeBlock = `  loungeFinder: {\n${lines}\n  },\n};`;

  if (content.includes('loungeFinder: {')) {
    content = content.replace(/loungeFinder:\s*\{[\s\S]*?\n  \},?\n\};?/, loungeBlock);
  } else {
    content = content.replace(/\n\};?\s*$/, `,\n${loungeBlock}\n`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${lang}.ts with loungeFinder!`);
}
