<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center space-y-4">
      <p class="text-lg">{{ message }}</p>
      <div class="flex justify-around">
        <AddButton @click="confirm">Yes</AddButton>
        <AddButton @click="cancel" class="bg-gray-300 text-black hover:bg-gray-400">No</AddButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddButton from './AddButton.vue'

defineProps<{
  visible: boolean
  message: string
}>()

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
  emit('confirm')
}
function cancel() {
  emit('cancel')
}
</script>
