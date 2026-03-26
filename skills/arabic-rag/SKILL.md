---
name: arabic-rag
description: "بحث دلالي عربي — ابحث في القرآن والأحاديث والنصوص العربية بالمعنى مو بالكلمة. يستخدم AraGemma embeddings للبحث الذكي. استخدم عندما البحث النصي البسيط ما يكفي."
metadata: {"openclaw": {"emoji": "🧠", "requires": {"bins": ["python3"]}}}
---

# بحث دلالي عربي (Arabic RAG)

بحث بالمعنى في النصوص العربية باستخدام embeddings — أدق من البحث بالكلمة.

## متى تستخدم
- المستخدم يبحث عن آية بالمعنى مو بالكلمة الدقيقة
- يبحث عن أحاديث متعلقة بموضوع معين
- يريد بحث دلالي في مستندات عربية

## الإعداد

### تثبيت المكتبات
```bash
pip3 install sentence-transformers faiss-cpu
```

### تحميل نموذج الـ embeddings
```python
from sentence_transformers import SentenceTransformer

# AraGemma — أفضل embeddings عربية (300M params)
model = SentenceTransformer("Omartificial-Intelligence-Space/AraGemma-Embedding-300m")

# بديل أخف
# model = SentenceTransformer("silma-ai/silma-embedding-matryoshka-0.1")
```

## البحث في القرآن بالمعنى

```python
import json
import numpy as np
import faiss

# 1. تحميل آيات القرآن
# يمكن تحميلها من: https://api.alquran.cloud/v1/quran/quran-uthmani
with open("quran_ayahs.json") as f:
    ayahs = json.load(f)

texts = [a["text"] for a in ayahs]

# 2. توليد embeddings
embeddings = model.encode(texts, show_progress_bar=True)

# 3. بناء فهرس FAISS
dimension = embeddings.shape[1]
index = faiss.IndexFlatIP(dimension)  # Inner Product for cosine similarity
faiss.normalize_L2(embeddings)
index.add(embeddings)

# 4. البحث
query = "الصبر على البلاء"
query_embedding = model.encode([query])
faiss.normalize_L2(query_embedding)

distances, indices = index.search(query_embedding, k=5)

for i, idx in enumerate(indices[0]):
    print(f"{i+1}. [{ayahs[idx]['surah']}:{ayahs[idx]['ayah']}] {texts[idx][:100]}...")
    print(f"   التشابه: {distances[0][i]:.3f}")
```

## البحث في الأحاديث بالمعنى

```python
# نفس الطريقة — حمّل أحاديث البخاري/مسلم وابنِ فهرس FAISS
# البيانات متاحة من: https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json
```

## البحث في مستندات المستخدم

```python
# 1. حمّل المستندات
documents = ["doc1 text...", "doc2 text...", ...]

# 2. قسّم لقطع (chunks) — 512 token لكل قطعة
from sentence_transformers import SentenceTransformer

chunks = []
for doc in documents:
    words = doc.split()
    for i in range(0, len(words), 400):  # overlap 100
        chunk = " ".join(words[max(0, i-100):i+400])
        chunks.append(chunk)

# 3. نفس خطوات البناء والبحث أعلاه
```

## القواعد
- البحث الدلالي مكمّل للبحث النصي — استخدم كليهما
- للقرآن: اعرض الآية كاملة مع رقم السورة والآية
- للأحاديث: اعرض مع الكتاب والراوي
- نبّه أن النتائج بحسب التشابه الدلالي وقد لا تكون مطابقة 100%
