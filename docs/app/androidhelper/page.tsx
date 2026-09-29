"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/use-theme";
import { useReveal } from "@/components/use-reveal";

type Lang = "en" | "ar";
type BuildTab = "toml" | "kts" | "groovy";

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
    navDevice: "📱 Device, Battery & App Info",
    navAudio: "🔊 Audio & Display",
    navData: "💾 Data, Files & Cryptography",
    navSecurity: "🔐 Security, Biometrics & Permissions",
    secOverviewTitle: "Android Helper Documentation",
    pillAndroid: "Android 17 (API 37) Ready",
    pillCoroutines: "Kotlin Coroutines & DataStore",
    pillBridge: "Flutter MethodChannel Bridge",
    tabKotlin: "Kotlin Native",
    tabJava: "Java Native",
    tabFlutter: "Flutter Bridge",
    secInstall: "📦 Installation & Setup",
    secInstallDesc: "Step 1: Add the library dependency to your build file. Step 2: Initialize inside Application or Activity class.",
    flutterBridgeExplain: "🌉 How Flutter MethodChannel Bridge Works: Flutter communicates asynchronously with native Android Kotlin/Java code via MethodChannel ('androidhelper/core'). Calling await _channel.invokeMethod<T>('methodName') in Dart invokes Android Helper helpers natively on the Android host without UI blocking.",
    secNetwork: "🌐 Network Helpers",
    secNetworkDesc: "Check internet connectivity, validated connection, transport type, metered state, and IP address via Network module.",
    secIntents: "🔗 External Intents & Actions",
    secIntentsDesc: "Open URLs, WhatsApp chats, dialer, SMS, email, share text/files, maps, app settings, and Play Store directly via Intent & Browser modules.",
    secClipboard: "📋 Clipboard, Vibration & Screen Capture",
    secClipboardDesc: "Trigger physical vibration motor, vibration patterns, clipboard read/write/clear, and screen capture block via Clipboard, Vibration & Screen modules.",
    secNotif: "🔔 Notifications & Soft Keyboard",
    secNotifDesc: "Create notification channels, delete channels, show custom notifications, cancel notifications, and hide/show soft keyboard via Notification & Keyboard modules.",
    secDevice: "📱 Device, Battery, AppInfo & AppState",
    secDeviceDesc: "Query device model, brand, manufacturer, SDK level, tablet/emulator state, RAM size, battery status/health, app version, and foreground state via Device, Battery, AppInfo & AppState modules.",
    secAudio: "🔊 Audio & Display Metrics",
    secAudioDesc: "Play tactile system click sound, query ringer mode/volume, headphones state, screen orientation & dimensions in DP via Audio & Display modules.",
    secData: "💾 Data, Storage, Time, Validation & Encryption",
    secDataDesc: "File write/read/append/delete, storage space format, time formatting/timeAgo, email/phone/URL/national ID validation, SHA-1/256/512, MD5, HMAC, AES encryption, and Base64 encoding via File, Storage, Time, Validation & Encryption modules.",
    secSecurity: "🔐 Security, Biometrics, Permissions & Signatures",
    secSecurityDesc: "Prompt biometric authentication, grant/check runtime permissions, extract app SHA-1 signature, and log diagnostics via Biometric, Permission, Signature & Logger modules.",
    aiPromptBoxTitle: "Ask AI Assistant about Android Helper Documentation:",
    btnOpenGpt: "ChatGPT",
    btnOpenClaude: "Claude",
    btnOpenPerplexity: "Perplexity",
    btnOpenGrok: "Grok",
    btnOpenDeepSeek: "DeepSeek",
    btnCopyAiPrompt: "Copy Prompt (Any AI)",
    footerText: "Android Helper Documentation © 2026 ZaitXCode. All rights reserved."
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
    tabKotlin: "كوتلن (Kotlin)",
    tabJava: "جافا (Java)",
    tabFlutter: "فلاتر (Flutter)",
    secInstall: "📦 التثبيت والإعداد (Installation)",
    secInstallDesc: "الخطوة الأولى: أضف التبعية لملف البناء (Gradle/TOML). الخطوة الثانية: قم بتهيئة المكتبة بداخل كلاس Application أو Activity.",
    flutterBridgeExplain: "🌉 كيف يعمل جسر التواصل في فلاتر (MethodChannel Bridge)؟ يتصل تطبيق Flutter بكود أندرويد الكوتلن/الجافا الأصلي لا تزامندياً عبر قناة تواصل موحدة ('androidhelper/core'). يرسل كود فلاتر الأمر عبر await _channel.invokeMethod<T>('methodName')، فيستقبل كلاس MainActivity الأمر وينفذ دالة المكتبة المطلوبة دون إيقاف سلاسة الواجهة.",
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
    secSecurityDesc: "مصادقة البصمة الفعالة، التحقق وطلب الصلاحيات، استخراج توقيع التطبيق الرقمي SHA-1 واللوجر عبر كلاسات Biometric و Permission و Signature و AppHelper.",
    aiPromptBoxTitle: "اسأل الذكاء الاصطناعي عن المكتبة:",
    btnOpenGpt: "ChatGPT",
    btnOpenClaude: "Claude",
    btnOpenPerplexity: "Perplexity",
    btnOpenGrok: "Grok",
    btnOpenDeepSeek: "DeepSeek",
    btnCopyAiPrompt: "نسخ الأمر لأي ذكاء اصطناعي آخر",
    footerText: "توثيق Android Helper © 2026 ZaitXCode. جميع الحقوق محفوظة."
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

