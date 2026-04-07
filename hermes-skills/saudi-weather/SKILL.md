---
name: saudi-weather
description: "طقس المدن السعودية — استعلم عن درجة الحرارة والرطوبة والرياح في مدن المملكة. استخدم عندما يسأل المستخدم عن الطقس في مدينة سعودية."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, saudi-weather]
---


# طقس المدن السعودية

استعلام مباشر عن الطقس الحالي والتوقعات في المدن السعودية عبر Open-Meteo (مجاني بدون مفتاح).

## إحداثيات المدن السعودية

| المدينة | خط العرض | خط الطول |
|---------|----------|----------|
| الرياض | 24.71 | 46.67 |
| جدة | 21.54 | 39.17 |
| مكة المكرمة | 21.39 | 39.86 |
| المدينة المنورة | 24.47 | 39.61 |
| الدمام | 26.43 | 50.10 |
| أبها | 18.22 | 42.50 |
| تبوك | 28.38 | 36.57 |
| حائل | 27.52 | 41.69 |
| جازان | 16.89 | 42.55 |
| نجران | 17.49 | 44.13 |

## الطقس الحالي

### الرياض
```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=24.71&longitude=46.67&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia/Riyadh"
```

### جدة
```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=21.54&longitude=39.17&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia/Riyadh"
```

### مكة المكرمة
```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=21.39&longitude=39.86&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia/Riyadh"
```

### المدينة المنورة
```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=24.47&longitude=39.61&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia/Riyadh"
```

### الدمام
```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=26.43&longitude=50.10&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia/Riyadh"
```

### أبها
```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=18.22&longitude=42.50&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia/Riyadh"
```

### أي مدينة (استبدل الإحداثيات)
```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia/Riyadh"
```

## توقعات 7 أيام

```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=24.71&longitude=46.67&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code&timezone=Asia/Riyadh"
```

## جودة الهواء

```bash
curl -s "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=24.71&longitude=46.67&current=pm10,pm2_5,dust,uv_index&timezone=Asia/Riyadh"
```

### مؤشرات جودة الهواء
| المؤشر | جيد | مقبول | سيئ | خطير |
|--------|------|-------|------|-------|
| PM2.5 (ug/m3) | 0-12 | 12-35 | 35-55 | >55 |
| PM10 (ug/m3) | 0-54 | 54-154 | 154-254 | >254 |
| الغبار (ug/m3) | 0-50 | 50-100 | 100-200 | >200 |

## رموز الطقس (Weather Codes)

| الرمز | الوصف |
|-------|-------|
| 0 | صافي |
| 1-3 | غائم جزئياً |
| 45, 48 | ضباب |
| 51-55 | رذاذ |
| 61-65 | مطر |
| 71-77 | ثلج |
| 80-82 | زخات مطر |
| 95 | عواصف رعدية |
| 96, 99 | عواصف رعدية مع برد |

## تحذيرات العواصف الرملية

العواصف الرملية شائعة في السعودية خاصة في:
- الربيع (مارس - مايو): موسم الذروة
- المنطقة الوسطى والشرقية: الأكثر تأثراً

للتحقق من مستوى الغبار:
```bash
curl -s "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=24.71&longitude=46.67&current=dust,pm10&hourly=dust,pm10&timezone=Asia/Riyadh"
```

علامات العاصفة الرملية:
- مستوى الغبار > 200 ug/m3: **تحذير عاصفة رملية**
- PM10 > 300 ug/m3: **عاصفة رملية شديدة — تجنب الخروج**

## عرض النتيجة

### الطقس الحالي
🌡️ طقس [المدينة]:
- الحرارة: [X]°م (الإحساس: [Y]°م)
- الرطوبة: [X]%
- الرياح: [X] كم/س
- الحالة: [صافي/غائم/ممطر]
- الهطول: [X] مم

### جودة الهواء
🌡️ جودة الهواء في [المدينة]:
- PM2.5: [X] ug/m3 ([جيد/مقبول/سيئ])
- PM10: [X] ug/m3 ([جيد/مقبول/سيئ])
- الغبار: [X] ug/m3
- مؤشر الأشعة فوق البنفسجية: [X]

### توقعات أسبوعية
🌡️ توقعات [المدينة] لـ 7 أيام:
| اليوم | العظمى | الصغرى | الحالة |
|-------|--------|--------|--------|
| [اليوم] | [X]°م | [Y]°م | [الحالة] |

## متى تستخدم
- المستخدم يسأل عن الطقس في مدينة سعودية
- يريد معرفة درجة الحرارة أو الرطوبة
- يسأل "كم الحرارة في الرياض؟"
- يسأل عن توقعات الطقس
- يسأل عن عواصف رملية أو جودة الهواء
- يريد معرفة إذا كان الجو مناسباً للخروج

## تنبيه
- البيانات من Open-Meteo (مصادر: ECMWF, GFS, DWD)
- قد يوجد فرق بسيط عن القراءات المحلية
- لتوقعات أدق: المركز الوطني للأرصاد https://ncm.gov.sa

## المراجع
- Open-Meteo: https://open-meteo.com
- Open-Meteo Air Quality: https://open-meteo.com/en/docs/air-quality-api
- المركز الوطني للأرصاد: https://ncm.gov.sa
