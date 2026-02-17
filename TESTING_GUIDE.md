# 🧪 TESTING GUIDE - Krok po kroku

**Przeznaczenie**: Dla testera / QA / deweloper'a  
**Czas**: ~30 minut  
**Wymagania**: npm run dev już uruchomiony

---

## 📋 Przygotowanie

### Pre-test checklist

- [ ] Node.js v16+ zainstalowany: `node --version`
- [ ] npm zainstalowany: `npm --version`
- [ ] W folder `zse-plan-lekcji`
- [ ] Uruchomiony: `npm install`
- [ ] Uruchomiony: `npm run parse`
- [ ] Uruchomiony: `npm run dev`
- [ ] Przeglądarka otwarta: http://localhost:5173
- [ ] Console czysta (F12 → Console - nie powinno być błędów)

---

## 🧪 TEST 1: Załadowanie strony

### Krok 1.1: Otwórz http://localhost:5173

**Oczekiwane wyniki:**
- [ ] Strona załaduje się w mniej niż 3 sekundy
- [ ] **Nagłówek**: "Plan Lekcji ZSE" widoczny
- [ ] **Pasek górny**: Logo, "⚙️ Admin" button, "🌙" button
- [ ] **Lista po lewej**: Sidebar z listą klas (1A, 1B, 1C, etc.)
- [ ] **Główne okno**: "Wybierz odział aby wyświetlić plan lekcji"

### Krok 1.2: Sprawdź kolory

