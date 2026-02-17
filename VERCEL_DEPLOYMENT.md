# 🚀 WDROŻENIE NA VERCEL - Krok Po Kroku

**ZSE Planner Pro 2.0 - Production Ready**

---

## ⚡ Quick Start (5 minut)

### Opcja 1: GitHub + Auto-Deploy (REKOMENDOWANA)

1. **Wyślij kod na GitHub**
   ```bash
   git init
   git add .
   git commit -m "ZSE Planner Pro v2.0"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/zse-plan-lekcji.git
   git push -u origin main
   ```

2. **Zaloguj się na Vercel**
   - https://vercel.com → Sign Up / Login

3. **Importuj projekt**
   - Vercel Dashboard → "New Project"
   - Selectuj repozytorium GitHub
   - Kliknij "Import"

4. **Skonfiguruj build**
   - Framework: **Vite**
   - Build command: `npm run parse && vite build`
   - Output directory: `dist`
   - Kliknij "Deploy"

5. **Gotowe! 🎉**
   - Vercel generId URL: `https://zse-plan-lekcji.vercel.app`
   - Auto-deploy przy każdym push na GitHub

---

## 📦 Pełna konfiguracja (Vercel-specific)

### vercel.json - Już gotowy!

Ten plik jest już w projekcie. Konfiguruje:

```json
{
  "buildCommand": "npm run parse && npm run build",
  "functions": {
    "api/substitutions.js": {
      "memory": 256,
      "maxDuration": 30
    }
  }
}
```

**Co to robi:**
- Uruchamia `npm run parse` aby wygenerować JSON
- Uruchamia Vite build
- Konfiguruje Vercel Function (proxy API)

---

## 🔒 Environment Variables (Opcjonalnie)

### Jeśli chcesz konfigurować API endpoint

1. **Vercel Dashboard → Project Settings → Environment Variables**

2. **Dodaj zmienne:**
   ```
   VITE_API_URL=https://zastepstwa.zse.bydgoszcz.pl/api
   ```

3. **Użyj w kodzie:**
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

---

## 🟢 Service Worker na Vercel

### Cache-Control Headers

Vercel automatycznie obsługuje:
- **HTML**: No cache (zawsze fresh)
- **JS/CSS**: Long-term cache (versioned filenames)
- **Service Worker**: No cache (zawsze latest)

**W vercel.json to jest skonfigurowane:**
```json
"headers": [
  {
    "source": "/sw.js",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=0, must-revalidate"
      }
    ]
  }
]
```

---

## 📱 PWA na Vercel

### Manifest & Icons (Opcjonalnie)

Jeśli chcesz pełną PWA doświadczenie:

1. **Stwórz ikony** (192×192 i 512×512)
   ```
   public/
     icon-192.png
     icon-512.png
     icon-192-maskable.png
     icon-512-maskable.png
   ```

2. **manifest.json** - Już jest w `/public`! ✅

3. **Test na telefonie:**
   ```
   https://zse-plan-lekcji.vercel.app
   Menu → Install App
   ```

---

## 🔄 CORS Proxy (Vercel Functions)

### Jak działa na Vercel

1. **Frontend żąda:**
   ```
   GET /api/substitutions?class=1A
   ```

2. **Vercel Function (`api/substitutions.js`):**
   ```javascript
   Pyta ZSE API: https://zastepstwa.zse.bydgoszcz.pl/api
   Obsługuje błędy
   Zwraca JSON
   ```

3. **Response do frontend'u**
   ```json
   {
     "substitutions": [...],
     "timestamp": "2026-02-17T..."
   }
   ```

### Test proxy

```bash
# Lokalnie (dev)
curl http://localhost:5173/api/substitutions

# Na Vercel (production)
curl https://zse-plan-lekcji.vercel.app/api/substitutions
```

---

## 📊 Monitorowanie na Vercel

### Analytics (Gratis!)

1. **Vercel Dashboard → Analytics**
   - Page views i performance
   - Error tracking
   - Serverless Function metrics

### Logs

1. **Vercel Dashboard → Deployments → View Details**
   - Build logs
   - Function logs
   - Error logs

### Performance

1. **Vercel Dashboard → Analytics → Performance**
   - Core Web Vitals
   - First Contentful Paint
   - Cumulative Layout Shift

---

## 🔐 Security Checks

### CORS

✅ Jest obsługiwany przez Function proxy

### Content Security Policy

