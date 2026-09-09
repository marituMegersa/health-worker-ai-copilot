# Health Worker AI Copilot 🩺🤖

**Health Worker AI Copilot** is a digital health platform designed for **NGOs, rural clinics, community health workers (CHWs), and government public health programs**.

It combines offline-capable WHO clinical practice guidelines (IMCI, ANC, Pediatric Fever/Malaria, Malnutrition MUAC), AI-assisted triage scoring, voice-enabled patient intake, medication dosage calculators, and real-time epidemiological outbreak surveillance.

---

## 🌟 Key Features

1. **AI Clinical Decision Support & Triage**:
   - Evaluates patient presentation, vital signs (Temp, BP, MUAC), and mRDT diagnostic results.
   - Assigns WHO-aligned risk levels: **RED** (Emergency Referral), **YELLOW** (Moderate Risk / Clinic Follow-up), **GREEN** (Low Risk).
   - Generates differential diagnoses and step-by-step clinical action pathways.

2. **Voice-to-Text & Patient Intake Registry**:
   - Digital registration for community members.
   - Voice consultation summarizer for frontline health workers in low-resource environments.
   - Mid-Upper Arm Circumference (MUAC) malnutrition tracking for children under 5.

3. **NGO & Government Public Health Surveillance**:
   - Real-time outbreak detection (Malaria, Acute Watery Diarrhea, Upper Respiratory Infection spikes).
   - Interactive district heatmaps and epidemiological trend charts.
   - One-click export for standardized DHIS2 & NGO donor reports.

4. **Essential Medicine & Supply Chain Tracker**:
   - Stock monitoring for mRDT diagnostic kits, Artemether-Lumefantrine (Coartem), PlumpyNut (RUTF), ORS, and Zinc tablets.
   - Proactive alert triggers for low stock and critical stockouts at rural health posts.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS & Lucide Icons
- **Data Visualizations**: Recharts
- **Protocol Engine**: Embedded WHO IMCI, ANC & CDC Clinical Guidelines Engine (`src/lib/protocols/medicalProtocols.ts`)
- **AI Triage Engine**: Rule-assisted LLM reasoning & structured triage classifier (`src/lib/ai/copilot.ts`)

---

## 📁 Repository Structure

```text
├── src/
│   ├── app/
│   │   ├── analytics/       # NGO & Govt Public Health Surveillance Portal
│   │   ├── api/             # Next.js API Routes (Triage, Patients, Analytics)
│   │   ├── patients/        # Patient Registry & Digital Intake
│   │   ├── supplies/        # Essential Medicine Stock Monitor
│   │   ├── triage/          # Interactive AI Clinical Triage Assistant
│   │   ├── globals.css      # Tailwind & Custom Healthcare Styles
│   │   ├── layout.tsx       # Root App Layout with Navigation
│   │   └── page.tsx         # Health Worker AI Copilot Portal Overview
│   ├── components/
│   │   └── Navbar.tsx       # Navigation bar & status indicator
│   └── lib/
│       ├── ai/              # Triage engine & outbreak synthesizer
│       ├── protocols/       # WHO/CDC Medical Protocol rules
│       └── db.ts            # Local patient store & initial data seeds
├── public/
├── package.json
└── README.md
```

---

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your web browser.
