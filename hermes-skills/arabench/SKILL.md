---
name: arabench
description: Arabic LLM benchmarking across 8 quality categories
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [arabench]
  env_vars: []
metadata:
  hermes:
    tags: [nlp, benchmark, arabic, evaluation]
---
# arabench — معيار جودة العربية للنماذج

أداة لتقييم جودة الذكاء الاصطناعي بالعربي عبر 8 فئات.

## الأوامر

### تشغيل المعيار الكامل
```bash
arabench run
```

### اختبار سريع لمزوّد واحد
```bash
arabench quick PROVIDER_NAME
```

### مقارنة مزوّدين
```bash
arabench compare PROVIDER_A PROVIDER_B
```

### عرض لوحة النتائج
```bash
arabench leaderboard
```

### شرح فئة تقييم
```bash
arabench explain CATEGORY
```
الفئات: translation, grammar, dialect, diacritization, summarization, qa, generation, culture

## متى تستخدم
- المستخدم يسأل "أي نموذج أفضل بالعربي؟"
- يريد مقارنة بين Claude و GPT أو غيرهم
- يريد يعرف نقاط ضعف نموذج معين بالعربي
