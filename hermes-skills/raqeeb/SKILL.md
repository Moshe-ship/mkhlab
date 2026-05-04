---
name: raqeeb
description: "فاحص RTL — اكتشف مشاكل الاتجاه من اليمين لليسار في HTML/CSS واحصل على تقييم RTL (0-100). استخدم لفحص المواقع العربية."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, raqeeb]
---


# raqeeb — فاحص RTL للمواقع العربية

أداة لاكتشاف مشاكل RTL في HTML/CSS مع تقييم من 0 إلى 100.

## الأوامر

### فحص ملفات محلية
```bash
raqeeb scan .
```
يفحص ملفات HTML/CSS ويعرض مشاكل RTL.

### فحص رابط
```bash
raqeeb url URL
```
يحمّل الصفحة ويشغّل جميع الفحوصات.

### تقرير كامل
```bash
raqeeb report .
```
تقرير جودة RTL مع تقييم من 0-100.

### إصلاح تلقائي
```bash
raqeeb fix .
```
يصلح مشاكل RTL الشائعة. أضف `--yes` لتخطي التأكيد.

### شرح الفحوصات
```bash
raqeeb explain
```
يشرح الـ24 فحص المقسمة على 8 فئات.

### إعداد CI
```bash
raqeeb init --write
```
يولّد GitHub Actions workflow لفحص RTL تلقائي.

## الفئات الـ8
Direction، CSS Layout، Text Rendering، Forms، Tables، Media، Navigation، Accessibility

## متى تستخدم
- المستخدم يبني موقع عربي ويريد فحص RTL
- مراجعة موقع قبل الإطلاق
- إعداد CI لفحص RTL تلقائي
