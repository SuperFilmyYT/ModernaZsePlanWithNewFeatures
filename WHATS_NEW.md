# 🆕 CO NOWEGO W VERSION 2.0

**ZSE Planner Pro - February 2026**

---

## 🎯 3 Główne funkcje

### 1️⃣ VERCEL (Hosting w chmurze)

Teraz możesz wdrożyć aplikację jednym klikiem:

```
GitHub → Push → Vercel → Live! 🚀
```

**Zalety:**
- ⚡ Ultra szybka (CDN global)
- 🔄 Auto-deploy (każdy push = deploy)
- 📊 Wbudowana analytics
- 💰 Gratis dla edukacji
- 🔒 Automatyczne SSL

**Nowy plik**: `vercel.json`

---

### 2️⃣ OFFLINE (Pracuje bez internetu)

Teraz aplikacja zapisuje plan w pamięci telefonu:

```
1. Otwórz raz online
2. Później pracuje 100% offline
3. Nawet w piwnicy szkoły! 📚
```

**Jak to działa:**
- Service Worker = "aplikacja" w przeglądarce
- Cache API = pamięć na telefonie
- Automatic sync = synchronizacja przy powrocie online

**Nowe pliki**: `public/sw.js`, `public/manifest.json`

---

### 3️⃣ PHOTOS UPGRADE (Lepsze zdjęcia)

Zdjęcia nauczycieli wyglądają bardziej profesjonalnie:

**Przed (v1.0):**
```
❌ Brak zdjęcia = błąd 404
❌ Zniekształcone (różne rozmiary)
```

**Po (v2.0):**
```
✅ Fallback message: "Zdjęcia jeszcze nie ma..."
✅ Profesjonalny format: 4:5 (legitymacja)
✅ Piękny glassmorphism effect
```

---

## 📋 Wszystkie nowe pliki

```
vercel.json                 ← Konfiguracja chmury
api/substitutions.js        ← Proxy dla API
public/sw.js               ← Service Worker
public/manifest.json       ← PWA manifest
public/nauczyciele/        ← Folder na zdjęcia
  └─ README.md            ← Instrukcja
instrukcja_zdjecia.txt     ← Photo instructions
UPGRADE_GUIDE.md           ← Jak upgradować
VERCEL_DEPLOYMENT.md       ← Jak wdrażać
RELEASE_NOTES.md           ← Szczegóły v2.0
```

---

## 🔄 Co się zmieniło w starych plikach

| Plik | Co nowego |
|------|-----------|
| `index.html` | PWA meta tags + SW registration |
| `package.json` | Nowa wersja 2.0.0 |
| `TeacherTooltip.vue` | Aspect-ratio 4/5 + fallback |
| `AdminPanel.vue` | Nowy tab "Dane" (export/import) |
| `substitutions.js` | API proxy support |
| `.gitignore` | Vercel + Nauczyciele folders |

---

## 🚀 Jak zacząć z v2.0?

### Scenariusz 1: Nowa instalacja

```bash
git clone <repo>
npm install
npm run dev
# Gotowe! 🎉
```

### Scenariusz 2: Upgrade z v1.0

Czytaj: [UPGRADE_GUIDE.md](UPGRADE_GUIDE.md)

Krótko:
```bash
npm install
npm run dev
# Tyle! (wszystko inne obsługiwane wstecz)
```

### Scenariusz 3: Deploy na Vercel

Czytaj: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

Krótko:
```bash
git push
# Vercel robi resztę! 🚀
```

---

## ✅ Checklist dla wszystkich

### Dla użytkownika (nauczyciela)

- [ ] Aplikacja działa offline (F12 → Application → offline mode)
- [ ] Zdjęcia nauczycieli wyglądają profesjonalnie
- [ ] Plan lekcji jest szybki
- [ ] Możesz zainstalować aplikację na telefonie

### Dla administratora

- [ ] Możesz wdrożyć na Vercel (lub GitHub Pages)
- [ ] Backup zastépstw (export JSON)
- [ ] Restore z backup'u (import JSON)
- [ ] Monitoring performance (Vercel dashboard)

### Dla programisty

- [ ] `/api/substitutions` działa (CORS proxy)
- [ ] Service Worker się rejestruje (DevTools)
- [ ] Build na Vercel przebiega bez błędów
- [ ] Photos folder struktura jest dobra

---

## 🎨 Design Improvements

### Przed v2.0:
```
Photo:      Bez aspect ratio → Zniekształcone
Fallback:   404 error → Zamieszanie
UI:         Stary tooltip style
```

### Po v2.0:
```
Photo:      4:5 aspect ratio → Profesjonalne
Fallback:   Miłe "Tbd..." message → Zawiadomienie
UI:         Nowoczesny glass effect → Lepko wygląda
```

