---
name: voxtral-tts
description: "تحويل النص لصوت عربي — حوّل أي نص عربي لملف صوتي باستخدام Voxtral أو SILMA TTS. استخدم عندما يريد المستخدم سماع نص أو توليد صوت عربي."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, voxtral-tts]
---


# تحويل النص إلى صوت عربي

## Voxtral TTS (Mistral — مارس 2026)

### عبر API
```bash
curl -s -X POST "https://api.mistral.ai/v1/audio/speech" \
  -H "Authorization: Bearer $MISTRAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "voxtral-mini-2025-12",
    "input": "النص العربي هنا",
    "voice": "aria",
    "language": "ar",
    "response_format": "mp3"
  }' \
  --output output.mp3
```

### الأصوات المتاحة
| الصوت | الوصف |
|-------|-------|
| `aria` | أنثوي، واضح |
| `dan` | ذكوري، هادئ |
| `nova` | أنثوي، حيوي |

### voice cloning (استنساخ الصوت)
يدعم Voxtral استنساخ الصوت من عينة أقل من 5 ثوانٍ.

## البديل: SILMA TTS

### عبر HuggingFace
```bash
curl -s -X POST "https://api-inference.huggingface.co/models/silma-ai/SILMA-TTS-v1" \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"inputs": "النص العربي هنا"}' \
  --output output.wav
```

## متى تستخدم
- المستخدم يقول "اقرأ لي" أو "أبي أسمع"
- يريد تحويل نص لبودكاست أو فيديو
- يريد نطق صحيح لكلمة أو آية
- يطلب صوت عربي لمشروع

## القواعد
- تأكد من تشكيل النص قبل التحويل للحصول على نطق أفضل
- للآيات القرآنية، نبّه أن TTS ليس بديلاً عن القراءة الصحيحة
- احفظ الملف بالمسار الذي يحدده المستخدم
