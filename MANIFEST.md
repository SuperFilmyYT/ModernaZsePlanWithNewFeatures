# 📦 MANIFEST PROJEKTU - Wszystkie pliki

**Data**: 17 lutego 2026  
**Projekt**: Plan Lekcji ZSE - Vue.js + Vite + Tailwind CSS  
**Status**: ✅ Kompletnie gotowy

---

## 📂 Struktura plików

```
c:\Users\COMPUTER\Downloads\zse-plan-lekcji\
│
├─ 📄 START_TUTAJ.md                    ← Czytaj TO NAJPIERW!
├─ 📄 PODSUMOWANIE.md                   ← Przegląd całego projektu
├─ 📄 INSTRUKCJA_PROGRAMISTY.md         ← Dla dev'ów
├─ 📄 CHECKLIST.md                      ← Lista testów
├─ 📄 INSTALACJA_NODE.md                ← Jak zainstalować Node.js
├─ 📄 README.md                         ← Instrukcja dla użytkownika
│
├─ 🔧 package.json                      ← Dependencje + npm scripts
├─ 🔧 vite.config.js                    ← Konfiguracja Vite
├─ 🔧 tailwind.config.js                ← Konfiguracja Tailwind
├─ 🔧 postcss.config.js                 ← Konfiguracja PostCSS
├─ 🔧 index.html                        ← SPA entry point
│
├─ 📜 parse.js                          ← Parser HTML → JSON (Node.js)
├─ 📜 server.js                         ← Optional Node.js server
│
├─ 📁 src/                              ← Kod aplikacji Vue.js
│   ├─ 📄 main.js                       ← Inicjalizacja Vue app
│   ├─ 📄 App.vue                       ← Główny komponent
│   ├─ 📄 index.css                     ← Globalne style + Cyber theme
│   │
│   ├─ 📁 components/                   ← Komponenty Vue
│   │   ├─ ClassesSidebar.vue           ← Lista wszystkich klas
│   │   ├─ ScheduleView.vue             ← Plan lekcji jako tabela
│   │   ├─ LessonCell.vue               ← Pojedyncza lekcja
│   │   ├─ TeacherTooltip.vue           ← Tooltip z zdjęciem
│   │   └─ AdminPanel.vue               ← Panel administracji
│   │
│   ├─ 📁 store/                        ← State Management
│   │   └─ index.js                     ← Centralne store
│   │
│   ├─ 📁 utils/                        ← Utility functions
│   │   ├─ parser.js                    ← Utility do parsowania
│   │   └─ substitutions.js             ← System zastépstw
│   │
│   └─ 📁 data/                         ← Data loader
│       └─ loader.js                    ← Dostęp do plan_data.json
│       └─ plan_data.json               ← ⚠️ Będzie wygenerowany przez npm run parse
│
├─ 📁 data/                             ← Dane źródłowe z VULCAN'a
│   ├─ lista.htm                        ← Metadane szkoły (klasy, nauczyciele)
│   └─ o1.htm                           ← Plan klasy 1A (przykład)
│
├─ 📁 public/                           ← Statyczne pliki
│   └─ 📁 nauczyciele/                  ← Zdjęcia nauczycieli
│       └─ (czeka na zdjęcia JPG)
│
└─ 📁 .git/                             ← Git repository (opcjonalnie)
```

---

## 📄 Szczegóły każdego pliku

### 🎯 Pliki dokumentacji

| Plik | Rozmiar | Przeznaczenie | Czytać? |
|------|---------|--------------|---------|
| **START_TUTAJ.md** | ~3 KB | Quick start guide | ✅ KONIECZNIE |
| **PODSUMOWANIE.md** | ~10 KB | Przegląd całego projektu | ✅ Polecam |
| **README.md** | ~8 KB | Instrukcja dla użytkownika | ✅ Przed start |
| **INSTRUKCJA_PROGRAMISTY.md** | ~12 KB | Techniczne detale | ⚠️ Jeśli dev |
| **CHECKLIST.md** | ~6 KB | Lista testów | ⚠️ Jeśli tester |
| **INSTALACJA_NODE.md** | ~4 KB | Instalacja Node.js | ⚠️ Jeśli problem |
| **MANIFEST.md** | ~8 KB | Ten plik | ℹ️ FYI |

