---
name: saudi-legal
description: الخدمات القانونية السعودية -- ناجز ووثق للمحاكم والصكوك والوكالات الشرعية
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: [WATHQ_API_KEY]
metadata:
  hermes:
    tags: [saudi, legal, najiz, wathq, courts, deeds, power-of-attorney, moj]
---

# الخدمات القانونية السعودية (ناجز + وثق)

دليل التكامل مع الخدمات القانونية الرقمية في المملكة العربية السعودية.

---

## الإعداد

### وثق (Wathq)

```bash
export WATHQ_API_KEY="your-wathq-api-key"
```

احصل على المفتاح من بوابة المطورين: https://developer.wathq.sa

### ناجز (Najiz)

التسجيل عبر بوابة المطورين: https://developers.najiz.sa
للتواصل: takamul@moj.gov.sa

---

## ناجز (Najiz) -- وزارة العدل

بوابة المطورين: https://developers.najiz.sa

ناجز هي المنصة الرقمية لوزارة العدل وتوفر أكثر من **63 منتج API** موزعة على عدة مجالات.

### المجالات الرئيسية

| المجال | عدد الواجهات | الوصف |
|--------|-------------|-------|
| القضاء | 21+ | إدارة القضايا، الحجوزات، الجلسات |
| التنفيذ | 27+ | طلبات التنفيذ، الحجز على الأموال، منع السفر |
| تبادل العقارات | 49+ | نقل الملكية، الرهن العقاري، الإفراغ |
| التوثيق | متعددة | العقود، الوكالات، التصديقات |

### أمثلة على الواجهات

#### الاستعلام عن قضية

```bash
curl -X GET "https://api.najiz.sa/v1/cases/{caseNumber}" \
  -H "Authorization: Bearer ${NAJIZ_TOKEN}" \
  -H "Content-Type: application/json"
```

#### الاستعلام عن طلب تنفيذ

```bash
curl -X GET "https://api.najiz.sa/v1/enforcement/{requestNumber}" \
  -H "Authorization: Bearer ${NAJIZ_TOKEN}" \
  -H "Content-Type: application/json"
```

#### الاستعلام عن صك عقاري

```bash
curl -X GET "https://api.najiz.sa/v1/real-estate/{deedNumber}" \
  -H "Authorization: Bearer ${NAJIZ_TOKEN}" \
  -H "Content-Type: application/json"
```

---

## وثق (Wathq) -- واجهات التحقق القانوني

بوابة المطورين: https://developer.wathq.sa

### التحقق من وكالة شرعية

```bash
curl -X GET "https://api.wathq.sa/v5/power-of-attorney/{number}" \
  -H "apiKey: ${WATHQ_API_KEY}" \
  -H "Accept: application/json"
```

**الاستجابة:**

```json
{
  "powerOfAttorneyNumber": "123456789",
  "status": "ACTIVE",
  "issueDate": "1445-06-15",
  "expiryDate": "1446-06-15",
  "principalName": "...",
  "agentName": "...",
  "powers": ["..."]
}
```

### التحقق من صك عقاري

```bash
curl -X GET "https://api.wathq.sa/v5/real-estate-deeds/{number}" \
  -H "apiKey: ${WATHQ_API_KEY}" \
  -H "Accept: application/json"
```

**الاستجابة:**

```json
{
  "deedNumber": "987654321",
  "status": "ACTIVE",
  "propertyType": "residential",
  "area": "500",
  "city": "الرياض",
  "ownerName": "..."
}
```

### البحث عن علامة تجارية

```bash
curl -X GET "https://api.wathq.sa/v5/trademarks?q=SEARCH_TERM" \
  -H "apiKey: ${WATHQ_API_KEY}" \
  -H "Accept: application/json"
```

---

## عرض النتيجة

```
نتيجة التحقق القانوني
النوع: {{ type }}
الرقم: {{ number }}
الحالة: {{ status }}
التفاصيل: {{ details }}
```

---

## متى تستخدم

استخدم هذه المهارة عندما يسأل المستخدم عن:
- الخدمات القانونية السعودية أو المحاكم
- ناجز أو وزارة العدل
- التحقق من وكالة شرعية (Power of Attorney)
- الاستعلام عن صك عقاري (Real Estate Deed)
- طلبات التنفيذ أو الحجز
- وثق أو العلامات التجارية
- Najiz developer APIs

---

## المراجع

- بوابة مطوري ناجز: https://developers.najiz.sa
- بوابة مطوري وثق: https://developer.wathq.sa
- وزارة العدل: https://www.moj.gov.sa
- البريد الإلكتروني: takamul@moj.gov.sa
