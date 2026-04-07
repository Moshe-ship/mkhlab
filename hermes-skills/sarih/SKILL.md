---
name: sarih
description: Arabic sentiment analysis and content filtering across 5 dialects
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [sarih]
  env_vars: []
metadata:
  hermes:
    tags: [nlp, sentiment, content-filter, arabic]
---
# sarih — فلتر المحتوى العربي

أداة لاكتشاف المحتوى السام بـ5 لهجات عربية، تعمل بالكامل بدون إنترنت.

## الأوامر

### فحص نص واحد
```bash
sarih check "النص المراد فحصه"
```
يرجع مستوى الخطورة: safe / low / medium / high.

### فحص ملف بيانات
```bash
sarih scan data.jsonl
```

### تنظيف البيانات
```bash
sarih clean data.jsonl --output cleaned.jsonl
```
يحذف أو يعدّل المحتوى المخالف.

### إحصائيات الفحص
```bash
sarih stats
```

### شرح الفلاتر
```bash
sarih explain
```
يشرح الـ13 فلتر والـ3 مستويات خطورة.

## متى تستخدم
- المستخدم يريد فحص محتوى قبل النشر
- تنظيف بيانات تدريب من المحتوى السام
- فحص تعليقات أو رسائل مستخدمين
