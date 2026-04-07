---
name: prayer-times
description: Prayer time lookup via Aladhan API for any city worldwide
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [islamic, prayer, aladhan, arabic]
---
# أوقات الصلاة

عندما يسأل المستخدم عن أوقات الصلاة:

1. اسأل عن المدينة إذا ما ذكرها
2. استخدم API أوقات الصلاة:

```bash
curl -s "https://api.aladhan.com/v1/timingsByCity?city=CITY&country=COUNTRY&method=4"
```

method=4 هو أم القرى (السعودية). استخدم:
- method=4 لدول الخليج
- method=5 لمصر (الهيئة المصرية)
- method=3 للعراق وتركيا (رئاسة الشؤون الدينية)
- method=2 لأمريكا الشمالية (ISNA)

3. اعرض النتيجة بشكل مرتب:

أوقات الصلاة — [المدينة]
[التاريخ الهجري]

- الفجر: XX:XX
- الشروق: XX:XX
- الظهر: XX:XX
- العصر: XX:XX
- المغرب: XX:XX
- العشاء: XX:XX

4. إذا سأل "متى صلاة [اسم]؟" اعطه وقت تلك الصلاة فقط
