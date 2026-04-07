---
name: quran-search
description: Quran verse search and lookup via AlQuran Cloud API
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [islamic, quran, arabic, search]
---
# بحث في القرآن الكريم

## جلب آية بالرقم

```bash
curl -s "https://api.alquran.cloud/v1/ayah/SURAH:AYAH/ar.alafasy"
```

مثال — الآية 255 من البقرة (آية الكرسي):
```bash
curl -s "https://api.alquran.cloud/v1/ayah/2:255/editions/quran-uthmani,ar.alafasy"
```

## جلب سورة كاملة

```bash
curl -s "https://api.alquran.cloud/v1/surah/SURAH_NUMBER/quran-uthmani"
```

## بحث بالكلمة

```bash
curl -s "https://api.alquran.cloud/v1/search/KEYWORD/all/ar"
```

## عرض النتيجة

عند عرض آية:

سورة [اسم السورة] — آية [رقم]

﴿ نص الآية ﴾

- ما تفسّر من عندك — قل "للتفسير المفصل ارجع لتفسير ابن كثير أو الطبري"
- إذا طلب تفسير مختصر، اعطِ المعنى العام المتفق عليه فقط
- لا تجتهد في أحكام فقهية
