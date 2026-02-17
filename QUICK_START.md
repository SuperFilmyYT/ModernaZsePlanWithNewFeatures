# 🚀 QUICK START - ZSE Planner Pro v2.0

**Zacznij w 5 minut!**

---

## Step 1: Klonuj repozytorium

```bash
git clone https://github.com/twoja-szkoła/zse-plan-lekcji.git
cd zse-plan-lekcji
```

---

## Step 2: Zainstaluj zależności

```bash
npm install
```

**Czekaj... to potrwa ~2 minuty** ☕

---

## Step 3: Uruchom lokalnie

```bash
npm run dev
```

**Powinieneś zobaczyć:**
```
VITE v4.3.0  ready in 289 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

Otwórz: http://localhost:5173/ ✅

---

## Step 4: Test offline (opcjonalnie)

1. **Otwórz DevTools** (F12)
2. **Idź do:** Application → Service Workers
3. **Checkbox:** ☑️ Offline
4. **Odśwież stronę** (F5)
5. Aplikacja wciąż działa? ✅

---

## Step 5: Deploy na Vercel

### Opcja A: GitHub (REKOMENDOWANE)

```bash
# 1. Push na GitHub
git add .
git commit -m "Deploy v2.0"
git push

# 2. Wejdź na https://vercel.com
# 3. Kliknij "New Project"
# 4. Wybierz swoją repo
# 5. Kliknij "Deploy"

# Gotowe! 🎉 Czekaj 2-3 minuty...
```

### Opcja B: Vercel CLI

```bash
# 1. Zainstaluj Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# Postępuj wg instrukcji...
```

### Opcja C: Manual (Git via Vercel)

1. https://vercel.com/new
2. Połącz GitHub
3. Wybierz repo
4. Deploy button
5. Done! 🚀

**Twoja aplikacja będzie dostępna w ~2-3 minuty na:**
```
https://zse-plan-lekcji.vercel.app
```

---

## Step 6: Dodaj zdjęcia nauczycieli

**Lokalizacja:** `/public/nauczyciele/`

**Format:** JPG lub PNG

**Naming convention (CASE-SENSITIVE!):**
```
TL.jpg      ✅ Teaching Liceum
tl.jpg      ❌ WRONG! (lowercase)
T.L.jpg     ❌ WRONG! (z przedłużkami)
```

**Rozmiaru:**
- Minimum: 200×250 px
- Idealne: 300×375 px (aspect ratio 4:5)
- Format: JPG (szybciej)

**Proces:**

```
1. Weź zdjęcie (portret)
2. Zmień rozmiar na 300×375px
3. Eksportuj jako INITIALS.jpg
4. Wrzuć do /public/nauczyciele/
5. Commit i push
6. Vercel auto-deploy! ✅
```

**Przykład:**
```
nauczyciele/
├── A.jpg        (nauczyciel A)
├── AB.jpg       (nauczyciel AB)
├── JK.jpg       (nauczyciel JK)
├── TL.jpg       (nauczyciel TL)
└── README.md    (instrukcje)
```

---

## Step 7: Administracja (AdminPanel)

**Jak dostać się do admin panelu?**

1. Otwórz aplikację
2. Szukaj przycisku ⚙️ (Settings/Admin)
3. Możliwe że hasło? (ask your IT admin)

**Co możesz zrobić?**

### Tab 1: ⚡ Substitutions
```
Dodaj ręcznie zastypstwa:
- Klasa: 1A
- Lekcja: 4
- Nauczyciel: TL
- Notatka: "Chory"
```

### Tab 2: 📁 Upload
```
Wrzuć plan lekcji .htm
(funkcja dostępna wkrótce)
```

### Tab 3: 💾 Data
```
EXPORT: Pobierz JSON (backup)
IMPORT: Wergraj JSON (restore)
CLEAR:  Usuń wszystkie dane
```

### Tab 4: ⚙️ Settings
```
Theme color (Purple, Cyan, Pink)
```

---

## 🎯 TROUBLESHOOTING

### Problem 1: "npm: command not found"

**Rozwiązanie:**
```bash
# Zainstaluj Node.js z: https://nodejs.org
# Wersja: 18+ LTS
# Restart komputer
```

### Problem 2: "Port 5173 is in use"

**Rozwiązanie:**
```bash
# Użyj innego portu
npm run dev -- --port 3000

