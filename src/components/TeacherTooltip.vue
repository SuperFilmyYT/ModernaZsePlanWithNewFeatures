<template>
  <div class="relative inline-block">
    <!-- Teacher Initials (Clickable) -->
    <button
      @click="toggleTooltip"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      class="relative inline-flex items-center justify-center min-w-12 h-8 px-2 rounded-md font-bold text-sm transition-all"
      :class="[
        showTooltip ? 'bg-cyan-900/30 text-cyan-300 ring-1 ring-cyan-400' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50',
        'cursor-pointer hover:scale-110'
      ]"
    >
      {{ initials }}
    </button>

    <!-- Tooltip -->
    <transition name="fade">
      <div
        v-if="showTooltip"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 min-w-48"
      >
        <!-- Glass Effect Background -->
        <div class="glass-effect rounded-lg p-3 shadow-2xl border border-cyan-400/20">
          
          <!-- Photo Container with Aspect Ratio -->
          <div class="relative w-full overflow-hidden rounded-md mb-2 bg-gray-900/50"
               style="aspect-ratio: 4/5;">
            
            <!-- Loading State -->
            <div v-if="photoLoading" class="absolute inset-0 flex items-center justify-center bg-gray-800/70">
              <div class="animate-spin">
                <div class="h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
              </div>
            </div>

            <!-- Photo Image -->
            <img
              v-if="photoUrl && !photoFailed"
              :src="photoUrl"
              :alt="`Zdjęcie ${fullName}`"
              @load="photoLoading = false"
              @error="handlePhotoError"
              class="w-full h-full object-cover"
            />

            <!-- Fallback: No Photo Available -->
            <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900/50">
              <div class="text-4xl mb-2">👤</div>
              <p class="text-xs text-gray-400 text-center px-2">
                Zdjęcia jeszcze nie ma – wkrótce się pojawi
              </p>
            </div>
          </div>

          <!-- Teacher Info -->
          <div class="space-y-1">
            <p class="font-semibold text-sm text-cyan-200">
              {{ fullName }}
            </p>
            <p class="text-xs text-gray-400">
              Inicjały: <span class="text-cyan-300 font-mono">{{ initials }}</span>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from '../store'

export default {
  name: 'TeacherTooltip',
  props: {
    initials: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const showTooltip = ref(false)
    const photoLoading = ref(true)
    const photoFailed = ref(false)

    const teacher = computed(() => {
      return store.getTeacherByInitials(props.initials)
    })

    const fullName = computed(() => {
      return teacher.value?.fullName || props.initials
    })

    const photoUrl = computed(() => {
      if (!teacher.value) return null
      // Try to load photo with initials as filename
      return `/nauczyciele/${props.initials}.jpg`
    })

    const handlePhotoError = () => {
      photoFailed.value = true
      photoLoading.value = false
    }

    const toggleTooltip = () => {
      showTooltip.value = !showTooltip.value
    }

    return {
      showTooltip,
      photoLoading,
      photoFailed,
      teacher,
      fullName,
      photoUrl,
      handlePhotoError,
      toggleTooltip,
    }
  },
}
</script>

<style scoped>
.glass-effect {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(10px);
  @apply border-cyan-400/20;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -5px);
}
</style>
