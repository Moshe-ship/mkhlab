---
name: hijri-calendar
description: Hijri date conversion and Islamic calendar events via Aladhan API
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [islamic, hijri, calendar, arabic]
---
# التقويم الهجري

## تحويل التواريخ

من ميلادي لهجري:
```bash
curl -s "https://api.aladhan.com/v1/gToH/DD-MM-YYYY"
```

من هجري لميلادي:
```bash
curl -s "https://api.aladhan.com/v1/hToG/DD-MM-YYYY"
```

التاريخ الهجري اليوم:
```bash
curl -s "https://api.aladhan.com/v1/gToH" | jq '.data.hijri'
```

## المناسبات الإسلامية الرئيسية

- 1 محرم: رأس السنة الهجرية
- 10 محرم: يوم عاشوراء
- 12 ربيع الأول: المولد النبوي
- 27 رجب: الإسراء والمعراج
- 15 شعبان: ليلة النصف من شعبان
- 1 رمضان: بداية رمضان
- 27 رمضان: ليلة القدر (تقريبا)
- 1 شوال: عيد الفطر
- 10 ذو الحجة: عيد الأضحى

عند السؤال عن مناسبة، احسب كم باقي عليها بالأيام.
