---
name: arabic-ocr
description: Arabic OCR text extraction from images and documents
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [media, ocr, arabic, image]
---
# التعرف على النص العربي (OCR)

## QARI-OCR (الأفضل للعربي)

### عبر HuggingFace API
```bash
curl -s -X POST "https://api-inference.huggingface.co/models/qari-ai/QARI-OCR-v0.3" \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: image/png" \
  --data-binary @IMAGE_FILE
```

## Tesseract (محلي — بديل مجاني)

### تثبيت
```bash
# macOS
brew install tesseract tesseract-lang

# التأكد من دعم العربي
tesseract --list-langs | grep ara
```

### استخراج النص
```bash
tesseract IMAGE_FILE output -l ara
cat output.txt
```

### عربي + إنجليزي معا
```bash
tesseract IMAGE_FILE output -l ara+eng
```

### تحسين الدقة
```bash
# تحسين الصورة أولا
magick IMAGE_FILE -resize 300% -sharpen 0x1 -threshold 50% improved.png
tesseract improved.png output -l ara --psm 6
```

## متى تستخدم
- المستخدم يرسل صورة فيها نص عربي
- يريد استخراج نص من مستند PDF ممسوح
- يريد قراءة مخطوطة أو وثيقة قديمة
- يريد تحويل صورة واتساب فيها نص لنص قابل للنسخ

## أوضاع PSM (Page Segmentation Modes)
| الوضع | الاستخدام |
|-------|-----------|
| `--psm 3` | تلقائي (افتراضي) |
| `--psm 6` | كتلة نص واحدة (الأفضل للمستندات) |
| `--psm 7` | سطر واحد |
| `--psm 8` | كلمة واحدة |
| `--psm 13` | نص خام بدون OSD |

## القواعد
- الصور الواضحة عالية الدقة تعطي نتائج أفضل
- المخطوطات والخطوط المزخرفة تكون أقل دقة — نبّه المستخدم
- إذا النتيجة ضعيفة، اقترح تحسين الصورة أولا
