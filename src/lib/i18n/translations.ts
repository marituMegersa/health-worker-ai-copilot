export type SupportedLanguage = 'en' | 'am' | 'om';

export interface TranslationDictionary {
  title: string;
  subtitle: string;
  triageTitle: string;
  triageSubtitle: string;
  patientsTitle: string;
  patientsSubtitle: string;
  analyticsTitle: string;
  analyticsSubtitle: string;
  suppliesTitle: string;
  suppliesSubtitle: string;
  roleHEW: string;
  roleNurse: string;
  roleMidwife: string;
  roleHealthOfficer: string;
  roleAdmin: string;
  safetyGreen: string;
  safetyAmber: string;
  safetyRed: string;
  confirmHealthWorkerAction: string;
  healthWorkerConfirmed: string;
  citationSource: string;
  section: string;
  page: string;
  version: string;
  confidence: string;
  aiAbstentionWarning: string;
  ancVisit1: string;
  maternalDangerSigns: string;
  pediatricIMCI: string;
  immunizationCheck: string;
  referralRequired: string;
  eChisId: string;
  dhis2Export: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    title: 'Ethiopian Health Worker AI Copilot',
    subtitle: 'Decision support for Health Extension Workers, Nurses & Midwives',
    triageTitle: 'Clinical Triage & Decision Support Engine',
    triageSubtitle: 'Ethiopian MoH & WHO SMART Guidelines Aligned',
    patientsTitle: 'Patient Registry & eCHIS Records',
    patientsSubtitle: 'Community Health Extension Program (CHEP) Records',
    analyticsTitle: 'MoH & DHIS2 Interoperability Portal',
    analyticsSubtitle: 'Aggregate reporting & disease surveillance heatmap',
    suppliesTitle: 'Essential Medicine Supply Chain',
    suppliesSubtitle: 'Rural health post stock monitoring',
    roleHEW: 'Health Extension Worker (HEW)',
    roleNurse: 'Clinic Nurse',
    roleMidwife: 'Midwife',
    roleHealthOfficer: 'Health Officer',
    roleAdmin: 'System Admin',
    safetyGreen: 'GREEN (General Info / Guidelines)',
    safetyAmber: 'AMBER (Patient Care Plan - Confirmation Required)',
    safetyRed: 'RED (Emergency Referral Protocol - Offline First)',
    confirmHealthWorkerAction: 'I confirm this clinical action based on patient examination',
    healthWorkerConfirmed: 'Confirmed by Health Worker',
    citationSource: 'Approved Guideline Source',
    section: 'Section',
    page: 'Page',
    version: 'Guideline Version',
    confidence: 'Evidence Confidence',
    aiAbstentionWarning: 'AI Abstention: Insufficient clinical data or guideline unverified. Please consult senior clinician.',
    ancVisit1: 'Antenatal Care (ANC) First Visit Protocol',
    maternalDangerSigns: 'Maternal Danger Signs Screening',
    pediatricIMCI: 'Child Health (IMCI) Triage',
    immunizationCheck: 'EPI Immunization Schedule Check',
    referralRequired: 'Urgent Hospital Referral Required',
    eChisId: 'eCHIS Patient ID',
    dhis2Export: 'DHIS2 Reporting'
  },
  am: {
    title: 'የኢትዮጵያ ጤና ኤክስቴንሽን ኤአይ ኮፓይለት',
    subtitle: 'ለጤና ኤክስቴንሽን ሰራተኞች፣ ነርሶች እና አዋላጆች የተዘጋጀ የውሳኔ ድጋፍ',
    triageTitle: 'ክሊኒካዊ ውሳኔ ድጋፍ እና የምርመራ ሞተር',
    triageSubtitle: 'የኢትዮጵያ ጤና ሚኒስቴር እና የዓለም ጤና ድርጅት መመሪያዎችን የጠበቀ',
    patientsTitle: 'የታካሚዎች መዝገብ እና eCHIS መረጃ',
    patientsSubtitle: 'የህብረተሰብ ጤና ኤክስቴንሽን መርሃ ግብር መዝገቦች',
    analyticsTitle: 'የጤና ሚኒስቴር እና DHIS2 የመረጃ ፖርታል',
    analyticsSubtitle: 'የወረርሽኝ እና አጠቃላይ የጤና መረጃዎች ማጠቃለያ',
    suppliesTitle: 'የመድኃኒት እና ህክምና ቁሳቁስ ክትትል',
    suppliesSubtitle: 'የጤና ኬላዎች መድኃኒት ክምችት ክትትል',
    roleHEW: 'የጤና ኤክስቴንሽን ሰራተኛ',
    roleNurse: 'ክሊኒክ ነርስ',
    roleMidwife: 'አዋላጅ (ሚድዋይፍ)',
    roleHealthOfficer: 'ጤና መኮንን',
    roleAdmin: 'የስርዓት አስተዳዳሪ',
    safetyGreen: 'አረንጓዴ (አጠቃላይ መረጃ / መመሪያዎች)',
    safetyAmber: 'ቢጫ (የታካሚ እንክብካቤ እቅድ - ማረጋገጫ ያስፈልጋል)',
    safetyRed: 'ቀይ (የድንገተኛ ህክምና ሪፈራል ፕሮቶኮል - ከመስመር ውጭ)',
    confirmHealthWorkerAction: 'በታካሚው ምርመራ ላይ በመመስረት ይህንን ህክምና አረጋግጣለሁ',
    healthWorkerConfirmed: 'በጤና ሰራተኛው ተረጋግጧል',
    citationSource: 'የተረጋገጠ መመሪያ ምንጭ',
    section: 'ክፍል',
    page: 'ገጽ',
    version: 'የመመሪያ ስሪት',
    confidence: 'የመረጃ ተአማኒነት',
    aiAbstentionWarning: 'ማስጠንቀቂያ፡ በቂ ያልሆነ ክሊኒካዊ መረጃ ወይም ያልተረጋገጠ መመሪያ። እባክዎን ከፍተኛ ሀኪም ያማክሩ።',
    ancVisit1: 'የእናቶች ቅድመ ወሊድ ክትትል (ANC) የመጀመሪያ ጉብኝት',
    maternalDangerSigns: 'የእናቶች አደገኛ ምልክቶች ምርመራ',
    pediatricIMCI: 'የህፃናት ጤና (IMCI) ምርመራ',
    immunizationCheck: 'የህፃናት ክትባት መርሃ ግብር ክትትል',
    referralRequired: 'አስቸኳይ ወደ ሆስፒታል ሪፈራል ያስፈልጋል',
    eChisId: 'eCHIS የታካሚ መታወቂያ',
    dhis2Export: 'DHIS2 ሪፖርት'
  },
  om: {
    title: 'Koppayilotii AI Ogeessa Fayyaa Itoophiyaa',
    subtitle: 'Hojjettoota Ekstensiinii Fayyaa, Narsootaa fi Deessistootaaf Deeggarsa Murtoo',
    triageTitle: 'Mootara Murtoo Triage Kiliinikaa',
    triageSubtitle: 'Qajeelfama Ministeera Fayyaa Itoophiyaa fi WHO SMART tiin Sanada'i',
    patientsTitle: 'Galmee Dhukkubsattootaa fi Odeeffannoo eCHIS',
    patientsSubtitle: 'Galmee Tajaajila Ekstensiinii Fayyaa Hawaasaa',
    analyticsTitle: 'Portal Walqabatiinsa MoH fi DHIS2',
    analyticsSubtitle: 'Gabaasa Waliigalaa fi Hordoffii Tatamsa\'iinsa Dhukkubootaa',
    suppliesTitle: 'Hordoffii Qorichoota Barbachisoo',
    suppliesSubtitle: 'Hordoffii kuusaa qorichaa Keellaa Fayyaa',
    roleHEW: 'Hoojjettuu Ekstensiinii Fayyaa (HEW)',
    roleNurse: 'Narsii Kiliinikaa',
    roleMidwife: 'Deessistuu (Midwife)',
    roleHealthOfficer: 'Ogeessa Fayyaa (Health Officer)',
    roleAdmin: 'Bulchaa Systemii',
    safetyGreen: 'MAGARIISA (Odeeffannoo Waliigalaa / Qajeelfama)',
    safetyAmber: 'BOORA (Karoora Kunninsaa - Mirkaneessa Barbaada)',
    safetyRed: 'DIIMAALEE (Tartiiba Dabarsa Ariifachiisaa - Offline)',
    confirmHealthWorkerAction: 'Qorannoo dhukkubsataa irratti hundaa’uun tarkaanfii kana mirkaneessera',
    healthWorkerConfirmed: 'Ogeessa Fayyaatiin Mirkanaa\'era',
    citationSource: 'Madda Qajeelfama Mirkanaa\'e',
    section: 'Kutaa',
    page: 'Fuula',
    version: 'Wanta Qajeelfamaa',
    confidence: 'Sadarkaa Amanamummaa',
    aiAbstentionWarning: 'Akeekkachiisa: Odeeffannoon kiliinikaa gahaa miti ykn qajeelfamni hin mirkanaa\'ine. Ogeessa fayyaa olaanaa mariisisaa.',
    ancVisit1: 'Hordoffii Da\'umsa Duraa (ANC) Daawwannaa 1ffaa',
    maternalDangerSigns: 'Qorannoo Mallattoolee Balaa Haadholii',
    pediatricIMCI: 'Qorannoo Fayyaa Daa\'immanii (IMCI)',
    immunizationCheck: 'Hordoffii Talaallii Daa\'immanii',
    referralRequired: 'Gara Hospitaalaatti Garaagarsiisa Ariifachiisaa Barbaachisa',
    eChisId: 'Eenyummeessaa Dhukkubsataa eCHIS',
    dhis2Export: 'Gabaasa DHIS2'
  }
};
