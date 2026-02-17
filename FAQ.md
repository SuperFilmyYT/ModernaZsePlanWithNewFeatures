# ❓ FAQ - Najczęstsze pytania

---

## 🚀 START & INSTALACJA

### ❓ Co powinienem zrobić jako pierwszy?

**Odpowiedź:**

1. Przeczytaj [START_TUTAJ.md](START_TUTAJ.md) ← TAM wszystko wyjaśnione
2. Zainstaluj Node.js z https://nodejs.org/
3. Otwórz terminal w tym folderze
4. Wpisz `npm install && npm run parse && npm run dev`
5. Czekaj na otwarcie przeglądarki 🎉

---

### ❓ Czy potrzebuję zainstalować Node.js?

**Odpowiedź:** TAK

**Dlaczego:**
- Parser HTML (`parse.js`) jest narzędziem Node.js
- Bez niego nie możesz wygenerować `plan_data.json`
- Po wygenerowaniu JSON, aplikacja pracuje offline

**Jak zainstalować:**
- https://nodejs.org/ → Pobierz LTS
- Zainstaluj jak normalny program
- Restart komputera (opcjonalnie)

**Sprawdzenie:**
```powershell
node --version    # Powinno pokazać v18 lub v20
npm --version
```

---

### ❓ Gdzie mogę zainstalować projekt?

**Odpowiedź:** Gdziekolwiek

**Dobrze:**
- `C:\Users\Twoje_Imię\Documents\zse-plan-lekcji`
- `D:\Projekty\zse-plan-lekcji`
- Na Pulpicie

**Źle:**
- W szyfowanym folderze (OneDrive, iCloud)
- Na dysku sieciowym (bardzo wolno)
- W folderze synced (jak Dropbox) - mogą być problemy

---

### ❓ Ile czasu zajmu instalacja?

**Odpowiedź:** 10-15 minut po raz pierwszy

| Krok | Czas |
|------|------|
| Node.js download | 2-5 min |
| Node.js install | 2-3 min |
| `npm install` | 2-3 min |
| `npm run parse` | ~1 min |
| `npm run dev` | 10 sec |

**Kolejne uruchomienia**: Mniej niż 30 sekund (`npm run dev`)

---

### ❓ Mogę uruchomić projekt bez internetu?

**Odpowiedź:** TAK, w pełni offline

**Po `npm install`, wszystko jest zainstalowane lokalnie.**

Nawet jeśli odłączysz internet:
- Aplikacja działa
- Dane są w `plan_data.json` (offline)
- localStorage przechowuje preferencje

---

## 🎨 DIZAJN & WYGLĄD

### ❓ Jak zmienić kolory?

**Odpowiedź:** Edytuj `src/index.css`

Linie 2-7:
```css
:root {
  --cyber-dark: #0a0e27;        /* Zmień główny kolor */
  --cyber-darker: #050812;
  --cyber-electric: #00ff99;    /* Zmień neon */
  --cyber-blue: #0099ff;
  --cyber-purple: #9933ff;
}
```

**Potem:**
```powershell
npm run dev  # Przeładuje się automatycznie
```

---

### ❓ Jak zmienić font?

**Odpowiedź:** Edytuj `src/index.css` linia ~9

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
```

Inne opcje z Google Fonts:
- `Courier Prime`
- `Roboto Mono`
- `IBM Plex Mono`
- `JetBrains Mono`

---

### ❓ Как zmienić na light mode?

**Odpowiedź:** Niemożliwe bez zmian w kodzie

Ali możesz:
1. Zmienić kolory na jaśniejsze w `src/index.css`
2. Zmienić `dark:` do `light:` w Tailwind (wymaga zmiany tailwind.config.js)

---

### ❓ Czy mogę zmienić layout?

**Odpowiedź:** TAK

Zapoznaj się z (`src/App.vue`):
- Sidebar po lewej - zmień na `fixed` positioning
- Plan lekcji na dole - zmień grid layout
- Admin panel - zmień modal na drawer

---

## 📸 ZDJĘCIA NAUCZYCIELI

### ❓ Gdzie umieścić zdjęcia?

**Odpowiedź:** `public/nauczyciele/`

**Ścieżka:**
```
zse-plan-lekcji/
  public/
    nauczyciele/
      jk.jpg      ← Dla nauczyciela "Jk"
      la.jpg      ← Dla nauczyciela "Ła"
      bd.jpg      ← Dla nauczyciela "Bd"
