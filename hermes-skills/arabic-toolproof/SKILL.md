---
name: arabic-toolproof
description: ToolProof integration — verify agent tool calls, generate trust reports, analyze cost patterns
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [toolproof]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, verification, trust, security, toolproof]
    related_skills: [arabic-siri, arabic-agent-eval]
---

# التحقق من أدوات الوكيل — ToolProof

التحقق من استدعاءات الأدوات وكشف الهلوسة وتتبع التكاليف.

## التثبيت

```bash
pip install toolproof
```

## الاستخدام

### تسجيل استدعاءات الأدوات

عند تشغيل وكيل، سجّل كل الاستدعاءات:

```bash
toolproof wrap -- python agent.py
```

### التحقق من الادعاءات

بعد ما الوكيل يخلص، تحقق من ادعاءاته:

```bash
toolproof verify agent_output.json
```

النتائج الممكنة:
- متحقق: الادعاء يطابق الإيصال
- غير متحقق: ما في إيصال (هلوسة محتملة)
- متلاعب: الإيصال موجود بس ما يطابق (هلوسة مؤكدة)

### تحليل الأنماط

```bash
toolproof analyze
```

يلقى:
- أي أدوات تتهلوس أكثر
- تكاليف شاذة
- كفاءة الكاش
- توصيات للتحسين

### تقرير الثقة

```bash
toolproof report --html --output trust-report.html
```

### استيراد من هيرمز

```bash
toolproof import-hermes --profile mkhlab
```

### ملاحظات تحسين

```bash
toolproof feedback --format hermes --output ~/.hermes/profiles/mkhlab/feedback.json
```

## درجات الثقة

- أ: 95% أو أعلى — الوكيل موثوق
- ب: 85-94% — جيد مع بعض الثغرات
- ج: 70-84% — ادعاءات كثيرة غير متحققة
- د: 50-69% — غير موثوق
- ر: أقل من 50% — الوكيل يكذب أكثر من ما يصدق
