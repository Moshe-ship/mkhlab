---
name: bidi-guard
description: BiDi text validation and Trojan Source attack detection (CVE-2021-42574)
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [bidi-guard]
  env_vars: []
metadata:
  hermes:
    tags: [nlp, security, bidi, unicode, arabic]
---
# bidi-guard — حماية من هجمات Bidi

أداة لاكتشاف حروف Unicode الاتجاهية المخفية التي تُستخدم في هجمات Trojan Source.

## الأوامر

### فحص ملفات
```bash
bidi-guard scan PATH
```
يفحص الملفات ويعرض الحروف المخفية مع السياق.

### وضع CI
```bash
bidi-guard ci
```
يرجع exit code غير صفري إذا وجد حروف خطيرة. مناسب لـ GitHub Actions.

### إصلاح تلقائي
```bash
bidi-guard fix
```
يحذف حروف bidi (تفاعلي بالافتراضي).

### شرح الهجمة
```bash
bidi-guard explain
```
يوضح كل حرف bidi وكيف يُستغل مع أمثلة.

## متى تستخدم
- المستخدم يفحص كود مفتوح المصدر
- إعداد CI/CD pipeline
- مراجعة pull request يحتوي نص عربي في الكود