---

## 📊 Performance

| Metrika | Zmiana |
|---------|--------|
| Bundle size | +10 KB (Service Worker) |
| Core Web Vitals | Bez zmian (18 kb/s) |
| Offline support | ➕ NOWE |
| Deploy time | ⬇️ Szybciej (Vercel) |
| Cache hit rate | ⬆️ Lepiej (PWA) |

---

## 🔐 Security

- ✅ CORS proxy na Vercel (bezpieczne)
- ✅ CSP headers (już w vercel.json)
- ✅ Service Worker isolation
- ✅ No sensitive data stored

---

## 🐛 Bug Fixes

```
✅ Photos: 404 → Fallback message
✅ API: CORS blocked → Vercel proxy
✅ Admin: No export → JSON export/import
✅ Design: Stretched photos → aspect-ratio
✅ Offline: No data → Service Worker cache
```

---

## 🎯 Co można zrobić teraz?

### 1. Deploy URL

```
Przed: Musisz sam hostować
Po:    https://zse-plan-lekcji.vercel.app
```

### 2. Offline mode

```
Przed: Brakuje internetu = koniec
Po:    Brakuje internetu = nadal działa! 📱
```

### 3. Device installation

```
Przed: Włoż bookmark
Po:    "Install app" button (PWA) 📲
```

### 4. Backup data

```
Przed: Zastępstwa lokalnie (no backup)
Po:    Export JSON + Backup file 💾
```

---

## 🚀 Wdrażanie na Vercel

**Nowy, SUPER PROSTY proces:**

```bash
# 1. Push na GitHub
git add .
git commit -m "ZSE Planner Pro v2.0"
git push origin main

# 2. Vercel detektuje i deployuje
# (No do anything!)

# 3. Czekaj 2-3 minuty...
# https://zse-plan-lekcji.vercel.app ✅
```

---

## 📱 PWA - Co to dokładnie?

**Progressive Web App** = Aplikacja jak na telefonie, ale w przeglądarce

| Feature | Jak to działa |
|---------|---------------|
| **Offline** | Service Worker cachuje dane |
| **Install** | "Add to Home Screen" button |
| **Notifications** | Push notyfikacje (v2.1) |
| **Icons** | App na home screen |
| **Fast** | Cached = ultra szybkie |

**Test:**
1. Otwórz na telefonie
2. Naciśnij menu (⋯) → "Install"
3. Traktuj jak normalną aplikację! 🎉

---

## 🌟 Highlights

**Dla szkoły:**
- Bezpłatne hosting (Vercel for Education)
- Profesjonalny wygląd
- Zero downtime deployment

**Dla uczniów:**
- Działa bez internetu (w piwnicy! 😄)
- Szybkie ładowanie
- Może zainstalować na telefonie

**Dla nauczycieli:**
- Widzi swoją klawiaturę zdjęcie
- Możliwość dodawania zastépstw
- Bez technicznych niuansów

**Dla IT admina:**
- Push-button deployment
- Auto-scaling
- Monitoring wbudowany

---

## 💡 Tips & Tricks

### Tip 1: Offline mode

```
Testuj: DevTools → Application → Service Workers → Offline
```

### Tip 2: API proxy

```
Działa wszędzie bez CORS!
API: https://zastepstwa.zse.bydgoszcz.pl/api
Proxy: /api/substitutions
```

### Tip 3: Photos fast

```
Format: JPG (nie PNG)
Size: 300×375px
Quality: 85% JPEG
```

---

## 🎓 Learning Resource

Jeśli chcesz się dowiedzieć więcej:

1. **Service Workers**: https://web.dev/service-workers/
2. **Vercel**: https://vercel.com/docs
3. **PWA**: https://web.dev/progressive-web-apps/
4. **Offline**: https://web.dev/offline-fallbacks/

---

## 🎉 TLDR (Ultra-krótko)

**v2.0 to wydanie które sprawia że aplikacja:**

1. ✅ Działa offline
2. ✅ Deplojuje się na Vercel
3. ✅ Lepiej wygląda (zdjęcia)
4. ✅ Ma backup danych
5. ✅ Jest gotowa na produkcję

**Zaletanowa:**
- Nauczyciele mogą używać w piwnicy szkoły
- IT admin może wdrożyć jednym klikiem
- Uczniowie mogą zainstalować na telefonie

---

**📚 Miłego korzystania z v2.0!** ✨

For upgrades: [UPGRADE_GUIDE.md](UPGRADE_GUIDE.md)  
For deployment: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)  
More details: [RELEASE_NOTES.md](RELEASE_NOTES.md)
