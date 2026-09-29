"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/use-theme";
import { useReveal } from "@/components/use-reveal";

const t = {
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
  tabKotlin: "كوتلن (Kotlin)",
  tabJava: "جافا (Java)",
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
};

const getAiPromptText = () => {
  return "اقرأ من https://docs.zaitxcode.com/androidhelper/llms-full.txt حتى أتمكن من طرح أسئلة حوله.";
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

function JavaIcon() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
      alt="Java"
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
    <span style={{ display: "inline-flex", flexShrink: 0 }}>
      <img
        className="icon-dark"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/openai.png"
        alt="ChatGPT"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
      />
      <img
        className="icon-light"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/light/openai.png"
        alt="ChatGPT"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "none", verticalAlign: "middle", borderRadius: "3px" }}
      />
    </span>
  );
}

function ClaudeIcon() {
  return (
    <span style={{ display: "inline-flex", flexShrink: 0 }}>
      <img
        className="icon-dark"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/claude.png"
        alt="Claude"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
      />
      <img
        className="icon-light"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/light/claude.png"
        alt="Claude"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "none", verticalAlign: "middle", borderRadius: "3px" }}
      />
    </span>
  );
}

function PerplexityIcon() {
  return (
    <span style={{ display: "inline-flex", flexShrink: 0 }}>
      <img
        className="icon-dark"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/perplexity.png"
        alt="Perplexity"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
      />
      <img
        className="icon-light"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/light/perplexity.png"
        alt="Perplexity"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "none", verticalAlign: "middle", borderRadius: "3px" }}
      />
    </span>
  );
}

function GrokIcon() {
  return (
    <span style={{ display: "inline-flex", flexShrink: 0 }}>
      <img
        className="icon-dark"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/grok.png"
        alt="Grok"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
      />
      <img
        className="icon-light"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/light/grok.png"
        alt="Grok"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "none", verticalAlign: "middle", borderRadius: "3px" }}
      />
    </span>
  );
}

function DeepSeekIcon() {
  return (
    <span style={{ display: "inline-flex", flexShrink: 0 }}>
      <img
        className="icon-dark"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/dark/deepseek.png"
        alt="DeepSeek"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", borderRadius: "3px" }}
      />
      <img
        className="icon-light"
        src="https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/light/deepseek.png"
        alt="DeepSeek"
        width="18"
        height="18"
        style={{ flexShrink: 0, display: "none", verticalAlign: "middle", borderRadius: "3px" }}
      />
    </span>
  );
}

function CodeLineRow({ id, rawCode, children }: { id: string; rawCode: string; children: React.ReactNode }) {
  return (
    <div className="code-line-row">
      <span className="code-line-text">{children}</span>
      <button
        className="code-line-copy-btn"
        onClick={() => {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rawCode).catch(() => {});
          }
        }}
        aria-label="Copy line"
        title="Copy this line"
      >
        <i className="bi bi-clipboard"></i>
      </button>
    </div>
  );
}

