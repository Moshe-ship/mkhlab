---
name: saudi-identity
description: Saudi digital identity verification via Nafath and Yakeen APIs
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [saudi, identity, nafath, yakeen, verification]
---
# الهوية الرقمية السعودية (نفاذ + يقين)

دليل التكامل مع خدمات التحقق من الهوية الرقمية في المملكة العربية السعودية.

---

## نفاذ (Nafath) — الهوية الرقمية الوطنية

نفاذ هو نظام الهوية الرقمية الوطني الذي يوفر مصادقة متعددة العوامل (MFA) للخدمات الحكومية والخاصة.

### الإعداد

يتطلب الحصول على رخصة TCC من شركة TCC-ICT:

- موقع الرخصة: https://tcc-ict.com
- بعد الحصول على الرخصة، ستحصل على `Bearer Token` للمصادقة

### واجهات نفاذ البرمجية

#### 1. إنشاء طلب مصادقة

```bash
curl -X POST "https://nafath-api-endpoint/ExtNafath/request" \
  -H "Authorization: Bearer ${NAFATH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "nationalId": "1000000000",
    "service": "login"
  }'
```

الاستجابة تتضمن `transId` ورقم عشوائي يظهر للمستخدم في تطبيق نفاذ.

#### 2. التحقق من حالة الطلب

```bash
curl -X POST "https://nafath-api-endpoint/ExtNafath/status" \
  -H "Authorization: Bearer ${NAFATH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "transId": "TRANSACTION_ID"
  }'
```

الحالات: `WAITING` | `COMPLETED` | `EXPIRED` | `REJECTED`

#### 3. جلب بيانات المستخدم بعد التحقق

```bash
curl -X GET "https://nafath-api-endpoint/ExtNafath/details/TRANSACTION_ID" \
  -H "Authorization: Bearer ${NAFATH_TOKEN}"
```

يعيد بيانات الهوية المُتحقق منها (الاسم، رقم الهوية، تاريخ الميلاد، إلخ).

### حزمة GitHub جاهزة

```
github.com/mohamad-zatar/saudi-nafath-integration
```

---

## يقين (Yakeen by Elm) — التحقق من بيانات الهوية

يقين هي خدمة من شركة علم للتحقق من بيانات المواطنين والمقيمين.

### الإعداد

- يتطلب عقد مع شركة علم (elm.sa)
- يوفر واجهات SOAP و REST

### الطرق المتاحة

| الطريقة | الوصف | الاستخدام |
|---------|-------|-----------|
| `CitizenInfo` | بيانات المواطن بالهوية الوطنية | التحقق من بيانات المواطنين |
| `AlienInfoByIqama` | بيانات المقيم برقم الإقامة | التحقق من بيانات المقيمين |

### مثال استدعاء (REST)

```bash
curl -X POST "https://yakeen-api-endpoint/api/v1/CitizenInfo" \
  -H "Authorization: Bearer ${YAKEEN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "nin": "1000000000",
    "dateOfBirth": "1410-01-01"
  }'
```

```bash
curl -X POST "https://yakeen-api-endpoint/api/v1/AlienInfoByIqama" \
  -H "Authorization: Bearer ${YAKEEN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "iqamaNumber": "2000000000",
    "dateOfBirth": "1980-01-01"
  }'
```

### مجموعة Postman

```
postman.com/crimson-crater-793597/yakeen-collection/
```

---

## عرض النتيجة

```
تم التحقق من الهوية
الاسم: {{ fullName }}
رقم الهوية: {{ nationalId }}
الحالة: {{ status }}
```

---

## متى تستخدم

استخدم هذه المهارة عندما يسأل المستخدم عن:
- التحقق من الهوية السعودية أو الهوية الرقمية
- نفاذ (Nafath) أو المصادقة الرقمية الوطنية
- يقين (Yakeen) أو التحقق من بيانات المواطن/المقيم
- ربط تطبيق بالهوية الرقمية السعودية
- Elm identity services

---

## المراجع

- توثيق نفاذ: https://documentation.azakaw.com/docs/apis/core/nafath
- حزمة نفاذ: https://github.com/mohamad-zatar/saudi-nafath-integration
- شركة علم: https://elm.sa
- رخصة TCC: https://tcc-ict.com
- مجموعة يقين Postman: https://postman.com/crimson-crater-793597/yakeen-collection/
