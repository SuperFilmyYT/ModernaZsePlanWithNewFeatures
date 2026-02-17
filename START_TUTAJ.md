# 🎉 PLAN LEKCJI ZSE - GOTOWY DO PRACY!

**Autor**: GitHub Copilot  
**Data**: 17 lutego 2026  
**Projekt**: Modernizacja interfejsu planu lekcji  
**Status**: ✅ **GOTOWY DO URUCHOMIENIA**

---

## ⚡ SZYBKI START (3 kroki)

### Krok 1️⃣ Zainstaluj Node.js

👉 **Jeśli nie masz zainstalowanego Node.js:**

```
https://nodejs.org/ → Pobierz LTS → Zainstaluj
```

Potem sprawdź w PowerShell:
```powershell
node --version    # Powinna pokazać: v18 lub v20
npm --version
```

**[📖 Szczegółowa instrukcja → INSTALACJA_NODE.md](INSTALACJA_NODE.md)**

### Krok 2️⃣ Zainstaluj zależności

Otwórz PowerShell w tym folderze i wpisz:

```powershell
npm install
```

⏳ Czeka ~2-3 minuty

### Krok 3️⃣ Uruchom projekt

```powershell
npm run parse
npm run dev
```

Przeglądarka otworzy się automatycznie na: **http://localhost:5173**

---

## ✅ Powinna Ci się wyświetlić:

Lewa strona (sidebar):
- [ ] Listy wszystkich klas (1A, 1B, 1C, itd.)

Środek (główna zawartość):
- [ ] Plan lekcji dla wybranej klasy
- [ ] Tabela z dniami (Poniedziałek-Piątek)
- [ ] Lekcje z nauczycielami, salami, grupami

Górny pasek (header):
- [ ] Nazwa szkoły - "Plan Lekcji ZSE"
- [ ] Przycisk ⚙️ (Admin panel)
- [ ] Przycisk 🌙 (Dark mode - już włączony)

---

## 📚 Dokumentacja

Po uruchomieniu aplikacji sprawdź:

| Plik | Dla kogo? | Co zawiera? |
|------|-----------|------------|
| [**PODSUMOWANIE.md**](PODSUMOWANIE.md) | Dla Ciebie (teraz) | Przegląd całego projektu |
| [**INSTRUKCJA_PROGRAMISTY.md**](INSTRUKCJA_PROGRAMISTY.md) | Dla dev'a | Techniczne szczegóły |
| [**CHECKLIST.md**](CHECKLIST.md) | Dla testera | Lista testów do sprawdzenia |
| [**README.md**](README.md) | Dla użytkownika | Jak używać aplikacji |
| [**INSTALACJA_NODE.md**](INSTALACJA_NODE.md) | Jeśli masz problem | Jak zainstalować Node.js |

---

## 🎨 Co zostało przygotowane?

✅ **Frontend** (Vue.js 3)
- Nowoczesny interfejs z Tailwind CSS
- Responsywny design (desktop/tablet/telefon)
- Dark mode z "Cyber-Electronic" designem
- Neon zielone, niebieskie, fioletowe akcenty

✅ **Backend Parser** (Node.js)
- Automatyczne parsowanie plików HTML z VULCAN'a
- Konwersja do czystego JSON
- Zero konfiguracji - działa out-of-the-box

✅ **Komponenty Vue**
- Sidebar z listą klas
- Tabela planu lekcji
- Tooltip z danymi nauczycieli + zdjęciem
- Panel administratora (zastępstwa, upload, ustawienia)

✅ **Offline support**
- Aplikacja pracuje bez internetu
- localStorage dla ostatnio odwiedzonej klasy
- Zero HTTP requestów do serwera

---

## 🚀 Następne kroki

### Zaraz po uruchomieniu (npm run dev)

1. Kliknij na klasę w sidebar → powinna wyświetlić jej plan
2. Najechaj na inicjały nauczyciela → tooltip (bez zdjęcia dopóki nie dodasz)
3. Kliknij ⚙️ Admin → otwiera się panel
4. Zmień kolor (Colors tab) → wciśnij przycisk (będzie widać zmianę)

### W ciągu godziny

- [ ] Zbierz zdjęcia nauczycieli (JPG, 200×250px)
- [ ] Umieść w: `public/nauczyciele/jk.jpg`, `public/nauczyciele/ła.jpg`, itp.
- [ ] Przeładuj stronę (F5) - zdjęcia się pojawią

