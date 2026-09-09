export interface ProtocolCondition {
  id: string;
  name: string;
  category: 'Pediatric' | 'Maternal' | 'Infectious Disease' | 'Nutrition' | 'Chronic Care';
  targetAudience: string;
  dangerSigns: string[];
  diagnosticSteps: string[];
  treatmentPathway: {
    severity: 'GREEN (Low Risk)' | 'YELLOW (Moderate Risk / Clinic Follow-up)' | 'RED (Emergency / Immediate Referral)';
    criteria: string[];
    action: string[];
    medications?: { name: string; dosage: string; notes: string }[];
  }[];
  whoReference: string;
}

export const WHO_MEDICAL_PROTOCOLS: ProtocolCondition[] = [
  {
    id: 'malaria-fever-pediatric',
    name: 'Integrated Pediatric Fever & Malaria Protocol',
    category: 'Pediatric',
    targetAudience: 'Community Health Workers, Rural Clinic Nurses',
    dangerSigns: [
      'Unable to drink or breastfeed',
      'Vomiting everything',
      'Convulsions or seizures during this illness',
      'Lethargic or unconscious'
    ],
    diagnosticSteps: [
      'Measure body temperature (Fever threshold >= 37.5°C)',
      'Perform Malaria Rapid Diagnostic Test (mRDT)',
      'Check for stiff neck or bulging fontanelle',
      'Assess respiratory rate (Fast breathing: >50 bpm if 2-11m, >40 bpm if 12-59m)'
    ],
    treatmentPathway: [
      {
        severity: 'RED (Emergency / Immediate Referral)',
        criteria: ['Any Danger Sign present OR Positive mRDT with severe anemia/stiff neck'],
        action: [
          'Give first dose of rectal artesunate if available',
          'Urgent referral to District Hospital',
          'Keep patient warm, give oral rehydration if conscious'
        ],
        medications: [
          { name: 'Rectal Artesunate', dosage: '100mg capsule (11-20kg) or 50mg (<10kg)', notes: 'Pre-referral emergency dose' }
        ]
      },
      {
        severity: 'YELLOW (Moderate Risk / Clinic Follow-up)',
        criteria: ['mRDT Positive without danger signs'],
        action: [
          'Administer 3-day Artemether-Lumefantrine (ACT) course',
          'Give paracetamol for high fever (>38.5°C)',
          'Advise caregiver on red flag warning signs and follow up in 48h'
        ],
        medications: [
          { name: 'Artemether + Lumefantrine (ACT)', dosage: '1 tab BD for 3 days (5-14kg)', notes: 'Take with fatty food or milk' },
          { name: 'Paracetamol', dosage: '10-15mg/kg every 6h as needed', notes: 'For temperature control' }
        ]
      },
      {
        severity: 'GREEN (Low Risk)',
        criteria: ['mRDT Negative and no danger signs'],
        action: [
          'Treat for viral illness symptoms',
          'Increase fluid intake',
          'Return if fever persists beyond 3 days'
        ]
      }
    ],
    whoReference: 'WHO Guidelines for Malaria (2023) & IMCI Field Manual'
  },
  {
    id: 'maternal-preeclampsia-anc',
    name: 'Antenatal Care & Hypertensive Triage',
    category: 'Maternal',
    targetAudience: 'Midwives, NGO Field Health Nurses',
    dangerSigns: [
      'Systolic BP >= 160 mmHg or Diastolic BP >= 110 mmHg',
      'Severe intractable headache or visual disturbances (blurred vision, spots)',
      'Severe epigastric or right upper quadrant abdominal pain',
      'Vaginal bleeding or fluid leakage'
    ],
    diagnosticSteps: [
      'Check Blood Pressure using calibrated cuff twice (15 min apart)',
      'Perform urine dipstick test for Proteinuria (>= 2+ is significant)',
      'Check for bilateral pitting edema in lower extremities or face',
      'Check fetal heart rate'
    ],
    treatmentPathway: [
      {
        severity: 'RED (Emergency / Immediate Referral)',
        criteria: ['BP >= 160/110 mmHg OR BP >= 140/90 with Proteinuria 2+ and severe headache'],
        action: [
          'Administer loading dose of Magnesium Sulfate (IV/IM) if trained',
          'Give oral Nifedipine (10mg) for severe hypertension reduction',
          'Immediate emergency transport to emergency maternal care unit'
        ],
        medications: [
          { name: 'Magnesium Sulfate', dosage: '4g IV slow push + 10g IM loading dose', notes: 'Severe pre-eclampsia/eclampsia prevention' },
          { name: 'Nifedipine (Immediate Release)', dosage: '10mg orally', notes: 'Repeat in 30 min if BP remains > 160/110' }
        ]
      },
      {
        severity: 'YELLOW (Moderate Risk / Clinic Follow-up)',
        criteria: ['Mild hypertension (BP 140-159 / 90-109 mmHg) without severe symptoms'],
        action: [
          'Schedule bi-weekly clinic monitoring',
          'Initiate Methyldopa or Labetalol maintenance therapy',
          'Counsel mother on strict rest and warning signs'
        ],
        medications: [
          { name: 'Methyldopa', dosage: '250mg TDS orally', notes: 'First-line anti-hypertensive in pregnancy' }
        ]
      },
      {
        severity: 'GREEN (Low Risk)',
        criteria: ['BP < 140/90 mmHg, urine protein negative, normal fetal heart rate'],
        action: [
          'Continue routine ANC visit schedule',
          'Provide Iron & Folic acid supplements',
          'Provide Tetanus toxoid immunization'
        ],
        medications: [
          { name: 'Iron + Folic Acid', dosage: '60mg elemental iron + 400mcg folic acid daily', notes: 'Standard ANC prophylaxis' }
        ]
      }
    ],
    whoReference: 'WHO ANC Recommendations for a Positive Pregnancy Experience'
  },
  {
    id: 'pediatric-malnutrition-muac',
    name: 'Child Acute Malnutrition & MUAC Screening',
    category: 'Nutrition',
    targetAudience: 'NGO Nutrition Officers, Community Health Workers',
    dangerSigns: [
      'MUAC < 11.5 cm with severe bilateral edema (+++)',
      'Anorexia (failed appetite test for RUTF)',
      'Lower respiratory infection or high fever'
    ],
    diagnosticSteps: [
      'Measure Mid-Upper Arm Circumference (MUAC) on left arm using standard tape',
      'Assess for bilateral pitting edema (feet/legs)',
      'Conduct RUTF Appetite Test (offer 1 sachet ready-to-use therapeutic food)',
      'Check weight-for-height Z-score (WHZ)'
    ],
    treatmentPathway: [
      {
        severity: 'RED (Emergency / Immediate Referral)',
        criteria: ['MUAC < 11.5 cm WITH medical complications OR Failed Appetite Test'],
        action: [
          'Refer immediately to Inpatient Stabilization Center (ITP)',
          'Provide initial oral rehydration F-75 milk if available',
          'Keep warm to prevent hypoglycemia and hypothermia'
        ]
      },
      {
        severity: 'YELLOW (Moderate Risk / Clinic Follow-up)',
        criteria: ['MUAC 11.5 cm to 12.4 cm (MAM) OR MUAC < 11.5 cm WITHOUT complications (SAM Uncomplicated)'],
        action: [
          'Enroll in Outpatient Therapeutic Program (OTP)',
          'Provide weekly RUTF supply (150-200 kcal/kg/day)',
          'Administer single dose Amoxicillin (50-100mg/kg/day) for SAM',
          'De-worming (Albendazole) and Vitamin A capsule'
        ],
        medications: [
          { name: 'RUTF (PlumpyNut)', dosage: '2-3 sachets daily based on weight', notes: 'Community-based management' },
          { name: 'Amoxicillin', dosage: '50mg/kg BD for 7 days', notes: 'Routine antibiotic for uncomplicated SAM' }
        ]
      },
      {
        severity: 'GREEN (Low Risk)',
        criteria: ['MUAC >= 12.5 cm and no edema'],
        action: [
          'Counsel on infant & young child feeding (IYCF)',
          'Schedule routine growth monitoring next month'
        ]
      }
    ],
    whoReference: 'WHO/UNICEF Guideline on Prevention and Management of Acute Malnutrition'
  },
  {
    id: 'pediatric-diarrhea-ors',
    name: 'Acute Watery Diarrhea & Dehydration Management',
    category: 'Pediatric',
    targetAudience: 'Community Health Workers, Primary Care Triage',
    dangerSigns: [
      'Lethargic or unconscious child',
      'Sunken eyes with skin pinch going back very slowly (>2 seconds)',
      'Unable to drink or drinking poorly'
    ],
    diagnosticSteps: [
      'Assess general condition (alert, restless, irritable, lethargic)',
      'Look at eyes (normal vs sunken)',
      'Offer liquid (drinks normally vs eagerly/thirsty vs unable to drink)',
      'Pinch skin of abdomen (goes back immediately vs slowly vs very slowly)'
    ],
    treatmentPathway: [
      {
        severity: 'RED (Emergency / Immediate Referral)',
        criteria: ['Two or more signs of Severe Dehydration (Plan C)'],
        action: [
          'Start IV fluids immediately (Ringer Lactate 100ml/kg in 3 hours)',
          'Give ORS by mouth if child can drink while IV is prepared',
          'Refer urgently if IV cannot be established locally'
        ]
      },
      {
        severity: 'YELLOW (Moderate Risk / Clinic Follow-up)',
        criteria: ['Two or more signs of Some Dehydration (Plan B)'],
        action: [
          'Give recommended amount of ORS in clinic over 4-hour period (75 ml/kg)',
          'Provide 14-day course of Zinc dispersible tablets',
          'Re-assess after 4 hours'
        ],
        medications: [
          { name: 'Low-osmolarity ORS', dosage: '75 ml/kg over 4 hours', notes: 'Give frequent small sips' },
          { name: 'Zinc Sulfate', dosage: '20mg daily for 14 days (10mg if <6 months)', notes: 'Reduces duration & recurrence' }
        ]
      },
      {
        severity: 'GREEN (Low Risk)',
        criteria: ['No signs of dehydration (Plan A)'],
        action: [
          'Home care Plan A: Give extra fluids (ORS, soup, rice water)',
          'Continue feeding and breastmilk',
          'Give 14-day Zinc supplementation'
        ]
      }
    ],
    whoReference: 'WHO The Treatment of Diarrhoea: A manual for physicians and health workers'
  }
];
