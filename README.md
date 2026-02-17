# Plan Lekcji ZSE - Modern UI

Nowoczesna nakładka wizualna dla planu lekcji Zespołu Szkół Elektronicznych im. Wojska Polskiego w Bydgoszczy.

## Cechy

✨ **Design Cyber-Electronic** - Dark mode z neonowymi akcentami  
🎨 **CSS Variables** - Łatwe dostosowanie kolorów  
📸 **System zdjęć nauczycieli** - Tooltip z automatycznym skalowaniem  
🔔 **Zastępstwa** - Integracja z API szkoły + ręczne dodawanie  
💾 **localStorage** - Zapamiętuje ostatnio odwiedzaną klasę  
⚙️ **Panel administratora** - Zarządzanie zastępstwami i plikami  
📱 **Responsywny** - Działa na wszystkich urządzeniach  

## Instalacja

```bash
npm install
```

## Development

Pierwszy raz lub po zmianach w plikach HTML:
```bash
npm run parse
```

Uruchomienie serwera developerskiego:
```bash
npm run dev
```

Otwórz http://localhost:3000

**Opcjonalnie:** Automatyczne parsowanie zmian:
```bash
npm run parse:watch
```

## Build

```bash
npm run build
```

Zawartość folderu `dist/` zawiera gotową aplikację.

## 🔧 System Parsowania Danych

### Jak działa proces parsowania?

1. **Skrypt `parse.js`** czyta pliki HTML z folderu `data/`:
   - `lista.htm` - ekstrakcja listy klas, nauczycieli i sal
   - `o*.htm` - ekstrakcja planów lekcji z tabel

2. **Generuje plik `src/data/plan_data.json`** zawierający:
   - Listę wszystkich klas z mapowaniem ID → nazwa
   - Listę nauczycieli z inicjałami i ścieżkami do zdjęć
   - Listę sal
   - Wszystkie plany lekcji w sformatowanej strukturze

3. **Frontend ładuje `plan_data.json`** z bundla (brak CORS)

### Struktura `plan_data.json`

```json
{
  "metadata": {...},
  "classes": [
    { "id": "1", "name": "1A 1A Ivy", "fileId": "o1" }
  ],
  "teachers": [
    {
      "id": "56",
      "fullName": "J.Kuźba",
      "initials": "Jk",
      "photoPath": "/nauczyciele/jk.jpg"
    }
  ],
  "schedules": {
    "o1": {
      "className": "1A 1A Ivy",
      "lessons": [...]
    }
  }
}
```

## Deployment

### Jako pliki statyczne
```bash
npm run build
# Umieść zawartość folderu 'dist' na serwerze HTTP
```

### Z Node.js
```bash
npm run build
npm run server
```

## 📸 Dodawanie zdjęć nauczycieli

1. Przygotuj zdjęcia nauczycieli w formacie JPG
2. Umieść je w folderze: `public/nauczyciele/`
3. Nazwa pliku musi być zgodna z inicjałami (małymi literami): `jk.jpg`, `ła.jpg` itp.
4. Zdjęcia będą automatycznie skalowane do 200x250px

### Wymagania techniczne:
- Format: JPG/PNG
- Rozdzielczość: min. 200x250px (większe zdjęcia będą zmniejszane)
- Rozmiar: poniżej 500KB
- Nazwa: `{inicjały}.jpg`

## Struktura projektu

