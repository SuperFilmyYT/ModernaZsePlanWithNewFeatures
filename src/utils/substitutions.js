/**
 * Serwis dla zastępstw
 * Obsługuje pobieranie z API proxy (Vercel Functions) oraz lokalne storage
 */

export class SubstitutionService {
  constructor() {
    // Use Vercel Functions proxy instead of direct API
    this.apiUrl = '/api';
    this.localSubs = JSON.parse(localStorage.getItem('localSubstitutions') || '[]');
  }

  /**
   * Pobiera zastępstwa z API proxy (Vercel Function)
   * Proxy obsługuje CORS i błędy pośrednika
   */
  async fetchFromAPI(className = null) {
    try {
      const url = className 
        ? `${this.apiUrl}/substitutions?class=${encodeURIComponent(className)}`
        : `${this.apiUrl}/substitutions`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      return data.substitutions || [];
    } catch (error) {
      console.warn('[SubstitutionService] API nie dostępne, używam lokalnych zastępstw:', error);
      return [];
    }
  }

  /**
   * Pobiera wszystkie zastępstwa (API + lokalne)
   */
  async getAllSubstitutions(className = null) {
    const apiSubs = await this.fetchFromAPI(className);
    
    // Filter local subs by class if provided
    const filteredLocalSubs = className
      ? this.localSubs.filter(s => 
          s.class === className || 
          (s.affectedClasses && s.affectedClasses.includes(className))
        )
      : this.localSubs;
    
    return [...apiSubs, ...filteredLocalSubs];
  }

  /**
   * Dodaje lokalne zastępstwo
   */
  addLocalSubstitution(sub) {
    const newSub = {
      id: `local_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...sub
    };
    this.localSubs.push(newSub);
    localStorage.setItem('localSubstitutions', JSON.stringify(this.localSubs));
    console.log('[SubstitutionService] Zastępstwo dodane:', newSub);
    return newSub;
  }

  /**
   * Usuwa lokalne zastępstwo
   */
  removeLocalSubstitution(id) {
    this.localSubs = this.localSubs.filter(s => s.id !== id);
    localStorage.setItem('localSubstitutions', JSON.stringify(this.localSubs));
    console.log('[SubstitutionService] Zastępstwo usunięte:', id);
  }

  /**
   * Filtruje zastępstwa po klasie
   */
  filterByClass(subs, className) {
    return subs.filter(sub => 
      sub.class === className || 
      (sub.affectedClasses && sub.affectedClasses.includes(className))
    );
  }

  /**
   * Eksportuje lokalne zastępstwa jako JSON
   */
  exportLocalSubstitutions() {
    return JSON.stringify(this.localSubs, null, 2);
  }

  /**
   * Importuje zastępstwa z JSON
   */
  importLocalSubstitutions(jsonString) {
    try {
      const subs = JSON.parse(jsonString);
      if (Array.isArray(subs)) {
        this.localSubs = subs;
        localStorage.setItem('localSubstitutions', JSON.stringify(this.localSubs));
        console.log('[SubstitutionService] Zastępstwa zaimportowane:', subs.length);
        return true;
      }
      return false;
    } catch (error) {
      console.error('[SubstitutionService] Błąd podczas importu:', error);
      return false;
    }
  }

  /**
   * Czyści wszystkie lokalne zastępstwa
   */
  clearLocalSubstitutions() {
    this.localSubs = [];
    localStorage.removeItem('localSubstitutions');
    console.log('[SubstitutionService] Lokalne zastępstwa wyczyszczone');
  }
}
    localStorage.setItem('localSubstitutions', JSON.stringify(this.localSubs));
  }

  /**
   * Filtruje zastępstwa dla konkretnej klasy
   */
  filterByClass(subs, className) {
    return subs.filter(sub => sub.className === className || sub.affectedClasses?.includes(className));
  }
}
