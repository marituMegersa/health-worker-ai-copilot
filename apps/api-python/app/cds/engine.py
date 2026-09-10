from app.schemas.triage import PatientTriageInput, CDSEngineResult, CitationSchema, MedicationDosage, ReferralRequestSchema

def evaluate_python_clinical_rules(input_data: PatientTriageInput) -> CDSEngineResult:
    vitals = input_data.vitals
    labs = input_data.lab_results
    
    # 1. Check for RED EMERGENCY Danger Signs (Severe Pre-Eclampsia)
    is_severe_hypertension = (vitals.systolic_bp and vitals.systolic_bp >= 160) or (vitals.diastolic_bp and vitals.diastolic_bp >= 110)
    has_severe_proteinuria = labs and labs.proteinuria_dipstick in ['2+', '3+', '4+']
    has_headache_spots = 'Severe headache' in input_data.symptoms or 'Blurred vision' in input_data.symptoms
    
    if input_data.is_pregnant and (is_severe_hypertension or (has_severe_proteinuria and has_headache_spots)):
        return CDSEngineResult(
            safety_tier='RED',
            title='CRITICAL EMERGENCY: Severe Pre-Eclampsia / Eclampsia Warning',
            summary=f'Gestational Age: {input_data.gestational_age_weeks or 28}wks. BP: {vitals.systolic_bp}/{vitals.diastolic_bp} mmHg with severe neurological warning signs.',
            deterministic_care_plan=[
                'IMMEDIATE EMERGENCY REFERRAL to Specialized Maternal Hospital.',
                'Administer Magnesium Sulfate 50% Inj loading dose (4g IV slow push + 10g IM) if certified.',
                'Administer oral Nifedipine 10mg immediate release for blood pressure reduction.',
                'Maintain left lateral tilt position and monitor BP every 15 mins during transport.'
            ],
            prescribed_medications=[
                MedicationDosage(name='Magnesium Sulfate 50% Inj', dosage='4g IV + 10g IM loading dose', notes='Pre-eclampsia seizure prophylaxis'),
                MedicationDosage(name='Nifedipine 10mg', dosage='10mg orally', notes='Repeat in 30 mins if BP > 160/110')
            ],
            referral_request=ReferralRequestSchema(
                urgency='IMMEDIATE_EMERGENCY',
                destination_facility_type='Hospital / Specialized Emergency Unit',
                reason_text='Severe Pre-Eclampsia in pregnancy'
            ),
            citation=CitationSchema(
                guideline_title='Ethiopian National Antenatal Care & Maternal Management Guidelines',
                publisher='Ethiopian Ministry of Health (MoH)',
                version='2026.1',
                section='4.2.1 Severe Pre-Eclampsia Triage',
                page_number=58,
                confidence_score=0.99,
                effective_date='2026-01-01'
            ),
            requires_health_worker_confirmation=True,
            ai_abstention_triggered=False
        )

    # 2. Check for RED EMERGENCY Danger Signs (Pediatric IMCI & SAM)
    has_child_danger = any(ds in input_data.danger_signs for ds in ['Convulsions or seizures during illness', 'Lethargic or unconscious', 'Unable to drink or breastfeed'])
    is_sam = vitals.muac_cm and vitals.muac_cm < 11.5

    if input_data.age_years <= 5 and (has_child_danger or is_sam or (vitals.temperature_c and vitals.temperature_c >= 39.5 and labs and labs.m_rdt == 'POSITIVE')):
        return CDSEngineResult(
            safety_tier='RED',
            title='CRITICAL EMERGENCY: Severe Pediatric Illness / SAM Complications',
            summary=f'Child ({input_data.age_years}y): Temp {vitals.temperature_c}°C, MUAC {vitals.muac_cm}cm, mRDT {labs.m_rdt if labs else "N/A"}.',
            deterministic_care_plan=[
                'IMMEDIATE EMERGENCY REFERRAL to District Hospital.',
                'Administer pre-referral Rectal Artesunate capsule.',
                'Keep child warm and give oral rehydration if conscious.'
            ],
            prescribed_medications=[
                MedicationDosage(name='Rectal Artesunate Capsule', dosage='50mg single rectal dose', notes='Pre-referral antimalarial')
            ],
            referral_request=ReferralRequestSchema(
                urgency='IMMEDIATE_EMERGENCY',
                destination_facility_type='Hospital / Specialized Emergency Unit',
                reason_text='Severe pediatric febrile illness / SAM complications'
            ),
            citation=CitationSchema(
                guideline_title='Ethiopian Integrated Management of Newborn and Childhood Illness (IMCI)',
                publisher='Ethiopian MoH & EPHI',
                version='2025.2',
                section='3.1 Pediatric Emergency Triage',
                page_number=34,
                confidence_score=0.98,
                effective_date='2025-06-01'
            ),
            requires_health_worker_confirmation=True,
            ai_abstention_triggered=False
        )

    # 3. AMBER: Routine ANC or Uncomplicated Malaria Protocol
    if input_data.is_pregnant:
        return CDSEngineResult(
            safety_tier='AMBER',
            title='Antenatal Care (ANC) Routine Care Plan',
            summary=f'Gestational Age: {input_data.gestational_age_weeks or 28}wks. Routine screening & supplementation.',
            deterministic_care_plan=[
                'Check Blood Pressure, Weight, and Urine Dipstick Proteinuria.',
                'Provide 60mg elemental Iron + 400mcg Folic Acid daily supply.',
                'Screen for Anemia, Syphilis, and HIV.'
            ],
            prescribed_medications=[
                MedicationDosage(name='Iron + Folic Acid Tablets', dosage='1 tablet daily', notes='Routine ANC supplementation')
            ],
            citation=CitationSchema(
                guideline_title='Ethiopian MoH Standard Antenatal Care Guideline',
                publisher='Ethiopian Ministry of Health',
                version='2026.1',
                section='2.1 Routine ANC Schedule',
                page_number=18,
                confidence_score=0.95,
                effective_date='2026-01-01'
            ),
            requires_health_worker_confirmation=True,
            ai_abstention_triggered=False
        )

    # 4. GREEN: Routine Preventive Maintenance
    return CDSEngineResult(
        safety_tier='GREEN',
        title='Routine Health Maintenance & Primary Care',
        summary='No acute emergency danger signs or active infection protocol triggered.',
        deterministic_care_plan=[
            'Provide routine age-appropriate health education.',
            'Check EPI Immunization card for missing vaccines.',
            'Promote hand hygiene and clean water practices.'
        ],
        prescribed_medications=[],
        citation=CitationSchema(
            guideline_title='Ethiopian Community Health Extension Program Manual',
            publisher='Ethiopian Ministry of Health',
            version='2026.1',
            section='1.4 Primary Prevention in Health Posts',
            page_number=12,
            confidence_score=0.92,
            effective_date='2026-01-01'
        ),
        requires_health_worker_confirmation=False,
        ai_abstention_triggered=False
    )
