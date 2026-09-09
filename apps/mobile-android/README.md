# Android Mobile Copilot Shell (Phase 2 Foundation)

Native Android implementation engineered for frontline Ethiopian Health Extension Workers (HEWs) operating in zero-connectivity rural clinics and community posts.

---

## 📱 Mobile Stack Architecture

- **Language**: Kotlin 1.9+
- **UI Framework**: Jetpack Compose (Declarative UI)
- **Local FHIR Engine**: Android FHIR SDK (Google / HL7 FHIR Engine)
- **Offline Storage**: SQLCipher encrypted Room database with Android Keystore
- **Background Sync**: WorkManager for idempotent outbox synchronization when network resumes
- **Concurrency**: Kotlin Coroutines & Flows

---

## 🔒 Security & Data Isolation
- Data encrypted at rest via 256-bit AES SQLCipher.
- Cryptographic keys stored inside hardware-backed Android Keystore.
- Automatic session timeout and passcode lock.
