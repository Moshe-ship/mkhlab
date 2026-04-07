---
name: saudi-pay
description: "بوابات الدفع السعودية — ربط بوابات الدفع مثل مويسر وتاب وهايبرباي وتابي وتمارا. استخدم عندما يسأل المستخدم عن قبول المدفوعات أو بوابات الدفع في السعودية."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, saudi-pay]
---


# بوابات الدفع السعودية

دليل شامل لربط بوابات الدفع المتاحة في المملكة العربية السعودية.

## نظرة عامة

| البوابة | النوع | عمولة مدى | عمولة فيزا/ماستر | الموقع |
|---------|-------|-----------|-------------------|--------|
| مويسر (Moyasar) | بوابة دفع | 1.5% | 2.2% | moyasar.com |
| تاب (Tap) | بوابة دفع | 1.5% | 2% | tap.company |
| هايبرباي (HyperPay) | بوابة دفع | حسب الاتفاق | حسب الاتفاق | hyperpay.com |
| بايتابز (PayTabs) | بوابة دفع | حسب الاتفاق | حسب الاتفاق | paytabs.sa |
| تابي (Tabby) | اشترِ الآن ادفع لاحقاً | — | — | tabby.ai |
| تمارا (Tamara) | اشترِ الآن ادفع لاحقاً | — | — | tamara.co |
| STC Pay | محفظة رقمية | عبر الشريك | عبر الشريك | stcpay.com.sa |

## مويسر (Moyasar)

### الإعداد
1. سجّل في: https://moyasar.com
2. احصل على مفتاح API من لوحة التحكم
3. اضبط المتغير: `export MOYASAR_API_KEY=sk_test_...`

### إنشاء عملية دفع
```bash
curl -s -X POST "https://api.moyasar.com/v1/payments" \
  -u "$MOYASAR_API_KEY:" \
  -d "amount=10000" \
  -d "currency=SAR" \
  -d "description=طلب رقم 123" \
  -d "source[type]=creditcard" \
  -d "source[name]=اسم حامل البطاقة" \
  -d "source[number]=4111111111111111" \
  -d "source[month]=12" \
  -d "source[year]=2027" \
  -d "source[cvc]=123" \
  -d "callback_url=https://example.com/callback"
```
المبلغ بالهللات (10000 = 100 ريال).

### استعلام عن عملية دفع
```bash
curl -s "https://api.moyasar.com/v1/payments/PAYMENT_ID" \
  -u "$MOYASAR_API_KEY:"
```

## تاب (Tap Payments)

### الإعداد
1. سجّل في: https://developers.tap.company
2. احصل على Bearer token
3. اضبط المتغير: `export TAP_SECRET_KEY=sk_test_...`

### إنشاء عملية دفع
```bash
curl -s -X POST "https://api.tap.company/v2/charges" \
  -H "Authorization: Bearer $TAP_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "SAR",
    "customer_initiated": true,
    "threeDSecure": true,
    "save_card": false,
    "description": "طلب رقم 123",
    "receipt": {"email": true, "sms": true},
    "customer": {
      "first_name": "محمد",
      "email": "test@example.com"
    },
    "source": {"id": "src_all"},
    "redirect": {"url": "https://example.com/redirect"}
  }'
```

## هايبرباي (HyperPay)

### الإعداد
1. سجّل في: https://hyperpay.com
2. احصل على Bearer token من بيئة الاختبار
3. اضبط المتغير: `export HYPERPAY_TOKEN=OGE...`

### إنشاء جلسة دفع (Checkout)
```bash
curl -s -X POST "https://eu-test.oppwa.com/v1/checkouts" \
  -H "Authorization: Bearer $HYPERPAY_TOKEN" \
  -d "entityId=YOUR_ENTITY_ID" \
  -d "amount=100.00" \
  -d "currency=SAR" \
  -d "paymentType=DB" \
  -d "merchantTransactionId=order_123"
```

### استعلام عن حالة الدفع
```bash
curl -s "https://eu-test.oppwa.com/v1/checkouts/CHECKOUT_ID/payment?entityId=YOUR_ENTITY_ID" \
  -H "Authorization: Bearer $HYPERPAY_TOKEN"
```

## بايتابز (PayTabs)

### الإعداد
1. سجّل في: https://merchant.paytabs.sa
2. احصل على Server Key و Profile ID
3. اضبط المتغيرات:
```bash
export PAYTABS_SERVER_KEY=your_server_key
export PAYTABS_PROFILE_ID=your_profile_id
```

### إنشاء صفحة دفع
```bash
curl -s -X POST "https://secure.paytabs.sa/payment/request" \
  -H "Authorization: $PAYTABS_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "'$PAYTABS_PROFILE_ID'",
    "tran_type": "sale",
    "tran_class": "ecom",
    "cart_id": "order_123",
    "cart_description": "طلب رقم 123",
    "cart_currency": "SAR",
    "cart_amount": 100.00,
    "callback": "https://example.com/callback",
    "return": "https://example.com/return"
  }'
```

