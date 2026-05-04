---
name: khalas
description: Arabic text summarization and token optimization
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [khalas]
  env_vars: []
metadata:
  hermes:
    tags: [nlp, summarization, tokens, arabic]
---
# khalas — محسّن التوكنات العربية

أداة لتقليل تكلفة البرومبتات العربية وتحليل كفاءة التوكنات.

## الأوامر

### مقارنة عربي vs إنجليزي
```bash
khalas compare "النص العربي هنا"
```
يعرض عدد التوكنات والتكلفة بالعربي مقابل الإنجليزي.

### تحسين برومبت
```bash
khalas optimize "النص العربي الطويل هنا"
```
يعيد كتابة النص لتقليل التوكنات مع الحفاظ على المعنى.

### حساب التوفير
```bash
khalas savings "النص"
```

### شرح مكان الهدر
```bash
khalas explain "النص"
```
يفصّل أين تُهدر التوكنات (تشكيل، حروف زائدة، إلخ).

## متى تستخدم
- المستخدم يسأل "ليش العربي أغلى بالتوكنات؟"
- يريد تقليل تكلفة API
- يقارن أسعار بين مزوّدين مختلفين
