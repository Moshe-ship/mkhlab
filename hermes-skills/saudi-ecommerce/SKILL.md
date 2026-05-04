---
name: saudi-ecommerce
description: منصات التجارة الإلكترونية السعودية -- ربط مع سلة وزد ونون عبر API
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [saudi, ecommerce, salla, zid, noon, store, orders, products]
---

# منصات التجارة الإلكترونية السعودية

دليل ربط واجهات API لأبرز منصات التجارة الإلكترونية في المملكة العربية السعودية.

## نظرة عامة

| المنصة | عدد التجار | المصادقة | التوثيق |
|--------|-----------|----------|---------|
| سلة (Salla) | +68,000 تاجر | OAuth 2.0 | docs.salla.dev |
| زد (Zid) | +8,000 تاجر | OAuth 2.0 | docs.zid.sa |
| نون (Noon) | ماركت بليس | JWT | noon-docs.noonpartners.dev |

## سلة (Salla)

أكبر منصة تجارة إلكترونية سعودية -- أكثر من 68,000 تاجر.

### الإعداد
1. سجّل كمطور شريك: https://salla.partners
2. أنشئ تطبيق OAuth في لوحة الشركاء
3. احصل على Access Token عبر OAuth 2.0
4. اضبط المتغير: `export SALLA_TOKEN=your_access_token`

Base URL: `https://api.salla.dev/admin/v2`

### جلب المنتجات
```bash
curl -s "https://api.salla.dev/admin/v2/products" \
  -H "Authorization: Bearer $SALLA_TOKEN" \
  -H "Content-Type: application/json"
```

### جلب منتج محدد
```bash
curl -s "https://api.salla.dev/admin/v2/products/PRODUCT_ID" \
  -H "Authorization: Bearer $SALLA_TOKEN" \
  -H "Content-Type: application/json"
```

### جلب الطلبات
```bash
curl -s "https://api.salla.dev/admin/v2/orders" \
  -H "Authorization: Bearer $SALLA_TOKEN" \
  -H "Content-Type: application/json"
```

### جلب طلب محدد
```bash
curl -s "https://api.salla.dev/admin/v2/orders/ORDER_ID" \
  -H "Authorization: Bearer $SALLA_TOKEN" \
  -H "Content-Type: application/json"
```

### جلب العملاء
```bash
curl -s "https://api.salla.dev/admin/v2/customers" \
  -H "Authorization: Bearer $SALLA_TOKEN" \
  -H "Content-Type: application/json"
```

### إنشاء Webhook
```bash
curl -s -X POST "https://api.salla.dev/admin/v2/webhooks" \
  -H "Authorization: Bearer $SALLA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "طلب جديد",
    "event": "order.created",
    "url": "https://example.com/webhooks/salla",
    "headers": {}
  }'
```

### أحداث Webhook الشائعة
| الحدث | الوصف |
|-------|-------|
| order.created | طلب جديد |
| order.updated | تحديث طلب |
| order.status.updated | تغيير حالة طلب |
| product.created | منتج جديد |
| product.updated | تحديث منتج |
| customer.created | عميل جديد |
| app.installed | تثبيت التطبيق |

## زد (Zid)

### الإعداد
1. سجّل كشريك: https://partner.zid.sa
2. أنشئ تطبيق OAuth في بوابة الشركاء
3. احصل على Access Token عبر OAuth 2.0
4. اضبط المتغيرات:
```bash
export ZID_TOKEN=your_access_token
export ZID_STORE_ID=your_store_id
```

### جلب المنتجات
```bash
curl -s "https://api.zid.sa/v1/products/" \
  -H "Authorization: Bearer $ZID_TOKEN" \
  -H "X-Manager-Token: $ZID_TOKEN" \
  -H "Store-Id: $ZID_STORE_ID" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: ar"
```

### جلب الطلبات
```bash
curl -s "https://api.zid.sa/v1/orders/" \
  -H "Authorization: Bearer $ZID_TOKEN" \
  -H "X-Manager-Token: $ZID_TOKEN" \
  -H "Store-Id: $ZID_STORE_ID" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: ar"
```

