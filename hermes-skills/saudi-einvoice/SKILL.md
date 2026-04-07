---
name: saudi-einvoice
description: ZATCA e-invoicing integration for Saudi tax compliance (Fatoorah platform)
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: [ZATCA_API_KEY]
metadata:
  hermes:
    tags: [saudi, einvoice, zatca, tax, compliance]
---
# الفوترة الإلكترونية — زاتكا (فاتورة)

منصة فاتورة الرسمية من هيئة الزكاة والضريبة والجمارك (ZATCA) للفوترة الإلكترونية في المملكة العربية السعودية.

## الإعداد

1. سجّل في بوابة الاختبار: https://sandbox.zatca.gov.sa
2. احصل على شهادة الامتثال (Compliance CSID) من البوابة
3. اضبط المتغير: `export ZATCA_API_KEY=your_base64_certificate`

المصادقة تتم عبر Basic Auth باستخدام الشهادة المشفرة بـ base64:
```
Authorization: Basic <base64(certificate:secret)>
```

## الحصول على شهادة الامتثال (Compliance CSID)

```bash
curl -s -X POST "https://gw-fatoora.zatca.gov.sa/e-invoicing/core/compliance" \
  -H "Content-Type: application/json" \
  -H "Accept-Version: V2" \
  -H "Authorization: Basic $ZATCA_API_KEY" \
  -d '{
    "csr": "BASE64_ENCODED_CSR"
  }'
```

## إبلاغ فاتورة مبسطة (B2C)

الفواتير المبسطة (أفراد) تُرسل عبر نظام الإبلاغ (Reporting):

```bash
curl -s -X POST "https://gw-fatoora.zatca.gov.sa/e-invoicing/core/invoices/reporting/single" \
  -H "Content-Type: application/json" \
  -H "Accept-Version: V2" \
  -H "Accept-Language: ar" \
  -H "Authorization: Basic $ZATCA_API_KEY" \
  -d '{
    "invoiceHash": "INVOICE_HASH",
    "uuid": "INVOICE_UUID",
    "invoice": "BASE64_ENCODED_XML"
  }'
```

## اعتماد فاتورة ضريبية (B2B)

الفواتير الضريبية (شركات) تُرسل عبر نظام الاعتماد (Clearance):

```bash
curl -s -X POST "https://gw-fatoora.zatca.gov.sa/e-invoicing/core/invoices/clearance/single" \
  -H "Content-Type: application/json" \
  -H "Accept-Version: V2" \
  -H "Accept-Language: ar" \
  -H "Authorization: Basic $ZATCA_API_KEY" \
  -d '{
    "invoiceHash": "INVOICE_HASH",
    "uuid": "INVOICE_UUID",
    "invoice": "BASE64_ENCODED_XML"
  }'
```

## فحص الامتثال

```bash
curl -s -X POST "https://gw-fatoora.zatca.gov.sa/e-invoicing/core/compliance/invoices" \
  -H "Content-Type: application/json" \
  -H "Accept-Version: V2" \
  -H "Accept-Language: ar" \
  -H "Authorization: Basic $ZATCA_API_KEY" \
  -d '{
    "invoiceHash": "INVOICE_HASH",
    "uuid": "INVOICE_UUID",
    "invoice": "BASE64_ENCODED_XML"
  }'
```

## أنواع الفواتير

| النوع | الوصف | الآلية |
|-------|-------|--------|
| فاتورة مبسطة (B2C) | للأفراد | إبلاغ (Reporting) |
| فاتورة ضريبية (B2B) | للشركات | اعتماد (Clearance) |
| إشعار دائن | إرجاع/خصم | نفس آلية الفاتورة الأصلية |
| إشعار مدين | إضافة مبلغ | نفس آلية الفاتورة الأصلية |

## عرض النتيجة

نتيجة الفوترة الإلكترونية:
- الحالة: [مقبولة/مرفوضة/معلّقة]
- رقم الفاتورة: [UUID]
- نوع الفاتورة: [مبسطة/ضريبية]
- حالة الامتثال: [ناجح/فاشل]
- التحذيرات: [قائمة التحذيرات إن وُجدت]
- الأخطاء: [قائمة الأخطاء إن وُجدت]

## متى تستخدم
- المستخدم يسأل عن الفوترة الإلكترونية
- يريد إصدار فاتورة عبر زاتكا أو فاتورة
- يسأل عن متطلبات الامتثال للفوترة
- يريد معرفة الفرق بين B2B و B2C
- يسأل "كيف أربط نظامي مع زاتكا؟"

## تنبيه
- استخدم بيئة الاختبار (sandbox) أولا قبل الإنتاج
- الفاتورة يجب أن تكون بصيغة XML متوافقة مع UBL 2.1
- يجب تضمين رمز QR في الفواتير المبسطة
- المرحلة الثانية (الربط والتكامل) إلزامية لجميع المنشآت

## المراجع
- بوابة الفوترة الإلكترونية: https://zatca.gov.sa/en/E-Invoicing/
- بوابة المطورين: https://sandbox.zatca.gov.sa
- مواصفات الفاتورة: https://zatca.gov.sa/en/E-Invoicing/SystemsDevelopers/
