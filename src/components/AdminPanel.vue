<template>
  <div class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>
  
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="glass-effect rounded-lg max-w-2xl w-full border border-cyber-electric/30 shadow-2xl shadow-cyber-electric/10">
        <!-- Header -->
        <div class="flex justify-between items-center px-6 py-4 border-b border-cyber-electric/30">
          <h2 class="text-2xl font-bold text-cyber-electric">⚙️ Panel Administratora</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-cyber-electric transition">✕</button>
        </div>

        <!-- Zawartość -->
        <div class="px-6 py-6 space-y-6">
          <!-- Zakładki -->
          <div class="flex gap-2 border-b border-cyber-electric/20 mb-6 overflow-x-auto">
            <button 
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['px-4 py-2 font-bold transition-all whitespace-nowrap', 
                       activeTab === tab.id 
                         ? 'text-cyber-electric border-b-2 border-cyber-electric' 
                         : 'text-gray-400 hover:text-gray-300']"
            >
              {{ tab.icon }} {{ tab.name }}
            </button>
          </div>

          <!-- Tab: Zastępstwa -->
          <div v-if="activeTab === 'substitutions'" class="space-y-4">
            <h3 class="text-lg font-bold text-cyber-blue">Dodaj zastępstwo</h3>
            
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-cyber-blue mb-1">Klasa:</label>
                <input 
                  v-model="newSub.className"
                  type="text"
                  placeholder="np. 1A, 2B"
                  class="w-full bg-cyber-dark border border-cyber-blue/50 rounded px-3 py-2 text-gray-100 focus:border-cyber-electric outline-none"
                />
              </div>

              <div>
                <label class="block text-sm text-cyber-blue mb-1">Lekcja:</label>
                <input 
                  v-model="newSub.lessonNumber"
                  type="number"
                  min="0"
                  max="12"
                  placeholder="np. 5"
                  class="w-full bg-cyber-dark border border-cyber-blue/50 rounded px-3 py-2 text-gray-100 focus:border-cyber-electric outline-none"
                />
              </div>

              <div>
                <label class="block text-sm text-cyber-blue mb-1">Nauczyciel:</label>
                <input 
                  v-model="newSub.teacher"
                  type="text"
                  placeholder="np. Ła (inicjały)"
                  class="w-full bg-cyber-dark border border-cyber-blue/50 rounded px-3 py-2 text-gray-100 focus:border-cyber-electric outline-none"
                />
              </div>

              <div>
                <label class="block text-sm text-cyber-blue mb-1">Informacja / Uwaga:</label>
                <textarea 
                  v-model="newSub.note"
                  placeholder="np. Lekcja w bibliotece, zmiana sali..."
                  class="w-full bg-cyber-dark border border-cyber-blue/50 rounded px-3 py-2 text-gray-100 focus:border-cyber-electric outline-none h-24 resize-none"
                ></textarea>
              </div>

              <button 
                @click="addSubstitution"
                class="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-electric hover:to-cyber-blue text-cyber-dark font-bold py-2 rounded transition-all duration-200"
              >
                ➕ Dodaj zastępstwo
              </button>
            </div>

            <!-- Lista zastępstw -->
            <div v-if="store.state.substitutions.length > 0" class="mt-6">
              <h4 class="text-sm font-bold text-cyber-purple mb-3">Pobieżne zastępstwa:</h4>
              <div class="space-y-2 max-h-48 overflow-y-auto">
                <div 
                  v-for="sub in store.state.substitutions"
                  :key="sub.id"
                  class="bg-cyber-dark/50 border border-cyber-purple/20 rounded p-3 text-sm"
                >
                  <p class="font-bold text-cyber-electric">{{ sub.className }} - Lekcja {{ sub.lessonNumber }}</p>
                  <p class="text-gray-400">{{ sub.teacher }} - {{ sub.note }}</p>
                  <button 
                    @click="deleteSub(sub.id)"
                    class="text-xs text-cyber-accent hover:text-red-400 mt-2"
                  >
                    🗑️ Usuń
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab: Upload planu -->
          <div v-if="activeTab === 'upload'" class="space-y-4">
            <h3 class="text-lg font-bold text-cyber-blue">Wgraj plik planu</h3>
            
            <p class="text-sm text-gray-400">
              Wgraj plik <strong>lista.htm</strong> lub pliki oddziałów <strong>o1.htm, o2.htm</strong>, itd.
            </p>

            <div class="border-2 border-dashed border-cyber-electric/50 rounded-lg p-8 text-center hover:border-cyber-electric transition-colors cursor-pointer"
                 @dragover.prevent
                 @drop.prevent="handleFileDrop"
                 @click="$refs.fileInput?.click()"
            >
              <p class="text-cyber-electric font-bold">📁 Przeciągnij plik lub kliknij aby wybrać</p>
              <p class="text-xs text-gray-400 mt-2">Obsługiwane: lista.htm, o*.htm</p>
            </div>

            <input 
              ref="fileInput"
              type="file"
              accept=".htm,.html"
              hidden
              @change="handleFileSelect"
            />

            <button 
              @click="uploadFiles"
              :disabled="filesToUpload.length === 0"
              class="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-electric hover:to-cyber-blue disabled:opacity-50 disabled:cursor-not-allowed text-cyber-dark font-bold py-2 rounded transition-all duration-200"
            >
              ⬆️ Prześlij {{ filesToUpload.length > 0 ? `(${filesToUpload.length})` : '' }}
            </button>
          </div>

          <!-- Tab: Dane i Export -->
          <div v-if="activeTab === 'dataexport'" class="space-y-4">
            <h3 class="text-lg font-bold text-cyber-blue">Dane i Export</h3>
            
            <div class="bg-cyber-dark/50 border border-cyber-blue/20 rounded p-4">
              <p class="text-sm text-gray-400 mb-3">
                Exportuj i importuj lokalne zastępstwa w formacie JSON
              </p>
              
              <button 
                @click="exportSubstitutions"
                class="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-electric hover:to-cyber-blue text-cyber-dark font-bold py-2 rounded transition-all duration-200 mb-3"
              >
                ⬇️ Pobierz zastępstwa (JSON)
              </button>

              <div class="border-t border-cyber-electric/20 pt-4">
                <label class="block text-sm text-cyber-blue mb-2">Wgraj zastępstwa z JSON:</label>
                <input 
                  ref="jsonFileInput"
                  type="file"
                  accept=".json"
                  hidden
                  @change="handleJsonFileSelect"
                />
                <button 
                  @click="$refs.jsonFileInput?.click()"
                  class="w-full bg-gray-700/50 hover:bg-gray-600/50 border border-gray-500/50 text-gray-300 font-bold py-2 rounded transition-all duration-200 mb-2"
                >
                  📤 Wgraj plik JSON
                </button>
              </div>

              <div class="bg-cyber-dark border border-red-500/30 rounded p-3 mt-4">
                <button 
                  @click="clearAllSubstitutions"
                  class="w-full text-red-400 hover:text-red-300 font-bold py-2 text-sm"
                >
                  🗑️ Wyczyść wszystkie zastępstwa
                </button>
              </div>
            </div>
          </div>

          <!-- Tab: Ustawienia -->
          <div v-if="activeTab === 'settings'" class="space-y-4">
            <h3 class="text-lg font-bold text-cyber-blue">Ustawienia</h3>
            
            <div>
              <label class="block text-sm text-cyber-blue mb-2">Motyw kolorów:</label>
              <div class="space-y-2">
                <button 
                  @click="setThemeColor('cyan')"
                  class="w-full px-3 py-2 text-left rounded border border-cyber-electric/30 hover:border-cyber-electric hover:bg-cyber-electric/20 text-gray-300"
                >
                  🔵 Cyan (domyślny)
                </button>
                <button 
                  @click="setThemeColor('purple')"
                  class="w-full px-3 py-2 text-left rounded border border-cyber-electric/30 hover:border-cyber-electric hover:bg-cyber-electric/20 text-gray-300"
                >
                  🟣 Purple
                </button>
                <button 
                  @click="setThemeColor('pink')"
                  class="w-full px-3 py-2 text-left rounded border border-cyber-electric/30 hover:border-cyber-electric hover:bg-cyber-electric/20 text-gray-300"
                >
                  🌸 Pink
                </button>
              </div>
            </div>

            <div class="text-xs text-gray-500 pt-4 border-t border-cyber-electric/20">
              <p>Wersja: 1.0.0</p>
              <p>Data: {{ new Date().toLocaleDateString('pl-PL') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SubstitutionService } from '../utils/substitutions.js'

const props = defineProps({
  store: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const activeTab = ref('substitutions')
const tabs = [
  { id: 'substitutions', name: 'Zastępstwa', icon: '⚡' },
  { id: 'upload', name: 'Plan', icon: '📁' },
  { id: 'dataexport', name: 'Dane', icon: '💾' },
  { id: 'settings', name: 'Ustawienia', icon: '⚙️' }
]

const newSub = ref({
  className: '',
  lessonNumber: '',
  teacher: '',
  note: ''
})

const filesToUpload = ref([])
const fileInput = ref(null)
const jsonFileInput = ref(null)
const subService = new SubstitutionService()

function addSubstitution() {
  if (newSub.value.className && newSub.value.lessonNumber) {
    subService.addLocalSubstitution({
      className: newSub.value.className,
      lessonNumber: parseInt(newSub.value.lessonNumber),
      teacher: newSub.value.teacher,
      note: newSub.value.note
    })
    
    // Odświeża state
    props.store.setSubstitutions(subService.localSubs)
    
    // Resetuje formularz
    newSub.value = { className: '', lessonNumber: '', teacher: '', note: '' }
  }
}

function deleteSub(id) {
  subService.removeLocalSubstitution(id)
  props.store.setSubstitutions(subService.localSubs)
}

function handleFileSelect(e) {
  filesToUpload.value = Array.from(e.target.files)
}

function handleFileDrop(e) {
  filesToUpload.value = Array.from(e.dataTransfer.files)
}

async function uploadFiles() {
  // TODO: Implementować upload na serwer
  alert(`${filesToUpload.value.length} plików gotowych do wgrania (implementacja w serwisie)`)
}

function setThemeColor(color) {
  // TODO: Zmieniać zmienne CSS
  alert(`Zmiana koloru na: ${color}`)
}

function exportSubstitutions() {
  const json = subService.exportLocalSubstitutions();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `zastepstwa_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function handleJsonFileSelect(e) {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonString = event.target?.result;
      if (typeof jsonString === 'string') {
        const success = subService.importLocalSubstitutions(jsonString);
        if (success) {
          props.store.setSubstitutions(subService.localSubs);
          alert('✅ Zastępstwa zaimportowane pomyślnie!');
          // Reset file input
          e.target.value = '';
        } else {
          alert('❌ Błąd podczas importu. Sprawdź format JSON.');
        }
      }
    };
    reader.readAsText(file);
  }
}

function clearAllSubstitutions() {
  if (confirm('⚠️ Czy na pewno usunąć wszystkie lokalne zastępstwa? Nie będzie można tego cofnąć!')) {
    subService.clearLocalSubstitutions();
    props.store.setSubstitutions([]);
    alert('✅ Wszystkie zastępstwa usunięte');
  }
}
</script>
