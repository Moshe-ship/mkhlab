---
name: saudi-opendata
description: البيانات المفتوحة السعودية -- أكثر من 11,000 مجموعة بيانات من 289+ جهة حكومية
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl, python3]
  env_vars: []
metadata:
  hermes:
    tags: [saudi, opendata, data, government, statistics, ckan, cma]
---

# البيانات المفتوحة السعودية

دليل الوصول إلى البيانات الحكومية المفتوحة في المملكة العربية السعودية -- أكثر من 11,439 مجموعة بيانات من 289+ جهة حكومية.

---

## بوابة البيانات المفتوحة الرئيسية (data.gov.sa)

لا يتطلب تسجيل أو مفتاح API -- الوصول مجاني بالكامل.

### قائمة جميع مجموعات البيانات

```bash
curl -s "https://od.data.gov.sa/api/3/action/package_list" | python3 -m json.tool
```

### البحث في مجموعات البيانات

```bash
curl -s "https://od.data.gov.sa/api/3/action/package_search?q=السكان&rows=10" | python3 -m json.tool
```

**معاملات البحث:**

| المعامل | الوصف | مثال |
|---------|-------|------|
| `q` | كلمة البحث | `q=التعليم` |
| `rows` | عدد النتائج | `rows=20` |
| `start` | بداية الصفحة | `start=0` |
| `sort` | الترتيب | `sort=metadata_modified desc` |
| `fq` | تصفية متقدمة | `fq=organization:moe` |

### جلب تفاصيل مجموعة بيانات محددة

```bash
curl -s "https://od.data.gov.sa/api/3/action/package_show?id=DATASET_ID" | python3 -m json.tool
```

### قائمة الجهات الحكومية

```bash
curl -s "https://od.data.gov.sa/api/3/action/organization_list" | python3 -m json.tool
```

### بيانات جهة حكومية محددة

```bash
curl -s "https://od.data.gov.sa/api/3/action/organization_show?id=ORG_ID&include_datasets=true" | python3 -m json.tool
```

### تحميل ملف بيانات (CSV/Excel)

```bash
# أولاً، اعثر على رابط المورد من package_show
curl -s "https://od.data.gov.sa/api/3/action/package_show?id=DATASET_ID" | \
  python3 -c "
import json, sys
data = json.load(sys.stdin)
for r in data['result']['resources']:
    print(f\"{r['format']}: {r['url']}\")
"

# ثم حمّل الملف
curl -o data.csv "RESOURCE_URL"
```

---

## مصادر بيانات مفتوحة أخرى

### هيئة السوق المالية (CMA Open Data)

```bash
# بيانات السوق المالية السعودية
curl -s "https://opendata.cma.org.sa/api/endpoint" \
  -H "Accept: application/json"
```

الموقع: https://opendata.cma.org.sa/

يشمل: بيانات الشركات المدرجة، التداول، الصناديق الاستثمارية

### بلدي (Balady Open Data)

بيانات بلدية مفتوحة تشمل: التراخيص، المخالفات، الخدمات البلدية

### صندوق التنمية السياحية (Tourism Development Fund)

```bash
curl -s "https://www.tdf.gov.sa/api/open-data" \
  -H "Accept: application/json"
```

الموقع: https://www.tdf.gov.sa/en/open-data

يشمل: بيانات السياحة، المشاريع، الاستثمارات

---

## أمثلة عملية بـ Python

### البحث وتحميل بيانات

```python
import urllib.request, json

# البحث عن بيانات السكان
url = "https://od.data.gov.sa/api/3/action/package_search?q=population&rows=5"
response = json.loads(urllib.request.urlopen(url).read())

for dataset in response["result"]["results"]:
    print(f"  {dataset['title']}")
    print(f"   الجهة: {dataset.get('organization', {}).get('title', 'N/A')}")
    print(f"   الموارد: {len(dataset.get('resources', []))}")
    print()
```

---

## عرض النتيجة

```
نتائج البحث في البيانات المفتوحة
عدد النتائج: {{ count }}
---
{{ #results }}
العنوان: {{ title }}
الجهة: {{ organization }}
التحديث: {{ last_modified }}
الصيغ: {{ formats }}
{{ /results }}
```

---

## متى تستخدم

استخدم هذه المهارة عندما يسأل المستخدم عن:
- إحصائيات أو بيانات حكومية سعودية
- البيانات المفتوحة (Open Data) في السعودية
- مجموعات بيانات (datasets) من جهات حكومية
- بيانات السوق المالية السعودية (CMA)
- بيانات بلدية أو سياحية
- data.gov.sa أو بوابة البيانات المفتوحة

---

## المراجع

- بوابة البيانات المفتوحة: https://od.data.gov.sa
- بيانات هيئة السوق المالية: https://opendata.cma.org.sa
- صندوق التنمية السياحية: https://www.tdf.gov.sa/en/open-data
- توثيق CKAN API: https://docs.ckan.org/en/latest/api/
