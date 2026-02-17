<template>
  <div class="glass-effect rounded-lg p-4 h-fit sticky top-20">
    <h2 class="text-lg font-bold text-cyber-electric mb-4 border-b border-cyber-electric/30 pb-3">
      📚 Oddziały
    </h2>
    <div class="space-y-2 max-h-96 overflow-y-auto">
      <button
        v-for="cls in classes"
        :key="cls.id"
        @click="$emit('select', cls)"
        class="w-full px-3 py-2 rounded text-left text-sm hover:bg-cyber-blue/20 hover:text-cyber-electric transition-all duration-200 text-gray-300 border border-transparent hover:border-cyber-blue/50"
      >
        {{ cls.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  classes: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select'])
</script>