## تابي (Tabby) — اشترِ الآن ادفع لاحقاً

### الإعداد
1. سجّل في: https://tabby.ai/business
2. احصل على مفتاح API
3. اضبط المتغير: `export TABBY_API_KEY=pk_test_...`

### إنشاء جلسة Checkout
```bash
curl -s -X POST "https://api.tabby.sa/api/v2/checkout" \
  -H "Authorization: Bearer $TABBY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "payment": {
      "amount": "100.00",
      "currency": "SAR",
      "buyer": {
        "phone": "+966500000000",
        "email": "test@example.com",
        "name": "محمد أحمد"
      },
      "order": {
        "reference_id": "order_123",
        "items": [{
          "title": "منتج تجريبي",
          "quantity": 1,
          "unit_price": "100.00",
          "category": "electronics"
        }]
      }
    },
    "lang": "ar",
    "merchant_code": "YOUR_MERCHANT_CODE",
    "merchant_urls": {
      "success": "https://example.com/success",
      "cancel": "https://example.com/cancel",
      "failure": "https://example.com/failure"
    }
  }'
```

## تمارا (Tamara) — اشترِ الآن ادفع لاحقاً

### الإعداد
1. سجّل في: https://tamara.co/business
2. احصل على Bearer token
3. اضبط المتغير: `export TAMARA_TOKEN=your_token`

### إنشاء جلسة Checkout
```bash
curl -s -X POST "https://api.tamara.co/checkout" \
  -H "Authorization: Bearer $TAMARA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order_reference_id": "order_123",
    "total_amount": {"amount": 100, "currency": "SAR"},
    "description": "طلب رقم 123",
    "country_code": "SA",
    "payment_type": "PAY_BY_INSTALMENTS",
    "instalments": 3,
    "locale": "ar_SA",
    "items": [{
      "name": "منتج تجريبي",
      "quantity": 1,
      "unit_price": {"amount": 100, "currency": "SAR"},
      "total_amount": {"amount": 100, "currency": "SAR"}
    }],
    "consumer": {
      "first_name": "محمد",
      "last_name": "أحمد",
      "phone_number": "+966500000000",
      "email": "test@example.com"
    },
    "merchant_url": {
      "success": "https://example.com/success",
      "failure": "https://example.com/failure",
      "cancel": "https://example.com/cancel",
      "notification": "https://example.com/webhook"
    }
  }'
```

## STC Pay

الدفع عبر STC Pay يتم من خلال بوابات الشراكة (مويسر أو تاب):

### عبر مويسر
```bash
curl -s -X POST "https://api.moyasar.com/v1/payments" \
  -u "$MOYASAR_API_KEY:" \
  -d "amount=10000" \
  -d "currency=SAR" \
  -d "description=طلب رقم 123" \
  -d "source[type]=stcpay" \
  -d "source[mobile]=0500000000" \
  -d "callback_url=https://example.com/callback"
```

### عبر تاب
```bash
curl -s -X POST "https://api.tap.company/v2/charges" \
  -H "Authorization: Bearer $TAP_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "SAR",
    "source": {"id": "src_sa.stcpay"},
    "redirect": {"url": "https://example.com/redirect"}
  }'
```

## عرض النتيجة

💳 عملية دفع:
- البوابة: [اسم البوابة]
- المبلغ: [المبلغ] ريال
- الحالة: [ناجحة/معلّقة/مرفوضة]
- رقم العملية: [ID]
- وسيلة الدفع: [مدى/فيزا/STC Pay/تابي/تمارا]

## متى تستخدم
- المستخدم يسأل عن قبول المدفوعات في السعودية
- يريد ربط بوابة دفع في تطبيقه أو متجره
- يسأل عن أفضل بوابة دفع سعودية
- يريد دمج مدى أو STC Pay
- يسأل عن حلول "اشترِ الآن ادفع لاحقاً"
- يسأل "كيف أقبل الدفع الإلكتروني؟"

## تنبيه
- استخدم مفاتيح الاختبار (test keys) أولاً
- المبالغ في مويسر بالهللات (اضرب × 100)
- تأكد من دعم 3D Secure لجميع البطاقات
- تابي وتمارا يتطلبان حد أدنى/أقصى للمبلغ

## المراجع
- مويسر: https://docs.moyasar.com
- تاب: https://developers.tap.company
- هايبرباي: https://hyperpay.com/docs
- بايتابز: https://site.paytabs.com/en/developer
- تابي: https://docs.tabby.ai
- تمارا: https://docs.tamara.co