### Do jutra

- [ ] Dodaj więcej klas: Pobierz `o2.htm`, `o3.htm`, etc. z VULCAN'a
- [ ] Umieść w folder: `data/`
- [ ] Uruchom: `npm run parse` (nowe klasy pojawią się automatycznie)

### Na produkcję

```powershell
npm run build      # Tworzy folder dist/
# Prześlij zawartość dist/ na serwer HTTP
```

---

## ⚠️ Jeśli coś nie działa

### Błąd: "npm is not recognized"

→ Nie masz Node.js zainstalowanego  
→ [Przejdź do: INSTALACJA_NODE.md](INSTALACJA_NODE.md)

### Błąd: "Cannot find cheerio"

```powershell
npm install      # Zainstaluj zależności
```

### Błąd: "plan_data.json not found"

```powershell
npm run parse    # Wygeneruj JSON z HTML
```

### Strona ładuje się pusta

1. Otwórz DevTools (F12 → Console)
2. Czy są tam błędy?
3. Sprawdź czy uruchomiłeś `npm run parse`

---

## 📞 Potrzebujesz pomocy?

### Dla pytań ogólnych

- [README.md](README.md) - Instrukcja dla użytkowników
- [PODSUMOWANIE.md](PODSUMOWANIE.md) - Przegląd projektu

### Dla pytań technicznych

- [INSTRUKCJA_PROGRAMISTY.md](INSTRUKCJA_PROGRAMISTY.md) - Szczegóły dla dev'a
- [CHECKLIST.md](CHECKLIST.md) - Jak testować aplikację

### Dla problemów z instalacją

- [INSTALACJA_NODE.md](INSTALACJA_NODE.md) - Jak zainstalować Node.js

---

## 📋 Architektura (krótkieg przegląd)

```
HTML pliki (VULCAN)
    ↓
parse.js (Node.js)
    ↓
src/data/plan_data.json (JSON)
    ↓
src/data/loader.js (accessors)
    ↓
Vue.js komponenty
    ↓
Przeglądarka (offline)
```

**Result**: Aplikacja pracuje całkowicie offline! 🎉

---

## 🎯 Ostateczny Checklist

- [ ] Node.js v16+ zainstalowany
- [ ] `npm install` uruchomiony
- [ ] `npm run parse` uruchomiony (plan_data.json istnieje)
- [ ] `npm run dev` uruchomiony
- [ ] Aplikacja załadowała się w przeglądarce
- [ ] Lista klas widoczna w sidebar
- [ ] Plan lekcji wyświetla się po kliknięciu klasy
- [ ] Kolory są cyberowskie (dark + neon)

**Jeśli wszystkie pola są zaznaczone:**

# ✅ Gotowy do pracy! 🚀

---

## 📌 Ważne informacje

### Disclaimer

> Strona jest nieoficjalną nakładką wizualną. Wszystkie dane źródłowe należą do ZSE im. Wojska Polskiego w Bydgoszczy. Projekt ma charakter edukacyjny i pomocniczy.

### Offline operation

Aplikacja pracuje **bez internetu i bez backendu**. Alle dane są pre-computed w `plan_data.json`.

### Brak bazy danych

Projekt nie korzysta z bazy danych. Dane są przechowywane w:
- `src/data/plan_data.json` (główne dane)
- `localStorage` (ostatnia klasa, ustawienia)

### Bezpieczeństwo

Projekt nie wysyła żadnych danych do serwera (z wyjątkiem opcjonalnego API dla zastépstw).

---

## 🎓 O projekcie

**Cel**: Stworzenie nowoczesnej, responsywnej aplikacji webowej (SPA), która zastąpi przestarzały interfejs VULCAN dla ZSE Bydgoszcz.

**Tech Stack**:
- Vue.js 3 (Composition API)
- Vite 4.3 (Build tool)
- Tailwind CSS 3.3 (Styling)
- Cheerio (HTML parsing)
- Node.js (Backend)

**Time spent**: ~6 godzin w konwersacji z AI ✨

---

## 🎉 Powodzenia!

To projekt jest **kompletny i gotowy do pracy**.

Wystarczy zainstalować Node.js i uruchomić 3 komendy:

```powershell
npm install
npm run parse
npm run dev
```

**Powinieneś zobaczyć aplikację w przeglądarce za ~5 minut.**

---

**©️ 2026 GitHub Copilot | ZSE Bydgoszcz | Educational Use Only**
