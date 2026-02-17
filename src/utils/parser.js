/**
 * Parser dla plików HTML z Optivum Vulcan
 */

export class OptivumParser {
  /**
   * Parsuje plik lista.htm i wydobywa listę oddziałów
   */
  static parseClasses(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const classes = [];
    const classLinks = doc.querySelectorAll('a[href*="/plany/o"]');
    
    classLinks.forEach(link => {
      const text = link.textContent.trim();
      const href = link.getAttribute('href');
      const match = href.match(/\/o(\d+)\.html/);
      
      if (match) {
        classes.push({
          id: match[1],
          name: text,
          href: href
        });
      }
    });
    
    return classes;
  }

  /**
   * Parsuje plik lista.htm i wydobywa listę nauczycieli
   */
  static parseTeachers(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const teachers = [];
    const teacherLinks = doc.querySelectorAll('a[href*="/plany/n"]');
    
    teacherLinks.forEach(link => {
      const text = link.textContent.trim();
      const href = link.getAttribute('href');
      const match = href.match(/\/n(\d+)\.html/);
      
      if (match) {
        // Wydobywa inicjały z tekstu (ostatnia część w nawiasie)
        const initials = text.match(/\(([^)]+)\)$/)?.[1] || '';
        const fullName = text.replace(/\s*\([^)]+\)$/, '');
        
        teachers.push({
          id: match[1],
          fullName: fullName,
          initials: initials,
          href: href
        });
      }
    });
    
    return teachers;
  }

  /**
   * Parsuje plik planu lekcji (o1.htm, o2.htm, etc.)
   */
  static parseTimetable(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Wydobywa nazwę klasy z tytułu
    const titleMatch = doc.querySelector('title')?.textContent.match(/oddziału\s*-?\s*(.+)/);
    const className = titleMatch?.[1] || 'Unknown';
    
    const schedule = {
      className,
      lessons: []
    };
    
    // Parsuje tabelę
    const table = doc.querySelector('table.tabela');
    if (!table) return schedule;
    
    const rows = table.querySelectorAll('tbody tr');
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
    
    let headers = [];
    rows.forEach((row, idx) => {
      if (idx === 0) {
        // Pobiera nagłówki dni tygodnia
        headers = Array.from(row.querySelectorAll('th')).map(th => th.textContent.trim());
        return;
      }
      
      const cells = row.querySelectorAll('td');
      if (cells.length < 7) return;
      
      const lessonNumber = cells[0]?.textContent.trim();
      const time = cells[1]?.textContent.trim();
      
      for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
        const cellIndex = dayIdx + 2;
        const cell = cells[cellIndex];
        if (!cell || cell.innerHTML.includes('&nbsp;')) continue;
        
        const lessons = this.parseLessonCell(cell);
        lessons.forEach(lesson => {
          schedule.lessons.push({
            day: days[dayIdx],
            dayIdx: dayIdx,
            time: time,
            number: lessonNumber,
            ...lesson
          });
        });
      }
    });
    
    return schedule;
  }

  /**
   * Parsuje zawartość komórki lekcji
   */
  static parseLessonCell(cell) {
    const lessons = [];
    
    // Dzieli na wiele lekcji jeśli są grupy
    const spans = cell.querySelectorAll('span.p');
    
    if (spans.length === 0) {
      // Pojedyncza lekcja
      const text = cell.textContent.trim();
      if (text && !text.includes('nbsp')) {
        lessons.push(this.parseLessonText(text, cell));
      }
    } else {
      // Wiele lekcji (grupy)
      spans.forEach((span, idx) => {
        const lesson = this.parseLessonText(span.textContent.trim(), cell.parentElement);
        lessons.push(lesson);
      });
    }
    
    return lessons;
  }

  /**
   * Parsuje konkretną lekcję i wydobywa dane
   */
  static parseLessonText(text, context) {
    const lesson = {
      subject: text,
      teacher: null,
      room: null,
      group: null
    };
    
    // Szuka inicjałów nauczyciela (element z class="n")
    if (context) {
      const teacherEl = context.querySelector('a.n');
      if (teacherEl) {
        lesson.teacher = teacherEl.textContent.trim();
      }
      
      const roomEl = context.querySelector('a.s');
      if (roomEl) {
        lesson.room = roomEl.textContent.trim();
      }
    }
    
    // Wydobywa informację o grupie (z sufixu)
    const groupMatch = text.match(/-(\d)\/(\d)/);
    if (groupMatch) {
      lesson.group = {
        current: parseInt(groupMatch[1]),
        total: parseInt(groupMatch[2])
      };
    }
    
    return lesson;
  }
}
