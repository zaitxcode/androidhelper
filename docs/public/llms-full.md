# Android Helper - Complete Technical Documentation for AI Assistants

Android Helper is an enterprise-grade Android and Flutter utility library designed to simplify common Android tasks: network checks, vibration, audio feedback, display metrics, biometric authentication, secure intents, clipboard, notifications, file management, and device/battery info.

Current Version: 1.0.0-alpha01
Repository: https://github.com/zaitxcode/androidhelper
Website: https://docs.zaitxcode.com/androidhelper/

---

## 1. Installation & Initialization

### Gradle Setup (libs.versions.toml)
```toml
[versions]
androidHelper = "1.0.0-alpha01"

[libraries]
android-helper = { group = "com.github.zaitxcode", name = "android-helper", version.ref = "androidHelper" }
```

### Repositories (settings.gradle.kts)
```kotlin
repositories {
    google()
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}
```

### Module Dependency (app/build.gradle.kts)
```kotlin
dependencies {
    implementation(libs.android.helper)
}
```

### Application Initialization
Must be initialized once inside Application.onCreate():
```kotlin
import android.app.Application
import com.zaitxcode.android.AppHelper
// Or using AppHelper alias:
// import com.zaitxcode.android.AppHelper

class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        AppHelper.initialize(this)
    }
}
```

---

## 2. Clean Unified API Reference (`com.zaitxcode.android.*` & `com.zaitxcode.android.AppHelper`)

### 🌐 Network Helpers (`import com.zaitxcode.android.net.Network`)
- `Network.isConnected: Boolean` -> Returns true if connected to validated internet.
- `Network.hasValidatedInternet(): Boolean` -> Returns true if network connection is validated by system.
- `Network.isConnectionMetered(): Boolean` -> Returns true if active network is metered.
- `Network.activeTransport(): String` -> Returns active transport: "WIFI", "CELLULAR", "ETHERNET", "VPN", "BLUETOOTH", "NONE".
- `Network.isWifiConnected(): Boolean` -> Returns true if connected via WiFi.
- `Network.isCellularConnected(): Boolean` -> Returns true if connected via Cellular data.

### 🔗 Intent Helpers (`import com.zaitxcode.android.content.Intent`)
- `Intent.openWhatsApp(phone: String, message: String? = null)` -> Opens WhatsApp conversation.
- `Intent.dial(phone: String)` -> Opens phone dialer with phone number.
- `Intent.sendSms(phone: String, message: String = "")` -> Opens SMS app.
- `Intent.sendEmail(email: String, subject: String = "", body: String = "")` -> Opens email client.
- `Intent.shareText(text: String)` -> Opens system text share sheet.
- `Intent.shareFile(uri: Uri, mimeType: String, chooserTitle: String = "Share via")` -> Shares file URI.
- `Intent.openMap(latitude: Double, longitude: Double, label: String? = null)` -> Opens map application.
- `Intent.openAppSettings()` -> Opens system app settings page for current app.
- `Intent.openPlayStore(packageName: String = ...)` -> Opens Play Store listing.

### 📋 Clipboard (`import com.zaitxcode.android.content.Clipboard`)
- `Clipboard.copyText(text: String)` -> Copies text to clipboard.
- `Clipboard.getText(): String?` -> Gets text from clipboard.
- `Clipboard.hasCopiedText(): Boolean` -> Returns true if clipboard contains text.

### 📳 Vibration & Screen (`import com.zaitxcode.android.hardware.Vibration` & `Screen`)
- `Vibration.vibrate(ms: Long = 500)` -> Triggers physical vibration motor.
- `Vibration.vibratePattern(pattern: LongArray, repeat: Int = -1)` -> Triggers custom vibration pattern.
- `Screen.blockCapture()` -> Prevents screen recording and screenshots on active Activity.
- `Screen.unblockCapture()` -> Restores screen capture permissions.
- `Screen.isCaptureBlocked(): Boolean` -> Returns true if screenshots are currently blocked.