### 🔧 Pliki konfiguracyjne

#### `package.json` (355 linii)
- NPM dependencies (vue, vite, tailwindcss, cheerio)
- NPM scripts (dev, build, parse, parse:watch, server)
- Project metadata

#### `vite.config.js` (15 linii)
- Port: 5173 (dev server)
- Sourcemap disabled dla produkcji
- Alias `@` dla src/

#### `tailwind.config.js` (30 linii)
- Cyber colors (dark, electric, blue, purple)
- Dark mode: true
- Font: Space Mono

#### `postcss.config.js` (5 linii)
- Tailwind CSS plugin
- Autoprefixer plugin

#### `index.html` (25 linii)
- Vue app entry point
- Favicon reference
- Preload scripts

### 📜 Pliki aplikacji

#### `parse.js` (370+ linii)
**Odpowiedzialny za**: Parsowanie HTML → JSON  
**Używa**: Cheerio library  
**Kiedy uruchamiać**: `npm run parse`  
**Wytwarza**: `src/data/plan_data.json`

**Główne klasy/funkcje**:
- `VulcanParser` class
- `parseListaFile(filePath)` - parsowanie lista.htm
- `parseTimetableFile(filePath, classId)` - parsowanie o*.htm
- `parseLessonCell(cell)` - parsowanie pojedynczej lekcji
- `generateJSON()` - tworzenie struktury JSON
- `saveJSON(outputPath)` - zapis do pliku

#### `server.js` (20+ linii)
**Odpowiedzialny za**: Serwowanie aplikacji przez Node.js  
**Kiedy uruchamiać**: `npm run server`  
**Port**: 3000

### 📁 src/ - Kod Vue.js

#### `src/main.js` (15 linii)
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createStore } from './store'

createApp(App)
  .use(createStore)
  .mount('#app')