**Oczekiwane wyniki:**
- [ ] **Tło**: Ciemne (dark) #0a0e27
- [ ] **Accent**: Neon zielony (#00ff99) lub niebieski (#0099ff)
- [ ] **Font**: Monospace (Space Mono lub Courier)

### Krok 1.3: Sprawdź konsole

**Oczekiwane wyniki:**
- [ ] F12 → Console - brak błędów (red text)
- [ ] Mogą być warning's - to ok
- [ ] Network tab - brak 404 errors

---

## 🧪 TEST 2: Lista klas (Sidebar)

### Krok 2.1: Sprawdzić czy klasy się załadowały

**Oczekiwane wyniki:**
- [ ] Po lewej stronie widoczna lista klas
- [ ] Każda klasa ma przycisk (button)
- [ ] Tekst klasy: "1A 1A Ivy", "1B ...", etc.

### Krok 2.2: Sprawdzić scroll na liście

**Warunki**: Jeśli jest dużo klas (>10)

**Oczekiwane wyniki:**
- [ ] Lista jest scrollable
- [ ] Scroll bar pojawia się po prawej
- [ ] Kolory scrollbar'a pasują do tematu

### Krok 2.3: Sprawdzić responsive'ność sidebara

**Czynności**: F12 → Toggle Device Toolbar
- [ ] Desktop (1920×1080): Sidebar widoczny
- [ ] Tablet (768×1024): Sidebar może być węższy
- [ ] Telefon (375×667): Sidebar powinien być dostosowany

---

## 🧪 TEST 3: Plan lekcji (Schedule)

### Krok 3.1: Kliknij na klasę "1A"

**Oczekiwane wyniki:**
- [ ] Po kliknięciu, klasa jest podświetlona
- [ ] W głównym oknie pojawia się tabela planu lekcji
- [ ] Tabela zawiera:
  - [ ] Dni tygodnia w nagłówkach (Poniedziałek, Wtorek, etc.)
  - [ ] Numery lekcji po lewej (1, 2, 3, etc.)
  - [ ] Godziny (8:00-8:45, 8:45-9:30, etc.)
  - [ ] Obiekty zajęć

### Krok 3.2: Sprawdzić zawartość tabeli

**Oczekiwane wyniki:**
- [ ] Każda komórka zawiera:
  - [ ] Nazwę przedmiotu (Matematyka, Polski, etc.)
  - [ ] Inicjały nauczyciela (Jk, Ła, etc.)
  - [ ] Numer sali (np. 110)
- [ ] Puste komórki nie wyświetlają nic
- [ ] Jeśli grupa: " -1/2" oznaczenie widoczne

### Krok 3.3: Sprawdzić formatowanie tekstu

**Oczekiwane wyniki:**
- [ ] Tekst jest czytelny na ciemnym tle
- [ ] Font jest monospace
- [ ] Rozmiar tekstu dostosowany (nie za mały)

### Krok 3.4: Sprawdzić responsywność tabeli

**Czynności**: Zmień rozmiar okna przeglądarki

**Oczekiwane wyniki:**
- [ ] Desktop: Tabela pełna, bez scroll'a
- [ ] Tablet: Tabela może być scroll'owana poziomo
- [ ] Telefon: Tabela scroll'owana, ale czytelna

---

## 🧪 TEST 4: Tooltip nauczycieli

### Krok 4.1: Najechaj na inicjały nauczyciela

**Czynności**: Umieść myszę nad inicjałami (np. "Jk") w tabeli

**Oczekiwane wyniki:**
- [ ] Pojawia się tooltip (mała okienko)
- [ ] Tooltip zawiera:
  - [ ] Pełne imię nauczyciela (np. "J.Kuźba")
  - [ ] Inicjały
  - [ ] **Zdjęcie nauczyciela** (jeśli jest)
  - [ ] Lub placeholder: "👤 Brak zdjęcia" (jeśli brak)

### Krok 4.2: Sprawdzić pozycję tooltip'u

**Oczekiwane wyniki:**
- [ ] Tooltip pojawia się przy myszy
- [ ] Nie wychodzi poza ekran
- [ ] Tekst jest czytelny

### Krok 4.3: Wjedź myżą poza tooltip

**Oczekiwane wyniki:**
- [ ] Tooltip znika po oddaleniu myszy
- [ ] Bez opóźnienia (instant)

### Krok 4.4: Kliknij na inicjały (opcjonalnie)

**Oczekiwane wyniki:**
- [ ] Tooltip może być pinned (jeśli implementacja)
- [ ] Lub tooltip znika (normalne zachowanie)

---

## 🧪 TEST 5: Admin Panel

### Krok 5.1: Kliknij "⚙️ Admin" w górnym rogu

**Oczekiwane wyniki:**
- [ ] Pojawia się modal (okno) panel
- [ ] Panel ma 3 taby (Substitutions, Upload, Settings)
- [ ] Tło za panelem jest przytemnione (backdrop)
- [ ] Jest przycisk "X" aby zamknąć

### Krok 5.2: Test Tab 1 - Substitutions

**Czynności**: Kliknij na tab "Substitutions"

**Oczekiwane wyniki:**
- [ ] Widoczny formularz z polami:
  - [ ] Class (Klasa)
  - [ ] Lesson Number (Numer lekcji)
  - [ ] Teacher (Nauczyciel)
  - [ ] Note (Uwaga)
- [ ] Przycisk "Add" lub "Submit"

**Czynności**: Wypełnij formularz i kliknij "Add"

**Oczekiwane wyniki:**
- [ ] Formularz się czyści (reset)
- [ ] Dane są przechowywane w localStorage
- [ ] Lekcja w planie jest podświetlona/zaznaczona

### Krok 5.3: Test Tab 2 - Upload

**Czynności**: Kliknij na tab "Upload"

**Oczekiwane wyniki:**
- [ ] Widoczna "drag-drop" strefa
- [ ] Tekst: "Drag files here or click to select"
- [ ] Input field dla wybrania pliku

**Czynności**: Upuść jakikolwiek plik (zwróć uwagę: nie będzie działać)

**Oczekiwane wyniki:**
- [ ] Plik zostaje wybrany
- [ ] Nig nie ma rzeczywistego upload'u (wg spec'u)

### Krok 5.4: Test Tab 3 - Settings

**Czynności**: Kliknij na tab "Settings"

