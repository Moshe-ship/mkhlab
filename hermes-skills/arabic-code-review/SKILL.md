---
name: arabic-code-review
description: "مراجعة كود عربي — راجع الكود مع فحص التعامل مع النصوص العربية وRTL والتعليقات العربية"
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: []
  env_vars: []
metadata:
  hermes:
    tags: [arabic, code-review, rtl, unicode, i18n]
---

# مراجعة الكود العربي

مراجعة متخصصة للكود الذي يتعامل مع النصوص العربية. استخدم عندما يطلب المستخدم مراجعة كود يتعامل مع العربي.

## الفحوصات

### 1. ترميز Unicode
- هل الملفات محفوظة بـ UTF-8?
- هل يتعامل مع BOM بشكل صحيح?
- هل يعالج الحروف المركبة (combining characters)?

### 2. اتجاه النص (RTL)
- هل يستخدم `dir="rtl"` في HTML?
- هل CSS يستخدم `direction: rtl` و `text-align: right`?
- هل يستخدم Logical Properties (`margin-inline-start` بدل `margin-left`)?
- هل الأيقونات والأسهم معكوسة؟

### 3. معالجة النصوص العربية
- هل يتعامل مع التشكيل بشكل صحيح?
- هل يعمل regex مع العربي? (`\p{Arabic}` بدل `[a-zA-Z]`)
- هل الفرز (sorting) يستخدم `Intl.Collator('ar')`?
- هل البحث يطبّع الألف/الياء (أ/إ/آ → ا، ي → ى)?

### 4. الأرقام
- هل يدعم الأرقام العربية (٠١٢٣٤٥٦٧٨٩)?
- هل يستخدم `toLocaleString('ar')` للتنسيق?
- هل التاريخ يدعم التقويم الهجري?

### 5. أخطاء شائعة
```javascript
// خطأ: ما يشمل العربي
const isLetter = /[a-zA-Z]/.test(char);

// صح: يشمل كل اللغات
const isLetter = /\p{Letter}/u.test(char);

// خطأ: طول النص مع التشكيل
const len = text.length; // يحسب الحركات كحروف

// صح: تطبيع ثم حساب
const len = text.normalize('NFC').replace(/[\u064B-\u065F]/g, '').length;

// خطأ: فرز عربي
names.sort();

// صح: فرز بالعربي
names.sort(new Intl.Collator('ar').compare);

// خطأ: بحث بدون تطبيع
text.includes("محمد");

// صح: تطبيع الألف والتاء المربوطة
function normalizeArabic(t) {
  return t.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
}
normalizeArabic(text).includes(normalizeArabic("محمد"));
```

## صيغة المراجعة

مراجعة الكود العربي:

| # | الملف | المشكلة | الخطورة | الإصلاح |
|---|-------|---------|---------|---------|
| 1 | file.js:12 | regex لا يدعم العربي | عالية | استخدم `\p{Letter}` |
| ... | | | | |

**التقييم**: [X/10] جاهزية عربية

## متى تستخدم
- المستخدم يبني تطبيق عربي أو ثنائي اللغة
- يطلب مراجعة كود يتعامل مع نصوص عربية
- يسأل "هل الكود يدعم العربي بشكل صحيح?"