function CodeLineRow({ id, rawCode, children }: { id?: string; rawCode: string; children: React.ReactNode }) {
  return (
    <div className="code-line-row">
      <span className="code-line-text">{children}</span>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTab, setActiveTab] = useState<"kotlin" | "java" | "flutter">("kotlin");
  const [buildTab, setBuildTab] = useState<BuildTab>("toml");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const kotlinApkUrl = "https://storage.zaitxcode.com/android/androidhelper-example-kotlin.apk";

  const { theme, toggleTheme } = useTheme();
  useReveal();

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

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
    const promptText = getAiPromptText(lang);
    safeCopyText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);

    const targetUrl = `${baseUrl}${encodeURIComponent(promptText)}`;
    window.open(targetUrl, "_blank");
  };

  const copyPromptForAnyAi = () => {
    const promptText = getAiPromptText(lang);
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

          <a href="/androidhelper/" className="nav-brand">
            <img src="/logo.jpeg" alt="Android Helper Logo" height="28" style={{ borderRadius: "6px", objectFit: "cover" }} />
            <span>{t.brandName}</span>
            <span className="brand-badge">v1.0.0-beta02</span>
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
          <button className="mobile-search-toggle" onClick={() => setMobileSearchOpen(!mobileSearchOpen)} title="Search">
            <i className="bi bi-search"></i>
          </button>

          <a href="/androidhelper/ar/" className="btn-icon" title="عرض التوثيق باللغة العربية">
            <i className="bi bi-translate"></i> <span className="btn-label">عربي</span>
          </a>

          <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
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
            <li><a href="#overview" className={`sidebar-link ${activeSection === "overview" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navOverview}</a></li>
            <li><a href="#installation" className={`sidebar-link ${activeSection === "installation" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navInstallation}</a></li>
            <li><a href="#network" className={`sidebar-link ${activeSection === "network" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navNetwork}</a></li>
            <li><a href="#intents" className={`sidebar-link ${activeSection === "intents" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navIntents}</a></li>
            <li><a href="#clipboard" className={`sidebar-link ${activeSection === "clipboard" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navClipboard}</a></li>
            <li><a href="#notifications" className={`sidebar-link ${activeSection === "notifications" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navNotifications}</a></li>
            <li><a href="#device" className={`sidebar-link ${activeSection === "device" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navDevice}</a></li>
            <li><a href="#audio" className={`sidebar-link ${activeSection === "audio" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navAudio}</a></li>
            <li><a href="#data" className={`sidebar-link ${activeSection === "data" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navData}</a></li>
            <li><a href="#security" className={`sidebar-link ${activeSection === "security" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>{t.navSecurity}</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="content">
          <section id="overview" className="hero">
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
              {kotlinApkUrl && (
                <a
                  href={kotlinApkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill"
                  style={{ backgroundColor: "var(--accent-color)", color: "#ffffff", border: "none", fontWeight: "600", textDecoration: "none" }}
                >
                  <KotlinIcon /> <i className="bi bi-download"></i> Kotlin Demo APK
                </a>
              )}
            </div>

            {/* AI Prompt Copy & Chat Bar */}
            <div className="ai-prompt-box">
              <div className="ai-prompt-title">
                <i className="bi bi-robot"></i> {t.aiPromptBoxTitle}
              </div>
              <div className="ai-btn-group">
                <button className="ai-btn" onClick={() => openAiProvider("ai-gpt", "https://chatgpt.com/?prompt=")}>
                  <GptIcon />
                  <span>{copiedId === "ai-gpt" ? "✓ Opening..." : t.btnOpenGpt}</span>
                </button>

                <button className="ai-btn" onClick={() => openAiProvider("ai-claude", "https://claude.ai/new?q=")}>
                  <ClaudeIcon />
                  <span>{copiedId === "ai-claude" ? "✓ Opening..." : t.btnOpenClaude}</span>
                </button>

                <button className="ai-btn" onClick={() => openAiProvider("ai-perpx", "https://www.perplexity.ai/?q=")}>
                  <PerplexityIcon />
                  <span>{copiedId === "ai-perpx" ? "✓ Opening..." : t.btnOpenPerplexity}</span>
                </button>

                <button className="ai-btn" onClick={() => openAiProvider("ai-grok", "https://x.com/i/grok?text=")}>
                  <GrokIcon />
                  <span>{copiedId === "ai-grok" ? "✓ Opening..." : t.btnOpenGrok}</span>
                </button>

                <button className="ai-btn" onClick={() => openAiProvider("ai-deepseek", "https://chat.deepseek.com/")}>
                  <DeepSeekIcon />
                  <span>{copiedId === "ai-deepseek" ? "✓ Opening..." : t.btnOpenDeepSeek}</span>
                </button>

                <button className="ai-btn" onClick={copyPromptForAnyAi}>
                  <i className="bi bi-clipboard-check"></i>
                  <span>{copiedId === "ai-any" ? "✓ Prompt Copied!" : t.btnCopyAiPrompt}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Language Tabs */}
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

          {/* Installation Section - Step 1 & Step 2 Explicitly Separated */}
          <section id="installation" className="section">
            <div className="section-header">{t.secInstall}</div>

            {/* Step 1: Add Dependency */}
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">1️⃣ Step 1: Add Dependency in Gradle / Version Catalog (TOML)</span>
                </div>
                <div className="card-actions">
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      className="pill"
                      onClick={() => setBuildTab("toml")}
                      style={{ cursor: "pointer", border: buildTab === "toml" ? "1px solid var(--accent-color)" : "1px solid var(--border-color)", backgroundColor: buildTab === "toml" ? "var(--accent-color)" : "transparent", color: buildTab === "toml" ? "#ffffff" : "var(--text-primary)", padding: "4px 10px", fontSize: "0.82rem", borderRadius: "8px" }}
                    >
                      libs.versions.toml
                    </button>
                    <button
                      className="pill"
                      onClick={() => setBuildTab("kts")}
                      style={{ cursor: "pointer", border: buildTab === "kts" ? "1px solid var(--accent-color)" : "1px solid var(--border-color)", backgroundColor: buildTab === "kts" ? "var(--accent-color)" : "transparent", color: buildTab === "kts" ? "#ffffff" : "var(--text-primary)", padding: "4px 10px", fontSize: "0.82rem", borderRadius: "8px" }}
                    >
                      build.gradle.kts
                    </button>
                    <button
                      className="pill"
                      onClick={() => setBuildTab("groovy")}
                      style={{ cursor: "pointer", border: buildTab === "groovy" ? "1px solid var(--accent-color)" : "1px solid var(--border-color)", backgroundColor: buildTab === "groovy" ? "var(--accent-color)" : "transparent", color: buildTab === "groovy" ? "#ffffff" : "var(--text-primary)", padding: "4px 10px", fontSize: "0.82rem", borderRadius: "8px" }}
                    >
                      build.gradle (Groovy)
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-desc">Select your preferred Gradle configuration method below to declare JitPack repository and androidhelper dependency.</div>

              {buildTab === "toml" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='// gradle/libs.versions.toml'>
                      <span className="comment">// 1. Add version &amp; library in gradle/libs.versions.toml</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='[versions]'>
                      <span className="keyword">[versions]</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='androidhelper = "1.0.0-beta02"'>
                      androidhelper = <span className="string">&quot;1.0.0-beta02&quot;</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='[libraries]'>
                      <span className="keyword">[libraries]</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='androidhelper = { group = "com.github.zaitxcode", name = "androidhelper", version.ref = "androidhelper" }'>
                      androidhelper = &#123; group = <span className="string">&quot;com.github.zaitxcode&quot;</span>, name = <span className="string">&quot;androidhelper&quot;</span>, version.ref = <span className="string">&quot;androidhelper&quot;</span> &#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='// settings.gradle.kts'>
                      <span className="comment">{"\n"}// 2. Add JitPack repository in settings.gradle.kts</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='repositories { google(); mavenCentral(); maven { url = uri("https://jitpack.io") } }'>
                      repositories &#123; google(); mavenCentral(); maven &#123; url = uri(<span className="string">&quot;https://jitpack.io&quot;</span>) &#125; &#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='// app/build.gradle.kts'>
                      <span className="comment">{"\n"}// 3. Add dependency in app/build.gradle.kts</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='dependencies { implementation(libs.androidhelper) }'>
                      dependencies &#123; implementation(libs.androidhelper) &#125;
                    </CodeLineRow>
                  </div>
                </div>
              ) : buildTab === "kts" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='// settings.gradle.kts'>
                      <span className="comment">// 1. Add JitPack repository in settings.gradle.kts</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='dependencyResolutionManagement { repositories { google(); mavenCentral(); maven { url = uri("https://jitpack.io") } } }'>
                      dependencyResolutionManagement &#123; repositories &#123; google(); mavenCentral(); maven &#123; url = uri(<span className="string">&quot;https://jitpack.io&quot;</span>) &#125; &#125; &#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='// app/build.gradle.kts'>
                      <span className="comment">{"\n"}// 2. Add dependency in app/build.gradle.kts</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='dependencies { implementation("com.github.zaitxcode:androidhelper:1.0.0-beta02") }'>
                      dependencies &#123; implementation(<span className="string">&quot;com.github.zaitxcode:androidhelper:1.0.0-beta02&quot;</span>) &#125;
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='// settings.gradle'>
                      <span className="comment">// 1. Add JitPack repository in settings.gradle</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode="dependencyResolutionManagement { repositories { google(); mavenCentral(); maven { url 'https://jitpack.io' } } }">
                      dependencyResolutionManagement &#123; repositories &#123; google(); mavenCentral(); maven &#123; url <span className="string">&apos;https://jitpack.io&apos;</span> &#125; &#125; &#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='// app/build.gradle'>
                      <span className="comment">{"\n"}// 2. Add dependency in app/build.gradle</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode="dependencies { implementation 'com.github.zaitxcode:androidhelper:1.0.0-beta02' }">
                      dependencies &#123; implementation <span className="string">&apos;com.github.zaitxcode:androidhelper:1.0.0-beta02&apos;</span> &#125;
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Initialize in Code */}
            <div className="card" data-reveal data-tilt="4" style={{ marginTop: "16px" }}>
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">2️⃣ Step 2: Initialize in Application or Activity Class</span>
                </div>
                <div className="card-actions">
                  <span className="lang-tag">
                    {activeTab === "kotlin" ? <KotlinIcon /> : activeTab === "java" ? <JavaIcon /> : <FlutterIcon />}
                    {activeTab === "kotlin" ? "Kotlin" : activeTab === "java" ? "Java" : "Flutter"}
                  </span>
                </div>
              </div>
              <div className="card-desc">Call AppHelper.initialize(context) inside your Application.onCreate() or Activity.onCreate().</div>

              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='import android.app.Application'>
                      <span className="keyword">import</span> android.app.Application
                    </CodeLineRow>
                    <CodeLineRow rawCode='import com.zaitxcode.android.core.AppHelper'>
                      <span className="keyword">import</span> com.zaitxcode.android.core.AppHelper
                    </CodeLineRow>
                    <CodeLineRow rawCode='class ExampleApplication : Application() {'>
                      <span className="keyword">class</span> <span className="type">ExampleApplication</span> : <span className="type">Application</span>() &#123;
                    </CodeLineRow>
                    <CodeLineRow rawCode='    override fun onCreate() {'>
                      &nbsp;&nbsp;<span className="keyword">override fun</span> <span className="function">onCreate</span>() &#123;
                    </CodeLineRow>
                    <CodeLineRow rawCode='        super.onCreate()'>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">super</span>.onCreate()
                    </CodeLineRow>
                    <CodeLineRow rawCode='        AppHelper.initialize(this)'>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="type">AppHelper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='    }'>
                      &nbsp;&nbsp;&#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='}'>
                      &#125;
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='import android.app.Application;'>
                      <span className="keyword">import</span> android.app.Application;
                    </CodeLineRow>
                    <CodeLineRow rawCode='import com.zaitxcode.android.core.AppHelper;'>
                      <span className="keyword">import</span> com.zaitxcode.android.core.AppHelper;
                    </CodeLineRow>
                    <CodeLineRow rawCode='public class ExampleApplication extends Application {'>
                      <span className="keyword">public class</span> <span className="type">ExampleApplication</span> <span className="keyword">extends</span> <span className="type">Application</span> &#123;
                    </CodeLineRow>
                    <CodeLineRow rawCode='    @Override'>
                      &nbsp;&nbsp;<span className="keyword">@Override</span>
                    </CodeLineRow>
                    <CodeLineRow rawCode='    public void onCreate() {'>
                      &nbsp;&nbsp;<span className="keyword">public void</span> <span className="function">onCreate</span>() &#123;
                    </CodeLineRow>
                    <CodeLineRow rawCode='        super.onCreate();'>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">super</span>.onCreate();
                    </CodeLineRow>
                    <CodeLineRow rawCode='        AppHelper.initialize(this);'>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="type">AppHelper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode='    }'>
                      &nbsp;&nbsp;&#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='}'>
                      &#125;
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode='import android.app.Application'>
                      <span className="keyword">import</span> android.app.Application
                    </CodeLineRow>
                    <CodeLineRow rawCode='import com.zaitxcode.android.core.AppHelper'>
                      <span className="keyword">import</span> com.zaitxcode.android.core.AppHelper
                    </CodeLineRow>
                    <CodeLineRow rawCode='class MyApp : Application() {'>
                      <span className="keyword">class</span> <span className="type">MyApp</span> : <span className="type">Application</span>() &#123;
                    </CodeLineRow>
                    <CodeLineRow rawCode='    override fun onCreate() {'>
                      &nbsp;&nbsp;<span className="keyword">override fun</span> <span className="function">onCreate</span>() &#123;
                    </CodeLineRow>
                    <CodeLineRow rawCode='        super.onCreate()'>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">super</span>.onCreate()
                    </CodeLineRow>
                    <CodeLineRow rawCode='        AppHelper.initialize(this)'>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="type">AppHelper</span>.<span className="function">initialize</span>(<span className="keyword">this</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='    }'>
                      &nbsp;&nbsp;&#125;
                    </CodeLineRow>
                    <CodeLineRow rawCode='}'>
                      &#125;
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
                  <span className="card-title">🌐 Network.isConnected, activeTransport, isWifiConnected &amp; getIpAddress</span>
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
                    <CodeLineRow rawCode="val ip: String? = Network.getIpAddress()">
                      <span className="keyword">val</span> ip: <span className="type">String?</span> = <span className="type">Network</span>.<span className="function">getIpAddress</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.net.Network;">
                      <span className="keyword">import</span> com.zaitxcode.android.net.Network;
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean isOnline = Network.isConnected();">
                      <span className="keyword">boolean</span> isOnline = <span className="type">Network</span>.<span className="function">isConnected</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean isValidated = Network.hasValidatedInternet();">
                      <span className="keyword">boolean</span> isValidated = <span className="type">Network</span>.<span className="function">hasValidatedInternet</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean isMetered = Network.isConnectionMetered();">
                      <span className="keyword">boolean</span> isMetered = <span className="type">Network</span>.<span className="function">isConnectionMetered</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode='String transport = Network.activeTransport(); // "WIFI", "CELLULAR"'>
                      <span className="type">String</span> transport = <span className="type">Network</span>.<span className="function">activeTransport</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean isWifi = Network.isWifiConnected();">
                      <span className="keyword">boolean</span> isWifi = <span className="type">Network</span>.<span className="function">isWifiConnected</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="String ip = Network.getIpAddress();">
                      <span className="type">String</span> ip = <span className="type">Network</span>.<span className="function">getIpAddress</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="final isOnline = await _channel.invokeMethod<bool>('isConnected');">
                      <span className="keyword">final</span> isOnline = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">bool</span>&gt;(<span className="string">&apos;isConnected&apos;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="final transport = await _channel.invokeMethod<String>('activeTransport');">
                      <span className="keyword">final</span> transport = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;activeTransport&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* External Intents Section */}
          <section id="intents" className="section">
            <div className="section-header">{t.secIntents}</div>
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔗 Intent.openWhatsApp, dial, sendSms, sendEmail, openAppSettings</span>
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
                    <CodeLineRow rawCode='Intent.openWhatsApp("+201000000000", "Hello from Android Helper")'>
                      <span className="type">Intent</span>.<span className="function">openWhatsApp</span>(<span className="string">&quot;+201000000000&quot;</span>, <span className="string">&quot;Hello from Android Helper&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.dial("+201000000000")'>
                      <span className="type">Intent</span>.<span className="function">dial</span>(<span className="string">&quot;+201000000000&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.sendSms("+201000000000", "SMS message text")'>
                      <span className="type">Intent</span>.<span className="function">sendSms</span>(<span className="string">&quot;+201000000000&quot;</span>, <span className="string">&quot;SMS message text&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.sendEmail("support@example.com", "App Support", "Message body")'>
                      <span className="type">Intent</span>.<span className="function">sendEmail</span>(<span className="string">&quot;support@example.com&quot;</span>, <span className="string">&quot;App Support&quot;</span>, <span className="string">&quot;Message body&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.shareText("Text to share")'>
                      <span className="type">Intent</span>.<span className="function">shareText</span>(<span className="string">&quot;Text to share&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.openMap(30.0444, 31.2357, "Cairo, Egypt")'>
                      <span className="type">Intent</span>.<span className="function">openMap</span>(<span className="number">30.0444</span>, <span className="number">31.2357</span>, <span className="string">&quot;Cairo, Egypt&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode="Intent.openAppSettings()">
                      <span className="type">Intent</span>.<span className="function">openAppSettings</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Intent.openPlayStore()">
                      <span className="type">Intent</span>.<span className="function">openPlayStore</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.content.Intent;">
                      <span className="keyword">import</span> com.zaitxcode.android.content.Intent;
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.browser.Browser;">
                      <span className="keyword">import</span> com.zaitxcode.android.browser.Browser;
                    </CodeLineRow>
                    <CodeLineRow rawCode='Browser.openUrl("https://docs.zaitxcode.com/androidhelper");'>
                      <span className="type">Browser</span>.<span className="function">openUrl</span>(<span className="string">&quot;https://docs.zaitxcode.com/androidhelper&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.openWhatsApp("+201000000000", "Hello from Java");'>
                      <span className="type">Intent</span>.<span className="function">openWhatsApp</span>(<span className="string">&quot;+201000000000&quot;</span>, <span className="string">&quot;Hello from Java&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.dial("+201000000000");'>
                      <span className="type">Intent</span>.<span className="function">dial</span>(<span className="string">&quot;+201000000000&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.sendSms("+201000000000", "SMS message");'>
                      <span className="type">Intent</span>.<span className="function">sendSms</span>(<span className="string">&quot;+201000000000&quot;</span>, <span className="string">&quot;SMS message&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.sendEmail("support@example.com", "Support", "Body");'>
                      <span className="type">Intent</span>.<span className="function">sendEmail</span>(<span className="string">&quot;support@example.com&quot;</span>, <span className="string">&quot;Support&quot;</span>, <span className="string">&quot;Body&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.shareText("Text to share");'>
                      <span className="type">Intent</span>.<span className="function">shareText</span>(<span className="string">&quot;Text to share&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode='Intent.openMap(30.0444, 31.2357, "Cairo, Egypt");'>
                      <span className="type">Intent</span>.<span className="function">openMap</span>(<span className="number">30.0444</span>, <span className="number">31.2357</span>, <span className="string">&quot;Cairo, Egypt&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="Intent.openAppSettings();">
                      <span className="type">Intent</span>.<span className="function">openAppSettings</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="Intent.openPlayStore();">
                      <span className="type">Intent</span>.<span className="function">openPlayStore</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="await _channel.invokeMethod('openWhatsApp', {'phone': '+201000000000'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;openWhatsApp&apos;</span>, &#123;<span className="string">&apos;phone&apos;</span>: <span className="string">&apos;+201000000000&apos;</span>&#125;);
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
                  <span className="card-title">📋 Clipboard.copyText, Vibration.vibrate &amp; Screen.blockCapture</span>
                </div>
              </div>
              <div className="card-desc">{t.secClipboardDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.content.Clipboard">
                      <span className="keyword">import</span> com.zaitxcode.android.content.Clipboard
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.hardware.Vibration">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Vibration
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.view.Screen">
                      <span className="keyword">import</span> com.zaitxcode.android.view.Screen
                    </CodeLineRow>
                    <CodeLineRow rawCode='Clipboard.copyText("Hello Android Helper")'>
                      <span className="type">Clipboard</span>.<span className="function">copyText</span>(<span className="string">&quot;Hello Android Helper&quot;</span>)
                    </CodeLineRow>
                    <CodeLineRow rawCode="val text: String? = Clipboard.getText()">
                      <span className="keyword">val</span> text: <span className="type">String?</span> = <span className="type">Clipboard</span>.<span className="function">getText</span>()
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
                    <CodeLineRow rawCode="Screen.blockCapture()">
                      <span className="type">Screen</span>.<span className="function">blockCapture</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode="Screen.unblockCapture()">
                      <span className="type">Screen</span>.<span className="function">unblockCapture</span>()
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.content.Clipboard;">
                      <span className="keyword">import</span> com.zaitxcode.android.content.Clipboard;
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.hardware.Vibration;">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Vibration;
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.view.Screen;">
                      <span className="keyword">import</span> com.zaitxcode.android.view.Screen;
                    </CodeLineRow>
                    <CodeLineRow rawCode='Clipboard.copyText("Hello from Java");'>
                      <span className="type">Clipboard</span>.<span className="function">copyText</span>(<span className="string">&quot;Hello from Java&quot;</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="String text = Clipboard.getText();">
                      <span className="type">String</span> text = <span className="type">Clipboard</span>.<span className="function">getText</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean hasText = Clipboard.hasCopiedText();">
                      <span className="type">boolean</span> hasText = <span className="type">Clipboard</span>.<span className="function">hasCopiedText</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="Clipboard.clear();">
                      <span className="type">Clipboard</span>.<span className="function">clear</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="Vibration.vibrate(200);">
                      <span className="type">Vibration</span>.<span className="function">vibrate</span>(<span className="number">200</span>);
                    </CodeLineRow>
                    <CodeLineRow rawCode="Screen.blockCapture();">
                      <span className="type">Screen</span>.<span className="function">blockCapture</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean blocked = Screen.isCaptureBlocked();">
                      <span className="type">boolean</span> blocked = <span className="type">Screen</span>.<span className="function">isCaptureBlocked</span>();
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="await _channel.invokeMethod('copyText', {'text': 'Hello'});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;copyText&apos;</span>, &#123;<span className="string">&apos;text&apos;</span>: <span className="string">&apos;Hello&apos;</span>&#125;);
                    </CodeLineRow>
                    <CodeLineRow rawCode="await _channel.invokeMethod('vibrate', {'ms': 200});">
                      <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>(<span className="string">&apos;vibrate&apos;</span>, &#123;<span className="string">&apos;ms&apos;</span>: <span className="number">200</span>&#125;);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Security & Biometrics Section */}
          <section id="security" className="section">
            <div className="section-header">{t.secSecurity}</div>
            <div className="card" data-reveal data-tilt="4">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-title">🔐 Biometric.canAuthenticate, Permission.isGranted &amp; AppHelper.log</span>
                </div>
              </div>
              <div className="card-desc">{t.secSecurityDesc}</div>
              {activeTab === "kotlin" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.hardware.Biometric">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Biometric
                    </CodeLineRow>
                    <CodeLineRow rawCode="val canBio: Boolean = Biometric.canAuthenticate()">
                      <span className="keyword">val</span> canBio: <span className="type">Boolean</span> = <span className="type">Biometric</span>.<span className="function">canAuthenticate</span>()
                    </CodeLineRow>
                    <CodeLineRow rawCode='AppHelper.log("AppTag", "Log diagnostic message")'>
                      <span className="type">AppHelper</span>.<span className="function">log</span>(<span className="string">&quot;AppTag&quot;</span>, <span className="string">&quot;Log diagnostic message&quot;</span>)
                    </CodeLineRow>
                  </div>
                </div>
              ) : activeTab === "java" ? (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="import com.zaitxcode.android.hardware.Biometric;">
                      <span className="keyword">import</span> com.zaitxcode.android.hardware.Biometric;
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.app.Permission;">
                      <span className="keyword">import</span> com.zaitxcode.android.app.Permission;
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.app.Signature;">
                      <span className="keyword">import</span> com.zaitxcode.android.app.Signature;
                    </CodeLineRow>
                    <CodeLineRow rawCode="import com.zaitxcode.android.core.AppHelper;">
                      <span className="keyword">import</span> com.zaitxcode.android.core.AppHelper;
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean canBio = Biometric.canAuthenticate();">
                      <span className="keyword">boolean</span> canBio = <span className="type">Biometric</span>.<span className="function">canAuthenticate</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode="boolean cameraGranted = Permission.isGranted(android.Manifest.permission.CAMERA);">
                      <span className="keyword">boolean</span> cameraGranted = <span className="type">Permission</span>.<span className="function">isGranted</span>(android.Manifest.permission.CAMERA);
                    </CodeLineRow>
                    <CodeLineRow rawCode="String sha1 = Signature.getAppPrimarySignatureSHA1();">
                      <span className="type">String</span> sha1 = <span className="type">Signature</span>.<span className="function">getAppPrimarySignatureSHA1</span>();
                    </CodeLineRow>
                    <CodeLineRow rawCode='AppHelper.log("JavaTag", "Log message from Java");'>
                      <span className="type">AppHelper</span>.<span className="function">log</span>(<span className="string">&quot;JavaTag&quot;</span>, <span className="string">&quot;Log message from Java&quot;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              ) : (
                <div className="code-snippet">
                  <div className="code-block">
                    <CodeLineRow rawCode="final result = await _channel.invokeMethod<String>('biometric');">
                      <span className="keyword">final</span> result = <span className="keyword">await</span> _channel.<span className="function">invokeMethod</span>&lt;<span className="type">String</span>&gt;(<span className="string">&apos;biometric&apos;</span>);
                    </CodeLineRow>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer" style={{ borderTop: "1px solid var(--border-color)", padding: "24px", textAlign: "center", marginTop: "40px" }}>
        <p>{t.footerText}</p>
      </footer>
    </div>
  );
}
