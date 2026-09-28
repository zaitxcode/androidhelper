// Bilingual Dictionary
const translations = {
  ar: {
    docTitle: 'AndroidHelper Documentation - توثيق مكتبة AndroidHelper',
    brandName: 'AndroidHelper',
    searchPlaceholder: 'ابحث في التوثيق...',
    navOverview: '📌 النظرة العامة (Overview)',
    navInstallation: '📦 التثبيت والإعداد',
    navNetwork: '🌐 الشبكة والاتصال',
    navIntents: '🔗 المقاصد (Intents)',
    navClipboard: '📋 الحافظة والاهتزاز والمنع',
    navNotifications: '🔔 الإشعارات ولوحة المفاتيح',
    navDevice: '📱 الجهاز والتطبيق والبطارية',
    navData: '💾 البيانات والتخزين والتشفير',
    navSecurity: '🔐 الأمان والبصمة واللوجر',
    secOverviewTitle: 'AndroidHelper Documentation',
    pillAndroid: '✓ Android 17 (API 37) Ready',
    pillCoroutines: '✓ Kotlin Coroutines & DataStore',
    pillBridge: '✓ Flutter MethodChannel Bridge',
    tabKotlin: '🟣 Kotlin / Android Native',
    tabFlutter: '🔵 Flutter / Dart Bridge',
    secInstall: '📦 التثبيت والإعداد (Installation)',
    secInstallDesc: 'أضف التبعية الخاصة بالمكتبة ثم قم بتهيئتها داخل Application class.',
    secNetwork: '🌐 الشبكة والاتصال (Network)',
    secNetworkDesc: 'التحقق من حالة الاتصال بالإنترنت والاتصال المزدوج والإنترنت المؤكد.',
    secIntents: '🔗 المقاصد والأفعال الخارجية (Intents)',
    secIntentsDesc: 'فتح الروابط، محادثات الواتساب، الاتصال المباشر، وإرسال البريد الإلكتروني فورياً.',
    secClipboard: '📋 الحافظة والاهتزاز وحظر الشاشة',
    secClipboardDesc: 'تشغيل الاهتزاز الفعلي المتوافق مع Android 13-16، النسخ للحافظة، وحظر التقاط الشاشة.',
    secNotif: '🔔 الإشعارات ولوحة المفاتيح',
    secNotifDesc: 'إنشاء قنوات الإشعارات وعرض إشعارات مخصصة، وإخفاء لوحة المفاتيح.',
    secDevice: '📱 معلومات الجهاز والبطارية والتطبيق',
    secDeviceDesc: 'استعلام تفاصيل اسم وموديل الجهاز، مستوى ونوع شحن البطارية، وحالة التطبيق.',
    secData: '💾 البيانات والتخزين والتشفير',
    secDataDesc: 'قراءة وكتابة وحذف الملفات، تشفير SHA-256 و SHA-512 و HMAC، وتشفير Base64.',
    secSecurity: '🔐 الأمان والبصمة واللوجر',
    secSecurityDesc: 'مصادقة البصمة الفعالة، استخراج توقيع التطبيق الرقمي SHA-1، وتدقيق السجلات.',
    footerText: 'AndroidHelper Documentation © 2025-2027.'
  },
  en: {
    docTitle: 'AndroidHelper Documentation',
    brandName: 'AndroidHelper',
    searchPlaceholder: 'Search documentation...',
    navOverview: '📌 Overview',
    navInstallation: '📦 Installation',
    navNetwork: '🌐 Network Helpers',
    navIntents: '🔗 Intents & Actions',
    navClipboard: '📋 Clipboard, Vibration & Screen',
    navNotifications: '🔔 Notifications & Keyboard',
    navDevice: '📱 Device, Battery & App Info',
    navData: '💾 Data, Storage & Crypto',
    navSecurity: '🔐 Security, Biometric & Logger',
    secOverviewTitle: 'AndroidHelper Documentation',
    pillAndroid: '✓ Android 17 (API 37) Ready',
    pillCoroutines: '✓ Kotlin Coroutines & DataStore',
    pillBridge: '✓ Flutter MethodChannel Bridge',
    tabKotlin: '🟣 Kotlin / Android Native',
    tabFlutter: '🔵 Flutter / Dart Bridge',
    secInstall: '📦 Installation',
    secInstallDesc: 'Add the library dependency to your module build configuration, then initialize it in Application class.',
    secNetwork: '🌐 Network Helpers',
    secNetworkDesc: 'Check internet connectivity, validated connection, and transport type.',
    secIntents: '🔗 Intents & External Actions',
    secIntentsDesc: 'Open URLs, WhatsApp chats, dialer, SMS, and send emails directly.',
    secClipboard: '📋 Clipboard, Vibration & Screen',
    secClipboardDesc: 'Trigger physical vibration motor (Android 13-16 ready), clipboard, and screen capture block.',
    secNotif: '🔔 Notifications & Keyboard',
    secNotifDesc: 'Create notification channels, show custom notifications, and hide input keyboard.',
    secDevice: '📱 Device, Battery & App Info',
    secDeviceDesc: 'Query device model, battery status/charging type, and foreground application state.',
    secData: '💾 Data, Storage & Crypto',
    secDataDesc: 'File write/read/delete operations, SHA-256, SHA-512, HMAC, and Base64 encoding.',
    secSecurity: '🔐 Security, Biometric & Logger',
    secSecurityDesc: 'Prompt biometric authentication, extract app SHA-1 signature, and log diagnostics.',
    footerText: 'AndroidHelper Documentation © 2025-2027.'
  }
};

