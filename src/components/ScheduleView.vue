<template>
  <div class="space-y-6">
    <!-- Nagłówek z nazwą klasy -->
    <div class="glass-effect rounded-lg p-6 border border-cyber-electric/20">
      <h1 class="text-4xl font-bold text-cyber-electric glow-text">{{ schedule.className }}</h1>
      <p class="text-gray-400 mt-2">Plan na dzisiaj: {{ currentDay }}</p>
    </div>

    <!-- Selektor grup (jeśli są grupy) -->
    <div v-if="hasGroups" class="glass-effect rounded-lg p-4 border border-cyber-blue/20">
      <label class="text-sm text-cyber-blue mb-2 block">Twoja grupa:</label>
      <select 
        v-model="selectedGroup"
        class="w-full bg-cyber-dark border border-cyber-blue/50 rounded px-3 py-2 text-cyber-electric focus:border-cyber-electric outline-none"
      >
        <option value="all">Wszystkie grupy</option>
        <option value="1">Grupa 1</option>
        <option value="2">Grupa 2</option>
      </select>
    </div>

    <!-- Tabela planu lekcji -->
    <div class="glass-effect rounded-lg overflow-hidden border border-cyber-electric/20">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border-b border-cyber-electric/30">
            <th class="px-4 py-3 text-left text-cyber-electric font-bold">Nr</th>
            <th class="px-4 py-3 text-left text-cyber-electric font-bold">Godz.</th>
            <th v-for="day in days" :key="day" class="px-4 py-3 text-left text-cyber-electric font-bold">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(lesson, idx) in groupedLessons" 
            :key="idx"
            class="border-b border-cyber-electric/10 hover:bg-cyber-blue/10 transition-colors"
          >
            <td class="px-4 py-3 text-cyber-blue font-bold">{{ lesson.number }}</td>
            <td class="px-4 py-3 text-gray-400 text-xs">{{ lesson.time }}</td>
            <td v-for="(dayLessons, dayIdx) in lesson.days" :key="dayIdx" class="px-4 py-2">
              <LessonCell 
                v-for="(les, lesIdx) in dayLessons" 
                :key="lesIdx"
                :lesson="les"
                :store="store"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Legenda -->
    <div class="glass-effect rounded-lg p-4 border border-cyber-purple/20 text-xs text-gray-400 space-y-2">
      <p><span class="text-cyber-electric">●</span> Nauczyciel - najechaj aby zobaczyć zdjęcie</p>
      <p><span class="text-cyber-electric">⚡</span> Zastępstwo / Zmiana</p>
      <p><span class="text-cyber-electric">※</span> Podział na grupy</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LessonCell from './LessonCell.vue'

const props = defineProps({
  schedule: {
    type: Object,
    required: true
  },
  substitutions: {
    type: Array,
    default: () => []
  },
  store: {
    type: Object,
    required: true
  }
})

const selectedGroup = ref('all')
const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek']

const currentDay = computed(() => {
  const dayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
  return dayNames[new Date().getDay()]
})

const hasGroups = computed(() => {
  return props.schedule.lessons.some(l => l.group)
})

const groupedLessons = computed(() => {
  const grouped = []
  const processed = new Set()
  
  props.schedule.lessons.forEach(lesson => {
    const key = `${lesson.number}-${lesson.time}`
    if (!processed.has(key)) {
      processed.add(key)
      const row = {
        number: lesson.number,
        time: lesson.time,
        days: [[], [], [], [], []]
      }
      
      // Grupuje lekcje po dniach
      props.schedule.lessons
        .filter(l => l.number === lesson.number)
        .forEach(l => {
          row.days[l.dayIdx].push(l)
        })
      
      grouped.push(row)
    }
  })
  
  return grouped
})
</script>
