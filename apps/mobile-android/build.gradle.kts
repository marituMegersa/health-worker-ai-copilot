plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "et.gov.moh.healthcopilot"
    compileSdk = 34

    defaultConfig {
        applicationId = "et.gov.moh.healthcopilot"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0-phase2"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
}

dependencies {
    // Android FHIR SDK & Engine
    implementation("com.google.android.fhir:engine:1.0.0")
    implementation("com.google.android.fhir:data-capture:1.0.0")

    // Jetpack Compose UI
    implementation("androidx.compose.ui:ui:1.6.0")
    implementation("androidx.compose.material3:material3:1.2.0")
    implementation("androidx.compose.ui:ui-tooling-preview:1.6.0")

    // Security & Encrypted Storage
    implementation("net.zetetic:android-database-sqlcipher:4.5.4")
    implementation("androidx.security:security-crypto:1.1.0-alpha06")

    // WorkManager & Offline Sync
    implementation("androidx.work:work-runtime-ktx:2.9.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
}
