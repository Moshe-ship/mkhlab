---
name: saudi-address
description: العنوان الوطني -- ابحث وتحقق من العناوين السعودية، حوّل إحداثيات لعنوان، واعثر على أقرب الخدمات
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: [NATIONAL_ADDRESS_API_KEY]
metadata:
  hermes:
    tags: [saudi, address, geocoding, spl, national-address]
---

# العنوان الوطني السعودي

واجهة العنوان الوطني الرسمية من البريد السعودي (SPL).

## الإعداد
1. سجّل في بوابة المطورين: https://api.address.gov.sa/
2. احصل على API key
3. اضبط المتغير: `export NATIONAL_ADDRESS_API_KEY=your_key`

## البحث الحر
```bash
curl -s "https://api.address.gov.sa/freetextsearch?text=SEARCH_TEXT" \
  -H "api_key: $NATIONAL_ADDRESS_API_KEY"
```

## البحث المحدد
```bash
curl -s "https://api.address.gov.sa/fixedsearch?city=Riyadh&district=Al+Olaya&street=King+Fahd+Road" \
  -H "api_key: $NATIONAL_ADDRESS_API_KEY"
```

## أقرب الخدمات
```bash
curl -s "https://api.address.gov.sa/nearestpois?lat=24.7136&lng=46.6753&category=mosque" \
  -H "api_key: $NATIONAL_ADDRESS_API_KEY"
```

## التحويل من إحداثيات لعنوان
```bash
curl -s "https://api.address.gov.sa/nationaladdress?lat=24.7136&lng=46.6753" \
  -H "api_key: $NATIONAL_ADDRESS_API_KEY"
```

## عرض النتيجة

العنوان الوطني:
- الرقم: [رقم المبنى] [رقم العنوان القصير]
- الشارع: [اسم الشارع]
- الحي: [اسم الحي]
- المدينة: [المدينة]
- الرمز البريدي: [الرمز]

## متى تستخدم
- المستخدم يبحث عن عنوان سعودي
- يريد تحويل إحداثيات لعنوان
- يريد أقرب مسجد/مستشفى/صيدلية
- يحتاج العنوان الوطني لتوصيل أو مراسلة

## المرجع
- بوابة المطورين: https://api.address.gov.sa/
