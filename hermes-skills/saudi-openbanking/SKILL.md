---
name: saudi-openbanking
description: الخدمات المصرفية المفتوحة السعودية -- إطار ساما وLean Technologies وبوابات البنوك
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [saudi, openbanking, sama, lean, banking, fintech, ais, pis]
---

# الخدمات المصرفية المفتوحة السعودية

دليل التكامل مع إطار الخدمات المصرفية المفتوحة في المملكة العربية السعودية (SAMA Open Banking).

---

## إطار عمل البنك المركزي (SAMA Open Banking)

الموقع: https://openbanking.sa

أطلق البنك المركزي السعودي (ساما) إطار الخدمات المصرفية المفتوحة لتمكين مشاركة البيانات المالية بشكل آمن.

### الخدمات الأساسية

| الخدمة | الاختصار | الوصف |
|--------|----------|-------|
| معلومات الحساب | AIS | الوصول لبيانات الحسابات والمعاملات |
| بدء الدفع | PIS | تنفيذ عمليات الدفع نيابة عن العميل |
| تأكيد الرصيد | CAF | التحقق من كفاية الرصيد دون كشف المبلغ |

### آلية العمل

1. **التسجيل**: الحصول على رخصة TSP من ساما
2. **الموافقة**: العميل يوافق على مشاركة بياناته عبر البنك
3. **الوصول**: استخدام Access Token للوصول للبيانات
4. **التجديد**: تجديد الصلاحية عبر Refresh Token

---

## Lean Technologies -- أول مزود خدمة مرخص

أول مزود خدمة طرف ثالث (TSP) مرخص من ساما.

التوثيق: https://docs.leantech.me/v2.0-KSA/
بيئة الاختبار: https://sandbox.sa.leantech.me

### الإعداد

```bash
export LEAN_APP_TOKEN="your-lean-app-token"
```

### المصادقة

جميع الطلبات تتطلب `lean-app-token` في الهيدر.

### ربط حساب العميل (Link)

```bash
curl -X POST "https://sandbox.sa.leantech.me/v2/customers" \
  -H "lean-app-token: ${LEAN_APP_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "app_user_id": "user-123"
  }'
```

### جلب حسابات العميل

```bash
curl -X GET "https://sandbox.sa.leantech.me/v2/customers/{customer_id}/accounts" \
  -H "lean-app-token: ${LEAN_APP_TOKEN}" \
  -H "Content-Type: application/json"
```

**الاستجابة:**

```json
{
  "accounts": [
    {
      "account_id": "acc_xxx",
      "iban": "SA0000000000000000000000",
      "currency": "SAR",
      "balance": 15000.50,
      "type": "current",
      "bank": "Al Rajhi Bank"
    }
  ]
}
```

### جلب المعاملات

```bash
curl -X GET "https://sandbox.sa.leantech.me/v2/customers/{customer_id}/accounts/{account_id}/transactions?from_date=2025-01-01&to_date=2025-03-01" \
  -H "lean-app-token: ${LEAN_APP_TOKEN}" \
  -H "Content-Type: application/json"
```

### التحقق من الهوية

```bash
curl -X GET "https://sandbox.sa.leantech.me/v2/customers/{customer_id}/identity" \
  -H "lean-app-token: ${LEAN_APP_TOKEN}" \
  -H "Content-Type: application/json"
```

**الاستجابة:**

```json
{
  "full_name": "...",
  "national_id": "1000000000",
  "date_of_birth": "1990-01-01"
}
```

### تنفيذ عملية دفع (Payouts)

```bash
curl -X POST "https://sandbox.sa.leantech.me/v2/payouts" \
  -H "lean-app-token: ${LEAN_APP_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "source_account_id": "acc_xxx",
    "destination_iban": "SA0000000000000000000000",
    "amount": 500.00,
    "currency": "SAR",
    "description": "تحويل"
  }'
```

---

## بوابات مطوري البنوك السعودية

### بنك الراجحي (Al Rajhi Bank)

بوابة المطورين: https://developer.alrajhibank.com.sa/open-banking/

```bash
curl -X GET "https://api.alrajhibank.com.sa/open-banking/v1/accounts" \
  -H "Authorization: Bearer ${ALRAJHI_TOKEN}" \
  -H "Content-Type: application/json"
```

الخدمات: معلومات الحسابات، المعاملات، بدء الدفع

### بنك الإنماء (Alinma Bank)

صفحة الخدمات المصرفية المفتوحة: https://alinma.com/en/Retail/Digital-Channels/Open-Banking

```bash
curl -X GET "https://api.alinma.com/open-banking/v1/accounts" \
  -H "Authorization: Bearer ${ALINMA_TOKEN}" \
  -H "Content-Type: application/json"
```

### البنك العربي الوطني (ANB)

بوابة المطورين: https://developer.anb.com.sa

```bash
curl -X GET "https://api.anb.com.sa/open-banking/v1/accounts" \
  -H "Authorization: Bearer ${ANB_TOKEN}" \
  -H "Content-Type: application/json"
```

---

## عرض النتيجة

```
بيانات مصرفية
البنك: {{ bankName }}
الحساب: {{ accountType }}
IBAN: {{ iban }}
الرصيد: {{ balance }} {{ currency }}
آخر تحديث: {{ lastUpdated }}
```

---

## متى تستخدم

استخدم هذه المهارة عندما يسأل المستخدم عن:
- واجهات مصرفية سعودية أو Open Banking
- الوصول لبيانات الحسابات البنكية (AIS)
- بدء عمليات الدفع (PIS)
- Lean Technologies أو مزودي الخدمات المالية
- بوابات مطوري البنوك السعودية (الراجحي، الإنماء، العربي الوطني)
- إطار ساما للخدمات المصرفية المفتوحة
- Saudi banking APIs or financial data access

---

## المراجع

- إطار ساما: https://openbanking.sa
- توثيق Lean: https://docs.leantech.me/v2.0-KSA/
- بيئة Lean التجريبية: https://sandbox.sa.leantech.me
- الراجحي للمطورين: https://developer.alrajhibank.com.sa/open-banking/
- الإنماء: https://alinma.com/en/Retail/Digital-Channels/Open-Banking
- العربي الوطني: https://developer.anb.com.sa
