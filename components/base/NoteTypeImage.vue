<template>
  <div class="space-y-2">
    <label class="block font-medium">Image</label>
    <input type="file" @change="onFileChange" />
    <img v-if="modelValue" :src="modelValue" class="max-w-full mt-2 rounded" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null
}>()
const emit = defineEmits(['update:modelValue'])

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      emit('update:modelValue', reader.result as string)
    }
    reader.readAsDataURL(file)
  }
}
</script>
