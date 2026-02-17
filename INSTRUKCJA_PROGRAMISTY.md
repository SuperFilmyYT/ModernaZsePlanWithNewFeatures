## 📋 INSTRUKCJA DLA PROGRAMISTY - Plan Lekcji ZSE

**Data:** 17 lutego 2026  
**Projekt:** Modernizacja Planu Lekcji ZSE Bydgoszcz  
**Status:** Gotowy do pracy

---

## ✅ Zadania wykonane

- [x] Struktura projektu Vue.js + Tailwind CSS
- [x] Parser Node.js do konwersji HTML → JSON
- [x] Design "Cyber-Electronic" (dark mode + neon)
- [x] System zdjęć nauczycieli z tooltip
- [x] Panel administratora dla zastępstw
- [x] localStorage dla ostatnio odwiedzanej klasy
- [x] Responsywny layout
- [x] Pełna dokumentacja

---

## 📁 Struktura projektu (przygotowana)

```
zse-plan-lekcji/
├── src/
│   ├── components/              # Gotowe komponenty Vue
│   │   ├── App.vue              # Główny komponent
│   │   ├── ClassesSidebar.vue   # Lista oddziałów
│   │   ├── ScheduleView.vue     # Plan lekcji
│   │   ├── LessonCell.vue       # Pojedyncza lekcja
│   │   ├── TeacherTooltip.vue   # Tooltip nauczyciela
│   │   └── AdminPanel.vue       # Panel admina
│   ├── data/
│   │   ├── loader.js            # Loader danych (gotowy)
│   │   └── plan_data.json       # Będzie wygenerowany
│   ├── store/
│   │   └── index.js             # State management
│   ├── utils/
│   │   ├── parser.js            # Utility do parsowania
│   │   └── substitutions.js     # System zastépstw
│   ├── main.js
│   └── index.css
├── public/
│   └── nauczyciele/             # Tu umieść zdjęcia nauczycieli
├── data/
│   ├── lista.htm                # Plik źródłowy (już tam jest)
│   └── o*.htm                   # Pliki planów klas (już tam są)
├── parse.js                     # Parser (gotowy)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── server.js                    # Opcjonalnie dla Node.js
└── README.md                    # Dokumentacja
```

---

## 🚀 Jak zacząć pracę

### 1. Setup wstępny

```bash
cd zse-plan-lekcji
npm install
```

### 2. Wygeneruj dane z plików HTML

```bash
npm run parse
```

**Co się stanie:**
- Skrypt `parse.js` przeczyta pliki z folderu `data/`
- Wyodrębni klasy, nauczycieli, sale i plany lekcji
- Wygeneruje plik `src/data/plan_data.json`
- Aplikacja będzie mogła pracować w pełni offline

### 3. Uruchom development server

```bash
npm run dev
```

Otwórz: http://localhost:3000

### 4. Dodaj zdjęcia nauczycieli

1. Przygotuj zdjęcia JPG pobytów nauczycieli
2. Umieść je w: `public/nauczyciele/`
3. **Ważne:** Zaakceptowany format nazwy: `{inicjały}.jpg`
   - Np: `jk.jpg`, `ła.jpg`, `bd.jpg` itp.
   - Inicjały muszą być małymi literami!

**Wymagania techniczne na zdjęcia:**
- Format: JPG lub PNG
- Minimalny rozmiar: 200×250px
- Maksymalny rozmiar: 500KB
- Będą automatycznie skalowane do 200×250px

---

## 🔧 Szczegóły Techniczne

### System Parsowania

**Plik: `parse.js`**

Skrypt używa biblioteki `cheerio` do parsowania HTML bez potrzeby pełnego DOM:

```javascript
npm run parse     # Jedno wykonanie
npm run parse:watch  # Automatyczne re-parsowanie przy zmianach
```

**Co parser robi:**

1. Czyta `data/lista.htm`:
   - Wydobywa listę klas (mapa ID do nazwy)
   - Wydobywa listę nauczycieli (mapa inicjałów do ścieżek zdjęć)
   - Wydobywa listę sal

2. Czyta wszystkie `data/o*.htm`:
   - Parsuje tabele z lekcjami
   - Wydobywa nauczyciela, salę, grupę dla każdej lekcji
   - Mapuje inicjały nauczycieli

3. Generuje `src/data/plan_data.json`:
   - Struktura JSON z metadanymi, klasami, nauczycielami, planami

### Struktura pliku `plan_data.json`

```json
{
  "metadata": {
    "school": "Zespół Szkół Elektronicznych im. Wojska Polskiego",
    "city": "Bydgoszcz",
    "generatedAt": "2026-02-17T...",
    "version": "1.0.0"
  },
  "classes": [
    {
      "id": "1",
      "name": "1A 1A Ivy",
      "fileId": "o1"
    }
  ],
  "teachers": [
    {
      "id": "56",
      "fullName": "J.Kuźba",
      "initials": "Jk",
      "photoPath": "/nauczyciele/jk.jpg"
    }
  ],
  "rooms": [
    {
      "id": "54",
      "name": "W-7 warsztat W7 - Jk"
    }
  ],
  "schedules": {
    "o1": {
      "className": "1A 1A Ivy",
      "classId": "1",
      "lessons": [
        {
          "day": "Poniedziałek",
          "dayIdx": 0,
          "time": "8:00-8:45",
          "lessonNumber": 1,
          "subject": "Matematyka",
          "teacher": "Ła",
          "room": "110",
          "group": {
            "current": 1,
            "total": 2
          }
        }
      ]
    }
  }
}
```

