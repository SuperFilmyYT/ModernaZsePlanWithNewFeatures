# ✅ Checklist - Gotowość Projektu

## 1️⃣ Przygotowanie Środowiska

- [ ] Node.js v16+ zainstalowany (`node --version`)
- [ ] npm v8+ zainstalowany (`npm --version`)
- [ ] Git zainstalowany (`git --version`)
- [ ] VS Code zainstalowany
- [ ] Foldery na dysku dostępne

## 2️⃣ Struktura Projektu

- [ ] Folder `c:\Users\COMPUTER\Downloads\zse-plan-lekcji\` istnieje
- [ ] W folderze istnieje plik `package.json`
- [ ] Folder `src/` zawiera pliki Vue.js
- [ ] Folder `data/` zawiera `lista.htm` i `o*.htm`
- [ ] Folder `public/nauczyciele/` istnieje (do zdjęć)

## 3️⃣ Instalacja Zależności

```bash
cd c:\Users\COMPUTER\Downloads\zse-plan-lekcji
npm install
```

- [ ] Zainstalowany jest `cheerio`
- [ ] Zainstalowany jest `vite`
- [ ] Zainstalowany jest `vue`
- [ ] Zainstalowany jest `tailwindcss`

## 4️⃣ Parsowanie Danych

```bash
npm run parse
```

- [ ] Plik `src/data/plan_data.json` został utworzony
- [ ] Plik `plan_data.json` zawiera JSON (nie błędy)
- [ ] W `plan_data.json` są klasy z `lista.htm`
- [ ] W `plan_data.json` są lekcje z `o*.htm`

**Sprawdzenie JSON:**
```bash
# Na Windows PowerShell:
Get-Content src/data/plan_data.json | ConvertFrom-Json
```

## 5️⃣ Development Server

```bash
npm run dev
```

- [ ] Serwer uruchomił się bez błędów
- [ ] Na konsoli widać: `Local: http://localhost:5173`
- [ ] Przeglądarka otworzyła się automatycznie
- [ ] Strona ładuje się bez białego ekranu

## 6️⃣ Testowanie Interfejsu

Na stronie http://localhost:5173:

- [ ] Nagłówek "Plan Lekcji ZSE" jest widoczny
- [ ] Po lewej stronie jest lista oddziałów (klas)
- [ ] Po kliknięciu na klasę pojawia się plan lekcji
- [ ] Tabela zawiera dni tygodnia i lekcje
- [ ] Kolory są w stylu "Cyber" (dark mode + neon)

## 7️⃣ Zdjęcia Nauczycieli

- [ ] Zbierz zdjęcia JPG nauczycieli (200×250px minimum)
- [ ] Rozpoznaj inicjały nauczycieli (np. "Jk" = JK)
- [ ] Umieść zdjęcia w `public/nauczyciele/`
- [ ] Nazwy plików: `jk.jpg`, `ła.jpg`, `bd.jpg` (małe litery!)
- [ ] Przeładuj stronę (npm run dev dalej działał?)
- [ ] Najechaj na inicjały nauczyciela - powinno pokazać zdjęcie

## 8️⃣ Panel Administratora

Na stronie:

- [ ] Przycisk "⚙️ Admin" w górnym rogu działa
- [ ] Otwiera się modal panel
- [ ] Tab 1 "Zastępstwa" - umożliwia dodanie zastępstwa
- [ ] Tab 2 "Upload" - pokazuje drag-drop dla plików
- [ ] Tab 3 "Ustawienia" - przyciski kolorów

## 9️⃣ Responsywność

- [ ] Zainstaluj DevTools (F12)
- [ ] Włącz "Toggle device toolbar" (Ctrl+Shift+M)
- [ ] Testuj widok na:
  - [ ] Desktop (1920×1080)
  - [ ] Tablet (768×1024)
  - [ ] Telefon (375×667)
- [ ] Boki powinny się dostosować bez poziomego scrollowania

## 🔟 Build na Produkcję

```bash
npm run build
```

- [ ] Folder `dist/` został utworzony
- [ ] W `dist/` są pliki: `index.html`, folder `assets/`
- [ ] Plik `index.html` można otworzyć w przeglądarce
- [ ] Aplikacja działa offline (nie ładuje plików z serwera)

## 1️⃣1️⃣ Dodatkowe Funkcje

- [ ] localStorage przechowuje ostatnią otwartą klasę
- [ ] Zamknij stronę, otwórz na nowo - ta sama klasa się załaduje
- [ ] CSS animations (glow effect, pulse border) pracują płynnie
- [ ] Wszystkie przyciski reagują na klik

## 1️⃣2️⃣ Dokumentacja

- [ ] Przeczytań plik `README.md`
- [ ] Przeczytań plik `INSTRUKCJA_PROGRAMISTY.md`
- [ ] Rozumiesz strukturę `src/data/plan_data.json`
- [ ] Wiesz jak dodać nowe klasy (copy o*.htm + npm run parse)

---

## 🎉 Jeśli wszystkie pola są zaznaczone:

✅ **Projekt jest gotowy do produkcji!**

### Następne kroki:

1. **Deploy lokalny**: Wyślij folder `dist/` na serwer HTTP
2. **Deploy online**: Hugo Pages, Vercel, Netlify
3. **Integracja z systemem szkoły**: API dla zastépstw, zdjęć
4. **Zbieranie feedbacku**: Testowanie z nauczycielami i uczniami

---

## 🚨 Jeśli coś nie działa:

1. Sprawdź konsolę (F12 → Console) - za błędy
2. Sprawdź czy Node.js jest v16+
3. Uruchom `npm run parse` ponownie
4. Usuń folder `node_modules` i `npm install` od nowa
5. Skontaktuj się z administratorem projektu

---

**Data**: 17 února 2026  
**Status**: ✅ Gotowy do testowania
