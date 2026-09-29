export type CodeBlockData = {
  code: string;
  label?: string;
  isLicense?: boolean;
};

export type DocSection = {
  title: string;
  meta?: string;
  footerNote?: string;
  blocks: CodeBlockData[];
};

export const sections: DocSection[] = [
  {
    title: "Download & Setup (Gradle KTS & Groovy)",
    meta:
      "Add GitHub Packages repository and the Android Helper dependency.\nPackage: Public package - no token required for usage.",
    blocks: [
      {
        label: "Kotlin DSL (build.gradle.kts)",
        code: `// Add in gradle/libs.versions.toml
androidhelper = "1.4.0"
androidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }

// Add in settings.gradle.kts
repositories {
  google()
  mavenCentral()
  maven {
    maven { url = uri("https://jitpack.io") }
  }
}

dependencies {
  implementation(libs.androidhelper)
}
`
      }
    ]
  },
  {
    title: "Initialize Utils (Kotlin)",
    meta: "Call from Application.onCreate and register lifecycle callbacks.",
    blocks: [
      {
        code: `class MyApplication : Application() {

  override fun onCreate() {
    super.onCreate()
    Utils.initialize(this)
    registerActivityLifecycleCallbacks(Utils.activityTracker)
  }
}
`
      }
    ]
  },
  {
    title: "Connectivity (Kotlin)",
    blocks: [
      {
        code: `val connected = Utils.isConnected
Utils.addConnectionListener { isOnline ->
  Utils.showToast("Network changed: $isOnline")
}
`
      }
    ]
  },
  {
    title: "Clipboard (Kotlin)",
    blocks: [
      {
        code: `Utils.copyText("Copied text")
val copied = Utils.getCopiedText()
`
      }
    ]
  },
  {
    title: "Device Info (Kotlin)",
    blocks: [
      {
        code: `val model = Utils.getDeviceModel()
val version = Utils.getAndroidVersion()
`
      }
    ]
  },
  {
    title: "Permissions (Kotlin)",
    blocks: [
      {
        code: `Utils.requestPermission(this, Manifest.permission.CAMERA, 1001)
`
      }
    ]
  },
  {
    title: "Keyboard (Kotlin)",
    blocks: [
      {
        code: `// Hide keyboard (auto-detects Activity / Context)
Utils.hideKeyboard()

// Hide keyboard with Context
Utils.hideKeyboard(this)

// Hide keyboard from View
Utils.hideKeyboard(editText)

// Show keyboard for a View
Utils.showKeyboard(editText)

// Toggle keyboard state
Utils.toggleKeyboard()

// Check keyboard state
if (Utils.isKeyboardOpen(editText)) {
  Utils.hideKeyboard(editText)
}
`
      }
    ]
  },
  {
    title: "Sharing (Kotlin)",
    blocks: [
      {
        code: `Utils.shareText(this, "Hello from Utils!")
`
      }
    ]
  },
  {
    title: "Intent Utilities (Kotlin)",
    meta: "Common system intents like WhatsApp, dialer, email, and sharing.",
    blocks: [
      {
        code: `// Open WhatsApp chat
Utils.openWhatsApp("201234567890", "Hello!")

// Open phone dialer
Utils.dial("201234567890")

// Send email
Utils.sendEmail(
  email = "test@example.com",
  subject = "Hello",
  body = "Message body"
)

// Share text
Utils.shareText("Shared from Utils")
`
      }
    ]
  },
  {
    title: "Storage (Kotlin)",
    meta: "Internal storage and cache utilities.",
    blocks: [
      {
        code: `val free = Utils.getFreeStorage()
val total = Utils.getTotalStorage()

val cacheSize = Utils.getCacheSize()
Utils.clearCache()
`
      }
    ]
  },
  {
    title: "File Utilities (Kotlin)",
    meta: "Read and write text files in app internal storage.",
    blocks: [
      {
        code: `Utils.writeFile("test.txt", "Hello World")

val text = Utils.readFile("test.txt")

val exists = Utils.fileExists("test.txt")

Utils.deleteFile("test.txt")
`
      }
    ]
  },
  {
    title: "Encryption & Encoding (Kotlin)",
    meta: "Hashing and Base64 helpers.",
    blocks: [
      {
        code: `val hash = Utils.sha256("password123")

val encoded = Utils.base64Encode("Hello")
val decoded = Utils.base64Decode(encoded)
`
      }
    ]
  },
  {
    title: "App State (Kotlin)",
    meta: "Application and screen state helpers.",
    blocks: [
      {
        code: `val isForeground = Utils.isAppInForeground()
val isScreenOn = Utils.isScreenOn()
`
      }
    ]
  },
  {
    title: "Permission Helpers (Kotlin)",
    meta: "Check and request runtime permissions.",
    blocks: [
      {
        code: `if (!Utils.isPermissionGranted(Manifest.permission.CAMERA)) {
  Utils.requestPermission(
    this,
    Manifest.permission.CAMERA,
    1001
  )
}
`
      }
    ]
  },
  {
    title: "Vibration (Kotlin)",
    blocks: [
      {
        code: `Utils.vibrate(300)
Utils.vibratePattern(longArrayOf(0, 200, 100, 300), -1)
`
      }
    ]
  },
  {
    title: "Open URL (Kotlin)",
    blocks: [
      {
        code: `Utils.openUrl(this, "https://google.com")
`
      }
    ]
  },
  {
    title: "Screen Capture (Kotlin)",
    blocks: [
      {
        code: `Utils.blockCapture()
Utils.unblockCapture()
`
      }
    ]
  },
  {
    title: "Notification (Kotlin)",
    blocks: [
      {
        code: `val intent = Intent(this, ExampleActivity::class.java)
val pendingIntent = PendingIntent.getActivity(
  this,
  0,
  intent,
  PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
)

Utils.showNotification(
  channelId = "default_channel",
  title = "Hello",
  text = "This is a notification",
  iconResId = R.drawable.ic_launcher,
  intent = pendingIntent
)
`
      }
    ]
  },
  {
    title: "App Signature (Kotlin)",
    meta: "Retrieve and validate application signing certificates.",
    blocks: [
      {
        code: `val signatures = Utils.getAppSignatures()

val primarySha1 = Utils.getPrimarySignatureSHA1()

val valid = Utils.validateAppSignature("AA:BB:CC:DD")
`
      }
    ]
  },
  {
    title: "Logger (AlertDialog + Logcat)",
    meta:
      "Display logs as an AlertDialog for easy debugging, while still logging to Logcat.",
    footerNote:
      "* Logs are shown as a dialog only when an Activity is available.\n* Logs are always written to Logcat.",
    blocks: [
      {
        code: `// Normal log
Utils.log("Main", "App started successfully")

// Warning log
Utils.logWarning("Network", "Internet connection is slow")

// Error log
Utils.logError("API", "Request failed")

// Error log with Exception
try {
  riskyCall()
} catch (e: Exception) {
  Utils.logError("Crash", "Unexpected error", e)
}
`
      }
    ]
  },
  {
    title: "License",
    meta: "This license text is now copyable via the button.",
    blocks: [
      {
        code: `Copyright (c) 2025 Mohamed Zaitoon
`,
        isLicense: true
      }
    ]
  }
];
