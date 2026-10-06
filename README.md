[![](https://jitpack.io/v/zaitxcode/androidhelper.svg)](https://jitpack.io/#zaitxcode/androidhelper)
![AndroidX](https://img.shields.io/badge/AndroidX-Required-blue)
![Kotlin](https://img.shields.io/badge/Kotlin-First-purple)
![Platform](https://img.shields.io/badge/Platform-Android-green)
![Release](https://img.shields.io/badge/Release-orange)

# Android Helper

> Enterprise-grade, clean Android & Flutter utility library under `com.zaitxcode.android.*`.

Android Helper provides clean Android category helpers — Network, Audio, Vibration, Display, Biometrics, Secure Intents, Clipboard, Notifications, File Management, Device/Battery info, and Cryptography.

🌐 **Documentation:** [docs.zaitxcode.com/androidhelper](https://docs.zaitxcode.com/androidhelper)

---

## 📦 Installation & Setup

### 1. Add Dependency (libs.versions.toml)

```toml
[versions]
androidHelper = "1.0.0-beta04"

[libraries]
androidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidHelper" }
```

### 2. Add Repository (settings.gradle.kts)

```kotlin
repositories {
    google()
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}
```

### 3. Add Dependency (app/build.gradle.kts)

```kotlin
dependencies {
    implementation(libs.androidhelper)
}
```

### 4. Initialize in Application Class

```kotlin
import android.app.Application
import com.zaitxcode.android.core.AppHelper

class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        AppHelper.initialize(this)
    }
}
```

---

## 🚀 Category Usage Examples

```kotlin
import com.zaitxcode.android.net.Network
import com.zaitxcode.android.hardware.Audio
import com.zaitxcode.android.hardware.Vibration
import com.zaitxcode.android.content.Clipboard
import com.zaitxcode.android.hardware.Device
import com.zaitxcode.android.hardware.Battery

// Network checks
val isOnline = Network.isConnected
val transport = Network.activeTransport()

// Audio & Haptics
Audio.playClickSound()
Vibration.vibrate(200)

// Clipboard
Clipboard.copyText("Hello Android Helper")

// Device & Battery Info
val device = Device.deviceName()
val battery = Battery.getBatteryLevel()
```

---

## 🔒 Code Obfuscation & Consumer Safety

The published AAR ships with `consumer-rules.pro`, which is applied automatically
to every app that depends on the library. Enabling R8/minification in a consumer
project therefore never strips or renames the public API it calls — existing apps
keep working even though the library implementation itself is shrunk and obfuscated.

---

## 📄 License

**Android Helper is open source.**

You are free to use it in any project, commercial or non-commercial, either by
declaring it as a dependency in your Gradle build file, or by downloading the
source code and modifying it to fit your own needs.

In return, the **ZaitXCode identity must be preserved**, and the namespace line

```
com.zaitxcode.*
```

must be kept intact in every file that belongs to the library. Any violation of
these terms will be subject to legal action.

See the [LICENSE](LICENSE) file for full terms.

Copyright (c) 2026–2027 ZaitXCode. All rights reserved.
