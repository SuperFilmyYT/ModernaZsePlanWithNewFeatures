# ⚠️ WAŻNE - Wymagane Oprogramowanie

## Aktualny stan

Na tym komputerze **Node.js nie jest zainstalowany**.

Aby uruchomić projekt, **musisz zainstalować Node.js**.

---

## 🔧 Instalacja Node.js

### Opcja 1: Uniwersalna (Rekomendowana)

1. Pobierz Node.js: https://nodejs.org/ (wersja LTS - stara stabilna)
2. Uruchom instalator
3. Zaakceptuj domyślne opcje
4. Zrestartuj komputer (lub otworzy się nowe okno CMD)

### Opcja 2: Winget (Windows 10/11)

```powershell
# Jeśli masz Windows 10/11
winget install OpenJS.NodeJS
```

### Opcja 3: Chocolatey

```powershell
# Jeśli masz Chocolatey zainstalowany
choco install nodejs
```

---

## ✅ Weryfikacja instalacji

Po zainstalowaniu Node.js, sprawdź w PowerShell:

```powershell
node --version    # Powinno wyświetlić: v18.x.x lub v20.x.x
npm --version     # Powinno wyświetlić: 9.x.x lub wyżej
```

---

## 🚀 Po instalacji Node.js

Powróć do tego katalogu i uruchom:

```powershell
cd c:\Users\COMPUTER\Downloads\zse-plan-lekcji
npm install       # Instalacja zależności (~2-3 min)
npm run parse     # Parsowanie HTML (~1 min)
npm run dev       # Uruchomienie dev server
```

Przeglądarka powinna otworzyć się na: **http://localhost:5173**

---

## ⏱️ Czas instalacji

| Krok | Czas | Opis |
|------|------|------|
| Node.js download | 2-5 min | Z nodejs.org |
| Node.js install | 2-3 min | Uruchomienie instalatora |
| npm install | 2-3 min | Pobieranie zależności |
| npm run parse | 1 min | Parsowanie HTML |
| npm run dev | 10 sec | Uruchomienie dev server |
| **RAZEM** | **~10-15 min** | Do pierwszego uruchomienia |

---

## 🎯 Czekaj - czemu Node.js jest potrzebny?

**Parser HTML** (`parse.js`) jest narzędziem Node.js, które:
- Konwertuje HTML (`lista.htm`, `o*.htm`) na JSON (`plan_data.json`)
- Pracuje bez przeglądarki (po co ci przeglądarka do parsowania?)
- Odbywa się **jeden raz** przed startem dev servera

Kiedy już masz `plan_data.json`, aplikacja Vue.js pracuje całkowicie offline bez Node.js!

---

## 📥 Alternatywa: Jeśli nie chcesz instalować Node.js

**Nie polecam**, ale jeśli absolutnie nie chcesz:

1. Znajdź kogoś kto ma Node.js zainstalowany
2. Lub użyj online IDE jak Replit/CodeSandbox
3. Lub poproś mnie by wygenerować `src/data/plan_data.json` dla Ciebie

---

## ❓ Pytania?

Jeśli masz problem:

1. **Node.js się nie instaluje**: Sprawdź uprawnienia administratora
2. **npm says "permission denied"**: Uruchom PowerShell jako Administrator
3. **Port 3000 jest zajęty**: Zmień w `vite.config.js`: `port: 3001`
4. **Dalej nie działa**: Kontaktuj administratora szkoły

---

## ✅ Kiedy będzie gotowe?

Po zainstalowaniu Node.js i uruchomieniu `npm run dev`:

- ✅ Lista klas będzie widoczna po lewej
- ✅ Plan lekcji pojawi się po kliknięciu na klasę
- ✅ Kolory będą w stylu "Cyber-Electronic"
- ✅ Wszystko będzie działać offline

---

**Powodzenia z instalacją! 🚀**
