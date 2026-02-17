<template>
  <div class="space-y-2">
    <div 
      v-if="subject"
      class="text-xs text-gray-300 font-semibold px-2 py-1 rounded bg-cyber-blue/15 border border-cyber-blue/30 truncate"
    >
      {{ subject }}
    </div>
    
    <div v-if="lesson.teacher || lesson.room" class="space-y-1">
      <TeacherTooltip 
        v-if="lesson.teacher"
        :initials="lesson.teacher"
        :store="store"
        class="text-xs text-cyber-electric hover:text-cyber-accent cursor-pointer font-bold"
      />
      
      <div v-if="lesson.room" class="text-xs text-gray-400">
        🚪 {{ lesson.room }}
      </div>
    </div>
    
    <!-- Ikona grupy -->
    <div v-if="lesson.group" class="text-xs text-cyber-purple">
      ※ Gr. {{ lesson.group.current }}/{{ lesson.group.total }}
    </div>
    
    <!-- Ikona zastępstwa -->
    <div v-if="hasSubstitution" class="text-xs text-cyber-accent font-bold">
      ⚡ Zmiana!
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TeacherTooltip from './TeacherTooltip.vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  },
  store: {
    type: Object,
    required: true
  }
})

const subject = computed(() => {
  return props.lesson.subject?.replace(/[_-]\d\/\d/g, '').trim()
})

const hasSubstitution = computed(() => {
  // TODO: Sprawdzić czy jest zastępstwo na tę lekcję
  return false
})
</script>
