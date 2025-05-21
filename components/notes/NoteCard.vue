<template>
  <div class="p-4 border rounded shadow space-y-2">
    <h2 class="text-lg font-bold">{{ note.title }}</h2>
    <p class="text-sm text-gray-600">{{ note.description }}</p>
    <p class="text-xs italic">Type: {{ typeLabel }}</p>

    <NuxtLink :to="`/note/${note.id}`" class="text-blue-500 hover:underline">
      Edit
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  note: {
    id: string
    title: string
    description: string
    type: number
  }
}>()

const typeLabel = computed(() => {
  switch (props.note.type) {
    case 1:
      return 'Image'
    case 2:
      return 'Checkbox'
    default:
      return 'Default'
  }
})
</script>
