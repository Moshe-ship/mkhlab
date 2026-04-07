---
name: saudi-shipping
description: "الشحن والتوصيل في السعودية — تتبع شحنات وإنشاء بوالص شحن عبر شركات مثل سمسا وأرامكس وناقل. استخدم عندما يسأل المستخدم عن شحن أو تتبع طرد في السعودية."
version: 1.0.0
author: Mousa Abu Mazin
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [curl]
  env_vars: []
metadata:
  hermes:
    tags: [arabic, saudi-shipping]
---


# الشحن والتوصيل في السعودية

دليل شامل لشركات الشحن والتوصيل المتاحة في المملكة العربية السعودية.

## نظرة عامة

| الشركة | النوع | التغطية | التواصل |
|--------|-------|---------|---------|
| سمسا (SMSA) | شحن سريع | محلي + دولي | 920009999 |
| أرامكس (Aramex) | شحن سريع | محلي + دولي | 920027447 |
| ناقل (Naqel) | شحن سريع | محلي | 920020505 |
| جي آند تي (J&T) | شحن اقتصادي | محلي | 8001111088 |
| بارق فليت (BARQ) | توصيل آخر ميل | محلي | barqfleet.com |
| البريد السعودي (SPL) | بريد حكومي | محلي + دولي | 920005700 |

## سمسا (SMSA Express)

### الإعداد
1. تواصل مع سمسا للحصول على passKey
2. اضبط المتغير: `export SMSA_PASSKEY=your_passkey`

### إنشاء شحنة
```bash
curl -s -X POST "http://track.smsaexpress.com/SECOM/SMSAwebService.asmx" \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: http://track.smsaexpress.com/seabornesecom/addShipment" \
  -d '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:ser="http://track.smsaexpress.com/seabornesecom">
  <soap:Body>
    <ser:addShipment>
      <ser:passKey>'$SMSA_PASSKEY'</ser:passKey>
      <ser:refNo>ORDER_123</ser:refNo>
      <ser:sentDate>2026-03-26</ser:sentDate>
      <ser:idNo></ser:idNo>
      <ser:cName>محمد أحمد</ser:cName>
      <ser:cntry>SA</ser:cntry>
      <ser:cCity>الرياض</ser:cCity>
      <ser:cAddr1>حي النرجس، شارع الأمير تركي</ser:cAddr1>
      <ser:cMobile>0500000000</ser:cMobile>
      <ser:shipType>DLV</ser:shipType>
      <ser:PCs>1</ser:PCs>
      <ser:cEmail>test@example.com</ser:cEmail>
      <ser:codAmt>0</ser:codAmt>
      <ser:weight>1</ser:weight>
    </ser:addShipment>
  </soap:Body>
</soap:Envelope>'
```

### تتبع شحنة
```bash
curl -s -X POST "http://track.smsaexpress.com/SECOM/SMSAwebService.asmx" \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: http://track.smsaexpress.com/seabornesecom/getTracking" \
  -d '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:ser="http://track.smsaexpress.com/seabornesecom">
  <soap:Body>
    <ser:getTracking>
      <ser:passKey>'$SMSA_PASSKEY'</ser:passKey>
      <ser:awbNo>AWB_NUMBER</ser:awbNo>
    </ser:getTracking>
  </soap:Body>
</soap:Envelope>'
```

### حالة الشحنة
```bash
curl -s -X POST "http://track.smsaexpress.com/SECOM/SMSAwebService.asmx" \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: http://track.smsaexpress.com/seabornesecom/getStatus" \
  -d '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:ser="http://track.smsaexpress.com/seabornesecom">
  <soap:Body>
    <ser:getStatus>
      <ser:passKey>'$SMSA_PASSKEY'</ser:passKey>
      <ser:awbNo>AWB_NUMBER</ser:awbNo>
    </ser:getStatus>
  </soap:Body>
</soap:Envelope>'
```

## أرامكس (Aramex)

### الإعداد
1. سجّل في: https://www.aramex.com/developers
2. احصل على بيانات الحساب (AccountNumber, AccountPin, AccountEntity, AccountCountryCode)
3. اضبط المتغيرات:
```bash
export ARAMEX_USERNAME=your_email
export ARAMEX_PASSWORD=your_password
export ARAMEX_ACCOUNT_NUMBER=your_account
export ARAMEX_ACCOUNT_PIN=your_pin
export ARAMEX_ACCOUNT_ENTITY=your_entity
```

