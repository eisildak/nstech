# Nexus Global Website - Mail Altyapısı

Bu proje Resend API kullanarak iletişim formu e-posta entegrasyonu içerir.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env` dosyası zaten yapılandırılmış durumda (Resend API key mevcut)

## Kullanım

Sunucuyu başlatmak için:
```bash
npm start
```
veya
```bash
npm run dev
```

Sunucu `http://localhost:3000` adresinde çalışacak.

## Özellikler

- ✅ Resend API ile e-posta gönderimi
- ✅ İletişim formu entegrasyonu
- ✅ Otomatik yanıt e-postaları
- ✅ HTML formatında profesyonel e-posta şablonları
- ✅ Form validasyonu
- ✅ Hata yönetimi
- ✅ Yükleme durumu gösterimi

## E-posta Akışı

1. Kullanıcı iletişim formunu doldurur
2. Form verileri `/api/send-email` endpoint'ine gönderilir
3. İki e-posta gönderilir:
   - Admin'e (erol.isildak@pointr.tech) bildirim e-postası
   - Kullanıcıya otomatik onay e-postası

## Güvenlik

- API anahtarı `.env` dosyasında saklanır
- `.gitignore` ile API anahtarı versiyon kontrolüne eklenmez
- Form CSRF koruması ve validasyon içerir
- CORS yapılandırması mevcut

## Dosya Yapısı

```
Nexus Global/
├── api/
│   └── send-email.js       # Serverless function (opsiyonel)
├── assets/                 # Görseller
├── kontakt.html           # İletişim sayfası (form ile)
├── server.js              # Express sunucusu
├── package.json           # Bağımlılıklar
├── .env                   # Çevre değişkenleri (API key)
└── .gitignore            # Git ignore kuralları
```

## API Endpoint

**POST** `/api/send-email`

Request body:
```json
{
  "vorname": "Max",
  "nachname": "Mustermann",
  "email": "max@example.com",
  "unternehmen": "Firma GmbH",
  "telefon": "+49 XXX XXXX",
  "interest": "qa-beratung",
  "nachricht": "Merhaba, bilgi almak istiyorum..."
}
```

Response:
```json
{
  "success": true,
  "message": "E-Mail erfolgreich gesendet",
  "id": "resend-email-id"
}
```

## Önemli Notlar

⚠️ **Resend Domain Doğrulaması**: Şu anda `onboarding@resend.dev` kullanılıyor. Production için kendi domain'inizi Resend'de doğrulamanız gerekir.

Kendi domain'inizi eklemek için:
1. [Resend Dashboard](https://resend.com/domains) 'a gidin
2. Domain ekleyin ve DNS kayıtlarını yapılandırın
3. `server.js` dosyasında `from:` alanını güncelleyin: `'Nexus Global <noreply@yourdomain.com>'`

## Lisans

© 2025 Nexus Global Software & Consultancy
