---
name: tashkeel
description: Arabic diacritization (tashkeel) via Mishkal and Farasa APIs
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [language, diacritization, tashkeel, arabic]
---
# التشكيل العربي

## متى تستخدم
- المستخدم يطلب تشكيل نص
- يريد نطق صحيح لكلمة
- نص قرآني أو شعري يحتاج تشكيل

## API التشكيل

### Mishkal API (مجاني)
```bash
curl -s -X POST "https://mishkal.net/api/tashkeel" \
  -H "Content-Type: application/json" \
  -d '{"text": "النص العربي هنا"}'
```

### بديل: Farasa API
```bash
curl -s -X POST "https://farasa-api.qcri.org/diacritize" \
  -H "Content-Type: application/json" \
  -d '{"text": "النص العربي هنا"}'
```

## عرض النتيجة

النص المشكّل:

[النص مع الحركات]

## الحركات الأساسية
| الحركة | الرمز | المثال |
|--------|-------|--------|
| فتحة | َ | كَتَبَ |
| ضمة | ُ | كُتُبٌ |
| كسرة | ِ | بِسْمِ |
| سكون | ْ | مِنْ |
| شدة | ّ | محمَّد |
| تنوين فتح | ً | كتابا |
| تنوين ضم | ٌ | كتابٌ |
| تنوين كسر | ٍ | كتابٍ |

## القواعد
- لا تشكّل نص بلهجة عامية — التشكيل للفصحى فقط
- إذا النص قرآني، تأكد من التشكيل بالرجوع للمصحف
- إذا كلمة تحتمل أكثر من تشكيل، اذكر الاحتمالات مع المعنى
