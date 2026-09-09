# Phase 1: Data Policy, Privacy & Legal Governance Framework

**Compliance with Ethiopian Personal Data Protection Proclamation No. 1321/2024 & MoH Digital Health Blueprint**

---

## 1. Statutory & Regulatory Compliance Foundation

The Health Worker AI Copilot is engineered to strictly comply with Ethiopian national legislation and Ministry of Health directives:

- **Personal Data Protection Proclamation No. 1321/2024**: Governs sensitive health data processing, lawful basis, explicit consent, data minimization, and cross-border transfer prohibitions.
- **Health Service Administration and Regulation Proclamation No. 1362/2024**: Regulates digital health records, safety standards, and clinical quality assurances.
- **MoH National Health Data Access and Sharing Guidelines**: Governs interoperability between eCHIS, EMR, DHIS2, and NHDD registries.

---

## 2. Protected Health Information (PHI) & LLM Isolation Policy

> [!CAUTION]
> **Strict PHI Isolation Rule**: Patient-identifiable health information (Names, eCHIS IDs, phone numbers, exact addresses) **MUST NEVER** be transmitted to third-party or external cloud LLM APIs.

```text
Patient Data (Local Device)
           ↓
De-identification & Concept Extraction
           ↓
Canonical Medical Concepts (e.g. "BP 165/112, 28wks pregnancy")
           ↓
Local / On-Prem RAG Engine
           ↓
Evidence Retrieval & Rule Execution
```

---

## 3. Data Storage & On-Device Security Architecture

1. **Android Field Devices**:
   - Encrypted local database via **SQLCipher / Android FHIR Engine**.
   - Cryptographic key management secured inside **Android Keystore**.
   - Mandatory device passcode and session auto-lock after 15 minutes of inactivity.

2. **Network & Transmission Security**:
   - Mandatory **TLS 1.3** encryption for all REST/FHIR network sync traffic.
   - Certificate pinning between mobile clients and API Gateways.

3. **Tamper-Resistant Audit Logging**:
   - Every patient view, clinical recommendation, care plan override, and referral dispatch generates an immutable **FHIR `AuditEvent`**.
   - Audit logs are append-only and cryptographically signed.