```

---

### ❓ Jaki format zdjęć?

**Odpowiedź:** JPG lub PNG

**Wymagania:**
- Wymiary: 200×250px (minimum)
- Rozmiar: max 500KB
- Format: .jpg lub .png
- Nazwy: inicjały (małymi literami!)

**Błędnie:**
- `jk.jpeg` ← Zła rozszerzenie
- `JK.jpg` ← Wielkie litery
- `J.K..jpg` ← Kropki
- `1024x768` rozdzielczość bez crop na 200×250px

---

### ❓ Czemu moje zdjęcia się nie pokazują?

**Odpowiedź:** Sprawdź:

1. **Czy plik istnieje?**
   ```powershell
   Get-ChildItem public/nauczyciele/
   # Powinno pokazać: jk.jpg, la.jpg, etc.
   ```

2. **Czy nazwa jest poprawna?**
   - Inicjały muszą być małymi literami!
   - Nie może być spacji: `j k.jpg` ❌
   
3. **Czy format to .jpg lub .png?**
   ```powershell
   # Sprawdzenie:
   dir public/nauczyciele/ | Select Name
   ```

4. **Czy image jest znowu załadowany?**
   - Wyczyść cache (Ctrl+Shift+Delete)
   - Lub otwórz w incognito mode

---

### ❓ Gdzie zdobyć zdjęcia nauczycieli?

**Opcje:**
1. Z archiwum szkoły
2. Ze strony szkoły (zse.bydgoszcz.pl)
3. Funkcja "Zdjęcie profilowe" z systemu szkoły
4. Sfotografować nauczyciela (?)

**Watermark?** Można, ale lepiej bez 🙂

---

## 📊 DANE & PLANY LEKCJI

### ❓ Jak dodać nowe klasy?

**Odpowiedź:** 3 kroki

1. **Pobierz plik z VULCAN'a**
   - Np. `o2.htm` dla klasy 1B
   - Równiez inne `o3.htm`, `o4.htm`, etc.

2. **Umieść w folderze `data/`**
   ```
   data/
     lista.htm
     o1.htm
     o2.htm  ← NOWY
     o3.htm  ← NOWY
   ```

3. **Uruchom parser**
   ```powershell
   npm run parse
   ```

Gotowe! Nowe klasy pojawią się automatycznie w aplikacji.

---

### ❓ Czy mogę używać te dane bez internetu?

**Odpowiedź:** TAK

Wszystkie dane są w `src/data/plan_data.json`.

Nawet jeśli odłączysz internet, aplikacja będzie pracować.

---

### ❓ Gdzie mogę zmienić dane planu lekcji?

**Odpowiedź:** Zależy

- **Aby zmienić dane**: Zmodyfikuj `data/o1.htm` w edytorze tekstu, potem `npm run parse`
- **Aby zmienić wygląd**: Edytuj komponenty Vue w `src/components/`
- **Aby dodać pole**: Zmień `parse.js` i komponenty

⚠️ **Nie edytuj** bezpośrednio `plan_data.json` - będzie nadpisany przy następnym `npm run parse`!

---

### ❓ Czy mogę się zsynchronizować z VULCAN API?

**Odpowiedź:** Nie (poza zastépstwa)

Park VULCAN nie udostępnia API dla planów lekcji.

**Alternatywy:**
- Ręczne copypaste z VULCAN'a (trenutnie)
- Zbuduj web scraper (advanced)
- Poproś VULCAN o API (niereal)

---

## 🔧 ADMIN PANEL & ZASTĘPSTWA

### ❓ Jak dodać zastępstwo?

**Odpowiedź:** Admin panel w aplikacji

1. Kliknij ⚙️ (Admin) w górnym rogu
2. Wejdź w tab "Substitutions / Zastępstwa"
3. Wypełnij formularz:
   - Klasa (np. 1A)
   - Numer lekcji (np. 3)
   - Nauczyciel (inicjały)
   - Uwaga (opcjonalnie)
4. Kliknij "Add"
5. Lekcja zostanie podświetlona ⚡

---

### ❓ Gdzie przechowywane są zastépstwa?

**Odpowiedź:** W `localStorage`

- Przechowuje się automatycznie w przeglądarce
- **Trwałe**: Są tam nawet po zamknięciu aplikacji
- **Tylko lokalnie**: Każdy komputer ma swoje zastépstwa
- **Synchronizacja**: Jeśli chcesz na wszystkich komputerach, użyj API

---

### ❓ Czy mogę zsynchronizować zastépstwa zAPI szkoły?

**Odpowiedź:** Opcjonalnie

Jeśli szkoła udostępnia API:

Edytuj `src/utils/substitutions.js`:
```javascript
async fetchFromAPI() {
  const response = await fetch(
    'https://twoja-api.pl/substitutions'
  );
  return await response.json();
}
```

Domyślnie API:
```
https://zastepstwa.zse.bydgoszcz.pl/api
```

---

## 💻 DEVELOPMENT & BUILD

### ❓ Jak uruchomić dev server?

**Odpowiedź:**
```powershell
npm run dev
```

Otworzy się przeglądarka na http://localhost:5173

**Features:**
- Hot Module Reload (zmiana kodu = instant refresh)
- Developer tools dostępne
- Pełne stack traces w console

---

### ❓ Jak zbudować na produkcję?

**Odpowiedź:**
```powershell
npm run build
```

Wynik w folder `dist/`:
```
dist/
  index.html         ← Załaduj to
  assets/
    main.*.js        ← Bundled JS
    main.*.css       ← Bundled CSS
    ...