### إنشاء شحنة
```bash
curl -s -X POST "https://ws.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreateShipments" \
  -H "Content-Type: application/json" \
  -d '{
    "ClientInfo": {
      "UserName": "'$ARAMEX_USERNAME'",
      "Password": "'$ARAMEX_PASSWORD'",
      "AccountNumber": "'$ARAMEX_ACCOUNT_NUMBER'",
      "AccountPin": "'$ARAMEX_ACCOUNT_PIN'",
      "AccountEntity": "'$ARAMEX_ACCOUNT_ENTITY'",
      "AccountCountryCode": "SA",
      "Version": "v1.0"
    },
    "Shipments": [{
      "Shipper": {
        "Reference1": "ORDER_123",
        "AccountNumber": "'$ARAMEX_ACCOUNT_NUMBER'",
        "PartyAddress": {
          "Line1": "شارع العليا",
          "City": "Riyadh",
          "CountryCode": "SA"
        },
        "Contact": {
          "PersonName": "المتجر",
          "PhoneNumber1": "0110000000",
          "CellPhone": "0500000000",
          "EmailAddress": "shop@example.com"
        }
      },
      "Consignee": {
        "PartyAddress": {
          "Line1": "حي النرجس",
          "City": "Riyadh",
          "CountryCode": "SA"
        },
        "Contact": {
          "PersonName": "محمد أحمد",
          "PhoneNumber1": "0500000000",
          "CellPhone": "0500000000",
          "EmailAddress": "customer@example.com"
        }
      },
      "Details": {
        "NumberOfPieces": 1,
        "ActualWeight": {"Value": 1, "Unit": "KG"},
        "ProductGroup": "DOM",
        "ProductType": "ONP",
        "PaymentType": "P"
      }
    }]
  }'
```

### تتبع شحنة
```bash
curl -s -X POST "https://ws.aramex.net/ShippingAPI.V2/Tracking/Service_1_0.svc/json/TrackShipments" \
  -H "Content-Type: application/json" \
  -d '{
    "ClientInfo": {
      "UserName": "'$ARAMEX_USERNAME'",
      "Password": "'$ARAMEX_PASSWORD'",
      "AccountNumber": "'$ARAMEX_ACCOUNT_NUMBER'",
      "AccountPin": "'$ARAMEX_ACCOUNT_PIN'",
      "AccountEntity": "'$ARAMEX_ACCOUNT_ENTITY'",
      "AccountCountryCode": "SA",
      "Version": "v1.0"
    },
    "Shipments": ["AWB_NUMBER"]
  }'
```

### حساب تكلفة الشحن
```bash
curl -s -X POST "https://ws.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json/CalculateRate" \
  -H "Content-Type: application/json" \
  -d '{
    "ClientInfo": {
      "UserName": "'$ARAMEX_USERNAME'",
      "Password": "'$ARAMEX_PASSWORD'",
      "AccountNumber": "'$ARAMEX_ACCOUNT_NUMBER'",
      "AccountPin": "'$ARAMEX_ACCOUNT_PIN'",
      "AccountEntity": "'$ARAMEX_ACCOUNT_ENTITY'",
      "AccountCountryCode": "SA",
      "Version": "v1.0"
    },
    "OriginAddress": {"City": "Riyadh", "CountryCode": "SA"},
    "DestinationAddress": {"City": "Jeddah", "CountryCode": "SA"},
    "ShipmentDetails": {
      "NumberOfPieces": 1,
      "ActualWeight": {"Value": 1, "Unit": "KG"},
      "ProductGroup": "DOM",
      "ProductType": "ONP",
      "PaymentType": "P"
    }
  }'
```

## ناقل إكسبريس (Naqel Express)

### الإعداد
1. تواصل مع ناقل للحصول على بيانات SOAP API
2. واجهة SOAP — إنشاء بوليصة شحن (AWB) وتتبع

### إنشاء بوليصة شحن (AWB)
```bash
curl -s -X POST "https://api.naqelexpress.com/NaqelAPIService/NaqelAPIService.svc" \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: http://tempuri.org/INaqelAPIService/AddWaybill" \
  -d '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:tem="http://tempuri.org/">
  <soap:Body>
    <tem:AddWaybill>
      <tem:clientId>YOUR_CLIENT_ID</tem:clientId>
      <tem:password>YOUR_PASSWORD</tem:password>
      <tem:consigneeName>محمد أحمد</tem:consigneeName>
      <tem:consigneeCity>الرياض</tem:consigneeCity>
      <tem:consigneeMobile>0500000000</tem:consigneeMobile>
      <tem:pieces>1</tem:pieces>
      <tem:weight>1</tem:weight>
      <tem:codAmount>0</tem:codAmount>
      <tem:refNo>ORDER_123</tem:refNo>
    </tem:AddWaybill>
  </soap:Body>
</soap:Envelope>'
```