// State
let currentLang = localStorage.getItem('lang') || 'ar';
let currentThemeMode = localStorage.getItem('themeMode') || 'system';
let activeTab = 'kotlin';

// Initialize Page
window.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  applyThemeMode(currentThemeMode);
  preventGlobalSelection();
});

// Switch Language (Arabic / English)
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.ar;
  document.title = dict.docTitle;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Update text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      if (el.tagName === 'INPUT') {
        el.placeholder = dict[key];
      } else {
        el.innerText = dict[key];
      }
    }
  });

  document.getElementById('lang-btn-text').innerText = lang === 'ar' ? 'EN' : 'عربي';
}

function toggleLanguage() {
  setLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

// Auto & Manual Dark Mode Switcher
function setThemeMode(mode) {
  currentThemeMode = mode;
  localStorage.setItem('themeMode', mode);
  applyThemeMode(mode);
}

function applyThemeMode(mode) {
  let isDark = false;
  if (mode === 'system') {
    isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } else {
    isDark = mode === 'dark';
  }

  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-icon').innerText = isDark ? '🌙' : '☀️';
}

function cycleThemeMode() {
  if (currentThemeMode === 'system') setThemeMode('dark');
  else if (currentThemeMode === 'dark') setThemeMode('light');
  else setThemeMode('system');
}

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (currentThemeMode === 'system') {
      applyThemeMode('system');
    }
  });
}

// Tab Switcher (Kotlin vs Flutter)
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  document.querySelectorAll('.code-snippet').forEach(snippet => {
    snippet.style.display = snippet.dataset.lang === tab ? 'block' : 'none';
  });
}

// Copy Code Snippet Only
function copyCode(btn, codeId) {
  const codeText = document.getElementById(codeId).innerText;
  navigator.clipboard.writeText(codeText).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>✓ Copied</span>';
    btn.style.color = '#3fb950';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.color = '';
    }, 2000);
  });
}

// Prevent Selection Outside Code Blocks
function preventGlobalSelection() {
  document.addEventListener('selectstart', (e) => {
    if (!e.target.closest('.code-block') && !e.target.closest('.selectable-text')) {
      e.preventDefault();
    }
  });
}

// Live Search Filter
function filterDocs(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.card').forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? 'block' : 'none';
  });
}

// Smooth scroll & Sidebar active link update
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    // Close mobile drawer if open
    document.querySelector('.sidebar')?.classList.remove('open');
  }
}

function toggleMobileSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}