```
zse-plan-lekcji/
├── src/
│   ├── components/              # Komponenty Vue
│   │   ├── App.vue              # Główny komponent
│   │   ├── ClassesSidebar.vue   # Lista oddziałów
│   │   ├── ScheduleView.vue     # Plan lekcji
│   │   ├── LessonCell.vue       # Pojedyncza lekcja
│   │   ├── TeacherTooltip.vue   # Tooltip nauczyciela
│   │   └── AdminPanel.vue       # Panel admina
│   ├── data/
│   │   ├── loader.js            # Loader danych z JSON
│   │   └── plan_data.json       # Data (generowany)
│   ├── store/
│   │   └── index.js             # State management
│   ├── utils/
│   │   ├── parser.js            # Parser HTML (legacy)
│   │   └── substitutions.js     # System zastépstw
│   ├── main.js
│   └── index.css
├── public/
│   └── nauczyciele/             # Zdjęcia nauczycieli
├── data/
│   ├── lista.htm                # Dane szkoły (źródło)
│   └── o*.htm                   # Plany klas (źródło)
├── dist/                        # Build output (generowany)
├── parse.js                     # Skrypt parsowania HTML → JSON
├── package.json
├── vite.config.js
├── tailwind.config.js
└── server.js                    # Opcjonalny serwer Node.js
```

## 🎨 Dostosowanie wyglądu

Edytuj plik `src/index.css`:

```css
:root {
  --cyber-dark: #0a0e27;
  --cyber-darker: #050812;
  --cyber-electric: #00ff99;      /* Główny kolor neon */
  --cyber-blue: #0099ff;
  --cyber-purple: #9933ff;
}
```

Lub bezpośrednio w `tailwind.config.js`.

## ⚖️ Informacja o prawach autorskich

> Strona jest nieoficjalną nakładką wizualną na plan lekcji. Wszystkie dane źródłowe należą do ZSE im. Wojska Polskiego w Bydgoszczy. Projekt ma charakter edukacyjny i pomocniczy.

---

## 📋 Dokumentacja dla Programisty

### Setup po raz pierwszy

1. **Przygotuj dane:**
   - Umieść pliki HTML z Optivum w folderze `data/`
   - Upewnij się, że masz `lista.htm` zawierający mapowanie klas

2. **Wygeneruj JSON:**
   ```bash
   npm install
   npm run parse
   ```
   Spowoduje to wygenerowanie `src/data/plan_data.json`

3. **Sprawdzenie danych:**
   ```bash
   npm run dev
   ```
   Aplikacja załaduje dane i powinna wyświetlić listę klas

### Dodanie nowej klasy

1. Dodaj plik `oXX.htm` do folderu `data/`
2. Uruchom `npm run parse`
3. Aplikacja automatycznie załaduje nową klasę

### Modyfikacja parsera

Edytuj `parse.js`, szczególnie metody:
- `parseListaFile()` - zmiana sposobu ekstrakcji klas/nauczycieli
- `parseTimetableFile()` - zmiana sposobu ekstrakcji lekcji
- `parseLessonCell()` - zmiana parsowania zawartości komórki

### Dodanie nowych funkcji

- **System notyfikacji:** Edytuj `AdminPanel.vue`
- **Filtrowanie lekcji:** Edytuj `ScheduleView.vue`
- **Integracja API:** Edytuj `src/utils/substitutions.js`

### Struktura danych w `plan_data.json`

**Klasy:**
```json
{
  "id": "1",
  "name": "1A 1A Ivy",
  "fileId": "o1"
}
```

**Nauczyciele:**
```json
{
  "id": "56",
  "fullName": "J.Kuźba",
  "initials": "Jk",
  "photoPath": "/nauczyciele/jk.jpg"
}
```

**Lekcje w planie:**
```json
{
  "day": "Poniedziałek",
  "dayIdx": 0,
  "time": "8:00-8:45",
  "lessonNumber": 1,
  "subject": "Matematyka",
  "teacher": "Ła",
  "room": "110",
  "group": { "current": 1, "total": 2 }
}
```

### Praca offline

Aplikacja jest w pełni funkcjonalna gdy otwarta z dysku:
- Dane są zapalane bezpośrednio w bundle'u (JSON zamiast fetch)
- Brak wymaganych żadnych serwera HTTP
- localStorage działa normalnie

Aby otworzyć z dysku:
```bash
npm run build
# Otwórz dist/index.html w przeglądarce
```
