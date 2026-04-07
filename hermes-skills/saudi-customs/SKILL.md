---
name: saudi-customs
description: الجمارك والتجارة السعودية -- استعلام عن الجمارك والاستيراد والتصدير عبر فسح وZATCA
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: [FASAH_TOKEN]
metadata:
  hermes:
    tags: [saudi, customs, trade, fasah, zatca, import, export, hs-code]
---

# الجمارك والتجارة في المملكة العربية السعودية

منصات وواجهات برمجية للجمارك السعودية -- فسح، هيئة الزكاة والضريبة والجمارك (ZATCA)، التخليص الجمركي، والتعريفات.

## فسح (Fasah)

**فسح** هي المنصة الموحدة للاستيراد والتصدير التابعة لهيئة الزكاة والضريبة والجمارك (ZATCA). تقدّم 135 خدمة وتربط 25+ جهة حكومية.

### الإعداد

1. سجّل في بوابة فسح: `https://fasah.zatca.gov.sa`
2. أكمل التحقق من الهوية والسجل التجاري
3. احصل على بيانات الاعتماد للربط البرمجي

### الاستعلام عن حالة شحنة

```bash
curl -X GET "https://api.fasah.zatca.gov.sa/v1/shipments/{shipment_id}" \
  -H "Authorization: Bearer ${FASAH_TOKEN}" \
  -H "Accept: application/json"
```

### الاستعلام عن بيان جمركي

```bash
curl -X GET "https://api.fasah.zatca.gov.sa/v1/declarations/{declaration_id}" \
  -H "Authorization: Bearer ${FASAH_TOKEN}" \
  -H "Accept: application/json"
```

## البيانات المفتوحة -- هيئة الزكاة والضريبة والجمارك (ZATCA)

إحصائيات جمركية وبيانات تجارية مفتوحة.

### جلب بيانات التجارة

```bash
curl -X GET "https://api.zatca.gov.sa/open-data/v1/trade-statistics" \
  -H "Accept: application/json" \
  -H "Accept-Language: ar"
```

### البحث عن رمز النظام المنسق (HS Code)

```bash
curl -X GET "https://api.zatca.gov.sa/open-data/v1/hs-codes?query={search_term}" \
  -H "Accept: application/json"
```

**بوابة البيانات المفتوحة:** `https://zatca.gov.sa/ar/PublicData/Pages/APIs.aspx`

## نظام بيان (Bayan)

نظام التصاريح الجمركية المدمج مع فسح. يُستخدم لتقديم البيانات الجمركية إلكترونيًا لجميع عمليات الاستيراد والتصدير.

## إجراءات الاستيراد والتصدير

### الاستيراد
1. تسجيل في فسح وربط السجل التجاري
2. إصدار إذن الاستيراد من الجهة المختصة
3. تقديم البيان الجمركي عبر بيان
4. سداد الرسوم الجمركية والضرائب
5. الفسح والإفراج عن الشحنة

### التصدير
1. تسجيل في فسح كمصدّر
2. إصدار شهادة المنشأ
3. تقديم بيان التصدير
4. الموافقة والشحن

## التعريفات الجمركية

- التعريفة الجمركية الموحّدة لدول مجلس التعاون الخليجي
- البحث عن التعريفات عبر رمز HS Code
- إعفاءات بموجب اتفاقيات التجارة الحرة

## عرض النتيجة

```
بيانات جمركية
النوع: {{query_type}}
رمز HS: {{hs_code}}
التعريفة: {{tariff_rate}}
الحالة: {{status}}
```

## متى تستخدم

- المستخدم يسأل عن **الجمارك السعودية** أو **التخليص الجمركي**
- الاستعلام عن **الاستيراد والتصدير** في السعودية
- أي ذكر لـ **فسح** أو **Fasah**
- البحث عن **رموز HS** أو **التعريفات الجمركية**
- الاستفسار عن **بيانات التجارة** السعودية
- أي ذكر لـ **ZATCA** أو **هيئة الزكاة والضريبة والجمارك**

## المراجع

- فسح: https://fasah.zatca.gov.sa
- هيئة الزكاة والضريبة والجمارك: https://zatca.gov.sa
- البيانات المفتوحة: https://zatca.gov.sa/ar/PublicData/Pages/APIs.aspx
