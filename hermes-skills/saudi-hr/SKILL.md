---
name: saudi-hr
description: واجهات الموارد البشرية والتوظيف السعودية -- مصدر ومدد وقوى ومساند
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [saudi, hr, employment, masdr, mudad, qiwa, musaned, gosi, wps]
---

# الموارد البشرية والتوظيف في السعودية

دليل التكامل مع منصات التوظيف والموارد البشرية الحكومية في المملكة العربية السعودية.

---

## نظرة عامة على المنصات

| المنصة | الجهة | الوظيفة الرئيسية | المستخدمون |
|--------|-------|-----------------|-----------|
| مصدر (Masdr) | التأمينات الاجتماعية (GOSI) | التحقق من التوظيف والرواتب | الشركات والبنوك |
| مدد (Mudad) | وزارة الموارد البشرية | حماية الأجور (WPS) | أصحاب العمل والبنوك |
| قوى (Qiwa) | وزارة الموارد البشرية | إدارة القوى العاملة | 14.5 مليون مستخدم |
| مساند (Musaned) | وزارة الموارد البشرية | استقدام العمالة المنزلية | الأفراد ومكاتب الاستقدام |

---

## مصدر (Masdr by GOSI)

بوابة المطورين: https://portal.masdr.sa

مصدر هي منصة التأمينات الاجتماعية لتوفير خدمات التحقق من بيانات التوظيف والرواتب.

### الخدمات المتاحة

#### 1. مُفيد -- الاستعلام عن الفرد (Mufeed - Individual)

الاستعلام عن بيانات التوظيف والتأمينات لشخص محدد.

```bash
curl -X POST "https://api.masdr.sa/v1/mufeed/individual" \
  -H "Authorization: Bearer ${MASDR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idNumber": "1000000000",
    "idType": "NIN"
  }'
```

**الاستجابة تشمل:** حالة التوظيف، اسم صاحب العمل، تاريخ الالتحاق، الراتب المسجل.

#### 2. مُفيد -- الاستعلام عن المنشأة (Mufeed - Establishment)

```bash
curl -X POST "https://api.masdr.sa/v1/mufeed/establishment" \
  -H "Authorization: Bearer ${MASDR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "establishmentNumber": "700000000"
  }'
```

**الاستجابة تشمل:** بيانات المنشأة، عدد الموظفين، حالة الاشتراك.

#### 3. أكيد -- التحقق من التوظيف والراتب (Akeed)

```bash
curl -X POST "https://api.masdr.sa/v1/akeed/verify" \
  -H "Authorization: Bearer ${MASDR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idNumber": "1000000000",
    "employerNumber": "700000000",
    "salaryRange": {
      "min": 5000,
      "max": 15000
    }
  }'
```

**الاستجابة:** تأكيد أو نفي (true/false) دون كشف البيانات الفعلية.

#### 4. أملي -- مزامنة الموارد البشرية (Amaly)

مزامنة بيانات الموارد البشرية بين أنظمة الشركات والتأمينات الاجتماعية.

```bash
curl -X POST "https://api.masdr.sa/v1/amaly/sync" \
  -H "Authorization: Bearer ${MASDR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "establishmentNumber": "700000000",
    "employees": [
      {
        "idNumber": "1000000000",
        "salary": 8000,
        "startDate": "2024-01-01"
      }
    ]
  }'
```

---

## مدد (Mudad) -- حماية الأجور

نظام حماية الأجور (WPS) الذي يضمن دفع الرواتب في موعدها.

### آلية العمل

1. صاحب العمل يرفع ملف الرواتب عبر مدد
2. البنك يستلم الطلب عبر WPS API
3. يتم تحويل الرواتب وإبلاغ وزارة الموارد البشرية

### WPS API (مثال: البنك العربي الوطني)

بوابة المطورين: https://developer.anb.com.sa/apis/api/WPS

```bash
curl -X POST "https://api.anb.com.sa/wps/v1/salary-file" \
  -H "Authorization: Bearer ${BANK_WPS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "employerId": "700000000",
    "month": "2025-03",
    "totalAmount": 150000,
    "employeeCount": 15,
    "payments": [
      {
        "employeeId": "1000000000",
        "bankCode": "10",
        "iban": "SA0000000000000000000000",
        "amount": 10000
      }
    ]
  }'
```

---

## قوى (Qiwa) -- إدارة القوى العاملة

الموقع: https://qiwa.sa

منصة شاملة لإدارة القوى العاملة تخدم أكثر من **14.5 مليون** مستخدم.

### الخدمات الرئيسية

- **التأشيرات**: إصدار وإدارة تأشيرات العمل
- **العقود**: إدارة عقود العمل الإلكترونية
- **نقل الخدمات**: نقل الكفالة بين المنشآت
- **تغيير المهنة**: تعديل المسمى الوظيفي
- **نطاقات**: متابعة تصنيف المنشأة في برنامج نطاقات

### مثال: الاستعلام عن عقد عمل

```bash
curl -X GET "https://api.qiwa.sa/v1/contracts/{contractId}" \
  -H "Authorization: Bearer ${QIWA_TOKEN}" \
  -H "Content-Type: application/json"
```

---

## مساند (Musaned) -- استقدام العمالة المنزلية

الموقع: https://musaned.com.sa

### الخدمات

- طلب استقدام عمالة منزلية
- متابعة حالة الطلب
- التعاقد مع مكاتب الاستقدام
- إدارة عقود العمالة المنزلية

```bash
curl -X GET "https://api.musaned.com.sa/v1/requests/{requestId}" \
  -H "Authorization: Bearer ${MUSANED_TOKEN}" \
  -H "Content-Type: application/json"
```

---

## عرض النتيجة

```
نتيجة الاستعلام
المنصة: {{ platform }}
النوع: {{ queryType }}
الحالة: {{ status }}
التفاصيل: {{ details }}
```

---

## متى تستخدم

استخدم هذه المهارة عندما يسأل المستخدم عن:
- التحقق من التوظيف أو الراتب في السعودية
- بيانات التأمينات الاجتماعية (GOSI) أو مصدر (Masdr)
- نظام حماية الأجور (WPS) أو مدد (Mudad)
- إدارة القوى العاملة أو قوى (Qiwa)
- استقدام العمالة المنزلية أو مساند (Musaned)
- نطاقات أو عقود العمل الإلكترونية
- Saudi employment verification or payroll APIs

---

## المراجع

- بوابة مصدر: https://portal.masdr.sa
- مدد: https://mudad.com.sa
- قوى: https://qiwa.sa
- مساند: https://musaned.com.sa
- ANB WPS API: https://developer.anb.com.sa/apis/api/WPS
- التأمينات الاجتماعية: https://www.gosi.gov.sa