### Frontend - Data Loader

**Plik: `src/data/loader.js`**

Dostarcza funkcje do dostępu do danych:

```javascript
import { 
  getClasses,        // []
  getTeachers,       // []
  getRooms,          // []
  getSchedule,       // (classId) -> {...}
  getAllSchedules    // () -> {...}
} from './data/loader.js'
```

### React na zmiany danych

Aby zaktualizować dane po zmianie plików HTML:

```bash
npm run parse && npm run dev
```

Lub w innym oknie terminal:

```bash
npm run parse:watch  # JW oknie 1
npm run dev          # W oknie 2
```

---

## 🎨 Design i Styling

### Dostępne kolory "Cyber"

**Plik: `src/index.css` i `tailwind.config.js`**

```css
--cyber-dark: #0a0e27;        /* Główne tło */
--cyber-darker: #050812;      /* Głębsze tło */
--cyber-electric: #00ff99;    /* Neon zielony - główny accent */
--cyber-blue: #0099ff;        /* Neon niebieski */
--cyber-purple: #9933ff;      /* Neon fioletowy */
```

### Zmiana głównych kolorów

**Opcja 1:** Edytuj `src/index.css` (szybko)

```css
:root {
  --cyber-electric: #ff00ff;  /* Zmień neon zielony na fioletowy */
}
```

**Opcja 2:** Edytuj `tailwind.config.js` (kompleksowe)

```javascript
theme: {
  extend: {
    colors: {
      cyber: {
        electric: '#ff00ff',  // Zmiana koloru głównego
        blue: '#00ff00',
        // ...
      }
    }
  }
}
```

---

## 📱 Responsywność

Aplikacja jest w pełni responsywna:
- Desktop: pełny layout (sidebar + tabela)
- Tablet: kolumny dostosowują się
- Telefon: sidebar można schować, tabela scroll'uje

**Test responsywności:**
```bash
npm run dev
# F12 → Toggle Device Toolbar → testuj różne rozmiary
```

---

## 🚀 Build i Deployment

### Build dla produkcji

```bash
npm run build
```

Wynik w folderze `dist/`:
- `index.html` - główny plik
- `assets/` - bundled JS, CSS, obrazy
- Można umieścić gdziekolwiek na serwerze HTTP

### Testowanie build'a lokalnie

```bash
npm run build
npm run preview
# Otworzy: http://localhost:5050
```

### Deploy na serwer statyczny

```bash
# S3 / GitHub Pages / Vercel / Netlify
npm run build
# Wyślij zawartość dist/ na serwer
```

### Deploy z Node.js (opcjonalnie)

```bash
npm run build
npm run server
# Serwer na http://localhost:3000
```

---

## 🔔 System Zastępstw

### Gdzie znajduje się kod?

**File: `src/utils/substitutions.js`**

### Dwa tryby:

1. **Auto** - pobieranie z API:
   ```javascript
   const apiUrl = 'https://zastepstwa.zse.bydgoszcz.pl/api'
   ```

2. **Manual** - formularz w panelu admin:
   - Użytkownik wpisuje dane zastępstw
   - Dane są przechowywane w `localStorage`

### Integracja z API szkoły

Jeśli szkoła udostępnia API dla zastépstw:

```javascript
// Edytuj: src/utils/substitutions.js
async fetchFromAPI() {
  const response = await fetch(
    'https://zastepstwa.zse.bydgoszcz.pl/api/...'
  );
  return await response.json();
}
```

---

## ⚖️ Prawo Autorskie

W stopce strony jest wymagana informacja:

> Strona jest nieoficjalną nakładką wizualną. Wszystkie dane źródłowe należą do ZSE im. Wojska Polskiego w Bydgoszczy. Projekt ma charakter edukacyjny i pomocniczy.

**Plik: `src/App.vue` (linijka ~168)**

---

## ✨ Cechy Gotowe do Użycia

- ✅ Parser HTML → JSON (automatyczny)
- ✅ UI komponentów Vue
- ✅ Dark mode design
- ✅ Tooltip dla nauczycieli
- ✅ Panel administratora dla zastépstw
- ✅ localStorage dla ostatniej klasy
- ✅ Responsywny layout
- ✅ Dokumentacja

---

## 🚨 Potencjalne Problemy

### Problem: Parser nie znajduje plików

```bash
npm run parse
# Błąd: ENOENT: no such file or directory
```

**Rozwiązanie:**
- Sprawdź czy pliki `lista.htm` i `o*.htm` są w folderze `data/`
- Sprawdź czy nazwy plików są dokładnie: `o1.htm`, `o2.htm` (case-sensitive na Linux)

### Problem: Strona ładuje się pusta

1. Otwórz DevTools (F12)
2. Sprawdź console - czy są błędy?
3. Upewnij się że już uruchomiłeś `npm run parse`
4. Sprawdź czy `src/data/plan_data.json` istnieje

### Problem: Zdjęcia nauczycieli się nie ładują

- Nazwy plików muszą być dokładnie jak inicjały (małymi literami)
- Np: inicjał "Jk" → plik `jk.jpg`
- Pliki muszą być w: `public/nauczyciele/`
- Format: `.jpg` lub `.png`

---

## 📖 Dalsze Dokumenty

- **README.md** - Porada użytkownika
- **parse.js** - Dokumentacja parsera (kod comments)
- **src/data/loader.js** - Dokumentacja data loader
- **src/components/*.vue** - Dokumentacja komponentów

---

**Powodzenia w pracy! 🚀**

W razie pytań, sprawdź dokumentację lub skontaktuj się z administratorem szkoły.
