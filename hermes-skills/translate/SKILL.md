---
name: translate
description: Arabic-English translation with dialect awareness and context preservation
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: []
  env_vars: []
metadata:
  hermes:
    tags: [language, translation, arabic, english]
---
# ترجمة عربي ↔ إنجليزي

## القواعد

1. **اكتشف اتجاه الترجمة تلقائيا** — إذا أرسل عربي ترجم للإنجليزي والعكس
2. **إذا كان النص بلهجة** — ترجم المعنى مو الكلمات حرفيا
3. **حافظ على النبرة** — رسمي يبقى رسمي، عامي يبقى عامي
4. **العربيزي** — "7abibi" = حبيبي، "3adi" = عادي — حوّل ثم ترجم
5. **المصطلحات الإسلامية** — "إن شاء الله"، "ما شاء الله"، "الحمد لله" — اتركها كما هي أو اشرحها بين قوسين

## الصيغة

عند الترجمة:

الترجمة:
[النص المترجم]

إذا كان النص يحتمل أكثر من معنى، اذكر البدائل.
إذا كان فيه تعبير اصطلاحي، اشرحه.

## أمثلة

"الله يعطيك العافية" → "May God give you strength/wellness" (common expression of appreciation, similar to "good job" or "thank you for your effort")

"It's raining cats and dogs" → "الدنيا تمطر بقوة" (مو ترجمة حرفية — التعبير يعني مطر غزير)
