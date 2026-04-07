---
name: saudi-food
description: Saudi food delivery and restaurant POS APIs (Foodics, HungerStation, Jahez, Careem)
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [saudi, food, restaurant, delivery, pos]
---
# تقنيات المطاعم وتوصيل الطعام في السعودية

واجهات برمجية لأنظمة نقاط البيع (POS) وتوصيل الطعام في السوق السعودي — Foodics، هنقرستيشن، جاهز، وكريم.

## Foodics (فودكس)

نظام إدارة مطاعم ونقاط بيع سعودي يخدم 30,000+ مطعم. يوفّر REST API v5 شامل.

### الإعداد

1. سجّل كمطوّر في: `https://console.foodics.com`
2. أنشئ تطبيق OAuth2 واحصل على Access Token
3. التوثيق الكامل: `https://dash.foodics.com/api-docs`

### جلب قائمة المنتجات

```bash
curl -X GET "https://api.foodics.com/v5/products" \
  -H "Authorization: Bearer ${FOODICS_TOKEN}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"
```

### جلب الطلبات

```bash
curl -X GET "https://api.foodics.com/v5/orders" \
  -H "Authorization: Bearer ${FOODICS_TOKEN}" \
  -H "Accept: application/json"
```

### جلب الفروع

```bash
curl -X GET "https://api.foodics.com/v5/branches" \
  -H "Authorization: Bearer ${FOODICS_TOKEN}" \
  -H "Accept: application/json"
```

### جلب المخزون

```bash
curl -X GET "https://api.foodics.com/v5/inventory-items" \
  -H "Authorization: Bearer ${FOODICS_TOKEN}" \
  -H "Accept: application/json"
```

**الموارد المتاحة:** المنتجات، الطلبات، المخزون، الفروع، التعديلات (Modifiers)، التصنيفات، الموظفين، والمزيد.

## HungerStation (هنقرستيشن)

منصة توصيل طعام سعودية (تابعة لـ Delivery Hero). توفّر API للشركاء لإدارة الطلبات والقوائم والعروض.

### الإعداد

1. سجّل في بوابة المطوّرين: `https://developer.hungerstation.com`
2. احصل على بيانات الاعتماد للـ API

```bash
curl -X GET "https://api.hungerstation.com/v1/orders" \
  -H "Authorization: Bearer ${HUNGERSTATION_TOKEN}" \
  -H "Accept: application/json"
```

**الخدمات:** إدارة الطلبات، كتالوج المنتجات، العروض والتخفيضات.

## Jahez (جاهز)

منصة توصيل طعام سعودية. التكامل عبر بوابة مخصصة.

### الإعداد

1. بوابة التكامل: `https://integration-portal.jahez.net`
2. للتواصل: `integration@jahez.net`

## Careem (كريم)

خدمة توصيل طعام مع API لنقاط البيع.

### الإعداد

1. التوثيق: `https://docs.careemnow.com`
2. ربط نظام POS مع منصة كريم

## عرض النتيجة

```
بيانات المطعم
المنصة: {{platform}}
النوع: {{data_type}}
العدد: {{count}}
البيانات: {{data}}
```

## متى تستخدم

- المستخدم يسأل عن **واجهات برمجية للمطاعم** أو **نظام POS**
- ربط مع **توصيل الطعام** في السعودية
- أي ذكر لـ **فودكس** أو **Foodics**
- الاستفسار عن **هنقرستيشن** أو **HungerStation**
- التكامل مع **جاهز** أو **كريم**
- إدارة **الطلبات** أو **المخزون** أو **الفروع** للمطاعم

## المراجع

- Foodics Console: https://console.foodics.com
- Foodics API Docs: https://dash.foodics.com/api-docs
- HungerStation Developer: https://developer.hungerstation.com
- Jahez Integration: https://integration-portal.jahez.net
- Careem POS Docs: https://docs.careemnow.com