### جلب المخزون
```bash
curl -s "https://api.zid.sa/v1/inventory/" \
  -H "Authorization: Bearer $ZID_TOKEN" \
  -H "X-Manager-Token: $ZID_TOKEN" \
  -H "Store-Id: $ZID_STORE_ID" \
  -H "Content-Type: application/json"
```

### تحديث مخزون منتج
```bash
curl -s -X PUT "https://api.zid.sa/v1/products/PRODUCT_ID/inventory/" \
  -H "Authorization: Bearer $ZID_TOKEN" \
  -H "X-Manager-Token: $ZID_TOKEN" \
  -H "Store-Id: $ZID_STORE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 50
  }'
```

## نون (Noon)

### الإعداد
1. سجّل كبائع: https://seller.noon.com
2. احصل على JWT token من بوابة البائعين
3. اضبط المتغير: `export NOON_TOKEN=your_jwt_token`

### جلب الطلبات
```bash
curl -s "https://api.noon.partners/seller/orders" \
  -H "Authorization: Bearer $NOON_TOKEN" \
  -H "Content-Type: application/json"
```

### جلب طلب محدد
```bash
curl -s "https://api.noon.partners/seller/orders/ORDER_ID" \
  -H "Authorization: Bearer $NOON_TOKEN" \
  -H "Content-Type: application/json"
```

### جلب المنتجات
```bash
curl -s "https://api.noon.partners/seller/products" \
  -H "Authorization: Bearer $NOON_TOKEN" \
  -H "Content-Type: application/json"
```

### تحديث حالة التنفيذ (Fulfillment)
```bash
curl -s -X PUT "https://api.noon.partners/seller/orders/ORDER_ID/fulfill" \
  -H "Authorization: Bearer $NOON_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tracking_number": "AWB_NUMBER",
    "carrier": "aramex"
  }'
```

### رفع منتج جديد
```bash
curl -s -X POST "https://api.noon.partners/seller/products" \
  -H "Authorization: Bearer $NOON_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "اسم المنتج",
    "brand": "العلامة التجارية",
    "category": "electronics",
    "price": 100.00,
    "quantity": 50,
    "description": "وصف المنتج"
  }'
```

## عرض النتيجة

بيانات المتجر:
- المنصة: [سلة/زد/نون]
- عدد المنتجات: [العدد]
- عدد الطلبات: [العدد]
- إجمالي المبيعات: [المبلغ] ريال

تفاصيل الطلب:
- رقم الطلب: [الرقم]
- العميل: [الاسم]
- المبلغ: [المبلغ] ريال
- الحالة: [جديد/قيد المعالجة/تم الشحن/تم التسليم]
- المنتجات: [قائمة المنتجات]

## متى تستخدم
- المستخدم يسأل عن التجارة الإلكترونية في السعودية
- يريد ربط متجره على سلة أو زد مع نظام خارجي
- يسأل عن API سلة أو زد أو نون
- يريد أتمتة إدارة الطلبات أو المنتجات
- يسأل "كيف أفتح متجر إلكتروني؟" أو "كيف أربط سلة مع نظامي؟"

## مقارنة المنصات

| الميزة | سلة | زد | نون |
|--------|-----|-----|------|
| النوع | متجر مستقل | متجر مستقل | ماركت بليس |
| الباقة المجانية | نعم (محدودة) | نعم (محدودة) | لا (عمولة على البيع) |
| التخصيص | عالي | عالي | محدود |
| بوابات الدفع | مويسر، تاب، وغيرها | مويسر، تاب، وغيرها | نون Pay |
| الشحن | تكامل مع سمسا، أرامكس | تكامل مع سمسا، أرامكس | نون Express |
| العمولة | لا | لا | 5-27% حسب الفئة |
| API | شامل | شامل | بائعين فقط |

## تنبيه
- سلة وزد يتطلبان تسجيل كشريك مطور للوصول إلى API
- نون يتطلب حساب بائع معتمد
- OAuth tokens تنتهي صلاحيتها -- تأكد من تجديدها
- احترم حدود الاستخدام (Rate Limits) لكل منصة

## المراجع
- سلة: https://docs.salla.dev
- زد: https://docs.zid.sa
- نون: https://noon-docs.noonpartners.dev
- شركاء سلة: https://salla.partners
- شركاء زد: https://partner.zid.sa
