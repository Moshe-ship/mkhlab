---
name: whisper-arabic
description: Arabic speech-to-text transcription using OpenAI Whisper
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [whisper, ffmpeg]
  env_vars: []
metadata:
  hermes:
    tags: [media, speech-to-text, whisper, arabic]
---
# تحويل الصوت إلى نص عربي

## Whisper (OpenAI — محلي)

### تفريغ ملف صوتي
```bash
whisper AUDIO_FILE --language Arabic --model medium --output_format txt
```

### النماذج المتاحة
| النموذج | الحجم | الدقة | السرعة |
|---------|-------|-------|--------|
| `tiny` | 39M | منخفضة | سريع جدا |
| `base` | 74M | مقبولة | سريع |
| `small` | 244M | جيدة | متوسط |
| `medium` | 769M | عالية | بطيء |
| `large-v3` | 1.5G | أعلى | بطيء جدا |

**الأفضل للعربي**: `medium` (توازن بين الدقة والسرعة)

### تفريغ مع timestamps
```bash
whisper AUDIO_FILE --language Arabic --model medium --output_format srt
```

### تفريغ من فيديو
```bash
# استخرج الصوت أولا
ffmpeg -i VIDEO_FILE -vn -acodec pcm_s16le -ar 16000 -ac 1 audio.wav
# ثم فرّغ
whisper audio.wav --language Arabic --model medium
```

### API (OpenAI Cloud)
```bash
curl -s -X POST "https://api.openai.com/v1/audio/transcriptions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F file=@AUDIO_FILE \
  -F model="whisper-1" \
  -F language="ar"
```

## متى تستخدم
- المستخدم يرسل ملف صوتي ويريد النص
- يريد تفريغ محاضرة أو خطبة
- يريد ترجمة صوتية (تفريغ + ترجمة)
- يريد عمل subtitles لفيديو عربي

## القواعد
- نبّه أن اللهجات قد تقلل الدقة — الفصحى أدق
- للملفات الطويلة (>30 دقيقة) اقترح تقسيم الملف أولا
- إذا طلب تفريغ + ترجمة، استخدم whisper ثم skill translate
