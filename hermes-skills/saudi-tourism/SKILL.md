---
name: saudi-tourism
description: "السياحة في السعودية — Saudi tourism attractions, events, visa info, and tourism APIs"
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, saudi-tourism]
---


# السياحة في المملكة العربية السعودية

واجهات برمجية ومصادر بيانات مفتوحة للسياحة السعودية — الوجهات، الفعاليات، التأشيرات، والمواسم.

## الإعداد

### Visit Saudi Partner API
1. سجّل كشريك في: `https://partner.visitsaudi.com/en/partner-tools/api-center.html`
2. احصل على مفتاح الـ API بعد الموافقة
3. استخدم المفتاح في طلبات المحتوى السياحي

### صندوق التنمية السياحية (البيانات المفتوحة)
- لا يحتاج تسجيل — بيانات مفتوحة على: `https://tdf.gov.sa/en/open-data`

## استعلام المحتوى السياحي (Visit Saudi API)

```bash
# جلب المعالم السياحية
curl -X GET "https://api.visitsaudi.com/v1/attractions" \
  -H "Authorization: Bearer ${VISITSAUDI_API_KEY}" \
  -H "Accept: application/json" \
  -H "Accept-Language: ar"
```

```bash
# جلب الفعاليات الحالية
curl -X GET "https://api.visitsaudi.com/v1/events" \
  -H "Authorization: Bearer ${VISITSAUDI_API_KEY}" \
  -H "Accept: application/json" \
  -H "Accept-Language: ar"
```

## أبرز الوجهات السياحية

| الوجهة | أبرز المعالم |
|--------|-------------|
| **الرياض** | الدرعية التاريخية، بوليفارد رياض سيتي، حي الطريف |
| **جدة** | البلد التاريخي، الكورنيش، نافورة الملك فهد |
| **العلا** | مدائن صالح (الحِجر)، جبل الفيل، مرايا |
| **نيوم** | ذا لاين، تروجينا، سندالة |
| **عسير** | أبها، السودة، رجال ألمع |
| **ساحل البحر الأحمر** | مشروع البحر الأحمر، أملج |

## التأشيرة السياحية

التأشيرة الإلكترونية متاحة لمواطني 49+ دولة عبر: `https://visa.visitsaudi.com`

## المواسم والفعاليات الكبرى

- **موسم الرياض** — ترفيه، مطاعم، حفلات (أكتوبر–مارس)
- **موسم جدة** — فعاليات بحرية وثقافية (يونيو–يوليو)
- **لحظات العلا** (AlUla Moments) — فنون، موسيقى، مغامرات (أكتوبر–مارس)

## عرض النتيجة

```
🕌 معلومات سياحية — السعودية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
الوجهة: {{destination}}
النوع: {{type}}
التفاصيل: {{details}}
```

## متى تستخدم

- المستخدم يسأل عن **السياحة في السعودية** أو **زيارة السعودية**
- الاستفسار عن **التأشيرة السياحية**
- السؤال عن **المعالم** أو **الوجهات** السياحية
- الاستعلام عن **المواسم** أو **الفعاليات** (موسم الرياض، موسم جدة، العلا)
- أي ذكر لـ **Visit Saudi**

## المراجع

- Visit Saudi: https://visitsaudi.com
- Partner API: https://partner.visitsaudi.com/en/partner-tools/api-center.html
- صندوق التنمية السياحية: https://tdf.gov.sa
- التأشيرة الإلكترونية: https://visa.visitsaudi.com
