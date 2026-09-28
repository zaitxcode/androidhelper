[![](https://jitpack.io/v/mohamed-zaitoon/androidhelper.svg)](https://jitpack.io/#mohamed-zaitoon/androidhelper)
![AndroidX](https://img.shields.io/badge/AndroidX-Required-blue)
![Kotlin](https://img.shields.io/badge/Kotlin-First-purple)
![Platform](https://img.shields.io/badge/Platform-Android-green)
![Release](https://img.shields.io/badge/Release-orange)

# Android Helper (مكتبة أندرويد هيلبر)

> مكتبة أدوات وأدوات مساعدة خفيفة وموحدة لمشاريع أندرويد وفلاتر بداخل حزم برمجية نظيفة تحت `com.mohamedzaitoon.androidhelper.*`.

تجمع مكتبة **Android Helper** جميع المهام المكررة في تطوير أندرويد — مثل فحص الشبكة، الاهتزاز الفعلي، الصوتيات والشاشة، المصادقة بالبصمة، المقاصد الآمنة (Intents)، الحافظة، الإشعارات، إدارة الملفات، ومعلومات الجهاز والبطارية.

🌐 **الموقع والتوثيق التفاعلي:** [docs.zaitxcode.com/androidhelper](https://docs.zaitxcode.com/androidhelper)  
📖 **English Version:** [README.md](README.md)

---

## 📦 التثبيت والتهيئة

### 1. إضافة التبعية للمشروع

```kotlin
// إضافة الإصدار في gradle/libs.versions.toml
[versions]
androidHelper = "1.5.0-beta04"

[libraries]
android-helper = { group = "com.github.zaitxcode", name = "android-helper", version.ref = "androidHelper" }

// إضافة المستودع في settings.gradle.kts
repositories {
    google()
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}

// إضافة التبعية في app/build.gradle.kts
dependencies {
    implementation(libs.android.helper)
}
```

### 2. تهيئة المكتبة بداخل كلاس التطبيق (Application)

```kotlin
import android.app.Application
import com.mohamedzaitoon.androidhelper.Android Helper

class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Android Helper.initialize(this)
    }
}
```

---

## 🚀 أمثلة الاستخدام المباشر لقطاعات المكتبة

```kotlin
import com.mohamedzaitoon.androidhelper.net.Network
import com.mohamedzaitoon.androidhelper.hardware.Audio
import com.mohamedzaitoon.androidhelper.hardware.Vibration
import com.mohamedzaitoon.androidhelper.content.Clipboard
import com.mohamedzaitoon.androidhelper.hardware.Device
import com.mohamedzaitoon.androidhelper.hardware.Battery

// فحص الاتصال بالإنترنت
val isOnline = Network.isConnected
val transport = Network.activeTransport()

// الصوتيات والاهتزاز
Audio.playClickSound()
Vibration.vibrate(200)

// النسخ للحافظة
Clipboard.copyText("مرحباً بك مع Android Helper")

// معلومات الجهاز والبطارية
val device = Device.deviceName()
val battery = Battery.getBatteryLevel()
```

---

## 📄 حقوق النشر والترخيص

حقوق النشر © 2025–2027 محمد زيتون. جميع الحقوق محفوظة.
