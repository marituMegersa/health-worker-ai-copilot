export interface NHDDConcept {
  nhddCode: string;
  displayEnglish: string;
  displayAmharic: string;
  displayAfaanOromo: string;
  icd11Code?: string;
  loincCode?: string;
  category: 'Maternal' | 'Pediatric' | 'Infectious' | 'Nutrition' | 'Vitals';
}

export const ETHIOPIAN_NHDD_DICTIONARY: Record<string, NHDDConcept> = {
  'NHDD-0101': {
    nhddCode: 'NHDD-0101',
    displayEnglish: 'Antenatal Care Visit (ANC)',
    displayAmharic: 'የእናቶች ቅድመ ወሊድ ክትትል (ANC)',
    displayAfaan Oromo: 'Hordoffii Da\'umsa Duraa (ANC)',
    icd11Code: 'QA40.0',
    loincCode: '45708-5',
    category: 'Maternal'
  },
  'NHDD-0102': {
    nhddCode: 'NHDD-0102',
    displayEnglish: 'Pre-Eclampsia / Severe Gestational Hypertension',
    displayAmharic: 'የእናቶች ደም ግፊት / ፕሪ-ኤክላምፕሲያ',
    displayAfaan Oromo: 'Dhibee Dhiibbaa Dhiigaa Haadholii',
    icd11Code: 'JA24.0',
    loincCode: '8480-6',
    category: 'Maternal'
  },
  'NHDD-0201': {
    nhddCode: 'NHDD-0201',
    displayEnglish: 'Pediatric Febrile Illness / Malaria',
    displayAmharic: 'የህፃናት ትኩሳት / ወባ',
    displayAfaan Oromo: 'Dhibee Osho / Busaa Daa\'immanii',
    icd11Code: '1F40',
    loincCode: '87431-3',
    category: 'Pediatric'
  },
  'NHDD-0301': {
    nhddCode: 'NHDD-0301',
    displayEnglish: 'Severe Acute Malnutrition (SAM MUAC < 11.5cm)',
    displayAmharic: 'በጣም ጽኑ የህፃናት የምግብ እጥረት',
    displayAfaan Oromo: 'Hanqina Nyata Alaa Hammaata Daa\'immanii',
    icd11Code: '5B50.0',
    loincCode: '89270-3',
    category: 'Nutrition'
  }
};