```html
<!-- Dodaj w index.html jeśli wymagane -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

### Secrets (jeśli używasz)

```bash
# Dodaj sekrety w Vercel Dashboard
vercel env add API_KEY
vercel env add SECRET_TOKEN
```

---

## 📝 Continuous Deployment

### Auto-deploy z GitHub

```bash
# Każdy push na main → automatycznie deploy
git push origin main
# Watch: https://vercel.com/dashboard
```

### Preview Deployments

```bash
# Każdy Pull Request → preview URL
# Np: https://zse-plan-lekcji-preview-abc123.vercel.app
```

### Rollback

```bash
# Vercel Dashboard → Deployments → (stara wersja) → Redeploy
```

---

## 🚨 Troubleshooting

### Build fails: "Cannot find module 'cheerio'"

**Przyczyna**: Dependencies nie zainstalował się  
**Rozwiązanie**: 
```bash
npm install
npm run build  # Test lokalnie
git push # Redeploy na Vercel
```

### API proxy returns 503

**Przyczyna**: ZSE API jest offline  
**Rozwiązanie**: Graceful degradation - frontend pokazuje pusty array

### Service Worker: 404

**Przyczyna**: Vercel nie ma `sw.js`  
**Rozwiązanie**: Ustaw headers w `vercel.json` (już zrobione ✅)

### Photos don't load on Vercel

**Przyczyna**: Zła ścieżka  
**Rozwiązanie**: Zdjęcia w `/public/nauczyciele/`, dostępne jako `/nauczyciele/XYZ.jpg`

### PWA doesn't install

**Przyczyna**: Manifest albo icons missing  
**Rozwiązanie**: Spraw że `manifest.json` jest dostępny i ikony istnieją

---

## 📈 Performance Optimization

### Already optimized for Vercel:

- ✅ Vite bundling (fast)
- ✅ Service Worker caching
- ✅ Static JSON data (no API calls for schedule)
- ✅ Image optimization (aspect-ratio, object-fit)

### Optional improvements:

```javascript
// Lazy load components
const AdminPanel = defineAsyncComponent(() => 
  import('./components/AdminPanel.vue')
);

// Compress images
// Use WebP with fallback
```

---

## 🌍 Custom Domain

### Dodaj własną domenę

1. **Vercel Dashboard → Settings → Domains**
2. **Dodaj domenę**: `plan-lekcji.zse.edu.pl`
3. **Zmień DNS** w rejestratorze
4. **Auto-SSL certifikat** (Let's Encrypt) ✅

---

## 💰 Koszt

### Vercel (Pro Features) - **GRATIS dla edukacji**

- Hosting: Gratis
- Domains: Gratis
- Serverless Functions: 1M invocations/month (gratis!)
- Analytics: Gratis
- Support: Community

**Aplikuj na Vercel for Education:**
https://vercel.com/for/education

---

## ✅ Pre-Deployment Checklist

- [ ] `npm run build` działa bez błędów
- [ ] `npm run preview` działa
- [ ] Service Worker rejestruje się (DevTools)
- [ ] API proxy testuje się lokalnie
- [ ] Zdjęcia nauczycieli są w `/public/nauczyciele/`
- [ ] `vercel.json` jest w repo
- [ ] `api/substitutions.js` jest w repo
- [ ] `public/sw.js` jest w repo
- [ ] `public/manifest.json` jest w repo
- [ ] Project na GitHub
- [ ] Gotowy do deploy! 🚀

---

## 🎯 Deployment (7 minut)

```bash
# 1. Przesyłanie na GitHub
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 2. Vercel → Import Project (via GitHub)
# 3. Wait for deployment... (2-3 min)
# 4. Visit https://zse-plan-lekcji.vercel.app ✅

# 5. Monitor performance
# 6. Share link z nauczycielami! 📚
```

---

## 📞 Pomoc

**Oficjalne docs:**
- Vercel: https://vercel.com/docs
- Serverless Functions: https://vercel.com/docs/functions
- Analytics: https://vercel.com/docs/web-analytics

**Dla ZSE:**
- Masz dostęp do domeny szkoły? Dodaj custom domain!
- Chcesz analytics? Vercel ma to gratis!
- Problemy z API szkoły? Proxy obsługuje failover ✅

---

## 🎉 Gratulacje!

Twoja aplikacja jest teraz **hosted na Vercel** – najszybszym i najprostszym cloudzie! 

**URL**: `https://zse-plan-lekcji.vercel.app` 🚀

**Następne kroki:**
- [ ] Podziel się linkiem z nauczycielami
- [ ] Zbierz feedback
- [ ] Dodaj nowe klasy (edytuj `/data/o*.htm` i redeploy)
- [ ] Monitoruj performance (Vercel Analytics)

---

**Powodzenia! 📚✨**
