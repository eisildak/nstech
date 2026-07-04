# ✅ Update Checklist - Nexus Global Website

**Verwenden Sie diese Checkliste bei JEDER Änderung**

---

## 📋 Vor der Änderung

- [ ] Welche Seiten werden geändert? _______________
- [ ] Deutsch + Englisch erforderlich? □ Ja  □ Nein
- [ ] Responsive-kritisch? □ Ja  □ Nein
- [ ] Backups erstellt? □ Ja  □ Nein

---

## 🌐 REGEL 1: Mehrsprachigkeit

### Deutsche Version
- [ ] Änderung in deutscher Datei durchgeführt
- [ ] Meta-Tags aktualisiert (title, description)
- [ ] Navigation aktualisiert (falls nötig)
- [ ] Keine englischen Texte in deutscher Version

### Englische Version
- [ ] Exakt gleiche Änderung in englischer Datei
- [ ] Meta-Tags aktualisiert (title, description)
- [ ] Navigation aktualisiert (falls nötig)
- [ ] Keine deutschen Texte in englischer Version

### Sprachschalter
- [ ] DE-Button verlinkt auf deutsche Seite
- [ ] EN-Button verlinkt auf englische Seite
- [ ] Beide Buttons auf allen Seiten funktional

---

## 📱 REGEL 2: Responsive Design

### Visual Test (Browser DevTools)
- [ ] **F12** → **Ctrl+Shift+M** (Device Toolbar)
- [ ] **Mobile 375px**: 
  - [ ] Kein horizontaler Scroll
  - [ ] Texte lesbar
  - [ ] Buttons klickbar (min. 44x44px)
  - [ ] Bilder nicht verzerrt
- [ ] **Tablet 768px**:
  - [ ] Grid bricht korrekt um
  - [ ] Navigation funktional
  - [ ] Alle Elemente sichtbar
- [ ] **Desktop 1280px+**:
  - [ ] Layout nutzt verfügbaren Platz
  - [ ] Keine zu breiten Elemente
  - [ ] Hover-Effekte funktionieren

### Code Check
- [ ] Tailwind responsive classes verwendet:
  - [ ] `sm:`, `md:`, `lg:` wo nötig
  - [ ] Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - [ ] Text: `text-2xl md:text-4xl lg:text-5xl`
- [ ] Keine festen Breiten (`width: 800px`)
- [ ] Bilder mit `max-w-full` oder `w-full`
- [ ] Container mit `max-w-7xl mx-auto px-4`

---

## 🧪 Testing

### Funktional
- [ ] Alle Links funktionieren
- [ ] Formulare senden Daten korrekt
- [ ] JavaScript ohne Errors
- [ ] Bilder laden korrekt

### Browser Console
- [ ] **F12** → Console Tab
- [ ] Keine roten Error-Meldungen
- [ ] Keine 404 Not Found Errors

### Performance (optional)
- [ ] Lighthouse Test:
  - [ ] Performance > 90
  - [ ] Accessibility > 95
  - [ ] Best Practices > 95
  - [ ] SEO = 100

---

## 📝 Git Commit

### Commit Message Template

```
<type>: <kurze Beschreibung>

✅ REGEL 1 - Mehrsprachigkeit:
- [x] Deutsche Version geändert
- [x] Englische Version geändert
- [x] Keine Sprach-Vermischung

✅ REGEL 2 - Responsive:
- [x] Mobile (375px) getestet
- [x] Tablet (768px) getestet
- [x] Desktop (1280px+) getestet
- [x] Keine Layout-Probleme
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`

### Beispiel:

```
feat: Add ISTQB certification logo

✅ REGEL 1 - Mehrsprachigkeit:
- [x] Deutsche Version (index.html, leistungen.html)
- [x] Englische Version (index-en.html)
- [x] Keine Sprach-Vermischung

✅ REGEL 2 - Responsive:
- [x] Mobile (375px) getestet - Logo skaliert
- [x] Tablet (768px) getestet - OK
- [x] Desktop (1280px+) getestet - OK
- [x] Grid angepasst (4col → 5col)
```

---

## 🚀 Deployment

### Pre-Deployment
- [ ] Alle Checklisten oben abgehakt
- [ ] Code committed mit Quality-Check Message
- [ ] README aktualisiert (falls neue Seiten)

### Deployment
```bash
git add .
git commit -m "..."
git push origin main
```

### Post-Deployment
- [ ] Live-Website aufrufen
- [ ] Deutsche Version testen
- [ ] Englische Version testen
- [ ] Mobile auf echtem Gerät testen (optional)

---

## 🆘 Bei Problemen

### Horizontal Scroll auf Mobile?
```html
<!-- Problem finden -->
<!-- Suche nach festen Breiten oder overflow -->

<!-- Lösung: -->
<div class="max-w-7xl mx-auto px-4">
  <!-- Inhalt -->
</div>
```

### Deutsche Texte in EN-Version?
```bash
# In Terminal:
grep -E "(Startseite|Kontakt|Über Uns)" *-en.html

# Sollte LEER sein!
```

### Navigation auf Mobile kaputt?
```html
<!-- Prüfe ob JavaScript vorhanden: -->
<script>
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}
</script>
```

---

## 📞 Support

**Bei Fragen:**
- 📖 Siehe [QUALITY_RULES.md](QUALITY_RULES.md)
- 📗 Siehe [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- 📧 Team kontaktieren: dev@Nexus Global.de

---

## ✨ Quick Commands

```bash
# Lokalen Server starten
npm start

# DevTools öffnen
F12

# Responsive Modus
Ctrl+Shift+M

# Element untersuchen
Ctrl+Shift+C

# Git status
git status

# Git commit
git add . && git commit -m "..." && git push
```

---

**Drucke diese Seite aus und hänge sie neben deinen Monitor! 📌**

---

**Version**: 1.0  
**Letztes Update**: 17. Januar 2025