**Oczekiwane wyniki:**
- [ ] Widoczne przyciski kolorów
- [ ] Każdy przycisk ma inny kolor:
  - [ ] Cyan
  - [ ] Purple
  - [ ] Pink
- [ ] Kliknięcie przycisku **powinno** zmienić temat (TODO)

### Krok 5.5: Zamknij Admin Panel

**Czynności**: Kliknij "X" lub kliknij poza panelem

**Oczekiwane wyniki:**
- [ ] Panel się zamyka
- [ ] Backdrop znika
- [ ] Można znowu klikać na klasy

---

## 🧪 TEST 6: localStorage - Pamiętanie klasy

### Krok 6.1: Zapamiętaj bieżącą klasę

**Czynności**:
1. Wybierz klasę (np. 1B)
2. Powinna być widoczna w planie
3. Zamknij kartę (Ctrl+W) lub przeglądarkę

### Krok 6.2: Otwórz ponownie

**Czynności**: Otwórz http://localhost:5173 ponownie

**Oczekiwane wyniki:**
- [ ] Poprzednio wybrana klasa (1B) się załaduje automatycznie
- [ ] Plan lekcji dla 1B powinien być widoczny
- [ ] localStorage pracuje poprawnie

---

## 🧪 TEST 7: Responsive - Różne rozmiary ekranu

### Krok 7.1: Otwórz DevTools

**Czynności**: F12 → ikonka Toggle Device Toolbar (Ctrl+Shift+M)

### Krok 7.2: Test Desktop

**Wymiary**: 1920×1080

**Oczekiwane wyniki:**
- [ ] Sidebar po lewej (szerokie)
- [ ] Tabela zajmuje resztę ekranu
- [ ] Wszystko jest czytelne
- [ ] Brak scroll'u w bok

### Krok 7.3: Test Tablet

**Wymiary**: 768×1024

**Oczekiwane wyniki:**
- [ ] Layout dostosowuje się
- [ ] Sidebar może być węższy
- [ ] Tabela może być scroll'owana
- [ ] Font jest wciąż czytelny

### Krok 7.4: Test Telefon

**Wymiary**: 375×667

