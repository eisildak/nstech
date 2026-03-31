# NSTech GmbH - Software QA & ISO Certification

**Professional Software Testing and ISO Certification Services in Germany**

🌐 **Website**: [nstech.de](https://nstech.de)  
📧 **Contact**: info@nstech.de  
🏢 **Services**: QA Consulting, Test Automation, ISO 9001/27001 Certification

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Server runs on http://localhost:3000
```

---

## 📁 Project Structure

```
nstech/
├── 🏠 Homepage
│   ├── index.html              # DE Homepage
│   └── index-en.html           # EN Homepage
│
├── 📄 Core Pages
│   ├── leistungen.html         # QA Services (DE)
│   ├── iso-zertifizierung.html # ISO Certification (DE)
│   ├── uber-uns.html           # About Us (DE)
│   ├── kontakt.html            # Contact (DE)
│   ├── contact.html            # Contact (EN)
│   ├── karriere.html           # Career (DE)
│   └── career.html             # Career (EN)
│
├── ⚖️ Legal Pages
│   ├── datenschutz.html        # Privacy Policy (GDPR)
│   └── impressum.html          # Legal Notice (German Law)
│
├── 📝 Blog & SEO
│   └── blog/
│       ├── index.html          # Blog overview
│       └── *.html              # SEO-optimized articles
│
├── 🤖 Chatbot
│   └── n8n-workflows/
│       ├── nstech-chatbot.json # n8n AI chatbot workflow
│       └── README.md           # Setup instructions
│
├── 📚 Documentation
│   └── docs/
│       ├── QUALITY_RULES.md    # Quality assurance rules ⭐
│       └── QUICK_REFERENCE.md  # Developer quick guide
│
├── 🎨 Assets
│   └── assets/
│       └── black.png           # NSTech logo
│
└── 🔧 Backend
    ├── server.js               # Express server (Email API)
    ├── package.json
    └── .env                    # Environment variables
```

---

## ✨ Features

### 🌐 Multi-Language Support
- **German** (Primary): All pages
- **English**: Homepage, Contact, Career
- **Automatic language detection** via URL structure

### 📱 Fully Responsive
- Mobile-first design (Tailwind CSS)
- Tested on all devices (320px - 2560px)
- Touch-friendly navigation

### 🎯 Core Services
1. **QA Testing Consulting**
   - Process improvement (2-4 weeks)
   - QA setup from scratch (2-6 weeks)
   - QA audit (1-2 weeks)
   - Test automation (2-4 weeks)
   - Training & coaching (1-2 weeks)

2. **ISO Certification**
   - ISO 9001:2015 (Quality Management)
   - ISO 27001:2022 (Information Security)
   - ISO 13485 (Medical Devices)

### 🤖 AI Chatbot (n8n)
- Powered by Google Gemini
- Answers questions about services
- Multi-language support
- Easy website integration

### 📧 Email Integration
- Resend API for transactional emails
- Newsletter subscription
- Contact form with validation
- API key: Set via environment variable (`RESEND_API_KEY`)

### 🔍 SEO Optimized
- Blog with German-focused articles
- Structured data markup
- Meta tags optimization
- GDPR-compliant analytics

### 🏆 Certifications & Badges
- ISTQB Certified logo
- ISO certified badges
- 13+ years experience
- 150+ successful projects

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | HTML5, Tailwind CSS v3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js v4.18.2 |
| **Email** | Resend API v3.0.0 |
| **AI Chatbot** | n8n, Google Gemini |
| **Icons** | Font Awesome 6.4.0 |
| **Fonts** | Google Fonts (Inter) |
| **Hosting** | GitHub Pages (ready) |

---

## 📖 Documentation

### For Developers
- 📘 **[Quality Rules](docs/QUALITY_RULES.md)** - Mandatory quality checks (DE/EN, Responsive)
- 📗 **[Quick Reference](docs/QUICK_REFERENCE.md)** - Cheat sheet for common tasks

### For Setup
- 🤖 **[Chatbot Setup](n8n-workflows/README.md)** - n8n workflow installation guide

---

## 🔒 Quality Assurance Rules

Every change MUST follow these rules:

### ✅ Rule 1: Multi-Language Consistency
- Every German page MUST have an English equivalent
- Navigation links must be consistent across languages
- No German text in English files (and vice versa)

### ✅ Rule 2: Responsive Design
- Test on Mobile (375px), Tablet (768px), Desktop (1280px+)
- No horizontal scrolling on any device
- Touch-friendly elements (min 44x44px)

**→ See [QUALITY_RULES.md](docs/QUALITY_RULES.md) for detailed checklists**

---

## 🚦 Development Workflow

```bash
# 1. Make changes
# Edit files in your editor

# 2. Test locally
npm start
# Open http://localhost:3000

# 3. Check quality rules
# ✓ DE + EN both updated?
# ✓ Responsive tested?

# 4. Commit with checklist
git add .
git commit -m "feat: Add feature X

✅ DE/EN both updated
✅ Responsive tested
"

# 5. Push to production
git push origin main
```

---

## 📧 API Endpoints

### Newsletter Subscribe
```bash
POST http://localhost:3000/api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Contact Form
```bash
POST http://localhost:3000/api/send-email
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "company": "Example GmbH",
  "message": "Interested in QA consulting..."
}
```

---

## 🤖 AI Chatbot Setup

1. Import `n8n-workflows/nstech-chatbot.json` into n8n
2. Get API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Configure in "Gemini AI Model" node
4. Activate workflow
5. Embed in website

**Full guide**: [n8n-workflows/README.md](n8n-workflows/README.md)

---

## 🌍 Pages Overview

| Page | German | English | Status |
|------|--------|---------|--------|
| Homepage | ✅ index.html | ✅ index-en.html | Complete |
| QA Services | ✅ leistungen.html | ⏳ services-en.html | DE ready |
| ISO Cert | ✅ iso-zertifizierung.html | ⏳ iso-en.html | DE only |
| About Us | ✅ uber-uns.html | ⏳ about-en.html | DE only |
| Contact | ✅ kontakt.html | ✅ contact.html | Complete |
| Career | ✅ karriere.html | ✅ career.html | Complete |
| Privacy | ✅ datenschutz.html | - | DE only (legal) |
| Imprint | ✅ impressum.html | - | DE only (legal) |

---

## 📊 Performance Targets

- **Lighthouse Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## 🔐 Environment Variables

Create a `.env` file:

```env
RESEND_API_KEY=your_resend_api_key_here
PORT=3000
```

> ⚠️ **Important**: Get your API key from [Resend Dashboard](https://resend.com/api-keys)

---

## 📝 License & Contact

**© 2025 NSTech GmbH - All Rights Reserved**

- **Website**: https://nstech.de
- **Email**: info@nstech.de
- **Managing Director**: Erol Işıldak
- **Location**: Germany

---

## 🎯 Roadmap

- [x] Homepage (DE + EN)
- [x] QA Services page (DE)
- [x] ISO Certification page (DE)
- [x] Career pages (DE + EN)
- [x] Contact pages (DE + EN)
- [x] Legal pages (Privacy, Imprint)
- [x] Email integration (Resend API)
- [x] ISTQB logo integration
- [x] Blog & SEO articles
- [x] AI Chatbot (n8n)
- [x] Quality documentation
- [ ] English versions (Services, ISO, About)
- [ ] Customer testimonials section
- [ ] Case studies/portfolio
- [ ] Advanced analytics

---

**Built with ❤️ and German Quality Standards**
