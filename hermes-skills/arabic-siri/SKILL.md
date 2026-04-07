---
name: arabic-siri
description: Arabic Siri integration for Hermes — trigger agent tasks via Arabic voice commands through Apple Shortcuts
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [macos]
prerequisites:
  commands: [shortcuts, curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, siri, voice, apple, shortcuts, accessibility]
    related_skills: [voice-assistant, whisper-arabic, voxtral-tts]
---

# سيري بالعربي — Arabic Siri for Hermes

تشغيل مهام هيرمز عبر أوامر سيري الصوتية بالعربية.

## كيف يشتغل

سيري يستقبل الأمر الصوتي بالعربي ثم يرسله لهيرمز عبر اختصار أبل.

## إعداد اختصار سيري

### الخطوة الأولى: إنشاء الاختصار

افتح تطبيق الاختصارات على الماك وأنشئ اختصار جديد:

1. أضف إجراء "طلب إدخال" — النص: "شو تبي من هيرمز؟"
2. أضف إجراء "الحصول على محتوى URL":

```
URL: http://localhost:3000/api/v1/chat
Method: POST
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_HERMES_API_KEY
Body (JSON):
{
  "message": [Provided Input],
  "session_id": "siri-arabic"
}
```

3. أضف إجراء "إظهار النتيجة"
4. سمّ الاختصار: "هيرمز" أو "مساعدي"

### الخطوة الثانية: تفعيل سيري

قل: "يا سيري، شغّل هيرمز"

أو خصص عبارة مخصصة:
- "يا سيري، اسأل المساعد"
- "يا سيري، مخلب"

## أوامر صوتية مقترحة

### أوقات الصلاة
"يا سيري، شغّل هيرمز" ثم قل: "كم باقي على صلاة العصر في الرياض؟"

### الطقس
"شو حالة الجو في جدة اليوم؟"

### ترجمة
"ترجم لي good morning للعربي"

### أخبار
"ورّني آخر أخبار التقنية"

### تذكير
"ذكّرني أدفع فاتورة الكهرباء بكرة الساعة عشر"

### بحث في القرآن
"ابحث لي عن آية فيها كلمة الصبر"

## إعداد متقدم: اختصار بدون إدخال يدوي

اختصار يأخذ النص مباشرة من سيري بدون سؤال إضافي:

1. أضف إجراء "إملاء النص" (يسجل صوتك مباشرة)
2. أضف إجراء "الحصول على محتوى URL" مع النص المُملى
3. أضف إجراء "نطق النص" لقراءة الرد بصوت عالي

بهالطريقة: تقول "يا سيري، مخلب" ثم تقول أمرك مباشرة والرد يجيك صوتياً.

## ربط مع مهارات هيرمز

سيري يرسل النص لهيرمز واللي بدوره يوجهه للمهارة المناسبة:

- "أوقات الصلاة" يروح لمهارة prayer-times
- "ترجم" يروح لمهارة translate
- "ابحث في القرآن" يروح لمهارة quran-search
- أي أمر ثاني يتعامل معاه هيرمز مباشرة

## استكشاف الأخطاء

لو سيري ما يفهم العربي:
1. تأكد إن لغة سيري مضبوطة على العربية (الإعدادات > سيري > اللغة)
2. أضف لوحة مفاتيح عربية
3. تأكد إن "الاستماع لـ يا سيري" مفعّل

لو هيرمز ما يستجيب:
1. تأكد إن سيرفر هيرمز شغال: `curl http://localhost:3000/health`
2. تأكد إن مفتاح الواجهة البرمجية صحيح في الاختصار
3. جرب الطلب يدوياً:

```bash
curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"message": "كم الساعة؟", "session_id": "test"}'
```
