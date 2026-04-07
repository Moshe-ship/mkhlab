---
name: safha
description: "كاشط محتوى عربي — اجمع محتوى عربي من الويب، نظّفه، واكتشف لهجته. مخصص لتجهيز بيانات التدريب."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, safha]
---


# safha — كاشط المحتوى العربي

أداة لجمع وتنظيف المحتوى العربي من الويب لتجهيز بيانات التدريب.

## الأوامر

### كشط صفحة
```bash
safha scrape URL
```
يجمع المحتوى العربي ويحفظه بصيغة JSONL.

### كشط sitemap كامل
```bash
safha sitemap URL
```
يكشط جميع الروابط بالتوازي مع rate limiting.

### تنظيف البيانات
```bash
safha clean data.jsonl
```
10 خطوات تنظيف: حذف URLs، تطبيع الألف/الياء، إزالة التشكيل...

### اكتشاف اللهجة
```bash
safha detect data.jsonl
```
يصنّف كل نص حسب اللهجة (فصحى/مصري/خليجي/شامي/مغربي).

### إحصائيات
```bash
safha stats
```

## أعلام مفيدة
- `--output FILE` — ملف الخروج
- `--keep-tashkeel` — لا تحذف التشكيل

## متى تستخدم
- المستخدم يريد جمع بيانات تدريب عربية
- تنظيف بيانات خام من الويب
- تصنيف بيانات حسب اللهجة
