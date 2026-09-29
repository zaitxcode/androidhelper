# خطة إعادة تصميم موقع التوثيق (docs.zaitxcode.com)

## الهدف
مزامنة موقع `docs` مع النمط البصري للموقع المرجعي `zaitxcode.github.io`: الثيم، الأنيمشن، تأثيرات 3D، سلوك النسخ، الفوتر، إصلاح تبويب Java، وتوحيد الإصدار مع JitPack.

## المراجع
- **الموقع المرجعي**: `/home/mohamedzaitoon/Projects/zaitxcode.github.io` (ملفات `index.html`, `styles.css`, `script.js`)
- **JitPack**: أحدث إصدار متاح لـ `com.github.zaitxcode/androidhelper` هو **1.0.0-alpha04** (alpha01=Error، alpha02/03/04=ok).

## القرارات المعتمدة (من المستخدم)
1. الثيم: تبديل **ثنائي** light/dark + حفظ في `localStorage` (إلغاء نظام system/dark/light الثلاثي).
2. 3D: يُطبَّق على **كل البطاقات بما فيها كتل الكود**.
3. النسخ: تعطيل تحديد النص في كامل الموقع، تفعيله للأكواد فقط، + زر نسخ **لكل سطر** + الإبقاء على زر Copy All.
4. الفوتر: **centered + sticky** أسفل الصفحة.
5. تبويب Java: **إصلاحه** وكتابة أمثلة Java صحيحة.
6. توثيق الأندرويد: **تحديث الإصدار لـ alpha04** في كل المواضع.
7. زر تحميل APK: **حذفه مؤقتاً** (الملف الفعلي alpha03).

---

## المرحلة 1: نظام الثيم (light/dark + حفظ)

### 1.1 `app/layout.tsx`
- استبدال `themeColor: "#0d1117"` الثابت بقيمة ديناميكية غير محددة، أو حذفها (سيُضبطها السكربت).
- **إضافة سكربت منع الوميض (FOUC)** قبل التفاعل داخل `<head>` — نسخة معدلة من سكربت الموقع المرجعي يقرأ `localStorage['zaitxcode-theme']`، وإن لم يوجد يستخدم `prefers-color-scheme`، ثم يضبط `data-theme` على `<html>`:
  ```js
  document.documentElement.setAttribute('data-theme', t);
  ```
- ملاحظة: المفتاح `zaitxcode-theme` لتوحيد المفتاح بين الموقعين.

### 1.2 `app/globals.css`
- استبدال `:root` (الداكن) و `[data-theme="light"]` بلوحة ألوان الموقع المرجعي:
  - داكن: `--bg-primary:#090d16`, `--bg-secondary:#111726`, `--bg-tertiary:#1b2236`, `--accent-blue:#38bdf8`, `--accent-green:#34d399`, `--accent-purple:#a855f7`.
  - فاتح: `#f8fafc`, `#ffffff`, `#f1f5f9`, `#0284c7`, `#16a34a`, `#9333ea`.
- إضافة متغيرات جديدة: `--bg-card`, `--nav-bg`, `--hero-glow`, `--orb-blue`, `--orb-purple`, `--btn-shadow`, `--icon-glow`, `--shadow-lg`, `--shadow-card`.
- **معالجة مشكلة الأيقونات الفاتحة**: استبدال `filter: none` بأيقونات `light/` من lobehub في الوضع الفاتح، أو إضافة `filter: invert(1)` — الأفضل تبديل `src` الأيقونة حسب الثيم (يجب التحقق بصرياً).

### 1.3 صفحات `app/page.tsx` + `app/androidhelper/page.tsx` + `ar/page.tsx`
- حذف `type ThemeMode` و `themeMode` state، استبداله بـ `theme: "dark"|"light"`.
- استبدال `cycleTheme()` بـ `toggleTheme()` تحفظ في `localStorage`.
- استبدال زر التبديل ثلاثي الأوضاع بزر **ثنائي** يعرض `bi-sun-fill` / `bi-moon-stars-fill` (نمط الموقع المرجعي).
- إضافة مستمع `prefers-color-scheme: light` يتدخل **فقط** عند عدم وجود تفضيل محفوظ.
- تحديث `meta[name=theme-color]` ديناميكياً (`#f8fafc` / `#090d16`).

---

## المرحلة 2: الأنيمشن (Scroll Reveal)

### 2.1 `app/globals.css` — إضافة
```css
[data-reveal] { opacity: 0; translate: 0 30px; transition: opacity .7s var(--reveal-delay,0ms) ease, translate .7s var(--reveal-delay,0ms) cubic-bezier(.2,.7,.3,1); }
[data-reveal].is-visible { opacity: 1; translate: 0 0; }
```
- **مهم**: استخدام `translate` (وليس `transform`) لعدم التعارض مع تأثير 3D الذي يستخدم `transform`.
- إضافة keyframes: `logoFloat`, `orbDrift`, `dotPulse`, `iconFloat`, `iconPop`, `iconBob`.
- إضافة كتلة `@media (prefers-reduced-motion: reduce)` لتعطيل الأنيمشن.

