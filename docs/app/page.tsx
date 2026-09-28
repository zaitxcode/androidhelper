"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "ar";
type ThemeMode = "system" | "dark" | "light";

const translations = {
  en: {
    docTitle: "Android Helper Documentation",
    brandName: "Android Helper",
    searchPlaceholder: "Search documentation...",
    navOverview: "📌 Overview",
    navInstallation: "📦 Installation & Setup",
    navNetwork: "🌐 Network Helpers",
    navIntents: "🔗 External Intents",
    navClipboard: "📋 Clipboard & Screen",
    navNotifications: "🔔 Notifications & Keyboard",
    navDevice: "📱 Device & Battery Info",
    navAudio: "🔊 Audio & Display",
    navData: "💾 Data & Cryptography",
    navSecurity: "🔐 Security & Biometrics",
    secOverviewTitle: "Android Helper Documentation",
    pillAndroid: "Android 17 (API 37) Ready",
    pillCoroutines: "Kotlin Coroutines & DataStore",
    pillBridge: "Flutter MethodChannel Bridge",
    tabKotlin: "Kotlin Native",
    tabFlutter: "Flutter Bridge",
    secInstall: "📦 Installation & Setup",
    secInstallDesc: "Add the library dependency to your build file then initialize inside Application class.",
    flutterBridgeExplain: "🌉 How Flutter MethodChannel Bridge Works: Flutter communicates asynchronously with native Android Kotlin code via MethodChannel ('androidhelper/core'). Calling await _channel.invokeMethod<T>('methodName') invokes Android Helper helpers natively without UI blocking.",
    secNetwork: "🌐 Network Helpers",
    secNetworkDesc: "Check internet connectivity, validated connection, transport type, and IP address via Network module.",
    secIntents: "🔗 External Intents & Actions",
    secIntentsDesc: "Open URLs, WhatsApp chats, dialer, SMS, email, maps, app settings, and Play Store directly via Intent & Browser modules.",
    secClipboard: "📋 Clipboard, Vibration & Screen",
    secClipboardDesc: "Trigger physical vibration motor, clipboard read/write/clear, and screen capture block via Clipboard, Vibration & Screen modules.",
    secNotif: "🔔 Notifications & Keyboard",
    secNotifDesc: "Create notification channels, show custom notifications, cancel notifications, and hide/show soft keyboard via Notification & Keyboard modules.",
    secDevice: "📱 Device, Battery & App Info",
    secDeviceDesc: "Query device model, brand, SDK level, tablet/emulator state, battery status/health, and foreground application state via Device, Battery, AppInfo & AppState modules.",
    secAudio: "🔊 Audio & Display Helpers",
    secAudioDesc: "Play tactile system click sound, query audio ringer mode/volume, screen orientation & dimensions in DP via Audio & Display modules.",
    secData: "💾 Data, Storage & Crypto",
    secDataDesc: "File write/read/append/delete, storage space format, time formatting, email/phone/URL validation, SHA-256, SHA-512, HMAC, and Base64 encoding via File, Storage, Time, Validation & Encryption modules.",
    secSecurity: "🔐 Security, Biometric & Logger",
    secSecurityDesc: "Prompt biometric authentication, grant/check runtime permissions, extract app SHA-1 signature, and log diagnostics via Biometric, Permission, Signature & Logger modules.",
    aiPromptBoxTitle: "Ask AI Assistant about Android Helper Documentation:",
    btnOpenGpt: "ChatGPT",
    btnOpenClaude: "Claude",
    btnOpenPerplexity: "Perplexity",
    btnOpenGrok: "Grok",
    btnOpenDeepSeek: "DeepSeek",
    btnCopyAiPrompt: "Copy Prompt (Any AI)",
    footerText: "Android Helper Documentation © 2025-2027."
  },
  ar: {
    docTitle: "Android Helper Documentation - توثيق مكتبة Android Helper",
    brandName: "Android Helper",
    searchPlaceholder: "ابحث في التوثيق...",
    navOverview: "📌 النظرة العامة",
    navInstallation: "📦 التثبيت والإعداد",
    navNetwork: "🌐 الشبكة والاتصال",
    navIntents: "🔗 المقاصد والأفعال",
    navClipboard: "📋 الحافظة والاهتزاز والمنع",
    navNotifications: "🔔 الإشعارات ولوحة المفاتيح",
    navDevice: "📱 الجهاز والبطارية والتطبيق",
    navAudio: "🔊 الصوتيات وقياسات الشاشة",
    navData: "💾 البيانات والتخزين والتشفير",
    navSecurity: "🔐 الأمان والبصمة واللوجر",
    secOverviewTitle: "Android Helper Documentation",
    pillAndroid: "Android 17 (API 37) Ready",
    pillCoroutines: "Kotlin Coroutines & DataStore",
    pillBridge: "Flutter MethodChannel Bridge",
    tabKotlin: "كوتلن الأصلي (Kotlin)",
    tabFlutter: "فلاتر (Flutter)",
    secInstall: "📦 التثبيت والإعداد (Installation)",
    secInstallDesc: "أضف التبعية الخاصة بالمكتبة ثم قم بتهيئتها داخل Application class.",
    flutterBridgeExplain: "🌉 كيف يعمل جسر التواصل في فلاتر (MethodChannel Bridge)؟ يتصل تطبيق Flutter بكود أندرويد الكوتلن الأصلي لا تزامندياً عبر قناة تواصل موحدة ('androidhelper/core'). يرسل كود فلاتر الأمر عبر await _channel.invokeMethod<T>('methodName')، فيستقبل كلاس MainActivity.kt الأمر وينفذ دالة المكتبة المطلوبة دون إيقاف سلاسة الواجهة.",
    secNetwork: "🌐 الشبكة والاتصال (Network)",
    secNetworkDesc: "التحقق من حالة الاتصال بالإنترنت والاتصال المزدوج والإنترنت المؤكد وعنوان الـ IP عبر كلاس Network.",
    secIntents: "🔗 المقاصد والأفعال الخارجية (Intents)",
    secIntentsDesc: "فتح الروابط، محادثات الواتساب، الاتصال المباشر، إرسال البريد الإلكتروني، الخرائط، إعدادات التطبيق ومتجر بلاي فورياً عبر كلاسات Intent و Browser.",
    secClipboard: "📋 الحافظة والاهتزاز وحظر الشاشة",
    secClipboardDesc: "تشغيل الاهتزاز الفعلي، النسخ وقراءة مسح الحافظة، وحظر التقاط الشاشة عبر كلاسات Clipboard و Vibration و Screen.",
    secNotif: "🔔 الإشعارات ولوحة المفاتيح",
    secNotifDesc: "إنشاء وإلغاء قنوات الإشعارات وعرض إشعارات مخصصة، وإخفاء وإظهار لوحة المفاتيح عبر كلاسات Notification و Keyboard.",
    secDevice: "📱 معلومات الجهاز والبطارية والتطبيق",
    secDeviceDesc: "استعلام تفاصيل اسم وموديل الجهاز، مستوى وصحة البطارية، حالة التطبيق في الواجهة أو الخلفية والصلاحيات عبر كلاسات Device و Battery و AppInfo و AppState.",
    secAudio: "🔊 الصوتيات وقياسات الشاشة",
    secAudioDesc: "تشغيل صوت النقر للنظام، استعلام وضع الصوت ونسبة الارتفاع، اتجاه الشاشة وأبعادها بالـ dp عبر كلاسات Audio و Display.",
    secData: "💾 البيانات والتخزين والتشفير",
    secDataDesc: "قراءة وكتابة وإضافة وحذف الملفات، مساحة التخزين والمؤقت، صيغ الوقت، التحقق من الإيميل والهاتف والروابط، وتشفير SHA-256 و Base64 عبر كلاسات File و Storage و Time و Validation و Encryption.",
    secSecurity: "🔐 الأمان والبصمة واللوجر",
    secSecurityDesc: "مصادقة البصمة الفعالة، التحقق وطلب الصلاحيات، استخراج توقيع التطبيق الرقمي SHA-1 واللوجر عبر كلاسات Biometric و Permission و Signature و Android Helper.",
    aiPromptBoxTitle: "اسأل الذكاء الاصطناعي عن المكتبة:",
    btnOpenGpt: "ChatGPT",
    btnOpenClaude: "Claude",
    btnOpenPerplexity: "Perplexity",
    btnOpenGrok: "Grok",
    btnOpenDeepSeek: "DeepSeek",
    btnCopyAiPrompt: "نسخ الأمر لأي ذكاء اصطناعي آخر",
    footerText: "Android Helper Documentation © 2025-2027."
  }
};