```

Skopiuj całą zawartość `dist/` na serwer HTTP.

---

### ❓ Jak przetestować build lokalnie?

**Odpowiedź:**
```powershell
npm run build      # Budowanie
npm run preview    # Testowanie (http://localhost:5050)
```

---

### ❓ Jak wdrożyć na GitHub Pages?

**Odpowiedź:** (Advanced)

1. Stwórz repo na GitHub
2. Push kod
3. GitHub → Settings → Pages
4. Build source: GitHub Actions
5. Deploy!

Lub użyj Vercel/Netlify (łatwiej).

---

### ❓ Czy mogę uruchomić na serwerze Node.js?

**Odpowiedź:** TAK

```powershell
npm run build
npm run server     # Uruchomienie na http://localhost:3000
```

Lub manualnie:
```powershell
node server.js
```

---

## 🐛 PROBLEMY & BŁĘDY

### ❓ "npm is not recognized" - co zrobić?

**Odpowiedź:**

Node.js nie jest zainstalowany.

**Rozwiązanie:**
1. Pobierz Node.js: https://nodejs.org/
2. Zainstaluj
3. Restart komputer
4. Spróbuj znowu: `npm --version`

---

### ❓ "Cannot find cheerio" - co to znaczy?

**Odpowiedź:**

Zależności nie są zainstalowane.

**Rozwiązanie:**
```powershell
npm install        # Zainstaluj wszystko
npm run parse      # Potem parsuj
```

---

### ❓ "plan_data.json not found" - gdzie jest?

**Odpowiedź:**

Nie uruchomiłeś parser'a.

**Rozwiązanie:**
```powershell
npm run parse      # Wygeneruj JSON z HTML
npm run dev        # Potem dev server
```

---

### ❓ Strona ładuje się biała/pusta

**Odpowiedź:** Sprawdź console (F12 → Console)

**Możliwe przyczyny:**
1. Brakuje `plan_data.json` → `npm run parse`
2. Zmienna `PORT` jest zablokowana → zmień w `vite.config.js`
3. Błąd w komponencie Vue → sprawdź error stacktrace

---

### ❓ Zdjęcia nauczycieli się nie ładują

**Odpowiedź:** Sprawdź Network tab (F12 → Network)

**Możliwe przyczyny:**
1. Plik nie istnieje: `public/nauczyciele/jk.jpg`
2. Nazwa jest zła: `JK.jpg` (pewne wielkie litery!)
3. Format: `jk.jpeg` zamiast `jk.jpg`
4. CORS problem: (poproś o pomoc)

---

### ❓ Aplikacja jest wolna

**Odpowiedź:** Możliwe źródła:

1. **node_modules bardzo duży**: Normalne (~400MB)
2. **Dysk wolno czyta**: Spróbuj SSD
3. **Przeglądarka rozwlecze się**: Otwórz DevTools, sprawdzą memory leaks
4. **Chrome? Firefox jest szybszy**: Spróbuj innej przeglądarki

---

## 🌐 DEPLOYMENT & HOSTING

### ❓ Na jaki serwer mogę wdrożyć?

**Opcje:**

1. **Serwer statyczny** (easiest)
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3

2. **Node.js server** (bardziej control)
   - Heroku
   - Replit
   - Własny VPS

3. **Lokalnie na szkolnym serwerze**
   - Uruchom `npm run server` na komputerze
   - Wszyscy w sieci szkoły mogą dostęp na http://192.168.x.x:3000

---

### ❓ Czy mogę wrzucić na stronie szkoły?

**Odpowiedź:** Tak jeśli:

1. Masz dostęp do FTP/SFTP szkoły
2. Serwer wspiera hosting statycznych plików
3. Administrator szkoły Ci pozwoli

**Instrukcja:**
1. `npm run build`
2. Skopiuj zawartość `dist/` na serwer
3. Odsyłaj do adresu serwera

---

### ❓ Czy mogę używać bez serwera (offline)?

**Odpowiedź:** TAK

1. `npm run build`
2. Dwuklik na `dist/index.html`
3. Aplikacja otwiera się w przeglądarce
4. Pełna funkcjonalność offline!

---

## ⚖️ PRAWO & DISCLAIMER

### ❓ Czy mogę używać dane z VULCAN'a?

**Odpowiedź:** Do celów edukacyjnych - TAK

Ale musisz:
1. Dodać disclaimer w stopce ✅ (już jest)
2. Nie modyfikuj danych bez zgody szkoły
3. Nie sprzedawaj/sprzedaj jako swoje

---

### ❓ Jaki jest treści disclaimer?

**Odpowiedź:** W stopce aplikacji

> Strona jest nieoficjalną nakładką wizualną. Wszystkie dane źródłowe należą do ZSE im. Wojska Polskiego w Bydgoszczy. Projekt ma charakter edukacyjny i pomocniczy.

---

### ❓ Czy mogę sprzedawać aplikację?

**Odpowiedź:** Nie bez zgody szkoły

Ale możesz:
- Udostępnić kod na GitHub (z licencją MIT)
- Ulepszać kod
- Używać do celów edukacyjnych

---

## 📞 DALSZE PYTANIA?

Jeśli nie znalazłeś odpowiedzi:

1. **Przeczytaj dokumentację:**
   - [START_TUTAJ.md](START_TUTAJ.md) - Quick start
   - [PODSUMOWANIE.md](PODSUMOWANIE.md) - Przegląd
   - [README.md](README.md) - Instrukcja użytkownika
   - [INSTRUKCJA_PROGRAMISTY.md](INSTRUKCJA_PROGRAMISTY.md) - Tech details

2. **Skontaktuj się z:**
   - Administrator szkoły
   - Nauczyciel informatyki
   - Autor projektu (jeśli znany)

3. **Przeczytaj kody błędów:**
   - F12 → Console → Red error messages
   - F12 → Network → Sprawdź 404s
   - F12 → Application → localStorage/cookies

---

**Powodzenia! 🚀**