### 2.2 إنشاء `components/use-reveal.ts` (hook جديد)
- hook يستخدم `IntersectionObserver` (threshold 0.12, rootMargin `-8%`) لإضافة `is-visible`.
- يقرأ `data-delay` لضبط `--reveal-delay`.
- fallback: إضافة `is-visible` فوراً عند عدم توفر IntersectionObserver.

### 2.3 إضافة `data-reveal` + `data-delay` للعناصر في الصفحات الثلاث (الهيدر، البطاقات، الأقسام، الفوتر).

---

## المرحلة 3: تأثيرات 3D

### 3.1 إنشاء `components/use-tilt.ts` (hook جديد)
- يحول منطق `script.js` (أقسام 3D Tilt + 4 Parallax) إلى React.
- دالة `bindTilt(ref, maxTilt)` تستجيب لـ `pointermove`/`pointerleave`/`touchmove` وتضبط:
  ```js
  el.style.transform = `perspective(1100px) rotateX(rx) rotateY(ry) scale(1.015)`
  ```
- دعم `deviceorientation` مع طلب إذن iOS 13+.
- يُعطَّل عند `prefers-reduced-motion`.

### 3.2 `app/globals.css` — إضافة
```css
.grid-3, .layout, .content { perspective: 1200px; }
.card, .feature-card, .ai-prompt-box, .code-block {
  transform-style: preserve-3d; backface-visibility: hidden;
  transition: ..., transform .25s ease-out, box-shadow .3s ease, border-color .3s ease;
}
.card-title, .card-desc, .section-header, .code-line-text { transform: translateZ(10-38px); }
```
- إضافة توهج حدودي `::before` على hover (gradient mask) كما في المرجع.
- إضافة orbs متوهجة (`.orb-1`, `.orb-2`) في خلفية صفحة البوابة.

### 3.3 إضافة `data-tilt="4"` (لطفيف) على كل `.card` في `androidhelper/page.tsx` و `ar/page.tsx`، و `data-tilt="9"` على بطاقة البوابة.

---

## المرحلة 4: سلوك النسخ

### 4.1 `app/globals.css`
- **الإبقاء** على `user-select: none` على `body` (موجود سطر 69).
- **جديد**: `.code-block, .code-block * { user-select: text; -webkit-user-select: text; }` (السماح بتحديد الكود فقط).
- **تفعيل** `.code-line-copy-btn` (موجودة سطر 553 لكنها غير مستخدمة): تظهر عند `hover` على السطر، `opacity: 0 → 1`.
- **حذف** `.selectable-text` غير المستخدم.

### 4.2 `CodeLineRow` في `androidhelper/page.tsx` و `ar/page.tsx`
- **إصلاح prop غير المستخدم `rawCode`**: إضافة زر نسخ صغير داخل كل سطر:
  ```tsx
  <div className="code-line-row">
    <span className="code-line-text">{children}</span>
    <button className="code-line-copy-btn" onClick={() => handleCopy(`line-${id}`, rawCode)}>
      {copiedId === `line-${id}` ? "✓" : <i className="bi bi-clipboard"></i>}
    </button>
  </div>
  ```
- الإبقاء على زر **Copy All** لكل بطاقة (يستخدم نص raw الكامل).
- **إزالة** `type CodeBlockData` و `CodeLineRow` prop الميت، واستخدام `rawCode` فعلياً.

### 4.3 حذف أو تجاهل `components/copy-button.tsx` (غير مستخدم أصلاً ويعتمد lucide-react).

---

## المرحلة 5: الفوتر (centered + sticky)

### 5.1 `app/globals.css` — جديد
```css
footer {
  position: sticky; bottom: 0; z-index: 50;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  padding: 24px 16px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  text-align: center; width: 100%;
  backdrop-filter: blur(12px);
}
footer p { font-size: .85rem; color: var(--text-muted); }
```
- على الجوال: `flex-direction: column` + `align-items: center` (مثل المرجع).

### 5.2 صفحات `androidhelper/page.tsx` + `ar/page.tsx`
- الفوتر الحالي `<footer><p>{t.footerText}</p></footer>` **بلا تنسيق** — يحتاج أضافة class وتوسيط (شعار + روابط + حقوق نشر عمودياً وسطياً، مثل المرجع).

### 5.3 `app/page.tsx` (البوابة)
- استبدال الفوتر المدمج داخل `<main>` (سطر 157) بفوتر sticky مستقل موسَّط.

---

## المرحلة 6: إصلاح تبويب Java

### 6.1 المشكلة
- `activeTab: "kotlin"|"java"|"flutter"` يُقبل، لكن **جميع** الـ 37 شرطاً ثنائية: `activeTab === "kotlin" ? <Kotlin/> : <Flutter/>` → اختيار Java يعرض **Flutter**.

