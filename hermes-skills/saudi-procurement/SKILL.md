---
name: saudi-procurement
description: "المشتريات الحكومية السعودية عبر اعتماد — Saudi government procurement, contracts, and salary certificates via Etimad"
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, saudi-procurement]
---


# المشتريات الحكومية السعودية (اعتماد)

منصة **اعتماد** (Etimad) هي البوابة الموحّدة للمشتريات الحكومية في المملكة العربية السعودية. توفّر واجهات برمجية للاستعلام عن العقود الحكومية وشهادات الرواتب.

## الإعداد

1. سجّل في بوابة المطوّرين: `https://apiportal.etimad.sa`
2. احصل على موافقة إدارة الهوية (Identity Management Approval)
3. اشترك في الـ API المطلوبة من البوابة
4. ستحصل على مفتاح اشتراك (Subscription Key) لاستخدامه في الطلبات

> يتوفّر بيئة اختبار (Sandbox) للتجربة قبل الربط الفعلي.

## الاستعلام عن العقود الحكومية (Bank Contracts Inquiry)

```bash
curl -X GET "https://apiportal.etimad.sa/api/bank-contracts/inquiry" \
  -H "Ocp-Apim-Subscription-Key: ${ETIMAD_SUBSCRIPTION_KEY}" \
  -H "Content-Type: application/json"
```

يُرجع بيانات العقود الحكومية الحالية والتاريخية — مفيد للبنوك والجهات المالية للتحقق من العقود.

## شهادة الراتب (Salary Certificate)

```bash
curl -X GET "https://apiportal.etimad.sa/api/salary-certificate" \
  -H "Ocp-Apim-Subscription-Key: ${ETIMAD_SUBSCRIPTION_KEY}" \
  -H "Content-Type: application/json"
```

يُصدر شهادات رواتب لموظفي الجهات الحكومية إلكترونيًا.

## عرض النتيجة

```
📋 نتيجة الاستعلام من اعتماد
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
النوع: {{query_type}}
الحالة: {{status}}
البيانات: {{data}}
```

## متى تستخدم

- المستخدم يسأل عن **العقود الحكومية** السعودية
- الاستعلام عن **المشتريات الحكومية** أو **المناقصات**
- طلب **شهادة راتب** حكومية
- أي ذكر لـ **اعتماد** أو **Etimad**

## المراجع

- بوابة المطوّرين: https://apiportal.etimad.sa
- منصة اعتماد: https://etimad.sa
