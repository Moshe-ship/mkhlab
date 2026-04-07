---
name: voice-assistant
description: "مساعد صوتي عربي — حوّل الصوت لنص، عالجه، وردّ بصوت عربي. خط أنابيب كامل: Whisper → LLM → TTS. استخدم عندما يريد المستخدم تفاعل صوتي كامل."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, voice-assistant]
---


# مساعد صوتي عربي

خط أنابيب صوتي كامل: استقبال صوت → تفريغ → معالجة → رد صوتي.

## خط الأنابيب

### 1. استقبال وتحويل الصوت
```bash
# تحويل أي صيغة لـ WAV مناسب لـ Whisper
ffmpeg -i INPUT_FILE -ar 16000 -ac 1 -c:a pcm_s16le /tmp/mkhlab_input.wav
```

### 2. تفريغ النص (STT)
```bash
whisper /tmp/mkhlab_input.wav --language Arabic --model medium --output_format txt --output_dir /tmp/
```

### 3. معالجة النص
بعد التفريغ، مرر النص للنموذج اللغوي للرد.

### 4. تحويل الرد لصوت (TTS)

#### Voxtral (سحابي)
```bash
curl -s -X POST "https://api.mistral.ai/v1/audio/speech" \
  -H "Authorization: Bearer $MISTRAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "voxtral-mini-2025-12", "input": "النص", "voice": "aria", "language": "ar", "response_format": "mp3"}' \
  --output /tmp/mkhlab_response.mp3
```

#### F5-TTS (محلي — Apple Silicon)
```bash
# إذا مثبت F5-TTS محلياً
python3 -m f5_tts --text "النص العربي" --output /tmp/mkhlab_response.wav --lang ar
```

### 5. تشغيل الرد
```bash
# macOS
afplay /tmp/mkhlab_response.mp3

# Linux
aplay /tmp/mkhlab_response.wav
```

## الأمر الكامل (سكربت واحد)
```bash
# تفريغ → طباعة النص → (المستخدم يعالج) → تحويل لصوت
whisper "$1" --language Arabic --model medium --output_format txt --output_dir /tmp/ && \
cat /tmp/$(basename "$1" | sed 's/\.[^.]*$//').txt
```

## متى تستخدم
- المستخدم يرسل ملف صوتي ويريد رد صوتي
- يريد "تكلمني بالعربي"
- يريد بودكاست أو محتوى صوتي من نص
- يطلب قراءة آية أو حديث بصوت
