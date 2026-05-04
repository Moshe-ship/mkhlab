---
name: saudi-business
description: Saudi business registration and company data via Wathq API
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: [WATHQ_API_KEY]
metadata:
  hermes:
    tags: [saudi, business, wathq, commercial-registration]
---
# بيانات الشركات السعودية (وثق)

منصة وثق الرسمية — بيانات حكومية مباشرة من وزارة التجارة ووزارة العدل.

## الإعداد
1. سجّل في بوابة المطورين: https://developer.wathq.sa/en
2. تجربة مجانية: 100 استعلام خلال 30 يوم
3. اضبط المتغير: `export WATHQ_API_KEY=your_key`

## الاستعلام عن سجل تجاري
```bash
curl -s "https://api.wathq.sa/v5/commercialregistration/info/CR_NUMBER" \
  -H "apiKey: $WATHQ_API_KEY"
```

## الاستعلام عن عقد تأسيس
```bash
curl -s "https://api.wathq.sa/v5/commercialcontract/info/CR_NUMBER" \
  -H "apiKey: $WATHQ_API_KEY"
```

## الاستعلام عن صك عقاري
```bash
curl -s "https://api.wathq.sa/v5/realestate/deed/DEED_NUMBER" \
  -H "apiKey: $WATHQ_API_KEY"
```

## الاستعلام عن وكالة
```bash
curl -s "https://api.wathq.sa/v5/powerofattorney/info/POA_NUMBER" \
  -H "apiKey: $WATHQ_API_KEY"
```

## عرض النتيجة

بيانات الشركة:
- الاسم: [اسم الشركة]
- رقم السجل التجاري: [الرقم]
- الحالة: نشط/منتهي/ملغى
- تاريخ التأسيس: [التاريخ]
- المدينة: [المدينة]
- النشاط: [وصف النشاط]

## التسعير
| الباقة | السعر | الاستعلامات |
|--------|-------|------------|
| تجريبي | مجاني | 100 خلال 30 يوم |
| مسبق الدفع | من 5,000 ريال | حسب الاستهلاك |
| مؤسسي | حسب الاتفاق | غير محدود |

## متى تستخدم
- المستخدم يريد التحقق من شركة سعودية
- يبحث عن بيانات سجل تجاري
- يريد التأكد من صحة وكالة
- يبحث عن بيانات صك عقاري

## المرجع
- بوابة المطورين: https://developer.wathq.sa/en
- قائمة الواجهات: https://developer.wathq.sa/en/apis
