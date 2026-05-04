---
name: majal
description: "فاحص بيانات التدريب العربية — اكتشف مشاكل الترميز والمحتوى المخفي وخلط اللهجات في ملفات JSONL. استخدم لتنظيف بيانات التدريب."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, majal]
---


# majal — فاحص بيانات التدريب العربية

أداة لفحص جودة بيانات التدريب العربية عبر 16 فحص.

## الأوامر

### فحص البيانات
```bash
majal scan data.jsonl
```
يعرض جدول بالمشاكل المكتشفة مع مستوى الخطورة.

### إحصائيات
```bash
majal stats data.jsonl
```
إحصائيات شاملة: توزيع اللغات، التوكنات، الحقول.

### إصلاح تلقائي
```bash
majal fix data.jsonl
```
يعرض diff قبل التطبيق. أضف `--yes` لتخطي التأكيد.

### شرح الفحوصات
```bash
majal explain
```

### عيّنة عشوائية
```bash
majal sample data.jsonl
```
يعرض عيّنة مع ملاحظات الجودة.

## الفئات الـ16
Encoding، Invisible، Content، Arabic، Format

## متى تستخدم
- المستخدم يجهّز بيانات تدريب عربية
- يريد فحص جودة dataset
- يشك بمشاكل ترميز أو محتوى مخفي
