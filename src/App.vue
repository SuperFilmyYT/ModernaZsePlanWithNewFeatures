<template>
  <div class="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker text-gray-100 font-mono">
    <!-- Header -->
    <header class="border-b border-cyber-electric/30 bg-cyber-dark/80 backdrop-blur sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-cyber-electric to-cyber-blue rounded-lg flex items-center justify-center">
            <span class="text-cyber-dark font-bold">ZSE</span>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-cyber-electric via-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            Plan Lekcji
          </h1>
        </div>
        <nav class="flex gap-4">
          <button @click="showAdmin = !showAdmin" 
                  :class="['px-4 py-2 rounded border border-cyber-blue/50 hover:border-cyber-electric hover:text-cyber-electric transition-colors', 
                           showAdmin ? 'bg-cyber-blue/20 text-cyber-electric' : 'text-gray-400']">
            ⚙️ Admin
          </button>
          <button @click="toggleTheme" class="px-4 py-2 rounded border border-cyber-blue/50 hover:border-cyber-electric hover:text-cyber-electric transition-colors text-gray-400">
            🌙
          </button>
        </nav>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Admin Panel -->
      <AdminPanel v-if="showAdmin" @close="showAdmin = false" :store="store" />
      
      <!-- Główna zawartość -->
      <template v-if="!showAdmin">
        <div class="grid grid-cols-4 gap-6">
          <!-- Sidebar: Klasy -->
          <div class="col-span-1">
            <ClassesSidebar :classes="store.state.classes" @select="loadSchedule" />
          </div>

          <!-- Główny plan -->
          <div class="col-span-3">
            <Suspense>
              <template #default>
                <ScheduleView v-if="store.state.schedule" 
                             :schedule="store.state.schedule"
                             :substitutions="store.state.substitutions"
                             :store="store" />
                <div v-else class="text-center py-12">
                  <p class="text-cyber-blue text-lg">Wybierz klasę aby wyświetlić plan</p>
                </div>
              </template>
              <template #fallback>
                <div class="text-center py-12">
                  <p class="text-cyber-electric">Wczytywanie planu...</p>
                </div>
              </template>
            </Suspense>
          </div>
        </div>
      </template>
    </div>

    <!-- Footer -->
    <footer class="border-t border-cyber-electric/20 bg-cyber-dark/50 mt-12 py-6 text-center text-xs text-gray-500">
      <p>Strona jest nieoficjalną nakładką wizualną. Wszystkie dane źródłowe należą do ZSE im. Wojska Polskiego w Bydgoszczy.</p>
      <p class="mt-1">Projekt ma charakter edukacyjny i pomocniczy.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createStore } from './store/index.js'
import { SubstitutionService } from './utils/substitutions.js'
import { getClasses, getTeachers, getAllSchedules } from './data/loader.js'
import ClassesSidebar from './components/ClassesSidebar.vue'
import ScheduleView from './components/ScheduleView.vue'
import AdminPanel from './components/AdminPanel.vue'

const store = createStore()
const showAdmin = ref(false)
const subService = new SubstitutionService()

onMounted(async () => {
  // Wczytuje dane z precomputed JSON
  const classes = getClasses()
  const teachers = getTeachers()
  const schedules = getAllSchedules()

  store.setClasses(classes)
  store.setTeachers(teachers)
  store.setSchedules(schedules)

  // Wczytuje zastępstwa
  const subs = await subService.getAllSubstitutions()
  store.setSubstitutions(subs)

  // Wczytuje ostatnio odwiedzaną klasę
  if (store.state.lastVisited) {
    const classData = classes.find(c => c.name === store.state.lastVisited)
    if (classData) {
      loadSchedule(classData)
    }
  } else if (classes.length > 0) {
    // Załaduj pierwszą klasę domyślnie
    loadSchedule(classes[0])
  }
})

function loadSchedule(classData) {
  const schedule = store.state.schedules[`o${classData.id}`]
  if (schedule) {
    store.setSchedule(schedule)
  }
}

function toggleTheme() {
  store.state.theme = store.state.theme === 'dark' ? 'light' : 'dark'
}
</script>

<style>
:root {
  --cyber-dark: #0a0e27;
  --cyber-darker: #050812;
  --cyber-electric: #00ff99;
  --cyber-blue: #0099ff;
  --cyber-purple: #9933ff;
}

html, body {
  background: var(--cyber-darker);
  color: #e5e7eb;
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--cyber-blue) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: var(--cyber-blue);
  border-radius: 4px;
}

*::-webkit-scrollbar-thumb:hover {
  background: var(--cyber-electric);
}
</style>
