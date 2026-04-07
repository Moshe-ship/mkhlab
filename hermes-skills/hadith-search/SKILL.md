---
name: hadith-search
description: Hadith search across Bukhari, Muslim, and 7 other collections
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [islamic, hadith, arabic, search]
---
# بحث في الأحاديث النبوية

## البحث عن حديث

### جلب حديث بالرقم (بدون API key)
```bash
# صحيح البخاري — حديث رقم 1
curl -s "https://api.hadith.gading.dev/books/bukhari?range=1-1"

# صحيح مسلم — أحاديث 1 إلى 5
curl -s "https://api.hadith.gading.dev/books/muslim?range=1-5"
```

### الكتب المتاحة
```bash
# قائمة الكتب
curl -s "https://api.hadith.gading.dev/books"
```

| الكود | الكتاب | عدد الأحاديث |
|-------|--------|-------------|
| `bukhari` | صحيح البخاري | 6,638 |
| `muslim` | صحيح مسلم | 4,930 |
| `tirmidzi` | سنن الترمذي | 3,625 |
| `abu-daud` | سنن أبي داود | 4,419 |
| `nasai` | سنن النسائي | 5,364 |
| `ibnu-majah` | سنن ابن ماجه | 4,285 |
| `malik` | موطأ مالك | 1,594 |
| `ahmad` | مسند أحمد | 4,305 |
| `darimi` | سنن الدارمي | 2,949 |

## عرض النتيجة

[اسم الكتاب] — حديث رقم [X]

> نص الحديث

- الراوي: [اسم الصحابي]
- الدرجة: [صحيح/حسن/ضعيف] إذا متاحة

## تنبيهات
- لا تحكم على صحة حديث من عندك
- إذا سأل عن حكم حديث، وجّه لموقع الدرر السنية أو إسلام ويب
- لا تستخدم أحاديث موضوعة أو ضعيفة جدا بدون تنبيه