### 6.2 الحل في `androidhelper/page.tsx` + `ar/page.tsx`
- تحويل كل شرط ثنائي إلى **ثلاثي**: `activeTab === "kotlin" ? ... : activeTab === "java" ? ... : ...`.
- كتابة أمثلة Java صحيحة (10 أقسام) باستدعاءات `@JvmStatic`، مثال:
  ```java
  import com.zaitxcode.android.core.AppHelper;
  AppHelper.initialize(this);
  boolean isOnline = Network.isConnected();
  ```
- إصلاح `lang-tag` لعرض اللغة الفعلية (Kotlin/Java/Flutter).
- إضافة زر Copy All لكل لغة (java-k مثلاً).
- أقسام التثبيت: Java يستخدم Groovy DSL (`build.gradle`) + `@JvmStatic` initialize.

### 6.3 التحقق
- فحص كل `activeTab` لا يوجد فيه فرع Java، وتغطية الثلاثة المسارات.

---

## المرحلة 7: توحيد الإصدار (alpha04)

### 7.1 مواضع التحديث (19 مكاناً)

**app/page.tsx** (1): سطر 107 badge — **صحيح بالفعل alpha04** ✓

**app/androidhelper/page.tsx** (9): الأسطر 342, 421, 425, 510, 514, 525, 527, 544, 546 → alpha04 (مع حذف 421/425 زر APK).

**app/androidhelper/ar/page.tsx** (9): الأسطر 284, 364, 368, 453, 457, 468, 470, 487, 489 → alpha04.

**public/** (ملفات llms): 
- `public/llms.txt` (alpha02), `public/llms.md` (alpha03)
- `public/llms-full.txt` + `.md` (سطر 5, 16)
- `public/androidhelper/llms.txt` (alpha02), `public/androidhelper/llms.md` (alpha03)
- `public/androidhelper/llms-full.txt` + `.md` (سطر 5, 16)
- `public/index.html` (الموقع الثابت القديم): الأسطر 20, 104, 137

### 7.2 حذف زر APK
- حذف عنصر `<a href="/androidhelper/app-release.apk" download="AndroidHelper-Demo-v1.0.0-alpha03.apk">` (سطر 419-426 في EN، 362-369 في AR).
- **الإبقاء** على ملفات APK على القرص (لا تُحذف، فقط الزر يُحذف).

### 7.3 التحقق النهائي
- بعد التعديل: `grep -rn "alpha0[0-9]" app public | grep -v alpha04` يجب أن يُرجع **فارغاً**.

---

## المرحلة 8: تنظيف اختياري (لم يُطلب صراحة — موصى به)
- حذف `data/sections.ts` (مرجع `Utils.initialize` + `1.4.0` القديم).
- حذف `public/index.html` + `public/app.js` + `public/styles.css` (الموقع الثابت القديم) — يقلل الحزمة ~30KB.
- توحيد ملفات llms المكررة (public/ + public/androidhelper/) — 4 ملفات + APK مكرر.
- إصلاح `manifest.json` (description، theme_color).

---

## التحقق الشامل (Validation)
1. `npx tsc --noEmit` — يجب أن يمر (حالياً يمر).
2. `npm run build` — يجب أن ينجح.
3. **الثيم**: تبديل light/dark + الحفظ عبر `localStorage` + التطابق البصري مع zaitxcode.com.
4. **3D**: الميلان يستجيب للماوس/اللمس، ولا يكسر نسخ الكود.
5. **النسخ**: التحديد معطَّل خارج الكتل، فعّال داخلها، زر كل سطر يعمل.
6. **Java**: يعرض أمثلة Java حقيقية.
7. **الإصدار**: كل المواضع alpha04 (مرجع JitPack).
8. **الفوتر**: sticky + centered في كل الصفحات وفي الجوال.
9. **الأنيمشن**: reveal يعمل + `prefers-reduced-motion` يعطِّله.

## المخاطر
- **FOUC**: يجب ضبط `data-theme` قبل paint (سكربت head) وإلا يومض الوضع عند التحميل.
- **تعارض transform**: reveal يستخدم `translate`، و tilt يستخدم `transform` — فصل مقصود لتجنب التعارض.
- **أداء 3D**: تطبيق tilt على ~30 بطاقة + blur orbs قد يثقل الأجهزة الضعيفة؛ استخدام will-change بحذر.
- **React hydration**: سكربت الثيم في `<head>` يجب ألَّا يتعارض مع hydration (يُكتب فقط attribute على html، لا يغير DOM التطبيق).
- **النسخ في الجوال**: أزرار السطر يجب ألا تغطي النص في الشاشات الصغيرة.

## التسليم
- لا يتم النشر تلقائياً. التعديلات تبقى محلية حتى مراجعتك.
- يمكن تنفيذ المراحل 1-7 بالترتيب، كل مرحلة قائمة بذاتها وقابلة للتحقق.
