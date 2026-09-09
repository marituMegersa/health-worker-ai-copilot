export interface ClinicalGuidelineManifest {
  id: string;
  title: string;
  publisher: string;
  jurisdiction: 'Ethiopia' | 'Global (WHO)';
  version: string;
  effectiveDate: string;
  status: 'approved' | 'superseded';
  targetAudience: string[];
  sections: {
    sectionId: string;
    heading: string;
    pageNumber: number;
    text: string;
    cqlRuleReference?: string;
  }[];
}

export const ETHIOPIAN_MOH_GUIDELINES: ClinicalGuidelineManifest[] = [
  {
    id: 'eth-anc-2026',
    title: 'Ethiopian National Antenatal Care & Maternal Management Guidelines',
    publisher: 'Ethiopian Ministry of Health (MoH)',
    jurisdiction: 'Ethiopia',
    version: '2026.1',
    effectiveDate: '2026-01-01',
    status: 'approved',
    targetAudience: ['Health Extension Worker', 'Nurse', 'Midwife'],
    sections: [
      {
        sectionId: '4.2.1',
        heading: 'Severe Pre-Eclampsia Screening & Pre-referral Management',
        pageNumber: 58,
        text: 'Systolic blood pressure >= 160 mmHg or Diastolic blood pressure >= 110 mmHg with proteinuria or severe headache requires immediate emergency loading dose of Magnesium Sulfate (4g IV + 10g IM) and immediate hospital referral.'
      },
      {
        sectionId: '2.1',
        heading: 'Routine ANC Schedule & Supplementation',
        pageNumber: 18,
        text: 'Administer daily Iron (60mg) + Folic Acid (400mcg) supplementation throughout pregnancy. Screen for Syphilis, HIV, and Hemoglobin at first visit.'
      }
    ]
  },
  {
    id: 'eth-imci-2025',
    title: 'Ethiopian Integrated Management of Newborn and Childhood Illness (IMCI)',
    publisher: 'Ethiopian MoH & EPHI',
    jurisdiction: 'Ethiopia',
    version: '2025.2',
    effectiveDate: '2025-06-01',
    status: 'approved',
    targetAudience: ['Health Extension Worker', 'Primary Care Nurse'],
    sections: [
      {
        sectionId: '3.1',
        heading: 'Pediatric Fever & Malaria Triage',
        pageNumber: 34,
        text: 'Any child with temperature >= 37.5C must be tested with mRDT. If positive without danger signs, administer 3-day Coartem course by weight. If danger signs present (convulsions, lethargy, unable to drink), administer pre-referral Rectal Artesunate and refer immediately.'
      }
    ]
  }
];