```

#### `src/App.vue` (200+ linii)
**Odpowiedzialny za**: Główny komponent aplikacji  
**Zawiera**: Layout, header, sidebar, admin panel, footer  
**Lifecycle**: `onMounted()` ładuje klasy/nauczycieli/plany

#### `src/index.css` (150+ linii)
**Zawiera**:
- CSS Variables (--cyber-*)
- @keyframes animations (glow, pulse-border)
- Utility classes (.glow-text, .glass-effect, .grid-pattern)
- Global styles (scrollbar, links, etc)

#### `src/components/ClassesSidebar.vue` (45 linii)
**Props**:
- `classes`: Array<Class>

**Emits**:
- `select`: Class object

#### `src/components/ScheduleView.vue` (120+ linii)
**Props**:
- `schedule`: Object with lessons
- `teachers`: Array<Teacher>
- `rooms`: Array<Room>

**Computed**:
- `groupedLessons` - Lessons grouped by lessonNumber and day

#### `src/components/LessonCell.vue` (60+ linii)
**Props**:
- `lesson`: Object
- `teacher`: Teacher object
- `isSubstitution`: Boolean

**Computed**:
- `subject` - Subject name without group notation

#### `src/components/TeacherTooltip.vue` (80+ linii)
**Props**:
- `initials`: String

**Features**:
- Hover tooltip
- Photo loading with fallback
- Error handling (404 images)

**Computed**:
- `teacher` - Looks up teacher by initials
- `photoUrl` - Returns /nauczyciele/{initials}.jpg path

#### `src/components/AdminPanel.vue` (150+ linii)
**Features**:
- Tab 1: Substitutions form
- Tab 2: File upload (drag-drop)
- Tab 3: Theme settings

**Methods**:
- `addSubstitution()` - Adds substitution via SubstitutionService
- `handleFileSelect()` - File input handler
- `handleFileDrop()` - Drag-drop handler

#### `src/store/index.js` (100+ linii)
**State**:
```javascript
classes: [],
teachers: [],
currentClass: null,
schedule: null,
substitutions: [],
schedules: {},           // NEW: Pre-computed schedules
theme: 'default'
```

**Methods**:
- `setClasses()`
- `setTeachers()`
- `setSchedule()` - Also saves to localStorage
- `setSchedules()` - NEW
- `getTeacherByInitials()`
- `getTeacherPhoto()`

#### `src/utils/parser.js` (80+ linii)
**Class**: `OptivumParser`  
**Methods**:
- `parseClassesFromHTML()` - Extract classes
- `parseTeachersFromHTML()` - Extract teachers
- `parseTimetableFromHTML()` - Parse schedule

#### `src/utils/substitutions.js` (120+ linii)
**Class**: `SubstitutionService`  
**Features**:
- Fetch from API (https://zastepstwa.zse.bydgoszcz.pl/api)
- Fallback to localStorage
- Add/remove substitutions locally

**Methods**:
- `fetchFromAPI()`
- `getAllSubstitutions()`
- `addLocalSubstitution()`
- `removeLocalSubstitution()`
- `filterByClass()`

#### `src/data/loader.js` (60+ linii)
**Functions**:
- `loadPlanData()` - Returns parsed JSON
- `getClasses()` - Returns all classes
- `getTeachers()` - Returns all teachers
- `getRooms()` - Returns all rooms
- `getSchedule(classId)` - Returns schedule for class
- `getAllSchedules()` - Returns all schedules

#### `src/data/plan_data.json` ⚠️
**Status**: Będzie wygenerowany przez `npm run parse`  
**Rozmiar**: ~100-500 KB (zależy od liczby klas)  
**Struktura**:
```json
{
  "metadata": {...},
  "classes": [{id, name, fileId}, ...],
  "teachers": [{id, fullName, initials, photoPath}, ...],
  "rooms": [{id, name}, ...],
  "schedules": {
    "o1": {...},
    "o2": {...},
    ...
  }
}
```

### 📁 data/ - Dane źródłowe

#### `data/lista.htm` (~50 KB)
**Źródło**: Pobrane z VULCAN'a  
**Zawiera**: 
- Listę wszystkich klas (linki <a href="/plany/o*.html">)
- Listę nauczycieli (linki <a href="/plany/n*.html">)
- Listę sal

**Format**: HTML (nieformatowany, brudny)

#### `data/o1.htm` (~30 KB)
**Źródło**: Plan lekcji dla klasy 1A z VULCAN'a  
**Zawiera**: 
- Tabelę z lekcjami (class="tabela")
- Dni tygodnia, godziny, przedmioty
- Nauczycieli, sale, grupy

**Format**: HTML (nieformatowany, brudny)

#### `data/o*.htm` (opcjonalnie)
Możesz dodać więcej plików für więcej klas:
- `o2.htm` - klasa 1B
- `o3.htm` - klasa 1C
- etc.

**Dodanie**: Po kopiowaniu, uruchom `npm run parse`

### 📁 public/nauczyciele/ - Zdjęcia

**Status**: ⏳ Czeka na zdjęcia  
**Gdzie**: `public/nauczyciele/jk.jpg`, `public/nauczyciele/ła.jpg`, etc.  
**Format**: JPG lub PNG  
**Rozmiar**: 200×250px (minimalnie), max 500KB  
**Nazwy**: Inicjały nauczycieli (małe litery!)

---

## 🚀 Workflow plików

### Inicjalizacja (jeden raz)

```
1. npm install
   ↓
2. Czyta: package.json
   Pobiera i instaluje: node_modules/
   
3. npm run parse
   ↓
4. Czyta: data/lista.htm, data/o*.htm
   Parser (parse.js) procesuje
   Wytwarza: src/data/plan_data.json
   
