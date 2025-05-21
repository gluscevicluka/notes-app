<template>
  <NuxtLink
    :to="`/note/${note.id}`"
    class="inline-block text-blue-600 text-sm hover:underline"
  >
    <div
      class="bg-white rounded-xl shadow-md p-6 space-y-3 border border-gray-200"
    >
      <h2 class="text-lg font-semibold text-gray-800">{{ note.title }}</h2>
      <p class="text-sm text-gray-600 line-clamp-3">{{ note.description }}</p>
      <p class="text-xs text-gray-400 italic">Type: {{ typeLabel }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  note: {
    id: string;
    title: string;
    description: string;
    type: number;
  };
}>();

const typeLabel = computed(() => {
  switch (props.note.type) {
    case 1:
      return "Image";
    case 2:
      return "Checkbox";
    default:
      return "Default";
  }
});
</script>