**Oczekiwane wyniki:**
- [ ] Sidebar powinien zniknąć (lub być drawer'em)
- [ ] Tabela powinna być scroll'owana
- [ ] Tekst wciąż czytelny (nie za mały)
- [ ] Brak horizontal scroll'u jeśli możliwe

### Krok 7.5: Test orientacji

**Czynności**: Obróć urządzenie (jeśli test na telefonie)

**Oczekiwane wyniki:**
- [ ] Layout zmienia się na landscape
- [ ] Wszystko wciąż działa

---

## 🧪 TEST 8: Interakcje &Animacje

### Krok 8.1: Hover efekty

**Czynności**: Najechaj na różne elementy

**Oczekiwane wyniki:**
- [ ] Klawisze (klasy) - zmiana koloru na hover
- [ ] Tekst - glow effect na hover
- [ ] Admin button - zmiana koloru

### Krok 8.2: Kliknięcia

**Czynności**: Kliknij różne przyciski

**Oczekiwane wyniki:**
- [ ] Żaden button nie macie lag'u
- [ ] Każde kliknięcie ma jakąś akcję
- [ ] Brak "Cannot read property" błędów

### Krok 8.3: Animacje

**Oczekiwane wyniki:**
- [ ] Glow text animation pracuje (pulsuje)
- [ ] Pulse border animation pracuje (jeśli jest)
- [ ] Smooth transitions przy zmianach koloru

---

## 🧪 TEST 9: Console & Errors

### Krok 9.1: Sprawdzić Console

**Czynności**: F12 → Console

**Oczekiwane wyniki:**
- [ ] **Brak błędów** (red text)
- [ ] Mogą być warning's (żółte)
- [ ] Mogą być info messages (białe)

### Krok 9.2: Przy zmianach (edycja kodu)

**Czynności**: Zmień coś w kodzie (np. `src/App.vue`)

**Oczekiwane wyniki:**
- [ ] Strona się przeładuje automatycznie (Hot Reload)
- [ ] **Brak błędów HMR** w konsoli

---

## 🧪 TEST 10: Network & Performance

### Krok 10.1: Sprawdzić Network tab

**Czynności**: F12 → Network → Przeładuj (Ctrl+R)

**Oczekiwane wyniki:**
- [ ] Główny request do `localhost:5173` - status 200
- [ ] Wiele JS/CSS requests - status 200
- [ ] **Brak 404 errors**
- [ ] Ładowanie za <2 sekundy

### Krok 10.2: Sprawdzić rozmiary

**Oczekiwane wyniki:**
- [ ] `main.js` - <200KB
- [ ] `main.css` - <100KB
- [ ] Całość <500KB

### Krok 10.3: Sprawdzić Performance

**Czynności**: F12 → Performance → Record, potem przystop

**Oczekiwane wyniki:**
- [ ] First Contentful Paint: <1s
- [ ] Largest Contentful Paint: <2s
- [ ] No layout shifts (jank'u)

---

## 🧪 TEST 11: Data & Parser

### Krok 11.1: Sprawdzić czy dane się załadowały

**Czynności**: F12 → Application → localStorage

**Oczekiwane wyniki:**
- [ ] `lastVisitedClass` - zawiera ID klasy
- [ ] Inne keys - zależy od implementacji

### Krok 11.2: Sprawdzić `plan_data.json`

**Czynności**: 
```powershell
Get-Content src/data/plan_data.json | ConvertFrom-Json | Format-List
```

**Oczekiwane wyniki:**
- [ ] Metadata - zawiera informacje o szkoły
- [ ] Classes - lista wszystkich klas
- [ ] Teachers - lista nauczycieli
- [ ] Rooms - lista sal
- [ ] Schedules - plany lekcji

---

## 🧪 TEST 12: Edge Cases

### Krok 12.1: Pusty plan lekcji

**Czynności**: Jeśli jakaś klasa ma całe tygodnie puste

**Oczekiwane wyniki:**
- [ ] Tabela się wyświetla
- [ ] Puste komórki wyglądają dobrze
- [ ] Brak błędów w konsolu

### Krok 12.2: Długie nazwy

**Czynności**: Jeśli nazwa przedmiotu/nauczyciela jest długa

**Oczekiwane wyniki:**
- [ ] Tekst nie przekracza komórki
- [ ] Może być truncated lub wrapped
- [ ] Tabela się nie psuje

### Krok 12.3: Specjalne znaki

**Czynności**: Jeśli są ż, ł, ą, etc.

**Oczekiwane wyniki:**
- [ ] Polskie znaki się wyświetlają prawidłowo
- [ ] Brak mojibake (??????)

---

## ✅ Końcowa Checklist

Jeśli wszystkie testy przeszły:

- [ ] TEST 1: Załadowanie - OK
- [ ] TEST 2: Sidebar - OK
- [ ] TEST 3: Plan lekcji - OK
- [ ] TEST 4: Tooltip - OK
- [ ] TEST 5: Admin panel - OK
- [ ] TEST 6: localStorage - OK
- [ ] TEST 7: Responsive - OK
- [ ] TEST 8: Interakcje - OK
- [ ] TEST 9: Console - OK
- [ ] TEST 10: Network - OK
- [ ] TEST 11: Data - OK
- [ ] TEST 12: Edge cases - OK

# ✅ **APLIKACJA GOTOWA NA PRODUKCJĘ!** 🎉

---

## 📝 Raport z testów

Jeśli coś nie przeszło, zanotuj:

```
TEST: [Numer]
KROK: [Opisy kroku]
OCZEKIWANE: [Co się powinno stać]
FAKTYCZNE: [Co się stało]
SCREENSHOT: [Dodaj screenshot]
```

---

**Powodzenia w testowaniu! 🧪**
