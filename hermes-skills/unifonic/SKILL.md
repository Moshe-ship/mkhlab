---
name: unifonic
description: "يونيفونك — إرسال رسائل SMS وواتساب ومكالمات صوتية — Unifonic Saudi CPaaS for SMS, WhatsApp, voice, and OTP"
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, unifonic]
---


# يونيفونك — منصة الاتصالات السحابية السعودية

**Unifonic** (يونيفونك) منصة اتصالات سحابية (CPaaS) سعودية تقدّم خدمات الرسائل النصية، واتساب للأعمال، المكالمات الصوتية، والتحقق بـ OTP.

## الإعداد

1. سجّل في: `https://unifonic.com`
2. احصل على **AppSid** من لوحة التحكم
3. صدّر المتغير:
```bash
export UNIFONIC_APP_SID="your_app_sid_here"
```

> **التسعير:** 299 ريال سعودي/سنة رسوم تسجيل للشركات السعودية.

## إرسال رسالة نصية (SMS)

```bash
curl -X POST "https://el.cloud.unifonic.com/rest/SMS/messages" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "AppSid=${UNIFONIC_APP_SID}" \
  -d "Recipient=966500000000" \
  -d "Body=مرحبا، هذه رسالة تجريبية من يونيفونك" \
  -d "SenderID=YourSender"
```

## إرسال رسالة واتساب (WhatsApp)

```bash
curl -X POST "https://el.cloud.unifonic.com/rest/WhatsApp/messages" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "AppSid=${UNIFONIC_APP_SID}" \
  -d "Recipient=966500000000" \
  -d "Body=مرحبا من واتساب للأعمال" \
  -d "MessageType=text"
```

## إجراء مكالمة صوتية (Voice Call)

```bash
curl -X POST "https://el.cloud.unifonic.com/rest/Voice/Calls" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "AppSid=${UNIFONIC_APP_SID}" \
  -d "Recipient=966500000000" \
  -d "CallType=Pull" \
  -d "Content=مرحبا، هذه مكالمة تجريبية"
```

## إرسال رمز تحقق (OTP)

```bash
curl -X POST "https://el.cloud.unifonic.com/rest/SMS/OTP" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "AppSid=${UNIFONIC_APP_SID}" \
  -d "Recipient=966500000000" \
  -d "Body=رمز التحقق الخاص بك هو: {OTP}" \
  -d "OTPLength=6"
```

## عرض النتيجة

```
💬 يونيفونك — نتيجة الإرسال
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
النوع: {{message_type}}
المستلم: {{recipient}}
الحالة: {{status}}
معرّف الرسالة: {{message_id}}
```

## متى تستخدم

- المستخدم يريد **إرسال رسالة نصية** (SMS) من السعودية
- إرسال **رسائل واتساب** للأعمال
- إرسال **رمز تحقق** (OTP) عبر SMS
- إجراء **مكالمة صوتية** برمجية
- أي ذكر لـ **يونيفونك** أو **Unifonic**

## المراجع

- التوثيق: https://docs.unifonic.com
- الموقع: https://unifonic.com
