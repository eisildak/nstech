# 🔐 GÜVENLİK UYARISI: API Key'leri Git'e Yüklenmiş!

## ⚠️ ACIL AKSIYON GEREKLİ

Bu repository'de **2 adet API key** public olarak commit edilmiştir:

1. **Gemini API Key**: `[REDACTED - ROTATED]`
2. **Resend API Key**: `[REDACTED - ROTATED]`

## 🚨 Hemen Yapılması Gerekenler

### 1️⃣ API Key'leri İPTAL EDİN

#### Gemini API Key İptali:
1. [Google AI Studio](https://aistudio.google.com/app/apikey) adresine gidin
2. Mevcut key'i **DELETE** edin
3. Yeni bir API key oluşturun
4. Yeni key'i `.env` dosyasına kaydedin (asla git'e commitlemeyin!)

#### Resend API Key İptali:
1. [Resend Dashboard](https://resend.com/api-keys) adresine gidin
2. Mevcut key'i **REVOKE** edin
3. Yeni bir API key oluşturun
4. Yeni key'i `.env` dosyasına kaydedin

### 2️⃣ Git History'den Temizleme (Opsiyonel ama Önerilen)

Commit history'de API key'ler hala duruyor. Tamamen temizlemek için:

```bash
# git-filter-repo kullanarak (önerilen)
pip install git-filter-repo

# API key'leri replace et
git filter-repo --replace-text <(cat <<EOF
OLD_GEMINI_KEY==>REMOVED_API_KEY
OLD_RESEND_KEY==>REMOVED_API_KEY
EOF
)

# Force push (DİKKAT: Tüm collaborators'ı bilgilendirin!)
git push origin --force --all
```

**VEYA** BFG Repo-Cleaner ile:

```bash
# BFG indir: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --replace-text replacements.txt

# replacements.txt içeriği:
# OLD_GEMINI_KEY
# OLD_RESEND_KEY

git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push origin --force --all
```

### 3️⃣ .env Dosyası Oluşturun

`.env.example` dosyası oluşturuldu. Kendi key'lerinizi ekleyin:

```bash
cp .env.example .env
# .env dosyasını editleyip kendi API key'lerinizi ekleyin
```

### 4️⃣ Güncellenmiş Dosyaları Commit Edin

```bash
git add .gitignore .env.example chatbot.html README.md CHATBOT_SETUP.md
git commit -m "security: Remove exposed API keys and improve .gitignore"
git push origin main
```

## ✅ Yapılan Düzeltmeler

- ✓ `.gitignore` güncellendi (daha kapsamlı)
- ✓ `.env.example` şablon dosyası oluşturuldu
- ✓ `chatbot.html`'de API key placeholder'a çevrildi
- ✓ `README.md` ve `CHATBOT_SETUP.md`'de API key'ler kaldırıldı
- ✓ Güvenlik uyarıları eklendi

## 📚 Gelecekte API Key Güvenliği

1. **ASLA** API key'leri direkt kodda yazmayın
2. **HER ZAMAN** `.env` dosyası kullanın
3. `.env` dosyasının `.gitignore`'da olduğundan emin olun
4. Production'da **environment variables** kullanın (Vercel, Netlify vb.)
5. Key rotation uygulayın (her 3-6 ayda bir yenileyin)

## 🔗 Yararlı Linkler

- [Google AI Studio API Keys](https://aistudio.google.com/app/apikey)
- [Resend API Keys](https://resend.com/api-keys)
- [git-filter-repo Documentation](https://github.com/newren/git-filter-repo)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

---

**Son Güncelleme**: 17 Ocak 2026  
**Durum**: ⚠️ API key'ler koddan kaldırıldı, ANCAK git history'de hala mevcut!