### 🔊 Audio & Display Helpers (`import com.zaitxcode.android.hardware.Audio` & `Display`)
- `Audio.playClickSound()` -> Plays system tactile click sound effect.
- `Audio.isMuted(): Boolean` -> Returns true if phone is in Silent or Vibrate mode.
- `Audio.getMusicVolume(): Int` -> Returns music volume percentage (0 to 100%).
- `Display.isPortrait(): Boolean` -> Returns true if screen orientation is Portrait.
- `Display.isLandscape(): Boolean` -> Returns true if screen orientation is Landscape.
- `Display.getScreenWidthDp(): Int` -> Returns screen width in density-independent pixels (dp).
- `Display.getScreenHeightDp(): Int` -> Returns screen height in density-independent pixels (dp).

### 🔔 Notifications & Keyboard (`import com.zaitxcode.android.app.Notification` & `Keyboard`)
- `Notification.createChannel(id: String, name: String, description: String = "", importance: Int = ...)` -> Creates notification channel.
- `Notification.showNotification(channelId: String, title: String, text: String, iconResId: Int, id: Int = 1)` -> Posts notification.
- `Notification.cancelAll()` -> Cancels all app notifications.
- `Keyboard.hideKeyboard()` -> Hides soft keyboard for active Activity.

### 📱 Device & Battery Info (`import com.zaitxcode.android.hardware.Device` & `Battery`)
- `Device.deviceName(): String` -> Returns device brand & model name.
- `Device.brand(): String` -> Returns device brand.
- `Device.manufacturer(): String` -> Returns manufacturer.
- `Device.sdk(): Int` -> Returns Android SDK level (e.g. 35).
- `Device.androidVersion(): String` -> Returns Android version string (e.g. "15").
- `Device.getTotalRam(): Long` -> Returns total RAM in bytes.
- `Device.getFreeRam(): Long` -> Returns available RAM in bytes.
- `Device.isTablet(): Boolean` -> Returns true if screen size is tablet.
- `Device.isEmulator(): Boolean` -> Returns true if running inside emulator.
- `Battery.getBatteryLevel(): Int` -> Returns battery level percentage (0 to 100%).
- `Battery.isCharging(): Boolean` -> Returns true if device is connected to charger.
- `Battery.getChargingType(): String` -> Returns "AC", "USB", "WIRELESS", or "NONE".
- `AppState.isAppInForeground(): Boolean` -> Returns true if app is currently visible.

### 💾 Data, Files & Cryptography (`import com.zaitxcode.android.io.File` & `Encryption`)
- `File.writeText(fileName: String, text: String)` -> Writes internal private text file.
- `File.readText(fileName: String): String?` -> Reads text from internal file.
- `File.delete(fileName: String): Boolean` -> Deletes internal file.
- `Encryption.sha256(text: String): String` -> Computes SHA-256 hash in hex.
- `Encryption.sha512(text: String): String` -> Computes SHA-512 hash in hex.
- `Encryption.md5(text: String): String` -> Computes MD5 hash in hex.
- `Encryption.aesEncrypt(text: String, key: String): String` -> AES encryption.
- `Encryption.aesDecrypt(encryptedText: String, key: String): String` -> AES decryption.
- `Encryption.base64Encode(text: String): String` -> Encodes text to Base64.
- `Encryption.base64Decode(text: String): String` -> Decodes Base64 string.

### 🔐 Security & Biometric (`import com.zaitxcode.android.hardware.Biometric` & `Signature`)
- `Biometric.canAuthenticate(): Boolean` -> Checks if biometric sensor (fingerprint/face) is available.
- `Biometric.authenticate(activity, title, subtitle, onSuccess, onError, onFailed)` -> Prompts biometric authentication dialog.
- `Signature.getAppPrimarySignatureSHA1(): String` -> Returns app signing certificate SHA-1 fingerprint.

---

## 3. Flutter Integration via MethodChannel

In Flutter (Dart), communicate with native Kotlin `com.zaitxcode.android.*` via `MethodChannel('androidhelper/core')`:

### Flutter Dart Usage Example:
```dart
import 'package:flutter/services.dart';

const _channel = MethodChannel('androidhelper/core');

// Check connectivity
final isOnline = await _channel.invokeMethod<bool>('isConnected');

// Copy text & vibrate
await _channel.invokeMethod('copyText', {'text': 'Hello Android Helper'});
await _channel.invokeMethod('vibrate', {'ms': 200});

// Biometric auth
final bioResult = await _channel.invokeMethod<String>('biometric');
```

---

Copyright (c) 2025–2027 Mohamed Zaitoon. All rights reserved.