export default function ArabicPage() {
  const [activeTab, setActiveTab] = useState<"kotlin" | "java" | "flutter">("kotlin");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const { theme, toggleTheme } = useTheme();
  useReveal();

  useEffect(() => {
    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const safeCopyText = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = (id: string, codeText: string) => {
    safeCopyText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAiProvider = (id: string, baseUrl: string) => {
    const promptText = getAiPromptText();
    safeCopyText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);

    const targetUrl = `${baseUrl}${encodeURIComponent(promptText)}`;
    window.open(targetUrl, "_blank");
  };

  const copyPromptForAnyAi = () => {
    const promptText = getAiPromptText();
    safeCopyText(promptText);
    setCopiedId("ai-any");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="nav-left">
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>

          <a href="/androidhelper/ar/" className="nav-brand">
            <img src="/logo.jpeg" alt="Android Helper Logo" height="28" style={{ borderRadius: "6px", objectFit: "cover" }} />
            <span>{t.brandName}</span>
            <span className="brand-badge">v1.0.0-beta01</span>
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
          <button className="mobile-search-toggle" onClick={() => setMobileSearchOpen(!mobileSearchOpen)} title="البحث">
            <i className="bi bi-search"></i>
          </button>

          {/* Switch to English (Primary domain /) */}
          <a href="/androidhelper/" className="btn-icon" title="Switch to English">
            <i className="bi bi-translate"></i> <span className="btn-label">English</span>
          </a>

          <button
            className="btn-icon"
            onClick={toggleTheme}
            title={theme === "dark" ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
            aria-label={theme === "dark" ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
          >
            <i className={theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"}></i>
          </button>

          <a href="https://github.com/zaitxcode/androidhelper" target="_blank" className="btn-icon" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
            <span className="btn-label">GitHub</span>
          </a>
        </div>
      </header>

      {/* Layout */}
      <div className="layout">
        <div className={`sidebar-overlay ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(false)}></div>
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
          <section id="overview" className="hero" data-reveal>
            <h1 className="hero-title">{t.secOverviewTitle}</h1>

            {/* Badges Bar */}
            <div className="badge-bar">
              <a href="https://jitpack.io/#zaitxcode/androidhelper" target="_blank" rel="noreferrer">
                <img src="https://jitpack.io/v/zaitxcode/androidhelper.svg" alt="JitPack" />
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
                  <span>{copiedId === "ai-gpt" ? "✓ جاري الفتح..." : t.btnOpenGpt}</span>
                </button>

                {/* Claude - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-claude", "https://claude.ai/new?q=")}>
                  <ClaudeIcon />
                  <span>{copiedId === "ai-claude" ? "✓ جاري الفتح..." : t.btnOpenClaude}</span>
                </button>

                {/* Perplexity - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-perpx", "https://www.perplexity.ai/?q=")}>
                  <PerplexityIcon />
                  <span>{copiedId === "ai-perpx" ? "✓ جاري الفتح..." : t.btnOpenPerplexity}</span>
                </button>

                {/* Grok - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-grok", "https://x.com/i/grok?text=")}>
                  <GrokIcon />
                  <span>{copiedId === "ai-grok" ? "✓ جاري الفتح..." : t.btnOpenGrok}</span>
                </button>

                {/* DeepSeek - LobeHub Icon */}
                <button className="ai-btn" onClick={() => openAiProvider("ai-deepseek", "https://chat.deepseek.com/")}>
                  <DeepSeekIcon />
                  <span>{copiedId === "ai-deepseek" ? "✓ جاري الفتح..." : t.btnOpenDeepSeek}</span>
                </button>

                {/* Copy Prompt for Any AI */}
                <button className="ai-btn" onClick={copyPromptForAnyAi}>
                  <i className="bi bi-clipboard-check"></i>
                  <span>{copiedId === "ai-any" ? "✓ تم نسخ الأمر!" : t.btnCopyAiPrompt}</span>
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
            <button className={`tab-btn ${activeTab === "java" ? "active" : ""}`} onClick={() => setActiveTab("java")}>
              <JavaIcon />
              <span>{t.tabJava}</span>
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">📦 androidhelper setup & AppHelper.initialize(this)</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("install-kotlin", `// 1. Add in gradle/libs.versions.toml\n[versions]\nandroidhelper = "1.0.0-beta01"\n\n[libraries]\nandroidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }\n\n// 2. Add in settings.gradle.kts\nrepositories {\n    google()\n    mavenCentral()\n    maven { url = uri("https://jitpack.io") }\n}\n\n// 3. Add in app/build.gradle.kts\ndependencies {\n    implementation(libs.androidhelper)\n}\n\n// 4. Initialize in Application class\nimport com.zaitxcode.android.core.AppHelper\n\nclass ExampleApplication : Application() {\n    override fun onCreate() {\n        super.onCreate()\n        AppHelper.initialize(this)\n    }\n}`)}>
                      {copiedId === "install-kotlin" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("install-java", `// 1. Add in gradle/libs.versions.toml\n[versions]\nandroidhelper = "1.0.0-beta01"\n\n[libraries]\nandroidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }\n\n// 2. Add in settings.gradle.kts\nrepositories {\n    google()\n    mavenCentral()\n    maven { url = uri("https://jitpack.io") }\n}\n\n// 3. Add in app/build.gradle\ndependencies {\n    implementation libs.androidhelper\n}\n\n// 4. Initialize in Application class (Java)\nimport com.zaitxcode.android.core.AppHelper;\n\npublic class ExampleApplication extends Application {\n    @Override\n    public void onCreate() {\n        super.onCreate();\n        AppHelper.initialize(this);\n    }\n}`)}>
                      {copiedId === "install-java" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("install-flutter", `// 1. Add in gradle/libs.versions.toml\n[versions]\nandroidhelper = "1.0.0-beta01"\n\n[libraries]\nandroidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }\n\n// 2. Add in android/settings.gradle.kts\nrepositories {\n    google()\n    mavenCentral()\n    maven { url = uri("https://jitpack.io") }\n}\n\n// 3. Add in android/app/build.gradle.kts\ndependencies {\n    implementation(libs.androidhelper)\n}\n\n// 4. Initialize in Flutter Android Application (MyApp.kt)\nimport com.zaitxcode.android.core.AppHelper\n\nclass MyApp : Application() {\n    override fun onCreate() {\n        super.onCreate()\n        AppHelper.initialize(this)\n    }\n}`)}>
                      {copiedId === "install-flutter" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secInstallDesc}</div>

              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block" id="code-install-kotlin">
                    <CodeLineRow id="line-1" rawCode='androidhelper = "1.0.0-beta01"'>
                      <span className="keyword">[versions]</span>{"\n"}
                      androidhelper = <span className="string">&quot;1.0.0-beta01&quot;</span>
                    </CodeLineRow>
                    <CodeLineRow id="line-2" rawCode='androidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }'>
                      <span className="keyword">[libraries]</span>{"\n"}
                      androidhelper = &#123; group = <span className="string">&quot;com.github.zaitxcode&quot;</span>, name = <span className="string">&quot;androidhelper&quot;</span>, version.ref = <span className="string">&quot;androidhelper&quot;</span> &#125;
                    </CodeLineRow>
                    <CodeLineRow id="line-3" rawCode='import com.zaitxcode.android.core.AppHelper'>
                      <span className="keyword">import</span> com.zaitxcode.android.core.AppHelper
                    </CodeLineRow>
                    <CodeLineRow id="line-4" rawCode='AppHelper.initialize(this)'>
                      <span className="type">AppHelper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>)
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block" id="code-install-java">
                    <CodeLineRow id="line-5" rawCode='androidhelper = "1.0.0-beta01"'>
                      <span className="keyword">[versions]</span>{"\n"}
                      androidhelper = <span className="string">&quot;1.0.0-beta01&quot;</span>
                    </CodeLineRow>
                    <CodeLineRow id="line-6" rawCode='import com.zaitxcode.android.core.AppHelper;'>
                      <span className="keyword">import</span> com.zaitxcode.android.core.AppHelper;
                    </CodeLineRow>
                    <CodeLineRow id="line-7" rawCode='AppHelper.initialize(this);'>
                      <span className="type">AppHelper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>);
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block" id="code-install-flutter">
                    <CodeLineRow id="line-8" rawCode='androidhelper = "1.0.0-beta01"'>
                      <span className="keyword">[versions]</span>{"\n"}
                      androidhelper = <span className="string">&quot;1.0.0-beta01&quot;</span>
                    </CodeLineRow>
                    <CodeLineRow id="line-9" rawCode='import com.zaitxcode.android.core.AppHelper'>
                      <span className="keyword">import</span> com.zaitxcode.android.core.AppHelper
                    </CodeLineRow>
                    <CodeLineRow id="line-10" rawCode='AppHelper.initialize(this)'>
                      <span className="type">AppHelper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>)
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Network Section */}
          <section id="network" className="section">
            <div className="section-header">{t.secNetwork}</div>
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🌐 Network.isConnected, activeTransport, isWifiConnected & getIpAddress</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("net-k", `import com.zaitxcode.android.net.Network\n\nval isOnline: Boolean = Network.isConnected\nval isValidated: Boolean = Network.hasValidatedInternet()\nval isMetered: Boolean = Network.isConnectionMetered()\nval transport: String = Network.activeTransport()\nval isWifi: Boolean = Network.isWifiConnected()\nval isCellular: Boolean = Network.isCellularConnected()\nval ip: String? = Network.getIpAddress()`)}>
                      {copiedId === "net-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("net-j", `import com.zaitxcode.android.net.Network;\n\nboolean isOnline = Network.isConnected();\nboolean isValidated = Network.hasValidatedInternet();\nboolean isMetered = Network.isConnectionMetered();\nString transport = Network.activeTransport();\nboolean isWifi = Network.isWifiConnected();\nboolean isCellular = Network.isCellularConnected();\nString ip = Network.getIpAddress();`)}>
                      {copiedId === "net-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("net-f", `final isOnline = await _channel.invokeMethod<bool>('isConnected');\nfinal stateDetails = await _channel.invokeMethod<String>('networkState');\nfinal transport = await _channel.invokeMethod<String>('networkTransport');`)}>
                      {copiedId === "net-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secNetworkDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-8" rawCode="import com.zaitxcode.android.net.Network">
                      <span className="keyword">import</span> com.zaitxcode.android.net.Network
                    </CodeLineRow>
                    <CodeLineRow id="line-9" rawCode="val isOnline: Boolean = Network.isConnected">
                      <span className="keyword">val</span> isOnline: <span className="type">Boolean</span> = <span className="type">Network</span>.isConnected
                    </CodeLineRow>
                    <CodeLineRow id="line-10" rawCode="val isValidated: Boolean = Network.hasValidatedInternet()">
                      <span className="keyword">val</span> isValidated: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">hasValidatedInternet</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-11" rawCode="val isMetered: Boolean = Network.isConnectionMetered()">
                      <span className="keyword">val</span> isMetered: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">isConnectionMetered</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-12" rawCode='val transport: String = Network.activeTransport() // "WIFI", "CELLULAR", "VPN"'>
                      <span className="keyword">val</span> transport: <span className="type">String</span> = <span className="type">Network</span>.<span className="function">activeTransport</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-13" rawCode="val isWifi: Boolean = Network.isWifiConnected()">
                      <span className="keyword">val</span> isWifi: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">isWifiConnected</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-14" rawCode="val isCellular: Boolean = Network.isCellularConnected()">
                      <span className="keyword">val</span> isCellular: <span className="type">Boolean</span> = <span className="type">Network</span>.<span className="function">isCellularConnected</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-15" rawCode="val ipAddress: String? = Network.getIpAddress()">
                      <span className="keyword">val</span> ipAddress: <span className="type">String</span>? = <span className="type">Network</span>.<span className="function">getIpAddress</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-netj-1" rawCode="import com.zaitxcode.android.net.Network;">
                      <span className="keyword">import</span> com.zaitxcode.android.net.Network;
                    </CodeLineRow>
                    <CodeLineRow id="line-netj-2" rawCode="boolean isOnline = Network.isConnected();">
                      <span className="type">boolean</span> isOnline = <span className="type">Network</span>.<span className="function">isConnected</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-netj-3" rawCode="boolean isValidated = Network.hasValidatedInternet();">
                      <span className="type">boolean</span> isValidated = <span className="type">Network</span>.<span className="function">hasValidatedInternet</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-netj-4" rawCode="String transport = Network.activeTransport();">
                      <span className="type">String</span> transport = <span className="type">Network</span>.<span className="function">activeTransport</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-netj-5" rawCode="boolean isWifi = Network.isWifiConnected();">
                      <span className="type">boolean</span> isWifi = <span className="type">Network</span>.<span className="function">isWifiConnected</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-netj-6" rawCode="String ipAddress = Network.getIpAddress();">
                      <span className="type">String</span> ipAddress = <span className="type">Network</span>.<span className="function">getIpAddress</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-16" rawCode="final isOnline = await _channel.invokeMethod<bool>('isConnected');">
                      <span className="keyword">final</span> isOnline = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">bool</span>&gt;(<span className="string">&apos;isConnected&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-17" rawCode="final stateDetails = await _channel.invokeMethod<String>('networkState');">
                      <span className="keyword">final</span> stateDetails = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;networkState&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-18" rawCode="final transport = await _channel.invokeMethod<String>('networkTransport');">
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔗 Intent.openWhatsApp, dial, sendSms, sendEmail, shareFile, openMap, Browser.openUrl</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("int-k", `import com.zaitxcode.android.content.Intent\nimport com.zaitxcode.android.browser.Browser\n\nBrowser.openUrl("https://docs.zaitxcode.com/androidhelper")\nIntent.openWhatsApp("201234567890", "Hello")\nIntent.dial("201234567890")\nIntent.sendSms("201234567890", "Test message")\nIntent.sendEmail("info@example.com", "Subject", "Body")\nIntent.shareText("Text to share")\nIntent.openMap(30.0444, 31.2357, "Cairo")\nIntent.openAppSettings()\nIntent.openPlayStore()`)}>
                      {copiedId === "int-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("int-j", `import com.zaitxcode.android.content.Intent;\nimport com.zaitxcode.android.browser.Browser;\n\nBrowser.openUrl("https://docs.zaitxcode.com/androidhelper");\nIntent.openWhatsApp("201234567890", "Hello");\nIntent.dial("201234567890");\nIntent.sendSms("201234567890", "Test message");\nIntent.sendEmail("info@example.com", "Subject", "Body");\nIntent.shareText("Text to share");\nIntent.openMap(30.0444, 31.2357, "Cairo");\nIntent.openAppSettings();\nIntent.openPlayStore();`)}>
                      {copiedId === "int-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("int-f", `await _channel.invokeMethod('openUrl', {'url': 'https://docs.zaitxcode.com/androidhelper'});\nawait _channel.invokeMethod('openWhatsApp', {'text': 'Hello'});\nawait _channel.invokeMethod('dial');\nawait _channel.invokeMethod('sendSms', {'text': 'Hello SMS'});\nawait _channel.invokeMethod('sendEmail', {'text': 'Body'});\nawait _channel.invokeMethod('shareText', {'text': 'Shared text'});\nawait _channel.invokeMethod('openMap');\nawait _channel.invokeMethod('openAppSettings');\nawait _channel.invokeMethod('openPlayStore');`)}>
                      {copiedId === "int-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secIntentsDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-19" rawCode="import com.zaitxcode.android.content.Intent">
                      <span className="keyword">import</span> com.zaitxcode.android.content.Intent
                    </CodeLineRow>
                    <CodeLineRow id="line-20" rawCode="import com.zaitxcode.android.browser.Browser">
                      <span className="keyword">import</span> com.zaitxcode.android.browser.Browser
                    </CodeLineRow>
                    <CodeLineRow id="line-21" rawCode='Browser.openUrl("https://docs.zaitxcode.com/androidhelper")'>
                      <span className="type">Browser</span>.<span className="function">openUrl</span>(<span className="string">&quot;https://docs.zaitxcode.com/androidhelper&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-22" rawCode='Intent.openWhatsApp("201234567890", "Hello")'>
                      <span className="type">Intent</span>.<span className="function">openWhatsApp</span>(<span className="string">&quot;201234567890&quot;</span>, <span className="string">&quot;Hello&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-23" rawCode='Intent.dial("201234567890")'>
                      <span className="type">Intent</span>.<span className="function">dial</span>(<span className="string">&quot;201234567890&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-24" rawCode='Intent.sendSms("201234567890", "Test message")'>
                      <span className="type">Intent</span>.<span className="function">sendSms</span>(<span className="string">&quot;201234567890&quot;</span>, <span className="string">&quot;Test message&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-25" rawCode='Intent.sendEmail("info@example.com", "Subject", "Body")'>
                      <span className="type">Intent</span>.<span className="function">sendEmail</span>(<span className="string">&quot;info@example.com&quot;</span>, <span className="string">&quot;Subject&quot;</span>, <span className="string">&quot;Body&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-26" rawCode='Intent.shareText("Text to share")'>
                      <span className="type">Intent</span>.<span className="function">shareText</span>(<span className="string">&quot;Text to share&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-27" rawCode='Intent.openMap(30.0444, 31.2357, "Cairo")'>
                      <span className="type">Intent</span>.<span className="function">openMap</span>(<span className="number">30.0444</span>, <span className="number">31.2357</span>, <span className="string">&quot;Cairo&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-28" rawCode="Intent.openAppSettings()">
                      <span className="type">Intent</span>.<span className="function">openAppSettings</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-29" rawCode="Intent.openPlayStore()">
                      <span className="type">Intent</span>.<span className="function">openPlayStore</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-intj-1" rawCode="import com.zaitxcode.android.content.Intent;">
                      <span className="keyword">import</span> com.zaitxcode.android.content.Intent;
                    </CodeLineRow>
                    <CodeLineRow id="line-intj-2" rawCode='Browser.openUrl("https://docs.zaitxcode.com/androidhelper");'>
                      <span className="type">Browser</span>.<span className="function">openUrl</span>(<span className="string">&quot;https://docs.zaitxcode.com/androidhelper&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-intj-3" rawCode='Intent.openWhatsApp("201234567890", "Hello");'>
                      <span className="type">Intent</span>.<span className="function">openWhatsApp</span>(<span className="string">&quot;201234567890&quot;</span>, <span className="string">&quot;Hello&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-intj-4" rawCode='Intent.dial("201234567890");'>
                      <span className="type">Intent</span>.<span className="function">dial</span>(<span className="string">&quot;201234567890&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-intj-5" rawCode='Intent.sendEmail("info@example.com", "Subject", "Body");'>
                      <span className="type">Intent</span>.<span className="function">sendEmail</span>(<span className="string">&quot;info@example.com&quot;</span>, <span className="string">&quot;Subject&quot;</span>, <span className="string">&quot;Body&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-intj-6" rawCode='Intent.openMap(30.0444, 31.2357, "Cairo");'>
                      <span className="type">Intent</span>.<span className="function">openMap</span>(<span className="number">30.0444</span>, <span className="number">31.2357</span>, <span className="string">&quot;Cairo&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-intj-7" rawCode="Intent.openAppSettings();">
                      <span className="type">Intent</span>.<span className="function">openAppSettings</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-30" rawCode="await _channel.invokeMethod('openUrl', {'url': 'https://docs.zaitxcode.com/androidhelper'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openUrl&apos;</span>, &#123;<span className="string">&apos;url&apos;</span>: <span className="string">&apos;https://docs.zaitxcode.com/androidhelper&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-31" rawCode="await _channel.invokeMethod('openWhatsApp', {'text': 'Hello'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openWhatsApp&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Hello&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-32" rawCode="await _channel.invokeMethod('dial');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;dial&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-33" rawCode="await _channel.invokeMethod('sendSms', {'text': 'Hello SMS'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;sendSms&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Hello SMS&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-34" rawCode="await _channel.invokeMethod('sendEmail', {'text': 'Body'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;sendEmail&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Body&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-35" rawCode="await _channel.invokeMethod('shareText', {'text': 'Shared text'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;shareText&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Shared text&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-36" rawCode="await _channel.invokeMethod('openMap');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openMap&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-37" rawCode="await _channel.invokeMethod('openAppSettings');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openAppSettings&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-38" rawCode="await _channel.invokeMethod('openPlayStore');">
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔊 Audio.playClickSound, isMuted, getMusicVolume & Display Metrics</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("aud-k", `import com.zaitxcode.android.hardware.Audio\nimport com.zaitxcode.android.hardware.Display\n\nAudio.playClickSound()\nval muted: Boolean = Audio.isMuted()\nval volume: Int = Audio.getMusicVolume()\nval isPortrait: Boolean = Display.isPortrait()\nval isLandscape: Boolean = Display.isLandscape()\nval widthDp: Int = Display.getScreenWidthDp()\nval heightDp: Int = Display.getScreenHeightDp()`)}>
                      {copiedId === "aud-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("aud-j", `import com.zaitxcode.android.hardware.Audio;\nimport com.zaitxcode.android.hardware.Display;\n\nAudio.playClickSound();\nboolean muted = Audio.isMuted();\nint volume = Audio.getMusicVolume();\nboolean isPortrait = Display.isPortrait();\nboolean isLandscape = Display.isLandscape();\nint widthDp = Display.getScreenWidthDp();\nint heightDp = Display.getScreenHeightDp();`)}>
                      {copiedId === "aud-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("aud-f", `final audioRes = await _channel.invokeMethod<String>('audioInfo');\nfinal displayRes = await _channel.invokeMethod<String>('displayInfo');`)}>
                      {copiedId === "aud-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secAudioDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-39" rawCode="import com.zaitxcode.android.hardware.Audio">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Audio
                    </CodeLineRow>
                    <CodeLineRow id="line-40" rawCode="import com.zaitxcode.android.hardware.Display">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Display
                    </CodeLineRow>
                    <CodeLineRow id="line-41" rawCode="Audio.playClickSound()">
                      <span className="type">Audio</span>.<span className="function">playClickSound</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-42" rawCode="val muted: Boolean = Audio.isMuted()">
                      <span className="keyword">val</span> muted: <span className="type">Boolean</span> = <span className="type">Audio</span>.<span className="function">isMuted</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-43" rawCode="val volumePercent: Int = Audio.getMusicVolume()">
                      <span className="keyword">val</span> volumePercent: <span className="type">Int</span> = <span className="type">Audio</span>.<span className="function">getMusicVolume</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-44" rawCode="val isPortrait: Boolean = Display.isPortrait()">
                      <span className="keyword">val</span> isPortrait: <span className="type">Boolean</span> = <span className="type">Display</span>.<span className="function">isPortrait</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-45" rawCode="val isLandscape: Boolean = Display.isLandscape()">
                      <span className="keyword">val</span> isLandscape: <span className="type">Boolean</span> = <span className="type">Display</span>.<span className="function">isLandscape</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-46" rawCode="val widthDp: Int = Display.getScreenWidthDp()">
                      <span className="keyword">val</span> widthDp: <span className="type">Int</span> = <span className="type">Display</span>.<span className="function">getScreenWidthDp</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-47" rawCode="val heightDp: Int = Display.getScreenHeightDp()">
                      <span className="keyword">val</span> heightDp: <span className="type">Int</span> = <span className="type">Display</span>.<span className="function">getScreenHeightDp</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-audj-1" rawCode="import com.zaitxcode.android.hardware.Audio;">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Audio;
                    </CodeLineRow>
                    <CodeLineRow id="line-audj-2" rawCode="Audio.playClickSound();">
                      <span className="type">Audio</span>.<span className="function">playClickSound</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-audj-3" rawCode="boolean muted = Audio.isMuted();">
                      <span className="type">boolean</span> muted = <span className="type">Audio</span>.<span className="function">isMuted</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-audj-4" rawCode="boolean isPortrait = Display.isPortrait();">
                      <span className="type">boolean</span> isPortrait = <span className="type">Display</span>.<span className="function">isPortrait</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-audj-5" rawCode="int widthDp = Display.getScreenWidthDp();">
                      <span className="type">int</span> widthDp = <span className="type">Display</span>.<span className="function">getScreenWidthDp</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-48" rawCode="final audioRes = await _channel.invokeMethod<String>('audioInfo');">
                      <span className="keyword">final</span> audioRes = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;audioInfo&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-49" rawCode="final displayRes = await _channel.invokeMethod<String>('displayInfo');">
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">📋 Clipboard.copyText, getText, hasCopiedText & Vibration.vibrate & Screen.blockCapture</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("vib-k", `import com.zaitxcode.android.content.Clipboard\nimport com.zaitxcode.android.hardware.Vibration\nimport com.zaitxcode.android.view.Screen\n\nClipboard.copyText("Copied text")\nval text: String? = Clipboard.getText()\nval hasText: Boolean = Clipboard.hasCopiedText()\nClipboard.clear()\nVibration.vibrate(200)\nVibration.vibratePattern(longArrayOf(0, 100, 50, 200), -1)\nVibration.cancel()\nScreen.blockCapture()\nScreen.unblockCapture()\nval blocked: Boolean = Screen.isCaptureBlocked()`)}>
                      {copiedId === "vib-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("vib-j", `import com.zaitxcode.android.content.Clipboard;\nimport com.zaitxcode.android.hardware.Vibration;\nimport com.zaitxcode.android.view.Screen;\n\nClipboard.copyText("Copied text");\nString text = Clipboard.getText();\nboolean hasText = Clipboard.hasCopiedText();\nClipboard.clear();\nVibration.vibrate(200);\nVibration.cancel();\nScreen.blockCapture();\nScreen.unblockCapture();\nboolean blocked = Screen.isCaptureBlocked();`)}>
                      {copiedId === "vib-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("vib-f", `await _channel.invokeMethod('copyText', {'text': 'Copied'});\nfinal text = await _channel.invokeMethod<String>('getClipboard');\nawait _channel.invokeMethod('vibrate', {'ms': 200});\nawait _channel.invokeMethod('vibratePattern');\nfinal blocked = await _channel.invokeMethod<bool>('blockCapture');`)}>
                      {copiedId === "vib-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secClipboardDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-50" rawCode='Clipboard.copyText("Copied text")'>
                      <span className="type">Clipboard</span>.<span className="function">copyText</span>(<span className="string">&quot;Copied text&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-51" rawCode="val text: String? = Clipboard.getText()">
                      <span className="keyword">val</span> text: <span className="type">String</span>? = <span className="type">Clipboard</span>.<span className="function">getText</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-52" rawCode="val hasText: Boolean = Clipboard.hasCopiedText()">
                      <span className="keyword">val</span> hasText: <span className="type">Boolean</span> = <span className="type">Clipboard</span>.<span className="function">hasCopiedText</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-53" rawCode="Clipboard.clear()">
                      <span className="type">Clipboard</span>.<span className="function">clear</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-54" rawCode="Vibration.vibrate(200)">
                      <span className="type">Vibration</span>.<span className="function">vibrate</span>(<span className="number">200</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-55" rawCode="Vibration.vibratePattern(longArrayOf(0, 100, 50, 200), -1)">
                      <span className="type">Vibration</span>.<span className="function">vibratePattern</span>(<span className="keyword">longArrayOf</span>(<span className="number">0</span>, <span className="number">100</span>, <span className="number">50</span>, <span className="number">200</span>), -<span className="number">1</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-56" rawCode="Vibration.cancel()">
                      <span className="type">Vibration</span>.<span className="function">cancel</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-57" rawCode="Screen.blockCapture()">
                      <span className="type">Screen</span>.<span className="function">blockCapture</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-58" rawCode="Screen.unblockCapture()">
                      <span className="type">Screen</span>.<span className="function">unblockCapture</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-59" rawCode="val blocked: Boolean = Screen.isCaptureBlocked()">
                      <span className="keyword">val</span> blocked: <span className="type">Boolean</span> = <span className="type">Screen</span>.<span className="function">isCaptureBlocked</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-vibj-1" rawCode='Clipboard.copyText("Copied text");'>
                      <span className="type">Clipboard</span>.<span className="function">copyText</span>(<span className="string">&quot;Copied text&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-vibj-2" rawCode="String text = Clipboard.getText();">
                      <span className="type">String</span> text = <span className="type">Clipboard</span>.<span className="function">getText</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-vibj-3" rawCode="Vibration.vibrate(200);">
                      <span className="type">Vibration</span>.<span className="function">vibrate</span>(<span className="number">200</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-vibj-4" rawCode="Screen.blockCapture();">
                      <span className="type">Screen</span>.<span className="function">blockCapture</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-vibj-5" rawCode="boolean blocked = Screen.isCaptureBlocked();">
                      <span className="type">boolean</span> blocked = <span className="type">Screen</span>.<span className="function">isCaptureBlocked</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-60" rawCode="await _channel.invokeMethod('copyText', {'text': 'Copied'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;copyText&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Copied&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-61" rawCode="final text = await _channel.invokeMethod<String>('getClipboard');">
                      <span className="keyword">final</span> text = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;getClipboard&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-62" rawCode="await _channel.invokeMethod('vibrate', {'ms': 200});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;vibrate&apos;</span>, &#123;<span className="string">&apos;ms&apos;</span>: <span className="number">200</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-63" rawCode="final isBlocked = await _channel.invokeMethod<bool>('blockCapture');">
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔔 Notification.showNotification, createChannel, cancelAll & Keyboard.hideKeyboard</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("not-k", `import com.zaitxcode.android.app.Notification\nimport com.zaitxcode.android.view.Keyboard\n\nNotification.createChannel("demo", "Demo Channel")\nNotification.showNotification(\n    channelId = "demo",\n    title = "Android Helper",\n    text = "Hello Notification",\n    iconResId = R.drawable.ic_launcher\n)\nNotification.cancelAll()\nval canPost: Boolean = Notification.canPostNotifications()\nKeyboard.hideKeyboard()\nKeyboard.showKeyboard(view)`)}>
                      {copiedId === "not-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("not-j", `import com.zaitxcode.android.app.Notification;\nimport com.zaitxcode.android.view.Keyboard;\n\nNotification.createChannel("demo", "Demo Channel");\nNotification.showNotification("demo", "Android Helper", "Hello", R.drawable.ic_launcher);\nNotification.cancelAll();\nboolean canPost = Notification.canPostNotifications();\nKeyboard.hideKeyboard();\nKeyboard.showKeyboard(view);`)}>
                      {copiedId === "not-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("not-f", `await _channel.invokeMethod('showNotification', {'text': 'Flutter Notification'});\nawait _channel.invokeMethod('cancelNotifications');\nawait _channel.invokeMethod('hideKeyboard');`)}>
                      {copiedId === "not-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secNotifDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-64" rawCode='Notification.createChannel("demo", "Demo Channel")'>
                      <span className="type">Notification</span>.<span className="function">createChannel</span>(<span className="string">&quot;demo&quot;</span>, <span className="string">&quot;Demo Channel&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-65" rawCode='Notification.showNotification("demo", "Android Helper", "Hello", R.drawable.ic_launcher)'>
                      <span className="type">Notification</span>.<span className="function">showNotification</span>(<span className="string">&quot;demo&quot;</span>, <span className="string">&quot;Android Helper&quot;</span>, <span className="string">&quot;Hello&quot;</span>, <span className="type">R</span>.drawable.ic_launcher)
                    </CodeLineRow>
                    <CodeLineRow id="line-66" rawCode="Notification.cancelAll()">
                      <span className="type">Notification</span>.<span className="function">cancelAll</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-67" rawCode="val canPost: Boolean = Notification.canPostNotifications()">
                      <span className="keyword">val</span> canPost: <span className="type">Boolean</span> = <span className="type">Notification</span>.<span className="function">canPostNotifications</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-68" rawCode="Keyboard.hideKeyboard()">
                      <span className="type">Keyboard</span>.<span className="function">hideKeyboard</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-notj-1" rawCode='Notification.createChannel("demo", "Demo Channel");'>
                      <span className="type">Notification</span>.<span className="function">createChannel</span>(<span className="string">&quot;demo&quot;</span>, <span className="string">&quot;Demo Channel&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-notj-2" rawCode='Notification.showNotification("demo", "Android Helper", "Hello", R.drawable.ic_launcher);'>
                      <span className="type">Notification</span>.<span className="function">showNotification</span>(<span className="string">&quot;demo&quot;</span>, <span className="string">&quot;Android Helper&quot;</span>, <span className="string">&quot;Hello&quot;</span>, <span className="type">R</span>.drawable.ic_launcher);
                    </CodeLineRow>
                    <CodeLineRow id="line-notj-3" rawCode="Notification.cancelAll();">
                      <span className="type">Notification</span>.<span className="function">cancelAll</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-notj-4" rawCode="Keyboard.hideKeyboard();">
                      <span className="type">Keyboard</span>.<span className="function">hideKeyboard</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-69" rawCode="await _channel.invokeMethod('showNotification', {'text': 'Flutter Notification'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;showNotification&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Flutter Notification&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-70" rawCode="await _channel.invokeMethod('cancelNotifications');">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;cancelNotifications&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-71" rawCode="await _channel.invokeMethod('hideKeyboard');">
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">📱 Device, Battery, AppInfo & AppState Metrics</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("dev-k", `import com.zaitxcode.android.hardware.Device\nimport com.zaitxcode.android.hardware.Battery\nimport com.zaitxcode.android.app.AppInfo\nimport com.zaitxcode.android.app.AppState\n\nval device: String = Device.deviceName()\nval brand: String = Device.brand()\nval model: String = Device.model()\nval sdk: Int = Device.sdk()\nval isTablet: Boolean = Device.isTablet()\nval isEmulator: Boolean = Device.isEmulator()\nval batteryLevel: Int = Battery.getBatteryLevel()\nval isCharging: Boolean = Battery.isCharging()\nval chargingType: String = Battery.getChargingType()\nval appName: String = AppInfo.appName()\nval packageName: String = AppInfo.packageName()\nval isForeground: Boolean = AppState.isAppInForeground()`)}>
                      {copiedId === "dev-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("dev-j", `import com.zaitxcode.android.hardware.Device;\nimport com.zaitxcode.android.hardware.Battery;\nimport com.zaitxcode.android.app.AppInfo;\nimport com.zaitxcode.android.app.AppState;\n\nString device = Device.deviceName();\nint sdk = Device.sdk();\nboolean isTablet = Device.isTablet();\nboolean isEmulator = Device.isEmulator();\nint batteryLevel = Battery.getBatteryLevel();\nboolean isCharging = Battery.isCharging();\nString chargingType = Battery.getChargingType();\nString packageName = AppInfo.packageName();\nboolean isForeground = AppState.isAppInForeground();`)}>
                      {copiedId === "dev-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("dev-f", `final devInfo = await _channel.invokeMethod<String>('deviceInfo');\nfinal batInfo = await _channel.invokeMethod<String>('batteryInfo');\nfinal appInfo = await _channel.invokeMethod<String>('appInfo');\nfinal appState = await _channel.invokeMethod<String>('appState');`)}>
                      {copiedId === "dev-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secDeviceDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-72" rawCode="val device: String = Device.deviceName()">
                      <span className="keyword">val</span> device: <span className="type">String</span> = <span className="type">Device</span>.<span className="function">deviceName</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-73" rawCode="val sdkLevel: Int = Device.sdk()">
                      <span className="keyword">val</span> sdkLevel: <span className="type">Int</span> = <span className="type">Device</span>.<span className="function">sdk</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-74" rawCode="val isEmulator: Boolean = Device.isEmulator()">
                      <span className="keyword">val</span> isEmulator: <span className="type">Boolean</span> = <span className="type">Device</span>.<span className="function">isEmulator</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-75" rawCode="val batteryLevel: Int = Battery.getBatteryLevel()">
                      <span className="keyword">val</span> batteryLevel: <span className="type">Int</span> = <span className="type">Battery</span>.<span className="function">getBatteryLevel</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-76" rawCode="val isCharging: Boolean = Battery.isCharging()">
                      <span className="keyword">val</span> isCharging: <span className="type">Boolean</span> = <span className="type">Battery</span>.<span className="function">isCharging</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-77" rawCode="val packageName: String = AppInfo.packageName()">
                      <span className="keyword">val</span> packageName: <span className="type">String</span> = <span className="type">AppInfo</span>.<span className="function">packageName</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-78" rawCode="val isForeground: Boolean = AppState.isAppInForeground()">
                      <span className="keyword">val</span> isForeground: <span className="type">Boolean</span> = <span className="type">AppState</span>.<span className="function">isAppInForeground</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-devj-1" rawCode="String device = Device.deviceName();">
                      <span className="type">String</span> device = <span className="type">Device</span>.<span className="function">deviceName</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-devj-2" rawCode="int sdk = Device.sdk();">
                      <span className="type">int</span> sdk = <span className="type">Device</span>.<span className="function">sdk</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-devj-3" rawCode="boolean isEmulator = Device.isEmulator();">
                      <span className="type">boolean</span> isEmulator = <span className="type">Device</span>.<span className="function">isEmulator</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-devj-4" rawCode="int batteryLevel = Battery.getBatteryLevel();">
                      <span className="type">int</span> batteryLevel = <span className="type">Battery</span>.<span className="function">getBatteryLevel</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-devj-5" rawCode="boolean isForeground = AppState.isAppInForeground();">
                      <span className="type">boolean</span> isForeground = <span className="type">AppState</span>.<span className="function">isAppInForeground</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-79" rawCode="final devInfo = await _channel.invokeMethod<String>('deviceInfo');">
                      <span className="keyword">final</span> devInfo = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;deviceInfo&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-80" rawCode="final batInfo = await _channel.invokeMethod<String>('batteryInfo');">
                      <span className="keyword">final</span> batInfo = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;batteryInfo&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-81" rawCode="final appInfo = await _channel.invokeMethod<String>('appInfo');">
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">💾 File, Storage, Time, Validation & Encryption</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("dat-k", `import com.zaitxcode.android.io.File as AppFile\nimport com.zaitxcode.android.io.Storage\nimport com.zaitxcode.android.util.Time\nimport com.zaitxcode.android.util.Validation\nimport com.zaitxcode.android.security.Encryption\n\nAppFile.writeText("demo.txt", "content")\nval content: String? = AppFile.readText("demo.txt")\nAppFile.delete("demo.txt")\nval freeBytes: Long = Storage.getFreeInternalStorage()\nval freeFormatted: String = Storage.formatBytes(freeBytes)\nval formattedTime: String = Time.format(Time.now(), "yyyy-MM-dd HH:mm:ss")\nval isEmailValid: Boolean = Validation.isValidEmail("user@example.com")\nval hash: String = Encryption.sha256("password")\nval b64Encoded: String = Encryption.base64Encode("data")`)}>
                      {copiedId === "dat-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("dat-j", `import com.zaitxcode.android.io.File;\nimport com.zaitxcode.android.io.Storage;\nimport com.zaitxcode.android.util.Time;\nimport com.zaitxcode.android.util.Validation;\nimport com.zaitxcode.android.security.Encryption;\n\nFile.writeText("demo.txt", "content");\nString content = File.readText("demo.txt");\nFile.delete("demo.txt");\nlong freeBytes = Storage.getFreeInternalStorage();\nString freeFormatted = Storage.formatBytes(freeBytes);\nString formattedTime = Time.format(Time.now(), "yyyy-MM-dd HH:mm:ss");\nboolean isEmailValid = Validation.isValidEmail("user@example.com");\nString hash = Encryption.sha256("password");\nString b64Encoded = Encryption.base64Encode("data");`)}>
                      {copiedId === "dat-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("dat-f", `await _channel.invokeMethod('writeFile', {'text': 'content'});\nfinal content = await _channel.invokeMethod<String>('readFile');\nfinal storage = await _channel.invokeMethod<String>('storage');\nfinal timeRes = await _channel.invokeMethod<String>('timeNow');\nfinal hash = await _channel.invokeMethod<String>('sha256', {'text': 'password'});`)}>
                      {copiedId === "dat-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secDataDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-82" rawCode='AppFile.writeText("demo.txt", "content")'>
                      <span className="type">AppFile</span>.<span className="function">writeText</span>(<span className="string">&quot;demo.txt&quot;</span>, <span className="string">&quot;content&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-83" rawCode='val content: String? = AppFile.readText("demo.txt")'>
                      <span className="keyword">val</span> content: <span className="type">String</span>? = <span className="type">AppFile</span>.<span className="function">readText</span>(<span className="string">&quot;demo.txt&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-84" rawCode="val freeBytes: Long = Storage.getFreeInternalStorage()">
                      <span className="keyword">val</span> freeBytes: <span className="type">Long</span> = <span className="type">Storage</span>.<span className="function">getFreeInternalStorage</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-85" rawCode='val formattedTime: String = Time.format(Time.now(), "yyyy-MM-dd HH:mm:ss")'>
                      <span className="keyword">val</span> formattedTime: <span className="type">String</span> = <span className="type">Time</span>.<span className="function">format</span>(<span className="type">Time</span>.<span className="function">now</span>(), <span className="string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-86" rawCode='val isValidEmail: Boolean = Validation.isValidEmail("user@example.com")'>
                      <span className="keyword">val</span> isValidEmail: <span className="type">Boolean</span> = <span className="type">Validation</span>.<span className="function">isValidEmail</span>(<span className="string">&quot;user@example.com&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow id="line-87" rawCode='val sha256Hash: String = Encryption.sha256("password")'>
                      <span className="keyword">val</span> sha256Hash: <span className="type">String</span> = <span className="type">Encryption</span>.<span className="function">sha256</span>(<span className="string">&quot;password&quot;</span>)
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-datj-1" rawCode='File.writeText("demo.txt", "content");'>
                      <span className="type">File</span>.<span className="function">writeText</span>(<span className="string">&quot;demo.txt&quot;</span>, <span className="string">&quot;content&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-datj-2" rawCode='String content = File.readText("demo.txt");'>
                      <span className="type">String</span> content = <span className="type">File</span>.<span className="function">readText</span>(<span className="string">&quot;demo.txt&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-datj-3" rawCode="long freeBytes = Storage.getFreeInternalStorage();">
                      <span className="type">long</span> freeBytes = <span className="type">Storage</span>.<span className="function">getFreeInternalStorage</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-datj-4" rawCode='boolean isValidEmail = Validation.isValidEmail("user@example.com");'>
                      <span className="type">boolean</span> isValidEmail = <span className="type">Validation</span>.<span className="function">isValidEmail</span>(<span className="string">&quot;user@example.com&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-datj-5" rawCode='String sha256Hash = Encryption.sha256("password");'>
                      <span className="type">String</span> sha256Hash = <span className="type">Encryption</span>.<span className="function">sha256</span>(<span className="string">&quot;password&quot;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-88" rawCode="await _channel.invokeMethod('writeFile', {'text': 'content'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;writeFile&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;content&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow id="line-89" rawCode="final content = await _channel.invokeMethod<String>('readFile');">
                      <span className="keyword">final</span> content = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;readFile&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-90" rawCode="final hash = await _channel.invokeMethod<String>('sha256', {'text': 'password'});">
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
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔐 Biometric.authenticate, Permission.isGranted, Signature & Logger</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                  {activeTab === "kotlin" ? (
                    <button className="copy-btn" onClick={() => handleCopy("sec-k", `import com.zaitxcode.android.hardware.Biometric\nimport com.zaitxcode.android.app.Permission\nimport com.zaitxcode.android.app.Signature\nimport com.zaitxcode.android.core.AppHelper\n\nif (Biometric.canAuthenticate()) {\n    Biometric.authenticate(\n        activity = fragmentActivity,\n        title = "Biometric Auth",\n        onSuccess = { /* Handle success */ }\n    )\n}\nval isCameraGranted: Boolean = Permission.isGranted(android.Manifest.permission.CAMERA)\nval sha1Fingerprint: String = Signature.getAppPrimarySignatureSHA1()\nAppHelper.log("AppTag", "Log diagnostic message")`)}>
                      {copiedId === "sec-k" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : activeTab === "java" ? (
                    <button className="copy-btn" onClick={() => handleCopy("sec-j", `import com.zaitxcode.android.hardware.Biometric;\nimport com.zaitxcode.android.app.Permission;\nimport com.zaitxcode.android.app.Signature;\nimport com.zaitxcode.android.core.AppHelper;\n\nif (Biometric.canAuthenticate()) {\n    Biometric.authenticate(\n        activity = fragmentActivity,\n        title = "Biometric Auth",\n        onSuccess = () -> { /* Handle success */ }\n    );\n}\nboolean isCameraGranted = Permission.isGranted(android.Manifest.permission.CAMERA);\nString sha1Fingerprint = Signature.getAppPrimarySignatureSHA1();\nAppHelper.log("AppTag", "Log diagnostic message");`)}>
                      {copiedId === "sec-j" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  ) : (
                    <button className="copy-btn" onClick={() => handleCopy("sec-f", `final result = await _channel.invokeMethod<String>('biometric');\nfinal sig = await _channel.invokeMethod<String>('signatures');\nawait _channel.invokeMethod('logger');`)}>
                      {copiedId === "sec-f" ? "✓ تم نسخ الكل" : "نسخ الكل"}
                    </button>
                  )}
                </div>
              </div>
              <div className="card-desc">{t.secSecurityDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-91" rawCode="val canBio: Boolean = Biometric.canAuthenticate()">
                      <span className="keyword">val</span> canBio: <span className="type">Boolean</span> = <span className="type">Biometric</span>.<span className="function">canAuthenticate</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-92" rawCode='Biometric.authenticate(activity = fragmentActivity, title = "Biometric Auth", onSuccess = {})'>
                      <span className="type">Biometric</span>.<span className="function">authenticate</span>(activity = fragmentActivity, title = <span className="string">&quot;Biometric Auth&quot;</span>, onSuccess = &#123;&#125;)
                    </CodeLineRow>
                    <CodeLineRow id="line-93" rawCode="val isCameraGranted: Boolean = Permission.isGranted(Manifest.permission.CAMERA)">
                      <span className="keyword">val</span> isCameraGranted: <span className="type">Boolean</span> = <span className="type">Permission</span>.<span className="function">isGranted</span>(<span className="type">Manifest</span>.permission.CAMERA)
                    </CodeLineRow>
                    <CodeLineRow id="line-94" rawCode="val sha1Fingerprint: String = Signature.getAppPrimarySignatureSHA1()">
                      <span className="keyword">val</span> sha1Fingerprint: <span className="type">String</span> = <span className="type">Signature</span>.<span className="function">getAppPrimarySignatureSHA1</span>()
                    </CodeLineRow>
                    <CodeLineRow id="line-95" rawCode='AppHelper.log("Tag", "Diagnostic info")'>
                      <span className="type">AppHelper</span>.<span className="function">log</span>(<span className="string">&quot;Tag&quot;</span>, <span className="string">&quot;Diagnostic info&quot;</span>)
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-secj-1" rawCode="boolean canBio = Biometric.canAuthenticate();">
                      <span className="type">boolean</span> canBio = <span className="type">Biometric</span>.<span className="function">canAuthenticate</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-secj-2" rawCode="boolean isCameraGranted = Permission.isGranted(Manifest.permission.CAMERA);">
                      <span className="type">boolean</span> isCameraGranted = <span className="type">Permission</span>.<span className="function">isGranted</span>(<span className="type">Manifest</span>.permission.CAMERA);
                    </CodeLineRow>
                    <CodeLineRow id="line-secj-3" rawCode="String sha1Fingerprint = Signature.getAppPrimarySignatureSHA1();">
                      <span className="type">String</span> sha1Fingerprint = <span className="type">Signature</span>.<span className="function">getAppPrimarySignatureSHA1</span>();
                    </CodeLineRow>
                    <CodeLineRow id="line-secj-4" rawCode='AppHelper.log("Tag", "Diagnostic info");'>
                      <span className="type">AppHelper</span>.<span className="function">log</span>(<span className="string">&quot;Tag&quot;</span>, <span className="string">&quot;Diagnostic info&quot;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow id="line-96" rawCode="final result = await _channel.invokeMethod<String>('biometric');">
                      <span className="keyword">final</span> result = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;biometric&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-97" rawCode="final sig = await _channel.invokeMethod<String>('signatures');">
                      <span className="keyword">final</span> sig = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;signatures&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow id="line-98" rawCode="await _channel.invokeMethod('logger');">
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
      {/* Footer — centered & sticky */}
      <footer data-reveal>
        <div className="footer-links">
          <a href="https://docs.zaitxcode.com" className="docs-link">docs.zaitxcode.com</a>
          <a href="https://github.com/zaitxcode/androidhelper" target="_blank" rel="noreferrer">مستودع GitHub</a>
        </div>
        <p>{t.footerText}</p>
      </footer>
    </div>
  );
}
