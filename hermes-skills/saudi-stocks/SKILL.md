---
name: saudi-stocks
description: TADAWUL stock market data including TASI index and company financials
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: [TWELVE_DATA_KEY]
metadata:
  hermes:
    tags: [saudi, stocks, tadawul, finance]
---
# أسهم السوق السعودي (تداول)

## الاستعلام عن أسعار الأسهم

### عبر Twelve Data (مجاني مع تسجيل)
```bash
curl -s "https://api.twelvedata.com/quote?symbol=2222.SAU&apikey=$TWELVE_DATA_KEY"
```
`2222.SAU` = أرامكو. الرمز: [رقم_السهم].SAU

### أسهم سعودية شائعة
| الرمز | الشركة |
|-------|--------|
| 2222.SAU | أرامكو |
| 1010.SAU | الرياض |
| 1180.SAU | الأهلي |
| 2010.SAU | سابك |
| 7010.SAU | STC |
| 2350.SAU | كيان |
| 1120.SAU | الراجحي |
| 2280.SAU | المراعي |

### مؤشر تاسي
```bash
curl -s "https://api.twelvedata.com/quote?symbol=TASI&apikey=$TWELVE_DATA_KEY"
```

## البيانات المفتوحة من هيئة السوق المالية
```bash
# بيانات CMA المفتوحة
curl -s "https://opendata.cma.org.sa/api/v1/datasets" | python3 -m json.tool
```
المرجع: https://opendata.cma.org.sa/

## عرض النتيجة

[اسم الشركة] ([الرمز])
- السعر: [السعر] ريال
- التغيير: [+/-] [النسبة]%
- الافتتاح: [سعر الافتتاح]
- الأعلى: [أعلى سعر]
- الأدنى: [أدنى سعر]
- الحجم: [حجم التداول]

## متى تستخدم
- المستخدم يسأل عن سعر سهم سعودي
- يريد معرفة أداء تاسي
- يبحث عن بيانات مالية لشركة مدرجة
- يسأل "كم سعر أرامكو؟"

## تنبيه
- الأسعار قد تكون متأخرة 15 دقيقة
- هذا ليس نصيحة استثمارية — "استشر مستشارك المالي"
- لفحص حلال الأسهم: استخدم skill islamic-finance

## المراجع
- السوق السعودية: https://www.saudiexchange.sa/
- هيئة السوق المالية: https://opendata.cma.org.sa/
