---
name: arabic-agent-eval
description: Arabic function-calling benchmark — evaluate how well LLMs handle tool calling in Arabic
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [aae]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, evaluation, benchmark, function-calling, agent]
    related_skills: [arabic-toolproof, arabench]
---

# تقييم الوكلاء العرب — Arabic Agent Eval

أول معيار قياس لاستدعاء الأدوات بالعربي.

## التثبيت

```bash
pip install arabic-agent-eval
```

## الاستخدام

### تقييم سريع

```bash
aae quick openai
```

### تقييم كامل

```bash
aae run
```

### مقارنة بين موفرين

```bash
aae compare openai anthropic
```

## فئات التقييم

ست فئات:

1. استدعاء بسيط — اختيار الدالة الصحيحة واستخراج المعاملات
2. استخراج المعاملات — استخراج بيانات عربية من نص طبيعي
3. تفكير متعدد الخطوات — سلسلة استدعاءات متتابعة
4. معالجة اللهجات — فهم خليجي ومصري وشامي ومغاربي
5. اختيار الأداة — اختيار الأداة الصحيحة من عشر خيارات
6. معالجة الأخطاء — التعامل مع ردود الخطأ بالعربي

## مجموعة البيانات

- واحد وخمسين عنصر تقييم
- خمس لهجات عربية
- اثنين وعشرين دالة عربية (صلاة، زكاة، قرآن، أسهم تداول، وغيرها)
- ثلاث مستويات صعوبة

## التقييم

لكل عنصر:
- اختيار الدالة: هل اختار الموديل الدالة الصحيحة؟
- دقة المعاملات: هل المعاملات المستخرجة صحيحة؟
- حفظ العربية: هل القيم العربية محفوظة ولا تُرجمت؟
- فهم اللهجة: هل فهم الموديل اللهجة؟

## إحصائيات المجموعة

```bash
aae dataset
```