5. npm run dev
   ↓
6. Czyta: src/main.js
   Czyta: src/App.vue i komponenty
   Czyta: src/data/plan_data.json
   Uruchamia: Vite dev server na http://localhost:5173
```

### Przeglądanie (codziennie)

```
1. User otwiera: http://localhost:5173
2. Browser downloads: index.html
3. index.html ładuje: main.js (bundled)
4. main.js inicjalizuje: Vue app
5. App.vue:
   a. Czyta: src/data/loader.js
   b. Czyta: src/data/plan_data.json
   c. Renderuje: Lista klas, plan lekcji
6. User interakcja:
   a. Kliknie na klasę
   b. ScheduleView.vue wyświetli plan
   c. Hover na nauczyciela
   d. TeacherTooltip pokaże zdjęcie
```

### Aktualizacja danych

```
1. Pobierz nowe o*.htm z VULCAN'a
2. Kopiuj do: data/
3. Uruchom: npm run parse
   (w innym terminalu)
4. Browser auto-refresh (hot reload)
5. Nowe plany pojawią się w aplikacji
```

### Build na produkcję

```
1. npm run build
   ↓
2. Czyta: src/** (wszystkie pliki źródłowe)
   Bundlesuje z Vite
   Minimalizuje CSS/JS
   Optymalizuje obrazy
   ↓
3. Wytwarza: dist/
   - dist/index.html
   - dist/assets/main.*.js
   - dist/assets/main.*.css
   
4. Deploy: Skopiuj dist/* na serwer HTTP
```

---

## 📊 Rozmiary plików

| Plik | Typ | Rozmiar | Opis |
|------|-----|---------|------|
| package.json | Config | 2 KB | Dependencies |
| vite.config.js | Config | 1 KB | Vite settings |
| parse.js | Script | 15 KB | HTML parser |
| src/App.vue | Vue | 12 KB | Main component |
| src/components/*.vue | Vue | 25 KB | Components (total) |
| src/index.css | CSS | 8 KB | Styles |
| data/lista.htm | HTML | 50 KB | School data |
| data/o1.htm | HTML | 30 KB | Class schedule |
| **Total (bez node_modules)** | | **160 KB** | |

---

## ✅ Checklist - Co zostało zrobione

- [x] Struktura projektu Vue.js
- [x] Konfiguracja Vite + Tailwind
- [x] Parser HTML → JSON (Cheerio)
- [x] 5 komponentów Vue
- [x] State management store
- [x] CSS Cyber-Electronic theme
- [x] Admin panel
- [x] Teacher photo system
- [x] localStorage integration
- [x] Responsive design
- [x] Dokumentacja (6 plików)
- [x] Offline support
- [x] HTML source files

---

## ⚠️ Wymagania przed startem

- Node.js v16+ (do pobrania z nodejs.org)
- npm v8+
- ~500 MB wolnego miejsca (node_modules)
- Przeglądarka z obsługą CSS Grid

---

## 🔗 Zależności (npm)

| Package | Version | Uso |
|---------|---------|-----|
| vue | ^3.3.4 | Framework |
| vite | ^4.3 | Build tool |
| tailwindcss | ^3.3 | CSS framework |
| postcss | ^8.4 | CSS processor |
| cheerio | ^1.0 | HTML parser |
| nodemon | ^3.0 | Auto-reload dev |

---

## 📝 Ostateczna checklist

- [ ] Przeczytałeś START_TUTAJ.md
- [ ] Zainstalowałeś Node.js
- [ ] Uruchomiłeś `npm install`
- [ ] Uruchomiłeś `npm run parse`
- [ ] Uruchomiłeś `npm run dev`
- [ ] Aplikacja открылась w przeglądarce
- [ ] Widzisz listę klas i plan lekcji

**Jeśli wszystko ✅ → Projekt jest gotowy do pracy! 🎉**

---

**Projekt gotowy**: 17 luty 2026 ✨