# Otwórz: http://localhost:3000
```

### Problem 3: Zdjęcia się nie wyświetlają

**Checklist:**
- [ ] Czy plik jest w `/public/nauczyciele/`?
- [ ] Czy nazwa dokładnie matches (TL.jpg, nie tl.jpg)?
- [ ] Czy to JPG/PNG?
- [ ] Czy rozmiar to przynajmniej 200×250 px?
- [ ] Czy commitnęliście i pushowaliście?

### Problem 4: "Service Worker offline nie działa"

**Checklist:**
- [ ] Czy aplikacja jest na HTTPS? (Vercel to zapewnia)
- [ ] Czy Service Worker się zainstalował? (DevTools → Appication → Service Workers)
- [ ] Wyczyszczono cache? (Ctrl+Shift+Delete)
- [ ] Offline mode wyłączony? (Application tab)

### Problem 5: "Vercel deployment failed"

**Checklist:**
- [ ] Czy `npm install` przebiegł bez błędów?
- [ ] Czy `npm run build` kompiluje się?
- [ ] Czy wszystkie nowe pliki są committed?
- [ ] Czy branch to `main` (nie `master`)?
- [ ] Czy vercel.json jest w rootu?

---

## 📊 Przydatne comandy

```bash
# Rozwijanie (dev server)
npm run dev

# Build (wytworzenie plików dystrybucji)
npm run build

# Preview (testuj build lokalnie)
npm run preview

# Wyczyść cache
npm run build:clean

# Formatuj kod
npm run format
```

---

## 🔍 Weryfikacja instalacji

Jak sprawdzić że wszystko działa:

```bash
# 1. Czy node jest zainstalowany?
node -v
# Powinno: v18.0.0+

# 2. Czy npm jest zainstalowany?
npm -v
# Powinno: 8.0.0+

# 3. Czy zależności są zainstalowane?
ls node_modules/
# Powinno: dużo folderów

# 4. Czy build się kompilwuje?
npm run build
# Powinno: "dist/" folder

# 5. Czy aplikacja uruchamia się?
npm run dev
# Powinno: http://localhost:5173/
```

---

## 📱 Test na telefonie

### 1. Uruchom lokalnie
```bash
npm run dev
```

### 2. Znajdź IP komputera
```bash
# Windows (PowerShell)
ipconfig

# Linux/Mac
ifconfig
```

### 3. Na telefonie wpisz
```
http://192.168.X.X:5173/
```

### 4. Test offline
```
WiFi off → aplikacja wciąż działa ✅
```

### 5. Instalacja (Android)
```
Menu (⋯) → Install → App na Home Screen
```

---

## 🎨 Dostosować wygląd

### Zmień kolor motywu

**Plik:** `src/App.vue`

```vue
<!-- Szukaj: -->
:style="{ '--color-primary': '#0066ff' }"

<!-- Zmień hex na np: -->
:style="{ '--color-primary': '#ff0066' }" (Różowy)
:style="{ '--color-primary': '#00ff66' }" (Zielony)
```

### Zmień nazwę aplikacji

**Plik:** `public/manifest.json`

```json
{
  "name": "Moja Szkoła - Plan Lekcji",
  "short_name": "Mój Plan"
}
```

---

## 📚 Gdzie poszukać pomocy?

| Problem | Gdzie szukać |
|---------|-------------|
| Vercel deployment | [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) |
| Upgrade z v1.0 | [UPGRADE_GUIDE.md](UPGRADE_GUIDE.md) |
| Szczegóły v2.0 | [RELEASE_NOTES.md](RELEASE_NOTES.md) |
| Co nowego | [WHATS_NEW.md](WHATS_NEW.md) |
| Zdjęcia | `/public/nauczyciele/README.md` |

---

## ✅ Checklist - Wszystko gotowe?

- [ ] `npm install` przebiegł
- [ ] `npm run dev` działa
- [ ] Aplikacja widoczna na http://localhost:5173
- [ ] DevTools pokazuje Service Worker
- [ ] Offline mode działa (F12 → offline)
- [ ] GitHub repo jest connected
- [ ] Vercel project created
- [ ] Deploy przebiegł bez błędów
- [ ] Aplikacja żyje na vercel.app!

---

## 🚀 Następne kroki

1. **Dodaj zdjęcia nauczycieli**
   - Format: `/public/nauczyciele/INITIALS.jpg`
   - Rozmiar: 300×375px

2. **Customizuj wygląd**
   - Zmień kolory w `src/App.vue`
   - Zmień identyfikator w `package.json`

3. **Integruj ze swoją szkołą**
   - Poinformuj uczniów o aplikacji
   - Zachęć do instalacji na telefonie
   - Monitoruj statistyki (Vercel dashboard)

4. **Czytaj pełną dokumentację**
   - [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - pełnej wdrażania
   - [RELEASE_NOTES.md](RELEASE_NOTES.md) - szczegóły zmian

---

## 🎉 Gotowe!

**Twoja aplikacja ZSE Planner Pro v2.0 jest online!** 🚀

```
https://your-domain.vercel.app
```

Powodzenia! 💪

---

**Potrzebujesz pomocy?**
- Czytaj: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- Lub: GitHub Issues
- Lub: Ask your tech admin

**Made with ❤️ for Polish Schools**
