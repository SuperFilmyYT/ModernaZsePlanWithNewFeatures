/**
 * Parser VULCAN - Konwertuje pliki HTML na strukturę JSON
 * Wykorzystuje cheerio do parsowania HTML bez potrzeby DOM przeglądarki
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class VulcanParser {
  constructor(dataDir) {
    this.dataDir = dataDir;
    this.classes = [];
    this.teachers = [];
    this.rooms = [];
    this.schedules = {};
  }

  /**
   * Parsuje plik lista.htm i wydobywa listę klas, nauczycieli i sal
   */
  parseListaFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content);

    // Parsowanie klas
    const classes = [];
    $('a[href*="/plany/o"]').each((i, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr('href');
      const match = href.match(/\/o(\d+)\.html/);
      
      if (match) {
        classes.push({
          id: match[1],
          name: text,
          fileId: `o${match[1]}`,
          href: href
        });
      }
    });

    // Parsowanie nauczycieli
    const teachers = [];
    $('a[href*="/plany/n"]').each((i, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr('href');
      const match = href.match(/\/n(\d+)\.html/);
      
      if (match) {
        const initials = text.match(/\(([^)]+)\)$/)?.[1] || '';
        const fullName = text.replace(/\s*\([^)]+\)$/, '');
        
        teachers.push({
          id: match[1],
          fullName: fullName,
          initials: initials,
          href: href,
          photoPath: `/nauczyciele/${initials.toLowerCase()}.jpg`
        });
      }
    });

    // Parsowanie sal
    const rooms = [];
    const roomsSection = $('h4:contains("Sale")').next('ul');
    roomsSection.find('a[href*="/plany/s"]').each((i, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr('href');
      const match = href.match(/\/s(\d+)\.html/);
      
      if (match) {
        rooms.push({
          id: match[1],
          name: text,
          href: href
        });
      }
    });

    this.classes = classes;
    this.teachers = teachers;
    this.rooms = rooms;

    console.log(`✓ Sparsowano ${classes.length} klas`);
    console.log(`✓ Sparsowano ${teachers.length} nauczycieli`);
    console.log(`✓ Sparsowano ${rooms.length} sal`);

    return { classes, teachers, rooms };
  }

  /**
   * Parsuje plik planu lekcji (o1.htm, o2.htm, etc.)
   */
  parseTimetableFile(filePath, classId) {
    const content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content);

    // Wydobywa nazwę klasy z tytułu
    const titleText = $('title').text();
    const titleMatch = titleText.match(/oddziału\s*-?\s*(.+)/);
    const className = titleMatch ? titleMatch[1].trim() : 'Unknown';

    const schedule = {
      className,
      classId,
      lessons: []
    };

    const table = $('table.tabela');
    if (table.length === 0) {
      console.warn(`⚠ Nie znaleziono tabeli dla ${filePath}`);
      return schedule;
    }

    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
    const rows = table.find('tbody tr');

    let headers = [];
    rows.each((rowIdx, row) => {
      if (rowIdx === 0) {
        // Pomijamy nagłówek
        return;
      }

      const cells = $(row).find('td');
      if (cells.length < 7) return;

      const lessonNumber = $(cells[0]).text().trim();
      const time = $(cells[1]).text().trim();

      // Iteruj po dniach (kolumny 2-6)
      for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
        const cellIndex = dayIdx + 2;
        const cell = $(cells[cellIndex]);
        
        // Sprawdź czy komórka jest pusta
        if (cell.text().includes('nbsp') || cell.html().includes('&nbsp;')) {
          continue;
        }

        const lessons = this.parseLessonCell(cell);
        
        lessons.forEach(lesson => {
          schedule.lessons.push({
            day: days[dayIdx],
            dayIdx: dayIdx,
            time: time,
            lessonNumber: parseInt(lessonNumber),
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
  parseLessonCell(cell) {
    const $ = cheerio;
    const lessons = [];

    // Pobierz całą zawartość komórki
    const cellHtml = $.html(cell);
    
    // Szukaj wszystkich lekcji (mogą być rozdzielone <br>)
    const spans = $(cell).find('span.p');

    if (spans.length === 0) {
      // Pojedyncza lekcja w komórce
      const text = $(cell).text().trim();
      if (text && !text.toLowerCase().includes('nbsp')) {
        lessons.push(this.parseLessonText(text, cell));
      }
    } else {
      // Wiele lekcji (grupy)
      spans.each((idx, span) => {
        const lessonText = $(span).text().trim();
        const lessonObj = this.parseLessonText(lessonText, $(span).parent());

        // Pobierz nauczyciela i salę dla tej konkretnej lekcji
        const parentCell = $(span).closest('td');
        const nextTeacher = $(span).next('a.n, br').first();
        if (nextTeacher.hasClass('n')) {
          lessonObj.teacher = nextTeacher.text().trim();
        }

        lessons.push(lessonObj);
      });
    }

    // Jeśli nie ma explicit spans, wydobądź nauczyciela i salę z całej komórki
    if (lessons.length > 0 && spans.length === 0) {
      const teacher = $(cell).find('a.n').first().text().trim();
      const room = $(cell).find('a.s').first().text().trim();

      if (teacher) lessons[0].teacher = teacher;
      if (room) lessons[0].room = room;
    } else if (lessons.length > 1) {
      // Dla wielu lekcji, spróbuj dopasować nauczycieli
      const $cell = $(cell);
      const teachers = $Cell.find('a.n');
      const rooms = $cell.find('a.s');

      lessons.forEach((lesson, idx) => {
        if (!lesson.teacher && idx < teachers.length) {
          lesson.teacher = teachers.eq(idx).text().trim();
        }
        if (!lesson.room && idx < rooms.length) {
          lesson.room = rooms.eq(idx).text().trim();
        }
      });
    }

    return lessons;
  }

  /**
   * Parsuje konkretną lekcję i wydobywa dane
   */
  parseLessonText(text) {
    const lesson = {
      subject: text,
      teacher: null,
      room: null,
      group: null
    };

    // Wydobywa informację o grupie (z sufixu typu -1/2)
    const groupMatch = text.match(/-(\d)\/(\d)/);
    if (groupMatch) {
      lesson.group = {
        current: parseInt(groupMatch[1]),
        total: parseInt(groupMatch[2])
      };
      // Usuń informacje o grupie z nazwy przedmiotu
      lesson.subject = text.replace(/-\d\/\d/, '').trim();
    }

    return lesson;
  }

  /**
   * Parsuje wszystkie plany lekcji z katalogu
   */
  parseAllTimetables() {
    const files = fs.readdirSync(this.dataDir);
    const planFiles = files.filter(f => f.match(/^o\d+\.htm$/i));

    console.log(`\nParsowanie ${planFiles.length} plików z planami...`);

    planFiles.forEach((file, idx) => {
      const classId = file.match(/o(\d+)/i)[1];
      const filePath = path.join(this.dataDir, file);
      
      console.log(`  [${idx + 1}/${planFiles.length}] ${file}`);
      const schedule = this.parseTimetableFile(filePath, classId);
      this.schedules[`o${classId}`] = schedule;
    });

    return this.schedules;
  }

  /**
   * Generuje kompletny plik danych JSON
   */
  generateJSON() {
    return {
      metadata: {
        school: 'Zespół Szkół Elektronicznych im. Wojska Polskiego',
        city: 'Bydgoszcz',
        generatedAt: new Date().toISOString(),
        version: '1.0.0'
      },
      classes: this.classes,
      teachers: this.teachers,
      rooms: this.rooms,
      schedules: this.schedules
    };
  }

  /**
   * Zapisuje JSON do pliku
   */
  saveJSON(outputPath) {
    const data = this.generateJSON();
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`\n✓ Plik danych zapisany: ${outputPath}`);
    console.log(`  - Klas: ${this.classes.length}`);
    console.log(`  - Nauczycieli: ${this.teachers.length}`);
    console.log(`  - Sal: ${this.rooms.length}`);
    console.log(`  - Planów lekcji: ${Object.keys(this.schedules).length}`);
  }
}

// ============= MAIN EXECUTION =============

const inputDir = path.join(__dirname, 'data');
const outputFile = path.join(__dirname, 'src', 'data', 'plan_data.json');

// Utwórz folder na dane jeśli nie istnieje
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🔧 VULCAN Plan Lekcji Parser');
console.log('================================\n');

try {
  const parser = new VulcanParser(inputDir);

  // Parsuj listę
  const listaFile = path.join(inputDir, 'lista.htm');
  if (!fs.existsSync(listaFile)) {
    throw new Error(`Plik ${listaFile} nie znaleziony!`);
  }

  console.log(`📂 Czytanie danych z: ${inputDir}\n`);
  parser.parseListaFile(listaFile);

  // Parsuj wszystkie plany
  parser.parseAllTimetables();

  // Zapisz JSON
  parser.saveJSON(outputFile);

  console.log('\n✅ Plik danych został wygenerowany pomyślnie!');
} catch (error) {
  console.error('\n❌ Błąd podczas parsowania:', error.message);
  process.exit(1);
}
