---
name: arabic-web-search
description: "بحث ويب عربي — ابحث في الإنترنت بالعربي مع أولوية للمواقع العربية الموثوقة. استخدم عندما يسأل المستخدم سؤال يحتاج معلومات حديثة."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, arabic-web-search]
---


# بحث ويب عربي

بحث محسّن للمحتوى العربي مع أولوية للمصادر الموثوقة.

## البحث

### DuckDuckGo (بدون API key)
```bash
curl -s "https://api.duckduckgo.com/?q=QUERY&format=json&kl=xa-ar"
```
`kl=xa-ar` يحدد المنطقة العربية.

### SearXNG (بديل مفتوح)
```bash
curl -s "https://searx.be/search?q=QUERY&language=ar&format=json"
```

## المواقع العربية الموثوقة حسب المجال

### أخبار
- aljazeera.net — الجزيرة
- alarabiya.net — العربية
- bbc.com/arabic — BBC عربي

### ديني
- islamweb.net — إسلام ويب
- dorar.net — الدرر السنية
- quran.ksu.edu.sa — مصحف المدينة

### تقنية
- arageek.com — أراجيك
- unlimit-tech.com — أنليمتد
- aitnews.com — عالم التقنية

### طبي
- webteb.com — ويب طب
- altibbi.com — الطبي

### تعليمي
- wikipedia.org/wiki/ar — ويكيبيديا العربية
- marefa.org — المعرفة

## القواعد
- أضف `site:*.ar OR site:*.sa OR site:*.eg OR site:*.ae` لتفضيل المواقع العربية
- إذا النتائج بالإنجليزي، لخّصها بالعربي
- تحقق من تاريخ المقال — نبّه إذا قديم
- للمواضيع الدينية: أولوية لـ islamweb.net و dorar.net
- للمواضيع الطبية: أولوية لـ webteb.com مع تنبيه "استشر طبيب"
