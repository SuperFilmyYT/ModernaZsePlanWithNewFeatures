# 🚀 ZSE Planner Pro - Upgrade Guide

**Z wersji 1.0 na 2.0 (Vercel & PWA Ready)**

---

## 📋 Co nowego w wersji 2.0?

### ✨ Kluczowe nowe funkcje:

| Feature | Status | Opis |
|---------|--------|------|
| **Vercel Hosting** | ✅ Nowe | Wdrażaj na Vercel za jednym klikiem |
| **PWA (Offline)** | ✅ Nowe | Service Workers + Cache API |
| **CORS Proxy** | ✅ Nowe | Vercel Functions dla zastępstw API |
| **Better Photos** | ✅ Ulepszone | Aspect ratio 4/5, fallback message |
| **Data Export/Import** | ✅ Nowe | JSON backup zastépstw |
| **Cleaner Structure** | ✅ Ulepszone | /api folder, /public/nowe |

---

## 📦 Co się zmieniło?

### Nowe pliki

```
✅ vercel.json              # Konfiguracja Vercel
✅ public/sw.js             # Service Worker
✅ public/manifest.json     # PWA manifest
✅ api/substitutions.js     # Vercel Function (proxy)
✅ instrukcja_zdjecia.txt   # Photo instructions
```

### Zmienione pliki

```
✏️ package.json             # Nowa wersja (2.0.0)
✏️ index.html               # PWA meta tags + SW registration
✏️ src/components/TeacherTooltip.vue  # Ulepszone foto + aspect-ratio
✏️ src/utils/substitutions.js         # API proxy support
✏️ src/components/AdminPanel.vue      # Nowy tab (Dane/Export)
```

---

## 🔧 Instrukcja Upgrade

### Krok 1: Pobierz pliki v2.0

```bash
# Backup starej wersji
cp -r zse-plan-lekcji zse-plan-lekcji-backup

# Pobierz nowe pliki z repozytorium
git pull origin main
# lub: Ręcznie pobierz pliki v2.0
```

### Krok 2: Zainstaluj zależności

```bash
cd zse-plan-lekcji
npm install
```

### Krok 3: Testuj lokalnie

```bash
npm run dev
# Powinno otworzyć http://localhost:5173
```

### Krok 4: Build i test

```bash
npm run build
npm run preview
# Testuj na http://localhost:5050
```

---

## 🌐 Wdrożenie na Vercel

### Opcja A: Via GitHub

1. **Push kod na GitHub**
   ```bash
   git add .
   git commit -m "Upgrade to ZSE Planner Pro v2.0"
   git push origin main
   ```

2. **Vercel → Import Project**
   - Wejdź na https://vercel.com/new
   - Wybierz repozytorium GitHub
   - Framework: Vite
   - Build command: `npm run parse && vite build`
   - Wdróż!

### Opcja B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel deploy
```

### Opcja C: Ręczny upload na Vercel

```bash
npm run build
vercel --prod  # Deploy dist/ folder
```

---

## 📱 PWA (Offline Support)

### Jak to działa?

1. **Przy pierwszym ładowaniu**:
   - Service Worker się rejestruje
   - App shell (HTML, CSS, JS) się cachuje
   - Plan lekcji (JSON) się cachuje

2. **Offline mode**:
   - Plan lekcji działa do 100%
   - Zastępstwa: pokazuje błąd (offline)
   - Po powrocie online: automatycznie synchronizuje

3. **Aktualizacje**:
   - Service Worker sprawdza nowe wersje
   - Po aktualizacji: pokazuje "Nowa wersja dostępna"
   - User może zaakceptować i przeładować

### Test offline:

```bash
1. npm run dev
2. Otwórz DevTools (F12)
3. Application → Service Workers
4. Kliknij "Offline"
5. Aplikacja wciąż pracuje! ✅
```

---

## 🔄 CORS Proxy (Vercel Functions)

### Stary sposób (v1.0)
```javascript
// Direct fetch - CORS error
fetch('https://zastepstwa.zse.bydgoszcz.pl/api/substitutions')
```

### Nowy sposób (v2.0)
```javascript
// Via Vercel Function proxy
fetch('/api/substitutions?class=1A')
```

### Jak to działa

- Frontend → pyta `/api/substitutions` (same origin, no CORS!)
- Vercel Function → pyta `https://zastepstwa.zse.bydgoszcz.pl/api`
- Zwraca odpowiedź do frontend'u

