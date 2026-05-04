---
name: saudi-tts
description: "تحويل النص إلى كلام بالعربية السعودية — Saudi Arabic text-to-speech with NAMAA, Lahajati, and dialect support"
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, saudi-tts]
---


# تحويل النص إلى كلام بالعربية السعودية

أدوات تحويل النص العربي إلى كلام — مع دعم اللهجة السعودية واللهجات العربية الأخرى.

## NAMAA-Saudi-TTS

نموذج سعودي مفتوح المصدر (رخصة MIT) لتحويل النص إلى كلام باللهجة السعودية. يدعم استنساخ الصوت من مقطع صوتي قصير.

### الإعداد

```bash
pip install namaa-tts
```

### مثال بايثون

```python
from namaa_tts import NamaaTTS

# تهيئة النموذج
tts = NamaaTTS()

# تحويل نص إلى كلام باللهجة السعودية
audio = tts.synthesize("السلام عليكم، كيف حالك؟")
audio.save("output.wav")

# استنساخ صوت من مقطع مرجعي
audio = tts.synthesize(
    "مرحبا فيكم في المملكة العربية السعودية",
    reference_audio="reference.wav"
)
audio.save("cloned_output.wav")
```

**النموذج على Hugging Face:** `NAMAA-Space/NAMAA-Saudi-TTS`

## Lahajati (لهجتي)

منصة TTS عربية تدعم 192+ لهجة عربية مع خدمة تحويل الكلام إلى نص (STT). تتوفّر طبقة مجانية.

### الإعداد

1. سجّل في: `https://lahajati.ai/en`
2. احصل على مفتاح API من لوحة التحكم

### تحويل نص إلى كلام عبر Lahajati

```bash
curl -X POST "https://api.lahajati.ai/v1/tts" \
  -H "Authorization: Bearer ${LAHAJATI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "مرحبا، كيف الحال؟",
    "dialect": "saudi",
    "voice": "male_01",
    "format": "wav"
  }'
```

### تحويل كلام إلى نص عبر Lahajati

```bash
curl -X POST "https://api.lahajati.ai/v1/stt" \
  -H "Authorization: Bearer ${LAHAJATI_API_KEY}" \
  -F "audio=@recording.wav" \
  -F "language=ar"
```

## Voxtral / Mistral TTS

للتحويل عبر Mistral API (يدعم العربية) — راجع المهارة: **voxtral-tts**

## عرض النتيجة

```
🗣️ تحويل النص إلى كلام
━━━━━━━━━━━━━━━━━━━━━━━━
الأداة: {{tool_name}}
اللهجة: {{dialect}}
النص: {{input_text}}
الملف: {{output_file}}
```

## متى تستخدم

- المستخدم يسأل عن **تحويل النص إلى كلام** بالعربية
- طلب **TTS سعودي** أو **نطق عربي**
- **توليد صوت** من نص عربي
- **قراءة نص عربي** بصوت عالي
- **استنساخ صوت** عربي
- أي ذكر لـ **NAMAA** أو **Lahajati** أو **لهجتي**

## المراجع

- NAMAA-Saudi-TTS: https://huggingface.co/NAMAA-Space/NAMAA-Saudi-TTS
- Lahajati: https://lahajati.ai