### تتبع شحنة
```bash
curl -s -X POST "https://api.naqelexpress.com/NaqelAPIService/NaqelAPIService.svc" \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: http://tempuri.org/INaqelAPIService/TrackWaybill" \
  -d '<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:tem="http://tempuri.org/">
  <soap:Body>
    <tem:TrackWaybill>
      <tem:clientId>YOUR_CLIENT_ID</tem:clientId>
      <tem:password>YOUR_PASSWORD</tem:password>
      <tem:waybillNo>AWB_NUMBER</tem:waybillNo>
    </tem:TrackWaybill>
  </soap:Body>
</soap:Envelope>'
```

## جي آند تي إكسبريس (J&T Express)

### الإعداد
1. سجّل كشريك في: https://www.jtexpress.sa
2. احصل على apiAccount و privateKey
3. اضبط المتغيرات:
```bash
export JT_API_ACCOUNT=your_account
export JT_PRIVATE_KEY=your_key
```

### إنشاء شحنة
المصادقة تتم عبر MD5 digest signing:
```bash
# حساب التوقيع
DIGEST=$(echo -n '{"orderNo":"ORDER_123"}'"$JT_PRIVATE_KEY" | md5)

curl -s -X POST "https://openapi.jet.co.id/jts-open-api/order/create" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "bizContent={\"orderNo\":\"ORDER_123\",\"senderName\":\"المتجر\",\"senderMobile\":\"0500000000\",\"senderAddress\":\"الرياض\",\"receiverName\":\"محمد أحمد\",\"receiverMobile\":\"0500000000\",\"receiverAddress\":\"جدة\",\"weight\":1,\"itemName\":\"طرد\"}" \
  -d "apiAccount=$JT_API_ACCOUNT" \
  -d "digest=$DIGEST" \
  -d "timestamp=$(date +%s)000"
```

### تتبع شحنة
```bash
DIGEST=$(echo -n '{"billCodes":"AWB_NUMBER"}'"$JT_PRIVATE_KEY" | md5)

curl -s -X POST "https://openapi.jet.co.id/jts-open-api/trace/query" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "bizContent={\"billCodes\":\"AWB_NUMBER\"}" \
  -d "apiAccount=$JT_API_ACCOUNT" \
  -d "digest=$DIGEST" \
  -d "timestamp=$(date +%s)000"
```

## بارق فليت (BARQ Fleet)

### الإعداد
1. سجّل في: https://barqfleet.com
2. احصل على مفتاح API من لوحة التحكم
3. اضبط المتغير: `export BARQ_API_KEY=your_key`

### إنشاء طلب توصيل
```bash
curl -s -X POST "https://api.barqfleet.com/v1/deliveries" \
  -H "Authorization: Bearer $BARQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "pickup": {
      "address": "شارع العليا، الرياض",
      "latitude": 24.71,
      "longitude": 46.67,
      "contact_name": "المتجر",
      "contact_phone": "0500000000"
    },
    "dropoff": {
      "address": "حي النرجس، الرياض",
      "latitude": 24.80,
      "longitude": 46.63,
      "contact_name": "محمد أحمد",
      "contact_phone": "0500000000"
    },
    "description": "طرد صغير"
  }'
```

### تتبع التوصيل
```bash
curl -s "https://api.barqfleet.com/v1/deliveries/DELIVERY_ID" \
  -H "Authorization: Bearer $BARQ_API_KEY"
```

## البريد السعودي (SPL)

### تتبع شحنة
التتبع متاح عبر الموقع الرسمي:
```bash
curl -s "https://api.splonline.com.sa/track/api/TrackingSearch?trackingNumber=AWB_NUMBER"
```

أو عبر الموقع: https://splonline.com.sa/ar/track-trace/

## عرض النتيجة

🚚 تتبع الشحنة:
- شركة الشحن: [الشركة]
- رقم بوليصة الشحن: [AWB]
- الحالة: [تم الاستلام/قيد التوصيل/تم التسليم]
- المدينة الحالية: [المدينة]
- آخر تحديث: [التاريخ والوقت]
- المرسل: [الاسم]
- المستلم: [الاسم]

## متى تستخدم
- المستخدم يسأل عن شحن طرد في السعودية
- يريد تتبع شحنة
- يسأل عن أفضل شركة شحن
- يريد ربط API شحن في متجره
- يسأل "وين شحنتي؟" أو "كيف أشحن طرد؟"

## تنبيه
- أسعار الشحن تختلف حسب الوزن والمدينة ونوع الخدمة
- سمسا وأرامكس يدعمان الدفع عند الاستلام (COD)
- بارق متخصص في التوصيل داخل المدن (آخر ميل)
- تأكد من استخدام العنوان الوطني لدقة التوصيل

## المراجع
- سمسا: https://www.smsaexpress.com
- أرامكس: https://www.aramex.com/developers
- ناقل: https://www.naqelexpress.com
- جي آند تي: https://www.jtexpress.sa
- بارق: https://barqfleet.com
- البريد السعودي: https://splonline.com.sa