**Zaleta**: Działa na wszystkim - localhost, GitHub Pages, Vercel, etc.

---

## 📸 Zdjęcia nauczycieli - Nowy format

### v1.0 (stary format)
```
/public/nauczyciele/jk.jpg
→ Wyświetla się bez aspect-ratio
→ Brak fallback message
```

### v2.0 (nowy format)
```
/public/nauczyciele/TL.jpg
→ Aspect ratio 4/5 (legitymacja)
→ object-fit: cover (bez zniekształceń)
→ Fallback: "Zdjęcia jeszcze nie ma – wkrótce się pojawi"
```

### Co zrobić?

1. Otwórz `instrukcja_zdjecia.txt`
2. Popraw nazwy zdjęć (TL.jpg, a nie tl.jpg!)
3. Upewnij się że są w `/public/nauczyciele/`

---

## 💾 Data Export/Import

### Nowa funkcinalność w AdminPanel

**Tab: "Dane" → Pobierz/Wgraj JSON**

```javascript
// Export (Pobierz)
{
  "substitutions": [
    {
      "id": "local_123456",
      "timestamp": "2026-02-17T...",
      "class": "1A",
      "lessonNumber": 5,
      "teacher": "Jk",
      "note": "Lekcja w sali 110"
    }
  ]
}
```

### Backup & Restore

```bash
# Backup (Export)
1. Otwórz panel Admin
2. Tab "Dane"
3. Kliknij "Pobierz zastępstwa (JSON)"
4. Zapisz plik

# Restore (Import)
1. Panel Admin → Tab "Dane"
2. Kliknij "Wgraj plik JSON"
3. Wybierz plik backup'owy
4. ✅ Gotowe!
```

---

## ✅ Checklist Upgrade

- [ ] Pobrane pliki v2.0
- [ ] `npm install` uruchomiony
- [ ] `npm run dev` działa
- [ ] `npm run build` sukcesem
- [ ] `npm run preview` działa
- [ ] Service Worker zarejestrowany (F12 → Application)
- [ ] PWA manifest załadowany
- [ ] Zdjęcia nauczycieli przywrócone
- [ ] Admin panel ma 4 taby
- [ ] CORS proxy działa (`/api/substitutions`)
- [ ] Vercel.json jest w repo
- [ ] Ready to deploy! 🚀

---

## 🚨 Problemy po upgrade

### "Service Worker registration failed"

**Przyczyna**: Brakuje `sw.js`  
**Rozwiązanie**: Upewnij się że `public/sw.js` istnieje

### "404 on /api/substitutions"

**Przyczyna**: Wdrażasz lokalnie, bez Vercel  
**Rozwiązanie**: API proxy wymaga Vercel. Lokalnie używa fallback (empty array)

### "Photos don't show"

**Przyczyna**: Zła nazwa lub ścieżka  
**Rozwiązanie**: 
- Nazwy to DOKŁADNIE inicjały: `TL.jpg`, nie `tl.jpg`!
- Ścieżka: `/public/nauczyciele/TL.jpg`
- Format: `.jpg` lub `.png`

### "Offline mode doesn't work"

**Przyczyna**: Service Worker się nie załadował  
**Rozwiązanie**: Przeładuj F5, poczekaj, próbuj offline po 10 sec

---

## 📞 Potrzebujesz pomocy?

- **PWA (Service Worker)**: Czytaj `public/sw.js` comments
- **API proxy**: Czytaj `api/substitutions.js` comments  
- **Vercel setup**: Przeczytaj oficjalną dokumentację Vercel
- **Ogólnie**: Sprawdź `README.md` lub `FAQ.md`

---

## 🎉 Gratulacje!

Właśnie upgradowałeś do **ZSE Planner Pro 2.0**! 🚀

Teraz aplikacja:
- ✅ Pracuje offline (PWA)
- ✅ Można wdrożyć na Vercel
- ✅ Lepiej obsługuje CORS
- ✅ Lepszej wygląd zdjęć
- ✅ Może exportować/importować dane

**Miłego korzystania!** 📚