const getAiPromptText = (lang: Lang) => {
  if (lang === "ar") {
    return "اقرأ من https://docs.zaitxcode.com/androidhelper/llms-full.txt حتى أتمكن من طرح أسئلة حوله.";
  }
  return "Read from https://docs.zaitxcode.com/androidhelper/llms-full.txt so I can ask questions about it.";
};

function KotlinIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
      alt="Kotlin"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

function FlutterIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
      alt="Flutter"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

function AndroidIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
      alt="Android"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

function GptIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/openai.png"
      alt="ChatGPT"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
    />
  );
}

function ClaudeIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/claude.png"
      alt="Claude"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
    />
  );
}

function PerplexityIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/perplexity.png"
      alt="Perplexity"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
    />
  );
}

function GrokIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/grok.png"
      alt="Grok"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
    />
  );
}

function DeepSeekIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/deepseek.png"
      alt="DeepSeek"
      width="18"
      height="18"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
    />
  );
}

function CodeLineRow({ rawCode, children }: { rawCode: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleLineCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-line-row">
      <span className="code-line-text">{children}</span>
      <button className="line-copy-btn" onClick={handleLineCopy} title="Copy single line">
        {copied ? "✓ Copied" : "Copy Line"}
      </button>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [activeTab, setActiveTab] = useState<"kotlin" | "flutter">("kotlin");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".code-block") && !target.closest(".selectable-text")) {
        e.preventDefault();
      }
    };
    document.addEventListener("selectstart", handleSelectStart);
    return () => document.removeEventListener("selectstart", handleSelectStart);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  useEffect(() => {
    let isDark = false;
    if (themeMode === "system") {
      isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDark = themeMode === "dark";
    }
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [themeMode]);

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAiProvider = (id: string, baseUrl: string) => {
    const promptText = getAiPromptText(lang);
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);

    const targetUrl = `${baseUrl}${encodeURIComponent(promptText)}`;
    window.open(targetUrl, "_blank");
  };

  const copyPromptForAnyAi = () => {
    const promptText = getAiPromptText(lang);
    navigator.clipboard.writeText(promptText);
    setCopiedId("ai-any");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cycleTheme = () => {
    if (themeMode === "system") setThemeMode("dark");
    else if (themeMode === "dark") setThemeMode("light");
    else setThemeMode("system");
  };

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="nav-left">
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>

          <a href="#" className="nav-brand">
            <img src="/logo.jpeg" alt="Android Helper Logo" height="28" style={{ borderRadius: "6px", objectFit: "cover" }} />
            <span>{t.brandName}</span>
            <span className="brand-badge">v1.0.0-alpha02</span>
          </a>
        </div>

        {/* Search Box */}
        <div className={`search-box ${mobileSearchOpen ? "mobile-open" : ""}`}>
          <span className="search-icon-inside"><i className="bi bi-search"></i></span>
          <input
            type="text"
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="nav-controls">
          {/* Mobile Search Lens Toggle Button */}
          <button className="mobile-search-toggle" onClick={() => setMobileSearchOpen(!mobileSearchOpen)} title="Search">
            <i className="bi bi-search"></i>
          </button>

          <a href="/ar/" className="btn-icon" title="عرض التوثيق باللغة العربية">
            <i className="bi bi-translate"></i> <span className="btn-label">عربي</span>
          </a>

          <button className="btn-icon" onClick={cycleTheme} title="Toggle Theme">
            <i className={themeMode === "dark" ? "bi bi-moon-stars-fill" : themeMode === "light" ? "bi bi-sun-fill" : "bi bi-gear-fill"}></i>
          </button>

          <a href="https://github.com/zaitxcode/androidhelper" target="_blank" className="btn-icon" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
            <span className="btn-label">GitHub</span>
          </a>
        </div>
      </header>

      {/* Layout */}
      <div className="layout">
        {/* Sidebar Navigation */}
        <aside className={`sidebar ${mobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-title">NAVIGATION</div>
          <ul className="sidebar-menu">
            <li><a href="#overview" className="sidebar-link active" onClick={() => setMobileMenuOpen(false)}>{t.navOverview}</a></li>
            <li><a href="#installation" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navInstallation}</a></li>
            <li><a href="#network" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navNetwork}</a></li>
            <li><a href="#intents" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navIntents}</a></li>
            <li><a href="#clipboard" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navClipboard}</a></li>
            <li><a href="#notifications" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navNotifications}</a></li>
            <li><a href="#device" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navDevice}</a></li>
            <li><a href="#audio" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navAudio}</a></li>
            <li><a href="#data" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navData}</a></li>
            <li><a href="#security" className="sidebar-link" onClick={() => setMobileMenuOpen(false)}>{t.navSecurity}</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="content">
          <section id="overview" className="hero">
            <h1 className="hero-title">{t.secOverviewTitle}</h1>

            {/* Badges Bar */}
            <div className="badge-bar">
              <a href="https://jitpack.io/#mohamed-zaitoon/androidhelper" target="_blank" rel="noreferrer">
                <img src="https://jitpack.io/v/mohamed-zaitoon/androidhelper.svg" alt="JitPack" />
              </a>
              <img src="https://img.shields.io/badge/AndroidX-Required-blue" alt="AndroidX" />
              <img src="https://img.shields.io/badge/Kotlin-First-purple" alt="Kotlin" />
              <img src="https://img.shields.io/badge/Platform-Android-green" alt="Platform" />
              <img src="https://img.shields.io/badge/Release-orange" alt="Release" />
            </div>

            <div className="feature-pills">
              <span className="pill"><AndroidIcon /> {t.pillAndroid}</span>
              <span className="pill"><KotlinIcon /> {t.pillCoroutines}</span>
              <span className="pill"><FlutterIcon /> {t.pillBridge}</span>
            </div>

            {/* AI Prompt Copy & Chat Bar */}
            <div className="ai-prompt-box">
              <div className="ai-prompt-title">
                <i className="bi bi-robot"></i> {t.aiPromptBoxTitle}
              </div>
              <div className="ai-btn-group">
                {/* ChatGPT - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-gpt", "https://chatgpt.com/?prompt=")}>
                  <GptIcon />
                  <span>{copiedId === "ai-gpt" ? "✓ Opening..." : t.btnOpenGpt}</span>
                </button>

                {/* Claude - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-claude", "https://claude.ai/new?q=")}>
                  <ClaudeIcon />
                  <span>{copiedId === "ai-claude" ? "✓ Opening..." : t.btnOpenClaude}</span>
                </button>

                {/* Perplexity - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-perpx", "https://www.perplexity.ai/?q=")}>
                  <PerplexityIcon />
                  <span>{copiedId === "ai-perpx" ? "✓ Opening..." : t.btnOpenPerplexity}</span>
                </button>

                {/* Grok - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-grok", "https://x.com/i/grok?text=")}>
                  <GrokIcon />
                  <span>{copiedId === "ai-grok" ? "✓ Opening..." : t.btnOpenGrok}</span>
                </button>

                {/* DeepSeek - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-deepseek", "https://chat.deepseek.com/")}>
                  <DeepSeekIcon />
                  <span>{copiedId === "ai-deepseek" ? "✓ Opening..." : t.btnOpenDeepSeek}</span>
                </button>

                {/* Copy Prompt for Any AI */}
                <button className="ai-btn" onClick={copyPromptForAnyAi}>
                  <i className="bi bi-clipboard-check"></i>
                  <span>{copiedId === "ai-any" ? "✓ Prompt Copied!" : t.btnCopyAiPrompt}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Language Tabs with External Devicon Icons */}
          <div className="tab-container">
            <button className={`tab-btn ${activeTab === "kotlin" ? "active" : ""}`} onClick={() => setActiveTab("kotlin")}>
              <KotlinIcon />
              <span>{t.tabKotlin}</span>
            </button>
            <button className={`tab-btn ${activeTab === "flutter" ? "active" : ""}`} onClick={() => setActiveTab("flutter")}>
              <FlutterIcon />
              <span>{t.tabFlutter}</span>
            </button>
          </div>

          {activeTab === "flutter" && (
            <div className="explain-box">
              {t.flutterBridgeExplain}
            </div>
          )}

          {/* Installation Section */}
          <section id="installation" className="section">
            <div className="section-header">{t.secInstall}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">📦 androidhelper setup & AppHelper.initialize(this)</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("install-kotlin", `// 1. Add in gradle/libs.versions.toml\n[versions]\nandroidhelper = "1.0.0-alpha02"\n\n[libraries]\nandroidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }\n\n// 2. Add in settings.gradle.kts\nrepositories {\n    google()\n    mavenCentral()\n    maven { url = uri("https://jitpack.io") }\n}\n\n// 3. Add in app/build.gradle.kts\ndependencies {\n    implementation(libs.androidhelper)\n}\n\n// 4. Initialize in Application class\nimport com.zaitxcode.android.core.AppHelper\n\nclass ExampleApplication : Application() {\n    override fun onCreate() {\n        super.onCreate()\n        AppHelper.initialize(this)\n    }\n}`)}>
                      {copiedId === "install-kotlin" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("install-flutter", `// 1. Add in gradle/libs.versions.toml\n[versions]\nandroidhelper = "1.0.0-alpha02"\n\n[libraries]\nandroidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }\n\n// 2. Add in android/settings.gradle.kts\nrepositories {\n    google()\n    mavenCentral()\n    maven { url = uri("https://jitpack.io") }\n}\n\n// 3. Add in android/app/build.gradle.kts\ndependencies {\n    implementation(libs.androidhelper)\n}\n\n// 4. Initialize in Flutter Android Application (MyApp.kt)\nimport com.zaitxcode.android.core.AppHelper\n\nclass MyApp : Application() {\n    override fun onCreate() {\n        super.onCreate()\n        AppHelper.initialize(this)\n    }\n}`)}>
                      {copiedId === "install-flutter" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secInstallDesc}</div>

              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block" id="code-install-kotlin">
                    <CodeLineRow rawCode='androidhelper = "1.0.0-alpha02"'>
                      <span className="keyword">[versions]</span>{"\n"}
                      androidhelper = <span className="string">&quot;1.0.0-alpha02&quot;</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='androidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }'>
                      <span className="keyword">[libraries]</span>{"\n"}
                      androidhelper = &#123; group = <span className="string">&quot;com.github.zaitxcode&quot;</span>, name = <span className="string">&quot;androidhelper&quot;</span>, version.ref = <span className="string">&quot;androidhelper&quot;</span> &#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='import com.zaitxcode.android.core.AppHelper'>
                      <span className="keyword">import</span> com.zaitxcode.android.Android Helper
                    </CodeLineRow>
                    <CodeLineRow rawCode='AppHelper.initialize(this)'>
                      <span className="type">Android Helper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>)
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block" id="code-install-flutter">
                    <CodeLineRow rawCode='androidhelper = "1.0.0-alpha02"'>
                      <span className="keyword">[versions]</span>{"\n"}
                      androidhelper = <span className="string">&quot;1.0.0-alpha02&quot;</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='import com.zaitxcode.android.core.AppHelper'>
                      <span className="keyword">import</span> com.zaitxcode.android.Android Helper
                    </CodeLineRow>
                    <CodeLineRow rawCode='AppHelper.initialize(this)'>
                      <span className="type">Android Helper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>)
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Network Section */}
          <section id="network" className="section">
            <div className="section-header">{t.secNetwork}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🌐 Network.isConnected, activeTransport, isWifiConnected & getIpAddress</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("net-k", `import com.zaitxcode.android.net.Network\n\nval isOnline: Boolean = Network.isConnected\nval isValidated: Boolean = Network.hasValidatedInternet()\nval isMetered: Boolean = Network.isConnectionMetered()\nval transport: String = Network.activeTransport()\nval isWifi: Boolean = Network.isWifiConnected()\nval isCellular: Boolean = Network.isCellularConnected()\nval ip: String? = Network.getIpAddress()`)}>
                      {copiedId === "net-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("net-f", `final isOnline = await _channel.invokeMethod<bool>('isConnected');\nfinal stateDetails = await _channel.invokeMethod<String>('networkState');\nfinal transport = await _channel.invokeMethod<String>('networkTransport');`)}>
                      {copiedId === "net-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secNetworkDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.net.Network">
                      <span className="keyword">import</span> com.zaitxcode.android.net.Network
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isOnline: Boolean = Network.isConnected">
                      <span className="keyword">val</span> isOnline: <span className="type">Boolean</span> = <span className="type">Network</span>.isConnected
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isValidated: Boolean = Network.hasValidatedInternet()">
                      <span className="keyword">val</span> isValidated: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">hasValidatedInternet</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isMetered: Boolean = Network.isConnectionMetered()">
                      <span className="keyword">val</span> isMetered: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">isConnectionMetered</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode='val transport: String = Network.activeTransport() // "WIFI", "CELLULAR", "VPN"'>
                      <span className="keyword">val</span> transport: <span className="type">String</span> = <span className="type">Network</span>.<span className="function">activeTransport</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isWifi: Boolean = Network.isWifiConnected()">
                      <span className="keyword">val</span> isWifi: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">isWifiConnected</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isCellular: Boolean = Network.isCellularConnected()">
                      <span className="keyword">val</span> isCellular: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">isCellularConnected</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val ipAddress: String? = Network.getIpAddress()">
                      <span className="keyword">val</span> ipAddress: <span className="type">String</span>? = <span className="type">Network</span>.<span className="function">getIpAddress</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="final isOnline = await _channel.invokeMethod<bool>('isConnected');">
                      <span className="keyword">final</span> isOnline = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">bool</span>&gt;(<span className="string">&apos;isConnected&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final stateDetails = await _channel.invokeMethod<String>('networkState');">
                      <span className="keyword">final</span> stateDetails = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;networkState&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final transport = await _channel.invokeMethod<String>('networkTransport');">
                      <span className="keyword">final</span> transport = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;networkTransport&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Intents Section */}
          <section id="intents" className="section">
            <div className="section-header">{t.secIntents}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔗 Intent.openWhatsApp, dial, sendSms, sendEmail, shareFile, openMap, Browser.openUrl</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("int-k", `import com.zaitxcode.android.content.Intent\nimport com.zaitxcode.android.browser.Browser\n\nBrowser.openUrl("https://docs.zaitxcode.com/androidhelper")\nIntent.openWhatsApp("201234567890", "Hello")\nIntent.dial("201234567890")\nIntent.sendSms("201234567890", "Test message")\nIntent.sendEmail("info@example.com", "Subject", "Body")\nIntent.shareText("Text to share")\nIntent.openMap(30.0444, 31.2357, "Cairo")\nIntent.openAppSettings()\nIntent.openPlayStore()`)}>
                      {copiedId === "int-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("int-f", `await _channel.invokeMethod('openUrl', {'url': 'https://docs.zaitxcode.com/androidhelper'});\nawait _channel.invokeMethod('openWhatsApp', {'text': 'Hello'});\nawait _channel.invokeMethod('dial');\nawait _channel.invokeMethod('sendSms', {'text': 'Hello SMS'});\nawait _channel.invokeMethod('sendEmail', {'text': 'Body'});\nawait _channel.invokeMethod('shareText', {'text': 'Shared text'});\nawait _channel.invokeMethod('openMap');\nawait _channel.invokeMethod('openAppSettings');\nawait _channel.invokeMethod('openPlayStore');`)}>
                      {copiedId === "int-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secIntentsDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.content.Intent">
                      <span className="keyword">import</span> com.zaitxcode.android.content.Intent
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.browser.Browser">
                      <span className="keyword">import</span> com.zaitxcode.android.browser.Browser
                    </CodeLineRow>
                    <CodeLineRow rawCode='Browser.openUrl("https://docs.zaitxcode.com/androidhelper")'>
                      <span className="type">Browser</span>.<span className="function">openUrl</span>(<span className="string">&quot;https://docs.zaitxcode.com/androidhelper&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.openWhatsApp("201234567890", "Hello")'>
                      <span className="type">Intent</span>.<span className="function">openWhatsApp</span>(<span className="string">&quot;201234567890&quot;</span>, <span className="string">&quot;Hello&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.dial("201234567890")'>
                      <span className="type">Intent</span>.<span className="function">dial</span>(<span className="string">&quot;201234567890&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.sendSms("201234567890", "Test message")'>
                      <span className="type">Intent</span>.<span className="function">sendSms</span>(<span className="string">&quot;201234567890&quot;</span>, <span className="string">&quot;Test message&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.sendEmail("info@example.com", "Subject", "Body")'>
                      <span className="type">Intent</span>.<span className="function">sendEmail</span>(<span className="string">&quot;info@example.com&quot;</span>, <span className="string">&quot;Subject&quot;</span>, <span className="string">&quot;Body&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.shareText("Text to share")'>
                      <span className="type">Intent</span>.<span className="function">shareText</span>(<span className="string">&quot;Text to share&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.openMap(30.0444, 31.2357, "Cairo")'>
                      <span className="type">Intent</span>.<span className="function">openMap</span>(<span className="number">30.0444</span>, <span className="number">31.2357</span>, <span className="string">&quot;Cairo&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode="Intent.openAppSettings()">
                      <span className="type">Intent</span>.<span className="function">openAppSettings</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Intent.openPlayStore()">
                      <span className="type">Intent</span>.<span className="function">openPlayStore</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="await _channel.invokeMethod('openUrl', {'url': 'https://docs.zaitxcode.com/androidhelper'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openUrl&apos;</span>, &#123;<span className="string">&apos;url&apos;</span>: <span className="string">&apos;https://docs.zaitxcode.com/androidhelper&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('openWhatsApp', {'text': 'Hello'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openWhatsApp&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Hello&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('dial');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;dial&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('sendSms', {'text': 'Hello SMS'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;sendSms&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Hello SMS&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('sendEmail', {'text': 'Body'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;sendEmail&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Body&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('shareText', {'text': 'Shared text'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;shareText&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Shared text&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('openMap');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openMap&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('openAppSettings');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openAppSettings&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('openPlayStore');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openPlayStore&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Audio & Display Section */}
          <section id="audio" className="section">
            <div className="section-header">{t.secAudio}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔊 Audio.playClickSound, isMuted, getMusicVolume & Display Metrics</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("aud-k", `import com.zaitxcode.android.hardware.Audio\nimport com.zaitxcode.android.hardware.Display\n\nAudio.playClickSound()\nval muted: Boolean = Audio.isMuted()\nval volume: Int = Audio.getMusicVolume()\nval isPortrait: Boolean = Display.isPortrait()\nval isLandscape: Boolean = Display.isLandscape()\nval widthDp: Int = Display.getScreenWidthDp()\nval heightDp: Int = Display.getScreenHeightDp()`)}>
                      {copiedId === "aud-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("aud-f", `final audioRes = await _channel.invokeMethod<String>('audioInfo');\nfinal displayRes = await _channel.invokeMethod<String>('displayInfo');`)}>
                      {copiedId === "aud-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secAudioDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.hardware.Audio">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Audio
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.hardware.Display">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Display
                    </CodeLineRow>
                    <CodeLineRow rawCode="Audio.playClickSound()">
                      <span className="type">Audio</span>.<span className="function">playClickSound</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val muted: Boolean = Audio.isMuted()">
                      <span className="keyword">val</span> muted: <span className="type">Boolean</span> = <span className="type">Audio</span>.<span className="function">isMuted</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val volumePercent: Int = Audio.getMusicVolume()">
                      <span className="keyword">val</span> volumePercent: <span className="type">Int</span> = <span className="type">Audio</span>.<span className="function">getMusicVolume</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isPortrait: Boolean = Display.isPortrait()">
                      <span className="keyword">val</span> isPortrait: <span className="type">Boolean</span> = <span className="type">Display</span>.<span className="function">isPortrait</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isLandscape: Boolean = Display.isLandscape()">
                      <span className="keyword">val</span> isLandscape: <span className="type">Boolean</span> = <span className="type">Display</span>.<span className="function">isLandscape</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val widthDp: Int = Display.getScreenWidthDp()">
                      <span className="keyword">val</span> widthDp: <span className="type">Int</span> = <span className="type">Display</span>.<span className="function">getScreenWidthDp</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val heightDp: Int = Display.getScreenHeightDp()">
                      <span className="keyword">val</span> heightDp: <span className="type">Int</span> = <span className="type">Display</span>.<span className="function">getScreenHeightDp</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="final audioRes = await _channel.invokeMethod<String>('audioInfo');">
                      <span className="keyword">final</span> audioRes = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;audioInfo&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final displayRes = await _channel.invokeMethod<String>('displayInfo');">
                      <span className="keyword">final</span> displayRes = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;displayInfo&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Clipboard & Vibration Section */}
          <section id="clipboard" className="section">
            <div className="section-header">{t.secClipboard}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">📋 Clipboard.copyText, getText, hasCopiedText & Vibration.vibrate & Screen.blockCapture</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("vib-k", `import com.zaitxcode.android.content.Clipboard\nimport com.zaitxcode.android.hardware.Vibration\nimport com.zaitxcode.android.view.Screen\n\nClipboard.copyText("Copied text")\nval text: String? = Clipboard.getText()\nval hasText: Boolean = Clipboard.hasCopiedText()\nClipboard.clear()\nVibration.vibrate(200)\nVibration.vibratePattern(longArrayOf(0, 100, 50, 200), -1)\nVibration.cancel()\nScreen.blockCapture()\nScreen.unblockCapture()\nval blocked: Boolean = Screen.isCaptureBlocked()`)}>
                      {copiedId === "vib-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("vib-f", `await _channel.invokeMethod('copyText', {'text': 'Copied'});\nfinal text = await _channel.invokeMethod<String>('getClipboard');\nawait _channel.invokeMethod('vibrate', {'ms': 200});\nawait _channel.invokeMethod('vibratePattern');\nfinal blocked = await _channel.invokeMethod<bool>('blockCapture');`)}>
                      {copiedId === "vib-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secClipboardDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='Clipboard.copyText("Copied text")'>
                      <span className="type">Clipboard</span>.<span className="function">copyText</span>(<span className="string">&quot;Copied text&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode="val text: String? = Clipboard.getText()">
                      <span className="keyword">val</span> text: <span className="type">String</span>? = <span className="type">Clipboard</span>.<span className="function">getText</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val hasText: Boolean = Clipboard.hasCopiedText()">
                      <span className="keyword">val</span> hasText: <span className="type">Boolean</span> = <span className="type">Clipboard</span>.<span className="function">hasCopiedText</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Clipboard.clear()">
                      <span className="type">Clipboard</span>.<span className="function">clear</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Vibration.vibrate(200)">
                      <span className="type">Vibration</span>.<span className="function">vibrate</span>(<span className="number">200</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode="Vibration.vibratePattern(longArrayOf(0, 100, 50, 200), -1)">
                      <span className="type">Vibration</span>.<span className="function">vibratePattern</span>(<span className="keyword">longArrayOf</span>(<span className="number">0</span>, <span className="number">100</span>, <span className="number">50</span>, <span className="number">200</span>), -<span className="number">1</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode="Vibration.cancel()">
                      <span className="type">Vibration</span>.<span className="function">cancel</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Screen.blockCapture()">
                      <span className="type">Screen</span>.<span className="function">blockCapture</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Screen.unblockCapture()">
                      <span className="type">Screen</span>.<span className="function">unblockCapture</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val blocked: Boolean = Screen.isCaptureBlocked()">
                      <span className="keyword">val</span> blocked: <span className="type">Boolean</span> = <span className="type">Screen</span>.<span className="function">isCaptureBlocked</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="await _channel.invokeMethod('copyText', {'text': 'Copied'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;copyText&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Copied&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final text = await _channel.invokeMethod<String>('getClipboard');">
                      <span className="keyword">final</span> text = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;getClipboard&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('vibrate', {'ms': 200});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;vibrate&apos;</span>, &#123;<span className="string">&apos;ms&apos;</span>: <span className="number">200</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final isBlocked = await _channel.invokeMethod<bool>('blockCapture');">
                      <span className="keyword">final</span> isBlocked = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">bool</span>&gt;(<span className="string">&apos;blockCapture&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Notifications & Keyboard Section */}
          <section id="notifications" className="section">
            <div className="section-header">{t.secNotif}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔔 Notification.showNotification, createChannel, cancelAll & Keyboard.hideKeyboard</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("not-k", `import com.zaitxcode.android.app.Notification\nimport com.zaitxcode.android.view.Keyboard\n\nNotification.createChannel("demo", "Demo Channel")\nNotification.showNotification(\n    channelId = "demo",\n    title = "Android Helper",\n    text = "Hello Notification",\n    iconResId = R.drawable.ic_launcher\n)\nNotification.cancelAll()\nval canPost: Boolean = Notification.canPostNotifications()\nKeyboard.hideKeyboard()\nKeyboard.showKeyboard(view)`)}>
                      {copiedId === "not-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("not-f", `await _channel.invokeMethod('showNotification', {'text': 'Flutter Notification'});\nawait _channel.invokeMethod('cancelNotifications');\nawait _channel.invokeMethod('hideKeyboard');`)}>
                      {copiedId === "not-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secNotifDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='Notification.createChannel("demo", "Demo Channel")'>
                      <span className="type">Notification</span>.<span className="function">createChannel</span>(<span className="string">&quot;demo&quot;</span>, <span className="string">&quot;Demo Channel&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Notification.showNotification("demo", "Android Helper", "Hello", R.drawable.ic_launcher)'>
                      <span className="type">Notification</span>.<span className="function">showNotification</span>(<span className="string">&quot;demo&quot;</span>, <span className="string">&quot;Android Helper&quot;</span>, <span className="string">&quot;Hello&quot;</span>, <span className="type">R</span>.drawable.ic_launcher)
                    </CodeLineRow>
                    <CodeLineRow rawCode="Notification.cancelAll()">
                      <span className="type">Notification</span>.<span className="function">cancelAll</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val canPost: Boolean = Notification.canPostNotifications()">
                      <span className="keyword">val</span> canPost: <span className="type">Boolean</span> = <span className="type">Notification</span>.<span className="function">canPostNotifications</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Keyboard.hideKeyboard()">
                      <span className="type">Keyboard</span>.<span className="function">hideKeyboard</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="await _channel.invokeMethod('showNotification', {'text': 'Flutter Notification'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;showNotification&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Flutter Notification&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('cancelNotifications');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;cancelNotifications&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('hideKeyboard');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;hideKeyboard&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Device & Battery Section */}
          <section id="device" className="section">
            <div className="section-header">{t.secDevice}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">📱 Device, Battery, AppInfo & AppState Metrics</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("dev-k", `import com.zaitxcode.android.hardware.Device\nimport com.zaitxcode.android.hardware.Battery\nimport com.zaitxcode.android.app.AppInfo\nimport com.zaitxcode.android.app.AppState\n\nval device: String = Device.deviceName()\nval brand: String = Device.brand()\nval model: String = Device.model()\nval sdk: Int = Device.sdk()\nval isTablet: Boolean = Device.isTablet()\nval isEmulator: Boolean = Device.isEmulator()\nval batteryLevel: Int = Battery.getBatteryLevel()\nval isCharging: Boolean = Battery.isCharging()\nval chargingType: String = Battery.getChargingType()\nval appName: String = AppInfo.appName()\nval packageName: String = AppInfo.packageName()\nval isForeground: Boolean = AppState.isAppInForeground()`)}>
                      {copiedId === "dev-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("dev-f", `final devInfo = await _channel.invokeMethod<String>('deviceInfo');\nfinal batInfo = await _channel.invokeMethod<String>('batteryInfo');\nfinal appInfo = await _channel.invokeMethod<String>('appInfo');\nfinal appState = await _channel.invokeMethod<String>('appState');`)}>
                      {copiedId === "dev-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secDeviceDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="val device: String = Device.deviceName()">
                      <span className="keyword">val</span> device: <span className="type">String</span> = <span className="type">Device</span>.<span className="function">deviceName</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val sdkLevel: Int = Device.sdk()">
                      <span className="keyword">val</span> sdkLevel: <span className="type">Int</span> = <span className="type">Device</span>.<span className="function">sdk</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isEmulator: Boolean = Device.isEmulator()">
                      <span className="keyword">val</span> isEmulator: <span className="type">Boolean</span> = <span className="type">Device</span>.<span className="function">isEmulator</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val batteryLevel: Int = Battery.getBatteryLevel()">
                      <span className="keyword">val</span> batteryLevel: <span className="type">Int</span> = <span className="type">Battery</span>.<span className="function">getBatteryLevel</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isCharging: Boolean = Battery.isCharging()">
                      <span className="keyword">val</span> isCharging: <span className="type">Boolean</span> = <span className="type">Battery</span>.<span className="function">isCharging</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val packageName: String = AppInfo.packageName()">
                      <span className="keyword">val</span> packageName: <span className="type">String</span> = <span className="type">AppInfo</span>.<span className="function">packageName</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isForeground: Boolean = AppState.isAppInForeground()">
                      <span className="keyword">val</span> isForeground: <span className="type">Boolean</span> = <span className="type">AppState</span>.<span className="function">isAppInForeground</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="final devInfo = await _channel.invokeMethod<String>('deviceInfo');">
                      <span className="keyword">final</span> devInfo = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;deviceInfo&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final batInfo = await _channel.invokeMethod<String>('batteryInfo');">
                      <span className="keyword">final</span> batInfo = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;batteryInfo&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final appInfo = await _channel.invokeMethod<String>('appInfo');">
                      <span className="keyword">final</span> appInfo = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;appInfo&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Data & Storage Section */}
          <section id="data" className="section">
            <div className="section-header">{t.secData}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">💾 File, Storage, Time, Validation & Encryption</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("dat-k", `import com.zaitxcode.android.io.File as AppFile\nimport com.zaitxcode.android.io.Storage\nimport com.zaitxcode.android.util.Time\nimport com.zaitxcode.android.util.Validation\nimport com.zaitxcode.android.security.Encryption\n\nAppFile.writeText("demo.txt", "content")\nval content: String? = AppFile.readText("demo.txt")\nAppFile.delete("demo.txt")\nval freeBytes: Long = Storage.getFreeInternalStorage()\nval freeFormatted: String = Storage.formatBytes(freeBytes)\nval formattedTime: String = Time.format(Time.now(), "yyyy-MM-dd HH:mm:ss")\nval isEmailValid: Boolean = Validation.isValidEmail("user@example.com")\nval hash: String = Encryption.sha256("password")\nval b64Encoded: String = Encryption.base64Encode("data")`)}>
                      {copiedId === "dat-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("dat-f", `await _channel.invokeMethod('writeFile', {'text': 'content'});\nfinal content = await _channel.invokeMethod<String>('readFile');\nfinal storage = await _channel.invokeMethod<String>('storage');\nfinal timeRes = await _channel.invokeMethod<String>('timeNow');\nfinal hash = await _channel.invokeMethod<String>('sha256', {'text': 'password'});`)}>
                      {copiedId === "dat-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secDataDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='AppFile.writeText("demo.txt", "content")'>
                      <span className="type">AppFile</span>.<span className="function">writeText</span>(<span className="string">&quot;demo.txt&quot;</span>, <span className="string">&quot;content&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='val content: String? = AppFile.readText("demo.txt")'>
                      <span className="keyword">val</span> content: <span className="type">String</span>? = <span className="type">AppFile</span>.<span className="function">readText</span>(<span className="string">&quot;demo.txt&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode="val freeBytes: Long = Storage.getFreeInternalStorage()">
                      <span className="keyword">val</span> freeBytes: <span className="type">Long</span> = <span className="type">Storage</span>.<span className="function">getFreeInternalStorage</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode='val formattedTime: String = Time.format(Time.now(), "yyyy-MM-dd HH:mm:ss")'>
                      <span className="keyword">val</span> formattedTime: <span className="type">String</span> = <span className="type">Time</span>.<span className="function">format</span>(<span className="type">Time</span>.<span className="function">now</span>(), <span className="string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='val isValidEmail: Boolean = Validation.isValidEmail("user@example.com")'>
                      <span className="keyword">val</span> isValidEmail: <span className="type">Boolean</span> = <span className="type">Validation</span>.<span className="function">isValidEmail</span>(<span className="string">&quot;user@example.com&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='val sha256Hash: String = Encryption.sha256("password")'>
                      <span className="keyword">val</span> sha256Hash: <span className="type">String</span> = <span className="type">Encryption</span>.<span className="function">sha256</span>(<span className="string">&quot;password&quot;</span>)
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="await _channel.invokeMethod('writeFile', {'text': 'content'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;writeFile&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;content&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final content = await _channel.invokeMethod<String>('readFile');">
                      <span className="keyword">final</span> content = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;readFile&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final hash = await _channel.invokeMethod<String>('sha256', {'text': 'password'});">
                      <span className="keyword">final</span> hash = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;sha256&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;password&apos;</span>&#125;);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="section">
            <div className="section-header">{t.secSecurity}</div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔐 Biometric.authenticate, Permission.isGranted, Signature & Logger</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("sec-k", `import com.zaitxcode.android.hardware.Biometric\nimport com.zaitxcode.android.app.Permission\nimport com.zaitxcode.android.app.Signature\nimport com.zaitxcode.android.core.AppHelper\n\nif (Biometric.canAuthenticate()) {\n    Biometric.authenticate(\n        activity = fragmentActivity,\n        title = "Biometric Auth",\n        onSuccess = { /* Handle success */ }\n    )\n}\nval isCameraGranted: Boolean = Permission.isGranted(android.Manifest.permission.CAMERA)\nval sha1Fingerprint: String = Signature.getAppPrimarySignatureSHA1()\nAndroid Helper.log("AppTag", "Log diagnostic message")`)}>
                      {copiedId === "sec-k" ? "✓ Copied All" : "Copy All"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("sec-f", `final result = await _channel.invokeMethod<String>('biometric');\nfinal sig = await _channel.invokeMethod<String>('signatures');\nawait _channel.invokeMethod('logger');`)}>
                      {copiedId === "sec-f" ? "✓ Copied All" : "Copy All"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secSecurityDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="val canBio: Boolean = Biometric.canAuthenticate()">
                      <span className="keyword">val</span> canBio: <span className="type">Boolean</span> = <span className="type">Biometric</span>.<span className="function">canAuthenticate</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode='Biometric.authenticate(activity = fragmentActivity, title = "Biometric Auth", onSuccess = {})'>
                      <span className="type">Biometric</span>.<span className="function">authenticate</span>(activity = fragmentActivity, title = <span className="string">&quot;Biometric Auth&quot;</span>, onSuccess = &#123;&#125;)
                    </CodeLineRow>
                    <CodeLineRow rawCode="val isCameraGranted: Boolean = Permission.isGranted(Manifest.permission.CAMERA)">
                      <span className="keyword">val</span> isCameraGranted: <span className="type">Boolean</span> = <span className="type">Permission</span>.<span className="function">isGranted</span>(<span className="type">Manifest</span>.permission.CAMERA)
                    </CodeLineRow>
                    <CodeLineRow rawCode="val sha1Fingerprint: String = Signature.getAppPrimarySignatureSHA1()">
                      <span className="keyword">val</span> sha1Fingerprint: <span className="type">String</span> = <span className="type">Signature</span>.<span className="function">getAppPrimarySignatureSHA1</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode='Android Helper.log("Tag", "Diagnostic info")'>
                      <span className="type">Android Helper</span>.<span className="function">log</span>(<span className="string">&quot;Tag&quot;</span>, <span className="string">&quot;Diagnostic info&quot;</span>)
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="final result = await _channel.invokeMethod<String>('biometric');">
                      <span className="keyword">final</span> result = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;biometric&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final sig = await _channel.invokeMethod<String>('signatures');">
                      <span className="keyword">final</span> sig = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;signatures&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('logger');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;logger&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer>
        <p>{t.footerText}</p>
      </footer>
    </div>
  );
}
